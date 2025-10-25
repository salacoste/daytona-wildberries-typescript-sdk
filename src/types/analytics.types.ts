/**
 * Auto-generated TypeScript types for analytics module
 * Generated from: wildberries_api_doc/11-analytics.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-10-23
 */

/**
 * Date range for analytics queries
 */
export interface DateRange {
  /** Start date in ISO format (YYYY-MM-DD or RFC3339) */
  from: string;
  /** End date in ISO format (YYYY-MM-DD or RFC3339) */
  to: string;
}

/**
 * Period specification with begin and end timestamps
 */
export interface Period {
  /** Period start date-time */
  begin: string;
  /** Period end date-time */
  end: string;
}

/**
 * Conversion metrics for sales funnel analysis
 */
export interface ConversionMetrics {
  /** Add to cart conversion rate (%) */
  addToCartPercent: number;
  /** Cart to order conversion rate (%) */
  cartToOrderPercent: number;
  /** Buyouts/purchases conversion rate (%) */
  buyoutsPercent: number;
}

/**
 * Period statistics for product card analytics
 */
export interface PeriodStatistics {
  /** Period start date-time */
  begin: string;
  /** Period end date-time */
  end: string;
  /** Number of product card views */
  openCardCount: number;
  /** Number of add to cart actions */
  addToCartCount: number;
  /** Number of orders */
  ordersCount: number;
  /** Total order value in rubles */
  ordersSumRub: number;
  /** Number of completed purchases (buyouts) */
  buyoutsCount: number;
  /** Total buyout value in rubles */
  buyoutsSumRub: number;
  /** Number of order cancellations */
  cancelCount: number;
  /** Total cancelled order value in rubles */
  cancelSumRub: number;
  /** Average price in rubles */
  avgPriceRub: number;
  /** Average orders per day */
  avgOrdersCountPerDay: number;
  /** Conversion metrics (funnel) */
  conversions: ConversionMetrics;
}

/**
 * Period comparison dynamics (percentage changes)
 */
export interface PeriodComparisonDynamics {
  /** Card view count change (%) */
  openCardDynamics: number;
  /** Add to cart count change (%) */
  addToCartDynamics: number;
  /** Orders count change (%) */
  ordersCountDynamics: number;
  /** Orders sum change (%) */
  ordersSumRubDynamics: number;
  /** Buyouts count change (%) */
  buyoutsCountDynamics: number;
  /** Buyouts sum change (%) */
  buyoutsSumRubDynamics: number;
  /** Cancellations count change (%) */
  cancelCountDynamics: number;
  /** Cancellations sum change (%) */
  cancelSumRubDynamics: number;
  /** Average orders per day change (%) */
  avgOrdersCountPerDayDynamics: number;
  /** Average price change (%) */
  avgPriceRubDynamics: number;
  /** Conversion metrics changes */
  conversions: ConversionMetrics;
}

/**
 * Product card tag information
 */
export interface ProductTag {
  /** Tag ID */
  id: number;
  /** Tag name/label */
  name: string;
}

/**
 * Product object (category) information
 */
export interface ProductObject {
  /** Object/Category ID */
  id: number;
  /** Object/Category name */
  name: string;
}

/**
 * Stock information for product
 */
export interface StockInfo {
  /** Stock at marketplace warehouses */
  stocksMp: number;
  /** Stock at Wildberries warehouses */
  stocksWb: number;
}

/**
 * Complete statistics for a product card including period comparison
 */
export interface CardStatistics {
  /** Statistics for selected period */
  selectedPeriod: PeriodStatistics;
  /** Statistics for previous period (for comparison) */
  previousPeriod: PeriodStatistics;
  /** Period-over-period comparison dynamics */
  periodComparison: PeriodComparisonDynamics;
}

/**
 * Product card analytics data
 */
export interface ProductCardAnalytics {
  /** Wildberries product article number (nmID) */
  nmID: number;
  /** Supplier vendor code */
  vendorCode: string;
  /** Brand name */
  brandName: string;
  /** Product tags/labels */
  tags: ProductTag[];
  /** Product object/category information */
  object: ProductObject;
  /** Complete statistics including period comparison */
  statistics: CardStatistics;
  /** Current stock information */
  stocks: StockInfo;
}

/**
 * Response error details
 */
export interface ResponseError {
  /** Error occurred flag */
  error: boolean;
  /** Error description text */
  errorText: string;
  /** Additional error details (field-level errors) */
  additionalErrors?: {
    field: string;
    description: string;
  }[] | null;
}

/**
 * Request for product card statistics detail report
 */
export interface ProductStatisticsRequest {
  /** Selected period for analysis */
  period: Period;
  /** Previous period for comparison (optional) */
  previousPeriod?: Period;
  /** Filter by brand names */
  brandNames?: string[];
  /** Filter by object/category IDs */
  objectIDs?: number[];
  /** Filter by tag IDs */
  tagIDs?: number[];
  /** Filter by product article numbers (nmIDs) */
  nmIDs?: number[];
  /** Pagination: page number (starts at 1) */
  page?: number;
  /** Pagination: results per page */
  pageSize?: number;
}

/**
 * Response with product card statistics
 */
export interface ProductStatisticsResponse extends ResponseError {
  /** Response data payload */
  data: {
    /** Current page number */
    page: number;
    /** Whether next page exists */
    isNextPage: boolean;
    /** Array of product card analytics */
    cards: ProductCardAnalytics[];
  };
}

/**
 * Time-series data point for historical analytics
 */
export interface TimeSeriesDataPoint {
  /** Date for this data point (YYYY-MM-DD or timestamp) */
  date: string;
  /** Primary metric value for this date */
  value?: number;
  /** Additional metadata for this data point */
  metadata?: Record<string, unknown>;
}

/**
 * Daily statistics for a product card
 */
export interface DailyStatistics {
  /** Date */
  date: string;
  /** Number of card views */
  openCardCount: number;
  /** Number of add to cart actions */
  addToCartCount: number;
  /** Number of orders */
  ordersCount: number;
  /** Order value in rubles */
  ordersSumRub: number;
  /** Number of buyouts */
  buyoutsCount: number;
  /** Buyout value in rubles */
  buyoutsSumRub: number;
  /** Conversion metrics */
  conversions: ConversionMetrics;
}

/**
 * Historical statistics request
 */
export interface HistoricalStatisticsRequest {
  /** Date range for historical data (max 7 days) */
  period: Period;
  /** Filter by brand names */
  brandNames?: string[];
  /** Filter by object/category IDs */
  objectIDs?: number[];
  /** Filter by tag IDs */
  tagIDs?: number[];
  /** Filter by product article numbers (nmIDs) */
  nmIDs?: number[];
}

/**
 * Product card with daily historical statistics
 */
export interface ProductCardHistory {
  /** Wildberries product article number */
  nmID: number;
  /** Supplier vendor code */
  vendorCode: string;
  /** Brand name */
  brandName: string;
  /** Product tags */
  tags: ProductTag[];
  /** Product object/category */
  object: ProductObject;
  /** Daily statistics time-series */
  history: DailyStatistics[];
}

/**
 * Historical statistics response
 */
export interface HistoricalStatisticsResponse extends ResponseError {
  /** Response data */
  data: ProductCardHistory[];
}

/**
 * Grouped historical statistics (by brand, object, tags)
 */
export interface GroupedHistory {
  /** Brand name (if grouped by brand) */
  brandName?: string;
  /** Object/Category (if grouped by object) */
  object?: ProductObject;
  /** Tags (if grouped by tags) */
  tags?: ProductTag[];
  /** Daily statistics for this group */
  history: DailyStatistics[];
}

/**
 * Grouped historical statistics response
 */
export interface GroupedHistoricalResponse extends ResponseError {
  /** Response data */
  data: GroupedHistory[];
}

/**
 * Search query performance metrics
 */
export interface SearchQueryMetrics {
  /** Search query text */
  query: string;
  /** Number of times this query was searched */
  searchCount: number;
  /** Click-through rate (%) */
  clickThroughRate: number;
  /** Conversion rate from search to purchase (%) */
  conversionRate: number;
  /** Average position in search results */
  avgPosition?: number;
  /** Revenue generated from this query */
  revenue?: number;
}

/**
 * Search queries response
 */
export interface SearchQueriesResponse extends ResponseError {
  /** Array of search query metrics */
  data: SearchQueryMetrics[];
}

/**
 * Report type for CSV generation
 */
export type ReportType =
  | 'sales_funnel'       // Sales funnel report
  | 'search_queries'     // Search queries report
  | 'stock_history'      // Stock history report
  | 'product_performance'; // Product performance report

/**
 * Report format
 */
export type ReportFormat = 'CSV' | 'JSON' | 'PDF' | 'XLSX';

/**
 * Report status
 */
export type ReportStatus =
  | 'pending'      // Report generation queued
  | 'processing'   // Report being generated
  | 'completed'    // Report ready for download
  | 'failed';      // Report generation failed

/**
 * CSV report generation request
 */
export interface GenerateReportRequest {
  /** Type of report to generate */
  reportType: ReportType;
  /** Date range for the report */
  dateRange: DateRange;
  /** Report format (default: CSV) */
  format?: ReportFormat;
  /** Filter parameters (optional) */
  filters?: {
    brandNames?: string[];
    objectIDs?: number[];
    tagIDs?: number[];
    nmIDs?: number[];
  };
}

/**
 * Report generation response
 */
export interface GenerateReportResponse extends ResponseError {
  /** Generated report ID for tracking and download */
  reportId: string;
  /** Current report status */
  status: ReportStatus;
  /** Estimated completion time (ISO timestamp) */
  estimatedCompletionTime?: string;
}

/**
 * Report status and download information
 */
export interface ReportInfo extends ResponseError {
  /** Report ID */
  reportId: string;
  /** Current status */
  status: ReportStatus;
  /** Report type */
  reportType: ReportType;
  /** Report format */
  format: ReportFormat;
  /** Download URL (available when status is 'completed') */
  downloadUrl?: string;
  /** URL expiration timestamp */
  expiresAt?: string;
  /** File size in bytes (when completed) */
  fileSize?: number;
  /** Error message (if status is 'failed') */
  errorMessage?: string;
}

/**
 * Category performance metrics
 */
export interface CategoryPerformanceMetrics {
  /** Category ID */
  categoryId: string;
  /** Category name */
  categoryName: string;
  /** Total revenue in category */
  revenue: number;
  /** Total units sold */
  unitsSold: number;
  /** Number of products in category */
  productCount: number;
  /** Top performing products in category */
  topProducts: {
    nmID: number;
    name: string;
    revenue: number;
    unitsSold: number;
  }[];
  /** Time-series trend data */
  timeSeries?: TimeSeriesDataPoint[];
}

/**
 * Category performance response
 */
export interface CategoryPerformanceResponse extends ResponseError {
  /** Category performance data */
  data: CategoryPerformanceMetrics;
}

/**
 * Product performance metrics (individual product)
 */
export interface ProductPerformanceMetrics {
  /** Product article number */
  nmID: number;
  /** Supplier vendor code */
  vendorCode: string;
  /** Product name/title */
  productName?: string;
  /** Total revenue */
  revenue: number;
  /** Units sold */
  unitsSold: number;
  /** Average selling price */
  avgPrice: number;
  /** Return rate (%) */
  returnRate: number;
  /** Conversion rate (%) */
  conversionRate: number;
  /** Time-series data */
  timeSeries?: TimeSeriesDataPoint[];
}

/**
 * Product performance response (for multiple products)
 */
export interface ProductPerformanceResponse extends ResponseError {
  /** Array of product performance metrics */
  products: ProductPerformanceMetrics[];
}

/**
 * Stock change reason enumeration
 *
 * Represents the various reasons why stock levels change:
 * - `sale`: Normal product sales (most common)
 * - `return`: Customer returns increasing stock
 * - `adjustment`: Manual corrections from inventory audits
 * - `transfer`: Movement between warehouses
 * - `damaged`: Damaged goods removal
 * - `lost`: Lost or stolen inventory write-offs
 */
export type StockChangeReason =
  | 'sale'
  | 'return'
  | 'adjustment'
  | 'transfer'
  | 'damaged'
  | 'lost';

/**
 * Individual stock history entry
 *
 * Represents a single stock level change event with complete context
 */
export interface StockHistoryEntry {
  /** Timestamp of the stock change (ISO 8601) */
  timestamp: string;
  /** Stock level before this change */
  previousStock: number;
  /** Stock level after this change */
  newStock: number;
  /** Amount of change (negative for reductions, positive for additions) */
  changeAmount: number;
  /** Reason for the stock change */
  reason: StockChangeReason;
  /** Additional metadata about the change */
  metadata?: {
    /** Related order ID (for sales/returns) */
    orderId?: string;
    /** Related warehouse ID (for transfers) */
    warehouseId?: string;
    /** User who performed the adjustment */
    userId?: string;
    /** Notes or comments about the change */
    notes?: string;
  };
}

/**
 * Stock history response with time-series summary
 *
 * Provides complete historical stock data with aggregated metrics
 */
export interface StockHistoryResponse extends ResponseError {
  /** Product article number */
  nmID: number;
  /** Supplier vendor code */
  vendorCode: string;
  /** Date range for this history */
  dateRange: DateRange;
  /** Array of stock change entries (chronological order) */
  changes: StockHistoryEntry[];
  /** Aggregated summary statistics */
  summary: {
    /** Total stock changes due to sales */
    totalSales: number;
    /** Total stock increases from returns */
    totalReturns: number;
    /** Total manual adjustments */
    totalAdjustments: number;
    /** Net stock change over period */
    netChange: number;
    /** Starting stock level */
    startingStock: number;
    /** Ending stock level */
    endingStock: number;
    /** Average daily stock velocity (units/day) */
    avgDailyVelocity: number;
  };
}

/**
 * Analytics report type enumeration
 *
 * Alias for ReportType to provide clearer naming in analytics context.
 * Includes all available analytics report types for CSV export.
 */
export type AnalyticsReportType = ReportType;

/**
 * CSV format options for customizing export output
 *
 * Allows fine-grained control over CSV file formatting for compatibility
 * with different tools (Excel, BI platforms, custom parsers)
 */
export interface CSVFormatOptions {
  /**
   * Column delimiter character
   * - `,` (comma): Standard CSV format
   * - `;` (semicolon): European Excel format
   * - `\t` (tab): Tab-separated values (TSV)
   *
   * @default ','
   */
  delimiter?: ',' | ';' | '\t';

  /**
   * Include header row with column names
   *
   * @default true
   */
  includeHeaders?: boolean;

  /**
   * Character encoding for the CSV file
   * - `utf-8`: Standard Unicode encoding
   * - `utf-8-bom`: UTF-8 with BOM (Byte Order Mark) for Excel compatibility
   *
   * @default 'utf-8'
   */
  encoding?: 'utf-8' | 'utf-8-bom';
}

/**
 * CSV export request
 *
 * Initiates asynchronous CSV generation for analytics data
 */
export interface CSVExportRequest {
  /** Type of analytics data to export */
  reportType: AnalyticsReportType;
  /** Date range for the exported data */
  dateRange: DateRange;
  /** CSV formatting options */
  formatOptions?: CSVFormatOptions;
  /** Optional filters to apply to the data */
  filters?: {
    brandNames?: string[];
    objectIDs?: number[];
    tagIDs?: number[];
    nmIDs?: number[];
  };
}

/**
 * CSV export initiation response
 *
 * Returns immediately with report ID for tracking async generation
 */
export interface CSVExportResponse extends ResponseError {
  /** Generated report ID for status tracking and download */
  reportId: string;
  /** Initial status (typically 'pending') */
  status: ReportStatus;
  /** Estimated completion time (ISO timestamp) */
  estimatedCompletionTime?: string;
}

/**
 * Complete CSV report information with download details
 *
 * Returned by status check endpoint when CSV generation completes
 */
export interface CSVReport extends ResponseError {
  /** Report ID */
  reportId: string;
  /** Report type that was generated */
  reportType: AnalyticsReportType;
  /** Current generation status */
  status: ReportStatus;
  /** Download URL (pre-signed, available when status is 'completed') */
  downloadUrl?: string;
  /** URL expiration timestamp (typically 24 hours from completion) */
  expiresAt?: string;
  /** File size in bytes (available when completed) */
  fileSize?: number;
  /** Number of data rows in CSV (excluding header if present) */
  rowCount?: number;
  /** Error message if status is 'failed' */
  errorMessage?: string;
  /** Format options used for generation */
  formatOptions?: CSVFormatOptions;
}

/**
 * CSV report status tracking (alias for convenience)
 *
 * Alias for CSVReport to provide clearer naming when checking status
 */
export type CSVReportStatus = CSVReport;
