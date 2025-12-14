/**
 * Unit Tests for Type Mapper
 *
 * Tests OpenAPI type mapping logic including:
 * - Primitive types (string, number, boolean, array)
 * - Enum → union type conversion
 * - $ref resolution (valid and invalid)
 * - Nested object handling
 * - Optional property detection
 * - allOf/oneOf/anyOf compositions
 * - Edge cases (missing type, unknown type)
 */

import { describe, it, expect } from 'vitest';
import {
  mapOpenAPIType,
  generateInterface,
  resolveRef,
  toPascalCase,
  sanitizeWhitespace,
  sanitizeTypeName,
  sanitizeIdentifier,
  toCamelCase,
  sanitizeObjectKey,
} from '../../../tools/generators/type-mapper.js';
import type { SchemaObject } from '../../../tools/generators/yaml-parser.js';

describe('type-mapper', () => {
  describe('sanitizeWhitespace', () => {
    it('should remove non-breaking spaces', () => {
      const text = 'Hello\u00A0World';
      expect(sanitizeWhitespace(text)).toBe('Hello World');
    });

    it('should remove zero-width spaces', () => {
      const text = 'Hello\u200BWorld';
      expect(sanitizeWhitespace(text)).toBe('HelloWorld');
    });

    it('should replace Unicode whitespace with regular spaces', () => {
      const text = 'Hello\u2000\u202F\u3000World';
      expect(sanitizeWhitespace(text)).toBe('Hello World');
    });

    it('should collapse multiple spaces into single space', () => {
      const text = 'Hello    World   Test';
      expect(sanitizeWhitespace(text)).toBe('Hello World Test');
    });

    it('should trim leading and trailing whitespace', () => {
      const text = '  Hello World  ';
      expect(sanitizeWhitespace(text)).toBe('Hello World');
    });

    it('should handle mixed irregular whitespace', () => {
      const text = '  Hello\u00A0\u200B  World\u2000\u202F  ';
      expect(sanitizeWhitespace(text)).toBe('Hello World');
    });
  });

  describe('toPascalCase', () => {
    it('should convert snake_case to PascalCase', () => {
      expect(toPascalCase('product_card')).toBe('ProductCard');
      expect(toPascalCase('order_status')).toBe('OrderStatus');
      expect(toPascalCase('api_response')).toBe('ApiResponse');
    });

    it('should convert kebab-case to PascalCase', () => {
      expect(toPascalCase('product-card')).toBe('ProductCard');
      expect(toPascalCase('order-status')).toBe('OrderStatus');
    });

    it('should convert dot.notation to PascalCase', () => {
      expect(toPascalCase('Models.ErrorResponse')).toBe('ModelsErrorResponse');
      expect(toPascalCase('Api.Response.Data')).toBe('ApiResponseData');
    });

    it('should convert space-separated to PascalCase', () => {
      expect(toPascalCase('product card')).toBe('ProductCard');
      expect(toPascalCase('order status')).toBe('OrderStatus');
    });

    it('should handle camelCase inputs', () => {
      expect(toPascalCase('apiResponse')).toBe('ApiResponse');
      expect(toPascalCase('productCard')).toBe('ProductCard');
    });

    it('should handle already PascalCase inputs', () => {
      expect(toPascalCase('ProductCard')).toBe('ProductCard');
      expect(toPascalCase('OrderStatus')).toBe('OrderStatus');
    });

    it('should handle mixed delimiters', () => {
      expect(toPascalCase('product_card-info.data')).toBe('ProductCardInfoData');
    });

    it('should handle single word', () => {
      expect(toPascalCase('product')).toBe('Product');
    });
  });

  describe('mapOpenAPIType - Primitive Types', () => {
    it('should map string type', () => {
      const schema: SchemaObject = { type: 'string' };
      expect(mapOpenAPIType(schema)).toBe('string');
    });

    it('should map number type', () => {
      const schema: SchemaObject = { type: 'number' };
      expect(mapOpenAPIType(schema)).toBe('number');
    });

    it('should map integer type to number', () => {
      const schema: SchemaObject = { type: 'integer' };
      expect(mapOpenAPIType(schema)).toBe('number');
    });

    it('should map boolean type', () => {
      const schema: SchemaObject = { type: 'boolean' };
      expect(mapOpenAPIType(schema)).toBe('boolean');
    });

    it('should return unknown for unrecognized types', () => {
      const schema = { type: 'file' } as unknown as SchemaObject;
      expect(mapOpenAPIType(schema)).toBe('unknown');
    });

    it('should return unknown for missing type', () => {
      const schema: SchemaObject = {};
      expect(mapOpenAPIType(schema)).toBe('unknown');
    });
  });

  describe('mapOpenAPIType - Arrays', () => {
    it('should map array of strings', () => {
      const schema: SchemaObject = {
        type: 'array',
        items: { type: 'string' },
      };
      expect(mapOpenAPIType(schema)).toBe('string[]');
    });

    it('should map array of numbers', () => {
      const schema: SchemaObject = {
        type: 'array',
        items: { type: 'number' },
      };
      expect(mapOpenAPIType(schema)).toBe('number[]');
    });

    it('should map array without items as unknown[]', () => {
      const schema: SchemaObject = { type: 'array' };
      expect(mapOpenAPIType(schema)).toBe('unknown[]');
    });

    it('should map nested arrays', () => {
      const schema: SchemaObject = {
        type: 'array',
        items: {
          type: 'array',
          items: { type: 'string' },
        },
      };
      expect(mapOpenAPIType(schema)).toBe('string[][]');
    });
  });

  describe('mapOpenAPIType - Enums', () => {
    it('should map string enum to union type', () => {
      const schema: SchemaObject = {
        type: 'string',
        enum: ['new', 'confirmed', 'shipped'],
      };
      expect(mapOpenAPIType(schema)).toBe("'new' | 'confirmed' | 'shipped'");
    });

    it('should map number enum to union type', () => {
      const schema: SchemaObject = {
        type: 'number',
        enum: [1, 2, 3],
      };
      expect(mapOpenAPIType(schema)).toBe('1 | 2 | 3');
    });

    it('should map mixed enum to union type', () => {
      const schema: SchemaObject = {
        enum: ['active', 1, 'inactive', 0],
      };
      expect(mapOpenAPIType(schema)).toBe("'active' | 1 | 'inactive' | 0");
    });
  });

  describe('mapOpenAPIType - $ref Resolution', () => {
    it('should resolve valid $ref reference', () => {
      const schema: SchemaObject = {
        $ref: '#/components/schemas/ProductCard',
      };
      expect(mapOpenAPIType(schema)).toBe('ProductCard');
    });

    it('should resolve $ref with snake_case name', () => {
      const schema: SchemaObject = {
        $ref: '#/components/schemas/order_status',
      };
      expect(mapOpenAPIType(schema)).toBe('OrderStatus');
    });

    it('should handle invalid $ref format as unknown', () => {
      const schema: SchemaObject = {
        $ref: 'invalid-ref-format',
      };
      expect(mapOpenAPIType(schema)).toBe('unknown');
    });
  });

  describe('mapOpenAPIType - Compositions', () => {
    it('should handle allOf composition with intersection', () => {
      const schema: SchemaObject = {
        allOf: [{ type: 'object' }, { type: 'object' }],
      };
      const allSchemas = {};
      const result = mapOpenAPIType(schema, allSchemas);
      expect(result).toContain('&');
    });

    it('should handle oneOf composition with union', () => {
      const schema: SchemaObject = {
        oneOf: [{ type: 'string' }, { type: 'number' }],
      };
      expect(mapOpenAPIType(schema)).toBe('string | number');
    });

    it('should handle anyOf composition with union', () => {
      const schema: SchemaObject = {
        anyOf: [{ type: 'string' }, { type: 'boolean' }],
      };
      expect(mapOpenAPIType(schema)).toBe('string | boolean');
    });

    it('should handle complex oneOf with $ref', () => {
      const allSchemas: Record<string, SchemaObject> = {
        ErrorResponse: { type: 'object' },
        SuccessResponse: { type: 'object' },
      };
      const schema: SchemaObject = {
        oneOf: [
          { $ref: '#/components/schemas/ErrorResponse' },
          { $ref: '#/components/schemas/SuccessResponse' },
        ],
      };
      expect(mapOpenAPIType(schema, allSchemas)).toBe('ErrorResponse | SuccessResponse');
    });
  });

  describe('mapOpenAPIType - Objects', () => {
    it('should generate inline object type', () => {
      const schema: SchemaObject = {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      };
      const result = mapOpenAPIType(schema);
      expect(result).toContain('id: number');
      expect(result).toContain('name?: string');
    });

    it('should handle nested objects', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          user: {
            type: 'object',
            properties: {
              id: { type: 'number' },
            },
          },
        },
      };
      const result = mapOpenAPIType(schema);
      expect(result).toContain('user?:');
      expect(result).toContain('id?:');
    });
  });

  describe('generateInterface', () => {
    it('should generate interface with required properties', () => {
      const schema: SchemaObject = {
        type: 'object',
        required: ['id', 'name'],
        properties: {
          id: { type: 'number', description: 'Product ID' },
          name: { type: 'string', description: 'Product name' },
        },
      };
      const result = generateInterface(schema);
      expect(result).toContain('id: number');
      expect(result).toContain('name: string');
      expect(result).toContain('Product ID');
      expect(result).toContain('Product name');
    });

    it('should generate interface with optional properties', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          id: { type: 'number' },
          name: { type: 'string' },
        },
      };
      const result = generateInterface(schema);
      expect(result).toContain('id?: number');
      expect(result).toContain('name?: string');
    });

    it('should handle empty object with additionalProperties boolean', () => {
      const schema: SchemaObject = {
        type: 'object',
        additionalProperties: true,
      };
      const result = generateInterface(schema);
      expect(result).toBe('Record<string, unknown>');
    });

    it('should handle empty object with additionalProperties schema', () => {
      const schema: SchemaObject = {
        type: 'object',
        additionalProperties: { type: 'string' },
      };
      const result = generateInterface(schema);
      expect(result).toBe('Record<string, string>');
    });

    it('should handle empty object without additionalProperties', () => {
      const schema: SchemaObject = {
        type: 'object',
      };
      const result = generateInterface(schema);
      expect(result).toBe('Record<string, never>');
    });

    it('should generate compact format with skipComments', () => {
      const schema: SchemaObject = {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'number', description: 'Product ID' },
          name: { type: 'string' },
        },
      };
      const result = generateInterface(schema, {}, true);
      expect(result).toContain('{ ');
      expect(result).toContain('id: number');
      expect(result).toContain('name?: string');
      expect(result).not.toContain('Product ID'); // No comments in compact mode
    });

    it('should handle properties with complex types', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          tags: {
            type: 'array',
            items: { type: 'string' },
          },
          status: {
            type: 'string',
            enum: ['active', 'inactive'],
          },
        },
      };
      const result = generateInterface(schema);
      expect(result).toContain('tags?: string[]');
      expect(result).toContain("status?: 'active' | 'inactive'");
    });
  });

  describe('resolveRef', () => {
    it('should resolve standard $ref format', () => {
      const ref = '#/components/schemas/ProductCard';
      expect(resolveRef(ref)).toBe('ProductCard');
    });

    it('should convert snake_case schema names to PascalCase', () => {
      const ref = '#/components/schemas/product_card';
      expect(resolveRef(ref)).toBe('ProductCard');
    });

    it('should convert kebab-case schema names to PascalCase', () => {
      const ref = '#/components/schemas/order-status';
      expect(resolveRef(ref)).toBe('OrderStatus');
    });

    it('should return unknown for invalid $ref format', () => {
      const ref = 'invalid-reference';
      expect(resolveRef(ref)).toBe('unknown');
    });

    it('should return unknown for empty $ref', () => {
      const ref = '';
      expect(resolveRef(ref)).toBe('unknown');
    });

    it('should handle $ref without schema name', () => {
      const ref = '#/components/schemas/';
      expect(resolveRef(ref)).toBe('unknown');
    });
  });

  describe('Edge Cases', () => {
    it('should handle schema with only description', () => {
      const schema: SchemaObject = {
        description: 'Some description',
      };
      expect(mapOpenAPIType(schema)).toBe('unknown');
    });

    it('should handle schema with nullable flag', () => {
      const schema: SchemaObject = {
        type: 'string',
        nullable: true,
      };
      // Current implementation doesn't handle nullable, but should still return string
      expect(mapOpenAPIType(schema)).toBe('string');
    });

    it('should handle schema with default value', () => {
      const schema: SchemaObject = {
        type: 'string',
        default: 'default-value',
      };
      expect(mapOpenAPIType(schema)).toBe('string');
    });

    it('should handle array with $ref items', () => {
      const schema: SchemaObject = {
        type: 'array',
        items: { $ref: '#/components/schemas/Product' },
      };
      expect(mapOpenAPIType(schema)).toBe('Product[]');
    });

    it('should handle object with $ref properties', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          product: { $ref: '#/components/schemas/ProductCard' },
          order: { $ref: '#/components/schemas/OrderInfo' },
        },
      };
      const result = mapOpenAPIType(schema);
      expect(result).toContain('product?: ProductCard');
      expect(result).toContain('order?: OrderInfo');
    });

    it('should handle deeply nested object structures', () => {
      const schema: SchemaObject = {
        type: 'object',
        properties: {
          level1: {
            type: 'object',
            properties: {
              level2: {
                type: 'object',
                properties: {
                  value: { type: 'string' },
                },
              },
            },
          },
        },
      };
      const result = mapOpenAPIType(schema);
      expect(result).toContain('level1?:');
      expect(result).toContain('level2?:');
      expect(result).toContain('value?: string');
    });
  });

  describe('sanitizeTypeName', () => {
    it('should handle normal PascalCase names unchanged', () => {
      expect(sanitizeTypeName('ProductCard')).toBe('ProductCard');
      expect(sanitizeTypeName('OrderStatus')).toBe('OrderStatus');
    });

    it('should convert snake_case to PascalCase', () => {
      expect(sanitizeTypeName('product_card')).toBe('ProductCard');
      expect(sanitizeTypeName('order_status')).toBe('OrderStatus');
    });

    it('should transform HTTP status code response types', () => {
      expect(sanitizeTypeName('400Response')).toBe('Response400');
      expect(sanitizeTypeName('401Response')).toBe('Response401');
      expect(sanitizeTypeName('404Response')).toBe('Response404');
      expect(sanitizeTypeName('500Response')).toBe('Response500');
    });

    it('should transform wildcard status code response types', () => {
      expect(sanitizeTypeName('4xxResponse')).toBe('Response4xxResponse');
      expect(sanitizeTypeName('5xxResponse')).toBe('Response5xxResponse');
    });

    it('should prefix other numeric-starting names with Type', () => {
      expect(sanitizeTypeName('1_0_0')).toBe('Type100');
      expect(sanitizeTypeName('2ndVersion')).toBe('Type2ndVersion');
    });

    it('should remove invalid characters', () => {
      expect(sanitizeTypeName('Product@Card')).toBe('Product_Card');
      expect(sanitizeTypeName('Order#Status')).toBe('Order_Status');
    });
  });

  describe('sanitizeIdentifier', () => {
    it('should handle normal camelCase names unchanged', () => {
      expect(sanitizeIdentifier('productCard')).toBe('productCard');
      expect(sanitizeIdentifier('orderStatus')).toBe('orderStatus');
    });

    it('should convert kebab-case to camelCase', () => {
      expect(sanitizeIdentifier('orders-fbs')).toBe('ordersFbs');
      expect(sanitizeIdentifier('orders-fbw')).toBe('ordersFbw');
      expect(sanitizeIdentifier('in-store-pickup')).toBe('inStorePickup');
    });

    it('should convert snake_case to camelCase', () => {
      expect(sanitizeIdentifier('product_card')).toBe('productCard');
      expect(sanitizeIdentifier('order_status')).toBe('orderStatus');
    });

    it('should prefix numeric-starting names with var', () => {
      expect(sanitizeIdentifier('1_0_0')).toBe('var100');
      expect(sanitizeIdentifier('2ndVersion')).toBe('var2ndVersion');
    });

    it('should remove invalid characters', () => {
      expect(sanitizeIdentifier('product@card')).toBe('product_card');
    });
  });

  describe('toCamelCase', () => {
    it('should convert snake_case to camelCase', () => {
      expect(toCamelCase('product_card')).toBe('productCard');
      expect(toCamelCase('order_status')).toBe('orderStatus');
    });

    it('should convert kebab-case to camelCase', () => {
      expect(toCamelCase('product-card')).toBe('productCard');
      expect(toCamelCase('order-status')).toBe('orderStatus');
    });

    it('should handle PascalCase by lowercasing first letter', () => {
      expect(toCamelCase('ProductCard')).toBe('productCard');
      expect(toCamelCase('OrderStatus')).toBe('orderStatus');
    });

    it('should handle already camelCase', () => {
      expect(toCamelCase('productCard')).toBe('productCard');
      expect(toCamelCase('orderStatus')).toBe('orderStatus');
    });

    it('should handle single word', () => {
      expect(toCamelCase('product')).toBe('product');
      expect(toCamelCase('Product')).toBe('product');
    });
  });

  describe('sanitizeObjectKey', () => {
    it('should return valid identifiers unchanged', () => {
      expect(sanitizeObjectKey('productCard')).toBe('productCard');
      expect(sanitizeObjectKey('orderStatus')).toBe('orderStatus');
      expect(sanitizeObjectKey('_private')).toBe('_private');
      expect(sanitizeObjectKey('$special')).toBe('$special');
    });

    it('should quote keys with hyphens', () => {
      expect(sanitizeObjectKey('orders-fbs')).toBe("'orders-fbs'");
      expect(sanitizeObjectKey('in-store-pickup')).toBe("'in-store-pickup'");
    });

    it('should quote keys starting with numbers', () => {
      expect(sanitizeObjectKey('1_0_0')).toBe("'1_0_0'");
      expect(sanitizeObjectKey('2ndVersion')).toBe("'2ndVersion'");
    });

    it('should quote keys with brackets', () => {
      expect(sanitizeObjectKey('filter[downloadIds]')).toBe("'filter[downloadIds]'");
      expect(sanitizeObjectKey('data[0]')).toBe("'data[0]'");
    });

    it('should escape single quotes in keys', () => {
      expect(sanitizeObjectKey("it's")).toBe("'it\\'s'");
    });

    it('should quote keys with spaces', () => {
      expect(sanitizeObjectKey('product name')).toBe("'product name'");
    });
  });
});
