/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/11-analytics.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { CommonResponseProperties, MainRequest, MainResponse, NmReportCreateReportResponse, NmReportDetailHistoryRequest, NmReportDetailHistoryResponse, NmReportDetailRequest, NmReportDetailResponse, NmReportGetReportsResponse, NmReportGroupedHistoryRequest, NmReportGroupedHistoryResponse, NmReportRetryReportRequest, NmReportRetryReportResponse, ProductOrdersRequest, ProductOrdersResponse, ProductSearchTextsRequest, ProductSearchTextsResponse, SalesFunnelGroupReq, SalesFunnelProductReq, SearchReportGroupReq, SearchReportProductReq, SearchReportTextReq, StocksReportReq, TableDetailsRequest, TableDetailsResponse, TableGroupRequest, TableGroupRequestSt, TableGroupResponse, TableGroupResponseSt, TableProductRequest, TableProductResponse, TableShippingOfficeRequest, TableShippingOfficeResponse, TableSizeRequest, TableSizeResponse } from '../../types/analytics.types';

export class AnalyticsModule {
  constructor(private client: BaseClient) {}

  /**
   * Статистика карточек товаров за период
   *
   * Метод формирует отчёт о товарах, сравнивая ключевые показатели — например, добавления в корзину, заказы и переходы в карточку товара — за текущий период с аналогичным прошлым.<br><br> Параметры `brandNames`,`objectIDs`, `tagIDs`, `nmIDs` могут быть пустыми `[]`, тогда в ответе возвращаются все карточки продавца.<br><br> Если выбрано несколько параметров, в ответе будут карточки, в которых есть одновременно все эти параметры. Если карточки не подходят по параметрам запроса, вернётся пустой ответ `[]`.<br><br> Можно получить отчёт максимум за последние 365 дней.<br><br> В данных предыдущего периода: * Данные в `previousPeriod` указаны за такой же период, что и в `selectedPeriod`. * Если дата начала `previousPeriod` раньше, чем год назад от текущей даты, она будет приведена к виду: `previousPeriod.begin = текущая дата — 365 дней.` <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Parameter
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createNmReportDetail({});
  console.log(result);
   */
  async createNmReportDetail(data: NmReportDetailRequest): Promise<NmReportDetailResponse> {
    return this.client.post<NmReportDetailResponse>('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', data);
  }

  /**
   * Статистика карточек товаров по дням
   *
   * Метод возвращает статистику карточек товаров по дням. Можно получить данные по добавлениям в корзину, заказам, переходам в карточку товара и так далее.<br><br> Можно получить данные максимум за последнюю неделю. <div class="description_important"> Чтобы получать <a href="/openapi/analytics#tag/Analitika-prodavca-CSV">отчёты за период до года</a>, подпишитесь на <a href='https://seller.wildberries.ru/monetization/jam'>расширенную аналитику Джем</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Parameter
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createDetailHistory({});
  console.log(result);
   */
  async createDetailHistory(data: NmReportDetailHistoryRequest): Promise<NmReportDetailHistoryResponse> {
    return this.client.post<NmReportDetailHistoryResponse>('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail/history', data);
  }

  /**
   * Статистика групп карточек товаров по дням
   *
   * Метод возвращает статистику карточек товаров по дням. Карточки товаров сгруппированы по предметам, брендам и ярлыкам. Можно получить данные по добавлениям в корзину, заказам, переходам в карточку товара и так далее.<br><br> Параметры `brandNames`, `objectIDs`, `tagIDs` могут быть пустыми `[]`, тогда группировка происходит по всем карточкам продавца.<br><br> Произведение количества предметов, брендов, ярлыков в запросе может быть не больше 16.<br><br> Можно получить данные максимум за последнюю неделю. <div class="description_important"> Чтобы получать <a href="/openapi/analytics#tag/Analitika-prodavca-CSV">отчёты за период до года</a>, подпишитесь на <a href='https://seller.wildberries.ru/monetization/jam'>расширенную аналитику Джем</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Parameter
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createGroupedHistory({});
  console.log(result);
   */
  async createGroupedHistory(data: NmReportGroupedHistoryRequest): Promise<NmReportGroupedHistoryResponse> {
    return this.client.post<NmReportGroupedHistoryResponse>('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/grouped/history', data);
  }

  /**
   * Получить список отчётов
   *
   * Метод возвращает список отчётов с расширенной аналитикой продавца. Ответ содержит ID [созданных отчётов](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/post) и статусы генерации. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getNmReportDownloads({});
  console.log(result);
   */
  async getNmReportDownloads(options?: { 'filter[downloadIds]'?: string[] }): Promise<NmReportGetReportsResponse> {
    return this.client.get<NmReportGetReportsResponse>('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads', { params: options });
  }

  /**
   * Создать отчёт
   *
   * Метод создаёт задание на генерацию отчёта с расширенной аналитикой продавца.<br><br> Вы можете создать CSV-версии отчётов по [воронке продаж](/openapi/analytics#tag/Voronka-prodazh) или [параметрам поиска](/openapi/analytics#tag/Poiskovye-zaprosy) с группировкой по: * артикулам WB * предметам, брендам и ярлыкам В отчётах по воронке продаж можно группировать данные по дням, неделям или месяцам.<br><br> Также можете создать CSV-версии отчётов по [текстам поисковых запросов](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1product~1search-texts/post) и [истории остатков](/openapi/analytics#tag/Istoriya-ostatkov).<br><br> Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.<br><br> Если не удалось [получить отчёт](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads~1file~1%7BdownloadId%7D/get), можно создать [повторное задание на генерацию](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads~1retry/post). Также можно [получить список и проверить статусы](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/get) отчётов. <div class="description_important"> Отчёт по <a href="https://seller.wildberries.ru/content-analytics/history-remains">истории остатков</a> — модель <code>StocksReportReq</code> — можно создать без подписки <a href="https://seller.wildberries.ru/monetization/jam">Джем</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createNmReportDownload({});
  console.log(result);
   */
  async createNmReportDownload(data?: SalesFunnelProductReq | SalesFunnelGroupReq | SearchReportGroupReq | SearchReportProductReq | SearchReportTextReq | StocksReportReq): Promise<NmReportCreateReportResponse> {
    return this.client.post<NmReportCreateReportResponse>('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads', data);
  }

  /**
   * Сгенерировать отчёт повторно
   *
   * Метод создает повторное [задание на генерацию](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/post) отчёта с расширенной аналитикой продавца. Необходимо, если при генерации отчёта вы [получили статус](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/get) `FAILED`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createDownloadsRetry({});
  console.log(result);
   */
  async createDownloadsRetry(data: NmReportRetryReportRequest): Promise<NmReportRetryReportResponse> {
    return this.client.post<NmReportRetryReportResponse>('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/retry', data);
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт с расширенной аналитикой продавца по ID [задания на генерацию](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/post). <br><br> Можно получить отчёт, который сгенерирован за последние 48 часов.<br>Отчёт будет загружен внутри архива ZIP в формате CSV. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param downloadId - ID отчёта
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getDownloadsFile('downloadId-value');
  console.log(result);
   */
  async getDownloadsFile(downloadId: string): Promise<unknown> {
    return this.client.get<unknown>(`https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/file/${downloadId}`);
  }

  /**
   * Основная страница
   *
   * Метод формирует набор данных для основной страницы отчёта по поисковым запросам с: - общей информацией - позициями товаров - данными по видимости и переходам в карточку - данными для таблицы по группам Для получения дополнительных данных в таблице используйте отдельный запрос для: - [пагинации по группам](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1table~1groups/post) - [получения по товарам в группе](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1table~1details/post) Дополнительный параметр выбора списка товаров в таблице: - `positionCluster` — средняя позиция в поиске Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createSearchReportReport({});
  console.log(result);
   */
  async createSearchReportReport(data: MainRequest): Promise<CommonResponseProperties & { data: MainResponse }> {
    return this.client.post<CommonResponseProperties & { data: MainResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/search-report/report', data);
  }

  /**
   * Пагинация по группам
   *
   * Метод формирует дополнительные данные к [основному отчёту](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1report/post) с пагинацией по группам. Пагинация возможна только при наличии фильтра по бренду, предмету или ярлыку.<br><br> Дополнительный параметр выбора списка товаров в таблице: - `positionCluster` — средняя позиция в поиске Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createTableGroup({});
  console.log(result);
   */
  async createTableGroup(data: TableGroupRequest): Promise<CommonResponseProperties & { data: TableGroupResponse }> {
    return this.client.post<CommonResponseProperties & { data: TableGroupResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/groups', data);
  }

  /**
   * Пагинация по товарам в группе
   *
   * Метод формирует дополнительные данные к [основному отчёту](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1report/post) с пагинацией по товарам в группе. Пагинация возможна вне зависимости от наличия фильтров.<br><br> Фильтры для пагинации по товарам в группе или без фильтров: - кортеж `subjectId`,`brandName`,`tagId` — фильтр для группы - `nmIds` — фильтр по карточке товара Дополнительный параметр выбора списка товаров: - `positionCluster` — средняя позиция в поиске Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createTableDetail({});
  console.log(result);
   */
  async createTableDetail(data: TableDetailsRequest): Promise<CommonResponseProperties & { data: TableDetailsResponse }> {
    return this.client.post<CommonResponseProperties & { data: TableDetailsResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/details', data);
  }

  /**
   * Поисковые запросы по товару
   *
   * Метод формирует топ поисковых запросов по товару. Параметры выбора поисковых запросов: - `limit` — количество запросов, максимум 30 (для тарифа [Продвинутый](https://seller.wildberries.ru/monetization/tariffs) — 100) - `topOrderBy` — способ выбора топа запросов Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createProductSearchText({});
  console.log(result);
   */
  async createProductSearchText(data: ProductSearchTextsRequest): Promise<CommonResponseProperties & { data: ProductSearchTextsResponse }> {
    return this.client.post<CommonResponseProperties & { data: ProductSearchTextsResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/search-texts', data);
  }

  /**
   * Заказы и позиции по поисковым запросам товара
   *
   * Метод формирует данные для таблицы по количеству заказов и позиций в поиске по запросам покупателя. Данные указаны в рамках периода для [запрошенного товара](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1product~1search-texts/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createProductOrder({});
  console.log(result);
   */
  async createProductOrder(data: ProductOrdersRequest): Promise<CommonResponseProperties & { data: ProductOrdersResponse }> {
    return this.client.post<CommonResponseProperties & { data: ProductOrdersResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/orders', data);
  }

  /**
   * Данные по группам
   *
   * Метод формирует набор данных об остатках по группам товаров. <br><br> Группа товаров описывается кортежем `subjectID, brandName, tagID`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createProductsGroup({});
  console.log(result);
   */
  async createProductsGroup(data: TableGroupRequestSt): Promise<{ data: TableGroupResponseSt }> {
    return this.client.post<{ data: TableGroupResponseSt }>('https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/groups', data);
  }

  /**
   * Данные по товарам
   *
   * Метод формирует набор данных об остатках по товарам. <br><br> Можно получить данные как по отдельным товарам, так и в рамках всего отчёта — если в запросе отсутствуют фильтры: `nmIDs`, `subjectID`, `brandName`, `tagID`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createProductsProduct({});
  console.log(result);
   */
  async createProductsProduct(data: TableProductRequest): Promise<{ data: TableProductResponse }> {
    return this.client.post<{ data: TableProductResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/products', data);
  }

  /**
   * Данные по размерам
   *
   * Метод формирует набор данных об остатках по размерам товара. <br><br> Возможны случаи: 1. Товар имеет размеры и `"includeOffice":true`, тогда в ответе будут данные об остатках по каждому из размеров с вложенной детализацией по складам. 2. Товар имеет размеры и `"includeOffice":false`, тогда в ответе будут данные об остатках по каждому из размеров без вложенной детализации по складам. 3. Товар не имеет размера и `"includeOffice":true`, тогда в ответе будет детализация по складам. Без данных об остатках по каждому из размеров. 4. Товар не имеет размера и `"includeOffice":false`, тогда тело ответа будет пустым.<br></br> Товар не имеет размера, если у него единственный размер с `"techSize":"0"`. В ответах метода получения данных по [товарам](/openapi/analytics#tag/Istoriya-ostatkov/paths/~1api~1v2~1stocks-report~1products~1products/post) у таких товаров `"hasSizes":false`.<br></br> Данные по складам Маркетплейс (FBS) приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам — эти записи будут с `"regionName":"Маркетплейс"` и `"officeName":""`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createProductsSize({});
  console.log(result);
   */
  async createProductsSize(data: TableSizeRequest): Promise<{ data: TableSizeResponse }> {
    return this.client.post<{ data: TableSizeResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/sizes', data);
  }

  /**
   * Данные по складам
   *
   * Метод формирует набор данных об остатках по складам. <br><br> Данные по складам Маркетплейс (FBS) приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам — эти записи будут с `"regionName":"Маркетплейс"` и `"offices":[]`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.createStocksReportOffice({});
  console.log(result);
   */
  async createStocksReportOffice(data: TableShippingOfficeRequest): Promise<{ data: TableShippingOfficeResponse }> {
    return this.client.post<{ data: TableShippingOfficeResponse }>('https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/offices', data);
  }

}