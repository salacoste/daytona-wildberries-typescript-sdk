/**
 * Orders FBS (Fulfillment by Seller) Type Definitions
 *
 * FBS (Fulfillment by Seller) - seller processes and ships orders from own warehouse
 * to Wildberries offices. This differs from FBW (Fulfillment by Wildberries) where
 * WB handles logistics from WB warehouses.
 *
 * Status Workflow:
 * - **new** → New assembly task awaiting processing
 * - **confirm** → On assembly (order added to supply)
 * - **complete** → In delivery (supply delivered to WB)
 * - **cancel** → Canceled by seller
 *
 * Note: wbStatus is managed by Wildberries system, supplierStatus is controlled
 * by seller actions through supply operations.
 *
 * @module types/orders-fbs
 */

/**
 * Delivery address information
 */
export interface Address {
  /** Full delivery address */
  fullAddress: string;
  /** GPS longitude */
  longitude: number;
  /** GPS latitude */
  latitude: number;
}

/**
 * Seller-controlled order status
 *
 * Status transitions:
 * - new: New assembly task
 * - confirm: On assembly (added to supply)
 * - complete: In delivery (supply delivered)
 * - cancel: Canceled by seller
 */
export type SupplierStatus = 'new' | 'confirm' | 'complete' | 'cancel';

/**
 * Wildberries system-controlled order status
 *
 * Status meanings:
 * - waiting: Order in progress
 * - sorted: Order sorted at WB
 * - sold: Customer received order
 * - canceled: Order canceled
 * - canceled_by_client: Customer canceled on pickup
 * - declined_by_client: Customer canceled (first hour, before assembly)
 * - defect: Canceled due to defect
 * - ready_for_pickup: Arrived at pickup point
 * - postponed_delivery: Delivery postponed
 */
export type WBStatus =
  | 'waiting'
  | 'sorted'
  | 'sold'
  | 'canceled'
  | 'canceled_by_client'
  | 'declined_by_client'
  | 'defect'
  | 'ready_for_pickup'
  | 'postponed_delivery';

/**
 * FBS Order (сборочное задание - assembly task)
 *
 * Represents an order that needs to be fulfilled by the seller from their
 * own warehouse and delivered to Wildberries offices.
 */
export interface Order {
  /** Order ID */
  id: number;
  /** Seller article */
  article: string;
  /** Product barcodes */
  skus: string[];
  /** Unique order ID (maps to srid in reports) */
  rid: string;
  /** Order creation timestamp (ISO 8601, RFC3339) */
  createdAt: string;
  /** Transaction ID (groups orders from same cart) */
  orderUid: string;

  // Product info
  /** WB article ID */
  nmId: number;
  /** Size ID in WB system */
  chrtId: number;

  // Pricing (informational)
  /** Price with discounts × 100 */
  price: number;
  /** Price in seller currency × 100 */
  convertedPrice: number;
  /** ISO 4217 currency code */
  currencyCode: number;
  /** Seller currency code */
  convertedCurrencyCode: number;
  /** Acceptance price in kopecks (after actual acceptance) */
  scanPrice?: number;

  // Delivery
  /** Delivery type - always 'fbs' for this module */
  deliveryType: 'fbs';
  /** Delivery address (if applicable) */
  address?: Address;
  /** WB offices to deliver to */
  offices?: string[];

  // Warehouse
  /** Seller warehouse ID */
  warehouseId: number;
  /** WB office ID bound to seller warehouse */
  officeId: number;

  // Supply
  /** Supply ID if order assigned to supply */
  supplyId?: string;

  // Product characteristics
  /** Cargo type: 1=МГТ, 2=СГТ, 3=КГТ+ */
  cargoType: 1 | 2 | 3;
  /** Color code (for colorable goods) */
  colorCode?: string;
  /** Customer comment (max 300 chars) */
  comment?: string;

  // Flags
  /**
   * Zero stock order flag
   *
   * true = ordered with zero stock (can cancel without penalty)
   */
  isZeroOrder: boolean;

  // Options
  options?: {
    /** B2B sale flag */
    isB2b: boolean;
  };
}

/**
 * New FBS order with additional metadata
 *
 * Extends Order with fields specific to new orders awaiting processing
 */
export interface OrderNew extends Order {
  /** Planned delivery date (for СГТ only) */
  ddate?: string;
  /** Sale price × 100 (with seller discount, no WB Club) */
  salePrice?: number;
  /** Required metadata (e.g., ['uin', 'imei']) */
  requiredMeta?: string[];
}

/**
 * Order status information
 *
 * Contains both seller-controlled and WB system status for an order
 */
export interface OrderStatus {
  /** Order ID */
  id: number;
  /** Seller-controlled status */
  supplierStatus: SupplierStatus;
  /** WB system status */
  wbStatus: WBStatus;
}

/**
 * Order filter parameters
 *
 * Used for filtering and paginating order retrieval
 */
export interface OrderFilters {
  /**
   * Start date for order filter (Unix timestamp)
   * Default: 30 days ago
   */
  dateFrom?: number;
  /**
   * End date for order filter (Unix timestamp)
   * Default: now
   */
  dateTo?: number;
  /**
   * Number of orders per page
   * Range: 1-1000
   * Default: 1000
   */
  limit?: number;
  /**
   * Pagination cursor
   * 0 for first page, use 'next' from response for subsequent pages
   */
  next?: number;
}

/**
 * Response from getNewOrders endpoint
 */
export interface GetNewOrdersResponse {
  /** Array of new orders awaiting processing */
  orders: OrderNew[];
}

/**
 * Response from getOrders endpoint
 *
 * IMPORTANT: Returns orders WITHOUT current status.
 * Use getOrderStatuses() to get order status.
 */
export interface GetOrdersResponse {
  /**
   * Next pagination cursor
   * 0 or null means no more pages
   */
  next: number;
  /** Array of orders matching filters */
  orders: Order[];
}

/**
 * Request body for getOrderStatuses endpoint
 */
export interface GetOrderStatusesRequest {
  /**
   * Array of order IDs to check status for
   * Range: 1-1000 items
   */
  orders: number[];
}

/**
 * Response from getOrderStatuses endpoint
 */
export interface GetOrderStatusesResponse {
  /** Array of order statuses */
  orders: OrderStatus[];
}

// ============================================================================
// Supply Management Types
// ============================================================================

/**
 * Supply / Shipment
 *
 * Represents a group of FBS orders being shipped together to WB offices.
 * Supply workflow:
 * 1. Create supply (empty, no cargoType)
 * 2. Add first order → supply gets cargoType, order: new → confirm
 * 3. Add more orders (must match cargoType) → orders: new → confirm
 * 4. Get order stickers (orders must be in confirm status)
 * 5. Deliver supply → orders: confirm → complete, supply closed
 * 6. Get supply QR code (only available after delivery)
 */
export interface Supply {
  /** Supply ID (format: WB-GI-1234567) */
  id: string;
  /** Supply name (1-128 characters) */
  name: string;
  /** Closed flag (true=delivered/closed, false=active) */
  done: boolean;
  /** Creation timestamp (ISO 8601, RFC3339) */
  createdAt: string;
  /** Closed timestamp when delivered (ISO 8601, RFC3339) */
  closedAt?: string;
  /** First scan timestamp (ISO 8601, RFC3339) */
  scanDt?: string;
}

/**
 * Supply filter parameters
 *
 * Used for filtering and paginating supply retrieval
 */
export interface SupplyFilters {
  /**
   * Number of supplies per page
   * Range: 1-1000
   * Default: 1000
   */
  limit?: number;
  /**
   * Pagination cursor
   * 0 for first page, use 'next' from response for subsequent pages
   */
  next?: number;
}

/**
 * Request body for createSupply endpoint
 */
export interface CreateSupplyRequest {
  /**
   * Supply name
   * Range: 1-128 characters
   */
  name: string;
}

/**
 * Response from createSupply endpoint
 */
export interface CreateSupplyResponse {
  /**
   * Created supply ID
   * Format: WB-GI-1234567
   */
  id: string;
}

/**
 * Response from getSupplies endpoint
 */
export interface GetSuppliesResponse {
  /**
   * Next pagination cursor
   * 0 means no more pages
   */
  next: number;
  /** Array of supplies */
  supplies: Supply[];
}

// ============================================================================
// Shipping Label and Barcode Types
// ============================================================================

/**
 * Sticker / Label format
 *
 * Supported formats:
 * - svg: Vector graphics
 * - png: Raster image
 * - zplv: Zebra printer (vertical)
 * - zplh: Zebra printer (horizontal)
 */
export type StickerFormat = 'svg' | 'png' | 'zplv' | 'zplh';

/**
 * Sticker / Label size
 *
 * Valid size combinations:
 * - 580×400 px (width=58, height=40)
 * - 400×300 px (width=40, height=30)
 */
export interface StickerSize {
  /** Width (58 or 40) */
  width: 58 | 40;
  /** Height (40 or 30) */
  height: 40 | 30;
}

/**
 * Sticker generation options
 *
 * Specifies format and size for order shipping labels
 */
export interface StickerOptions {
  /** Sticker format */
  type: StickerFormat;
  /** Sticker width (58 or 40) */
  width: 58 | 40;
  /** Sticker height (40 or 30) */
  height: 40 | 30;
}

/**
 * Order shipping label / sticker
 *
 * Contains base64-encoded shipping label for a single order
 */
export interface OrderSticker {
  /** Order ID */
  orderId: number;
  /** First part of sticker ID */
  partA: string;
  /** Second part of sticker ID */
  partB: string;
  /** Encoded barcode value */
  barcode: string;
  /** Base64-encoded sticker file in specified format */
  file: string;
}

/**
 * Request body for getOrderStickers endpoint
 */
export interface GetOrderStickersRequest {
  /**
   * Array of order IDs to generate stickers for
   * Range: 1-100 items
   * Orders must be in 'confirm' status
   */
  orders: number[];
}

/**
 * Response from getOrderStickers endpoint
 */
export interface GetOrderStickersResponse {
  /** Array of order stickers */
  stickers: OrderSticker[];
}

/**
 * Barcode / QR code format
 *
 * Same format options as stickers
 */
export type BarcodeType = 'svg' | 'png' | 'zplv' | 'zplh';

/**
 * Supply barcode / QR code
 *
 * Contains base64-encoded QR code for supply (580×400 px)
 * Available only after supply has been delivered
 */
export interface SupplyBarcode {
  /** Barcode value (supply ID) */
  barcode: string;
  /** Base64-encoded QR code file in specified format */
  file: string;
}

/**
 * Warehouse information for pass management
 *
 * Data about warehouse/office that requires seller passes for entry.
 * Used for pass management and warehouse operations planning.
 */
export interface PassOffice {
  /** Warehouse/office name */
  name: string;
  /** Warehouse/office address */
  address: string;
  /** Warehouse/office ID (64-bit integer) */
  id: number;
}

/**
 * Seller pass information
 *
 * Complete pass data including driver information, vehicle details,
 * and assigned warehouse/office information.
 */
export interface Pass {
  /** Driver first name */
  firstName: string;
  /** Pass expiration date */
  dateEnd: string;
  /** Driver last name */
  lastName: string;
  /** Vehicle model */
  carModel: string;
  /** Vehicle license plate number */
  carNumber: string;
  /** Assigned warehouse/office name */
  officeName: string;
  /** Assigned warehouse/office address */
  officeAddress: string;
  /** Assigned warehouse/office ID (64-bit integer) */
  officeId: number;
  /** Pass ID (64-bit integer) */
  id: number;
}

/**
 * Response type for getPassOffices endpoint
 *
 * Returns array of warehouses requiring passes for entry.
 */
export type PassOfficesResponse = PassOffice[];

/**
 * Response type for getPasses endpoint
 *
 * Returns array of all created seller passes.
 */
export type PassesResponse = Pass[];

/**
 * Reshipment order information
 *
 * Order that requires reshipment due to incomplete scanning at the pickup point.
 * These orders need to be delivered again as part of a new supply.
 */
export interface ReshipmentOrder {
  /** Supply ID (format: WB-GI-1234567) */
  supplyID: string;
  /** Order ID (assembly task ID) */
  orderID: number;
}

/**
 * Response type for getReshipmentOrders endpoint
 *
 * Returns array of orders requiring reshipment.
 */
export interface ReshipmentOrdersResponse {
  /** Array of reshipment orders */
  orders: ReshipmentOrder[];
}

// ============================================================================
// Order Metadata Management Types
// ============================================================================

/**
 * Response type for getOrderMetadata endpoint
 *
 * Returns detailed metadata for a specific order including client information.
 */
export interface OrderMetadataResponse {
  /** Order ID */
  orderId: number;
  /** Client name */
  clientName: string;
  /** Client phone number */
  phone: string;
  /** Delivery address */
  address: Address;
  /** Warehouse name */
  warehouseName: string;
  /** Order total price */
  totalPrice: number;
  /** Currency code */
  currency: string;
}

/**
 * Order item with identifier (for SGTIN, UIN, IMEI, GTIN)
 */
export interface OrderItemWithIdentifier {
  /** Product article */
  article: string;
  /** Identifier value */
  [key: string]: string | number;
  /** Quantity */
  quantity: number;
}

/**
 * Response type for getOrderSgtin endpoint
 */
export interface OrderSgtinResponse {
  /** Array of items with SGTIN data */
  items: OrderItemWithIdentifier[];
}

/**
 * Response type for getOrderUin endpoint
 */
export interface OrderUinResponse {
  /** Array of items with UIN data */
  items: OrderItemWithIdentifier[];
}

/**
 * Response type for getOrderImei endpoint
 */
export interface OrderImeiResponse {
  /** Array of items with IMEI data */
  items: OrderItemWithIdentifier[];
}

/**
 * Response type for getOrderGtin endpoint
 */
export interface OrderGtinResponse {
  /** Array of items with GTIN data */
  items: OrderItemWithIdentifier[];
}

/**
 * Order item with expiration date
 */
export interface OrderItemWithExpiration {
  /** Product article */
  article: string;
  /** Expiration date (ISO 8601) */
  expirationDate: string;
  /** Quantity */
  quantity: number;
}

/**
 * Response type for getOrderExpiration endpoint
 */
export interface OrderExpirationResponse {
  /** Array of items with expiration data */
  items: OrderItemWithExpiration[];
}

/**
 * Response type for getOrdersByClient endpoint
 */
export interface OrdersByClientResponse {
  /** Array of orders for the client */
  orders: Order[];
}

/**
 * Order status change record
 */
export interface OrderStatusChange {
  /** Status change date (ISO 8601) */
  date: string;
  /** Previous status */
  oldStatus: string;
  /** New status */
  newStatus: string;
  /** Optional comment */
  comment?: string;
}

/**
 * Response type for getOrderStatusHistory endpoint
 */
export interface OrderStatusHistoryResponse {
  /** Array of status changes */
  statusChanges: OrderStatusChange[];
}

/**
 * Transport box information
 */
export interface TransportBox {
  /** Transport box ID */
  trbxId: string;
  /** Box weight in kg */
  weight: number;
  /** Box length in cm */
  length: number;
  /** Box width in cm */
  width: number;
  /** Box height in cm */
  height: number;
  /** Number of orders in box */
  orderCount: number;
}

/**
 * Response type for getSupplyTrbx endpoint
 */
export interface SupplyTrbxResponse {
  /** Supply ID */
  supplyId: string;
  /** Array of transport boxes */
  boxes: TransportBox[];
}

/**
 * Transport box sticker information
 */
export interface TransportBoxSticker {
  /** Transport box ID */
  trbxId: string;
  /** Sticker file (base64 encoded) */
  file: string;
}

/**
 * Response type for getSupplyTrbxStickers endpoint
 */
export interface SupplyTrbxStickersResponse {
  /** Array of transport box stickers */
  stickers: TransportBoxSticker[];
}

// ============================================================================
// Pass Management Types
// ============================================================================

/**
 * Request type for createPass endpoint
 */
export interface CreatePassRequest {
  /** Warehouse/office ID */
  officeId: string;
  /** Vehicle brand */
  carBrand: string;
  /** Vehicle model */
  carModel: string;
  /** Vehicle license plate */
  carNumber: string;
  /** Driver first name */
  firstName: string;
  /** Driver last name */
  lastName: string;
  /** Driver middle name (optional) */
  middleName?: string;
  /** Driver phone number */
  phone: string;
  /** Passport series */
  passportSeries: string;
  /** Passport number */
  passportNumber: string;
  /** Pass start date (YYYY-MM-DD) */
  dateStart: string;
  /** Pass end date (YYYY-MM-DD) */
  dateEnd: string;
}

/**
 * Response type for createPass endpoint
 */
export interface CreatePassResponse {
  /** Created pass ID */
  id: string;
  /** Pass start date */
  dateStart: string;
  /** Pass end date */
  dateEnd: string;
}

/**
 * Order in supply information
 */
export interface OrderInSupply {
  /** Order ID */
  id: number;
  /** Product article */
  article: string;
  /** Quantity */
  quantity: number;
  /** Order status */
  status: string;
  /** Date added to supply */
  addedAt: string;
}

/**
 * Response type for getSupplyOrders endpoint
 */
export interface SupplyOrdersResponse {
  /** Array of orders in supply */
  orders: OrderInSupply[];
}

// ============================================================================
// Missing Methods Types (Epic 7 - API Compliance)
// ============================================================================

/**
 * Request type for updatePass endpoint
 * PUT /api/v3/passes/{passId}
 */
export interface UpdatePassRequest {
  /** Driver first name (min 1 character) */
  firstName: string;
  /** Driver last name (min 6 characters) */
  lastName: string;
  /** Vehicle model (1-100 characters) */
  carModel: string;
  /** Vehicle license plate (6-9 characters, letters and digits only) */
  carNumber: string;
  /** Warehouse/office ID */
  officeId: number;
}

/**
 * Metadata key for order metadata deletion
 * Used with deleteOrderMetadata endpoint
 */
export type OrderMetadataKey = 'imei' | 'uin' | 'gtin' | 'sgtin';

/**
 * Request type for setOrderSGTIN endpoint
 * PUT /api/v3/orders/{orderId}/meta/sgtin
 */
export interface SetOrderSGTINRequest {
  /** Array of SGTIN codes (16-135 characters each, max 24 items) */
  sgtins: string[];
}

/**
 * Request type for setOrderUIN endpoint
 * PUT /api/v3/orders/{orderId}/meta/uin
 */
export interface SetOrderUINRequest {
  /** UIN code (exactly 16 characters) */
  uin: string;
}

/**
 * Request type for setOrderIMEI endpoint
 * PUT /api/v3/orders/{orderId}/meta/imei
 */
export interface SetOrderIMEIRequest {
  /** IMEI code (exactly 15 characters) */
  imei: string;
}

/**
 * Request type for setOrderGTIN endpoint
 * PUT /api/v3/orders/{orderId}/meta/gtin
 */
export interface SetOrderGTINRequest {
  /** GTIN code (exactly 13 characters) */
  gtin: string;
}

/**
 * Request type for setOrderExpiration endpoint
 * PUT /api/v3/orders/{orderId}/meta/expiration
 */
export interface SetOrderExpirationRequest {
  /** Expiration date in format dd.mm.yyyy (min 30 days from now) */
  expiration: string;
}

/**
 * Cross-border sticker (PDF format)
 * Used in getCrossBorderStickers response
 */
export interface CrossBorderSticker {
  /** Base64-encoded PDF sticker file */
  file: string;
  /** Order ID */
  orderId: number;
}

/**
 * Response type for getCrossBorderStickers endpoint
 * POST /api/v3/orders/stickers/cross-border
 */
export interface CrossBorderStickersResponse {
  /** Array of cross-border stickers */
  stickers: CrossBorderSticker[];
}

/**
 * External sticker link (for cross-border orders)
 * Used in getExternalStickersUrls response
 * @deprecated Method will be disabled on October 23
 */
export interface ExternalStickerLink {
  /** Order ID */
  orderID: number;
  /** URL to download sticker */
  url: string;
  /** Tracking number (parcel ID) */
  parcelID: string;
}

/**
 * Response type for getExternalStickersUrls endpoint
 * POST /api/v3/files/orders/external-stickers
 * @deprecated Method will be disabled on October 23
 */
export interface ExternalStickersUrlsResponse {
  /** Array of external sticker links */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  stickers: ExternalStickerLink[];
}

/**
 * Cross-border order status history entry
 */
export interface CrossBorderStatusHistoryEntry {
  /** Status date (ISO 8601) */
  date: string | null;
  /** Status code */
  code: string;
}

/**
 * Cross-border order with status history
 */
export interface CrossBorderOrderHistory {
  /** Planned delivery date (RFC3339) */
  deliveryDate: string;
  /** Order ID */
  orderID: number;
  /** Status history */
  statuses: CrossBorderStatusHistoryEntry[];
}

/**
 * Response type for getOrdersStatusHistoryCrossBorder endpoint
 * POST /api/v3/orders/status/history
 */
export interface CrossBorderStatusHistoryResponse {
  /** Array of orders with status history */
  orders: CrossBorderOrderHistory[];
}

/**
 * Cross-border Turkey client address
 */
export interface CrossBorderTurkeyAddress {
  /** Full address */
  fullAddress: string;
  /** City */
  city: string;
  /** District */
  district: string;
  /** Street */
  street: string;
  /** Building */
  building: string;
  /** Apartment */
  apartment: string;
  /** Postal code */
  zipCode: string;
}

/**
 * Cross-border Turkey client order info
 */
export interface CrossBorderTurkeyOrderInfo {
  /** Order ID */
  orderID: number;
  /** Client name */
  clientName: string;
  /** Client phone */
  phone: string;
  /** Delivery address */
  address: CrossBorderTurkeyAddress;
}

/**
 * Response type for getOrdersWithClientInfo endpoint
 * POST /api/v3/orders/client (Turkey cross-border only)
 */
export interface CrossBorderTurkeyClientInfoResponse {
  /** Array of orders with client info */
  orders: CrossBorderTurkeyOrderInfo[];
}

/**
 * Response type for addSupplyTrbx endpoint
 * POST /api/v3/supplies/{supplyId}/trbx
 */
export interface AddSupplyTrbxResponse {
  /** Array of created transport box IDs */
  trbxIds: string[];
}
