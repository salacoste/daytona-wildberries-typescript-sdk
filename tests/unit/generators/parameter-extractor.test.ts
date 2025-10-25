/**
 * Unit Tests for Parameter Extractor
 *
 * Tests parameter extraction from OpenAPI operations including:
 * - Query parameter extraction and grouping
 * - Path parameter extraction
 * - Request body extraction
 * - Parameter signature generation
 * - TypeScript parameter ordering compliance
 */

import { describe, it, expect } from 'vitest';
import {
  extractParameters,
  extractPathParameters,
  extractQueryParameters,
  extractRequestBody,
  generateParameterSignature,
  getParameterNames,
  type MethodParameter,
} from '../../../tools/generators/parameter-extractor.js';
import type { ParsedOperation } from '../../../tools/generators/path-parser.js';

describe('parameter-extractor', () => {
  describe('extractPathParameters', () => {
    it('should extract single path parameter', () => {
      const operation: ParsedOperation = {
        path: '/orders/{id}',
        method: 'get',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const params = extractPathParameters(operation);

      expect(params).toHaveLength(1);
      expect(params[0].name).toBe('id');
      expect(params[0].type).toBe('string');
      expect(params[0].required).toBe(true);
      expect(params[0].location).toBe('path');
    });

    it('should extract multiple path parameters', () => {
      const operation: ParsedOperation = {
        path: '/users/{userId}/posts/{postId}',
        method: 'get',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
          {
            name: 'postId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        responses: {},
      };

      const params = extractPathParameters(operation);

      expect(params).toHaveLength(2);
      expect(params[0].name).toBe('userId');
      expect(params[0].type).toBe('number');
      expect(params[1].name).toBe('postId');
      expect(params[1].type).toBe('number');
    });

    it('should mark all path parameters as required', () => {
      const operation: ParsedOperation = {
        path: '/products/{id}',
        method: 'get',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: false, // Even if explicitly false
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const params = extractPathParameters(operation);

      expect(params[0].required).toBe(true); // Path params are ALWAYS required
    });

    it('should preserve parameter description', () => {
      const operation: ParsedOperation = {
        path: '/orders/{orderId}',
        method: 'get',
        parameters: [
          {
            name: 'orderId',
            in: 'path',
            required: true,
            description: 'Unique order identifier',
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const params = extractPathParameters(operation);

      expect(params[0].description).toBe('Unique order identifier');
    });

    it('should return empty array when no parameters', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        responses: {},
      };

      const params = extractPathParameters(operation);

      expect(params).toHaveLength(0);
    });

    it('should return empty array when no path parameters', () => {
      const operation: ParsedOperation = {
        path: '/news',
        method: 'get',
        parameters: [
          {
            name: 'from',
            in: 'query',
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const params = extractPathParameters(operation);

      expect(params).toHaveLength(0);
    });

    it('should default to string type when schema missing', () => {
      const operation: ParsedOperation = {
        path: '/items/{id}',
        method: 'get',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
          },
        ],
        responses: {},
      };

      const params = extractPathParameters(operation);

      expect(params[0].type).toBe('string');
    });
  });

  describe('extractQueryParameters', () => {
    it('should extract single query parameter', () => {
      const operation: ParsedOperation = {
        path: '/news',
        method: 'get',
        parameters: [
          {
            name: 'from',
            in: 'query',
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param).toBeDefined();
      expect(param?.name).toBe('options');
      expect(param?.type).toContain('from');
      expect(param?.required).toBe(false);
      expect(param?.location).toBe('query');
    });

    it('should group multiple query parameters into options object', () => {
      const operation: ParsedOperation = {
        path: '/news',
        method: 'get',
        parameters: [
          {
            name: 'from',
            in: 'query',
            schema: { type: 'string' },
          },
          {
            name: 'limit',
            in: 'query',
            schema: { type: 'integer' },
          },
          {
            name: 'offset',
            in: 'query',
            schema: { type: 'integer' },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param).toBeDefined();
      expect(param?.type).toContain('from');
      expect(param?.type).toContain('limit');
      expect(param?.type).toContain('offset');
      expect(param?.type).toContain('number'); // integer → number
    });

    it('should mark optional query parameters with ?', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'get',
        parameters: [
          {
            name: 'category',
            in: 'query',
            required: false,
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param?.type).toContain('category?:');
    });

    it('should NOT mark required query parameters with ?', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'get',
        parameters: [
          {
            name: 'apiKey',
            in: 'query',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param?.type).toContain('apiKey:');
      expect(param?.type).not.toContain('apiKey?:');
    });

    it('should return undefined when no query parameters', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param).toBeUndefined();
    });

    it('should return undefined when only path parameters exist', () => {
      const operation: ParsedOperation = {
        path: '/orders/{id}',
        method: 'get',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param).toBeUndefined();
    });

    it('should set description to "Query parameters"', () => {
      const operation: ParsedOperation = {
        path: '/news',
        method: 'get',
        parameters: [
          {
            name: 'from',
            in: 'query',
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param?.description).toBe('Query parameters');
    });

    it('should handle boolean query parameters', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'get',
        parameters: [
          {
            name: 'active',
            in: 'query',
            schema: { type: 'boolean' },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param?.type).toContain('boolean');
    });

    it('should handle array query parameters', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'get',
        parameters: [
          {
            name: 'tags',
            in: 'query',
            schema: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        ],
        responses: {},
      };

      const param = extractQueryParameters(operation);

      expect(param?.type).toContain('string[]');
    });
  });

  describe('extractRequestBody', () => {
    it('should extract request body with $ref schema', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'post',
        requestBody: {
          required: true,
          description: 'Product data',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateProductRequest',
              },
            },
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param).toBeDefined();
      expect(param?.name).toBe('data');
      expect(param?.type).toBe('CreateProductRequest');
      expect(param?.required).toBe(true);
      expect(param?.location).toBe('body');
      expect(param?.description).toBe('Product data');
    });

    it('should extract request body with inline object schema', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'post',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  age: { type: 'integer' },
                },
              },
            },
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param).toBeDefined();
      expect(param?.type).toContain('name');
      expect(param?.type).toContain('age');
    });

    it('should mark optional request body as not required', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'patch',
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateProductRequest',
              },
            },
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param?.required).toBe(false);
    });

    it('should default to required: false when not specified', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'post',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductRequest',
              },
            },
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param?.required).toBe(false);
    });

    it('should return undefined when no request body', () => {
      const operation: ParsedOperation = {
        path: '/news',
        method: 'get',
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param).toBeUndefined();
    });

    it('should return undefined when no application/json content', () => {
      const operation: ParsedOperation = {
        path: '/upload',
        method: 'post',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
              },
            },
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param).toBeUndefined();
    });

    it('should return undefined when no schema in content', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'post',
        requestBody: {
          required: true,
          content: {
            'application/json': {},
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param).toBeUndefined();
    });

    it('should use default description when not provided', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'post',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductRequest',
              },
            },
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param?.description).toBe('Request body data');
    });

    it('should handle array request body', () => {
      const operation: ParsedOperation = {
        path: '/bulk',
        method: 'post',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Item',
                },
              },
            },
          },
        },
        responses: {},
      };

      const param = extractRequestBody(operation);

      expect(param?.type).toBe('Item[]');
    });
  });

  describe('extractParameters', () => {
    it('should extract path parameters only', () => {
      const operation: ParsedOperation = {
        path: '/orders/{id}',
        method: 'get',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(1);
      expect(params[0].name).toBe('id');
      expect(params[0].location).toBe('path');
    });

    it('should extract query parameters only', () => {
      const operation: ParsedOperation = {
        path: '/news',
        method: 'get',
        parameters: [
          {
            name: 'from',
            in: 'query',
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(1);
      expect(params[0].name).toBe('options');
      expect(params[0].location).toBe('query');
    });

    it('should extract request body only', () => {
      const operation: ParsedOperation = {
        path: '/products',
        method: 'post',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateProductRequest',
              },
            },
          },
        },
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(1);
      expect(params[0].name).toBe('data');
      expect(params[0].location).toBe('body');
    });

    it('should order path params before optional query params', () => {
      const operation: ParsedOperation = {
        path: '/orders/{id}',
        method: 'get',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
          {
            name: 'expand',
            in: 'query',
            schema: { type: 'string' },
          },
        ],
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(2);
      expect(params[0].name).toBe('id'); // Path param first
      expect(params[0].required).toBe(true);
      expect(params[1].name).toBe('options'); // Query params second
      expect(params[1].required).toBe(false);
    });

    it('should order path params, required body, then optional query params', () => {
      const operation: ParsedOperation = {
        path: '/products/{id}',
        method: 'put',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
          {
            name: 'validate',
            in: 'query',
            schema: { type: 'boolean' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateProductRequest',
              },
            },
          },
        },
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(3);
      expect(params[0].name).toBe('id'); // Path param (required)
      expect(params[0].required).toBe(true);
      expect(params[1].name).toBe('data'); // Body param (required)
      expect(params[1].required).toBe(true);
      expect(params[2].name).toBe('options'); // Query params (optional)
      expect(params[2].required).toBe(false);
    });

    it('should order path params, optional query, then optional body', () => {
      const operation: ParsedOperation = {
        path: '/products/{id}',
        method: 'patch',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
          {
            name: 'validate',
            in: 'query',
            schema: { type: 'boolean' },
          },
        ],
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PatchProductRequest',
              },
            },
          },
        },
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(3);
      expect(params[0].name).toBe('id'); // Path param (required)
      expect(params[1].name).toBe('options'); // Query params (optional)
      expect(params[2].name).toBe('data'); // Body param (optional)
    });

    it('should return empty array when no parameters', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(0);
    });

    it('should handle multiple path parameters with body', () => {
      const operation: ParsedOperation = {
        path: '/users/{userId}/posts/{postId}',
        method: 'put',
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
          {
            name: 'postId',
            in: 'path',
            required: true,
            schema: { type: 'integer' },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdatePostRequest',
              },
            },
          },
        },
        responses: {},
      };

      const params = extractParameters(operation);

      expect(params).toHaveLength(3);
      expect(params[0].name).toBe('userId');
      expect(params[1].name).toBe('postId');
      expect(params[2].name).toBe('data');
    });
  });

  describe('generateParameterSignature', () => {
    it('should return empty string for no parameters', () => {
      const params: MethodParameter[] = [];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('');
    });

    it('should generate signature for single required parameter', () => {
      const params: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
      ];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('id: string');
    });

    it('should generate signature for single optional parameter', () => {
      const params: MethodParameter[] = [
        {
          name: 'options',
          type: '{ from?: string }',
          required: false,
          location: 'query',
        },
      ];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('options?: { from?: string }');
    });

    it('should generate signature for path + query parameters', () => {
      const params: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
        {
          name: 'options',
          type: '{ expand?: string }',
          required: false,
          location: 'query',
        },
      ];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('id: string, options?: { expand?: string }');
    });

    it('should generate signature for path + body parameters', () => {
      const params: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
        {
          name: 'data',
          type: 'UpdateRequest',
          required: true,
          location: 'body',
        },
      ];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('id: string, data: UpdateRequest');
    });

    it('should generate signature for path + query + body', () => {
      const params: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
        {
          name: 'data',
          type: 'UpdateRequest',
          required: true,
          location: 'body',
        },
        {
          name: 'options',
          type: '{ validate?: boolean }',
          required: false,
          location: 'query',
        },
      ];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('id: string, data: UpdateRequest, options?: { validate?: boolean }');
    });

    it('should generate signature for multiple path parameters', () => {
      const params: MethodParameter[] = [
        {
          name: 'userId',
          type: 'number',
          required: true,
          location: 'path',
        },
        {
          name: 'postId',
          type: 'number',
          required: true,
          location: 'path',
        },
      ];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('userId: number, postId: number');
    });

    it('should handle complex types in signature', () => {
      const params: MethodParameter[] = [
        {
          name: 'options',
          type: '{ from?: string; limit?: number; tags?: string[] }',
          required: false,
          location: 'query',
        },
      ];

      const signature = generateParameterSignature(params);

      expect(signature).toBe('options?: { from?: string; limit?: number; tags?: string[] }');
    });
  });

  describe('getParameterNames', () => {
    it('should return empty array for no parameters', () => {
      const params: MethodParameter[] = [];

      const names = getParameterNames(params);

      expect(names).toEqual([]);
    });

    it('should return single parameter name', () => {
      const params: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
      ];

      const names = getParameterNames(params);

      expect(names).toEqual(['id']);
    });

    it('should return multiple parameter names', () => {
      const params: MethodParameter[] = [
        {
          name: 'id',
          type: 'string',
          required: true,
          location: 'path',
        },
        {
          name: 'options',
          type: '{ from?: string }',
          required: false,
          location: 'query',
        },
        {
          name: 'data',
          type: 'CreateRequest',
          required: true,
          location: 'body',
        },
      ];

      const names = getParameterNames(params);

      expect(names).toEqual(['id', 'options', 'data']);
    });

    it('should maintain parameter order', () => {
      const params: MethodParameter[] = [
        {
          name: 'userId',
          type: 'number',
          required: true,
          location: 'path',
        },
        {
          name: 'postId',
          type: 'number',
          required: true,
          location: 'path',
        },
        {
          name: 'data',
          type: 'UpdatePostRequest',
          required: true,
          location: 'body',
        },
      ];

      const names = getParameterNames(params);

      expect(names).toEqual(['userId', 'postId', 'data']);
    });
  });
});
