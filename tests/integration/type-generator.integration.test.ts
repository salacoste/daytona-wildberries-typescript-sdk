/**
 * Integration Tests for Type Generator
 *
 * Tests the complete type generation pipeline:
 * - YAML parsing → Type generation → File writing → TypeScript compilation
 * - Error handling for invalid inputs
 * - Multi-file generation scenarios
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { generateFromSwagger } from '../../tools/generate-sdk.js';
import { existsSync, readFileSync, writeFileSync, mkdirSync, rmSync, unlinkSync } from 'fs';
import { join } from 'path';
import { execSync } from 'child_process';

describe('Type Generator Integration', () => {
  const testDir = join(process.cwd(), 'tests', 'fixtures', 'integration');
  const testYamlPath = join(testDir, 'test-api.yaml');
  const emptyYamlPath = join(testDir, 'empty-api.yaml');
  const complexYamlPath = join(testDir, 'complex-api.yaml');
  const outputTypesPath = join(process.cwd(), 'src', 'types', 'test.types.ts');
  const emptyOutputPath = join(process.cwd(), 'src', 'types', 'empty.types.ts');
  const complexOutputPath = join(process.cwd(), 'src', 'types', 'complex.types.ts');

  beforeAll(() => {
    // Create test fixtures directory
    mkdirSync(testDir, { recursive: true });

    // Test API spec with various schema types
    const testApiSpec = `openapi: 3.0.1
info:
  title: Test API
  version: "1.0.0"
  description: Test specification for integration testing
  x-file-name: test
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
        roles:
          type: array
          items:
            type: string
    Product:
      type: object
      required:
        - id
        - name
        - price
      properties:
        id:
          type: integer
        name:
          type: string
        price:
          type: number
        tags:
          type: array
          items:
            type: string
    OrderStatus:
      type: string
      description: Order status enumeration
      enum: ['new', 'confirmed', 'shipped', 'delivered']
    ApiResponse:
      type: object
      properties:
        success:
          type: boolean
        data:
          $ref: '#/components/schemas/User'
        error:
          type: string
`;
    writeFileSync(testYamlPath, testApiSpec, 'utf8');

    // Empty API spec with no schemas
    const emptyApiSpec = `openapi: 3.0.1
info:
  title: Empty API
  version: "1.0.0"
  x-file-name: empty
paths: {}
`;
    writeFileSync(emptyYamlPath, emptyApiSpec, 'utf8');

    // Complex API with advanced features
    const complexApiSpec = `openapi: 3.0.1
info:
  title: Complex API
  version: "1.0.0"
  x-file-name: complex
components:
  schemas:
    BaseEntity:
      type: object
      properties:
        id:
          type: integer
        createdAt:
          type: string
          format: date-time
    ExtendedEntity:
      allOf:
        - $ref: '#/components/schemas/BaseEntity'
        - type: object
          properties:
            name:
              type: string
    UnionType:
      oneOf:
        - type: string
        - type: number
    NestedObject:
      type: object
      properties:
        metadata:
          type: object
          properties:
            key:
              type: string
            value:
              type: string
`;
    writeFileSync(complexYamlPath, complexApiSpec, 'utf8');
  });

  afterAll(() => {
    // Clean up test fixtures
    rmSync(testDir, { recursive: true, force: true });

    // Clean up generated files
    if (existsSync(outputTypesPath)) {
      unlinkSync(outputTypesPath);
    }
    if (existsSync(emptyOutputPath)) {
      unlinkSync(emptyOutputPath);
    }
    if (existsSync(complexOutputPath)) {
      unlinkSync(complexOutputPath);
    }
  });

  describe('Full Pipeline - YAML to TypeScript', () => {
    it('should generate TypeScript types from OpenAPI spec', () => {
      const result = generateFromSwagger(testYamlPath);

      // Verify generation stats
      expect(result.types).toBe(4); // User, Product, OrderStatus, ApiResponse
      expect(result.types).toBeGreaterThan(0);

      // Verify output file was created
      expect(existsSync(outputTypesPath)).toBe(true);
    });

    it('should generate valid TypeScript that compiles without errors', () => {
      // First generate the types
      generateFromSwagger(testYamlPath);

      // Verify file exists
      expect(existsSync(outputTypesPath)).toBe(true);

      // Read generated content
      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // Verify it contains expected interfaces
      expect(generatedContent).toContain('export interface User');
      expect(generatedContent).toContain('export interface Product');
      expect(generatedContent).toContain('export type OrderStatus');
      expect(generatedContent).toContain('export interface ApiResponse');

      // Verify TypeScript compilation (basic check)
      // The file should not have syntax errors
      expect(() => {
        // Use tsc to check if it compiles (dry run)
        execSync(`npx tsc --noEmit ${outputTypesPath}`, {
          cwd: process.cwd(),
          stdio: 'pipe',
        });
      }).not.toThrow();
    });

    it('should preserve JSDoc comments from OpenAPI descriptions', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // Check for JSDoc comments
      expect(generatedContent).toContain('/**');
      expect(generatedContent).toContain(' * User information');
      expect(generatedContent).toContain(' * Order status enumeration');
      expect(generatedContent).toContain('User ID');
      expect(generatedContent).toContain('Email address');
    });

    it('should correctly mark required vs optional properties', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // User schema has required: ['id', 'email']
      expect(generatedContent).toMatch(/id:\s*number;/); // Required (no ?)
      expect(generatedContent).toMatch(/email:\s*string;/); // Required (no ?)
      expect(generatedContent).toMatch(/name\?:\s*string;/); // Optional (has ?)

      // Product schema has required: ['id', 'name', 'price']
      expect(generatedContent).toMatch(/price:\s*number;/); // Required
      expect(generatedContent).toMatch(/tags\?:\s*string\[\];/); // Optional
    });

    it('should handle enum types correctly', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // OrderStatus should be a type alias with union
      expect(generatedContent).toContain('export type OrderStatus');
      expect(generatedContent).toContain("'new'");
      expect(generatedContent).toContain("'confirmed'");
      expect(generatedContent).toContain("'shipped'");
      expect(generatedContent).toContain("'delivered'");
    });

    it('should resolve $ref references correctly', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // ApiResponse has a $ref to User
      expect(generatedContent).toContain('export interface ApiResponse');
      expect(generatedContent).toMatch(/data\?:\s*User;/);
    });

    it('should handle array types correctly', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // User has roles: string[]
      expect(generatedContent).toMatch(/roles\?:\s*string\[\];/);

      // Product has tags: string[]
      expect(generatedContent).toMatch(/tags\?:\s*string\[\];/);
    });
  });

  describe('Empty Schema Handling', () => {
    it('should handle specs with no schemas gracefully', () => {
      const result = generateFromSwagger(emptyYamlPath);

      // Should return 0 types but not throw error
      expect(result.types).toBe(0);

      // Should not create output file for empty schemas
      expect(existsSync(emptyOutputPath)).toBe(false);
    });
  });

  describe('Complex Schema Features', () => {
    it('should handle allOf composition', () => {
      generateFromSwagger(complexYamlPath);

      expect(existsSync(complexOutputPath)).toBe(true);

      const generatedContent = readFileSync(complexOutputPath, 'utf8');

      // ExtendedEntity uses allOf
      expect(generatedContent).toContain('export type ExtendedEntity');
      expect(generatedContent).toContain('BaseEntity &');
    });

    it('should handle oneOf composition', () => {
      generateFromSwagger(complexYamlPath);

      const generatedContent = readFileSync(complexOutputPath, 'utf8');

      // UnionType uses oneOf
      expect(generatedContent).toContain('export type UnionType');
      expect(generatedContent).toContain('string | number');
    });

    it('should handle nested objects', () => {
      generateFromSwagger(complexYamlPath);

      const generatedContent = readFileSync(complexOutputPath, 'utf8');

      // NestedObject has nested metadata object
      expect(generatedContent).toContain('export interface NestedObject');
      expect(generatedContent).toContain('metadata');
      expect(generatedContent).toContain('key');
      expect(generatedContent).toContain('value');
    });
  });

  describe('Error Handling', () => {
    it('should handle non-existent file gracefully', () => {
      const invalidPath = join(testDir, 'non-existent.yaml');

      const result = generateFromSwagger(invalidPath);

      // Should return 0 counts without throwing
      expect(result.types).toBe(0);
      expect(result.methods).toBe(0);
      expect(result.endpoints).toBe(0);
    });

    it('should handle malformed YAML gracefully', () => {
      const malformedPath = join(testDir, 'malformed.yaml');
      const malformedSpec = `openapi: 3.0.1
info:
  title: Broken
  invalid: [unclosed array
`;
      writeFileSync(malformedPath, malformedSpec, 'utf8');

      const result = generateFromSwagger(malformedPath);

      // Should return 0 counts without throwing
      expect(result.types).toBe(0);

      unlinkSync(malformedPath);
    });

    it('should handle invalid OpenAPI version gracefully', () => {
      const invalidVersionPath = join(testDir, 'invalid-version.yaml');
      const invalidVersionSpec = `openapi: 2.0
info:
  title: Old API
  version: "1.0"
paths: {}
`;
      writeFileSync(invalidVersionPath, invalidVersionSpec, 'utf8');

      const result = generateFromSwagger(invalidVersionPath);

      // Should return 0 counts without throwing
      expect(result.types).toBe(0);

      unlinkSync(invalidVersionPath);
    });
  });

  describe('File Header and Metadata', () => {
    it('should include header comment in generated file', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // Should have a header comment
      expect(generatedContent).toContain('/**');
      expect(generatedContent).toContain('Generated from');
    });

    it('should reference source YAML file in header', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // Should mention the source file
      expect(generatedContent).toContain('test-api.yaml');
    });
  });

  describe('Multi-file Generation', () => {
    it('should generate separate files for different modules', () => {
      // Generate from test spec
      const result1 = generateFromSwagger(testYamlPath);
      expect(result1.types).toBeGreaterThan(0);
      expect(existsSync(outputTypesPath)).toBe(true);

      // Generate from complex spec
      const result2 = generateFromSwagger(complexYamlPath);
      expect(result2.types).toBeGreaterThan(0);
      expect(existsSync(complexOutputPath)).toBe(true);

      // Both files should exist independently
      expect(existsSync(outputTypesPath)).toBe(true);
      expect(existsSync(complexOutputPath)).toBe(true);

      // Content should be different
      const content1 = readFileSync(outputTypesPath, 'utf8');
      const content2 = readFileSync(complexOutputPath, 'utf8');
      expect(content1).not.toBe(content2);
    });
  });

  describe('TypeScript Strict Mode Compliance', () => {
    it('should generate code that passes strict TypeScript checks', () => {
      generateFromSwagger(testYamlPath);

      // Verify with strict mode enabled
      expect(() => {
        execSync(`npx tsc --noEmit --strict --skipLibCheck ${outputTypesPath}`, {
          cwd: process.cwd(),
          stdio: 'pipe',
        });
      }).not.toThrow();
    });

    it('should not use any implicit any types', () => {
      generateFromSwagger(testYamlPath);

      const generatedContent = readFileSync(outputTypesPath, 'utf8');

      // Should not contain ': any' (except in comments)
      const codeWithoutComments = generatedContent
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\/\/.*/g, '');

      expect(codeWithoutComments).not.toMatch(/:\s*any[;\s]/);
    });
  });

  describe('Performance', () => {
    it('should generate types in reasonable time (<5s for small spec)', () => {
      const startTime = Date.now();

      generateFromSwagger(testYamlPath);

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete in less than 5 seconds for small spec
      expect(duration).toBeLessThan(5000);
    });
  });
});
