/**
 * Auto-generated TypeScript types for orders-dbs module
 * Generated from: wildberries_api_doc/04-orders-dbs.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2026-02-02
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Address information for DBS delivery
 * Contains full address and GPS coordinates for delivery routing
 */
export interface DBSAddress {
  /** Full delivery address */
  fullAddress?: string;
  /** Longitude coordinate for delivery routing */
  longitude?: number;
  /** Latitude coordinate for delivery routing */
  latitude?: number;
}

/**
 * New DBS order (assembly task) awaiting processing
 * Contains delivery window, customer address, and required metadata
 */
export interface DBSOrderNew {
  /** Order ID */
  id?: number;
  /** Delivery address with GPS coordinates */
  address?: DBSAddress;
  /** Planned delivery date (YYYY-MM-DD) */
  ddate?: string;
  /** Sale price */
  salePrice?: number;
  /** Delivery window start time (HH:MM) */
  dTimeFrom?: string;
  /** Delivery window end time (HH:MM) */
  dTimeTo?: string;
  /** Required metadata types (sgtin, imei, uin, gtin, customsDeclaration) */
  requiredMeta?: string[];
  /** Delivery type - always 'dbs' for DBS orders */
  deliveryType?: 'dbs';
  /** Customer comment */
  comment?: string;
  /** Transaction ID for grouping orders in same cart */
  orderUid?: string;
  /** Seller article */
  article?: string;
  /** Color code (for customizable products) */
  colorCode?: string;
  /** Unique order ID (srid in other methods) */
  rid?: string;
  /** Order creation date (RFC3339) */
  createdAt?: string;
  /** List of barcodes */
  skus?: string[];
  /** Seller warehouse ID */
  warehouseId?: number;
  /** WB article number */
  nmId?: number;
  /** Product size ID in WB system */
  chrtId?: number;
  /** Price in sale currency * 100 */
  price?: number;
  /** Price in seller's country currency * 100 */
  convertedPrice?: number;
  /** Sale currency code */
  currencyCode?: number;
  /** Seller's country currency code */
  convertedCurrencyCode?: number;
  /** Cargo type: 1 - small, 2 - oversized, 3 - large */
  cargoType?: number;
  /** Whether this is a zero-stock order */
  isZeroOrder?: boolean;
}

/**
 * Completed DBS order information
 * Returned by getOrders for completed/cancelled orders
 */
export interface DBSOrder {
  /** Order ID */
  id?: number;
  /** Delivery address with GPS coordinates */
  address?: DBSAddress;
  /** Delivery type */
  deliveryType?: string;
  /** Transaction ID for grouping orders in same cart */
  orderUid?: string;
  /** Seller article */
  article?: string;
  /** Color code (for customizable products) */
  colorCode?: string;
  /** Unique order ID (srid in other methods) */
  rid?: string;
  /** Order creation date */
  createdAt?: string;
  /** List of barcodes */
  skus?: string[];
  /** Seller warehouse ID */
  warehouseId?: number;
  /** WB article number */
  nmId?: number;
  /** Product size ID in WB system */
  chrtId?: number;
  /** Price in sale currency * 100 */
  price?: number;
  /** Price in seller's country currency * 100 */
  convertedPrice?: number;
  /** Sale currency code */
  currencyCode?: number;
  /** Seller's country currency code */
  convertedCurrencyCode?: number;
  /** Cargo type: 1 - small, 2 - oversized, 3 - large */
  cargoType?: number;
  /** Customer comment */
  comment?: string;
  /** Whether this is a zero-stock order */
  isZeroOrder?: boolean;
}

/**
 * Customer contact information for DBS orders
 * Returned by getClientInfo
 */
export interface DBSClientInfo {
  /** Customer first name */
  firstName?: string;
  /** Customer full name */
  fullName?: string;
  /** Order ID */
  orderID?: number;
  /** Phone number (without country code) */
  phone?: string;
  /** Phone country code */
  phoneCode?: number;
  /** Additional phone country codes */
  additionalPhoneCodes?: number[];
}

// ============================================================================
// Bulk Operations Types (New from 14.01.2026)
// ============================================================================

/**
 * DBS supplier status
 * Triggered by seller actions
 */
export type DBSSupplierStatus =
  | 'new'
  | 'confirm'
  | 'deliver'
  | 'receive'
  | 'reject'
  | 'cancel'
  | 'canceled_by_missed_call';

/**
 * DBS WB system status
 */
export type DBSWbStatus =
  | 'waiting'
  | 'sorted'
  | 'sold'
  | 'canceled'
  | 'canceled_by_client'
  | 'declined_by_client'
  | 'defect'
  | 'ready_for_pickup'
  | 'canceled_by_missed_call';

/**
 * Order status from bulk status info endpoint
 */
export interface DBSOrderStatusBulk {
  /** Order ID */
  orderId?: number;
  /** Supplier status (triggered by seller actions) */
  supplierStatus?: DBSSupplierStatus;
  /** WB system status */
  wbStatus?: string;
  /** Errors if any occurred */
  errors?: {
    /** Error code */
    code?: number;
    /** Error description */
    detail?: string;
  }[];
}

/**
 * Response item for bulk status change operations
 */
export interface StatusSetResponse {
  /** Order ID */
  orderId?: number;
  /** Whether an error occurred */
  isError?: boolean;
  /** Array of errors (if isError is true) */
  errors?: {
    /** Error code */
    code?: number;
    /** Error description */
    detail?: string;
  }[];
}

/**
 * Request item for receive/reject operations requiring confirmation code
 */
export interface OrderCodeRequest {
  /** Order ID */
  orderId: number;
  /** Confirmation code (displayed to customer on WB site/app) */
  code: string;
}

/**
 * B2B buyer information result
 */
export interface B2BInfoResult {
  /** Order ID */
  orderId?: number;
  /** Whether an error occurred */
  isError?: boolean;
  /** B2B buyer data (present if isError is false) */
  data?: {
    /** Organization name */
    orgName?: string;
    /** INN (Tax ID) */
    inn?: string;
    /** KPP (may be empty for individual entrepreneurs) */
    kpp?: string;
  };
  /** Array of errors (present if isError is true) */
  errors?: {
    /** Error code */
    code?: number;
    /** Error description */
    detail?: string;
  }[];
}

// ============================================================================
// Metadata Types
// ============================================================================

/**
 * Metadata key types
 */
export type DBSMetadataKey = 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration';

/**
 * Order metadata structure
 */
export interface DBSOrderMeta {
  /** IMEI metadata */
  imei?: { value?: number };
  /** UIN metadata */
  uin?: { value?: number };
  /** GTIN metadata */
  gtin?: { value?: number };
  /** SGTIN (marking codes) metadata */
  sgtin?: { value?: number[] };
  /** Customs declaration metadata */
  customsDeclaration?: { value?: string };
}

// ============================================================================
// Request/Response Types
// ============================================================================

/**
 * Response from getNewOrders
 */
export interface GetNewOrdersResponse {
  /** List of new orders */
  orders?: DBSOrderNew[];
}

/**
 * Parameters for getOrders
 */
export interface GetOrdersParams {
  /** Number of orders to return (1-1000) */
  limit: number;
  /** Pagination cursor (0 for first request) */
  next: number;
  /** Start date as Unix timestamp */
  dateFrom: number;
  /** End date as Unix timestamp */
  dateTo: number;
}

/**
 * Response from getOrders
 */
export interface GetOrdersResponse {
  /** Next pagination cursor (0 if no more data) */
  next?: number;
  /** List of completed orders */
  orders?: DBSOrder[];
}

/**
 * Response from getClientInfo
 */
export interface GetClientInfoResponse {
  /** List of customer information */
  orders?: DBSClientInfo[];
}

/**
 * Response from bulk status info endpoint
 */
export interface GetStatusInfoResponse {
  /** List of order statuses */
  orders?: DBSOrderStatusBulk[];
}

/**
 * Response from bulk status change operations
 */
export interface BulkStatusChangeResponse {
  /** Unique request ID */
  requestId?: string;
  /** Results for each order */
  results?: StatusSetResponse[];
}

/**
 * Response from B2B info endpoint
 */
export interface GetB2BInfoResponse {
  /** Unique request ID */
  requestId?: string;
  /** Results for each order */
  results?: B2BInfoResult[];
}

/**
 * Response from getOrderMeta
 */
export interface GetOrderMetaResponse {
  /** Metadata structure */
  meta?: DBSOrderMeta;
}

// ============================================================================
// Deprecated Types (for legacy methods, will be disabled 13.04.2026)
// ============================================================================

/**
 * @deprecated Use DBSOrderStatusBulk instead
 * Order status from deprecated status endpoint
 */
export interface DBSOrderStatusLegacy {
  /** Order ID */
  id?: number;
  /** Supplier status */
  supplierStatus?: DBSSupplierStatus;
  /** WB system status */
  wbStatus?: string;
}

/**
 * @deprecated Use GetStatusInfoResponse instead
 * Response from deprecated status endpoint
 */
export interface GetStatusResponseLegacy {
  /** List of order statuses */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  orders?: DBSOrderStatusLegacy[];
}

// ============================================================================
// Error Types
// ============================================================================

/**
 * API Error response
 */
export interface DBSError {
  /** Error code */
  code?: string;
  /** Error message */
  message?: string;
}

/**
 * Detailed error response for bulk operations
 */
export interface DBSBulkErrorResponse {
  /** Error details */
  detail?: Record<string, unknown>;
  /** Internal WB service ID */
  origin?: string;
  /** Unique request ID */
  requestId?: string;
  /** Error title */
  title?: string;
}
