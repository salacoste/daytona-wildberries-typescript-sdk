/**
 * Module Method Generator
 *
 * Generates complete TypeScript method implementations from OpenAPI operations.
 * Orchestrates all sub-generators to create methods with JSDoc, parameters, and BaseClient delegation.
 *
 * @module module-method-generator
 */

import type { ParsedOperation, ServerObject } from './path-parser.js';
import { generateMethodName } from './method-name-generator.js';
import { extractParameters, generateParameterSignature } from './parameter-extractor.js';
import { extractResponseType } from './response-type-mapper.js';
import { generateMethodJSDoc } from './method-jsdoc-generator.js';
import { getFullEndpointUrl } from './base-url-detector.js';

/**
 * Generated method with all components
 */
export interface GeneratedMethod {
  /** Method name (camelCase) */
  name: string;
  /** Complete method code (JSDoc + signature + body) */
  code: string;
  /** HTTP method (get, post, put, patch, delete) */
  httpMethod: string;
  /** Full endpoint URL */
  endpointUrl: string;
  /** Return type */
  returnType: string;
}

/**
 * Generates complete TypeScript method from OpenAPI operation
 *
 * **Orchestration Flow:**
 * 1. Generate method name (from operationId or path)
 * 2. Extract parameters (path, query, body)
 * 3. Extract response type
 * 4. Generate JSDoc comment
 * 5. Detect base URL and construct full endpoint
 * 6. Generate method signature
 * 7. Generate method body (BaseClient delegation)
 * 8. Combine all parts
 *
 * @param operation - Parsed OpenAPI operation
 * @param specServers - Spec-level servers (for base URL fallback)
 * @returns Generated method with all components
 *
 * @example
 * ```typescript
 * const method = generateMethod(
 *   { path: '/ping', method: 'get', summary: 'Health check', ... },
 *   [{ url: 'https://common-api.wildberries.ru' }]
 * );
 *
 * console.log(method.code);
 * // /**
 * //  * Health check
 * //  * @returns Health check response
 * //  * ...
 * //  *\/
 * // async ping(): Promise<PingResponse> {
 * //   return this.client.get<PingResponse>('https://common-api.wildberries.ru/ping');
 * // }
 * ```
 */
export function generateMethod(
  operation: ParsedOperation,
  specServers: ServerObject[] = []
): GeneratedMethod {
  // Step 1: Generate method name
  const methodName = generateMethodName(operation);

  // Step 2: Extract parameters
  const parameters = extractParameters(operation);

  // Step 3: Extract response type
  const returnType = extractResponseType(operation);

  // Step 4: Generate JSDoc
  const jsdoc = generateMethodJSDoc(operation, parameters, methodName, returnType);

  // Step 5: Detect full endpoint URL
  const endpointUrl = getFullEndpointUrl(operation, specServers);

  // Step 6: Generate parameter signature
  const paramSignature = generateParameterSignature(parameters);

  // Step 7: Generate method body
  const methodBody = generateMethodBody(operation, parameters, returnType, endpointUrl);

  // Step 8: Combine all parts
  const signature = `async ${methodName}(${paramSignature}): ${returnType}`;

  const code = `${jsdoc}\n${signature} {\n${methodBody}\n}`;

  return {
    name: methodName,
    code,
    httpMethod: operation.method,
    endpointUrl,
    returnType,
  };
}

/**
 * Extracts generic type from Promise<T>
 *
 * Properly handles nested angle brackets like Promise<Record<string, never>>
 *
 * @param returnType - Return type string (e.g., "Promise<Record<string, never>>")
 * @returns Generic type without Promise wrapper
 *
 * @example
 * ```typescript
 * extractGenericType('Promise<string>') // 'string'
 * extractGenericType('Promise<Record<string, never>>') // 'Record<string, never>'
 * ```
 */
function extractGenericType(returnType: string): string {
  // Remove 'Promise<' prefix
  if (!returnType.startsWith('Promise<')) {
    return returnType;
  }

  const withoutPromise = returnType.slice(8); // Remove 'Promise<'

  // Find matching closing bracket by counting angle brackets
  let depth = 1;
  let endIndex = 0;

  for (let i = 0; i < withoutPromise.length; i++) {
    if (withoutPromise[i] === '<') {
      depth++;
    } else if (withoutPromise[i] === '>') {
      depth--;
      if (depth === 0) {
        endIndex = i;
        break;
      }
    }
  }

  return withoutPromise.slice(0, endIndex);
}

/**
 * Generates method body with BaseClient delegation
 *
 * Determines correct BaseClient method (get, post, put, patch, delete)
 * and passes appropriate parameters.
 *
 * @param operation - Parsed operation
 * @param parameters - Method parameters
 * @param returnType - Return type
 * @param endpointUrl - Full endpoint URL
 * @returns Method body code
 *
 * @example
 * ```typescript
 * // GET with no parameters
 * generateMethodBody({ method: 'get', ... }, [], 'Promise<PingResponse>', 'https://...')
 * // Returns: "  return this.client.get<PingResponse>('https://...');"
 *
 * // POST with body
 * generateMethodBody({ method: 'post', ... }, [{ name: 'data', location: 'body', ... }], 'Promise<Response>', 'https://...')
 * // Returns: "  return this.client.post<Response>('https://...', data);"
 * ```
 */
export function generateMethodBody(
  operation: ParsedOperation,
  parameters: MethodParameter[],
  returnType: string,
  endpointUrl: string
): string {
  const httpMethod: string = operation.method.toLowerCase();

  // Extract generic type from Promise<T> by properly handling nested angle brackets
  const genericType: string = extractGenericType(returnType);

  // Substitute path parameters in URL
  let finalUrl = endpointUrl;
  const pathParams = parameters.filter((p) => p.location === 'path');
  for (const param of pathParams) {
    // Replace {paramName} with ${paramName} for template literal
    // TypeScript automatically converts numbers to strings in template literals
    finalUrl = finalUrl.replace(`{${param.name}}`, `\${${param.name}}`);
  }

  // Use template literal if path params exist
  const urlExpression = pathParams.length > 0 ? `\`${finalUrl}\`` : `'${finalUrl}'`;

  // Find body parameter (for POST/PUT/PATCH)
  const bodyParam = parameters.find((p) => p.location === 'body');

  // Find query parameters (options object)
  const queryParam = parameters.find((p) => p.location === 'query');

  // Build BaseClient method call
  const lines: string[] = [];

  // Handle void return type specially (can't be used as generic argument)
  const isVoid = genericType === 'void';
  const genericArg = isVoid ? '' : `<${genericType}>`;

  // Determine method call based on HTTP method and parameters
  if (httpMethod === 'get') {
    // GET: no body, optional query params
    if (queryParam) {
      const paramName: string = queryParam.name;
      lines.push(
        `  return this.client.${httpMethod}${genericArg}(${urlExpression}, { params: ${paramName} });`
      );
    } else {
      lines.push(`  return this.client.${httpMethod}${genericArg}(${urlExpression});`);
    }
  } else if (httpMethod === 'delete') {
    // DELETE: can have body (RFC allows it), optional query params
    const dataArg: string | undefined = bodyParam ? bodyParam.name : undefined;

    if (queryParam && dataArg) {
      const paramName: string = queryParam.name;
      lines.push(
        `  return this.client.${httpMethod}${genericArg}(${urlExpression}, ${dataArg}, { params: ${paramName} });`
      );
    } else if (queryParam) {
      const paramName: string = queryParam.name;
      lines.push(
        `  return this.client.${httpMethod}${genericArg}(${urlExpression}, { params: ${paramName} });`
      );
    } else if (dataArg) {
      lines.push(`  return this.client.${httpMethod}${genericArg}(${urlExpression}, ${dataArg});`);
    } else {
      lines.push(`  return this.client.${httpMethod}${genericArg}(${urlExpression});`);
    }
  } else {
    // POST/PUT/PATCH: with body
    const dataArg: string = bodyParam ? bodyParam.name : 'undefined';

    if (queryParam) {
      const paramName: string = queryParam.name;
      lines.push(
        `  return this.client.${httpMethod}${genericArg}(${urlExpression}, ${dataArg}, { params: ${paramName} });`
      );
    } else {
      lines.push(
        `  return this.client.${httpMethod}${genericArg}(${urlExpression}, ${dataArg});`
      );
    }
  }

  return lines.join('\n');
}

/**
 * Method parameter type (imported from parameter-extractor)
 */
type MethodParameter = import('./parameter-extractor.js').MethodParameter;
