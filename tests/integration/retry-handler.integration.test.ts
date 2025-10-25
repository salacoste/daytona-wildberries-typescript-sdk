/**
 * Integration tests for RetryHandler with BaseClient
 *
 * Tests end-to-end retry behavior with real HTTP scenarios using MSW.
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, vi } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import { BaseClient } from '../../src/client/base-client';
import { NetworkError, AuthenticationError, ValidationError, WBAPIError } from '../../src/errors';

// Test API endpoint
const TEST_URL = 'https://test-api.wildberries.ru/api/v1/test';

// MSW server setup
const server = setupServer();

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  server.resetHandlers();
  vi.restoreAllMocks();
});

afterAll(() => {
  server.close();
});

describe('RetryHandler Integration Tests', () => {
  describe('Transient 500 error recovery', () => {
    it('should retry and succeed after transient 500 error', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json({ error: 'Internal Server Error' }, { status: 500 });
          }
          return HttpResponse.json({ success: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 3,
          retryDelay: 100,
        },
      });

      const result = await client.get<{ success: boolean }>(TEST_URL);

      expect(result).toEqual({ success: true });
      expect(attempts).toBe(2); // Failed once, succeeded on retry
    });

    it('should retry multiple times before succeeding', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          if (attempts <= 2) {
            return HttpResponse.json({ error: 'Server Error' }, { status: 500 });
          }
          return HttpResponse.json({ data: 'success' });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 3,
          retryDelay: 50,
        },
      });

      const result = await client.get<{ data: string }>(TEST_URL);

      expect(result).toEqual({ data: 'success' });
      expect(attempts).toBe(3); // Failed twice, succeeded on third attempt
    });
  });

  describe('Network timeout recovery', () => {
    it('should retry after timeout and succeed', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, async () => {
          attempts++;
          if (attempts === 1) {
            // Simulate timeout (delay longer than client timeout)
            await delay(5000);
            return HttpResponse.json({ error: 'Timeout' });
          }
          return HttpResponse.json({ success: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        timeout: 1000, // 1 second timeout
        retryConfig: {
          maxRetries: 2,
          retryDelay: 50,
        },
      });

      const result = await client.get<{ success: boolean }>(TEST_URL);

      expect(result).toEqual({ success: true });
      expect(attempts).toBe(2);
    });
  });

  describe('429 Rate Limit recovery', () => {
    it('should retry after 429 rate limit error', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json(
              { error: 'Rate limit exceeded' },
              {
                status: 429,
                headers: { 'Retry-After': '1' }, // 1 second
              }
            );
          }
          return HttpResponse.json({ data: 'success after rate limit' });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 2,
          retryDelay: 100,
        },
      });

      const result = await client.get<{ data: string }>(TEST_URL);

      expect(result).toEqual({ data: 'success after rate limit' });
      expect(attempts).toBe(2);
    });
  });

  describe('Permanent error - no retry', () => {
    it('should NOT retry on 401 authentication error', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          return HttpResponse.json({ error: 'Unauthorized' }, { status: 401 });
        })
      );

      const client = new BaseClient({
        apiKey: 'invalid-key',
        retryConfig: {
          maxRetries: 3,
          retryDelay: 50,
        },
      });

      await expect(client.get(TEST_URL)).rejects.toThrow(AuthenticationError);
      expect(attempts).toBe(1); // No retry
    });

    it('should NOT retry on 400 validation error', async () => {
      let attempts = 0;

      server.use(
        http.post(TEST_URL, () => {
          attempts++;
          return HttpResponse.json(
            { errors: { brandName: 'Required field' } },
            { status: 400 }
          );
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 3,
          retryDelay: 50,
        },
      });

      await expect(client.post(TEST_URL, { title: 'Test' })).rejects.toThrow(
        ValidationError
      );
      expect(attempts).toBe(1); // No retry
    });

    it('should NOT retry on 404 not found error', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 3,
          retryDelay: 50,
        },
      });

      await expect(client.get(TEST_URL)).rejects.toThrow(WBAPIError);
      expect(attempts).toBe(1); // No retry for 404
    });
  });

  describe('Retry exhaustion', () => {
    it('should throw error after all retries exhausted', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          return HttpResponse.json({ error: 'Persistent error' }, { status: 503 });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 2,
          retryDelay: 50,
        },
      });

      await expect(client.get(TEST_URL)).rejects.toThrow(NetworkError);
      expect(attempts).toBe(3); // Initial + 2 retries
    });

    it('should preserve error details after retry exhaustion', async () => {
      server.use(
        http.get(TEST_URL, () => {
          return HttpResponse.json({ error: 'Service Unavailable' }, { status: 503 });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 1,
          retryDelay: 50,
        },
      });

      try {
        await client.get(TEST_URL);
        expect.fail('Should have thrown NetworkError');
      } catch (error) {
        expect(error).toBeInstanceOf(NetworkError);
        expect((error as NetworkError).statusCode).toBe(503);
        expect((error as NetworkError).message).toContain('503');
      }
    });
  });

  describe('BaseClient integration with all HTTP methods', () => {
    it('should retry POST requests on transient failures', async () => {
      let attempts = 0;

      server.use(
        http.post(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json({ error: 'Server Error' }, { status: 500 });
          }
          return HttpResponse.json({ id: '123', created: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: { maxRetries: 2, retryDelay: 50 },
      });

      const result = await client.post<{ id: string; created: boolean }>(TEST_URL, {
        title: 'Test',
      });

      expect(result).toEqual({ id: '123', created: true });
      expect(attempts).toBe(2);
    });

    it('should retry PUT requests on transient failures', async () => {
      let attempts = 0;

      server.use(
        http.put(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json({ error: 'Bad Gateway' }, { status: 502 });
          }
          return HttpResponse.json({ updated: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: { maxRetries: 2, retryDelay: 50 },
      });

      const result = await client.put<{ updated: boolean }>(TEST_URL, { title: 'Updated' });

      expect(result).toEqual({ updated: true });
      expect(attempts).toBe(2);
    });

    it('should retry PATCH requests on transient failures', async () => {
      let attempts = 0;

      server.use(
        http.patch(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json({ error: 'Service Unavailable' }, { status: 503 });
          }
          return HttpResponse.json({ patched: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: { maxRetries: 2, retryDelay: 50 },
      });

      const result = await client.patch<{ patched: boolean }>(TEST_URL, { stock: 100 });

      expect(result).toEqual({ patched: true });
      expect(attempts).toBe(2);
    });

    it('should retry DELETE requests on transient failures', async () => {
      let attempts = 0;

      server.use(
        http.delete(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json({ error: 'Gateway Timeout' }, { status: 504 });
          }
          return HttpResponse.json({ deleted: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: { maxRetries: 2, retryDelay: 50 },
      });

      const result = await client.delete<{ deleted: boolean }>(TEST_URL);

      expect(result).toEqual({ deleted: true });
      expect(attempts).toBe(2);
    });
  });

  describe('Retry configuration', () => {
    it('should respect custom maxRetries setting', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          return HttpResponse.json({ error: 'Error' }, { status: 500 });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 5,
          retryDelay: 10,
        },
      });

      await expect(client.get(TEST_URL)).rejects.toThrow(NetworkError);
      expect(attempts).toBe(6); // Initial + 5 retries
    });

    it('should work with retries disabled (maxRetries: 0)', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          return HttpResponse.json({ error: 'Error' }, { status: 500 });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: {
          maxRetries: 0,
          retryDelay: 50,
        },
      });

      await expect(client.get(TEST_URL)).rejects.toThrow(NetworkError);
      expect(attempts).toBe(1); // No retries
    });
  });

  describe('502 Bad Gateway recovery', () => {
    it('should retry and recover from 502 error', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json({ error: 'Bad Gateway' }, { status: 502 });
          }
          return HttpResponse.json({ recovered: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: { maxRetries: 2, retryDelay: 50 },
      });

      const result = await client.get<{ recovered: boolean }>(TEST_URL);

      expect(result).toEqual({ recovered: true });
      expect(attempts).toBe(2);
    });
  });

  describe('504 Gateway Timeout recovery', () => {
    it('should retry and recover from 504 error', async () => {
      let attempts = 0;

      server.use(
        http.get(TEST_URL, () => {
          attempts++;
          if (attempts === 1) {
            return HttpResponse.json({ error: 'Gateway Timeout' }, { status: 504 });
          }
          return HttpResponse.json({ recovered: true });
        })
      );

      const client = new BaseClient({
        apiKey: 'test-key',
        retryConfig: { maxRetries: 2, retryDelay: 50 },
      });

      const result = await client.get<{ recovered: boolean }>(TEST_URL);

      expect(result).toEqual({ recovered: true });
      expect(attempts).toBe(2);
    });
  });
});
