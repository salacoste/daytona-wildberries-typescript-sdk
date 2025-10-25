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

    it('should call BaseClient.get with correct URL and parameters', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSearchQueriesResponse);

      // Act
      await analyticsModule.getSearchQueries(mockDateRange);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v2/search-report/report',
        {
          params: {
            dateFrom: '2024-01-01',
            dateTo: '2024-01-31',
          },
          rateLimitKey: 'analytics.getSearchQueries',
        }
      );
      expect(mockClient.get).toHaveBeenCalledTimes(1);
    });

    it('should return typed search queries response', async () => {
      // Arrange
      mockClient.get.mockResolvedValue(mockSearchQueriesResponse);

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

      expect(mockClient.get).not.toHaveBeenCalled();
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

  // ==================== Story 3.4: Stock History and CSV Export Tests ====================

  describe('getStockHistory', () => {
    it('should retrieve stock history for a product', async () => {
      // Arrange
      const productId = 'prod_123';
      const dateRange = { from: '2024-01-01', to: '2024-12-31' };
      const mockResponse = {
        nmID: 12345,
        vendorCode: 'VENDOR_123',
        dateRange,
        changes: [
          {
            timestamp: '2024-01-15T10:00:00Z',
            previousStock: 100,
            newStock: 95,
            changeAmount: -5,
            reason: 'sale' as const,
          },
          {
            timestamp: '2024-01-16T14:30:00Z',
            previousStock: 95,
            newStock: 97,
            changeAmount: 2,
            reason: 'return' as const,
          },
        ],
        summary: {
          totalSales: 5,
          totalReturns: 2,
          totalAdjustments: 0,
          netChange: -3,
          startingStock: 100,
          endingStock: 97,
          avgDailyVelocity: -0.1,
        },
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await analyticsModule.getStockHistory(productId, dateRange);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mockClient.get).toHaveBeenCalledWith(
        `https://seller-analytics-api.wildberries.ru/api/v1/analytics/stock-history/${productId}`,
        {
          params: {
            dateFrom: dateRange.from,
            dateTo: dateRange.to,
          },
          rateLimitKey: 'analytics.getStockHistory',
        }
      );
    });

    it('should validate product ID is not empty', async () => {
      // Arrange
      const emptyProductId = '';
      const dateRange = { from: '2024-01-01', to: '2024-12-31' };

      // Act & Assert
      await expect(analyticsModule.getStockHistory(emptyProductId, dateRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getStockHistory(emptyProductId, dateRange))
        .rejects.toThrow('Product ID cannot be empty');
    });

    it('should validate date range', async () => {
      // Arrange
      const productId = 'prod_123';
      const invalidRange = { from: '2024-12-31', to: '2024-01-01' }; // Reversed

      // Act & Assert
      await expect(analyticsModule.getStockHistory(productId, invalidRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getStockHistory(productId, invalidRange))
        .rejects.toThrow('Invalid date range: from date must be before to date');
    });

    it('should encode product ID in URL', async () => {
      // Arrange
      const productIdWithSpecialChars = 'prod/123#test';
      const dateRange = { from: '2024-01-01', to: '2024-12-31' };
      const mockResponse = {
        nmID: 123,
        vendorCode: 'TEST',
        dateRange,
        changes: [],
        summary: {
          totalSales: 0,
          totalReturns: 0,
          totalAdjustments: 0,
          netChange: 0,
          startingStock: 0,
          endingStock: 0,
          avgDailyVelocity: 0,
        },
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      await analyticsModule.getStockHistory(productIdWithSpecialChars, dateRange);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('prod%2F123%23test'), // URL-encoded
        expect.any(Object)
      );
    });
  });

  describe('exportAnalyticsCSV', () => {
    it('should initiate CSV export with default options', async () => {
      // Arrange
      const reportType = 'product_performance' as const;
      const dateRange = { from: '2024-01-01', to: '2024-12-31' };
      const mockResponse = {
        reportId: 'csv_abc123',
        status: 'pending' as const,
        estimatedCompletionTime: '2024-01-01T12:05:00Z',
        error: false,
        errorText: '',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      // Act
      const result = await analyticsModule.exportAnalyticsCSV(reportType, dateRange);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mockClient.post).toHaveBeenCalledWith(
        'https://seller-analytics-api.wildberries.ru/api/v1/analytics/export/csv',
        {
          reportType,
          dateRange,
          delimiter: ',',
          includeHeaders: true,
          encoding: 'utf-8',
        },
        { rateLimitKey: 'analytics.exportCSV' }
      );
    });

    it('should support custom CSV format options', async () => {
      // Arrange
      const reportType = 'stock_history' as const;
      const dateRange = { from: '2024-01-01', to: '2024-12-31' };
      const options = {
        delimiter: ';' as const,
        includeHeaders: false,
        encoding: 'utf-8-bom' as const,
      };
      const mockResponse = {
        reportId: 'csv_def456',
        status: 'pending' as const,
        error: false,
        errorText: '',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      // Act
      await analyticsModule.exportAnalyticsCSV(reportType, dateRange, options);

      // Assert
      expect(mockClient.post).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          delimiter: ';',
          includeHeaders: false,
          encoding: 'utf-8-bom',
        }),
        expect.any(Object)
      );
    });

    it('should validate report type', async () => {
      // Arrange
      const invalidType = 'invalid_type' as unknown as 'sales_funnel';
      const dateRange = { from: '2024-01-01', to: '2024-12-31' };

      // Act & Assert
      await expect(analyticsModule.exportAnalyticsCSV(invalidType, dateRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.exportAnalyticsCSV(invalidType, dateRange))
        .rejects.toThrow('Invalid report type');
    });

    it('should validate date range', async () => {
      // Arrange
      const reportType = 'sales_funnel' as const;
      const invalidRange = { from: '2024-12-31', to: '2024-01-01' };

      // Act & Assert
      await expect(analyticsModule.exportAnalyticsCSV(reportType, invalidRange))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.exportAnalyticsCSV(reportType, invalidRange))
        .rejects.toThrow('Invalid date range');
    });

    it('should support all valid report types', async () => {
      // Arrange
      const validTypes: ('sales_funnel' | 'product_performance' | 'stock_history' | 'search_queries')[] = [
        'sales_funnel',
        'product_performance',
        'stock_history',
        'search_queries',
      ];
      const dateRange = { from: '2024-01-01', to: '2024-12-31' };
      const mockResponse = {
        reportId: 'csv_test',
        status: 'pending' as const,
        error: false,
        errorText: '',
      };
      mockClient.post.mockResolvedValue(mockResponse);

      // Act & Assert
      for (const type of validTypes) {
        await analyticsModule.exportAnalyticsCSV(type, dateRange);
        expect(mockClient.post).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ reportType: type }),
          expect.any(Object)
        );
      }
    });
  });

  describe('getCSVReportStatus', () => {
    it('should retrieve CSV report status', async () => {
      // Arrange
      const reportId = 'csv_abc123';
      const mockResponse = {
        reportId,
        reportType: 'product_performance' as const,
        status: 'completed' as const,
        downloadUrl: 'https://s3.example.com/report.csv',
        expiresAt: '2024-01-02T12:00:00Z',
        fileSize: 1024000,
        rowCount: 5000,
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await analyticsModule.getCSVReportStatus(reportId);

      // Assert
      expect(result).toEqual(mockResponse);
      expect(mockClient.get).toHaveBeenCalledWith(
        `https://seller-analytics-api.wildberries.ru/api/v1/analytics/export/csv/${reportId}`,
        { rateLimitKey: 'analytics.getCSVReportStatus' }
      );
    });

    it('should validate report ID', async () => {
      // Arrange
      const emptyId = '';

      // Act & Assert
      await expect(analyticsModule.getCSVReportStatus(emptyId))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.getCSVReportStatus(emptyId))
        .rejects.toThrow('Report ID cannot be empty');
    });

    it('should handle pending status', async () => {
      // Arrange
      const reportId = 'csv_pending';
      const mockResponse = {
        reportId,
        reportType: 'sales_funnel' as const,
        status: 'pending' as const,
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await analyticsModule.getCSVReportStatus(reportId);

      // Assert
      expect(result.status).toBe('pending');
      expect(result.downloadUrl).toBeUndefined();
    });

    it('should handle failed status', async () => {
      // Arrange
      const reportId = 'csv_failed';
      const mockResponse = {
        reportId,
        reportType: 'stock_history' as const,
        status: 'failed' as const,
        errorMessage: 'Data export failed due to system error',
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      const result = await analyticsModule.getCSVReportStatus(reportId);

      // Assert
      expect(result.status).toBe('failed');
      expect(result.errorMessage).toBe('Data export failed due to system error');
    });

    it('should URL-encode report ID', async () => {
      // Arrange
      const reportIdWithSpecialChars = 'csv/123#test';
      const mockResponse = {
        reportId: reportIdWithSpecialChars,
        reportType: 'search_queries' as const,
        status: 'completed' as const,
        downloadUrl: 'https://example.com/report.csv',
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockResponse);

      // Act
      await analyticsModule.getCSVReportStatus(reportIdWithSpecialChars);

      // Assert
      expect(mockClient.get).toHaveBeenCalledWith(
        expect.stringContaining('csv%2F123%23test'),
        expect.any(Object)
      );
    });
  });

  describe('downloadCSVReport', () => {
    it('should return report when completed with download URL', async () => {
      // Arrange
      const reportId = 'csv_ready';
      const mockReport = {
        reportId,
        reportType: 'product_performance' as const,
        status: 'completed' as const,
        downloadUrl: 'https://s3.example.com/report.csv',
        expiresAt: '2024-01-02T12:00:00Z',
        fileSize: 2048000,
        rowCount: 10000,
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockReport);

      // Act
      const result = await analyticsModule.downloadCSVReport(reportId);

      // Assert
      expect(result).toEqual(mockReport);
      expect(result.downloadUrl).toBe('https://s3.example.com/report.csv');
      expect(result.fileSize).toBe(2048000);
      expect(result.rowCount).toBe(10000);
    });

    it('should throw error when report is not completed', async () => {
      // Arrange
      const reportId = 'csv_processing';
      const mockReport = {
        reportId,
        reportType: 'stock_history' as const,
        status: 'processing' as const,
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockReport);

      // Act & Assert
      await expect(analyticsModule.downloadCSVReport(reportId))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.downloadCSVReport(reportId))
        .rejects.toThrow('CSV report not ready');
    });

    it('should throw error when download URL is missing', async () => {
      // Arrange
      const reportId = 'csv_no_url';
      const mockReport = {
        reportId,
        reportType: 'sales_funnel' as const,
        status: 'completed' as const,
        downloadUrl: undefined,
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockReport);

      // Act & Assert
      await expect(analyticsModule.downloadCSVReport(reportId))
        .rejects.toThrow(ValidationError);
      await expect(analyticsModule.downloadCSVReport(reportId))
        .rejects.toThrow('CSV report has no download URL');
    });

    it('should handle report with all metadata', async () => {
      // Arrange
      const reportId = 'csv_full';
      const mockReport = {
        reportId,
        reportType: 'search_queries' as const,
        status: 'completed' as const,
        downloadUrl: 'https://cdn.example.com/reports/csv_full.csv',
        expiresAt: '2024-01-03T00:00:00Z',
        fileSize: 512000,
        rowCount: 2500,
        formatOptions: {
          delimiter: ';' as const,
          includeHeaders: true,
          encoding: 'utf-8-bom' as const,
        },
        error: false,
        errorText: '',
      };
      mockClient.get.mockResolvedValue(mockReport);

      // Act
      const result = await analyticsModule.downloadCSVReport(reportId);

      // Assert
      expect(result.formatOptions).toBeDefined();
      expect(result.formatOptions?.delimiter).toBe(';');
      expect(result.formatOptions?.encoding).toBe('utf-8-bom');
    });
  });
});
