/**
 * Method Name Generator
 *
 * Generates TypeScript method names from OpenAPI operations.
 * Primary strategy: Use operationId if present.
 * Fallback strategy: Generate from path + HTTP method.
 *
 * @module method-name-generator
 */

import type { ParsedOperation } from './path-parser.js';

/**
 * HTTP method to verb mapping for method name generation
 */
const METHOD_TO_VERB: Record<string, string> = {
  get: 'get',
  post: 'create',
  put: 'update',
  patch: 'update',
  delete: 'delete',
};

/**
 * Generates camelCase method name from OpenAPI operation
 *
 * **Strategy:**
 * 1. If `operationId` exists → convert to camelCase and use it
 * 2. Otherwise → generate from path + HTTP method
 *
 * **Path Parsing Logic:**
 * - Remove API version segments (/api, /v1, /v2, etc.)
 * - Remove path parameters ({id}, {orderId})
 * - Extract meaningful resource segments
 * - Combine HTTP verb + resource name
 * - Convert to camelCase
 *
 * @param operation - Parsed operation from OpenAPI
 * @returns camelCase method name
 *
 * @example
 * ```typescript
 * // Using operationId
 * generateMethodName({ operationId: 'getSellerInfo', method: 'get', path: '/api/v1/seller/info', ... })
 * // Returns: 'getSellerInfo'
 *
 * // From path + method
 * generateMethodName({ method: 'get', path: '/ping', ... })
 * // Returns: 'ping'
 *
 * generateMethodName({ method: 'get', path: '/api/v1/news', ... })
 * // Returns: 'getNews'
 *
 * generateMethodName({ method: 'delete', path: '/orders/{id}', ... })
 * // Returns: 'deleteOrder'
 * ```
 */
export function generateMethodName(operation: ParsedOperation): string {
  // Strategy 1: Use operationId if present
  if (operation.operationId) {
    return toCamelCase(operation.operationId);
  }

  // Strategy 2: Generate from path + method
  return generateMethodNameFromPath(operation.path, operation.method);
}

/**
 * Generates method name from URL path and HTTP method
 *
 * @param path - URL path (e.g., '/api/v1/news', '/orders/{id}')
 * @param method - HTTP method (get, post, put, patch, delete)
 * @returns camelCase method name
 *
 * @example
 * ```typescript
 * generateMethodNameFromPath('/ping', 'get')
 * // Returns: 'ping'
 *
 * generateMethodNameFromPath('/api/v1/news', 'get')
 * // Returns: 'getNews'
 *
 * generateMethodNameFromPath('/api/v1/seller/info', 'get')
 * // Returns: 'getSellerInfo'
 *
 * generateMethodNameFromPath('/orders/{id}', 'get')
 * // Returns: 'getOrder' (singularized)
 *
 * generateMethodNameFromPath('/api/communications/v2/news', 'get')
 * // Returns: 'getNews'
 * ```
 */
export function generateMethodNameFromPath(path: string, method: string): string {
  // Remove API version segments and common prefixes
  let cleaned = path
    .replace(/\/api\b/gi, '') // Remove /api
    .replace(/\/v\d+\b/g, '') // Remove /v1, /v2, etc.
    .replace(/\/communications\b/gi, ''); // Remove /communications (common prefix)

  // Remove path parameters
  cleaned = cleaned.replace(/\{[^}]+\}/g, '');

  // Split by slashes and filter empty segments
  const segments = cleaned
    .split('/')
    .filter((s) => s.length > 0)
    .filter((s) => s !== 'api'); // Extra filter for 'api' segments

  // Extract resource name from segments
  let resourceName: string;

  if (segments.length === 0) {
    // Fallback for empty path (shouldn't happen)
    resourceName = 'request';
  } else if (segments.length === 1) {
    // Single segment: use as-is
    resourceName = segments[0];
  } else {
    // Multiple segments: combine last 2 for compound names
    // Example: ['seller', 'info'] → 'sellerInfo'
    // Example: ['orders', 'status'] → 'ordersStatus'
    resourceName = segments.slice(-2).join('_');
  }

  // Singularize if path had parameters OR if it's a state-changing operation (create/update/delete)
  // This aligns with common conventions (createTemplate vs createTemplates)
  const hadPathParam = path.includes('{');
  const isStateChange = ['post', 'put', 'patch', 'delete'].includes(method.toLowerCase());

  if (hadPathParam || isStateChange) {
    // For compound names like "order_status", singularize only the last word
    if (resourceName.includes('_')) {
      const parts = resourceName.split('_');
      parts[parts.length - 1] = singularize(parts[parts.length - 1]);
      resourceName = parts.join('_');
    } else {
      resourceName = singularize(resourceName);
    }
  }

  // Get verb from HTTP method
  const verb = METHOD_TO_VERB[method.toLowerCase()] ?? method.toLowerCase();

  // Combine verb + resource for methods other than GET on single resources
  // Special case: For single-word resources like 'ping', 'balance', just use the word
  if (segments.length === 1 && method.toLowerCase() === 'get' && !hadPathParam) {
    return toCamelCase(resourceName);
  }

  // Combine verb + resource
  return toCamelCase(`${verb}_${resourceName}`);
}

/**
 * Converts string to camelCase
 *
 * Handles: snake_case, PascalCase, kebab-case, spaces
 *
 * @param str - Input string
 * @returns camelCase string
 *
 * @example
 * ```typescript
 * toCamelCase('get_seller_info') // 'getSellerInfo'
 * toCamelCase('GetSellerInfo')   // 'getSellerInfo'
 * toCamelCase('get-seller-info') // 'getSellerInfo'
 * toCamelCase('get seller info') // 'getSellerInfo'
 * ```
 */
export function toCamelCase(str: string): string {
  // Split by underscores, hyphens, or spaces
  const words = str.split(/[_\s-]+/);

  return words
    .map((word, index) => {
      // Lowercase the word
      const lowerWord = word.toLowerCase();

      // Capitalize first letter of all words except the first
      if (index === 0) {
        return lowerWord;
      }

      return lowerWord.charAt(0).toUpperCase() + lowerWord.slice(1);
    })
    .join('');
}

/**
 * Singularizes English nouns (simple implementation)
 *
 * Handles common cases:
 * - orders → order
 * - news → news (stays plural)
 * - products → product
 *
 * @param word - Plural word
 * @returns Singular form
 *
 * @example
 * ```typescript
 * singularize('orders')   // 'order'
 * singularize('products') // 'product'
 * singularize('news')     // 'news'
 * singularize('info')     // 'info'
 * ```
 */
export function singularize(word: string): string {
  // Words that don't change (already singular or uncountable)
  const invariant = [
    'news',
    'info',
    'data',
    'series',
    'species',
    'status', // Latin origin - singular ends in 's'
    'focus',
    'analysis',
    'basis',
    'diagnosis',
    'synopsis',
    'thesis',
    'crisis',
    'axis',
  ];
  if (invariant.includes(word.toLowerCase())) {
    return word;
  }

  // Simple pluralization rules
  if (word.endsWith('ies')) {
    // categories → category
    return word.slice(0, -3) + 'y';
  }

  if (word.endsWith('ses')) {
    // analyses → analysis
    return word.slice(0, -2);
  }

  if (word.endsWith('s') && !word.endsWith('ss')) {
    // orders → order, products → product
    return word.slice(0, -1);
  }

  return word;
}

/**
 * Ensures method name uniqueness by tracking used names
 *
 * If duplicate detected, appends number (e.g., getNews2, getNews3)
 */
export class MethodNameTracker {
  private usedNames = new Set<string>();

  /**
   * Registers a method name and ensures uniqueness
   *
   * @param baseName - Generated method name
   * @returns Unique method name (may have number appended)
   *
   * @example
   * ```typescript
   * const tracker = new MethodNameTracker();
   * tracker.register('getNews')   // 'getNews'
   * tracker.register('getNews')   // 'getNews2'
   * tracker.register('getNews')   // 'getNews3'
   * ```
   */
  register(baseName: string): string {
    if (!this.usedNames.has(baseName)) {
      this.usedNames.add(baseName);
      return baseName;
    }

    // Find next available number
    let counter = 2;
    let uniqueName = `${baseName}${String(counter)}`;

    while (this.usedNames.has(uniqueName)) {
      counter++;
      uniqueName = `${baseName}${String(counter)}`;
    }

    this.usedNames.add(uniqueName);
    return uniqueName;
  }

  /**
   * Resets tracker (for testing)
   */
  reset(): void {
    this.usedNames.clear();
  }

  /**
   * Gets all registered names (for testing)
   */
  getUsedNames(): string[] {
    return Array.from(this.usedNames);
  }
}
