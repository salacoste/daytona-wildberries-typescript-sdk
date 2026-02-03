/**
 * TDD Tests for v3 Sales Funnel SDK Methods (Story 13.2)
 *
 * Tests the 3 new v3 methods and 3 deprecated v2 wrappers in AnalyticsModule.
 * Written BEFORE implementation (TDD red phase) — all tests should FAIL initially.
 *
 * @see {@link backlog/tasks/task-10.1 Story 13.2}
 */

/* eslint-disable @typescript-eslint/no-deprecated */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnalyticsModule } from '../../../src/modules/analytics';
import type { BaseClient } from '../../../src/client/base-client';
import { AuthenticationError } from '../../../src/errors/auth-error';
import { RateLimitError } from '../../../src/errors/rate-limit-error';
import { NetworkError } from '../../../src/errors/network-error';

const BASE_URL = 'https://seller-analytics-api.wildberries.ru';

describe('AnalyticsModule — v3 Sales Funnel Methods', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let analyticsModule: AnalyticsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    analyticsModule = new AnalyticsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ==========================================================================
  // getSalesFunnelProducts() — NEW v3 method
  // ==========================================================================

  describe('getSalesFunnelProducts()', () => {
    const mockResponse = {
      products: [
        {
          product: {
            nmId: 268913787,
            title: 'Кроссовки',
            vendorCode: '123',
            brandName: 'Demix',
            subjectId: 105,
            subjectName: 'Кроссовки',
            tags: [],
            productRating: 4.5,
            feedbackRating: 4,
            stocks: { wb: 10, mp: 5, balanceSum: 15 },
          },
          statistic: {
            selected: {
              period: { start: '2026-01-01', end: '2026-01-31' },
              openCount: 100,
              cartCount: 50,
              orderCount: 20,
              orderSum: 5000,
              buyoutCount: 18,
              buyoutSum: 4500,
              cancelCount: 2,
              cancelSum: 500,
              avgPrice: 250,
              avgOrdersCountPerDay: 0.65,
              shareOrderPercent: 5,
              addToWishlist: 30,
              timeToReady: { days: 2, hours: 4, mins: 15 },
              localizationPercent: 60,
              wbClub: {
                orderCount: 5,
                orderSum: 1250,
                buyoutSum: 1000,
                buyoutCount: 4,
                cancelSum: 250,
                cancelCount: 1,
                avgPrice: 250,
                buyoutPercent: 80,
                avgOrderCountPerDay: 0.16,
              },
              conversions: { addToCartPercent: 50, cartToOrderPercent: 40, buyoutPercent: 90 },
            },
          },
        },
      ],
    };

    it('should call POST on correct v3 endpoint URL', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await analyticsModule.getSalesFunnelProducts({
        selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/analytics/v3/sales-funnel/products`,
        expect.any(Object)
      );
    });

    it('should pass request body with all fields to client.post', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const request = {
        selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
        pastPeriod: { start: '2025-12-01', end: '2025-12-31' },
        nmIds: [1234567],
        brandNames: ['nike'],
        subjectIds: [64],
        tagIds: [32],
        skipDeletedNm: true,
        orderBy: { field: 'orderCount' as const, mode: 'desc' as const },
        limit: 50,
        offset: 0,
      };

      await analyticsModule.getSalesFunnelProducts(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/analytics/v3/sales-funnel/products`,
        request
      );
    });

    it('should return typed response', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await analyticsModule.getSalesFunnelProducts({
        selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
      });

      expect(result.products).toHaveLength(1);
      expect(result.products[0].product.nmId).toBe(268913787);
      expect(result.products[0].statistic.selected.openCount).toBe(100);
    });
  });

  // ==========================================================================
  // getSalesFunnelProductsHistory() — NEW v3 method
  // ==========================================================================

  describe('getSalesFunnelProductsHistory()', () => {
    const mockResponse = [
      {
        product: {
          nmId: 268913787,
          title: 'Кроссовки',
          vendorCode: '123',
          brandName: 'Demix',
          subjectId: 105,
          subjectName: 'Кроссовки',
        },
        history: [
          {
            date: '2026-01-01',
            openCount: 10,
            cartCount: 5,
            orderCount: 2,
            orderSum: 500,
            buyoutCount: 2,
            buyoutSum: 500,
            buyoutPercent: 100,
            addToCartConversion: 50,
            cartToOrderConversion: 40,
            addToWishlistCount: 3,
          },
        ],
      },
    ];

    it('should call POST on correct v3 endpoint URL', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await analyticsModule.getSalesFunnelProductsHistory({
        selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
        nmIds: [268913787],
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/analytics/v3/sales-funnel/products/history`,
        expect.any(Object)
      );
    });

    it('should pass request body with aggregationLevel', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const request = {
        selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
        nmIds: [268913787],
        aggregationLevel: 'week' as const,
        skipDeletedNm: true,
      };

      await analyticsModule.getSalesFunnelProductsHistory(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/analytics/v3/sales-funnel/products/history`,
        request
      );
    });

    it('should return array of product+history items', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await analyticsModule.getSalesFunnelProductsHistory({
        selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
        nmIds: [268913787],
      });

      expect(result).toHaveLength(1);
      expect(result[0].product.nmId).toBe(268913787);
      expect(result[0].history[0].date).toBe('2026-01-01');
      expect(result[0].history[0].openCount).toBe(10);
    });
  });

  // ==========================================================================
  // getSalesFunnelGroupedHistory() — NEW v3 method
  // ==========================================================================

  describe('getSalesFunnelGroupedHistory()', () => {
    const mockResponse = [
      {
        product: {
          nmId: 268913787,
          title: 'Кроссовки',
          vendorCode: '123',
          brandName: 'Demix',
          subjectId: 105,
          subjectName: 'Кроссовки',
        },
        history: [
          {
            date: '2026-01-01',
            openCount: 10,
            cartCount: 5,
            orderCount: 2,
            orderSum: 500,
            buyoutCount: 2,
            buyoutSum: 500,
            buyoutPercent: 100,
            addToCartConversion: 50,
            cartToOrderConversion: 40,
            addToWishlistCount: 3,
          },
        ],
      },
    ];

    it('should call POST on correct v3 endpoint URL', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      await analyticsModule.getSalesFunnelGroupedHistory({
        selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      });

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/analytics/v3/sales-funnel/grouped/history`,
        expect.any(Object)
      );
    });

    it('should pass all optional filter fields', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const request = {
        selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
        brandNames: ['nike'],
        subjectIds: [64],
        tagIds: [32],
        skipDeletedNm: false,
        aggregationLevel: 'day' as const,
      };

      await analyticsModule.getSalesFunnelGroupedHistory(request);

      expect(mockClient.post).toHaveBeenCalledWith(
        `${BASE_URL}/api/analytics/v3/sales-funnel/grouped/history`,
        request
      );
    });

    it('should return array of product+history items', async () => {
      mockClient.post.mockResolvedValue(mockResponse);

      const result = await analyticsModule.getSalesFunnelGroupedHistory({
        selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      });

      expect(result).toHaveLength(1);
      expect(result[0].history[0].date).toBe('2026-01-01');
    });
  });

  // ==========================================================================
  // createNmReportDetail() — DEPRECATED v2 wrapper
  // ==========================================================================

  describe('createNmReportDetail() — deprecated wrapper', () => {
    it('should map period.begin/end to selectedPeriod.start/end', async () => {
      mockClient.post.mockResolvedValue({ products: [] });

      await analyticsModule.createNmReportDetail({
        period: { begin: '2026-01-01', end: '2026-01-31' },
        page: 1,
      } as never);

      const callArgs = mockClient.post.mock.calls[0];
      const body = callArgs[1];
      expect(body.selectedPeriod).toEqual({ start: '2026-01-01', end: '2026-01-31' });
      expect(body.period).toBeUndefined();
    });

    it('should map nmIDs to nmIds', async () => {
      mockClient.post.mockResolvedValue({ products: [] });

      await analyticsModule.createNmReportDetail({
        period: { begin: '2026-01-01', end: '2026-01-31' },
        nmIDs: [111, 222, 333],
        page: 1,
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.nmIds).toEqual([111, 222, 333]);
      expect(body.nmIDs).toBeUndefined();
    });

    it('should map objectIDs to subjectIds', async () => {
      mockClient.post.mockResolvedValue({ products: [] });

      await analyticsModule.createNmReportDetail({
        period: { begin: '2026-01-01', end: '2026-01-31' },
        objectIDs: [64, 334],
        page: 1,
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.subjectIds).toEqual([64, 334]);
      expect(body.objectIDs).toBeUndefined();
    });

    it('should map tagIDs to tagIds', async () => {
      mockClient.post.mockResolvedValue({ products: [] });

      await analyticsModule.createNmReportDetail({
        period: { begin: '2026-01-01', end: '2026-01-31' },
        tagIDs: [10, 20],
        page: 1,
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.tagIds).toEqual([10, 20]);
      expect(body.tagIDs).toBeUndefined();
    });

    it('should map page to limit+offset', async () => {
      mockClient.post.mockResolvedValue({ products: [] });

      await analyticsModule.createNmReportDetail({
        period: { begin: '2026-01-01', end: '2026-01-31' },
        page: 3,
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      // page 3 with default limit should produce a non-zero offset
      expect(body.limit).toBeDefined();
      expect(body.offset).toBeDefined();
      expect(typeof body.limit).toBe('number');
      expect(typeof body.offset).toBe('number');
      expect(body.page).toBeUndefined();
    });

    it('should silently drop timezone parameter', async () => {
      mockClient.post.mockResolvedValue({ products: [] });

      await analyticsModule.createNmReportDetail({
        period: { begin: '2026-01-01', end: '2026-01-31' },
        timezone: 'Europe/Moscow',
        page: 1,
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.timezone).toBeUndefined();
    });

    it('should call the v3 endpoint, not the old v2 endpoint', async () => {
      mockClient.post.mockResolvedValue({ products: [] });

      await analyticsModule.createNmReportDetail({
        period: { begin: '2026-01-01', end: '2026-01-31' },
        page: 1,
      } as never);

      const url = mockClient.post.mock.calls[0][0];
      expect(url).toBe(`${BASE_URL}/api/analytics/v3/sales-funnel/products`);
      expect(url).not.toContain('/api/v2/nm-report/detail');
    });
  });

  // ==========================================================================
  // createDetailHistory() — DEPRECATED v2 wrapper
  // ==========================================================================

  describe('createDetailHistory() — deprecated wrapper', () => {
    it('should map period.begin/end to selectedPeriod.start/end', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createDetailHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        nmIDs: [1234567],
        timezone: 'Europe/Moscow',
        aggregationLevel: 'day',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.selectedPeriod).toEqual({ start: '2026-01-01', end: '2026-01-07' });
      expect(body.period).toBeUndefined();
    });

    it('should map nmIDs to nmIds', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createDetailHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        nmIDs: [111, 222],
        aggregationLevel: 'day',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.nmIds).toEqual([111, 222]);
      expect(body.nmIDs).toBeUndefined();
    });

    it('should silently drop timezone', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createDetailHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        nmIDs: [1],
        timezone: 'Europe/Moscow',
        aggregationLevel: 'day',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.timezone).toBeUndefined();
    });

    it('should preserve aggregationLevel', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createDetailHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        nmIDs: [1],
        aggregationLevel: 'week',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.aggregationLevel).toBe('week');
    });

    it('should call the v3 endpoint', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createDetailHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        nmIDs: [1],
        aggregationLevel: 'day',
      } as never);

      const url = mockClient.post.mock.calls[0][0];
      expect(url).toBe(`${BASE_URL}/api/analytics/v3/sales-funnel/products/history`);
    });
  });

  // ==========================================================================
  // createGroupedHistory() — DEPRECATED v2 wrapper
  // ==========================================================================

  describe('createGroupedHistory() — deprecated wrapper', () => {
    it('should map period.begin/end to selectedPeriod.start/end', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createGroupedHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        objectIDs: [64],
        tagIDs: [32],
        timezone: 'Europe/Moscow',
        aggregationLevel: 'day',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.selectedPeriod).toEqual({ start: '2026-01-01', end: '2026-01-07' });
      expect(body.period).toBeUndefined();
    });

    it('should map objectIDs to subjectIds', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createGroupedHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        objectIDs: [64, 334],
        aggregationLevel: 'day',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.subjectIds).toEqual([64, 334]);
      expect(body.objectIDs).toBeUndefined();
    });

    it('should map tagIDs to tagIds', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createGroupedHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        tagIDs: [10, 20],
        aggregationLevel: 'day',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.tagIds).toEqual([10, 20]);
      expect(body.tagIDs).toBeUndefined();
    });

    it('should silently drop timezone', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createGroupedHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        timezone: 'Europe/Moscow',
        aggregationLevel: 'day',
      } as never);

      const body = mockClient.post.mock.calls[0][1];
      expect(body.timezone).toBeUndefined();
    });

    it('should call the v3 endpoint', async () => {
      mockClient.post.mockResolvedValue([]);

      await analyticsModule.createGroupedHistory({
        period: { begin: '2026-01-01', end: '2026-01-07' },
        aggregationLevel: 'day',
      } as never);

      const url = mockClient.post.mock.calls[0][0];
      expect(url).toBe(`${BASE_URL}/api/analytics/v3/sales-funnel/grouped/history`);
    });
  });

  // ==========================================================================
  // Error handling
  // ==========================================================================

  describe('Error handling', () => {
    it('should throw RateLimitError on 429 response', async () => {
      mockClient.post.mockRejectedValue(new RateLimitError('Rate limit exceeded', 429));

      await expect(
        analyticsModule.getSalesFunnelProducts({
          selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
        })
      ).rejects.toThrow(RateLimitError);
    });

    it('should throw AuthenticationError on 401 response', async () => {
      mockClient.post.mockRejectedValue(new AuthenticationError('Invalid API key'));

      await expect(
        analyticsModule.getSalesFunnelProducts({
          selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
        })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should propagate network errors', async () => {
      mockClient.post.mockRejectedValue(new NetworkError('Connection timeout'));

      await expect(
        analyticsModule.getSalesFunnelProductsHistory({
          selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
          nmIds: [1],
        })
      ).rejects.toThrow(NetworkError);
    });
  });

  // ==========================================================================
  // Unchanged methods — verify they still exist
  // ==========================================================================

  describe('Unchanged methods', () => {
    it('should still have getNmReportDownloads', () => {
      expect(typeof analyticsModule.getNmReportDownloads).toBe('function');
    });

    it('should still have createNmReportDownload', () => {
      expect(typeof analyticsModule.createNmReportDownload).toBe('function');
    });

    it('should still have createDownloadsRetry', () => {
      expect(typeof analyticsModule.createDownloadsRetry).toBe('function');
    });

    it('should still have getDownloadsFile', () => {
      expect(typeof analyticsModule.getDownloadsFile).toBe('function');
    });

    it('should still have createSearchReportReport', () => {
      expect(typeof analyticsModule.createSearchReportReport).toBe('function');
    });

    it('should still have createTableGroup', () => {
      expect(typeof analyticsModule.createTableGroup).toBe('function');
    });

    it('should still have createTableDetail', () => {
      expect(typeof analyticsModule.createTableDetail).toBe('function');
    });

    it('should still have createProductSearchText', () => {
      expect(typeof analyticsModule.createProductSearchText).toBe('function');
    });

    it('should still have createProductOrder', () => {
      expect(typeof analyticsModule.createProductOrder).toBe('function');
    });

    it('should still have createProductsGroup', () => {
      expect(typeof analyticsModule.createProductsGroup).toBe('function');
    });

    it('should still have createProductsProduct', () => {
      expect(typeof analyticsModule.createProductsProduct).toBe('function');
    });

    it('should still have createProductsSize', () => {
      expect(typeof analyticsModule.createProductsSize).toBe('function');
    });

    it('should still have createStocksReportOffice', () => {
      expect(typeof analyticsModule.createStocksReportOffice).toBe('function');
    });
  });
});
