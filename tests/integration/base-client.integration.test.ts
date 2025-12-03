/**
 * Integration tests for BaseClient with MSW (Mock Service Worker)
 *
 * Tests real HTTP request/response flows using MSW to intercept
 * network requests at the HTTP level (more realistic than mocking Axios).
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BaseClient } from '../../src/client/base-client';
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
} from '../../src/errors';
import type { SDKConfig } from '../../src/config';

// Test API base URL
const TEST_API_URL = 'https://test-api.wildberries.ru';

// Set up MSW server
const server = setupServer();

describe('BaseClient Integration Tests', () => {
  let client: BaseClient;
  const testConfig: SDKConfig = {
    apiKey: 'integration-test-key',
    timeout: 5000,
    logLevel: 'error', // Suppress logs during tests
  };

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
    client = new BaseClient(testConfig);
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Successful HTTP Requests', () => {
    it('should make successful GET request', async () => {
      interface ProductResponse {
        id: string;
        name: string;
        price: number;
      }

      const mockProduct: ProductResponse = {
        id: '123',
        name: 'Test Product',
        price: 99.99,
      };

      server.use(
        http.get(`${TEST_API_URL}/products/:id`, () => {
          return HttpResponse.json(mockProduct);
        })
      );

      const result = await client.get<ProductResponse>(`${TEST_API_URL}/products/123`);

      expect(result).toEqual(mockProduct);
      expect(result.id).toBe('123');
      expect(result.name).toBe('Test Product');
      expect(result.price).toBe(99.99);
    });

    it('should make successful POST request with data', async () => {
      interface CreateProductRequest {
        name: string;
        price: number;
      }

      interface CreateProductResponse {
        id: string;
        name: string;
        price: number;
        createdAt: string;
      }

      const requestData: CreateProductRequest = {
        name: 'New Product',
        price: 49.99,
      };

      const responseData: CreateProductResponse = {
        id: '456',
        ...requestData,
        createdAt: '2024-01-01T00:00:00Z',
      };

      server.use(
        http.post(`${TEST_API_URL}/products`, async ({ request }) => {
          const body = (await request.json()) as CreateProductRequest;
          expect(body).toEqual(requestData);
          return HttpResponse.json(responseData);
        })
      );

      const result = await client.post<CreateProductResponse>(
        `${TEST_API_URL}/products`,
        requestData
      );

      expect(result).toEqual(responseData);
      expect(result.id).toBe('456');
    });

    it('should make successful PUT request', async () => {
      const updateData = { name: 'Updated Product' };

      server.use(
        http.put(`${TEST_API_URL}/products/:id`, () => {
          return HttpResponse.json({ success: true, ...updateData });
        })
      );

      const result = await client.put(`${TEST_API_URL}/products/123`, updateData);

      expect(result).toEqual({ success: true, ...updateData });
    });

    it('should make successful PATCH request', async () => {
      const patchData = { price: 79.99 };

      server.use(
        http.patch(`${TEST_API_URL}/products/:id`, () => {
          return HttpResponse.json({ updated: true, ...patchData });
        })
      );

      const result = await client.patch(`${TEST_API_URL}/products/123`, patchData);

      expect(result).toEqual({ updated: true, ...patchData });
    });

    it('should make successful DELETE request', async () => {
      server.use(
        http.delete(`${TEST_API_URL}/products/:id`, () => {
          return HttpResponse.json({ deleted: true, id: '123' });
        })
      );

      const result = await client.delete<{ deleted: boolean; id: string }>(
        `${TEST_API_URL}/products/123`
      );

      expect(result.deleted).toBe(true);
      expect(result.id).toBe('123');
    });
  });

  describe('Authentication Headers', () => {
    it('should send Authorization header on all requests', async () => {
      server.use(
        http.get(`${TEST_API_URL}/test`, ({ request }) => {
          const authHeader = request.headers.get('Authorization');
          expect(authHeader).toBe('Bearer integration-test-key');
          return HttpResponse.json({ authenticated: true });
        })
      );

      await client.get(`${TEST_API_URL}/test`);
    });

    it('should send Content-Type header', async () => {
      server.use(
        http.get(`${TEST_API_URL}/test`, ({ request }) => {
          const contentType = request.headers.get('Content-Type');
          expect(contentType).toBe('application/json');
          return HttpResponse.json({ success: true });
        })
      );

      await client.get(`${TEST_API_URL}/test`);
    });

    it('should send User-Agent header', async () => {
      server.use(
        http.get(`${TEST_API_URL}/test`, ({ request }) => {
          const userAgent = request.headers.get('User-Agent');
          expect(userAgent).toBe('WildberriesSDK/0.1.0');
          return HttpResponse.json({ success: true });
        })
      );

      await client.get(`${TEST_API_URL}/test`);
    });

    it('should merge custom headers with defaults', async () => {
      server.use(
        http.get(`${TEST_API_URL}/test`, ({ request }) => {
          const authHeader = request.headers.get('Authorization');
          const customHeader = request.headers.get('X-Custom-Header');

          expect(authHeader).toBe('Bearer integration-test-key');
          expect(customHeader).toBe('custom-value');

          return HttpResponse.json({ success: true });
        })
      );

      await client.get(`${TEST_API_URL}/test`, {
        headers: { 'X-Custom-Header': 'custom-value' },
      });
    });
  });

  describe('Error Transformation', () => {
    it('should handle 401 as AuthenticationError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/protected`, () => {
          return new HttpResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        })
      );

      await expect(client.get(`${TEST_API_URL}/protected`)).rejects.toThrow(AuthenticationError);

      try {
        await client.get(`${TEST_API_URL}/protected`);
        expect.fail('Should have thrown AuthenticationError');
      } catch (error) {
        expect(error).toBeInstanceOf(AuthenticationError);
        expect((error as AuthenticationError).statusCode).toBe(401);
      }
    });

    it('should handle 403 as AuthenticationError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/forbidden`, () => {
          return new HttpResponse(JSON.stringify({ error: 'Forbidden' }), {
            status: 403,
          });
        })
      );

      await expect(client.get(`${TEST_API_URL}/forbidden`)).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 as RateLimitError with Retry-After header', async () => {
      server.use(
        http.get(`${TEST_API_URL}/rate-limited`, () => {
          return new HttpResponse(JSON.stringify({ error: 'Too Many Requests' }), {
            status: 429,
            headers: {
              'Retry-After': '10', // 10 seconds
            },
          });
        })
      );

      try {
        await client.get(`${TEST_API_URL}/rate-limited`);
        expect.fail('Should have thrown RateLimitError');
      } catch (error) {
        expect(error).toBeInstanceOf(RateLimitError);
        expect((error as RateLimitError).retryAfter).toBe(10000); // 10 seconds in ms
      }
    });

    it('should handle 400 as ValidationError with field errors', async () => {
      const fieldErrors = {
        brandName: 'Brand name is required',
        title: 'Title must be at least 5 characters',
      };

      server.use(
        http.post(`${TEST_API_URL}/validate`, () => {
          return new HttpResponse(
            JSON.stringify({
              error: 'Validation failed',
              errors: fieldErrors,
            }),
            { status: 400 }
          );
        })
      );

      try {
        await client.post(`${TEST_API_URL}/validate`, {});
        expect.fail('Should have thrown ValidationError');
      } catch (error) {
        expect(error).toBeInstanceOf(ValidationError);
        expect((error as ValidationError).statusCode).toBe(400);
        expect((error as ValidationError).fieldErrors).toEqual(fieldErrors);
      }
    });

    it('should handle 422 as ValidationError', async () => {
      server.use(
        http.post(`${TEST_API_URL}/unprocessable`, () => {
          return new HttpResponse(JSON.stringify({ error: 'Unprocessable Entity' }), {
            status: 422,
          });
        })
      );

      await expect(client.post(`${TEST_API_URL}/unprocessable`, {})).rejects.toThrow(
        ValidationError
      );
    });

    it('should handle 500 as NetworkError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/server-error`, () => {
          return new HttpResponse(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
          });
        })
      );

      try {
        await client.get(`${TEST_API_URL}/server-error`);
        expect.fail('Should have thrown NetworkError');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as NetworkError).statusCode).toBe(500);
        expect((error as NetworkError).isTimeout).toBe(false);
      }
    });

    it('should handle 502 as NetworkError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/bad-gateway`, () => {
          return new HttpResponse(null, { status: 502 });
        })
      );

      await expect(client.get(`${TEST_API_URL}/bad-gateway`)).rejects.toThrow(NetworkError);
    });

    it('should handle 503 as NetworkError', async () => {
      server.use(
        http.get(`${TEST_API_URL}/service-unavailable`, () => {
          return new HttpResponse(null, { status: 503 });
        })
      );

      await expect(client.get(`${TEST_API_URL}/service-unavailable`)).rejects.toThrow(NetworkError);
    });
  });

  describe('Timeout Handling', () => {
    it('should timeout on slow requests', async () => {
      const slowClient = new BaseClient({
        apiKey: 'test-key',
        timeout: 100, // 100ms timeout
        logLevel: 'error',
      });

      server.use(
        http.get(`${TEST_API_URL}/slow`, async () => {
          // Delay longer than timeout
          await new Promise((resolve) => setTimeout(resolve, 200));
          return HttpResponse.json({ data: 'slow' });
        })
      );

      try {
        await slowClient.get(`${TEST_API_URL}/slow`);
        expect.fail('Should have thrown NetworkError for timeout');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as NetworkError).isTimeout).toBe(true);
      }
    });
  });

  describe('Request Body Handling', () => {
    it('should send POST request body as JSON', async () => {
      const requestData = {
        name: 'Test Product',
        price: 99.99,
        tags: ['electronics', 'new'],
      };

      server.use(
        http.post(`${TEST_API_URL}/products`, async ({ request }) => {
          const body = await request.json();
          expect(body).toEqual(requestData);
          return HttpResponse.json({ success: true, id: '789' });
        })
      );

      await client.post(`${TEST_API_URL}/products`, requestData);
    });

    it('should handle POST with undefined data', async () => {
      server.use(
        http.post(`${TEST_API_URL}/ping`, () => {
          return HttpResponse.json({ pong: true });
        })
      );

      const result = await client.post(`${TEST_API_URL}/ping`);
      expect(result).toEqual({ pong: true });
    });
  });

  describe('Response Handling', () => {
    it('should handle empty response body', async () => {
      server.use(
        http.delete(`${TEST_API_URL}/products/:id`, () => {
          return new HttpResponse(null, { status: 204 });
        })
      );

      const result = await client.delete(`${TEST_API_URL}/products/123`);
      // Axios returns empty string for 204 No Content
      expect(result).toBe('');
    });

    it('should handle JSON arrays', async () => {
      const products = [
        { id: '1', name: 'Product 1' },
        { id: '2', name: 'Product 2' },
        { id: '3', name: 'Product 3' },
      ];

      server.use(
        http.get(`${TEST_API_URL}/products`, () => {
          return HttpResponse.json(products);
        })
      );

      const result = await client.get<typeof products>(`${TEST_API_URL}/products`);

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(3);
      expect(result[0].id).toBe('1');
    });

    it('should handle nested JSON objects', async () => {
      const complexResponse = {
        data: {
          user: {
            id: '123',
            name: 'John Doe',
            settings: {
              notifications: true,
              theme: 'dark',
            },
          },
          metadata: {
            timestamp: '2024-01-01T00:00:00Z',
            version: '1.0',
          },
        },
      };

      server.use(
        http.get(`${TEST_API_URL}/complex`, () => {
          return HttpResponse.json(complexResponse);
        })
      );

      const result = await client.get<typeof complexResponse>(`${TEST_API_URL}/complex`);

      expect(result.data.user.name).toBe('John Doe');
      expect(result.data.user.settings.theme).toBe('dark');
      expect(result.data.metadata.version).toBe('1.0');
    });
  });
});
