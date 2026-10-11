import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { BaseClient } from '../../../src/client/base-client';
import { productsRateLimits } from '../../../src/config/products-rate-limits';
import { ProductsModule } from '../../../src/modules/products';
import type {
  TnvedDirectoryLocale,
  OkpdDirectoryLocale,
  OkpdFullDirectoryLocale,
  GetDirectoryOkpdAllOptions,
  GetDirectoryOkpdAllResponse,
  GetDirectoryOkpdOptions,
  GetDirectoryOkpdResponse,
  GetDirectoryTnvedAllOptions,
  GetDirectoryTnvedAllResponse,
  TnvedDirectoryEntry,
  OkpdDirectoryEntry,
} from '../../../src';

describe('ProductsModule - October 2026 contracts', () => {
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

  describe('classification directories', () => {
    it('exports every directory contract from the package root', () => {
      const contracts: [
        TnvedDirectoryLocale,
        OkpdDirectoryLocale,
        OkpdFullDirectoryLocale,
        TnvedDirectoryEntry,
        OkpdDirectoryEntry,
      ] = [
        'en',
        'ru',
        'ru',
        { tnved: '6106903001', description: 'Textiles' },
        { okpd2: '61.06.90.300', description: 'Subject classification' },
      ];

      expect(contracts).toHaveLength(5);
    });

    it('gets the full TN VED directory with the exact query and Content limiter key', async () => {
      const response = {
        data: [{ tnved: '6106903001', description: 'Textiles' }],
        error: false,
        errorText: '',
        additionalErrors: null,
      } satisfies GetDirectoryTnvedAllResponse;
      mockClient.get.mockResolvedValue(response);
      const options = { search: 6106, locale: 'en' } satisfies GetDirectoryTnvedAllOptions;

      const result = await productsModule.getDirectoryTnvedAll(options);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/api/content/v2/directory/tnved/all',
        {
          params: { search: 6106, locale: 'en' },
          rateLimitKey: 'products.contentDirectoryTnvedAll',
        }
      );
      expect(result.data).toEqual(response.data);
    });

    it('gets subject OKPD2 entries and keeps dotted search prefixes as strings', async () => {
      const response = {
        data: [{ okpd2: '61.06.90.300', description: 'Subject classification' }],
        error: false,
        errorText: '',
        additionalErrors: null,
      } satisfies GetDirectoryOkpdResponse;
      mockClient.get.mockResolvedValue(response);
      const options = {
        subjectId: 105,
        search: '61.06',
        locale: 'ru',
      } satisfies GetDirectoryOkpdOptions;

      const result = await productsModule.getDirectoryOkpd(options);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/api/content/v2/directory/okpd',
        {
          params: { subjectId: 105, search: '61.06', locale: 'ru' },
          rateLimitKey: 'products.contentDirectoryOkpd',
        }
      );
      expect(result).toEqual(response);
    });

    it('accepts a subject-only OKPD2 query and pins its required and locale boundaries', async () => {
      mockClient.get.mockResolvedValue({
        data: [],
        error: false,
        errorText: '',
        additionalErrors: null,
      });
      const subjectOnly = { subjectId: 105 } satisfies GetDirectoryOkpdOptions;
      // @ts-expect-error subjectId is required by the official request contract
      const missingSubject: GetDirectoryOkpdOptions = {};
      // @ts-expect-error the subject-specific OKPD2 endpoint supports only Russian responses
      const unsupportedLocale: GetDirectoryOkpdOptions = { subjectId: 105, locale: 'en' };

      await productsModule.getDirectoryOkpd(subjectOnly);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/api/content/v2/directory/okpd',
        {
          params: { subjectId: 105 },
          rateLimitKey: 'products.contentDirectoryOkpd',
        }
      );
      expect([missingSubject, unsupportedLocale]).toHaveLength(2);
    });

    it('gets the full OKPD2 directory in Russian with numeric search and preserves an empty result', async () => {
      const response = {
        data: [],
        error: false,
        errorText: '',
        additionalErrors: null,
      } satisfies GetDirectoryOkpdAllResponse;
      mockClient.get.mockResolvedValue(response);
      const options = { search: 61.06, locale: 'ru' } satisfies GetDirectoryOkpdAllOptions;
      // @ts-expect-error official raw Swagger permits only Russian for the full OKPD2 directory
      const unsupportedLocale: GetDirectoryOkpdAllOptions = { locale: 'en' };

      const result = await productsModule.getDirectoryOkpdAll(options);

      expect(mockClient.get).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/api/content/v2/directory/okpd/all',
        {
          params: { search: 61.06, locale: 'ru' },
          rateLimitKey: 'products.contentDirectoryOkpdAll',
        }
      );
      expect(result.data).toEqual([]);
      expect(unsupportedLocale).toEqual({ locale: 'en' });
    });

    it('passes undefined options for unfiltered full-directory requests', async () => {
      mockClient.get.mockResolvedValue({
        data: [],
        error: false,
        errorText: '',
        additionalErrors: null,
      });

      await productsModule.getDirectoryTnvedAll();
      await productsModule.getDirectoryOkpdAll();

      expect(mockClient.get).toHaveBeenNthCalledWith(
        1,
        'https://content-api.wildberries.ru/api/content/v2/directory/tnved/all',
        { params: undefined, rateLimitKey: 'products.contentDirectoryTnvedAll' }
      );
      expect(mockClient.get).toHaveBeenNthCalledWith(
        2,
        'https://content-api.wildberries.ru/api/content/v2/directory/okpd/all',
        { params: undefined, rateLimitKey: 'products.contentDirectoryOkpdAll' }
      );
    });

    it('registers the official Content rate limit for all three directory methods', () => {
      for (const key of [
        'products.contentDirectoryTnvedAll',
        'products.contentDirectoryOkpd',
        'products.contentDirectoryOkpdAll',
      ]) {
        expect(productsRateLimits[key]).toEqual({
          requestsPerMinute: 100,
          intervalSeconds: 0.6,
          burstLimit: 5,
        });
      }
    });
  });

  describe('additional GTIN placement', () => {
    const gtin = '04600000000018';
    const currentSku = '04600000000995';

    it('passes gtin at variants[] for card upload', async () => {
      mockClient.post.mockResolvedValue({ error: false });
      const request = [
        {
          subjectID: 105,
          variants: [{ vendorCode: 'GTIN-CREATE', gtin, sizes: [{ skus: [currentSku] }] }],
        },
      ] satisfies NonNullable<Parameters<ProductsModule['createCardsUpload']>[0]>;

      await productsModule.createCardsUpload(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload',
        request,
        { rateLimitKey: 'products.postContentCardsUpload' }
      );
    });

    it('passes gtin at the update item', async () => {
      mockClient.post.mockResolvedValue({ error: false });
      const request = [
        { nmID: 123, vendorCode: 'GTIN-UPDATE', gtin, sizes: [] },
      ] satisfies NonNullable<Parameters<ProductsModule['createCardsUpdate']>[0]>;

      await productsModule.createCardsUpdate(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/update',
        request,
        { rateLimitKey: 'products.postContentCardsUpdate' }
      );
    });

    it('passes gtin at cardsToAdd[] for merged-card upload', async () => {
      mockClient.post.mockResolvedValue({ error: false });
      const request = {
        imtID: 456,
        cardsToAdd: [{ vendorCode: 'GTIN-ADD', gtin, sizes: [] }],
      } satisfies NonNullable<Parameters<ProductsModule['createUploadAdd']>[0]>;

      await productsModule.createUploadAdd(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        'https://content-api.wildberries.ru/content/v2/cards/upload/add',
        request,
        { rateLimitKey: 'products.postContentCardsUploadAdd' }
      );
    });

    it('exposes gtin from cards[] and remains compatible when it is absent', async () => {
      mockClient.post.mockResolvedValueOnce({
        cards: [{ nmID: 123, vendorCode: 'WITH-GTIN', gtin }],
        cursor: { total: 1 },
      });
      const withGtin = await productsModule.getCardsList({});

      mockClient.post.mockResolvedValueOnce({
        cards: [{ nmID: 124, vendorCode: 'WITHOUT-GTIN' }],
        cursor: { total: 1 },
      });
      const withoutGtin = await productsModule.getCardsList({});

      expect(mockClient.post).toHaveBeenNthCalledWith(
        1,
        'https://content-api.wildberries.ru/content/v2/get/cards/list',
        {},
        { params: undefined, rateLimitKey: 'products.postContentGetCardsList' }
      );
      expect(withGtin.cards?.[0].gtin).toBe(gtin);
      expect(withoutGtin.cards?.[0].gtin).toBeUndefined();
    });

    it('keeps gtin optional in all three write payloads', async () => {
      mockClient.post.mockResolvedValue({ error: false });

      await productsModule.createCardsUpload([
        { subjectID: 105, variants: [{ vendorCode: 'NO-GTIN-CREATE', sizes: [] }] },
      ]);
      await productsModule.createCardsUpdate([
        { nmID: 789, vendorCode: 'NO-GTIN-UPDATE', sizes: [] },
      ]);
      await productsModule.createUploadAdd({
        imtID: 456,
        cardsToAdd: [{ vendorCode: 'NO-GTIN-ADD', sizes: [] }],
      });

      expect(mockClient.post).toHaveBeenCalledTimes(3);
    });

    it('keeps gtin non-null in all write payloads and the cards-list response', () => {
      type UploadRequest = NonNullable<Parameters<ProductsModule['createCardsUpload']>[0]>;
      type UpdateRequest = NonNullable<Parameters<ProductsModule['createCardsUpdate']>[0]>;
      type UploadAddRequest = NonNullable<Parameters<ProductsModule['createUploadAdd']>[0]>;
      type CardsListItem = NonNullable<
        NonNullable<Awaited<ReturnType<ProductsModule['getCardsList']>>['cards']>[number]
      >;

      const upload: UploadRequest = [
        {
          subjectID: 105,
          variants: [
            {
              vendorCode: 'NULL-GTIN-CREATE',
              // @ts-expect-error gtin is optional, but it is not nullable
              gtin: null,
            },
          ],
        },
      ];
      const update: UpdateRequest = [
        {
          nmID: 123,
          vendorCode: 'NULL-GTIN-UPDATE',
          sizes: [],
          // @ts-expect-error gtin is optional, but it is not nullable
          gtin: null,
        },
      ];
      const uploadAdd: UploadAddRequest = {
        imtID: 456,
        cardsToAdd: [
          {
            vendorCode: 'NULL-GTIN-ADD',
            sizes: [],
            // @ts-expect-error gtin is optional, but it is not nullable
            gtin: null,
          },
        ],
      };
      const listItem: CardsListItem = {
        nmID: 123,
        // @ts-expect-error cards-list gtin is optional, but it is not nullable
        gtin: null,
      };

      expect([upload, update, uploadAdd, listItem]).toHaveLength(4);
    });
  });
});
