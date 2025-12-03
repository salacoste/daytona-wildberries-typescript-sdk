/**
 * Integration tests for GeneralModule
 *
 * Tests the GeneralModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow from module → BaseClient → RateLimiter → RetryHandler → HTTP
 * - Rate limiting enforcement
 * - Retry logic with real timing
 * - Error transformation from HTTP responses
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/general/index GeneralModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { GeneralModule } from '../../src/modules/general';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { NetworkError } from '../../src/errors/network-error';

/**
 * MSW handlers for General API endpoints
 * These intercept HTTP requests at the network level and return mocked responses
 */
const handlers = [
  // GET /ping - Health check endpoint
  http.get('https://common-api.wildberries.ru/ping', () => {
    return HttpResponse.json({
      TS: new Date().toISOString(),
      Status: 'OK'
    });
  }),

  // GET /api/communications/v2/news - News retrieval endpoint
  http.get('https://common-api.wildberries.ru/api/communications/v2/news', ({ request }) => {
    const url = new URL(request.url);
    const from = url.searchParams.get('from');
    const fromID = url.searchParams.get('fromID');

    return HttpResponse.json({
      data: [
        {
          content: 'Test news content - Integration test',
          date: from ?? '2024-01-01',
          header: 'Test News Header',
          id: fromID ? parseInt(fromID) : 1,
          types: [{ id: 1, name: 'Announcement' }]
        },
        {
          content: 'Second news item',
          date: '2024-01-02',
          header: 'Second News',
          id: 2,
          types: [{ id: 2, name: 'Update' }]
        }
      ]
    });
  }),

  // GET /api/v1/seller-info - Seller information endpoint
  http.get('https://common-api.wildberries.ru/api/v1/seller-info', () => {
    return HttpResponse.json({
      name: 'Integration Test Seller',
      sid: 'seller-integration-123',
      tradeMark: 'TestBrandIntegration'
    });
  })
];

/**
 * Setup MSW server
 * This server intercepts all HTTP requests during tests and returns mocked responses
 */
const server = setupServer(...handlers);

// Start server before all tests
beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

// Reset handlers after each test to prevent test interference
afterEach(() => {
  server.resetHandlers();
});

// Close server after all tests
afterAll(() => {
  server.close();
});

describe('GeneralModule Integration Tests', () => {
  let generalModule: GeneralModule;
  let baseClient: BaseClient;

  beforeEach(() => {
    // Create real BaseClient with test configuration
    baseClient = new BaseClient({
      apiKey: 'test-integration-key',
      timeout: 5000,
      retryConfig: {
        maxRetries: 3,
        retryDelay: 100,
        exponentialBackoff: true
      }
    });

    // Create GeneralModule with real BaseClient
    generalModule = new GeneralModule(baseClient);
  });

  describe('End-to-End Request Flow', () => {
    it('should complete ping() flow successfully', async () => {
      // Act
      const result = await generalModule.ping();

      // Assert
      expect(result.Status).toBe('OK');
      expect(result.TS).toBeDefined();
      expect(typeof result.TS).toBe('string');
    });

    it('should complete news() flow with parameters', async () => {
      // Act
      const result = await generalModule.news({ from: '2025-01-01' });

      // Assert
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.data[0].header).toBe('Test News Header');
      expect(result.data[0].content).toContain('Integration test');
    });

    it('should complete news() flow with query parameters', async () => {
      // Arrange
      const options = { from: '2024-06-01', fromID: 42 };

      // Act
      const result = await generalModule.news(options);

      // Assert
      expect(result.data).toBeDefined();
      expect(result.data.length).toBeGreaterThan(0);
      // Verify parameters were passed through
      expect(result.data[0].date).toBe('2024-06-01');
      expect(result.data[0].id).toBe(42);
    });

    it('should complete sellerInfo() flow successfully', async () => {
      // Act
      const result = await generalModule.sellerInfo();

      // Assert
      expect(result.name).toBe('Integration Test Seller');
      expect(result.sid).toBe('seller-integration-123');
      expect(result.tradeMark).toBe('TestBrandIntegration');
    });
  });

  describe('Error Transformation', () => {
    it('should transform 401 Unauthorized to AuthenticationError', async () => {
      // Arrange
      server.use(
        http.get('https://common-api.wildberries.ru/ping', () => {
          return new HttpResponse(null, {
            status: 401,
            statusText: 'Unauthorized'
          });
        })
      );

      // Act & Assert
      await expect(generalModule.ping()).rejects.toThrow(AuthenticationError);
    });

    it('should transform 429 Too Many Requests to RateLimitError', async () => {
      // Arrange
      server.use(
        http.get('https://common-api.wildberries.ru/ping', () => {
          return new HttpResponse(null, {
            status: 429,
            statusText: 'Too Many Requests',
            headers: {
              'Retry-After': '5'
            }
          });
        })
      );

      // Act & Assert
      await expect(generalModule.ping()).rejects.toThrow(RateLimitError);
    });

    it('should transform 500 Internal Server Error to NetworkError', async () => {
      // Arrange
      server.use(
        http.get('https://common-api.wildberries.ru/ping', () => {
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error'
          });
        })
      );

      // Act & Assert
      await expect(generalModule.ping()).rejects.toThrow(NetworkError);
    });

    it('should transform 503 Service Unavailable to NetworkError', async () => {
      // Arrange
      server.use(
        http.get('https://common-api.wildberries.ru/api/v1/seller-info', () => {
          return new HttpResponse(null, {
            status: 503,
            statusText: 'Service Unavailable'
          });
        })
      );

      // Act & Assert
      await expect(generalModule.sellerInfo()).rejects.toThrow(NetworkError);
    });
  });

  describe('Retry Logic Integration', () => {
    it('should retry on transient 503 error and eventually succeed', async () => {
      // Arrange
      let attempts = 0;

      server.use(
        http.get('https://common-api.wildberries.ru/ping', () => {
          attempts++;

          // Fail first 2 attempts with 503, succeed on 3rd
          if (attempts < 3) {
            return new HttpResponse(null, {
              status: 503,
              statusText: 'Service Unavailable'
            });
          }

          return HttpResponse.json({
            TS: new Date().toISOString(),
            Status: 'OK'
          });
        })
      );

      // Act
      const result = await generalModule.ping();

      // Assert
      expect(attempts).toBe(3); // Verify retry happened
      expect(result.Status).toBe('OK');
    });

    it('should not retry on 400 Bad Request (permanent error)', async () => {
      // Arrange
      let attempts = 0;

      server.use(
        http.get('https://common-api.wildberries.ru/ping', () => {
          attempts++;

          return new HttpResponse(null, {
            status: 400,
            statusText: 'Bad Request'
          });
        })
      );

      // Act & Assert
      await expect(generalModule.ping()).rejects.toThrow();
      expect(attempts).toBe(1); // No retry for 4xx errors
    });

    it('should exhaust retries and throw final error', async () => {
      // Arrange
      let attempts = 0;

      server.use(
        http.get('https://common-api.wildberries.ru/ping', () => {
          attempts++;

          // Always fail with 500
          return new HttpResponse(null, {
            status: 500,
            statusText: 'Internal Server Error'
          });
        })
      );

      // Act & Assert
      await expect(generalModule.ping()).rejects.toThrow(NetworkError);
      expect(attempts).toBe(4); // 1 initial + 3 retries = 4 total
    });
  });

  describe('Authentication Integration', () => {
    it('should include Authorization header in requests', async () => {
      // Arrange
      let authHeader: string | null = null;

      server.use(
        http.get('https://common-api.wildberries.ru/ping', ({ request }) => {
          authHeader = request.headers.get('Authorization');

          return HttpResponse.json({
            TS: new Date().toISOString(),
            Status: 'OK'
          });
        })
      );

      // Act
      await generalModule.ping();

      // Assert
      expect(authHeader).toBeDefined();
      expect(authHeader).toContain('test-integration-key');
    });
  });
});
