/**
 * In-Store Pickup (Click & Collect) Module
 *
 * Manage click & collect orders where customers purchase online and pick up
 * at seller's physical location. Handles order assembly lifecycle, customer
 * verification, and product metadata management for regulated products.
 *
 * **Context7 References**:
 * - Axios interceptors and error handling: /axios/axios-docs
 * - TypeScript utility types: /microsoft/typescript
 * - Vitest testing patterns: /vitest-dev/vitest
 *
 * @module modules/in-store-pickup
 */

import type { BaseClient } from '../../client/base-client';
import type {
  NewOrdersResponse,
  OrdersResponse,
  OrderStatusesResponse,
  OrderStatusRequest,
  OrderClientInfoResponse,
  CheckIdentityRequest,
  CheckedIdentity,
  OrderMetadata,
  SGTINRequest,
  UINRequest,
  IMEIRequest,
  GTINRequest,
  GetOrdersParams,
} from '../../types/in-store-pickup.types';

/**
 * In-Store Pickup (Click & Collect) module
 *
 * Provides comprehensive methods for managing in-store pickup operations:
 * - **Order Assembly Management**: Process orders through lifecycle (new → confirm → prepare → receive/reject)
 * - **Order Queries**: List orders with filtering and get order statuses
 * - **Customer Interaction**: Search customer orders and verify customer identity at pickup
 * - **Metadata Management**: Manage product identification codes (SGTIN, UIN, IMEI, GTIN)
 *
 * **Order Lifecycle States**:
 * - `new` → `confirm` (via confirmOrder) - Start assembly
 * - `confirm` → `prepare` (via prepareOrder) - Mark ready for pickup
 * - `prepare` → `receive` (via receiveOrder) - Complete handover to customer
 * - `prepare` → `reject` (via rejectOrder) - Customer rejected/didn't pick up
 * - Any → `cancel` (via cancelOrder) - Seller cancellation
 *
 * **Rate Limit Note**: 409 responses count as 5 requests toward rate limits!
 *
 * @example Basic pickup workflow
 * ```typescript
 * const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
 *
 * // 1. Get new pickup orders
 * const newOrders = await sdk.inStorePickup.getNewOrders();
 * const order = newOrders.orders[0];
 *
 * // 2. Confirm order and start assembly
 * await sdk.inStorePickup.confirmOrder(order.id);
 *
 * // 3. Complete assembly
 * await sdk.inStorePickup.prepareOrder(order.id);
 *
 * // 4. Customer arrives - verify identity
 * const verification = await sdk.inStorePickup.verifyCustomerIdentity({
 *   orderCode: order.orderCode,
 *   passcode: '1234' // From customer's app
 * });
 *
 * // 5. Complete handover
 * await sdk.inStorePickup.receiveOrder(order.id);
 * ```
 *
 * @example Metadata management for regulated products
 * ```typescript
 * // Set SGTIN code (Честный знак marking)
 * await sdk.inStorePickup.setSGTINCode(orderId, ['1234567890123456']);
 *
 * // Set IMEI for electronics
 * await sdk.inStorePickup.setIMEICode(orderId, '123456789012345');
 *
 * // Get all metadata
 * const metadata = await sdk.inStorePickup.getOrderMetadata(orderId);
 * ```
 */
export class InStorePickupModule {
  constructor(private client: BaseClient) {}

  // ============================================================
  // ORDER ASSEMBLY MANAGEMENT
  // ============================================================

  /**
   * Get all new pickup orders awaiting processing
   *
   * Returns all new assembly tasks for click & collect orders that need to be
   * processed. Orders should be confirmed and assembled by the seller before
   * customer pickup.
   *
   * **Rate limit**: 300 requests per minute, 200ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @returns Promise resolving to array of new pickup orders
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1new/get}
   *
   * @example
   * ```typescript
   * const response = await sdk.inStorePickup.getNewOrders();
   * console.log(`Found ${response.orders.length} new pickup orders`);
   *
   * response.orders.forEach(order => {
   *   console.log(`Order ${order.id}: ${order.article}`);
   *   console.log(`Customer code: ${order.orderCode}`);
   *   console.log(`Required metadata: ${order.requiredMeta?.join(', ') || 'None'}`);
   * });
   * ```
   */
  async getNewOrders(): Promise<NewOrdersResponse> {
    return this.client.get<NewOrdersResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/new',
      { rateLimitKey: 'inStorePickup.getNewOrders' }
    );
  }

  /**
   * Confirm order and start assembly process
   *
   * Transitions order from `new` to `confirm` status, indicating that assembly
   * has started. This is required before the order can be prepared.
   *
   * **Rate limit**: 100 requests per minute, 600ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the assembly task to confirm
   * @returns Promise resolving when confirmation succeeds (204 No Content)
   * @throws {ValidationError} On invalid order ID (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {InvalidOrderStateError} When order state transition is invalid (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1confirm/patch}
   *
   * @example
   * ```typescript
   * try {
   *   await sdk.inStorePickup.confirmOrder(12345);
   *   console.log('Order confirmed, assembly started');
   * } catch (error) {
   *   if (error.name === 'InvalidOrderStateError') {
   *     console.error('Order is not in correct state for confirmation');
   *   }
   * }
   * ```
   */
  async confirmOrder(orderId: number): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/confirm`,
      {},
      { rateLimitKey: 'inStorePickup.confirmOrder' }
    );
  }

  /**
   * Mark order as prepared and ready for customer pickup
   *
   * Transitions order from `confirm` to `prepare` status. Order is now assembled
   * and waiting for customer to arrive for pickup.
   *
   * **Rate limit**: 100 requests per minute, 600ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the assembly task to mark as prepared
   * @returns Promise resolving when preparation succeeds (204 No Content)
   * @throws {ValidationError} On invalid order ID (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {InvalidOrderStateError} When order state transition is invalid (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1prepare/patch}
   *
   * @example
   * ```typescript
   * try {
   *   await sdk.inStorePickup.prepareOrder(12345);
   *   console.log('Order prepared and ready for customer pickup');
   * } catch (error) {
   *   if (error.name === 'InvalidOrderStateError') {
   *     console.error('Order must be confirmed before preparation');
   *   }
   * }
   * ```
   */
  async prepareOrder(orderId: number): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/prepare`,
      {},
      { rateLimitKey: 'inStorePickup.prepareOrder' }
    );
  }

  /**
   * Complete order handover to customer
   *
   * Transitions order from `prepare` to `receive` status. This is the terminal
   * state indicating successful order completion.
   *
   * **Rate limit**: 100 requests per minute, 600ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the assembly task to mark as received
   * @returns Promise resolving when handover succeeds (204 No Content)
   * @throws {ValidationError} On invalid order ID (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {InvalidOrderStateError} When order state transition is invalid (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1receive/patch}
   *
   * @example
   * ```typescript
   * // After customer identity verification succeeds
   * await sdk.inStorePickup.receiveOrder(12345);
   * console.log('Order successfully handed over to customer');
   * ```
   */
  async receiveOrder(orderId: number): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/receive`,
      {},
      { rateLimitKey: 'inStorePickup.receiveOrder' }
    );
  }

  /**
   * Mark order as rejected by customer
   *
   * Transitions order from `prepare` to `reject` status when customer refuses
   * to pick up the order. This is a terminal state.
   *
   * **Rate limit**: 100 requests per minute, 600ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the assembly task to mark as rejected
   * @returns Promise resolving when rejection succeeds (204 No Content)
   * @throws {ValidationError} On invalid order ID (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {InvalidOrderStateError} When order state transition is invalid (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1reject/patch}
   *
   * @example
   * ```typescript
   * // Customer doesn't show up or refuses order
   * await sdk.inStorePickup.rejectOrder(12345);
   * console.log('Order marked as rejected by customer');
   * ```
   */
  async rejectOrder(orderId: number): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/reject`,
      {},
      { rateLimitKey: 'inStorePickup.rejectOrder' }
    );
  }

  /**
   * Cancel order (seller cancellation)
   *
   * Transitions order to `cancel` status. Can be done from any state. This is
   * a terminal state.
   *
   * **Rate limit**: 100 requests per minute, 600ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the assembly task to cancel
   * @returns Promise resolving when cancellation succeeds (204 No Content)
   * @throws {ValidationError} On invalid order ID (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {InvalidOrderStateError} When order state transition is invalid (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1cancel/patch}
   *
   * @example
   * ```typescript
   * // Seller cancels order due to stock issues
   * await sdk.inStorePickup.cancelOrder(12345);
   * console.log('Order cancelled by seller');
   * ```
   */
  async cancelOrder(orderId: number): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/cancel`,
      {},
      { rateLimitKey: 'inStorePickup.cancelOrder' }
    );
  }

  // ============================================================
  // ORDER QUERIES
  // ============================================================

  /**
   * Get completed orders with pagination
   *
   * Returns completed pickup orders (after sale or cancellation) for a specified
   * time period. Maximum 30 calendar days per request.
   *
   * **Rate limit**: 300 requests per minute, 200ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param params - Query parameters for filtering
   * @param params.limit - Maximum number of items to return (1-1000)
   * @param params.next - Pagination offset (0 for first request)
   * @param params.dateFrom - Period start date (Unix timestamp)
   * @param params.dateTo - Period end date (Unix timestamp, max 30 days from dateFrom)
   * @returns Promise resolving to paginated orders response
   * @throws {ValidationError} On invalid parameters (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders/get}
   *
   * @example Get last 7 days of completed orders
   * ```typescript
   * const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
   * const now = Math.floor(Date.now() / 1000);
   *
   * let allOrders: Order[] = [];
   * let next = 0;
   *
   * do {
   *   const response = await sdk.inStorePickup.getOrders({
   *     limit: 1000,
   *     next,
   *     dateFrom: sevenDaysAgo,
   *     dateTo: now
   *   });
   *
   *   allOrders = allOrders.concat(response.orders);
   *   next = response.next;
   * } while (next !== 0);
   *
   * console.log(`Found ${allOrders.length} completed orders`);
   * ```
   */
  async getOrders(params: GetOrdersParams): Promise<OrdersResponse> {
    const queryParams: Record<string, number> = {
      limit: params.limit,
      next: params.next,
      dateFrom: params.dateFrom,
      dateTo: params.dateTo,
    };

    return this.client.get<OrdersResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders',
      {
        params: queryParams,
        rateLimitKey: 'inStorePickup.getOrders',
      }
    );
  }

  /**
   * Get current statuses for multiple orders
   *
   * Returns both supplier status (seller-controlled) and WB status (system-controlled)
   * for specified order IDs.
   *
   * **Supplier Statuses**: new, confirm, prepare, receive, reject, cancel, cancel_shelf_life
   * **WB Statuses**: waiting, sold, canceled, canceled_by_client, declined_by_client, defect, ready_for_pickup
   *
   * **Rate limit**: 300 requests per minute, 200ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderIds - Array of order IDs to check
   * @returns Promise resolving to order statuses
   * @throws {ValidationError} On invalid request body (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1status/post}
   *
   * @example
   * ```typescript
   * const orderIds = [12345, 12346, 12347];
   * const statuses = await sdk.inStorePickup.getOrderStatuses(orderIds);
   *
   * statuses.orders.forEach(status => {
   *   console.log(`Order ${status.id}:`);
   *   console.log(`  Supplier: ${status.supplierStatus}`);
   *   console.log(`  WB System: ${status.wbStatus}`);
   * });
   * ```
   */
  async getOrderStatuses(orderIds: number[]): Promise<OrderStatusesResponse> {
    const request: OrderStatusRequest = { orders: orderIds };

    return this.client.post<OrderStatusesResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/status',
      request,
      { rateLimitKey: 'inStorePickup.getOrderStatuses' }
    );
  }

  // ============================================================
  // CUSTOMER INTERACTION
  // ============================================================

  /**
   * Get customer information for orders
   *
   * Returns customer contact information for specified orders. Only available
   * for orders in `confirm` (on assembly) or `prepare` (ready for pickup) status.
   *
   * **Note**: Phone number is NOT direct customer number - requires extension code
   *
   * **Rate limit**: 300 requests per minute, 200ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderIds - Array of order IDs to get customer info for
   * @returns Promise resolving to customer information
   * @throws {ValidationError} On invalid request body (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1client/post}
   *
   * @example
   * ```typescript
   * const customerInfo = await sdk.inStorePickup.getCustomerInfo([12345]);
   *
   * customerInfo.orders.forEach(info => {
   *   console.log(`Order ${info.orderID}: ${info.firstName}`);
   *   console.log(`Contact: ${info.phone}, extension ${info.phoneCode}`);
   * });
   * ```
   */
  async getCustomerInfo(orderIds: number[]): Promise<OrderClientInfoResponse> {
    const request: OrderStatusRequest = { orders: orderIds };

    return this.client.post<OrderClientInfoResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client',
      request,
      { rateLimitKey: 'inStorePickup.getCustomerInfo' }
    );
  }

  /**
   * Verify customer identity at pickup
   *
   * Verifies that the order belongs to the customer by validating their passcode.
   * Only available when at least one assembly task from the order is in `prepare` status.
   *
   * **Rate limit**: 30 requests per minute, 2s interval, 20 burst (MOST RESTRICTIVE!)
   * **Note**: 409 responses count as 5 requests
   *
   * @param request - Identity verification request
   * @param request.orderCode - Customer's unique order code
   * @param request.passcode - Verification passcode from customer's app
   * @returns Promise resolving to verification result (always { ok: true } on success)
   * @throws {ValidationError} On invalid request body (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {CustomerVerificationError} When passcode is incorrect (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1client~1identity/post}
   *
   * @example
   * ```typescript
   * try {
   *   const result = await sdk.inStorePickup.verifyCustomerIdentity({
   *     orderCode: '21117866-0006',
   *     passcode: '1234'
   *   });
   *
   *   if (result.ok) {
   *     console.log('Customer verified! Proceed with handover');
   *     // Now call receiveOrder()
   *   }
   * } catch (error) {
   *   if (error.name === 'CustomerVerificationError') {
   *     console.error('Invalid passcode - ask customer to check their app');
   *   }
   * }
   * ```
   */
  async verifyCustomerIdentity(request: CheckIdentityRequest): Promise<CheckedIdentity> {
    return this.client.post<CheckedIdentity>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client/identity',
      request,
      { rateLimitKey: 'inStorePickup.verifyCustomerIdentity' }
    );
  }

  // ============================================================
  // METADATA MANAGEMENT
  // ============================================================

  /**
   * Get product metadata for order
   *
   * Returns identification codes (SGTIN, UIN, IMEI, GTIN) associated with the order.
   * Available metadata types are listed in the `requiredMeta` field of new orders.
   *
   * **Rate limit**: 300 requests per minute, 200ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the order to get metadata for
   * @returns Promise resolving to order metadata
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta/get}
   *
   * @example
   * ```typescript
   * const metadata = await sdk.inStorePickup.getOrderMetadata(12345);
   *
   * console.log('Order metadata:');
   * if (metadata.meta.sgtin?.value) {
   *   console.log(`SGTIN: ${metadata.meta.sgtin.value.join(', ')}`);
   * }
   * if (metadata.meta.imei?.value) {
   *   console.log(`IMEI: ${metadata.meta.imei.value}`);
   * }
   * ```
   */
  async getOrderMetadata(orderId: number): Promise<OrderMetadata> {
    return this.client.get<OrderMetadata>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`,
      { rateLimitKey: 'inStorePickup.getOrderMetadata' }
    );
  }

  /**
   * Delete metadata for order
   *
   * Removes metadata value for specified key. Valid keys: imei, uin, gtin, sgtin.
   * Only one key can be deleted per request.
   *
   * **Rate limit**: 300 requests per minute, 200ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the order to delete metadata from
   * @param key - Metadata key to delete (imei, uin, gtin, sgtin)
   * @returns Promise resolving when deletion succeeds (204 No Content)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta/delete}
   *
   * @example
   * ```typescript
   * // Remove IMEI code
   * await sdk.inStorePickup.deleteOrderMetadata(12345, 'imei');
   * console.log('IMEI metadata deleted');
   * ```
   */
  async deleteOrderMetadata(
    orderId: number,
    key: 'imei' | 'uin' | 'gtin' | 'sgtin'
  ): Promise<void> {
    await this.client.delete<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`,
      undefined,
      {
        params: { key },
        rateLimitKey: 'inStorePickup.deleteOrderMetadata',
      }
    );
  }

  /**
   * Set SGTIN codes (Честный знак marking)
   *
   * Assigns SGTIN codes for Честный знак product marking system. Only available
   * when order is in `confirm` status and `sgtin` is in order's `requiredMeta`.
   *
   * **Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the order to set SGTIN for
   * @param sgtins - Array of SGTIN codes (16-135 characters each)
   * @returns Promise resolving when codes are set (204 No Content)
   * @throws {ValidationError} On invalid codes (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {MetadataValidationError} When metadata cannot be updated (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta~1sgtin/put}
   *
   * @example
   * ```typescript
   * // Scan SGTIN codes from product marking
   * await sdk.inStorePickup.setSGTINCode(12345, [
   *   '01047264500236891521AbCdEf1234567890',
   *   '01047264500236892521GhIjKl0987654321'
   * ]);
   * console.log('SGTIN codes assigned');
   * ```
   */
  async setSGTINCode(orderId: number, sgtins: string[]): Promise<void> {
    const request: SGTINRequest = { sgtins };

    await this.client.put<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/sgtin`,
      request,
      { rateLimitKey: 'inStorePickup.setSGTINCode' }
    );
  }

  /**
   * Set UIN code (Unique Identification Number)
   *
   * Assigns UIN for the order. Only available when order is in `confirm` status
   * and `uin` is in order's `requiredMeta`.
   *
   * **Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the order to set UIN for
   * @param uin - UIN code
   * @returns Promise resolving when code is set (204 No Content)
   * @throws {ValidationError} On invalid code (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {MetadataValidationError} When metadata cannot be updated (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta~1uin/put}
   *
   * @example
   * ```typescript
   * await sdk.inStorePickup.setUINCode(12345, '1234567890123456');
   * console.log('UIN code assigned');
   * ```
   */
  async setUINCode(orderId: number, uin: string): Promise<void> {
    const request: UINRequest = { uin };

    await this.client.put<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/uin`,
      request,
      { rateLimitKey: 'inStorePickup.setUINCode' }
    );
  }

  /**
   * Set IMEI code (for electronics)
   *
   * Assigns IMEI code for electronic devices. Only available when order is in
   * `confirm` status and `imei` is in order's `requiredMeta`.
   *
   * **Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the order to set IMEI for
   * @param imei - IMEI code (15 digits)
   * @returns Promise resolving when code is set (204 No Content)
   * @throws {ValidationError} On invalid code (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {MetadataValidationError} When metadata cannot be updated (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta~1imei/put}
   *
   * @example
   * ```typescript
   * // Scan IMEI from device
   * await sdk.inStorePickup.setIMEICode(12345, '123456789012345');
   * console.log('IMEI code assigned');
   * ```
   */
  async setIMEICode(orderId: number, imei: string): Promise<void> {
    const request: IMEIRequest = { imei };

    await this.client.put<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/imei`,
      request,
      { rateLimitKey: 'inStorePickup.setIMEICode' }
    );
  }

  /**
   * Set GTIN code (Belarus product ID)
   *
   * Assigns GTIN code (unique product ID in Belarus). Only available when order
   * is in `confirm` status and `gtin` is in order's `requiredMeta`.
   *
   * **Rate limit**: 1000 requests per minute, 60ms interval, 20 burst
   * **Note**: 409 responses count as 5 requests
   *
   * @param orderId - ID of the order to set GTIN for
   * @param gtin - GTIN code
   * @returns Promise resolving when code is set (204 No Content)
   * @throws {ValidationError} On invalid code (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {MetadataValidationError} When metadata cannot be updated (409)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @see {@link https://dev.wildberries.ru/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta~1gtin/put}
   *
   * @example
   * ```typescript
   * await sdk.inStorePickup.setGTINCode(12345, '1234567890123456');
   * console.log('GTIN code assigned');
   * ```
   */
  async setGTINCode(orderId: number, gtin: string): Promise<void> {
    const request: GTINRequest = { gtin };

    await this.client.put<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/gtin`,
      request,
      { rateLimitKey: 'inStorePickup.setGTINCode' }
    );
  }
}
