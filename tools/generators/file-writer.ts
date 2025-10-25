/**
 * TypeScript File Writer
 *
 * Writes generated TypeScript type definitions to files.
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname } from 'path';

/**
 * Writes generated types to TypeScript file
 *
 * Creates the output file with proper header comments and formatting.
 * Ensures the output directory exists before writing.
 *
 * @param moduleName - Module name (e.g., 'general', 'products')
 * @param interfaces - Array of interface/type definitions
 * @param sourceFile - Source OpenAPI file name (for header comment)
 *
 * @example
 * ```typescript
 * writeTypesToFile(
 *   'general',
 *   ['export interface PingResponse { status: string; }'],
 *   '01-general.yaml'
 * )
 * // Creates: src/types/general.types.ts
 * ```
 */
export function writeTypesToFile(
  moduleName: string,
  interfaces: string[],
  sourceFile: string
): void {
  // Determine output path
  const outputPath = `src/types/${moduleName}.types.ts`;

  // Ensure directory exists
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const dir = dirname(outputPath);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  if (!existsSync(dir)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    mkdirSync(dir, { recursive: true });
  }

  // Generate file header
  const header = generateFileHeader(moduleName, sourceFile);

  // Combine all content
  const content = [header, ...interfaces].join('\n\n');

  // Write to file
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  writeFileSync(outputPath, content, 'utf8');

  // Success message (using process.stdout instead of console for build tools)
  const count = String(interfaces.length);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  process.stdout.write(`✓ Generated ${count} types for ${moduleName} → ${outputPath}\n`);
}

/**
 * Generates file header comment
 *
 * Creates the standard header for generated type files with warnings
 * about manual editing.
 *
 * @param moduleName - Module name
 * @param sourceFile - Source OpenAPI file name
 * @returns Header comment block
 */
export function generateFileHeader(moduleName: string, sourceFile: string): string {
  return `/**
 * Auto-generated TypeScript types for ${moduleName} module
 * Generated from: wildberries_api_doc/${sourceFile}
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: ${new Date().toISOString()}
 */`;
}
