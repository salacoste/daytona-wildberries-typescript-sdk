/**
 * Unit tests for ProductsModule - Prices, Stocks & Warehouses
 *
 * Tests pricing upload methods, history/buffer, goods filter,
 * stock management, warehouse CRUD, and warehouse contacts.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';
import { resetDeprecationWarnings } from '../../../src/utils/deprecation';

describe('ProductsModule - Prices, Stocks & Warehouses', () => {
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

  // ── Prices & Discounts: Upload Methods ──

  describe('createUploadTask()', () => {
    const mockData = [{ nmID: 123, price: 1000, discount: 10 }];
    const mockResponse = { uploadID: 1, alreadyExists: false };

    it('should POST to correct URL with data and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      await productsModule.createUploadTask(mockData);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/upload/task',
        mockData,
        { rateLimitKey: 'products.postUploadTask' }
      );
    });

    it('should return the response from client', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const result = await productsModule.createUploadTask(mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));
      await expect(productsModule.createUploadTask(mockData)).rejects.toThrow(AuthenticationError);
    });
  });

  describe('createTaskSize()', () => {
    const mockData = [{ nmID: 456, sizeID: 789, price: 500 }];
    const mockResponse = { uploadID: 2, alreadyExists: false };

    it('should POST to correct URL with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      await productsModule.createTaskSize(mockData);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/upload/task/size',
        mockData,
        { rateLimitKey: 'products.postUploadTaskSize' }
      );
    });

    it('should return the response', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const result = await productsModule.createTaskSize(mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(productsModule.createTaskSize(mockData)).rejects.toThrow(RateLimitError);
    });
  });

  describe('createTaskClubDiscount()', () => {
    const mockData = [{ nmID: 111, clubDiscount: 15 }];
    const mockResponse = { uploadID: 3, alreadyExists: false };

    it('should POST to correct URL with rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      await productsModule.createTaskClubDiscount(mockData);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/upload/task/club-discount',
        mockData,
        { rateLimitKey: 'products.postUploadTaskClubDiscount' }
      );
    });

    it('should return the response', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const result = await productsModule.createTaskClubDiscount(mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Connection timeout'));
      await expect(productsModule.createTaskClubDiscount(mockData)).rejects.toThrow(NetworkError);
    });
  });

  describe('createUploadTaskB2bWholesale()', () => {
    const mockData = [
      {
        nmID: 123,
        wholesaleDiscountThreshold: [
          { minPrice: 1000, discount: 5 },
          { minPrice: 5000, discount: 10 },
        ],
      },
    ];
    const mockResponse = {
      data: [{ nmID: 123, success: true }],
    };

    it('should POST to correct v1 URL with data and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      await productsModule.createUploadTaskB2bWholesale(mockData);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/discounts-prices/v1/upload/task/b2b/wholesale',
        mockData,
        { rateLimitKey: 'products.postUploadTaskB2bWholesale' }
      );
    });

    it('should return the response from client (passthrough)', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const result = await productsModule.createUploadTaskB2bWholesale(mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should pass through per-item success/error results', async () => {
      const mixed = {
        data: [
          { nmID: 123, success: true },
          { nmID: 456, success: false, error: { code: 'INVALID', message: 'bad threshold' } },
        ],
      };
      mockClient.post.mockResolvedValue(mixed);
      const result = await productsModule.createUploadTaskB2bWholesale(mockData);
      expect(result).toEqual(mixed);
      expect(result.data?.[1].success).toBe(false);
      expect(result.data?.[1].error?.message).toBe('bad threshold');
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(productsModule.createUploadTaskB2bWholesale(mockData)).rejects.toThrow(
        RateLimitError
      );
    });
  });

  // ── Prices & Discounts: History/Buffer ──

  describe('getHistoryTasks()', () => {
    const mockResponse = { data: { uploadID: 10, status: 3 } };

    it('should GET correct URL with params and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getHistoryTasks({ uploadID: 10 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/history/tasks',
        { params: { uploadID: 10 }, rateLimitKey: 'products.historyTasks' }
      );
    });

    it('should work without options', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getHistoryTasks();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/history/tasks',
        { params: undefined, rateLimitKey: 'products.historyTasks' }
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Unauthorized'));
      await expect(productsModule.getHistoryTasks()).rejects.toThrow(AuthenticationError);
    });
  });

  describe('getGoodsTask()', () => {
    const mockResponse = { data: { goods: [{ nmID: 1 }] } };

    it('should GET correct URL with params and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getGoodsTask({ limit: 100, offset: 0, uploadID: 5 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/history/goods/task',
        {
          params: { limit: 100, offset: 0, uploadID: 5 },
          rateLimitKey: 'products.historyGoodsTask',
        }
      );
    });

    it('should return the response', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getGoodsTask({ limit: 10, uploadID: 1 });
      expect(result).toEqual(mockResponse);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Too many requests', 3000));
      await expect(productsModule.getGoodsTask({ limit: 10, uploadID: 1 })).rejects.toThrow(
        RateLimitError
      );
    });
  });

  describe('getBufferTasks()', () => {
    const mockResponse = { data: { uploadID: 20, status: 1 } };

    it('should GET correct URL with params and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getBufferTasks({ uploadID: 20 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/buffer/tasks',
        { params: { uploadID: 20 }, rateLimitKey: 'products.bufferTasks' }
      );
    });

    it('should work without options', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getBufferTasks();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/buffer/tasks',
        { params: undefined, rateLimitKey: 'products.bufferTasks' }
      );
    });

    it('should propagate NetworkError', async () => {
      mockClient.get.mockRejectedValue(new NetworkError('Timeout'));
      await expect(productsModule.getBufferTasks()).rejects.toThrow(NetworkError);
    });
  });

  describe('getBufferGoodsTask()', () => {
    const mockResponse = { data: { goods: [] } };

    it('should GET correct URL with params and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getBufferGoodsTask({ limit: 50, offset: 10, uploadID: 7 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/buffer/goods/task',
        { params: { limit: 50, offset: 10, uploadID: 7 }, rateLimitKey: 'products.bufferGoodsTask' }
      );
    });

    it('should return the response', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getBufferGoodsTask({ limit: 10, uploadID: 3 });
      expect(result).toEqual(mockResponse);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Forbidden'));
      await expect(productsModule.getBufferGoodsTask({ limit: 10, uploadID: 3 })).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  // ── Goods Filter ──

  describe('getGoodsFilter()', () => {
    const mockResponse = { data: { listGoods: [{ nmID: 100 }] } };

    it('should GET correct URL with params and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getGoodsFilter({ limit: 1000, offset: 0, filterNmID: 555 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
        {
          params: { limit: 1000, offset: 0, filterNmID: 555 },
          rateLimitKey: 'products.listGoodsFilter',
        }
      );
    });

    it('should work without options', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getGoodsFilter();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
        { params: undefined, rateLimitKey: 'products.listGoodsFilter' }
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Limited', 2000));
      await expect(productsModule.getGoodsFilter()).rejects.toThrow(RateLimitError);
    });

    it('should pass through wholesaleDiscountThreshold per item (B2B wholesale discounts)', async () => {
      const thresholdResponse = {
        data: {
          listGoods: [
            {
              nmID: 100,
              wholesaleDiscountThreshold: [
                { minPrice: 1000, discount: 5 },
                { minPrice: 5000, discount: 10 },
              ],
            },
          ],
        },
      };
      mockClient.get.mockResolvedValue(thresholdResponse);
      const result = await productsModule.getGoodsFilter({ limit: 1000 });
      expect(result.data?.listGoods?.[0].wholesaleDiscountThreshold).toEqual([
        { minPrice: 1000, discount: 5 },
        { minPrice: 5000, discount: 10 },
      ]);
    });
  });

  describe('createGoodsFilter()', () => {
    const mockData = { nmIDs: [100, 200, 300] };
    const mockResponse = { data: { listGoods: [{ nmID: 100 }] } };

    it('should POST to correct URL with data and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      await productsModule.createGoodsFilter(mockData);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/filter',
        mockData,
        { rateLimitKey: 'products.postListGoodsFilter' }
      );
    });

    it('should return the response', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const result = await productsModule.createGoodsFilter(mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('DNS resolution failed'));
      await expect(productsModule.createGoodsFilter(mockData)).rejects.toThrow(NetworkError);
    });
  });

  describe('getSizeNm()', () => {
    const mockResponse = { data: { listGoods: [] } };

    it('should GET correct URL with params and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getSizeNm({ limit: 100, offset: 0, nmID: 999 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/list/goods/size/nm',
        { params: { limit: 100, offset: 0, nmID: 999 }, rateLimitKey: 'products.listGoodsSizeNm' }
      );
    });

    it('should return the response', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getSizeNm({ limit: 10, nmID: 42 });
      expect(result).toEqual(mockResponse);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Invalid key'));
      await expect(productsModule.getSizeNm({ limit: 10, nmID: 42 })).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  describe('getQuarantineGoods()', () => {
    const mockResponse = { data: { listGoods: [{ nmID: 77 }] } };

    it('should GET correct URL with params and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getQuarantineGoods({ limit: 500, offset: 50 });
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/quarantine/goods',
        { params: { limit: 500, offset: 50 }, rateLimitKey: 'products.quarantineGoods' }
      );
    });

    it('should work without options', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getQuarantineGoods();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://discounts-prices-api.wildberries.ru/api/v2/quarantine/goods',
        { params: undefined, rateLimitKey: 'products.quarantineGoods' }
      );
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Exceeded', 1000));
      await expect(productsModule.getQuarantineGoods()).rejects.toThrow(RateLimitError);
    });
  });

  // ── Stocks ──

  describe('getStocks()', () => {
    const warehouseId = 12345;
    const mockData = { chrtIds: [12345678, 12345679] };
    const mockResponse = { stocks: [{ chrtId: 12345678, amount: 50 }] };

    it('should POST to URL with warehouseId interpolated and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      await productsModule.getStocks(warehouseId, mockData);
      expect(mockClient.post).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
        mockData,
        { rateLimitKey: 'products.postStocks' }
      );
    });

    it('should return the response', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const result = await productsModule.getStocks(warehouseId, mockData);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate NetworkError', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Connection refused'));
      await expect(productsModule.getStocks(warehouseId, mockData)).rejects.toThrow(NetworkError);
    });
  });

  describe('updateStock()', () => {
    const warehouseId = 67890;
    const mockData = { stocks: [{ chrtId: 12345678, amount: 100 }] };

    it('should PUT to URL with warehouseId interpolated and rateLimitKey', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await productsModule.updateStock(warehouseId, mockData);
      expect(mockClient.put).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
        mockData,
        { rateLimitKey: 'products.putStocks' }
      );
    });

    it('should use PUT method not POST', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await productsModule.updateStock(warehouseId, mockData);
      expect(mockClient.put).toHaveBeenCalledTimes(1);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.put.mockRejectedValue(new AuthenticationError('Unauthorized'));
      await expect(productsModule.updateStock(warehouseId, mockData)).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  describe('deleteStock()', () => {
    const warehouseId = 11111;
    const mockData = { chrtIds: [12345678] };

    it('should DELETE to URL with warehouseId interpolated and rateLimitKey', async () => {
      mockClient.delete.mockResolvedValue(undefined);
      await productsModule.deleteStock(warehouseId, mockData);
      expect(mockClient.delete).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/stocks/${warehouseId}`,
        mockData,
        { rateLimitKey: 'products.deleteStocks' }
      );
    });

    it('should use DELETE method not POST or PUT', async () => {
      mockClient.delete.mockResolvedValue(undefined);
      await productsModule.deleteStock(warehouseId, mockData);
      expect(mockClient.delete).toHaveBeenCalledTimes(1);
      expect(mockClient.post).not.toHaveBeenCalled();
      expect(mockClient.put).not.toHaveBeenCalled();
    });

    it('should propagate RateLimitError', async () => {
      mockClient.delete.mockRejectedValue(new RateLimitError('Rate limited', 4000));
      await expect(productsModule.deleteStock(warehouseId, mockData)).rejects.toThrow(
        RateLimitError
      );
    });
  });

  // ── Stocks: chrtId paths + warn-once deprecation tests (task-16.4) ──

  describe('getStocks() — chrtId paths', () => {
    const warehouseId = 12345;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let warnSpy: any;

    beforeEach(() => {
      resetDeprecationWarnings();
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      mockClient.post.mockResolvedValue({ stocks: [] });
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    // AC-3: happy path — chrtIds only, no warning
    it('happy path: chrtIds only — no warning emitted', async () => {
      const result = await productsModule.getStocks(warehouseId, { chrtIds: [12345678] });
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.stringContaining(`/api/v3/stocks/${warehouseId}`),
        expect.objectContaining({ chrtIds: [12345678] }),
        expect.objectContaining({ rateLimitKey: 'products.postStocks' })
      );
      const calledWith = mockClient.post.mock.calls[0][1] as Record<string, unknown>;
      expect(calledWith).not.toHaveProperty('skus');
      expect(result).toEqual({ stocks: [] });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // AC-4: mixed-mode — skus stripped, chrtIds forwarded, one warning
    it('mixed-mode: skus stripped, chrtIds forwarded, mixed warning emitted', async () => {
      await productsModule.getStocks(warehouseId, { skus: ['sku-abc'], chrtIds: [12345678] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('products.getStocks:');
      expect(warnSpy.mock.calls[0][0]).toContain('both `skus` and `chrtIds` provided');
      const calledWith = mockClient.post.mock.calls[0][1] as Record<string, unknown>;
      expect(calledWith).not.toHaveProperty('skus');
      expect(calledWith).toHaveProperty('chrtIds', [12345678]);
    });

    // AC-5: legacy-only — skus forwarded unchanged, legacy warning
    it('legacy-only: skus forwarded unchanged, legacy-skus-call warning emitted', async () => {
      await productsModule.getStocks(warehouseId, { skus: ['sku-001'] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('products.getStocks:');
      expect(warnSpy.mock.calls[0][0]).toContain('`skus` parameter is deprecated');
      const calledWith = mockClient.post.mock.calls[0][1] as Record<string, unknown>;
      expect(calledWith).toHaveProperty('skus', ['sku-001']);
    });

    // AC-6: N1 edge case — empty chrtIds stripped, legacy warning fires
    it('N1 edge case: empty chrtIds stripped, legacy-skus-call warning emitted', async () => {
      await productsModule.getStocks(warehouseId, { skus: ['sku-xyz'], chrtIds: [] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('products.getStocks:');
      expect(warnSpy.mock.calls[0][0]).toContain('`skus` parameter is deprecated');
      const calledWith = mockClient.post.mock.calls[0][1] as Record<string, unknown>;
      expect(calledWith).toHaveProperty('skus', ['sku-xyz']);
      expect(calledWith).not.toHaveProperty('chrtIds');
    });

    // AC-7: warn-once idempotency — 3× pure chrtIds calls, never a warning
    it('warn-once idempotency: 3× chrtIds-only calls never emit a warning', async () => {
      await productsModule.getStocks(warehouseId, { chrtIds: [12345678] });
      await productsModule.getStocks(warehouseId, { chrtIds: [12345679] });
      await productsModule.getStocks(warehouseId, { chrtIds: [12345680] });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // warn-once idempotency for legacy path — 2× same legacy key warns only once
    it('warn-once idempotency: 2× legacy-skus calls emit warning only once', async () => {
      await productsModule.getStocks(warehouseId, { skus: ['sku-001'] });
      await productsModule.getStocks(warehouseId, { skus: ['sku-002'] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('updateStock() — chrtId paths', () => {
    const warehouseId = 67890;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let warnSpy: any;

    beforeEach(() => {
      resetDeprecationWarnings();
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      mockClient.put.mockResolvedValue(undefined);
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    // AC-8: happy path — chrtId only, no warning
    it('happy path: chrtId only per item — no warning emitted', async () => {
      await productsModule.updateStock(warehouseId, {
        stocks: [{ chrtId: 12345678, amount: 100 }],
      });
      expect(mockClient.put).toHaveBeenCalledWith(
        expect.stringContaining(`/api/v3/stocks/${warehouseId}`),
        expect.objectContaining({ stocks: [{ chrtId: 12345678, amount: 100 }] }),
        expect.objectContaining({ rateLimitKey: 'products.putStocks' })
      );
      const calledWith = mockClient.put.mock.calls[0][1] as { stocks: Record<string, unknown>[] };
      expect(calledWith.stocks[0]).not.toHaveProperty('sku');
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // AC-9: per-item mixed-mode — sku stripped from mixed item, warning emitted
    it('per-item mixed-mode: sku stripped from mixed item, mixed-sku-and-chrtId warning', async () => {
      await productsModule.updateStock(warehouseId, {
        stocks: [
          { sku: 'A', chrtId: 10, amount: 5 },
          { chrtId: 20, amount: 3 },
        ],
      });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('products.updateStock:');
      expect(warnSpy.mock.calls[0][0]).toContain('BOTH `sku` and `chrtId`');
      const calledWith = mockClient.put.mock.calls[0][1] as { stocks: Record<string, unknown>[] };
      expect(calledWith.stocks[0]).not.toHaveProperty('sku');
      expect(calledWith.stocks[0]).toHaveProperty('chrtId', 10);
      expect(calledWith.stocks[1]).toHaveProperty('chrtId', 20);
    });

    // AC-10: per-item legacy-only — warning emitted
    it('per-item legacy-only: legacy-sku-call warning emitted', async () => {
      await productsModule.updateStock(warehouseId, {
        stocks: [{ sku: 'B', amount: 10 }],
      });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('products.updateStock:');
      expect(warnSpy.mock.calls[0][0]).toContain('stock items with `sku`');
    });

    // AC-11: heterogeneous batch (H1+H2 regression) — both warnings fire independently
    it('H1+H2 regression: heterogeneous batch emits both legacy-sku-call and mixed-sku-and-chrtId', async () => {
      await productsModule.updateStock(warehouseId, {
        stocks: [
          { sku: 'C', amount: 1 },
          { sku: 'D', chrtId: 99, amount: 2 },
        ],
      });
      const warnMessages = warnSpy.mock.calls.map((c: unknown[]) => c[0] as string);
      expect(warnMessages.some((msg: string) => msg.includes('stock items with `sku`'))).toBe(true);
      expect(warnMessages.some((msg: string) => msg.includes('BOTH `sku` and `chrtId`'))).toBe(
        true
      );
    });

    // AC-12: empty batch — no warning, no throw
    it('empty batch: no warning emitted and call completes without throwing', async () => {
      await expect(productsModule.updateStock(warehouseId, { stocks: [] })).resolves.not.toThrow();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // AC-13: undefined data — no warning, no throw
    it('undefined data: no warning emitted and call completes without throwing', async () => {
      await expect(productsModule.updateStock(warehouseId, undefined)).resolves.not.toThrow();
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // warn-once idempotency for legacy-sku-call — 2× same key warns only once
    it('warn-once idempotency: 2× legacy-sku calls emit warning only once', async () => {
      await productsModule.updateStock(warehouseId, { stocks: [{ sku: 'X', amount: 1 }] });
      await productsModule.updateStock(warehouseId, { stocks: [{ sku: 'Y', amount: 2 }] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });

    // warn-once idempotency for happy path — 3× chrtId-only calls never warn
    it('warn-once idempotency: 3× chrtId-only calls never emit a warning', async () => {
      await productsModule.updateStock(warehouseId, { stocks: [{ chrtId: 1, amount: 10 }] });
      await productsModule.updateStock(warehouseId, { stocks: [{ chrtId: 2, amount: 20 }] });
      await productsModule.updateStock(warehouseId, { stocks: [{ chrtId: 3, amount: 30 }] });
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe('deleteStock() — chrtId paths', () => {
    const warehouseId = 11111;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let warnSpy: any;

    beforeEach(() => {
      resetDeprecationWarnings();
      warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
      mockClient.delete.mockResolvedValue(undefined);
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    // AC-14: happy path — chrtIds only, no warning
    it('happy path: chrtIds only — no warning emitted', async () => {
      await productsModule.deleteStock(warehouseId, { chrtIds: [12345678] });
      expect(mockClient.delete).toHaveBeenCalledWith(
        expect.stringContaining(`/api/v3/stocks/${warehouseId}`),
        expect.objectContaining({ chrtIds: [12345678] }),
        expect.objectContaining({ rateLimitKey: 'products.deleteStocks' })
      );
      const calledWith = mockClient.delete.mock.calls[0][1] as Record<string, unknown>;
      expect(calledWith).not.toHaveProperty('skus');
      expect(warnSpy).not.toHaveBeenCalled();
    });

    // AC-15: mixed-mode — skus stripped, chrtIds forwarded, warning emitted
    it('mixed-mode: skus stripped, chrtIds forwarded, mixed warning emitted', async () => {
      await productsModule.deleteStock(warehouseId, { skus: ['sku-del'], chrtIds: [77] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('products.deleteStock:');
      expect(warnSpy.mock.calls[0][0]).toContain('both `skus` and `chrtIds` provided');
      const calledWith = mockClient.delete.mock.calls[0][1] as Record<string, unknown>;
      expect(calledWith).not.toHaveProperty('skus');
      expect(calledWith).toHaveProperty('chrtIds', [77]);
    });

    // AC-16: legacy-only — warning emitted
    it('legacy-only: legacy-skus-call warning emitted', async () => {
      await productsModule.deleteStock(warehouseId, { skus: ['sku-del-2'] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
      expect(warnSpy.mock.calls[0][0]).toContain('products.deleteStock:');
      expect(warnSpy.mock.calls[0][0]).toContain('`skus` parameter is deprecated');
    });

    // warn-once idempotency for legacy-skus-call — 2× legacy calls warn only once
    it('warn-once idempotency: 2× legacy-skus calls emit warning only once', async () => {
      await productsModule.deleteStock(warehouseId, { skus: ['sku-a'] });
      await productsModule.deleteStock(warehouseId, { skus: ['sku-b'] });
      expect(warnSpy).toHaveBeenCalledTimes(1);
    });
  });

  // ── Warehouses & Offices ──

  describe('offices()', () => {
    const mockResponse = [{ id: 1, name: 'Moscow', address: '123 Main St' }];

    it('should GET correct URL with rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.offices();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/offices',
        { rateLimitKey: 'products.offices' }
      );
    });

    it('should return the response', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.offices();
      expect(result).toEqual(mockResponse);
    });

    it('should propagate NetworkError', async () => {
      mockClient.get.mockRejectedValue(new NetworkError('Timeout'));
      await expect(productsModule.offices()).rejects.toThrow(NetworkError);
    });
  });

  describe('warehouses()', () => {
    const mockResponse = [{ id: 10, name: 'WH-1', officeId: 1 }];

    it('should GET correct URL with rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.warehouses();
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/warehouses',
        { rateLimitKey: 'products.warehouses' }
      );
    });

    it('should return the response', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.warehouses();
      expect(result).toEqual(mockResponse);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.get.mockRejectedValue(new AuthenticationError('Bad key'));
      await expect(productsModule.warehouses()).rejects.toThrow(AuthenticationError);
    });
  });

  describe('createWarehouse()', () => {
    const mockData = { name: 'New Warehouse', officeId: 5 };
    const mockResponse = { id: 42 };

    it('should POST to correct URL with data and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      await productsModule.createWarehouse(mockData);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://marketplace-api.wildberries.ru/api/v3/warehouses',
        mockData,
        { rateLimitKey: 'products.postWarehouses' }
      );
    });

    it('should return the response with id', async () => {
      mockClient.post.mockResolvedValue(mockResponse);
      const result = await productsModule.createWarehouse(mockData);
      expect(result).toEqual({ id: 42 });
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Too fast', 6000));
      await expect(productsModule.createWarehouse(mockData)).rejects.toThrow(RateLimitError);
    });
  });

  describe('updateWarehouse()', () => {
    const warehouseId = 42;
    const mockData = { name: 'Updated Warehouse', officeId: 7 };

    it('should PUT to URL with warehouseId and rateLimitKey', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await productsModule.updateWarehouse(warehouseId, mockData);
      expect(mockClient.put).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
        mockData,
        { rateLimitKey: 'products.putWarehouses' }
      );
    });

    it('should use PUT method', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await productsModule.updateWarehouse(warehouseId, mockData);
      expect(mockClient.put).toHaveBeenCalledTimes(1);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should propagate NetworkError', async () => {
      mockClient.put.mockRejectedValue(new NetworkError('Socket hang up'));
      await expect(productsModule.updateWarehouse(warehouseId, mockData)).rejects.toThrow(
        NetworkError
      );
    });
  });

  describe('deleteWarehouse()', () => {
    const warehouseId = 42;

    it('should DELETE to URL with warehouseId and rateLimitKey', async () => {
      mockClient.delete.mockResolvedValue(undefined);
      await productsModule.deleteWarehouse(warehouseId);
      expect(mockClient.delete).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/warehouses/${warehouseId}`,
        undefined,
        { rateLimitKey: 'products.deleteWarehouses' }
      );
    });

    it('should use DELETE method', async () => {
      mockClient.delete.mockResolvedValue(undefined);
      await productsModule.deleteWarehouse(warehouseId);
      expect(mockClient.delete).toHaveBeenCalledTimes(1);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.delete.mockRejectedValue(new AuthenticationError('Forbidden'));
      await expect(productsModule.deleteWarehouse(warehouseId)).rejects.toThrow(
        AuthenticationError
      );
    });
  });

  // ── Warehouse Contacts ──

  describe('getWarehousesContact()', () => {
    const warehouseId = 99;
    const mockResponse = { contacts: [{ comment: 'Main', phone: '+71234567890' }] };

    it('should GET correct URL with warehouseId and rateLimitKey', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      await productsModule.getWarehousesContact(warehouseId);
      expect(mockClient.get).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/dbw/warehouses/${warehouseId}/contacts`,
        { rateLimitKey: 'products.dbwWarehousesContacts' }
      );
    });

    it('should return the response', async () => {
      mockClient.get.mockResolvedValue(mockResponse);
      const result = await productsModule.getWarehousesContact(warehouseId);
      expect(result).toEqual(mockResponse);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.get.mockRejectedValue(new RateLimitError('Slow down', 5000));
      await expect(productsModule.getWarehousesContact(warehouseId)).rejects.toThrow(
        RateLimitError
      );
    });
  });

  describe('updateWarehousesContact()', () => {
    const warehouseId = 99;
    const mockData = { contacts: [{ comment: 'Updated', phone: '+79998887766' }] };

    it('should PUT to correct URL with warehouseId, data, and rateLimitKey', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await productsModule.updateWarehousesContact(warehouseId, mockData);
      expect(mockClient.put).toHaveBeenCalledWith(
        `https://marketplace-api.wildberries.ru/api/v3/dbw/warehouses/${warehouseId}/contacts`,
        mockData,
        { rateLimitKey: 'products.putDbwWarehousesContacts' }
      );
    });

    it('should use PUT method', async () => {
      mockClient.put.mockResolvedValue(undefined);
      await productsModule.updateWarehousesContact(warehouseId, mockData);
      expect(mockClient.put).toHaveBeenCalledTimes(1);
      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should propagate NetworkError', async () => {
      mockClient.put.mockRejectedValue(new NetworkError('ECONNRESET'));
      await expect(productsModule.updateWarehousesContact(warehouseId, mockData)).rejects.toThrow(
        NetworkError
      );
    });
  });
});
