/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/13-finances.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  AccountBalanceResponse,
  DetailReportItem,
  DocumentsLocale,
  GetCategories,
  GetDoc,
  GetDocs,
  GetList,
  RequestDownload,
} from '../../types/finances.types';

export class FinancesModule {
  constructor(private client: BaseClient) {}

  /**
   * Получить баланс продавца
   *
   * Метод возвращает данные виджета баланса на [главной странице](https://seller.wildberries.ru) портала продавцов. <br><br> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @returns Account balance data including currency, current balance, and available withdrawal amount
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Balans}
   * @example
   * ```typescript
   * const result = await sdk.finances.getAccountBalance();
   * console.log(result);
   * ```
   */
  async getAccountBalance(): Promise<AccountBalanceResponse> {
    return this.client.get<AccountBalanceResponse>(
      'https://finance-api.wildberries.ru/api/v1/account/balance',
      { rateLimitKey: 'finances.accountBalance' }
    );
  }

  /**
   * Отчёт о продажах по реализации
   *
   * Метод возвращает детализации к [отчётам реализации](https://seller.wildberries.ru/suppliers-mutual-settlements). <br><br> Данные доступны с 29 января 2024 года. <div class="description_important"> Вы можете выгрузить данные в <a href="https://dev.wildberries.ru/ru/cases/1">Google Таблицы</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>
   *
   * @param options - Query parameters including required dateFrom and dateTo
   * @returns Array of detailed report items for the specified period
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty}
   * @example
   * ```typescript
   * const result = await sdk.finances.getSupplierReportDetailByPeriod({
   *   dateFrom: '2024-01-01',
   *   dateTo: '2024-01-31',
   *   period: 'weekly',
   * });
   * console.log(result);
   * ```
   */
  async getSupplierReportDetailByPeriod(options: {
    dateFrom: string;
    dateTo: string;
    limit?: number;
    rrdid?: number;
    period?: 'weekly' | 'daily';
  }): Promise<DetailReportItem[]> {
    return this.client.get<DetailReportItem[]>(
      'https://statistics-api.wildberries.ru/api/v5/supplier/reportDetailByPeriod',
      { params: options, rateLimitKey: 'finances.supplierReportDetailByPeriod' }
    );
  }

  /**
   * Категории документов
   *
   * Метод возвращает категории документов для получения [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns List of document categories available for the seller
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty}
   * @example
   * ```typescript
   * const result = await sdk.finances.getDocumentsCategories({ locale: 'ru' });
   * console.log(result);
   * ```
   */
  async getDocumentsCategories(options?: { locale?: DocumentsLocale }): Promise<GetCategories> {
    return this.client.get<GetCategories>(
      'https://documents-api.wildberries.ru/api/v1/documents/categories',
      { params: options, rateLimitKey: 'finances.documentsCategories' }
    );
  }

  /**
   * Список документов
   *
   * Метод возвращает список документов продавца. Вы можете получить [один](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1download/get) или [несколько](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1download~1all/post) документов из полученного списка. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>
   *
   * @param [options] - Query parameters
   * @returns Paginated list of seller documents with metadata
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @remarks The `sort` and `order` parameters work together — specifying `order` without `sort` has no effect.
   * @remarks The `beginTime` and `endTime` parameters define a date range and should be used as a pair.
   * @see {@link https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty}
   * @example
   * ```typescript
   * const result = await sdk.finances.getDocumentsList({
   *   locale: 'ru',
   *   sort: 'date',
   *   order: 'desc',
   * });
   * console.log(result);
   * ```
   */
  async getDocumentsList(options?: {
    locale?: DocumentsLocale;
    beginTime?: string;
    endTime?: string;
    sort?: 'date' | 'category';
    order?: 'desc' | 'asc';
    category?: string;
    serviceName?: string;
    limit?: number;
    offset?: number;
  }): Promise<GetList> {
    return this.client.get<GetList>('https://documents-api.wildberries.ru/api/v1/documents/list', {
      params: options,
      rateLimitKey: 'finances.documentsList',
    });
  }

  /**
   * Получить документ
   *
   * Метод загружает один документ из [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>
   *
   * @param options - Query parameters including required serviceName and extension
   * @returns Document file data for the requested document
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty}
   * @example
   * ```typescript
   * const result = await sdk.finances.getDocumentsDownload({
   *   serviceName: 'act',
   *   extension: 'pdf',
   * });
   * console.log(result);
   * ```
   */
  async getDocumentsDownload(options: { serviceName: string; extension: string }): Promise<GetDoc> {
    return this.client.get<GetDoc>(
      'https://documents-api.wildberries.ru/api/v1/documents/download',
      { params: options, rateLimitKey: 'finances.documentsDownload' }
    );
  }

  /**
   * Получить документы
   *
   * Метод загружает несколько документов из [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 минут | 1 запрос | 5 минут | 5 запросов | </div>
   *
   * @param [data] - Request body data
   * @returns Download details for the requested batch of documents
   * @throws {AuthenticationError} When API key is invalid (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400/422)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty}
   * @example
   * ```typescript
   * const result = await sdk.finances.createDownloadAll({
   *   serviceNames: ['act', 'invoice'],
   * });
   * console.log(result);
   * ```
   */
  async createDownloadAll(data?: RequestDownload): Promise<GetDocs> {
    return this.client.post<GetDocs>(
      'https://documents-api.wildberries.ru/api/v1/documents/download/all',
      data,
      { rateLimitKey: 'finances.createDownloadAll' }
    );
  }
}
