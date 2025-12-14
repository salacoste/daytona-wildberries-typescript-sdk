/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/12-reports.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type { CreateTaskResponse, ExciseReportRequest, ExciseReportResponse, GetTasksResponse, IncomesItem, Measurement, OrdersItem, Penalty, ResponsePaidStorage, SalesItem, StocksItem } from '../../types/reports.types';

export class ReportsModule {
  constructor(private client: BaseClient) {}

  /**
   * Поставки
   *
   * Метод возвращает количество поставок товаров для хранения на складах WB.<br>Данные обновляются раз в 30 минут. <br><br> Для одного ответа в системе установлено условное ограничение 100000 строк. Поэтому, чтобы получить все поставки, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom` используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все поставки уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getSupplierIncomes({});
  console.log(result);
   */
  async getSupplierIncomes(options?: { dateFrom: string }): Promise<IncomesItem[]> {
    return this.client.get<IncomesItem[]>('https://statistics-api.wildberries.ru/api/v1/supplier/incomes', { params: options });
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
  const result = await sdk.general.getSupplierStocks({});
  console.log(result);
   */
  async getSupplierStocks(options?: { dateFrom: string }): Promise<StocksItem[]> {
    return this.client.get<StocksItem[]>('https://statistics-api.wildberries.ru/api/v1/supplier/stocks', { params: options });
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
  const result = await sdk.general.getSupplierOrders({});
  console.log(result);
   */
  async getSupplierOrders(options?: { dateFrom: string; flag?: number }): Promise<OrdersItem[]> {
    return this.client.get<OrdersItem[]>('https://statistics-api.wildberries.ru/api/v1/supplier/orders', { params: options });
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
  const result = await sdk.general.getSupplierSales({});
  console.log(result);
   */
  async getSupplierSales(options?: { dateFrom: string; flag?: number }): Promise<SalesItem[]> {
    return this.client.get<SalesItem[]>('https://statistics-api.wildberries.ru/api/v1/supplier/sales', { params: options });
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
  const result = await sdk.general.createAnalyticsExciseReport({}, {});
  console.log(result);
   */
  async createAnalyticsExciseReport(options?: { dateFrom: string; dateTo: string }, data?: ExciseReportRequest): Promise<ExciseReportResponse> {
    return this.client.post<ExciseReportResponse>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/excise-report', data, { params: options });
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
  const result = await sdk.general.warehouseRemains({});
  console.log(result);
   */
  async warehouseRemains(options?: { locale?: string; groupByBrand?: boolean; groupBySubject?: boolean; groupBySa?: boolean; groupByNm?: boolean; groupByBarcode?: boolean; groupBySize?: boolean; filterPics?: number; filterVolume?: number }): Promise<CreateTaskResponse> {
    return this.client.get<CreateTaskResponse>('https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains', { params: options });
  }

  /**
   * Проверить статус
   *
   * Метод возвращает статус [задания на генерацию](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains/get) отчёта об [остатках на складах WB](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 5 запросов | </div>
   *
   * @param task_id - ID задания на генерацию
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getTasksStatu('task_id-value');
  console.log(result);
   */
  async getTasksStatu(task_id: string): Promise<GetTasksResponse> {
    return this.client.get<GetTasksResponse>(`https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/${task_id}/status`);
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт об [остатках на складах WB](https://seller.wildberries.ru/analytics-reports/warehouse-remains) по ID [задания на генерацию](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param task_id - ID задания на генерацию
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getTasksDownload('task_id-value');
  console.log(result);
   */
  async getTasksDownload(task_id: string): Promise<{ brand?: string; subjectName?: string; vendorCode?: string; nmId?: number; barcode?: string; techSize?: string; volume?: number; warehouses?: { warehouseName?: string; quantity?: number }[] }[]> {
    return this.client.get<{ brand?: string; subjectName?: string; vendorCode?: string; nmId?: number; barcode?: string; techSize?: string; volume?: number; warehouses?: { warehouseName?: string; quantity?: number }[] }[]>(`https://seller-analytics-api.wildberries.ru/api/v1/warehouse_remains/tasks/${task_id}/download`);
  }

  /**
   * Занижение габаритов упаковки
   *
   * Метод возвращает отчёты об [удержаниях за занижение габаритов упаковки](https://seller.wildberries.ru/analytics-reports/dimensions-penalties) и [замерах склада](https://seller.wildberries.ru/analytics-reports/dimensions-penalties/warehouse-measurements) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 5 запросов | 12 секунд | 1 запрос | </div>
   *
   * @param [options] - Query parameters
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAnalyticsWarehouseMeasurements({});
  console.log(result);
   */
  async getAnalyticsWarehouseMeasurements(options?: { dateFrom?: string; dateTo: string; tab: 'penalty' | 'measurement'; limit: number; offset?: number }): Promise<Penalty | Measurement> {
    return this.client.get<Penalty | Measurement>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/warehouse-measurements', { params: options });
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
  const result = await sdk.general.getAnalyticsAntifraudDetails({});
  console.log(result);
   */
  async getAnalyticsAntifraudDetails(options?: { date?: string }): Promise<unknown> {
    return this.client.get<unknown>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/antifraud-details', { params: options });
  }

  /**
   * Подмена товара
   *
   * Метод возвращает отчёт об удержаниях за отправку ошибочных товаров, пустых коробок или коробок без товара, но с посторонними предметами. В таких случаях удерживается 100% от стоимости заказа.<br><br> Можно получить отчёт максимум за 31 день. Данные доступны с июня 2023. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAnalyticsIncorrectAttachments({});
  console.log(result);
   */
  async getAnalyticsIncorrectAttachments(options?: { dateFrom: string; dateTo: string }): Promise<unknown> {
    return this.client.get<unknown>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/incorrect-attachments', { params: options });
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
  const result = await sdk.general.getAnalyticsGoodsLabeling({});
  console.log(result);
   */
  async getAnalyticsGoodsLabeling(options?: { dateFrom: string; dateTo: string }): Promise<unknown> {
    return this.client.get<unknown>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-labeling', { params: options });
  }

  /**
   * Смена характеристик
   *
   * Метод возвращает отчёт об удержаниях за смену характеристик товара. Если товары после приёмки не соответствуют заявленным цветам и размерам, и на складе их перемаркировали с правильными характеристиками, по таким товарам назначается штраф.<br><br> Можно получить отчёт максимум за 31 день. Данные доступны с 28 декабря 2021. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 минут | 10 запросов | 1 минута | 10 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Response data
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getAnalyticsCharacteristicsChange({});
  console.log(result);
   */
  async getAnalyticsCharacteristicsChange(options?: { dateFrom: string; dateTo: string }): Promise<unknown> {
    return this.client.get<unknown>('https://api.wildberries.ru/api/v1/analytics/characteristics-change', { params: options });
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
  const result = await sdk.general.acceptanceReport({});
  console.log(result);
   */
  async acceptanceReport(options?: { dateFrom: string; dateTo: string }): Promise<CreateTaskResponse> {
    return this.client.get<CreateTaskResponse>('https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report', { params: options });
  }

  /**
   * Проверить статус
   *
   * Метод возвращает статус [задания на генерацию](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report/get) отчёта о [платной приёмке](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report~1tasks~1%7Btask_id%7D~1download/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 1 запрос | </div>
   *
   * @param task_id - ID задания на генерацию
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getTasksStatu('task_id-value');
  console.log(result);
   */
  async getTasksStatu2(task_id: string): Promise<GetTasksResponse> {
    return this.client.get<GetTasksResponse>(`https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/${task_id}/status`);
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт о [платной приёмке](https://seller.wildberries.ru/analytics-reports/acceptance-report) по ID [задания на генерацию](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param task_id - ID задания на генерацию
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getTasksDownload('task_id-value');
  console.log(result);
   */
  async getTasksDownload2(task_id: string): Promise<{ count?: number; giCreateDate?: string; incomeId?: number; nmID?: number; shkCreateDate?: string; subjectName?: string; total?: number }[]> {
    return this.client.get<{ count?: number; giCreateDate?: string; incomeId?: number; nmID?: number; shkCreateDate?: string; subjectName?: string; total?: number }[]>(`https://seller-analytics-api.wildberries.ru/api/v1/acceptance_report/tasks/${task_id}/download`);
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
  const result = await sdk.general.paidStorage({});
  console.log(result);
   */
  async paidStorage(options?: { dateFrom: string; dateTo: string }): Promise<CreateTaskResponse> {
    return this.client.get<CreateTaskResponse>('https://seller-analytics-api.wildberries.ru/api/v1/paid_storage', { params: options });
  }

  /**
   * Проверить статус
   *
   * Метод возвращает статус [задания на генерацию](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage/get) отчёта о [платном хранении](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage~1tasks~1%7Btask_id%7D~1download/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 5 запросов | </div>
   *
   * @param task_id - ID задания на генерацию
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getTasksStatu('task_id-value');
  console.log(result);
   */
  async getTasksStatu3(task_id: string): Promise<GetTasksResponse> {
    return this.client.get<GetTasksResponse>(`https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${task_id}/status`);
  }

  /**
   * Получить отчёт
   *
   * Метод возвращает отчёт о [платном хранении](https://seller.wildberries.ru/analytics-reports/paid-storage/storage) по ID [задания на генерацию](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param task_id - ID задания на генерацию
   * @returns Успешно
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @example
  const result = await sdk.general.getTasksDownload('task_id-value');
  console.log(result);
   */
  async getTasksDownload3(task_id: string): Promise<ResponsePaidStorage> {
    return this.client.get<ResponsePaidStorage>(`https://seller-analytics-api.wildberries.ru/api/v1/paid_storage/tasks/${task_id}/download`);
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
  const result = await sdk.general.getAnalyticsRegionSale({});
  console.log(result);
   */
  async getAnalyticsRegionSale(options?: { dateFrom: string; dateTo: string }): Promise<unknown> {
    return this.client.get<unknown>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/region-sale', { params: options });
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
  const result = await sdk.general.getBrandShareBrands();
  console.log(result);
   */
  async getBrandShareBrands(): Promise<unknown> {
    return this.client.get<unknown>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/brands');
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
  const result = await sdk.general.getBrandShareParentSubjects({});
  console.log(result);
   */
  async getBrandShareParentSubjects(options?: { locale?: string; brand: string; dateFrom: string; dateTo: string }): Promise<unknown> {
    return this.client.get<unknown>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share/parent-subjects', { params: options });
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
  const result = await sdk.general.getAnalyticsBrandShare({});
  console.log(result);
   */
  async getAnalyticsBrandShare(options?: { parentId: number; brand: string; dateFrom: string; dateTo: string }): Promise<unknown> {
    return this.client.get<unknown>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/brand-share', { params: options });
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
  const result = await sdk.general.getBannedProductsBlocked({});
  console.log(result);
   */
  async getBannedProductsBlocked(options?: { sort: 'brand' | 'nmId' | 'title' | 'vendorCode' | 'reason'; order: 'desc' | 'asc' }): Promise<{ report?: { brand?: string; nmId?: number; title?: string; vendorCode?: string; reason?: string }[] }> {
    return this.client.get<{ report?: { brand?: string; nmId?: number; title?: string; vendorCode?: string; reason?: string }[] }>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/blocked', { params: options });
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
  const result = await sdk.general.getBannedProductsShadowed({});
  console.log(result);
   */
  async getBannedProductsShadowed(options?: { sort: 'brand' | 'nmId' | 'title' | 'vendorCode' | 'nmRating'; order: 'desc' | 'asc' }): Promise<{ report?: { brand?: string; nmId?: number; title?: string; vendorCode?: string; nmRating?: number }[] }> {
    return this.client.get<{ report?: { brand?: string; nmId?: number; title?: string; vendorCode?: string; nmRating?: number }[] }>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/banned-products/shadowed', { params: options });
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
  const result = await sdk.general.getAnalyticsGoodsReturn({});
  console.log(result);
   */
  async getAnalyticsGoodsReturn(options?: { dateFrom: string; dateTo: string }): Promise<{ report?: { barcode?: string; brand?: string; completedDt?: string; dstOfficeAddress?: string; dstOfficeId?: number; expiredDt?: string; isStatusActive?: 0 | 1; nmId?: number; orderDt?: string; orderId?: number; readyToReturnDt?: string; reason?: string; returnType?: string; shkId?: number; srid?: string; status?: string; stickerId?: string; subjectName?: string; techSize?: string }[] }> {
    return this.client.get<{ report?: { barcode?: string; brand?: string; completedDt?: string; dstOfficeAddress?: string; dstOfficeId?: number; expiredDt?: string; isStatusActive?: 0 | 1; nmId?: number; orderDt?: string; orderId?: number; readyToReturnDt?: string; reason?: string; returnType?: string; shkId?: number; srid?: string; status?: string; stickerId?: string; subjectName?: string; techSize?: string }[] }>('https://seller-analytics-api.wildberries.ru/api/v1/analytics/goods-return', { params: options });
  }

}