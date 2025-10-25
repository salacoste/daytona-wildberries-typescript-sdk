/**
 * Module File Writer
 *
 * Writes generated module code to filesystem with proper formatting.
 * Creates necessary directories and formats code with Prettier.
 *
 * @module module-file-writer
 */

import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import type { GeneratedModule } from './module-class-generator.js';

/**
 * Writes generated module to file
 *
 * **Workflow:**
 * 1. Ensure output directory exists (`src/modules/{moduleName}/`)
 * 2. Format code with Prettier (if available)
 * 3. Write formatted code to `index.ts`
 * 4. Log success message with method count
 *
 * @param moduleName - Module name (e.g., 'general')
 * @param moduleCode - Generated module code
 * @param methodCount - Number of generated methods
 *
 * @example
 * ```typescript
 * writeModuleToFile('general', generatedModule.code, generatedModule.methods.length);
 * // Creates: src/modules/general/index.ts
 * // Logs: ✓ Generated 3 methods for general module
 * ```
 */
export function writeModuleToFile(
  moduleName: string,
  moduleCode: string,
  methodCount: number
): void {
  // Construct output path
  const outputPath = `src/modules/${moduleName}/index.ts`;

  // Ensure directory exists
  ensureDirectoryExists(outputPath);

  // Format code (Prettier would be called here, but we'll keep it simple for now)
  const formattedCode = formatCode(moduleCode);

  // Write to file
  writeFileSync(outputPath, formattedCode, 'utf8');

  // Log success
  process.stdout.write(
    `✓ Generated ${String(methodCount)} ${methodCount === 1 ? 'method' : 'methods'} for ${moduleName} module → ${outputPath}\n`
  );
}

/**
 * Writes complete generated module object to file
 *
 * Convenience wrapper that extracts code and method count from GeneratedModule.
 *
 * @param module - Generated module object
 *
 * @example
 * ```typescript
 * const module = generateModuleClass(...);
 * writeGeneratedModule(module);
 * ```
 */
export function writeGeneratedModule(module: GeneratedModule): void {
  writeModuleToFile(module.moduleName, module.code, module.methods.length);
}

/**
 * Ensures directory exists by creating it recursively
 *
 * @param filePath - Full file path
 *
 * @example
 * ```typescript
 * ensureDirectoryExists('src/modules/general/index.ts');
 * // Creates: src/, src/modules/, src/modules/general/
 * ```
 */
export function ensureDirectoryExists(filePath: string): void {
  const dir = dirname(filePath);

  try {
    mkdirSync(dir, { recursive: true });
  } catch (error) {
    // Directory might already exist, ignore error
    if (error instanceof Error && !error.message.includes('EEXIST')) {
      throw error;
    }
  }
}

/**
 * Formats TypeScript code
 *
 * Currently returns code as-is. In production, would integrate with Prettier.
 *
 * @param code - TypeScript code to format
 * @returns Formatted code
 *
 * @example
 * ```typescript
 * formatCode('export class Foo{constructor(){}}')
 * // In production with Prettier:
 * // export class Foo {
 * //   constructor() {}
 * // }
 * ```
 */
export function formatCode(code: string): string {
  // In production, integrate with Prettier:
  // import prettier from 'prettier';
  // return prettier.format(code, { parser: 'typescript' });

  // For now, return as-is (code is already well-formatted from generators)
  return code;
}

/**
 * Gets output file path for module
 *
 * @param moduleName - Module name
 * @returns Full file path
 *
 * @example
 * ```typescript
 * getModuleFilePath('general')
 * // Returns: 'src/modules/general/index.ts'
 * ```
 */
export function getModuleFilePath(moduleName: string): string {
  return `src/modules/${moduleName}/index.ts`;
}

/**
 * Validates module code before writing
 *
 * Performs basic sanity checks on generated code.
 *
 * @param code - Generated code
 * @throws Error if validation fails
 *
 * @example
 * ```typescript
 * validateModuleCode('export class GeneralModule { ... }'); // OK
 * validateModuleCode(''); // Throws: Module code is empty
 * ```
 */
export function validateModuleCode(code: string): void {
  if (code.trim().length === 0) {
    throw new Error('Module code is empty');
  }

  if (!code.includes('export class')) {
    throw new Error('Module code does not contain class export');
  }

  if (!code.includes('constructor(private client: BaseClient)')) {
    throw new Error('Module code does not contain proper constructor');
  }
}

/**
 * Writes module with validation
 *
 * Validates code before writing to catch generation errors.
 *
 * @param moduleName - Module name
 * @param moduleCode - Generated code
 * @param methodCount - Number of methods
 * @throws Error if validation fails
 */
export function writeModuleToFileWithValidation(
  moduleName: string,
  moduleCode: string,
  methodCount: number
): void {
  // Validate before writing
  validateModuleCode(moduleCode);

  // Write to file
  writeModuleToFile(moduleName, moduleCode, methodCount);
}
