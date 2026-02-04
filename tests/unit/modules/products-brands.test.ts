/**
 * Unit tests for ProductsModule.getBrands()
 *
 * Tests the getBrands method with mocked BaseClient to verify:
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Rate limit key wiring
 * - Error propagation
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';

describe('ProductsModule.getBrands()', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let productsModule: ProductsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    productsModule = new ProductsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const mockBrandsResponse = {
    brands: [
      { id: 1001, logoUrl: 'https://example.com/logo1.png', name: 'Brand One' },
      { id: 1002, logoUrl: 'https://example.com/logo2.png', name: 'Brand Two' },
    ],
    next: 1003,
    total: 344534,
  };

  describe('URL and parameters', () => {
    it('should call BaseClient.get with correct URL and subjectId', async () => {
      mockClient.get.mockResolvedValue(mockBrandsResponse);

      await productsModule.getBrands(1234);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/api/content/v1/brands',
        expect.objectContaining({
          params: { subjectId: 1234 },
          rateLimitKey: 'products.brands',
        })
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should pass next parameter when provided', async () => {
      mockClient.get.mockResolvedValue(mockBrandsResponse);

      await productsModule.getBrands(1234, 5678);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/api/content/v1/brands',
        expect.objectContaining({
          params: { subjectId: 1234, next: 5678 },
          rateLimitKey: 'products.brands',
        })
      );
    });

    it('should NOT include next parameter when undefined', async () => {
      mockClient.get.mockResolvedValue(mockBrandsResponse);

      await productsModule.getBrands(1234);

      const callArgs = mockClient.get.mock.calls[0][1];
      expect(callArgs.params).toEqual({ subjectId: 1234 });
      expect(callArgs.params).not.toHaveProperty('next');
    });

    it('should include rateLimitKey products.brands', async () => {
      mockClient.get.mockResolvedValue(mockBrandsResponse);

      await productsModule.getBrands(1234);

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.brands' })
      );
    });
  });

  describe('response handling', () => {
    it('should return typed BrandsResponse', async () => {
      mockClient.get.mockResolvedValue(mockBrandsResponse);

      const result = await productsModule.getBrands(1234);

      expect(result).toEqual(mockBrandsResponse);
      expect(result.brands).toHaveLength(2);
      expect(result.brands[0].name).toBe('Brand One');
      expect(result.brands[0].id).toBe(1001);
      expect(result.brands[0].logoUrl).toBe('https://example.com/logo1.png');
      expect(result.total).toBe(344534);
      expect(result.next).toBe(1003);
    });

    it('should handle last page (no next cursor)', async () => {
      const lastPageResponse = {
        brands: [{ id: 9999, logoUrl: 'https://example.com/last.png', name: 'Last Brand' }],
        total: 1,
      };
      mockClient.get.mockResolvedValue(lastPageResponse);

      const result = await productsModule.getBrands(1234);

      expect(result.brands).toHaveLength(1);
      expect(result.next).toBeUndefined();
    });

    it('should handle empty brands array', async () => {
      const emptyResponse = { brands: [], total: 0 };
      mockClient.get.mockResolvedValue(emptyResponse);

      const result = await productsModule.getBrands(9999);

      expect(result.brands).toEqual([]);
      expect(result.total).toBe(0);
    });
  });

  describe('error propagation', () => {
    it('should propagate AuthenticationError', async () => {
      const error = new AuthenticationError('Invalid API key');
      mockClient.get.mockRejectedValue(error);

      await expect(productsModule.getBrands(1234)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      const error = new RateLimitError('Rate limit exceeded', 1000);
      mockClient.get.mockRejectedValue(error);

      await expect(productsModule.getBrands(1234)).rejects.toThrow(RateLimitError);
    });

    it('should propagate NetworkError', async () => {
      const error = new NetworkError('Network failed', false, 503);
      mockClient.get.mockRejectedValue(error);

      await expect(productsModule.getBrands(1234)).rejects.toThrow(NetworkError);
    });
  });
});
