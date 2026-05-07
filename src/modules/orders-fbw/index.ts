/**
 * Orders FBW Module
 *
 * Manages Fulfillment by Wildberries (FBW) supply operations including
 * acceptance coefficients, warehouse info, transit tariffs, and supply management.
 *
 * Generated from: wildberries_api_doc/07-orders-fbw.yaml
 *
 * @module modules/orders-fbw
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors/validation-error';
import type {
  BulkStatusChangeResponse,
  DBWCheckMetaValidationRequest,
  DBWCheckMetaValidationResponse,
  DBWDeleteMetaBulkRequest,
  DBWDeleteMetaBulkResponse,
  DBWSetMetaBulkResponse,
  DBWSetSgtinBulkRequest,
  GetDBWClientInfoResponse,
  ModelsBox,
  ModelsGood,
  ModelsGoodInSupply,
  ModelsOptionsResultModel,
  ModelsSuppliesFiltersRequest,
  ModelsSupply,
  ModelsSupplyDetails,
  ModelsTransitTariff,
  ModelsWarehousesResultItems,
} from '../../types/orders-fbw.types';

export class OrdersFbwModule {
  constructor(private client: BaseClient) {}

  /**
   * Опции приёмки
   *
   * Метод возвращает информацию о том, какие склады и типы упаковки доступны для поставки. Список складов определяется по баркоду и количеству товара. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.ordersFBW.createAcceptanceOption([{ barcode: '1234567891234', quantity: 10 }]);
  console.log(result);
   */
  async createAcceptanceOption(
    data: ModelsGood[],
    options?: { warehouseID?: string }
  ): Promise<ModelsOptionsResultModel> {
    return this.client.post<ModelsOptionsResultModel>(
      'https://supplies-api.wildberries.ru/api/v1/acceptance/options',
      data,
      { params: options, rateLimitKey: 'orders-fbw.postAcceptanceOptions' }
    );
  }

  /**
   * Список складов
   *
   * Метод возвращает список складов WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 6 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.ordersFBW.warehouses();
  console.log(result);
   */
  async warehouses(): Promise<ModelsWarehousesResultItems[]> {
    return this.client.get<ModelsWarehousesResultItems[]>(
      'https://supplies-api.wildberries.ru/api/v1/warehouses',
      { rateLimitKey: 'orders-fbw.warehouses' }
    );
  }

  /**
   * Транзитные направления
   *
   * Метод возвращает информацию о доступных транзитных направлениях. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 6 запросов | 10 секунд | 10 запросов | </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.ordersFBW.transitTariffs();
  console.log(result);
   */
  async transitTariffs(): Promise<ModelsTransitTariff[]> {
    return this.client.get<ModelsTransitTariff[]>(
      'https://supplies-api.wildberries.ru/api/v1/transit-tariffs',
      { rateLimitKey: 'orders-fbw.transitTariffs' }
    );
  }

  /**
   * Список поставок
   *
   * Метод возвращает список поставок, по умолчанию — последние 1000 поставок. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param data - Request body data
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.ordersFBW.listSupplies({});
  console.log(result);
   */
  async listSupplies(
    data: ModelsSuppliesFiltersRequest,
    options?: { limit?: number; offset?: number }
  ): Promise<ModelsSupply[]> {
    return this.client.post<ModelsSupply[]>(
      'https://supplies-api.wildberries.ru/api/v1/supplies',
      data,
      { params: options, rateLimitKey: 'orders-fbw.postSupplies' }
    );
  }

  /**
   * Детали поставки
   *
   * Метод возвращает детали поставки по ID. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param ID - ID поставки или заказа
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.ordersFBW.getSupply(12345);
  console.log(result);
   */
  async getSupply(ID: number, options?: { isPreorderID?: boolean }): Promise<ModelsSupplyDetails> {
    return this.client.get<ModelsSupplyDetails>(
      `https://supplies-api.wildberries.ru/api/v1/supplies/${ID}`,
      { params: options, rateLimitKey: 'orders-fbw.supplies' }
    );
  }

  /**
   * Товары поставки
   *
   * Метод возвращает информацию о товарах в поставке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param ID - ID поставки или заказа
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.ordersFBW.getSuppliesGood(12345);
  console.log(result);
   */
  async getSuppliesGood(
    ID: number,
    options?: { limit?: number; offset?: number; isPreorderID?: boolean }
  ): Promise<ModelsGoodInSupply[]> {
    return this.client.get<ModelsGoodInSupply[]>(
      `https://supplies-api.wildberries.ru/api/v1/supplies/${ID}/goods`,
      { params: options, rateLimitKey: 'orders-fbw.suppliesGoods' }
    );
  }

  /**
   * Упаковка поставки
   *
   * Метод возвращает информацию об упаковке поставки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 10 запросов | </div>
   *
   * @param ID - ID поставки
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.ordersFBW.getSuppliesPackage(12345);
  console.log(result);
   */
  async getSuppliesPackage(ID: number): Promise<ModelsBox[]> {
    return this.client.get<ModelsBox[]>(
      `https://supplies-api.wildberries.ru/api/v1/supplies/${ID}/package`,
      { rateLimitKey: 'orders-fbw.suppliesPackage' }
    );
  }

  /**
   * Получение информации о покупателе для заказов DBW
   *
   * Возвращает данные покупателя (имя, телефон, код) по ID заказов модели DBW.
   *
   * **Важно:** Этот метод использует домен `marketplace-api.wildberries.ru`,
   * а не `supplies-api.wildberries.ru` как остальные методы FBW.
   *
   * Rate limit: 300 requests per minute, 200ms interval, burst 20.
   * Один запрос с кодом 409 считается за 10 запросов.
   *
   * @param orderIds - Array of assembly order IDs (no documented max limit)
   * @returns Buyer information for each order
   * @throws {ValidationError} When orderIds array is empty
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.4.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/orders-dbw#tag/Sborochnye-zadaniya-DBW}
   * @example
   * ```typescript
   * const result = await sdk.ordersFBW.getClientInfo([987654321, 123456789]);
   * for (const order of result.orders ?? []) {
   *   console.log(`Order ${order.orderID}: ${order.firstName}, phone: +${order.phoneCode}${order.phone}`);
   * }
   * ```
   */
  async getClientInfo(orderIds: number[]): Promise<GetDBWClientInfoResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    return this.client.post<GetDBWClientInfoResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/dbw/orders/client',
      { orders: orderIds },
      { rateLimitKey: 'orders-fbw.getClientInfo' }
    );
  }

  /**
   * Удалить маркировочные метаданные у нескольких заказов DBW (массовая операция).
   *
   * Bulk-delete marking metadata (IMEI/UIN/GTIN/SGTIN/customsDeclaration) from up to
   * N DBW orders in a single request. Mirrors the DBS `deleteMetaBulk` method.
   *
   * Rate limit: 150 requests/min, 400ms interval, burst 20.
   * (Default mirrors DBS sibling — WB has not yet published explicit DBW limits.
   * Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)
   *
   * @param request - Orders array and metadata key to delete
   * @returns Per-order deletion results
   * @throws {ValidationError} When orders array is empty
   * @throws {ValidationError} When request body is malformed
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.11.0
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbw}
   * @example
   * ```typescript
   * const result = await sdk.ordersFBW.deleteMetaBulk({ orders: [123456], key: 'imei' });
   * for (const order of result.orders) {
   *   console.log(`Order ${order.orderId}: ${order.success ? 'deleted' : order.error}`);
   * }
   * ```
   */
  async deleteMetaBulk(request: DBWDeleteMetaBulkRequest): Promise<DBWDeleteMetaBulkResponse> {
    if (request.orders.length === 0) {
      throw new ValidationError('orders array cannot be empty');
    }
    // Alt path observed in announcement: /api/v3/public/dbw/orders/meta/delete — flip if WB swagger says so
    return this.client.post<DBWDeleteMetaBulkResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/dbw/orders/meta/delete',
      request,
      { rateLimitKey: 'orders-fbw.deleteMetaBulkDBW' }
    );
  }

  /**
   * Задать SGTIN-коды для нескольких заказов DBW (массовая операция).
   *
   * Bulk-assign SGTIN (Serial Global Trade Item Number) codes to up to N DBW orders
   * in a single request. Mirrors the DBS `setSgtinBulk` method.
   *
   * Rate limit: 500 requests/min, 120ms interval, burst 20.
   * (Default mirrors DBS sibling — WB has not yet published explicit DBW limits.
   * Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)
   *
   * @param request - Per-order SGTIN assignments
   * @returns Per-order set results; `errors[]` present when some orders fail
   * @throws {ValidationError} When orders array is empty
   * @throws {ValidationError} When request body is malformed
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.11.0
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbw}
   * @example
   * ```typescript
   * const result = await sdk.ordersFBW.setSgtinBulk({
   *   orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }],
   * });
   * if (result.errors?.length) {
   *   console.log('Some orders failed:', result.errors);
   * }
   * ```
   */
  async setSgtinBulk(request: DBWSetSgtinBulkRequest): Promise<DBWSetMetaBulkResponse> {
    if (request.orders.length === 0) {
      throw new ValidationError('orders array cannot be empty');
    }
    // Alt path observed in announcement: /api/v3/public/dbw/orders/meta/sgtin — flip if WB swagger says so
    return this.client.post<DBWSetMetaBulkResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/dbw/orders/meta/sgtin',
      request,
      { rateLimitKey: 'orders-fbw.setSgtinBulkDBW' }
    );
  }

  /**
   * Передать несколько заказов DBW в доставку (массовая операция).
   *
   * Mark up to 1000 DBW orders as "delivered" (handed to carrier) in a single request.
   * Mirrors the DBS `deliverBulk` method. WB disables the legacy single-order DBW
   * deliver endpoint on 2026-06-05 — use this method instead.
   *
   * **Important:** Orders requiring IMEI/SGTIN must have metadata attached before calling
   * this method. If metadata is missing, WB returns 409 `MetaValidationFail`.
   *
   * Rate limit: 300 requests/min, 200ms interval, burst 20.
   * (Default mirrors DBS sibling — WB has not yet published explicit DBW limits.
   * Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)
   *
   * @param orderIds - Array of order IDs to mark as delivered (1–1000 items)
   * @returns Per-order delivery status results. When WB returns application-level 409
   *   MetaValidationFail, it surfaces in `result.results[].errors[]` with `code === 409`
   *   and `detail === 'MetaValidationFail'`; check `result.results[].errors[].metaDetails[]`
   *   per-order before retrying. (since 3.11.0 — WB API 2026-05-06)
   * @throws {ValidationError} When orderIds is empty or exceeds 1000 items
   * @throws {WBAPIError} 409 — ImeiIsNotFilled: mandatory IMEI not attached to order
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.11.0
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbw}
   * @example
   * ```typescript
   * // Mark multiple DBW orders as handed to carrier
   * const result = await sdk.ordersFBW.deliverBulk([123456, 234567, 345678]);
   *
   * for (const order of result.results ?? []) {
   *   if (order.isError) {
   *     console.log(`Order ${order.orderId} failed:`, order.errors);
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
    // Alt path observed in announcement: /api/v3/public/dbw/orders/status/deliver — flip if WB swagger says so
    return this.client.post<BulkStatusChangeResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/dbw/orders/status/deliver',
      { orders: orderIds },
      { rateLimitKey: 'orders-fbw.deliverBulkDBW' }
    );
  }

  /**
   * Проверить метаданные маркировки DBW-заказов перед передачей в доставку (предварительная валидация).
   *
   * Pre-flight metadata validator for DBW orders. Returns the same `metaDetails[]` shape
   * that WB returns inside the 409 `MetaValidationFail` body of `deliverBulk()`, but as a
   * 200 OK response — without consuming a deliver-bulk quota attempt.
   *
   * **This method does NOT change order state.** It is a read-only pre-flight check.
   * Use it before `deliverBulk()` to identify orders with invalid marking metadata
   * (SGTIN/IMEI/UIN/etc.) so they can be fixed in advance, avoiding the guess-and-retry
   * loop of: call `deliverBulk()` → catch 409 → read `metaDetails[]` → fix → retry.
   *
   * Rate limit: 300 requests/min, 200ms interval, burst 20.
   * (Default mirrors `deliverBulk` DBW — WB has not yet published explicit limits.
   * Will be updated via task-15.5 once WB publishes 07-orders-fbw.yaml.)
   *
   * @param request - Request containing array of DBW order IDs to validate (1–1000 items)
   * @returns Per-order metadata validation results in `metaDetails[]`
   * @throws {ValidationError} When `orders` array is empty
   * @throws {ValidationError} When `orders` array exceeds 1000 items
   * @throws {ValidationError} When request body is malformed (4xx propagation)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.11.0
   * @see {@link https://dev.wildberries.ru/openapi/orders-dbw}
   * @example
   * ```typescript
   * // Pre-flight pattern: validate → fix → deliver
   * const validation = await sdk.ordersFBW.checkMetaValidation({
   *   orders: [123456, 234567, 345678],
   * });
   *
   * const invalidOrders = validation.metaDetails.filter(d => d.status === 'invalid');
   * if (invalidOrders.length > 0) {
   *   console.log('Orders with invalid metadata:', invalidOrders);
   *   // Fix metadata for invalid orders first (narrow orderId: number | undefined → number):
   *   const fixable = invalidOrders.filter(
   *     (o): o is typeof o & { orderId: number } => o.orderId !== undefined
   *   );
   *   await sdk.ordersFBW.setSgtinBulk({
   *     orders: fixable.map(o => ({ orderId: o.orderId, sgtins: ['correct-sgtin'] })),
   *   });
   * }
   *
   * // Now safe to deliver — no 409 MetaValidationFail expected
   * const result = await sdk.ordersFBW.deliverBulk([123456, 234567, 345678]);
   * ```
   */
  async checkMetaValidation(
    request: DBWCheckMetaValidationRequest
  ): Promise<DBWCheckMetaValidationResponse> {
    if (request.orders.length === 0) {
      throw new ValidationError('orders array cannot be empty');
    }
    if (request.orders.length > 1000) {
      throw new ValidationError('orders array cannot exceed 1000 items');
    }
    return this.client.post<DBWCheckMetaValidationResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/dbw/orders/meta/details',
      { orders: request.orders },
      { rateLimitKey: 'orders-fbw.checkMetaValidationDBW' }
    );
  }
}
