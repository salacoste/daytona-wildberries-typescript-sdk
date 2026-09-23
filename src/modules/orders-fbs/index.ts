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
  ArchiveOrdersParams,
  ArchiveOrdersResponse,
  SpotCountriesResponse,
  SupplySpotRequest,
  SuppliesSpotListRequest,
  SuppliesSpotListResponse,
  SupplySpotStickerResponse,
  ShippingPointsParams,
  ShippingPointsResponse,
  UpdateSuppliesShippingMethodRequest,
  UpdateSuppliesResponse,
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
   * **`requiredMeta` field:** each order lists the label identifiers (metadata) that MUST be
   * attached before its supply can be transferred to delivery — e.g. `['uin', 'sgtin']`,
   * `['customsDeclaration']`. Check it before attaching a customs-declaration (ДТ) number:
   * if `customsDeclaration` is present, the order needs a ДТ (via {@link setCustomsDeclaration},
   * `confirm` status only) or stickers will fail with 409 `CustomsDeclarationIsRequired`.
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
   * **3-month window:** From 2026-07-21, returns only assembly orders created LESS than
   * 3 months ago. For older orders, use `getOrdersArchive()` (`GET /api/marketplace/v3/fbs/orders/archive`).
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
   * **⚠️ 409 `CustomsDeclarationIsRequired` (since 2026-08-18).** If at least one assembly
   * order in `data.orders` lacks a required customs-declaration (ДТ) number, WB returns
   * HTTP 409 and **stickers cannot be obtained** for the batch. Attach the missing ДТ via
   * {@link setCustomsDeclaration} (order must be in `confirm` status) and retry.
   * Check `requiredMeta` in {@link getOrdersNew} to see whether an order requires a ДТ.
   * Thrown as a typed `CustomsDeclarationIsRequiredError`.
   *
   * @param options - Sticker format and size options
   * @param data - Request body containing order IDs
   * @returns Promise resolving to stickers response
   * @throws {CustomsDeclarationIsRequiredError} 409 — at least one order lacks a required customs declaration (ДТ); stickers cannot be obtained until it is attached
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
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/delete}
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
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put}
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
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put}
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
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put}
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
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put}
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
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put}
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
   * by verifying `customsDeclaration` is in the `requiredMeta` field of new orders
   * ({@link getOrdersNew}) and in the label identifiers returned by {@link getOrdersMetaBulk}.
   *
   * **⚠️ `confirm` status only (since 2026-08-18).** A customs-declaration (ДТ) number can
   * be attached **only to assembly orders in `confirm` status**.
   *
   * **⚠️ Armenia sellers.** A ДТ **must** be specified for items produced **outside the EAEU**
   * when an order from Armenia is delivered to the Russian Federation.
   *
   * @param orderId - ID of the assembly task
   * @param data - Request body containing the customs declaration number
   * @returns Promise resolving to void on success
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1customs-declaration/put}
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
   * List FBO supplies (alias for `supplies()`)
   *
   * Thin alias kept for naming consistency with `getSupply()`, so the
   * `getSupply` / `getSupplies` pair reads naturally and is easier to discover.
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
   * const result = await sdk.ordersFBS.getSupplies({ limit: 100, next: 0 });
   * console.log(result.supplies);
   * ```
   */
  async getSupplies(options?: GetSuppliesParams): Promise<SuppliesResponse> {
    return this.supplies(options);
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
   * **⚠️ Deadline 2026-06-03 — B2C marking codes (Честный Знак).** WB will validate B2C
   * marking codes server-side from this date. Codes must be passed in full with GS
   * separators (ASCII 0x1D) and crypto-tail (код проверки подлинности). Invalid codes
   * → HTTP 409 with diagnostic `metaDetails[]` (typed as `MetaValidationFailError`).
   *
   * **Important: Metadata validation.** Returns 409 if order metadata is invalid:
   * - IMEI validation (enforced since March 31, 2026)
   * - UIN validation (enforced since April 7, 2026)
   * - Marking code for B2B orders (enforced since April 9, 2026)
   * - Marking code for B2C orders via Честный Знак (enforced from June 3, 2026)
   * - Missing customs declaration (ДТ) — 409 `MetaValidationFail` with a `customsDeclaration`
   *   entry whose `decision` is `'required'` (since 2026-08-18). Attach it via
   *   `setCustomsDeclaration()` (order must be in `confirm` status), then retry.
   *
   * Check `metaDetails` via `getOrdersMetaBulk()` before calling deliver.
   * Each metaDetail has `key`, `value`, and `decision` (filled/optional/required/invalid).
   *
   * **Rate limit penalty**: each 409 response counts as 10 requests against the
   * FBS supply/order rate-limit budget. Use pre-flight validation to avoid burning budget.
   *
   * @param supplyId - ID of the supply to deliver
   * @returns Promise resolving to void on success
   * @throws {MetaValidationFailError} 409 — Metadata validation failed (thrown as MetaValidationFailError exposes
   *   `metaDetails[]` with per-code diagnostics), including `decision: 'required'` on the
   *   `customsDeclaration` key when a required ДТ is missing. Falls back to {@link WBAPIError} for 409s
   *   without `metaDetails` (e.g. supply has zero orders).
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/Postavki-FBS}
   * @see [FBS marking guide](https://dev.wildberries.ru/knowledge-base/articles/019e9273-118b-7b69-a25a-ea1d756f05d9/rabota-s-markirovkoi-po-modeli-fbs)
   * @see [Migration guide](../../../docs/guides/fbs-marking-code-validation.md)
   *
   * @example
   * ```typescript
   * import { WildberriesSDK, MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';
   *
   * // Pattern A: pre-flight via getOrdersMetaBulk (cheap, no 10x penalty)
   * const meta = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [12345] }); // example order ID
   * const invalid = meta.orders?.[0]?.metaDetails?.filter(d => d.decision === 'required' || d.decision === 'invalid');
   * if (invalid?.length) {
   *   console.log('Fix metadata first:', invalid.map(d => d.key));
   * } else {
   *   await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
   * }
   * ```
   *
   * @example
   * ```typescript
   * import { WildberriesSDK, MetaValidationFailError } from 'daytona-wildberries-typescript-sdk';
   *
   * // Pattern B: typed catch
   * try {
   *   await sdk.ordersFBS.updateSuppliesDeliver('WB-GI-1234');
   * } catch (err) {
   *   if (err instanceof MetaValidationFailError) {
   *     err.metaDetails.forEach(d => console.log(d.key, d.value, d.decision));
   *   }
   *   throw err;
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
   * Replacement for the deprecated createOrdersStatus method with a corrected name.
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
   * **`decision` field semantics:** each `metaDetails[]` entry carries a `decision` —
   * `'filled'` and `'optional'` mean the order is **OK to deliver**; `'required'` (value
   * missing) **blocks delivery** (409 on `updateSuppliesDeliver`); `'invalid'` means the
   * submitted value failed validation. For the `customsDeclaration` key, `'required'`
   * means a ДТ must be attached via {@link setCustomsDeclaration} before deliver/stickers.
   *
   * @param data - Request body containing order IDs (max 100)
   * @returns Promise resolving to metadata for the requested orders
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/fbsLabelIdentifiers/paths/~1api~1marketplace~1v3~1orders~1meta/post}
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

  /**
   * Get archived FBS assembly orders
   *
   * Returns a paginated list of archived FBS assembly orders for a given year/month period.
   * Use the `next` cursor from the response to fetch subsequent pages; pagination is exhausted
   * when `next` is `null`.
   *
   * @param params - Query parameters (year, month, next cursor, limit)
   * @returns Promise resolving to archived orders with the next pagination cursor
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://openapi.wildberries.ru/#tag/Zakazy-FBS/paths/~1api~1marketplace~1v3~1fbs~1orders~1archive/get}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getOrdersArchive({
   *   year: 2025,
   *   month: 6,
   *   next: 0,
   *   limit: 100,
   * });
   * console.log(result.orders);
   * // Fetch the next page using the returned cursor:
   * if (result.next !== null) {
   *   const next = await sdk.ordersFBS.getOrdersArchive({
   *     year: 2025, month: 6, next: result.next, limit: 100,
   *   });
   * }
   * ```
   */
  async getOrdersArchive(params: ArchiveOrdersParams): Promise<ArchiveOrdersResponse> {
    return this.client.get<ArchiveOrdersResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/orders/archive',
      { params, rateLimitKey: 'orders-fbs.ordersArchive' }
    );
  }

  // ============================================================================
  // SPOT (EAEU road-import declarations)
  // ============================================================================

  /**
   * Get the OKSM country list
   *
   * Returns the list of OKSM (All-Russian Classifier of World Countries) countries
   * with their full names and 3-digit codes. Use these codes as `carrierCountryCode`
   * when adding SPOT data via `updateSupplySpot()`.
   *
   * **Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
   * WB plans to extend it to all EAEU countries except the Russian Federation.
   *
   * **Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
   * response counts as 10 requests.
   *
   * @returns Promise resolving to the OKSM countries list
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsDictionariesCountriesOksm}
   *
   * @example
   * ```typescript
   * const { countries } = await sdk.ordersFBS.getSpotCountries();
   * const byName = countries.find(c => c.name === 'Киргизия');
   * ```
   */
  async getSpotCountries(): Promise<SpotCountriesResponse> {
    return this.client.get<SpotCountriesResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/dictionaries/countries/oksm',
      { rateLimitKey: 'orders-fbs.getSpotCountries' }
    );
  }

  /**
   * Add SPOT data to a supply
   *
   * Adds SPOT (EAEU road-import declaration) data to a supply. SPOT can only be added
   * to a supply carrying the `"spotAvailable": true` flag — check it via `getSupply()`
   * or `supplies()` first.
   *
   * `carrierCountryCode` must be a 3-digit OKSM code from `getSpotCountries()`.
   *
   * **Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
   * WB plans to extend it to all EAEU countries except the Russian Federation.
   *
   * **Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
   * response (including the 409 below) counts as 10 requests.
   *
   * @param supplyId - ID of the supply
   * @param data - SPOT data (carrier and vehicle details)
   * @returns Promise resolving to void on success (204)
   * @throws {WBAPIError} 409 — error while adding SPOT data (e.g. `SpotActionNotAllowed` when SPOT is not available for this supply)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/putV3FbsSuppliesSupplyIdSpot}
   *
   * @example
   * ```typescript
   * await sdk.ordersFBS.updateSupplySpot('WB-GI-123456789', {
   *   carrierName: 'ООО СПОТ',
   *   carrierTaxNumber: '7588179007',
   *   carrierCountryCode: '112',
   *   vehicleRegistrationNumber: 'А123АА100',
   *   trailerRegistrationNumber: 'АА000100',
   * });
   * ```
   */
  async updateSupplySpot(supplyId: string, data: SupplySpotRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/supplies/${supplyId}/spot`,
      data,
      { rateLimitKey: 'orders-fbs.putSupplySpot' }
    );
  }

  /**
   * Get SPOT data for a list of supplies
   *
   * Returns SPOT data for up to 100 supplies per request. SPOT data is returned only
   * when **all** of the following conditions are met:
   * - the supply is in the delivery stage
   * - the seller is registered in any EAEU country other than the Russian Federation
   * - the destination warehouse is located in the Russian Federation
   *
   * **Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
   * WB plans to extend it to all EAEU countries except the Russian Federation.
   *
   * Each entry carries either `spot` (echo of the submitted SPOT data plus the DOPP
   * formation `status`) or `error` (e.g. `NotFound`, `SpotActionNotAllowed`).
   *
   * **Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
   * response counts as 10 requests.
   *
   * @param data - Request body containing supply IDs (1-100)
   * @returns Promise resolving to SPOT data per requested supply
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/postV3FbsSuppliesSpotList}
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.getSuppliesSpotList({
   *   supplyIds: ['WB-GI-123456789'],
   * });
   * const readyForQr = result.supplies.filter(s => s.spot?.status === 'completed');
   * ```
   */
  async getSuppliesSpotList(data: SuppliesSpotListRequest): Promise<SuppliesSpotListResponse> {
    return this.client.post<SuppliesSpotListResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/supplies/spot/list',
      data,
      { rateLimitKey: 'orders-fbs.postSuppliesSpotList' }
    );
  }

  /**
   * Get the supply SPOT QR code
   *
   * Returns the generated SPOT QR code for the supply in PNG format, base64 encoded.
   * Available only when `getSuppliesSpotList()` reports `"status": "completed"` for
   * the supply (DOPP formed successfully).
   *
   * **Availability**: SPOT currently works for sellers registered in Kyrgyzstan only;
   * WB plans to extend it to all EAEU countries except the Russian Federation.
   *
   * **Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
   * response counts as 10 requests.
   *
   * @param supplyId - ID of the supply
   * @returns Promise resolving to the base64-encoded PNG QR code
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsSuppliesSupplyIdStickersSpot}
   *
   * @example
   * ```typescript
   * const { qrCode } = await sdk.ordersFBS.getSupplySpotStickers('WB-GI-123456789');
   * fs.writeFileSync('spot-qr.png', Buffer.from(qrCode, 'base64'));
   * ```
   */
  async getSupplySpotStickers(supplyId: string): Promise<SupplySpotStickerResponse> {
    return this.client.get<SupplySpotStickerResponse>(
      `https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/supplies/${supplyId}/stickers/spot`,
      { rateLimitKey: 'orders-fbs.getSupplySpotStickers' }
    );
  }

  // ============================================================================
  // SHIPPING (supply shipping parameters)
  // ============================================================================

  /**
   * Get supply shipping points
   *
   * Returns the supply shipping points available to the seller, filtered by
   * Russian locality (`city`, Cyrillic) and by the type of items the point can
   * accept (`cargoType`: 1 — small-sized, 2 — ODC, 3 — CD+). Each point reports
   * whether the **Fulfillment in SC** service is available (`fulfillment`).
   *
   * Use the returned `id` values as `shippingPointId` when setting the supply
   * shipping method via `updateShippingMethod()`.
   *
   * **Availability**: for sellers registered in the Russian Federation only,
   * since 2026-09-01.
   *
   * **Important**: from **2026-10-01** supply shipping parameters are mandatory —
   * `updateSuppliesDeliver()` (PATCH `/api/v3/supplies/{supplyId}/deliver`)
   * returns a **409** error for supplies delivered without them. For
   * `"shippingType":"transportCompany"` deliveries an electronic waybill ID
   * (ETrN) is required as well — see the waybill note in `updateShippingMethod()`.
   *
   * **Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
   * response counts as 10 requests.
   *
   * @param params - Filters: locality (Cyrillic) and cargo type
   * @returns Promise resolving to the available shipping points
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/getV3FbsShippingPoints}
   * @since task-198
   *
   * @example
   * ```typescript
   * const { shippingPoints } = await sdk.ordersFBS.getShippingPoints({
   *   city: 'Москва',
   *   cargoType: 1,
   * });
   * const withFulfillment = shippingPoints.filter(p => p.fulfillment);
   * ```
   */
  async getShippingPoints(params: ShippingPointsParams): Promise<ShippingPointsResponse> {
    return this.client.get<ShippingPointsResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/shipping-points',
      { params, rateLimitKey: 'orders-fbs.getShippingPoints' }
    );
  }

  /**
   * Set the supply shipping method
   *
   * Sets the shipping type, shipping date and shipping point for up to 100
   * supplies per request; the processing result is returned for each supply
   * separately (`results[]` with `success` or `error`, e.g. `NotFound`,
   * `InvalidShippingDt`, `FulfillmentRequired`).
   *
   * Get `shippingPointId` from `getShippingPoints()`. The shipping method can be
   * updated only until the supply and its boxes are scanned at the shipping
   * point — after that this method returns a 409 error.
   *
   * For `"shippingType":"transportCompany"` the electronic waybill ID (ETrN)
   * must be attached to the supply as well. **Note**: the waybill method
   * (`PATCH /api/marketplace/v3/fbs/supplies/waybill`) exists in the WB spec but
   * is still in development — it is intentionally NOT implemented in this SDK
   * yet. The waybill ID added to a supply is reset when the shipping type
   * changes from `transportCompany` to `selfShipping`; changing it back to
   * `transportCompany` requires re-adding the waybill ID.
   *
   * **Availability**: for sellers registered in the Russian Federation only,
   * since 2026-09-01.
   *
   * **Important**: from **2026-10-01** supply shipping parameters are mandatory —
   * `updateSuppliesDeliver()` (PATCH `/api/v3/supplies/{supplyId}/deliver`)
   * returns a **409** error for supplies delivered without them (and without an
   * ETrN id for transport-company deliveries).
   *
   * **Rate limit**: 300 req/min, 200 ms interval, burst 20. One request with a 4XX
   * response (including the 409s below) counts as 10 requests.
   *
   * @param data - Shipping parameters per supply (1-100 items)
   * @returns Promise resolving to the per-supply processing results
   * @throws {WBAPIError} 409 — supply already scanned at the shipping point, or the waybill UUID is already used (`WaybillUUIDConflict`)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesShippingMethod}
   * @since task-198
   *
   * @example
   * ```typescript
   * const result = await sdk.ordersFBS.updateShippingMethod({
   *   data: [
   *     {
   *       supplyId: 'WB-GI-100',
   *       shippingDt: '2026-09-05',
   *       shippingPointId: 100,
   *       shippingType: 'selfShipping',
   *     },
   *   ],
   * });
   * const failed = result.results.filter(r => !r.success);
   * ```
   */
  async updateShippingMethod(
    data: UpdateSuppliesShippingMethodRequest
  ): Promise<UpdateSuppliesResponse> {
    return this.client.patch<UpdateSuppliesResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/fbs/supplies/shipping-method',
      data,
      { rateLimitKey: 'orders-fbs.patchSuppliesShippingMethod' }
    );
  }
}
