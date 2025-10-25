/**
 * Finances Module
 * Provides access to Wildberries financial data including balance, transactions, and reports
 *
 * Generated from: wildberries_api_doc/13-finances.yaml
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors/validation-error';
import type {
  BalanceResponse,
  TransactionFilters,
  TransactionListResponse,
  TransactionDetailResponse,
  DocumentCategoriesResponse,
  DocumentsListResponse,
  DocumentListFilters,
  DocumentDownloadRequest,
  DocumentDownloadResponse,
  DocumentsDownloadResponse,
  FinancialReportType,
  ReportFormat,
  DateRange,
  GenerateReportResponse,
  Report,
  ReportDownloadResponse,
  PayoutFilters,
  PayoutListResponse,
  PayoutDetailResponse,
} from '../../types/finances.types';

/**
 * FinancesModule
 *
 * Manages financial operations for Wildberries sellers including:
 * - Balance retrieval
 * - Transaction history
 * - Financial reports
 * - Document management
 *
 * @example
 * ```typescript
 * const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
 *
 * // Get current balance
 * const balance = await sdk.finances.getBalance();
 * console.log(`Available: ${balance.for_withdraw} ${balance.currency}`);
 *
 * // Get transaction history
 * const transactions = await sdk.finances.getTransactions({
 *   dateFrom: '2024-01-01',
 *   dateTo: '2024-01-31',
 *   limit: 100
 * });
 * ```
 */
export class FinancesModule {
  constructor(private client: BaseClient) {}

  /**
   * Get current account balance
   *
   * Retrieves the balance widget data from the seller portal main page,
   * including current balance and amount available for withdrawal.
   *
   * Rate limit: 1 request per minute
   *
   * @returns Promise resolving to balance information
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * const balance = await sdk.finances.getBalance();
   * console.log(`Current: ${balance.current} ${balance.currency}`);
   * console.log(`Available to withdraw: ${balance.for_withdraw} ${balance.currency}`);
   * ```
   */
  async getBalance(): Promise<BalanceResponse> {
    return this.client.get<BalanceResponse>(
      'https://finance-api.wildberries.ru/api/v1/account/balance',
      { rateLimitKey: 'finances.getBalance' }
    );
  }

  /**
   * Get sales report details by period
   *
   * Retrieves detailed sales reports (реализация) with financial transaction data.
   * Data is available from January 29, 2024.
   *
   * The report must be fetched in parts if results exceed 100,000 rows:
   * 1. Start with rrdid=0
   * 2. Use the last rrd_id from response for next request
   * 3. Continue until response is empty []
   *
   * Rate limit: 1 request per minute
   *
   * @param filters - Date range and pagination filters
   * @returns Promise resolving to array of transaction/report items
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request parameters invalid (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get this week's transactions
   * const transactions = await sdk.finances.getTransactions({
   *   dateFrom: '2024-01-15',
   *   dateTo: '2024-01-22',
   *   limit: 10000,
   *   period: 'weekly'
   * });
   *
   * // Paginate through large dataset
   * let allTransactions = [];
   * let rrdid = 0;
   * let hasMore = true;
   *
   * while (hasMore) {
   *   const batch = await sdk.finances.getTransactions({
   *     dateFrom: '2024-01-01',
   *     dateTo: '2024-01-31',
   *     rrdid,
   *     limit: 100000
   *   });
   *
   *   if (batch.length === 0) {
   *     hasMore = false;
   *   } else {
   *     allTransactions.push(...batch);
   *     rrdid = batch[batch.length - 1].rrd_id;
   *   }
   * }
   * ```
   */
  async getTransactions(filters: TransactionFilters): Promise<TransactionListResponse> {
    // Validate required parameters
    if (!filters.dateFrom || !filters.dateTo) {
      throw new ValidationError(
        'Both dateFrom and dateTo are required for transaction queries',
        {
          dateFrom: filters.dateFrom || 'missing',
          dateTo: filters.dateTo || 'missing',
        }
      );
    }

    return this.client.get<TransactionListResponse>(
      'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
      {
        params: filters,
        rateLimitKey: 'finances.getTransactions',
      }
    );
  }

  /**
   * Get single transaction details by ID
   *
   * Retrieves complete details for a specific transaction using its rrd_id.
   * This is a convenience method that filters the transaction list for a specific ID.
   *
   * @param transactionId - Unique transaction ID (rrd_id)
   * @param dateRange - Date range to search within
   * @returns Promise resolving to transaction details
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When transaction ID invalid or not found
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * const transaction = await sdk.finances.getTransactionById(
   *   1232610467,
   *   { dateFrom: '2024-01-01', dateTo: '2024-01-31' }
   * );
   * console.log(`Amount: ${transaction.ppvz_for_pay} ${transaction.currency_name}`);
   * ```
   */
  async getTransactionById(
    transactionId: number,
    dateRange: { dateFrom: string; dateTo: string }
  ): Promise<TransactionDetailResponse> {
    if (!transactionId || transactionId <= 0) {
      throw new ValidationError('Transaction ID must be a positive number', {
        transactionId: String(transactionId),
      });
    }

    // Fetch transactions and find the specific one
    // Note: The API doesn't have a direct endpoint for single transaction,
    // so we filter the list
    const transactions = await this.getTransactions({
      ...dateRange,
      limit: 100000, // Use max limit to ensure we get the transaction
    });

    const transaction = transactions.find((t) => t.rrd_id === transactionId);

    if (!transaction) {
      throw new ValidationError('Transaction not found with the given ID', {
        transactionId: String(transactionId),
        searchRange: JSON.stringify(dateRange),
      });
    }

    return transaction;
  }

  /**
   * Get document categories
   *
   * Retrieves the list of available document categories for filtering documents.
   *
   * Rate limit: 1 request per 10 seconds (burst: 5 requests)
   *
   * @param locale - Language for category titles ('ru', 'en', or 'zh')
   * @returns Promise resolving to document categories
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * const categories = await sdk.finances.getDocumentCategories('ru');
   * categories.data.categories.forEach(cat => {
   *   console.log(`${cat.name}: ${cat.title}`);
   * });
   * ```
   */
  async getDocumentCategories(
    locale: 'ru' | 'en' | 'zh' = 'en'
  ): Promise<DocumentCategoriesResponse> {
    return this.client.get<DocumentCategoriesResponse>(
      'https://documents-api.wildberries.ru/api/v1/documents/categories',
      {
        params: { locale },
        rateLimitKey: 'finances.getDocumentCategories',
      }
    );
  }

  /**
   * Get list of documents
   *
   * Retrieves the seller's document list with optional filtering by date range and category.
   *
   * Rate limit: 1 request per 10 seconds (burst: 5 requests)
   *
   * @param filters - Optional filters for document list
   * @returns Promise resolving to documents list
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get all documents
   * const docs = await sdk.finances.getDocuments();
   *
   * // Filter by date range
   * const recentDocs = await sdk.finances.getDocuments({
   *   beginTime: '2024-07-09',
   *   endTime: '2024-07-15',
   *   sort: 'date',
   *   order: 'desc'
   * });
   * ```
   */
  async getDocuments(filters?: DocumentListFilters): Promise<DocumentsListResponse> {
    return this.client.get<DocumentsListResponse>(
      'https://documents-api.wildberries.ru/api/v1/documents/list',
      {
        params: filters,
        rateLimitKey: 'finances.getDocuments',
      }
    );
  }

  /**
   * Download a single document
   *
   * Downloads a specific document by its service name in the requested format.
   * The document is returned as base64-encoded content.
   *
   * Rate limit: 1 request per 10 seconds (burst: 5 requests)
   *
   * @param serviceName - Unique document ID
   * @param extension - Document format (e.g., 'pdf', 'zip', 'xlsx')
   * @returns Promise resolving to document download response with base64 content
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When document not found or format invalid
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * const doc = await sdk.finances.downloadDocument(
   *   'redeem-notification-44841941',
   *   'zip'
   * );
   *
   * // Decode base64 and save to file
   * const buffer = Buffer.from(doc.data.document, 'base64');
   * fs.writeFileSync(doc.data.fileName, buffer);
   * ```
   */
  async downloadDocument(
    serviceName: string,
    extension: string
  ): Promise<DocumentDownloadResponse> {
    if (!serviceName || !extension) {
      throw new ValidationError('Service name and extension are required', {
        serviceName: serviceName || 'missing',
        extension: extension || 'missing',
      });
    }

    return this.client.get<DocumentDownloadResponse>(
      'https://documents-api.wildberries.ru/api/v1/documents/download',
      {
        params: { serviceName, extension },
        rateLimitKey: 'finances.downloadDocument',
      }
    );
  }

  /**
   * Download multiple documents as archive
   *
   * Downloads multiple documents in a single ZIP archive.
   * Maximum 50 documents per request.
   *
   * Rate limit: 1 request per 10 seconds (burst: 5 requests)
   *
   * @param documents - Array of document specifications (max 50 items)
   * @returns Promise resolving to ZIP archive download with base64 content
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request invalid (empty, too many docs, etc)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * const archive = await sdk.finances.downloadDocuments([
   *   { serviceName: 'doc-123', extension: 'pdf' },
   *   { serviceName: 'doc-456', extension: 'xlsx' }
   * ]);
   *
   * // Save the ZIP file
   * const buffer = Buffer.from(archive.data.document, 'base64');
   * fs.writeFileSync('documents.zip', buffer);
   * ```
   */
  async downloadDocuments(
    documents: { serviceName: string; extension: string }[]
  ): Promise<DocumentsDownloadResponse> {
    if (documents.length === 0) {
      throw new ValidationError('At least one document must be specified', {
        count: '0',
      });
    }

    if (documents.length > 50) {
      throw new ValidationError('Maximum 50 documents allowed per request', {
        count: String(documents.length),
        max: '50',
      });
    }

    const requestBody: DocumentDownloadRequest = {
      params: documents,
    };

    return this.client.post<DocumentsDownloadResponse>(
      'https://documents-api.wildberries.ru/api/v1/documents/download/all',
      requestBody,
      { rateLimitKey: 'finances.downloadDocuments' }
    );
  }

  // ============================================================================
  // Financial Reports Methods (Story 3.2)
  // ============================================================================

  /**
   * Get financial report for specified date range
   *
   * Convenience method that retrieves financial transaction data (реализация) for the specified period.
   * This is an alias for getTransactions() providing a more intuitive name for financial reporting use cases.
   *
   * The report includes detailed sales transactions, commissions, fees, and financial settlements.
   * For large datasets (>100,000 rows), results must be fetched in parts using rrdid pagination.
   *
   * Rate limit: 1 request per minute
   *
   * @param filters - Date range filters (dateFrom and dateTo required)
   * @returns Promise resolving to array of financial transactions
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request parameters invalid (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get Q1 financial report
   * const report = await sdk.finances.getFinancialReport({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-03-31'
   * });
   *
   * console.log(`Total transactions: ${report.length}`);
   * report.forEach(transaction => {
   *   console.log(`${transaction.date}: ${transaction.ppvz_for_pay} ${transaction.currency_name}`);
   * });
   * ```
   */
  async getFinancialReport(filters: { dateFrom: string; dateTo: string }): Promise<TransactionListResponse> {
    // Validate required parameters
    if (!filters.dateFrom || !filters.dateTo) {
      throw new ValidationError(
        'Both dateFrom and dateTo are required for financial report queries',
        {
          dateFrom: filters.dateFrom || 'missing',
          dateTo: filters.dateTo || 'missing',
        }
      );
    }

    // Delegate to getTransactions with the date range filters
    return this.getTransactions(filters);
  }

  /**
   * Generate financial report for specified period
   *
   * Initiates asynchronous report generation. The report is generated in the background
   * and the method returns immediately with a report ID and status.
   *
   * To get the completed report:
   * 1. Call this method to initiate generation (returns reportId with 'pending' status)
   * 2. Poll getReport(reportId) until status becomes 'completed'
   * 3. Use downloadReport(reportId) to get the download URL
   *
   * Rate limit: 2 requests per minute (resource-intensive operation)
   *
   * @param reportType - Type of report (sales_summary, tax_report, commission_breakdown, detailed_transactions)
   * @param dateRange - Date range for report data (from/to dates)
   * @param format - Optional output format (defaults to PDF)
   * @returns Promise resolving to report generation status with reportId
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request parameters invalid (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Generate sales summary report for Q1
   * const reportGen = await sdk.finances.generateReport(
   *   'sales_summary',
   *   { from: '2024-01-01', to: '2024-03-31' },
   *   'pdf'
   * );
   * console.log(`Report generation started: ${reportGen.reportId}`);
   * console.log(`Status: ${reportGen.status}`);
   *
   * // Poll for completion
   * let report;
   * do {
   *   await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds
   *   report = await sdk.finances.getReport(reportGen.reportId);
   * } while (report.status !== 'completed' && report.status !== 'failed');
   * ```
   */
  async generateReport(
    reportType: FinancialReportType,
    dateRange: DateRange,
    format: ReportFormat = 'pdf'
  ): Promise<GenerateReportResponse> {
    // Validate date range
    const fromDate = typeof dateRange.from === 'string' ? new Date(dateRange.from) : dateRange.from;
    const toDate = typeof dateRange.to === 'string' ? new Date(dateRange.to) : dateRange.to;

    if (fromDate >= toDate) {
      throw new ValidationError('dateFrom must be before dateTo', {
        dateFrom: dateRange.from.toString(),
        dateTo: dateRange.to.toString(),
      });
    }

    return this.client.post<GenerateReportResponse>(
      'https://finance-api.wildberries.ru/api/v1/reports/generate',
      {
        reportType,
        dateRange: {
          from: typeof dateRange.from === 'string' ? dateRange.from : dateRange.from.toISOString(),
          to: typeof dateRange.to === 'string' ? dateRange.to : dateRange.to.toISOString(),
        },
        format,
      },
      { rateLimitKey: 'finances.generateReport' }
    );
  }

  /**
   * Get report status and download URL
   *
   * Retrieves current status and details for a report. When status is 'completed',
   * the response includes a download URL that expires after a certain period.
   *
   * Report lifecycle:
   * - 'pending': Report generation queued
   * - 'processing': Report being generated
   * - 'completed': Report ready, download URL available
   * - 'failed': Report generation failed (check error field)
   *
   * Note: Download URLs typically expire after 24 hours.
   *
   * Rate limit: 10 requests per minute
   *
   * @param reportId - Report identifier from generateReport()
   * @returns Promise resolving to report details with download URL if completed
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When report ID invalid or not found (404)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Check report status
   * const report = await sdk.finances.getReport('rpt_abc123');
   *
   * if (report.status === 'completed') {
   *   console.log(`Download URL: ${report.url}`);
   *   console.log(`Expires at: ${report.expiresAt}`);
   * } else if (report.status === 'failed') {
   *   console.error(`Report failed: ${report.error}`);
   * } else {
   *   console.log(`Report ${report.status}... please wait`);
   * }
   * ```
   */
  async getReport(reportId: string): Promise<Report> {
    if (!reportId.trim()) {
      throw new ValidationError('Report ID cannot be empty', {
        reportId: reportId || 'empty',
      });
    }

    return this.client.get<Report>(
      `https://finance-api.wildberries.ru/api/v1/reports/${reportId}`,
      { rateLimitKey: 'finances.getReport' }
    );
  }

  /**
   * Get download URL for completed report
   *
   * Convenience method that validates the report is ready before returning the download URL.
   * Throws an error if the report is not yet completed.
   *
   * @param reportId - Report identifier
   * @returns Download URL with expiration info
   * @throws {ValidationError} If report not completed (pending, processing, or failed)
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * try {
   *   const download = await sdk.finances.downloadReport('rpt_abc123');
   *   console.log(`Download from: ${download.url}`);
   *   console.log(`Format: ${download.format}`);
   *   console.log(`URL expires: ${download.expiresAt}`);
   * } catch (error) {
   *   if (error instanceof ValidationError) {
   *     console.log('Report not ready yet, try again later');
   *   }
   * }
   * ```
   */
  async downloadReport(reportId: string): Promise<ReportDownloadResponse> {
    const report = await this.getReport(reportId);

    if (report.status !== 'completed') {
      throw new ValidationError(
        `Report not ready for download. Current status: ${report.status}`,
        {
          reportId,
          status: report.status,
          error: report.error ?? 'none',
        }
      );
    }

    if (!report.url || !report.expiresAt) {
      throw new ValidationError('Report completed but download URL not available', {
        reportId,
        status: report.status,
      });
    }

    return {
      url: report.url,
      format: report.format,
      expiresAt: report.expiresAt,
    };
  }

  // ============================================================================
  // Payouts Methods (Story 3.2)
  // ============================================================================

  /**
   * Get payout history with optional filtering
   *
   * Retrieves paginated list of payouts with optional filters for date range,
   * status, and bank account. Includes pagination support for large datasets.
   *
   * Payout statuses:
   * - 'pending': Payout scheduled
   * - 'processing': Transfer in progress
   * - 'completed': Successfully transferred
   * - 'failed': Transfer failed
   * - 'cancelled': Payout cancelled
   *
   * Rate limit: 10 requests per minute
   *
   * @param filters - Optional filters for date range, status, bank account, pagination
   * @returns Promise resolving to paginated payout list
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When filter parameters invalid (400)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get all completed payouts from last month
   * const payouts = await sdk.finances.getPayouts({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31',
   *   status: 'completed',
   *   limit: 50
   * });
   *
   * console.log(`Found ${payouts.data.length} payouts`);
   * payouts.data.forEach(payout => {
   *   console.log(`${payout.date}: ${payout.amount} ${payout.currency}`);
   * });
   *
   * // Paginate through results
   * if (payouts.pagination?.hasMore) {
   *   const nextPage = await sdk.finances.getPayouts({
   *     ...filters,
   *     offset: payouts.pagination.offset + payouts.pagination.limit
   *   });
   * }
   * ```
   */
  async getPayouts(filters?: PayoutFilters): Promise<PayoutListResponse> {
    return this.client.get<PayoutListResponse>(
      'https://finance-api.wildberries.ru/api/v1/payouts',
      {
        params: filters,
        rateLimitKey: 'finances.getPayouts',
      }
    );
  }

  /**
   * Get single payout details with fee breakdown
   *
   * Retrieves complete payout information including detailed fee breakdown,
   * bank transfer information, and list of transactions included in the payout.
   *
   * Fee breakdown includes:
   * - Marketplace commission
   * - Payment processing fee
   * - Total fees deducted
   * - Net amount transferred to seller
   *
   * Rate limit: 20 requests per minute
   *
   * @param payoutId - Unique payout identifier
   * @returns Promise resolving to complete payout details with fee breakdown
   * @throws {AuthenticationError} When API key is invalid (401)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When payout ID invalid or not found (404)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * const payout = await sdk.finances.getPayoutById('payout_xyz789');
   *
   * console.log(`Payout Amount: ${payout.amount} ${payout.currency}`);
   * console.log(`Status: ${payout.status}`);
   * console.log(`\nFee Breakdown:`);
   * console.log(`  Commission: ${payout.feeBreakdown.commission}`);
   * console.log(`  Processing Fee: ${payout.feeBreakdown.processingFee}`);
   * console.log(`  Total Fees: ${payout.feeBreakdown.totalFees}`);
   * console.log(`  Net Amount: ${payout.feeBreakdown.netAmount}`);
   * console.log(`\nBank Transfer:`);
   * console.log(`  Bank: ${payout.bankInfo.bankName}`);
   * console.log(`  Account: ${payout.bankInfo.accountNumber}`);
   * console.log(`  Transfer Date: ${payout.bankInfo.transferDate}`);
   * ```
   */
  async getPayoutById(payoutId: string): Promise<PayoutDetailResponse> {
    if (!payoutId.trim()) {
      throw new ValidationError('Payout ID cannot be empty', {
        payoutId: payoutId || 'empty',
      });
    }

    return this.client.get<PayoutDetailResponse>(
      `https://finance-api.wildberries.ru/api/v1/payouts/${payoutId}`,
      { rateLimitKey: 'finances.getPayoutById' }
    );
  }
}
