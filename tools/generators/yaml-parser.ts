/**
 * OpenAPI YAML Parser
 *
 * Parses OpenAPI 3.0.1 YAML specifications and extracts schema definitions.
 *
 * Context7 Reference: /nodeca/js-yaml - "parsing yaml files, load function"
 * @see {@link https://github.com/nodeca/js-yaml}
 */

import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

/**
 * OpenAPI 3.0.1 Specification structure
 */
export interface OpenAPISpec {
  openapi: string;
  info: {
    title: string;
    version: string;
    description?: string;
    'x-file-name'?: string;
  };
  servers?: {
    url: string;
    description?: string;
  }[];
  paths?: Record<string, PathItem>;
  components?: {
    schemas?: Record<string, SchemaObject>;
    securitySchemes?: Record<string, unknown>;
  };
}

/**
 * OpenAPI Path Item (endpoint definition)
 */
export interface PathItem {
  get?: OperationObject;
  post?: OperationObject;
  put?: OperationObject;
  patch?: OperationObject;
  delete?: OperationObject;
  servers?: {
    url: string;
    description?: string;
  }[];
}

/**
 * OpenAPI Operation Object (HTTP method definition)
 */
export interface OperationObject {
  operationId?: string;
  summary?: string;
  description?: string;
  parameters?: ParameterObject[];
  requestBody?: RequestBodyObject;
  responses?: Record<string, ResponseObject>;
  externalDocs?: {
    url: string;
    description?: string;
  };
}

/**
 * OpenAPI Parameter Object
 */
export interface ParameterObject {
  name: string;
  in: 'query' | 'header' | 'path' | 'cookie';
  description?: string;
  required?: boolean;
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
 * OpenAPI Schema Object (type definition)
 *
 * Supports various schema types including primitives, objects, arrays, and references.
 */
export interface SchemaObject {
  type?: 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object';
  format?: string;
  description?: string;
  enum?: (string | number)[];
  items?: SchemaObject;
  properties?: Record<string, SchemaObject>;
  required?: string[];
  $ref?: string;
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  example?: unknown;
  nullable?: boolean;
  default?: unknown;
  additionalProperties?: boolean | SchemaObject;
}

/**
 * Parses OpenAPI YAML specification file
 *
 * Reads a YAML file from the filesystem and parses it into a typed OpenAPISpec object.
 * Validates that the OpenAPI version is 3.0.1 (or compatible 3.x).
 *
 * Context7 Reference: /nodeca/js-yaml - load function with schema option
 *
 * @param filePath - Absolute path to the OpenAPI YAML file
 * @returns Parsed OpenAPI specification
 * @throws {Error} If file cannot be read or parsed
 * @throws {Error} If OpenAPI version is not 3.x
 *
 * @example
 * ```typescript
 * const spec = parseOpenAPISpec('./wildberries_api_doc/01-general.yaml');
 * console.log(spec.info.title); // "General API"
 * ```
 */
export function parseOpenAPISpec(filePath: string): OpenAPISpec {
  try {
    // Read file contents
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const fileContents = readFileSync(filePath, 'utf8');

    // Parse YAML using js-yaml with safe schema (DEFAULT_SCHEMA)
    // Note: yaml.load returns unknown type, requires validation before use
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument
    const parsedUnknown = yaml.load(fileContents, {
      filename: filePath,
      schema: yaml.DEFAULT_SCHEMA,
      json: false, // Strict YAML parsing
    });

    // Type guard: validate structure before casting
    if (
      !parsedUnknown ||
      typeof parsedUnknown !== 'object' ||
      !('openapi' in parsedUnknown)
    ) {
      throw new Error(`Invalid OpenAPI specification structure in ${filePath}`);
    }

    const parsed = parsedUnknown as OpenAPISpec;

    // Validate OpenAPI version
    if (!parsed.openapi) {
      throw new Error(`Missing 'openapi' field in ${filePath}`);
    }

    if (!parsed.openapi.startsWith('3.')) {
      throw new Error(
        `Unsupported OpenAPI version ${parsed.openapi} in ${filePath}. Expected 3.x`
      );
    }

    return parsed;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse OpenAPI spec from ${filePath}: ${error.message}`);
    }
    throw new Error(`Failed to parse OpenAPI spec from ${filePath}: Unknown error`);
  }
}

/**
 * Extracts schema definitions from OpenAPI specification
 *
 * Returns the `components.schemas` section of an OpenAPI spec, which contains
 * all reusable schema definitions (data models).
 *
 * @param spec - Parsed OpenAPI specification
 * @returns Record of schema definitions (empty object if no schemas defined)
 *
 * @example
 * ```typescript
 * const spec = parseOpenAPISpec('./api.yaml');
 * const schemas = extractSchemas(spec);
 * console.log(Object.keys(schemas)); // ['User', 'Product', 'Order']
 * ```
 */
export function extractSchemas(spec: OpenAPISpec): Record<string, SchemaObject> {
  return spec.components?.schemas ?? {};
}

/**
 * Gets module name from OpenAPI specification
 *
 * Extracts a module identifier from the spec's info section, using
 * the custom `x-file-name` field if present, otherwise falling back
 * to the spec version.
 *
 * @param spec - Parsed OpenAPI specification
 * @returns Module name for generated types (e.g., "general", "products")
 *
 * @example
 * ```typescript
 * const spec = parseOpenAPISpec('./01-general.yaml');
 * const moduleName = getModuleName(spec); // "general"
 * ```
 */
export function getModuleName(spec: OpenAPISpec): string {
  return spec.info['x-file-name'] ?? spec.info.version.replace(/\./g, '_');
}

/**
 * Validates schema object has valid structure
 *
 * Checks that a schema object has at least one of: type, $ref, allOf, oneOf, anyOf.
 * Used for defensive validation during code generation.
 *
 * @param schema - Schema object to validate
 * @returns True if schema is structurally valid
 */
export function isValidSchema(schema: SchemaObject): boolean {
  return !!(schema.type ?? schema.$ref ?? schema.allOf ?? schema.oneOf ?? schema.anyOf);
}
