/**
 * Unit Tests for Response Type Mapper
 *
 * Tests response type extraction from OpenAPI responses including:
 * - Response priority ordering (200 > 201 > 202 > 204)
 * - Schema resolution ($ref, inline, arrays, primitives)
 * - Void responses (204 No Content)
 * - Promise wrapping for async methods
 * - Content type handling (application/json)
 */

import { describe, it, expect } from 'vitest';
import {
  extractResponseType,
  extractTypeFromResponse,
  isVoidResponse,
  getSuccessStatusCode,
} from '../../../tools/generators/response-type-mapper.js';
import type { ParsedOperation, ResponseObject } from '../../../tools/generators/path-parser.js';

describe('response-type-mapper', () => {
  describe('extractResponseType', () => {
    describe('Priority ordering', () => {
      it('should prefer 200 response over 201', () => {
        const operation: ParsedOperation = {
          path: '/users',
          method: 'get',
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/UserResponse',
                  },
                },
              },
            },
            '201': {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreatedResponse',
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<UserResponse>');
      });

      it('should use 201 when 200 is not present', () => {
        const operation: ParsedOperation = {
          path: '/users',
          method: 'post',
          responses: {
            '201': {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/CreatedUserResponse',
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<CreatedUserResponse>');
      });

      it('should use 202 when 200 and 201 are not present', () => {
        const operation: ParsedOperation = {
          path: '/jobs',
          method: 'post',
          responses: {
            '202': {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/JobAcceptedResponse',
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<JobAcceptedResponse>');
      });

      it('should use 204 when higher priority codes are not present', () => {
        const operation: ParsedOperation = {
          path: '/users/{id}',
          method: 'delete',
          responses: {
            '204': {
              description: 'User deleted successfully',
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<void>');
      });

      it('should use first 2xx response when priority codes are not present', () => {
        const operation: ParsedOperation = {
          path: '/data',
          method: 'get',
          responses: {
            '206': {
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PartialResponse',
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<PartialResponse>');
      });
    });

    describe('Schema types', () => {
      it('should extract $ref schema', () => {
        const operation: ParsedOperation = {
          path: '/ping',
          method: 'get',
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
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<PingResponse>');
      });

      it('should extract array schema', () => {
        const operation: ParsedOperation = {
          path: '/news',
          method: 'get',
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/NewsItem',
                    },
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<NewsItem[]>');
      });

      it('should extract inline object schema', () => {
        const operation: ParsedOperation = {
          path: '/data',
          method: 'get',
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string' },
                      count: { type: 'integer' },
                    },
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toContain('Promise<');
        expect(type).toContain('status');
        expect(type).toContain('count');
      });

      it('should extract primitive string schema', () => {
        const operation: ParsedOperation = {
          path: '/text',
          method: 'get',
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: {
                    type: 'string',
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<string>');
      });

      it('should extract primitive number schema', () => {
        const operation: ParsedOperation = {
          path: '/count',
          method: 'get',
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<number>');
      });

      it('should extract primitive boolean schema', () => {
        const operation: ParsedOperation = {
          path: '/status',
          method: 'get',
          responses: {
            '200': {
              content: {
                'application/json': {
                  schema: {
                    type: 'boolean',
                  },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<boolean>');
      });
    });

    describe('Void responses', () => {
      it('should return Promise<void> for 204 No Content', () => {
        const operation: ParsedOperation = {
          path: '/items/{id}',
          method: 'delete',
          responses: {
            '204': {
              description: 'Deleted successfully',
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<void>');
      });

      it('should return Promise<void> for 204 even with content', () => {
        const operation: ParsedOperation = {
          path: '/items/{id}',
          method: 'delete',
          responses: {
            '204': {
              description: 'Deleted',
              content: {
                'application/json': {
                  schema: { type: 'string' },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<void>');
      });
    });

    describe('Missing schemas', () => {
      it('should return Promise<unknown> when no content', () => {
        const operation: ParsedOperation = {
          path: '/data',
          method: 'get',
          responses: {
            '200': {
              description: 'Success',
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<unknown>');
      });

      it('should return Promise<unknown> when no application/json', () => {
        const operation: ParsedOperation = {
          path: '/file',
          method: 'get',
          responses: {
            '200': {
              content: {
                'text/plain': {
                  schema: { type: 'string' },
                },
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<unknown>');
      });

      it('should return Promise<unknown> when no schema in content', () => {
        const operation: ParsedOperation = {
          path: '/data',
          method: 'get',
          responses: {
            '200': {
              content: {
                'application/json': {},
              },
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<unknown>');
      });

      it('should return Promise<unknown> when only error responses', () => {
        const operation: ParsedOperation = {
          path: '/data',
          method: 'get',
          responses: {
            '400': {
              description: 'Bad Request',
            },
            '500': {
              description: 'Internal Server Error',
            },
          },
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<unknown>');
      });

      it('should return Promise<unknown> when no responses', () => {
        const operation: ParsedOperation = {
          path: '/data',
          method: 'get',
          responses: {},
        };

        const type = extractResponseType(operation);

        expect(type).toBe('Promise<unknown>');
      });
    });

    describe('Promise wrapping', () => {
      it('should always wrap return type in Promise', () => {
        const operation: ParsedOperation = {
          path: '/ping',
          method: 'get',
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
        };

        const type = extractResponseType(operation);

        expect(type).toMatch(/^Promise</);
        expect(type).toMatch(/>$/);
      });
    });
  });

  describe('extractTypeFromResponse', () => {
    it('should extract type from response with schema', () => {
      const response: ResponseObject = {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserResponse',
            },
          },
        },
      };

      const type = extractTypeFromResponse(response, '200');

      expect(type).toBe('UserResponse');
    });

    it('should return void for 204 response', () => {
      const response: ResponseObject = {
        description: 'No Content',
      };

      const type = extractTypeFromResponse(response, '204');

      expect(type).toBe('void');
    });

    it('should return void for 204 even with schema', () => {
      const response: ResponseObject = {
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      };

      const type = extractTypeFromResponse(response, '204');

      expect(type).toBe('void');
    });

    it('should return unknown when no content', () => {
      const response: ResponseObject = {
        description: 'Success',
      };

      const type = extractTypeFromResponse(response, '200');

      expect(type).toBe('unknown');
    });

    it('should return unknown when no application/json content', () => {
      const response: ResponseObject = {
        content: {
          'text/html': {
            schema: { type: 'string' },
          },
        },
      };

      const type = extractTypeFromResponse(response, '200');

      expect(type).toBe('unknown');
    });

    it('should return unknown when no schema', () => {
      const response: ResponseObject = {
        content: {
          'application/json': {},
        },
      };

      const type = extractTypeFromResponse(response, '200');

      expect(type).toBe('unknown');
    });

    it('should handle array schema', () => {
      const response: ResponseObject = {
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
      };

      const type = extractTypeFromResponse(response, '200');

      expect(type).toBe('Item[]');
    });

    it('should handle primitive types', () => {
      const response: ResponseObject = {
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      };

      const type = extractTypeFromResponse(response, '200');

      expect(type).toBe('string');
    });
  });

  describe('isVoidResponse', () => {
    it('should return true for 204 status code', () => {
      expect(isVoidResponse('204')).toBe(true);
    });

    it('should return false for 200 status code', () => {
      expect(isVoidResponse('200')).toBe(false);
    });

    it('should return false for 201 status code', () => {
      expect(isVoidResponse('201')).toBe(false);
    });

    it('should return false for 202 status code', () => {
      expect(isVoidResponse('202')).toBe(false);
    });

    it('should return false for 404 status code', () => {
      expect(isVoidResponse('404')).toBe(false);
    });

    it('should return false for 500 status code', () => {
      expect(isVoidResponse('500')).toBe(false);
    });

    it('should return false for empty string', () => {
      expect(isVoidResponse('')).toBe(false);
    });
  });

  describe('getSuccessStatusCode', () => {
    it('should return 200 when present', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'get',
        responses: {
          '200': { description: 'OK' },
          '201': { description: 'Created' },
          '400': { description: 'Bad Request' },
        },
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBe('200');
    });

    it('should return 201 when 200 is not present', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'post',
        responses: {
          '201': { description: 'Created' },
          '400': { description: 'Bad Request' },
        },
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBe('201');
    });

    it('should return 202 when 200 and 201 are not present', () => {
      const operation: ParsedOperation = {
        path: '/jobs',
        method: 'post',
        responses: {
          '202': { description: 'Accepted' },
          '400': { description: 'Bad Request' },
        },
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBe('202');
    });

    it('should return 204 when higher priority codes are not present', () => {
      const operation: ParsedOperation = {
        path: '/items/{id}',
        method: 'delete',
        responses: {
          '204': { description: 'No Content' },
          '404': { description: 'Not Found' },
        },
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBe('204');
    });

    it('should return first 2xx code when priority codes are not present', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        responses: {
          '206': { description: 'Partial Content' },
          '400': { description: 'Bad Request' },
        },
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBe('206');
    });

    it('should return undefined when only error responses', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        responses: {
          '400': { description: 'Bad Request' },
          '404': { description: 'Not Found' },
          '500': { description: 'Internal Server Error' },
        },
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBeUndefined();
    });

    it('should return undefined when no responses', () => {
      const operation: ParsedOperation = {
        path: '/data',
        method: 'get',
        responses: {},
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBeUndefined();
    });

    it('should handle multiple 2xx responses and return priority code', () => {
      const operation: ParsedOperation = {
        path: '/users',
        method: 'post',
        responses: {
          '200': { description: 'OK' },
          '201': { description: 'Created' },
          '202': { description: 'Accepted' },
          '204': { description: 'No Content' },
          '206': { description: 'Partial Content' },
        },
      };

      const code = getSuccessStatusCode(operation);

      expect(code).toBe('200'); // Highest priority
    });
  });
});
