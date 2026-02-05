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
import type {
  ApiCheckIdentityRequest,
  ApiCheckedIdentity,
  ApiGTINRequest,
  ApiIMEIRequest,
  ApiNewOrders,
  ApiOrderClientInfoResp,
  ApiOrderStatuses,
  ApiOrders,
  ApiOrdersMeta,
  ApiOrdersRequest,
  ApiSGTINsRequest,
  ApiUINRequest,
} from '../../types/in-store-pickup.types';

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
   * Перевести на сборку
   *
   * Метод переводит сборочное задание в статус confirm — на сборке.
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateOrdersConfirm(12345);
   */
  async updateOrdersConfirm(orderId: number): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/confirm`,
      {},
      { rateLimitKey: 'in-store-pickup.patchClickCollectOrdersConfirm' }
    );
  }

  /**
   * Сообщить, что сборочное задание готово к выдаче
   *
   * Метод переводит сборочное задание в статус prepare — готово к выдаче.
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateOrdersPrepare(12345);
   */
  async updateOrdersPrepare(orderId: number): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/prepare`,
      {},
      { rateLimitKey: 'in-store-pickup.patchClickCollectOrdersPrepare' }
    );
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
   * Сообщить, что заказ принят покупателем
   *
   * Метод переводит сборочное задание в статус receive — получено покупателем.
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateOrdersReceive(12345);
   */
  async updateOrdersReceive(orderId: number): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/receive`,
      {},
      { rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReceive' }
    );
  }

  /**
   * Сообщить, что покупатель отказался от заказа
   *
   * Метод переводит сборочное задание в статус reject — отказ при получении.
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateOrdersReject(12345);
   */
  async updateOrdersReject(orderId: number): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/reject`,
      {},
      { rateLimitKey: 'in-store-pickup.patchClickCollectOrdersReject' }
    );
  }

  /**
   * Получить статусы сборочных заданий
   *
   * Метод возвращает статусы сборочных заданий по их ID.
   *
   * @param data - Request body data
   * @returns Статусы сборочных заданий
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.inStorePickup.createOrdersStatus({ orders: [12345] });
   * console.log(result);
   */
  async createOrdersStatus(data: ApiOrdersRequest): Promise<ApiOrderStatuses> {
    return this.client.post<ApiOrderStatuses>(
      'https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/status',
      data,
      { rateLimitKey: 'in-store-pickup.postClickCollectOrdersStatus' }
    );
  }

  /**
   * @deprecated Use {@link createOrdersStatus} instead. This alias will be removed in a future version.
   * Renamed from createOrdersStatu to createOrdersStatus to fix the truncated method name.
   */
  async createOrdersStatu(data: ApiOrdersRequest): Promise<ApiOrderStatuses> {
    return this.createOrdersStatus(data);
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
   * Отменить сборочное задание
   *
   * Метод отменяет сборочное задание и переводит в статус cancel — отменено продавцом.
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateOrdersCancel(12345);
   */
  async updateOrdersCancel(orderId: number): Promise<void> {
    return this.client.patch(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/cancel`,
      {},
      { rateLimitKey: 'in-store-pickup.patchClickCollectOrdersCancel' }
    );
  }

  /**
   * Получить метаданные сборочного задания
   *
   * Метод возвращает метаданные сборочного задания.
   * Перечень метаданных, доступных для сборочного задания, можно получить в списке новых сборочных заданий, поле requiredMeta.
   *
   * @param orderId - ID сборочного задания
   * @returns Метаданные сборочного задания
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.inStorePickup.getOrdersMeta(12345);
   * console.log(result);
   */
  async getOrdersMeta(orderId: number): Promise<ApiOrdersMeta> {
    return this.client.get<ApiOrdersMeta>(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`,
      { rateLimitKey: 'in-store-pickup.clickCollectOrdersMeta' }
    );
  }

  /**
   * Удалить метаданные сборочного задания
   *
   * Метод удаляет значение метаданных сборочного задания для переданного ключа.
   * Возможные метаданные: imei, uin, gtin, sgtin. Передается только одно значение.
   *
   * @param orderId - ID сборочного задания
   * @param options - Query parameters
   * @param options.key - Metadata key to delete (imei, uin, gtin, sgtin)
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.deleteOrdersMeta(12345, { key: 'imei' });
   */
  async deleteOrdersMeta(orderId: number, options: { key: string }): Promise<void> {
    return this.client.delete(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`,
      {},
      { params: options, rateLimitKey: 'in-store-pickup.deleteClickCollectOrdersMeta' }
    );
  }

  /**
   * Закрепить за сборочным заданием код маркировки товара (SGTIN)
   *
   * Метод закрепляет за сборочным заданием код маркировки Честный знак.
   * Закрепить код маркировки можно только, если в метаданных есть поле sgtins,
   * а сборочное задание находится в статусе confirm.
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateMetaSgtin(12345, { sgtins: ['1234567890123456'] });
   */
  async updateMetaSgtin(orderId: number, data: ApiSGTINsRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/sgtin`,
      data,
      { rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaSgtin' }
    );
  }

  /**
   * Закрепить за сборочным заданием УИН (уникальный идентификационный номер)
   *
   * Метод обновляет УИН сборочного задания. У одного сборочного задания может быть только один УИН.
   * Добавлять маркировку можно только для сборочных заданий в статусе confirm.
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateMetaUin(12345, { uin: '1234567890123456' });
   */
  async updateMetaUin(orderId: number, data: ApiUINRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/uin`,
      data,
      { rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaUin' }
    );
  }

  /**
   * Закрепить за сборочным заданием IMEI
   *
   * Метод обновляет IMEI сборочного задания. У одного сборочного задания может быть только один IMEI.
   * Добавлять маркировку можно только для сборочных заданий в статусе confirm.
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateMetaImei(12345, { imei: '123456789012345' });
   */
  async updateMetaImei(orderId: number, data: ApiIMEIRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/imei`,
      data,
      { rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaImei' }
    );
  }

  /**
   * Закрепить за сборочным заданием GTIN
   *
   * Метод обновляет GTIN (уникальный ID товара в Беларуси) сборочного задания.
   * У одного сборочного задания может быть только один GTIN.
   * Добавлять маркировку можно только для сборочных заданий в статусе confirm.
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * await sdk.inStorePickup.updateMetaGtin(12345, { gtin: '1234567890123456' });
   */
  async updateMetaGtin(orderId: number, data: ApiGTINRequest): Promise<void> {
    return this.client.put(
      `https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/gtin`,
      data,
      { rateLimitKey: 'in-store-pickup.putClickCollectOrdersMetaGtin' }
    );
  }
}
