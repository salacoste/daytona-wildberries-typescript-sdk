/**
 * TDD RED-PHASE Tests - EPIC 16: Products Brand Types
 *
 * These tests are expected to FAIL until the feature is implemented.
 *
 * Acceptance Criteria:
 * - Brand-related types are generated from swagger schemas
 * - getBrands method exists on ProductsModule
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductsModule } from '../../src/modules/products';
import type { BaseClient } from '../../src/client/base-client';

describe('EPIC 16: Products Brand Types', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: ProductsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    module = new ProductsModule(mockClient as unknown as BaseClient);
  });

  describe('getBrands method', () => {
    it('should have a getBrands method', () => {
      expect(typeof (module as any).getBrands).toBe('function');
    });

    it('should call GET on content-api.wildberries.ru brands endpoint', async () => {
      mockClient.get.mockResolvedValue({ data: [] });

      await (module as any).getBrands();

      expect(mockClient.get).toHaveBeenCalledTimes(1);
      const callUrl = mockClient.get.mock.calls[0][0] as string;
      expect(callUrl).toContain('content-api.wildberries.ru');
      expect(callUrl).toMatch(/brand/i);
    });

    it('should return brand data with expected shape', async () => {
      const mockBrands = {
        data: [
          { brandId: 1, name: 'TestBrand' },
          { brandId: 2, name: 'AnotherBrand' },
        ],
      };
      mockClient.get.mockResolvedValue(mockBrands);

      const result = await (module as any).getBrands();

      expect(result).toHaveProperty('data');
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });

    it('should support optional locale parameter', async () => {
      mockClient.get.mockResolvedValue({ data: [] });

      await (module as any).getBrands({ locale: 'en' });

      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          params: expect.objectContaining({ locale: 'en' }),
        })
      );
    });
  });
});
