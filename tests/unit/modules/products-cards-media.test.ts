/**
 * Unit tests for ProductsModule - Cards & Media methods
 *
 * Tests 13 methods covering card operations, card management, upload, and media.
 * Verifies correct URL, HTTP method, rateLimitKey, parameter passing, and error propagation.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsModule, WITH_PHOTO_FILTER } from '../../../src/modules/products';
import { resetDeprecationWarnings } from '../../../src/utils/deprecation';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import type {
  RequestPublicViewerPublicErrorsTableListV2,
  RequestMoveNmsImtConn,
} from '../../../src/types/products.types';

describe('ProductsModule - Cards & Media', () => {
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

  // ---------------------------------------------------------------------------
  // 1. getCardsList
  // ---------------------------------------------------------------------------
  describe('getCardsList()', () => {
    const mockCardsResponse = {
      cards: [
        {
          nmID: 12345,
          imtID: 67890,
          vendorCode: 'VC-001',
          brand: 'TestBrand',
          title: 'Test Product',
          sizes: [{ chrtID: 111, techSize: 'M', wbSize: 'M', skus: ['SKU001'] }],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-06-20T12:30:00Z',
        },
      ],
      cursor: { updatedAt: '2024-06-20T12:30:00Z', nmID: 12345, total: 1 },
    };

    it('should POST to correct URL with data and options', async () => {
      mockClient.post.mockResolvedValue(mockCardsResponse);
      const data = {
        settings: {
          sort: { ascending: true },
          filter: { textSearch: 'shoes', brands: ['Nike'] },
          cursor: { limit: 10 },
        },
      };

      await productsModule.getCardsList(data, { locale: 'ru' });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/get/cards/list',
        data,
        expect.objectContaining({
          params: { locale: 'ru' },
          rateLimitKey: 'products.postContentGetCardsList',
        })
      );
    });

    it('should include rateLimitKey products.postContentGetCardsList', async () => {
      mockClient.post.mockResolvedValue(mockCardsResponse);

      await productsModule.getCardsList({ settings: { cursor: { limit: 50 } } });

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentGetCardsList');
    });

    it('should return cards and cursor from response', async () => {
      mockClient.post.mockResolvedValue(mockCardsResponse);

      const result = await productsModule.getCardsList({});

      expect(result.cards).toHaveLength(1);
      expect(result.cards![0].nmID).toBe(12345);
      expect(result.cursor).toEqual(expect.objectContaining({ total: 1 }));
    });

    it('should throw when cursor limit exceeds 100', async () => {
      await expect(
        productsModule.getCardsList({ settings: { cursor: { limit: 150 } } })
      ).rejects.toThrow(/Invalid cursor limit: 150/);
    });

    it('should throw when cursor limit is negative', async () => {
      await expect(
        productsModule.getCardsList({ settings: { cursor: { limit: -5 } } })
      ).rejects.toThrow(/Invalid cursor limit: -5/);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(productsModule.getCardsList({})).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 429));

      await expect(productsModule.getCardsList({})).rejects.toThrow(RateLimitError);
    });
  });

  // ---------------------------------------------------------------------------
  // 1b. getCardsList() — withPhoto migration (Sprint 19 / AC-12)
  // ---------------------------------------------------------------------------
  describe('getCardsList() — withPhoto migration', () => {
    beforeEach(() => {
      // Sprint 15.7 pattern: reset warn-once state so each test starts clean
      resetDeprecationWarnings();
      mockClient.post.mockResolvedValue({ cards: [], cursor: {} });
    });

    it('withPhoto: 2 (NEW value) — no warning emitted', async () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      await productsModule.getCardsList({ settings: { filter: { withPhoto: 2 } } });
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('withPhoto: 1 — no warning emitted', async () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      await productsModule.getCardsList({ settings: { filter: { withPhoto: 1 } } });
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('withPhoto: -1 — no warning emitted', async () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      await productsModule.getCardsList({ settings: { filter: { withPhoto: -1 } } });
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('no filter — no warning emitted', async () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      await productsModule.getCardsList({});
      expect(spy).not.toHaveBeenCalled();
      spy.mockRestore();
    });

    it('does not emit warning when withPhoto is absent (any intermediate path)', async () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      try {
        mockClient.post.mockResolvedValue({ cards: [], cursor: { total: 0 } });

        // Path 1: empty data
        await productsModule.getCardsList({});
        // Path 2: settings present, filter absent
        await productsModule.getCardsList({ settings: {} });
        // Path 3: filter present, withPhoto absent
        await productsModule.getCardsList({ settings: { filter: {} } });

        expect(spy).not.toHaveBeenCalled();
      } finally {
        spy.mockRestore();
      }
    });

    it('withPhoto: 0 — warn-once fires once, second call muted', async () => {
      const spy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);

      // First call: warning fires
      await productsModule.getCardsList({ settings: { filter: { withPhoto: 0 } } });
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0]).toMatch(/withPhoto: 0.*2026-06-16/);
      expect(spy.mock.calls[0][0]).toMatch(/WITH_PHOTO_FILTER\.NO_PHOTO/);
      expect(spy.mock.calls[0][0]).toMatch(/withphoto-semantic-migration\.md/);

      // Second call: muted by warnOnce
      await productsModule.getCardsList({ settings: { filter: { withPhoto: 0 } } });
      expect(spy).toHaveBeenCalledTimes(1); // still 1

      spy.mockRestore();
    });

    it('WITH_PHOTO_FILTER.NO_PHOTO === 2 (regression guard)', () => {
      expect(WITH_PHOTO_FILTER.NO_PHOTO).toBe(2);
      expect(WITH_PHOTO_FILTER.ALL).toBe(-1);
      expect(WITH_PHOTO_FILTER.WITH_PHOTO).toBe(1);
    });
  });

  // ---------------------------------------------------------------------------
  // 2. createErrorList
  // ---------------------------------------------------------------------------
  describe('createErrorList()', () => {
    const mockErrorListResponse = {
      data: [{ nmID: 999, error: 'Missing required field' }],
    };

    it('should POST to correct URL with data and locale option', async () => {
      mockClient.post.mockResolvedValue(mockErrorListResponse);
      const data = { locale: 'ru' } as unknown as RequestPublicViewerPublicErrorsTableListV2;

      await productsModule.createErrorList(data, { locale: 'en' });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/error/list',
        data,
        expect.objectContaining({
          params: { locale: 'en' },
          rateLimitKey: 'products.postContentCardsErrorList',
        })
      );
    });

    it('should include rateLimitKey products.postContentCardsErrorList', async () => {
      mockClient.post.mockResolvedValue(mockErrorListResponse);

      await productsModule.createErrorList({});

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentCardsErrorList');
    });

    it('should return error list response', async () => {
      mockClient.post.mockResolvedValue(mockErrorListResponse);

      const result = await productsModule.createErrorList({});

      expect(result).toEqual(mockErrorListResponse);
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Connection timeout'));

      await expect(productsModule.createErrorList({})).rejects.toThrow(NetworkError);
    });
  });

  // ---------------------------------------------------------------------------
  // 3. createCardsUpdate
  // ---------------------------------------------------------------------------
  describe('createCardsUpdate()', () => {
    const mockUpdateResponse = { error: false, errorText: '', additionalErrors: {} };

    const updateData = [
      {
        nmID: 12345,
        vendorCode: 'VC-001',
        brand: 'UpdatedBrand',
        title: 'Updated Product',
        description: 'Updated description',
        dimensions: { length: 10, width: 5, height: 3, weightBrutto: 0.5 },
        characteristics: [{ id: 1, value: 'red' }],
        sizes: [{ chrtID: 111, techSize: 'L', wbSize: 'L', skus: ['SKU002'] }],
      },
    ];

    it('should POST to correct URL with update data', async () => {
      mockClient.post.mockResolvedValue(mockUpdateResponse);

      await productsModule.createCardsUpdate(updateData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/update',
        updateData,
        expect.objectContaining({ rateLimitKey: 'products.postContentCardsUpdate' })
      );
    });

    it('should include rateLimitKey products.postContentCardsUpdate', async () => {
      mockClient.post.mockResolvedValue(mockUpdateResponse);

      await productsModule.createCardsUpdate(updateData);

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentCardsUpdate');
    });

    it('should pass undefined data when called without arguments', async () => {
      mockClient.post.mockResolvedValue(mockUpdateResponse);

      await productsModule.createCardsUpdate();

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/update',
        undefined,
        expect.any(Object)
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Forbidden'));

      await expect(productsModule.createCardsUpdate(updateData)).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 4. createCardsMovenm
  // ---------------------------------------------------------------------------
  describe('createCardsMovenm()', () => {
    const mockMoveResponse = { error: false, errorText: '', additionalErrors: {} };

    it('should POST to correct URL with data', async () => {
      mockClient.post.mockResolvedValue(mockMoveResponse);
      const data: RequestMoveNmsImtConn = { targetIMT: 100, nmIDs: [1, 2, 3] };

      await productsModule.createCardsMovenm(data);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/moveNm',
        data,
        expect.objectContaining({ rateLimitKey: 'products.postContentCardsMoveNm' })
      );
    });

    it('should include rateLimitKey products.postContentCardsMoveNm', async () => {
      mockClient.post.mockResolvedValue(mockMoveResponse);

      await productsModule.createCardsMovenm();

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentCardsMoveNm');
    });

    it('should pass undefined data when called without arguments', async () => {
      mockClient.post.mockResolvedValue(mockMoveResponse);

      await productsModule.createCardsMovenm();

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/moveNm',
        undefined,
        expect.any(Object)
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Too many requests', 429));

      await expect(productsModule.createCardsMovenm()).rejects.toThrow(RateLimitError);
    });
  });

  // ---------------------------------------------------------------------------
  // 5. createDeleteTrash
  // ---------------------------------------------------------------------------
  describe('createDeleteTrash()', () => {
    const mockDeleteResponse = { data: {}, error: false, errorText: '', additionalErrors: {} };

    it('should POST to correct URL with nmIDs', async () => {
      mockClient.post.mockResolvedValue(mockDeleteResponse);
      const data = { nmIDs: [111, 222, 333] };

      await productsModule.createDeleteTrash(data);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/delete/trash',
        data,
        expect.objectContaining({ rateLimitKey: 'products.postContentCardsDeleteTrash' })
      );
    });

    it('should include rateLimitKey products.postContentCardsDeleteTrash', async () => {
      mockClient.post.mockResolvedValue(mockDeleteResponse);

      await productsModule.createDeleteTrash({ nmIDs: [1] });

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentCardsDeleteTrash');
    });

    it('should accept empty nmIDs array', async () => {
      mockClient.post.mockResolvedValue(mockDeleteResponse);

      await productsModule.createDeleteTrash({ nmIDs: [] });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/delete/trash',
        { nmIDs: [] },
        expect.any(Object)
      );
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Request timeout'));

      await expect(productsModule.createDeleteTrash({ nmIDs: [1] })).rejects.toThrow(NetworkError);
    });
  });

  // ---------------------------------------------------------------------------
  // 6. createCardsRecover
  // ---------------------------------------------------------------------------
  describe('createCardsRecover()', () => {
    const mockRecoverResponse = { data: {}, error: false, errorText: '', additionalErrors: {} };

    it('should POST to correct URL with nmIDs', async () => {
      mockClient.post.mockResolvedValue(mockRecoverResponse);
      const data = { nmIDs: [444, 555] };

      await productsModule.createCardsRecover(data);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/recover',
        data,
        expect.objectContaining({ rateLimitKey: 'products.postContentCardsRecover' })
      );
    });

    it('should include rateLimitKey products.postContentCardsRecover', async () => {
      mockClient.post.mockResolvedValue(mockRecoverResponse);

      await productsModule.createCardsRecover({ nmIDs: [1] });

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentCardsRecover');
    });

    it('should return response with error fields', async () => {
      const errorResponse = { error: true, errorText: 'Card not found', additionalErrors: {} };
      mockClient.post.mockResolvedValue(errorResponse);

      const result = await productsModule.createCardsRecover({ nmIDs: [999] });

      expect(result.error).toBe(true);
      expect(result.errorText).toBe('Card not found');
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(productsModule.createCardsRecover({ nmIDs: [1] })).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 7. getTrashedCards
  // ---------------------------------------------------------------------------
  describe('getTrashedCards()', () => {
    const mockTrashResponse = {
      cards: [
        {
          nmID: 77777,
          vendorCode: 'TRASHED-001',
          subjectID: 42,
          subjectName: 'T-Shirts',
          trashedAt: '2024-05-10T08:00:00Z',
        },
      ],
      cursor: { trashedAt: '2024-05-10T08:00:00Z', nmID: 77777, total: 1 },
    };

    it('should POST to correct URL with data and locale option', async () => {
      mockClient.post.mockResolvedValue(mockTrashResponse);
      const data = {
        settings: {
          sort: { ascending: false },
          cursor: { limit: 20 },
          filter: { textSearch: 'shirt' },
        },
      };

      await productsModule.getTrashedCards(data, { locale: 'en' });

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/get/cards/trash',
        data,
        expect.objectContaining({
          params: { locale: 'en' },
          rateLimitKey: 'products.postContentGetCardsTrash',
        })
      );
    });

    it('should include rateLimitKey products.postContentGetCardsTrash', async () => {
      mockClient.post.mockResolvedValue(mockTrashResponse);

      await productsModule.getTrashedCards({});

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentGetCardsTrash');
    });

    it('should return trashed cards with cursor', async () => {
      mockClient.post.mockResolvedValue(mockTrashResponse);

      const result = await productsModule.getTrashedCards({});

      expect(result.cards).toHaveLength(1);
      expect(result.cards![0].vendorCode).toBe('TRASHED-001');
      expect(result.cursor!.total).toBe(1);
    });

    it('should work without options parameter', async () => {
      mockClient.post.mockResolvedValue(mockTrashResponse);

      await productsModule.getTrashedCards({});

      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit', 429));

      await expect(productsModule.getTrashedCards({})).rejects.toThrow(RateLimitError);
    });
  });

  // ---------------------------------------------------------------------------
  // 8. getCardsLimits
  // ---------------------------------------------------------------------------
  describe('getCardsLimits()', () => {
    const mockLimitsResponse = {
      data: { freeLimits: 500, paidLimits: 10000 },
      error: false,
      errorText: '',
      additionalErrors: '',
    };

    it('should GET from correct URL', async () => {
      mockClient.get.mockResolvedValue(mockLimitsResponse);

      await productsModule.getCardsLimits();

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/limits',
        expect.objectContaining({ rateLimitKey: 'products.contentCardsLimits' })
      );
    });

    it('should include rateLimitKey products.contentCardsLimits', async () => {
      mockClient.get.mockResolvedValue(mockLimitsResponse);

      await productsModule.getCardsLimits();

      const callArgs = mockClient.get.mock.calls[0][1];
      expect(callArgs.rateLimitKey).toBe('products.contentCardsLimits');
    });

    it('should return freeLimits and paidLimits', async () => {
      mockClient.get.mockResolvedValue(mockLimitsResponse);

      const result = await productsModule.getCardsLimits();

      expect(result.data!.freeLimits).toBe(500);
      expect(result.data!.paidLimits).toBe(10000);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Unauthorized'));

      await expect(productsModule.getCardsLimits()).rejects.toThrow(AuthenticationError);
    });
  });

  // ---------------------------------------------------------------------------
  // 9. createContentBarcode
  // ---------------------------------------------------------------------------
  describe('createContentBarcode()', () => {
    const mockBarcodeResponse = {
      data: ['4600000000001', '4600000000002', '4600000000003'],
      error: false,
      errorText: '',
      additionalErrors: '',
    };

    it('should POST to correct URL with count', async () => {
      mockClient.post.mockResolvedValue(mockBarcodeResponse);
      const data = { count: 3 };

      await productsModule.createContentBarcode(data);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/barcodes',
        data,
        expect.objectContaining({ rateLimitKey: 'products.postContentBarcodes' })
      );
    });

    it('should include rateLimitKey products.postContentBarcodes', async () => {
      mockClient.post.mockResolvedValue(mockBarcodeResponse);

      await productsModule.createContentBarcode({ count: 1 });

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentBarcodes');
    });

    it('should return array of barcode strings', async () => {
      mockClient.post.mockResolvedValue(mockBarcodeResponse);

      const result = await productsModule.createContentBarcode({ count: 3 });

      expect(result.data).toHaveLength(3);
      expect(result.data![0]).toBe('4600000000001');
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('DNS resolution failed'));

      await expect(productsModule.createContentBarcode({ count: 1 })).rejects.toThrow(NetworkError);
    });
  });

  // ---------------------------------------------------------------------------
  // 10. createCardsUpload
  // ---------------------------------------------------------------------------
  describe('createCardsUpload()', () => {
    const mockUploadResponse = { error: false, errorText: '', additionalErrors: {} };

    const uploadData = [
      {
        subjectID: 42,
        variants: [
          {
            vendorCode: 'NEW-001',
            brand: 'NewBrand',
            title: 'New Product',
            description: 'A new product',
            dimensions: { length: 15, width: 10, height: 5, weightBrutto: 0.3 },
            sizes: [{ techSize: 'M', wbSize: 'M', price: 1500, skus: ['SKU-NEW-001'] }],
            characteristics: [{ id: 10, value: 'blue' }],
          },
        ],
      },
    ];

    it('should POST to correct URL with upload data', async () => {
      mockClient.post.mockResolvedValue(mockUploadResponse);

      await productsModule.createCardsUpload(uploadData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload',
        uploadData,
        expect.objectContaining({ rateLimitKey: 'products.postContentCardsUpload' })
      );
    });

    it('should include rateLimitKey products.postContentCardsUpload', async () => {
      mockClient.post.mockResolvedValue(mockUploadResponse);

      await productsModule.createCardsUpload(uploadData);

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentCardsUpload');
    });

    it('should pass undefined data when called without arguments', async () => {
      mockClient.post.mockResolvedValue(mockUploadResponse);

      await productsModule.createCardsUpload();

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload',
        undefined,
        expect.any(Object)
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Throttled', 429));

      await expect(productsModule.createCardsUpload(uploadData)).rejects.toThrow(RateLimitError);
    });
  });

  // ---------------------------------------------------------------------------
  // 11. createUploadAdd
  // ---------------------------------------------------------------------------
  describe('createUploadAdd()', () => {
    const mockUploadAddResponse = { error: false, errorText: '', additionalErrors: {} };

    const uploadAddData = {
      imtID: 67890,
      cardsToAdd: [
        {
          vendorCode: 'ADD-001',
          brand: 'ExistingBrand',
          title: 'Added Variant',
          sizes: [{ techSize: 'XL', wbSize: 'XL', price: 2000, skus: ['SKU-ADD-001'] }],
          characteristics: [{ id: 5, value: 'green' }],
        },
      ],
    };

    it('should POST to correct URL with data', async () => {
      mockClient.post.mockResolvedValue(mockUploadAddResponse);

      await productsModule.createUploadAdd(uploadAddData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload/add',
        uploadAddData,
        expect.objectContaining({ rateLimitKey: 'products.postContentCardsUploadAdd' })
      );
    });

    it('should include rateLimitKey products.postContentCardsUploadAdd', async () => {
      mockClient.post.mockResolvedValue(mockUploadAddResponse);

      await productsModule.createUploadAdd(uploadAddData);

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentCardsUploadAdd');
    });

    it('should pass undefined data when called without arguments', async () => {
      mockClient.post.mockResolvedValue(mockUploadAddResponse);

      await productsModule.createUploadAdd();

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload/add',
        undefined,
        expect.any(Object)
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('API key expired'));

      await expect(productsModule.createUploadAdd(uploadAddData)).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 12. createMediaFile
  // ---------------------------------------------------------------------------
  describe('createMediaFile()', () => {
    const mockMediaFileResponse = { data: {}, error: false, errorText: '', additionalErrors: {} };
    const mockFormData = new FormData();
    mockFormData.append('uploadfile', new Blob(['fake-image-bytes']), 'photo.jpg');

    it('should POST to correct URL with FormData body, X-Nm-Id and X-Photo-Number headers, and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockMediaFileResponse);

      await productsModule.createMediaFile(213864079, 2, mockFormData);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v3/media/file',
        mockFormData,
        {
          rateLimitKey: 'products.postContentMediaFile',
          headers: { 'X-Nm-Id': '213864079', 'X-Photo-Number': '2' },
        }
      );
    });

    it('should include rateLimitKey products.postContentMediaFile', async () => {
      mockClient.post.mockResolvedValue(mockMediaFileResponse);

      await productsModule.createMediaFile(213864079, 1, mockFormData);

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentMediaFile');
    });

    it('should stringify nmId and photoNumber into headers', async () => {
      mockClient.post.mockResolvedValue(mockMediaFileResponse);

      await productsModule.createMediaFile(213864079, 3, mockFormData);

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.headers).toEqual({ 'X-Nm-Id': '213864079', 'X-Photo-Number': '3' });
    });

    it('should forward the FormData payload as the request body', async () => {
      mockClient.post.mockResolvedValue(mockMediaFileResponse);

      await productsModule.createMediaFile(213864079, 1, mockFormData);

      expect(mockClient.post).toHaveBeenCalledTimes(1);
      expect(mockClient.post.mock.calls[0][1]).toBe(mockFormData);
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Connection refused'));

      await expect(productsModule.createMediaFile(213864079, 1, mockFormData)).rejects.toThrow(
        NetworkError
      );
    });
  });

  // ---------------------------------------------------------------------------
  // 13. createMediaSave
  // ---------------------------------------------------------------------------
  describe('createMediaSave()', () => {
    const mockMediaSaveResponse = { data: {}, error: false, errorText: '', additionalErrors: {} };

    it('should POST to correct URL with media data', async () => {
      mockClient.post.mockResolvedValue(mockMediaSaveResponse);
      const data = {
        nmId: 12345,
        data: ['https://images.example.com/photo1.jpg', 'https://images.example.com/photo2.jpg'],
      };

      await productsModule.createMediaSave(data);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v3/media/save',
        data,
        expect.objectContaining({ rateLimitKey: 'products.postContentMediaSave' })
      );
    });

    it('should include rateLimitKey products.postContentMediaSave', async () => {
      mockClient.post.mockResolvedValue(mockMediaSaveResponse);

      await productsModule.createMediaSave({ nmId: 1, data: [] });

      const callArgs = mockClient.post.mock.calls[0][2];
      expect(callArgs.rateLimitKey).toBe('products.postContentMediaSave');
    });

    it('should pass nmId and data array in request body', async () => {
      mockClient.post.mockResolvedValue(mockMediaSaveResponse);
      const data = { nmId: 99999, data: ['https://cdn.example.com/img.png'] };

      await productsModule.createMediaSave(data);

      const passedBody = mockClient.post.mock.calls[0][1];
      expect(passedBody.nmId).toBe(99999);
      expect(passedBody.data).toEqual(['https://cdn.example.com/img.png']);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Throttled', 429));

      await expect(productsModule.createMediaSave({ nmId: 1, data: [] })).rejects.toThrow(
        RateLimitError
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid key'));

      await expect(productsModule.createMediaSave({ nmId: 1, data: [] })).rejects.toThrow(
        AuthenticationError
      );
    });
  });
});
