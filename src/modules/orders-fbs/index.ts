/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/03-orders-fbs.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  PassOffice,
  Pass,
  PassCreateRequest,
  PassCreateResponse,
  OrdersNewResponse,
  OrdersResponse,
  GetOrdersParams,
  OrderStatusResponse,
  Supply,
  SuppliesResponse,
  GetSuppliesParams,
  SupplyCreateRequest,
  SupplyCreateResponse,
  TrbxListResponse,
  TrbxCreateRequest,
  TrbxCreateResponse,
  TrbxDeleteRequest,
  TrbxStickers,
  TrbxStickerRequest,
  DeleteMetaParams,
  MetaSgtinRequest,
  MetaUinRequest,
  MetaImeiRequest,
  MetaGtinRequest,
  MetaExpirationRequest,
  MetaCustomsDeclarationRequest,
  StickerParams,
  StickerRequest,
  StickerResponse,
  CrossBorderStickerRequest,
  CrossBorderStickerResponse,
  StatusHistoryRequest,
  StatusHistoryResponse,
  OrdersRequestAPI,
  CrossborderTurkeyClientInfoResp,
  GetMetaMultiRequest,
  OrdersMetaResponse,
  AddOrdersToSupplyRequest,
  SupplyOrderIdsResponse,
  ReshipmentResponse,
  BarcodeParams,
  BarcodeResponse,
} from '../../types/orders-fbs.types';

export class OrdersFbsModule {
  constructor(private client: BaseClient) {}

  /**
   * Get list of warehouses that require a pass
   *
   * Returns a list of warehouses for binding to a seller pass. The data returned by this method may change.
   * It is recommended to periodically synchronize the list.
   *
   * @returns Promise resolving to an array of pass offices
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1offices/get}
   *
   * @example
   * ```typescript
   * const offices = await sdk.ordersFBS.getPassesOffices();
   * console.log(offices);
   * ```
   */
  async getPassesOffices(): Promise<PassOffice[]> {
    return this.client.get<PassOffice[]>(
      'https://marketplace-api.wildberries.ru/api/v3/passes/offices',
      { rateLimitKey: 'orders-fbs.passesOffices' }
    );
  }

  /**
   * Get list of seller passes
   *
   * Returns a list of all created seller passes.
   *
   * @returns Promise resolving to an array of passes
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes/get}
   *
   * @example
   * ```typescript
   * const passes = await sdk.ordersFBS.passes();
   * console.log(passes);
   * ```
   */
  async passes(): Promise<Pass[]> {
    return this.client.get<Pass[]>('https://marketplace-api.wildberries.ru/api/v3/passes', {
      rateLimitKey: 'orders-fbs.passes',
    });
  }

  /**
   * Create a seller pass
   *
   * Creates a seller pass bound to a WB warehouse. The pass is valid for 48 hours from creation.
   *
   * @param data - Pass data (full name length must be 6-100 characters, car number allows only letters and digits)
   * @returns Promise resolving to the created pass ID
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createPass({
   *   firstName: 'Ivan',
   *   lastName: 'Petrov',
   *   carModel: 'GAZelle',
   *   carNumber: 'A123BC77',
   *   officeId: 1,
   * });
   * console.log(result.id);
   * ```
   */
  async createPass(data: PassCreateRequest): Promise<PassCreateResponse> {
    return this.client.post<PassCreateResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/passes',
      data,
      { rateLimitKey: 'orders-fbs.postPasses' }
    );
  }

  /**
   * Update a seller pass
   *
   * Updates seller pass data, including the bound WB warehouse.
   *
   * @param passId - ID of the pass to update
   * @param data - Updated pass data (full name length must be 6-100 characters, car number allows only letters and digits)
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1%7BpassId%7D/put}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updatePass(12345, {
   *   firstName: 'Ivan',
   *   lastName: 'Petrov',
   *   carModel: 'GAZelle',
   *   carNumber: 'A123BC77',
   *   officeId: 2,
   * });
   * ```
   */
  async updatePass(passId: number, data: PassCreateRequest): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/passes/${passId}`, data, {
      rateLimitKey: 'orders-fbs.putPasses',
    });
  }

  /**
   * Delete a seller pass
   *
   * Removes a seller pass from the list.
   *
   * @param passId - ID of the pass to delete
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Propuska-FBS/paths/~1api~1v3~1passes~1%7BpassId%7D/delete}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.deletePass(12345);
   * ```
   */
  async deletePass(passId: number): Promise<void> {
    return this.client.delete(`https://marketplace-api.wildberries.ru/api/v3/passes/${passId}`, {
      rateLimitKey: 'orders-fbs.deletePasses',
    });
  }

  /**
   * Get list of new assembly tasks
   *
   * Returns a list of all new assembly tasks available for the seller at the time of request.
   *
   * @returns Promise resolving to new orders response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1new/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getOrdersNew();
   * console.log(result.orders);
   * ```
   */
  async getOrdersNew(): Promise<OrdersNewResponse> {
    return this.client.get<OrdersNewResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/new',
      { rateLimitKey: 'orders-fbs.ordersNew' }
    );
  }

  /**
   * Get assembly tasks information
   *
   * Returns assembly task information without their current status.
   * Data can be retrieved for a given period, up to 30 calendar days per request.
   *
   * @param options - Query parameters for pagination and date filtering
   * @returns Promise resolving to orders with pagination cursor
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.orders({ limit: 100, next: 0 });
   * console.log(result.orders);
   * ```
   */
  async orders(options?: GetOrdersParams): Promise<OrdersResponse> {
    return this.client.get<OrdersResponse>('https://marketplace-api.wildberries.ru/api/v3/orders', {
      params: options,
      rateLimitKey: 'orders-fbs.orders',
    });
  }

  /**
   * Get all assembly tasks requiring reshipment
   *
   * Returns all assembly tasks that require reshipment. Reshipment is needed when a supply was scanned
   * at the reception point but still has unscanned items. These tasks can be moved to another active supply.
   *
   * @returns Promise resolving to reshipment orders response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1supplies~1orders~1reshipment/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getOrdersReshipment();
   * console.log(result);
   * ```
   */
  async getOrdersReshipment(): Promise<ReshipmentResponse> {
    return this.client.get<ReshipmentResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/supplies/orders/reshipment',
      { rateLimitKey: 'orders-fbs.suppliesOrdersReshipment' }
    );
  }

  /**
   * Cancel an assembly task
   *
   * Cancels an assembly task and sets its status to `cancel` (cancelled by seller).
   *
   * @param orderId - ID of the assembly task to cancel
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1cancel/patch}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updateOrdersCancel(123456);
   * ```
   */
  async updateOrdersCancel(orderId: number): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/cancel`,
      undefined,
      { rateLimitKey: 'orders-fbs.patchOrdersCancel' }
    );
  }

  /**
   * Get assembly task stickers
   *
   * Returns stickers for assembly tasks in SVG, ZPLV, ZPLH, or PNG format.
   * Maximum 100 stickers per request. Only available for tasks with status `confirm`.
   *
   * @param options - Sticker format and size options
   * @param data - Request body containing order IDs
   * @returns Promise resolving to stickers response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1stickers/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createOrdersSticker(
   *   { type: 'png', width: 58, height: 40 },
   *   { orders: [123, 456] },
   * );
   * console.log(result.stickers);
   * ```
   */
  async createOrdersSticker(
    options?: StickerParams,
    data?: StickerRequest
  ): Promise<StickerResponse> {
    return this.client.post<StickerResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/stickers',
      data,
      { params: options, rateLimitKey: 'orders-fbs.postOrdersStickers' }
    );
  }

  /**
   * Delete assembly task metadata
   *
   * Deletes a metadata value for the given key. Only one key can be passed per request.
   * Supported keys: imei, uin, gtin, sgtin.
   *
   * @param orderId - ID of the assembly task
   * @param options - Query parameters specifying which metadata key to delete
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/delete}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.deleteOrdersMeta(123456, { key: 'imei' });
   * ```
   */
  async deleteOrdersMeta(orderId: number, options?: DeleteMetaParams): Promise<void> {
    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta`,
      { params: options, rateLimitKey: 'orders-fbs.deleteOrdersMeta' }
    );
  }

  /**
   * Attach marking codes (SGTIN) to an assembly task
   *
   * Attaches product marking codes to an assembly task. Only available when the task metadata
   * includes the `sgtin` field and the task is in `confirm` status.
   *
   * @param orderId - ID of the assembly task
   * @param data - Request body containing SGTIN marking codes
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updateMetaSgtin(123456, { sgtins: ['01046009544741002'] });
   * ```
   */
  async updateMetaSgtin(orderId: number, data?: MetaSgtinRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/sgtin`,
      data,
      { rateLimitKey: 'orders-fbs.putOrdersMetaSgtin' }
    );
  }

  /**
   * Attach UIN to an assembly task
   *
   * Updates the unique identification number (UIN) in the assembly task metadata.
   * Each task can have only one UIN. Only available for orders delivered by WB in `confirm` status.
   *
   * @param orderId - ID of the assembly task
   * @param data - Request body containing the UIN value
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updateMetaUin(123456, { uin: 'UIN123456789' });
   * ```
   */
  async updateMetaUin(orderId: number, data?: MetaUinRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/uin`,
      data,
      { rateLimitKey: 'orders-fbs.putOrdersMetaUin' }
    );
  }

  /**
   * Attach IMEI to an assembly task
   *
   * Updates the IMEI in the assembly task metadata. Each task can have only one IMEI.
   * If a device has two IMEIs, only provide the primary one. Only available for orders in `confirm` status.
   *
   * @param orderId - ID of the assembly task
   * @param data - Request body containing the IMEI value
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updateMetaImei(123456, { imei: '354567890123456' });
   * ```
   */
  async updateMetaImei(orderId: number, data?: MetaImeiRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/imei`,
      data,
      { rateLimitKey: 'orders-fbs.putOrdersMetaImei' }
    );
  }

  /**
   * Attach GTIN to an assembly task
   *
   * Updates the GTIN (unique product ID for Belarus) in the assembly task metadata.
   * Each task can have only one GTIN. Only available for orders delivered by WB in `confirm` status.
   *
   * @param orderId - ID of the assembly task
   * @param data - Request body containing the GTIN value
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updateMetaGtin(123456, { gtin: '4600000000001' });
   * ```
   */
  async updateMetaGtin(orderId: number, data?: MetaGtinRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/gtin`,
      data,
      { rateLimitKey: 'orders-fbs.putOrdersMetaGtin' }
    );
  }

  /**
   * Attach expiration date to an assembly task
   *
   * Sets the product expiration date for an assembly task. Only available for orders delivered
   * by WB in `confirm` status. To change the date, send a new request. Expiration cannot be removed once set.
   *
   * @param orderId - ID of the assembly task
   * @param data - Request body containing the expiration date
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updateMetaExpiration(123456, { expiration: '2025-12-31' });
   * ```
   */
  async updateMetaExpiration(orderId: number, data?: MetaExpirationRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/expiration`,
      data,
      { rateLimitKey: 'orders-fbs.putOrdersMetaExpiration' }
    );
  }

  /**
   * Attach customs declaration number to an assembly task
   *
   * Updates the customs declaration number in the assembly task metadata.
   * Each task can have only one customs declaration number. Check if the task supports it
   * by verifying `customsDeclaration` is in the `requiredMeta` field of new orders.
   *
   * @param orderId - ID of the assembly task
   * @param data - Request body containing the customs declaration number
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1customs-declaration/put}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.setCustomsDeclaration(123456, {
   *   customsDeclaration: '10129050/010120/0001234',
   * });
   * ```
   */
  async setCustomsDeclaration(orderId: number, data: MetaCustomsDeclarationRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/marketplace/v3/orders/${orderId}/meta/customs-declaration`,
      data,
      { rateLimitKey: 'orders-fbs.putOrdersMetaCustomsDeclaration' }
    );
  }

  /**
   * Get cross-border assembly task stickers
   *
   * Returns stickers for cross-border assembly tasks in PDF format.
   * Maximum 100 stickers per request. Only available for tasks with status `confirm`.
   *
   * @param data - Request body containing order IDs
   * @returns Promise resolving to cross-border stickers response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1stickers~1cross-border/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createStickersCrossBorder({ orders: [123, 456] });
   * console.log(result.stickers);
   * ```
   */
  async createStickersCrossBorder(
    data?: CrossBorderStickerRequest
  ): Promise<CrossBorderStickerResponse> {
    return this.client.post<CrossBorderStickerResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/stickers/cross-border',
      data,
      { rateLimitKey: 'orders-fbs.postOrdersStickersCrossBorder' }
    );
  }

  /**
   * Get cross-border assembly task status history
   *
   * Returns the status history for cross-border assembly tasks.
   *
   * @param data - Request body containing order IDs
   * @returns Promise resolving to status history response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status~1history/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createStatusHistory({ orders: [123, 456] });
   * console.log(result.orders);
   * ```
   */
  async createStatusHistory(data?: StatusHistoryRequest): Promise<StatusHistoryResponse> {
    return this.client.post<StatusHistoryResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/status/history',
      data,
      { rateLimitKey: 'orders-fbs.postOrdersStatusHistory' }
    );
  }

  /**
   * Get orders with client information (Turkey cross-border)
   *
   * Returns buyer information by assembly task ID. Only available for cross-border orders from Turkey.
   *
   * @param data - Request body containing order IDs
   * @returns Promise resolving to client info response
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1client/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createOrdersClient({ orders: [123456] });
   * console.log(result);
   * ```
   */
  async createOrdersClient(data: OrdersRequestAPI): Promise<CrossborderTurkeyClientInfoResp> {
    return this.client.post<CrossborderTurkeyClientInfoResp>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/client',
      data,
      { rateLimitKey: 'orders-fbs.postOrdersClient' }
    );
  }

  /**
   * Get list of supplies
   *
   * Returns a paginated list of supplies.
   *
   * @param options - Query parameters for pagination
   * @returns Promise resolving to supplies list with pagination cursor
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.supplies({ limit: 100, next: 0 });
   * console.log(result.supplies);
   * ```
   */
  async supplies(options?: GetSuppliesParams): Promise<SuppliesResponse> {
    return this.client.get<SuppliesResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/supplies',
      { params: options, rateLimitKey: 'orders-fbs.supplies' }
    );
  }

  /**
   * Create a new supply
   *
   * Creates a new supply for FBS assembly tasks. A new supply acquires the cargo type
   * of the first order added to it. Only orders of the same cargo type can be in one supply.
   *
   * @param data - Request body containing the supply name
   * @returns Promise resolving to the created supply ID
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createSupply({ name: 'Supply 2025-01' });
   * console.log(result.id);
   * ```
   */
  async createSupply(data: SupplyCreateRequest): Promise<SupplyCreateResponse> {
    return this.client.post<SupplyCreateResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/supplies',
      data,
      { rateLimitKey: 'orders-fbs.postSupplies' }
    );
  }

  /**
   * Get supply information
   *
   * Returns detailed information about a supply.
   *
   * @param supplyId - ID of the supply
   * @returns Promise resolving to supply details
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get}
   *
   * @example
   * ```typescript
   * const supply = await sdk.ordersFBS.getSupply('WB-GI-1234');
   * console.log(supply);
   * ```
   */
  async getSupply(supplyId: string): Promise<Supply> {
    return this.client.get<Supply>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}`,
      { rateLimitKey: 'orders-fbs.getSupply' }
    );
  }

  /**
   * Delete a supply
   *
   * Deletes a supply if it is active and has no assembly tasks assigned.
   *
   * @param supplyId - ID of the supply to delete
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/delete}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.deleteSupply('WB-GI-1234');
   * ```
   */
  async deleteSupply(supplyId: string): Promise<void> {
    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}`,
      {
        rateLimitKey: 'orders-fbs.deleteSupplies',
      }
    );
  }

  /**
   * Transfer supply to delivery
   *
   * Closes a supply and sets all assembly tasks in it to `complete` status.
   * After closing, no new tasks can be added. The supply must have at least one task.
   *
   * **Important: Metadata validation.** Returns 409 if order metadata is invalid:
   * - IMEI validation (enforced since March 31, 2026)
   * - UIN validation (enforced since April 7, 2026)
   * - Marking code for B2B orders (enforced since April 9, 2026)
   *
   * Check `metaDetails` via `getOrdersMetaBulk()` before calling deliver.
   * Each metaDetail has `key`, `value`, and `decision` (filled/optional/required/invalid).
   *
   * @param supplyId - ID of the supply to deliver
   * @returns Promise resolving to void on success
   * @throws {WBAPIError} 409 — Metadata validation failed. Response contains details of invalid metadata.
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/Postavki-FBS}
   *
   * @example
   * ```typescript
   * // Check metadata before deliver
   * const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [orderId] });
   * const invalid = meta.orders?.[0]?.metaDetails?.filter(d => d.decision === 'required' && !d.value);
   * if (invalid?.length) {
   *   console.log('Fix metadata first:', invalid.map(d => d.key));
   * } else {
   *   await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
   * }
   * ```
   */
  async updateSuppliesDeliver(supplyId: string): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/deliver`,
      undefined,
      { rateLimitKey: 'orders-fbs.patchSuppliesDeliver' }
    );
  }

  /**
   * Get supply QR code
   *
   * Returns the supply QR code in SVG, ZPLV, ZPLH, or PNG format (580x400 px).
   * Only available after the supply has been transferred to delivery.
   *
   * @param supplyId - ID of the supply
   * @param options - Sticker format options
   * @returns Promise resolving to barcode and file data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1barcode/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getSuppliesBarcode('WB-GI-1234', { type: 'png' });
   * console.log(result.barcode);
   * ```
   */
  async getSuppliesBarcode(supplyId: string, options?: BarcodeParams): Promise<BarcodeResponse> {
    return this.client.get<BarcodeResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/barcode`,
      { params: options, rateLimitKey: 'orders-fbs.suppliesBarcode' }
    );
  }

  /**
   * Get list of supply boxes (trbx)
   *
   * Returns the list of boxes for a supply.
   *
   * @param supplyId - ID of the supply
   * @returns Promise resolving to boxes list
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getSuppliesTrbx('WB-GI-1234');
   * console.log(result.trbxes);
   * ```
   */
  async getSuppliesTrbx(supplyId: string): Promise<TrbxListResponse> {
    return this.client.get<TrbxListResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`,
      { rateLimitKey: 'orders-fbs.suppliesTrbx' }
    );
  }

  /**
   * Add boxes to a supply
   *
   * Adds the required number of boxes to a supply. Only for supplies shipped to pickup points (PVZ).
   * Can only be added to an open supply.
   *
   * @param supplyId - ID of the supply
   * @param data - Request body containing the number of boxes to add
   * @returns Promise resolving to created box IDs
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createSuppliesTrbx('WB-GI-1234', { amount: 5 });
   * console.log(result.trbxIds);
   * ```
   */
  async createSuppliesTrbx(
    supplyId: string,
    data?: TrbxCreateRequest
  ): Promise<TrbxCreateResponse> {
    return this.client.post<TrbxCreateResponse>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`,
      data,
      { rateLimitKey: 'orders-fbs.postSuppliesTrbx' }
    );
  }

  /**
   * Delete boxes from a supply
   *
   * Removes boxes from a supply. Can only delete while the supply is being assembled.
   *
   * @param supplyId - ID of the supply
   * @param data - Request body containing box IDs to delete
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/delete}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.deleteSuppliesTrbx('WB-GI-1234', { trbxIds: ['trbx-1', 'trbx-2'] });
   * ```
   */
  async deleteSuppliesTrbx(supplyId: string, data?: TrbxDeleteRequest): Promise<void> {
    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`,
      data,
      { rateLimitKey: 'orders-fbs.deleteSuppliesTrbx' }
    );
  }

  /**
   * Get supply box stickers
   *
   * Returns QR stickers for boxes in SVG, ZPLV, ZPLH, or PNG format (580x400 px).
   *
   * @param supplyId - ID of the supply
   * @param options - Sticker format options
   * @param data - Request body containing box IDs
   * @returns Promise resolving to box stickers
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx~1stickers/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.createTrbxSticker(
   *   'WB-GI-1234',
   *   { type: 'png' },
   *   { trbxIds: ['trbx-1', 'trbx-2'] },
   * );
   * console.log(result.stickers);
   * ```
   */
  async createTrbxSticker(
    supplyId: string,
    options?: BarcodeParams,
    data?: TrbxStickerRequest
  ): Promise<{ stickers?: TrbxStickers[] }> {
    return this.client.post<{ stickers?: TrbxStickers[] }>(
      `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx/stickers`,
      data,
      { params: options, rateLimitKey: 'orders-fbs.postSuppliesTrbxStickers' }
    );
  }

  // ============================================================================
  // New bulk/replacement methods
  // ============================================================================

  /**
   * Get assembly task statuses
   *
   * Returns statuses of assembly tasks by their IDs.
   * Replacement for {@link createOrdersStatu} with a corrected method name.
   *
   * @param data - Request body containing order IDs
   * @returns Promise resolving to order statuses
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getOrderStatuses({ orders: [123, 456] });
   * console.log(result);
   * ```
   */
  async getOrderStatuses(data: { orders: number[] }): Promise<OrderStatusResponse> {
    return this.client.post<OrderStatusResponse>(
      'https://marketplace-api.wildberries.ru/api/v3/orders/status',
      data,
      { rateLimitKey: 'orders-fbs.postOrdersStatus' }
    );
  }

  /**
   * Get metadata for multiple assembly tasks
   *
   * Returns metadata for multiple assembly tasks (up to 100).
   *
   * @param data - Request body containing order IDs (max 100)
   * @returns Promise resolving to metadata for the requested orders
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Metadannye-FBS/paths/~1api~1marketplace~1v3~1orders~1meta/post}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [123, 456] });
   * console.log(result);
   * ```
   */
  async getOrdersMetaBulk(data: GetMetaMultiRequest): Promise<OrdersMetaResponse> {
    return this.client.post<OrdersMetaResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/orders/meta',
      data,
      { rateLimitKey: 'orders-fbs.postMarketplaceOrdersMeta' }
    );
  }

  /**
   * Add multiple assembly tasks to a supply (bulk)
   *
   * Adds multiple assembly tasks to a supply in a single request.
   *
   * @param supplyId - ID of the supply
   * @param data - Request body containing order IDs to add
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1marketplace~1v3~1supplies~1%7BsupplyId%7D~1orders/patch}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.addOrdersToSupply('WB-GI-1234', { orders: [123, 456] });
   * ```
   */
  async addOrdersToSupply(supplyId: string, data: AddOrdersToSupplyRequest): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/marketplace/v3/supplies/${supplyId}/orders`,
      data,
      { rateLimitKey: 'orders-fbs.patchMarketplaceSuppliesOrders' }
    );
  }

  /**
   * Get assembly task IDs in a supply
   *
   * Returns a list of assembly task IDs assigned to a supply.
   *
   * @param supplyId - ID of the supply
   * @returns Promise resolving to order IDs in the supply
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Postavki-FBS/paths/~1api~1marketplace~1v3~1supplies~1%7BsupplyId%7D~1order-ids/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getSupplyOrderIds('WB-GI-1234');
   * console.log(result);
   * ```
   */
  async getSupplyOrderIds(supplyId: string): Promise<SupplyOrderIdsResponse> {
    return this.client.get<SupplyOrderIdsResponse>(
      `https://marketplace-api.wildberries.ru/api/marketplace/v3/supplies/${supplyId}/order-ids`,
      { rateLimitKey: 'orders-fbs.getMarketplaceSuppliesOrderIds' }
    );
  }
}
