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
    console.warn(
      '[Wildberries SDK] FINAL WARNING: createNmReportDetail() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to getSalesFunnelProducts(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
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
    console.warn(
      '[Wildberries SDK] FINAL WARNING: createDetailHistory() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to getSalesFunnelProductsHistory(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
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
    console.warn(
      '[Wildberries SDK] FINAL WARNING: createGroupedHistory() will be REMOVED in the NEXT version (v3.0.0). ' +
        'This is your last chance to migrate to getSalesFunnelGroupedHistory(). ' +
        'See: https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/guides/migration-v3.md'
    );
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
   * Метод возвращает список отчётов с расширенной аналитикой продавца. Ответ содержит ID созданных отчётов и статусы генерации.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV}
   * @example
   * const result = await sdk.analytics.getNmReportDownloads({});
   * console.log(result);
   */
  async getNmReportDownloads(options?: {
    'filter[downloadIds]'?: string[];
  }): Promise<NmReportGetReportsResponse> {
    return this.client.get<NmReportGetReportsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads',
      { params: options, rateLimitKey: 'analytics.nmReportDownloads' }
    );
  }

  /**
   * Создать отчёт
   *
   * Метод создаёт задание на генерацию отчёта с расширенной аналитикой продавца.
   * Вы можете создать CSV-версии отчётов по воронке продаж или параметрам поиска с группировкой по артикулам WB, предметам, брендам и ярлыкам.
   * В отчётах по воронке продаж можно группировать данные по дням, неделям или месяцам.
   * Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @remarks Daily limit: 20 reports per day per seller account.
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV}
   * @example
   * const result = await sdk.analytics.createNmReportDownload({});
   * console.log(result);
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
      data,
      { rateLimitKey: 'analytics.postNmReportDownloads' }
    );
  }

  /**
   * Сгенерировать отчёт повторно
   *
   * Метод создает повторное задание на генерацию отчёта с расширенной аналитикой продавца.
   * Необходимо, если при генерации отчёта вы получили статус `FAILED`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV}
   * @example
   * const result = await sdk.analytics.createDownloadsRetry({});
   * console.log(result);
   */
  async createDownloadsRetry(
    data: NmReportRetryReportRequest
  ): Promise<NmReportRetryReportResponse> {
    return this.client.post<NmReportRetryReportResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/retry',
      data,
      { rateLimitKey: 'analytics.postNmReportDownloadsRetry' }
    );
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт с расширенной аналитикой продавца по ID задания на генерацию.
   * Можно получить отчёт, который сгенерирован за последние 48 часов.
   * Отчёт будет загружен внутри архива ZIP в формате CSV.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param downloadId - ID отчёта (UUID format)
   * @returns Успешно - ZIP архив с CSV файлом
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV}
   * @example
   * const result = await sdk.analytics.getDownloadsFile('downloadId-value');
   * console.log(result);
   */
  async getDownloadsFile(downloadId: string): Promise<ArrayBuffer> {
    return this.client.get<ArrayBuffer>(
      `https://seller-analytics-api.wildberries.ru/api/v2/nm-report/downloads/file/${downloadId}`,
      { rateLimitKey: 'analytics.nmReportDownloadsFile' }
    );
  }

  /**
   * Основная страница
   *
   * Метод формирует набор данных для основной страницы отчёта по поисковым запросам с общей информацией, позициями товаров, данными по видимости и переходам в карточку, данными для таблицы по группам.
   * Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy}
   * @example
   * const result = await sdk.analytics.createSearchReportReport({});
   * console.log(result);
   */
  async createSearchReportReport(
    data: MainRequest
  ): Promise<CommonResponseProperties & { data: MainResponse }> {
    return this.client.post<CommonResponseProperties & { data: MainResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/report',
      data,
      { rateLimitKey: 'analytics.postSearchReportReport' }
    );
  }

  /**
   * Пагинация по группам
   *
   * Метод формирует дополнительные данные к основному отчёту с пагинацией по группам.
   * Пагинация возможна только при наличии фильтра по бренду, предмету или ярлыку.
   * Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy}
   * @example
   * const result = await sdk.analytics.createTableGroup({});
   * console.log(result);
   */
  async createTableGroup(
    data: TableGroupRequest
  ): Promise<CommonResponseProperties & { data: TableGroupResponse }> {
    return this.client.post<CommonResponseProperties & { data: TableGroupResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/groups',
      data,
      { rateLimitKey: 'analytics.postSearchReportTableGroups' }
    );
  }

  /**
   * Пагинация по товарам в группе
   *
   * Метод формирует дополнительные данные к основному отчёту с пагинацией по товарам в группе.
   * Пагинация возможна вне зависимости от наличия фильтров.
   * Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy}
   * @example
   * const result = await sdk.analytics.createTableDetail({});
   * console.log(result);
   */
  async createTableDetail(
    data: TableDetailsRequest
  ): Promise<CommonResponseProperties & { data: TableDetailsResponse }> {
    return this.client.post<CommonResponseProperties & { data: TableDetailsResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/table/details',
      data,
      { rateLimitKey: 'analytics.postSearchReportTableDetails' }
    );
  }

  /**
   * Поисковые запросы по товару
   *
   * Метод формирует топ поисковых запросов по товару.
   * Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy}
   * @example
   * const result = await sdk.analytics.createProductSearchText({});
   * console.log(result);
   */
  async createProductSearchText(
    data: ProductSearchTextsRequest
  ): Promise<CommonResponseProperties & { data: ProductSearchTextsResponse }> {
    return this.client.post<CommonResponseProperties & { data: ProductSearchTextsResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/search-texts',
      data,
      { rateLimitKey: 'analytics.postSearchReportProductSearchTexts' }
    );
  }

  /**
   * Заказы и позиции по поисковым запросам товара
   *
   * Метод формирует данные для таблицы по количеству заказов и позиций в поиске по запросам покупателя.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy}
   * @example
   * const result = await sdk.analytics.createProductOrder({});
   * console.log(result);
   */
  async createProductOrder(
    data: ProductOrdersRequest
  ): Promise<CommonResponseProperties & { data: ProductOrdersResponse }> {
    return this.client.post<CommonResponseProperties & { data: ProductOrdersResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/search-report/product/orders',
      data,
      { rateLimitKey: 'analytics.postSearchReportProductOrders' }
    );
  }

  /**
   * Данные по группам
   *
   * Метод формирует набор данных об остатках по группам товаров.
   * Группа товаров описывается кортежем `subjectID, brandName, tagID`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov}
   * @example
   * const result = await sdk.analytics.createProductsGroup({});
   * console.log(result);
   */
  async createProductsGroup(data: TableGroupRequestSt): Promise<{ data: TableGroupResponseSt }> {
    return this.client.post<{ data: TableGroupResponseSt }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/groups',
      data,
      { rateLimitKey: 'analytics.postStocksReportProductsGroups' }
    );
  }

  /**
   * Данные по товарам
   *
   * Метод формирует набор данных об остатках по товарам.
   * Можно получить данные как по отдельным товарам, так и в рамках всего отчёта — если в запросе отсутствуют фильтры: `nmIDs`, `subjectID`, `brandName`, `tagID`.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov}
   * @example
   * const result = await sdk.analytics.createProductsProduct({});
   * console.log(result);
   */
  async createProductsProduct(data: TableProductRequest): Promise<{ data: TableProductResponse }> {
    return this.client.post<{ data: TableProductResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/products',
      data,
      { rateLimitKey: 'analytics.postStocksReportProductsProducts' }
    );
  }

  /**
   * Данные по размерам
   *
   * Метод формирует набор данных об остатках по размерам товара.
   * Товар не имеет размера, если у него единственный размер с `"techSize":"0"`.
   * Данные по складам Маркетплейс (FBS) приходят в агрегированном виде.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov}
   * @example
   * const result = await sdk.analytics.createProductsSize({});
   * console.log(result);
   */
  async createProductsSize(data: TableSizeRequest): Promise<{ data: TableSizeResponse }> {
    return this.client.post<{ data: TableSizeResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/products/sizes',
      data,
      { rateLimitKey: 'analytics.postStocksReportProductsSizes' }
    );
  }

  /**
   * Данные по складам
   *
   * Метод формирует набор данных об остатках по складам.
   * Данные по складам Маркетплейс (FBS) приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам.
   *
   * Rate limit: 3 requests/minute, 20-second interval, burst 3
   *
   * @param data - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov}
   * @example
   * const result = await sdk.analytics.createStocksReportOffice({});
   * console.log(result);
   */
  async createStocksReportOffice(
    data: TableShippingOfficeRequest
  ): Promise<{ data: TableShippingOfficeResponse }> {
    return this.client.post<{ data: TableShippingOfficeResponse }>(
      'https://seller-analytics-api.wildberries.ru/api/v2/stocks-report/offices',
      data,
      { rateLimitKey: 'analytics.postStocksReportOffices' }
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
      data,
      { rateLimitKey: 'analytics.postSalesFunnelProducts' }
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
      data,
      { rateLimitKey: 'analytics.postSalesFunnelProductsHistory' }
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
      data,
      { rateLimitKey: 'analytics.postSalesFunnelGroupedHistory' }
    );
  }
}
