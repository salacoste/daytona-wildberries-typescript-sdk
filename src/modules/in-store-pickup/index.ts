/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/06-in-store-pickup.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { ApiCheckIdentityRequest, ApiCheckedIdentity, ApiGTINRequest, ApiIMEIRequest, ApiNewOrders, ApiOrderClientInfoResp, ApiOrderStatuses, ApiOrders, ApiOrdersMeta, ApiOrdersRequest, ApiSGTINsRequest, ApiUINRequest } from '../../types/in-store-pickup.types';

export class InStorePickupModule {
  constructor(private client: BaseClient) {}

  /**
   * Получить список новых сборочных заданий
   *
   * Метод возвращает список всех новых [сборочных заданий](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz), которые есть у продавца на момент запроса. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getOrdersNew();
  console.log(result);
   */
  async getOrdersNew(): Promise<ApiNewOrders> {
    return this.client.get<ApiNewOrders>('https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/new');
  }

  /**
   * Перевести на сборку
   *
   * Метод переводит сборочное задание в статус `confirm` — на сборке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateOrdersConfirm('orderId-value');
   */
  async updateOrdersConfirm(orderId: number): Promise<void> {
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/confirm`, undefined);
  }

  /**
   * Сообщить, что сборочное задание готово к выдаче
   *
   * Метод переводит сборочное задание в статус `prepare` — готово к выдаче. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateOrdersPrepare('orderId-value');
   */
  async updateOrdersPrepare(orderId: number): Promise<void> {
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/prepare`, undefined);
  }

  /**
   * Информация о покупателе
   *
   * Метод возвращает информацию о покупателе по ID сборочного задания. <br><br> Доступно только для сборочных заданий в статусах: - `confirm` — на сборке - `prepare` — готов к выдаче <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createOrdersClient({});
  console.log(result);
   */
  async createOrdersClient(data: ApiOrdersRequest): Promise<ApiOrderClientInfoResp> {
    return this.client.post<ApiOrderClientInfoResp>('https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client', data);
  }

  /**
   * Проверить, что заказ принадлежит покупателю
   *
   * Метод сообщает, принадлежит ли проверяемый заказ покупателю или нет по переданному коду. <br><br> Доступно, если хотя бы одно сборочное задание из заказа находится в статусе prepare - готов к выдаче. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 30 запросов | 2 секунды | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createClientIdentity({});
  console.log(result);
   */
  async createClientIdentity(data: ApiCheckIdentityRequest): Promise<ApiCheckedIdentity> {
    return this.client.post<ApiCheckedIdentity>('https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/client/identity', data);
  }

  /**
   * Сообщить, что заказ принят покупателем
   *
   * Метод переводит сборочное задание в статус `receive` — получено покупателем. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateOrdersReceive('orderId-value');
   */
  async updateOrdersReceive(orderId: number): Promise<void> {
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/receive`, undefined);
  }

  /**
   * Сообщить, что покупатель отказался от заказа
   *
   * Метод переводит сборочное задание в статус `reject` — отказ при получении. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateOrdersReject('orderId-value');
   */
  async updateOrdersReject(orderId: number): Promise<void> {
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/reject`, undefined);
  }

  /**
   * Получить статусы сборочных заданий
   *
   * Метод возвращает статусы сборочных заданий по их ID. <br><br> `supplierStatus` — статус сборочного задания. Триггер его изменения - действие самого продавца. Возможные значения `supplierStatus`: | Статус | Описание | Как перевести сборочное задание в данный статус | | ------- | --------- | --------------------------------------| | `new` | **Новое сборочное задание** | | `confirm` | **На сборке** | [Перевести сборочное задание на сборку](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1confirm/patch) | `prepare` | **Готов к выдаче** | [Сообщить, что сборочное задание готово к выдаче](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1prepare/patch) | `receive` | **Получено покупателем** | [Сообщить, что заказ принят покупателем](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1receive/patch) | `reject` | **Отказ покупателя при получении** | [Сообщить, что покупатель отказался от заказа](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1reject/patch) | `cancel` | **Отменено продавцом** | [Отменить сборочное задание](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1%7BorderId%7D~1cancel/patch) | `cancel_shelf_life` | **Отмена по истечении срока хранения** | Переводится автоматически по возникновению события <br><br> `wbStatus` — статус системы Wildberries. Возможные значения `wbStatus`: - `waiting` - сборочное задание в работе - `sold` - заказ получен покупателем - `canceled` - отмена сборочного задания - `canceled_by_client` - покупатель отменил заказ при получении - `declined_by_client` - покупатель отменил заказ в первый чаc <br> Отмена доступна покупателю в первый час с момента заказа, если заказ не переведён на сборку - `defect` - отмена заказа по причине брака - `ready_for_pickup` - сборочное задание готово к выдаче <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createOrdersStatu({});
  console.log(result);
   */
  async createOrdersStatu(data: ApiOrdersRequest): Promise<ApiOrderStatuses> {
    return this.client.post<ApiOrderStatuses>('https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/status', data);
  }

  /**
   * Получить информацию о завершённых сборочных заданиях
   *
   * Метод возвращает информацию о завершённых сборочных заданиях после продажи или отмены заказа. Можно получить данные за заданный период, максимум 30 календарных дней одним запросом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getClickCollectOrders({});
  console.log(result);
   */
  async getClickCollectOrders(options?: { limit: number; next: number; dateFrom: number; dateTo: number }): Promise<ApiOrders> {
    return this.client.get<ApiOrders>('https://marketplace-api.wildberries.ru/api/v3/click-collect/orders', { params: options });
  }

  /**
   * Отменить сборочное задание
   *
   * Метод отменяет сборочное задание и переводит в статус `cancel` — отменено продавцом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateOrdersCancel('orderId-value');
   */
  async updateOrdersCancel(orderId: number): Promise<void> {
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/cancel`, undefined);
  }

  /**
   * Получить метаданные сборочного задания
   *
   * Метод возвращает метаданные [сборочного задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1new/get). <br><br> Перечень метаданных, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1new/get), поле `requiredMeta`. <br><br> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getOrdersMeta('orderId-value');
  console.log(result);
   */
  async getOrdersMeta(orderId: number): Promise<ApiOrdersMeta> {
    return this.client.get<ApiOrdersMeta>(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`);
  }

  /**
   * Удалить метаданные сборочного задания
   *
   * Метод удаляет значение метаданных сборочного задания для переданного ключа. Возможные метаданные: `imei`, `uin`, `gtin`, `sgtin` Передается только одно значение. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deleteOrdersMeta('orderId-value', {});
   */
  async deleteOrdersMeta(orderId: number, options?: { key: string }): Promise<void> {
    return this.client.delete(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta`, { params: options });
  }

  /**
   * Закрепить за сборочным заданием код маркировки товара
   *
   * Метод закрепляет за сборочным заданием код маркировки [Честный знак](https://честныйзнак.рф). <br><br> Закрепить код маркировки можно только, если в [метаданных сборочного задания](/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta/get) есть поле `sgtins`, а сборочное задание находится в [статусе](/openapi/in-store-pickup#tag/Sborochnye-zadaniya-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1status/post) `confirm`. <br><br> Получить загруженные маркировки можно в [метаданных сборочного задания](/openapi/in-store-pickup#tag/Metadannye-Samovyvoz/paths/~1api~1v3~1click-collect~1orders~1{orderId}~1meta/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaSgtin('orderId-value', {});
   */
  async updateMetaSgtin(orderId: number, data: ApiSGTINsRequest): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/sgtin`, data);
  }

  /**
   * Закрепить за сборочным заданием УИН (уникальный идентификационный номер)
   *
   * Метод обновляет УИН сборочного задания. У одного сборочного задания может быть только один УИН. Добавлять маркировку можно только для сборочных заданий в статусе `confirm` и доставка которых осуществляется силами WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaUin('orderId-value', {});
   */
  async updateMetaUin(orderId: number, data: ApiUINRequest): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/uin`, data);
  }

  /**
   * Закрепить за сборочным заданием IMEI
   *
   * Метод обновляет IMEI сборочного задания. У одного сборочного задания может быть только один IMEI. Добавлять маркировку можно только для сборочных заданий в статусе `confirm` и доставка которых осуществляется силами WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaImei('orderId-value', {});
   */
  async updateMetaImei(orderId: number, data: ApiIMEIRequest): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/imei`, data);
  }

  /**
   * Закрепить за сборочным заданием GTIN
   *
   * Метод обновляет GTIN (уникальный ID товара в Беларуси) сборочного задания. У одного сборочного задания может быть только один GTIN. Добавлять маркировку можно только для сборочных заданий в статусе `confirm` и доставка которых осуществляется силами WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных Самовывоз</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param data - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaGtin('orderId-value', {});
   */
  async updateMetaGtin(orderId: number, data: ApiGTINRequest): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/click-collect/orders/${orderId}/meta/gtin`, data);
  }

}