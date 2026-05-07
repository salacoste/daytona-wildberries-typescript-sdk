/**
 * Orders DBS Module - Delivery by Seller
 * Generated from: wildberries_api_doc/04-orders-dbs.yaml
 *
 * Provides methods for managing DBS (Delivery by Seller) orders where
 * sellers handle both storage AND delivery directly to customers.
 *
 * Key DBS Characteristics:
 * - Direct Delivery: Seller delivers to customer's address (not pickup points)
 * - Customer Contact: Access to customer phone and full address with coordinates
 * - Delivery Windows: Specific delivery date/time windows (dTimeFrom, dTimeTo)
 * - Required Metadata: Orders may require IMEI, UIN, GTIN, SGTIN, or customs declarations
 *
 * @module orders-dbs
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors';
import type {
  GetNewOrdersResponse,
  GetOrdersParams,
  GetOrdersResponse,
  GetClientInfoResponse,
  GetB2BInfoResponse,
  GetStatusInfoResponse,
  BulkStatusChangeResponse,
  OrderCodeRequest,
  OrderGroupsRequest,
  OrderGroupsResponse,
  DeliveryDatesRequest,
  DeliveryDatesInfoResponse,
  GetMetaBulkRequest,
  GetOrderMetaBulkResponse,
  DeleteMetaBulkRequest,
  DeleteMetaBulkResponse,
  SetSgtinBulkRequest,
  SetUinBulkRequest,
  SetImeiBulkRequest,
  SetGtinBulkRequest,
  SetCustomsDeclarationBulkRequest,
  SetMetaBulkResponse,
} from '../../types/orders-dbs.types';

/** Base URL for DBS API endpoints */
const BASE_URL = 'https://marketplace-api.wildberries.ru';

/** Maximum date range in seconds (30 days) */
const MAX_DATE_RANGE_SECONDS = 30 * 24 * 60 * 60;

/**
 * Orders DBS Module for managing Delivery by Seller orders
 *
 * DBS (Delivery by Seller) is a fulfillment model where sellers handle
 * both storage AND delivery directly to customers. Unlike FBS (where WB
 * delivers to pickup points) or FBW (where WB stores and delivers),
 * DBS gives sellers full control over the delivery process.
 *
 * @example
 * ```typescript
 * const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
 *
 * // Get new orders awaiting processing
 * const newOrders = await sdk.ordersDBS.getNewOrders();
 *
 * // Get customer contact info for delivery coordination
 * const clientInfo = await sdk.ordersDBS.getClientInfo([123456]);
 * ```
 */
export class OrdersDbsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get list of new DBS assembly tasks
   *
   * Returns all new orders awaiting processing. Each order includes:
   * - Customer address with GPS coordinates for delivery routing
   * - Delivery window (ddate, dTimeFrom, dTimeTo)
   * - requiredMeta indicating which metadata must be added before shipping
   *
   * Rate limit: 300 requests/min, 200ms interval, 20 burst
   *
   * @returns Promise resolving to list of new DBS orders
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Sborochnye-zadaniya-DBS/paths/~1api~1v3~1dbs~1orders~1new/get}
   *
   * @example
   * ```typescript
   * const newOrders = await sdk.ordersDBS.getNewOrders();
   *
   * for (const order of newOrders.orders ?? []) {
   *   console.log(`Order ${order.id}: ${order.address?.fullAddress}`);
   *   console.log(`Delivery: ${order.ddate} ${order.dTimeFrom}-${order.dTimeTo}`);
   *
   *   if (order.requiredMeta && order.requiredMeta.length > 0) {
   *     console.log(`Required metadata: ${order.requiredMeta.join(', ')}`);
   *   }
   * }
   * ```
   */
  async getNewOrders(): Promise<GetNewOrdersResponse> {
    return this.client.get<GetNewOrdersResponse>(`${BASE_URL}/api/v3/dbs/orders/new`, {
      rateLimitKey: 'orders-dbs.getNewOrders',
    });
  }

  /**
   * Get completed DBS orders with pagination and date filtering
   *
   * Returns orders that have been completed (delivered) or cancelled.
   * Maximum 30 calendar days per request.
   *
   * Rate limit: 300 requests/min, 200ms interval, 20 burst
   *
   * @param params - Query parameters for filtering and pagination
   * @param params.limit - Number of orders to return (1-1000)
   * @param params.next - Pagination cursor (0 for first request)
   * @param params.dateFrom - Start date as Unix timestamp
   * @param params.dateTo - End date as Unix timestamp
   * @returns Promise resolving to orders and next pagination cursor
   * @throws {ValidationError} When parameters are invalid (limit out of range, date range > 30 days)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Zakazy-DBS/paths/~1api~1v3~1dbs~1orders/get}
   *
   * @example
   * ```typescript
   * // Get orders from last 7 days with pagination
   * const now = Math.floor(Date.now() / 1000);
   * const weekAgo = now - 7 * 24 * 60 * 60;
   *
   * let next = 0;
   * do {
   *   const result = await sdk.ordersDBS.getOrders({
   *     limit: 100,
   *     next,
   *     dateFrom: weekAgo,
   *     dateTo: now
   *   });
   *
   *   console.log(`Fetched ${result.orders?.length ?? 0} orders`);
   *   next = result.next ?? 0;
   * } while (next > 0);
   * ```
   */
  async getOrders(params: GetOrdersParams): Promise<GetOrdersResponse> {
    // Validate limit range
    if (params.limit < 1 || params.limit > 1000) {
      throw new ValidationError('limit must be between 1 and 1000');
    }

    // Validate next cursor
    if (params.next < 0) {
      throw new ValidationError('next must be >= 0');
    }

    // Validate date range (max 30 days)
    const dateRange = params.dateTo - params.dateFrom;
    if (dateRange > MAX_DATE_RANGE_SECONDS) {
      throw new ValidationError('Date range cannot exceed 30 calendar days');
    }

    if (dateRange < 0) {
      throw new ValidationError('dateFrom must be less than or equal to dateTo');
    }

    return this.client.get<GetOrdersResponse>(`${BASE_URL}/api/v3/dbs/orders`, {
      params: {
        limit: params.limit,
        next: params.next,
        dateFrom: params.dateFrom,
        dateTo: params.dateTo,
      },
      rateLimitKey: 'orders-dbs.getOrders',
    });
  }

  /**
   * Get customer contact information for DBS orders
   *
   * Returns customer name, phone number, and additional contact codes.
   * Use this to contact customers for delivery coordination.
   *
   * Rate limit: 300 requests/min, 200ms interval, 20 burst
   *
   * @param orderIds - Array of order IDs to get client info for
   * @returns Promise resolving to customer contact information
   * @throws {ValidationError} When orderIds array is empty
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {NotFoundError} When order not found (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Zakazy-DBS/paths/~1api~1v3~1dbs~1orders~1client/post}
   *
   * @example
   * ```typescript
   * const clientInfo = await sdk.ordersDBS.getClientInfo([123456, 234567]);
   *
   * for (const client of clientInfo.orders ?? []) {
   *   console.log(`Order ${client.orderID}:`);
   *   console.log(`  Name: ${client.fullName}`);
   *   console.log(`  Phone: +${client.phoneCode}${client.phone}`);
   * }
   * ```
   */
  async getClientInfo(orderIds: number[]): Promise<GetClientInfoResponse> {
    // Validate orderIds array
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }

    return this.client.post<GetClientInfoResponse>(
      `${BASE_URL}/api/v3/dbs/orders/client`,
      { orders: orderIds },
      { rateLimitKey: 'orders-dbs.getClientInfo' }
    );
  }

  /**
   * Get B2B buyer information for DBS orders
   *
   * Returns B2B buyer details (organization name, INN, KPP) for orders
   * placed by business customers. For B2C orders, returns an error
   * indicating the order is not a B2B order.
   *
   * Note: Individual Entrepreneurs (IP) may have empty KPP field
   * and a 12-digit INN instead of 10-digit INN for legal entities.
   *
   * Rate limit: Standard DBS rate limits apply
   *
   * @param orderIds - Array of order IDs to get B2B info for (1-1000 items)
   * @returns Promise resolving to B2B buyer information for each order
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000 items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/B2B}
   *
   * @example
   * ```typescript
   * const b2bInfo = await sdk.ordersDBS.getB2BInfo([123456, 234567]);
   *
   * for (const result of b2bInfo.results ?? []) {
   *   if (result.isError) {
   *     console.log(`Order ${result.orderId}: Not a B2B order`);
   *   } else {
   *     console.log(`Order ${result.orderId}:`);
   *     console.log(`  Organization: ${result.data?.orgName}`);
   *     console.log(`  INN: ${result.data?.inn}`);
   *     console.log(`  KPP: ${result.data?.kpp || 'N/A (IP)'}`);
   *   }
   * }
   * ```
   */
  async getB2BInfo(orderIds: number[]): Promise<GetB2BInfoResponse> {
    // Validate orderIds array is not empty
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }

    // Validate orderIds array does not exceed maximum
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }

    return this.client.post<GetB2BInfoResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/b2b/info`,
      { ordersIds: orderIds },
      { rateLimitKey: 'orders-dbs.getB2BInfo' }
    );
  }

  // ==========================================================================
  // New Info Endpoints (Story 26.1)
  // ==========================================================================

  /**
   * Get paid delivery group information
   *
   * @param request - Request with order IDs
   * @returns Promise resolving to order group information
   *
   * @example
   * ```typescript
   * const groups = await sdk.ordersDBS.getGroupsInfo({ orders: [123456] });
   * ```
   */
  async getGroupsInfo(request: OrderGroupsRequest): Promise<OrderGroupsResponse> {
    return this.client.post<OrderGroupsResponse>(`${BASE_URL}/api/v3/dbs/groups/info`, request, {
      rateLimitKey: 'orders-dbs.getGroupsInfo',
    });
  }

  /**
   * Get delivery dates for DBS orders
   *
   * @param request - Request with order IDs
   * @returns Promise resolving to delivery date information
   *
   * @example
   * ```typescript
   * const dates = await sdk.ordersDBS.getDeliveryDates({ orders: [123456] });
   * ```
   */
  async getDeliveryDates(request: DeliveryDatesRequest): Promise<DeliveryDatesInfoResponse> {
    return this.client.post<DeliveryDatesInfoResponse>(
      `${BASE_URL}/api/v3/dbs/orders/delivery-date`,
      request,
      { rateLimitKey: 'orders-dbs.getDeliveryDates' }
    );
  }

  // ==========================================================================
  // Bulk Metadata Endpoints (Story 26.2) - Replace deprecated single-order methods
  // ==========================================================================

  /**
   * Get metadata for multiple orders (bulk)
   *
   * Replaces the deprecated single-order getMeta() method.
   * Rate limit: 150 requests/min, 400ms interval, 20 burst
   *
   * @param request - Request with order IDs
   * @returns Promise resolving to bulk metadata response
   *
   * @example
   * ```typescript
   * const meta = await sdk.ordersDBS.getMetaBulk({ orders: [123456, 234567] });
   * ```
   */
  async getMetaBulk(request: GetMetaBulkRequest): Promise<GetOrderMetaBulkResponse> {
    return this.client.post<GetOrderMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/info`,
      request,
      { rateLimitKey: 'orders-dbs.getMetaBulk' }
    );
  }

  /**
   * Delete metadata for multiple orders (bulk)
   *
   * Replaces the deprecated single-order deleteMeta() method.
   * Rate limit: 150 requests/min, 400ms interval, 20 burst
   *
   * @param request - Request with order IDs and metadata key to delete
   * @returns Promise resolving to bulk delete response
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersDBS.deleteMetaBulk({ orders: [123456], key: 'imei' });
   * ```
   */
  async deleteMetaBulk(request: DeleteMetaBulkRequest): Promise<DeleteMetaBulkResponse> {
    return this.client.post<DeleteMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/delete`,
      request,
      { rateLimitKey: 'orders-dbs.deleteMetaBulk' }
    );
  }

  /**
   * Set SGTIN codes for multiple orders (bulk)
   *
   * Replaces the deprecated single-order setSgtin() method.
   * Rate limit: 500 requests/min, 120ms interval, 20 burst
   *
   * @param request - Request with order SGTIN data
   * @returns Promise resolving to bulk set response
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersDBS.setSgtinBulk({
   *   orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }]
   * });
   * ```
   */
  async setSgtinBulk(request: SetSgtinBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/sgtin`,
      request,
      { rateLimitKey: 'orders-dbs.setSgtinBulk' }
    );
  }

  /**
   * Set UIN codes for multiple orders (bulk)
   *
   * Replaces the deprecated single-order setUin() method.
   * Rate limit: 500 requests/min, 120ms interval, 20 burst
   *
   * @param request - Request with order UIN data
   * @returns Promise resolving to bulk set response
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersDBS.setUinBulk({
   *   orders: [{ orderId: 123456, uin: '1234567890123456' }]
   * });
   * ```
   */
  async setUinBulk(request: SetUinBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/uin`,
      request,
      { rateLimitKey: 'orders-dbs.setUinBulk' }
    );
  }

  /**
   * Set IMEI codes for multiple orders (bulk)
   *
   * Replaces the deprecated single-order setImei() method.
   * Rate limit: 500 requests/min, 120ms interval, 20 burst
   *
   * @param request - Request with order IMEI data
   * @returns Promise resolving to bulk set response
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersDBS.setImeiBulk({
   *   orders: [{ orderId: 123456, imei: '123456789012345' }]
   * });
   * ```
   */
  async setImeiBulk(request: SetImeiBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/imei`,
      request,
      { rateLimitKey: 'orders-dbs.setImeiBulk' }
    );
  }

  /**
   * Set GTIN codes for multiple orders (bulk)
   *
   * Replaces the deprecated single-order setGtin() method.
   * Rate limit: 500 requests/min, 120ms interval, 20 burst
   *
   * @param request - Request with order GTIN data
   * @returns Promise resolving to bulk set response
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersDBS.setGtinBulk({
   *   orders: [{ orderId: 123456, gtin: '1234567890123' }]
   * });
   * ```
   */
  async setGtinBulk(request: SetGtinBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/gtin`,
      request,
      { rateLimitKey: 'orders-dbs.setGtinBulk' }
    );
  }

  /**
   * Set customs declaration for multiple orders (bulk)
   *
   * Replaces the deprecated single-order setCustomsDeclaration() method.
   * Rate limit: 500 requests/min, 120ms interval, 20 burst
   *
   * @param request - Request with order customs declaration data
   * @returns Promise resolving to bulk set response
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersDBS.setCustomsDeclarationBulk({
   *   orders: [{ orderId: 123456, customsDeclaration: 'CD-123456789' }]
   * });
   * ```
   */
  async setCustomsDeclarationBulk(
    request: SetCustomsDeclarationBulkRequest
  ): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/meta/customs-declaration`,
      request,
      { rateLimitKey: 'orders-dbs.setCustomsDeclarationBulk' }
    );
  }

  // ==========================================================================
  // Bulk Status Management Methods (Story 12.2)
  // ==========================================================================

  /**
   * Get status information for multiple DBS orders (bulk)
   *
   * Retrieves the current status and tracking information for up to 1000 orders
   * in a single request. This is more efficient than individual status queries
   * for batch processing scenarios.
   *
   * Rate limit: Standard DBS rate limits apply
   *
   * @param orderIds - Array of order IDs to get status for (1-1000 items)
   * @returns Promise resolving to status information for each order
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000 items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS}
   *
   * @example
   * ```typescript
   * // Get status for multiple orders
   * const statuses = await sdk.ordersDBS.getStatusesBulk([123456, 234567, 345678]);
   *
   * for (const order of statuses.orders ?? []) {
   *   console.log(`Order ${order.orderId}: ${order.wbStatus}`);
   *   console.log(`  Seller status: ${order.supplierStatus}`);
   *   console.log(`  Updated: ${order.changedAt}`);
   * }
   * ```
   */
  async getStatusesBulk(orderIds: number[]): Promise<GetStatusInfoResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }
    return this.client.post<GetStatusInfoResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/status/info`,
      { orders: orderIds },
      { rateLimitKey: 'orders-dbs.getStatusesBulk' }
    );
  }

  /**
   * Confirm multiple DBS orders for assembly (bulk)
   *
   * Moves up to 1000 orders from "new" to "confirmed" status in a single request.
   * This indicates the seller has acknowledged the orders and will begin
   * preparing them for delivery.
   *
   * Rate limit: Standard DBS rate limits apply
   *
   * @param orderIds - Array of order IDs to confirm (1-1000 items)
   * @returns Promise resolving to confirmation results for each order
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000 items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS}
   *
   * @example
   * ```typescript
   * // Confirm multiple orders at once
   * const result = await sdk.ordersDBS.confirmBulk([123456, 234567, 345678]);
   *
   * for (const order of result.orders ?? []) {
   *   if (order.isError) {
   *     console.log(`Order ${order.orderId} failed: ${order.errorText}`);
   *   } else {
   *     console.log(`Order ${order.orderId} confirmed successfully`);
   *   }
   * }
   * ```
   */
  async confirmBulk(orderIds: number[]): Promise<BulkStatusChangeResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/status/confirm`,
      { orders: orderIds },
      { rateLimitKey: 'orders-dbs.confirmBulk' }
    );
  }

  /**
   * Mark multiple DBS orders as delivered (bulk)
   *
   * Moves up to 1000 orders to "delivered" status in a single request.
   * Use this when the seller has handed over the packages for delivery
   * to the customer. This triggers the delivery tracking process.
   *
   * **Important:** Orders requiring IMEI must have it attached before calling this method.
   * Check `requiredMeta` array in `getNewOrders()` response — if it contains `"imei"`,
   * call `setImei()` first. Otherwise this method returns 409 with `"detail":"ImeiIsNotFilled"`.
   *
   * Rate limit: Standard DBS rate limits apply
   *
   * @param orderIds - Array of order IDs to mark as delivered (1-1000 items)
   * @returns Promise resolving to delivery status results for each order. When WB returns
   *   application-level 409 MetaValidationFail, it surfaces in `result.results[].errors[]`
   *   with `code === 409` and `detail === 'MetaValidationFail'`; check
   *   `result.results[].errors[].metaDetails[]` per-order before retrying. (since 3.11.0 — WB API 2026-05-06)
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000 items
   * @throws {WBAPIError} 409 — ImeiIsNotFilled: mandatory IMEI not attached to order
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS}
   *
   * @example
   * ```typescript
   * // Mark multiple orders as delivered to carrier
   * const result = await sdk.ordersDBS.deliverBulk([123456, 234567, 345678]);
   *
   * for (const order of result.orders ?? []) {
   *   if (order.isError) {
   *     console.log(`Order ${order.orderId} failed: ${order.errorText}`);
   *   } else {
   *     console.log(`Order ${order.orderId} marked as delivered`);
   *   }
   * }
   * ```
   */
  async deliverBulk(orderIds: number[]): Promise<BulkStatusChangeResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/status/deliver`,
      { orders: orderIds },
      { rateLimitKey: 'orders-dbs.deliverBulk' }
    );
  }

  /**
   * Confirm customer receipt for multiple DBS orders (bulk)
   *
   * Moves up to 1000 orders to "received" status in a single request.
   * Use this when the customer has received and accepted the delivery.
   * Requires the customer confirmation code for each order.
   *
   * Rate limit: Standard DBS rate limits apply
   *
   * @param orders - Array of orders with IDs and customer confirmation codes (1-1000 items)
   * @returns Promise resolving to receive confirmation results for each order
   * @throws {ValidationError} When orders array is empty, exceeds 1000 items, contains invalid orderId, or missing code
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS}
   *
   * @example
   * ```typescript
   * // Confirm receipt for multiple orders with customer codes
   * const result = await sdk.ordersDBS.receiveBulk([
   *   { orderId: 123456, code: 'ABC123' },
   *   { orderId: 234567, code: 'DEF456' },
   *   { orderId: 345678, code: 'GHI789' }
   * ]);
   *
   * for (const order of result.orders ?? []) {
   *   if (order.isError) {
   *     console.log(`Order ${order.orderId} failed: ${order.errorText}`);
   *   } else {
   *     console.log(`Order ${order.orderId} receipt confirmed`);
   *   }
   * }
   * ```
   */
  async receiveBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse> {
    if (orders.length === 0) {
      throw new ValidationError('orders array cannot be empty');
    }
    if (orders.length > 1000) {
      throw new ValidationError('orders array cannot exceed 1000 items');
    }
    for (const order of orders) {
      if (order.orderId <= 0) {
        throw new ValidationError('orderId must be a positive number');
      }
      if (!order.code || order.code === '') {
        throw new ValidationError('code cannot be empty');
      }
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/status/receive`,
      { orders },
      { rateLimitKey: 'orders-dbs.receiveBulk' }
    );
  }

  /**
   * Reject delivery for multiple DBS orders (bulk)
   *
   * Moves up to 1000 orders to "rejected" status in a single request.
   * Use this when the customer has refused to accept the delivery
   * (e.g., wrong product, damaged package, changed mind).
   * Requires the rejection code for each order.
   *
   * Rate limit: Standard DBS rate limits apply
   *
   * @param orders - Array of orders with IDs and rejection codes (1-1000 items)
   * @returns Promise resolving to rejection results for each order
   * @throws {ValidationError} When orders array is empty, exceeds 1000 items, contains invalid orderId, or missing code
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS}
   *
   * @example
   * ```typescript
   * // Reject delivery for multiple orders with rejection codes
   * const result = await sdk.ordersDBS.rejectBulk([
   *   { orderId: 123456, code: 'DAMAGED' },
   *   { orderId: 234567, code: 'WRONG_ITEM' },
   *   { orderId: 345678, code: 'CUSTOMER_REFUSED' }
   * ]);
   *
   * for (const order of result.orders ?? []) {
   *   if (order.isError) {
   *     console.log(`Order ${order.orderId} rejection failed: ${order.errorText}`);
   *   } else {
   *     console.log(`Order ${order.orderId} rejected successfully`);
   *   }
   * }
   * ```
   */
  async rejectBulk(orders: OrderCodeRequest[]): Promise<BulkStatusChangeResponse> {
    if (orders.length === 0) {
      throw new ValidationError('orders array cannot be empty');
    }
    if (orders.length > 1000) {
      throw new ValidationError('orders array cannot exceed 1000 items');
    }
    for (const order of orders) {
      if (order.orderId <= 0) {
        throw new ValidationError('orderId must be a positive number');
      }
      if (!order.code || order.code === '') {
        throw new ValidationError('code cannot be empty');
      }
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/status/reject`,
      { orders },
      { rateLimitKey: 'orders-dbs.rejectBulk' }
    );
  }

  /**
   * Cancel multiple DBS orders (bulk)
   *
   * Cancels up to 1000 orders in a single request. Use this when the seller
   * cannot fulfill the orders (e.g., out of stock, unable to deliver).
   * Orders can only be cancelled before they are delivered.
   *
   * Rate limit: Standard DBS rate limits apply
   *
   * @param orderIds - Array of order IDs to cancel (1-1000 items)
   * @returns Promise resolving to cancellation results for each order
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000 items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbs#tag/Status-DBS}
   *
   * @example
   * ```typescript
   * // Cancel multiple orders that cannot be fulfilled
   * const result = await sdk.ordersDBS.cancelBulk([123456, 234567, 345678]);
   *
   * for (const order of result.orders ?? []) {
   *   if (order.isError) {
   *     console.log(`Order ${order.orderId} cancellation failed: ${order.errorText}`);
   *   } else {
   *     console.log(`Order ${order.orderId} cancelled successfully`);
   *   }
   * }
   * ```
   */
  async cancelBulk(orderIds: number[]): Promise<BulkStatusChangeResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/dbs/orders/status/cancel`,
      { orders: orderIds },
      { rateLimitKey: 'orders-dbs.cancelBulk' }
    );
  }
}
