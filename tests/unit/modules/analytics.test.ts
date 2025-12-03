/**
 * Unit tests for AnalyticsModule
 *
 * Tests the AnalyticsModule class with mocked BaseClient to verify:
 * - Sales funnel conversion metrics
 * - Product performance tracking
 * - Search query analysis
 * - Category-level performance
 * - Report generation and retrieval
 * - Method signatures and return types
 * - Correct delegation to BaseClient
 * - Parameter passing and URL construction
 * - Validation logic and error handling
 * - Helper method calculations
 * - Type safety
 *
 * @see {@link ../../../src/modules/analytics/index AnalyticsModule}
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { AnalyticsModule } from '../../../src/modules/analytics';
import type { BaseClient } from '../../../src/client/base-client';
import { ValidationError } from '../../../src/errors/validation-error';

describe('AnalyticsModule', () => {
  // Mock BaseClient with all HTTP methods
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };

  let analyticsModule: AnalyticsModule;

  beforeEach(() => {
    // Create fresh mocks before each test
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
    };

    // Create fresh instance before each test
    analyticsModule = new AnalyticsModule(mockClient as unknown as BaseClient);
  });

  afterEach(() => {
    // Clear all mocks after each test to prevent interference
    vi.clearAllMocks();
  });

  describe('getSalesFunnel() - Sales Funnel Metrics', () => {
    const mockSalesFunnelRequest = {
      period: {
        begin: '2024-01-01 00:00:00',
        end: '2024-01-31 23:59:59',
      },
      page: 1,
      pageSize: 100,
    };

    const mockSalesFunnelResponse = {
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
    };

    it('should call BaseClient.post with correct URL, body, and rate limit key', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSalesFunnelResponse);

      // Act
      await analyticsModule.getSalesFunnel(mockSalesFunnelRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail',
        mockSalesFunnelRequest,
        { rateLimitKey: 'analytics.getSalesFunnel' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed sales funnel response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSalesFunnelResponse);

      // Act
      const result = await analyticsModule.getSalesFunnel(mockSalesFunnelRequest);

      // Assert
      expect(result).toEqual(mockSalesFunnelResponse);
      expect(result.data.cards).toHaveLength(1);
      expect(result.data.cards[0].nmID).toBe(1234567);
      expect(result.data.cards[0].statistics.selectedPeriod.conversions.buyoutsPercent).toBe(4.5);
    });

    it('should throw ValidationError when period begin >= end', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          begin: '2024-01-31 23:59:59',
          end: '2024-01-01 00:00:00', // End before begin
        },
      };

      // Act & Assert
      await expect(analyticsModule.getSalesFunnel(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getSalesFunnel(invalidRequest))
        .rejects.toThrow('Invalid period: begin date must be before end date');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getProductHistory() - Daily Historical Statistics', () => {
    const mockHistoryRequest = {
      period: {
        begin: '2024-01-01 00:00:00',
        end: '2024-01-07 23:59:59',
      },
      nmIDs: [12345, 67890],
    };

    const mockHistoryResponse = {
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
          ],
        },
      ],
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and parameters', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockHistoryResponse);

      // Act
      await analyticsModule.getProductHistory(mockHistoryRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail/history',
        mockHistoryRequest,
        { rateLimitKey: 'analytics.getProductHistory' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed historical statistics response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockHistoryResponse);

      // Act
      const result = await analyticsModule.getProductHistory(mockHistoryRequest);

      // Assert
      expect(result).toEqual(mockHistoryResponse);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].history).toHaveLength(1);
      expect(result.data[0].history[0].date).toBe('2024-01-01');
    });
  });

  describe('getProductPerformance() - Product Performance Metrics', () => {
    const mockDateRange = {
      from: '2024-01-01',
      to: '2024-01-31',
    };

    const mockSalesFunnelResponse = {
      data: {
        page: 1,
        isNextPage: false,
        cards: [
          {
            nmID: 12345,
            vendorCode: 'VENDOR123',
            brandName: 'Product A',
            tags: [],
            object: { id: 447, name: 'TestCategory' },
            statistics: {
              selectedPeriod: {
                begin: '2024-01-01',
                end: '2024-01-31',
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
                begin: '2023-12-01',
                end: '2023-12-31',
                openCardCount: 0,
                addToCartCount: 0,
                ordersCount: 0,
                ordersSumRub: 0,
                buyoutsCount: 0,
                buyoutsSumRub: 0,
                cancelCount: 0,
                cancelSumRub: 0,
                avgPriceRub: 0,
                avgOrdersCountPerDay: 0,
                conversions: {
                  addToCartPercent: 0,
                  cartToOrderPercent: 0,
                  buyoutsPercent: 0,
                },
              },
              periodComparison: {
                openCardDynamics: 0,
                addToCartDynamics: 0,
                ordersCountDynamics: 0,
                ordersSumRubDynamics: 0,
                buyoutsCountDynamics: 0,
                buyoutsSumRubDynamics: 0,
                cancelCountDynamics: 0,
                cancelSumRubDynamics: 0,
                avgOrdersCountPerDayDynamics: 0,
                avgPriceRubDynamics: 0,
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
    };

    it('should validate and transform product performance data', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSalesFunnelResponse);

      // Act
      const result = await analyticsModule.getProductPerformance([12345], mockDateRange);

      // Assert
      expect(result.products).toHaveLength(1);
      expect(result.products[0]).toEqual({
        nmID: 12345,
        vendorCode: 'VENDOR123',
        productName: 'Product A',
        revenue: 45000,
        unitsSold: 450,
        avgPrice: 100,
        returnRate: 11.11111111111111, // 50/450 * 100
        conversionRate: 4.5,
      });
    });

    it('should throw ValidationError when productIds array is empty', async () => {
      // Act & Assert
      await expect(analyticsModule.getProductPerformance([], mockDateRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getProductPerformance([], mockDateRange))
        .rejects.toThrow('Product IDs array cannot be empty');

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when productIds exceeds 50 items', async () => {
      // Arrange
      const tooManyIds = Array.from({ length: 51 }, (_, i) => i + 1);

      // Act & Assert
      await expect(analyticsModule.getProductPerformance(tooManyIds, mockDateRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getProductPerformance(tooManyIds, mockDateRange))
        .rejects.toThrow('Product IDs array cannot exceed 50 items');

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when date range is invalid', async () => {
      // Arrange
      const invalidRange = { from: '2024-01-31', to: '2024-01-01' };

      // Act & Assert
      await expect(analyticsModule.getProductPerformance([12345], invalidRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getProductPerformance([12345], invalidRange))
        .rejects.toThrow('Invalid date range: from date must be before to date');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getSearchQueries() - Search Query Analysis', () => {
    const mockDateRange = {
      from: '2024-01-01',
      to: '2024-01-31',
    };

    const mockSearchQueriesResponse = {
      data: [
        {
          query: 'кондиционер для волос',
          searchCount: 5000,
          clickThroughRate: 8.5,
          conversionRate: 2.3,
          avgPosition: 12,
          revenue: 50000,
        },
      ],
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and body (POST method per API spec)', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSearchQueriesResponse);

      // Act
      await analyticsModule.getSearchQueries(mockDateRange);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/search-report/report',
        {
          currentPeriod: {
            start: '2024-01-01',
            end: '2024-01-31',
          },
        },
        { rateLimitKey: 'analytics.getSearchQueries' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should support optional filters', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSearchQueriesResponse);
      const options = {
        nmIds: [12345, 67890],
        brandNames: ['TestBrand'],
      };

      // Act
      await analyticsModule.getSearchQueries(mockDateRange, options);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/search-report/report',
        {
          currentPeriod: {
            start: '2024-01-01',
            end: '2024-01-31',
          },
          nmIds: [12345, 67890],
          brandNames: ['TestBrand'],
        },
        { rateLimitKey: 'analytics.getSearchQueries' }
      );
    });

    it('should return typed search queries response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSearchQueriesResponse);

      // Act
      const result = await analyticsModule.getSearchQueries(mockDateRange);

      // Assert
      expect(result).toEqual(mockSearchQueriesResponse);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].query).toBe('кондиционер для волос');
      expect(result.data[0].searchCount).toBe(5000);
    });

    it('should throw ValidationError when date range is invalid', async () => {
      // Arrange
      const invalidRange = { from: '2024-01-31', to: '2024-01-01' };

      // Act & Assert
      await expect(analyticsModule.getSearchQueries(invalidRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getSearchQueries(invalidRange))
        .rejects.toThrow('Invalid date range: from date must be before to date');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getCategoryPerformance() - Category-Level Metrics', () => {
    const mockCategoryId = '447';
    const mockDateRange = {
      from: '2024-01-01',
      to: '2024-01-31',
    };

    const mockCategorySalesFunnelResponse = {
      data: {
        page: 1,
        isNextPage: false,
        cards: [
          {
            nmID: 12345,
            vendorCode: 'VENDOR123',
            brandName: 'Product A',
            tags: [],
            object: { id: 447, name: 'TestCategory' },
            statistics: {
              selectedPeriod: {
                begin: '2024-01-01',
                end: '2024-01-31',
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
                begin: '2023-12-01',
                end: '2023-12-31',
                openCardCount: 0,
                addToCartCount: 0,
                ordersCount: 0,
                ordersSumRub: 0,
                buyoutsCount: 0,
                buyoutsSumRub: 0,
                cancelCount: 0,
                cancelSumRub: 0,
                avgPriceRub: 0,
                avgOrdersCountPerDay: 0,
                conversions: {
                  addToCartPercent: 0,
                  cartToOrderPercent: 0,
                  buyoutsPercent: 0,
                },
              },
              periodComparison: {
                openCardDynamics: 0,
                addToCartDynamics: 0,
                ordersCountDynamics: 0,
                ordersSumRubDynamics: 0,
                buyoutsCountDynamics: 0,
                buyoutsSumRubDynamics: 0,
                cancelCountDynamics: 0,
                cancelSumRubDynamics: 0,
                avgOrdersCountPerDayDynamics: 0,
                avgPriceRubDynamics: 0,
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
          {
            nmID: 67890,
            vendorCode: 'VENDOR456',
            brandName: 'Product B',
            tags: [],
            object: { id: 447, name: 'TestCategory' },
            statistics: {
              selectedPeriod: {
                begin: '2024-01-01',
                end: '2024-01-31',
                openCardCount: 5000,
                addToCartCount: 750,
                ordersCount: 250,
                ordersSumRub: 25000,
                buyoutsCount: 225,
                buyoutsSumRub: 22500,
                cancelCount: 25,
                cancelSumRub: 2500,
                avgPriceRub: 100,
                avgOrdersCountPerDay: 8.1,
                conversions: {
                  addToCartPercent: 15,
                  cartToOrderPercent: 33.3,
                  buyoutsPercent: 4.5,
                },
              },
              previousPeriod: {
                begin: '2023-12-01',
                end: '2023-12-31',
                openCardCount: 0,
                addToCartCount: 0,
                ordersCount: 0,
                ordersSumRub: 0,
                buyoutsCount: 0,
                buyoutsSumRub: 0,
                cancelCount: 0,
                cancelSumRub: 0,
                avgPriceRub: 0,
                avgOrdersCountPerDay: 0,
                conversions: {
                  addToCartPercent: 0,
                  cartToOrderPercent: 0,
                  buyoutsPercent: 0,
                },
              },
              periodComparison: {
                openCardDynamics: 0,
                addToCartDynamics: 0,
                ordersCountDynamics: 0,
                ordersSumRubDynamics: 0,
                buyoutsCountDynamics: 0,
                buyoutsSumRubDynamics: 0,
                cancelCountDynamics: 0,
                cancelSumRubDynamics: 0,
                avgOrdersCountPerDayDynamics: 0,
                avgPriceRubDynamics: 0,
                conversions: {
                  addToCartPercent: 0,
                  cartToOrderPercent: 0,
                  buyoutsPercent: 0,
                },
              },
            },
            stocks: {
              stocksMp: 50,
              stocksWb: 25,
            },
          },
        ],
      },
      error: false,
      errorText: '',
    };

    it('should aggregate category metrics from product data', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockCategorySalesFunnelResponse);

      // Act
      const result = await analyticsModule.getCategoryPerformance(mockCategoryId, mockDateRange);

      // Assert
      expect(result.data.categoryId).toBe('447');
      expect(result.data.categoryName).toBe('TestCategory');
      expect(result.data.revenue).toBe(67500); // 45000 + 22500
      expect(result.data.unitsSold).toBe(675); // 450 + 225
      expect(result.data.productCount).toBe(2);
      expect(result.data.topProducts).toHaveLength(2);
      expect(result.data.topProducts[0].nmID).toBe(12345); // Sorted by revenue
      expect(result.data.topProducts[0].revenue).toBe(45000);
    });

    it('should throw ValidationError when categoryId is empty', async () => {
      // Act & Assert
      await expect(analyticsModule.getCategoryPerformance('', mockDateRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getCategoryPerformance('', mockDateRange))
        .rejects.toThrow('Category ID cannot be empty');

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when date range is invalid', async () => {
      // Arrange
      const invalidRange = { from: '2024-01-31', to: '2024-01-01' };

      // Act & Assert
      await expect(analyticsModule.getCategoryPerformance(mockCategoryId, invalidRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getCategoryPerformance(mockCategoryId, invalidRange))
        .rejects.toThrow('Invalid date range: from date must be before to date');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('generateReport() - Report Generation', () => {
    const mockReportRequest = {
      reportType: 'sales_funnel' as const,
      dateRange: { from: '2024-01-01', to: '2024-01-31' },
      format: 'CSV' as const,
    };

    const mockReportResponse = {
      reportId: 'report_123456',
      status: 'pending' as const,
      estimatedCompletionTime: '2024-01-01T12:00:00Z',
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and request body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);

      // Act
      await analyticsModule.generateReport(mockReportRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads',
        mockReportRequest,
        { rateLimitKey: 'analytics.generateReport' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return report ID and status', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockReportResponse);

      // Act
      const result = await analyticsModule.generateReport(mockReportRequest);

      // Assert
      expect(result.reportId).toBe('report_123456');
      expect(result.status).toBe('pending');
    });

    it('should throw ValidationError when date range is invalid', async () => {
      // Arrange
      const invalidRequest = {
        reportType: 'sales_funnel' as const,
        dateRange: { from: '2024-01-31', to: '2024-01-01' },
        format: 'CSV' as const,
      };

      // Act & Assert
      await expect(analyticsModule.generateReport(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.generateReport(invalidRequest))
        .rejects.toThrow('Invalid date range: from date must be before to date');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getReport() - Report Status Check', () => {
    const mockReportId = 'report_123456';

    const mockReportInfo = {
      reportId: 'report_123456',
      status: 'completed' as const,
      reportType: 'sales_funnel' as const,
      format: 'CSV' as const,
      downloadUrl: 'https://example.com/download/report_123456',
      expiresAt: '2024-01-02T12:00:00Z',
      fileSize: 1024000,
      error: false,
      errorText: '',
    };

    it('should call BaseClient.get with correct URL and rate limit key', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportInfo);

      // Act
      await analyticsModule.getReport(mockReportId);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/file/report_123456',
        { rateLimitKey: 'analytics.getReport' }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return report status and download info', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportInfo);

      // Act
      const result = await analyticsModule.getReport(mockReportId);

      // Assert
      expect(result.reportId).toBe('report_123456');
      expect(result.status).toBe('completed');
      expect(result.downloadUrl).toBe('https://example.com/download/report_123456');
      expect(result.format).toBe('CSV');
    });

    it('should throw ValidationError when reportId is empty', async () => {
      // Act & Assert
      await expect(analyticsModule.getReport(''))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getReport(''))
        .rejects.toThrow('Report ID cannot be empty');

      expect(mockClient.get).not.toHaveBeenCalled();
    });
  });

  describe('downloadReport() - Report Download Helper', () => {
    const mockReportId = 'report_123456';

    it('should return download URL when report is completed', async () => {
      // Arrange
      const completedReport = {
        reportId: 'report_123456',
        status: 'completed' as const,
        reportType: 'sales_funnel' as const,
        format: 'CSV' as const,
        downloadUrl: 'https://example.com/download/report_123456',
        expiresAt: '2024-01-02T12:00:00Z',
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(completedReport);

      // Act
      const result = await analyticsModule.downloadReport(mockReportId);

      // Assert
      expect(result.url).toBe('https://example.com/download/report_123456');
      expect(result.format).toBe('CSV');
      expect(result.expiresAt).toBe('2024-01-02T12:00:00Z');
    });

    it('should throw ValidationError when report is not completed', async () => {
      // Arrange
      const pendingReport = {
        reportId: 'report_123456',
        status: 'pending' as const,
        reportType: 'sales_funnel' as const,
        format: 'CSV' as const,
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(pendingReport);

      // Act & Assert
      await expect(analyticsModule.downloadReport(mockReportId))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.downloadReport(mockReportId))
        .rejects.toThrow('Report is not ready for download. Current status: pending');
    });

    it('should throw ValidationError when download URL is missing', async () => {
      // Arrange
      const reportWithoutUrl = {
        reportId: 'report_123456',
        status: 'completed' as const,
        reportType: 'sales_funnel' as const,
        format: 'CSV' as const,
        downloadUrl: undefined,
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(reportWithoutUrl);

      // Act & Assert
      await expect(analyticsModule.downloadReport(mockReportId))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.downloadReport(mockReportId))
        .rejects.toThrow('Report is completed but download URL is not available');
    });
  });

  // NOTE: Tests for getStockHistory, exportAnalyticsCSV, getCSVReportStatus, and downloadCSVReport
  // have been removed as these methods used non-existent API endpoints and were removed from SDK.
  // See task-4.1: Analytics API - Удаление фейковых URL

  // ========================================
  // Task 4.2: HIGH-priority Analytics endpoints
  // ========================================

  describe('getReportDownloads() - List Generated Reports', () => {
    const mockReportDownloadsResponse = {
      data: [
        {
          id: 'report_001',
          reportType: 'sales_funnel',
          userReportName: 'Sales Q1 2024',
          status: 'done' as const,
          file: 'https://example.com/download/report_001.csv',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:05:00Z',
        },
        {
          id: 'report_002',
          reportType: 'search_queries',
          status: 'processing' as const,
          createdAt: '2024-01-15T11:00:00Z',
        },
      ],
    };

    it('should call BaseClient.get with correct URL and no downloadIds', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportDownloadsResponse);

      // Act
      await analyticsModule.getReportDownloads();

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads',
        { rateLimitKey: 'analytics.getReportDownloads' }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should call BaseClient.get with downloadIds filter parameter', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportDownloadsResponse);
      const downloadIds = ['report_001', 'report_002'];

      // Act
      await analyticsModule.getReportDownloads(downloadIds);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads',
        {
          params: { 'filter[downloadIds]': downloadIds },
          rateLimitKey: 'analytics.getReportDownloads',
        }
      );
    });

    it('should return typed report downloads response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockReportDownloadsResponse);

      // Act
      const result = await analyticsModule.getReportDownloads();

      // Assert
      expect(result).toEqual(mockReportDownloadsResponse);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].id).toBe('report_001');
      expect(result.data[0].status).toBe('done');
      expect(result.data[1].status).toBe('processing');
    });
  });

  describe('getProductSearchTexts() - Product Search Texts Analysis', () => {
    const mockRequest = {
      currentPeriod: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
      nmId: 12345,
      limit: 10,
    };

    const mockSearchTextsResponse = {
      data: {
        nmId: 12345,
        cards: [
          {
            text: 'спортивная обувь',
            avgPosition: 5,
            openCard: 1500,
            addToCart: 300,
            orders: 100,
            frequency: 50000,
          },
          {
            text: 'кроссовки мужские',
            avgPosition: 12,
            openCard: 800,
            addToCart: 150,
            orders: 50,
            frequency: 30000,
          },
        ],
      },
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSearchTextsResponse);

      // Act
      await analyticsModule.getProductSearchTexts(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/search-texts',
        mockRequest,
        { rateLimitKey: 'analytics.getProductSearchTexts' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed search texts response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockSearchTextsResponse);

      // Act
      const result = await analyticsModule.getProductSearchTexts(mockRequest);

      // Assert - verify entire response structure matches
      expect(result).toEqual(mockSearchTextsResponse);
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange
      const invalidRequest = {
        currentPeriod: {
          start: '',
          end: '2024-01-31',
        },
        nmId: 12345,
      };

      // Act & Assert
      await expect(analyticsModule.getProductSearchTexts(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getProductSearchTexts(invalidRequest))
        .rejects.toThrow('currentPeriod with start and end dates is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when nmId is missing', async () => {
      // Arrange
      const invalidRequest = {
        currentPeriod: {
          start: '2024-01-01',
          end: '2024-01-31',
        },
        nmId: 0,
      };

      // Act & Assert
      await expect(analyticsModule.getProductSearchTexts(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getProductSearchTexts(invalidRequest))
        .rejects.toThrow('Product nmId is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getProductOrders() - Product Orders Analysis', () => {
    const mockRequest = {
      currentPeriod: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
      nmId: 12345,
      text: 'кроссовки мужские', // Required search text parameter
    };

    const mockProductOrdersResponse = {
      data: {
        nmId: 12345,
        days: [
          {
            date: '2024-01-01',
            orders: 25,
            revenue: 25000,
          },
          {
            date: '2024-01-02',
            orders: 30,
            revenue: 30000,
          },
        ],
      },
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockProductOrdersResponse);

      // Act
      await analyticsModule.getProductOrders(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/orders',
        mockRequest,
        { rateLimitKey: 'analytics.getProductOrders' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed product orders response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockProductOrdersResponse);

      // Act
      const result = await analyticsModule.getProductOrders(mockRequest);

      // Assert - verify entire response structure matches
      expect(result).toEqual(mockProductOrdersResponse);
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange - must provide valid nmId and text to reach period validation
      const invalidRequest = {
        currentPeriod: {
          start: '2024-01-01',
          end: '',
        },
        nmId: 12345,
        text: 'test search',
      };

      // Act & Assert
      await expect(analyticsModule.getProductOrders(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getProductOrders(invalidRequest))
        .rejects.toThrow('currentPeriod with start and end dates is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getStocksProducts() - Stocks by Products Report', () => {
    const mockRequest = {
      period: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
    };

    const mockStocksProductsResponse = {
      data: {
        products: [
          {
            nmId: 12345,
            vendorCode: 'VENDOR123',
            brandName: 'TestBrand',
            subjectName: 'Одежда',
            quantity: 500,
            quantityWb: 300,
            quantityFbs: 200,
          },
        ],
        isNextPage: false,
      },
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksProductsResponse);

      // Act
      await analyticsModule.getStocksProducts(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/products',
        mockRequest,
        { rateLimitKey: 'analytics.getStocksProducts' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed stocks products response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksProductsResponse);

      // Act
      const result = await analyticsModule.getStocksProducts(mockRequest);

      // Assert
      expect(result).toEqual(mockStocksProductsResponse);
      expect(result.data.products).toHaveLength(1);
      expect(result.data.products[0].nmId).toBe(12345);
      expect(result.data.products[0].quantity).toBe(500);
      expect(result.data.products[0].quantityWb).toBe(300);
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          start: '',
          end: '2024-01-31',
        },
      };

      // Act & Assert
      await expect(analyticsModule.getStocksProducts(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getStocksProducts(invalidRequest))
        .rejects.toThrow('period with start and end dates is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getStocksOffices() - Stocks by Offices Report', () => {
    const mockRequest = {
      period: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
    };

    const mockStocksOfficesResponse = {
      data: {
        offices: [
          {
            officeId: 1,
            officeName: 'Коледино',
            regionName: 'Московская область',
            quantity: 10000,
            offices: [],
          },
          {
            officeId: 2,
            officeName: 'Казань',
            regionName: 'Татарстан',
            quantity: 8000,
            offices: [],
          },
        ],
      },
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksOfficesResponse);

      // Act
      await analyticsModule.getStocksOffices(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/offices',
        mockRequest,
        { rateLimitKey: 'analytics.getStocksOffices' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed stocks offices response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksOfficesResponse);

      // Act
      const result = await analyticsModule.getStocksOffices(mockRequest);

      // Assert
      expect(result).toEqual(mockStocksOfficesResponse);
      expect(result.data.offices).toHaveLength(2);
      expect(result.data.offices[0].officeName).toBe('Коледино');
      expect(result.data.offices[0].quantity).toBe(10000);
      expect(result.data.offices[1].quantity).toBe(8000);
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          start: '2024-01-01',
          end: '',
        },
      };

      // Act & Assert
      await expect(analyticsModule.getStocksOffices(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getStocksOffices(invalidRequest))
        .rejects.toThrow('period with start and end dates is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  // ========================================
  // Task 4.10: MEDIUM-priority Analytics endpoints
  // ========================================

  describe('getGroupedHistory() - Grouped History Statistics', () => {
    const mockRequest = {
      period: {
        begin: '2024-01-01',
        end: '2024-01-07',
      },
      brandNames: ['TestBrand'],
      aggregationLevel: 'day' as const,
    };

    const mockGroupedHistoryResponse = {
      data: [
        {
          brandName: 'TestBrand',
          object: { id: 447, name: 'TestCategory' },
          history: [
            {
              dt: '2024-01-01',
              openCardCount: 100,
              addToCartCount: 15,
              ordersCount: 5,
              ordersSumRub: 500,
              buyoutsCount: 4,
              buyoutsSumRub: 400,
              buyoutPercent: 80,
              addToCartConversion: 15,
              cartToOrderConversion: 33,
            },
          ],
        },
      ],
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockGroupedHistoryResponse);

      // Act
      await analyticsModule.getGroupedHistory(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/grouped/history',
        mockRequest,
        { rateLimitKey: 'analytics.getGroupedHistory' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed grouped history response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockGroupedHistoryResponse);

      // Act
      const result = await analyticsModule.getGroupedHistory(mockRequest);

      // Assert
      expect(result).toEqual(mockGroupedHistoryResponse);
      expect(result.data).toHaveLength(1);
      expect(result.data[0].brandName).toBe('TestBrand');
      expect(result.data[0].history).toHaveLength(1);
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          begin: '',
          end: '2024-01-07',
        },
      };

      // Act & Assert
      await expect(analyticsModule.getGroupedHistory(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getGroupedHistory(invalidRequest))
        .rejects.toThrow('period with begin and end dates is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when period exceeds 7 days', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          begin: '2024-01-01',
          end: '2024-01-15', // 14 days
        },
      };

      // Act & Assert
      await expect(analyticsModule.getGroupedHistory(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getGroupedHistory(invalidRequest))
        .rejects.toThrow('Period cannot exceed 7 days for grouped history');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('retryReportGeneration() - Retry Failed Report', () => {
    const mockRequest = {
      downloadId: '06eae887-9d9f-491f-b16a-bb1766fcb8d2',
    };

    const mockRetryResponse = {
      data: {
        id: '16eae887-9d9f-491f-b16a-bb1766fcb8d3',
      },
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockRetryResponse);

      // Act
      await analyticsModule.retryReportGeneration(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/retry',
        mockRequest,
        { rateLimitKey: 'analytics.retryReportGeneration' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return new report ID', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockRetryResponse);

      // Act
      const result = await analyticsModule.retryReportGeneration(mockRequest);

      // Assert
      expect(result.data.id).toBe('16eae887-9d9f-491f-b16a-bb1766fcb8d3');
    });

    it('should throw ValidationError when downloadId is empty', async () => {
      // Arrange
      const invalidRequest = {
        downloadId: '',
      };

      // Act & Assert
      await expect(analyticsModule.retryReportGeneration(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.retryReportGeneration(invalidRequest))
        .rejects.toThrow('Download ID is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when downloadId is not a valid UUID', async () => {
      // Arrange
      const invalidRequest = {
        downloadId: 'not-a-uuid',
      };

      // Act & Assert
      await expect(analyticsModule.retryReportGeneration(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.retryReportGeneration(invalidRequest))
        .rejects.toThrow('Download ID must be a valid UUID');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getSearchReportTableGroups() - Search Report Table Groups', () => {
    const mockRequest = {
      currentPeriod: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
      positionCluster: 'all' as const,
      orderBy: {
        field: 'avgPosition' as const,
        mode: 'asc' as const,
      },
      limit: 100,
      offset: 0,
    };

    const mockTableGroupsResponse = {
      data: {
        groups: [
          {
            subjectName: 'Phones',
            subjectId: 50,
            brandName: 'Apple',
            metrics: {
              avgPosition: { current: 5, dynamics: -10 },
              openCard: { current: 1000, dynamics: 20 },
              addToCart: { current: 150, dynamics: 15 },
              openToCart: { current: 15, dynamics: 5 },
              orders: { current: 50, dynamics: 10 },
              cartToOrder: { current: 33, dynamics: 2 },
              visibility: { current: 80, dynamics: 5 },
            },
          },
        ],
      },
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTableGroupsResponse);

      // Act
      await analyticsModule.getSearchReportTableGroups(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/groups',
        mockRequest,
        { rateLimitKey: 'analytics.getSearchReportTableGroups' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed table groups response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTableGroupsResponse);

      // Act
      const result = await analyticsModule.getSearchReportTableGroups(mockRequest);

      // Assert
      expect(result).toEqual(mockTableGroupsResponse);
      expect(result.data.groups).toHaveLength(1);
      expect(result.data.groups[0].subjectName).toBe('Phones');
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange
      const invalidRequest = {
        ...mockRequest,
        currentPeriod: {
          start: '',
          end: '2024-01-31',
        },
      };

      // Act & Assert
      await expect(analyticsModule.getSearchReportTableGroups(invalidRequest))
        .rejects.toThrow(ValidationError);

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when limit is out of range', async () => {
      // Arrange
      const invalidRequest = {
        ...mockRequest,
        limit: 1500, // Exceeds max of 1000
      };

      // Act & Assert
      await expect(analyticsModule.getSearchReportTableGroups(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getSearchReportTableGroups(invalidRequest))
        .rejects.toThrow('limit must be between 1 and 1000');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getSearchReportTableDetails() - Search Report Table Details', () => {
    const mockRequest = {
      currentPeriod: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
      subjectId: 123,
      brandName: 'TestBrand',
      positionCluster: 'firstHundred' as const,
      orderBy: {
        field: 'orders' as const,
        mode: 'desc' as const,
      },
      limit: 50,
      offset: 0,
    };

    const mockTableDetailsResponse = {
      data: {
        products: [
          {
            nmId: 12345678,
            vendorCode: 'VENDOR123',
            name: 'Test Product',
            subjectName: 'TestCategory',
            brandName: 'TestBrand',
            isAdvertised: true,
            rating: 4.5,
            feedbackRating: 4.8,
            price: {
              minPrice: 1000,
              maxPrice: 1500,
            },
            avgPosition: { current: 10, dynamics: -5 },
            openCard: { current: 500, dynamics: 15 },
            addToCart: { current: 75, dynamics: 10 },
            openToCart: { current: 15, dynamics: 3 },
            orders: { current: 25, dynamics: 8 },
            cartToOrder: { current: 33, dynamics: 2 },
            visibility: { current: 90, dynamics: 5 },
          },
        ],
      },
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTableDetailsResponse);

      // Act
      await analyticsModule.getSearchReportTableDetails(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/details',
        mockRequest,
        { rateLimitKey: 'analytics.getSearchReportTableDetails' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed table details response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockTableDetailsResponse);

      // Act
      const result = await analyticsModule.getSearchReportTableDetails(mockRequest);

      // Assert
      expect(result).toEqual(mockTableDetailsResponse);
      expect(result.data.products).toHaveLength(1);
      expect(result.data.products[0].nmId).toBe(12345678);
    });

    it('should throw ValidationError when nmIds exceeds 50 items', async () => {
      // Arrange
      const tooManyNmIds = Array.from({ length: 51 }, (_, i) => i + 1);
      const invalidRequest = {
        ...mockRequest,
        nmIds: tooManyNmIds,
      };

      // Act & Assert
      await expect(analyticsModule.getSearchReportTableDetails(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getSearchReportTableDetails(invalidRequest))
        .rejects.toThrow('nmIds cannot exceed 50 items');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getStocksProductsGroups() - Stocks Products Groups', () => {
    const mockRequest = {
      period: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
      stockType: 'all' as const,
    };

    const mockStocksGroupsResponse = {
      data: {
        groups: [
          {
            subjectID: 447,
            subjectName: 'TestCategory',
            brandName: 'TestBrand',
            stockCount: 500,
            stockValue: 50000,
            ordersCount: 100,
            avgOrders: 3.3,
            lostOrdersCount: 10,
          },
        ],
        isNextPage: false,
      },
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksGroupsResponse);

      // Act
      await analyticsModule.getStocksProductsGroups(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/groups',
        mockRequest,
        { rateLimitKey: 'analytics.getStocksProductsGroups' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed stocks groups response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksGroupsResponse);

      // Act
      const result = await analyticsModule.getStocksProductsGroups(mockRequest);

      // Assert
      expect(result).toEqual(mockStocksGroupsResponse);
      expect(result.data.groups).toHaveLength(1);
      expect(result.data.groups[0].stockCount).toBe(500);
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          start: '2024-01-01',
          end: '',
        },
      };

      // Act & Assert
      await expect(analyticsModule.getStocksProductsGroups(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getStocksProductsGroups(invalidRequest))
        .rejects.toThrow('period with start and end dates is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });

  describe('getStocksProductsSizes() - Stocks Products Sizes', () => {
    const mockRequest = {
      period: {
        start: '2024-01-01',
        end: '2024-01-31',
      },
      nmID: 12345678,
      includeOffice: true,
    };

    const mockStocksSizesResponse = {
      data: {
        nmID: 12345678,
        hasSizes: true,
        sizes: [
          {
            techSize: 'M',
            sizeName: 'Medium',
            barcode: '1234567890',
            quantity: 100,
            quantityWb: 80,
            quantityFbs: 20,
            inWayToClient: 5,
            inWayFromClient: 2,
            offices: [
              {
                officeId: 1,
                officeName: 'Коледино',
                quantity: 50,
              },
              {
                officeId: 2,
                officeName: 'Казань',
                quantity: 30,
              },
            ],
          },
        ],
      },
      error: false,
      errorText: '',
    };

    it('should call BaseClient.post with correct URL and body', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksSizesResponse);

      // Act
      await analyticsModule.getStocksProductsSizes(mockRequest);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/sizes',
        mockRequest,
        { rateLimitKey: 'analytics.getStocksProductsSizes' }
      );
      expect(mockClient.post).toHaveBeenCalledTimes(1);
    });

    it('should return typed stocks sizes response', async () => {
      // Arrange
      mockClient.post.mockResolvedValue(mockStocksSizesResponse);

      // Act
      const result = await analyticsModule.getStocksProductsSizes(mockRequest);

      // Assert
      expect(result).toEqual(mockStocksSizesResponse);
      expect(result.data.nmID).toBe(12345678);
      expect(result.data.sizes).toHaveLength(1);
      expect(result.data.sizes[0].techSize).toBe('M');
      expect(result.data.sizes[0].offices).toHaveLength(2);
    });

    it('should throw ValidationError when period dates are missing', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          start: '',
          end: '2024-01-31',
        },
        nmID: 12345678,
      };

      // Act & Assert
      await expect(analyticsModule.getStocksProductsSizes(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getStocksProductsSizes(invalidRequest))
        .rejects.toThrow('period with start and end dates is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });

    it('should throw ValidationError when nmID is missing', async () => {
      // Arrange
      const invalidRequest = {
        period: {
          start: '2024-01-01',
          end: '2024-01-31',
        },
        nmID: 0,
      };

      // Act & Assert
      await expect(analyticsModule.getStocksProductsSizes(invalidRequest))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getStocksProductsSizes(invalidRequest))
        .rejects.toThrow('nmID is required');

      expect(mockClient.post).not.toHaveBeenCalled();
    });
  });
});
