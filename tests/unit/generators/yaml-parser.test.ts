/**
 * Unit Tests for YAML Parser
 *
 * Tests OpenAPI YAML parsing including:
 * - YAML file parsing and validation
 * - Schema extraction from components.schemas
 * - Error handling for invalid files
 * - Module name extraction
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  parseOpenAPISpec,
  extractSchemas,
  getModuleName,
  isValidSchema,
} from '../../../tools/generators/yaml-parser.js';
import { writeFileSync, unlinkSync, mkdirSync, rmSync } from 'fs';
import { join } from 'path';
import type { SchemaObject } from '../../../tools/generators/yaml-parser.js';

describe('yaml-parser', () => {
  const testDir = join(process.cwd(), 'tests', 'fixtures', 'yaml-parser');
  const validYamlPath = join(testDir, 'valid-spec.yaml');
  const invalidVersionPath = join(testDir, 'invalid-version.yaml');
  const malformedYamlPath = join(testDir, 'malformed.yaml');
  const noOpenAPIPath = join(testDir, 'no-openapi.yaml');
  const emptySchemaPath = join(testDir, 'empty-schema.yaml');

  beforeAll(() => {
    // Create test fixtures directory
    mkdirSync(testDir, { recursive: true });

    // Valid OpenAPI 3.0.1 spec
    const validSpec = `openapi: 3.0.1
info:
  title: Test API
  version: "1.0.0"
  description: Test specification
  x-file-name: test
servers:
  - url: https://api.example.com
    description: Production server
paths:
  /users:
    get:
      summary: Get users
      responses:
        '200':
          description: Success
components:
  schemas:
    User:
      type: object
      description: User information
      required:
        - id
        - email
      properties:
        id:
          type: integer
          description: User ID
        email:
          type: string
          description: Email address
        name:
          type: string
          description: Full name
    Product:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
  securitySchemes:
    ApiKey:
      type: apiKey
      in: header
      name: Authorization
`;
    writeFileSync(validYamlPath, validSpec, 'utf8');

    // Invalid OpenAPI version
    const invalidVersionSpec = `openapi: 2.0
info:
  title: Old API
  version: "1.0.0"
paths: {}
`;
    writeFileSync(invalidVersionPath, invalidVersionSpec, 'utf8');

    // Malformed YAML
    const malformedSpec = `openapi: 3.0.1
info:
  title: Broken
  version: "1.0.0"
  invalid: [unclosed array
`;
    writeFileSync(malformedYamlPath, malformedSpec, 'utf8');

    // Missing openapi field
    const noOpenAPISpec = `info:
  title: No OpenAPI field
  version: "1.0.0"
paths: {}
`;
    writeFileSync(noOpenAPIPath, noOpenAPISpec, 'utf8');

    // Empty schema spec
    const emptySchemaSpec = `openapi: 3.0.1
info:
  title: Empty Schema API
  version: "1.0.0"
  x-file-name: empty
paths: {}
`;
    writeFileSync(emptySchemaPath, emptySchemaSpec, 'utf8');
  });

  afterAll(() => {
    // Clean up test fixtures
    rmSync(testDir, { recursive: true, force: true });
  });

  describe('parseOpenAPISpec', () => {
    it('should successfully parse valid OpenAPI 3.0.1 spec', () => {
      const spec = parseOpenAPISpec(validYamlPath);

      expect(spec).toBeDefined();
      expect(spec.openapi).toBe('3.0.1');
      expect(spec.info.title).toBe('Test API');
      expect(spec.info.version).toBe('1.0.0');
      expect(spec.info.description).toBe('Test specification');
      expect(spec.info['x-file-name']).toBe('test');
    });

    it('should parse servers array', () => {
      const spec = parseOpenAPISpec(validYamlPath);

      expect(spec.servers).toBeDefined();
      expect(spec.servers).toHaveLength(1);
      expect(spec.servers?.[0].url).toBe('https://api.example.com');
      expect(spec.servers?.[0].description).toBe('Production server');
    });

    it('should parse paths object', () => {
      const spec = parseOpenAPISpec(validYamlPath);

      expect(spec.paths).toBeDefined();
      expect(spec.paths?.['/users']).toBeDefined();
      expect(spec.paths?.['/users'].get).toBeDefined();
      expect(spec.paths?.['/users'].get?.summary).toBe('Get users');
    });

    it('should parse components.schemas', () => {
      const spec = parseOpenAPISpec(validYamlPath);

      expect(spec.components).toBeDefined();
      expect(spec.components?.schemas).toBeDefined();
      expect(Object.keys(spec.components?.schemas ?? {})).toContain('User');
      expect(Object.keys(spec.components?.schemas ?? {})).toContain('Product');
    });

    it('should throw error for unsupported OpenAPI version', () => {
      expect(() => parseOpenAPISpec(invalidVersionPath)).toThrow(
        /Failed to parse OpenAPI spec/
      );
    });

    it('should throw error for malformed YAML', () => {
      expect(() => parseOpenAPISpec(malformedYamlPath)).toThrow(/Failed to parse/);
    });

    it('should throw error for missing openapi field', () => {
      expect(() => parseOpenAPISpec(noOpenAPIPath)).toThrow(/openapi/);
    });

    it('should throw error for non-existent file', () => {
      expect(() => parseOpenAPISpec('/nonexistent/file.yaml')).toThrow();
    });

    it('should accept OpenAPI 3.x versions (3.0.0, 3.0.1, 3.1.0)', () => {
      const spec30 = `openapi: 3.0.0
info:
  title: Test
  version: "1.0"
`;
      const spec301 = `openapi: 3.0.1
info:
  title: Test
  version: "1.0"
`;
      const spec310 = `openapi: 3.1.0
info:
  title: Test
  version: "1.0"
`;

      const path30 = join(testDir, 'spec-3.0.0.yaml');
      const path301 = join(testDir, 'spec-3.0.1.yaml');
      const path310 = join(testDir, 'spec-3.1.0.yaml');

      writeFileSync(path30, spec30, 'utf8');
      writeFileSync(path301, spec301, 'utf8');
      writeFileSync(path310, spec310, 'utf8');

      expect(() => parseOpenAPISpec(path30)).not.toThrow();
      expect(() => parseOpenAPISpec(path301)).not.toThrow();
      expect(() => parseOpenAPISpec(path310)).not.toThrow();

      unlinkSync(path30);
      unlinkSync(path301);
      unlinkSync(path310);
    });
  });

  describe('extractSchemas', () => {
    it('should extract all schemas from spec', () => {
      const spec = parseOpenAPISpec(validYamlPath);
      const schemas = extractSchemas(spec);

      expect(Object.keys(schemas)).toHaveLength(2);
      expect(schemas.User).toBeDefined();
      expect(schemas.Product).toBeDefined();
    });

    it('should extract schema properties correctly', () => {
      const spec = parseOpenAPISpec(validYamlPath);
      const schemas = extractSchemas(spec);

      const userSchema = schemas.User;
      expect(userSchema.type).toBe('object');
      expect(userSchema.description).toBe('User information');
      expect(userSchema.required).toEqual(['id', 'email']);
      expect(userSchema.properties).toBeDefined();
      expect(userSchema.properties?.id).toBeDefined();
      expect(userSchema.properties?.id.type).toBe('integer');
      expect(userSchema.properties?.id.description).toBe('User ID');
    });

    it('should return empty object when no schemas defined', () => {
      const spec = parseOpenAPISpec(emptySchemaPath);
      const schemas = extractSchemas(spec);

      expect(schemas).toEqual({});
      expect(Object.keys(schemas)).toHaveLength(0);
    });

    it('should handle spec without components', () => {
      const spec = parseOpenAPISpec(emptySchemaPath);
      const schemas = extractSchemas(spec);

      expect(schemas).toEqual({});
    });

    it('should extract schema with complex types', () => {
      const complexSpec = `openapi: 3.0.1
info:
  title: Complex API
  version: "1.0"
components:
  schemas:
    ComplexType:
      type: object
      properties:
        tags:
          type: array
          items:
            type: string
        status:
          type: string
          enum: ['active', 'inactive']
        reference:
          $ref: '#/components/schemas/Reference'
    Reference:
      type: object
      properties:
        id:
          type: integer
`;
      const complexPath = join(testDir, 'complex.yaml');
      writeFileSync(complexPath, complexSpec, 'utf8');

      const spec = parseOpenAPISpec(complexPath);
      const schemas = extractSchemas(spec);

      expect(schemas.ComplexType).toBeDefined();
      expect(schemas.ComplexType.properties?.tags.type).toBe('array');
      expect(schemas.ComplexType.properties?.tags.items?.type).toBe('string');
      expect(schemas.ComplexType.properties?.status.enum).toEqual(['active', 'inactive']);
      expect(schemas.ComplexType.properties?.reference.$ref).toContain('Reference');

      unlinkSync(complexPath);
    });
  });

  describe('getModuleName', () => {
    it('should extract module name from x-file-name', () => {
      const spec = parseOpenAPISpec(validYamlPath);
      const moduleName = getModuleName(spec);

      expect(moduleName).toBe('test');
    });

    it('should use version as fallback when x-file-name missing', () => {
      const versionFallbackSpec = `openapi: 3.0.1
info:
  title: Version Fallback API
  version: "1.0.0"
`;
      const versionFallbackPath = join(testDir, 'version-fallback.yaml');
      writeFileSync(versionFallbackPath, versionFallbackSpec, 'utf8');

      const spec = parseOpenAPISpec(versionFallbackPath);
      const moduleName = getModuleName(spec);

      expect(moduleName).toBe('1_0_0'); // Version with dots replaced

      unlinkSync(versionFallbackPath);
    });

    it('should replace dots in version with underscores', () => {
      const versionSpec = `openapi: 3.0.1
info:
  title: Version API
  version: "2.5.1"
`;
      const versionPath = join(testDir, 'version.yaml');
      writeFileSync(versionPath, versionSpec, 'utf8');

      const spec = parseOpenAPISpec(versionPath);
      const moduleName = getModuleName(spec);

      expect(moduleName).toBe('2_5_1');

      unlinkSync(versionPath);
    });

    it('should prefer x-file-name over version', () => {
      const preferenceSpec = `openapi: 3.0.1
info:
  title: Preference API
  version: "1.0.0"
  x-file-name: custom-name
`;
      const preferencePath = join(testDir, 'preference.yaml');
      writeFileSync(preferencePath, preferenceSpec, 'utf8');

      const spec = parseOpenAPISpec(preferencePath);
      const moduleName = getModuleName(spec);

      expect(moduleName).toBe('custom-name');
      expect(moduleName).not.toBe('1_0_0');

      unlinkSync(preferencePath);
    });
  });

  describe('isValidSchema', () => {
    it('should return true for schema with type', () => {
      const schema: SchemaObject = { type: 'string' };
      expect(isValidSchema(schema)).toBe(true);
    });

    it('should return true for schema with $ref', () => {
      const schema: SchemaObject = { $ref: '#/components/schemas/User' };
      expect(isValidSchema(schema)).toBe(true);
    });

    it('should return true for schema with allOf', () => {
      const schema: SchemaObject = { allOf: [{ type: 'object' }] };
      expect(isValidSchema(schema)).toBe(true);
    });

    it('should return true for schema with oneOf', () => {
      const schema: SchemaObject = { oneOf: [{ type: 'string' }, { type: 'number' }] };
      expect(isValidSchema(schema)).toBe(true);
    });

    it('should return true for schema with anyOf', () => {
      const schema: SchemaObject = { anyOf: [{ type: 'string' }, { type: 'boolean' }] };
      expect(isValidSchema(schema)).toBe(true);
    });

    it('should return false for empty schema', () => {
      const schema: SchemaObject = {};
      expect(isValidSchema(schema)).toBe(false);
    });

    it('should return false for schema with only description', () => {
      const schema: SchemaObject = { description: 'Some description' };
      expect(isValidSchema(schema)).toBe(false);
    });

    it('should return false for schema with only example', () => {
      const schema: SchemaObject = { example: { key: 'value' } };
      expect(isValidSchema(schema)).toBe(false);
    });

    it('should return true for schema with multiple valid fields', () => {
      const schema: SchemaObject = {
        type: 'object',
        description: 'Description',
        properties: { id: { type: 'number' } },
      };
      expect(isValidSchema(schema)).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle spec with security schemes but no schemas', () => {
      const securitySpec = `openapi: 3.0.1
info:
  title: Security API
  version: "1.0"
components:
  securitySchemes:
    ApiKey:
      type: apiKey
      in: header
      name: X-API-Key
`;
      const securityPath = join(testDir, 'security.yaml');
      writeFileSync(securityPath, securitySpec, 'utf8');

      const spec = parseOpenAPISpec(securityPath);
      const schemas = extractSchemas(spec);

      expect(schemas).toEqual({});

      unlinkSync(securityPath);
    });

    it('should handle schema with nullable property', () => {
      const nullableSpec = `openapi: 3.0.1
info:
  title: Nullable API
  version: "1.0"
components:
  schemas:
    NullableType:
      type: object
      properties:
        value:
          type: string
          nullable: true
`;
      const nullablePath = join(testDir, 'nullable.yaml');
      writeFileSync(nullablePath, nullableSpec, 'utf8');

      const spec = parseOpenAPISpec(nullablePath);
      const schemas = extractSchemas(spec);

      expect(schemas.NullableType.properties?.value.nullable).toBe(true);

      unlinkSync(nullablePath);
    });

    it('should handle schema with additionalProperties', () => {
      const additionalSpec = `openapi: 3.0.1
info:
  title: Additional API
  version: "1.0"
components:
  schemas:
    DynamicObject:
      type: object
      additionalProperties:
        type: string
`;
      const additionalPath = join(testDir, 'additional.yaml');
      writeFileSync(additionalPath, additionalSpec, 'utf8');

      const spec = parseOpenAPISpec(additionalPath);
      const schemas = extractSchemas(spec);

      expect(schemas.DynamicObject.additionalProperties).toBeDefined();

      unlinkSync(additionalPath);
    });

    it('should handle very large YAML files', () => {
      // Generate a spec with 100 schemas
      const largeSchemas = Array.from({ length: 100 }, (_, i) => `    Schema${i}:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
`).join('\n');

      const largeSpec = `openapi: 3.0.1
info:
  title: Large API
  version: "1.0"
components:
  schemas:
${largeSchemas}
`;
      const largePath = join(testDir, 'large.yaml');
      writeFileSync(largePath, largeSpec, 'utf8');

      const spec = parseOpenAPISpec(largePath);
      const schemas = extractSchemas(spec);

      expect(Object.keys(schemas)).toHaveLength(100);

      unlinkSync(largePath);
    });
  });
});
