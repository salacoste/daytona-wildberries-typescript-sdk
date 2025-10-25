/**
 * Integration tests for ProductsModule - Categories and Structure
 *
 * Tests the ProductsModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow for category navigation endpoints
 * - Rate limiting enforcement for Products API
 * - Error transformation from HTTP responses
 * - Query parameter handling
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/products/index ProductsModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { ProductsModule } from '../../src/modules/products';
import { BaseClient } from '../../src/client/base-client';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { NetworkError } from '../../src/errors/network-error';

/**
 * MSW handlers for Products API endpoints
 * These intercept HTTP requests at the network level and return mocked responses
 */
const handlers = [
  // GET /content/v2/object/parent/all - Parent categories endpoint
  http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', ({ request }) => {
    const url = new URL(request.url);
    const locale = url.searchParams.get('locale') ?? 'ru';

    return HttpResponse.json({
      data: [
        { id: 479, name: locale === 'en' ? 'Electronics' : 'Электроника', isVisible: true },
        { id: 629, name: locale === 'en' ? 'Household chemicals' : 'Бытовая химия', isVisible: true },
        { id: 789, name: locale === 'en' ? 'Crafts' : 'Рукоделие', isVisible: true }
      ],
      error: false,
      errorText: '',
      additionalErrors: null
    });
  }),

  // GET /content/v2/object/all - Categories/subjects endpoint
  http.get('https://content-api.wildberries.ru/content/v2/object/all', ({ request }) => {
    const url = new URL(request.url);
    const parentID = url.searchParams.get('parentID');
    const limit = url.searchParams.get('limit') ?? '30';
    const offset = url.searchParams.get('offset') ?? '0';

    // Mock different responses based on parentID filter
    if (parentID === '479') {
      return HttpResponse.json({
        data: [
          { subjectID: 105, parentID: 479, subjectName: 'Носки', parentName: 'Электроника' },
          { subjectID: 106, parentID: 479, subjectName: 'Кабели', parentName: 'Электроника' },
          { subjectID: 107, parentID: 479, subjectName: 'Наушники', parentName: 'Электроника' }
        ],
        error: false,
        errorText: '',
        additionalErrors: null
      });
    }

    // Default: return all categories
    return HttpResponse.json({
      data: [
        { subjectID: 105, parentID: 479, subjectName: 'Носки', parentName: 'Электроника' },
        { subjectID: 200, parentID: 629, subjectName: 'Мыло', parentName: 'Бытовая химия' },
        { subjectID: 300, parentID: 789, subjectName: 'Нитки', parentName: 'Рукоделие' }
      ].slice(parseInt(offset), parseInt(offset) + parseInt(limit)),
      error: false,
      errorText: '',
      additionalErrors: null
    });
  }),

  // GET /content/v2/object/charcs/:subjectId - Characteristics endpoint
  http.get('https://content-api.wildberries.ru/content/v2/object/charcs/:subjectId', ({ params }) => {
    const subjectId = params.subjectId as string;

    return HttpResponse.json({
      data: [
        {
          charcID: 1,
          subjectName: 'Носки',
          subjectID: parseInt(subjectId),
          name: 'Бренд',
          required: true,
          unitName: '',
          maxCount: 1,
          popular: true,
          charcType: 1
        },
        {
          charcID: 2,
          subjectName: 'Носки',
          subjectID: parseInt(subjectId),
          name: 'Размер',
          required: false,
          unitName: '',
          maxCount: 10,
          popular: true,
          charcType: 1
        },
        {
          charcID: 3,
          subjectName: 'Носки',
          subjectID: parseInt(subjectId),
          name: 'Цвет',
          required: true,
          unitName: '',
          maxCount: 5,
          popular: true,
          charcType: 1
        }
      ],
      error: false,
      errorText: '',
      additionalErrors: null
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

describe('ProductsModule Integration Tests - Categories', () => {
  let productsModule: ProductsModule;
  let baseClient: BaseClient;

  beforeEach(() => {
    // Create real BaseClient with test configuration
    baseClient = new BaseClient({
      apiKey: 'test-products-integration-key',
      timeout: 5000,
      retryConfig: {
        maxRetries: 3,
        retryDelay: 100,
        exponentialBackoff: true
      }
    });

    // Create ProductsModule with real BaseClient
    productsModule = new ProductsModule(baseClient);
  });

  describe('getParentAll() - Parent Categories', () => {
    it('should retrieve parent categories successfully', async () => {
      // Act
      const result = await productsModule.getParentAll();

      // Assert
      expect(result.error).toBe(false);
      expect(result.errorText).toBe('');
      expect(result.data).toBeDefined();

      if (Array.isArray(result.data) && result.data.length > 0) {
        expect(result.data.length).toBeGreaterThan(0);
        const firstItem = result.data[0] as { name: string; isVisible: boolean };
        expect(firstItem.name).toBe('Электроника');
        expect(firstItem.isVisible).toBe(true);
      }
    });

    it('should handle locale parameter correctly', async () => {
      // Act
      const result = await productsModule.getParentAll({ locale: 'en' });

      // Assert
      expect(result.error).toBe(false);
      if (Array.isArray(result.data) && result.data.length > 0) {
        const firstItem = result.data[0] as { name: string };
        expect(firstItem.name).toBe('Electronics');
      }
    });

    it('should handle 401 authentication error', async () => {
      // Arrange - Override handler to return 401
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Unauthorized', additionalErrors: null },
            { status: 401 }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getParentAll()).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 rate limit error', async () => {
      // Arrange - Override handler to return 429
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Rate limit exceeded', additionalErrors: null },
            { status: 429, headers: { 'Retry-After': '5' } }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getParentAll()).rejects.toThrow(RateLimitError);
    });

    it('should handle 500 network error', async () => {
      // Arrange - Override handler to return 500
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/parent/all', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Internal server error', additionalErrors: null },
            { status: 500 }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getParentAll()).rejects.toThrow(NetworkError);
    });
  });

  describe('getObjectAll() - Categories/Subjects', () => {
    it('should retrieve all categories without filters', async () => {
      // Act
      const result = await productsModule.getObjectAll();

      // Assert
      expect(result.error).toBe(false);
      expect(result.data).toBeDefined();

      if (Array.isArray(result.data)) {
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0].subjectName).toBeDefined();
        expect(result.data[0].parentName).toBeDefined();
      }
    });

    it('should filter categories by parentID', async () => {
      // Act
      const result = await productsModule.getObjectAll({ parentID: 479 });

      // Assert
      expect(result.error).toBe(false);
      if (Array.isArray(result.data)) {
        expect(result.data.length).toBe(3);
        // All items should belong to parent 479
        result.data.forEach((item) => {
          const category = item as { parentID: number; parentName: string };
          expect(category.parentID).toBe(479);
          expect(category.parentName).toBe('Электроника');
        });
      }
    });

    it('should handle pagination parameters', async () => {
      // Act
      const result = await productsModule.getObjectAll({ limit: 2, offset: 0 });

      // Assert
      expect(result.error).toBe(false);
      if (Array.isArray(result.data)) {
        expect(result.data.length).toBeLessThanOrEqual(2);
      }
    });

    it('should handle multiple query parameters', async () => {
      // Act
      const result = await productsModule.getObjectAll({
        parentID: 479,
        limit: 10,
        offset: 0,
        locale: 'ru'
      });

      // Assert
      expect(result.error).toBe(false);
      if (Array.isArray(result.data)) {
        expect(result.data.length).toBeGreaterThan(0);
      }
    });

    it('should handle 401 authentication error', async () => {
      // Arrange
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/all', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Unauthorized', additionalErrors: null },
            { status: 401 }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getObjectAll()).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 rate limit error', async () => {
      // Arrange
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/all', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Rate limit exceeded', additionalErrors: null },
            { status: 429 }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getObjectAll()).rejects.toThrow(RateLimitError);
    });
  });

  describe('getObjectCharc() - Characteristics', () => {
    it('should retrieve characteristics for a subject', async () => {
      // Act
      const result = await productsModule.getObjectCharc(105);

      // Assert
      expect(result.error).toBe(false);
      expect(result.data).toBeDefined();

      if (Array.isArray(result.data)) {
        expect(result.data.length).toBeGreaterThan(0);
        const firstCharc = result.data[0] as { name: string; required: boolean; charcID: number };
        expect(firstCharc.name).toBeDefined();
        expect(typeof firstCharc.required).toBe('boolean');
        expect(typeof firstCharc.charcID).toBe('number');
      }
    });

    it('should include required and optional characteristics', async () => {
      // Act
      const result = await productsModule.getObjectCharc(105);

      // Assert
      if (Array.isArray(result.data) && result.data.length > 1) {
        const characteristics = result.data as { name: string; required: boolean }[];
        const requiredCharcs = characteristics.filter(c => c.required);
        const optionalCharcs = characteristics.filter(c => !c.required);

        expect(requiredCharcs.length).toBeGreaterThan(0);
        expect(optionalCharcs.length).toBeGreaterThan(0);
      }
    });

    it('should handle locale parameter', async () => {
      // Act
      const result = await productsModule.getObjectCharc(105, { locale: 'en' });

      // Assert
      expect(result.error).toBe(false);
      expect(result.data).toBeDefined();
    });

    it('should handle different subjectId values', async () => {
      // Act
      const result1 = await productsModule.getObjectCharc(105);
      const result2 = await productsModule.getObjectCharc(106);

      // Assert
      expect(result1.error).toBe(false);
      expect(result2.error).toBe(false);

      if (Array.isArray(result1.data) && Array.isArray(result2.data)) {
        const firstSubject1 = result1.data[0] as { subjectID: number };
        const firstSubject2 = result2.data[0] as { subjectID: number };

        expect(firstSubject1.subjectID).toBe(105);
        expect(firstSubject2.subjectID).toBe(106);
      }
    });

    it('should handle 401 authentication error', async () => {
      // Arrange
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/charcs/:subjectId', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Unauthorized', additionalErrors: null },
            { status: 401 }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getObjectCharc(105)).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 rate limit error', async () => {
      // Arrange
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/charcs/:subjectId', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Rate limit exceeded', additionalErrors: null },
            { status: 429 }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getObjectCharc(105)).rejects.toThrow(RateLimitError);
    });

    it('should handle 500 network error', async () => {
      // Arrange
      server.use(
        http.get('https://content-api.wildberries.ru/content/v2/object/charcs/:subjectId', () => {
          return HttpResponse.json(
            { data: null, error: true, errorText: 'Internal server error', additionalErrors: null },
            { status: 500 }
          );
        })
      );

      // Act & Assert
      await expect(productsModule.getObjectCharc(105)).rejects.toThrow(NetworkError);
    });
  });

  describe('Category Navigation Workflow', () => {
    it('should complete full category exploration workflow', async () => {
      // Step 1: Get all parent categories
      const parents = await productsModule.getParentAll();
      expect(parents.error).toBe(false);
      expect(Array.isArray(parents.data)).toBe(true);

      // Step 2: Get categories for first parent (Electronics)
      const categories = await productsModule.getObjectAll({ parentID: 479 });
      expect(categories.error).toBe(false);
      expect(Array.isArray(categories.data)).toBe(true);

      // Step 3: Get characteristics for first category
      const characteristics = await productsModule.getObjectCharc(105);
      expect(characteristics.error).toBe(false);
      expect(Array.isArray(characteristics.data)).toBe(true);

      // Verify characteristic details
      if (Array.isArray(characteristics.data) && characteristics.data.length > 0) {
        const requiredCharcs = characteristics.data.filter((c) => {
          const charc = c as { required: boolean };
          return charc.required;
        });
        expect(requiredCharcs.length).toBeGreaterThan(0);
      }
    });
  });
});
