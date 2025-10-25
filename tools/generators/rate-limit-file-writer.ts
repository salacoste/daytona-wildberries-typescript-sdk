/**
 * Rate Limit Configuration File Writer
 *
 * Writes generated rate limit configuration to filesystem.
 * Creates TypeScript files with endpoint-to-config mappings for use by RateLimiter.
 *
 * @module rate-limit-file-writer
 */

import { mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';
import type { EndpointLimits } from './rate-limit-parser.js';

/**
 * Generates TypeScript code for rate limit configuration file.
 *
 * Creates a module that exports a typed Record mapping endpoint keys to RateLimitConfig objects.
 *
 * **Generated File Structure:**
 * ```typescript
 * import type { RateLimitConfig } from '../client/rate-limiter';
 *
 * export const {moduleName}RateLimits: Record<string, RateLimitConfig> = {
 *   'module.method1': { requestsPerMinute: 10, ... },
 *   'module.method2': { requestsPerMinute: 20, ... }
 * };
 * ```
 *
 * @param limits - Endpoint limits object
 * @param moduleName - Module name (e.g., 'general', 'products')
 * @param yamlFileName - Source YAML file name for attribution
 * @returns Generated TypeScript code
 *
 * @example
 * ```typescript
 * const limits: EndpointLimits = {
 *   'general.ping': { requestsPerMinute: 60, burstLimit: 10 },
 *   'general.getNews': { requestsPerMinute: 30, intervalSeconds: 2, burstLimit: 10 }
 * };
 *
 * const code = generateRateLimitConfigCode(limits, 'general', '01-general.yaml');
 * console.log(code);
 * // /**
 * //  * Auto-generated rate limit configuration for general module
 * //  * Generated from: wildberries_api_doc/01-general.yaml
 * //  * DO NOT EDIT MANUALLY - Changes will be overwritten
 * //  *\/
 * // import type { RateLimitConfig } from '../client/rate-limiter';
 * //
 * // export const generalRateLimits: Record<string, RateLimitConfig> = {
 * //   'general.ping': {
 * //     requestsPerMinute: 60,
 * //     burstLimit: 10
 * //   },
 * //   ...
 * // };
 * ```
 */
export function generateRateLimitConfigCode(
  limits: EndpointLimits,
  moduleName: string,
  yamlFileName: string
): string {
  // Generate header comment with file attribution
  const header = `/**
 * Auto-generated rate limit configuration for ${moduleName} module
 * Generated from: wildberries_api_doc/${yamlFileName}
 * DO NOT EDIT MANUALLY - Changes will be overwritten on regeneration
 *
 * This file contains rate limit configurations extracted from OpenAPI operation descriptions.
 * Rate limits are enforced by the RateLimiter (Story 1.4) using the token bucket algorithm.
 *
 * @see {@link ../../src/client/rate-limiter!RateLimiter RateLimiter Documentation}
 * @module config/${moduleName}-rate-limits
 * @generated
 */

import type { RateLimitConfig } from '../client/rate-limiter';
`;

  // Generate export name (camelCase: generalRateLimits, productsRateLimits)
  const exportName = `${moduleName}RateLimits`;

  // Generate rate limit entries
  const entries: string[] = [];

  for (const [endpointKey, config] of Object.entries(limits)) {
    const configLines: string[] = [];

    // Always include requestsPerMinute
    configLines.push(`    requestsPerMinute: ${config.requestsPerMinute}`);

    // Include intervalSeconds if present
    if (config.intervalSeconds !== undefined) {
      configLines.push(`    intervalSeconds: ${config.intervalSeconds}`);
    }

    // Include burstLimit if present
    if (config.burstLimit !== undefined) {
      configLines.push(`    burstLimit: ${config.burstLimit}`);
    }

    // Format as object literal
    const configObject = `{\n${configLines.join(',\n')}\n  }`;

    // Add entry
    entries.push(`  '${endpointKey}': ${configObject}`);
  }

  // Generate exports
  const exportsCode = `
export const ${exportName}: Record<string, RateLimitConfig> = {
${entries.join(',\n')}
};
`;

  return header + exportsCode;
}

/**
 * Writes rate limit configuration to file.
 *
 * Creates `src/config/{moduleName}-rate-limits.ts` with type-safe rate limit mappings.
 *
 * **Workflow:**
 * 1. Ensure `src/config/` directory exists
 * 2. Generate TypeScript code from EndpointLimits
 * 3. Write to file
 * 4. Log success message with endpoint count
 *
 * @param limits - Endpoint limits mapping
 * @param moduleName - Module name (e.g., 'general')
 * @param yamlFileName - Source YAML file name (e.g., '01-general.yaml')
 *
 * @example
 * ```typescript
 * const limits: EndpointLimits = {
 *   'general.ping': { requestsPerMinute: 60, burstLimit: 10 }
 * };
 *
 * writeRateLimitConfig(limits, 'general', '01-general.yaml');
 * // Creates: src/config/general-rate-limits.ts
 * // Logs: ✓ Generated rate limit config for general module (1 endpoint)
 * ```
 */
export function writeRateLimitConfig(
  limits: EndpointLimits,
  moduleName: string,
  yamlFileName: string
): void {
  // Construct output path
  const outputPath = `src/config/${moduleName}-rate-limits.ts`;

  // Ensure directory exists
  ensureDirectoryExists(outputPath);

  // Generate code
  const code = generateRateLimitConfigCode(limits, moduleName, yamlFileName);

  // Write to file
  writeFileSync(outputPath, code, 'utf8');

  // Log success
  const endpointCount = Object.keys(limits).length;
  process.stdout.write(
    `✓ Generated rate limit config for ${moduleName} module (${String(endpointCount)} ${endpointCount === 1 ? 'endpoint' : 'endpoints'}) → ${outputPath}\n`
  );
}

/**
 * Ensures directory exists by creating it recursively.
 *
 * @param filePath - Full file path
 *
 * @example
 * ```typescript
 * ensureDirectoryExists('src/config/general-rate-limits.ts');
 * // Creates: src/, src/config/
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
 * Gets output file path for rate limit config.
 *
 * @param moduleName - Module name
 * @returns Full file path
 *
 * @example
 * ```typescript
 * getRateLimitConfigFilePath('general')
 * // Returns: 'src/config/general-rate-limits.ts'
 * ```
 */
export function getRateLimitConfigFilePath(moduleName: string): string {
  return `src/config/${moduleName}-rate-limits.ts`;
}

/**
 * Validates rate limit configuration before writing.
 *
 * Performs basic sanity checks on the limits object.
 *
 * @param limits - Endpoint limits to validate
 * @throws Error if validation fails
 *
 * @example
 * ```typescript
 * validateRateLimitConfig({
 *   'module.method': { requestsPerMinute: 10, burstLimit: 5 }
 * }); // OK
 *
 * validateRateLimitConfig({}); // Throws: Rate limit config is empty
 * ```
 */
export function validateRateLimitConfig(limits: EndpointLimits): void {
  if (Object.keys(limits).length === 0) {
    throw new Error('Rate limit config is empty');
  }

  for (const [key, config] of Object.entries(limits)) {
    // Validate endpoint key format
    if (!key.includes('.')) {
      throw new Error(
        `Invalid endpoint key '${key}': must be in format 'module.method'`
      );
    }

    // Validate requestsPerMinute
    if (
      typeof config.requestsPerMinute !== 'number' ||
      config.requestsPerMinute <= 0
    ) {
      throw new Error(
        `Invalid requestsPerMinute for '${key}': must be positive number`
      );
    }

    // Validate intervalSeconds if present
    if (
      config.intervalSeconds !== undefined &&
      (typeof config.intervalSeconds !== 'number' ||
        config.intervalSeconds <= 0)
    ) {
      throw new Error(
        `Invalid intervalSeconds for '${key}': must be positive number`
      );
    }

    // Validate burstLimit if present
    if (
      config.burstLimit !== undefined &&
      (typeof config.burstLimit !== 'number' || config.burstLimit <= 0)
    ) {
      throw new Error(
        `Invalid burstLimit for '${key}': must be positive number`
      );
    }
  }
}

/**
 * Writes rate limit configuration with validation.
 *
 * Validates limits before writing to catch generation errors.
 *
 * @param limits - Endpoint limits mapping
 * @param moduleName - Module name
 * @param yamlFileName - Source YAML file name
 * @throws Error if validation fails
 *
 * @example
 * ```typescript
 * writeRateLimitConfigWithValidation(limits, 'general', '01-general.yaml');
 * // Validates, then writes to src/config/general-rate-limits.ts
 * ```
 */
export function writeRateLimitConfigWithValidation(
  limits: EndpointLimits,
  moduleName: string,
  yamlFileName: string
): void {
  // Validate before writing
  validateRateLimitConfig(limits);

  // Write to file
  writeRateLimitConfig(limits, moduleName, yamlFileName);
}
