/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/11-analytics.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  CommonResponseProperties,
  MainRequest,
  MainResponse,
  NmReportCreateReportResponse,
  NmReportDetailHistoryRequest,
  NmReportDetailHistoryResponse,
  NmReportDetailRequest,
  NmReportDetailResponse,
  NmReportGetReportsResponse,
  NmReportGroupedHistoryRequest,
  NmReportGroupedHistoryResponse,
  NmReportRetryReportRequest,
  NmReportRetryReportResponse,
  ProductOrdersRequest,
  ProductOrdersResponse,
  ProductSearchTextsRequest,
  ProductSearchTextsResponse,
  SalesFunnelGroupReq,
  SalesFunnelProductReq,
  SalesFunnelProductsRequest,
  SalesFunnelProductsResponse,
  SalesFunnelProductsHistoryRequest,
  SalesFunnelProductsHistoryResponse,
  SalesFunnelGroupedHistoryRequest,
  SalesFunnelGroupedHistoryResponse,
  SearchReportGroupReq,
  SearchReportProductReq,
  SearchReportTextReq,
  StocksReportReq,
  TableDetailsRequest,
  TableDetailsResponse,
  TableGroupRequest,
  TableGroupRequestSt,
  TableGroupResponse,
  TableGroupResponseSt,
  TableProductRequest,
  TableProductResponse,
  TableShippingOfficeRequest,
  TableShippingOfficeResponse,
  TableSizeRequest,
  TableSizeResponse,
} from '../../types/analytics.types';

export class AnalyticsModule {
  constructor(private client: BaseClient) {}

  /**
   * @deprecated Use {@link getSalesFunnelProducts} instead. v2 endpoint is dead (404).
   * Maps v2 parameters to v3 format and delegates to getSalesFunnelProducts.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  async createNmReportDetail(data: NmReportDetailRequest): Promise<NmReportDetailResponse> {
    const page = data.page || 1;
    const v3Request: SalesFunnelProductsRequest = {
      selectedPeriod: { start: data.period.begin ?? '', end: data.period.end ?? '' },
      ...(data.nmIDs ? { nmIds: data.nmIDs } : {}),
      ...(data.objectIDs ? { subjectIds: data.objectIDs } : {}),
      ...(data.tagIDs ? { tagIds: data.tagIDs } : {}),
      ...(data.brandNames ? { brandNames: data.brandNames } : {}),
      ...(data.orderBy ? { orderBy: data.orderBy as SalesFunnelProductsRequest['orderBy'] } : {}),
      limit: 50,
      offset: (page - 1) * 50,
    };
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    return this.getSalesFunnelProducts(v3Request) as unknown as Promise<NmReportDetailResponse>;
  }

  /**
   * @deprecated Use {@link getSalesFunnelProductsHistory} instead. v2 endpoint is dead (404).
   * Maps v2 parameters to v3 format and delegates to getSalesFunnelProductsHistory.
   */
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  async createDetailHistory(
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    data: NmReportDetailHistoryRequest
    // eslint-disable-next-line @typescript-eslint/no-deprecated
  ): Promise<NmReportDetailHistoryResponse> {
    const v3Request: SalesFunnelProductsHistoryRequest = {
      selectedPeriod: { start: data.period.begin ?? '', end: data.period.end ?? '' },
      nmIds: data.nmIDs,
      ...(data.aggregationLevel
        ? {
            aggregationLevel:
              data.aggregationLevel as SalesFunnelProductsHistoryRequest['aggregationLevel'],
          }
        : {}),
    };
    /* eslint-disable @typescript-eslint/no-deprecated */
    return this.getSalesFunnelProductsHistory(
      v3Request
    ) as unknown as Promise<NmReportDetailHistoryResponse>;
    /* eslint-enable @typescript-eslint/no-deprecated */
  }

  /**
   * @deprecated Use {@link getSalesFunnelGroupedHistory} instead. v2 endpoint is dead (404).
   * Maps v2 parameters to v3 format and delegates to getSalesFunnelGroupedHistory.
   */
  /* eslint-disable @typescript-eslint/no-deprecated */
  async createGroupedHistory(
    data: NmReportGroupedHistoryRequest
  ): Promise<NmReportGroupedHistoryResponse> {
    const v3Request: SalesFunnelGroupedHistoryRequest = {
      selectedPeriod: { start: data.period.begin ?? '', end: data.period.end ?? '' },
      ...(data.objectIDs ? { subjectIds: data.objectIDs } : {}),
      ...(data.tagIDs ? { tagIds: data.tagIDs } : {}),
      ...(data.brandNames ? { brandNames: data.brandNames } : {}),
      ...(data.aggregationLevel
        ? {
            aggregationLevel:
              data.aggregationLevel as SalesFunnelGroupedHistoryRequest['aggregationLevel'],
          }
        : {}),
    };
    return this.getSalesFunnelGroupedHistory(
      v3Request
    ) as unknown as Promise<NmReportGroupedHistoryResponse>;
  }
  /* eslint-enable @typescript-eslint/no-deprecated */

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
  async getNmReportDownloads(options?: {
    'filter[downloadIds]'?: string[];
  }): Promise<NmReportGetReportsResponse> {
    return this.client.get<NmReportGetReportsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads',
      { params: options }
    );
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
  async createNmReportDownload(
    data?:
      | SalesFunnelProductReq
      | SalesFunnelGroupReq
      | SearchReportGroupReq
      | SearchReportProductReq
      | SearchReportTextReq
      | StocksReportReq
  ): Promise<NmReportCreateReportResponse> {
    return this.client.post<NmReportCreateReportResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads',
      data
    );
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
  async createDownloadsRetry(
    data: NmReportRetryReportRequest
  ): Promise<NmReportRetryReportResponse> {
    return this.client.post<NmReportRetryReportResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/retry',
      data
    );
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
    return this.client.get<unknown>(
      `https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/file/${downloadId}`
    );
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
  async createSearchReportReport(
    data: MainRequest
  ): Promise<CommonResponseProperties & { data: MainResponse }> {
    return this.client.post<CommonResponseProperties & { data: MainResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/report',
      data
    );
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
  async createTableGroup(
    data: TableGroupRequest
  ): Promise<CommonResponseProperties & { data: TableGroupResponse }> {
    return this.client.post<CommonResponseProperties & { data: TableGroupResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/groups',
      data
    );
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
  async createTableDetail(
    data: TableDetailsRequest
  ): Promise<CommonResponseProperties & { data: TableDetailsResponse }> {
    return this.client.post<CommonResponseProperties & { data: TableDetailsResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/details',
      data
    );
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
  async createProductSearchText(
    data: ProductSearchTextsRequest
  ): Promise<CommonResponseProperties & { data: ProductSearchTextsResponse }> {
    return this.client.post<CommonResponseProperties & { data: ProductSearchTextsResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/search-texts',
      data
    );
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
  async createProductOrder(
    data: ProductOrdersRequest
  ): Promise<CommonResponseProperties & { data: ProductOrdersResponse }> {
    return this.client.post<CommonResponseProperties & { data: ProductOrdersResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/orders',
      data
    );
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
    return this.client.post<{ data: TableGroupResponseSt }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/groups',
      data
    );
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
    return this.client.post<{ data: TableProductResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/products',
      data
    );
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
    return this.client.post<{ data: TableSizeResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/sizes',
      data
    );
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
  async createStocksReportOffice(
    data: TableShippingOfficeRequest
  ): Promise<{ data: TableShippingOfficeResponse }> {
    return this.client.post<{ data: TableShippingOfficeResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/offices',
      data
    );
  }

  // ============ v3 Sales Funnel Methods ============

  /**
   * Статистика карточек товаров за период (v3)
   *
   * Возвращает отчёт о товарах с ключевыми показателями — переходы в карточку,
   * добавления в корзину, заказы — за текущий и прошлый периоды.
   *
   * Rate limit: 3 requests/minute, 20-second interval, 3-request burst
   *
   * @param data - Request parameters
   * @returns Sales funnel products statistics
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh}
   * @example
   * const result = await sdk.analytics.getSalesFunnelProducts({
   *   selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
   *   orderBy: { field: 'orderCount', mode: 'desc' },
   *   limit: 10,
   *   offset: 0,
   * });
   * console.log(result.products);
   */
  async getSalesFunnelProducts(
    data: SalesFunnelProductsRequest
  ): Promise<SalesFunnelProductsResponse> {
    return this.client.post<SalesFunnelProductsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v3/sales-funnel/products',
      data
    );
  }

  /**
   * Статистика карточек товаров по дням (v3)
   *
   * Возвращает статистику карточек товаров по дням или неделям.
   *
   * Rate limit: 3 requests/minute, 20-second interval, 3-request burst
   *
   * @param data - Request parameters
   * @returns Products history statistics
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh}
   * @example
   * const result = await sdk.analytics.getSalesFunnelProductsHistory({
   *   selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
   *   nmIds: [268913787],
   *   aggregationLevel: 'day',
   * });
   * console.log(result);
   */
  async getSalesFunnelProductsHistory(
    data: SalesFunnelProductsHistoryRequest
  ): Promise<SalesFunnelProductsHistoryResponse> {
    return this.client.post<SalesFunnelProductsHistoryResponse>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v3/sales-funnel/products/history',
      data
    );
  }

  /**
   * Статистика групп карточек товаров по дням (v3)
   *
   * Возвращает статистику карточек товаров по дням, сгруппированных по предметам, брендам и ярлыкам.
   *
   * Rate limit: 3 requests/minute, 20-second interval, 3-request burst
   *
   * @param data - Request parameters
   * @returns Grouped history statistics
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh}
   * @example
   * const result = await sdk.analytics.getSalesFunnelGroupedHistory({
   *   selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
   *   aggregationLevel: 'day',
   * });
   * console.log(result);
   */
  async getSalesFunnelGroupedHistory(
    data: SalesFunnelGroupedHistoryRequest
  ): Promise<SalesFunnelGroupedHistoryResponse> {
    return this.client.post<SalesFunnelGroupedHistoryResponse>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v3/sales-funnel/grouped/history',
      data
    );
  }
}
