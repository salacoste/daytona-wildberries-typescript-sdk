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
          capturedHeaders = config.headers as Record<string, unknown>;
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
        await expect(client.get(testUrl)).rejects.toThrow(
          'Authentication failed'
        );
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

    describe('RateLimitError (429)', () => {
      it('should transform 429 to RateLimitError', async () => {
        mockAxios
          .onGet(testUrl)
          .reply(429, { error: 'Too Many Requests' }, { 'retry-after': '10' });

        await expect(client.get(testUrl)).rejects.toThrow(RateLimitError);
      });

      it('should parse Retry-After header (seconds to ms)', async () => {
        mockAxios
          .onGet(testUrl)
          .reply(429, {}, { 'retry-after': '5' });

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
        mockAxios
          .onGet(testUrl)
          .reply(429, {}, { 'retry-after': 'invalid' });

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

        await expect(client.post(testUrl, {})).rejects.toThrow(
          ValidationError
        );
      });

      it('should transform 422 to ValidationError', async () => {
        mockAxios.onPost(testUrl).reply(422, {
          error: 'Unprocessable Entity',
        });

        await expect(client.post(testUrl, {})).rejects.toThrow(
          ValidationError
        );
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
});
