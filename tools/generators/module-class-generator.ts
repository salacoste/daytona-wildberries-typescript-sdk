/**
 * Module Class Generator
 *
 * Generates complete TypeScript module class with imports, class structure, and methods.
 * Creates production-ready module files ready for SDK integration.
 *
 * @module module-class-generator
 */

import type { ParsedOperation, ServerObject } from './path-parser.js';
import { generateMethod, type GeneratedMethod } from './module-method-generator.js';
import { MethodNameTracker } from './method-name-generator.js';
import { sanitizeTypeName } from './type-mapper.js';

/**
 * Generated module class with all components
 */
export interface GeneratedModule {
  /** Module name (camelCase) */
  moduleName: string;
  /** Class name (PascalCase) */
  className: string;
  /** Complete module code */
  code: string;
  /** Generated methods */
  methods: GeneratedMethod[];
  /** Type names used in module (for imports) */
  typeNames: Set<string>;
}

/**
 * Generates complete module class from OpenAPI operations
 *
 * **Output Structure:**
 * 1. File header with auto-generation warning
 * 2. Imports (BaseClient + types)
 * 3. Module class with constructor
 * 4. Generated methods
 *
 * @param operations - Parsed OpenAPI operations
 * @param moduleName - Module name (e.g., 'general', 'products')
 * @param sourceFileName - OpenAPI source file name (for header)
 * @param specServers - Spec-level servers
 * @returns Generated module with complete code
 *
 * @example
 * ```typescript
 * const module = generateModuleClass(
 *   [{ path: '/ping', method: 'get', ... }],
 *   'general',
 *   '01-general.yaml',
 *   [{ url: 'https://common-api.wildberries.ru' }]
 * );
 *
 * console.log(module.code);
 * // /**
 * //  * Auto-generated module for general
 * //  * Generated from: wildberries_api_doc/01-general.yaml
 * //  * DO NOT EDIT MANUALLY
 * //  *\/
 * // import { BaseClient } from '../../client/base-client';
 * // import type { PingResponse } from '../../types/general.types';
 * //
 * // export class GeneralModule {
 * //   constructor(private client: BaseClient) {}
 * //   ...methods
 * // }
 * ```
 */
export function generateModuleClass(
  operations: ParsedOperation[],
  moduleName: string,
  sourceFileName: string,
  specServers: ServerObject[] = []
): GeneratedModule {
  const className = `${sanitizeTypeName(moduleName)}Module`;
  const tracker = new MethodNameTracker();
  const generatedMethods: GeneratedMethod[] = [];
  const typeNames = new Set<string>();

  // Generate all methods
  for (const operation of operations) {
    try {
      const method = generateMethod(operation, specServers);

      // Ensure unique method name
      const uniqueName = tracker.register(method.name);
      if (uniqueName !== method.name) {
        // Update method code with unique name
        method.code = method.code.replace(
          new RegExp(`async ${method.name}\\(`, 'g'),
          `async ${uniqueName}(`
        );
        method.name = uniqueName;
      }

      generatedMethods.push(method);

      // Extract type names from return type
      extractTypeNames(method.returnType, typeNames);

      // Extract type names from method code (parameters and body)
      extractTypeNamesFromCode(method.code, typeNames);
    } catch (error) {
      // Log error but continue with other methods
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      process.stderr.write(
        `⚠ Warning: Failed to generate method for ${operation.method.toUpperCase()} ${operation.path}: ${errorMessage}\n`
      );
    }
  }

  // Generate file header
  const header = generateFileHeader(sourceFileName);

  // Generate imports
  const imports = generateImports(moduleName, typeNames);

  // Generate class structure
  const classCode = generateClassStructure(className, generatedMethods);

  // Combine all parts
  const code = `${header}\n\n${imports}\n\n${classCode}`;

  return {
    moduleName,
    className,
    code,
    methods: generatedMethods,
    typeNames,
  };
}

/**
 * Generates file header with auto-generation warning
 *
 * @param sourceFileName - OpenAPI source file name
 * @returns File header comment
 *
 * @example
 * ```typescript
 * generateFileHeader('01-general.yaml')
 * // Returns:
 * // /**
 * //  * Auto-generated module
 * //  * Generated from: wildberries_api_doc/01-general.yaml
 * //  * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 * //  *\/
 * ```
 */
export function generateFileHeader(sourceFileName: string): string {
  return `/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/${sourceFileName}
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */`;
}

/**
 * Generates import statements
 *
 * Imports BaseClient from core infrastructure and type definitions.
 *
 * @param moduleName - Module name (for type imports)
 * @param typeNames - Set of type names used in module
 * @returns Import statements
 *
 * @example
 * ```typescript
 * generateImports('general', new Set(['PingResponse', 'NewsResponse']))
 * // Returns:
 * // import { BaseClient } from '../../client/base-client';
 * // import type { PingResponse, NewsResponse } from '../../types/general.types';
 * ```
 */
export function generateImports(moduleName: string, typeNames: Set<string>): string {
  const lines: string[] = [];

  // Import BaseClient
  lines.push("import { BaseClient } from '../../client/base-client';");

  // Import types (if any) - only if types file exists
  // Note: Some modules may not have a types file if they have no schemas
  if (typeNames.size > 0) {
    const typeList = Array.from(typeNames).sort().join(', ');
    lines.push(`import type { ${typeList} } from '../../types/${moduleName}.types';`);
  }

  return lines.join('\n');
}

/**
 * Generates class structure with constructor and methods
 *
 * @param className - Class name (PascalCase)
 * @param methods - Generated methods
 * @returns Class code
 *
 * @example
 * ```typescript
 * generateClassStructure('GeneralModule', [{ code: '...', ... }])
 * // Returns:
 * // export class GeneralModule {
 * //   constructor(private client: BaseClient) {}
 * //
 * //   ...method code
 * // }
 * ```
 */
export function generateClassStructure(
  className: string,
  methods: GeneratedMethod[]
): string {
  const lines: string[] = [];

  // Class declaration
  lines.push(`export class ${className} {`);

  // Constructor
  lines.push('  constructor(private client: BaseClient) {}');

  // Add blank line before methods
  if (methods.length > 0) {
    lines.push('');
  }

  // Add all methods (with proper indentation)
  for (const method of methods) {
    const indentedCode = method.code
      .split('\n')
      .map((line) => (line ? `  ${line}` : ''))
      .join('\n');

    lines.push(indentedCode);

    // Add blank line between methods
    lines.push('');
  }

  // Close class
  lines.push('}');

  return lines.join('\n');
}

/**
 * Removes all inline object types from a string, handling nested braces
 *
 * @param str - String containing inline types
 * @returns String with inline object types removed
 *
 * @example
 * ```typescript
 * removeInlineTypes('Promise<{ foo: string }>') // 'Promise<>'
 * removeInlineTypes('Promise<{ nested: { deep: string }[] }>') // 'Promise<>'
 * removeInlineTypes('Promise<NamedType>') // 'Promise<NamedType>'
 * ```
 */
function removeInlineTypes(str: string): string {
  let result = '';
  let depth = 0;

  for (const char of str) {
    if (char === '{') {
      depth++;
    } else if (char === '}') {
      depth--;
    } else if (depth === 0) {
      result += char;
    }
  }

  return result;
}

/**
 * Extracts type names from TypeScript type string
 *
 * Parses return types to find interface/type references for imports.
 * Skips inline object types (types starting with {) and only extracts named types.
 *
 * @param typeString - TypeScript type (e.g., 'Promise<PingResponse>')
 * @param typeNames - Set to add extracted type names
 *
 * @example
 * ```typescript
 * const types = new Set<string>();
 * extractTypeNames('Promise<PingResponse>', types);
 * // types now contains: 'PingResponse'
 *
 * extractTypeNames('Promise<NewsItem[]>', types);
 * // types now contains: 'PingResponse', 'NewsItem'
 *
 * extractTypeNames('Promise<{ inline: string }>', types);
 * // types remains empty (inline types are skipped)
 * ```
 */
export function extractTypeNames(typeString: string, typeNames: Set<string>): void {
  // First remove all inline object types (handles nested braces)
  const withoutInline = removeInlineTypes(typeString);

  // Remove Promise<>, array brackets, and optional markers
  const cleaned = withoutInline
    .replace(/Promise<|>/g, '')
    .replace(/\[\]/g, '')
    .replace(/\?/g, '')
    .trim();

  // Skip primitive types and special types
  const primitives = new Set(['string', 'number', 'boolean', 'void', 'unknown', 'any', 'null', 'undefined']);
  if (primitives.has(cleaned) || cleaned.length === 0) {
    return;
  }

  // Handle union types (e.g., 'Type1 | Type2')
  if (cleaned.includes('|')) {
    const types = cleaned.split('|').map((t) => t.trim());
    for (const type of types) {
      if (!primitives.has(type) && type.length > 0 && /^[A-Z][a-zA-Z0-9]*$/.test(type)) {
        typeNames.add(type);
      }
    }
    return;
  }

  // Handle intersection types (e.g., 'Type1 & Type2')
  if (cleaned.includes('&')) {
    const types = cleaned.split('&').map((t) => t.trim());
    for (const type of types) {
      if (!primitives.has(type) && type.length > 0 && /^[A-Z][a-zA-Z0-9]*$/.test(type)) {
        typeNames.add(type);
      }
    }
    return;
  }

  // Single type - only add if it's a valid PascalCase identifier (not an inline type)
  if (/^[A-Z][a-zA-Z0-9]*$/.test(cleaned)) {
    typeNames.add(cleaned);
  }
}

/**
 * Extracts type names from method code (parameters and inline types)
 *
 * Scans method code to find all type references used in parameters and method body.
 * Handles inline object types (including nested), union types, and extracts named types for imports.
 * Excludes types found in JSDoc comments.
 *
 * @param code - Method code
 * @param typeNames - Set to add extracted type names
 *
 * @example
 * ```typescript
 * const types = new Set<string>();
 * extractTypeNamesFromCode('async foo(data: RequestBody): Promise<ResponseType>', types);
 * // types now contains: 'RequestBody', 'ResponseType'
 *
 * extractTypeNamesFromCode('async bar(data: TypeA | TypeB)', types);
 * // types now contains: 'TypeA', 'TypeB'
 *
 * extractTypeNamesFromCode('async baz(): Promise<{ nested: { deep: string } }>', types);
 * // types remains empty (inline types are skipped)
 * ```
 */
export function extractTypeNamesFromCode(code: string, typeNames: Set<string>): void {
  // Remove JSDoc comments first to avoid extracting types from descriptions
  const codeWithoutComments = code.replace(/\/\*\*[\s\S]*?\*\//g, '');

  // Types we should never try to import (built-ins, utility types, primitives that look like types)
  const excludedTypes = new Set([
    // TypeScript utility types
    'Promise', 'Record', 'Array', 'Partial', 'Required', 'Pick', 'Omit',
    'Readonly', 'NonNullable', 'ReturnType', 'InstanceType', 'Parameters',
    // Common property names that look like types
    'OK', 'Status', 'TS', 'ID', 'Error', 'Date', 'URL', 'JSON',
    'Erid', 'From', 'To', 'Type', 'Name', 'Data', 'Result', 'Response',
    'Request', 'Body', 'Query', 'Params', 'Options', 'Config', 'Settings',
    // Short uppercase words that are likely property names
    'NM', 'WB', 'FBS', 'FBW', 'API', 'CSV', 'XML', 'HTTP', 'GET', 'POST',
  ]);

  // Match type annotations after colons and in generics
  // Pattern 1: `: TypeName` - type annotations
  // Pattern 2: `<TypeName>` - generic type parameters
  // Pattern 3: `TypeName[]` - array types
  // Pattern 4: `TypeName |` or `| TypeName` - union types
  // Pattern 5: `TypeName &` or `& TypeName` - intersection types
  const patterns = [
    /:\s*([A-Z][a-zA-Z0-9]*)\b/g,           // : TypeName
    /<([A-Z][a-zA-Z0-9]*)\b/g,              // <TypeName
    /([A-Z][a-zA-Z0-9]*)\[\]/g,             // TypeName[]
    /\|\s*([A-Z][a-zA-Z0-9]*)\b/g,          // | TypeName
    /([A-Z][a-zA-Z0-9]*)\s*\|/g,            // TypeName |
    /&\s*([A-Z][a-zA-Z0-9]*)\b/g,           // & TypeName
    /([A-Z][a-zA-Z0-9]*)\s*&/g,             // TypeName &
  ];

  for (const pattern of patterns) {
    let match;
    while ((match = pattern.exec(codeWithoutComments)) !== null) {
      const typeName = match[1];
      if (typeName && !excludedTypes.has(typeName)) {
        typeNames.add(typeName);
      }
    }
  }
}
