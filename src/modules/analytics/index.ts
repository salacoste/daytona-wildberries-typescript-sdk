/**
 * Analytics Module
 * Provides access to Wildberries seller analytics including sales funnel, product performance, and search queries
 *
 * Generated from: wildberries_api_doc/11-analytics.yaml
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors/validation-error';
import type {
  DateRange,
  ProductStatisticsRequest,
  ProductStatisticsResponse,
  HistoricalStatisticsRequest,
  HistoricalStatisticsResponse,
  SearchQueriesResponse,
  ProductPerformanceResponse,
  CategoryPerformanceResponse,
  GenerateReportRequest,
  GenerateReportResponse,
  ReportInfo,
  StockHistoryResponse,
  AnalyticsReportType,
  CSVFormatOptions,
  CSVExportResponse,
  CSVReport,
} from '../../types/analytics.types';

/**
 * AnalyticsModule
 *
 * Manages analytics and reporting operations for Wildberries sellers including:
 * - Sales funnel conversion metrics (views → cart → purchases)
 * - Product performance tracking and comparison
 * - Search query analysis and optimization
 * - Category-level performance metrics
 * - Time-series data for trend analysis
 * - CSV report generation
 *
 * @example
 * ```typescript
 * const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
 *
 * // Get sales funnel metrics
 * const funnel = await sdk.analytics.getSalesFunnel({
 *   from: '2024-01-01',
 *   to: '2024-01-31'
 * });
 * console.log(`Conversion Rate: ${funnel.data.cards[0].statistics.selectedPeriod.conversions.buyoutsPercent}%`);
 *
 * // Compare product performance
 * const performance = await sdk.analytics.getProductPerformance(
 *   ['12345', '67890'],
 *   { from: '2024-01-01', to: '2024-01-31' }
 * );
 * ```
 */
export class AnalyticsModule {
  /**
   * Creates an instance of AnalyticsModule
   * @param client - BaseClient instance for making HTTP requests
   */
  constructor(private client: BaseClient) {}

  /**
   * Get sales funnel conversion metrics for products
   *
   * Retrieves detailed statistics about product performance including views,
   * add-to-cart actions, orders, and purchases with conversion rates at each stage.
   * Compares selected period with previous period to track trends.
   *
   * @param request - Product statistics request with filters and period
   * @returns Promise resolving to product statistics with funnel metrics
   * @throws {ValidationError} When date range is invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded (3 requests/minute)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get sales funnel for last 30 days
   * const funnel = await sdk.analytics.getSalesFunnel({
   *   period: {
   *     begin: '2024-01-01 00:00:00',
   *     end: '2024-01-31 23:59:59'
   *   },
   *   page: 1,
   *   pageSize: 100
   * });
   *
   * funnel.data.cards.forEach(card => {
   *   const stats = card.statistics.selectedPeriod;
   *   console.log(`${card.brandName}: ${stats.conversions.buyoutsPercent}% conversion`);
   * });
   * ```
   */
  async getSalesFunnel(request: ProductStatisticsRequest): Promise<ProductStatisticsResponse> {
    // Validate period
    if (request.period.begin >= request.period.end) {
      throw new ValidationError(
        'Invalid period: begin date must be before end date',
        { period: 'Begin date must be before end date' }
      );
    }

    return this.client.post<ProductStatisticsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail',
      request,
      { rateLimitKey: 'analytics.getSalesFunnel' }
    );
  }

  /**
   * Get daily historical statistics for product cards
   *
   * Returns time-series data showing product performance by day.
   * Maximum 7 days of data can be retrieved per request.
   *
   * @param request - Historical statistics request with date range and filters
   * @returns Promise resolving to daily product statistics
   * @throws {ValidationError} When date range exceeds 7 days
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded (3 requests/minute)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get daily statistics for specific products
   * const history = await sdk.analytics.getProductHistory({
   *   period: {
   *     begin: '2024-01-01 00:00:00',
   *     end: '2024-01-07 23:59:59'
   *   },
   *   nmIDs: [12345, 67890]
   * });
   *
   * history.data.forEach(product => {
   *   product.history.forEach(day => {
   *     console.log(`${day.date}: ${day.ordersCount} orders`);
   *   });
   * });
   * ```
   */
  async getProductHistory(request: HistoricalStatisticsRequest): Promise<HistoricalStatisticsResponse> {
    return this.client.post<HistoricalStatisticsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail/history',
      request,
      { rateLimitKey: 'analytics.getProductHistory' }
    );
  }

  /**
   * Get performance metrics for specific products
   *
   * Analyzes performance of individual products with revenue, units sold,
   * conversion rates, and return rates. Useful for product comparison.
   *
   * @param productIds - Array of product article numbers (nmIDs) to analyze
   * @param dateRange - Date range for performance data
   * @returns Promise resolving to product performance metrics
   * @throws {ValidationError} When productIds is empty or exceeds limit (max 50)
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Compare performance of multiple products
   * const performance = await sdk.analytics.getProductPerformance(
   *   [12345, 67890, 11111],
   *   { from: '2024-01-01', to: '2024-01-31' }
   * );
   *
   * // Sort by revenue
   * const topPerformers = performance.products
   *   .sort((a, b) => b.revenue - a.revenue)
   *   .slice(0, 5);
   * ```
   */
  async getProductPerformance(
    productIds: number[],
    dateRange: DateRange
  ): Promise<ProductPerformanceResponse> {
    // Validate product IDs
    if (productIds.length === 0) {
      throw new ValidationError(
        'Product IDs array cannot be empty',
        { productIds: 'Array cannot be empty' }
      );
    }

    if (productIds.length > 50) {
      throw new ValidationError(
        'Product IDs array cannot exceed 50 items. For larger sets, make multiple requests.',
        { productIds: `Exceeded maximum of 50 items (received: ${productIds.length})` }
      );
    }

    // Validate date range
    if (dateRange.from >= dateRange.to) {
      throw new ValidationError(
        'Invalid date range: from date must be before to date',
        { dateRange: 'From date must be before to date' }
      );
    }

    // Use getSalesFunnel with product IDs filter
    const response = await this.getSalesFunnel({
      period: {
        begin: dateRange.from,
        end: dateRange.to,
      },
      nmIDs: productIds,
      page: 1,
      pageSize: productIds.length,
    });

    // Transform to ProductPerformanceResponse
    const products = response.data.cards.map(card => ({
      nmID: card.nmID,
      vendorCode: card.vendorCode,
      productName: card.brandName,
      revenue: card.statistics.selectedPeriod.buyoutsSumRub,
      unitsSold: card.statistics.selectedPeriod.buyoutsCount,
      avgPrice: card.statistics.selectedPeriod.avgPriceRub,
      returnRate: this.calculateReturnRate(
        card.statistics.selectedPeriod.cancelCount,
        card.statistics.selectedPeriod.buyoutsCount
      ),
      conversionRate: card.statistics.selectedPeriod.conversions.buyoutsPercent,
    }));

    return {
      products,
      error: response.error,
      errorText: response.errorText,
      additionalErrors: response.additionalErrors,
    };
  }

  /**
   * Get search queries that led to product views
   *
   * Note: This endpoint returns search query data. The actual implementation
   * depends on the search-report endpoints in the OpenAPI spec.
   *
   * @param dateRange - Date range for search query data
   * @returns Promise resolving to search query metrics
   * @throws {ValidationError} When date range is invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get top search queries
   * const queries = await sdk.analytics.getSearchQueries({
   *   from: '2024-01-01',
   *   to: '2024-01-31'
   * });
   *
   * // Find high-volume low-conversion queries for optimization
   * const opportunities = queries.data
   *   .filter(q => q.searchCount > 1000 && q.conversionRate < 2)
   *   .sort((a, b) => b.searchCount - a.searchCount);
   * ```
   */
  async getSearchQueries(dateRange: DateRange): Promise<SearchQueriesResponse> {
    // Validate date range
    if (dateRange.from >= dateRange.to) {
      throw new ValidationError(
        'Invalid date range: from date must be before to date',
        { dateRange: 'From date must be before to date' }
      );
    }

    // Note: Using placeholder endpoint - actual endpoint may differ
    return this.client.get<SearchQueriesResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/report',
      {
        params: {
          dateFrom: dateRange.from,
          dateTo: dateRange.to,
        },
        rateLimitKey: 'analytics.getSearchQueries',
      }
    );
  }

  /**
   * Get category-level performance metrics
   *
   * Analyzes performance at category level including revenue, units sold,
   * product count, and top performers within the category.
   *
   * @param categoryId - Category identifier (object ID)
   * @param dateRange - Date range for category analysis
   * @returns Promise resolving to category performance metrics
   * @throws {ValidationError} When categoryId is invalid or date range is invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Analyze category performance
   * const category = await sdk.analytics.getCategoryPerformance(
   *   '447',  // Category ID
   *   { from: '2024-01-01', to: '2024-01-31' }
   * );
   *
   * console.log(`Category Revenue: ${category.data.revenue} RUB`);
   * console.log(`Top Products:`, category.data.topProducts.slice(0, 5));
   * ```
   */
  async getCategoryPerformance(
    categoryId: string,
    dateRange: DateRange
  ): Promise<CategoryPerformanceResponse> {
    // Validate category ID
    if (!categoryId || categoryId.trim() === '') {
      throw new ValidationError(
        'Category ID cannot be empty',
        { categoryId: 'Category ID cannot be empty' }
      );
    }

    // Validate date range
    if (dateRange.from >= dateRange.to) {
      throw new ValidationError(
        'Invalid date range: from date must be before to date',
        { dateRange: 'From date must be before to date' }
      );
    }

    // Get products in this category
    const response = await this.getSalesFunnel({
      period: {
        begin: dateRange.from,
        end: dateRange.to,
      },
      objectIDs: [parseInt(categoryId, 10)],
      page: 1,
      pageSize: 1000,
    });

    // Aggregate category metrics
    const cards = response.data.cards;
    const totalRevenue = cards.reduce((sum, card) =>
      sum + card.statistics.selectedPeriod.buyoutsSumRub, 0
    );
    const totalUnitsSold = cards.reduce((sum, card) =>
      sum + card.statistics.selectedPeriod.buyoutsCount, 0
    );

    // Get top 10 products by revenue
    const topProducts = cards
      .sort((a, b) =>
        b.statistics.selectedPeriod.buyoutsSumRub - a.statistics.selectedPeriod.buyoutsSumRub
      )
      .slice(0, 10)
      .map(card => ({
        nmID: card.nmID,
        name: card.brandName,
        revenue: card.statistics.selectedPeriod.buyoutsSumRub,
        unitsSold: card.statistics.selectedPeriod.buyoutsCount,
      }));

    return {
      data: {
        categoryId,
        categoryName: cards[0]?.object.name || 'Unknown',
        revenue: totalRevenue,
        unitsSold: totalUnitsSold,
        productCount: cards.length,
        topProducts,
      },
      error: false,
      errorText: '',
    };
  }

  /**
   * Generate CSV/Excel report for analytics data
   *
   * Creates an asynchronous report generation task. Use getReport() to
   * check status and retrieve download URL when complete.
   *
   * @param request - Report generation request with type, format, and filters
   * @returns Promise resolving to report generation response with reportId
   * @throws {ValidationError} When request parameters are invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded (2 requests/minute)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Generate sales funnel CSV report
   * const report = await sdk.analytics.generateReport({
   *   reportType: 'sales_funnel',
   *   dateRange: { from: '2024-01-01', to: '2024-01-31' },
   *   format: 'CSV'
   * });
   *
   * console.log(`Report ID: ${report.reportId}`);
   * console.log(`Status: ${report.status}`);
   * ```
   */
  async generateReport(request: GenerateReportRequest): Promise<GenerateReportResponse> {
    // Validate date range
    if (request.dateRange.from >= request.dateRange.to) {
      throw new ValidationError(
        'Invalid date range: from date must be before to date',
        { dateRange: 'From date must be before to date' }
      );
    }

    return this.client.post<GenerateReportResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads',
      request,
      { rateLimitKey: 'analytics.generateReport' }
    );
  }

  /**
   * Get report status and download information
   *
   * Checks the status of a previously generated report and provides
   * download URL when the report is ready.
   *
   * @param reportId - Report identifier from generateReport()
   * @returns Promise resolving to report info with status and download URL
   * @throws {ValidationError} When reportId is invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded (10 requests/minute)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Check report status
   * const info = await sdk.analytics.getReport(reportId);
   *
   * if (info.status === 'completed') {
   *   console.log(`Download: ${info.downloadUrl}`);
   *   console.log(`Expires: ${info.expiresAt}`);
   * } else {
   *   console.log(`Status: ${info.status}`);
   * }
   * ```
   */
  async getReport(reportId: string): Promise<ReportInfo> {
    // Validate report ID
    if (!reportId || reportId.trim() === '') {
      throw new ValidationError(
        'Report ID cannot be empty',
        { reportId: 'Report ID cannot be empty' }
      );
    }

    return this.client.get<ReportInfo>(
      `https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/file/${reportId}`,
      { rateLimitKey: 'analytics.getReport' }
    );
  }

  /**
   * Download completed report (helper method)
   *
   * Convenience method that checks report status and returns download URL
   * only when the report is completed.
   *
   * @param reportId - Report identifier from generateReport()
   * @returns Promise resolving to download information
   * @throws {ValidationError} When report is not completed
   *
   * @example
   * ```typescript
   * const download = await sdk.analytics.downloadReport(reportId);
   * console.log(`Download URL: ${download.url}`);
   * console.log(`Format: ${download.format}`);
   * ```
   */
  async downloadReport(reportId: string): Promise<{ url: string; format: string; expiresAt?: string }> {
    const info = await this.getReport(reportId);

    if (info.status !== 'completed') {
      throw new ValidationError(
        `Report is not ready for download. Current status: ${info.status}`,
        { status: `Report status is ${info.status}, expected 'completed'` }
      );
    }

    if (!info.downloadUrl) {
      throw new ValidationError(
        'Report is completed but download URL is not available',
        { downloadUrl: 'Download URL is not available' }
      );
    }

    return {
      url: info.downloadUrl,
      format: info.format,
      expiresAt: info.expiresAt,
    };
  }

  /**
   * Get historical stock level changes for a product
   *
   * Retrieves complete stock history showing all stock level changes over time,
   * including the reason for each change (sales, returns, adjustments, transfers,
   * damaged goods, lost inventory).
   *
   * Use this data for:
   * - Inventory trend analysis
   * - Stock velocity calculations (average daily sales)
   * - Restock date predictions
   * - Identifying slow-moving inventory
   * - Tracking warehouse transfers and adjustments
   *
   * Rate limit: 10 requests per minute
   *
   * @param productId - Product article number (nmID) or vendor code
   * @param dateRange - Date range for stock history (max 90 days recommended)
   * @returns Promise resolving to stock changes with time-series summary
   * @throws {ValidationError} When productId is empty or dateRange is invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded (10 requests/minute)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Get stock history for product
   * const history = await sdk.analytics.getStockHistory(
   *   'prod_123',
   *   { from: '2024-01-01', to: '2024-12-31' }
   * );
   *
   * console.log('Stock Changes:', history.changes.length);
   * console.log('Starting Stock:', history.summary.startingStock);
   * console.log('Ending Stock:', history.summary.endingStock);
   * console.log('Net Change:', history.summary.netChange);
   * console.log('Avg Daily Velocity:', history.summary.avgDailyVelocity.toFixed(2), 'units/day');
   *
   * // Analyze stock changes by reason
   * const salesChanges = history.changes.filter(c => c.reason === 'sale');
   * const returnChanges = history.changes.filter(c => c.reason === 'return');
   * console.log(`Sales: ${salesChanges.length}, Returns: ${returnChanges.length}`);
   * ```
   */
  async getStockHistory(
    productId: string,
    dateRange: DateRange
  ): Promise<StockHistoryResponse> {
    // Validate product ID
    if (!productId || productId.trim() === '') {
      throw new ValidationError(
        'Product ID cannot be empty',
        { productId: 'Product ID cannot be empty' }
      );
    }

    // Validate date range
    if (dateRange.from >= dateRange.to) {
      throw new ValidationError(
        'Invalid date range: from date must be before to date',
        { dateRange: 'From date must be before to date' }
      );
    }

    return this.client.get<StockHistoryResponse>(
      `https://seller-analytics-api.wildberries.ru/api/v1/analytics/stock-history/${encodeURIComponent(productId)}`,
      {
        params: {
          dateFrom: dateRange.from,
          dateTo: dateRange.to,
        },
        rateLimitKey: 'analytics.getStockHistory',
      }
    );
  }

  /**
   * Generate CSV export of analytics data (asynchronous)
   *
   * Initiates CSV generation for analytics data. The export is processed
   * asynchronously, returning a report ID immediately. Use getCSVReportStatus()
   * to poll for completion and retrieve the download URL.
   *
   * Supported report types:
   * - `sales_funnel`: Sales conversion funnel data
   * - `product_performance`: Product-level performance metrics
   * - `stock_history`: Historical stock changes
   * - `search_queries`: Search query analytics
   *
   * CSV format options:
   * - Delimiter: comma (`,`), semicolon (`;`), or tab (`\t`)
   * - Headers: Include/exclude column headers
   * - Encoding: UTF-8 or UTF-8 with BOM (for Excel compatibility)
   *
   * Rate limit: 2 requests per minute (stricter due to resource-intensive operation)
   *
   * @param reportType - Type of analytics data to export
   * @param dateRange - Date range for the exported data
   * @param options - Optional CSV formatting options
   * @returns Promise resolving to export status with reportId for tracking
   * @throws {ValidationError} When reportType is invalid or dateRange exceeds limits
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded (2 requests/minute)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Export product performance to CSV for Excel
   * const csvExport = await sdk.analytics.exportAnalyticsCSV(
   *   'product_performance',
   *   { from: '2024-01-01', to: '2024-12-31' },
   *   {
   *     delimiter: ';',           // European Excel format
   *     includeHeaders: true,
   *     encoding: 'utf-8-bom'     // Excel compatibility
   *   }
   * );
   *
   * console.log(`CSV export started: ${csvExport.reportId}`);
   * console.log(`Status: ${csvExport.status}`);
   * console.log(`ETA: ${csvExport.estimatedCompletionTime}`);
   *
   * // Poll for completion (see getCSVReportStatus example)
   * ```
   */
  async exportAnalyticsCSV(
    reportType: AnalyticsReportType,
    dateRange: DateRange,
    options?: CSVFormatOptions
  ): Promise<CSVExportResponse> {
    // Validate report type
    const validTypes: AnalyticsReportType[] = [
      'sales_funnel',
      'product_performance',
      'stock_history',
      'search_queries',
    ];

    if (!validTypes.includes(reportType)) {
      throw new ValidationError(
        `Invalid report type: ${reportType}. Must be one of: ${validTypes.join(', ')}`,
        { reportType: `Invalid type: ${reportType}` }
      );
    }

    // Validate date range
    if (dateRange.from >= dateRange.to) {
      throw new ValidationError(
        'Invalid date range: from date must be before to date',
        { dateRange: 'From date must be before to date' }
      );
    }

    // Build request body with format options
    const requestBody = {
      reportType,
      dateRange,
      delimiter: options?.delimiter ?? ',',
      includeHeaders: options?.includeHeaders ?? true,
      encoding: options?.encoding ?? 'utf-8',
    };

    return this.client.post<CSVExportResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/export/csv',
      requestBody,
      { rateLimitKey: 'analytics.exportCSV' }
    );
  }

  /**
   * Check CSV export status and get download URL
   *
   * Checks the status of a previously initiated CSV export and provides
   * download URL when the report is ready. Poll this endpoint until status
   * becomes 'completed'.
   *
   * Status lifecycle:
   * - `pending`: Export queued, not yet started
   * - `processing`: CSV generation in progress
   * - `completed`: CSV ready for download (downloadUrl available)
   * - `failed`: Export failed (check errorMessage)
   *
   * Download URLs:
   * - Pre-signed URLs (typically S3/CDN)
   * - Expire after 24 hours (check expiresAt field)
   * - Direct file download, not through API
   *
   * Rate limit: 10 requests per minute
   *
   * @param reportId - Report identifier from exportAnalyticsCSV()
   * @returns Promise resolving to CSV report details with download URL if completed
   * @throws {ValidationError} When reportId is invalid
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded (10 requests/minute)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * // Poll for CSV completion
   * const reportId = 'csv_abc123';
   * let csvReport;
   *
   * do {
   *   await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
   *   csvReport = await sdk.analytics.getCSVReportStatus(reportId);
   *   console.log(`Status: ${csvReport.status}`);
   * } while (csvReport.status === 'pending' || csvReport.status === 'processing');
   *
   * if (csvReport.status === 'completed') {
   *   console.log(`Download: ${csvReport.downloadUrl}`);
   *   console.log(`File size: ${csvReport.fileSize} bytes`);
   *   console.log(`Rows: ${csvReport.rowCount}`);
   *   console.log(`Expires: ${csvReport.expiresAt}`);
   * } else {
   *   console.error(`Export failed: ${csvReport.errorMessage}`);
   * }
   * ```
   */
  async getCSVReportStatus(reportId: string): Promise<CSVReport> {
    // Validate report ID
    if (!reportId || reportId.trim() === '') {
      throw new ValidationError(
        'Report ID cannot be empty',
        { reportId: 'Report ID cannot be empty' }
      );
    }

    return this.client.get<CSVReport>(
      `https://seller-analytics-api.wildberries.ru/api/v1/analytics/export/csv/${encodeURIComponent(reportId)}`,
      { rateLimitKey: 'analytics.getCSVReportStatus' }
    );
  }

  /**
   * Get download URL for completed CSV report (helper method)
   *
   * Convenience method that checks report status and returns download details
   * only when the report is completed. Throws ValidationError if report is not ready.
   *
   * Use this when you want to fail fast if the report isn't ready, rather than
   * checking status manually.
   *
   * @param reportId - Report identifier from exportAnalyticsCSV()
   * @returns Promise resolving to CSV report with download URL
   * @throws {ValidationError} When report is not completed or URL is missing
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit is exceeded
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * try {
   *   const csvReport = await sdk.analytics.downloadCSVReport(reportId);
   *   console.log(`Download: ${csvReport.downloadUrl}`);
   *   console.log(`File size: ${csvReport.fileSize} bytes`);
   *
   *   // Download file using HTTP client
   *   // In browser: window.open(csvReport.downloadUrl)
   *   // In Node.js: axios.get(csvReport.downloadUrl, { responseType: 'stream' })
   * } catch (error) {
   *   if (error instanceof ValidationError) {
   *     console.error('Report not ready yet, try again later');
   *   }
   * }
   * ```
   */
  async downloadCSVReport(reportId: string): Promise<CSVReport> {
    const report = await this.getCSVReportStatus(reportId);

    if (report.status !== 'completed') {
      throw new ValidationError(
        `CSV report not ready. Current status: ${report.status}`,
        { status: `Report status is ${report.status}, expected 'completed'` }
      );
    }

    if (!report.downloadUrl) {
      throw new ValidationError(
        'CSV report has no download URL',
        { downloadUrl: 'Download URL is missing' }
      );
    }

    return report;
  }

  // ==================== Helper Methods ====================

  /**
   * Calculate return rate percentage
   *
   * @param returns - Number of returns/cancellations
   * @param sales - Number of sales/purchases
   * @returns Return rate as percentage (0-100)
   * @private
   */
  private calculateReturnRate(returns: number, sales: number): number {
    if (sales === 0) return 0;
    return (returns / sales) * 100;
  }

  // NOTE: Stock analysis utilities removed for v1.0 (aggregateStockChanges, calculateStockVelocity, predictRestockDate)
  // These analytics features are planned for v1.1 as public utility methods
  // Track implementation progress in project roadmap
}
