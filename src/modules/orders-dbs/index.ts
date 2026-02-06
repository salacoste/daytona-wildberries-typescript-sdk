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
  GetOrderMetaResponse,
  DBSMetadataKey,
  GetStatusInfoResponse,
  BulkStatusChangeResponse,
  OrderCodeRequest,
  GetStatusResponseLegacy,
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

/** Valid metadata keys for DBS orders */
const VALID_METADATA_KEYS: DBSMetadataKey[] = [
  'imei',
  'uin',
  'gtin',
  'sgtin',
  'customsDeclaration',
];

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
  // Metadata Operations (Story 12.3)
  // ==========================================================================

  /**
   * Get order metadata
   *
   * Returns metadata associated with an order including IMEI, UIN, GTIN,
   * SGTIN, and customs declaration information.
   *
   * @deprecated Use {@link getMetaBulk} instead. This endpoint will be removed on April 13, 2026.
   * @param orderId - Order ID to get metadata for
   * @returns Promise resolving to order metadata
   * @throws {ValidationError} When orderId is not greater than 0
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * const meta = await sdk.ordersDBS.getMeta(123456);
   * if (meta.meta?.imei?.value) {
   *   console.log(`IMEI: ${meta.meta.imei.value}`);
   * }
   * ```
   */
  async getMeta(orderId: number): Promise<GetOrderMetaResponse> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: getMeta() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to getMetaBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be greater than 0');
    }

    return this.client.get<GetOrderMetaResponse>(`${BASE_URL}/api/v3/dbs/orders/${orderId}/meta`, {
      rateLimitKey: 'orders-dbs.getMeta',
    });
  }

  /**
   * Delete specific metadata from an order
   *
   * Removes a metadata key from the order. Valid keys are:
   * imei, uin, gtin, sgtin, customsDeclaration
   *
   * @deprecated Use {@link deleteMetaBulk} instead. This endpoint will be removed on April 13, 2026.
   * @param orderId - Order ID to delete metadata from
   * @param key - Metadata key to delete
   * @returns Promise resolving to void on success
   * @throws {ValidationError} When orderId is not greater than 0 or key is invalid
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * await sdk.ordersDBS.deleteMeta(123456, 'imei');
   * console.log('IMEI metadata deleted');
   * ```
   */
  async deleteMeta(orderId: number, key: DBSMetadataKey): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: deleteMeta() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to deleteMetaBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be greater than 0');
    }

    if (!VALID_METADATA_KEYS.includes(key)) {
      throw new ValidationError('key must be one of: imei, uin, gtin, sgtin, customsDeclaration');
    }

    return this.client.delete(`${BASE_URL}/api/v3/dbs/orders/${orderId}/meta`, {
      params: { key },
      rateLimitKey: 'orders-dbs.deleteMeta',
    });
  }

  /**
   * Set SGTIN marking codes for an order
   *
   * Sets one or more SGTIN (Serialized Global Trade Item Number) marking codes.
   * Each SGTIN must be 16-135 characters. Maximum 24 SGTINs per order.
   *
   * @deprecated Use {@link setSgtinBulk} instead. This endpoint will be removed on April 13, 2026.
   * @param orderId - Order ID to set SGTIN for
   * @param sgtins - Array of SGTIN codes (1-24 items, each 16-135 characters)
   * @returns Promise resolving to void on success
   * @throws {ValidationError} When orderId, sgtins array, or individual sgtin is invalid
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * await sdk.ordersDBS.setSgtin(123456, ['1234567890123456']);
   * console.log('SGTIN set successfully');
   * ```
   */
  async setSgtin(orderId: number, sgtins: string[]): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: setSgtin() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to setSgtinBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be greater than 0');
    }

    if (sgtins.length < 1 || sgtins.length > 24) {
      throw new ValidationError('sgtins array must contain 1-24 items');
    }

    for (const sgtin of sgtins) {
      if (sgtin.length < 16 || sgtin.length > 135) {
        throw new ValidationError('Each sgtin must be 16-135 characters');
      }
    }

    return this.client.put(
      `${BASE_URL}/api/v3/dbs/orders/${orderId}/meta/sgtin`,
      { sgtins },
      { rateLimitKey: 'orders-dbs.setMeta' }
    );
  }

  /**
   * Set UIN code for an order
   *
   * Sets the UIN (Unique Identification Number) for the order.
   * UIN must be exactly 16 characters.
   *
   * @deprecated Use {@link setUinBulk} instead. This endpoint will be removed on April 13, 2026.
   * @param orderId - Order ID to set UIN for
   * @param uin - UIN code (exactly 16 characters)
   * @returns Promise resolving to void on success
   * @throws {ValidationError} When orderId or uin is invalid
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * await sdk.ordersDBS.setUin(123456, '1234567890123456');
   * console.log('UIN set successfully');
   * ```
   */
  async setUin(orderId: number, uin: string): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: setUin() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to setUinBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be greater than 0');
    }

    if (uin.length !== 16) {
      throw new ValidationError('uin must be exactly 16 characters');
    }

    return this.client.put(
      `${BASE_URL}/api/v3/dbs/orders/${orderId}/meta/uin`,
      { uin },
      { rateLimitKey: 'orders-dbs.setMeta' }
    );
  }

  /**
   * Set IMEI code for an order
   *
   * Sets the IMEI (International Mobile Equipment Identity) for the order.
   * IMEI must be exactly 15 characters.
   *
   * @deprecated Use {@link setImeiBulk} instead. This endpoint will be removed on April 13, 2026.
   * @param orderId - Order ID to set IMEI for
   * @param imei - IMEI code (exactly 15 characters)
   * @returns Promise resolving to void on success
   * @throws {ValidationError} When orderId or imei is invalid
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * await sdk.ordersDBS.setImei(123456, '123456789012345');
   * console.log('IMEI set successfully');
   * ```
   */
  async setImei(orderId: number, imei: string): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: setImei() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to setImeiBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be greater than 0');
    }

    if (imei.length !== 15) {
      throw new ValidationError('imei must be exactly 15 characters');
    }

    return this.client.put(
      `${BASE_URL}/api/v3/dbs/orders/${orderId}/meta/imei`,
      { imei },
      { rateLimitKey: 'orders-dbs.setMeta' }
    );
  }

  /**
   * Set GTIN code for an order
   *
   * Sets the GTIN (Global Trade Item Number) for the order.
   * GTIN must be exactly 13 characters.
   *
   * @deprecated Use {@link setGtinBulk} instead. This endpoint will be removed on April 13, 2026.
   * @param orderId - Order ID to set GTIN for
   * @param gtin - GTIN code (exactly 13 characters)
   * @returns Promise resolving to void on success
   * @throws {ValidationError} When orderId or gtin is invalid
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * await sdk.ordersDBS.setGtin(123456, '1234567890123');
   * console.log('GTIN set successfully');
   * ```
   */
  async setGtin(orderId: number, gtin: string): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: setGtin() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to setGtinBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be greater than 0');
    }

    if (gtin.length !== 13) {
      throw new ValidationError('gtin must be exactly 13 characters');
    }

    return this.client.put(
      `${BASE_URL}/api/v3/dbs/orders/${orderId}/meta/gtin`,
      { gtin },
      { rateLimitKey: 'orders-dbs.setMeta' }
    );
  }

  /**
   * Set customs declaration for an order
   *
   * Sets the customs declaration number for the order.
   * Must be 1-50 characters.
   *
   * @deprecated Use {@link setCustomsDeclarationBulk} instead. This endpoint will be removed on April 13, 2026.
   * @param orderId - Order ID to set customs declaration for
   * @param customsDeclaration - Customs declaration number (1-50 characters)
   * @returns Promise resolving to void on success
   * @throws {ValidationError} When orderId or customsDeclaration is invalid
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails
   *
   * @example
   * ```typescript
   * await sdk.ordersDBS.setCustomsDeclaration(123456, 'CD-123456789');
   * console.log('Customs declaration set successfully');
   * ```
   */
  async setCustomsDeclaration(orderId: number, customsDeclaration: string): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: setCustomsDeclaration() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to setCustomsDeclarationBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be greater than 0');
    }

    if (customsDeclaration.length < 1 || customsDeclaration.length > 50) {
      throw new ValidationError('customsDeclaration must be 1-50 characters');
    }

    return this.client.put(
      `${BASE_URL}/api/v3/dbs/orders/${orderId}/meta/customs-declaration`,
      { customsDeclaration },
      { rateLimitKey: 'orders-dbs.setMeta' }
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

  // ==========================================================================
  // Deprecated Status Methods (Will be disabled 13.04.2026)
  // ==========================================================================

  /** @deprecated Use getStatusesBulk instead */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  async getStatuses(orderIds: number[]): Promise<GetStatusResponseLegacy> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: getStatuses() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to getStatusesBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return this.client.post<GetStatusResponseLegacy>(
      `${BASE_URL}/api/v3/dbs/orders/status`,
      { orders: orderIds },
      { rateLimitKey: 'orders-dbs.getStatuses' }
    );
  }

  /** @deprecated Use confirmBulk instead */
  async confirm(orderId: number): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: confirm() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to confirmBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be a positive number');
    }
    return this.client.patch(`${BASE_URL}/api/v3/dbs/orders/${orderId}/confirm`, undefined, {
      rateLimitKey: 'orders-dbs.confirm',
    });
  }

  /** @deprecated Use deliverBulk instead */
  async deliver(orderId: number): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: deliver() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to deliverBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be a positive number');
    }
    return this.client.patch(`${BASE_URL}/api/v3/dbs/orders/${orderId}/deliver`, undefined, {
      rateLimitKey: 'orders-dbs.deliver',
    });
  }

  /** @deprecated Use receiveBulk instead */
  async receive(orderId: number, code: string): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: receive() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to receiveBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be a positive number');
    }
    if (!code || code === '') {
      throw new ValidationError('code cannot be empty');
    }
    return this.client.patch(
      `${BASE_URL}/api/v3/dbs/orders/${orderId}/receive`,
      { code },
      { rateLimitKey: 'orders-dbs.receive' }
    );
  }

  /** @deprecated Use rejectBulk instead */
  async reject(orderId: number, code: string): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: reject() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to rejectBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be a positive number');
    }
    if (!code || code === '') {
      throw new ValidationError('code cannot be empty');
    }
    return this.client.patch(
      `${BASE_URL}/api/v3/dbs/orders/${orderId}/reject`,
      { code },
      { rateLimitKey: 'orders-dbs.reject' }
    );
  }

  /** @deprecated Use cancelBulk instead */
  async cancel(orderId: number): Promise<void> {
    console.warn(
      '[Wildberries SDK] FINAL WARNING: cancel() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to cancelBulk(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
    if (orderId <= 0) {
      throw new ValidationError('orderId must be a positive number');
    }
    return this.client.patch(`${BASE_URL}/api/v3/dbs/orders/${orderId}/cancel`, undefined, {
      rateLimitKey: 'orders-dbs.cancel',
    });
  }
}
