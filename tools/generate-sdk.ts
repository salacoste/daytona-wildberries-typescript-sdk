#!/usr/bin/env node
/**
 * Wildberries SDK Code Generator
 *
 * Main orchestrator for generating TypeScript types from OpenAPI specifications.
 *
 * Usage:
 *   npm run generate                              # Generate all modules
 *   npm run generate:general                      # Generate specific module
 *   npm run generate -- wildberries_api_doc/*.yaml # Generate from file pattern
 */

import { parseOpenAPISpec, extractSchemas, getModuleName } from './generators/yaml-parser.js';
import { generateTypeScriptInterface } from './generators/schema-to-interface.js';
import { writeTypesToFile } from './generators/file-writer.js';
import { parsePaths } from './generators/path-parser.js';
import { generateModuleClass } from './generators/module-class-generator.js';
import { writeGeneratedModule } from './generators/module-file-writer.js';
import { generateRateLimitMap } from './generators/rate-limit-parser.js';
import { writeRateLimitConfig } from './generators/rate-limit-file-writer.js';

/**
 * Generates TypeScript module (types + class + rate limits) from a single OpenAPI YAML file
 *
 * @param swaggerPath - Path to OpenAPI YAML file
 * @returns Object with counts of generated types, methods, and endpoints
 */
export function generateFromSwagger(swaggerPath: string): { types: number; methods: number; endpoints: number } {
  try {
    // Parse OpenAPI specification
    const spec = parseOpenAPISpec(swaggerPath);

    // Extract module name and source file name
    const moduleName = getModuleName(spec);
    const sourceFileName = swaggerPath.split('/').pop() ?? 'unknown.yaml';

    // Step 1: Generate TypeScript types
    const typeCount = generateTypes(spec, moduleName, sourceFileName);

    // Step 2: Generate module class
    const methodCount = generateModule(spec, moduleName, sourceFileName);

    // Step 3: Generate rate limit configuration (Story 1.8)
    const endpointCount = generateRateLimits(spec, moduleName, sourceFileName);

    return { types: typeCount, methods: methodCount, endpoints: endpointCount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      process.stderr.write(`✗ Error generating SDK from ${swaggerPath}:\n  ${error.message}\n`);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      process.stderr.write(`✗ Unknown error generating SDK from ${swaggerPath}\n`);
    }
    return { types: 0, methods: 0, endpoints: 0 };
  }
}

/**
 * Generates TypeScript types from OpenAPI specification
 *
 * @param spec - Parsed OpenAPI specification
 * @param moduleName - Module name
 * @param sourceFileName - Source file name
 * @returns Number of interfaces generated
 */
function generateTypes(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  moduleName: string,
  sourceFileName: string
): number {
  // Extract schemas
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const schemas = extractSchemas(spec);

  // Generate TypeScript interfaces
  const interfaces: string[] = [];

  for (const [schemaName, schema] of Object.entries(schemas)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const interfaceCode = generateTypeScriptInterface(schemaName, schema, schemas);
    interfaces.push(interfaceCode);
  }

  // Write to file
  if (interfaces.length > 0) {
    writeTypesToFile(moduleName, interfaces, sourceFileName);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    process.stdout.write(`⚠ No schemas found in ${moduleName}\n`);
  }

  return interfaces.length;
}

/**
 * Generates module class from OpenAPI specification
 *
 * @param spec - Parsed OpenAPI specification
 * @param moduleName - Module name
 * @param sourceFileName - Source file name
 * @returns Number of methods generated
 */
function generateModule(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  moduleName: string,
  sourceFileName: string
): number {
  // Extract paths and parse operations
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const paths = spec.paths ?? {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const operations = parsePaths(paths);

  if (operations.length === 0) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    process.stdout.write(`⚠ No operations found in ${moduleName}\n`);
    return 0;
  }

  // Extract spec-level servers for base URL fallback
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const specServers = spec.servers ?? [];

  // Generate module class
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const module = generateModuleClass(operations, moduleName, sourceFileName, specServers);

  // Write to file
  writeGeneratedModule(module);

  return module.methods.length;
}

/**
 * Generates rate limit configuration from OpenAPI specification
 *
 * @param spec - Parsed OpenAPI specification
 * @param moduleName - Module name
 * @param sourceFileName - Source file name
 * @returns Number of endpoints configured
 */
function generateRateLimits(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any,
  moduleName: string,
  sourceFileName: string
): number {
  // Extract paths and parse operations
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const paths = spec.paths ?? {};
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const operations = parsePaths(paths);

  if (operations.length === 0) {
    // eslint-disable-next-line no-console
    console.warn(`⚠ No operations found in ${moduleName} for rate limit generation`);
    return 0;
  }

  // Build method name map from operations
  // We need to match the method names generated by generateModuleClass
  const methodNames = new Map<string, string>();

  for (const operation of operations) {
    const operationKey = `${operation.path}:${operation.method}`;

    // Generate method name using same logic as module generator
    // For now, use operationId or generate from path
    const methodName = operation.operationId ??
      generateMethodNameFromPath(operation.path, operation.method);

    methodNames.set(operationKey, methodName);
  }

  // Generate rate limit map
  const rateLimits = generateRateLimitMap(operations, moduleName, methodNames);

  // Write rate limit configuration file
  writeRateLimitConfig(rateLimits, moduleName, sourceFileName);

  return Object.keys(rateLimits).length;
}

/**
 * Generates method name from path and HTTP method
 * Simple implementation - should match module-method-generator logic
 *
 * @param path - API path
 * @param method - HTTP method
 * @returns Generated method name
 */
function generateMethodNameFromPath(path: string, method: string): string {
  // Remove leading slash and split by /
  const parts = path.replace(/^\//, '').split('/');

  // Filter out parameter placeholders and api/v1 prefixes
  const meaningfulParts = parts.filter(
    (p) => !p.startsWith('{') && !p.startsWith(':') && p !== 'api' && !/^v\d+$/.test(p)
  );

  // Convert to camelCase
  const baseName = meaningfulParts
    .map((part, index) => {
      const camelPart = part.replace(/-./g, (x) => x[1].toUpperCase());
      return index === 0 ? camelPart : camelPart.charAt(0).toUpperCase() + camelPart.slice(1);
    })
    .join('');

  // Prefix with HTTP method if not GET
  if (method === 'get') {
    return baseName || 'get';
  }

  return method + (baseName.charAt(0).toUpperCase() + baseName.slice(1));
}

/**
 * Main CLI entry point
 */
function main(): void {
  const args = process.argv.slice(2);

  // Default: Generate from 01-general.yaml
  const defaultFiles = ['wildberries_api_doc/01-general.yaml'];

  const files = args.length > 0 ? args : defaultFiles;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  process.stdout.write('\n🚀 Wildberries SDK Generator\n\n');

  let totalTypes = 0;
  let totalMethods = 0;
  let totalEndpoints = 0;
  let successCount = 0;

  for (const file of files) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = generateFromSwagger(file);
    if (result.types > 0 || result.methods > 0) {
      successCount++;
      totalTypes += result.types;
      totalMethods += result.methods;
      totalEndpoints += result.endpoints;
    }
  }

  const filesCount = String(files.length);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  process.stdout.write(
    `\n✓ Generated ${String(totalTypes)} types, ${String(totalMethods)} methods, and ${String(totalEndpoints)} rate limit configs from ${String(successCount)}/${filesCount} files\n\n`
  );
}

// Run if executed directly
// eslint-disable-next-line @typescript-eslint/restrict-template-expressions, @typescript-eslint/no-unsafe-member-access
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
