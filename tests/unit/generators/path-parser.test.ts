/**
 * Unit Tests for Path Parser
 *
 * Tests OpenAPI path parsing including:
 * - Parsing paths with multiple HTTP methods
 * - Parameter merging (path-level + operation-level)
 * - Server configuration extraction
 * - Operation validation
 * - Operation identifier generation
 */

import { describe, it, expect } from 'vitest';
import {
  parsePaths,
  isValidOperation,
  getOperationIdentifier,
  type ParsedOperation,
} from '../../../tools/generators/path-parser.js';

describe('path-parser', () => {
  describe('parsePaths', () => {
    it('should parse simple GET operation', () => {
      const paths = {
        '/ping': {
          get: {
            operationId: 'ping',
            summary: 'Health check',
            description: 'Check API health',
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].path).toBe('/ping');
      expect(operations[0].method).toBe('get');
      expect(operations[0].operationId).toBe('ping');
      expect(operations[0].summary).toBe('Health check');
      expect(operations[0].description).toBe('Check API health');
      expect(operations[0].responses).toBeDefined();
    });

    it('should parse multiple HTTP methods for same path', () => {
      const paths = {
        '/users': {
          get: {
            operationId: 'getUsers',
            summary: 'Get users',
            responses: { '200': { description: 'Success' } },
          },
          post: {
            operationId: 'createUser',
            summary: 'Create user',
            responses: { '201': { description: 'Created' } },
          },
          delete: {
            operationId: 'deleteUser',
            summary: 'Delete user',
            responses: { '204': { description: 'Deleted' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(3);
      expect(operations.map((op) => op.method)).toEqual(['get', 'post', 'delete']);
      expect(operations.map((op) => op.operationId)).toEqual([
        'getUsers',
        'createUser',
        'deleteUser',
      ]);
    });

    it('should parse multiple paths', () => {
      const paths = {
        '/ping': {
          get: {
            summary: 'Health check',
            responses: { '200': { description: 'OK' } },
          },
        },
        '/users': {
          get: {
            summary: 'Get users',
            responses: { '200': { description: 'Success' } },
          },
        },
        '/products': {
          get: {
            summary: 'Get products',
            responses: { '200': { description: 'Success' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(3);
      expect(operations.map((op) => op.path)).toEqual(['/ping', '/users', '/products']);
    });

    it('should merge path-level and operation-level parameters', () => {
      const paths = {
        '/users/{id}': {
          parameters: [
            {
              name: 'id',
              in: 'path' as const,
              required: true,
              schema: { type: 'integer' },
            },
          ],
          get: {
            parameters: [
              {
                name: 'include',
                in: 'query' as const,
                schema: { type: 'string' },
              },
            ],
            responses: { '200': { description: 'Success' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].parameters).toHaveLength(2);
      expect(operations[0].parameters?.[0].name).toBe('id');
      expect(operations[0].parameters?.[0].in).toBe('path');
      expect(operations[0].parameters?.[1].name).toBe('include');
      expect(operations[0].parameters?.[1].in).toBe('query');
    });

    it('should handle operation without parameters', () => {
      const paths = {
        '/ping': {
          get: {
            responses: { '200': { description: 'OK' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].parameters).toBeUndefined();
    });

    it('should extract path-level servers', () => {
      const paths = {
        '/api/v1/data': {
          servers: [
            {
              url: 'https://api.example.com',
              description: 'Production server',
            },
          ],
          get: {
            responses: { '200': { description: 'Success' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].servers).toHaveLength(1);
      expect(operations[0].servers?.[0].url).toBe('https://api.example.com');
      expect(operations[0].servers?.[0].description).toBe('Production server');
    });

    it('should extract request body', () => {
      const paths = {
        '/users': {
          post: {
            requestBody: {
              required: true,
              description: 'User data',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      name: { type: 'string' },
                    },
                  },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].requestBody).toBeDefined();
      expect(operations[0].requestBody?.required).toBe(true);
      expect(operations[0].requestBody?.description).toBe('User data');
    });

    it('should extract external docs', () => {
      const paths = {
        '/users': {
          get: {
            externalDocs: {
              description: 'API Documentation',
              url: 'https://docs.example.com/users',
            },
            responses: { '200': { description: 'Success' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].externalDocs).toBeDefined();
      expect(operations[0].externalDocs?.url).toBe('https://docs.example.com/users');
      expect(operations[0].externalDocs?.description).toBe('API Documentation');
    });

    it('should extract tags', () => {
      const paths = {
        '/users': {
          get: {
            tags: ['users', 'authentication'],
            responses: { '200': { description: 'Success' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].tags).toEqual(['users', 'authentication']);
    });

    it('should skip invalid path items', () => {
      const paths = {
        '/valid': {
          get: {
            responses: { '200': { description: 'Success' } },
          },
        },
        '/invalid': 'not an object' as never,
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(operations[0].path).toBe('/valid');
    });

    it('should skip paths with no HTTP methods defined', () => {
      const paths = {
        '/no-methods': {
          servers: [{ url: 'https://api.example.com' }],
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(0);
    });

    it('should handle all supported HTTP methods', () => {
      const paths = {
        '/resource': {
          get: {
            responses: { '200': { description: 'Success' } },
          },
          post: {
            responses: { '201': { description: 'Created' } },
          },
          put: {
            responses: { '200': { description: 'Updated' } },
          },
          patch: {
            responses: { '200': { description: 'Patched' } },
          },
          delete: {
            responses: { '204': { description: 'Deleted' } },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(5);
      expect(operations.map((op) => op.method)).toEqual(['get', 'post', 'put', 'patch', 'delete']);
    });

    it('should handle empty paths object', () => {
      const paths = {};

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(0);
    });

    it('should handle operation with multiple response codes', () => {
      const paths = {
        '/users': {
          get: {
            responses: {
              '200': { description: 'Success' },
              '404': { description: 'Not Found' },
              '500': { description: 'Internal Server Error' },
            },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      expect(Object.keys(operations[0].responses)).toEqual(['200', '404', '500']);
    });

    it('should handle complex path with all features', () => {
      const paths = {
        '/api/v1/users/{id}': {
          servers: [{ url: 'https://api.example.com' }],
          parameters: [
            {
              name: 'id',
              in: 'path' as const,
              required: true,
              schema: { type: 'integer' },
            },
          ],
          get: {
            operationId: 'getUserById',
            summary: 'Get user by ID',
            description: 'Retrieves a user by their unique identifier',
            tags: ['users'],
            parameters: [
              {
                name: 'expand',
                in: 'query' as const,
                schema: { type: 'string' },
              },
            ],
            externalDocs: {
              url: 'https://docs.example.com/users',
            },
            responses: {
              '200': { description: 'Success' },
              '404': { description: 'Not Found' },
            },
          },
        },
      };

      const operations = parsePaths(paths);

      expect(operations).toHaveLength(1);
      const op = operations[0];
      expect(op.path).toBe('/api/v1/users/{id}');
      expect(op.method).toBe('get');
      expect(op.operationId).toBe('getUserById');
      expect(op.summary).toBe('Get user by ID');
      expect(op.description).toBe('Retrieves a user by their unique identifier');
      expect(op.tags).toEqual(['users']);
      expect(op.parameters).toHaveLength(2);
      expect(op.servers).toHaveLength(1);
      expect(op.externalDocs).toBeDefined();
      expect(Object.keys(op.responses)).toHaveLength(2);
    });
  });

  describe('isValidOperation', () => {
    it('should return true for valid operation', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'get',
        responses: {
          '200': { description: 'Success' },
        },
      };

      expect(isValidOperation(operation)).toBe(true);
    });

    it('should return false for operation with empty path', () => {
      const operation: ParsedOperation = {
        path: '',
        method: 'get',
        responses: {
          '200': { description: 'Success' },
        },
      };

      expect(isValidOperation(operation)).toBe(false);
    });

    it('should return false for operation with empty method', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: '' as never,
        responses: {
          '200': { description: 'Success' },
        },
      };

      expect(isValidOperation(operation)).toBe(false);
    });

    it('should return false for operation with no responses', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'get',
        responses: {},
      };

      expect(isValidOperation(operation)).toBe(false);
    });

    it('should return true for operation with multiple responses', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'get',
        responses: {
          '200': { description: 'Success' },
          '404': { description: 'Not Found' },
        },
      };

      expect(isValidOperation(operation)).toBe(true);
    });
  });

  describe('getOperationIdentifier', () => {
    it('should return uppercase method with path', () => {
      const operation: ParsedOperation = {
        path: '/ping',
        method: 'get',
        responses: {},
      };

      expect(getOperationIdentifier(operation)).toBe('GET /ping');
    });

    it('should handle POST method', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'post',
        responses: {},
      };

      expect(getOperationIdentifier(operation)).toBe('POST /users');
    });

    it('should handle PUT method', () => {
      const operation: ParsedOperation = {
        path: '/users/123',
        method: 'put',
        responses: {},
      };

      expect(getOperationIdentifier(operation)).toBe('PUT /users/123');
    });

    it('should handle PATCH method', () => {
      const operation: ParsedOperation = {
        path: '/users/123',
        method: 'patch',
        responses: {},
      };

      expect(getOperationIdentifier(operation)).toBe('PATCH /users/123');
    });

    it('should handle DELETE method', () => {
      const operation: ParsedOperation = {
        path: '/users/123',
        method: 'delete',
        responses: {},
      };

      expect(getOperationIdentifier(operation)).toBe('DELETE /users/123');
    });

    it('should handle complex paths with parameters', () => {
      const operation: ParsedOperation = {
        path: '/api/v1/users/{id}/posts/{postId}',
        method: 'get',
        responses: {},
      };

      expect(getOperationIdentifier(operation)).toBe('GET /api/v1/users/{id}/posts/{postId}');
    });
  });
});
