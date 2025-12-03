/**
 * Reports Module - Business reports generation and retrieval
 *
 * @module modules/reports
 */

import type { BaseClient } from '../../client/base-client';
import type {
  IncomesItem,
  StocksItem,
  OrdersItem,
  SalesItem,
  ExciseReportRequest,
  ExciseReportResponse,
  WarehouseRemainsParams,
  ReportTaskResponse,
  ReportStatus,
  ReportType,
  // Task-4.4: Typed parameters
  WarehouseMeasurementsParams,
  IncorrectAttachmentsParams,
  GoodsLabelingParams,
  CharacteristicsChangeParams,
  AcceptanceReportParams,
  PaidStorageReportParams,
  BrandShareParams,
  BannedProductsParams,
  GoodsReturnParams,
  RegionalSalesParams,
  // Task-4.4: Typed responses
  WarehouseMeasurementItem,
  IncorrectAttachmentItem,
  GoodsLabelingItem,
  CharacteristicsChangeItem,
  BrandShareParentSubject,
  BrandShareData,
  BannedProductItem,
  GoodsReturnItem,
  RegionalSalesItem,
} from '../../types/reports.types';

/**
 * ReportsModule - Generate and retrieve various business reports
 *
 * - Basic reports: incomes, stocks, orders, sales (with pagination)
 * - Excise reports: compliance tracking for mandatory labeling
 * - Async reports: warehouse remains with configurable grouping/filtering
 *
 * @example
 * ```typescript
 * const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
 *
 * // Get recent incomes with pagination
 * const incomes = await sdk.reports.getIncomes('2024-01-01');
 *
 * // Create async warehouse remains report
 * const task = await sdk.reports.createWarehouseRemainsReport({
 *   locale: 'ru',
 *   groupByBrand: true
 * });
 * ```
 */
export class ReportsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get inbound shipment data from warehouses
   *
   * Supports pagination for large datasets (up to 100,000 rows per request).
   *
   * **Pagination Strategy**:
   * 1. Make initial request with desired dateFrom
   * 2. Check if response length equals 100,000 (indicates more data)
   * 3. Use lastChangeDate from last row as dateFrom in next request
   * 4. Continue until response is empty array []
   *
   * **Date Format**: RFC3339 in Moscow timezone (UTC+3)
   * - Date only: `2019-06-20`
   * - Date with time: `2019-06-20T23:59:59`
   * - With milliseconds: `2019-06-20T00:00:00.12345`
   *
   * @param dateFrom - RFC3339 date/datetime for last change (Moscow UTC+3)
   * @param flag - Optional filter mode:
   *   - 0 or undefined: All changes since dateFrom (default)
   *   - 1: Only new records
   *
   * @returns Promise resolving to array of IncomesItem (max 100,000 rows)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {ValidationError} When dateFrom format is invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * // Fetch all incomes with pagination
   * let allIncomes: IncomesItem[] = [];
   * let dateFrom = '2024-01-01';
   *
   * while (true) {
   *   const incomes = await sdk.reports.getIncomes(dateFrom);
   *   if (incomes.length === 0) break;
   *
   *   allIncomes = allIncomes.concat(incomes);
   *   console.log(`Fetched ${incomes.length} incomes, total: ${allIncomes.length}`);
   *
   *   // Use lastChangeDate from last row for next request
   *   dateFrom = incomes[incomes.length - 1].lastChangeDate;
   *
   *   // Check if we hit the 100K limit
   *   if (incomes.length < 100000) break;
   * }
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1incomes/get}
   */
  async getIncomes(dateFrom: string, flag?: number): Promise<IncomesItem[]> {
    const params: Record<string, string | number> = { dateFrom };
    if (flag !== undefined) {
      params.flag = flag;
    }

    return this.client.get<IncomesItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/incomes',
      { params, rateLimitKey: 'reports.getIncomes' }
    );
  }

  /**
   * Get current stock levels across WB warehouses
   *
   * Data is updated every 30 minutes. Maximum 60,000 rows per response.
   *
   * **Stock Quantity Fields**:
   * - `quantity`: Available stock in warehouse (can be added to cart)
   * - `inWayToClient`: In transit to customer
   * - `inWayFromClient`: In transit from customer (returns)
   * - `quantityFull`: Total quantity (quantity + inWayToClient + inWayFromClient)
   *
   * **For Full Stock Snapshot**: Use early date like `2019-06-20` to get all current stock
   *
   * **Pagination Strategy**: Same as getIncomes(), use lastChangeDate from last row
   *
   * @param dateFrom - RFC3339 date/datetime (use early date like 2019-06-20 for full snapshot)
   *
   * @returns Promise resolving to array of StocksItem with quantity breakdown (max 60,000 rows)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {ValidationError} When dateFrom format is invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * // Get current stock snapshot
   * const stocks = await sdk.reports.getStocks('2019-01-01');
   *
   * // Analyze stock levels
   * let totalAvailable = 0;
   * let totalInTransit = 0;
   *
   * stocks.forEach(stock => {
   *   totalAvailable += stock.quantity;
   *   totalInTransit += stock.inWayToClient + stock.inWayFromClient;
   * });
   *
   * console.log(`Available: ${totalAvailable}`);
   * console.log(`In Transit: ${totalInTransit}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1stocks/get}
   */
  async getStocks(dateFrom: string): Promise<StocksItem[]> {
    return this.client.get<StocksItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/stocks',
      { params: { dateFrom }, rateLimitKey: 'reports.getStocks' }
    );
  }

  /**
   * Get order information for all customer orders
   *
   * Maximum 80,000 rows per response.
   *
   * **Important Notes**:
   * - 1 row = 1 order = 1 assembly task = 1 product unit
   * - Use `srid` field for unique order identification
   * - `isCancel` field indicates canceled orders (with cancelDate)
   * - Data retention: 90 days from order creation
   *
   * **Pagination Strategy**: Use lastChangeDate from last row, 80,000 row limit
   *
   * @param dateFrom - RFC3339 date/datetime for last change
   * @param flag - Optional filter mode:
   *   - 0 or undefined: All changes since dateFrom (default)
   *   - 1: Only new records
   *
   * @returns Promise resolving to array of OrdersItem (max 80,000 rows)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {ValidationError} When dateFrom format is invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * // Get recent orders and track cancellations
   * const orders = await sdk.reports.getOrders('2024-01-01', 1);
   *
   * const canceledOrders = orders.filter(o => o.isCancel);
   * console.log(`Canceled: ${canceledOrders.length} / ${orders.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1orders/get}
   */
  async getOrders(dateFrom: string, flag?: number): Promise<OrdersItem[]> {
    const params: Record<string, string | number> = { dateFrom };
    if (flag !== undefined) {
      params.flag = flag;
    }

    return this.client.get<OrdersItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/orders',
      { params, rateLimitKey: 'reports.getOrders' }
    );
  }

  /**
   * Get sales and returns data
   *
   * Data is updated every 30 minutes with 90-day retention.
   * Maximum 80,000 rows per response.
   *
   * **Payment Fields**:
   * - `paymentSaleAmount`: Payment from sale (negative for returns)
   * - `forPay`: Amount to be paid to seller
   * - `saleID`: Unique sale identifier (S********** = sale, R********** = return)
   *
   * **Returns Detection**: Negative `paymentSaleAmount` indicates return
   *
   * @param dateFrom - RFC3339 date/datetime for last change
   * @param flag - Optional filter mode:
   *   - 0 or undefined: All changes since dateFrom (default)
   *   - 1: Only new records
   *
   * @returns Promise resolving to array of SalesItem with payment info (max 80,000 rows)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {ValidationError} When dateFrom format is invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * // Calculate revenue and returns
   * const sales = await sdk.reports.getSales('2024-01-01');
   *
   * let totalRevenue = 0;
   * let totalReturns = 0;
   *
   * sales.forEach(sale => {
   *   if (sale.paymentSaleAmount > 0) {
   *     totalRevenue += sale.forPay;
   *   } else {
   *     totalReturns += Math.abs(sale.forPay);
   *   }
   * });
   *
   * console.log(`Revenue: ${totalRevenue}`);
   * console.log(`Returns: ${totalReturns}`);
   * console.log(`Net: ${totalRevenue - totalReturns}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1sales/get}
   */
  async getSales(dateFrom: string, flag?: number): Promise<SalesItem[]> {
    const params: Record<string, string | number> = { dateFrom };
    if (flag !== undefined) {
      params.flag = flag;
    }

    return this.client.get<SalesItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/sales',
      { params, rateLimitKey: 'reports.getSales' }
    );
  }

  /**
   * Get report on goods with mandatory labeling (excise goods)
   *
   * Used for tracking labeling operations and regulatory compliance.
   *
   * **Country Codes** (ISO 3166-2):
   * - AM: Armenia
   * - BY: Belarus
   * - KG: Kyrgyzstan
   * - KZ: Kazakhstan
   * - RU: Russia
   * - UZ: Uzbekistan
   *
   * **Operation Types**:
   * - 1: Withdrawal from circulation
   * - 2: Return to circulation
   *
   * @param dateFrom - RFC3339 date for report start
   * @param dateTo - RFC3339 date for report end
   * @param body - Optional filters: countries, brands, inns
   *
   * @returns Promise resolving to ExciseReportResponse with labeling operations
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (10 req/5hrs)
   * @throws {ValidationError} When date format or parameters invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * // Get excise report for Russia
   * const report = await sdk.reports.getExciseReport(
   *   '2024-01-01',
   *   '2024-01-31',
   *   { countries: ['RU'] }
   * );
   *
   * console.log(`Operations tracked: ${report.response.data.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-po-markirovke-tovarov/paths/~1api~1v1~1analytics~1excise-report/post}
   */
  async getExciseReport(
    dateFrom: string,
    dateTo: string,
    body?: ExciseReportRequest
  ): Promise<ExciseReportResponse> {
    return this.client.post<ExciseReportResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report',
      body ?? {},
      {
        params: { dateFrom, dateTo },
        rateLimitKey: 'reports.getExciseReport',
      }
    );
  }

  /**
   * Create async task to generate warehouse remains report
   *
   * Returns taskId for status checking and download.
   *
   * **Async Workflow**:
   * 1. Create task with this method (get taskId)
   * 2. Poll status with checkReportStatus() every 5-10 seconds
   * 3. Download with downloadReport() when status is 'done'
   *
   * **Locale Options**:
   * - ru: Russian (default)
   * - en: English
   * - zh: Chinese (warehouseName in English)
   *
   * **GroupBy Options**: groupByBrand, groupBySubject, groupBySa, groupBySize, groupByNm, groupByBarcode
   *
   * **Filter Options**: filterPics (-1/0/1), filterVolume (-1/0/3)
   *
   * @param params - Report configuration with locale, groupBy options, and filters
   *
   * @returns Promise resolving to ReportTaskResponse with taskId
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min, burst 5)
   * @throws {ValidationError} When parameters are invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * // Create report with brand and subject grouping
   * const task = await sdk.reports.createWarehouseRemainsReport({
   *   locale: 'ru',
   *   groupByBrand: true,
   *   groupBySubject: true
   * });
   *
   * console.log(`Task created: ${task.data.taskId}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains/get}
   */
  async createWarehouseRemainsReport(params: WarehouseRemainsParams): Promise<ReportTaskResponse> {
    return this.client.get<ReportTaskResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains',
      { params, rateLimitKey: 'reports.createWarehouseRemainsReport' }
    );
  }

  /**
   * Check async report generation status
   *
   * Poll every 5-10 seconds until status is 'done' or 'error'.
   *
   * **Status Values**:
   * - new: Queued
   * - processing: Generating report
   * - done: Ready for download
   * - error: Generation failed (check error field)
   * - purged: Report deleted
   * - canceled: Task canceled
   *
   * **Polling Strategy**: Check every 5-10 seconds until 'done' or 'error'
   *
   * @param taskId - Task ID from createWarehouseRemainsReport()
   * @param reportType - Type of report being generated
   *
   * @returns Promise resolving to ReportStatus with current status
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/5s, burst 5)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * // Poll status until done
   * let status: ReportStatus;
   * do {
   *   await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
   *
   *   status = await sdk.reports.checkReportStatus(
   *     taskId,
   *     'warehouse_remains'
   *   );
   *
   *   console.log(`Status: ${status.data.status}`);
   * } while (status.data.status === 'new' || status.data.status === 'processing');
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1status/get}
   */
  async checkReportStatus(taskId: string, reportType: ReportType): Promise<ReportStatus> {
    const endpoints: Record<ReportType, string> = {
      warehouse_remains: 'warehouse_remains',
      acceptance: 'acceptance_report',
      paid_storage: 'paid_storage',
    };

    const endpoint = endpoints[reportType];

    return this.client.get<ReportStatus>(
      `https://seller-analytics-api.wildberries.ru/api/v1/${endpoint}/tasks/${taskId}/status`,
      { rateLimitKey: `reports.checkReportStatus.${reportType}` }
    );
  }

  /**
   * Download completed async report
   *
   * Report format is Excel (.xlsx) file with tabular data.
   *
   * **Prerequisites**: Task status must be 'done' before downloading
   *
   * **Report Format**: Excel (.xlsx) file
   *
   * @param taskId - Task ID from createWarehouseRemainsReport()
   * @param reportType - Type of report to download
   *
   * @returns Promise resolving to Blob (report file data)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * // Download and save report
   * const reportBlob = await sdk.reports.downloadReport(
   *   taskId,
   *   'warehouse_remains'
   * );
   *
   * // Save to file (Node.js)
   * const fs = require('fs');
   * const buffer = await reportBlob.arrayBuffer();
   * fs.writeFileSync('warehouse_remains.xlsx', Buffer.from(buffer));
   *
   * console.log('Report downloaded: warehouse_remains.xlsx');
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get}
   */
  async downloadReport(taskId: string, reportType: ReportType): Promise<Blob> {
    const endpoints: Record<ReportType, string> = {
      warehouse_remains: 'warehouse_remains',
      acceptance: 'acceptance_report',
      paid_storage: 'paid_storage',
    };

    const endpoint = endpoints[reportType];

    return this.client.get<Blob>(
      `https://seller-analytics-api.wildberries.ru/api/v1/${endpoint}/tasks/${taskId}/download`,
      {
        rateLimitKey: `reports.downloadReport.${reportType}`,
        responseType: 'blob',
      }
    );
  }

  // ==================== Warehouse Remains Report (Async Task) ====================

  /**
   * Check warehouse remains report generation status
   *
   * Poll every 5-10 seconds until status is 'done' or 'error'.
   *
   * **Status Values**: new, processing, done, error, purged, canceled
   *
   * @param taskId - Task ID from createWarehouseRemainsReport()
   *
   * @returns Promise resolving to ReportStatus with current status
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/5s)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * const status = await sdk.reports.getWarehouseRemainsReportStatus(taskId);
   * console.log(`Status: ${status.data.status}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1status/get}
   */
  async getWarehouseRemainsReportStatus(taskId: string): Promise<ReportStatus> {
    return this.client.get<ReportStatus>(
      `https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/${taskId}/status`,
      { rateLimitKey: 'reports.getWarehouseRemainsReportStatus' }
    );
  }

  /**
   * Download completed warehouse remains report
   *
   * Report format is Excel (.xlsx) file with warehouse remains data.
   *
   * **Prerequisites**: Task status must be 'done' before downloading
   *
   * @param taskId - Task ID from createWarehouseRemainsReport()
   *
   * @returns Promise resolving to Blob (report file data)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * const reportBlob = await sdk.reports.downloadWarehouseRemainsReport(taskId);
   * // Save to file...
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get}
   */
  async downloadWarehouseRemainsReport(taskId: string): Promise<Blob> {
    return this.client.get<Blob>(
      `https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/${taskId}/download`,
      {
        rateLimitKey: 'reports.downloadWarehouseRemainsReport',
        responseType: 'blob',
      }
    );
  }

  // ==================== Compliance Reports ====================

  /**
   * Get report on goods with mandatory labeling requirements
   *
   * Used for tracking compliance with Russian marking system (Честный ЗНАК).
   * Maximum 31 days per report. Data available since June 2023.
   *
   * @param params - Date range parameters (dateFrom, dateTo required)
   *
   * @returns Promise resolving to array of labeling items
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const labelingReport = await sdk.reports.getGoodsLabelingReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31'
   * });
   * console.log(`Products requiring labeling: ${labelingReport.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-tovarah-c-obyazatelnoj-markirovkoj}
   */
  async getGoodsLabelingReport(params: GoodsLabelingParams): Promise<GoodsLabelingItem[]> {
    return this.client.get<GoodsLabelingItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-labeling',
      { params, rateLimitKey: 'reports.getGoodsLabelingReport' }
    );
  }

  /**
   * Get report on product characteristics changes
   *
   * Used for tracking product data modifications and compliance.
   * Maximum 31 days per report.
   *
   * @param params - Date range parameters (dateFrom, dateTo required)
   *
   * @returns Promise resolving to array of characteristic change records
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const changes = await sdk.reports.getCharacteristicsChangeReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31'
   * });
   * console.log(`Characteristics changes: ${changes.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah}
   */
  async getCharacteristicsChangeReport(
    params: CharacteristicsChangeParams
  ): Promise<CharacteristicsChangeItem[]> {
    return this.client.get<CharacteristicsChangeItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/characteristics-change',
      { params, rateLimitKey: 'reports.getCharacteristicsChangeReport' }
    );
  }

  /**
   * Get antifraud system details report
   *
   * Used for tracking fraud prevention measures and blocked operations.
   *
   * @param params - Optional query parameters for filtering
   *
   * @returns Promise resolving to antifraud details
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const antifraud = await sdk.reports.getAntifraudDetailsReport();
   * console.log(`Antifraud records: ${antifraud.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah}
   */
  async getAntifraudDetailsReport(params?: Record<string, unknown>): Promise<unknown[]> {
    return this.client.get<unknown[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/antifraud-details',
      { params, rateLimitKey: 'reports.getAntifraudDetailsReport' }
    );
  }

  /**
   * Get report on incorrect product attachments (penalties for wrong items)
   *
   * Returns penalties for sending wrong items, empty boxes, or boxes with foreign objects.
   * 100% of order cost is charged in such cases.
   * Maximum 31 days per report. Data available since June 2023.
   *
   * @param params - Date range parameters (dateFrom, dateTo required)
   *
   * @returns Promise resolving to array of incorrect attachment penalty records
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const incorrect = await sdk.reports.getIncorrectAttachmentsReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31'
   * });
   * console.log(`Penalties for incorrect attachments: ${incorrect.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah}
   */
  async getIncorrectAttachmentsReport(
    params: IncorrectAttachmentsParams
  ): Promise<IncorrectAttachmentItem[]> {
    return this.client.get<IncorrectAttachmentItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/incorrect-attachments',
      { params, rateLimitKey: 'reports.getIncorrectAttachmentsReport' }
    );
  }

  // ==================== Warehouse Operations ====================

  /**
   * Get warehouse measurements report (packaging dimension penalties)
   *
   * Returns reports on penalties for underestimated packaging dimensions
   * and warehouse measurements.
   *
   * @param params - Required parameters:
   *   - dateTo: End date (required)
   *   - tab: 'penalty' | 'measurement' (required)
   *   - dateFrom: Start date (optional, defaults to first data date)
   *   - limit: Number of records (optional, default: 1000)
   *
   * @returns Promise resolving to warehouse measurements/penalty data
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (5 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const measurements = await sdk.reports.getWarehouseMeasurementsReport({
   *   dateTo: '2024-01-31T23:59:59Z',
   *   tab: 'penalty',
   *   limit: 500
   * });
   * console.log(`Penalty records: ${measurements.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah}
   */
  async getWarehouseMeasurementsReport(
    params: WarehouseMeasurementsParams
  ): Promise<WarehouseMeasurementItem[]> {
    return this.client.get<WarehouseMeasurementItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/warehouse-measurements',
      { params, rateLimitKey: 'reports.getWarehouseMeasurementsReport' }
    );
  }

  // ==================== Acceptance Report (Async Task) ====================

  /**
   * Create async task to generate acceptance report
   *
   * Returns taskId for status checking and download.
   * Maximum 31 days per report.
   *
   * **Async Workflow**:
   * 1. Create task with this method (get taskId)
   * 2. Poll status with getAcceptanceReportStatus() every 5-10 seconds
   * 3. Download with downloadAcceptanceReport() when status is 'done'
   *
   * @param params - Date range parameters (dateFrom, dateTo required)
   *
   * @returns Promise resolving to ReportTaskResponse with taskId
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {ValidationError} When parameters are invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const task = await sdk.reports.requestAcceptanceReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31'
   * });
   * console.log(`Task created: ${task.data.taskId}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka}
   */
  async requestAcceptanceReport(params: AcceptanceReportParams): Promise<ReportTaskResponse> {
    return this.client.get<ReportTaskResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report',
      { params, rateLimitKey: 'reports.requestAcceptanceReport' }
    );
  }

  /**
   * Check acceptance report generation status
   *
   * Poll every 5-10 seconds until status is 'done' or 'error'.
   *
   * **Status Values**: new, processing, done, error, purged, canceled
   *
   * @param taskId - Task ID from requestAcceptanceReport()
   *
   * @returns Promise resolving to ReportStatus with current status
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/5s)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * const status = await sdk.reports.getAcceptanceReportStatus(taskId);
   * console.log(`Status: ${status.data.status}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka}
   */
  async getAcceptanceReportStatus(taskId: string): Promise<ReportStatus> {
    return this.client.get<ReportStatus>(
      `https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/${taskId}/status`,
      { rateLimitKey: 'reports.getAcceptanceReportStatus' }
    );
  }

  /**
   * Download completed acceptance report
   *
   * Report format is Excel (.xlsx) file with acceptance fee details.
   *
   * **Prerequisites**: Task status must be 'done' before downloading
   *
   * @param taskId - Task ID from requestAcceptanceReport()
   *
   * @returns Promise resolving to Blob (report file data)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * const reportBlob = await sdk.reports.downloadAcceptanceReport(taskId);
   * // Save to file...
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka}
   */
  async downloadAcceptanceReport(taskId: string): Promise<Blob> {
    return this.client.get<Blob>(
      `https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/${taskId}/download`,
      {
        rateLimitKey: 'reports.downloadAcceptanceReport',
        responseType: 'blob',
      }
    );
  }

  // ==================== Paid Storage Report (Async Task) ====================

  /**
   * Create async task to generate paid storage report
   *
   * Returns taskId for status checking and download.
   * Maximum 8 days per report.
   *
   * **Async Workflow**:
   * 1. Create task with this method (get taskId)
   * 2. Poll status with getPaidStorageReportStatus() every 5-10 seconds
   * 3. Download with downloadPaidStorageReport() when status is 'done'
   *
   * @param params - Date range parameters (dateFrom, dateTo required)
   *
   * @returns Promise resolving to ReportTaskResponse with taskId
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {ValidationError} When parameters are invalid
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const task = await sdk.reports.requestPaidStorageReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-08'
   * });
   * console.log(`Task created: ${task.data.taskId}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie}
   */
  async requestPaidStorageReport(params: PaidStorageReportParams): Promise<ReportTaskResponse> {
    return this.client.get<ReportTaskResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage',
      { params, rateLimitKey: 'reports.requestPaidStorageReport' }
    );
  }

  /**
   * Check paid storage report generation status
   *
   * Poll every 5-10 seconds until status is 'done' or 'error'.
   *
   * **Status Values**: new, processing, done, error, purged, canceled
   *
   * @param taskId - Task ID from requestPaidStorageReport()
   *
   * @returns Promise resolving to ReportStatus with current status
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/5s)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * const status = await sdk.reports.getPaidStorageReportStatus(taskId);
   * console.log(`Status: ${status.data.status}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie}
   */
  async getPaidStorageReportStatus(taskId: string): Promise<ReportStatus> {
    return this.client.get<ReportStatus>(
      `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/status`,
      { rateLimitKey: 'reports.getPaidStorageReportStatus' }
    );
  }

  /**
   * Download completed paid storage report
   *
   * Report format is Excel (.xlsx) file with storage cost details.
   *
   * **Prerequisites**: Task status must be 'done' before downloading
   *
   * @param taskId - Task ID from requestPaidStorageReport()
   *
   * @returns Promise resolving to Blob (report file data)
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network error occurs
   *
   * @example
   * ```typescript
   * const reportBlob = await sdk.reports.downloadPaidStorageReport(taskId);
   * // Save to file...
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie}
   */
  async downloadPaidStorageReport(taskId: string): Promise<Blob> {
    return this.client.get<Blob>(
      `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${taskId}/download`,
      {
        rateLimitKey: 'reports.downloadPaidStorageReport',
        responseType: 'blob',
      }
    );
  }

  // ==================== Analytics Reports ====================

  /**
   * Get sales by region report
   *
   * Returns sales data grouped by regions and countries.
   *
   * @param params - Date range parameters (dateFrom, dateTo required)
   *
   * @returns Promise resolving to array of regional sales data
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const regionalSales = await sdk.reports.getRegionalSalesReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31'
   * });
   * regionalSales.forEach(region => {
   *   console.log(`${region.region}: ${region.salesCount} sales`);
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Prodazhi-po-regionam}
   */
  async getRegionalSalesReport(params: RegionalSalesParams): Promise<RegionalSalesItem[]> {
    return this.client.get<RegionalSalesItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/region-sale',
      { params, rateLimitKey: 'reports.getRegionalSalesReport' }
    );
  }

  /**
   * Get list of brands for brand share analysis
   *
   * Used as prerequisite for getBrandShareReport().
   *
   * @returns Promise resolving to array of brand information
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const brands = await sdk.reports.getBrandsForBrandShare();
   * console.log(`Available brands: ${brands.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah}
   */
  async getBrandsForBrandShare(): Promise<unknown[]> {
    return this.client.get<unknown[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/brands',
      { rateLimitKey: 'reports.getBrandsForBrandShare' }
    );
  }

  /**
   * Get list of parent subjects (categories) for brand share analysis
   *
   * Used as prerequisite for getBrandShareReport() to get available category IDs.
   *
   * @returns Promise resolving to array of category information
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const categories = await sdk.reports.getParentSubjectsForBrandShare();
   * console.log(`Available categories: ${categories.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah}
   */
  async getParentSubjectsForBrandShare(): Promise<BrandShareParentSubject[]> {
    return this.client.get<BrandShareParentSubject[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/parent-subjects',
      { rateLimitKey: 'reports.getParentSubjectsForBrandShare' }
    );
  }

  /**
   * Get brand market share report
   *
   * Shows brand performance relative to category market.
   * Maximum 365 days per report. Data available since November 1, 2022.
   *
   * @param params - Required parameters:
   *   - parentId: Parent category ID (required)
   *   - brand: Brand name (required)
   *   - dateFrom: Start date (optional)
   *   - dateTo: End date (optional)
   *
   * @returns Promise resolving to brand share data
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/5s)
   * @throws {ValidationError} When required parameters missing
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const shareReport = await sdk.reports.getBrandShareReport({
   *   parentId: 123,
   *   brand: 'MyBrand',
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31'
   * });
   * console.log(`Market share: ${shareReport.brandShare}%`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah}
   */
  async getBrandShareReport(params: BrandShareParams): Promise<BrandShareData> {
    return this.client.get<BrandShareData>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share',
      { params, rateLimitKey: 'reports.getBrandShareReport' }
    );
  }

  /**
   * Get blocked products report
   *
   * Returns list of blocked product cards with block reasons.
   *
   * @param params - Optional sorting parameters:
   *   - sort: Field to sort by
   *   - order: 'asc' | 'desc'
   *
   * @returns Promise resolving to array of blocked products
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const blocked = await sdk.reports.getBlockedProductsReport({
   *   sort: 'date',
   *   order: 'desc'
   * });
   * console.log(`Blocked products: ${blocked.length}`);
   * blocked.forEach(product => {
   *   console.log(`Product ${product.nmId}: ${product.reason}`);
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary}
   */
  async getBlockedProductsReport(params?: BannedProductsParams): Promise<BannedProductItem[]> {
    return this.client.get<BannedProductItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/blocked',
      { params, rateLimitKey: 'reports.getBlockedProductsReport' }
    );
  }

  /**
   * Get shadowed (hidden) products report
   *
   * Returns list of products hidden from catalog with reasons.
   *
   * @param params - Optional sorting parameters:
   *   - sort: Field to sort by
   *   - order: 'asc' | 'desc'
   *
   * @returns Promise resolving to array of hidden products
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const shadowed = await sdk.reports.getShadowedProductsReport({
   *   order: 'desc'
   * });
   * console.log(`Hidden products: ${shadowed.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary}
   */
  async getShadowedProductsReport(params?: BannedProductsParams): Promise<BannedProductItem[]> {
    return this.client.get<BannedProductItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/shadowed',
      { params, rateLimitKey: 'reports.getShadowedProductsReport' }
    );
  }

  /**
   * Get goods return and movement report
   *
   * Returns data on product returns and movements.
   *
   * @param params - Date range parameters (dateFrom, dateTo required)
   *
   * @returns Promise resolving to array of return/movement records
   *
   * @throws {AuthenticationError} When API key is invalid
   * @throws {RateLimitError} When rate limit exceeded (1 req/min)
   * @throws {NetworkError} When network or server error occurs
   *
   * @example
   * ```typescript
   * const returns = await sdk.reports.getGoodsReturnReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31'
   * });
   * console.log(`Return records: ${returns.length}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov}
   */
  async getGoodsReturnReport(params: GoodsReturnParams): Promise<GoodsReturnItem[]> {
    return this.client.get<GoodsReturnItem[]>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-return',
      { params, rateLimitKey: 'reports.getGoodsReturnReport' }
    );
  }
}
