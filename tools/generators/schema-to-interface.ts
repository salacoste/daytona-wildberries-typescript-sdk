/**
 * Schema to TypeScript Interface Converter
 *
 * Converts OpenAPI schemas to TypeScript interface declarations.
 */

import type { SchemaObject } from './yaml-parser.js';
import { mapOpenAPIType, toPascalCase, sanitizeWhitespace } from './type-mapper.js';
import { generateJSDoc, generateExampleTag } from './jsdoc-generator.js';

/**
 * Generates complete TypeScript interface from schema
 *
 * Converts an OpenAPI schema definition into a fully-formed TypeScript
 * interface with JSDoc comments.
 *
 * @param schemaName - Name of the schema (from OpenAPI components.schemas key)
 * @param schema - OpenAPI schema object
 * @param allSchemas - All schemas from spec (for $ref resolution)
 * @returns Complete TypeScript interface declaration
 *
 * @example
 * ```typescript
 * generateTypeScriptInterface('ProductCard', {
 *   type: 'object',
 *   description: 'Product information',
 *   required: ['id', 'name'],
 *   properties: {
 *     id: { type: 'number', description: 'Product ID' },
 *     name: { type: 'string', description: 'Product name' },
 *     price: { type: 'number', description: 'Price in rubles' }
 *   }
 * })
 * // Returns:
 * // /**
 * //  * Product information
 * //  *\/
 * // export interface ProductCard {
 * //   /** Product ID *\/
 * //   id: number;
 * //   /** Product name *\/
 * //   name: string;
 * //   /** Price in rubles *\/
 * //   price?: number;
 * // }
 * ```
 */
export function generateTypeScriptInterface(
  schemaName: string,
  schema: SchemaObject,
  allSchemas: Record<string, SchemaObject> = {}
): string {
  const interfaceName = toPascalCase(schemaName);

  // Generate JSDoc comment
  const jsdocTags: string[] = [];

  if (schema.example) {
    jsdocTags.push(generateExampleTag(schema.example));
  }

  const jsdoc = generateJSDoc(schema.description, jsdocTags);

  // Handle non-object schemas (type aliases)
  if (schema.type !== 'object' && !schema.properties) {
    const typeAlias = mapOpenAPIType(schema, allSchemas);
    const output: string[] = [];

    if (jsdoc) {
      output.push(jsdoc);
    }

    output.push(`export type ${interfaceName} = ${typeAlias};`);
    return output.join('\n');
  }

  // Generate interface for object schemas
  const required = schema.required ?? [];
  const properties = schema.properties ?? {};

  const propertyLines: string[] = [];

  for (const [propName, propSchema] of Object.entries(properties)) {
    const isRequired = required.includes(propName);
    const propType = mapOpenAPIType(propSchema, allSchemas);
    const optionalMarker = isRequired ? '' : '?';

    // Add inline JSDoc for property if it has a description
    if (propSchema.description) {
      propertyLines.push(`  /** ${sanitizeWhitespace(propSchema.description)} */`);
    }

    propertyLines.push(`  ${propName}${optionalMarker}: ${propType};`);
  }

  // Handle additionalProperties
  if (schema.additionalProperties && Object.keys(properties).length === 0) {
    // If no properties defined, generate Record type instead
    if (typeof schema.additionalProperties === 'boolean') {
      const typeAlias = 'Record<string, unknown>';
      const output: string[] = [];

      if (jsdoc) {
        output.push(jsdoc);
      }

      output.push(`export type ${interfaceName} = ${typeAlias};`);
      return output.join('\n');
    }
    const valueType = mapOpenAPIType(schema.additionalProperties, allSchemas);
    const typeAlias = `Record<string, ${valueType}>`;
    const output: string[] = [];

    if (jsdoc) {
      output.push(jsdoc);
    }

    output.push(`export type ${interfaceName} = ${typeAlias};`);
    return output.join('\n');
  }

  // Build interface declaration
  const output: string[] = [];

  if (jsdoc) {
    output.push(jsdoc);
  }

  output.push(`export interface ${interfaceName} {`);

  if (propertyLines.length > 0) {
    output.push(propertyLines.join('\n'));
  }

  output.push('}');

  return output.join('\n');
}

/**
 * Generates type alias instead of interface
 *
 * Used for enum types, unions, and other non-object types.
 *
 * @param schemaName - Name of the schema
 * @param schema - OpenAPI schema object
 * @param allSchemas - All schemas from spec
 * @returns TypeScript type alias declaration
 *
 * @example
 * ```typescript
 * generateTypeAlias('OrderStatus', {
 *   type: 'string',
 *   enum: ['new', 'confirmed', 'shipped']
 * })
 * // Returns: "export type OrderStatus = 'new' | 'confirmed' | 'shipped';"
 * ```
 */
export function generateTypeAlias(
  schemaName: string,
  schema: SchemaObject,
  allSchemas: Record<string, SchemaObject> = {}
): string {
  const typeName = toPascalCase(schemaName);
  const typeDefinition = mapOpenAPIType(schema, allSchemas);

  const jsdoc = generateJSDoc(schema.description);

  const output: string[] = [];

  if (jsdoc) {
    output.push(jsdoc);
  }

  output.push(`export type ${typeName} = ${typeDefinition};`);

  return output.join('\n');
}
