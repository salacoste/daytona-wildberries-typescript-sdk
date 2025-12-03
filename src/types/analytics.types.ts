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

// ==================== NEW TYPES for task-4.2 ====================

/**
 * Report download item from nm-report/downloads endpoint
 */
export interface ReportDownloadItem {
  /** Report download ID (UUID) */
  id: string;
  /** Report type */
  reportType: string;
  /** User-defined report name */
  userReportName?: string;
  /** Report status */
  status: 'new' | 'processing' | 'done' | 'error';
  /** File URL when status is 'done' */
  file?: string;
  /** Creation timestamp */
  createdAt: string;
  /** Update timestamp */
  updatedAt?: string;
  /** Error message if status is 'error' */
  error?: string;
}

/**
 * Response from GET /api/v2/nm-report/downloads
 */
export interface ReportDownloadsResponse extends ResponseError {
  /** Array of report download items */
  data: ReportDownloadItem[];
}

/**
 * Request for product search texts endpoint
 */
export interface ProductSearchTextsRequest {
  /** Current period for analysis */
  currentPeriod: {
    start: string;
    end: string;
  };
  /** Previous period for comparison */
  pastPeriod?: {
    start: string;
    end: string;
  };
  /** Product article number (nmID) */
  nmId: number;
  /** Number of search texts to return (max 30, 100 for premium) */
  limit?: number;
  /** Top ordering method */
  topOrderBy?: 'avgPosition' | 'openCard' | 'addToCart' | 'orders';
  /** Include substituted SKUs */
  includeSubstitutedSKUs?: boolean;
  /** Include search texts */
  includeSearchTexts?: boolean;
}

/**
 * Search text item in response
 */
export interface SearchTextItem {
  /** Search text/query */
  text: string;
  /** Average position in search */
  avgPosition?: number;
  /** Number of card opens */
  openCard?: number;
  /** Number of add to cart actions */
  addToCart?: number;
  /** Number of orders */
  orders?: number;
  /** Frequency/popularity rank */
  frequency?: number;
}

/**
 * Response from product search texts endpoint
 */
export interface ProductSearchTextsResponse extends ResponseError {
  data: {
    /** Product article number */
    nmId: number;
    /** Array of search texts */
    texts: SearchTextItem[];
  };
}

/**
 * Request for product orders by search queries
 */
export interface ProductOrdersRequest {
  /** Current period */
  currentPeriod: {
    start: string;
    end: string;
  };
  /** Previous period for comparison */
  pastPeriod?: {
    start: string;
    end: string;
  };
  /** Product article number */
  nmId: number;
  /** Search text to analyze */
  text: string;
}

/**
 * Order item by date
 */
export interface OrdersByDateItem {
  /** Date */
  date: string;
  /** Number of orders */
  orders: number;
  /** Average position */
  avgPosition?: number;
}

/**
 * Response from product orders endpoint
 */
export interface ProductOrdersResponse extends ResponseError {
  data: {
    /** Product article number */
    nmId: number;
    /** Search text */
    text: string;
    /** Orders by date */
    ordersByDate: OrdersByDateItem[];
  };
}

/**
 * Request for stocks by products
 */
export interface StocksProductsRequest {
  /** Period for stock history */
  period: {
    start: string;
    end: string;
  };
  /** Filter by product IDs */
  nmIds?: number[];
  /** Filter by subject ID */
  subjectId?: number;
  /** Filter by brand name */
  brandName?: string;
  /** Filter by tag ID */
  tagId?: number;
  /** Pagination page */
  page?: number;
  /** Page size */
  limit?: number;
}

/**
 * Stock product item
 */
export interface StockProductItem {
  /** Product article number */
  nmId: number;
  /** Vendor code */
  vendorCode?: string;
  /** Brand name */
  brandName?: string;
  /** Subject name */
  subjectName?: string;
  /** Current stock quantity */
  quantity: number;
  /** Stock at WB warehouses */
  quantityWb?: number;
  /** Stock at seller warehouses (FBS) */
  quantityFbs?: number;
  /** In transit quantity */
  inWayToClient?: number;
  /** In return transit */
  inWayFromClient?: number;
}

/**
 * Response from stocks products endpoint
 */
export interface StocksProductsResponse extends ResponseError {
  data: {
    /** Products with stock info */
    products: StockProductItem[];
    /** Is there a next page */
    isNextPage?: boolean;
  };
}

/**
 * Request for stocks by offices/warehouses
 */
export interface StocksOfficesRequest {
  /** Period for stock history */
  period: {
    start: string;
    end: string;
  };
  /** Filter by product IDs */
  nmIds?: number[];
  /** Filter by subject ID */
  subjectId?: number;
  /** Filter by brand name */
  brandName?: string;
  /** Filter by tag ID */
  tagId?: number;
}

/**
 * Office stock item
 */
export interface OfficeStockItem {
  /** Office/warehouse ID */
  officeId?: number;
  /** Office/warehouse name */
  officeName?: string;
  /** Region name */
  regionName: string;
  /** Stock quantity */
  quantity: number;
  /** Offices list (empty for FBS aggregated data) */
  offices: {
    officeId: number;
    officeName: string;
    quantity: number;
  }[];
}

/**
 * Response from stocks offices endpoint
 */
export interface StocksOfficesResponse extends ResponseError {
  data: {
    /** Stock by offices/regions */
    offices: OfficeStockItem[];
  };
}

// ==================== NEW TYPES for task-4.10 ====================

/**
 * Request for grouped history endpoint (POST /api/v2/nm-report/grouped/history)
 * Returns statistics by days grouped by subjects, brands, and tags.
 * Max 7 days of data can be retrieved.
 */
export interface GroupedHistoryRequest {
  /** Period for analysis */
  period: {
    begin: string;
    end: string;
  };
  /** Object/category IDs to filter by */
  objectIDs?: number[];
  /** Brand names to filter by */
  brandNames?: string[];
  /** Tag IDs to filter by */
  tagIDs?: number[];
  /** Timezone (default: Europe/Moscow) */
  timezone?: string;
  /** Aggregation level: 'day' or 'week' (default: 'day') */
  aggregationLevel?: 'day' | 'week';
}

/**
 * Grouped history item with daily statistics
 */
export interface GroupedHistoryItem {
  /** Object/category info */
  object?: {
    id: number;
    name: string;
  };
  /** Brand name */
  brandName?: string;
  /** Tag info */
  tag?: {
    id: number;
    name: string;
  };
  /** Daily history data */
  history: {
    /** Date */
    dt: string;
    /** Card opens count */
    openCardCount: number;
    /** Add to cart count */
    addToCartCount: number;
    /** Orders count */
    ordersCount: number;
    /** Orders sum in rubles */
    ordersSumRub: number;
    /** Buyouts count */
    buyoutsCount: number;
    /** Buyouts sum in rubles */
    buyoutsSumRub: number;
    /** Buyout percentage */
    buyoutPercent: number;
    /** Add to cart conversion % */
    addToCartConversion: number;
    /** Cart to order conversion % */
    cartToOrderConversion: number;
  }[];
}

/**
 * Response from grouped history endpoint
 */
export interface GroupedHistoryResponse extends ResponseError {
  data: GroupedHistoryItem[];
}

/**
 * Request for retry report generation (POST /api/v2/nm-report/downloads/retry)
 */
export interface RetryReportRequest {
  /** Download ID of the failed report (UUID) */
  downloadId: string;
}

/**
 * Response from retry report endpoint
 */
export interface RetryReportResponse {
  /** New download ID for the retried report */
  data: {
    id: string;
  };
}

/**
 * Position cluster filter for search reports
 */
export type PositionCluster = 'all' | 'firstHundred' | 'secondHundred' | 'below';

/**
 * Order by configuration for search reports
 */
export interface SearchOrderBy {
  /** Field to sort by */
  field: 'avgPosition' | 'openCard' | 'addToCart' | 'openToCart' | 'orders' | 'cartToOrder' | 'visibility';
  /** Sort mode */
  mode: 'asc' | 'desc';
}

/**
 * Period for search report requests
 */
export interface SearchReportPeriod {
  /** Start date (YYYY-MM-DD) */
  start: string;
  /** End date (YYYY-MM-DD) */
  end: string;
}

/**
 * Request for search report table groups (POST /api/v2/search-report/table/groups)
 */
export interface SearchReportTableGroupsRequest {
  /** Current period for analysis */
  currentPeriod: SearchReportPeriod;
  /** Past period for comparison */
  pastPeriod?: SearchReportPeriod;
  /** Filter by nmIds */
  nmIds?: number[];
  /** Filter by subject IDs */
  subjectIds?: number[];
  /** Filter by brand names */
  brandNames?: string[];
  /** Filter by tag IDs */
  tagIds?: number[];
  /** Position cluster filter */
  positionCluster: PositionCluster;
  /** Order by configuration */
  orderBy: SearchOrderBy;
  /** Include substituted SKUs data */
  includeSubstitutedSKUs?: boolean;
  /** Include search texts data */
  includeSearchTexts?: boolean;
  /** Number of items to return (max 1000) */
  limit: number;
  /** Offset for pagination */
  offset: number;
}

/**
 * Metric with current value and dynamics
 */
export interface MetricWithDynamics {
  /** Current value */
  current: number;
  /** Dynamics compared to previous period (%) */
  dynamics?: number;
}

/**
 * Table group item in search report
 */
export interface SearchReportTableGroupItem {
  /** Subject name */
  subjectName?: string;
  /** Subject ID */
  subjectId?: number;
  /** Brand name */
  brandName?: string;
  /** Tag name */
  tagName?: string;
  /** Tag ID */
  tagId?: number;
  /** Metrics for this group */
  metrics: {
    /** Average position */
    avgPosition: MetricWithDynamics;
    /** Card opens */
    openCard: MetricWithDynamics;
    /** Add to cart */
    addToCart: MetricWithDynamics;
    /** Conversion to cart */
    openToCart: MetricWithDynamics;
    /** Orders count */
    orders: MetricWithDynamics;
    /** Cart to order conversion */
    cartToOrder: MetricWithDynamics;
    /** Visibility */
    visibility: MetricWithDynamics;
  };
}

/**
 * Response from search report table groups endpoint
 */
export interface SearchReportTableGroupsResponse extends ResponseError {
  data: {
    /** List of group items */
    groups: SearchReportTableGroupItem[];
  };
}

/**
 * Request for search report table details (POST /api/v2/search-report/table/details)
 */
export interface SearchReportTableDetailsRequest {
  /** Current period for analysis */
  currentPeriod: SearchReportPeriod;
  /** Past period for comparison */
  pastPeriod?: SearchReportPeriod;
  /** Filter by subject ID */
  subjectId?: number;
  /** Filter by brand name */
  brandName?: string;
  /** Filter by tag ID */
  tagId?: number;
  /** Filter by nmIds (max 50) */
  nmIds?: number[];
  /** Order by configuration */
  orderBy: SearchOrderBy;
  /** Position cluster filter */
  positionCluster: PositionCluster;
  /** Include substituted SKUs data */
  includeSubstitutedSKUs?: boolean;
  /** Include search texts data */
  includeSearchTexts?: boolean;
  /** Number of items to return (max 1000) */
  limit: number;
  /** Offset for pagination */
  offset: number;
}

/**
 * Product item in search report table details
 */
export interface SearchReportProductItem {
  /** Wildberries article number */
  nmId: number;
  /** Vendor code */
  vendorCode?: string;
  /** Product name */
  name?: string;
  /** Subject name */
  subjectName?: string;
  /** Brand name */
  brandName?: string;
  /** Is advertised */
  isAdvertised?: boolean;
  /** Card rating */
  rating?: number;
  /** Feedback rating */
  feedbackRating?: number;
  /** Price info */
  price?: {
    minPrice: number;
    maxPrice: number;
  };
  /** Average position */
  avgPosition: MetricWithDynamics;
  /** Card opens */
  openCard: MetricWithDynamics;
  /** Add to cart */
  addToCart: MetricWithDynamics;
  /** Conversion to cart */
  openToCart: MetricWithDynamics;
  /** Orders */
  orders: MetricWithDynamics;
  /** Cart to order conversion */
  cartToOrder: MetricWithDynamics;
  /** Visibility */
  visibility: MetricWithDynamics;
}

/**
 * Response from search report table details endpoint
 */
export interface SearchReportTableDetailsResponse extends ResponseError {
  data: {
    /** List of product items */
    products: SearchReportProductItem[];
  };
}

/**
 * Request for stocks products groups (POST /api/v2/stocks-report/products/groups)
 */
export interface StocksProductsGroupsRequest {
  /** Period for stock history */
  period: {
    start: string;
    end: string;
  };
  /** Filter by product IDs */
  nmIDs?: number[];
  /** Filter by subject ID */
  subjectID?: number;
  /** Filter by brand name */
  brandName?: string;
  /** Filter by tag ID */
  tagID?: number;
  /** Stock type: 'wb' (Wildberries), 'mp' (Marketplace/FBS), or 'all' */
  stockType?: 'wb' | 'mp' | 'all';
  /** Availability filters */
  availabilityFilters?: ('deficient' | 'balanced' | 'surplus' | 'absent')[];
  /** Order by configuration */
  orderBy?: {
    field: 'avgOrders' | 'stockCount' | 'lostOrdersCount';
    mode: 'asc' | 'desc';
  };
  /** Page size (limit) */
  limit?: number;
  /** Page offset */
  offset?: number;
}

/**
 * Stock group item
 */
export interface StocksGroupItem {
  /** Subject ID */
  subjectID?: number;
  /** Subject name */
  subjectName?: string;
  /** Brand name */
  brandName?: string;
  /** Tag ID */
  tagID?: number;
  /** Tag name */
  tagName?: string;
  /** Stock quantity */
  stockCount: number;
  /** Stock value */
  stockValue?: number;
  /** Orders count */
  ordersCount?: number;
  /** Orders sum */
  ordersSum?: number;
  /** Average orders per day */
  avgOrders?: number;
  /** Lost orders count */
  lostOrdersCount?: number;
  /** Lost orders sum */
  lostOrdersSum?: number;
}

/**
 * Response from stocks products groups endpoint
 */
export interface StocksProductsGroupsResponse extends ResponseError {
  data: {
    /** List of stock groups */
    groups: StocksGroupItem[];
    /** Is there a next page */
    isNextPage?: boolean;
  };
}

/**
 * Request for stocks products sizes (POST /api/v2/stocks-report/products/sizes)
 */
export interface StocksProductsSizesRequest {
  /** Period for stock history */
  period: {
    start: string;
    end: string;
  };
  /** Product article number */
  nmID: number;
  /** Include office/warehouse details */
  includeOffice?: boolean;
}

/**
 * Office stock detail
 */
export interface OfficeStockDetail {
  /** Office ID */
  officeId: number;
  /** Office name */
  officeName: string;
  /** Stock quantity */
  quantity: number;
}

/**
 * Stock size item
 */
export interface StocksSizeItem {
  /** Technical size */
  techSize: string;
  /** Size name */
  sizeName?: string;
  /** Barcode */
  barcode?: string;
  /** Stock quantity */
  quantity: number;
  /** Stock at WB warehouses */
  quantityWb?: number;
  /** Stock at seller warehouses (FBS) */
  quantityFbs?: number;
  /** In transit to client */
  inWayToClient?: number;
  /** In transit from client */
  inWayFromClient?: number;
  /** Region name */
  regionName?: string;
  /** Office name */
  officeName?: string;
  /** Office details (when includeOffice is true) */
  offices?: OfficeStockDetail[];
}

/**
 * Response from stocks products sizes endpoint
 */
export interface StocksProductsSizesResponse extends ResponseError {
  data: {
    /** Product article number */
    nmID: number;
    /** Whether product has sizes */
    hasSizes?: boolean;
    /** List of size items */
    sizes: StocksSizeItem[];
  };
}
