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
  PassOfficesResponse,
  PassesResponse,
  ReshipmentOrder,
  ReshipmentOrdersResponse,
  OrderMetadataResponse,
  OrderSgtinResponse,
  OrderUinResponse,
  OrderImeiResponse,
  OrderGtinResponse,
  OrderExpirationResponse,
  OrdersByClientResponse,
  OrderStatusHistoryResponse,
  SupplyTrbxResponse,
  SupplyTrbxStickersResponse,
  CreatePassRequest,
  CreatePassResponse,
  SupplyOrdersResponse,
  // New types for missing methods (Epic 7)
  UpdatePassRequest,
  OrderMetadataKey,
  SetOrderSGTINRequest,
  SetOrderUINRequest,
  SetOrderIMEIRequest,
  SetOrderGTINRequest,
  SetOrderExpirationRequest,
  CrossBorderStickersResponse,
  ExternalStickersUrlsResponse,
  CrossBorderStatusHistoryResponse,
  CrossBorderTurkeyClientInfoResponse,
  AddSupplyTrbxResponse,
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
   * **IMPORTANT:** This method requires an array of order IDs as parameter.
   * It cannot be called without parameters - you must specify which orders
   * you want to check status for.
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
   * @param orderIds - Array of order IDs (1-1000 items) - **REQUIRED PARAMETER**
   * @returns Promise resolving to array with id, supplierStatus, wbStatus
   * @throws {ValidationError} When orderIds array is invalid or missing
   * @throws {RateLimitError} When rate limit exceeded
   * @throws {NetworkError} On network failures
   *
   * @example
   * ```typescript
   * // ✅ CORRECT: Pass array of order IDs
   * const orderIds = [12345, 67890, 11111];
   * const statuses = await sdk.ordersFBS.getOrderStatuses(orderIds);
   *
   * statuses.forEach(status => {
   *   console.log(`Order ${status.id}:`);
   *   console.log(`  Supplier: ${status.supplierStatus}`);
   *   console.log(`  WB System: ${status.wbStatus}`);
   * });
   *
   * // ❌ INCORRECT: Cannot call without parameters
   * // await sdk.ordersFBS.getOrderStatuses(); // Will throw ValidationError
   *
   * // ❌ INCORRECT: Cannot call with empty array
   * // await sdk.ordersFBS.getOrderStatuses([]); // Will throw ValidationError
   * ```
   */
  async getOrderStatuses(orderIds: number[]): Promise<OrderStatus[]> {
    // Validate order IDs array
    if (orderIds.length < 1 || orderIds.length > 1000) {
      throw new ValidationError(
        `Order IDs array must contain 1-1000 items (received: ${orderIds.length}). For single order: getOrderStatuses([12345])`,
        { orderIds: `Array size must be between 1 and 1000, received ${orderIds.length}` }
      );
    }

    // Validate each item is a positive integer
    for (let i = 0; i < orderIds.length; i++) {
      if (!Number.isInteger(orderIds[i]) || orderIds[i] <= 0) {
        throw new ValidationError(
          `Invalid order ID at index ${i}: ${orderIds[i]}. Order IDs must be positive integers.`,
          { [`orderIds[${i}]`]: `Must be positive integer, received ${orderIds[i]}` }
        );
      }
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

  // ============================================================================
  // Pass Management (Task 7.1.3 Implementation)
  // ============================================================================

  /**
   * Get warehouses requiring passes for entry
   *
   * Returns list of Wildberries warehouses/offices that require seller passes
   * for entry. Essential for warehouse operations planning and pass management.
   *
   * **Business Use Case:**
   * - Plan warehouse visits and deliveries
   * - Identify which locations require passes
   * - Sync warehouse list periodically (data may change)
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   * **Note:** 409 errors count as 5 requests toward rate limit
   *
   * @returns Promise with array of warehouse {@link PassOffice} objects
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get all warehouses requiring passes
   * const warehouses = await sdk.ordersFBS.getPassOffices();
   *
   * console.log(`Found ${warehouses.length} warehouses requiring passes:`);
   * warehouses.forEach(warehouse => {
   *   console.log(`- ${warehouse.name} (ID: ${warehouse.id})`);
   *   console.log(`  Address: ${warehouse.address}`);
   * });
   *
   * // Use warehouse ID for pass creation
   * const firstWarehouse = warehouses[0];
   * console.log(`Plan operations for: ${firstWarehouse.name}`);
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes~1offices/get}
   */
  async getPassOffices(): Promise<PassOfficesResponse> {
    return this.client.get<PassOfficesResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/passes/offices',
      {
        rateLimitKey: 'ordersFBS.getPassOffices'
      }
    );
  }

  /**
   * Get all created seller passes
   *
   * Returns complete list of all seller passes with driver information,
   * vehicle details, and assigned warehouse information.
   *
   * **Business Use Case:**
   * - Track active and expired passes
   * - Manage driver and vehicle assignments
   * - Monitor pass expiration dates
   * - Audit warehouse access permissions
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   * **Note:** 409 errors count as 5 requests toward rate limit
   *
   * @returns Promise with array of {@link Pass} objects containing all pass data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get all seller passes
   * const passes = await sdk.ordersFBS.getPasses();
   *
   * console.log(`Found ${passes.length} passes:`);
   * passes.forEach(pass => {
   *   console.log(`Pass #${pass.id}:`);
   *   console.log(`  Driver: ${pass.firstName} ${pass.lastName}`);
   *   console.log(`  Vehicle: ${pass.carModel} (${pass.carNumber})`);
   *   console.log(`  Warehouse: ${pass.officeName}`);
   *   console.log(`  Expires: ${new Date(pass.dateEnd).toLocaleDateString()}`);
   *
   *   // Check for expiring passes
   *   const expiresIn = new Date(pass.dateEnd).getTime() - Date.now();
   *   const daysUntilExpiry = Math.ceil(expiresIn / (1000 * 60 * 60 * 24));
   *   if (daysUntilExpiry <= 7) {
   *     console.log(`  ⚠️  PASS EXPIRES SOON (${daysUntilExpiry} days)`);
   *   }
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get}
   */
  async getPasses(): Promise<PassesResponse> {
    return this.client.get<PassesResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/passes',
      {
        rateLimitKey: 'ordersFBS.getPasses'
      }
    );
  }

  // ============================================================================
  // Reshipment Orders Management (Task 7.1.5 Implementation)
  // ============================================================================

  /**
   * Get orders requiring reshipment
   *
   * Returns all orders that require reshipment due to incomplete scanning
   * at the pickup point. These orders need to be delivered again as part
   * of a new supply.
   *
   * **Business Use Case:**
   * - Monitor orders that require additional delivery attempts
   * - Plan reshipment operations for incomplete orders
   * - Track orders that failed initial scanning process
   * - Manage customer service issues related to delivery problems
   *
   * **Reshipment Context:**
   * - Occurs when supply was scanned at pickup point but some items weren't scanned
   * - Orders need to be delivered again within a specific timeframe
   * - Can be moved to a different active supply for reshipment
   * - Important for maintaining delivery SLAs and customer satisfaction
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   * **Note:** 409 errors count as 5 requests toward rate limit
   *
   * @returns Promise with array of {@link ReshipmentOrder} objects containing supply and order IDs
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get all orders requiring reshipment
   * const reshipmentOrders = await sdk.ordersFBS.getReshipmentOrders();
   *
   * console.log(`Found ${reshipmentOrders.length} orders requiring reshipment:`);
   * reshipmentOrders.forEach(order => {
   *   console.log(`Order #${order.orderID} from supply ${order.supplyID}`);
   *   console.log(`  Supply: ${order.supplyID}`);
   *   console.log(`  Order: ${order.orderID}`);
   *
   *   // Plan reshipment action
   *   console.log(`  Action: Add to new supply for delivery`);
   * });
   *
   * // Group orders by supply for efficient reshipment
   * const ordersBySupply = reshipmentOrders.reduce((acc, order) => {
   *   if (!acc[order.supplyID]) {
   *     acc[order.supplyID] = [];
   *   }
   *   acc[order.supplyID].push(order.orderID);
   *   return acc;
   * }, {});
   *
   * console.log('Reshipment by supply:');
   * Object.entries(ordersBySupply).forEach(([supplyId, orderIds]) => {
   *   console.log(`Supply ${supplyId}: ${orderIds.length} orders`);
   * });
   * ```
   *
   * @see {@link https://dev.wildberries.ru/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1supplies~1orders~1reshipment/get}
   */
  async getReshipmentOrders(): Promise<ReshipmentOrder[]> {
    const response = await this.client.get<ReshipmentOrdersResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/supplies/orders/reshipment',
      {
        rateLimitKey: 'ordersFBS.getReshipmentOrders'
      }
    );

    return response.orders;
  }

  // ============================================================================
  // Order Metadata Management (Priority 1 Critical Missing Methods)
  // ============================================================================

  /**
   * Get order metadata information
   *
   * Returns detailed metadata for a specific order including client information,
   * delivery address, and order characteristics.
   *
   * **Business Use Case:**
   * - Access customer delivery information for order fulfillment
   * - Retrieve order metadata for logistics planning
   * - Validate order details before shipping
   * - Get contact information for customer service
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to get metadata for
   * @returns Promise with order metadata including client info and address
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID is invalid (400/422)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get metadata for specific order
   * const metadata = await sdk.ordersFBS.getOrderMetadata(12345);
   *
   * console.log(`Order #${metadata.orderId}:`);
   * console.log(`  Customer: ${metadata.clientName}`);
   * console.log(`  Address: ${metadata.address.fullAddress}`);
   * console.log(`  Phone: ${metadata.phone}`);
   * console.log(`  Warehouse: ${metadata.warehouseName}`);
   * ```
   */
  async getOrderMetadata(orderId: number): Promise<OrderMetadataResponse> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    return this.client.get<OrderMetadataResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta`,
      {
        rateLimitKey: 'ordersFBS.getOrderMetadata'
      }
    );
  }

  /**
   * Get order SGTIN information
   *
   * Returns SGTIN (Serialized Global Trade Item Number) data for order items.
   * Used for product tracking and identification in logistics systems.
   *
   * **Business Use Case:**
   * - Track individual items using SGTIN codes
   * - Validate product authenticity
   * - Support inventory management with serialized tracking
   * - Comply with traceability requirements
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to get SGTIN data for
   * @returns Promise with SGTIN information for order items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID is invalid (400/422)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get SGTIN data for order
   * const sgtinData = await sdk.ordersFBS.getOrderSgtin(12345);
   *
   * sgtinData.items.forEach(item => {
   *   console.log(`Item: ${item.article}`);
   *   console.log(`  SGTIN: ${item.sgtin}`);
   *   console.log(`  Quantity: ${item.quantity}`);
   * });
   * ```
   */
  async getOrderSgtin(orderId: number): Promise<OrderSgtinResponse> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    return await this.client.get<OrderSgtinResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/sgtin`,
      {
        rateLimitKey: 'ordersFBS.getOrderSgtin'
      }
    );
  }

  /**
   * Get order UIN information
   *
   * Returns UIN (Unique Identification Number) data for order items.
   * UINs are used for tracking individual items in the logistics system.
   *
   * **Business Use Case:**
   * - Track individual items using UIN codes
   * - Validate item identification for shipping
   * - Support inventory management
   * - Ensure correct item matching during fulfillment
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to get UIN data for
   * @returns Promise with UIN information for order items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID is invalid (400/422)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get UIN data for order
   * const uinData = await sdk.ordersFBS.getOrderUin(12345);
   *
   * uinData.items.forEach(item => {
   *   console.log(`Item: ${item.article}`);
   *   console.log(`  UIN: ${item.uin}`);
   *   console.log(`  Quantity: ${item.quantity}`);
   * });
   * ```
   */
  async getOrderUin(orderId: number): Promise<OrderUinResponse> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    const response = await this.client.get<OrderUinResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/uin`,
      {
        rateLimitKey: 'ordersFBS.getOrderUin'
      }
    );

    return response;
  }

  /**
   * Get order IMEI information
   *
   * Returns IMEI (International Mobile Equipment Identity) data for electronic devices.
   * Used for tracking electronics and mobile devices in orders.
   *
   * **Business Use Case:**
   * - Track electronic devices using IMEI numbers
   * - Validate device identification for mobile phones/electronics
   * - Support warranty tracking and device registration
   * - Ensure correct device matching during fulfillment
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to get IMEI data for
   * @returns Promise with IMEI information for electronic items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID is invalid (400/422)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get IMEI data for order
   * const imeiData = await sdk.ordersFBS.getOrderImei(12345);
   *
   * imeiData.items.forEach(item => {
   *   console.log(`Device: ${item.article}`);
   *   console.log(`  IMEI: ${item.imei}`);
   *   console.log(`  Quantity: ${item.quantity}`);
   * });
   * ```
   */
  async getOrderImei(orderId: number): Promise<OrderImeiResponse> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    const response = await this.client.get<OrderImeiResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/imei`,
      {
        rateLimitKey: 'ordersFBS.getOrderImei'
      }
    );

    return response;
  }

  /**
   * Get order GTIN information
   *
   * Returns GTIN (Global Trade Item Number) data for order items.
   * GTINs are international product identification numbers used for retail products.
   *
   * **Business Use Case:**
   * - Access product GTIN data for international shipping
   * - Validate product identification across different systems
   * - Support customs documentation for cross-border trade
   * - Ensure product compliance with international standards
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to get GTIN data for
   * @returns Promise with GTIN information for order items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID is invalid (400/422)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get GTIN data for order
   * const gtinData = await sdk.ordersFBS.getOrderGtin(12345);
   *
   * gtinData.items.forEach(item => {
   *   console.log(`Product: ${item.article}`);
   *   console.log(`  GTIN: ${item.gtin}`);
   *   console.log(`  Quantity: ${item.quantity}`);
   * });
   * ```
   */
  async getOrderGtin(orderId: number): Promise<OrderGtinResponse> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    const response = await this.client.get<OrderGtinResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/gtin`,
      {
        rateLimitKey: 'ordersFBS.getOrderGtin'
      }
    );

    return response;
  }

  /**
   * Get order expiration date information
   *
   * Returns expiration date data for products with limited shelf life.
   * Essential for managing inventory of perishable goods.
   *
   * **Business Use Case:**
   * - Track expiration dates for perishable products
   * - Ensure FIFO (First In, First Out) inventory management
   * - Validate product freshness before shipping
   * - Comply with food safety regulations
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to get expiration data for
   * @returns Promise with expiration date information for order items
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID is invalid (400/422)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get expiration data for order
   * const expirationData = await sdk.ordersFBS.getOrderExpiration(12345);
   *
   * expirationData.items.forEach(item => {
   *   console.log(`Product: ${item.article}`);
   *   console.log(`  Expires: ${item.expirationDate}`);
   *   console.log(`  Quantity: ${item.quantity}`);
   *
   *   // Check if product is expiring soon
   *   const expiresSoon = new Date(item.expirationDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
   *   if (expiresSoon) {
   *     console.log(`  ⚠️ EXPIRES SOON`);
   *   }
   * });
   * ```
   */
  async getOrderExpiration(orderId: number): Promise<OrderExpirationResponse> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    const response = await this.client.get<OrderExpirationResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/expiration`,
      {
        rateLimitKey: 'ordersFBS.getOrderExpiration'
      }
    );

    return response;
  }

  // ============================================================================
  // Advanced Warehouse Operations
  // ============================================================================

  /**
   * Get orders by client identifier
   *
   * Returns orders associated with a specific client ID or phone number.
   * Useful for customer service and order lookup operations.
   *
   * **Business Use Case:**
   * - Customer service order lookup by client phone
   * - Track all orders for specific customer
   * - Resolve customer inquiries efficiently
   * - Support customer relationship management
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param clientData - Client identifier (phone or client ID)
   * @returns Promise with array of orders for the specified client
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When client data is invalid (400/422)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get orders by client phone
   * const ordersByPhone = await sdk.ordersFBS.getOrdersByClient({
   *   phone: '+79001234567'
   * });
   *
   * // Get orders by client ID
   * const ordersById = await sdk.ordersFBS.getOrdersByClient({
   *   clientId: 'client12345'
   * });
   *
   * console.log(`Found ${ordersByPhone.orders.length} orders for this client`);
   * ordersByPhone.orders.forEach(order => {
   *   console.log(`Order #${order.id} from ${order.createdAt}`);
   * });
   * ```
   */
  async getOrdersByClient(clientData: { phone?: string; clientId?: string }): Promise<OrdersByClientResponse> {
    if (!clientData.phone && !clientData.clientId) {
      throw new ValidationError(
        'Either phone or clientId must be provided',
        { clientData: 'Must contain either phone or clientId' }
      );
    }

    const params: Record<string, string> = {};
    if (clientData.phone) {
      params.phone = clientData.phone;
    }
    if (clientData.clientId) {
      params.clientId = clientData.clientId;
    }

    return this.client.get<OrdersByClientResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/client',
      {
        params,
        rateLimitKey: 'ordersFBS.getOrdersByClient'
      }
    );
  }

  /**
   * Get order status history
   *
   * Returns complete status change history for a specific order.
   * Essential for tracking order progression and troubleshooting delays.
   *
   * **Business Use Case:**
   * - Track complete order lifecycle
   * - Identify delays or issues in order processing
   * - Support customer service with order status history
   * - Analyze order processing performance
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to get status history for
   * @returns Promise with array of status changes with timestamps
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID is invalid (400/422)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get status history for order
   * const history = await sdk.ordersFBS.getOrderStatusHistory(12345);
   *
   * console.log(`Status history for Order #${12345}:`);
   * history.statusChanges.forEach((change, index) => {
   *   console.log(`${index + 1}. ${change.date}: ${change.oldStatus} → ${change.newStatus}`);
   *   if (change.comment) {
   *     console.log(`   Comment: ${change.comment}`);
   *   }
   * });
   * ```
   */
  async getOrderStatusHistory(orderId: number): Promise<OrderStatusHistoryResponse> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    const response = await this.client.get<OrderStatusHistoryResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/orders/status/history`,
      {
        params: { orderId },
        rateLimitKey: 'ordersFBS.getOrderStatusHistory'
      }
    );

    return response;
  }

  /**
   * Get supply TRBX information
   *
   * Returns TRBX (Transport Box) information for a specific supply.
   * TRBX data is used for logistics and warehouse management.
   *
   * **Business Use Case:**
   * - Access transport box information for supply logistics
   * - Track shipment container details
   * - Support warehouse receiving operations
   * - Validate supply packaging information
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param supplyId - Supply ID to get TRBX data for
   * @returns Promise with TRBX information for the supply
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When supply ID is invalid (400/422)
   * @throws {NotFoundError} When supply doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get TRBX data for supply
   * const trbxData = await sdk.ordersFBS.getSupplyTrbx('WB-GI-1234567');
   *
   * console.log(`Supply #${trbxData.supplyId}:`);
   * trbxData.boxes.forEach(box => {
   *   console.log(`Box: ${box.trbxId}`);
   *   console.log(`  Weight: ${box.weight}kg`);
   *   console.log(`  Dimensions: ${box.length}x${box.width}x${box.height}cm`);
   *   console.log(`  Order count: ${box.orderCount}`);
   * });
   * ```
   */
  async getSupplyTrbx(supplyId: string): Promise<SupplyTrbxResponse> {
    if (supplyId.trim() === '') {
      throw new ValidationError(
        'Supply ID is required',
        { supplyId: 'Supply ID cannot be empty' }
      );
    }

    const response = await this.client.get<SupplyTrbxResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`,
      {
        rateLimitKey: 'ordersFBS.getSupplyTrbx'
      }
    );

    return response;
  }

  /**
   * Get supply TRBX stickers
   *
   * Returns TRBX (Transport Box) stickers for a specific supply.
   * These stickers are used for labeling transport boxes in the supply.
   *
   * **Business Use Case:**
   * - Generate transport box labels for shipping
   * - Support warehouse operations with box identification
   * - Track individual boxes within a supply
   * - Comply with shipping and handling requirements
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param supplyId - Supply ID to get TRBX stickers for
   * @returns Promise with TRBX sticker data (base64 encoded)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When supply ID is invalid (400/422)
   * @throws {NotFoundError} When supply doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * import { writeFileSync } from 'fs';
   *
   * // Get TRBX stickers for supply
   * const stickers = await sdk.ordersFBS.getSupplyTrbxStickers('WB-GI-1234567');
   *
   * // Save stickers to files
   * stickers.stickers.forEach((sticker, index) => {
   *   const imageBuffer = Buffer.from(sticker.file, 'base64');
   *   writeFileSync(`trbx-sticker-${index + 1}.png`, imageBuffer);
   *   console.log(`Saved TRBX sticker for box: ${sticker.trbxId}`);
   * });
   * ```
   */
  async getSupplyTrbxStickers(supplyId: string): Promise<SupplyTrbxStickersResponse> {
    if (supplyId.trim() === '') {
      throw new ValidationError(
        'Supply ID is required',
        { supplyId: 'Supply ID cannot be empty' }
      );
    }

    const response = await this.client.get<SupplyTrbxStickersResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx/stickers`,
      {
        rateLimitKey: 'ordersFBS.getSupplyTrbxStickers'
      }
    );

    return response;
  }

  /**
   * Create seller pass for warehouse access
   *
   * Creates a new seller pass for accessing Wildberries warehouses.
   * Required for sellers who need physical access to warehouse facilities.
   *
   * **Business Use Case:**
   * - Create passes for warehouse access
   * - Manage driver and vehicle information
   * - Support warehouse operations and logistics
   * - Ensure authorized personnel have proper access
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param passData - Pass information including driver details and vehicle info
   * @returns Promise with created pass information
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When pass data is invalid (400/422)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Create new seller pass
   * const pass = await sdk.ordersFBS.createPass({
   *   officeId: '12345',
   *   carBrand: 'Toyota',
   *   carModel: 'Camry',
   *   carNumber: 'А123БС777',
   *   firstName: 'Иван',
   *   lastName: 'Иванов',
   *   middleName: 'Иванович',
   *   phone: '+79001234567',
   *   passportSeries: '1234',
   *   passportNumber: '567890',
   *   dateStart: '2024-01-01',
   *   dateEnd: '2024-12-31'
   * });
   *
   * console.log(`Pass created: ${pass.id}`);
   * console.log(`Valid from ${pass.dateStart} to ${pass.dateEnd}`);
   * ```
   */
  async createPass(passData: CreatePassRequest): Promise<CreatePassResponse> {
    // Validate required fields
    const requiredFields = [
      'officeId', 'carBrand', 'carModel', 'carNumber',
      'firstName', 'lastName', 'phone', 'passportSeries',
      'passportNumber', 'dateStart', 'dateEnd'
    ];

    for (const field of requiredFields) {
      if (!passData[field as keyof CreatePassRequest]) {
        throw new ValidationError(
          `Missing required field: ${field}`,
          { [field]: 'This field is required' }
        );
      }
    }

    return this.client.post<CreatePassResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/passes',
      passData,
      {
        rateLimitKey: 'ordersFBS.createPass'
      }
    );
  }

  /**
   * Delete seller pass
   *
   * Deletes an existing seller pass. Used when access is no longer needed
   * or when updating pass information.
   *
   * **Business Use Case:**
   * - Remove expired or unnecessary passes
   * - Clean up pass records
   * - Revoke access for specific personnel
   * - Maintain pass database accuracy
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param passId - Pass ID to delete
   * @returns Promise resolving to success confirmation
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When pass ID is invalid (400/422)
   * @throws {NotFoundError} When pass doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Delete existing pass
   * await sdk.ordersFBS.deletePass('pass12345');
   * console.log('Pass deleted successfully');
   * ```
   */
  async deletePass(passId: string): Promise<void> {
    if (passId.trim() === '') {
      throw new ValidationError(
        'Pass ID is required',
        { passId: 'Pass ID cannot be empty' }
      );
    }

    await this.client.delete<unknown>(
      `https://marketplace-api.wildberries.ru/api/v3/passes/${passId}`,
      {
        rateLimitKey: 'ordersFBS.deletePass'
      }
    );
  }

  /**
   * Get supply order list
   *
   * Returns detailed list of orders included in a specific supply.
   * Essential for supply management and order tracking.
   *
   * **Business Use Case:**
   * - Track all orders within a supply
   * - Validate supply completeness
   * - Support order management within supplies
   * - Monitor supply composition
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param supplyId - Supply ID to get orders for
   * @returns Promise with array of orders in the supply
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When supply ID is invalid (400/422)
   * @throws {NotFoundError} When supply doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   *
   * @example
   * ```typescript
   * // Get orders in supply
   * const supplyOrders = await sdk.ordersFBS.getSupplyOrders('WB-GI-1234567');
   *
   * console.log(`Supply contains ${supplyOrders.orders.length} orders:`);
   * supplyOrders.orders.forEach(order => {
   *   console.log(`Order #${order.id}: ${order.article} (${order.quantity} pcs)`);
   *   console.log(`  Status: ${order.status}`);
   *   console.log(`  Added: ${order.addedAt}`);
   * });
   * ```
   */
  async getSupplyOrders(supplyId: string): Promise<SupplyOrdersResponse> {
    if (supplyId.trim() === '') {
      throw new ValidationError(
        'Supply ID is required',
        { supplyId: 'Supply ID cannot be empty' }
      );
    }

    const response = await this.client.get<SupplyOrdersResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders`,
      {
        rateLimitKey: 'ordersFBS.getSupplyOrders'
      }
    );

    return response;
  }

  // ============================================================================
  // Missing Methods (Epic 7 - API Compliance)
  // ============================================================================

  /**
   * Update seller pass
   *
   * Updates an existing seller pass with new driver or vehicle information.
   * Can also update the assigned warehouse/office.
   *
   * **Business Use Case:**
   * - Update driver information when personnel changes
   * - Update vehicle details when switching vehicles
   * - Change assigned warehouse for a pass
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param passId - Pass ID to update
   * @param data - Updated pass data
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When pass data is invalid (400)
   * @throws {NotFoundError} When pass doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updatePass('12345', {
   *   firstName: 'Иван',
   *   lastName: 'Петров',
   *   carModel: 'Toyota Camry',
   *   carNumber: 'А123БВ777',
   *   officeId: 15
   * });
   * ```
   */
  async updatePass(passId: string, data: UpdatePassRequest): Promise<void> {
    if (!passId || passId.trim() === '') {
      throw new ValidationError(
        'Pass ID is required',
        { passId: 'Pass ID cannot be empty' }
      );
    }

    await this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/passes/${passId}`,
      data,
      { rateLimitKey: 'ordersFBS.updatePass' }
    );
  }

  /**
   * Delete order metadata
   *
   * Removes a specific metadata field from an order.
   * Can delete: imei, uin, gtin, or sgtin.
   *
   * **Business Use Case:**
   * - Remove incorrect tracking codes
   * - Clear metadata before re-entering correct values
   * - Fix data entry errors
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderId - Order ID to delete metadata from
   * @param key - Metadata key to delete (imei, uin, gtin, or sgtin)
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order ID or key is invalid (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * // Delete IMEI from order
   * await sdk.ordersFBS.deleteOrderMetadata(12345, 'imei');
   *
   * // Delete SGTIN from order
   * await sdk.ordersFBS.deleteOrderMetadata(12345, 'sgtin');
   * ```
   */
  async deleteOrderMetadata(orderId: number, key: OrderMetadataKey): Promise<void> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    const validKeys: OrderMetadataKey[] = ['imei', 'uin', 'gtin', 'sgtin'];
    if (!validKeys.includes(key)) {
      throw new ValidationError(
        `Invalid metadata key: ${key}. Must be one of: ${validKeys.join(', ')}`,
        { key: `Must be one of: ${validKeys.join(', ')}` }
      );
    }

    await this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta`,
      {
        params: { key },
        rateLimitKey: 'ordersFBS.deleteOrderMetadata'
      }
    );
  }

  /**
   * Set order SGTIN (marking code)
   *
   * Assigns SGTIN marking codes to an order. Used for Honest Sign tracking.
   * Order must be in 'confirm' status and have sgtin in metadata requirements.
   *
   * **Business Use Case:**
   * - Assign product marking codes for traceability
   * - Comply with Honest Sign requirements
   * - Track individual items in logistics
   *
   * **Rate Limit:** 1000 requests/minute (60ms interval, burst 20)
   *
   * @param orderId - Order ID to set SGTIN for
   * @param data - SGTIN data (array of 1-24 codes, 16-135 chars each)
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When data is invalid (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.setOrderSGTIN(12345, {
   *   sgtins: ['1234567890123456', '6543210987654321']
   * });
   * ```
   */
  async setOrderSGTIN(orderId: number, data: SetOrderSGTINRequest): Promise<void> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    if (data.sgtins.length < 1 || data.sgtins.length > 24) {
      throw new ValidationError(
        'SGTIN array must contain 1-24 items',
        { sgtins: `Array size must be 1-24, received ${data.sgtins.length}` }
      );
    }

    await this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/sgtin`,
      data,
      { rateLimitKey: 'ordersFBS.setOrderSGTIN' }
    );
  }

  /**
   * Set order UIN (Unique Identification Number)
   *
   * Assigns a UIN to an order. Each order can have only one UIN.
   * Order must be in 'confirm' status.
   *
   * **Business Use Case:**
   * - Assign unique identification numbers
   * - Track individual items for warranty/registration
   * - Support inventory management
   *
   * **Rate Limit:** 1000 requests/minute (60ms interval, burst 20)
   *
   * @param orderId - Order ID to set UIN for
   * @param data - UIN data (exactly 16 characters)
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When data is invalid (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.setOrderUIN(12345, {
   *   uin: '1234567890123456'
   * });
   * ```
   */
  async setOrderUIN(orderId: number, data: SetOrderUINRequest): Promise<void> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    if (data.uin.length !== 16) {
      throw new ValidationError(
        'UIN must be exactly 16 characters',
        { uin: `Must be 16 characters, received ${data.uin.length}` }
      );
    }

    await this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/uin`,
      data,
      { rateLimitKey: 'ordersFBS.setOrderUIN' }
    );
  }

  /**
   * Set order IMEI
   *
   * Assigns an IMEI to an order for electronic devices.
   * Each order can have only one IMEI. Order must be in 'confirm' status.
   *
   * **Business Use Case:**
   * - Track mobile devices and electronics
   * - Support warranty registration
   * - Comply with device tracking requirements
   *
   * **Rate Limit:** 1000 requests/minute (60ms interval, burst 20)
   *
   * @param orderId - Order ID to set IMEI for
   * @param data - IMEI data (exactly 15 characters)
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When data is invalid (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.setOrderIMEI(12345, {
   *   imei: '123456789012345'
   * });
   * ```
   */
  async setOrderIMEI(orderId: number, data: SetOrderIMEIRequest): Promise<void> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    if (data.imei.length !== 15) {
      throw new ValidationError(
        'IMEI must be exactly 15 characters',
        { imei: `Must be 15 characters, received ${data.imei.length}` }
      );
    }

    await this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/imei`,
      data,
      { rateLimitKey: 'ordersFBS.setOrderIMEI' }
    );
  }

  /**
   * Set order GTIN
   *
   * Assigns a GTIN to an order. Used for Belarus product identification.
   * Each order can have only one GTIN. Order must be in 'confirm' status.
   *
   * **Business Use Case:**
   * - Track products for Belarus market
   * - Comply with regional identification requirements
   * - Support cross-border logistics
   *
   * **Rate Limit:** 1000 requests/minute (60ms interval, burst 20)
   *
   * @param orderId - Order ID to set GTIN for
   * @param data - GTIN data (exactly 13 characters)
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When data is invalid (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.setOrderGTIN(12345, {
   *   gtin: '1234567890123'
   * });
   * ```
   */
  async setOrderGTIN(orderId: number, data: SetOrderGTINRequest): Promise<void> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    if (data.gtin.length !== 13) {
      throw new ValidationError(
        'GTIN must be exactly 13 characters',
        { gtin: `Must be 13 characters, received ${data.gtin.length}` }
      );
    }

    await this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/gtin`,
      data,
      { rateLimitKey: 'ordersFBS.setOrderGTIN' }
    );
  }

  /**
   * Set order expiration date
   *
   * Assigns an expiration date to an order for perishable products.
   * Cannot be deleted once set, only updated. Order must be in 'confirm' status.
   *
   * **Business Use Case:**
   * - Track expiration for perishable goods
   * - Ensure FIFO inventory management
   * - Comply with food safety regulations
   *
   * **Rate Limit:** 1000 requests/minute (60ms interval, burst 20)
   *
   * @param orderId - Order ID to set expiration for
   * @param data - Expiration data (date in dd.mm.yyyy format, min 30 days from now)
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When data is invalid (400)
   * @throws {NotFoundError} When order doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.setOrderExpiration(12345, {
   *   expiration: '12.09.2030'
   * });
   * ```
   */
  async setOrderExpiration(orderId: number, data: SetOrderExpirationRequest): Promise<void> {
    if (!orderId || orderId <= 0) {
      throw new ValidationError(
        'Order ID must be a positive integer',
        { orderId: `Must be positive integer, received ${orderId}` }
      );
    }

    if (!data.expiration) {
      throw new ValidationError(
        'Expiration date is required',
        { expiration: 'Must provide expiration date in dd.mm.yyyy format' }
      );
    }

    await this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/expiration`,
      data,
      { rateLimitKey: 'ordersFBS.setOrderExpiration' }
    );
  }

  /**
   * Get cross-border stickers (PDF format)
   *
   * Returns shipping label stickers for cross-border orders in PDF format.
   * Max 100 orders per request. Orders must be in 'confirm' status.
   *
   * **Business Use Case:**
   * - Generate shipping labels for international orders
   * - Support cross-border logistics operations
   * - Print labels for customs documentation
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderIds - Array of order IDs (1-100 items)
   * @returns Promise with array of PDF stickers (base64 encoded)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order IDs are invalid (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * const stickers = await sdk.ordersFBS.getCrossBorderStickers([12345, 67890]);
   *
   * stickers.stickers.forEach(sticker => {
   *   const pdfBuffer = Buffer.from(sticker.file, 'base64');
   *   writeFileSync(`sticker-${sticker.orderId}.pdf`, pdfBuffer);
   * });
   * ```
   */
  async getCrossBorderStickers(orderIds: number[]): Promise<CrossBorderStickersResponse> {
    if (orderIds.length < 1 || orderIds.length > 100) {
      throw new ValidationError(
        'Order IDs array must contain 1-100 items',
        { orderIds: `Array size must be 1-100, received ${orderIds.length}` }
      );
    }

    return this.client.post<CrossBorderStickersResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/stickers/cross-border',
      { orders: orderIds },
      { rateLimitKey: 'ordersFBS.getCrossBorderStickers' }
    );
  }

  /**
   * Get external sticker URLs for cross-border orders
   *
   * Returns URLs to download stickers for cross-border orders.
   *
   * @deprecated This method will be disabled on October 23.
   * Use getCrossBorderStickers() instead.
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderIds - Array of order IDs (1-100 items)
   * @returns Promise with array of sticker URLs and tracking numbers
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order IDs are invalid (400)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getExternalStickersUrls([12345]);
   *
   * result.stickers.forEach(sticker => {
   *   console.log(`Order ${sticker.orderID}: ${sticker.url}`);
   *   console.log(`Tracking: ${sticker.parcelID}`);
   * });
   * ```
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  async getExternalStickersUrls(orderIds: number[]): Promise<ExternalStickersUrlsResponse> {
    if (orderIds.length < 1 || orderIds.length > 100) {
      throw new ValidationError(
        'Order IDs array must contain 1-100 items',
        { orderIds: `Array size must be 1-100, received ${orderIds.length}` }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return this.client.post<ExternalStickersUrlsResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/files/orders/external-stickers',
      { orders: orderIds },
      { rateLimitKey: 'ordersFBS.getExternalStickersUrls' }
    );
  }

  /**
   * Get cross-border order status history
   *
   * Returns complete status history for cross-border orders.
   * Max 100 orders per request.
   *
   * **Business Use Case:**
   * - Track cross-border order lifecycle
   * - Monitor customs clearance status
   * - Support international customer service
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderIds - Array of order IDs (1-100 items)
   * @returns Promise with array of orders with status history
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order IDs are invalid (400)
   * @throws {NotFoundError} When orders don't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * const history = await sdk.ordersFBS.getOrdersStatusHistoryCrossBorder([12345]);
   *
   * history.orders.forEach(order => {
   *   console.log(`Order ${order.orderID}:`);
   *   console.log(`Delivery date: ${order.deliveryDate}`);
   *   order.statuses.forEach(status => {
   *     console.log(`  ${status.date}: ${status.code}`);
   *   });
   * });
   * ```
   */
  async getOrdersStatusHistoryCrossBorder(orderIds: number[]): Promise<CrossBorderStatusHistoryResponse> {
    if (orderIds.length < 1 || orderIds.length > 100) {
      throw new ValidationError(
        'Order IDs array must contain 1-100 items',
        { orderIds: `Array size must be 1-100, received ${orderIds.length}` }
      );
    }

    return this.client.post<CrossBorderStatusHistoryResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/status/history',
      { orders: orderIds },
      { rateLimitKey: 'ordersFBS.getOrdersStatusHistoryCrossBorder' }
    );
  }

  /**
   * Get orders with client info (Turkey cross-border only)
   *
   * Returns order information including customer details.
   * Only available for Turkey cross-border orders.
   *
   * **Business Use Case:**
   * - Access customer information for Turkey deliveries
   * - Support Turkey cross-border logistics
   * - Process international shipments
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param orderIds - Array of order IDs (1-100 items)
   * @returns Promise with array of orders with client info
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When order IDs are invalid (400)
   * @throws {NotFoundError} When orders don't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * const orders = await sdk.ordersFBS.getOrdersWithClientInfo([12345]);
   *
   * orders.orders.forEach(order => {
   *   console.log(`Order ${order.orderID}:`);
   *   console.log(`Client: ${order.clientName}`);
   *   console.log(`Phone: ${order.phone}`);
   *   console.log(`Address: ${order.address.fullAddress}`);
   * });
   * ```
   */
  async getOrdersWithClientInfo(orderIds: number[]): Promise<CrossBorderTurkeyClientInfoResponse> {
    if (orderIds.length < 1 || orderIds.length > 100) {
      throw new ValidationError(
        'Order IDs array must contain 1-100 items',
        { orderIds: `Array size must be 1-100, received ${orderIds.length}` }
      );
    }

    return this.client.post<CrossBorderTurkeyClientInfoResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/client',
      { orders: orderIds },
      { rateLimitKey: 'ordersFBS.getOrdersWithClientInfo' }
    );
  }

  /**
   * Add transport boxes to supply
   *
   * Adds specified number of transport boxes (TRBX) to a supply.
   * Only for supplies being shipped to pickup points (PVZ).
   * Supply must be open (not delivered).
   *
   * **Business Use Case:**
   * - Create transport boxes for supply packaging
   * - Organize orders into shipping containers
   * - Prepare supplies for pickup point delivery
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param supplyId - Supply ID to add boxes to
   * @param amount - Number of boxes to add (1-1000)
   * @returns Promise with array of created box IDs
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When supply ID or amount is invalid (400)
   * @throws {NotFoundError} When supply doesn't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.addSupplyTrbx('WB-GI-1234567', 4);
   *
   * console.log(`Created ${result.trbxIds.length} boxes:`);
   * result.trbxIds.forEach(id => console.log(`  ${id}`));
   * // Output: WB-TRBX-1234567, WB-TRBX-1234568, ...
   * ```
   */
  async addSupplyTrbx(supplyId: string, amount: number): Promise<AddSupplyTrbxResponse> {
    if (!supplyId || supplyId.trim() === '') {
      throw new ValidationError(
        'Supply ID is required',
        { supplyId: 'Supply ID cannot be empty' }
      );
    }

    if (!amount || amount < 1 || amount > 1000) {
      throw new ValidationError(
        'Amount must be between 1 and 1000',
        { amount: `Must be 1-1000, received ${amount}` }
      );
    }

    return this.client.post<AddSupplyTrbxResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`,
      { amount },
      { rateLimitKey: 'ordersFBS.addSupplyTrbx' }
    );
  }

  /**
   * Delete transport boxes from supply
   *
   * Removes specified transport boxes from a supply.
   * Supply must still be on assembly (not delivered).
   *
   * **Business Use Case:**
   * - Remove excess or incorrect boxes
   * - Adjust supply packaging before delivery
   * - Clean up empty or cancelled boxes
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param supplyId - Supply ID to remove boxes from
   * @param trbxIds - Array of box IDs to delete
   * @returns Promise<void> - 204 on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When supply ID or box IDs are invalid (400)
   * @throws {NotFoundError} When supply or boxes don't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.deleteSupplyTrbx('WB-GI-1234567', [
   *   'WB-TRBX-1234567',
   *   'WB-TRBX-1234568'
   * ]);
   * console.log('Boxes deleted successfully');
   * ```
   */
  async deleteSupplyTrbx(supplyId: string, trbxIds: string[]): Promise<void> {
    if (!supplyId || supplyId.trim() === '') {
      throw new ValidationError(
        'Supply ID is required',
        { supplyId: 'Supply ID cannot be empty' }
      );
    }

    if (trbxIds.length === 0) {
      throw new ValidationError(
        'At least one box ID is required',
        { trbxIds: 'Array cannot be empty' }
      );
    }

    await this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`,
      {
        data: { trbxIds },
        rateLimitKey: 'ordersFBS.deleteSupplyTrbx'
      }
    );
  }

  /**
   * Get transport box stickers (POST version)
   *
   * Returns QR stickers for specified transport boxes.
   * Sticker size: 580x400 px.
   *
   * **Business Use Case:**
   * - Generate QR labels for specific boxes
   * - Print box identification stickers
   * - Support warehouse scanning operations
   *
   * **Rate Limit:** 300 requests/minute (200ms interval, burst 20)
   *
   * @param supplyId - Supply ID containing the boxes
   * @param type - Sticker format (svg, png, zplv, zplh)
   * @param trbxIds - Array of box IDs to get stickers for
   * @returns Promise with array of box stickers (base64 encoded)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {ValidationError} When parameters are invalid (400)
   * @throws {NotFoundError} When supply or boxes don't exist (404)
   * @throws {RateLimitError} When rate limit exceeded (429)
   *
   * @example
   * ```typescript
   * const stickers = await sdk.ordersFBS.getSupplyTrbxStickersPost(
   *   'WB-GI-1234567',
   *   'png',
   *   ['WB-TRBX-1234567', 'WB-TRBX-1234568']
   * );
   *
   * stickers.stickers.forEach(sticker => {
   *   const imageBuffer = Buffer.from(sticker.file, 'base64');
   *   writeFileSync(`box-${sticker.trbxId}.png`, imageBuffer);
   * });
   * ```
   */
  async getSupplyTrbxStickersPost(
    supplyId: string,
    type: BarcodeType,
    trbxIds: string[]
  ): Promise<SupplyTrbxStickersResponse> {
    if (!supplyId || supplyId.trim() === '') {
      throw new ValidationError(
        'Supply ID is required',
        { supplyId: 'Supply ID cannot be empty' }
      );
    }

    if (trbxIds.length === 0) {
      throw new ValidationError(
        'At least one box ID is required',
        { trbxIds: 'Array cannot be empty' }
      );
    }

    const validTypes: BarcodeType[] = ['svg', 'png', 'zplv', 'zplh'];
    if (!validTypes.includes(type)) {
      throw new ValidationError(
        `Invalid sticker type: ${type}. Must be one of: ${validTypes.join(', ')}`,
        { type: `Must be one of: ${validTypes.join(', ')}` }
      );
    }

    return this.client.post<SupplyTrbxStickersResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx/stickers`,
      { trbxIds },
      {
        params: { type },
        rateLimitKey: 'ordersFBS.getSupplyTrbxStickersPost'
      }
    );
  }
}
