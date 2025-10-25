/**
 * Base URL Detector
 *
 * Detects and constructs full endpoint URLs from OpenAPI server configurations.
 * Handles path-level and spec-level server objects with variable substitution.
 *
 * @module base-url-detector
 */

import type { ParsedOperation, ServerObject } from './path-parser.js';

/**
 * Detects base URL for an operation
 *
 * **Priority:**
 * 1. Path-level servers (operation.servers)
 * 2. Spec-level servers (fallback)
 * 3. Default Wildberries API URL
 *
 * @param operation - Parsed OpenAPI operation
 * @param specServers - Spec-level server configuration (fallback)
 * @returns Base URL for the operation
 *
 * @example
 * ```typescript
 * // Path-level server
 * detectBaseUrl({ servers: [{ url: 'https://common-api.wildberries.ru' }], ... }, [])
 * // Returns: 'https://common-api.wildberries.ru'
 *
 * // Fallback to spec-level
 * detectBaseUrl({ ... }, [{ url: 'https://api.wildberries.ru' }])
 * // Returns: 'https://api.wildberries.ru'
 *
 * // Default fallback
 * detectBaseUrl({ ... }, [])
 * // Returns: 'https://api.wildberries.ru'
 * ```
 */
export function detectBaseUrl(
  operation: ParsedOperation,
  specServers: ServerObject[] = []
): string {
  // Priority 1: Path-level servers
  if (operation.servers && operation.servers.length > 0) {
    return normalizeServerUrl(operation.servers[0]);
  }

  // Priority 2: Spec-level servers
  if (specServers.length > 0) {
    return normalizeServerUrl(specServers[0]);
  }

  // Priority 3: Default Wildberries API URL
  return 'https://api.wildberries.ru';
}

/**
 * Normalizes server URL by removing trailing slashes and substituting variables
 *
 * @param server - OpenAPI server object
 * @returns Normalized base URL
 *
 * @example
 * ```typescript
 * normalizeServerUrl({ url: 'https://api.example.com/' })
 * // Returns: 'https://api.example.com'
 *
 * normalizeServerUrl({ url: 'https://{env}.example.com', variables: { env: { default: 'api' } } })
 * // Returns: 'https://api.example.com'
 * ```
 */
export function normalizeServerUrl(server: ServerObject): string {
  let url = server.url;

  // Substitute variables with default values
  if (server.variables) {
    for (const [varName, varConfig] of Object.entries(server.variables)) {
      const placeholder = `{${varName}}`;
      url = url.replace(placeholder, varConfig.default);
    }
  }

  // Remove trailing slashes
  url = url.replace(/\/+$/, '');

  return url;
}

/**
 * Constructs full endpoint URL by combining base URL and path
 *
 * @param baseUrl - Base URL from server configuration
 * @param path - URL path from operation
 * @returns Full endpoint URL
 *
 * @example
 * ```typescript
 * constructFullUrl('https://common-api.wildberries.ru', '/ping')
 * // Returns: 'https://common-api.wildberries.ru/ping'
 *
 * constructFullUrl('https://api.wildberries.ru/', '/api/v1/news')
 * // Returns: 'https://api.wildberries.ru/api/v1/news'
 * ```
 */
export function constructFullUrl(baseUrl: string, path: string): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  // Remove trailing slashes from base URL
  const normalizedBase = baseUrl.replace(/\/+$/, '');

  return `${normalizedBase}${normalizedPath}`;
}

/**
 * Gets full endpoint URL for an operation
 *
 * Combines base URL detection with path to create complete endpoint URL.
 *
 * @param operation - Parsed OpenAPI operation
 * @param specServers - Spec-level server configuration
 * @returns Full endpoint URL
 *
 * @example
 * ```typescript
 * getFullEndpointUrl(
 *   { path: '/ping', servers: [{ url: 'https://common-api.wildberries.ru' }], ... },
 *   []
 * )
 * // Returns: 'https://common-api.wildberries.ru/ping'
 * ```
 */
export function getFullEndpointUrl(
  operation: ParsedOperation,
  specServers: ServerObject[] = []
): string {
  const baseUrl = detectBaseUrl(operation, specServers);
  return constructFullUrl(baseUrl, operation.path);
}

/**
 * Extracts domain from URL
 *
 * Useful for grouping operations by API domain.
 *
 * @param url - Full URL
 * @returns Domain name
 *
 * @example
 * ```typescript
 * extractDomain('https://common-api.wildberries.ru/ping')
 * // Returns: 'common-api.wildberries.ru'
 *
 * extractDomain('https://content-api.wildberries.ru/products')
 * // Returns: 'content-api.wildberries.ru'
 * ```
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    // Invalid URL - return empty string
    return '';
  }
}

/**
 * Checks if URL is valid HTTPS
 *
 * Security requirement: All Wildberries API URLs must use HTTPS.
 *
 * @param url - URL to validate
 * @returns True if URL is valid HTTPS
 *
 * @example
 * ```typescript
 * isValidHttpsUrl('https://api.wildberries.ru')  // true
 * isValidHttpsUrl('http://api.wildberries.ru')   // false
 * isValidHttpsUrl('invalid-url')                 // false
 * ```
 */
export function isValidHttpsUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:';
  } catch {
    return false;
  }
}
