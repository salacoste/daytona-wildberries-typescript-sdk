/**
 * Unit Tests for Schema to Interface Converter
 *
 * Tests TypeScript interface generation from OpenAPI schemas including:
 * - PascalCase conversion for interface names
 * - JSDoc generation from schema descriptions
 * - Complete interface generation with properties
 * - Type alias generation for non-object schemas
 * - Required vs optional property markers
 */

import { describe, it, expect } from 'vitest';
import {
  generateTypeScriptInterface,
  generateTypeAlias,
} from '../../../tools/generators/schema-to-interface.js';
import type { SchemaObject } from '../../../tools/generators/yaml-parser.js';

describe('schema-to-interface', () => {
  describe('generateTypeScriptInterface - PascalCase Conversion', () => {
    it('should convert snake_case schema name to PascalCase', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      };
      const result = generateTypeScriptInterface('product_card', schema);
      expect(result).toContain('export interface ProductCard');
    });

    it('should convert kebab-case schema name to PascalCase', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      };
      const result = generateTypeScriptInterface('order-status', schema);
      expect(result).toContain('export interface OrderStatus');
    });

    it('should handle already PascalCase schema name', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      };
      const result = generateTypeScriptInterface('ProductCard', schema);
      expect(result).toContain('export interface ProductCard');
    });
  });

  describe('generateTypeScriptInterface - JSDoc Generation', () => {
    it('should generate JSDoc from schema description', () => {
      const schema: SchemaObject = {
        type: 'object',
        description: 'Product card information',
        properties: {
          id: { type: 'number' },
        },
      };
      const result = generateTypeScriptInterface('ProductCard', schema);
      expect(result).toContain('/**');
      expect(result).toContain(' * Product card information');
      expect(result).toContain(' */');
    });

    it('should generate JSDoc for properties with descriptions', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'Unique product identifier' },
          name: { type: 'string', description: 'Product name' },
        },
      };
      const result = generateTypeScriptInterface('Product', schema);
      expect(result).toContain('/** Unique product identifier */');
      expect(result).toContain('/** Product name */');
    });

    it('should not generate JSDoc when no description', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
      };
      const result = generateTypeScriptInterface('Product', schema);
      const lines = result.split('\n');
      // Should only have export interface line and closing brace, no JSDoc
      expect(lines[0]).toContain('export interface Product');
    });

    it('should include example in JSDoc when present', () => {
      const schema: SchemaObject = {
        type: 'object',
        description: 'User information',
        example: { id: 1, name: 'John' },
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      };
      const result = generateTypeScriptInterface('User', schema);
      expect(result).toContain('@example');
      expect(result).toContain('```json');
      expect(result).toContain('"id": 1');
      expect(result).toContain('"name": "John"');
    });

    it('should sanitize irregular whitespace in descriptions', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: {
            type: 'number',
            description: 'Product\u00A0ID\u200B  with   spaces',
          },
        },
      };
      const result = generateTypeScriptInterface('Product', schema);
      expect(result).toContain('/** Product ID with spaces */');
      expect(result).not.toContain('\u00A0');
      expect(result).not.toContain('\u200B');
    });
  });

  describe('generateTypeScriptInterface - Interface Generation', () => {
    it('should generate interface with all required properties', () => {
      const schema: SchemaObject = {
        type: 'object',
        required: ['id', 'name', 'price'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          price: { type: 'number' },
        },
      };
      const result = generateTypeScriptInterface('Product', schema);
      expect(result).toContain('export interface Product {');
      expect(result).toContain('id: number;');
      expect(result).toContain('name: string;');
      expect(result).toContain('price: number;');
      expect(result).toContain('}');
    });

    it('should generate interface with all optional properties', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      };
      const result = generateTypeScriptInterface('Product', schema);
      expect(result).toContain('id?: number;');
      expect(result).toContain('name?: string;');
    });

    it('should generate interface with mixed required and optional properties', () => {
      const schema: SchemaObject = {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
          description: { type: 'string' },
        },
      };
      const result = generateTypeScriptInterface('Product', schema);
      expect(result).toContain('id: number;'); // required - no ?
      expect(result).toContain('name?: string;'); // optional - has ?
      expect(result).toContain('description?: string;'); // optional - has ?
    });

    it('should handle complex property types', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          tags: { type: 'array', items: { type: 'string' } },
          status: { type: 'string', enum: ['active', 'inactive'] },
          metadata: { $ref: '#/components/schemas/Metadata' },
        },
      };
      const result = generateTypeScriptInterface('Product', schema);
      expect(result).toContain('tags?: string[];');
      expect(result).toContain("status?: 'active' | 'inactive';");
      expect(result).toContain('metadata?: Metadata;');
    });

    it('should handle nested object properties', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          address: {
            type: 'object',
            properties: {
              street: { type: 'string' },
              city: { type: 'string' },
            },
          },
        },
      };
      const result = generateTypeScriptInterface('User', schema);
      expect(result).toContain('address?:');
      expect(result).toContain('street?: string');
      expect(result).toContain('city?: string');
    });

    it('should handle empty properties object', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {},
      };
      const result = generateTypeScriptInterface('Empty', schema);
      expect(result).toContain('export interface Empty {');
      expect(result).toContain('}');
    });
  });

  describe('generateTypeScriptInterface - additionalProperties Handling', () => {
    it('should generate Record type for additionalProperties boolean (true)', () => {
      const schema: SchemaObject = {
        type: 'object',
        description: 'Dynamic object',
        additionalProperties: true,
      };
      const result = generateTypeScriptInterface('DynamicObject', schema);
      expect(result).toContain('export type DynamicObject = Record<string, unknown>;');
    });

    it('should generate Record type for additionalProperties with schema', () => {
      const schema: SchemaObject = {
        type: 'object',
        description: 'String map',
        additionalProperties: { type: 'string' },
      };
      const result = generateTypeScriptInterface('StringMap', schema);
      expect(result).toContain('export type StringMap = Record<string, string>;');
    });

    it('should prioritize properties over additionalProperties', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number' },
        },
        additionalProperties: { type: 'string' },
      };
      const result = generateTypeScriptInterface('MixedObject', schema);
      // Should generate interface with properties, not Record type
      expect(result).toContain('export interface MixedObject');
      expect(result).toContain('id?: number;');
      expect(result).not.toContain('Record<string');
    });
  });

  describe('generateTypeScriptInterface - Type Alias for Non-Objects', () => {
    it('should generate type alias for string enum', () => {
      const schema: SchemaObject = {
        type: 'string',
        description: 'Order status',
        enum: ['new', 'confirmed', 'shipped'],
      };
      const result = generateTypeScriptInterface('OrderStatus', schema);
      expect(result).toContain('export type OrderStatus =');
      expect(result).toContain("'new' | 'confirmed' | 'shipped'");
      expect(result).toContain('Order status'); // JSDoc should be present
    });

    it('should generate type alias for array type', () => {
      const schema: SchemaObject = {
        type: 'array',
        description: 'List of product IDs',
        items: { type: 'number' },
      };
      const result = generateTypeScriptInterface('ProductIds', schema);
      expect(result).toContain('export type ProductIds = number[];');
    });

    it('should generate type alias for primitive type', () => {
      const schema: SchemaObject = {
        type: 'string',
        description: 'Product name',
      };
      const result = generateTypeScriptInterface('ProductName', schema);
      expect(result).toContain('export type ProductName = string;');
    });

    it('should generate type alias for $ref', () => {
      const schema: SchemaObject = {
        description: 'Product reference',
        $ref: '#/components/schemas/Product',
      };
      const result = generateTypeScriptInterface('ProductRef', schema);
      expect(result).toContain('export type ProductRef = Product;');
    });
  });

  describe('generateTypeAlias', () => {
    it('should generate type alias with description', () => {
      const schema: SchemaObject = {
        type: 'string',
        description: 'User role',
        enum: ['admin', 'user', 'guest'],
      };
      const result = generateTypeAlias('UserRole', schema);
      expect(result).toContain('/**');
      expect(result).toContain(' * User role');
      expect(result).toContain(' */');
      expect(result).toContain('export type UserRole =');
      expect(result).toContain("'admin' | 'user' | 'guest'");
    });

    it('should generate type alias without JSDoc when no description', () => {
      const schema: SchemaObject = {
        type: 'string',
        enum: ['a', 'b', 'c'],
      };
      const result = generateTypeAlias('Letters', schema);
      expect(result).not.toContain('/**');
      expect(result).toContain('export type Letters =');
    });

    it('should convert schema name to PascalCase', () => {
      const schema: SchemaObject = {
        type: 'string',
        enum: ['pending', 'completed'],
      };
      const result = generateTypeAlias('task_status', schema);
      expect(result).toContain('export type TaskStatus =');
    });

    it('should handle complex type definitions', () => {
      const schema: SchemaObject = {
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
        ],
      };
      const result = generateTypeAlias('MixedType', schema);
      expect(result).toContain('export type MixedType = string | number | boolean;');
    });

    it('should handle array type alias', () => {
      const schema: SchemaObject = {
        type: 'array',
        items: { $ref: '#/components/schemas/Product' },
      };
      const result = generateTypeAlias('ProductList', schema);
      expect(result).toContain('export type ProductList = Product[];');
    });
  });

  describe('Edge Cases', () => {
    it('should handle schema with only description', () => {
      const schema: SchemaObject = {
        description: 'Some type',
      };
      const result = generateTypeScriptInterface('SomeType', schema);
      // Should generate type alias with unknown type
      expect(result).toContain('export type SomeType = unknown;');
    });

    it('should handle schema with empty object and no additionalProperties', () => {
      const schema: SchemaObject = {
        type: 'object',
      };
      const result = generateTypeScriptInterface('EmptyObject', schema);
      // Should generate interface with empty body or Record<string, never>
      expect(result).toContain('export');
    });

    it('should handle very long property descriptions', () => {
      const longDescription = 'This is a very long description that spans multiple words and contains a lot of information about the property and its usage in the API.';
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          field: { type: 'string', description: longDescription },
        },
      };
      const result = generateTypeScriptInterface('Type', schema);
      expect(result).toContain(longDescription);
    });

    it('should handle schema with allOf composition', () => {
      const allSchemas = {
        Base: { type: 'object', properties: { id: { type: 'number' } } },
        Extended: { type: 'object', properties: { name: { type: 'string' } } },
      };
      const schema: SchemaObject = {
        allOf: [
          { $ref: '#/components/schemas/Base' },
          { $ref: '#/components/schemas/Extended' },
        ],
      };
      const result = generateTypeScriptInterface('Combined', schema, allSchemas);
      expect(result).toContain('export type Combined =');
      expect(result).toContain('Base & Extended');
    });

    it('should handle multiline descriptions', () => {
      const schema: SchemaObject = {
        type: 'object',
        description: 'Line 1\nLine 2\nLine 3',
        properties: {
          id: { type: 'number' },
        },
      };
      const result = generateTypeScriptInterface('MultiDesc', schema);
      expect(result).toContain('/**');
      expect(result).toContain('Line 1');
      expect(result).toContain('Line 2');
      expect(result).toContain('Line 3');
    });
  });
});
