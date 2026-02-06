/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/12-reports.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  AcceptanceReportDownloadItem,
  AntifraudDetailsResponse,
  BannedProductsBlockedResponse,
  BannedProductsShadowedResponse,
  BrandShareBrandsResponse,
  BrandShareParentSubjectsResponse,
  BrandShareResponse,
  CreateTaskResponse,
  DeductionsParams,
  DeductionsResponse,
  ExciseReportRequest,
  ExciseReportResponse,
  GetTasksResponse,
  GoodsLabelingResponse,
  GoodsReturnResponse,
  IncomesItem,
  Measurement,
  MeasurementPenaltiesParams,
  MeasurementPenaltiesResponse,
  OrdersItem,
  Penalty,
  RegionSaleResponse,
  ResponsePaidStorage,
  SalesItem,
  StocksItem,
  WarehouseMeasurementsV2Params,
  WarehouseMeasurementsV2Response,
  WarehouseRemainsDownloadItem,
} from '../../types/reports.types';

export class ReportsModule {
  constructor(private client: BaseClient) {}

  /**
   * Поставки
   *
   * Метод возвращает количество поставок товаров для хранения на складах WB.
   *
   * @deprecated This method is deprecated per swagger spec and will be removed on 11 March 2026.
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.reports.getSupplierIncomes({ dateFrom: '2026-01-01' });
   * console.log(result);
   */
  async getSupplierIncomes(options?: { dateFrom: string }): Promise<IncomesItem[]> {
    console.warn(
      '[WB SDK] getSupplierIncomes() is deprecated and will be removed on 11 March 2026.'
    );
    return this.client.get<IncomesItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/incomes',
      { params: options, rateLimitKey: 'reports.supplierIncomes' }
    );
  }

  /**
   * Склады
   *
   * Метод возвращает количество остатков товаров на складах WB.<br>Данные обновляются раз в 30 минут. <br><br> Для одного ответа в системе установлено условное ограничение 60000 строк. Поэтому, чтобы получить все остатки, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom` используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все остатки уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getSupplierStocks({});
  console.log(result);
   */
  async getSupplierStocks(options?: { dateFrom: string }): Promise<StocksItem[]> {
    return this.client.get<StocksItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/stocks',
      { params: options, rateLimitKey: 'reports.supplierStocks' }
    );
  }

  /**
   * Заказы
   *
   * Метод возвращает информацию обо всех заказах.<br>Данные обновляются раз в 30 минут.<br><br> 1 строка = 1 заказ = 1 cборочное задание = 1 единица товара.<br>Для определения заказа рекомендуем использовать поле `srid`.<br><br> Информация о заказе хранится 90 дней с момента оформления.<br><br> Для одного ответа на запрос с `flag=0` или без `flag` в системе установлено условное ограничение 80000 строк. Поэтому, чтобы получить все заказы, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom` используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все заказы уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getSupplierOrders({});
  console.log(result);
   */
  async getSupplierOrders(options?: { dateFrom: string; flag?: number }): Promise<OrdersItem[]> {
    return this.client.get<OrdersItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/orders',
      { params: options, rateLimitKey: 'reports.supplierOrders' }
    );
  }

  /**
   * Продажи
   *
   * Метод возвращает информацию о продажах и возвратах.<br>Данные обновляются раз в 30 минут.<br><br> 1 строка = 1 заказ = 1 cборочное задание = 1 единица товара.<br>Для определения заказа рекомендуем использовать поле `srid`.<br><br> Информация о заказе хранится 90 дней с момента оформления.<br><br> Для одного ответа на запрос с `flag=0` или без `flag` в системе установлено условное ограничение 80000 строк. Поэтому, чтобы получить все продажи и возвраты, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom `используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все продажи и возвраты уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getSupplierSales({});
  console.log(result);
   */
  async getSupplierSales(options?: { dateFrom: string; flag?: number }): Promise<SalesItem[]> {
    return this.client.get<SalesItem[]>(
      'https://statistics-api.wildberries.ru/api/v1/supplier/sales',
      { params: options, rateLimitKey: 'reports.supplierSales' }
    );
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт с [операциями по товарам с обязательной маркировкой](https://seller.wildberries.ru/analytics-reports/excise-report).<br><br> Данный отчёт можно сохранить в [формате таблиц](https://dev.wildberries.ru/cases/1). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 часов | 10 запросов | 30 минут | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @param [data] - Request body data
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.createAnalyticsExciseReport({}, {});
  console.log(result);
   */
  async createAnalyticsExciseReport(
    options?: { dateFrom: string; dateTo: string },
    data?: ExciseReportRequest
  ): Promise<ExciseReportResponse> {
    return this.client.post<ExciseReportResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report',
      data,
      { params: options, rateLimitKey: 'reports.postAnalyticsExciseReport' }
    );
  }

  /**
   * Создать отчёт
   *
   * Метод создаёт [задание на генерацию](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1status/get) отчёта об [остатках на складах WB](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get).<br><br> Параметры `groupBy` и `filter` (группировки и фильтры) можно задать в любой комбинации — аналогично [версии](https://seller.wildberries.ru/analytics-reports/warehouse-remains) в личном кабинете. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.warehouseRemains({});
  console.log(result);
   */
  async warehouseRemains(options?: {
    locale?: string;
    groupByBrand?: boolean;
    groupBySubject?: boolean;
    groupBySa?: boolean;
    groupByNm?: boolean;
    groupByBarcode?: boolean;
    groupBySize?: boolean;
    filterPics?: number;
    filterVolume?: number;
  }): Promise<CreateTaskResponse> {
    return this.client.get<CreateTaskResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains',
      { params: options, rateLimitKey: 'reports.warehouse_remains' }
    );
  }

  /**
   * Проверить статус задания на генерацию отчёта об остатках на складах WB
   *
   * @param task_id - ID задания на генерацию
   * @returns Статус задания
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.reports.getWarehouseRemainsTaskStatus('task-uuid');
   * console.log(result.data?.status);
   */
  async getWarehouseRemainsTaskStatus(task_id: string): Promise<GetTasksResponse> {
    return this.client.get<GetTasksResponse>(
      `https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/${task_id}/status`,
      { rateLimitKey: 'reports.warehouse_remainsTasksStatus' }
    );
  }

  /**
   * @deprecated Use getWarehouseRemainsTaskStatus() instead.
   */
  async getTasksStatu(task_id: string): Promise<GetTasksResponse> {
    console.warn(
      '[WB SDK] getTasksStatu() is deprecated. Use getWarehouseRemainsTaskStatus() instead.'
    );
    return this.getWarehouseRemainsTaskStatus(task_id);
  }

  /**
   * Получить отчёт об остатках на складах WB
   *
   * @param task_id - ID задания на генерацию
   * @returns Данные отчёта
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.reports.downloadWarehouseRemainsReport('task-uuid');
   * console.log(result);
   */
  async downloadWarehouseRemainsReport(task_id: string): Promise<WarehouseRemainsDownloadItem[]> {
    return this.client.get<WarehouseRemainsDownloadItem[]>(
      `https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/${task_id}/download`,
      { rateLimitKey: 'reports.warehouse_remainsTasksDownload' }
    );
  }

  /**
   * @deprecated Use downloadWarehouseRemainsReport() instead.
   */
  async getTasksDownload(task_id: string): Promise<WarehouseRemainsDownloadItem[]> {
    console.warn(
      '[WB SDK] getTasksDownload() is deprecated. Use downloadWarehouseRemainsReport() instead.'
    );
    return this.downloadWarehouseRemainsReport(task_id);
  }

  /**
   * Занижение габаритов упаковки
   *
   * @deprecated This endpoint is removed from swagger. Use getMeasurementPenalties()
   * for penalties or getWarehouseMeasurementsV2() for warehouse measurements instead.
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * // Use new methods instead:
   * const penalties = await sdk.reports.getMeasurementPenalties({ dateTo: '2026-02-06', limit: 100 });
   * const measurements = await sdk.reports.getWarehouseMeasurementsV2({ dateTo: '2026-02-06', limit: 100 });
   */
  async getAnalyticsWarehouseMeasurements(options?: {
    dateFrom?: string;
    dateTo: string;
    tab: 'penalty' | 'measurement';
    limit: number;
    offset?: number;
  }): Promise<Penalty | Measurement> {
    console.warn(
      '[WB SDK] getAnalyticsWarehouseMeasurements() is deprecated. ' +
        'Use getMeasurementPenalties() or getWarehouseMeasurementsV2() instead.'
    );
    return this.client.get<Penalty | Measurement>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/warehouse-measurements',
      { params: options, rateLimitKey: 'reports.analyticsWarehouseMeasurements' }
    );
  }

  /**
   * Самовыкупы
   *
   * Метод возвращает отчёт об удержаниях за самовыкупы. Отчёт формируется каждую неделю по средам, до 7:00 по московскому времени, и содержит данные за одну неделю.<br><br> Удержание за самовыкуп — 30% от стоимости товаров.<br>Минимальная сумма всех удержаний — 100 000 ₽, если за неделю в ПВЗ привезли ваших товаров больше, чем на сумму 100 000 ₽.<br><br> Данные доступны с августа 2023. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 100 минут | 10 запросов | 10 минут | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getAnalyticsAntifraudDetails({});
  console.log(result);
   */
  async getAnalyticsAntifraudDetails(options?: {
    date?: string;
  }): Promise<AntifraudDetailsResponse> {
    return this.client.get<AntifraudDetailsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/antifraud-details',
      { params: options, rateLimitKey: 'reports.analyticsAntifraudDetails' }
    );
  }

  /**
   * Подмена товара
   *
   * @deprecated This endpoint is removed from swagger. Use getDeductions() instead
   * which provides combined data for substitutions and incorrect attachments.
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * // Use getDeductions() instead:
   * const deductions = await sdk.reports.getDeductions({ dateTo: '2026-02-06', limit: 100 });
   */
  async getAnalyticsIncorrectAttachments(options?: {
    dateFrom: string;
    dateTo: string;
  }): Promise<unknown> {
    console.warn(
      '[WB SDK] getAnalyticsIncorrectAttachments() is deprecated. Use getDeductions() instead.'
    );
    return this.client.get<unknown>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/incorrect-attachments',
      { params: options, rateLimitKey: 'reports.analyticsIncorrectAttachments' }
    );
  }

  /**
   * Маркировка товара
   *
   * Метод возвращает отчёт о штрафах за отсутствие обязательной маркировки товаров.<br> В отчёте представлены фотографии товаров, на которых маркировка отсутствует либо не считывается.<br><br> Можно получить данные максимум за 31 день. Данные доступны с марта 2024. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 минут | 10 запросов | 1 минута | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getAnalyticsGoodsLabeling({});
  console.log(result);
   */
  async getAnalyticsGoodsLabeling(options?: {
    dateFrom: string;
    dateTo: string;
  }): Promise<GoodsLabelingResponse> {
    return this.client.get<GoodsLabelingResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-labeling',
      { params: options, rateLimitKey: 'reports.analyticsGoodsLabeling' }
    );
  }

  /**
   * Смена характеристик
   *
   * @deprecated This endpoint is removed from swagger with no replacement.
   * The API may return errors for this endpoint.
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   */
  async getAnalyticsCharacteristicsChange(options?: {
    dateFrom: string;
    dateTo: string;
  }): Promise<unknown> {
    console.warn(
      '[WB SDK] getAnalyticsCharacteristicsChange() is deprecated. ' +
        'This endpoint has been removed from the API with no replacement.'
    );
    return this.client.get<unknown>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/characteristics-change',
      { params: options, rateLimitKey: 'reports.analyticsCharacteristicsChange' }
    );
  }

  /**
   * Создать отчёт
   *
   * Метод создаёт [задание на генерацию](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report~1tasks~1%7Btask_id%7D~1status/get) отчёта о [платной приёмке](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report~1tasks~1%7Btask_id%7D~1download/get).<br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.acceptanceReport({});
  console.log(result);
   */
  async acceptanceReport(options?: {
    dateFrom: string;
    dateTo: string;
  }): Promise<CreateTaskResponse> {
    return this.client.get<CreateTaskResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report',
      { params: options, rateLimitKey: 'reports.acceptance_report' }
    );
  }

  /**
   * Проверить статус задания на генерацию отчёта о платной приёмке
   *
   * @param task_id - ID задания на генерацию
   * @returns Статус задания
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.reports.getAcceptanceReportTaskStatus('task-uuid');
   * console.log(result.data?.status);
   */
  async getAcceptanceReportTaskStatus(task_id: string): Promise<GetTasksResponse> {
    return this.client.get<GetTasksResponse>(
      `https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/${task_id}/status`,
      { rateLimitKey: 'reports.acceptance_reportTasksStatus' }
    );
  }

  /**
   * @deprecated Use getAcceptanceReportTaskStatus() instead.
   */
  async getTasksStatu2(task_id: string): Promise<GetTasksResponse> {
    console.warn(
      '[WB SDK] getTasksStatu2() is deprecated. Use getAcceptanceReportTaskStatus() instead.'
    );
    return this.getAcceptanceReportTaskStatus(task_id);
  }

  /**
   * Получить отчёт о платной приёмке
   *
   * @param task_id - ID задания на генерацию
   * @returns Данные отчёта
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.reports.downloadAcceptanceReport('task-uuid');
   * console.log(result);
   */
  async downloadAcceptanceReport(task_id: string): Promise<AcceptanceReportDownloadItem[]> {
    return this.client.get<AcceptanceReportDownloadItem[]>(
      `https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/${task_id}/download`,
      { rateLimitKey: 'reports.acceptance_reportTasksDownload' }
    );
  }

  /**
   * @deprecated Use downloadAcceptanceReport() instead.
   */
  async getTasksDownload2(task_id: string): Promise<AcceptanceReportDownloadItem[]> {
    console.warn(
      '[WB SDK] getTasksDownload2() is deprecated. Use downloadAcceptanceReport() instead.'
    );
    return this.downloadAcceptanceReport(task_id);
  }

  /**
   * Создать отчёт
   *
   * Метод создаёт [задание на генерацию](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage~1tasks~1%7Btask_id%7D~1status/get) отчёта о [платном хранении](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage~1tasks~1%7Btask_id%7D~1download/get).<br><br> Можно получить отчёт максимум за 8 дней. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.paidStorage({});
  console.log(result);
   */
  async paidStorage(options?: { dateFrom: string; dateTo: string }): Promise<CreateTaskResponse> {
    return this.client.get<CreateTaskResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/paid_storage',
      { params: options, rateLimitKey: 'reports.paid_storage' }
    );
  }

  /**
   * Проверить статус задания на генерацию отчёта о платном хранении
   *
   * @param task_id - ID задания на генерацию
   * @returns Статус задания
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.reports.getPaidStorageTaskStatus('task-uuid');
   * console.log(result.data?.status);
   */
  async getPaidStorageTaskStatus(task_id: string): Promise<GetTasksResponse> {
    return this.client.get<GetTasksResponse>(
      `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${task_id}/status`,
      { rateLimitKey: 'reports.paid_storageTasksStatus' }
    );
  }

  /**
   * @deprecated Use getPaidStorageTaskStatus() instead.
   */
  async getTasksStatu3(task_id: string): Promise<GetTasksResponse> {
    console.warn(
      '[WB SDK] getTasksStatu3() is deprecated. Use getPaidStorageTaskStatus() instead.'
    );
    return this.getPaidStorageTaskStatus(task_id);
  }

  /**
   * Получить отчёт о платном хранении
   *
   * @param task_id - ID задания на генерацию
   * @returns Данные отчёта
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
   * const result = await sdk.reports.downloadPaidStorageReport('task-uuid');
   * console.log(result);
   */
  async downloadPaidStorageReport(task_id: string): Promise<ResponsePaidStorage> {
    return this.client.get<ResponsePaidStorage>(
      `https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${task_id}/download`,
      { rateLimitKey: 'reports.paid_storageTasksDownload' }
    );
  }

  /**
   * @deprecated Use downloadPaidStorageReport() instead.
   */
  async getTasksDownload3(task_id: string): Promise<ResponsePaidStorage> {
    console.warn(
      '[WB SDK] getTasksDownload3() is deprecated. Use downloadPaidStorageReport() instead.'
    );
    return this.downloadPaidStorageReport(task_id);
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт с [данными продаж, сгруппированных по регионам стран](https://seller.wildberries.ru/analytics-reports/region-sale).<br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getAnalyticsRegionSale({});
  console.log(result);
   */
  async getAnalyticsRegionSale(options?: {
    dateFrom: string;
    dateTo: string;
  }): Promise<RegionSaleResponse> {
    return this.client.get<RegionSaleResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/region-sale',
      { params: options, rateLimitKey: 'reports.analyticsRegionSale' }
    );
  }

  /**
   * Бренды продавца
   *
   * Метод возвращает список брендов продавца для отчёта о [доле бренда в продажах](https://seller.wildberries.ru/analytics-reports/brand-share). <br><br> Можно получить только бренды, которые: - Продавались за последние 90 дней. - Есть на складе WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>
   *
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getBrandShareBrands();
  console.log(result);
   */
  async getBrandShareBrands(): Promise<BrandShareBrandsResponse> {
    return this.client.get<BrandShareBrandsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/brands',
      { rateLimitKey: 'reports.analyticsBrandShareBrands' }
    );
  }

  /**
   * Родительские категории бренда
   *
   * Метод возвращает родительские категории бренда продавца для отчёта о [доле бренда в продажах](https://seller.wildberries.ru/analytics-reports/brand-share).<br><br> Можно получить отчёт максимум за 365 дней. Данные доступны с 1 ноября 2022. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 20 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getBrandShareParentSubjects({});
  console.log(result);
   */
  async getBrandShareParentSubjects(options?: {
    locale?: string;
    brand: string;
    dateFrom: string;
    dateTo: string;
  }): Promise<BrandShareParentSubjectsResponse> {
    return this.client.get<BrandShareParentSubjectsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/parent-subjects',
      { params: options, rateLimitKey: 'reports.analyticsBrandShareParentSubjects' }
    );
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт о [доле бренда продавца в продажах](https://seller.wildberries.ru/analytics-reports/brand-share). <br><br> Можно получить отчёт максимум за 365 дней. Данные доступны с 1 ноября 2022. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 20 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getAnalyticsBrandShare({});
  console.log(result);
   */
  async getAnalyticsBrandShare(options?: {
    parentId: number;
    brand: string;
    dateFrom: string;
    dateTo: string;
  }): Promise<BrandShareResponse> {
    return this.client.get<BrandShareResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share',
      { params: options, rateLimitKey: 'reports.analyticsBrandShare' }
    );
  }

  /**
   * Заблокированные карточки
   *
   * Метод возвращает список [заблокированных карточек товаров продавца](https://seller.wildberries.ru/analytics-reports/banned-products) с причинами блокировки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getBannedProductsBlocked({});
  console.log(result);
   */
  async getBannedProductsBlocked(options?: {
    sort: 'brand' | 'nmId' | 'title' | 'vendorCode' | 'reason';
    order: 'desc' | 'asc';
  }): Promise<BannedProductsBlockedResponse> {
    return this.client.get<BannedProductsBlockedResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/blocked',
      { params: options, rateLimitKey: 'reports.analyticsBannedProductsBlocked' }
    );
  }

  /**
   * Скрытые из каталога
   *
   * Метод возвращает список [товаров продавца, скрытых из каталога](https://seller.wildberries.ru/analytics-reports/banned-products/shadowed). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 6 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getBannedProductsShadowed({});
  console.log(result);
   */
  async getBannedProductsShadowed(options?: {
    sort: 'brand' | 'nmId' | 'title' | 'vendorCode' | 'nmRating';
    order: 'desc' | 'asc';
  }): Promise<BannedProductsShadowedResponse> {
    return this.client.get<BannedProductsShadowedResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/shadowed',
      { params: options, rateLimitKey: 'reports.analyticsBannedProductsShadowed' }
    );
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт о [возвратах товаров продавцу](https://seller.wildberries.ru/analytics-reports/goods-return). <br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.reports.getAnalyticsGoodsReturn({});
  console.log(result);
   */
  async getAnalyticsGoodsReturn(options?: {
    dateFrom: string;
    dateTo: string;
  }): Promise<GoodsReturnResponse> {
    return this.client.get<GoodsReturnResponse>(
      'https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-return',
      { params: options, rateLimitKey: 'reports.analyticsGoodsReturn' }
    );
  }

  // ==========================================================================
  // New Deduction Endpoints - EPIC 44
  // ==========================================================================

  /**
   * Занижение габаритов упаковки (штрафы)
   *
   * Метод возвращает отчёт об удержаниях за занижение габаритов упаковки.
   *
   * Rate limit: 1 req/min, 1 min interval, burst 1
   *
   * @param options - Query parameters
   * @param options.dateFrom - Start of reporting period (ISO 8601)
   * @param options.dateTo - End of reporting period (ISO 8601, required)
   * @param options.limit - Number of items in response (max 1000, required)
   * @param options.offset - Number of items to skip (default 0)
   * @returns Penalty reports with total count
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see EPIC 44 - New endpoint replacing tab=penalty on old warehouse-measurements
   * @example
   * const result = await sdk.reports.getMeasurementPenalties({
   *   dateTo: '2026-02-06',
   *   limit: 100
   * });
   * console.log(result.data?.reports);
   */
  async getMeasurementPenalties(
    options: MeasurementPenaltiesParams
  ): Promise<MeasurementPenaltiesResponse> {
    return this.client.get<MeasurementPenaltiesResponse>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v1/measurement-penalties',
      { params: options, rateLimitKey: 'reports.measurementPenalties' }
    );
  }

  /**
   * Замеры склада
   *
   * Метод возвращает отчёт о замерах склада.
   *
   * Rate limit: 1 req/min, 1 min interval, burst 1
   *
   * @param options - Query parameters
   * @param options.dateFrom - Start of reporting period (ISO 8601)
   * @param options.dateTo - End of reporting period (ISO 8601, required)
   * @param options.limit - Number of items in response (max 1000, required)
   * @param options.offset - Number of items to skip (default 0)
   * @returns Measurement reports with total count
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see EPIC 44 - New endpoint replacing tab=measurement on old warehouse-measurements
   * @example
   * const result = await sdk.reports.getWarehouseMeasurementsV2({
   *   dateTo: '2026-02-06',
   *   limit: 100
   * });
   * console.log(result.data?.reports);
   */
  async getWarehouseMeasurementsV2(
    options: WarehouseMeasurementsV2Params
  ): Promise<WarehouseMeasurementsV2Response> {
    return this.client.get<WarehouseMeasurementsV2Response>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v1/warehouse-measurements',
      { params: options, rateLimitKey: 'reports.warehouseMeasurementsV2' }
    );
  }

  /**
   * Удержания за подмену и некорректные вложения
   *
   * Метод возвращает отчёт об удержаниях за подмену товара и некорректные вложения.
   * Заменяет удалённый endpoint /api/v1/analytics/incorrect-attachments.
   *
   * Rate limit: 1 req/min, 1 min interval, burst 1
   *
   * @param options - Query parameters
   * @param options.dateFrom - Start of reporting period (ISO 8601)
   * @param options.dateTo - End of reporting period (ISO 8601, required)
   * @param options.sort - Sort field: nmId, dtBonus, bonusSumm (default: dtBonus)
   * @param options.order - Sort order: desc, asc (default: desc)
   * @param options.limit - Number of items in response (max 1000, required)
   * @param options.offset - Number of items to skip (default 0)
   * @returns Deduction reports with total count
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see EPIC 44 - New endpoint replacing removed incorrect-attachments
   * @example
   * const result = await sdk.reports.getDeductions({
   *   dateTo: '2026-02-06',
   *   limit: 100,
   *   sort: 'dtBonus',
   *   order: 'desc'
   * });
   * console.log(result.data?.reports);
   */
  async getDeductions(options: DeductionsParams): Promise<DeductionsResponse> {
    return this.client.get<DeductionsResponse>(
      'https://seller-analytics-api.wildberries.ru/api/analytics/v1/deductions',
      { params: options, rateLimitKey: 'reports.deductions' }
    );
  }
}
