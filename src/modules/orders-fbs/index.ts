/**
 * Orders FBS (Fulfillment by Seller) Module
 *
 * Manage FBS orders - seller processes and ships from own warehouse to WB offices.
 *
 * This differs from FBW (Fulfillment by Wildberries) where WB handles logistics
 * from WB warehouses. FBS gives sellers more control over order processing and
 * shipping while WB handles final delivery to customers.
 *
 * @module modules/orders-fbs
 */

import type { BaseClient } from '../../client/base-client';
import type {
  OrderNew,
  OrderFilters,
  OrderStatus,
  GetNewOrdersResponse,
  GetOrdersResponse,
  GetOrderStatusesResponse,
  Supply,
  SupplyFilters,
  CreateSupplyResponse,
  GetSuppliesResponse,
  StickerOptions,
  OrderSticker,
  GetOrderStickersResponse,
  BarcodeType,
  SupplyBarcode,
} from '../../types/orders-fbs.types';
import { ValidationError } from '../../errors/validation-error';

/**
 * Orders FBS (Fulfillment by Seller) module
 *
 * Provides methods for managing FBS orders including:
 * - Retrieving new orders awaiting processing
 * - Filtering orders by date range with pagination
 * - Checking order statuses (both supplier and WB system status)
 *
 * @example
 * ```typescript
 * const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });
 *
 * // Get new orders
 * const newOrders = await sdk.ordersFBS.getNewOrders();
 *
 * // Get orders from last 7 days
 * const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
 * const orders = await sdk.ordersFBS.getOrders({
 *   dateFrom: sevenDaysAgo,
 *   limit: 100
 * });
 *
 * // Check order statuses
 * const orderIds = orders.orders.map(o => o.id);
 * const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);
 * ```
 */
export class OrdersFBSModule {
  constructor(private client: BaseClient) {}

  /**
   * Get all new FBS orders awaiting processing
   *
   * Returns all new assembly tasks (сборочные задания) available at request time.
   * New orders need to be confirmed and added to supply for processing.
   *
   * Rate limit: 300 requests per minute, 200ms interval, 20 burst
   *
   * @returns Promise resolving to array of new orders
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * const newOrders = await sdk.ordersFBS.getNewOrders();
   * console.log(`Found ${newOrders.length} new orders`);
   *
   * newOrders.forEach(order => {
   *   console.log(`Order ${order.id}: ${order.article}`);
   *   console.log(`Customer comment: ${order.comment || 'None'}`);
   * });
   * ```
   */
  async getNewOrders(): Promise<OrderNew[]> {
    const response = await this.client.get<GetNewOrdersResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/new',
      { rateLimitKey: 'ordersFBS.getNewOrders' }
    );

    return response.orders;
  }

  /**
   * Get FBS orders with filters and pagination
   *
   * IMPORTANT: Returns orders WITHOUT current status. Use getOrderStatuses()
   * separately to get order status information.
   *
   * Maximum date range: 30 calendar days per request.
   * Default date range: Last 30 days if not specified.
   *
   * Pagination pattern:
   * - First request: next = 0
   * - Subsequent requests: Use next value from previous response
   * - Continue until next is 0 or null
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param filters - Optional filters (dateFrom/dateTo as Unix timestamps, limit 1-1000, next for pagination)
   * @returns Promise resolving to orders array and next pagination cursor
   * @throws {ValidationError} When date range exceeds 30 days
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * // Get orders from last 7 days with pagination
   * const sevenDaysAgo = Math.floor(Date.now() / 1000) - (7 * 24 * 60 * 60);
   * const now = Math.floor(Date.now() / 1000);
   *
   * let allOrders = [];
   * let nextCursor = 0;
   *
   * do {
   *   const response = await sdk.ordersFBS.getOrders({
   *     dateFrom: sevenDaysAgo,
   *     dateTo: now,
   *     limit: 100,
   *     next: nextCursor
   *   });
   *
   *   allOrders = allOrders.concat(response.orders);
   *   nextCursor = response.next;
   * } while (nextCursor > 0);
   *
   * console.log(`Retrieved ${allOrders.length} orders`);
   * ```
   */
  async getOrders(filters?: OrderFilters): Promise<GetOrdersResponse> {
    const params: Record<string, number> = {
      limit: filters?.limit ?? 1000,
      next: filters?.next ?? 0,
    };

    // Add optional date filters (Unix timestamps)
    if (filters?.dateFrom) {
      params.dateFrom = filters.dateFrom;
    }
    if (filters?.dateTo) {
      params.dateTo = filters.dateTo;
    }

    return this.client.get<GetOrdersResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders',
      {
        params,
        rateLimitKey: 'ordersFBS.getOrders',
      }
    );
  }

  /**
   * Get current statuses for FBS orders
   *
   * Returns both supplier status (controlled by seller) and WB status (system).
   * Use to check order states.
   *
   * Supplier Status:
   * - new: New assembly task
   * - confirm: On assembly (added to supply)
   * - complete: In delivery (supply delivered)
   * - cancel: Canceled by seller
   *
   * WB Status:
   * - waiting: Order in progress
   * - sorted: Order sorted at WB
   * - sold: Customer received order
   * - canceled: Order canceled
   * - canceled_by_client: Customer canceled on pickup
   * - declined_by_client: Customer canceled (first hour, before assembly)
   * - defect: Canceled due to defect
   * - ready_for_pickup: Arrived at pickup point
   * - postponed_delivery: Delivery postponed
   *
   * Note: Status transitions controlled by supply operations (see Story 2.6)
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param orderIds - Array of order IDs (1-1000 items)
   * @returns Promise resolving to array with id, supplierStatus, wbStatus
   * @throws {ValidationError} When orderIds array is invalid
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * const orderIds = [12345, 67890, 11111];
   * const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);
   *
   * statuses.forEach(status => {
   *   console.log(`Order ${status.id}:`);
   *   console.log(`  Supplier: ${status.supplierStatus}`);
   *   console.log(`  WB System: ${status.wbStatus}`);
   * });
   * ```
   */
  async getOrderStatuses(orderIds: number[]): Promise<OrderStatus[]> {
    // Validate order IDs array
    if (orderIds.length < 1 || orderIds.length > 1000) {
      throw new ValidationError(
        `Order IDs array must contain 1-1000 items (received: ${orderIds.length})`,
        { orderIds: `Array size must be between 1 and 1000, received ${orderIds.length}` }
      );
    }

    const response = await this.client.post<GetOrderStatusesResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/status',
      { orders: orderIds },
      { rateLimitKey: 'ordersFBS.getOrderStatuses' }
    );

    return response.orders;
  }

  // ============================================================================
  // Supply Management Methods
  // ============================================================================

  /**
   * Create new supply for grouping FBS orders
   *
   * IMPORTANT: Empty supply has no cargo type. The first order added to the supply
   * sets the cargo type (cargoType: 1=МГТ, 2=СГТ, 3=КГТ+). Only orders with the
   * same cargo type can be added to the supply after that.
   *
   * Supply workflow:
   * 1. Create supply (empty, no cargoType)
   * 2. Add first order → supply gets cargoType, order: new → confirm
   * 3. Add more orders (must match cargoType) → orders: new → confirm
   * 4. Get order stickers (orders must be in confirm status)
   * 5. Deliver supply → orders: confirm → complete, supply closed
   * 6. Get supply QR code (only available after delivery)
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param name - Supply name (1-128 characters)
   * @returns Promise resolving to object with new supply ID (format: WB-GI-1234567)
   * @throws {ValidationError} When name is invalid (empty or >128 chars)
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * const supply = await sdk.ordersFBS.createSupply('Morning Batch 2024-01-15');
   * console.log(`Created supply: ${supply.id}`); // WB-GI-1234567
   * ```
   */
  async createSupply(name: string): Promise<CreateSupplyResponse> {
    // Validate name length
    if (!name || name.length < 1 || name.length > 128) {
      throw new ValidationError(
        'Supply name must be 1-128 characters',
        { name: `Name length must be 1-128, received ${name.length}` }
      );
    }

    return this.client.post<CreateSupplyResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/supplies',
      { name },
      { rateLimitKey: 'ordersFBS.createSupply' }
    );
  }

  /**
   * Get list of FBS supplies with pagination
   *
   * Returns supplies with details including status (done flag), timestamps,
   * and pagination cursor for retrieving additional supplies.
   *
   * Pagination pattern:
   * - First request: next = 0
   * - Subsequent requests: Use next value from previous response
   * - Continue until next is 0
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param filters - Optional filters (limit 1-1000, next for pagination)
   * @returns Promise resolving to supplies array and next pagination cursor
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * // Get all supplies with pagination
   * let allSupplies = [];
   * let nextCursor = 0;
   *
   * do {
   *   const response = await sdk.ordersFBS.getSupplies({ limit: 100, next: nextCursor });
   *   allSupplies = allSupplies.concat(response.supplies);
   *   nextCursor = response.next;
   * } while (nextCursor > 0);
   *
   * console.log(`Retrieved ${allSupplies.length} supplies`);
   * ```
   */
  async getSupplies(filters?: SupplyFilters): Promise<GetSuppliesResponse> {
    const params: Record<string, number> = {
      limit: filters?.limit ?? 1000,
      next: filters?.next ?? 0,
    };

    return this.client.get<GetSuppliesResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/supplies',
      {
        params,
        rateLimitKey: 'ordersFBS.getSupplies',
      }
    );
  }

  /**
   * Get details for specific supply
   *
   * Returns supply information including status (done flag indicates if supply
   * is closed/delivered), timestamps (createdAt, closedAt, scanDt), and metadata.
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param supplyId - Supply ID (format: WB-GI-1234567)
   * @returns Promise resolving to supply details
   * @throws {NotFoundError} When supply doesn't exist
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * const supply = await sdk.ordersFBS.getSupply('WB-GI-1234567');
   * console.log(`Supply: ${supply.name}`);
   * console.log(`Status: ${supply.done ? 'Closed' : 'Open'}`);
   * console.log(`Created: ${supply.createdAt}`);
   * ```
   */
  async getSupply(supplyId: string): Promise<Supply> {
    return this.client.get<Supply>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}`,
      { rateLimitKey: 'ordersFBS.getSupply' }
    );
  }

  /**
   * Add order to supply (changes order status to 'confirm')
   *
   * CRITICAL CONSTRAINTS:
   * 1. Empty supply gets cargoType from first order added
   * 2. Can only add orders with matching cargoType after first order
   * 3. All orders must be from same warehouse
   * 4. Order status changes: new → confirm
   *
   * Cargo types:
   * - 1 = МГТ (small cargo)
   * - 2 = СГТ (oversized cargo)
   * - 3 = КГТ+ (large cargo)
   *
   * NOTE: 409 errors count as 5 requests toward rate limit.
   *
   * Rate limit: 1000 requests per minute, 60ms interval (HIGHER than other endpoints)
   *
   * @param supplyId - Supply ID
   * @param orderId - Order ID to add
   * @returns Promise<void> - 204 on success
   * @throws {ValidationError} (409) When cargo type mismatch or warehouse mismatch
   * @throws {NotFoundError} When supply or order doesn't exist
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * const supply = await sdk.ordersFBS.createSupply('Mixed Cargo Test');
   *
   * // Add first order (sets cargoType)
   * await sdk.ordersFBS.addOrderToSupply(supply.id, 12345); // cargoType: 1 (МГТ)
   *
   * // Add second order (must match cargoType: 1)
   * await sdk.ordersFBS.addOrderToSupply(supply.id, 12346); // OK - same cargoType
   *
   * // Try to add order with different cargoType
   * try {
   *   await sdk.ordersFBS.addOrderToSupply(supply.id, 99999); // cargoType: 2 (СГТ)
   * } catch (error) {
   *   // Error: cargo type mismatch (409 conflict)
   * }
   * ```
   */
  async addOrderToSupply(supplyId: string, orderId: number): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders/${orderId}`,
      {},
      { rateLimitKey: 'ordersFBS.addOrderToSupply' }
    );
  }

  /**
   * Mark supply as delivered (changes all order statuses to 'complete')
   *
   * WORKFLOW: Closes supply and transitions ALL orders to "in delivery" status.
   * After delivery, cannot add more orders. Required before getting supply QR code.
   *
   * CONSTRAINT: Supply must have ≥1 order before delivery.
   *
   * NOTE: Supply auto-closes on first acceptance scan if not manually delivered.
   * NOTE: 409 errors count as 5 requests toward rate limit.
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param supplyId - Supply ID
   * @returns Promise<void> - 204 on success
   * @throws {ValidationError} (409) When supply has zero orders or UINs not filled
   * @throws {NotFoundError} When supply doesn't exist
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * // After adding orders and generating stickers, deliver the supply
   * await sdk.ordersFBS.deliverSupply('WB-GI-1234567');
   * console.log('Supply delivered, orders transitioned to complete status');
   * ```
   */
  async deliverSupply(supplyId: string): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/deliver`,
      {},
      { rateLimitKey: 'ordersFBS.deliverSupply' }
    );
  }

  /**
   * Delete supply
   *
   * CONSTRAINT: Can only delete supply with zero orders attached.
   * Remove all orders from supply before deletion.
   *
   * NOTE: 409 errors count as 5 requests toward rate limit.
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param supplyId - Supply ID to delete
   * @returns Promise<void> - 204 on success
   * @throws {ValidationError} (409) When supply has orders
   * @throws {NotFoundError} When supply doesn't exist
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * // Delete empty supply after removing all orders
   * await sdk.ordersFBS.deleteSupply('WB-GI-1234567');
   * console.log('Supply deleted');
   * ```
   */
  async deleteSupply(supplyId: string): Promise<void> {
    await this.client.delete<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}`,
      { rateLimitKey: 'ordersFBS.deleteSupply' }
    );
  }

  // ============================================================================
  // Shipping Labels and Barcodes
  // ============================================================================

  /**
   * Get shipping label stickers for orders (base64-encoded)
   *
   * CONSTRAINTS:
   * 1. Max 100 stickers per request
   * 2. Orders must be in "confirm" status (on assembly)
   * 3. Returns base64-encoded file in specified format
   *
   * Supported formats:
   * - svg: Vector graphics
   * - png: Raster image
   * - zplv: Zebra printer (vertical)
   * - zplh: Zebra printer (horizontal)
   *
   * Valid size combinations:
   * - 580×400 px (width=58, height=40)
   * - 400×300 px (width=40, height=30)
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param orderIds - Order IDs (1-100 items)
   * @param options - Sticker format and size ({ type: 'svg'|'png'|'zplv'|'zplh', width: 58|40, height: 40|30 })
   * @returns Promise resolving to array of stickers with orderId, partA, partB, barcode, file (base64)
   * @throws {ValidationError} When >100 orders, invalid size, or orders not in "confirm" status
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * import { writeFileSync } from 'fs';
   *
   * // Get PNG stickers for orders
   * const stickers = await sdk.ordersFBS.getOrderStickers(
   *   [12345, 67890],
   *   { type: 'png', width: 58, height: 40 }
   * );
   *
   * // Save first sticker to file
   * const imageBuffer = Buffer.from(stickers[0].file, 'base64');
   * writeFileSync('order-12345-label.png', imageBuffer);
   * console.log(`Barcode: ${stickers[0].barcode}`);
   * ```
   */
  async getOrderStickers(
    orderIds: number[],
    options: StickerOptions
  ): Promise<OrderSticker[]> {
    // Validate orderIds array size
    if (orderIds.length < 1 || orderIds.length > 100) {
      throw new ValidationError(
        `Order IDs array must contain 1-100 items (received: ${orderIds.length})`,
        { orderIds: `Array size must be 1-100, received ${orderIds.length}` }
      );
    }

    // Validate size combination
    const validSizes = [
      { width: 58, height: 40 },
      { width: 40, height: 30 },
    ];
    const isValidSize = validSizes.some(
      (s) => s.width === options.width && s.height === options.height
    );
    if (!isValidSize) {
      throw new ValidationError(
        'Invalid size combination. Use 58×40 or 40×30',
        {
          size: `Valid combinations: 58×40 or 40×30, received ${options.width}×${options.height}`,
        }
      );
    }

    const response = await this.client.post<GetOrderStickersResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/stickers',
      { orders: orderIds },
      {
        params: {
          type: options.type,
          width: options.width,
          height: options.height,
        },
        rateLimitKey: 'ordersFBS.getOrderStickers',
      }
    );

    return response.stickers;
  }

  /**
   * Get supply QR code (base64-encoded)
   *
   * REQUIREMENT: Supply must be delivered (via deliverSupply) before QR code is available.
   * Size: 580×400px.
   *
   * Supported formats:
   * - svg: Vector graphics
   * - png: Raster image
   * - zplv: Zebra printer (vertical)
   * - zplh: Zebra printer (horizontal)
   *
   * NOTE: 409 errors count as 5 requests toward rate limit.
   *
   * Rate limit: 300 requests per minute, 200ms interval
   *
   * @param supplyId - Supply ID
   * @param type - Barcode format ('svg'|'png'|'zplv'|'zplh')
   * @returns Promise resolving to QR code with barcode value and file (base64)
   * @throws {ValidationError} (409) When supply not delivered
   * @throws {NotFoundError} When supply doesn't exist
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * import { writeFileSync } from 'fs';
   *
   * // First deliver the supply
   * await sdk.ordersFBS.deliverSupply('WB-GI-1234567');
   *
   * // Then get QR code
   * const qrCode = await sdk.ordersFBS.getSupplyBarcode('WB-GI-1234567', 'png');
   *
   * // Save QR code to file
   * const imageBuffer = Buffer.from(qrCode.file, 'base64');
   * writeFileSync('supply-qrcode.png', imageBuffer);
   * console.log(`QR code encodes: ${qrCode.barcode}`);
   * ```
   */
  async getSupplyBarcode(supplyId: string, type: BarcodeType): Promise<SupplyBarcode> {
    return this.client.get<SupplyBarcode>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/barcode`,
      {
        params: { type },
        rateLimitKey: 'ordersFBS.getSupplyBarcode',
      }
    );
  }

  /**
   * Cancel FBS order (changes status to 'cancel')
   *
   * AUTO-REMOVAL: If order was in a supply, it's automatically removed from the supply.
   *
   * CONSTRAINT: Cannot cancel if order already completed/delivered.
   *
   * NOTE: 409 errors count as 5 requests toward rate limit.
   *
   * Rate limit: 100 requests per minute, 600ms interval (LOWER than other endpoints)
   *
   * @param orderId - Order ID to cancel
   * @returns Promise<void> - 204 on success
   * @throws {ValidationError} (409) When status transition not allowed
   * @throws {NotFoundError} When order doesn't exist
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * // Cancel order (auto-removes from supply if present)
   * await sdk.ordersFBS.cancelOrder(12345);
   * console.log('Order canceled and removed from supply');
   * ```
   */
  async cancelOrder(orderId: number): Promise<void> {
    await this.client.patch<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/cancel`,
      {},
      { rateLimitKey: 'ordersFBS.cancelOrder' }
    );
  }
}
