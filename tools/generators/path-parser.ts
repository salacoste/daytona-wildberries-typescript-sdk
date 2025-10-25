/**
 * OpenAPI Path Parser
 *
 * Parses OpenAPI `paths` section to extract operations for code generation.
 * Each path can have multiple HTTP methods (GET, POST, PUT, PATCH, DELETE).
 *
 * @module path-parser
 */

/**
 * Parsed operation extracted from OpenAPI path
 */
export interface ParsedOperation {
  /** URL path (e.g., '/ping', '/api/v1/news') */
  path: string;
  /** HTTP method */
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  /** Operation ID from OpenAPI (optional) */
  operationId?: string;
  /** Summary from OpenAPI */
  summary?: string;
  /** Description from OpenAPI */
  description?: string;
  /** Parameters (query, path, header) */
  parameters?: ParameterObject[];
  /** Request body schema */
  requestBody?: RequestBodyObject;
  /** Response schemas by status code */
  responses: Record<string, ResponseObject>;
  /** Path-level server configuration */
  servers?: ServerObject[];
  /** External documentation link */
  externalDocs?: ExternalDocsObject;
  /** Tags for categorization */
  tags?: string[];
}

/**
 * OpenAPI Parameter Object
 */
export interface ParameterObject {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  description?: string;
  required?: boolean;
  deprecated?: boolean;
  schema?: SchemaObject;
}

/**
 * OpenAPI Request Body Object
 */
export interface RequestBodyObject {
  description?: string;
  required?: boolean;
  content?: Record<string, { schema?: SchemaObject }>;
}

/**
 * OpenAPI Response Object
 */
export interface ResponseObject {
  description?: string;
  content?: Record<string, { schema?: SchemaObject }>;
}

/**
 * OpenAPI Server Object
 */
export interface ServerObject {
  url: string;
  description?: string;
  variables?: Record<string, { default: string; description?: string }>;
}

/**
 * OpenAPI External Documentation Object
 */
export interface ExternalDocsObject {
  description?: string;
  url: string;
}

/**
 * OpenAPI Schema Object (simplified)
 */
export interface SchemaObject {
  type?: string;
  format?: string;
  description?: string;
  enum?: unknown[];
  properties?: Record<string, SchemaObject>;
  required?: string[];
  items?: SchemaObject;
  $ref?: string;
  [key: string]: unknown;
}

/**
 * OpenAPI Path Item Object
 */
export interface PathItem {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  patch?: OperationObject;
  delete?: OperationObject;
  servers?: ServerObject[];
  parameters?: ParameterObject[];
}

/**
 * OpenAPI Operation Object
 */
export interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  tags?: string[];
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses: Record<string, ResponseObject>;
  externalDocs?: ExternalDocsObject;
}

/**
 * OpenAPI Paths Object
 */
export type PathsObject = Record<string, PathItem>;

/**
 * Supported HTTP methods for parsing
 */
const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

/**
 * Parses OpenAPI paths section to extract all operations
 *
 * Iterates through each path and HTTP method to create ParsedOperation objects.
 * Handles missing fields gracefully by providing sensible defaults.
 *
 * @param paths - OpenAPI paths object
 * @returns Array of parsed operations
 *
 * @example
 * ```typescript
 * const spec = parseOpenAPISpec('01-general.yaml');
 * const operations = parsePaths(spec.paths);
 * // operations[0] = { path: '/ping', method: 'get', summary: 'Health check', ... }
 * ```
 */
export function parsePaths(paths: Record<string, PathItem>): ParsedOperation[] {
  const operations: ParsedOperation[] = [];

  for (const [path, pathItem] of Object.entries(paths)) {
    // Skip if path item is invalid (should not happen with valid OpenAPI)
    if (typeof pathItem !== 'object') {
      continue;
    }

    // Extract path-level servers and parameters
    const pathServers = pathItem.servers;
    const pathParameters = pathItem.parameters;

    // Parse each HTTP method
    for (const method of HTTP_METHODS) {
      const operation = pathItem[method];

      if (!operation) {
        continue; // Skip if method not defined for this path
      }

      // Merge path-level and operation-level parameters (both are optional in OpenAPI)
      const allParameters = [
        ...(pathParameters ?? []),
        ...(operation.parameters ?? []),
      ];

      // Create parsed operation
      const parsedOperation: ParsedOperation = {
        path,
        method,
        operationId: operation.operationId,
        summary: operation.summary,
        description: operation.description,
        parameters: allParameters.length > 0 ? allParameters : undefined,
        requestBody: operation.requestBody,
        responses: operation.responses,
        servers: pathServers,
        externalDocs: operation.externalDocs,
        tags: operation.tags,
      };

      operations.push(parsedOperation);
    }
  }

  return operations;
}

/**
 * Validates that a parsed operation has required fields
 *
 * @param operation - Parsed operation to validate
 * @returns True if operation is valid
 */
export function isValidOperation(operation: ParsedOperation): boolean {
  return (
    operation.path.length > 0 &&
    operation.method.length > 0 &&
    Object.keys(operation.responses).length > 0
  );
}

/**
 * Gets operation identifier for logging/debugging
 *
 * @param operation - Parsed operation
 * @returns Human-readable operation identifier
 *
 * @example
 * ```typescript
 * getOperationIdentifier({ path: '/ping', method: 'get', ... })
 * // Returns: 'GET /ping'
 * ```
 */
export function getOperationIdentifier(operation: ParsedOperation): string {
  return `${operation.method.toUpperCase()} ${operation.path}`;
}
