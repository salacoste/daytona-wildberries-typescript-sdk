/**
 * In-Store Pickup API Types
 * Generated from: wildberries_api_doc/06-in-store-pickup.yaml
 *
 * @module InStorePickupTypes
 */

/**
 * New order for in-store pickup
 */
export interface NewOrder {
  /** Order ID */
  id: number;
  /** Warehouse ID where order should be assembled */
  warehouseId: number;
  /** Warehouse address */
  warehouseAddress: string;
  /** Wildberries article number */
  nmId: number;
  /** Seller's article */
  article: string;
  /** Size ID in WB system */
  chrtId: number;
  /** Product barcodes */
  skus: string[];
  /** Unique order ID */
  rid: string;
  /** Customer's unique order code */
  orderCode: string;
  /** Payment mode: prepaid, postpaid, or unknown */
  payMode: string;
  /** Price with discounts (excluding WB Wallet), multiplied by 100 */
  price: number;
  /** Final price to pay, multiplied by 100 */
  finalPrice: number;
  /** Converted price in seller's currency, multiplied by 100 */
  convertedPrice: number;
  /** Converted final price in seller's currency, multiplied by 100 */
  convertedFinalPrice: number;
  /** Sale price in seller's currency, multiplied by 100 */
  salePrice: number | null;
  /** Currency code (ISO 4217) */
  currencyCode: number;
  /** Seller's currency code (ISO 4217) */
  convertedCurrencyCode: number;
  /** Cargo type: 1 = small, 2 = oversized, 3 = large */
  cargoType: 1 | 2 | 3;
  /** Is this a zero-stock order */
  isZeroOrder: boolean;
  /** Planned delivery date */
  ddate: string;
  /** Order creation timestamp (RFC3339) */
  createdAt: string;
  /** List of required metadata types for this order */
  requiredMeta: string[] | null;
}

/**
 * Response with list of new orders
 */
export interface NewOrdersResponse {
  /** Array of new pickup orders */
  orders: NewOrder[];
}

/**
 * Completed order information
 */
export interface Order {
  /** Order ID */
  id: number;
  /** Warehouse ID */
  warehouseId: number;
  /** Warehouse address */
  warehouseAddress: string;
  /** Wildberries article number */
  nmId: number;
  /** Seller's article */
  article: string;
  /** Size ID in WB system */
  chrtId: number;
  /** Product barcodes */
  skus: string[];
  /** Unique order ID */
  rid: string;
  /** Customer's unique order code */
  orderCode: string;
  /** Payment mode: prepaid, postpaid, or unknown */
  payMode: string;
  /** Price with discounts (excluding WB Wallet), multiplied by 100 */
  price: number;
  /** Final price to pay, multiplied by 100 */
  finalPrice: number;
  /** Converted price in seller's currency, multiplied by 100 */
  convertedPrice: number;
  /** Converted final price in seller's currency, multiplied by 100 */
  convertedFinalPrice: number;
  /** Currency code (ISO 4217) */
  currencyCode: number;
  /** Seller's currency code (ISO 4217) */
  convertedCurrencyCode: number;
  /** Cargo type: 1 = small, 2 = oversized, 3 = large */
  cargoType: 1 | 2 | 3;
  /** Is this a zero-stock order */
  isZeroOrder: boolean;
  /** Order creation timestamp (RFC3339) */
  createdAt: string;
}

/**
 * Response with list of completed orders (paginated)
 */
export interface OrdersResponse {
  /** Array of completed orders */
  orders: Order[];
  /** Next pagination value */
  next: number;
}

/**
 * Order status information
 */
export interface OrderStatus {
  /** Order ID */
  id: number;
  /** Seller's status: new, confirm, prepare, receive, reject, cancel, cancel_shelf_life */
  supplierStatus: string;
  /** WB system status: waiting, sold, canceled, canceled_by_client, declined_by_client, defect, ready_for_pickup */
  wbStatus: string;
}

/**
 * Response with order statuses
 */
export interface OrderStatusesResponse {
  /** Array of order statuses */
  orders: OrderStatus[];
}

/**
 * Request to get order statuses
 */
export interface OrderStatusRequest {
  /** Array of order IDs */
  orders: number[];
}

/**
 * Customer information for an order
 */
export interface OrderClientInfo {
  /** Order ID */
  orderID: number;
  /** Customer's first name */
  firstName: string;
  /** Phone number to contact customer (not direct, requires extension) */
  phone: string;
  /** Phone extension code */
  phoneCode: number;
}

/**
 * Response with customer information
 */
export interface OrderClientInfoResponse {
  /** Array of customer information */
  orders: OrderClientInfo[];
}

/**
 * Request to verify customer identity
 */
export interface CheckIdentityRequest {
  /** Customer's unique order code */
  orderCode: string;
  /** Verification passcode */
  passcode: string;
}

/**
 * Customer identity verification result
 */
export interface CheckedIdentity {
  /** true if order belongs to customer, false never returned (409 error instead) */
  ok: boolean;
}

/**
 * Order metadata
 */
export interface OrderMetadata {
  /** Metadata object */
  meta: {
    /** SGTIN (Честный знак marking code) */
    sgtin?: {
      value: string[] | null;
    };
    /** UIN (Unique Identification Number) */
    uin?: {
      value: string | null;
    };
    /** IMEI code for electronics */
    imei?: {
      value: string | null;
    };
    /** GTIN code (Belarus unique product ID) */
    gtin?: {
      value: string | null;
    };
  };
}

/**
 * Request to set SGTIN codes
 */
export interface SGTINRequest {
  /** Array of SGTIN codes (16-135 characters each) */
  sgtins: string[];
}

/**
 * Request to set UIN code
 */
export interface UINRequest {
  /** UIN code */
  uin: string;
}

/**
 * Request to set IMEI code
 */
export interface IMEIRequest {
  /** IMEI code */
  imei: string;
}

/**
 * Request to set GTIN code
 */
export interface GTINRequest {
  /** GTIN code */
  gtin: string;
}

/**
 * API error response
 */
export interface APIError {
  /** Error code */
  code: string;
  /** Error message */
  message: string;
  /** Additional error data */
  data?: Record<string, unknown> | null;
}

/**
 * Query parameters for getting completed orders
 */
export interface GetOrdersParams {
  /** Maximum number of items to return (1-1000) */
  limit: number;
  /** Pagination offset (0 for first request) */
  next: number;
  /** Period start date (Unix timestamp) */
  dateFrom: number;
  /** Period end date (Unix timestamp, max 30 days from dateFrom) */
  dateTo: number;
}
