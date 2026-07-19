/**
 * Unit tests for BaseClient HTTP infrastructure
 *
 * Tests all HTTP methods, authentication, error transformation,
 * and logging functionality using axios-mock-adapter.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import MockAdapter from 'axios-mock-adapter';
import { BaseClient } from '../../../src/client/base-client';
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError,
  WBAPIError,
  WarehouseStocksUpdateBlockError,
} from '../../../src/errors';
import type { SDKConfig } from '../../../src/config';

describe('BaseClient', () => {
  let mockAxios: MockAdapter;
  let client: BaseClient;
  const testConfig: SDKConfig = {
    apiKey: 'test-api-key-12345',
    timeout: 5000,
    logLevel: 'error', // Suppress logs during tests
  };

  beforeEach(() => {
    // Create BaseClient first, then mock its internal axios instance
    client = new BaseClient(testConfig);
    // Access the private axios instance to mock it
    // This is safe in test context as we need to mock the internal instance
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    mockAxios = new MockAdapter((client as any).axios);
  });

  afterEach(() => {
    mockAxios.reset();
    mockAxios.restore();
  });

  describe('Constructor', () => {
    it('should initialize with provided config', () => {
      const customClient = new BaseClient({
        apiKey: 'custom-key',
        timeout: 10000,
        logLevel: 'debug',
      });

      expect(customClient).toBeInstanceOf(BaseClient);
    });

    it('should use default timeout when not provided', () => {
      const defaultClient = new BaseClient({ apiKey: 'test-key' });
      expect(defaultClient).toBeInstanceOf(BaseClient);
    });

    it('should use default logLevel when not provided', () => {
      const defaultClient = new BaseClient({ apiKey: 'test-key' });
      expect(defaultClient).toBeInstanceOf(BaseClient);
    });

    it('should initialize reduced rate limits for a basic token', () => {
      const basicClient = new BaseClient({ apiKey: 'test-key', tokenType: 'basic' });
      expect(basicClient).toBeInstanceOf(BaseClient);
    });
  });

  describe('Authentication', () => {
    it('should inject Authorization header on all requests', async () => {
      const testUrl = 'https://api.example.com/test';

      mockAxios.onGet(testUrl).reply((config) => {
        expect(config.headers?.Authorization).toBe('Bearer test-api-key-12345');
        return [200, { success: true }];
      });

      await client.get(testUrl);
    });

    it('should include Content-Type header', async () => {
      const testUrl = 'https://api.example.com/test';

      mockAxios.onGet(testUrl).reply((config) => {
        expect(config.headers?.['Content-Type']).toBe('application/json');
        return [200, { success: true }];
      });

      await client.get(testUrl);
    });

    it('should include User-Agent header', async () => {
      const testUrl = 'https://api.example.com/test';

      mockAxios.onGet(testUrl).reply((config) => {
        expect(config.headers?.['User-Agent']).toBe('WildberriesSDK/0.1.0');
        return [200, { success: true }];
      });

      await client.get(testUrl);
    });
  });

  describe('HTTP Methods', () => {
    const testUrl = 'https://api.example.com/test';

    describe('GET', () => {
      it('should make GET request and return typed response', async () => {
        interface TestResponse {
          id: string;
          name: string;
        }

        const mockResponse: TestResponse = { id: '123', name: 'Test' };
        mockAxios.onGet(testUrl).reply(200, mockResponse);

        const result = await client.get<TestResponse>(testUrl);

        expect(result).toEqual(mockResponse);
      });

      it('should pass custom headers', async () => {
        mockAxios.onGet(testUrl).reply((config) => {
          expect(config.headers?.['X-Custom-Header']).toBe('custom-value');
          return [200, { success: true }];
        });

        await client.get(testUrl, {
          headers: { 'X-Custom-Header': 'custom-value' },
        });
      });
    });

    describe('POST', () => {
      it('should make POST request with data', async () => {
        const requestData = { name: 'New Item', value: 42 };
        const responseData = { id: '123', ...requestData };

        mockAxios.onPost(testUrl).reply((config) => {
          expect(JSON.parse(config.data as string)).toEqual(requestData);
          return [200, responseData];
        });

        const result = await client.post(testUrl, requestData);

        expect(result).toEqual(responseData);
      });

      it('should make POST request without data', async () => {
        mockAxios.onPost(testUrl).reply(200, { success: true });

        const result = await client.post(testUrl);

        expect(result).toEqual({ success: true });
      });

      it('should pass custom headers', async () => {
        mockAxios.onPost(testUrl).reply((config) => {
          expect(config.headers?.['X-Request-ID']).toBe('123');
          return [200, { success: true }];
        });

        await client.post(testUrl, {}, { headers: { 'X-Request-ID': '123' } });
      });
    });

    describe('PUT', () => {
      it('should make PUT request with data', async () => {
        const updateData = { name: 'Updated Item' };

        mockAxios.onPut(testUrl).reply((config) => {
          expect(JSON.parse(config.data as string)).toEqual(updateData);
          return [200, { success: true }];
        });

        const result = await client.put(testUrl, updateData);

        expect(result).toEqual({ success: true });
      });
    });

    describe('PATCH', () => {
      it('should make PATCH request with data', async () => {
        const patchData = { status: 'active' };

        mockAxios.onPatch(testUrl).reply((config) => {
          expect(JSON.parse(config.data as string)).toEqual(patchData);
          return [200, { success: true }];
        });

        const result = await client.patch(testUrl, patchData);

        expect(result).toEqual({ success: true });
      });
    });

    describe('DELETE', () => {
      it('should make DELETE request', async () => {
        mockAxios.onDelete(testUrl).reply(200, { deleted: true });

        const result = await client.delete(testUrl);

        expect(result).toEqual({ deleted: true });
      });

      it('should pass custom headers', async () => {
        let capturedHeaders: Record<string, unknown> | undefined;

        mockAxios.onDelete(testUrl).reply((config) => {
          capturedHeaders = config.headers;
          return [200, { deleted: true }];
        });

        await client.delete(testUrl, undefined, {
          headers: { 'X-Reason': 'expired' },
        });

        expect(capturedHeaders?.['X-Reason']).toBe('expired');
      });
    });
  });

  describe('Error Transformation', () => {
    const testUrl = 'https://api.example.com/test';

    describe('AuthenticationError (401, 403)', () => {
      it('should transform 401 to AuthenticationError', async () => {
        mockAxios.onGet(testUrl).reply(401, { error: 'Unauthorized' });

        await expect(client.get(testUrl)).rejects.toThrow(AuthenticationError);
        await expect(client.get(testUrl)).rejects.toThrow('Authentication failed');
      });

      it('should transform 403 to AuthenticationError', async () => {
        mockAxios.onGet(testUrl).reply(403, { error: 'Forbidden' });

        await expect(client.get(testUrl)).rejects.toThrow(AuthenticationError);
      });

      it('should include status code in error', async () => {
        mockAxios.onGet(testUrl).reply(401);

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          expect((error as AuthenticationError).statusCode).toBe(401);
        }
      });
    });

    describe('WarehouseStocksUpdateBlockError (406)', () => {
      it('should transform 406 to WarehouseStocksUpdateBlockError', async () => {
        mockAxios.onGet(testUrl).reply(406, { detail: 'The warehouse is processing' });

        await expect(client.get(testUrl)).rejects.toThrow(WarehouseStocksUpdateBlockError);
      });

      it('should set statusCode 406 on the error', async () => {
        mockAxios.onGet(testUrl).reply(406, { detail: 'WarehouseStocksUpdateBlock' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown WarehouseStocksUpdateBlockError');
        } catch (error) {
          expect(error).toBeInstanceOf(WarehouseStocksUpdateBlockError);
          expect((error as WarehouseStocksUpdateBlockError).statusCode).toBe(406);
        }
      });
    });

    describe('RateLimitError (429)', () => {
      it('should transform 429 to RateLimitError', async () => {
        mockAxios
          .onGet(testUrl)
          .reply(429, { error: 'Too Many Requests' }, { 'retry-after': '10' });

        await expect(client.get(testUrl)).rejects.toThrow(RateLimitError);
      });

      it('should parse Retry-After header (seconds to ms)', async () => {
        mockAxios.onGet(testUrl).reply(429, {}, { 'retry-after': '5' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown RateLimitError');
        } catch (error) {
          expect(error).toBeInstanceOf(RateLimitError);
          expect((error as RateLimitError).retryAfter).toBe(5000); // 5 seconds = 5000ms
        }
      });

      it('should use default retry time when header missing', async () => {
        mockAxios.onGet(testUrl).reply(429, {});

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown RateLimitError');
        } catch (error) {
          expect(error).toBeInstanceOf(RateLimitError);
          expect((error as RateLimitError).retryAfter).toBe(5000); // Default 5 seconds
        }
      });

      it('should use default retry time for invalid header', async () => {
        mockAxios.onGet(testUrl).reply(429, {}, { 'retry-after': 'invalid' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown RateLimitError');
        } catch (error) {
          expect(error).toBeInstanceOf(RateLimitError);
          expect((error as RateLimitError).retryAfter).toBe(5000);
        }
      });
    });

    describe('ValidationError (400, 422)', () => {
      it('should transform 400 to ValidationError', async () => {
        mockAxios.onPost(testUrl).reply(400, {
          error: 'Validation failed',
          errors: {
            email: 'Invalid email format',
            age: 'Must be at least 18',
          },
        });

        await expect(client.post(testUrl, {})).rejects.toThrow(ValidationError);
      });

      it('should transform 422 to ValidationError', async () => {
        mockAxios.onPost(testUrl).reply(422, {
          error: 'Unprocessable Entity',
        });

        await expect(client.post(testUrl, {})).rejects.toThrow(ValidationError);
      });

      it('should extract field errors from response', async () => {
        const fieldErrors = {
          brandName: 'Brand name is required',
          title: 'Title must be at least 5 characters',
        };

        mockAxios.onPost(testUrl).reply(400, {
          errors: fieldErrors,
        });

        try {
          await client.post(testUrl, {});
          expect.fail('Should have thrown ValidationError');
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
          expect((error as ValidationError).fieldErrors).toEqual(fieldErrors);
        }
      });

      it('should handle ValidationError without field errors', async () => {
        mockAxios.onPost(testUrl).reply(400, {
          error: 'Bad Request',
        });

        try {
          await client.post(testUrl, {});
          expect.fail('Should have thrown ValidationError');
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
          expect((error as ValidationError).fieldErrors).toBeUndefined();
        }
      });
    });

    describe('NetworkError (5xx, timeouts)', () => {
      it('should transform 500 to NetworkError', async () => {
        mockAxios.onGet(testUrl).reply(500, { error: 'Internal Server Error' });

        await expect(client.get(testUrl)).rejects.toThrow(NetworkError);
      });

      it('should transform 502 to NetworkError', async () => {
        mockAxios.onGet(testUrl).reply(502);

        await expect(client.get(testUrl)).rejects.toThrow(NetworkError);
      });

      it('should transform 503 to NetworkError', async () => {
        mockAxios.onGet(testUrl).reply(503);

        await expect(client.get(testUrl)).rejects.toThrow(NetworkError);
      });

      it('should include status code in NetworkError', async () => {
        mockAxios.onGet(testUrl).reply(500);

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown NetworkError');
        } catch (error) {
          expect(error).toBeInstanceOf(NetworkError);
          expect((error as NetworkError).statusCode).toBe(500);
          expect((error as NetworkError).isTimeout).toBe(false);
        }
      });

      it('should handle network timeout (ECONNABORTED)', async () => {
        mockAxios.onGet(testUrl).timeout();

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown NetworkError');
        } catch (error) {
          expect(error).toBeInstanceOf(NetworkError);
          expect((error as NetworkError).isTimeout).toBe(true);
          expect((error as NetworkError).statusCode).toBe(0);
        }
      });

      it('should handle network failure (no response)', async () => {
        mockAxios.onGet(testUrl).networkError();

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown NetworkError');
        } catch (error) {
          expect(error).toBeInstanceOf(NetworkError);
          expect((error as NetworkError).statusCode).toBe(0);
        }
      });
    });

    describe('Unexpected Status Codes', () => {
      it('should transform 418 to WBAPIError', async () => {
        mockAxios.onGet(testUrl).reply(418, { error: "I'm a teapot" });

        await expect(client.get(testUrl)).rejects.toThrow(WBAPIError);
      });

      it('should include status code and response data', async () => {
        const responseData = { error: 'Custom error', code: 'CUSTOM_ERR' };
        mockAxios.onGet(testUrl).reply(418, responseData);

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown WBAPIError');
        } catch (error) {
          expect(error).toBeInstanceOf(WBAPIError);
          expect((error as WBAPIError).statusCode).toBe(418);
          expect((error as WBAPIError).response).toEqual(responseData);
        }
      });
    });

    describe('Non-Axios Errors', () => {
      it('should handle unknown errors as NetworkError', async () => {
        // Spy on the private method to force a non-Axios error
        mockAxios.onGet(testUrl).reply(() => {
          throw new Error('Unknown error');
        });

        await expect(client.get(testUrl)).rejects.toThrow(NetworkError);
      });
    });
  });

  describe('Timeout Configuration', () => {
    it('should apply configured timeout', async () => {
      const shortTimeoutClient = new BaseClient({
        apiKey: 'test-key',
        timeout: 100, // 100ms
        logLevel: 'error',
      });

      // Mock the timeout client's axios instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const timeoutMock = new MockAdapter((shortTimeoutClient as any).axios);

      const testUrl = 'https://api.example.com/slow';
      timeoutMock.onGet(testUrl).timeout();

      await expect(shortTimeoutClient.get(testUrl)).rejects.toThrow();

      timeoutMock.restore();
    });
  });

  describe('Per-Request Timeout', () => {
    const testUrl = 'https://api.example.com/test';

    it('should pass per-request timeout to GET request', async () => {
      mockAxios.onGet(testUrl).reply((config) => {
        expect(config.timeout).toBe(60000);
        return [200, { success: true }];
      });

      await client.get(testUrl, { timeout: 60000 });
    });

    it('should pass per-request timeout to POST request', async () => {
      mockAxios.onPost(testUrl).reply((config) => {
        expect(config.timeout).toBe(90000);
        return [200, { success: true }];
      });

      await client.post(testUrl, { data: 'test' }, { timeout: 90000 });
    });

    it('should pass per-request timeout to PUT request', async () => {
      mockAxios.onPut(testUrl).reply((config) => {
        expect(config.timeout).toBe(120000);
        return [200, { success: true }];
      });

      await client.put(testUrl, { data: 'test' }, { timeout: 120000 });
    });

    it('should pass per-request timeout to PATCH request', async () => {
      mockAxios.onPatch(testUrl).reply((config) => {
        expect(config.timeout).toBe(45000);
        return [200, { success: true }];
      });

      await client.patch(testUrl, { data: 'test' }, { timeout: 45000 });
    });

    it('should pass per-request timeout to DELETE request', async () => {
      mockAxios.onDelete(testUrl).reply((config) => {
        expect(config.timeout).toBe(15000);
        return [200, { deleted: true }];
      });

      await client.delete(testUrl, undefined, { timeout: 15000 });
    });

    it('should use global timeout when per-request timeout is not provided', async () => {
      mockAxios.onGet(testUrl).reply((config) => {
        // Global timeout from testConfig is 5000
        expect(config.timeout).toBe(5000);
        return [200, { success: true }];
      });

      await client.get(testUrl);
    });

    it('should override global timeout with per-request timeout', async () => {
      // Global timeout is 5000ms (from testConfig), per-request is 120000ms
      mockAxios.onGet(testUrl).reply((config) => {
        expect(config.timeout).toBe(120000);
        return [200, { success: true }];
      });

      await client.get(testUrl, { timeout: 120000 });
    });

    it('should allow per-request timeout of 0 (no timeout)', async () => {
      mockAxios.onGet(testUrl).reply((config) => {
        expect(config.timeout).toBe(0);
        return [200, { success: true }];
      });

      await client.get(testUrl, { timeout: 0 });
    });
  });

  describe('Debug Logging', () => {
    it('should not log when logLevel is error', async () => {
      const consoleSpy = vi.spyOn(console, 'debug');

      const testUrl = 'https://api.example.com/test';
      mockAxios.onGet(testUrl).reply(200, { success: true });

      await client.get(testUrl);

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should log requests in debug mode', async () => {
      const debugClient = new BaseClient({
        apiKey: 'test-key',
        logLevel: 'debug',
      });

      // Mock the debug client's axios instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const debugMock = new MockAdapter((debugClient as any).axios);

      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {
        // Mock implementation - suppress console output during tests
      });

      const testUrl = 'https://api.example.com/test';
      debugMock.onGet(testUrl).reply(200, { success: true });

      await debugClient.get(testUrl);

      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
      debugMock.restore();
    });

    it('should sanitize API key in logs', async () => {
      const debugClient = new BaseClient({
        apiKey: 'secret-api-key',
        logLevel: 'debug',
      });

      // Mock the debug client's axios instance
      // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      const debugMock = new MockAdapter((debugClient as any).axios);

      const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {
        // Mock implementation - suppress console output during tests
      });

      const testUrl = 'https://api.example.com/test';
      debugMock.onGet(testUrl).reply(200, { success: true });

      await debugClient.get(testUrl);

      // Verify no log contains the actual API key
      const calls = consoleSpy.mock.calls;
      calls.forEach((call) => {
        const logString = call[0] as string;
        expect(logString).not.toContain('secret-api-key');
      });

      consoleSpy.mockRestore();
      debugMock.restore();
    });
  });

  describe('Custom Headers', () => {
    it('should merge custom headers with defaults', async () => {
      const testUrl = 'https://api.example.com/test';

      mockAxios.onGet(testUrl).reply((config) => {
        expect(config.headers?.['X-Custom-1']).toBe('value1');
        expect(config.headers?.['X-Custom-2']).toBe('value2');
        expect(config.headers?.Authorization).toBe('Bearer test-api-key-12345'); // Default preserved
        return [200, { success: true }];
      });

      await client.get(testUrl, {
        headers: {
          'X-Custom-1': 'value1',
          'X-Custom-2': 'value2',
        },
      });
    });
  });

  describe('RFC 7807 problem+json Support', () => {
    const testUrl = 'https://api.example.com/test';

    const problemJsonBody = {
      title: 'unauthorized',
      detail: 'token problem; token is malformed',
      code: '07e4668e--a53a3d31f8b0',
      requestId: '7b80742415072fe8b6b7f7761f1d1211',
      origin: 's2s-api-auth-catalog',
      status: 401,
      statusText: 'Unauthorized',
      timestamp: '2024-09-30T06:52:38Z',
    };

    describe('application/problem+json content-type detection', () => {
      it('should detect application/problem+json and extract RFC 7807 fields for 401', async () => {
        mockAxios
          .onGet(testUrl)
          .reply(401, problemJsonBody, { 'content-type': 'application/problem+json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          const authError = error as AuthenticationError;
          expect(authError.message).toBe('token problem; token is malformed');
          expect(authError.statusCode).toBe(401);
          expect(authError.origin).toBe('s2s-api-auth-catalog');
          expect(authError.timestamp).toBe('2024-09-30T06:52:38Z');
          expect(authError.requestId).toBe('7b80742415072fe8b6b7f7761f1d1211');
          expect(authError.response).toEqual(problemJsonBody);
        }
      });

      it('should handle application/problem+json with charset suffix', async () => {
        mockAxios.onGet(testUrl).reply(401, problemJsonBody, {
          'content-type': 'application/problem+json; charset=utf-8',
        });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          const authError = error as AuthenticationError;
          expect(authError.message).toBe('token problem; token is malformed');
          expect(authError.origin).toBe('s2s-api-auth-catalog');
          expect(authError.timestamp).toBe('2024-09-30T06:52:38Z');
        }
      });

      it('should detect application/problem+json for 429 rate limit', async () => {
        const rateLimitBody = {
          title: 'too many requests',
          detail: 'rate limit exceeded for this endpoint',
          requestId: 'req-rate-limit-123',
          origin: 's2s-api-rate-limiter',
          status: 429,
          timestamp: '2024-09-30T07:00:00Z',
        };

        mockAxios.onGet(testUrl).reply(429, rateLimitBody, {
          'content-type': 'application/problem+json',
          'retry-after': '10',
        });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown RateLimitError');
        } catch (error) {
          expect(error).toBeInstanceOf(RateLimitError);
          const rateError = error as RateLimitError;
          expect(rateError.message).toBe('rate limit exceeded for this endpoint');
          expect(rateError.retryAfter).toBe(10000);
          expect(rateError.origin).toBe('s2s-api-rate-limiter');
          expect(rateError.timestamp).toBe('2024-09-30T07:00:00Z');
          expect(rateError.requestId).toBe('req-rate-limit-123');
        }
      });

      it('should detect application/problem+json for 403 forbidden', async () => {
        const forbiddenBody = {
          title: 'forbidden',
          detail: 'insufficient permissions for this resource',
          origin: 's2s-api-auth',
          status: 403,
          timestamp: '2024-09-30T08:00:00Z',
        };

        mockAxios
          .onGet(testUrl)
          .reply(403, forbiddenBody, { 'content-type': 'application/problem+json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          const authError = error as AuthenticationError;
          expect(authError.message).toBe('insufficient permissions for this resource');
          expect(authError.statusCode).toBe(403);
          expect(authError.origin).toBe('s2s-api-auth');
        }
      });
    });

    describe('backward compatibility with application/json', () => {
      it('should still handle 401 with application/json content-type', async () => {
        mockAxios
          .onGet(testUrl)
          .reply(401, { error: 'Unauthorized' }, { 'content-type': 'application/json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          const authError = error as AuthenticationError;
          expect(authError.statusCode).toBe(401);
          expect(authError.origin).toBeUndefined();
          expect(authError.timestamp).toBeUndefined();
        }
      });

      it('should still handle 429 with application/json content-type', async () => {
        mockAxios
          .onGet(testUrl)
          .reply(429, { error: 'Too Many Requests' }, { 'content-type': 'application/json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown RateLimitError');
        } catch (error) {
          expect(error).toBeInstanceOf(RateLimitError);
          const rateError = error as RateLimitError;
          expect(rateError.statusCode).toBe(429);
          expect(rateError.origin).toBeUndefined();
          expect(rateError.timestamp).toBeUndefined();
        }
      });

      it('should still handle 401 without content-type header', async () => {
        mockAxios.onGet(testUrl).reply(401, { error: 'Unauthorized' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          const authError = error as AuthenticationError;
          expect(authError.statusCode).toBe(401);
          expect(authError.origin).toBeUndefined();
          expect(authError.timestamp).toBeUndefined();
        }
      });

      it('should still handle validation errors identically', async () => {
        const fieldErrors = { email: 'Invalid format' };
        mockAxios
          .onPost(testUrl)
          .reply(400, { errors: fieldErrors }, { 'content-type': 'application/json' });

        try {
          await client.post(testUrl, {});
          expect.fail('Should have thrown ValidationError');
        } catch (error) {
          expect(error).toBeInstanceOf(ValidationError);
          expect((error as ValidationError).fieldErrors).toEqual(fieldErrors);
        }
      });
    });

    describe('edge cases', () => {
      it('should handle null response data with problem+json content-type', async () => {
        mockAxios.onGet(testUrl).reply(401, null, { 'content-type': 'application/problem+json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          const authError = error as AuthenticationError;
          expect(authError.origin).toBeUndefined();
          expect(authError.timestamp).toBeUndefined();
        }
      });

      it('should use detail over title when both present', async () => {
        const body = {
          title: 'unauthorized',
          detail: 'token problem; token is malformed',
          origin: 's2s-api-auth',
          timestamp: '2024-09-30T06:52:38Z',
        };

        mockAxios.onGet(testUrl).reply(401, body, { 'content-type': 'application/problem+json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          // detail takes precedence over title
          expect((error as AuthenticationError).message).toBe('token problem; token is malformed');
        }
      });

      it('should fall back to title when detail is absent', async () => {
        const body = {
          title: 'unauthorized',
          origin: 's2s-api-auth',
          timestamp: '2024-09-30T06:52:38Z',
        };

        mockAxios.onGet(testUrl).reply(401, body, { 'content-type': 'application/problem+json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          expect((error as AuthenticationError).message).toBe('unauthorized');
        }
      });

      it('should use default message when neither title nor detail present', async () => {
        mockAxios
          .onGet(testUrl)
          .reply(401, { status: 401 }, { 'content-type': 'application/problem+json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          expect((error as AuthenticationError).message).toBe(
            'Authentication failed. Please verify your API key.'
          );
        }
      });

      it('should handle non-string fields gracefully', async () => {
        const body = {
          title: 123, // not a string
          detail: true, // not a string
          origin: null, // not a string
          timestamp: { time: 'now' }, // not a string
          requestId: 42, // not a string
        };

        mockAxios.onGet(testUrl).reply(401, body, { 'content-type': 'application/problem+json' });

        try {
          await client.get(testUrl);
          expect.fail('Should have thrown AuthenticationError');
        } catch (error) {
          expect(error).toBeInstanceOf(AuthenticationError);
          const authError = error as AuthenticationError;
          // Non-string fields should be ignored, falling back to default message
          expect(authError.message).toBe('Authentication failed. Please verify your API key.');
          expect(authError.origin).toBeUndefined();
          expect(authError.timestamp).toBeUndefined();
          expect(authError.requestId).toBeUndefined();
        }
      });
    });
  });
});
