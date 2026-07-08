/**
 * In-Store Pickup Module
 * Generated from: wildberries_api_doc/06-in-store-pickup.yaml
 *
 * Provides methods for managing click-and-collect (self-pickup) orders,
 * including assembly task lifecycle, customer verification, and metadata management.
 *
 * @module modules/in-store-pickup
 */

import { BaseClient } from '../../client/base-client';
import { ValidationError } from '../../errors';
import { warnOnce } from '../../utils/deprecation';
import type {
  ApiCheckIdentityRequest,
  ApiCheckedIdentity,
  ApiGTINRequest,
  ApiIMEIRequest,
  ApiNewOrders,
  ApiOrderClientInfoResp,
  ApiOrderStatus,
  ApiOrderStatuses,
  ApiOrders,
  ApiOrdersMeta,
  ApiOrdersRequest,
  ApiSGTINsRequest,
  ApiUINRequest,
  BulkStatusChangeResponse,
  CheckMetaValidationResponse,
  CustomsDeclarationSetResponse,
  DeleteMetaBulkRequest,
  DeleteMetaBulkResponse,
  GetMetaBulkRequest,
  GetOrderMetaBulkResponse,
  GetStatusInfoResponse,
  PickupMetadataKey,
  SetCustomsDeclarationBulkRequest,
  SetGtinBulkRequest,
  SetImeiBulkRequest,
  SetMetaBulkResponse,
  SetSgtinBulkRequest,
  SetUinBulkRequest,
} from '../../types/in-store-pickup.types';

/** Base URL for marketplace click-collect (batch) API endpoints. */
const BASE_URL = 'https://marketplace-api.wildberries.ru';

export class InStorePickupModule {
  constructor(private client: BaseClient) {}

  /**
   * Получить список новых сборочных заданий
   *
   * Метод возвращает список всех новых сборочных заданий, которые есть у продавца на момент запроса.
   *
   * @returns Список новых сборочных заданий
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.inStorePickup.getOrdersNew();
   * console.log(result);
   */
  async getOrdersNew(): Promise<ApiNewOrders> {
    return this.client.get<ApiNewOrders>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/new',
      { rateLimitKey: 'in-store-pickup.clickCollectOrdersNew' }
    );
  }

  /**
   * Перевести на сборку (batch)
   *
   * Moves up to 1000 assembly orders to `confirm` status in a single request.
   * Replaces the dead single-order PATCH `.../orders/{id}/confirm` path.
   *
   * @param orderIds - Array of assembly order IDs (1-1000 items)
   * @returns Per-order confirmation results
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.confirmBulk([123456, 234567]);
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
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/status/confirm`,
      { ordersIds: orderIds },
      { rateLimitKey: 'in-store-pickup.confirmBulk' }
    );
  }

  /**
   * Перевести на сборку (single order)
   *
   * @deprecated WB shut down `PATCH /api/v3/click-collect/orders/{orderId}/confirm`.
   *   This shim delegates to {@link InStorePickupModule.confirmBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @example
   * await sdk.inStorePickup.updateOrdersConfirm(12345); // -> confirmBulk([12345])
   */
  async updateOrdersConfirm(orderId: number): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateOrdersConfirm',
      '[DEPRECATED] updateOrdersConfirm() targets a removed single-order endpoint. ' +
        'Use confirmBulk() for one or more orders instead.'
    );
    await this.confirmBulk([orderId]);
  }

  /**
   * Сообщить, что сборочное задание готово к выдаче (batch)
   *
   * Moves up to 1000 assembly orders to `prepare` status (ready for pickup).
   * Replaces the dead single-order PATCH `.../orders/{id}/prepare` path.
   *
   * @param orderIds - Array of assembly order IDs (1-1000 items)
   * @returns Per-order results
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000
   * @throws {MetaValidationFailError} When B2B marking validation fails (409 — Chestny ZNAK; use checkMetaValidation for pre-flight)
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.prepareBulk([123456, 234567]);
   * ```
   */
  async prepareBulk(orderIds: number[]): Promise<BulkStatusChangeResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/status/prepare`,
      { ordersIds: orderIds },
      { rateLimitKey: 'in-store-pickup.prepareBulk' }
    );
  }

  /**
   * Сообщить, что сборочное задание готово к выдаче (single order)
   *
   * @deprecated WB shut down `PATCH /api/v3/click-collect/orders/{orderId}/prepare`.
   *   This shim delegates to {@link InStorePickupModule.prepareBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @example
   * await sdk.inStorePickup.updateOrdersPrepare(12345); // -> prepareBulk([12345])
   */
  async updateOrdersPrepare(orderId: number): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateOrdersPrepare',
      '[DEPRECATED] updateOrdersPrepare() targets a removed single-order endpoint. ' +
        'Use prepareBulk() for one or more orders instead.'
    );
    await this.prepareBulk([orderId]);
  }

  /**
   * Информация о покупателе
   *
   * Метод возвращает информацию о покупателе по ID сборочного задания.
   * Доступно только для сборочных заданий в статусах confirm и prepare.
   *
   * @param data - Request body data
   * @returns Информация о покупателе
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.inStorePickup.createOrdersClient({ orders: [12345] });
   * console.log(result);
   */
  async createOrdersClient(data: ApiOrdersRequest): Promise<ApiOrderClientInfoResp> {
    return this.client.post<ApiOrderClientInfoResp>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client',
      data,
      { rateLimitKey: 'in-store-pickup.postClickCollectOrdersClient' }
    );
  }

  /**
   * Проверить, что заказ принадлежит покупателю
   *
   * Метод сообщает, принадлежит ли проверяемый заказ покупателю или нет по переданному коду.
   * Доступно, если хотя бы одно сборочное задание из заказа находится в статусе prepare.
   *
   * @param data - Request body data
   * @returns Результат проверки идентификации
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.inStorePickup.createClientIdentity({ orderCode: '170046918-0011', passcode: '4567' });
   * console.log(result);
   */
  async createClientIdentity(data: ApiCheckIdentityRequest): Promise<ApiCheckedIdentity> {
    return this.client.post<ApiCheckedIdentity>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client/identity',
      data,
      { rateLimitKey: 'in-store-pickup.postClickCollectOrdersClientIdentity' }
    );
  }

  /**
   * Сообщить, что заказ принят покупателем (batch)
   *
   * Moves up to 1000 assembly orders to `receive` status (received by buyer).
   * Replaces the dead single-order PATCH `.../orders/{id}/receive` path.
   *
   * NOTE: pickup `receive` takes NO passcodes (unlike DBS) — just order IDs.
   *
   * @param orderIds - Array of assembly order IDs (1-1000 items)
   * @returns Per-order results
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.receiveBulk([123456, 234567]);
   * ```
   */
  async receiveBulk(orderIds: number[]): Promise<BulkStatusChangeResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/status/receive`,
      { ordersIds: orderIds },
      { rateLimitKey: 'in-store-pickup.receiveBulk' }
    );
  }

  /**
   * Сообщить, что заказ принят покупателем (single order)
   *
   * @deprecated WB shut down `PATCH /api/v3/click-collect/orders/{orderId}/receive`.
   *   This shim delegates to {@link InStorePickupModule.receiveBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @example
   * await sdk.inStorePickup.updateOrdersReceive(12345); // -> receiveBulk([12345])
   */
  async updateOrdersReceive(orderId: number): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateOrdersReceive',
      '[DEPRECATED] updateOrdersReceive() targets a removed single-order endpoint. ' +
        'Use receiveBulk() for one or more orders instead.'
    );
    await this.receiveBulk([orderId]);
  }

  /**
   * Сообщить, что покупатель отказался от заказа (batch)
   *
   * Moves up to 1000 assembly orders to `reject` status (buyer refused).
   * Replaces the dead single-order PATCH `.../orders/{id}/reject` path.
   *
   * NOTE: pickup `reject` takes NO passcodes (unlike DBS) — just order IDs.
   *
   * @param orderIds - Array of assembly order IDs (1-1000 items)
   * @returns Per-order results
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.rejectBulk([123456, 234567]);
   * ```
   */
  async rejectBulk(orderIds: number[]): Promise<BulkStatusChangeResponse> {
    if (orderIds.length === 0) {
      throw new ValidationError('orderIds array cannot be empty');
    }
    if (orderIds.length > 1000) {
      throw new ValidationError('orderIds array cannot exceed 1000 items');
    }
    return this.client.post<BulkStatusChangeResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/status/reject`,
      { ordersIds: orderIds },
      { rateLimitKey: 'in-store-pickup.rejectBulk' }
    );
  }

  /**
   * Сообщить, что покупатель отказался от заказа (single order)
   *
   * @deprecated WB shut down `PATCH /api/v3/click-collect/orders/{orderId}/reject`.
   *   This shim delegates to {@link InStorePickupModule.rejectBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @example
   * await sdk.inStorePickup.updateOrdersReject(12345); // -> rejectBulk([12345])
   */
  async updateOrdersReject(orderId: number): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateOrdersReject',
      '[DEPRECATED] updateOrdersReject() targets a removed single-order endpoint. ' +
        'Use rejectBulk() for one or more orders instead.'
    );
    await this.rejectBulk([orderId]);
  }

  /**
   * Получить статусы сборочных заданий (batch)
   *
   * Returns statuses for up to 1000 assembly orders in a single request.
   * Replaces the dead single-batch POST `.../orders/status` path.
   *
   * @param orderIds - Array of assembly order IDs (1-1000 items)
   * @returns Status information for each order
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.getStatusesBulk([123456, 234567]);
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
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/status/info`,
      { ordersIds: orderIds },
      { rateLimitKey: 'in-store-pickup.getStatusesBulk' }
    );
  }

  /**
   * Получить статусы сборочных заданий (legacy)
   *
   * @deprecated WB shut down `POST /api/v3/click-collect/orders/status`. This
   *   shim delegates to {@link InStorePickupModule.getStatusesBulk} and maps the
   *   batch response back to the legacy `{orders:[{id,supplierStatus,wbStatus}]}` shape.
   * @param data - Request body data (`{ orders: number[] }`)
   * @returns Статусы сборочных заданий (legacy shape)
   * @example
   * const result = await sdk.inStorePickup.createOrdersStatus({ orders: [12345] });
   */
  async createOrdersStatus(data: ApiOrdersRequest): Promise<ApiOrderStatuses> {
    warnOnce(
      'InStorePickupModule.createOrdersStatus',
      '[DEPRECATED] createOrdersStatus() targets a removed endpoint. ' +
        'Use getStatusesBulk() instead; this shim maps the batch response to the legacy shape.'
    );
    if (!data.orders || data.orders.length === 0) {
      throw new ValidationError('data.orders cannot be empty');
    }
    const bulk = await this.getStatusesBulk(data.orders);
    const orders: ApiOrderStatus[] = bulk.orders.map((o) => ({
      id: o.orderId,
      supplierStatus: o.supplierStatus as ApiOrderStatus['supplierStatus'],
      wbStatus: o.wbStatus as ApiOrderStatus['wbStatus'],
    }));
    return { orders };
  }

  /**
   * Получить информацию о завершённых сборочных заданиях
   *
   * Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа.
   * Можно получить данные за заданный период, максимум 30 календарных дней одним запросом.
   *
   * @param [options] - Query parameters
   * @returns Список завершённых сборочных заданий
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.inStorePickup.getClickCollectOrders({ limit: 10, next: 0, dateFrom: 0, dateTo: 0 });
   * console.log(result);
   */
  async getClickCollectOrders(options: {
    limit: number;
    next: number;
    dateFrom: number;
    dateTo: number;
  }): Promise<ApiOrders> {
    return this.client.get<ApiOrders>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders',
      { params: options, rateLimitKey: 'in-store-pickup.clickCollectOrders' }
    );
  }

  /**
   * Отменить сборочное задание (batch)
   *
   * Moves up to 1000 assembly orders to `cancel` status (canceled by seller).
   * Replaces the dead single-order PATCH `.../orders/{id}/cancel` path.
   *
   * @param orderIds - Array of assembly order IDs (1-1000 items)
   * @returns Per-order results
   * @throws {ValidationError} When orderIds array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.cancelBulk([123456, 234567]);
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
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/status/cancel`,
      { ordersIds: orderIds },
      { rateLimitKey: 'in-store-pickup.cancelBulk' }
    );
  }

  /**
   * Отменить сборочное задание (single order)
   *
   * @deprecated WB shut down `PATCH /api/v3/click-collect/orders/{orderId}/cancel`.
   *   This shim delegates to {@link InStorePickupModule.cancelBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @example
   * await sdk.inStorePickup.updateOrdersCancel(12345); // -> cancelBulk([12345])
   */
  async updateOrdersCancel(orderId: number): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateOrdersCancel',
      '[DEPRECATED] updateOrdersCancel() targets a removed single-order endpoint. ' +
        'Use cancelBulk() for one or more orders instead.'
    );
    await this.cancelBulk([orderId]);
  }

  /**
   * Получить метаданные сборочных заданий (batch)
   *
   * Returns label identifiers for up to 1000 assembly orders in a single request.
   * Replaces the dead single-order GET `.../orders/{id}/meta` path.
   *
   * @param request - Request with order IDs (max 1000)
   * @returns Label identifiers for each order
   * @throws {ValidationError} When ordersIds array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.getMetaBulk({ ordersIds: [123456] });
   * ```
   */
  async getMetaBulk(request: GetMetaBulkRequest): Promise<GetOrderMetaBulkResponse> {
    if (request.ordersIds.length === 0) {
      throw new ValidationError('ordersIds array cannot be empty');
    }
    if (request.ordersIds.length > 1000) {
      throw new ValidationError('ordersIds array cannot exceed 1000 items');
    }
    return this.client.post<GetOrderMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/meta/details`,
      request,
      { rateLimitKey: 'in-store-pickup.getMetaBulk' }
    );
  }

  /**
   * Получить метаданные сборочного задания (single order)
   *
   * @deprecated WB shut down `GET /api/v3/click-collect/orders/{orderId}/meta`.
   *   This shim delegates to {@link InStorePickupModule.getMetaBulk} with a
   *   single-element array and maps the batch `OrderMetaV2` back to the legacy
   *   `{meta:{gtin:{value}, imei:{value}, sgtin:{value:[]}, uin:{value}}}` shape.
   * @param orderId - ID сборочного задания
   * @returns Метаданные сборочного задания (legacy shape)
   * @example
   * const result = await sdk.inStorePickup.getOrdersMeta(12345);
   */
  async getOrdersMeta(orderId: number): Promise<ApiOrdersMeta> {
    warnOnce(
      'InStorePickupModule.getOrdersMeta',
      '[DEPRECATED] getOrdersMeta() targets a removed single-order endpoint. ' +
        'Use getMetaBulk() instead; this shim maps the batch response to the legacy shape.'
    );
    const bulk = await this.getMetaBulk({ ordersIds: [orderId] });
    const o = bulk.orders[0];
    return {
      meta: {
        gtin: { value: o.gtin ?? null },
        imei: { value: o.imei ?? null },
        sgtin: { value: o.sgtin ?? [] },
        uin: { value: o.uin ?? null },
      },
    };
  }

  /**
   * Удалить метаданные сборочных заданий (batch)
   *
   * Deletes one label-identifier type (imei/uin/gtin/sgtin/customsDeclaration)
   * for up to 1000 assembly orders. Replaces the dead single-order DELETE
   * `.../orders/{id}/meta` path.
   *
   * @param request - Request with key + order IDs (max 1000)
   * @returns Per-order results
   * @throws {ValidationError} When ordersIds array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.deleteMetaBulk({ key: 'imei', ordersIds: [123456] });
   * ```
   */
  async deleteMetaBulk(request: DeleteMetaBulkRequest): Promise<DeleteMetaBulkResponse> {
    if (request.ordersIds.length === 0) {
      throw new ValidationError('ordersIds array cannot be empty');
    }
    if (request.ordersIds.length > 1000) {
      throw new ValidationError('ordersIds array cannot exceed 1000 items');
    }
    return this.client.post<DeleteMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/meta/delete`,
      request,
      { rateLimitKey: 'in-store-pickup.deleteMetaBulk' }
    );
  }

  /**
   * Удалить метаданные сборочного задания (single order)
   *
   * @deprecated WB shut down `DELETE /api/v3/click-collect/orders/{orderId}/meta`.
   *   This shim delegates to {@link InStorePickupModule.deleteMetaBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @param options - Query parameters
   * @param options.key - Metadata key to delete (imei, uin, gtin, sgtin, customsDeclaration)
   * @example
   * await sdk.inStorePickup.deleteOrdersMeta(12345, { key: 'imei' });
   */
  async deleteOrdersMeta(orderId: number, options: { key: string }): Promise<void> {
    warnOnce(
      'InStorePickupModule.deleteOrdersMeta',
      '[DEPRECATED] deleteOrdersMeta() targets a removed single-order endpoint. ' +
        'Use deleteMetaBulk() instead.'
    );
    await this.deleteMetaBulk({
      key: options.key as PickupMetadataKey,
      ordersIds: [orderId],
    });
  }

  /**
   * Закрепить за сборочными заданиями коды маркировки SGTIN (batch)
   *
   * Sets Chestny ZNAK labeling codes for up to 1000 assembly orders.
   * Replaces the dead single-order PUT `.../orders/{id}/meta/sgtin` path.
   *
   * @param request - Orders with SGTIN codes (max 1000)
   * @returns Per-order results
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.setSgtinBulk({
   *   orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }]
   * });
   * ```
   */
  async setSgtinBulk(request: SetSgtinBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/meta/sgtin`,
      request,
      { rateLimitKey: 'in-store-pickup.setSgtinBulk' }
    );
  }

  /**
   * Закрепить за сборочным заданием код маркировки товара SGTIN (single order)
   *
   * @deprecated WB shut down `PUT /api/v3/click-collect/orders/{orderId}/meta/sgtin`.
   *   This shim delegates to {@link InStorePickupModule.setSgtinBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @example
   * await sdk.inStorePickup.updateMetaSgtin(12345, { sgtins: ['1234567890123456'] });
   */
  async updateMetaSgtin(orderId: number, data: ApiSGTINsRequest): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateMetaSgtin',
      '[DEPRECATED] updateMetaSgtin() targets a removed single-order endpoint. ' +
        'Use setSgtinBulk() instead.'
    );
    await this.setSgtinBulk({ orders: [{ orderId, sgtins: data.sgtins ?? [] }] });
  }

  /**
   * Закрепить за сборочными заданиями УИН (batch)
   *
   * Sets UIN values for up to 1000 assembly orders. Replaces the dead
   * single-order PUT `.../orders/{id}/meta/uin` path.
   *
   * @param request - Orders with UIN values (max 1000)
   * @returns Per-order results
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.setUinBulk({
   *   orders: [{ orderId: 123456, uin: '1234567890123456' }]
   * });
   * ```
   */
  async setUinBulk(request: SetUinBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/meta/uin`,
      request,
      { rateLimitKey: 'in-store-pickup.setUinBulk' }
    );
  }

  /**
   * Закрепить за сборочным заданием УИН (single order)
   *
   * @deprecated WB shut down `PUT /api/v3/click-collect/orders/{orderId}/meta/uin`.
   *   This shim delegates to {@link InStorePickupModule.setUinBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @example
   * await sdk.inStorePickup.updateMetaUin(12345, { uin: '1234567890123456' });
   */
  async updateMetaUin(orderId: number, data: ApiUINRequest): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateMetaUin',
      '[DEPRECATED] updateMetaUin() targets a removed single-order endpoint. ' +
        'Use setUinBulk() instead.'
    );
    await this.setUinBulk({ orders: [{ orderId, uin: data.uin ?? '' }] });
  }

  /**
   * Закрепить за сборочными заданиями IMEI (batch)
   *
   * Sets IMEI values for up to 1000 assembly orders. Replaces the dead
   * single-order PUT `.../orders/{id}/meta/imei` path.
   *
   * @param request - Orders with IMEI values (max 1000)
   * @returns Per-order results
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.setImeiBulk({
   *   orders: [{ orderId: 123456, imei: '123456789012345' }]
   * });
   * ```
   */
  async setImeiBulk(request: SetImeiBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/meta/imei`,
      request,
      { rateLimitKey: 'in-store-pickup.setImeiBulk' }
    );
  }

  /**
   * Закрепить за сборочным заданием IMEI (single order)
   *
   * @deprecated WB shut down `PUT /api/v3/click-collect/orders/{orderId}/meta/imei`.
   *   This shim delegates to {@link InStorePickupModule.setImeiBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @example
   * await sdk.inStorePickup.updateMetaImei(12345, { imei: '123456789012345' });
   */
  async updateMetaImei(orderId: number, data: ApiIMEIRequest): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateMetaImei',
      '[DEPRECATED] updateMetaImei() targets a removed single-order endpoint. ' +
        'Use setImeiBulk() instead.'
    );
    await this.setImeiBulk({ orders: [{ orderId, imei: data.imei ?? '' }] });
  }

  /**
   * Закрепить за сборочными заданиями GTIN (batch)
   *
   * Sets GTIN values for up to 1000 assembly orders. Replaces the dead
   * single-order PUT `.../orders/{id}/meta/gtin` path.
   *
   * @param request - Orders with GTIN values (max 1000)
   * @returns Per-order results
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.17.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.setGtinBulk({
   *   orders: [{ orderId: 123456, gtin: '1234567890123' }]
   * });
   * ```
   */
  async setGtinBulk(request: SetGtinBulkRequest): Promise<SetMetaBulkResponse> {
    return this.client.post<SetMetaBulkResponse>(
      `${BASE_URL}/api/marketplace/v3/click-collect/orders/meta/gtin`,
      request,
      { rateLimitKey: 'in-store-pickup.setGtinBulk' }
    );
  }

  /**
   * Закрепить за сборочным заданием GTIN (single order)
   *
   * @deprecated WB shut down `PUT /api/v3/click-collect/orders/{orderId}/meta/gtin`.
   *   This shim delegates to {@link InStorePickupModule.setGtinBulk} with a
   *   single-element array and will be removed in a future major release.
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @example
   * await sdk.inStorePickup.updateMetaGtin(12345, { gtin: '1234567890123456' });
   */
  async updateMetaGtin(orderId: number, data: ApiGTINRequest): Promise<void> {
    warnOnce(
      'InStorePickupModule.updateMetaGtin',
      '[DEPRECATED] updateMetaGtin() targets a removed single-order endpoint. ' +
        'Use setGtinBulk() instead.'
    );
    await this.setGtinBulk({ orders: [{ orderId, gtin: data.gtin ?? '' }] });
  }

  // ============================================================================
  // Bulk B2B marking validation + customs-declaration (task-158)
  // ============================================================================

  /**
   * Check marking-metadata validation (B2B Chestny ZNAK pre-flight)
   *
   * Returns label-identifier validation statuses for assembly orders. Call BEFORE
   * transferring an order to `prepare` to identify orders that would get 409
   * MetaValidationFail. WB deprecated bulk `POST .../meta/info` on July 15 —
   * use this `meta/details` method instead.
   *
   * Rate limit: 150 req/min, 400ms interval, burst 20 (4XX×10 penalty)
   *
   * @param orders - Array of assembly order IDs (max 1000)
   * @returns Per-order label identifiers + validation statuses
   * @throws {ValidationError} When orders array is empty or exceeds 1000
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @since 3.16.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.checkMetaValidation([123456, 234567]);
   * const invalid = result.orders.filter(o => o.isError);
   * ```
   */
  async checkMetaValidation(orders: number[]): Promise<CheckMetaValidationResponse> {
    if (orders.length === 0) {
      throw new ValidationError('orders array cannot be empty');
    }
    if (orders.length > 1000) {
      throw new ValidationError('orders array cannot exceed 1000 items');
    }
    return this.client.post<CheckMetaValidationResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/click-collect/orders/meta/details',
      { ordersIds: orders },
      { rateLimitKey: 'in-store-pickup.checkMetaValidation' }
    );
  }

  /**
   * Bulk add customs declaration numbers + country-of-origin codes (B2B)
   *
   * Sets customs declaration (ДТ) numbers + origin country codes for assembly
   * orders (statuses `confirm` or `prepare` only). **B2B requirement (since
   * 2026-07-08):** B2B orders MUST include `originCountryCode` (numeric ОКСМ
   * code, https://esnsi.gosuslugi.ru/classifiers/16269). Invalid/missing code
   * for a B2B order → HTTP 200 with `InvalidOriginCountryCode` in that order's
   * `errors[]` (partial success — check `results[].isError`).
   *
   * Rate limit: 20 req/min, 3s interval, burst 500 (4XX×10 penalty)
   *
   * @param request - Orders with customs declarations + origin country codes
   * @returns Per-order results
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @since 3.16.0
   * @example
   * ```typescript
   * const result = await sdk.inStorePickup.setCustomsDeclarationBulk({
   *   orders: [{ orderId: 123456, customsDeclaration: '10704010/010624/0000302', originCountryCode: '643' }]
   * });
   * const failed = result.results.filter(r => r.isError);
   * ```
   */
  async setCustomsDeclarationBulk(
    request: SetCustomsDeclarationBulkRequest
  ): Promise<CustomsDeclarationSetResponse> {
    return this.client.post<CustomsDeclarationSetResponse>(
      'https://marketplace-api.wildberries.ru/api/marketplace/v3/click-collect/orders/meta/customs-declaration',
      request,
      { rateLimitKey: 'in-store-pickup.setCustomsDeclarationBulk' }
    );
  }
}
