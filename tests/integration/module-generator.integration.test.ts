/**
 * Integration Tests for Module Generator
 *
 * Tests the complete module generation pipeline from OpenAPI spec to generated module file:
 * 1. Path parsing
 * 2. Method generation
 * 3. Module class generation
 * 4. TypeScript compilation
 * 5. Code structure validation
 */

import { describe, it, expect } from 'vitest';
import { parsePaths } from '../../tools/generators/path-parser.js';
import { generateModuleClass } from '../../tools/generators/module-class-generator.js';
import { generateMethod } from '../../tools/generators/module-method-generator.js';
import type { PathsObject, ServerObject } from '../../tools/generators/path-parser.js';

describe('module-generator integration', () => {
  describe('Simple GET endpoint', () => {
    it('should generate complete module for simple GET operation', () => {
      const paths: PathsObject = {
        '/ping': {
          servers: [
            {
              url: 'https://common-api.wildberries.ru',
            },
          ],
          get: {
            operationId: 'ping',
            summary: 'Health check',
            description: 'Check API connectivity',
            responses: {
              '200': {
                description: 'API is healthy',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PingResponse',
                    },
                  },
                },
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'general', '01-general.yaml');

      expect(module.moduleName).toBe('general');
      expect(module.className).toBe('GeneralModule');
      expect(module.methods).toHaveLength(1);
      expect(module.code).toContain('class GeneralModule');
      expect(module.code).toContain('constructor(private client: BaseClient)');
      expect(module.code).toContain('async ping()');
      expect(module.code).toContain('Promise<PingResponse>');
      expect(module.code).toContain("this.client.get<PingResponse>('https://common-api.wildberries.ru/ping')");
      expect(module.code).toContain('Health check');
      expect(module.code).toContain('@returns API is healthy');
      expect(module.code).toContain('@throws {AuthenticationError}');
    });
  });

  describe('POST endpoint with body', () => {
    it('should generate method with request body parameter', () => {
      const paths: PathsObject = {
        '/products': {
          servers: [
            {
              url: 'https://content-api.wildberries.ru',
            },
          ],
          post: {
            operationId: 'createProduct',
            summary: 'Create product',
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
            responses: {
              '201': {
                description: 'Product created successfully',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/ProductResponse',
                    },
                  },
                },
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'products', '02-products.yaml');

      expect(module.methods).toHaveLength(1);
      expect(module.methods[0].name).toBe('createproduct'); // toCamelCase lowercases operationId without delimiters
      expect(module.methods[0].httpMethod).toBe('post');
      expect(module.methods[0].returnType).toBe('Promise<ProductResponse>');
      expect(module.code).toContain('@param data - Product data');
    });
  });

  describe('GET endpoint with path and query parameters', () => {
    it('should generate method with path and query parameters', () => {
      const paths: PathsObject = {
        '/orders/{id}': {
          servers: [
            {
              url: 'https://marketplace-api.wildberries.ru',
            },
          ],
          get: {
            operationId: 'getOrder',
            summary: 'Get order by ID',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                },
                description: 'Order identifier',
              },
              {
                name: 'expand',
                in: 'query',
                schema: {
                  type: 'string',
                },
                description: 'Fields to expand',
              },
            ],
            responses: {
              '200': {
                description: 'Order details',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/OrderResponse',
                    },
                  },
                },
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'ordersFBS', '03-orders-fbs.yaml');

      expect(module.methods).toHaveLength(1);
      expect(module.methods[0].name).toBe('getorder'); // toCamelCase lowercases operationId without delimiters
      expect(module.methods[0].httpMethod).toBe('get');
      expect(module.methods[0].returnType).toBe('Promise<OrderResponse>');
      expect(module.code).toContain('@param id - Order identifier');
      expect(module.code).toContain('@param [options] - Query parameters');
    });
  });

  describe('DELETE endpoint returning void', () => {
    it('should generate method with void return type', () => {
      const paths: PathsObject = {
        '/items/{id}': {
          servers: [
            {
              url: 'https://api.example.com',
            },
          ],
          delete: {
            summary: 'Delete item',
            parameters: [
              {
                name: 'id',
                in: 'path',
                required: true,
                schema: {
                  type: 'string',
                },
              },
            ],
            responses: {
              '204': {
                description: 'Item deleted successfully',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'items', 'items.yaml');

      expect(module.methods).toHaveLength(1);
      expect(module.code).toContain('async deleteItem(id: string): Promise<void>');
      expect(module.code).toContain("this.client.delete(`https://api.example.com/items/${id}`)");
      expect(module.code).not.toContain('delete<void>'); // void should not be used as generic argument
    });
  });

  describe('Multiple operations on same path', () => {
    it('should generate methods for all HTTP methods on path', () => {
      const paths: PathsObject = {
        '/users': {
          servers: [
            {
              url: 'https://api.example.com',
            },
          ],
          get: {
            summary: 'List users',
            responses: {
              '200': {
                description: 'User list',
                content: {
                  'application/json': {
                    schema: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                  },
                },
              },
            },
          },
          post: {
            summary: 'Create user',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreateUserRequest',
                  },
                },
              },
            },
            responses: {
              '201': {
                description: 'User created',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/User',
                    },
                  },
                },
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'users', 'users.yaml');

      expect(module.methods).toHaveLength(2);
      expect(module.code).toContain('async users()'); // GET users
      expect(module.code).toContain('async createUsers(data: CreateUserRequest)'); // POST users
    });
  });

  describe('Module structure validation', () => {
    it('should include auto-generation warning in header', () => {
      const paths: PathsObject = {
        '/ping': {
          get: {
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.code).toContain('Auto-generated module');
      expect(module.code).toContain('Generated from: wildberries_api_doc/test.yaml');
      expect(module.code).toContain('DO NOT EDIT MANUALLY');
    });

    it('should include BaseClient import', () => {
      const paths: PathsObject = {
        '/ping': {
          get: {
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.code).toContain("import { BaseClient } from '../../client/base-client';");
    });

    it('should include type imports when types are used', () => {
      const paths: PathsObject = {
        '/ping': {
          get: {
            responses: {
              '200': {
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PingResponse',
                    },
                  },
                },
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.code).toContain("import type");
      expect(module.code).toContain("from '../../types/test.types';");
      expect(module.typeNames.has('PingResponse')).toBe(true);
    });

    it('should export module class', () => {
      const paths: PathsObject = {
        '/ping': {
          get: {
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.code).toContain('export class TestModule');
    });

    it('should include private client in constructor', () => {
      const paths: PathsObject = {
        '/ping': {
          get: {
            responses: {
              '200': {
                description: 'OK',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.code).toContain('constructor(private client: BaseClient) {}');
    });
  });

  describe('Method generation edge cases', () => {
    it('should handle duplicate method names with unique suffixes', () => {
      const paths: PathsObject = {
        '/news': {
          get: {
            summary: 'Get news',
            responses: {
              '200': {
                description: 'News list',
              },
            },
          },
        },
        '/api/news': {
          get: {
            summary: 'Get news (API)',
            responses: {
              '200': {
                description: 'News list',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.methods).toHaveLength(2);
      expect(module.code).toContain('async news()');
      expect(module.code).toContain('async news2()');
    });

    it('should handle operations without operationId', () => {
      const paths: PathsObject = {
        '/api/v1/data': {
          servers: [
            {
              url: 'https://api.example.com',
            },
          ],
          get: {
            summary: 'Get data',
            responses: {
              '200': {
                description: 'Data',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.methods).toHaveLength(1);
      expect(module.code).toContain('async data()'); // Generated from path
    });

    it('should handle operations without schemas (unknown return type)', () => {
      const paths: PathsObject = {
        '/data': {
          get: {
            summary: 'Get data',
            responses: {
              '200': {
                description: 'Success',
              },
            },
          },
        },
      };

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'test', 'test.yaml');

      expect(module.code).toContain('Promise<unknown>');
    });
  });

  describe('generateMethod direct tests', () => {
    it('should generate complete method structure', () => {
      const operation = {
        path: '/ping',
        method: 'get' as const,
        summary: 'Health check',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PingResponse',
                },
              },
            },
          },
        },
      };

      const servers: ServerObject[] = [
        {
          url: 'https://api.example.com',
        },
      ];

      const method = generateMethod(operation, servers);

      expect(method.name).toBe('ping');
      expect(method.httpMethod).toBe('get');
      expect(method.endpointUrl).toBe('https://api.example.com/ping');
      expect(method.returnType).toBe('Promise<PingResponse>');
      expect(method.code).toContain('/**');
      expect(method.code).toContain('Health check');
      expect(method.code).toContain('async ping()');
      expect(method.code).toContain("this.client.get<PingResponse>('https://api.example.com/ping')");
    });

    it('should generate method with all parameter types', () => {
      const operation = {
        path: '/users/{id}',
        method: 'put' as const,
        summary: 'Update user',
        parameters: [
          {
            name: 'id',
            in: 'path' as const,
            required: true,
            schema: {
              type: 'string' as const,
            },
          },
          {
            name: 'expand',
            in: 'query' as const,
            schema: {
              type: 'string' as const,
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateUserRequest',
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'User updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UserResponse',
                },
              },
            },
          },
        },
      };

      const servers: ServerObject[] = [
        {
          url: 'https://api.example.com',
        },
      ];

      const method = generateMethod(operation, servers);

      expect(method.code).toContain('async updateUser(id: string, data: UpdateUserRequest, options?: { expand?: string }): Promise<UserResponse>');
      expect(method.code).toContain("this.client.put<UserResponse>(`https://api.example.com/users/${id}`, data, { params: options })");
    });
  });

  describe('Empty module handling', () => {
    it('should generate module with no methods when paths are empty', () => {
      const paths: PathsObject = {};

      const operations = parsePaths(paths);
      const module = generateModuleClass(operations, 'empty', 'empty.yaml');

      expect(module.methods).toHaveLength(0);
      expect(module.code).toContain('export class EmptyModule');
      expect(module.code).toContain('constructor(private client: BaseClient) {}');
    });
  });
});
