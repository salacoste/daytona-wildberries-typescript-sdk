/**
 * Parameter Extractor
 *
 * Extracts method parameters from OpenAPI operation and generates TypeScript parameter signatures.
 * Handles query parameters, path parameters, and request body.
 *
 * @module parameter-extractor
 */

import type { ParsedOperation } from './path-parser.js';
import { mapOpenAPIType, sanitizeObjectKey } from './type-mapper.js';
import type { SchemaObject as TypeMapperSchema } from './yaml-parser.js';

/**
 * Method parameter with TypeScript type information
 */
export interface MethodParameter {
  /** Parameter name */
  name: string;
  /** TypeScript type */
  type: string;
  /** Whether parameter is required */
  required: boolean;
  /** Parameter description from OpenAPI */
  description?: string;
  /** Parameter location */
  location: 'query' | 'path' | 'header' | 'body';
}

/**
 * Extracts all parameters from an OpenAPI operation
 *
 * Groups parameters by location (path, query, body) and generates proper TypeScript signatures.
 *
 * **Parameter Priority:**
 * 1. Path parameters (required, in URL path)
 * 2. Query parameters (optional, grouped into options object)
 * 3. Request body (typed data parameter)
 *
 * @param operation - Parsed OpenAPI operation
 * @param schemas - All schemas from OpenAPI spec (for $ref resolution)
 * @returns Array of method parameters with type information
 *
 * @example
 * ```typescript
 * // Operation with query params only
 * extractParameters({ parameters: [{ name: 'from', in: 'query', schema: { type: 'string' } }], ... })
 * // Returns: [{ name: 'options', type: '{ from?: string }', location: 'query', required: false }]
 *
 * // Operation with path param + body
 * extractParameters({ parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], requestBody: { ... }, ... })
 * // Returns: [
 * //   { name: 'id', type: 'string', location: 'path', required: true },
 * //   { name: 'data', type: 'CreateProductRequest', location: 'body', required: true }
 * // ]
 * ```
 */
export function extractParameters(
  operation: ParsedOperation,
  schemas?: Record<string, unknown>
): MethodParameter[] {
  const parameters: MethodParameter[] = [];

  // Extract path parameters (always required, appear first)
  const pathParams = extractPathParameters(operation);
  parameters.push(...pathParams);

  // Extract query parameters (optional, grouped into options object)
  const queryParams = extractQueryParameters(operation);

  // Extract request body (typed data parameter)
  const bodyParam = extractRequestBody(operation, schemas);

  // TypeScript rule: required parameters must come before optional parameters
  // Order: path (required) → body (if required) → query (optional) → body (if optional)
  if (bodyParam?.required) {
    parameters.push(bodyParam);
  }

  if (queryParams) {
    parameters.push(queryParams);
  }

  if (bodyParam && !bodyParam.required) {
    parameters.push(bodyParam);
  }

  return parameters;
}

/**
 * Extracts path parameters from operation
 *
 * Path parameters are always required and appear as individual method parameters.
 *
 * @param operation - Parsed operation
 * @returns Array of path parameters
 *
 * @example
 * ```typescript
 * // /orders/{id}
 * extractPathParameters({ parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }], ... })
 * // Returns: [{ name: 'id', type: 'string', required: true, location: 'path' }]
 * ```
 */
export function extractPathParameters(operation: ParsedOperation): MethodParameter[] {
  if (!operation.parameters) {
    return [];
  }

  return operation.parameters
    .filter((param) => param.in === 'path')
    .map((param) => ({
      name: param.name,
      type: param.schema ? mapOpenAPIType(param.schema as TypeMapperSchema, {}, true) : 'string',
      required: true, // Path parameters are always required
      description: param.description,
      location: 'path' as const,
    }));
}

/**
 * Extracts query parameters and groups them into options object
 *
 * All query parameters are grouped into a single optional `options` parameter.
 *
 * @param operation - Parsed operation
 * @returns Single MethodParameter representing options object, or undefined if no query params
 *
 * @example
 * ```typescript
 * // ?from=2024-01-01&limit=10
 * extractQueryParameters({ parameters: [
 *   { name: 'from', in: 'query', schema: { type: 'string' } },
 *   { name: 'limit', in: 'query', schema: { type: 'integer' } }
 * ], ... })
 * // Returns: { name: 'options', type: '{ from?: string; limit?: number }', required: false, location: 'query' }
 * ```
 */
export function extractQueryParameters(operation: ParsedOperation): MethodParameter | undefined {
  if (!operation.parameters) {
    return undefined;
  }

  const queryParams = operation.parameters.filter((param) => param.in === 'query');

  if (queryParams.length === 0) {
    return undefined;
  }

  // Generate type for options object
  const properties = queryParams.map((param) => {
    const tsType = param.schema ? mapOpenAPIType(param.schema as TypeMapperSchema, {}, true) : 'string';
    const optional = !param.required;
    const optionalMarker = optional ? '?' : '';

    // Sanitize parameter name for TypeScript (handles names like filter[downloadIds])
    const safeName = sanitizeObjectKey(param.name);
    return `${safeName}${optionalMarker}: ${tsType}`;
  });

  const optionsType = `{ ${properties.join('; ')} }`;

  return {
    name: 'options',
    type: optionsType,
    required: false, // Options object is always optional
    description: 'Query parameters',
    location: 'query',
  };
}

/**
 * Extracts request body and generates typed data parameter
 *
 * Request body is typically used for POST/PUT/PATCH operations.
 *
 * @param operation - Parsed operation
 * @param schemas - All schemas for $ref resolution
 * @returns MethodParameter for request body, or undefined if no body
 *
 * @example
 * ```typescript
 * // Request body with schema reference
 * extractRequestBody({
 *   requestBody: {
 *     required: true,
 *     content: {
 *       'application/json': {
 *         schema: { $ref: '#/components/schemas/CreateProductRequest' }
 *       }
 *     }
 *   },
 *   ...
 * })
 * // Returns: { name: 'data', type: 'CreateProductRequest', required: true, location: 'body' }
 * ```
 */
export function extractRequestBody(
  operation: ParsedOperation,
  _schemas?: Record<string, unknown>
): MethodParameter | undefined {
  if (!operation.requestBody) {
    return undefined;
  }

  const { requestBody } = operation;

  // Get schema from application/json content type
  const jsonContent = requestBody.content?.['application/json'];
  if (!jsonContent?.schema) {
    return undefined;
  }

  const schema = jsonContent.schema;

  // Generate TypeScript type from schema (skip comments for inline types)
  const typeName = mapOpenAPIType(schema as TypeMapperSchema, {}, true);

  return {
    name: 'data',
    type: typeName,
    required: requestBody.required ?? false,
    description: requestBody.description ?? 'Request body data',
    location: 'body',
  };
}

/**
 * Generates TypeScript method signature from parameters
 *
 * Creates properly formatted parameter list for method definition.
 *
 * @param parameters - Array of method parameters
 * @returns TypeScript parameter signature string
 *
 * @example
 * ```typescript
 * // No parameters
 * generateParameterSignature([])
 * // Returns: ''
 *
 * // Single path parameter
 * generateParameterSignature([{ name: 'id', type: 'string', required: true, location: 'path' }])
 * // Returns: 'id: string'
 *
 * // Path + query + body
 * generateParameterSignature([
 *   { name: 'id', type: 'string', required: true, location: 'path' },
 *   { name: 'options', type: '{ from?: string }', required: false, location: 'query' },
 *   { name: 'data', type: 'UpdateRequest', required: true, location: 'body' }
 * ])
 * // Returns: 'id: string, options?: { from?: string }, data: UpdateRequest'
 * ```
 */
export function generateParameterSignature(parameters: MethodParameter[]): string {
  if (parameters.length === 0) {
    return '';
  }

  return parameters
    .map((param) => {
      const optionalMarker = !param.required ? '?' : '';
      return `${param.name}${optionalMarker}: ${param.type}`;
    })
    .join(', ');
}

/**
 * Gets list of parameter names for method call
 *
 * Used when calling BaseClient methods to pass parameters.
 *
 * @param parameters - Array of method parameters
 * @returns Comma-separated parameter names
 *
 * @example
 * ```typescript
 * getParameterNames([
 *   { name: 'id', type: 'string', required: true, location: 'path' },
 *   { name: 'options', type: '{ from?: string }', required: false, location: 'query' }
 * ])
 * // Returns: ['id', 'options']
 * ```
 */
export function getParameterNames(parameters: MethodParameter[]): string[] {
  return parameters.map((param) => param.name);
}
