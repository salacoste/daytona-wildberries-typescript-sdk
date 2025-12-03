/**
 * Auto-generated TypeScript types for finances module
 * Generated from: wildberries_api_doc/13-finances.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-10-23
 */

/**
 * Balance response from the finance API
 * Returns current account balance information
 */
export interface BalanceResponse {
  /** Currency code (e.g., 'RUB') */
  currency: string;
  /** Current balance amount */
  current: number;
  /** Amount available for withdrawal */
  for_withdraw: number;
}

/**
 * Transaction type enum
 * Represents different types of financial transactions
 */
export type TransactionType =
  | 'sale' // Product sales
  | 'refund' // Customer refunds
  | 'fee' // Platform fees
  | 'payout' // Payouts to seller
  | 'adjustment' // Balance adjustments
  | 'storage' // Storage fees
  | 'logistics'; // Logistics fees

/**
 * Period filter for reports
 */
export type ReportPeriod = 'weekly' | 'daily';

/**
 * Transaction filters for querying transaction history
 */
export interface TransactionFilters {
  /** Start date in RFC3339 format (e.g., '2024-01-01' or '2024-01-01T00:00:00') */
  dateFrom: string;
  /** End date in RFC3339 format */
  dateTo: string;
  /** Maximum number of results to return (max: 100000) */
  limit?: number;
  /** Unique ID for pagination - use rrd_id from last row of previous response */
  rrdid?: number;
  /** Report period: weekly or daily */
  period?: ReportPeriod;
  [key: string]: string | number | undefined;
}

/**
 * Individual transaction/financial report item
 * Represents a single financial transaction in the report
 */
export interface Transaction {
  /** Report number */
  realizationreport_id: number;
  /** Report period start date */
  date_from: string;
  /** Report period end date */
  date_to: string;
  /** Report creation date */
  create_dt: string;
  /** Currency name */
  currency_name: string;
  /** Supplier contract code */
  suppliercontract_code: object | null;
  /** Row number / transaction ID */
  rrd_id: number;
  /** Supply number */
  gi_id: number;
  /** Fixed warehouse coefficient for the supply */
  dlv_prc: number;
  /** Fixed tariff start date */
  fix_tariff_date_from: string;
  /** Fixed tariff end date */
  fix_tariff_date_to: string;
  /** Product subject/category name */
  subject_name: string;
  /** Wildberries article number */
  nm_id: number;
  /** Brand name */
  brand_name: string;
  /** Seller article number */
  sa_name: string;
  /** Technical size */
  ts_name: string;
  /** Barcode */
  barcode: string;
  /** Document type */
  doc_type_name: string;
  /** Quantity */
  quantity: number;
  /** Retail price */
  retail_price: number;
  /** Retail amount */
  retail_amount: number;
  /** Sale percent */
  sale_percent: number;
  /** Commission percent */
  commission_percent: number;
  /** Office name */
  office_name: string;
  /** Supplier operation name */
  supplier_oper_name: string;
  /** Order date */
  order_dt: string;
  /** Sale date */
  sale_dt: string;
  /** Return date */
  rr_dt: string | null;
  /** Shipping cost */
  shk_id: number;
  /** Retail price with discount */
  retail_price_withdisc_rub: number;
  /** Delivery to customer */
  delivery_rub: number;
  /** Delivery return */
  gi_box_type_name: string;
  /** Product discount percent */
  product_discount_for_report: number;
  /** Supplier promo code */
  supplier_promo: number;
  /** Product discount */
  ppvz_kvw_prc_base_date: string | null;
  /** Logistics cost */
  ppvz_kvw_prc: number;
  /** Penalty */
  ppvz_sales_commission: number;
  /** Payment to supplier */
  ppvz_for_pay: number;
  /** Supplier reward */
  ppvz_reward: number;
  /** Acquiring */
  acquiring_fee: number;
  /** Bank acquiring percent */
  acquiring_percent: number;
  /** Acquiring fee */
  acquiring_bank: string;
  /** Payment number */
  ppvz_vw: number;
  /** Payment number VW NDS */
  ppvz_vw_nds: number;
  /** Stock ID */
  stock_id: number | null;
  /** Operation type */
  supplier_oper_id: string;
  /** Country */
  country_name: string;
  /** Bonus for sale */
  bonus_type_name: string | null;
  /** Promo discount percent */
  srid: string;
}

/**
 * Paginated list of transactions/financial report items
 */
export type TransactionListResponse = Transaction[];

/**
 * Single transaction detail response
 * Returns complete details for a specific transaction
 * Currently identical to Transaction as the API returns the same structure
 */
export type TransactionDetailResponse = Transaction;

/**
 * Document category
 */
export interface DocumentCategory {
  /** Category ID for API requests */
  name: string;
  /** Localized category title */
  title: string;
}

/**
 * Document categories response
 */
export interface DocumentCategoriesResponse {
  data: {
    /** List of document categories */
    categories: DocumentCategory[];
  };
}

/**
 * Document item
 */
export interface Document {
  /** Unique document ID */
  serviceName: string;
  /** Document name */
  name: string;
  /** Document category title */
  category: string;
  /** Available document formats */
  extensions: string[];
  /** Document creation timestamp */
  creationTime: string;
  /** Whether document was downloaded in seller portal */
  viewed: boolean;
}

/**
 * Documents list response
 */
export interface DocumentsListResponse {
  data: {
    /** List of documents */
    documents: Document[];
  };
}

/**
 * Document download request body
 */
export interface DocumentDownloadRequest {
  params: {
    /** Document format */
    extension: string;
    /** Unique document ID */
    serviceName: string;
  }[];
}

/**
 * Single document download response
 */
export interface DocumentDownloadResponse {
  data: {
    /** Document file name */
    fileName: string;
    /** Document format */
    extension: string;
    /** Base64-encoded document content */
    document: string;
  };
}

/**
 * Multiple documents download response
 */
export interface DocumentsDownloadResponse {
  data: {
    /** Archive file name */
    fileName: string;
    /** Archive format (usually 'zip') */
    extension: string;
    /** Base64-encoded archive content */
    document: string;
  };
}

/**
 * Document list query parameters
 */
export interface DocumentListFilters {
  /** Language for category field: 'ru', 'en', or 'zh' */
  locale?: 'ru' | 'en' | 'zh';
  /** Period start date (requires endTime) */
  beginTime?: string;
  /** Period end date (requires beginTime) */
  endTime?: string;
  /** Sort by: 'date' or 'category' */
  sort?: 'date' | 'category';
  /** Sort order: 'asc' or 'desc' */
  order?: 'asc' | 'desc';
  /** Filter by category name */
  category?: string;
  /** Page number for pagination */
  page?: number;
  [key: string]: string | number | undefined;
}

/**
 * Date range helper interface
 * Provides convenient date range specification
 */
export interface DateRange {
  /** Range start date */
  from: Date | string;
  /** Range end date */
  to: Date | string;
}

// ============================================================================
// Financial Reports Types (Story 3.2)
// ============================================================================

/**
 * Financial report type enumeration
 * Represents different types of financial reports available
 */
export type FinancialReportType =
  | 'sales_summary' // Summary of sales for period
  | 'tax_report' // Tax reporting data
  | 'commission_breakdown' // Detailed commission analysis
  | 'detailed_transactions'; // Full transaction details

/**
 * Report output format enumeration
 * Supported file formats for generated reports
 */
export type ReportFormat =
  | 'pdf' // PDF document
  | 'csv' // CSV spreadsheet
  | 'json' // JSON data
  | 'xlsx'; // Excel spreadsheet

/**
 * Report status enumeration
 * Lifecycle states of a generated report
 */
export type ReportStatus =
  | 'pending' // Report generation queued
  | 'processing' // Report being generated
  | 'completed' // Report ready for download
  | 'failed'; // Report generation failed

/**
 * Generate report request parameters
 * Input data for initiating report generation
 */
export interface GenerateReportRequest {
  /** Type of financial report to generate */
  reportType: FinancialReportType;
  /** Date range for report data */
  dateRange: DateRange;
  /** Output format (defaults to PDF if not specified) */
  format?: ReportFormat;
}

/**
 * Generate report response
 * Initial response when report generation is initiated
 */
export interface GenerateReportResponse {
  /** Unique report identifier for status tracking */
  reportId: string;
  /** Current status of report generation */
  status: ReportStatus;
  /** Timestamp when report generation started */
  createdAt?: string;
}

/**
 * Complete report details
 * Full information about a generated report
 */
export interface Report {
  /** Unique report identifier */
  id: string;
  /** Type of financial report */
  type: FinancialReportType;
  /** Current report status */
  status: ReportStatus;
  /** Output format of the report */
  format: ReportFormat;
  /** Download URL (available when status is 'completed') */
  url: string | null;
  /** URL expiration timestamp (ISO 8601 format) */
  expiresAt: string | null;
  /** Report creation timestamp (ISO 8601 format) */
  createdAt: string;
  /** Error message if status is 'failed' */
  error?: string;
}

/**
 * Report download response
 * Contains download URL and metadata for completed report
 */
export interface ReportDownloadResponse {
  /** Pre-signed download URL */
  url: string;
  /** Report file format */
  format: ReportFormat;
  /** URL expiration timestamp */
  expiresAt: string;
}

// ============================================================================
// Payouts Types (Story 3.2)
// ============================================================================

/**
 * Payout status enumeration
 * Lifecycle states of a payout transaction
 */
export type PayoutStatus =
  | 'pending' // Payout scheduled
  | 'processing' // Payout being processed
  | 'completed' // Payout transferred successfully
  | 'failed' // Payout failed
  | 'cancelled'; // Payout cancelled

/**
 * Payout filters for querying payout history
 * Optional parameters for filtering payout list
 */
export interface PayoutFilters {
  /** Start date for payout search (ISO 8601 format) */
  dateFrom?: string;
  /** End date for payout search (ISO 8601 format) */
  dateTo?: string;
  /** Filter by payout status */
  status?: PayoutStatus;
  /** Filter by bank account (last 4 digits or identifier) */
  bankAccount?: string;
  /** Maximum number of results to return */
  limit?: number;
  /** Offset for pagination */
  offset?: number;
  [key: string]: string | number | undefined;
}

/**
 * Bank transfer information
 * Details about bank account and transfer
 */
export interface BankTransferInfo {
  /** Bank name */
  bankName: string;
  /** Masked account number (e.g., '****1234') */
  accountNumber: string;
  /** Transfer execution date (ISO 8601 format) */
  transferDate: string;
  /** Bank identification code (BIC/SWIFT) */
  bankCode?: string;
}

/**
 * Payout fee breakdown
 * Detailed breakdown of fees deducted from payout
 */
export interface PayoutFeeBreakdown {
  /** Marketplace commission amount */
  commission: number;
  /** Payment processing fee */
  processingFee: number;
  /** Total fees deducted */
  totalFees: number;
  /** Net amount transferred to seller */
  netAmount: number;
  /** Currency code (e.g., 'RUB') */
  currency?: string;
}

/**
 * Individual payout record
 * Basic payout information in list view
 */
export interface Payout {
  /** Unique payout identifier */
  id: string;
  /** Gross payout amount before fees */
  amount: number;
  /** Payout date (ISO 8601 format) */
  date: string;
  /** Current payout status */
  status: PayoutStatus;
  /** Bank account information (masked) */
  bankInfo: BankTransferInfo;
  /** Currency code (e.g., 'RUB') */
  currency: string;
  /** Number of transactions included in payout */
  transactionCount?: number;
}

/**
 * Paginated payout list response
 * Response from getPayouts() with pagination metadata
 */
export interface PayoutListResponse {
  /** Array of payout records */
  data: Payout[];
  /** Pagination metadata */
  pagination?: {
    /** Total number of payouts matching filters */
    total: number;
    /** Current page offset */
    offset: number;
    /** Number of results per page */
    limit: number;
    /** Whether more results are available */
    hasMore: boolean;
  };
}

/**
 * Detailed payout response
 * Complete payout information including fee breakdown
 */
export interface PayoutDetailResponse {
  /** Unique payout identifier */
  id: string;
  /** Gross payout amount before fees */
  amount: number;
  /** Payout date (ISO 8601 format) */
  date: string;
  /** Current payout status */
  status: PayoutStatus;
  /** Complete bank transfer information */
  bankInfo: BankTransferInfo;
  /** Currency code (e.g., 'RUB') */
  currency: string;
  /** Detailed fee breakdown */
  feeBreakdown: PayoutFeeBreakdown;
  /** List of transaction IDs included in payout */
  transactionIds?: number[];
  /** Number of transactions included */
  transactionCount?: number;
  /** Period covered by payout */
  periodFrom?: string;
  /** Period covered by payout */
  periodTo?: string;
  /** Additional notes or comments */
  notes?: string;
}
