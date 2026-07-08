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
  /** Delivery type: 'dbs' (seller delivery) | 'edbs' (express seller delivery) */
  deliveryType?: 'dbs' | 'edbs';
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
  | 'cancel_missed_call';

/**
 * DBS WB system status
 */
export type DBSWbStatus =
  | 'waiting'
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
 * Per-order metadata validation status returned in 409 MetaValidationFail responses.
 * When `deliverBulk()` returns this for an order, the marking metadata (SGTIN/IMEI)
 * failed WB's validation — fix the metadata before retrying.
 *
 * @since 3.11.0
 */
export interface MetaValidationDetail {
  /** Order ID this validation status applies to */
  orderId?: number;
  /** Validation result. WB-known values: `'valid'` | `'invalid'`. May contain other server-side strings. */
  status?: 'valid' | 'invalid' | (string & {});
  /** Optional human-readable detail */
  message?: string;
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
    /**
     * Per-order metadata validation details. Present when `code === 409`
     * and the failure is `MetaValidationFail` (since v3.11.0 — WB API 2026-05-06).
     * Use this to identify which orders need metadata fixes before retrying deliver.
     */
    metaDetails?: MetaValidationDetail[];
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
// ============================================================================
// Info Endpoint Types (EPIC 26)
// ============================================================================

/**
 * Request body for getGroupsInfo
 * Used to query order group information
 */
export interface OrderGroupsRequest {
  /** Array of order IDs to query groups for */
  orders: number[];
}

/**
 * A single order group containing related orders
 */
export interface OrderGroup {
  /** Group ID */
  id: number;
  /** Order IDs in this group */
  orders: number[];
  /** Group name */
  name: string;
}

/**
 * Response from getGroupsInfo
 */
export interface OrderGroupsResponse {
  /** List of order groups */
  groups: OrderGroup[];
}

/**
 * Request body for getDeliveryDates
 * Used to query delivery date information for orders
 */
export interface DeliveryDatesRequest {
  /** Array of order IDs to query delivery dates for */
  orders: number[];
}

/**
 * Delivery date information for a single order
 */
export interface DeliveryDateInfo {
  /** Order ID */
  orderId: number;
  /** Planned delivery date (ISO 8601) */
  deliveryDate: string;
  /** Maximum allowed delivery date (ISO 8601) */
  maxDeliveryDate: string;
}

/**
 * Response from getDeliveryDates
 */
export interface DeliveryDatesInfoResponse {
  /** List of delivery date information per order */
  orders: DeliveryDateInfo[];
}

// ============================================================================
// Bulk Metadata Types (EPIC 26)
// ============================================================================

/**
 * Request body for getMetaBulk
 */
export interface GetMetaBulkRequest {
  /** Array of order IDs to get metadata for */
  orders: number[];
}

/**
 * Metadata for a single order in bulk response
 */
export interface BulkOrderMeta {
  /** Order ID */
  orderId: number;
  /** IMEI code */
  imei?: string;
  /** UIN code */
  uin?: string;
  /** GTIN code */
  gtin?: string;
  /** SGTIN marking codes */
  sgtins?: string[];
  /** Customs declaration number */
  customsDeclaration?: string;
}

/**
 * Response from getMetaBulk
 */
export interface GetOrderMetaBulkResponse {
  /** Metadata for each requested order */
  orders: BulkOrderMeta[];
}

/**
 * Request body for deleteMetaBulk
 */
export interface DeleteMetaBulkRequest {
  /** Array of order IDs to delete metadata from */
  orders: number[];
  /** Metadata key to delete */
  key: string;
}

/**
 * Response from deleteMetaBulk
 */
export interface DeleteMetaBulkResponse {
  /** Results for each order */
  orders: { orderId: number; success: boolean; error?: string }[];
}

/**
 * Request body for setSgtinBulk
 */
export interface SetSgtinBulkRequest {
  /** Array of orders with SGTIN codes to set */
  orders: { orderId: number; sgtins: string[] }[];
}

/**
 * Request body for setUinBulk
 */
export interface SetUinBulkRequest {
  /** Array of orders with UIN codes to set */
  orders: { orderId: number; uin: string }[];
}

/**
 * Request body for setImeiBulk
 */
export interface SetImeiBulkRequest {
  /** Array of orders with IMEI codes to set */
  orders: { orderId: number; imei: string }[];
}

/**
 * Request body for setGtinBulk
 */
export interface SetGtinBulkRequest {
  /** Array of orders with GTIN codes to set */
  orders: { orderId: number; gtin: string }[];
}

/**
 * Request body for setCustomsDeclarationBulk
 */
export interface SetCustomsDeclarationBulkRequest {
  /** Array of orders with customs declaration numbers to set */
  orders: { orderId: number; customsDeclaration: string }[];
}

/**
 * Result item for a single order in bulk metadata set response
 */
export interface BulkMetaResultItem {
  /** Order ID */
  orderId: number;
  /** Whether the operation succeeded */
  success: boolean;
  /** Error message if failed */
  error?: string;
}

/**
 * Error detail for a single order in bulk metadata operations
 */
export interface BulkMetaError {
  /** Order ID that caused the error */
  orderId: number;
  /** Error message */
  message: string;
  /** Error code */
  code: string;
}

/**
 * Response from bulk metadata set operations (setSgtinBulk, setUinBulk, etc.)
 */
export interface SetMetaBulkResponse {
  /** Results for each order */
  orders: BulkMetaResultItem[];
  /** Additional errors if any */
  errors?: BulkMetaError[];
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
