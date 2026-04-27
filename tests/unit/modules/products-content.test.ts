/**
 * Unit tests for ProductsModule - Content, Directories & Tags
 *
 * Tests 15 methods with mocked BaseClient to verify:
 * - Correct URL and parameter passing
 * - Rate limit key wiring
 * - Error propagation (AuthenticationError, RateLimitError, NetworkError)
 * - Path parameter interpolation
 * - Request body passing for POST/PATCH/DELETE
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';

describe('ProductsModule - Content, Directories & Tags', () => {
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

  // =========================================================================
  // Categories (3 methods)
  // =========================================================================

  describe('getParentAll()', () => {
    it('should call correct URL with locale param', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getParentAll({ locale: 'ru' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/parent/all',
        expect.objectContaining({
          params: { locale: 'ru' },
          rateLimitKey: 'products.contentObjectParentAll',
        })
      );
    });

    it('should pass rateLimitKey when called without options', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getParentAll();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/parent/all',
        expect.objectContaining({ rateLimitKey: 'products.contentObjectParentAll' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));
      await expect(productsModule.getParentAll()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(productsModule.getParentAll()).rejects.toThrow(RateLimitError);
    });
  });

  describe('getObjectAll()', () => {
    it('should call correct URL with all query params', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      const options = { locale: 'ru', name: 'Test', limit: 10, offset: 0, parentID: 42 };
      await productsModule.getObjectAll(options);
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/all',
        expect.objectContaining({
          params: options,
          rateLimitKey: 'products.contentObjectAll',
        })
      );
    });

    it('should pass rateLimitKey when called without options', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getObjectAll();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentObjectAll' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid API key'));
      await expect(productsModule.getObjectAll()).rejects.toThrow(AuthenticationError);
    });

    it('should return response data on success', async () => {
      const mockResponse = {
        data: [{ subjectID: 1, parentID: 10, subjectName: 'Shoes', parentName: 'Apparel' }],
      };
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getObjectAll({ name: 'Shoes' });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getObjectCharc()', () => {
    it('should interpolate subjectId into URL path', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getObjectCharc(999);
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/charcs/999',
        expect.objectContaining({
          rateLimitKey: 'products.contentObjectCharcs',
        })
      );
    });

    it('should pass locale option as query param', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getObjectCharc(42, { locale: 'en' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/object/charcs/42',
        expect.objectContaining({
          params: { locale: 'en' },
          rateLimitKey: 'products.contentObjectCharcs',
        })
      );
    });

    it('should propagate NetworkError', async () => {
      mockClient.get.mockRejectedValue(new NetworkError('Connection timeout'));
      await expect(productsModule.getObjectCharc(1)).rejects.toThrow(NetworkError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Too many requests', 10000));
      await expect(productsModule.getObjectCharc(1)).rejects.toThrow(RateLimitError);
    });

    it('should accept isRequiredForCreate field in response (v3.9.0)', async () => {
      const mockResponse = {
        data: [
          {
            charcID: 101,
            name: 'Объём памяти',
            required: true,
            isRequiredForCreate: true,
            charcType: 1,
          },
          {
            charcID: 102,
            name: 'Цвет',
            required: false,
            isRequiredForCreate: false,
            charcType: 0,
          },
          {
            charcID: 103,
            name: 'Бренд',
            required: true,
            // isRequiredForCreate omitted — backwards compatible
            charcType: 0,
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getObjectCharc(1260);
      expect(result.data).toHaveLength(3);
      expect(result.data![0].isRequiredForCreate).toBe(true);
      expect(result.data![1].isRequiredForCreate).toBe(false);
      expect(result.data![2].isRequiredForCreate).toBeUndefined();
    });

    it('should accept isVariable field in response (v3.9.2)', async () => {
      const mockResponse = {
        data: [
          {
            charcID: 14177449,
            name: 'Цвет',
            isVariable: true,
            charcType: 4,
          },
          {
            charcID: 91,
            name: 'Бренд',
            isVariable: false,
            charcType: 0,
          },
          {
            charcID: 92,
            name: 'Артикул производителя',
            // isVariable omitted — backwards compatible
            charcType: 0,
          },
        ],
      };
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getObjectCharc(2314);
      expect(result.data).toHaveLength(3);
      expect(result.data![0].isVariable).toBe(true);
      expect(result.data![1].isVariable).toBe(false);
      expect(result.data![2].isVariable).toBeUndefined();
    });
  });

  // =========================================================================
  // Directories (6 methods)
  // =========================================================================

  describe('getDirectoryColors()', () => {
    it('should call correct URL with locale param', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryColors({ locale: 'ru' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/directory/colors',
        expect.objectContaining({
          params: { locale: 'ru' },
          rateLimitKey: 'products.contentDirectoryColors',
        })
      );
    });

    it('should pass rateLimitKey when called without options', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryColors();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentDirectoryColors' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Unauthorized'));
      await expect(productsModule.getDirectoryColors()).rejects.toThrow(AuthenticationError);
    });
  });

  describe('getDirectoryKinds()', () => {
    it('should call correct URL with locale param', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryKinds({ locale: 'en' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/directory/kinds',
        expect.objectContaining({
          params: { locale: 'en' },
          rateLimitKey: 'products.contentDirectoryKinds',
        })
      );
    });

    it('should pass rateLimitKey when called without options', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryKinds();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentDirectoryKinds' })
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Limited', 3000));
      await expect(productsModule.getDirectoryKinds()).rejects.toThrow(RateLimitError);
    });
  });

  describe('getDirectoryCountries()', () => {
    it('should call correct URL with locale param', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryCountries({ locale: 'ru' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/directory/countries',
        expect.objectContaining({
          params: { locale: 'ru' },
          rateLimitKey: 'products.contentDirectoryCountries',
        })
      );
    });

    it('should pass rateLimitKey when called without options', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryCountries();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentDirectoryCountries' })
      );
    });

    it('should propagate NetworkError', async () => {
      mockClient.get.mockRejectedValue(new NetworkError('DNS resolution failed'));
      await expect(productsModule.getDirectoryCountries()).rejects.toThrow(NetworkError);
    });
  });

  describe('getDirectorySeasons()', () => {
    it('should call correct URL with locale param', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectorySeasons({ locale: 'de' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/directory/seasons',
        expect.objectContaining({
          params: { locale: 'de' },
          rateLimitKey: 'products.contentDirectorySeasons',
        })
      );
    });

    it('should pass rateLimitKey when called without options', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectorySeasons();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentDirectorySeasons' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Expired token'));
      await expect(productsModule.getDirectorySeasons()).rejects.toThrow(AuthenticationError);
    });
  });

  describe('getDirectoryVat()', () => {
    it('should call correct URL with locale param', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryVat({ locale: 'ru' });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/directory/vat',
        expect.objectContaining({
          params: { locale: 'ru' },
          rateLimitKey: 'products.contentDirectoryVat',
        })
      );
    });

    it('should pass rateLimitKey when called without options', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryVat();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentDirectoryVat' })
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Throttled', 2000));
      await expect(productsModule.getDirectoryVat()).rejects.toThrow(RateLimitError);
    });
  });

  describe('getDirectoryTnved()', () => {
    it('should call correct URL with all params', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      const options = { subjectID: 100, search: 12345, locale: 'ru' };
      await productsModule.getDirectoryTnved(options);
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/directory/tnved',
        expect.objectContaining({
          params: options,
          rateLimitKey: 'products.contentDirectoryTnved',
        })
      );
    });

    it('should pass rateLimitKey with minimal params', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getDirectoryTnved({ subjectID: 5 });
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentDirectoryTnved' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Forbidden'));
      await expect(productsModule.getDirectoryTnved({ subjectID: 1 })).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should return typed tnved data on success', async () => {
      const mockResponse = { data: [{ tnved: '1234567890', isKiz: true }] };
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getDirectoryTnved({ subjectID: 1 });
      expect(result).toEqual(mockResponse);
    });
  });

  // =========================================================================
  // Tags (5 methods)
  // =========================================================================

  describe('getContentTags()', () => {
    it('should call correct URL with no params', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getContentTags();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tags',
        expect.objectContaining({
          rateLimitKey: 'products.contentTags',
        })
      );
    });

    it('should pass rateLimitKey', async () => {
      mockClient.get.mockResolvedValue({ data: [] });
      await productsModule.getContentTags();
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({ rateLimitKey: 'products.contentTags' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid key'));
      await expect(productsModule.getContentTags()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate NetworkError', async () => {
      mockClient.get.mockRejectedValue(new NetworkError('Timeout'));
      await expect(productsModule.getContentTags()).rejects.toThrow(NetworkError);
    });
  });

  describe('createContentTag()', () => {
    it('should POST to correct URL with data and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ error: false });
      const data = { color: 'D1CFD7', name: 'MyTag' };
      await productsModule.createContentTag(data);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag',
        data,
        { rateLimitKey: 'products.postContentTag' }
      );
    });

    it('should pass rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ error: false });
      await productsModule.createContentTag({ name: 'Test' });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'products.postContentTag' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('No access'));
      await expect(productsModule.createContentTag({ name: 'Fail' })).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Too fast', 5000));
      await expect(productsModule.createContentTag({ name: 'Fail' })).rejects.toThrow(
        RateLimitError
      );
    });
  });

  describe('updateContentTag()', () => {
    it('should PATCH correct URL with id in path, data, and rateLimitKey', async () => {
      mockClient.patch.mockResolvedValue({ error: false });
      const data = { color: 'FF0000', name: 'Updated' };
      await productsModule.updateContentTag(77, data);
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag/77',
        data,
        { rateLimitKey: 'products.patchContentTag' }
      );
    });

    it('should interpolate different IDs into URL', async () => {
      mockClient.patch.mockResolvedValue({ error: false });
      await productsModule.updateContentTag(123, { name: 'New Name' });
      expect(mockClient.patch).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag/123',
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'products.patchContentTag' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.patch.mockRejectedValue(new AuthenticationError('Forbidden'));
      await expect(productsModule.updateContentTag(1, { name: 'X' })).rejects.toThrow(
        AuthenticationError
      );
    });

    it('should propagate NetworkError', async () => {
      mockClient.patch.mockRejectedValue(new NetworkError('Connection reset'));
      await expect(productsModule.updateContentTag(1, { name: 'X' })).rejects.toThrow(NetworkError);
    });
  });

  describe('deleteContentTag()', () => {
    it('should DELETE correct URL with id in path and rateLimitKey', async () => {
      mockClient.delete.mockResolvedValue({ error: false });
      await productsModule.deleteContentTag(55);
      expect(mockClient.delete).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag/55',
        undefined,
        { rateLimitKey: 'products.deleteContentTag' }
      );
    });

    it('should interpolate different IDs into URL', async () => {
      mockClient.delete.mockResolvedValue({ error: false });
      await productsModule.deleteContentTag(999);
      expect(mockClient.delete).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag/999',
        undefined,
        expect.objectContaining({ rateLimitKey: 'products.deleteContentTag' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.delete.mockRejectedValue(new AuthenticationError('Invalid'));
      await expect(productsModule.deleteContentTag(1)).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.delete.mockRejectedValue(new RateLimitError('Slow down', 8000));
      await expect(productsModule.deleteContentTag(1)).rejects.toThrow(RateLimitError);
    });
  });

  describe('createNomenclatureLink()', () => {
    it('should POST to correct URL with data and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ error: false });
      const data = { nmID: 12345, tagsIDs: [1, 2, 3] };
      await productsModule.createNomenclatureLink(data);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/tag/nomenclature/link',
        data,
        { rateLimitKey: 'products.postContentTagNomenclatureLink' }
      );
    });

    it('should pass rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ error: false });
      await productsModule.createNomenclatureLink({ nmID: 1, tagsIDs: [] });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.any(Object),
        expect.objectContaining({ rateLimitKey: 'products.postContentTagNomenclatureLink' })
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Access denied'));
      await expect(
        productsModule.createNomenclatureLink({ nmID: 1, tagsIDs: [1] })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Server unreachable'));
      await expect(
        productsModule.createNomenclatureLink({ nmID: 1, tagsIDs: [1] })
      ).rejects.toThrow(NetworkError);
    });
  });
});
