/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/03-orders-fbs.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { CrossborderTurkeyClientInfoResp, Meta, Next, Order, OrderNew, OrdersRequestAPI, Pass, PassOffice, Supply, SupplyOrder, SupplyTrbx, TrbxStickers } from '../../types/orders-fbs.types';

export class OrdersFbsModule {
  constructor(private client: BaseClient) {}

  /**
   * Получить список складов, для которых требуется пропуск
   *
   * Метод возвращает список складов для привязки к [пропуску продавца](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get). <div class="description_important"> Данные, которые возвращает метод, могут меняться. Рекомендуем периодически синхронизировать список </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getPassesOffices();
  console.log(result);
   */
  async getPassesOffices(): Promise<PassOffice[]> {
    return this.client.get<PassOffice[]>('https://marketplace-api.wildberries.ru/api/v3/passes/offices');
  }

  /**
   * Получить список пропусков
   *
   * Метод возвращает список всех [созданных](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/post) пропусков продавца. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.passes();
  console.log(result);
   */
  async passes(): Promise<Pass[]> {
    return this.client.get<Pass[]>('https://marketplace-api.wildberries.ru/api/v3/passes');
  }

  /**
   * Создать пропуск
   *
   * Метод создаёт [пропуск продавца](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get) с привязкой к складу WB. Пропуск действует 48 часов со времени создания. <div class="description_limit"> Максимум 1 запрос в 10 <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">минут</a> на один аккаунт продавца </div>
   *
   * @param data - Общая длина ФИО ограничена от 6 до 100 символов. В номере машины могут быть только буквы и цифры.
   * @returns Создано
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createPass({});
  console.log(result);
   */
  async createPass(data: { firstName: string; lastName: string; carModel: string; carNumber: string; officeId: number }): Promise<{ id?: number }> {
    return this.client.post<{ id?: number }>('https://marketplace-api.wildberries.ru/api/v3/passes', data);
  }

  /**
   * Обновить пропуск
   *
   * Метод обновляет данные [пропуска продавца](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get). В том числе, можно обновить данные привязанного склада WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param passId - ID пропуска
   * @param data - Общая длина ФИО ограничена от 6 до 100 символов. В номере машины могут быть только буквы и цифры.
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updatePass('passId-value', {});
   */
  async updatePass(passId: number, data: { firstName: string; lastName: string; carModel: string; carNumber: string; officeId: number }): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/passes/${passId}`, data);
  }

  /**
   * Удалить пропуск
   *
   * Метод удаляет пропуск продавца [из списка](/openapi/orders-fbs#tag/Propuska-FBS/paths/~1api~1v3~1passes/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param passId - ID пропуска
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deletePass('passId-value');
   */
  async deletePass(passId: number): Promise<void> {
    return this.client.delete(`https://marketplace-api.wildberries.ru/api/v3/passes/${passId}`);
  }

  /**
   * Получить список новых сборочных заданий
   *
   * Метод возвращает список всех новых [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get), которые есть у продавца на момент запроса. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | </div>
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
  async getOrdersNew(): Promise<{ orders?: OrderNew[] }> {
    return this.client.get<{ orders?: OrderNew[] }>('https://marketplace-api.wildberries.ru/api/v3/orders/new');
  }

  /**
   * Получить информацию о сборочных заданиях
   *
   * Метод возвращает информацию о сборочных заданиях без их актуального [статуса](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post). Можно получить данные за заданный период, максимум 30 календарных дней одним запросом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.orders({});
  console.log(result);
   */
  async orders(options?: { limit: number; next: number; dateFrom?: number; dateTo?: number }): Promise<{ next?: Next; orders?: Order[] }> {
    return this.client.get<{ next?: Next; orders?: Order[] }>('https://marketplace-api.wildberries.ru/api/v3/orders', { params: options });
  }

  /**
   * Получить статусы сборочных заданий
   *
   * Метод возвращает статусы [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) по их ID. <br><br> `supplierStatus` — статус сборочного задания. Триггер его изменения — действие самого продавца. Возможные значения `supplierStatus`: | Статус | Описание | Как перевести сборочное задание в данный статус | |-------|----------------------|--------------------------------------| | `new` | **Новое сборочное задание** | | | `confirm` | **На сборке** |[Добавить сборочное задание к поставке](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders~1%7BorderId%7D/patch) | `complete` | **В доставке** | [Передать поставку в доставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1deliver/patch) | | `cancel` | **Отменено продавцом** | [Отменить сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1cancel/patch)| <br><br> `wbStatus` — статус системы Wildberries. Возможные значения `wbStatus`: - `waiting` — сборочное задание в работе - `sorted` — сборочное задание отсортировано - `sold` — заказ получен покупателем - `canceled` — отмена сборочного задания - `canceled_by_client` — покупатель отменил заказ при получении - `declined_by_client` — покупатель отменил заказ. Отмена доступна покупателю в первый час с момента заказа, если заказ не переведён на сборку - `defect` — отмена заказа по причине брака - `ready_for_pickup` — сборочное задание прибыло на пункт выдачи заказов (ПВЗ) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createOrdersStatu({});
  console.log(result);
   */
  async createOrdersStatu(data?: { orders: number[] }): Promise<{ orders?: { id?: number; supplierStatus?: 'new' | 'confirm' | 'complete' | 'cancel'; wbStatus?: 'waiting' | 'sorted' | 'sold' | 'canceled' | 'canceled_by_client' | 'declined_by_client' | 'defect' | 'ready_for_pickup' | 'postponed_delivery' }[] }> {
    return this.client.post<{ orders?: { id?: number; supplierStatus?: 'new' | 'confirm' | 'complete' | 'cancel'; wbStatus?: 'waiting' | 'sorted' | 'sold' | 'canceled' | 'canceled_by_client' | 'declined_by_client' | 'defect' | 'ready_for_pickup' | 'postponed_delivery' }[] }>('https://marketplace-api.wildberries.ru/api/v3/orders/status', data);
  }

  /**
   * Получить все сборочные задания для повторной отгрузки
   *
   * Метод возвращает все [сборочные задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get), требующие повторной отгрузки. <br><br> Повторная отгрузка требуется, если поставка была отсканирована в пункте приёмки, но при этом в ней всё ещё есть неотсканированные товары. Спустя определённое время необходимо доставить эти товары заново. Данные сборочные задания можно перевести в [другую активную поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1orders~1%7BorderId%7D/patch). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getOrdersReshipment();
  console.log(result);
   */
  async getOrdersReshipment(): Promise<{ orders?: { supplyID?: unknown; orderID?: unknown }[] }> {
    return this.client.get<{ orders?: { supplyID?: unknown; orderID?: unknown }[] }>('https://marketplace-api.wildberries.ru/api/v3/supplies/orders/reshipment');
  }

  /**
   * Отменить сборочное задание
   *
   * Метод отменяет [сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) и переводит в [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `cancel` — отменено продавцом. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 100 запросов | 600 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
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
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/cancel`, undefined);
  }

  /**
   * Получить стикеры сборочных заданий
   *
   * Метод возвращает список стикеров для [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get). Можно получить стикер в форматах: - SVG - ZPLV (вертикальный) - ZPLH (горизонтальный) - PNG Ограничения: - За один запрос можно получить максимум 100 стикеров. - Можно получить стикеры только для сборочных заданий, находящихся на сборке — [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. Доступны размеры: - 580x400 px при `width=58&height=40` в запросе - 400x300 px при `width=40&height=30` в запросе <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [options] - Query parameters
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createOrdersSticker({}, {});
  console.log(result);
   */
  async createOrdersSticker(options?: { type: 'svg' | 'zplv' | 'zplh' | 'png'; width: 58 | 40; height: 40 | 30 }, data?: { orders?: number[] }): Promise<{ stickers?: { orderId?: number; partA?: string; partB?: string; barcode?: string; file?: string }[] }> {
    return this.client.post<{ stickers?: { orderId?: number; partA?: string; partB?: string; barcode?: string; file?: string }[] }>('https://marketplace-api.wildberries.ru/api/v3/orders/stickers', data, { params: options });
  }

  /**
   * Получить метаданные сборочного задания
   *
   * Метод возвращает метаданные [сборочного задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1new/get). <br><br> Перечень метаданных, доступных для сборочного задания, можно получить в [списке новых сборочных заданий](/openapi/orders-dbs#tag/Sborochnye-zadaniya-DBS/paths/~1api~1v3~1dbs~1orders~1new/get), поле `requiredMeta`. <br><br> Возможные метаданные: - `imei` — [IMEI](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put) - `uin` — [УИН](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put) - `gtin` — [GTIN](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put) - `sgtin` — [код маркировки](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put) - `expiration` — [срок годности товара](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1expiration/put) Если в ответе не вернулись какие-либо из объектов метаданных, значит, у сборочного задания не может быть таких метаданных — и добавить их нельзя. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
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
  async getOrdersMeta(orderId: number): Promise<{ meta?: Meta }> {
    return this.client.get<{ meta?: Meta }>(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta`);
  }

  /**
   * Удалить метаданные сборочного задания
   *
   * Метод удаляет значение [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) для переданного ключа. <br><br> Возможные метаданные: - `imei` — [IMEI](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1imei/put) - `uin` — [УИН](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1uin/put) - `gtin` — [GTIN](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1gtin/put) - `sgtin` — [код маркировки](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta~1sgtin/put) Можно передать только один ключ. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>получения и удаления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
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
  async deleteOrdersMeta(orderId: number, options?: { key?: string }): Promise<void> {
    return this.client.delete(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta`, { params: options });
  }

  /**
   * Закрепить за сборочным заданием код маркировки товара
   *
   * Метод позволяет закрепить за [сборочным заданием](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) код маркировки [Честный знак](https://честныйзнак.рф). <br><br> Закрепить код маркировки можно только если в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) есть поле `sgtin`, а сборочное задание находится в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <br><br> Получить загруженные маркировки можно в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaSgtin('orderId-value', {});
   */
  async updateMetaSgtin(orderId: number, data?: { sgtins?: string[] }): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/sgtin`, data);
  }

  /**
   * Закрепить за сборочным заданием УИН
   *
   * Метод обновляет УИН в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) — уникальный идентификационный номер. <br><br> У одного сборочного задания может быть только один УИН. Добавлять маркировку можно только для заказов, которые доставляются WB и находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaUin('orderId-value', {});
   */
  async updateMetaUin(orderId: number, data?: { uin: string }): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/uin`, data);
  }

  /**
   * Закрепить за сборочным заданием IMEI
   *
   * Метод обновляет IMEI в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get). <br><br> У одного сборочного задания может быть только один IMEI. Если у устройства два IMEI — **IMEI** и **IMEI2** или **IMEI1** и **IMEI2** — укажите только **IMEI** или **IMEI1**. **IMEI2** указывать не нужно. <br><br> Добавлять маркировку можно только для заказов, которые находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaImei('orderId-value', {});
   */
  async updateMetaImei(orderId: number, data?: { imei: string }): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/imei`, data);
  }

  /**
   * Закрепить за сборочным заданием GTIN
   *
   * Метод обновляет GTIN в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get) — уникальный ID товара в Беларуси. <br><br> У одного сборочного задания может быть только один GTIN. Добавлять маркировку можно только для заказов, которые доставляются WB и находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaGtin('orderId-value', {});
   */
  async updateMetaGtin(orderId: number, data?: { gtin: string }): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/gtin`, data);
  }

  /**
   * Закрепить за сборочным заданием срок годности товара
   *
   * Метод закрепляет за [сборочным заданием](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) срок годности товара. Товар годен до указанной даты. <br> Добавить срок годности можно только для заказов, которые доставляются WB и находятся в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm`. <br> <br> Получить загруженные данные можно в [метаданных сборочного задания](/openapi/orders-fbs#tag/Metadannye-FBS/paths/~1api~1v3~1orders~1%7BorderId%7D~1meta/get). Чтобы изменить срок годности, отправьте запрос с новой датой. Удалить срок годности из метаданных сборочного задания невозможно. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для всех методов <strong>закрепления метаданных FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param orderId - ID сборочного задания
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateMetaExpiration('orderId-value', {});
   */
  async updateMetaExpiration(orderId: number, data?: { expiration?: string }): Promise<void> {
    return this.client.put(`https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta/expiration`, data);
  }

  /**
   * Получить стикеры сборочных заданий кроссбордера
   *
   * Метод возвращает список стикеров [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders/get) кроссбордера, в формате PDF.<br><br> Ограничения: - За один запрос можно получить максимум 100 стикеров. - Можно получить стикеры только для сборочных заданий, находящихся на сборке — [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post) `confirm`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createStickersCrossBorder({});
  console.log(result);
   */
  async createStickersCrossBorder(data?: { orders?: number[] }): Promise<{ stickers?: { file?: string; orderId?: number }[] }> {
    return this.client.post<{ stickers?: { file?: string; orderId?: number }[] }>('https://marketplace-api.wildberries.ru/api/v3/orders/stickers/cross-border', data);
  }

  /**
   * Получить список ссылок на стикеры сборочных заданий, которые требуются при кроссбордере
   *
   * [ Метод будет отключен 23 октября](https://dev.wildberries.ru/release-notes?id=348).
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createOrdersExternalSticker({});
  console.log(result);
   */
  async createOrdersExternalSticker(data?: { orders?: number[] }): Promise<{ stickers?: { orderID?: number; url?: string; parcelID?: string }[] }> {
    return this.client.post<{ stickers?: { orderID?: number; url?: string; parcelID?: string }[] }>('https://marketplace-api.wildberries.ru/api/v3/files/orders/external-stickers', data);
  }

  /**
   * История статусов для сборочных заданий кроссбордера
   *
   * Метод возвращает историю [статусов](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) для [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) кроссбордера. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createStatusHistory({});
  console.log(result);
   */
  async createStatusHistory(data?: { orders?: number[] }): Promise<{ orders?: { deliveryDate?: string; statuses?: { date?: string; code?: string }[]; orderID?: number }[] }> {
    return this.client.post<{ orders?: { deliveryDate?: string; statuses?: { date?: string; code?: string }[]; orderID?: number }[] }>('https://api.wildberries.ru/api/v3/orders/status/history', data);
  }

  /**
   * Заказы с информацией по клиенту
   *
   * Метод позволяет получать информацию о покупателе по ID сборочного задания. Только для кроссбордера из **Турции**. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
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
  async createOrdersClient(data: OrdersRequestAPI): Promise<CrossborderTurkeyClientInfoResp> {
    return this.client.post<CrossborderTurkeyClientInfoResp>('https://marketplace-api.wildberries.ru/api/v3/orders/client', data);
  }

  /**
   * Получить список поставок
   *
   * Метод возвращает список [поставок](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.supplies({});
  console.log(result);
   */
  async supplies(options?: { limit: number; next: number }): Promise<{ next?: Next; supplies?: Supply[] }> {
    return this.client.get<{ next?: Next; supplies?: Supply[] }>('https://marketplace-api.wildberries.ru/api/v3/supplies', { params: options });
  }

  /**
   * Создать новую поставку
   *
   * Метод создаёт новую [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). Ограничения: - Только для [сборочных заданий](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) по модели FBS. - При добавлении в поставку все передаваемые сборочные задания в [статусе](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `new` будут автоматически переведены в статус `confirm` — на сборке. - Если вы переведёте сборочное задание в статус `cancel` — отмена продавцом, прикрепленное сборочное задание автоматически удалится из поставки. - Поставку можно собрать только из сборочных заданий (заказов) одного габаритного типа `cargoType`. Новая поставка не обладает габаритным признаком, она приобретает габаритный признак первого заказа, добавленного в поставку. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param data - Request body data
   * @returns Создано
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createSupply({});
  console.log(result);
   */
  async createSupply(data: { name?: string }): Promise<{ id?: string }> {
    return this.client.post<{ id?: string }>('https://marketplace-api.wildberries.ru/api/v3/supplies', data);
  }

  /**
   * Добавить сборочное задание к поставке
   *
   * Метод добавляет [сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) к поставке и переводит его в [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `confirm` — на сборке. Может перемещать сборочное задание: - между активными поставками. - из закрытой поставки в активную, если сборочное задание требует [повторной отгрузки](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1supplies~1orders~1reshipment/get). <div class="description_important"> В пустую поставку можно добавить сборочное задание любого габаритного типа. Поставка приобретает габаритный тип первого добавленного сборочного задания <a href ="./orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get">из поля</a> <code>cargoType</code>. <br> После этого в поставку можно добавить сборочные задания только того же габаритного типа, что и у поставки. </div> <div class="description_important"> Нельзя добавлять в поставку сборочные задания поступившие на разные склады. </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для метода <strong>добавления сборочных заданий к поставке FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1000 запросов | 60 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @param orderId - ID сборочного задания
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateSuppliesOrder('supplyId-value', 'orderId-value');
   */
  async updateSuppliesOrder(supplyId: string, orderId: number): Promise<void> {
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders/${orderId}`, undefined);
  }

  /**
   * Получить информацию о поставке
   *
   * Метод возвращает подробную информацию о поставке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSupply('supplyId-value');
  console.log(result);
   */
  async getSupply(supplyId: string): Promise<Supply> {
    return this.client.get<Supply>(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}`);
  }

  /**
   * Удалить поставку
   *
   * Метод удаляет [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get), если она активна и за ней не закреплено ни одно [сборочное задание](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deleteSupply('supplyId-value');
   */
  async deleteSupply(supplyId: string): Promise<void> {
    return this.client.delete(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}`);
  }

  /**
   * Получить сборочные задания в поставке
   *
   * Метод возвращает [сборочные задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get), закреплённые за [поставкой](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSuppliesOrder('supplyId-value');
  console.log(result);
   */
  async getSuppliesOrder(supplyId: string): Promise<{ orders?: SupplyOrder[] }> {
    return this.client.get<{ orders?: SupplyOrder[] }>(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders`);
  }

  /**
   * Передать поставку в доставку
   *
   * Метод закрывает [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get) и переводит все [сборочные задания](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders/get) в ней в [статус](/openapi/orders-fbs#tag/Sborochnye-zadaniya/paths/~1api~1v3~1orders~1status/post) `complete` — в доставке. После закрытия поставки добавить новые сборочные задания к ней нельзя. <br><br> Если поставка не была передана в доставку, то при приёмке первого товара поставка автоматически закроется. <br><br> Передать поставку в доставку можно только если в ней: - есть хотя бы одно сборочное задания <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.updateSuppliesDeliver('supplyId-value');
   */
  async updateSuppliesDeliver(supplyId: string): Promise<void> {
    return this.client.patch(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/deliver`, undefined);
  }

  /**
   * Получить QR-код поставки
   *
   * Метод возвращает QR-код [поставки](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get) в форматах: - SVG - ZPLV (вертикальный) - ZPLH (горизонтальный) - PNG QR-код поставки можно получить только если поставка [передана в доставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1deliver/patch). <br><br> Размер — 580x400 px. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSuppliesBarcode('supplyId-value', {});
  console.log(result);
   */
  async getSuppliesBarcode(supplyId: string, options?: { type: 'svg' | 'zplv' | 'zplh' | 'png' }): Promise<{ barcode?: string; file?: string }> {
    return this.client.get<{ barcode?: string; file?: string }>(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/barcode`, { params: options });
  }

  /**
   * Получить список коробов поставки
   *
   * Возвращает список коробов поставки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSuppliesTrbx('supplyId-value');
  console.log(result);
   */
  async getSuppliesTrbx(supplyId: string): Promise<{ trbxes?: SupplyTrbx[] }> {
    return this.client.get<{ trbxes?: SupplyTrbx[] }>(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`);
  }

  /**
   * Добавить короба к поставке
   *
   * Метод добавляет требуемое количество [коробов](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D~1trbx/get) в [поставку](/openapi/orders-fbs#tag/Postavki-FBS/paths/~1api~1v3~1supplies~1%7BsupplyId%7D/get). <br> <br> Короба необходимо добавлять только в поставки, отгружаемые на ПВЗ. <br> Можно добавить только в открытую поставку. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @param [data] - Request body data
   * @returns Создано
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createSuppliesTrbx('supplyId-value', {});
  console.log(result);
   */
  async createSuppliesTrbx(supplyId: string, data?: { amount: number }): Promise<{ trbxIds?: string[] }> {
    return this.client.post<{ trbxIds?: string[] }>(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`, data);
  }

  /**
   * Удалить короба из поставки
   *
   * Метод даляет короба из поставки. <br><br> Можно удалить только пока поставка на сборке. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @param [data] - Request body data
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.deleteSuppliesTrbx('supplyId-value', {});
   */
  async deleteSuppliesTrbx(supplyId: string, data?: { trbxIds: string[] }): Promise<void> {
    return this.client.delete(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx`, data);
  }

  /**
   * Получить стикеры коробов поставки
   *
   * Метод возвращает QR-стикеры в форматах: - SVG - ZPLV (вертикальный) - ZPLH (горизонтальный) - PNG <br><br> Размер стикеров — 580x400 px. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца для методов <strong>сборочных заданий, поставок и пропусков FBS</strong>: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 300 запросов | 200 миллисекунд | 20 запросов | Один запрос с кодом ответа <code>409</code> учитывается как 5 запросов </div>
   *
   * @param supplyId - ID поставки
   * @param [options] - Query parameters
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createTrbxSticker('supplyId-value', {}, {});
  console.log(result);
   */
  async createTrbxSticker(supplyId: string, options?: { type: 'svg' | 'zplv' | 'zplh' | 'png' }, data?: { trbxIds: string[] }): Promise<{ stickers?: TrbxStickers[] }> {
    return this.client.post<{ stickers?: TrbxStickers[] }>(`https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/trbx/stickers`, data, { params: options });
  }

}