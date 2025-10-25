/**
 * Response Type Mapper
 *
 * Extracts TypeScript return types from OpenAPI response schemas.
 * Handles $ref resolution, arrays, primitives, and void responses.
 *
 * @module response-type-mapper
 */

import type { ParsedOperation, ResponseObject } from './path-parser.js';
import { mapOpenAPIType } from './type-mapper.js';
import type { SchemaObject } from './yaml-parser.js';

/**
 * Response priority order for type extraction
 * Prefer 200 > 201 > 204 > first 2xx response
 */
const RESPONSE_PRIORITY = ['200', '201', '202', '204'];

/**
 * Extracts TypeScript return type from OpenAPI responses
 *
 * **Priority Order:**
 * 1. HTTP 200 (OK) - most common success response
 * 2. HTTP 201 (Created) - for resource creation
 * 3. HTTP 202 (Accepted) - for async operations
 * 4. HTTP 204 (No Content) - returns `void`
 * 5. First 2xx response found
 * 6. `unknown` if no success response
 *
 * All responses are wrapped in `Promise<>` for async methods.
 *
 * @param operation - Parsed OpenAPI operation
 * @returns TypeScript return type (wrapped in Promise)
 *
 * @example
 * ```typescript
 * // 200 response with $ref
 * extractResponseType({ responses: {
 *   '200': { content: { 'application/json': { schema: { $ref: '#/components/schemas/PingResponse' } } } }
 * }})
 * // Returns: 'Promise<PingResponse>'
 *
 * // 200 response with array
 * extractResponseType({ responses: {
 *   '200': { content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/NewsItem' } } } } }
 * }})
 * // Returns: 'Promise<NewsItem[]>'
 *
 * // 204 No Content
 * extractResponseType({ responses: { '204': { description: 'Deleted successfully' } }})
 * // Returns: 'Promise<void>'
 *
 * // No success response
 * extractResponseType({ responses: { '400': { ... }, '500': { ... } }})
 * // Returns: 'Promise<unknown>'
 * ```
 */
export function extractResponseType(operation: ParsedOperation): string {
  const { responses } = operation;

  // Try priority response codes first
  for (const statusCode of RESPONSE_PRIORITY) {
    if (statusCode in responses) {
      const response = responses[statusCode];
      const tsType = extractTypeFromResponse(response, statusCode);
      return `Promise<${tsType}>`;
    }
  }

  // Try any 2xx response
  const successResponse = Object.entries(responses).find(([code]) => {
    const statusNum = Number.parseInt(code, 10);
    return statusNum >= 200 && statusNum < 300;
  });

  if (successResponse) {
    const [statusCode, response] = successResponse;
    const tsType = extractTypeFromResponse(response, statusCode);
    return `Promise<${tsType}>`;
  }

  // No success response found - default to unknown
  return 'Promise<unknown>';
}

/**
 * Extracts TypeScript type from a single response object
 *
 * @param response - OpenAPI response object
 * @param statusCode - HTTP status code (for 204 detection)
 * @returns TypeScript type string
 *
 * @example
 * ```typescript
 * // Response with schema
 * extractTypeFromResponse({ content: { 'application/json': { schema: { type: 'string' } } } }, '200')
 * // Returns: 'string'
 *
 * // 204 No Content
 * extractTypeFromResponse({ description: 'Deleted' }, '204')
 * // Returns: 'void'
 *
 * // No content
 * extractTypeFromResponse({ description: 'Success' }, '200')
 * // Returns: 'unknown'
 * ```
 */
export function extractTypeFromResponse(response: ResponseObject, statusCode: string): string {
  // 204 No Content always returns void
  if (statusCode === '204') {
    return 'void';
  }

  // Get schema from application/json content type
  const jsonContent = response.content?.['application/json'];
  if (!jsonContent?.schema) {
    // No schema - return unknown
    return 'unknown';
  }

  const schema = jsonContent.schema;

  // Use type mapper to generate TypeScript type (skip comments for inline types)
  return mapOpenAPIType(schema as SchemaObject, {}, true);
}

/**
 * Checks if response is void (204 No Content)
 *
 * @param statusCode - HTTP status code
 * @returns True if response should be void
 */
export function isVoidResponse(statusCode: string): boolean {
  return statusCode === '204';
}

/**
 * Gets success response status code from operation
 *
 * Returns the most appropriate success status code for the operation.
 *
 * @param operation - Parsed operation
 * @returns Success status code or undefined
 *
 * @example
 * ```typescript
 * getSuccessStatusCode({ responses: { '200': {...}, '400': {...} }, ... })
 * // Returns: '200'
 *
 * getSuccessStatusCode({ responses: { '201': {...}, '400': {...} }, ... })
 * // Returns: '201'
 * ```
 */
export function getSuccessStatusCode(operation: ParsedOperation): string | undefined {
  const { responses } = operation;

  // Try priority response codes first
  for (const statusCode of RESPONSE_PRIORITY) {
    if (statusCode in responses) {
      return statusCode;
    }
  }

  // Try any 2xx response
  const successCode = Object.keys(responses).find((code) => {
    const statusNum = Number.parseInt(code, 10);
    return statusNum >= 200 && statusNum < 300;
  });

  return successCode;
}
