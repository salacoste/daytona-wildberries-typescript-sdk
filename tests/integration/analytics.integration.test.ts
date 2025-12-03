/**
 * Integration tests for AnalyticsModule
 *
 * Tests the AnalyticsModule with real BaseClient and MSW-mocked HTTP layer to verify:
 * - Complete request flow for analytics endpoints
 * - Sales funnel metrics from seller-analytics-api.wildberries.ru
 * - Product performance tracking
 * - Search query analysis
 * - Category-level performance metrics
 * - Report generation and retrieval
 * - Rate limiting enforcement
 * - Error transformation from HTTP responses
 * - Query parameter handling
 * - End-to-end type safety
 *
 * @see {@link ../../src/modules/analytics/index AnalyticsModule}
 */

import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { WildberriesSDK } from '../../src';
import { AuthenticationError } from '../../src/errors/auth-error';
import { RateLimitError } from '../../src/errors/rate-limit-error';
import { ValidationError } from '../../src/errors/validation-error';

/**
 * MSW handlers for Analytics API endpoints
 */
const handlers = [
  // POST /api/v2/nm-report/detail - Sales Funnel endpoint
  http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', async ({ request }) => {
    const body = await request.json() as Record<string, unknown>;

    // Validate period
    if (!body.period) {
      return HttpResponse.json(
        {
          data: { page: 0, isNextPage: false, cards: [] },
          error: true,
          errorText: 'Period is required',
        },
        { status: 400 }
      );
    }

    return HttpResponse.json({
      data: {
        page: 1,
        isNextPage: false,
        cards: [
          {
            nmID: 1234567,
            vendorCode: 'VENDOR123',
            brandName: 'TestBrand',
            tags: [{ id: 1, name: 'Sale' }],
            object: { id: 447, name: 'TestCategory' },
            statistics: {
              selectedPeriod: {
                begin: '2024-01-01 00:00:00',
                end: '2024-01-31 23:59:59',
                openCardCount: 10000,
                addToCartCount: 1500,
                ordersCount: 500,
                ordersSumRub: 50000,
                buyoutsCount: 450,
                buyoutsSumRub: 45000,
                cancelCount: 50,
                cancelSumRub: 5000,
                avgPriceRub: 100,
                avgOrdersCountPerDay: 16.1,
                conversions: {
                  addToCartPercent: 15,
                  cartToOrderPercent: 33.3,
                  buyoutsPercent: 4.5,
                },
              },
              previousPeriod: {
                begin: '2023-12-01 00:00:00',
                end: '2023-12-31 23:59:59',
                openCardCount: 8000,
                addToCartCount: 1200,
                ordersCount: 400,
                ordersSumRub: 40000,
                buyoutsCount: 360,
                buyoutsSumRub: 36000,
                cancelCount: 40,
                cancelSumRub: 4000,
                avgPriceRub: 90,
                avgOrdersCountPerDay: 12.9,
                conversions: {
                  addToCartPercent: 15,
                  cartToOrderPercent: 33.3,
                  buyoutsPercent: 4.5,
                },
              },
              periodComparison: {
                openCardDynamics: 25,
                addToCartDynamics: 25,
                ordersCountDynamics: 25,
                ordersSumRubDynamics: 25,
                buyoutsCountDynamics: 25,
                buyoutsSumRubDynamics: 25,
                cancelCountDynamics: 25,
                cancelSumRubDynamics: 25,
                avgOrdersCountPerDayDynamics: 24.8,
                avgPriceRubDynamics: 11.1,
                conversions: {
                  addToCartPercent: 0,
                  cartToOrderPercent: 0,
                  buyoutsPercent: 0,
                },
              },
            },
            stocks: {
              stocksMp: 100,
              stocksWb: 50,
            },
          },
        ],
      },
      error: false,
      errorText: '',
    });
  }),

  // POST /api/v2/nm-report/detail/history - Product History endpoint
  http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail/history', () => {
    return HttpResponse.json({
      data: [
        {
          nmID: 12345,
          vendorCode: 'VENDOR123',
          brandName: 'TestBrand',
          tags: [],
          object: { id: 447, name: 'TestCategory' },
          history: [
            {
              date: '2024-01-01',
              openCardCount: 100,
              addToCartCount: 15,
              ordersCount: 5,
              ordersSumRub: 500,
              buyoutsCount: 4,
              buyoutsSumRub: 400,
              conversions: {
                addToCartPercent: 15,
                cartToOrderPercent: 33.3,
                buyoutsPercent: 4,
              },
            },
            {
              date: '2024-01-02',
              openCardCount: 120,
              addToCartCount: 18,
              ordersCount: 6,
              ordersSumRub: 600,
              buyoutsCount: 5,
              buyoutsSumRub: 500,
              conversions: {
                addToCartPercent: 15,
                cartToOrderPercent: 33.3,
                buyoutsPercent: 4.17,
              },
            },
          ],
        },
      ],
      error: false,
      errorText: '',
    });
  }),

  // POST /api/v2/search-report/report - Search Queries endpoint
  http.post('https://seller-analytics-api.wildberries.ru/api/v2/search-report/report', () => {
    return HttpResponse.json({
      data: [
        {
          query: 'кондиционер для волос',
          searchCount: 5000,
          clickThroughRate: 8.5,
          conversionRate: 2.3,
          avgPosition: 12,
          revenue: 50000,
        },
        {
          query: 'уход за волосами',
          searchCount: 3500,
          clickThroughRate: 7.2,
          conversionRate: 1.8,
          avgPosition: 15,
          revenue: 35000,
        },
      ],
      error: false,
      errorText: '',
    });
  }),

  // POST /api/v2/nm-report/downloads - Generate Report endpoint
  http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads', () => {
    return HttpResponse.json({
      reportId: 'report_abc123',
      status: 'pending',
      estimatedCompletionTime: '2024-01-01T12:00:00Z',
      error: false,
      errorText: '',
    });
  }),

  // GET /api/v2/nm-report/downloads/file/:reportId - Get Report endpoint
  http.get('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/file/:reportId', ({ params }) => {
    const { reportId } = params;

    if (reportId === 'report_completed') {
      return HttpResponse.json({
        reportId: 'report_completed',
        status: 'completed',
        reportType: 'sales_funnel',
        format: 'CSV',
        downloadUrl: 'https://example.com/download/report_completed.csv',
        expiresAt: '2024-01-02T12:00:00Z',
        fileSize: 1024000,
        error: false,
        errorText: '',
      });
    }

    if (reportId === 'report_pending') {
      return HttpResponse.json({
        reportId: 'report_pending',
        status: 'processing',
        reportType: 'sales_funnel',
        format: 'CSV',
        error: false,
        errorText: '',
      });
    }

    return HttpResponse.json({
      reportId,
      status: 'pending',
      reportType: 'sales_funnel',
      format: 'CSV',
      error: false,
      errorText: '',
    });
  }),
];

// Create MSW server instance
const server = setupServer(...handlers);

describe('Analytics Integration Tests', () => {
  let sdk: WildberriesSDK;

  beforeAll(() => {
    // Start MSW server before all tests
    server.listen({ onUnhandledRequest: 'error' });

    // Create SDK instance with test API key
    sdk = new WildberriesSDK({
      apiKey: 'test-api-key-for-analytics-integration-tests',
      timeout: 5000,
    });
  });

  afterEach(() => {
    // Reset handlers to default after each test
    server.resetHandlers();
  });

  afterAll(() => {
    // Cleanup: close MSW server after all tests
    server.close();
  });

  describe('Sales Funnel Metrics', () => {
    it('should successfully retrieve sales funnel data', async () => {
      // Act
      const result = await sdk.analytics.getSalesFunnel({
        period: {
          begin: '2024-01-01 00:00:00',
          end: '2024-01-31 23:59:59',
        },
        page: 1,
        pageSize: 100,
      });

      // Assert
      expect(result.data.cards).toHaveLength(1);
      expect(result.data.cards[0].nmID).toBe(1234567);
      expect(result.data.cards[0].statistics.selectedPeriod.conversions.buyoutsPercent).toBe(4.5);
      expect(result.error).toBe(false);
    });

    it('should retrieve product history with time-series data', async () => {
      // Act
      const result = await sdk.analytics.getProductHistory({
        period: {
          begin: '2024-01-01 00:00:00',
          end: '2024-01-07 23:59:59',
        },
        nmIDs: [12345],
      });

      // Assert
      expect(result.data).toHaveLength(1);
      expect(result.data[0].history).toHaveLength(2);
      expect(result.data[0].history[0].date).toBe('2024-01-01');
      expect(result.data[0].history[1].date).toBe('2024-01-02');
    });
  });

  describe('Product Performance', () => {
    it('should transform funnel data to performance metrics', async () => {
      // Act
      const result = await sdk.analytics.getProductPerformance(
        [1234567],
        { from: '2024-01-01', to: '2024-01-31' }
      );

      // Assert
      expect(result.products).toHaveLength(1);
      expect(result.products[0].nmID).toBe(1234567);
      expect(result.products[0].revenue).toBe(45000);
      expect(result.products[0].unitsSold).toBe(450);
      expect(result.products[0].avgPrice).toBe(100);
      expect(result.products[0].returnRate).toBeCloseTo(11.11, 2);
      expect(result.products[0].conversionRate).toBe(4.5);
    });

    it('should throw ValidationError for empty product IDs', async () => {
      // Act & Assert
      await expect(
        sdk.analytics.getProductPerformance([], { from: '2024-01-01', to: '2024-01-31' })
      ).rejects.toThrow(ValidationError);
    });

    it('should throw ValidationError for too many product IDs', async () => {
      // Arrange
      const tooManyIds = Array.from({ length: 51 }, (_, i) => i + 1);

      // Act & Assert
      await expect(
        sdk.analytics.getProductPerformance(tooManyIds, { from: '2024-01-01', to: '2024-01-31' })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Search Queries', () => {
    it('should retrieve search query metrics', async () => {
      // Act
      const result = await sdk.analytics.getSearchQueries({
        from: '2024-01-01',
        to: '2024-01-31',
      });

      // Assert
      expect(result.data).toHaveLength(2);
      expect(result.data[0].query).toBe('кондиционер для волос');
      expect(result.data[0].searchCount).toBe(5000);
      expect(result.data[0].clickThroughRate).toBe(8.5);
      expect(result.data[0].conversionRate).toBe(2.3);
    });

    it('should throw ValidationError for invalid date range', async () => {
      // Act & Assert
      await expect(
        sdk.analytics.getSearchQueries({ from: '2024-01-31', to: '2024-01-01' })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Category Performance', () => {
    it('should aggregate category metrics from products', async () => {
      // Act
      const result = await sdk.analytics.getCategoryPerformance(
        '447',
        { from: '2024-01-01', to: '2024-01-31' }
      );

      // Assert
      expect(result.data.categoryId).toBe('447');
      expect(result.data.categoryName).toBe('TestCategory');
      expect(result.data.revenue).toBe(45000);
      expect(result.data.unitsSold).toBe(450);
      expect(result.data.productCount).toBe(1);
      expect(result.data.topProducts).toHaveLength(1);
    });

    it('should throw ValidationError for empty category ID', async () => {
      // Act & Assert
      await expect(
        sdk.analytics.getCategoryPerformance('', { from: '2024-01-01', to: '2024-01-31' })
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Report Generation', () => {
    it('should generate report and return report ID', async () => {
      // Act
      const result = await sdk.analytics.generateReport({
        reportType: 'sales_funnel',
        dateRange: { from: '2024-01-01', to: '2024-01-31' },
        format: 'CSV',
      });

      // Assert
      expect(result.reportId).toBe('report_abc123');
      expect(result.status).toBe('pending');
      expect(result.estimatedCompletionTime).toBeDefined();
    });

    it('should retrieve completed report info', async () => {
      // Act
      const result = await sdk.analytics.getReport('report_completed');

      // Assert
      expect(result.reportId).toBe('report_completed');
      expect(result.status).toBe('completed');
      expect(result.downloadUrl).toBe('https://example.com/download/report_completed.csv');
      expect(result.format).toBe('CSV');
    });

    it('should download completed report', async () => {
      // Act
      const result = await sdk.analytics.downloadReport('report_completed');

      // Assert
      expect(result.url).toBe('https://example.com/download/report_completed.csv');
      expect(result.format).toBe('CSV');
      expect(result.expiresAt).toBe('2024-01-02T12:00:00Z');
    });

    it('should throw ValidationError when downloading incomplete report', async () => {
      // Act & Assert
      await expect(
        sdk.analytics.downloadReport('report_pending')
      ).rejects.toThrow(ValidationError);
    });
  });

  describe('Error Handling', () => {
    it('should handle 401 authentication error', async () => {
      // Arrange
      server.use(
        http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', () => {
          return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
        })
      );

      // Act & Assert
      await expect(
        sdk.analytics.getSalesFunnel({
          period: { begin: '2024-01-01', end: '2024-01-31' },
        })
      ).rejects.toThrow(AuthenticationError);
    });

    it('should handle 429 rate limit error', async () => {
      // Arrange
      server.use(
        http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', () => {
          return HttpResponse.json(
            { message: 'Too Many Requests' },
            { status: 429, headers: { 'Retry-After': '60' } }
          );
        })
      );

      // Act & Assert
      await expect(
        sdk.analytics.getSalesFunnel({
          period: { begin: '2024-01-01', end: '2024-01-31' },
        })
      ).rejects.toThrow(RateLimitError);
    });

    it('should handle 400 validation error', async () => {
      // Arrange
      server.use(
        http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', () => {
          return HttpResponse.json(
            {
              data: { page: 0, isNextPage: false, cards: [] },
              error: true,
              errorText: 'Invalid period format',
            },
            { status: 400 }
          );
        })
      );

      // Act & Assert
      await expect(
        sdk.analytics.getSalesFunnel({
          period: { begin: '2024-01-01', end: '2024-01-31' },
        })
      ).rejects.toThrow(ValidationError);
    });
  });

  // NOTE: Tests for getStockHistory, exportAnalyticsCSV, getCSVReportStatus, and downloadCSVReport
  // have been removed as these methods used non-existent API endpoints and were removed from SDK.
  // See task-4.1: Analytics API - Удаление фейковых URL
});
