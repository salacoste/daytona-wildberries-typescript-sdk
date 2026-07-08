/**
 * Auto-generated TypeScript types for orders-fbs module
 * Generated from: wildberries_api_doc/03-orders-fbs.yaml
 *
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 *
 * Generated: 2025-12-14T23:02:33.780Z
 */

// ============================================================================
// Enums & Union Types
// ============================================================================

/** Supplier-side order status */
export type OrderSupplierStatus = 'new' | 'confirm' | 'complete' | 'cancel';

/** Wildberries system order status */
export type OrderWbStatus =
  | 'waiting'
  | 'sorted'
  | 'sold'
  | 'canceled'
  | 'canceled_by_client'
  | 'declined_by_client'
  | 'defect'
  | 'ready_for_pickup'
  | 'postponed_delivery'
  | 'accepted_by_carrier'
  | 'sent_to_carrier';

/** Cargo type: 1 = small, 2 = oversized, 3 = large */
export type CargoType = 1 | 2 | 3;

/** Sticker output format */
export type StickerType = 'svg' | 'zplv' | 'zplh' | 'png';

// ============================================================================
// Request Types
// ============================================================================

/** Parameters for paginated order listing */
export interface GetOrdersParams {
  /** Maximum number of items to return (1-1000) */
  limit: number;
  /** Pagination cursor; set to 0 for the first request */
  next: number;
  /** Start of date range (Unix timestamp) */
  dateFrom?: number;
  /** End of date range (Unix timestamp) */
  dateTo?: number;
  /** Index signature for compatibility with Record<string, unknown> */
  [key: string]: unknown;
}

/** Request body containing an array of order IDs for status lookup */
export interface OrderStatusRequest {
  /** List of order IDs */
  orders: number[];
}

/** Request body for retrieving order stickers */
export interface StickerRequest {
  /** List of order IDs (max 100) */
  orders?: number[];
}

/** Query parameters for sticker format and dimensions */
export interface StickerParams {
  /** Output format */
  type: StickerType;
  /** Sticker width in mm (58 or 40) */
  width: number;
  /** Sticker height in mm (40 or 30) */
  height: number;
  /** Index signature for compatibility with Record<string, unknown> */
  [key: string]: unknown;
}

/** Request body for cross-border order stickers */
export interface CrossBorderStickerRequest {
  /** List of order IDs */
  orders?: number[];
}

/** Request body for cross-border status history lookup */
export interface StatusHistoryRequest {
  /** List of order IDs */
  orders?: number[];
}

/** Query parameters for deleting order metadata by key */
export interface DeleteMetaParams {
  /** Metadata key to delete: imei, uin, gtin, sgtin, or customsDeclaration */
  key?: 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration';
}

/** Request body for attaching SGTIN marking codes to an order */
export interface MetaSgtinRequest {
  /** List of SGTIN marking codes */
  sgtins: string[];
}

/** Request body for attaching a UIN to an order */
export interface MetaUinRequest {
  /** Unique identification number */
  uin: string;
}

/** Request body for attaching an IMEI to an order */
export interface MetaImeiRequest {
  /** IMEI number */
  imei: string;
}

/** Request body for attaching a GTIN to an order */
export interface MetaGtinRequest {
  /** Global Trade Item Number */
  gtin: string;
}

/** Request body for attaching an expiration date to an order */
export interface MetaExpirationRequest {
  /** Expiration date string (dd.mm.yyyy) */
  expiration: string;
}

/** Request body for attaching a customs declaration number to an order */
export interface MetaCustomsDeclarationRequest {
  /** Customs declaration number */
  customsDeclaration: string;
}

/** Request body for creating a new supply */
export interface SupplyCreateRequest {
  /** Supply name */
  name?: string;
}

/** Request body for adding orders to a supply */
export interface AddOrdersToSupplyRequest {
  /** List of order IDs to add */
  orders: number[];
}

/** Request body for creating boxes (trbx) in a supply */
export interface TrbxCreateRequest {
  /** Number of boxes to create */
  amount: number;
}

/** Request body for deleting boxes from a supply */
export interface TrbxDeleteRequest {
  /** List of box IDs to delete */
  trbxIds: string[];
}

/** Request body for retrieving box stickers */
export interface TrbxStickerRequest {
  /** List of box IDs */
  trbxIds: string[];
}

/** Request body for creating a seller pass */
export interface PassCreateRequest {
  /** Driver first name */
  firstName: string;
  /** Driver last name */
  lastName: string;
  /** Car model */
  carModel: string;
  /** Car number (letters and digits only) */
  carNumber: string;
  /** Warehouse office ID */
  officeId: number;
}

/** Response after creating a seller pass */
export interface PassCreateResponse {
  /** Created pass ID */
  id?: number;
}

/** Query parameters for fetching supplies list */
export interface GetSuppliesParams {
  /** Maximum number of items to return */
  limit: number;
  /** Pagination cursor; set to 0 for the first request */
  next: number;
  /** Index signature for compatibility with Record<string, unknown> */
  [key: string]: unknown;
}

/** Query parameters for sticker/barcode format */
export interface BarcodeParams {
  /** Output format */
  type: StickerType;
  /** Index signature for compatibility with Record<string, unknown> */
  [key: string]: unknown;
}

/** Request body for retrieving metadata of multiple orders (max 100) */
export interface GetMetaMultiRequest {
  /** List of order IDs (max 100) */
  orders: number[];
}

/**
 * Generic order IDs request body used across multiple endpoints
 *
 * @example
 * ```json
 * {
 *   "orders": [
 *     987654321,
 *     123456789
 *   ]
 * }
 * ```
 */
export interface OrdersRequestAPI {
  /** List of order IDs */
  orders?: number[];
}

// ============================================================================
// Response Types
// ============================================================================

/** Response containing a list of new (unprocessed) orders */
export interface OrdersNewResponse {
  /** List of new orders */
  orders?: OrderNew[];
}

/** Paginated response containing orders */
export interface OrdersResponse {
  /** Pagination cursor for the next page */
  next?: Next;
  /** List of orders */
  orders?: Order[];
}

/** Individual order status entry */
export interface OrderStatusItem {
  /** Order ID */
  id?: number;
  /** Supplier-side status */
  supplierStatus?: OrderSupplierStatus;
  /** Wildberries system status */
  wbStatus?: OrderWbStatus;
  /**
   * Whether this assembly task can still be cancelled by the seller before
   * being transferred to Wildberries. When `true`, you can call
   * `sdk.ordersFBS.cancelOrder(orderId)` and it will succeed.
   *
   * Use this field as a pre-check to avoid unnecessary API calls and 4xx errors
   * when the task is already past the cancellation window.
   *
   * @since 3.11.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post}
   * @example
   * ```typescript
   * for (const status of statuses) {
   *   if (status.isCancellable) {
   *     await sdk.ordersFBS.cancelOrder(status.id!);
   *   }
   * }
   * ```
   */
  isCancellable?: boolean;
}

/** Response containing order statuses */
export interface OrderStatusResponse {
  /** List of order status entries */
  orders?: OrderStatusItem[];
}

/** Response containing orders that require reshipment */
export interface ReshipmentResponse {
  /** List of reshipment orders */
  orders?: ReshipmentOrder[];
}

/** An order that requires reshipment */
export interface ReshipmentOrder {
  /** Supply ID the order belongs to */
  supplyID?: string;
  /** Order ID */
  orderID?: number;
}

/** Individual sticker data item */
export interface StickerItem {
  /** Order ID */
  orderId?: number;
  /** Sticker part A value */
  partA?: string;
  /** Sticker part B value */
  partB?: string;
  /** Encoded barcode value */
  barcode?: string;
  /** Base64-encoded sticker file */
  file?: string;
}

/** Response containing order stickers */
export interface StickerResponse {
  /** List of sticker data */
  stickers?: StickerItem[];
}

/** Individual cross-border sticker data item */
export interface CrossBorderStickerItem {
  /** Base64-encoded sticker file */
  file?: string;
  /** Order ID */
  orderId?: number;
  /** Parcel ID */
  parcelId?: string;
  /** Sticker generation status. Stickers may generate with delay — poll until 'ready'. */
  status?: 'awaitingTrackNumber' | 'ready';
}

/** Response containing cross-border order stickers */
export interface CrossBorderStickerResponse {
  /** List of cross-border sticker data */
  stickers?: CrossBorderStickerItem[];
}

/** Individual status entry in status history */
export interface StatusHistoryEntry {
  /** Status timestamp */
  date?: string;
  /** Status code */
  code?: string;
}

/** Individual order status history item */
export interface StatusHistoryItem {
  /** Delivery date */
  deliveryDate?: string;
  /** List of status entries */
  statuses?: StatusHistoryEntry[];
  /** Order ID */
  orderID?: number;
}

/** Response containing cross-border status history */
export interface StatusHistoryResponse {
  /** List of order status histories */
  orders?: StatusHistoryItem[];
}

/** Individual external sticker item (deprecated endpoint) */
export interface ExternalStickerItem {
  /** Order ID */
  orderID?: number;
  /** Sticker URL */
  url?: string;
  /** Parcel ID */
  parcelID?: string;
}

/** Response for external sticker URLs (deprecated endpoint) */
export interface ExternalStickerResponse {
  /** List of external sticker data */
  stickers?: ExternalStickerItem[];
}

/** Response containing metadata for a single order */
export interface OrderMetaResponse {
  /** @deprecated Was scheduled for WB-side removal on 2026-04-30; field retained pending WB confirmation of removal status. Use metaDetails instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  meta?: Meta;
  /** Metadata details with validation status */
  metaDetails?: MetaDetail[];
}

/** Response containing metadata for multiple orders */
export interface OrdersMetaResponse {
  /** List of order metadata items */
  orders?: OrderMetaItem[];
}

/** A single order's metadata entry (used in bulk metadata responses) */
export interface OrderMetaItem {
  /** Order ID */
  id?: number;
  /** @deprecated Was scheduled for WB-side removal on 2026-04-30; field retained pending WB confirmation of removal status. Use metaDetails instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  meta?: Meta;
  /** Metadata details with validation status */
  metaDetails?: MetaDetail[];
}

/** Response after creating a new supply */
export interface SupplyCreateResponse {
  /** Created supply ID */
  id?: string;
}

/** Paginated response containing supplies */
export interface SuppliesResponse {
  /** Pagination cursor for the next page */
  next?: Next;
  /** List of supplies */
  supplies?: Supply[];
}

/** Response containing orders within a supply (legacy format) */
export interface SupplyOrdersResponse {
  /** List of supply orders */
  orders?: SupplyOrder[];
}

/** Response containing order IDs within a supply */
export interface SupplyOrderIdsResponse {
  /** List of order IDs in the supply */
  orderIds?: number[];
}

/** Response containing a supply barcode / QR code */
export interface BarcodeResponse {
  /** Encoded barcode value */
  barcode?: string;
  /** Base64-encoded barcode file */
  file?: string;
}

/** Response containing a list of supply boxes */
export interface TrbxListResponse {
  /** List of boxes */
  trbxes?: SupplyTrbx[];
}

/** Response after creating boxes in a supply */
export interface TrbxCreateResponse {
  /** List of created box IDs */
  trbxIds?: string[];
}

/** Array of seller passes */
export type PassesResponse = Pass[];

// ============================================================================
// Entity Types
// ============================================================================

/**
 * API error object returned by FBS endpoints.
 * Named FbsApiError to avoid shadowing the built-in Error class.
 */
export interface FbsApiError {
  /** Error code */
  code?: string;
  /** Error description */
  message?: string;
  /** Additional data enriching the error */
  data?: Record<string, unknown>;
}

/**
 * Pagination cursor value for retrieving the next batch of data
 *
 * @example
 * ```json
 * 13833711
 * ```
 */
export type Next = number;

/**
 * Assembly order (sborochnoe zadanie) with full details
 */
export interface Order {
  /** Buyer's delivery address; some fields may be empty depending on address specifics */
  address?: {
    /** Full delivery address */
    fullAddress?: string;
    /** Longitude */
    longitude?: number;
    /** Latitude */
    latitude?: number;
  };
  /** Acceptance price in kopecks; shown after actual order acceptance */
  scanPrice?: number;
  /** Delivery type: fbs = delivery to Wildberries warehouse */
  deliveryType?: 'fbs';
  /** Supply ID; returned if the order is assigned to a supply */
  supplyId?: string;
  /** Transaction ID for grouping orders from the same buyer cart */
  orderUid?: string;
  /** Seller article */
  article?: string;
  /** Color code (only for tintable products) */
  colorCode?: string;
  /** Unique order ID (corresponds to srid in other report endpoints) */
  rid?: string;
  /** Order creation date (RFC3339) */
  createdAt?: string;
  /** List of offices where the product should be delivered */
  offices?: string[];
  /** List of barcodes */
  skus?: string[];
  /** Assembly order ID */
  id?: number;
  /** Seller warehouse ID that received the order */
  warehouseId?: number;
  /** WB warehouse ID linked to the seller warehouse */
  officeId?: number;
  /** WB article number */
  nmId?: number;
  /** Product size ID in the WB system */
  chrtId?: number;
  /** Price in sale currency with all discounts except WB Wallet, multiplied by 100 */
  price?: number;
  /** Price in seller's country currency with all discounts except WB Wallet, multiplied by 100 */
  convertedPrice?: number;
  /** Sale currency code (ISO 4217) */
  currencyCode?: number;
  /** Seller's country currency code (ISO 4217) */
  convertedCurrencyCode?: number;
  /** Cargo type: 1 = small, 2 = oversized, 3 = large */
  cargoType?: CargoType;
  /** Cross-border type: 0 = not cross-border, 1 = cross-border */
  crossBorderType?: 0 | 1;
  /** Buyer comment */
  comment?: string;
  /** Whether this is a zero-stock order (can be cancelled without penalty) */
  isZeroOrder?: boolean;
  /** Order options */
  options?: {
    /** Whether this is a B2B sale */
    isB2b?: boolean;
  };
}

/**
 * Supply (postavka) entity representing a shipment batch
 */
export interface Supply {
  /** Supply ID */
  id?: string;
  /** Whether the supply is closed */
  done?: boolean;
  /** Supply creation date (RFC3339) */
  createdAt?: string;
  /** Supply closing date (RFC3339) */
  closedAt?: string;
  /** Supply scan date (RFC3339) */
  scanDt?: string;
  /** Supply name */
  name?: string;
  /** Cargo type: 0 = unset, 1 = small, 2 = oversized, 3 = large */
  cargoType?: 0 | 1 | 2 | 3;
  /** Cross-border type: 0 = not cross-border, 1 = cross-border, null = unset */
  crossBorderType?: 0 | 1 | null;
  /** Destination warehouse ID; null if not specified */
  destinationOfficeId?: number;
  /** Whether this supply contains B2B orders. Once the first order is added, the supply inherits its B2B flag. Since March 19, 2026 mixing B2B and non-B2B orders in one supply is rejected. */
  isB2b?: boolean;
  /** Whether you can dispatch the order to a pickup point */
  isPickupPointShipmentAllowed?: boolean;
  /** ID of the recommended warehouse for acceptance of the supply for Moscow and Moscow region; 0 if not determined */
  recommendedWhId?: number;
}

/**
 * New (unprocessed) assembly order with additional pricing and metadata fields
 */
export interface OrderNew {
  /** Buyer's delivery address; some fields may be empty depending on address specifics */
  address?: {
    /** Full delivery address */
    fullAddress?: string;
    /** Longitude */
    longitude?: number;
    /** Latitude */
    latitude?: number;
  };
  /** Planned delivery date; shown for oversized (SGT, cargoType: 2) orders */
  ddate?: string;
  /** Recommended delivery date for oversized items to the sorting center */
  sellerDate?: string;
  /** Seller price in sale currency with seller discount, without WB Club discount, multiplied by 100 */
  salePrice?: number;
  /** List of required metadata keys that must be added to the order */
  requiredMeta?: string[];
  /** List of optional metadata keys that can be added to the order */
  optionalMeta?: string[];
  /** Delivery type: fbs = delivery to Wildberries warehouse */
  deliveryType?: 'fbs';
  /** Buyer comment */
  comment?: string;
  /** Acceptance price in kopecks; always null for this endpoint */
  scanPrice?: number;
  /** Transaction ID for grouping orders from the same buyer cart */
  orderUid?: string;
  /** Seller article */
  article?: string;
  /** Color code (only for tintable products) */
  colorCode?: string;
  /** Unique order ID (corresponds to srid in other report endpoints) */
  rid?: string;
  /** Order creation date (RFC3339) */
  createdAt?: string;
  /** List of offices where the product should be delivered */
  offices?: string[];
  /** List of barcodes */
  skus?: string[];
  /** Assembly order ID */
  id?: number;
  /** Seller warehouse ID that received the order */
  warehouseId?: number;
  /** WB warehouse ID linked to the seller warehouse */
  officeId?: number;
  /** WB article number */
  nmId?: number;
  /** Product size ID in the WB system */
  chrtId?: number;
  /** Price in sale currency with all discounts except WB Wallet, multiplied by 100 */
  price?: number;
  /** Amount to be paid by buyer in sale currency with all discounts, multiplied by 100 */
  finalPrice?: number;
  /** Price in seller's country currency with all discounts except WB Wallet, multiplied by 100 */
  convertedPrice?: number;
  /** Amount to be paid by buyer in seller's country currency with all discounts, multiplied by 100 */
  convertedFinalPrice?: number;
  /** Sale currency code (ISO 4217) */
  currencyCode?: number;
  /** Seller's country currency code (ISO 4217) */
  convertedCurrencyCode?: number;
  /** Cargo type: 1 = small, 2 = oversized, 3 = large */
  cargoType?: CargoType;
  /** Cross-border type: 0 = not cross-border, 1 = cross-border */
  crossBorderType?: 0 | 1;
  /** Whether this is a zero-stock order (can be cancelled without penalty) */
  isZeroOrder?: boolean;
  /** Whether you can dispatch the order to a pickup point */
  isPickupPointShipmentAllowed?: boolean;
  /** Order options */
  options?: {
    /** Whether this is a B2B sale */
    isB2b?: boolean;
  };
}

/**
 * Order within a supply (legacy response format)
 */
export interface SupplyOrder {
  /** Acceptance price in kopecks; always null for this endpoint */
  scanPrice?: number;
  /** Transaction ID for grouping orders from the same buyer cart */
  orderUid?: string;
  /** Seller article */
  article?: string;
  /** Color code (only for tintable products) */
  colorCode?: string;
  /** Unique order ID (corresponds to srid in other report endpoints) */
  rid?: string;
  /** Order creation date (RFC3339) */
  createdAt?: string;
  /** List of offices where the product should be delivered */
  offices?: string[];
  /** List of barcodes */
  skus?: string[];
  /** Assembly order ID */
  id?: number;
  /** Seller warehouse ID that received the order */
  warehouseId?: number;
  /** WB article number */
  nmId?: number;
  /** Product size ID in the WB system */
  chrtId?: number;
  /** Price in sale currency with all discounts except WB Wallet, multiplied by 100 */
  price?: number;
  /** Price in seller's country currency with all discounts except WB Wallet, multiplied by 100 */
  convertedPrice?: number;
  /** Sale currency code (ISO 4217) */
  currencyCode?: number;
  /** Seller's country currency code (ISO 4217) */
  convertedCurrencyCode?: number;
  /** Cargo type: 1 = small, 2 = oversized, 3 = large */
  cargoType?: CargoType;
  /** Whether this is a zero-stock order (can be cancelled without penalty) */
  isZeroOrder?: boolean;
}

/**
 * Supply box (transport box) entity
 */
export interface SupplyTrbx {
  /** Box ID */
  id?: string;
}

/**
 * Box sticker data with encoded barcode and file content
 */
export interface TrbxStickers {
  /** Encoded sticker barcode value */
  barcode?: string;
  /** Full sticker representation in the requested format (base64 encoded) */
  file?: string;
}

/**
 * Metadata detail item with validation status
 * Replaces the deprecated `meta` object. Use with `/api/marketplace/v3/orders/meta` endpoint.
 * @since 3.5.0
 */
export interface MetaDetail {
  /** Metadata type: imei, uin, sgtin, gtin, expiration, customsDeclaration */
  key: string;
  /** Metadata value (empty string if not filled) */
  value: string;
  /** Validation decision. Known values: 'filled' (value set), 'optional' (not required), 'required' (must fill before deliver), 'invalid' (value failed validation).
   *
   * When WB's B2C marking validation is not yet available for a seller, only 'filled'/'optional'/'required' are returned for sgtin; when available, the full status set is returned (non-exhaustive). See WB release-notes?id=513. */
  decision: string;
}

/**
 * @deprecated Was scheduled for WB-side removal on 2026-04-30; field retained pending WB confirmation of removal status. Use `metaDetails` (MetaDetail[]) instead.
 */
export interface Meta {
  /** IMEI */
  imei?: {
    value?: string;
  };
  /** UIN (unique identification number) */
  uin?: {
    value?: string;
  };
  /** GTIN (Global Trade Item Number) */
  gtin?: {
    value?: string;
  };
  /** Honest Sign marking code (SGTIN) */
  sgtin?: {
    value?: string[];
  };
  /** Product expiration date */
  expiration?: {
    value?: string;
  };
  /** Customs declaration number */
  customsDeclaration?: {
    value?: string;
  };
}

/**
 * Warehouse office data for seller pass registration
 */
export interface PassOffice {
  /** Office name */
  name?: string;
  /** Office address */
  address?: string;
  /** Office ID */
  id?: number;
}

/**
 * Seller pass for warehouse access
 */
export interface Pass {
  /** Driver first name */
  firstName?: string;
  /** Pass expiration date */
  dateEnd?: string;
  /** Driver last name */
  lastName?: string;
  /** Car model */
  carModel?: string;
  /** Car number */
  carNumber?: string;
  /** Warehouse name */
  officeName?: string;
  /** Warehouse address */
  officeAddress?: string;
  /** Warehouse ID */
  officeId?: number;
  /** Pass ID */
  id?: number;
}

/**
 * Client information for cross-border orders from Turkey
 */
export interface CrossborderTurkeyClientInfo {
  /** Client first name */
  firstName?: string;
  /** Full name (last, first, middle) */
  fullName?: string;
  /** Client last name */
  lastName?: string;
  /** Client middle name */
  middleName?: string;
  /** Order ID */
  orderID?: number;
  /** Client phone number */
  phone?: string;
  /** Not used */
  phoneCode?: string;
}

/**
 * Response wrapper for cross-border Turkey client information
 */
export interface CrossborderTurkeyClientInfoResp {
  /** Client info entries for cross-border orders from Turkey */
  orders?: CrossborderTurkeyClientInfo[];
}

// ============================================================================
// API v3 Schema Types (from v3.* swagger schemas)
// ============================================================================

/**
 * Order IDs within a supply (v3 schema)
 * Maps to swagger schema: v3.SupplyOrderIDsAPI
 */
export interface SupplyOrderIDsAPI {
  /** List of assembly order IDs */
  orderIds?: number[];
}

/**
 * Response containing metadata for multiple orders (v3 schema)
 * Maps to swagger schema: v3.OrdersMetaAPI
 */
export interface OrdersMetaAPI {
  /** List of order metadata entries */
  orders?: OrderMetaAPI[];
}

/**
 * Single order metadata entry (v3 schema)
 * Maps to swagger schema: v3.OrderMetaAPI
 */
export interface OrderMetaAPI {
  /** Assembly order ID */
  id?: number;
  /** @deprecated Was scheduled for WB-side removal on 2026-04-30; field retained pending WB confirmation of removal status. Use metaDetails instead. */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  meta?: Meta;
  /** Metadata details with validation status */
  metaDetails?: MetaDetail[];
}

/**
 * API error response (v3 schema)
 * Maps to swagger schema: v3.APIError
 */
export interface APIError {
  /** Error code */
  code?: string;
  /** Error description */
  message?: string;
  /** Additional error data */
  data?: Record<string, unknown>;
}

/**
 * Price information for an archived FBS order
 * Maps to swagger schema: v3.ArchiveOrderPriceInfo
 */
export interface ArchiveOrderPriceInfo {
  /** Currency code of the converted price */
  convertedCurrencyCode: number;
  /** Price converted into the reporting currency */
  convertedPrice: number;
  /** Currency code of the original price */
  currencyCode: number;
  /** Original product price */
  price: number;
}

/**
 * Product details for an archived FBS order
 * Maps to swagger schema: v3.ArchiveOrderProduct
 */
export interface ArchiveOrderProduct {
  /** Seller's article (vendor code) */
  article: string;
  /** Charter ID (size identifier) */
  chrtId: number;
  /** Wildberries nomenclature ID (nmId) */
  nmId: number;
  /** Barcodes (SKUs) of the size */
  skus: string[];
}

/**
 * Status information for an archived FBS order
 * Maps to swagger schema: v3.ArchiveOrderStatus
 */
export interface ArchiveOrderStatus {
  /** Supplier-side order status */
  supplierStatus: string;
  /** Wildberries-side order status */
  wbStatus: string;
}

/**
 * A single archived FBS assembly order
 * Maps to swagger schema: v3.ArchiveOrder
 */
export interface ArchiveOrder {
  /** Cargo type: 'mgt' (small), 'sgt' (medium), 'kgtPlus' (large+) */
  cargoType: 'mgt' | 'sgt' | 'kgtPlus';
  /** Color code, or null when not applicable */
  colorCode: string | null;
  /** Order creation timestamp (ISO 8601) */
  createdAt: string;
  /** Cross-border delivery details, or null for non-cross-border orders */
  crossBorder: { parcel?: string } | null;
  /** Cross-border type: 'local' (domestic) or 'crossBorder' */
  crossBorderType: 'local' | 'crossBorder';
  /** Numeric order identifier */
  id: number;
  /** Whether this is a zero-price (free) order */
  isZeroOrder: boolean;
  /** Additional metadata details */
  metaDetails: unknown[];
  /** Order-level options */
  options: { isB2B?: boolean };
  /** Unique order UID */
  orderUid: string;
  /** Price information for the order */
  priceInfo: ArchiveOrderPriceInfo;
  /** Product details for the order */
  product: ArchiveOrderProduct;
  /** Request ID (rid) for tracing */
  rid: string;
  /** Scan price, or null when not applicable */
  scanPrice: number | null;
  /** Supplier and WB statuses */
  status: ArchiveOrderStatus;
  /** Sticker (label) ID assigned to the order */
  stickerId: number;
  /** Supply ID the order is bound to, or null when not bound */
  supplyId: string | null;
  /** Warehouse ID the order is fulfilled from */
  warehouseId: number;
}

/**
 * Response for GET /api/marketplace/v3/fbs/orders/archive
 * Maps to swagger schema: v3.ArchiveOrdersResponse
 */
export interface ArchiveOrdersResponse {
  /** Pagination cursor for the next page, or null when the archive is exhausted */
  next: number | null;
  /** List of archived FBS orders for the current page */
  orders: ArchiveOrder[];
}

/**
 * Query parameters for GET /api/marketplace/v3/fbs/orders/archive
 * Maps to swagger schema: v3.ArchiveOrdersParams
 */
export interface ArchiveOrdersParams {
  /** Year of the archive period */
  year: number;
  /** Month of the archive period (1-12) */
  month: number;
  /** Pagination cursor (0 for the first page) */
  next: number;
  /** Maximum number of orders to return per page */
  limit: number;
  /** Index signature for compatibility with Record<string, unknown> */
  [key: string]: unknown;
}
