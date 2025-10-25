/**
 * OpenAPI Type Mapping Engine
 *
 * Maps OpenAPI 3.0.1 schema types to TypeScript type definitions.
 *
 * Context7 Reference: /microsoft/typescript - "mapped types, conditional types"
 * @see {@link https://www.typescriptlang.org/docs/handbook/2/mapped-types.html}
 */

import type { SchemaObject } from './yaml-parser.js';

/**
 * Sanitizes description text by removing irregular whitespace
 *
 * Replaces non-breaking spaces, zero-width spaces, and other irregular
 * whitespace characters with regular spaces or empty strings.
 *
 * @param text - Text to sanitize
 * @returns Sanitized text
 */
export function sanitizeWhitespace(text: string): string {
  return text
    // Replace non-breaking spaces with regular spaces
    .replace(/\u00A0/g, ' ')
    // Replace zero-width spaces
    .replace(/\u200B/g, '')
    // Replace other Unicode whitespace with regular spaces
    .replace(/[\u2000-\u200F\u202F\u205F\u3000]/g, ' ')
    // Replace multiple spaces with single space
    .replace(/\s+/g, ' ')
    // Trim leading/trailing whitespace
    .trim();
}

/**
 * Maps OpenAPI type to TypeScript type string
 *
 * Handles primitive types, enums, arrays, objects, and $ref references.
 *
 * @param schema - OpenAPI schema object
 * @param allSchemas - All schemas from spec (for $ref resolution)
 * @returns TypeScript type string
 *
 * @example
 * ```typescript
 * mapOpenAPIType({ type: 'string' }) // 'string'
 * mapOpenAPIType({ type: 'string', enum: ['a', 'b'] }) // "'a' | 'b'"
 * mapOpenAPIType({ type: 'array', items: { type: 'number' } }) // 'number[]'
 * ```
 */
export function mapOpenAPIType(
  schema: SchemaObject,
  allSchemas: Record<string, SchemaObject> = {},
  skipComments = false
): string {
  // Handle $ref references first
  if (schema.$ref) {
    return resolveRef(schema.$ref, allSchemas);
  }

  // Handle allOf, oneOf, anyOf compositions
  if (schema.allOf) {
    const types = schema.allOf.map((s) => mapOpenAPIType(s, allSchemas, skipComments));
    return types.join(' & ');
  }

  if (schema.oneOf) {
    const types = schema.oneOf.map((s) => mapOpenAPIType(s, allSchemas, skipComments));
    return types.join(' | ');
  }

  if (schema.anyOf) {
    const types = schema.anyOf.map((s) => mapOpenAPIType(s, allSchemas, skipComments));
    return types.join(' | ');
  }

  // Handle enum (union of literal types)
  if (schema.enum) {
    return schema.enum.map((v) => (typeof v === 'string' ? `'${v}'` : v)).join(' | ');
  }

  // Handle arrays
  if (schema.type === 'array') {
    if (!schema.items) {
      return 'unknown[]';
    }
    const itemType = mapOpenAPIType(schema.items, allSchemas, skipComments);
    return `${itemType}[]`;
  }

  // Handle objects
  if (schema.type === 'object') {
    return generateInterface(schema, allSchemas, skipComments);
  }

  // Handle primitive types
  if (schema.type === 'string') {
    return 'string';
  }

  if (schema.type === 'number' || schema.type === 'integer') {
    return 'number';
  }

  if (schema.type === 'boolean') {
    return 'boolean';
  }

  // Default to unknown for unrecognized types
  return 'unknown';
}

/**
 * Generates TypeScript interface from object schema
 *
 * Creates inline interface definition with proper property types and optional markers.
 *
 * @param schema - OpenAPI object schema
 * @param allSchemas - All schemas from spec (for $ref resolution)
 * @returns TypeScript interface definition string
 *
 * @example
 * ```typescript
 * generateInterface({
 *   type: 'object',
 *   required: ['id'],
 *   properties: {
 *     id: { type: 'number' },
 *     name: { type: 'string' }
 *   }
 * })
 * // Returns: "{ id: number; name?: string; }"
 * ```
 */
export function generateInterface(
  schema: SchemaObject,
  allSchemas: Record<string, SchemaObject> = {},
  skipComments = false
): string {
  if (!schema.properties || Object.keys(schema.properties).length === 0) {
    // Handle empty objects or objects with additionalProperties
    if (schema.additionalProperties) {
      if (typeof schema.additionalProperties === 'boolean') {
        return 'Record<string, unknown>';
      }
      const valueType = mapOpenAPIType(schema.additionalProperties, allSchemas, skipComments);
      return `Record<string, ${valueType}>`;
    }
    return 'Record<string, never>';
  }

  const required = schema.required ?? [];
  const properties = Object.entries(schema.properties).map(([propName, propSchema]) => {
    const isRequired = required.includes(propName);
    const propType = mapOpenAPIType(propSchema, allSchemas, skipComments);
    const optionalMarker = isRequired ? '' : '?';

    if (skipComments) {
      // Compact format for inline types
      return `${propName}${optionalMarker}: ${propType}`;
    }

    // Full format with JSDoc for generated type files
    const comment = propSchema.description
      ? `\n  /** ${sanitizeWhitespace(propSchema.description)} */\n  `
      : '\n  ';

    return `${comment}${propName}${optionalMarker}: ${propType};`;
  });

  if (skipComments) {
    // Compact single-line format
    return `{ ${properties.join('; ')} }`;
  }

  // Multi-line format with proper indentation
  return `{${properties.join('')}\n}`;
}

/**
 * Resolves $ref reference to TypeScript type name
 *
 * Parses OpenAPI $ref format (#/components/schemas/SchemaName) and converts
 * schema name to PascalCase type reference.
 *
 * @param ref - OpenAPI $ref string
 * @param allSchemas - All schemas from spec (for validation)
 * @returns TypeScript type name in PascalCase
 *
 * @example
 * ```typescript
 * resolveRef('#/components/schemas/ProductCard') // 'ProductCard'
 * resolveRef('#/components/schemas/order_status') // 'OrderStatus'
 * ```
 */
export function resolveRef(
  ref: string,
  _allSchemas: Record<string, SchemaObject> = {}
): string {
  // Parse $ref format: #/components/schemas/SchemaName
  const refPattern = /#\/components\/schemas\/(.+)/;
  const match = refPattern.exec(ref);

  if (!match?.[1]) {
    // Invalid $ref format - return unknown type
    return 'unknown';
  }

  const schemaName = match[1];

  // Convert to PascalCase (schema validation happens at type-check time)
  return toPascalCase(schemaName);
}

/**
 * Converts string to PascalCase
 *
 * Handles snake_case, kebab-case, dot.notation, and camelCase inputs.
 *
 * @param str - Input string
 * @returns PascalCase string
 *
 * @example
 * ```typescript
 * toPascalCase('product_card') // 'ProductCard'
 * toPascalCase('order-status') // 'OrderStatus'
 * toPascalCase('apiResponse') // 'ApiResponse'
 * toPascalCase('Models.ErrorResponse') // 'ModelsErrorResponse'
 * toPascalCase('ProductCard') // 'ProductCard'
 * ```
 */
export function toPascalCase(str: string): string {
  return str
    .replace(/[-._ ](.)/g, (_, char: string) => char.toUpperCase())
    .replace(/[-._ ]/g, '') // Remove separators
    .replace(/^(.)/, (_, char: string) => char.toUpperCase());
}
