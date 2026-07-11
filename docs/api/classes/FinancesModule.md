[Wildberries API TypeScript SDK](../modules.md) / FinancesModule

# Class: FinancesModule

Defined in: [modules/finances/index.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L28)

## Constructors

### Constructor

```ts
new FinancesModule(client: BaseClient): FinancesModule;
```

Defined in: [modules/finances/index.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L29)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`FinancesModule`

## Methods

### getAccountBalance()

```ts
getAccountBalance(): Promise<AccountBalanceResponse>;
```

Defined in: [modules/finances/index.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L48)

Получить баланс продавца

Метод возвращает данные виджета баланса на [главной странице](https://seller.wildberries.ru) портала продавцов. <br><br> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Returns

`Promise`\<[`AccountBalanceResponse`](../-internal-/interfaces/AccountBalanceResponse.md)\>

Account balance data including currency, current balance, and available withdrawal amount

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Balans](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Balans)

#### Example

```typescript
const result = await sdk.finances.getAccountBalance();
console.log(result);
```

***

### getDocumentsCategories()

```ts
getDocumentsCategories(options?: {
  locale?: DocumentsLocale;
}): Promise<GetCategories>;
```

Defined in: [modules/finances/index.ts:73](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L73)

Категории документов

Метод возвращает категории документов для получения [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: [`DocumentsLocale`](../-internal-/type-aliases/DocumentsLocale.md); \} | Query parameters |
| `options.locale?` | [`DocumentsLocale`](../-internal-/type-aliases/DocumentsLocale.md) | - |

#### Returns

`Promise`\<[`GetCategories`](../-internal-/interfaces/GetCategories.md)\>

List of document categories available for the seller

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty)

#### Example

```typescript
const result = await sdk.finances.getDocumentsCategories({ locale: 'ru' });
console.log(result);
```

***

### getDocumentsList()

```ts
getDocumentsList(options?: {
  locale?: DocumentsLocale;
  beginTime?: string;
  endTime?: string;
  sort?: "date" | "category";
  order?: "desc" | "asc";
  category?: string;
  serviceName?: string;
  limit?: number;
  offset?: number;
}): Promise<GetList>;
```

Defined in: [modules/finances/index.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L103)

Список документов

Метод возвращает список документов продавца. Вы можете получить [один](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1download/get) или [несколько](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1download~1all/post) документов из полученного списка. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: [`DocumentsLocale`](../-internal-/type-aliases/DocumentsLocale.md); `beginTime?`: `string`; `endTime?`: `string`; `sort?`: `"date"` \| `"category"`; `order?`: `"desc"` \| `"asc"`; `category?`: `string`; `serviceName?`: `string`; `limit?`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.locale?` | [`DocumentsLocale`](../-internal-/type-aliases/DocumentsLocale.md) | - |
| `options.beginTime?` | `string` | - |
| `options.endTime?` | `string` | - |
| `options.sort?` | `"date"` \| `"category"` | - |
| `options.order?` | `"desc"` \| `"asc"` | - |
| `options.category?` | `string` | - |
| `options.serviceName?` | `string` | - |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |

#### Returns

`Promise`\<[`GetList`](../-internal-/interfaces/GetList.md)\>

Paginated list of seller documents with metadata

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Remarks

The `sort` and `order` parameters work together — specifying `order` without `sort` has no effect. The `beginTime` and `endTime` parameters define a date range and should be used as a pair.

#### See

[https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty)

#### Example

```typescript
const result = await sdk.finances.getDocumentsList({
  locale: 'ru',
  sort: 'date',
  order: 'desc',
});
console.log(result);
```

***

### getDocumentsDownload()

```ts
getDocumentsDownload(options: {
  serviceName: string;
  extension: string;
}): Promise<GetDoc>;
```

Defined in: [modules/finances/index.ts:141](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L141)

Получить документ

Метод загружает один документ из [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `serviceName`: `string`; `extension`: `string`; \} | Query parameters including required serviceName and extension |
| `options.serviceName` | `string` | - |
| `options.extension` | `string` | - |

#### Returns

`Promise`\<[`GetDoc`](../-internal-/interfaces/GetDoc.md)\>

Document file data for the requested document

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty)

#### Example

```typescript
const result = await sdk.finances.getDocumentsDownload({
  serviceName: 'act',
  extension: 'pdf',
});
console.log(result);
```

***

### createDownloadAll()

```ts
createDownloadAll(data?: RequestDownload): Promise<GetDocs>;
```

Defined in: [modules/finances/index.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L168)

Получить документы

Метод загружает несколько документов из [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 минут | 1 запрос | 5 минут | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | [`RequestDownload`](../-internal-/interfaces/RequestDownload.md) | Request body data |

#### Returns

`Promise`\<[`GetDocs`](../-internal-/interfaces/GetDocs.md)\>

Download details for the requested batch of documents

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty)

#### Example

```typescript
const result = await sdk.finances.createDownloadAll({
  serviceNames: ['act', 'invoice'],
});
console.log(result);
```

***

### getSalesReportsList()

```ts
getSalesReportsList(data: SalesReportListRequest): Promise<SalesReportListItem[]>;
```

Defined in: [modules/finances/index.ts:211](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L211)

Список отчётов реализации (v1)

Returns list of sales reports by report format. Data available from 2025-01-01.

**Available token types**: Personal, Service (NOT Basic or Test)

Rate limit: 1 req/min, 1 minute interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SalesReportListRequest`](../-internal-/interfaces/SalesReportListRequest.md) | Request body with dateFrom, dateTo, limit, offset, period |

#### Returns

`Promise`\<[`SalesReportListItem`](../-internal-/interfaces/SalesReportListItem.md)[]\>

Array of SalesReportListItem (money sums as string — use parseMoneyAmount helper)

#### Throws

When token type is Basic or Test — this endpoint requires Personal or Service token (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsList)

#### Since

v3.7.0

#### Example

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const reports = await sdk.finances.getSalesReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  period: 'weekly',
});
console.log(parseMoneyAmount(reports[0].forPaySum));
```

***

### getSalesReportsDetailed()

```ts
getSalesReportsDetailed(data: SalesReportDetailedRequest): Promise<SalesReportDetailedItem[]>;
```

Defined in: [modules/finances/index.ts:251](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L251)

Детализации к отчётам реализации за период (v1)

Returns detailed rows for sales reports within a date range. Replaces the deprecated v5 method.
Data available from 2024-01-29. Supports selective field loading via `fields` parameter.

**Available token types**: Personal, Service (NOT Basic or Test)

Rate limit: 1 req/min, 1 minute interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SalesReportDetailedRequest`](../-internal-/interfaces/SalesReportDetailedRequest.md) | Request body with dateFrom, dateTo, limit, rrdId, period, fields |

#### Returns

`Promise`\<[`SalesReportDetailedItem`](../-internal-/interfaces/SalesReportDetailedItem.md)[]\>

Array of SalesReportDetailedItem (~70 fields, money amounts as string — use parseMoneyAmount)

#### Throws

When token type is Basic or Test — this endpoint requires Personal or Service token (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsDetailed](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsDetailed)

#### Since

v3.7.0

#### Example

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getSalesReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  limit: 100000,
  rrdId: 0,
  fields: ['rrdId', 'nmId', 'forPay'],  // Optional: load only specific fields
});
const totalPayout = rows.reduce((sum, r) => sum + parseMoneyAmount(r.forPay), 0);
```

***

### getSalesReportsDetailedByReportId()

```ts
getSalesReportsDetailedByReportId(reportId: string | number | bigint, data: SalesReportDetailedByIdRequest): Promise<SalesReportDetailedItem[]>;
```

Defined in: [modules/finances/index.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L295)

Детализации к отчётам реализации по ID отчёта (v1)

Returns detailed rows for a specific report by its ID. Data available from 2025-01-01.

**BigInt precision note**: For daily reports, `reportId` may exceed `Number.MAX_SAFE_INTEGER` (2^53).
If you obtained the ID from `getSalesReportsList()` response (which returns `number`),
standard JSON parsing may already have truncated precision. For precision-safe handling,
fetch the ID via a custom BigInt-aware parser and pass it as `bigint` or `string`.

**Available token types**: Personal, Service (NOT Basic or Test)

Rate limit: 1 req/min, 1 minute interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` \| `number` \| `bigint` | Report ID (number for typical use, bigint/string for BigInt precision on daily reports) |
| `data` | [`SalesReportDetailedByIdRequest`](../-internal-/interfaces/SalesReportDetailedByIdRequest.md) | Request body with optional limit, rrdId, fields |

#### Returns

`Promise`\<[`SalesReportDetailedItem`](../-internal-/interfaces/SalesReportDetailedItem.md)[]\>

Array of SalesReportDetailedItem

#### Throws

When token type is Basic or Test — this endpoint requires Personal or Service token (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsDetailedReportId](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1SalesReportsDetailedReportId)

#### Since

v3.7.0

#### Example

```typescript
// Typical weekly report usage:
const rows = await sdk.finances.getSalesReportsDetailedByReportId(307401554);

// Daily report with BigInt precision:
const rows = await sdk.finances.getSalesReportsDetailedByReportId('9007199254740993', {
  fields: ['rrdId', 'nmId', 'retailAmount'],
});
```

***

### getAcquiringReportsList()

```ts
getAcquiringReportsList(data: AcquiringReportListRequest): Promise<AcquiringReportListItem[]>;
```

Defined in: [modules/finances/index.ts:341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L341)

Список отчётов об издержках на приём платежей (v1)

Returns list of acquiring reports. **Available only to Russian sellers.**

**Available token types**: Personal, Service (NOT Basic or Test)

Rate limit: 1 req/min, 1 minute interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`AcquiringReportListRequest`](../-internal-/interfaces/AcquiringReportListRequest.md) | Request body with dateFrom, dateTo, limit, offset |

#### Returns

`Promise`\<[`AcquiringReportListItem`](../-internal-/interfaces/AcquiringReportListItem.md)[]\>

Array of AcquiringReportListItem (money sums as string — use parseMoneyAmount helper)

#### Throws

When token type is Basic or Test — this endpoint requires Personal or Service token

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringList](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringList)

#### Since

v3.7.0

#### Example

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const reports = await sdk.finances.getAcquiringReportsList({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
});
const totalFees = reports.reduce(
  (sum, r) => sum + parseMoneyAmount(r.acquiringFeeSum), 0
);
```

***

### getAcquiringReportsDetailed()

```ts
getAcquiringReportsDetailed(data: AcquiringReportDetailedRequest): Promise<AcquiringReportDetailedItem[]>;
```

Defined in: [modules/finances/index.ts:385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L385)

Детализации к отчётам об издержках на приём платежей за период (v1)

Returns detailed rows for acquiring reports within a date range.
**Available only to Russian sellers.** Supports selective field loading via `fields` parameter.

**Available token types**: Personal, Service (NOT Basic or Test)

Rate limit: 1 req/min, 1 minute interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`AcquiringReportDetailedRequest`](../-internal-/interfaces/AcquiringReportDetailedRequest.md) | Request body with dateFrom, dateTo, limit, rrdId, fields |

#### Returns

`Promise`\<[`AcquiringReportDetailedItem`](../-internal-/interfaces/AcquiringReportDetailedItem.md)[]\>

Array of AcquiringReportDetailedItem (money amounts as string — use parseMoneyAmount)

#### Throws

When token type is Basic or Test — this endpoint requires Personal or Service token

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailed](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailed)

#### Since

v3.7.0

#### Example

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

const rows = await sdk.finances.getAcquiringReportsDetailed({
  dateFrom: '2026-03-17',
  dateTo: '2026-03-20',
  limit: 100000,
  rrdId: 0,
  fields: ['rrdId', 'acquiringBank', 'acquiringFee'],
});
const totalFees = rows.reduce(
  (sum, r) => sum + parseMoneyAmount(r.acquiringFee), 0
);
```

***

### getAcquiringReportsDetailedByReportId()

```ts
getAcquiringReportsDetailedByReportId(reportId: string | number | bigint, data: AcquiringReportDetailedByIdRequest): Promise<AcquiringReportDetailedItem[]>;
```

Defined in: [modules/finances/index.ts:431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/modules/finances/index.ts#L431)

Детализации к отчётам об издержках на приём платежей по ID отчёта (v1)

Returns detailed rows for a specific acquiring report by ID.
**Available only to Russian sellers.**

**BigInt precision note**: For daily reports, `reportId` may exceed `Number.MAX_SAFE_INTEGER`.
Pass as `bigint` or `string` for precision-safe handling.

**Available token types**: Personal, Service (NOT Basic or Test)

Rate limit: 1 req/min, 1 minute interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` \| `number` \| `bigint` | Report ID (number/bigint/string) |
| `data` | [`AcquiringReportDetailedByIdRequest`](../-internal-/interfaces/AcquiringReportDetailedByIdRequest.md) | Request body with optional limit, rrdId, fields |

#### Returns

`Promise`\<[`AcquiringReportDetailedItem`](../-internal-/interfaces/AcquiringReportDetailedItem.md)[]\>

Array of AcquiringReportDetailedItem

#### Throws

When token type is Basic or Test — this endpoint requires Personal or Service token

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailedReportId](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty/operation/postV1AcquiringDetailedReportId)

#### Since

v3.7.0

#### Example

```typescript
import { parseMoneyAmount } from 'daytona-wildberries-typescript-sdk';

// Typical number reportId
const rows = await sdk.finances.getAcquiringReportsDetailedByReportId(307401554);

// BigInt precision for daily reports — pass as string or bigint
const rows = await sdk.finances.getAcquiringReportsDetailedByReportId(
  '9007199254740993',
  { fields: ['rrdId', 'acquiringFee'] }
);
```
