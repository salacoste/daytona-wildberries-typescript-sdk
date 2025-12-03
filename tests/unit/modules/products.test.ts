/**
 * Unit tests for ProductsModule
 *
 * Tests the ProductsModule class with mocked BaseClient to verify:
 * - Category navigation methods (getParentAll, getObjectAll, getObjectCharc)
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Type safety and error handling
 *
 * @see {@link ../../../src/modules/products/index ProductsModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { ValidationError } from '../../../src/errors/validation-error';

describe('ProductsModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let productsModule: ProductsModule;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };

    // Create fresh instance before each test
    productsModule = new ProductsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('getParentAll() - Parent Categories', () => {
    const mockParentCategoriesResponse = {
      data: [
        { id: 479, name: 'Электроника', isVisible: true },
        { id: 629, name: 'Бытовая химия', isVisible: true },
      ],
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should call BaseClient.get with correct URL when no parameters provided', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockParentCategoriesResponse);

      // Act
      await productsModule.getParentAll();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/parent/all',
        { params: undefined }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should pass locale parameter when provided', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockParentCategoriesResponse);
      const options = { locale: 'en' };

      // Act
      await productsModule.getParentAll(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/parent/all',
        { params: options }
      );
    });

    it('should return typed parent categories response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockParentCategoriesResponse);

      // Act
      const result = await productsModule.getParentAll();

      // Assert
      expect(result).toEqual(mockParentCategoriesResponse);
      expect(result.data).toBeDefined();
      if (Array.isArray(result.data) && result.data.length > 0) {
        expect(result.data).toHaveLength(2);
        const firstItem = result.data[0] as { name: string; isVisible: boolean };
        expect(firstItem.name).toBe('Электроника');
        expect(firstItem.isVisible).toBe(true);
      }
      expect(result.error).toBe(false);
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getParentAll()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getParentAll()).rejects.toThrow(RateLimitError);
    });

    it('should propagate NetworkError from BaseClient', async () => {
      // Arrange
      const error = new NetworkError('Network request failed', false, 500);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getParentAll()).rejects.toThrow(NetworkError);
    });
  });

  describe('getObjectAll() - Categories/Subjects', () => {
    const mockCategoriesResponse = {
      data: [
        { subjectID: 105, parentID: 479, subjectName: 'Носки', parentName: 'Электроника' },
        { subjectID: 106, parentID: 479, subjectName: 'Кабели', parentName: 'Электроника' },
      ],
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should call BaseClient.get with correct URL when no parameters provided', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);

      // Act
      await productsModule.getObjectAll();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/all',
        { params: undefined }
      );
    });

    it('should pass parentID parameter correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);
      const options = { parentID: 479 };

      // Act
      await productsModule.getObjectAll(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/all',
        { params: options }
      );
    });

    it('should pass locale parameter correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);
      const options = { locale: 'en' };

      // Act
      await productsModule.getObjectAll(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/all',
        { params: options }
      );
    });

    it('should pass pagination parameters (limit and offset)', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);
      const options = { limit: 50, offset: 100 };

      // Act
      await productsModule.getObjectAll(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/all',
        { params: options }
      );
    });

    it('should pass name filter parameter correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);
      const options = { name: 'Носки' };

      // Act
      await productsModule.getObjectAll(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/all',
        { params: options }
      );
    });

    it('should pass multiple parameters correctly', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);
      const options = { parentID: 479, limit: 10, offset: 0, locale: 'ru' };

      // Act
      await productsModule.getObjectAll(options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/all',
        { params: options }
      );
    });

    it('should return typed categories response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCategoriesResponse);

      // Act
      const result = await productsModule.getObjectAll({ parentID: 479 });

      // Assert
      expect(result).toEqual(mockCategoriesResponse);
      expect(result.data).toBeDefined();
      if (Array.isArray(result.data) && result.data.length > 0) {
        expect(result.data).toHaveLength(2);
        const firstItem = result.data[0] as { subjectName: string; parentName: string };
        expect(firstItem.subjectName).toBe('Носки');
        expect(firstItem.parentName).toBe('Электроника');
      }
    });

    it('should handle empty categories array gracefully', async () => {
      // Arrange
      const emptyResponse = { data: [], error: false, errorText: '', additionalErrors: null };
      mockClient.get.mockResolvedValue(emptyResponse);

      // Act
      const result = await productsModule.getObjectAll();

      // Assert
      expect(result.data).toEqual([]);
      expect(result.data).toHaveLength(0);
    });

    it('should propagate ValidationError from BaseClient', async () => {
      // Arrange
      const error = new ValidationError('Invalid parentID parameter', undefined, 400);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getObjectAll({ parentID: -1 })).rejects.toThrow(ValidationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getObjectAll()).rejects.toThrow(RateLimitError);
    });
  });

  describe('getObjectCharc() - Characteristics', () => {
    const mockCharacteristicsResponse = {
      data: [
        {
          charcID: 1,
          subjectName: 'Носки',
          subjectID: 105,
          name: 'Бренд',
          required: true,
          unitName: '',
          maxCount: 1,
          popular: true,
          charcType: 1,
        },
        {
          charcID: 2,
          subjectName: 'Носки',
          subjectID: 105,
          name: 'Размер',
          required: false,
          unitName: '',
          maxCount: 10,
          popular: true,
          charcType: 1,
        },
      ],
      error: false,
      errorText: '',
      additionalErrors: null,
    };

    it('should call BaseClient.get with subjectId in URL path', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCharacteristicsResponse);
      const subjectId = 105;

      // Act
      await productsModule.getObjectCharc(subjectId);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        `https://content-api.wildberries.ru/content/v2/object/charcs/${subjectId}`,
        { params: undefined }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should pass locale parameter when provided', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCharacteristicsResponse);
      const subjectId = 105;
      const options = { locale: 'en' };

      // Act
      await productsModule.getObjectCharc(subjectId, options);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        `https://content-api.wildberries.ru/content/v2/object/charcs/${subjectId}`,
        { params: options }
      );
    });

    it('should return typed characteristics response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCharacteristicsResponse);
      const subjectId = 105;

      // Act
      const result = await productsModule.getObjectCharc(subjectId);

      // Assert
      expect(result).toEqual(mockCharacteristicsResponse);
      expect(result.data).toBeDefined();
      expect(result.error).toBe(false);
      if (Array.isArray(result.data) && result.data.length > 1) {
        expect(result.data).toHaveLength(2);
        const firstItem = result.data[0] as { name: string; required: boolean };
        const secondItem = result.data[1] as { name: string; required: boolean };
        expect(firstItem.name).toBe('Бренд');
        expect(firstItem.required).toBe(true);
        expect(secondItem.name).toBe('Размер');
        expect(secondItem.required).toBe(false);
      }
    });

    it('should handle different subjectId values', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockCharacteristicsResponse);
      const subjectIds = [105, 106, 1000];

      for (const subjectId of subjectIds) {
        // Act
        await productsModule.getObjectCharc(subjectId);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          `https://content-api.wildberries.ru/content/v2/object/charcs/${subjectId}`,
          { params: undefined }
        );
      }

      expect(mockClient.get).toHaveBeenCalledTimes(3);
    });

    it('should propagate ValidationError for invalid subjectId', async () => {
      // Arrange
      const error = new ValidationError('Invalid subjectId', undefined, 400);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getObjectCharc(0)).rejects.toThrow(ValidationError);
    });

    it('should propagate AuthenticationError from BaseClient', async () => {
      // Arrange
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getObjectCharc(105)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError from BaseClient', async () => {
      // Arrange
      const error = new RateLimitError('Rate limit exceeded', 5000);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getObjectCharc(105)).rejects.toThrow(RateLimitError);

      try {
        await productsModule.getObjectCharc(105);
      } catch (err) {
        expect(err).toBeInstanceOf(RateLimitError);
        if (err instanceof RateLimitError) {
          expect(err.retryAfter).toBe(5000);
        }
      }
    });

    it('should propagate NetworkError from BaseClient', async () => {
      // Arrange
      const error = new NetworkError('Service unavailable', false, 503);
      mockClient.get.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.getObjectCharc(105)).rejects.toThrow(NetworkError);
    });
  });

  // ============================================================================
  // CRUD Operations Tests (Story 2.2)
  // ============================================================================

  describe('createProduct', () => {
    it('should call BaseClient.post with correct URL and rate limit key', async () => {
      // Arrange
      const request = {
        subjectID: 105,
        variants: [
          {
            vendorCode: 'VENDOR-001',
            brand: 'My Brand',
            title: 'Test Product',
          },
        ],
      };
      const response = { error: false, errorText: '', data: {} };
      mockClient.post.mockResolvedValue(response);

      // Act
      const result = await productsModule.createProduct(request);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload',
        [request],
        { rateLimitKey: 'products.postContentCardsUpload' }
      );
      expect(result).toEqual(response);
    });

    it('should handle async creation response', async () => {
      // Arrange
      const request = { subjectID: 105, variants: [{ vendorCode: 'TEST-001' }] };
      const response = { error: false, errorText: 'Queued for processing' };
      mockClient.post.mockResolvedValue(response);

      // Act
      const result = await productsModule.createProduct(request);

      // Assert
      expect(result.error).toBe(false);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should throw ValidationError for missing required fields', async () => {
      // Arrange
      const error = new ValidationError('Missing required field: vendorCode', {
        vendorCode: 'Required',
      });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.createProduct({
          subjectID: 105,
          variants: [],
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('listProducts', () => {
    it('should call BaseClient.post with settings wrapper and rate limit key', async () => {
      // Arrange
      const filters = {
        filter: { withPhoto: 1 as const, brands: ['My Brand'] },
        cursor: { limit: 100 },
      };
      const response = {
        cards: [{ nmID: 12345, vendorCode: 'TEST-001' }],
        cursor: { total: 1 },
      };
      mockClient.post.mockResolvedValue(response);

      // Act
      const result = await productsModule.listProducts(filters);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/get/cards/list',
        { settings: filters },
        { rateLimitKey: 'products.postContentGetCardsList' }
      );
      expect(result.cards).toHaveLength(1);
      expect(result.cards?.[0].nmID).toBe(12345);
    });

    it('should pass filters correctly', async () => {
      // Arrange
      const filters = {
        filter: { textSearch: 'VENDOR-001' },
      };
      mockClient.post.mockResolvedValue({ cards: [], cursor: { total: 0 } });

      // Act
      await productsModule.listProducts(filters);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        { settings: filters },
        expect.any(Object)
      );
    });

    it('should handle cursor-based pagination', async () => {
      // Arrange
      const filters = {
        cursor: {
          limit: 100,
          updatedAt: '2025-01-01T00:00:00Z',
          nmID: 12345,
        },
      };
      const response = {
        cards: [],
        cursor: {
          total: 150,
          updatedAt: '2025-01-01T01:00:00Z',
          nmID: 12400,
        },
      };
      mockClient.post.mockResolvedValue(response);

      // Act
      const result = await productsModule.listProducts(filters);

      // Assert
      expect(result.cursor?.total).toBe(150);
      expect(result.cursor?.updatedAt).toBe('2025-01-01T01:00:00Z');
    });

    it('should return empty cards array when no products found', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ cards: [], cursor: { total: 0 } });

      // Act
      const result = await productsModule.listProducts();

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/get/cards/list',
        { settings: {} }, // Should send empty object, not undefined
        { rateLimitKey: 'products.postContentGetCardsList' }
      );
      expect(result.cards).toEqual([]);
    });
  });

  describe('getAllProducts', () => {
    it('should fetch all products with automatic pagination', async () => {
      // Arrange: Simulate 250 products (3 pages: 100 + 100 + 50)
      const page1 = {
        cards: Array.from({ length: 100 }, (_, i) => ({
          nmID: i + 1,
          vendorCode: `VENDOR-${i + 1}`,
        })),
        cursor: {
          total: 250,
          updatedAt: '2025-01-01T01:00:00Z',
          nmID: 100,
        },
      };

      const page2 = {
        cards: Array.from({ length: 100 }, (_, i) => ({
          nmID: i + 101,
          vendorCode: `VENDOR-${i + 101}`,
        })),
        cursor: {
          total: 250,
          updatedAt: '2025-01-01T02:00:00Z',
          nmID: 200,
        },
      };

      const page3 = {
        cards: Array.from({ length: 50 }, (_, i) => ({
          nmID: i + 201,
          vendorCode: `VENDOR-${i + 201}`,
        })),
        cursor: {
          total: 250,
        },
      };

      mockClient.post
        .mockResolvedValueOnce(page1)
        .mockResolvedValueOnce(page2)
        .mockResolvedValueOnce(page3);

      // Act
      const result = await productsModule.getAllProducts();

      // Assert
      expect(result).toHaveLength(250);
      expect(result[0].nmID).toBe(1);
      expect(result[99].nmID).toBe(100);
      expect(result[100].nmID).toBe(101);
      expect(result[249].nmID).toBe(250);
      expect(mockClient.post).toHaveBeenCalledTimes(3);
    });

    it('should respect maxProducts limit', async () => {
      // Arrange
      const page1 = {
        cards: Array.from({ length: 100 }, (_, i) => ({
          nmID: i + 1,
          vendorCode: `VENDOR-${i + 1}`,
        })),
        cursor: {
          total: 1000,
          updatedAt: '2025-01-01T01:00:00Z',
          nmID: 100,
        },
      };

      mockClient.post.mockResolvedValue(page1);

      // Act: Limit to 50 products
      const result = await productsModule.getAllProducts(undefined, {
        maxProducts: 50,
      });

      // Assert
      expect(result).toHaveLength(50);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should handle single page results', async () => {
      // Arrange
      const singlePage = {
        cards: Array.from({ length: 50 }, (_, i) => ({
          nmID: i + 1,
          vendorCode: `VENDOR-${i + 1}`,
        })),
        cursor: {
          total: 50,
        },
      };

      mockClient.post.mockResolvedValue(singlePage);

      // Act
      const result = await productsModule.getAllProducts();

      // Assert
      expect(result).toHaveLength(50);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should apply filters correctly', async () => {
      // Arrange
      const filteredPage = {
        cards: [{ nmID: 1, vendorCode: 'VENDOR-1' }],
        cursor: { total: 1 },
      };

      mockClient.post.mockResolvedValue(filteredPage);

      // Act
      const result = await productsModule.getAllProducts({
        filter: { withPhoto: 1 },
      });

      // Assert
      expect(result).toHaveLength(1);
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        {
          settings: {
            filter: { withPhoto: 1 },
            cursor: { limit: 100 },
          },
        },
        expect.any(Object)
      );
    });

    it('should stop when all products are fetched (even with large total)', async () => {
      // Arrange: Simulate scenario where we get all products before reaching total
      // This tests that pagination stops correctly when we've fetched everything
      const page1 = {
        cards: Array.from({ length: 100 }, (_, i) => ({
          nmID: i + 1,
          vendorCode: `VENDOR-${i + 1}`,
        })),
        cursor: {
          total: 100, // Total matches what we'll get
          updatedAt: '2025-01-01T01:00:00Z',
          nmID: 100,
        },
      };

      mockClient.post.mockResolvedValue(page1);

      // Act
      const result = await productsModule.getAllProducts();

      // Assert: Should stop after first page since we got all products
      expect(result).toHaveLength(100);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return empty array when no products found', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({
        cards: [],
        cursor: { total: 0 },
      });

      // Act
      const result = await productsModule.getAllProducts();

      // Assert
      expect(result).toEqual([]);
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateProduct', () => {
    it('should call BaseClient.post with UpdateProductRequest array and rate limit key', async () => {
      // Arrange
      const updates = [
        {
          nmID: 12345,
          vendorCode: 'VENDOR-001',
          sizes: [],
          title: 'Updated Title',
        },
      ];
      const response = { error: false, errorText: '' };
      mockClient.post.mockResolvedValue(response);

      // Act
      const result = await productsModule.updateProduct(updates);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/update',
        updates,
        { rateLimitKey: 'products.postContentCardsUpdate' }
      );
      expect(result).toEqual(response);
    });

    it('should handle bulk updates', async () => {
      // Arrange
      const updates = [
        { nmID: 12345, vendorCode: 'V1', sizes: [] },
        { nmID: 12346, vendorCode: 'V2', sizes: [] },
        { nmID: 12347, vendorCode: 'V3', sizes: [] },
      ];
      mockClient.post.mockResolvedValue({ error: false, errorText: '' });

      // Act
      await productsModule.updateProduct(updates);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(expect.any(String), updates, expect.any(Object));
    });

    it('should throw ValidationError for missing nmID', async () => {
      // Arrange
      const error = new ValidationError('Missing required field: nmID', { nmID: 'Required' });
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(
        productsModule.updateProduct([
          {
            nmID: 0,
            vendorCode: 'TEST',
            sizes: [],
          },
        ])
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('deleteProduct', () => {
    it('should call BaseClient.post with nmIDs array and rate limit key', async () => {
      // Arrange
      const nmIDs = [12345, 12346];
      const response = { error: false, errorText: '', data: {} };
      mockClient.post.mockResolvedValue(response);

      // Act
      const result = await productsModule.deleteProduct(nmIDs);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/delete/trash',
        { nmIDs },
        { rateLimitKey: 'products.postContentCardsDeleteTrash' }
      );
      expect(result).toEqual(response);
    });

    it('should handle batch deletion', async () => {
      // Arrange
      const nmIDs = Array.from({ length: 100 }, (_, i) => 10000 + i);
      mockClient.post.mockResolvedValue({ error: false, errorText: '' });

      // Act
      await productsModule.deleteProduct(nmIDs);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        { nmIDs },
        expect.any(Object)
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should validate nmIDs array not empty', async () => {
      // Arrange
      const error = new ValidationError('nmIDs array cannot be empty');
      mockClient.post.mockRejectedValue(error);

      // Act & Assert
      await expect(productsModule.deleteProduct([])).rejects.toThrow(ValidationError);
    });
  });

  describe('getProductCard', () => {
    it('should call listProducts with textSearch filter', async () => {
      // Arrange
      const nmID = 12345;
      const response = {
        cards: [{ nmID: 12345, vendorCode: 'TEST-001', title: 'Test Product' }],
        cursor: { total: 1 },
      };
      mockClient.post.mockResolvedValue(response);

      // Act
      const result = await productsModule.getProductCard(nmID);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/get/cards/list',
        { settings: { filter: { textSearch: '12345' } } },
        { rateLimitKey: 'products.postContentGetCardsList' }
      );
      expect(result).not.toBeNull();
      expect(result?.nmID).toBe(12345);
    });

    it('should return product card if found', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({
        cards: [
          { nmID: 12345, vendorCode: 'TEST-001' },
          { nmID: 12346, vendorCode: 'TEST-002' },
        ],
      });

      // Act
      const result = await productsModule.getProductCard(12345);

      // Assert
      expect(result).not.toBeNull();
      expect(result?.nmID).toBe(12345);
      expect(result?.vendorCode).toBe('TEST-001');
    });

    it('should return null if product not found', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ cards: [], cursor: { total: 0 } });

      // Act
      const result = await productsModule.getProductCard(99999);

      // Assert
      expect(result).toBeNull();
    });

    it('should return null if cards array is undefined', async () => {
      // Arrange
      mockClient.post.mockResolvedValue({ cursor: { total: 0 } });

      // Act
      const result = await productsModule.getProductCard(12345);

      // Assert
      expect(result).toBeNull();
    });
  });

  describe('Media Management Methods', () => {
    describe('uploadMediaFile()', () => {
      const mockMediaUploadResponse = {
        data: {},
        error: false,
        errorText: '',
        additionalErrors: null,
      };

      it('should call BaseClient.post with multipart/form-data', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockMediaUploadResponse);
        const file = Buffer.from('fake image data');
        const nmID = 12345;
        const photoNumber = 1;

        // Act
        await productsModule.uploadMediaFile(nmID, file, photoNumber);

        // Assert
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        const [url, formData, options] = mockClient.post.mock.calls[0] as [
          string,
          FormData,
          { rateLimitKey?: string; headers?: Record<string, string> } | undefined,
        ];
        expect(url).toBe('https://content-api.wildberries.ru/content/v3/media/file');
        expect(formData).toBeInstanceOf(FormData);
        expect(options?.rateLimitKey).toBe('products.uploadMediaFile');
      });

      it('should set X-Nm-Id and X-Photo-Number headers', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockMediaUploadResponse);
        const file = Buffer.from('test data');
        const nmID = 98765;
        const photoNumber = 3;

        // Act
        await productsModule.uploadMediaFile(nmID, file, photoNumber);

        // Assert
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        const [, , options] = mockClient.post.mock.calls[0] as [
          string,
          FormData,
          { rateLimitKey?: string; headers?: Record<string, string> } | undefined,
        ];
        expect(options?.headers).toEqual({
          'X-Nm-Id': '98765',
          'X-Photo-Number': '3',
          'Content-Type': 'multipart/form-data',
        });
      });

      it('should return upload response', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockMediaUploadResponse);
        const file = Buffer.from('test');

        // Act
        const result = await productsModule.uploadMediaFile(12345, file, 1);

        // Assert
        expect(result).toEqual(mockMediaUploadResponse);
        expect(result.error).toBe(false);
      });
    });

    describe('uploadMediaByURLs()', () => {
      const mockMediaUploadResponse = {
        data: {},
        error: false,
        errorText: '',
        additionalErrors: null,
      };

      it('should send nmId and data array', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockMediaUploadResponse);
        const nmID = 12345;
        const mediaURLs = ['https://example.com/photo1.jpg', 'https://example.com/photo2.jpg'];

        // Act
        await productsModule.uploadMediaByURLs(nmID, mediaURLs);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://content-api.wildberries.ru/content/v3/media/save',
          { nmId: nmID, data: mediaURLs },
          { rateLimitKey: 'products.uploadMediaByURLs' }
        );
      });

      it('should handle media replacement correctly', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockMediaUploadResponse);
        const nmID = 54321;
        const newMediaURLs = ['https://example.com/new-photo.jpg'];

        // Act
        await productsModule.uploadMediaByURLs(nmID, newMediaURLs);

        // Assert
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        const [, body] = mockClient.post.mock.calls[0] as [
          string,
          { nmId: number; data: string[] },
        ];
        expect(body.data).toEqual(newMediaURLs);
        expect(body.nmId).toBe(nmID);
      });

      it('should return upload response', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockMediaUploadResponse);

        // Act
        const result = await productsModule.uploadMediaByURLs(12345, ['https://test.jpg']);

        // Assert
        expect(result).toEqual(mockMediaUploadResponse);
      });
    });

    describe('getMediaList()', () => {
      it('should return photos from product card', async () => {
        // Arrange
        const mockProductCard = {
          nmID: 12345,
          vendorCode: 'TEST-001',
          photos: [
            { big: 'https://example.com/photo1.jpg' },
            { big: 'https://example.com/photo2.jpg' },
            { big: 'https://example.com/photo3.jpg' },
          ],
        };
        mockClient.post.mockResolvedValue({ cards: [mockProductCard] });

        // Act
        const result = await productsModule.getMediaList(12345);

        // Assert
        expect(result).toEqual([
          'https://example.com/photo1.jpg',
          'https://example.com/photo2.jpg',
          'https://example.com/photo3.jpg',
        ]);
        expect(result).toHaveLength(3);
      });

      it('should return empty array if no photos', async () => {
        // Arrange
        mockClient.post.mockResolvedValue({
          cards: [{ nmID: 12345, vendorCode: 'TEST-001' }],
        });

        // Act
        const result = await productsModule.getMediaList(12345);

        // Assert
        expect(result).toEqual([]);
      });

      it('should return empty array if product not found', async () => {
        // Arrange
        mockClient.post.mockResolvedValue({ cards: [] });

        // Act
        const result = await productsModule.getMediaList(99999);

        // Assert
        expect(result).toEqual([]);
      });
    });
  });

  describe('Pricing Management Methods', () => {
    describe('updatePricing()', () => {
      const mockPricingTaskResponse = {
        uploadID: 'task-abc-123',
      };

      it('should send pricing data array', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockPricingTaskResponse);
        const updates = [
          { nmID: 12345, price: 2999, discount: 15 },
          { nmID: 54321, price: 1499, discount: 10 },
        ];

        // Act
        await productsModule.updatePricing(updates);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://discounts-prices-api.wildberries.ru/api/v2/upload/task',
          { data: updates },
          { rateLimitKey: 'products.updatePricing' }
        );
      });

      it('should return task ID for async processing', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockPricingTaskResponse);
        const updates = [{ nmID: 12345, price: 1000 }];

        // Act
        const result = await productsModule.updatePricing(updates);

        // Assert
        expect(result).toEqual(mockPricingTaskResponse);
        expect(result.uploadID).toBe('task-abc-123');
      });

      it('should handle bulk pricing updates', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockPricingTaskResponse);
        const bulkUpdates = Array.from({ length: 50 }, (_, i) => ({
          nmID: 10000 + i,
          price: 999 + i,
          discount: 5,
        }));

        // Act
        await productsModule.updatePricing(bulkUpdates);

        // Assert
        expect(mockClient.post).toHaveBeenCalledTimes(1);
        const [, body] = mockClient.post.mock.calls[0] as [
          string,
          { data: { nmID: number; price?: number; discount?: number }[] },
        ];
        expect(body.data).toHaveLength(50);
      });
    });

    describe('getPricing()', () => {
      const mockPricingResponse = {
        data: [
          {
            nmID: 12345,
            price: 2999,
            discount: 15,
            promoCode: 0,
            wbClubDiscount: 0,
            currency: 'RUB',
          },
        ],
      };

      it('should use GET endpoint with single nmID', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockPricingResponse);
        const nmID = 12345;

        // Act
        const result = await productsModule.getPricing(nmID);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
          {
            params: { filterNmID: nmID },
            rateLimitKey: 'products.getPricing',
          }
        );
        expect(result).toEqual(mockPricingResponse.data);
      });

      it('should use POST endpoint with multiple nmIDs', async () => {
        // Arrange
        const multiPricingResponse = {
          data: [
            {
              nmID: 12345,
              price: 2999,
              discount: 15,
              promoCode: 0,
              wbClubDiscount: 0,
              currency: 'RUB',
            },
            {
              nmID: 54321,
              price: 1499,
              discount: 10,
              promoCode: 0,
              wbClubDiscount: 0,
              currency: 'RUB',
            },
          ],
        };
        mockClient.post.mockResolvedValue(multiPricingResponse);
        const nmIDs = [12345, 54321];

        // Act
        const result = await productsModule.getPricing(nmIDs);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
          { nmIDs },
          { rateLimitKey: 'products.getPricing' }
        );
        expect(result).toEqual(multiPricingResponse.data);
      });

      it('should return pricing info array', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockPricingResponse);

        // Act
        const result = await productsModule.getPricing(12345);

        // Assert
        expect(Array.isArray(result)).toBe(true);
        expect(result[0]).toHaveProperty('price');
        expect(result[0]).toHaveProperty('discount');
        expect(result[0]).toHaveProperty('currency');
      });
    });

    describe('getPricingTaskStatus()', () => {
      const mockTaskStatusResponse = {
        uploadID: 'task-abc-123',
        status: 'completed',
        createdAt: '2025-10-22T00:00:00Z',
        completedAt: '2025-10-22T00:01:00Z',
      };

      it('should query task status', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockTaskStatusResponse);
        const uploadID = 'task-abc-123';

        // Act
        await productsModule.getPricingTaskStatus(uploadID);

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://discounts-prices-api.wildberries.ru/api/v2/history/tasks',
          {
            params: { uploadID },
            rateLimitKey: 'products.getPricingTaskStatus',
          }
        );
      });

      it('should return task status response', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockTaskStatusResponse);

        // Act
        const result = await productsModule.getPricingTaskStatus('task-abc-123');

        // Assert
        expect(result).toEqual(mockTaskStatusResponse);
        expect(result.status).toBe('completed');
        expect(result.uploadID).toBe('task-abc-123');
      });

      it('should handle pending status', async () => {
        // Arrange
        const pendingResponse = {
          ...mockTaskStatusResponse,
          status: 'pending' as const,
          completedAt: undefined,
        };
        mockClient.get.mockResolvedValue(pendingResponse);

        // Act
        const result = await productsModule.getPricingTaskStatus('task-xyz-789');

        // Assert
        expect(result.status).toBe('pending');
        expect(result.completedAt).toBeUndefined();
      });
    });
  });

  // ==========================================================================
  // Warehouse and Stock Management Tests (Story 2.4)
  // ==========================================================================

  describe('Warehouse and Stock Management', () => {
    describe('getWBOffices()', () => {
      const mockWBOffices = [
        { id: 1, name: 'Коледино', city: 'Подольск', cargoType: 1, deliveryType: 1 },
        { id: 2, name: 'Электросталь', city: 'Электросталь', cargoType: 2, deliveryType: 1 },
      ];

      it('should fetch WB offices for binding', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockWBOffices);

        // Act
        await productsModule.getWBOffices();

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/offices',
          { rateLimitKey: 'products.getWBOffices' }
        );
      });

      it('should return array of WB offices', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockWBOffices);

        // Act
        const result = await productsModule.getWBOffices();

        // Assert
        expect(result).toEqual(mockWBOffices);
        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('id');
        expect(result[0]).toHaveProperty('name');
      });
    });

    describe('getWarehouses()', () => {
      const mockWarehouses = [
        {
          id: 123,
          name: 'Склад Москва',
          officeId: 1,
          cargoType: 1,
          isProcessing: false,
          isDeleting: false,
        },
        {
          id: 456,
          name: 'Склад СПБ',
          officeId: 2,
          cargoType: 2,
          isProcessing: false,
          isDeleting: false,
        },
      ];

      it('should fetch seller warehouses', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockWarehouses);

        // Act
        await productsModule.getWarehouses();

        // Assert
        expect(mockClient.get).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/warehouses',
          { rateLimitKey: 'products.getWarehouses' }
        );
      });

      it('should return array of warehouses', async () => {
        // Arrange
        mockClient.get.mockResolvedValue(mockWarehouses);

        // Act
        const result = await productsModule.getWarehouses();

        // Assert
        expect(result).toEqual(mockWarehouses);
        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('officeId');
      });
    });

    describe('createWarehouse()', () => {
      const mockCreateResponse = { id: 789 };

      it('should create warehouse with name and officeId', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockCreateResponse);
        const name = 'Склад Коледино';
        const officeId = 1;

        // Act
        await productsModule.createWarehouse(name, officeId);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          'https://marketplace-api.wildberries.ru/api/v3/warehouses',
          { name, officeId },
          { rateLimitKey: 'products.createWarehouse' }
        );
      });

      it('should return new warehouse ID', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockCreateResponse);

        // Act
        const result = await productsModule.createWarehouse('Test Warehouse', 1);

        // Assert
        expect(result).toEqual(mockCreateResponse);
        expect(result.id).toBe(789);
      });

      it('should validate warehouse name length (1-200 chars)', async () => {
        // Act & Assert
        await expect(productsModule.createWarehouse('', 1)).rejects.toThrow(
          'Warehouse name must be 1-200 characters'
        );
        await expect(productsModule.createWarehouse('a'.repeat(201), 1)).rejects.toThrow(
          'Warehouse name must be 1-200 characters'
        );
      });

      it('should validate office ID is positive', async () => {
        // Act & Assert
        await expect(productsModule.createWarehouse('Valid Name', 0)).rejects.toThrow(
          'Office ID must be a positive integer'
        );
        await expect(productsModule.createWarehouse('Valid Name', -1)).rejects.toThrow(
          'Office ID must be a positive integer'
        );
      });
    });

    describe('updateWarehouse()', () => {
      it('should update warehouse with all parameters', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);
        const warehouseId = 123;
        const name = 'Updated Name';
        const officeId = 2;

        // Act
        await productsModule.updateWarehouse(warehouseId, name, officeId);

        // Assert
        expect(mockClient.put).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
          { name, officeId },
          { rateLimitKey: 'products.updateWarehouse' }
        );
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);

        // Act
        await productsModule.updateWarehouse(123, 'New Name', 1);

        // Assert - verify method was called (void return)
        expect(mockClient.put).toHaveBeenCalled();
      });
    });

    describe('deleteWarehouse()', () => {
      it('should delete warehouse by ID', async () => {
        // Arrange
        mockClient.delete.mockResolvedValue(undefined);
        const warehouseId = 123;

        // Act
        await productsModule.deleteWarehouse(warehouseId);

        // Assert
        expect(mockClient.delete).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
          { rateLimitKey: 'products.deleteWarehouse' }
        );
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.delete.mockResolvedValue(undefined);

        // Act
        await productsModule.deleteWarehouse(456);

        // Assert - verify method was called (void return)
        expect(mockClient.delete).toHaveBeenCalled();
      });
    });

    describe('getStock()', () => {
      const mockStockResponse = {
        stocks: [
          { sku: 'BARCODE123', amount: 100 },
          { sku: 'BARCODE456', amount: 50 },
        ],
      };

      it('should fetch stock for SKUs at warehouse', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockStockResponse);
        const warehouseId = 123;
        const skus = ['BARCODE123', 'BARCODE456'];

        // Act
        await productsModule.getStock(warehouseId, skus);

        // Assert
        expect(mockClient.post).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
          { skus },
          { rateLimitKey: 'products.getStock' }
        );
      });

      it('should return array of stock info', async () => {
        // Arrange
        mockClient.post.mockResolvedValue(mockStockResponse);

        // Act
        const result = await productsModule.getStock(123, ['BARCODE123']);

        // Assert
        expect(result).toEqual(mockStockResponse.stocks);
        expect(result).toHaveLength(2);
        expect(result[0]).toHaveProperty('sku');
        expect(result[0]).toHaveProperty('amount');
      });

      it('should validate SKU array size (1-1000)', async () => {
        // Act & Assert
        await expect(productsModule.getStock(123, [])).rejects.toThrow(
          'SKUs array must contain 1-1000 items'
        );
        const tooManySKUs = Array.from({ length: 1001 }, (_, i) => `SKU${i}`);
        await expect(productsModule.getStock(123, tooManySKUs)).rejects.toThrow(
          'SKUs array must contain 1-1000 items'
        );
      });
    });

    describe('updateStockLevels()', () => {
      it('should update stock with stocks array', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);
        const warehouseId = 123;
        const updates = [
          { sku: 'BARCODE123', amount: 100 },
          { sku: 'BARCODE456', amount: 50 },
        ];

        // Act
        await productsModule.updateStockLevels(warehouseId, updates);

        // Assert
        expect(mockClient.put).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
          { stocks: updates },
          { rateLimitKey: 'products.updateStock' }
        );
      });

      it('should validate updates array size (1-1000)', async () => {
        // Act & Assert
        await expect(productsModule.updateStockLevels(123, [])).rejects.toThrow(
          'Stock updates array must contain 1-1000 items'
        );
        const tooManyUpdates = Array.from({ length: 1001 }, (_, i) => ({
          sku: `SKU${i}`,
          amount: 1,
        }));
        await expect(productsModule.updateStockLevels(123, tooManyUpdates)).rejects.toThrow(
          'Stock updates array must contain 1-1000 items'
        );
      });

      it('should validate stock amounts (0-100000)', async () => {
        // Act & Assert
        await expect(
          productsModule.updateStockLevels(123, [{ sku: 'TEST', amount: -1 }])
        ).rejects.toThrow('Stock amount must be 0-100000');

        await expect(
          productsModule.updateStockLevels(123, [{ sku: 'TEST', amount: 100001 }])
        ).rejects.toThrow('Stock amount must be 0-100000');
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.put.mockResolvedValue(undefined);
        const updates = [{ sku: 'SKU123', amount: 10 }];

        // Act
        await productsModule.updateStockLevels(123, updates);

        // Assert - verify method was called (void return)
        expect(mockClient.put).toHaveBeenCalled();
      });
    });

    describe('deleteStockRecords()', () => {
      it('should delete stock with SKUs array', async () => {
        // Arrange
        mockClient.delete.mockResolvedValue(undefined);
        const warehouseId = 123;
        const skus = ['BARCODE123', 'BARCODE456'];

        // Act
        await productsModule.deleteStockRecords(warehouseId, skus);

        // Assert
        expect(mockClient.delete).toHaveBeenCalledWith(
          `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
          { skus },
          { rateLimitKey: 'products.deleteStock' }
        );
      });

      it('should validate SKU array size (1-1000)', async () => {
        // Act & Assert
        await expect(productsModule.deleteStockRecords(123, [])).rejects.toThrow(
          'SKUs array must contain 1-1000 items'
        );
        const tooManySKUs = Array.from({ length: 1001 }, (_, i) => `SKU${i}`);
        await expect(productsModule.deleteStockRecords(123, tooManySKUs)).rejects.toThrow(
          'SKUs array must contain 1-1000 items'
        );
      });

      it('should return void on success', async () => {
        // Arrange
        mockClient.delete.mockResolvedValue(undefined);
        const skus = ['SKU123'];

        // Act
        await productsModule.deleteStockRecords(123, skus);

        // Assert - verify method was called (void return)
        expect(mockClient.delete).toHaveBeenCalled();
      });
    });
  });
});
