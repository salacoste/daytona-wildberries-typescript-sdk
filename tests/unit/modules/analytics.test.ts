/**
 * Unit Tests for Analytics Module (EPIC 41 & 42)
 *
 * Tests cover:
 * - rateLimitKey wiring for all active methods
 * - Type fixes (AvailabilityFilters, TableProductItem)
 * - Return type fixes (getDownloadsFile → ArrayBuffer)
 *
 * @see {@link docs/epics/EPIC_41_ANALYTICS_TYPE_SCHEMA_FIXES.md}
 * @see {@link docs/epics/EPIC_42_ANALYTICS_CODE_QUALITY.md}
 */

/* eslint-disable @typescript-eslint/no-deprecated */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnalyticsModule, type ItemRatingV2Request } from '../../../src/modules/analytics';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { analyticsRateLimits } from '../../../src/config/analytics-rate-limits';
import type {
  AvailabilityFilters,
  TableProductItem,
  OrderByMainAndDetails,
  ErrorObject,
} from '../../../src/types/analytics.types';

const BASE_URL = 'https://seller-analytics-api.wildberries.ru';

describe('AnalyticsModule', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };
  let module: AnalyticsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    module = new AnalyticsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // EPIC 41: Type & Schema Fixes
  // ==========================================================================

  describe('EPIC 41: Type & Schema Fixes', () => {
    describe('AC #1: AvailabilityFilters type is properly array-typed', () => {
      it('should accept array of availability filter strings', () => {
        // This test verifies the type is correctly defined as an array
        const filters: AvailabilityFilters = ['deficient', 'actual', 'balanced'];
        expect(filters).toBeInstanceOf(Array);
        expect(filters).toContain('deficient');
        expect(filters).toContain('actual');
        expect(filters).toContain('balanced');
      });

      it('should accept all valid filter values', () => {
        const allFilters: AvailabilityFilters = [
          'deficient',
          'actual',
          'balanced',
          'nonActual',
          'nonLiquid',
          'invalidData',
        ];
        expect(allFilters).toHaveLength(6);
      });
    });

    describe('AC #2: TableProductItem has all 18+ fields', () => {
      it('should have all product fields from swagger', () => {
        const item: TableProductItem = {
          nmId: 268913787,
          name: 'Test Product',
          vendorCode: 'ABC123',
          subjectName: 'Electronics',
          brandName: 'TestBrand',
          mainPhoto: 'https://example.com/photo.jpg',
          isAdvertised: true,
          isSubstitutedSKU: false,
          isCardRated: true,
          rating: 4.5,
          feedbackRating: 4.2,
          price: { minPrice: 100, maxPrice: 200 },
          avgPosition: { current: 5, dynamics: 10 },
          openCard: { current: 100, dynamics: 5 },
          addToCart: { current: 50, dynamics: 3 },
          openToCart: { current: 0.5, dynamics: 2 },
          orders: { current: 20, dynamics: 8 },
          cartToOrder: { current: 0.4, dynamics: 1 },
          visibility: { current: 75, dynamics: 5 },
        };
        expect(item.nmId).toBe(268913787);
        expect(item.name).toBe('Test Product');
        expect(item.price?.minPrice).toBe(100);
        expect(item.avgPosition?.current).toBe(5);
      });
    });

    describe('AC #3: ErrorObject type exists', () => {
      it('should have code and message fields', () => {
        const error: ErrorObject = {
          code: 400,
          message: 'Bad Request',
        };
        expect(error.code).toBe(400);
        expect(error.message).toBe('Bad Request');
      });
    });

    describe('AC #4: OrderByMainAndDetails type alias exists', () => {
      it('should be a valid OrderBy structure', () => {
        const orderBy: OrderByMainAndDetails = {
          field: 'avgPosition',
          mode: 'desc',
        };
        expect(orderBy.field).toBe('avgPosition');
        expect(orderBy.mode).toBe('desc');
      });
    });

    describe('AC #5: getDownloadsFile returns ArrayBuffer type', () => {
      it('should return Promise<ArrayBuffer>', async () => {
        const mockArrayBuffer = new ArrayBuffer(8);
        mockClient.get.mockResolvedValue(mockArrayBuffer);

        const result = await module.getDownloadsFile('test-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/nm-report/downloads/file/test-uuid`,
          expect.objectContaining({ rateLimitKey: 'analytics.nmReportDownloadsFile' })
        );
        expect(result).toBe(mockArrayBuffer);
      });
    });
  });

  // ==========================================================================
  // EPIC 42: Rate Limit Key Wiring
  // ==========================================================================

  describe('EPIC 42: Rate Limit Key Wiring', () => {
    describe('CSV Export methods rateLimitKey', () => {
      it('getNmReportDownloads passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue({ data: [] });
        await module.getNmReportDownloads();

        expect(mockClient.get).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/nm-report/downloads`,
          expect.objectContaining({ rateLimitKey: 'analytics.nmReportDownloads' })
        );
      });

      it('createNmReportDownload passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createNmReportDownload({ reportType: 'sales_funnel_product' } as any);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/nm-report/downloads`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postNmReportDownloads' })
        );
      });

      it('createNmReportDownload accepts InventoryHistoryReportReq (STOCK_HISTORY_DAILY_CSV)', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createNmReportDownload({
          id: '11111111-2222-3333-4444-555555555555',
          reportType: 'STOCK_HISTORY_DAILY_CSV',
          params: {
            currentPeriod: { start: '2024-02-10', end: '2024-02-10' },
            stockType: 'wb',
            skipDeletedNm: true,
            nmIds: [111222333],
          },
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/nm-report/downloads`,
          expect.objectContaining({ reportType: 'STOCK_HISTORY_DAILY_CSV' }),
          expect.objectContaining({ rateLimitKey: 'analytics.postNmReportDownloads' })
        );
      });

      it('createDownloadsRetry passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createDownloadsRetry({ downloadId: 'test-uuid' });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/nm-report/downloads/retry`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postNmReportDownloadsRetry' })
        );
      });

      it('getDownloadsFile passes rateLimitKey', async () => {
        mockClient.get.mockResolvedValue(new ArrayBuffer(8));
        await module.getDownloadsFile('test-uuid');

        expect(mockClient.get).toHaveBeenCalledWith(
          expect.stringContaining('downloads/file/test-uuid'),
          expect.objectContaining({ rateLimitKey: 'analytics.nmReportDownloadsFile' })
        );
      });
    });

    describe('Search Analytics methods rateLimitKey', () => {
      it('createSearchReportReport passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createSearchReportReport({
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          positionCluster: 'all',
          orderBy: { field: 'avgPosition', mode: 'desc' },
          limit: 10,
          offset: 0,
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/search-report/report`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSearchReportReport' })
        );
      });

      it('createTableGroup passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createTableGroup({
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          positionCluster: 'all',
          orderBy: { field: 'avgPosition', mode: 'desc' },
          limit: 10,
          offset: 0,
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/search-report/table/groups`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSearchReportTableGroups' })
        );
      });

      it('createTableDetail passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createTableDetail({
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          positionCluster: 'all',
          orderBy: { field: 'avgPosition', mode: 'desc' },
          limit: 10,
          offset: 0,
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/search-report/table/details`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSearchReportTableDetails' })
        );
      });

      it('createProductSearchText passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createProductSearchText({
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          nmIds: [123],
          topOrderBy: 'openCard',
          orderBy: { field: 'avgPosition', mode: 'desc' },
          limit: 10,
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/search-report/product/search-texts`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSearchReportProductSearchTexts' })
        );
      });

      it('createProductOrder passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createProductOrder({
          period: { start: '2026-01-01', end: '2026-01-07' },
          nmId: 123,
          searchTexts: ['кроссовки'],
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/search-report/product/orders`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSearchReportProductOrders' })
        );
      });
    });

    describe('Stock History methods rateLimitKey', () => {
      it('createProductsGroup passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createProductsGroup({
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          stockType: '',
          skipDeletedNm: false,
          availabilityFilters: ['actual'],
          orderBy: { field: 'nmID', sort: 'asc' },
        } as any);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/stocks-report/products/groups`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postStocksReportProductsGroups' })
        );
      });

      it('createProductsProduct passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createProductsProduct({
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          stockType: '',
          skipDeletedNm: false,
          availabilityFilters: ['actual'],
          orderBy: { field: 'nmID', sort: 'asc' },
        } as any);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/stocks-report/products/products`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postStocksReportProductsProducts' })
        );
      });

      it('createProductsSize passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createProductsSize({
          nmID: 123,
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          stockType: '',
          orderBy: { field: 'nmID', sort: 'asc' },
        } as any);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/stocks-report/products/sizes`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postStocksReportProductsSizes' })
        );
      });

      it('createStocksReportOffice passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ data: {} });
        await module.createStocksReportOffice({
          currentPeriod: { start: '2026-01-01', end: '2026-01-31' },
          stockType: '',
          skipDeletedNm: false,
          availabilityFilters: ['actual'],
          orderBy: { field: 'nmID', sort: 'asc' },
        } as any);

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/v2/stocks-report/offices`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postStocksReportOffices' })
        );
      });
    });

    describe('v3 Sales Funnel methods rateLimitKey', () => {
      it('getSalesFunnelProducts passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({ products: [] });
        await module.getSalesFunnelProducts({
          selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
          orderBy: { field: 'orderCount', mode: 'desc' },
          limit: 10,
          offset: 0,
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/analytics/v3/sales-funnel/products`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSalesFunnelProducts' })
        );
      });

      it('getSalesFunnelProductsHistory passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({});
        await module.getSalesFunnelProductsHistory({
          selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
          nmIds: [268913787],
          aggregationLevel: 'day',
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/analytics/v3/sales-funnel/products/history`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSalesFunnelProductsHistory' })
        );
      });

      it('getSalesFunnelGroupedHistory passes rateLimitKey', async () => {
        mockClient.post.mockResolvedValue({});
        await module.getSalesFunnelGroupedHistory({
          selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
          aggregationLevel: 'day',
        });

        expect(mockClient.post).toHaveBeenCalledWith(
          `${BASE_URL}/api/analytics/v3/sales-funnel/grouped/history`,
          expect.anything(),
          expect.objectContaining({ rateLimitKey: 'analytics.postSalesFunnelGroupedHistory' })
        );
      });
    });
  });

  // ==========================================================================
  // All methods exist
  // ==========================================================================

  describe('All module methods exist', () => {
    it('should expose all 19 current methods, including item-rating v1 and v2', () => {
      // CSV Export (4)
      expect(typeof module.getNmReportDownloads).toBe('function');
      expect(typeof module.createNmReportDownload).toBe('function');
      expect(typeof module.createDownloadsRetry).toBe('function');
      expect(typeof module.getDownloadsFile).toBe('function');

      // Search Analytics (5)
      expect(typeof module.createSearchReportReport).toBe('function');
      expect(typeof module.createTableGroup).toBe('function');
      expect(typeof module.createTableDetail).toBe('function');
      expect(typeof module.createProductSearchText).toBe('function');
      expect(typeof module.createProductOrder).toBe('function');

      // Stock History (4)
      expect(typeof module.createProductsGroup).toBe('function');
      expect(typeof module.createProductsProduct).toBe('function');
      expect(typeof module.createProductsSize).toBe('function');
      expect(typeof module.createStocksReportOffice).toBe('function');

      // v3 Sales Funnel (3)
      expect(typeof module.getSalesFunnelProducts).toBe('function');
      expect(typeof module.getSalesFunnelProductsHistory).toBe('function');
      expect(typeof module.getSalesFunnelGroupedHistory).toBe('function');

      // v1 WB Warehouses Inventory (1)
      expect(typeof module.getWbWarehousesStock).toBe('function');

      // Item Rating (v2 current + v1 deprecated)
      expect(typeof module.getItemRatingV2).toBe('function');
      expect(typeof module.getItemRating).toBe('function');
    });

    // Note: Deprecated v2 wrapper methods (createNmReportDetail, createDetailHistory,
    // createGroupedHistory) have been removed in v3.0.0
  });

  // ============================================================================
  // getWbWarehousesStock (v1 WB Warehouses Inventory)
  // ============================================================================

  describe('getWbWarehousesStock()', () => {
    const WB_WAREHOUSES_URL = `${BASE_URL}/api/analytics/v1/stocks-report/wb-warehouses`;

    it('should return inventory items with warehouse and region data', async () => {
      const mockResponse = {
        data: {
          items: [
            {
              nmId: 395996251,
              chrtId: 572682891,
              warehouseId: 130744,
              warehouseName: 'Краснодар',
              regionName: 'Южный + Северо-Кавказский',
              quantity: 10,
              inWayToClient: 3,
              inWayFromClient: 0,
            },
          ],
        },
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getWbWarehousesStock({ nmIds: [395996251] });

      expect(result.data.items).toHaveLength(1);
      expect(result.data.items[0].warehouseId).toBe(130744);
      expect(result.data.items[0].warehouseName).toBe('Краснодар');
      expect(result.data.items[0].regionName).toBe('Южный + Северо-Кавказский');
      expect(result.data.items[0].quantity).toBe(10);
    });

    it('should call correct URL and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({ data: { items: [] } });

      await module.getWbWarehousesStock({ nmIds: [123], limit: 100, offset: 50 });

      expect(mockClient.post).toHaveBeenCalledWith(
        WB_WAREHOUSES_URL,
        { nmIds: [123], limit: 100, offset: 50 },
        { rateLimitKey: 'analytics.postStocksReportWbWarehouses' }
      );
    });

    it('should send empty object when no params provided', async () => {
      mockClient.post.mockResolvedValue({ data: { items: [] } });

      await module.getWbWarehousesStock();

      expect(mockClient.post).toHaveBeenCalledWith(
        WB_WAREHOUSES_URL,
        {},
        { rateLimitKey: 'analytics.postStocksReportWbWarehouses' }
      );
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));
      await expect(module.getWbWarehousesStock()).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(module.getWbWarehousesStock()).rejects.toThrow(RateLimitError);
    });

    it('should handle empty items array', async () => {
      mockClient.post.mockResolvedValue({ data: { items: [] } });

      const result = await module.getWbWarehousesStock({ nmIds: [999999] });

      expect(result.data.items).toEqual([]);
    });
  });

  // ============================================================================
  // getItemRatingV2 (v2 Item Rating) — task-182
  // ============================================================================

  describe('getItemRatingV2()', () => {
    const ITEM_RATING_V2_URL = `${BASE_URL}/api/analytics/v2/item-rating`;

    it('should route hidden-product filters to the v2 endpoint', async () => {
      mockClient.post.mockResolvedValue({
        data: { sellerRating: { current: 3.56 }, feedbackIncrease: {} as any, items: [] },
      });

      const request: ItemRatingV2Request = {
        currentPeriod: { start: '2026-07-01', end: '2026-07-18' },
        isNotIncludeNmsWithoutSales: true,
        onlyShadowedNms: true,
        orderBy: { field: 'feedbackCount' as const, mode: 'desc' as const },
        offset: 0,
        limit: 100,
      };

      await module.getItemRatingV2(request);

      expect(mockClient.post).toHaveBeenCalledWith(ITEM_RATING_V2_URL, request, {
        rateLimitKey: 'analytics.itemRatingV2',
      });
      expect(analyticsRateLimits['analytics.itemRatingV2']).toEqual({
        requestsPerMinute: 3,
        intervalSeconds: 20,
        burstLimit: 3,
      });
    });

    it('should return v2 items with catalog visibility unchanged', async () => {
      const item = {
        nmId: 123456789,
        title: 'Товар',
        vendorCode: 'vendor-1',
        subjectId: 50,
        subjectName: 'Предмет',
        brandName: 'Brand',
        tagName: 'Tag',
        tagId: 65,
        pinnedFeedback: true,
        rating: 10,
        feedbackRating: { current: 3.87, dynamics: 0.31, percentile: 1.7 },
        feedbackCount: { current: 12, dynamics: 9 },
        fiveStar: { current: 9, dynamics: 7 },
        fourStar: { current: 0, dynamics: -1 },
        threeStar: { current: 1, dynamics: 1 },
        twoStar: { current: 2, dynamics: 2 },
        oneStar: { current: 0, dynamics: 0 },
        disqualified: 7,
        isShadowed: true,
      };
      const mockResponse = {
        data: {
          sellerRating: { current: 3.56 },
          feedbackIncrease: {
            current: 26,
            total: 116,
            dynamics: 23,
            fiveStar: { current: 19, total: 51 },
            fourStar: { current: 2, total: 13 },
            threeStar: { current: 1, total: 11 },
            twoStar: { current: 5, total: 34 },
            oneStar: { current: -1, total: 7 },
          },
          items: [item],
        },
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getItemRatingV2({
        currentPeriod: { start: '2026-07-01', end: '2026-07-18' },
        orderBy: { field: 'feedbackCount', mode: 'desc' },
        offset: 0,
      });

      expect(result).toEqual(mockResponse);
      expect(result.data.items[0].isShadowed).toBe(true);
    });
  });

  // ============================================================================
  // getItemRating (v1 Item Rating) — task-151
  // ============================================================================

  describe('getItemRating()', () => {
    const ITEM_RATING_URL = `${BASE_URL}/api/analytics/v1/item-rating`;

    it('should call correct URL with request body and rateLimitKey (period mode)', async () => {
      mockClient.post.mockResolvedValue({
        data: { sellerRating: { current: 3.56 }, feedbackIncrease: {} as any, cards: [] },
      });

      const request = {
        currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
        orderBy: { field: 'feedbackCount' as const, mode: 'desc' as const },
        offset: 0,
        limit: 100,
      };

      await module.getItemRating(request);

      expect(mockClient.post).toHaveBeenCalledWith(ITEM_RATING_URL, request, {
        rateLimitKey: 'analytics.itemRating',
      });
    });

    it('should pass through compare mode (pastPeriod) request body and rateLimitKey', async () => {
      mockClient.post.mockResolvedValue({
        data: { sellerRating: { current: 3.56 }, feedbackIncrease: {} as any, cards: [] },
      });

      const request = {
        currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
        pastPeriod: { start: '2026-02-08', end: '2026-02-08' },
        nmIds: [162579635, 166699779],
        subjectIds: [232, 1364],
        brandNames: ['Abikas', 'Tike'],
        tagIds: [3, 5, 6],
        isNotIncludeNMsWithoutSales: true,
        orderBy: { field: 'fiveStar' as const, mode: 'desc' as const },
        limit: 130,
        offset: 50,
      };

      await module.getItemRating(request);

      expect(mockClient.post).toHaveBeenCalledWith(ITEM_RATING_URL, request, {
        rateLimitKey: 'analytics.itemRating',
      });
    });

    it('should return the response payload unchanged (passthrough)', async () => {
      const mockResponse = {
        data: {
          sellerRating: { current: 3.56, dynamics: 0.03 },
          feedbackIncrease: {
            current: 26,
            total: 116,
            dynamics: 23,
            fiveStar: { current: 19, dynamics: 17, total: 51 },
            fourStar: { current: 2, dynamics: 1, total: 13 },
            threeStar: { current: 1, dynamics: 1, total: 11 },
            twoStar: { current: 5, dynamics: 5, total: 34 },
            oneStar: { current: -1, dynamics: -1, total: 7 },
          },
          cards: [
            {
              nmId: 123456789,
              title: 'iPh 17 512 ГБ Серебристый',
              vendorCode: 'wb3ha2668w',
              feedbackRating: { current: 3.87, dynamics: 0.31, percentile: 1.7 },
              feedbackCount: { current: 12, dynamics: 9 },
              disqualified: 7,
            },
          ],
        },
      };
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await module.getItemRating({
        currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
        orderBy: { field: 'feedbackCount', mode: 'desc' },
        offset: 0,
      });

      expect(result).toEqual(mockResponse);
      expect(result.data.sellerRating.current).toBe(3.56);
      expect(result.data.feedbackIncrease.fiveStar.total).toBe(51);
      expect(result.data.cards[0].nmId).toBe(123456789);
      expect(result.data.cards[0].feedbackRating?.percentile).toBe(1.7);
    });

    it('should propagate AuthenticationError', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));
      await expect(
        module.getItemRating({
          currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
          orderBy: { field: 'feedbackCount', mode: 'desc' },
          offset: 0,
        })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should propagate RateLimitError', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 5000));
      await expect(
        module.getItemRating({
          currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
          orderBy: { field: 'feedbackCount', mode: 'desc' },
          offset: 0,
        })
      ).rejects.toThrow(RateLimitError);
    });
  });
});
