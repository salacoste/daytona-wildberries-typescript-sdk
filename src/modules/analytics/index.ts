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
  NmReportGetReportsResponse,
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
  InventoryHistoryReportReq,
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
  WbWarehousesStockRequest,
  WbWarehousesStockResponse,
  ItemRatingRequest,
  ItemRatingResponseWrapper,
  ItemRatingV2Request,
  ItemRatingV2ResponseWrapper,
} from '../../types/analytics.types';

export class AnalyticsModule {
  constructor(private client: BaseClient) {}

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
      | InventoryHistoryReportReq
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

  /**
   * Текущие остатки на складах WB
   *
   * Возвращает актуальные остатки товаров на складах Wildberries.
   * Данные обновляются раз в 30 минут. Одна строка = один размер на одном складе.
   * Результаты отсортированы по возрастанию nmId.
   *
   * Доступен только для токенов типа Personal и Service.
   *
   * **WB expanded access:** now also available to registered/authorized services
   * via a basic token + secret (not just personal/service tokens).
   *
   * **Заменяет устаревший метод** `GET /api/v1/supplier/stocks`,
   * который будет отключён 23 июня 2026.
   *
   * Rate limit: 3 requests per minute, 20-second interval, burst 1
   *
   * @param data - Filter and pagination parameters (all optional)
   * @param data.nmIds - WB articles to filter (0-1000, empty = all)
   * @param data.chrtIds - Size IDs (only for articles in nmIds)
   * @param data.limit - Rows in response (max 250000, default 250000)
   * @param data.offset - Skip N results for pagination (default 0)
   * @returns Current inventory with warehouse IDs, region names, quantities
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since 3.4.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/analytics#tag/Istoriya-ostatkov/operation/postV1StocksReportWbWarehouses}
   * @see [Stocks History guide](https://dev.wildberries.ru/knowledge-base/articles/019ef14c-c72d-717a-9fc2-b0b2f361dc80)
   * @example
   * ```typescript
   * // Get all inventory
   * const stock = await sdk.analytics.getWbWarehousesStock();
   * for (const item of stock.data.items) {
   *   console.log(`${item.warehouseName} (${item.regionName}): ${item.quantity} шт.`);
   * }
   *
   * // With filters and pagination
   * const page = await sdk.analytics.getWbWarehousesStock({
   *   nmIds: [395996251],
   *   limit: 100,
   *   offset: 0,
   * });
   * ```
   */
  async getWbWarehousesStock(data?: WbWarehousesStockRequest): Promise<WbWarehousesStockResponse> {
    return this.client.post<WbWarehousesStockResponse>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v1/stocks-report/wb-warehouses',
      data ?? {},
      { rateLimitKey: 'analytics.postStocksReportWbWarehouses' }
    );
  }

  /**
   * Get the v2 item-rating report, including catalog visibility.
   *
   * Use `onlyShadowedNms: true` to replace the deprecated
   * `reports.getBannedProductsShadowed()` report. Each returned item includes
   * `isShadowed`, and the per-product array is named `items` (not the v1 `cards`).
   *
   * Rate limit: 3 requests per minute, 20s interval, burst 3.
   *
   * @param data - V2 report filters, sorting, and pagination.
   * @returns Seller rating, feedback summary, and per-product rows with `isShadowed`.
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @since 4.1.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV2ItemRating}
   * @example
   * ```typescript
   * const hiddenProducts = await sdk.analytics.getItemRatingV2({
   *   currentPeriod: { start: '2026-07-01', end: '2026-07-18' },
   *   onlyShadowedNms: true,
   *   orderBy: { field: 'feedbackCount', mode: 'desc' },
   *   offset: 0,
   * });
   * console.log(hiddenProducts.data.items[0]?.isShadowed);
   * ```
   */
  async getItemRatingV2(data: ItemRatingV2Request): Promise<ItemRatingV2ResponseWrapper> {
    return this.client.post<ItemRatingV2ResponseWrapper>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v2/item-rating',
      data,
      { rateLimitKey: 'analytics.itemRatingV2' }
    );
  }

  /**
   * Get item rating with feedback distribution.
   *
   * Returns the seller rating, a feedback-increase summary (total + per-star 1-5
   * with optional dynamics vs. the previous period), and a per-item breakdown
   * of feedback counts and star distribution.
   *
   * Rate limit: 3 requests per minute, 20s interval, burst 3.
   *
   * @param data - Request parameters. `currentPeriod`, `orderBy`, and `offset` are required.
   * Pass `pastPeriod` to enable compare mode (yields `dynamics` fields in the response).
   * @param data.currentPeriod - Current period (`start`/`end` as `YYYY-MM-DD`).
   * @param data.pastPeriod - Previous period for comparison (optional — compare mode).
   * @param data.nmIds - WB item numbers filter (max 50).
   * @param data.subjectIds - Subcategory IDs filter (max 50).
   * @param data.brandNames - Brand names filter (max 50).
   * @param data.tagIds - Label IDs filter (max 50).
   * @param data.isNotIncludeNMsWithoutSales - Exclude items without sales (default `false`).
   * @param data.orderBy - Sorting parameters (`field` + `mode`).
   * @param data.limit - Items per response (default 100, max 1000).
   * @param data.offset - Skip N results for pagination (required).
   * @returns Seller rating, feedback-increase summary, and per-item array.
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @deprecated Scheduled for removal by Wildberries on 2026-07-30. Use
   * {@link AnalyticsModule.getItemRatingV2}; note the v2 response uses `items`
   * instead of `cards` and the no-sales filter is `isNotIncludeNmsWithoutSales`.
   * @since 3.16.0
   * @see {@link https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV1ItemRating}
   * @example
   * ```typescript
   * // Period mode (single period, no dynamics)
   * const rating = await sdk.analytics.getItemRating({
   *   currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
   *   orderBy: { field: 'feedbackCount', mode: 'desc' },
   *   offset: 0,
   *   limit: 100,
   * });
   * console.log(rating.data.sellerRating.current); // e.g. 3.56
   *
   * // Compare mode (current + past period — yields `dynamics` fields)
   * const compared = await sdk.analytics.getItemRating({
   *   currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
   *   pastPeriod: { start: '2026-02-08', end: '2026-02-08' },
   *   nmIds: [162579635, 166699779],
   *   orderBy: { field: 'fiveStar', mode: 'desc' },
   *   offset: 0,
   * });
   * console.log(compared.data.feedbackIncrease.fiveStar.dynamics); // % change vs past period
   * ```
   */
  async getItemRating(data: ItemRatingRequest): Promise<ItemRatingResponseWrapper> {
    return this.client.post<ItemRatingResponseWrapper>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v1/item-rating',
      data,
      { rateLimitKey: 'analytics.itemRating' }
    );
  }
}
// Re-export all analytics types from the subpath import 'daytona-wildberries-typescript-sdk/analytics'.
// Without these, consumers can import the module class but cannot access type definitions.
// Caught by DX integration test for v3.6.0; generated as explicit list because `export type *`
// did not propagate through the build chain in v3.6.1.
// @since v3.6.1
export type {
  MainRequest,
  MainResponse,
  CommonInfo,
  PositionInfo,
  SearchReportPositionChartItem,
  SearchReportPositionClusters,
  VisibilityInfo,
  TableGroupItem,
  TableProductItem,
  TableGroupRequest,
  TableGroupResponse,
  TableDetailsRequest,
  TableDetailsResponse,
  ProductSearchTextsRequest,
  ProductSearchTextsResponse,
  TableSearchTextItem,
  ProductOrdersRequest,
  ProductOrdersResponse,
  ProductOrdersTextItem,
  ProductOrdersMetrics,
  PositionCluster,
  OrderBy,
  OrderByMainAndDetails,
  OrderByGrTe,
  TextLimit,
  StandardTariff,
  AdvancedTariff,
  Date,
  PeriodOrdersRequest,
  Period,
  PastPeriod,
  CommonResponseProperties,
  ErrorObject400,
  ErrorObject403,
  ErrorObject,
  ResponseError,
  SalesFunnelProductReq,
  SalesFunnelGroupReq,
  SearchReportGroupReq,
  SearchReportProductReq,
  SearchReportTextReq,
  StocksReportReq,
  InventoryHistoryReportReq,
  NmReportRetryReportRequest,
  NmReportCreateReportResponse,
  NmReportGetReportsResponse,
  NmReportRetryReportResponse,
  Response429Download,
  Response429DownloadDaily,
  TableGroupRequestSt,
  CommonReportFilters,
  PeriodSt,
  StockType,
  AvailabilityFilters,
  TableOrderBy,
  TableGroupField,
  OrderByMode,
  TableGroupResponseSt,
  TableGroups,
  TableGroupItemSt,
  TableCommonMetrics,
  FloatGraphByPeriodItem,
  TableProductItemSt,
  TableProductRequest,
  CommonProductFilters,
  TableProductResponse,
  TableSizeRequest,
  CommonSizeFilters,
  TableSizeResponse,
  TableOfficeItem,
  TableShippingOfficeRequest,
  CommonShippingOfficeFilters,
  TableShippingOfficeResponse,
  TableShippingOfficeItem,
  TableShippingOfficeMetrics,
  DatePeriod,
  AggregationLevel,
  SalesFunnelOrderBy,
  SalesFunnelTag,
  SalesFunnelTimeToReady,
  SalesFunnelConversions,
  SalesFunnelWbClubMetrics,
  SalesFunnelWbClubMetricsDynamic,
  SalesFunnelProductsRequest,
  SalesFunnelProductsHistoryRequest,
  SalesFunnelGroupedHistoryRequest,
  SalesFunnelProduct,
  SalesFunnelHistoryProduct,
  SalesFunnelStatistic,
  SalesFunnelComparison,
  SalesFunnelStatistics,
  SalesFunnelHistory,
  SalesFunnelProductsResponse,
  SalesFunnelProductsHistoryResponse,
  SalesFunnelGroupedHistoryResponse,
  WbWarehousesStockRequest,
  WbWarehouseStockItem,
  WbWarehousesStockResponse,
  ItemRatingRequest,
  ItemRatingResponse,
  ItemRatingResponseWrapper,
  ItemRatingV2Request,
  ItemRatingV2Response,
  ItemRatingV2ResponseWrapper,
  DistributionTableItemV2,
  DistributionFeedbackRatingV2,
  PeriodItemRating,
  PastPeriodItemRating,
  OrderByItemRating,
  ItemRatingOrderByField,
  ItemRatingOrderByMode,
  TableItemFloat,
  FeedbacksIncreaseItem,
  ItemRatingStarMetric,
  DistributionTableItem,
  TableItemBaseCommon,
  DistributionTableIndicators,
  DistributionTableIndicator,
  DistributionFeedbackRating,
} from '../../types/analytics.types';
