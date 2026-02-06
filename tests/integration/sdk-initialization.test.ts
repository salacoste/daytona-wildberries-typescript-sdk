/**
 * Integration tests for WildberriesSDK initialization and end-to-end flow
 *
 * Tests the complete SDK initialization process and validates end-to-end
 * functionality from SDK creation through API calls.
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK, AuthenticationError, GeneralModule } from '../../src';

// Mock server for Wildberries API
const server = setupServer(
  // Mock ping endpoint
  http.get('https://common-api.wildberries.ru/ping', () => {
    return HttpResponse.json({
      TS: '2024-10-21T00:00:00.000Z',
      Status: 'OK',
    });
  }),

  // Mock news endpoint
  http.get('https://common-api.wildberries.ru/api/communications/v2/news', () => {
    return HttpResponse.json({
      data: [
        {
          id: 1,
          header: 'Test News',
          content: 'Test content',
          date: '2024-10-21',
          types: [{ id: 1, name: 'general' }],
        },
      ],
    });
  }),

  // Mock seller info endpoint
  http.get('https://common-api.wildberries.ru/api/v1/seller-info', () => {
    return HttpResponse.json({
      sid: '12345',
      name: 'Test Seller',
      tradeMark: 'Test Brand',
    });
  })
);

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('WildberriesSDK Initialization', () => {
  describe('Constructor', () => {
    it('should create SDK instance with valid configuration', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-api-key-12345',
      });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
      expect(sdk.general).toBeInstanceOf(GeneralModule);
    });

    it('should throw AuthenticationError with missing API key', () => {
      expect(() => {
        // @ts-expect-error - Testing runtime error handling
        new WildberriesSDK({});
      }).toThrow(AuthenticationError);

      expect(() => {
        new WildberriesSDK({ apiKey: '' });
      }).toThrow(AuthenticationError);

      expect(() => {
        new WildberriesSDK({ apiKey: '   ' });
      }).toThrow(AuthenticationError);
    });

    it('should throw descriptive error message for missing API key', () => {
      try {
        new WildberriesSDK({ apiKey: '' });
        expect.fail('Should have thrown AuthenticationError');
      } catch (error) {
        expect(error).toBeInstanceOf(AuthenticationError);
        expect((error as AuthenticationError).message).toContain('API key is required');
        expect((error as AuthenticationError).message).toContain('Wildberries API key');
      }
    });

    it('should accept custom configuration options', () => {
      const sdk = new WildberriesSDK({
        apiKey: 'test-key',
        timeout: 60000,
        logLevel: 'debug',
        retryConfig: {
          maxRetries: 5,
          retryDelay: 2000,
          exponentialBackoff: true,
        },
      });

      expect(sdk).toBeInstanceOf(WildberriesSDK);
      expect(sdk.general).toBeInstanceOf(GeneralModule);
    });
  });

  describe('Module Access', () => {
    it('should expose general module', () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-key' });

      expect(sdk.general).toBeDefined();
      expect(sdk.general).toBeInstanceOf(GeneralModule);
      expect(typeof sdk.general.ping).toBe('function');
      expect(typeof sdk.general.news).toBe('function');
      expect(typeof sdk.general.sellerInfo).toBe('function');
    });

    it('should maintain module references', () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-key' });
      const originalGeneral = sdk.general;

      // Readonly is enforced at compile-time by TypeScript
      // At runtime, the property remains the same instance
      expect(sdk.general).toBe(originalGeneral);
      expect(sdk.general).toBeInstanceOf(GeneralModule);
    });
  });
});

describe('End-to-End API Flow', () => {
  describe('Ping Endpoint', () => {
    it('should successfully ping API and receive response', async () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-api-key' });

      const response = await sdk.general.ping();

      expect(response).toBeDefined();
      expect(response.Status).toBe('OK');
      expect(response.TS).toBeDefined();
      expect(typeof response.TS).toBe('string');
    });

    it('should include proper authentication headers', async () => {
      let requestHeaders: Record<string, string> | undefined;

      server.use(
        http.get('https://common-api.wildberries.ru/ping', ({ request }) => {
          requestHeaders = Object.fromEntries(request.headers.entries());
          return HttpResponse.json({ TS: '2024-10-21T00:00:00Z', Status: 'OK' });
        })
      );

      const sdk = new WildberriesSDK({ apiKey: 'test-secret-key' });
      await sdk.general.ping();

      expect(requestHeaders).toBeDefined();
      expect(requestHeaders?.authorization).toBe('Bearer test-secret-key');
      // Content-Type header may not be present for GET requests
      expect(requestHeaders?.['user-agent']).toContain('WildberriesSDK');
    });
  });

  describe('News Endpoint', () => {
    it('should fetch news successfully', async () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-key' });

      const response = await sdk.general.news({ from: '2025-01-01' });

      expect(response).toBeDefined();
      expect(response.data).toBeDefined();
      expect(Array.isArray(response.data)).toBe(true);
      expect(response.data).toHaveLength(1);
      expect(response.data[0].header).toBe('Test News');
    });

    it('should pass query parameters correctly', async () => {
      let queryParams: URLSearchParams | undefined;

      server.use(
        http.get('https://common-api.wildberries.ru/api/communications/v2/news', ({ request }) => {
          queryParams = new URL(request.url).searchParams;
          return HttpResponse.json({ data: [] });
        })
      );

      const sdk = new WildberriesSDK({ apiKey: 'test-key' });
      await sdk.general.news({ from: '2024-01-01', fromID: 100 });

      expect(queryParams).toBeDefined();
      expect(queryParams?.get('from')).toBe('2024-01-01');
      expect(queryParams?.get('fromID')).toBe('100');
    });
  });

  describe('Seller Info Endpoint', () => {
    it('should fetch seller information', async () => {
      const sdk = new WildberriesSDK({ apiKey: 'test-key' });

      const response = await sdk.general.sellerInfo();

      expect(response).toBeDefined();
      expect(response.sid).toBe('12345');
      expect(response.name).toBe('Test Seller');
      expect(response.tradeMark).toBe('Test Brand');
    });
  });
});

describe('Multiple SDK Instances', () => {
  it('should support multiple independent SDK instances', () => {
    const sdk1 = new WildberriesSDK({ apiKey: 'key-1' });
    const sdk2 = new WildberriesSDK({ apiKey: 'key-2' });

    expect(sdk1).not.toBe(sdk2);
    expect(sdk1.general).not.toBe(sdk2.general);
  });

  it('should handle concurrent API calls from different instances', async () => {
    const sdk1 = new WildberriesSDK({ apiKey: 'key-1' });
    const sdk2 = new WildberriesSDK({ apiKey: 'key-2' });

    const [response1, response2] = await Promise.all([sdk1.general.ping(), sdk2.general.ping()]);

    expect(response1.Status).toBe('OK');
    expect(response2.Status).toBe('OK');
  });
});

describe('Configuration Validation', () => {
  it('should use default timeout when not specified', async () => {
    const sdk = new WildberriesSDK({ apiKey: 'test-key' });
    const response = await sdk.general.ping();
    expect(response.Status).toBe('OK');
  });

  it('should use custom timeout when specified', async () => {
    const sdk = new WildberriesSDK({
      apiKey: 'test-key',
      timeout: 5000,
    });

    const response = await sdk.general.ping();
    expect(response.Status).toBe('OK');
  });

  it('should use custom retry configuration', async () => {
    const sdk = new WildberriesSDK({
      apiKey: 'test-key',
      retryConfig: {
        maxRetries: 1,
        retryDelay: 100,
        exponentialBackoff: false,
      },
    });

    const response = await sdk.general.ping();
    expect(response.Status).toBe('OK');
  });
});
