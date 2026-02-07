/**
 * Unit Tests for Analytics Module (EPIC 41 & 42)
 *
 * Tests cover:
 * - rateLimitKey wiring for all 16 active methods
 * - Type fixes (AvailabilityFilters, TableProductItem)
 * - Return type fixes (getDownloadsFile → ArrayBuffer)
 *
 * @see {@link docs/epics/EPIC_41_ANALYTICS_TYPE_SCHEMA_FIXES.md}
 * @see {@link docs/epics/EPIC_42_ANALYTICS_CODE_QUALITY.md}
 */

/* eslint-disable @typescript-eslint/no-deprecated */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnalyticsModule } from '../../../src/modules/analytics';
import type { BaseClient } from '../../../src/client/base-client';
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
    it('should have all 16 active methods', () => {
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
    });

    // Note: Deprecated v2 wrapper methods (createNmReportDetail, createDetailHistory,
    // createGroupedHistory) have been removed in v3.0.0
  });
});
