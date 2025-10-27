/**
 * TypeScript type definitions for Reports API
 * Generated from wildberries_api_doc/12-reports.yaml
 *
 * @module types/reports
 */

/**
 * Inbound shipment item from warehouses
 *
 * Data is updated every 30 minutes. Maximum 100,000 rows per response.
 */
export interface IncomesItem {
  /** Shipment number */
  incomeId: number;
  /** UPD document number */
  number: string;
  /** Arrival date (Moscow UTC+3) */
  date: string;
  /** Last update date in service. Used for pagination (Moscow UTC+3) */
  lastChangeDate: string;
  /** Seller article */
  supplierArticle: string;
  /** Item size */
  techSize: string;
  /** Barcode */
  barcode: string;
  /** Quantity */
  quantity: number;
  /** Price from UPD document */
  totalPrice: number;
  /** Date accepted (closed) at WB (Moscow UTC+3) */
  dateClose: string;
  /** Warehouse name */
  warehouseName: string;
  /** WB article (nmId) */
  nmId: number;
  /** Current shipment status. Always "Принято" (Accepted) */
  status: 'Принято';
  [key: string]: unknown;
}

/**
 * Stock level item across WB warehouses
 *
 * Data is updated every 30 minutes. Maximum 60,000 rows per response.
 */
export interface StocksItem {
  /** Last update date in service. Used for pagination (Moscow UTC+3) */
  lastChangeDate: string;
  /** Warehouse name */
  warehouseName: string;
  /** Seller article */
  supplierArticle: string;
  /** WB article (nmId) */
  nmId: number;
  /** Barcode */
  barcode: string;
  /** Available quantity for sale (can be added to cart) */
  quantity: number;
  /** Quantity in transit to customer */
  inWayToClient: number;
  /** Quantity in transit from customer (returns) */
  inWayFromClient: number;
  /** Total unsold quantity at warehouse (quantity + inWayToClient + inWayFromClient) */
  quantityFull: number;
  /** Category */
  category: string;
  /** Subject */
  subject: string;
  /** Brand */
  brand: string;
  /** Size */
  techSize: string;
  /** Price */
  Price: number;
  /** Discount */
  Discount: number;
  /** Supply contract (internal technical data) */
  isSupply: boolean;
  /** Realization contract (internal technical data) */
  isRealization: boolean;
  /** Contract code (internal technical data) */
  SCCode: string;
  [key: string]: unknown;
}

/**
 * Order item information
 *
 * Data is updated every 30 minutes. Maximum 80,000 rows per response.
 * Data retention: 90 days from order creation.
 * Note: 1 row = 1 order = 1 assembly task = 1 product unit
 */
export interface OrdersItem {
  /** Order date/time (Moscow UTC+3). Corresponds to dateFrom when flag=1 */
  date: string;
  /** Last update date in service (Moscow UTC+3). Corresponds to dateFrom when flag=0 or undefined */
  lastChangeDate: string;
  /** Shipment warehouse */
  warehouseName: string;
  /** Warehouse storage type */
  warehouseType: 'Склад WB' | 'Склад продавца';
  /** Country */
  countryName: string;
  /** District */
  oblastOkrugName: string;
  /** Region */
  regionName: string;
  /** Seller article */
  supplierArticle: string;
  /** WB article (nmId) */
  nmId: number;
  /** Barcode */
  barcode: string;
  /** Category */
  category: string;
  /** Subject */
  subject: string;
  /** Brand */
  brand: string;
  /** Item size */
  techSize: string;
  /** Shipment number */
  incomeID: number;
  /** Supply contract */
  isSupply: boolean;
  /** Realization contract */
  isRealization: boolean;
  /** Price without discounts */
  totalPrice: number;
  /** Seller discount, % */
  discountPercent: number;
  /** WB discount, % */
  spp: number;
  /** Price with all discounts except WB Wallet */
  finishedPrice: number;
  /** Price with seller discount (totalPrice * (1 - discountPercent/100)) */
  priceWithDisc: number;
  /** Order canceled: true - order canceled */
  isCancel: boolean;
  /** Cancellation date/time. "0001-01-01T00:00:00" if not canceled (Moscow UTC+3) */
  cancelDate: string;
  /** Sticker ID */
  sticker: string;
  /** Customer cart ID. Orders from same transaction have same gNumber */
  gNumber: string;
  /** Unique order ID. Note: srid equals rid in Marketplace API assembly tasks */
  srid: string;
  [key: string]: unknown;
}

/**
 * Sales and returns item
 *
 * Extends OrdersItem with payment-specific fields.
 * Data is updated every 30 minutes. Maximum 80,000 rows per response.
 * Data retention: 90 days from order creation.
 */
export interface SalesItem {
  /** Sale/return date (Moscow UTC+3). Corresponds to dateFrom when flag=1 */
  date: string;
  /** Last update date in service (Moscow UTC+3). Corresponds to dateFrom when flag=0 or undefined */
  lastChangeDate: string;
  /** Shipment warehouse */
  warehouseName: string;
  /** Warehouse storage type */
  warehouseType: 'Склад WB' | 'Склад продавца';
  /** Country */
  countryName: string;
  /** District */
  oblastOkrugName: string;
  /** Region */
  regionName: string;
  /** Seller article */
  supplierArticle: string;
  /** WB article (nmId) */
  nmId: number;
  /** Barcode */
  barcode: string;
  /** Category */
  category: string;
  /** Subject */
  subject: string;
  /** Brand */
  brand: string;
  /** Item size */
  techSize: string;
  /** Shipment number */
  incomeID: number;
  /** Supply contract */
  isSupply: boolean;
  /** Realization contract */
  isRealization: boolean;
  /** Price without discounts */
  totalPrice: number;
  /** Seller discount, % */
  discountPercent: number;
  /** WB discount, % */
  spp: number;
  /** Discount for WB Wallet payment, ₽. Negative value indicates return */
  paymentSaleAmount: number;
  /** Amount to be paid to seller */
  forPay: number;
  /** Actual price with all discounts (charged to customer) */
  finishedPrice: number;
  /** Price with seller discount used to calculate forPay (totalPrice * (1 - discountPercent/100)) */
  priceWithDisc: number;
  /** Unique sale/return ID. Format: S********** - sale, R********** - return */
  saleID: string;
  /** Sticker ID */
  sticker: string;
  /** Customer cart ID. Orders from same transaction have same gNumber */
  gNumber: string;
  /** Unique order ID. Note: srid equals rid in Marketplace API assembly tasks */
  srid: string;
  [key: string]: unknown;
}

/**
 * Request body for excise/marked goods report
 *
 */
export interface ExciseReportRequest {
  /**
   * Country codes by ISO 3166-2 standard. Leave empty to get data for all countries
   *
   * Supported countries:
   * - AM: Armenia
   * - BY: Belarus
   * - KG: Kyrgyzstan
   * - KZ: Kazakhstan
   * - RU: Russia
   * - UZ: Uzbekistan
   */
  countries?: ('AM' | 'BY' | 'KG' | 'KZ' | 'RU' | 'UZ')[];
  /** Optional brand filters */
  brands?: string[];
  /** Optional INN (tax identification number) filters */
  inns?: string[];
  [key: string]: unknown;
}

/**
 * Excise report data item
 *
 */
export interface ExciseReportDataItem {
  /** Customer country */
  name: string;
  /** Item price with VAT */
  price: number;
  /** Currency short name */
  currency_name_short: string;
  /** Marking code */
  excise_short: string;
  /** Barcode */
  barcode: string;
  /** WB article (nmId) */
  nm_id: number;
  /**
   * Operation type:
   * - 1: Withdrawal from circulation
   * - 2: Return to circulation
   */
  operation_type_id?: number;
  /** Fiscal document number (full payment receipt) if available */
  fiscal_doc_number?: number;
  /** Fiscalization date (receipt date) in format YYYY-MM-DD if available */
  fiscal_dt?: string;
  /** Fiscal drive number if available */
  fiscal_drive_number?: string;
  /** Rid */
  rid?: number;
  /** Srid */
  srid?: string;
  [key: string]: unknown;
}

/**
 * Excise report response
 *
 */
export interface ExciseReportResponse {
  /** Response data wrapper */
  response: {
    /** Array of excise operations data */
    data: ExciseReportDataItem[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Parameters for warehouse remains report generation
 *
 * Can combine groupBy and filter parameters in any combination.
 */
export interface WarehouseRemainsParams {
  /**
   * Language for subjectName and warehouseName fields:
   * - ru: Russian (default)
   * - en: English
   * - zh: Chinese (warehouseName in English)
   */
  locale?: 'ru' | 'en' | 'zh';
  /** Group by brands */
  groupByBrand?: boolean;
  /** Group by subjects */
  groupBySubject?: boolean;
  /** Group by seller articles */
  groupBySa?: boolean;
  /** Group by WB articles (nmId). When true, response includes volume field */
  groupByNm?: boolean;
  /** Group by barcodes */
  groupByBarcode?: boolean;
  /** Group by sizes */
  groupBySize?: boolean;
  /**
   * Filter by photos:
   * - -1: Without photos
   * - 0: No filter (default)
   * - 1: With photos
   */
  filterPics?: -1 | 0 | 1;
  /**
   * Filter by volume:
   * - -1: Without dimensions
   * - 0: No filter (default)
   * - 3: Over 3 liters
   */
  filterVolume?: -1 | 0 | 3;
  [key: string]: unknown;
}

/**
 * Async report task response
 *
 */
export interface ReportTaskResponse {
  /** Wrapper for response data */
  data: {
    /** Task ID for status checking and download */
    taskId: string;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Report generation status
 *
 */
export interface ReportStatus {
  /** Wrapper for status data */
  data: {
    /** Task ID */
    id: string;
    /**
     * Task status:
     * - new: Queued
     * - processing: Generating report
     * - done: Report ready for download
     * - purged: Report deleted
     * - canceled: Task canceled
     * - error: Generation failed (check error field)
     */
    status: 'new' | 'processing' | 'done' | 'purged' | 'canceled' | 'error';
    /** Error message if status is 'error' */
    error?: string;
    /** Download information when status is 'done' */
    file?: {
      /** Download URL */
      url?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

/**
 * Error response format 1
 *
 */
export interface ResponseErrorStatistics {
  /** Array of error messages */
  errors?: string[];
  [key: string]: unknown;
}

/**
 * Error response format 2
 *
 */
export interface ResponseErrorStatistics2 {
  /** Error message string */
  errors?: string;
  [key: string]: unknown;
}

/**
 * 4xx error response
 *
 */
export interface ErrorResponse4xx {
  /** Error details */
  detail: string;
  /** WB internal service ID */
  origin: string;
  /** Unique request ID */
  requestId: string;
  /** Error title */
  title: string;
  [key: string]: unknown;
}

/**
 * Report type discriminator for async operations
 */
export type ReportType = 'warehouse_remains' | 'acceptance' | 'paid_storage';
