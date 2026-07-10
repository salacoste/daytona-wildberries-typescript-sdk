/**
 * Auto-generated module
 * Generated from: wildberries_api_doc/13-finances.yaml
 * DO NOT EDIT MANUALLY - Changes will be overwritten on next generation
 */

import { BaseClient } from '../../client/base-client';
import type {
  AccountBalanceResponse,
  DocumentsLocale,
  GetCategories,
  GetDoc,
  GetDocs,
  GetList,
  RequestDownload,
  SalesReportListRequest,
  SalesReportListItem,
  SalesReportDetailedRequest,
  SalesReportDetailedByIdRequest,
  SalesReportDetailedItem,
  AcquiringReportListRequest,
  AcquiringReportListItem,
  AcquiringReportDetailedRequest,
  AcquiringReportDetailedByIdRequest,
  AcquiringReportDetailedItem,
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
   * @remarks The `sort` and `order` parameters work together — specifying `order` without `sort` has no effect. The `beginTime` and `endTime` parameters define a date range and should be used as a pair.
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

  // ==========================================================================
  // v1 Sales Reports (since v3.7.0)
  // Replaces deprecated GET /api/v5/supplier/reportDetailByPeriod (disabled 2026-07-15)
  // All money amounts are string (not number) — use parseMoneyAmount() helper for math.
  // ==========================================================================

  /**
   * Список отчётов реализации (v1)
   *
   * Returns list of sales reports by report format. Data available from 2025-01-01.
   *
   * **Available token types**: Personal, Service (NOT Basic or Test)
   *
   * Rate limit: 1 req/min, 1 minute interval, burst 1
   *
   * @param data - Request body with dateFrom, dateTo, limit, offset, period
   * @returns Array of SalesReportListItem (money sums as string — use parseMoneyAmount helper)
   * @throws {AuthenticationError} When token type is Basic or Test — this endpoint requires Personal or Service token (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList}
   * @since v3.7.0
   * @example
   * ```typescript
   * import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
   *
   * const reports = await sdk.finances.getSalesReportsList({
   *   dateFrom: '2026-03-17',
   *   dateTo: '2026-03-20',
   *   period: 'weekly',
   * });
   * console.log(parseMoneyAmount(reports[0].forPaySum));
   * ```
   */
  async getSalesReportsList(data: SalesReportListRequest): Promise<SalesReportListItem[]> {
    return this.client.post<SalesReportListItem[]>(
      'https://finance-api.wildberries.ru/api/finance/v1/sales-reports/list',
      data,
      { rateLimitKey: 'finances.salesReportsList' }
    );
  }

  /**
   * Детализации к отчётам реализации за период (v1)
   *
   * Returns detailed rows for sales reports within a date range. Replaces the deprecated v5 method.
   * Data available from 2024-01-29. Supports selective field loading via `fields` parameter.
   *
   * **Available token types**: Personal, Service (NOT Basic or Test)
   *
   * Rate limit: 1 req/min, 1 minute interval, burst 1
   *
   * @param data - Request body with dateFrom, dateTo, limit, rrdId, period, fields
   * @returns Array of SalesReportDetailedItem (~70 fields, money amounts as string — use parseMoneyAmount)
   * @throws {AuthenticationError} When token type is Basic or Test — this endpoint requires Personal or Service token (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsDetailed}
   * @since v3.7.0
   * @example
   * ```typescript
   * import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
   *
   * const rows = await sdk.finances.getSalesReportsDetailed({
   *   dateFrom: '2026-03-17',
   *   dateTo: '2026-03-20',
   *   limit: 100000,
   *   rrdId: 0,
   *   fields: ['rrdId', 'nmId', 'forPay'],  // Optional: load only specific fields
   * });
   * const totalPayout = rows.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);
   * ```
   */
  async getSalesReportsDetailed(
    data: SalesReportDetailedRequest
  ): Promise<SalesReportDetailedItem[]> {
    return this.client.post<SalesReportDetailedItem[]>(
      'https://finance-api.wildberries.ru/api/finance/v1/sales-reports/detailed',
      data,
      { rateLimitKey: 'finances.salesReportsDetailed' }
    );
  }

  /**
   * Детализации к отчётам реализации по ID отчёта (v1)
   *
   * Returns detailed rows for a specific report by its ID. Data available from 2025-01-01.
   *
   * **BigInt precision note**: For daily reports, `reportId` may exceed `Number.MAX_SAFE_INTEGER` (2^53).
   * If you obtained the ID from `getSalesReportsList()` response (which returns `number`),
   * standard JSON parsing may already have truncated precision. For precision-safe handling,
   * fetch the ID via a custom BigInt-aware parser and pass it as `bigint` or `string`.
   *
   * **Available token types**: Personal, Service (NOT Basic or Test)
   *
   * Rate limit: 1 req/min, 1 minute interval, burst 1
   *
   * @param reportId - Report ID (number for typical use, bigint/string for BigInt precision on daily reports)
   * @param data - Request body with optional limit, rrdId, fields
   * @returns Array of SalesReportDetailedItem
   * @throws {AuthenticationError} When token type is Basic or Test — this endpoint requires Personal or Service token (401/403)
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsDetailedReportId}
   * @since v3.7.0
   * @example
   * ```typescript
   * // Typical weekly report usage:
   * const rows = await sdk.finances.getSalesReportsDetailedByReportId(307401554);
   *
   * // Daily report with BigInt precision:
   * const rows = await sdk.finances.getSalesReportsDetailedByReportId('9007199254740993', {
   *   fields: ['rrdId', 'nmId', 'retailAmount'],
   * });
   * ```
   */
  async getSalesReportsDetailedByReportId(
    reportId: number | bigint | string,
    data: SalesReportDetailedByIdRequest = {}
  ): Promise<SalesReportDetailedItem[]> {
    return this.client.post<SalesReportDetailedItem[]>(
      `https://finance-api.wildberries.ru/api/finance/v1/sales-reports/detailed/${String(reportId)}`,
      data,
      { rateLimitKey: 'finances.salesReportsDetailedByReportId' }
    );
  }

  // ==========================================================================
  // v1 Acquiring Reports (since v3.7.0) — payment acquisition costs (эквайринг)
  // Available ONLY for Russian sellers. Personal/Service tokens only.
  // ==========================================================================

  /**
   * Список отчётов об издержках на приём платежей (v1)
   *
   * Returns list of acquiring reports. **Available only to Russian sellers.**
   *
   * **Available token types**: Personal, Service (NOT Basic or Test)
   *
   * Rate limit: 1 req/min, 1 minute interval, burst 1
   *
   * @param data - Request body with dateFrom, dateTo, limit, offset
   * @returns Array of AcquiringReportListItem (money sums as string — use parseMoneyAmount helper)
   * @throws {AuthenticationError} When token type is Basic or Test — this endpoint requires Personal or Service token
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringList}
   * @since v3.7.0
   * @example
   * ```typescript
   * import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
   *
   * const reports = await sdk.finances.getAcquiringReportsList({
   *   dateFrom: '2026-03-17',
   *   dateTo: '2026-03-20',
   * });
   * const totalFees = reports.reduce(
   *   (sum, r) => sum + parseMoneyAmount(r.acquiringFeeSum), 0
   * );
   * ```
   */
  async getAcquiringReportsList(
    data: AcquiringReportListRequest
  ): Promise<AcquiringReportListItem[]> {
    return this.client.post<AcquiringReportListItem[]>(
      'https://finance-api.wildberries.ru/api/finance/v1/acquiring/list',
      data,
      { rateLimitKey: 'finances.acquiringReportsList' }
    );
  }

  /**
   * Детализации к отчётам об издержках на приём платежей за период (v1)
   *
   * Returns detailed rows for acquiring reports within a date range.
   * **Available only to Russian sellers.** Supports selective field loading via `fields` parameter.
   *
   * **Available token types**: Personal, Service (NOT Basic or Test)
   *
   * Rate limit: 1 req/min, 1 minute interval, burst 1
   *
   * @param data - Request body with dateFrom, dateTo, limit, rrdId, fields
   * @returns Array of AcquiringReportDetailedItem (money amounts as string — use parseMoneyAmount)
   * @throws {AuthenticationError} When token type is Basic or Test — this endpoint requires Personal or Service token
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailed}
   * @since v3.7.0
   * @example
   * ```typescript
   * import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
   *
   * const rows = await sdk.finances.getAcquiringReportsDetailed({
   *   dateFrom: '2026-03-17',
   *   dateTo: '2026-03-20',
   *   limit: 100000,
   *   rrdId: 0,
   *   fields: ['rrdId', 'acquiringBank', 'acquiringFee'],
   * });
   * const totalFees = rows.reduce(
   *   (sum, r) => sum + parseMoneyAmount(r.acquiringFee), 0
   * );
   * ```
   */
  async getAcquiringReportsDetailed(
    data: AcquiringReportDetailedRequest
  ): Promise<AcquiringReportDetailedItem[]> {
    return this.client.post<AcquiringReportDetailedItem[]>(
      'https://finance-api.wildberries.ru/api/finance/v1/acquiring/detailed',
      data,
      { rateLimitKey: 'finances.acquiringReportsDetailed' }
    );
  }

  /**
   * Детализации к отчётам об издержках на приём платежей по ID отчёта (v1)
   *
   * Returns detailed rows for a specific acquiring report by ID.
   * **Available only to Russian sellers.**
   *
   * **BigInt precision note**: For daily reports, `reportId` may exceed `Number.MAX_SAFE_INTEGER`.
   * Pass as `bigint` or `string` for precision-safe handling.
   *
   * **Available token types**: Personal, Service (NOT Basic or Test)
   *
   * Rate limit: 1 req/min, 1 minute interval, burst 1
   *
   * @param reportId - Report ID (number/bigint/string)
   * @param data - Request body with optional limit, rrdId, fields
   * @returns Array of AcquiringReportDetailedItem
   * @throws {AuthenticationError} When token type is Basic or Test — this endpoint requires Personal or Service token
   * @throws {RateLimitError} When rate limit exceeded (429)
   * @throws {ValidationError} When request data is invalid (400)
   * @throws {NetworkError} When network request fails or times out
   * @see {@link https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailedReportId}
   * @since v3.7.0
   * @example
   * ```typescript
   * import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';
   *
   * // Typical number reportId
   * const rows = await sdk.finances.getAcquiringReportsDetailedByReportId(307401554);
   *
   * // BigInt precision for daily reports — pass as string or bigint
   * const rows = await sdk.finances.getAcquiringReportsDetailedByReportId(
   *   '9007199254740993',
   *   { fields: ['rrdId', 'acquiringFee'] }
   * );
   * ```
   */
  async getAcquiringReportsDetailedByReportId(
    reportId: number | bigint | string,
    data: AcquiringReportDetailedByIdRequest = {}
  ): Promise<AcquiringReportDetailedItem[]> {
    return this.client.post<AcquiringReportDetailedItem[]>(
      `https://finance-api.wildberries.ru/api/finance/v1/acquiring/detailed/${String(reportId)}`,
      data,
      { rateLimitKey: 'finances.acquiringReportsDetailedByReportId' }
    );
  }
}

// Re-export all finances types from the subpath import 'daytona-wildberries-typescript-sdk/finances'.
// Without these, consumers can import the FinancesModule class but cannot access type definitions
// like AccountBalanceResponse, etc. — caught by DX integration test for v3.6.0.
// @since v3.6.1
export type {
  AccountBalanceResponse,
  DocumentsLocale,
  RequestDownload,
  GetCategories,
  GetList,
  GetDoc,
  GetDocs,
  // v1 Sales Reports types (since v3.7.0)
  SalesReportListRequest,
  SalesReportListItem,
  SalesReportDetailedRequest,
  SalesReportDetailedByIdRequest,
  SalesReportDetailedItem,
  // v1 Field union types for selective loading (since v3.8.0)
  SalesReportDetailedField,
  AcquiringReportDetailedField,
  // v1 Acquiring Reports types (since v3.7.0)
  AcquiringReportListRequest,
  AcquiringReportListItem,
  AcquiringReportDetailedRequest,
  AcquiringReportDetailedByIdRequest,
  AcquiringReportDetailedItem,
} from '../../types/finances.types';
