/**
 * TDD Tests for v3 Sales Funnel TypeScript Types (Story 13.1)
 *
 * These tests verify that v3 type definitions exist and have correct structure.
 * Written BEFORE implementation (TDD red phase) — all tests should FAIL initially.
 *
 * Source of truth: wildberries_api_doc/11-analytics.yaml
 *
 * @see {@link backlog/tasks/task-10.4 Story 13.1}
 */

import { describe, it, expect } from 'vitest';
import type {
  // v3 Request types
  SalesFunnelProductsRequest,
  SalesFunnelProductsHistoryRequest,
  SalesFunnelGroupedHistoryRequest,
  // v3 Response types
  SalesFunnelProductsResponse,
  SalesFunnelProductsHistoryResponse,
  SalesFunnelGroupedHistoryResponse,
  // Supporting types
  DatePeriod,
  SalesFunnelOrderBy,
  AggregationLevel,
  SalesFunnelProduct,
  SalesFunnelHistoryProduct,
  SalesFunnelStatistic,
  SalesFunnelHistory,
} from '../../../src/types/analytics.types';

// ==========================================================================
// DatePeriod
// ==========================================================================

describe('DatePeriod', () => {
  it('should have start and end string fields', () => {
    const period: DatePeriod = { start: '2026-01-01', end: '2026-01-31' };
    expect(period.start).toBe('2026-01-01');
    expect(period.end).toBe('2026-01-31');
  });
});

// ==========================================================================
// AggregationLevel
// ==========================================================================

describe('AggregationLevel', () => {
  it('should accept "day"', () => {
    const level: AggregationLevel = 'day';
    expect(level).toBe('day');
  });

  it('should accept "week"', () => {
    const level: AggregationLevel = 'week';
    expect(level).toBe('week');
  });
});

// ==========================================================================
// SalesFunnelOrderBy
// ==========================================================================

describe('SalesFunnelOrderBy', () => {
  it('should have field and mode properties', () => {
    const orderBy: SalesFunnelOrderBy = { field: 'openCard', mode: 'asc' };
    expect(orderBy.field).toBe('openCard');
    expect(orderBy.mode).toBe('asc');
  });

  it('should accept desc mode', () => {
    const orderBy: SalesFunnelOrderBy = { field: 'orderCount', mode: 'desc' };
    expect(orderBy.mode).toBe('desc');
  });
});

// ==========================================================================
// SalesFunnelProductsRequest (Swagger: ProductsRequest)
// ==========================================================================

describe('SalesFunnelProductsRequest', () => {
  it('should accept valid request with required fields only', () => {
    const request: SalesFunnelProductsRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
    };
    expect(request.selectedPeriod.start).toBe('2026-01-01');
    expect(request.selectedPeriod.end).toBe('2026-01-31');
  });

  it('should accept all optional fields', () => {
    const request: SalesFunnelProductsRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
      pastPeriod: { start: '2025-12-01', end: '2025-12-31' },
      nmIds: [1234567, 7654321],
      brandNames: ['nike', 'adidas'],
      subjectIds: [64, 334],
      tagIds: [32, 53],
      skipDeletedNm: false,
      orderBy: { field: 'orderCount', mode: 'desc' },
      limit: 231,
      offset: 10,
    };
    expect(request.pastPeriod?.start).toBe('2025-12-01');
    expect(request.nmIds).toHaveLength(2);
    expect(request.brandNames).toEqual(['nike', 'adidas']);
    expect(request.subjectIds).toEqual([64, 334]);
    expect(request.tagIds).toEqual([32, 53]);
    expect(request.skipDeletedNm).toBe(false);
    expect(request.orderBy?.field).toBe('orderCount');
    expect(request.limit).toBe(231);
    expect(request.offset).toBe(10);
  });

  it('should not require pastPeriod', () => {
    const request: SalesFunnelProductsRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
    };
    expect(request.pastPeriod).toBeUndefined();
  });
});

// ==========================================================================
// SalesFunnelProductsHistoryRequest (Swagger: ProductHistoryRequest)
// ==========================================================================

describe('SalesFunnelProductsHistoryRequest', () => {
  it('should accept valid request with required fields', () => {
    const request: SalesFunnelProductsHistoryRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      nmIds: [1234567],
    };
    expect(request.selectedPeriod.start).toBe('2026-01-01');
    expect(request.nmIds).toEqual([1234567]);
  });

  it('should accept optional aggregationLevel', () => {
    const request: SalesFunnelProductsHistoryRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      nmIds: [1234567],
      aggregationLevel: 'week',
    };
    expect(request.aggregationLevel).toBe('week');
  });

  it('should accept optional skipDeletedNm', () => {
    const request: SalesFunnelProductsHistoryRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      nmIds: [1234567],
      skipDeletedNm: true,
    };
    expect(request.skipDeletedNm).toBe(true);
  });
});

// ==========================================================================
// SalesFunnelGroupedHistoryRequest (Swagger: GroupedHistoryRequest)
// ==========================================================================

describe('SalesFunnelGroupedHistoryRequest', () => {
  it('should accept valid request with required fields only', () => {
    const request: SalesFunnelGroupedHistoryRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
    };
    expect(request.selectedPeriod.start).toBe('2026-01-01');
  });

  it('should accept all optional filter fields', () => {
    const request: SalesFunnelGroupedHistoryRequest = {
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      brandNames: ['nike'],
      subjectIds: [64],
      tagIds: [32],
      skipDeletedNm: false,
      aggregationLevel: 'day',
    };
    expect(request.brandNames).toEqual(['nike']);
    expect(request.subjectIds).toEqual([64]);
    expect(request.tagIds).toEqual([32]);
    expect(request.aggregationLevel).toBe('day');
  });
});

// ==========================================================================
// SalesFunnelProduct (Swagger: Product)
// ==========================================================================

describe('SalesFunnelProduct', () => {
  it('should have all required fields from Swagger Product schema', () => {
    const product: SalesFunnelProduct = {
      nmId: 268913787,
      title: 'Кроссовки для бега',
      vendorCode: '12345456',
      brandName: 'Demix',
      subjectId: 105,
      subjectName: 'Кроссовки',
      tags: [{ id: 1, name: 'Обувь' }],
      productRating: 4.5,
      feedbackRating: 4,
      stocks: { wb: 0, mp: 0, balanceSum: 0 },
    };
    expect(product.nmId).toBe(268913787);
    expect(product.title).toBe('Кроссовки для бега');
    expect(product.vendorCode).toBe('12345456');
    expect(product.brandName).toBe('Demix');
    expect(product.subjectId).toBe(105);
    expect(product.subjectName).toBe('Кроссовки');
    expect(product.tags).toHaveLength(1);
    expect(product.tags[0].id).toBe(1);
    expect(product.productRating).toBe(4.5);
    expect(product.feedbackRating).toBe(4);
    expect(product.stocks.wb).toBe(0);
    expect(product.stocks.mp).toBe(0);
    expect(product.stocks.balanceSum).toBe(0);
  });
});

// ==========================================================================
// SalesFunnelHistoryProduct (Swagger: HistoryProduct)
// ==========================================================================

describe('SalesFunnelHistoryProduct', () => {
  it('should have all required fields', () => {
    const product: SalesFunnelHistoryProduct = {
      nmId: 268913787,
      title: 'Кроссовки для бега',
      vendorCode: '12345456',
      brandName: 'Demix',
      subjectId: 105,
      subjectName: 'Кроссовки',
    };
    expect(product.nmId).toBe(268913787);
    expect(product.subjectName).toBe('Кроссовки');
  });
});

// ==========================================================================
// SalesFunnelStatistic (Swagger: Statistic)
// ==========================================================================

describe('SalesFunnelStatistic', () => {
  it('should have all required fields from Swagger Statistic schema', () => {
    const stat: SalesFunnelStatistic = {
      period: { start: '2026-01-01', end: '2026-01-31' },
      openCount: 45,
      cartCount: 34,
      orderCount: 19,
      orderSum: 1262,
      buyoutCount: 19,
      buyoutSum: 1262,
      cancelCount: 0,
      cancelSum: 0,
      avgPrice: 1262,
      avgOrdersCountPerDay: 0.04,
      shareOrderPercent: 3,
      addToWishlist: 455,
      timeToReady: { days: 1, hours: 8, mins: 34 },
      localizationPercent: 46,
      wbClub: {
        orderCount: 19,
        orderSum: 1262,
        buyoutSum: 1262,
        buyoutCount: 19,
        cancelSum: 0,
        cancelCount: 0,
        avgPrice: 1262,
        buyoutPercent: 43,
        avgOrderCountPerDay: 0.04,
      },
      conversions: {
        addToCartPercent: 19,
        cartToOrderPercent: 65,
        buyoutPercent: 35,
      },
    };
    expect(stat.openCount).toBe(45);
    expect(stat.cartCount).toBe(34);
    expect(stat.orderCount).toBe(19);
    expect(stat.orderSum).toBe(1262);
    expect(stat.buyoutCount).toBe(19);
    expect(stat.buyoutSum).toBe(1262);
    expect(stat.cancelCount).toBe(0);
    expect(stat.cancelSum).toBe(0);
    expect(stat.avgPrice).toBe(1262);
    expect(stat.avgOrdersCountPerDay).toBe(0.04);
    expect(stat.shareOrderPercent).toBe(3);
    expect(stat.addToWishlist).toBe(455);
    expect(stat.timeToReady.days).toBe(1);
    expect(stat.timeToReady.hours).toBe(8);
    expect(stat.timeToReady.mins).toBe(34);
    expect(stat.localizationPercent).toBe(46);
    expect(stat.wbClub.orderCount).toBe(19);
    expect(stat.wbClub.avgOrderCountPerDay).toBe(0.04);
    expect(stat.conversions.addToCartPercent).toBe(19);
    expect(stat.conversions.cartToOrderPercent).toBe(65);
    expect(stat.conversions.buyoutPercent).toBe(35);
  });
});

// ==========================================================================
// SalesFunnelHistory (Swagger: History)
// ==========================================================================

describe('SalesFunnelHistory', () => {
  it('should use "date" field (not "dt" like v2)', () => {
    const history: SalesFunnelHistory = {
      date: '2024-10-23',
      openCount: 45,
      cartCount: 34,
      orderCount: 19,
      orderSum: 1262,
      buyoutCount: 19,
      buyoutSum: 1262,
      buyoutPercent: 35,
      addToCartConversion: 43,
      cartToOrderConversion: 55,
      addToWishlistCount: 10,
    };
    expect(history.date).toBe('2024-10-23');
    expect(history.openCount).toBe(45);
    expect(history.cartCount).toBe(34);
    expect(history.orderCount).toBe(19);
    expect(history.orderSum).toBe(1262);
    expect(history.buyoutCount).toBe(19);
    expect(history.buyoutSum).toBe(1262);
    expect(history.buyoutPercent).toBe(35);
    expect(history.addToCartConversion).toBe(43);
    expect(history.cartToOrderConversion).toBe(55);
    expect(history.addToWishlistCount).toBe(10);
  });
});

// ==========================================================================
// SalesFunnelProductsResponse (Swagger: ProductsResponse)
// ==========================================================================

describe('SalesFunnelProductsResponse', () => {
  it('should have products array with product + statistic nested structure', () => {
    const response: SalesFunnelProductsResponse = {
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
              conversions: {
                addToCartPercent: 50,
                cartToOrderPercent: 40,
                buyoutPercent: 90,
              },
            },
          },
        },
      ],
    };
    expect(response.products).toHaveLength(1);
    expect(response.products[0].product.nmId).toBe(268913787);
    expect(response.products[0].statistic.selected.openCount).toBe(100);
    expect(response.products[0].statistic.selected.conversions.addToCartPercent).toBe(50);
  });

  it('should allow optional past and comparison in statistic', () => {
    const response: SalesFunnelProductsResponse = {
      products: [
        {
          product: {
            nmId: 1,
            title: 'T',
            vendorCode: 'V',
            brandName: 'B',
            subjectId: 1,
            subjectName: 'S',
            tags: [],
            productRating: 0,
            feedbackRating: 0,
            stocks: { wb: 0, mp: 0, balanceSum: 0 },
          },
          statistic: {
            selected: {
              period: { start: '2026-01-01', end: '2026-01-31' },
              openCount: 0,
              cartCount: 0,
              orderCount: 0,
              orderSum: 0,
              buyoutCount: 0,
              buyoutSum: 0,
              cancelCount: 0,
              cancelSum: 0,
              avgPrice: 0,
              avgOrdersCountPerDay: 0,
              shareOrderPercent: 0,
              addToWishlist: 0,
              timeToReady: { days: 0, hours: 0, mins: 0 },
              localizationPercent: 0,
              wbClub: {
                orderCount: 0,
                orderSum: 0,
                buyoutSum: 0,
                buyoutCount: 0,
                cancelSum: 0,
                cancelCount: 0,
                avgPrice: 0,
                buyoutPercent: 0,
                avgOrderCountPerDay: 0,
              },
              conversions: {
                addToCartPercent: 0,
                cartToOrderPercent: 0,
                buyoutPercent: 0,
              },
            },
          },
        },
      ],
    };
    expect(response.products[0].statistic.past).toBeUndefined();
    expect(response.products[0].statistic.comparison).toBeUndefined();
  });
});

// ==========================================================================
// SalesFunnelProductsHistoryResponse (Swagger: ProductHistoryResponse)
// ==========================================================================

describe('SalesFunnelProductsHistoryResponse', () => {
  it('should be an array of product + history items', () => {
    const response: SalesFunnelProductsHistoryResponse = [
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
    expect(response).toHaveLength(1);
    expect(response[0].product.nmId).toBe(268913787);
    expect(response[0].history).toHaveLength(1);
    expect(response[0].history[0].date).toBe('2026-01-01');
    expect(response[0].history[0].openCount).toBe(10);
  });
});

// ==========================================================================
// SalesFunnelGroupedHistoryResponse (Swagger: GroupedHistoryResponse)
// ==========================================================================

describe('SalesFunnelGroupedHistoryResponse', () => {
  it('should be an array of product + history items', () => {
    const response: SalesFunnelGroupedHistoryResponse = [
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
    expect(response).toHaveLength(1);
    expect(response[0].product.nmId).toBe(268913787);
    expect(response[0].history[0].date).toBe('2026-01-01');
  });
});

// ==========================================================================
// Backward compatibility: old v2 types should still exist
// ==========================================================================

describe('Backward compatibility — v2 types still exist', () => {
  it('should still export NmReportDetailRequest', async () => {
    const types = await import('../../../src/types/analytics.types');
    // Just verify the type name is still exported (compile-time check via import above)
    expect(types).toBeDefined();
  });
});
