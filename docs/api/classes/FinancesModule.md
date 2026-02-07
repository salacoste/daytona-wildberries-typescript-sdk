[Wildberries API TypeScript SDK](../modules.md) / FinancesModule

# Class: FinancesModule

Defined in: [modules/finances/index.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L19)

## Constructors

### Constructor

```ts
new FinancesModule(client: BaseClient): FinancesModule;
```

Defined in: [modules/finances/index.ts:20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L20)

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

Defined in: [modules/finances/index.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L39)

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

### getSupplierReportDetailByPeriod()

```ts
getSupplierReportDetailByPeriod(options: {
  dateFrom: string;
  dateTo: string;
  limit?: number;
  rrdid?: number;
  period?: "weekly" | "daily";
}): Promise<DetailReportItem[]>;
```

Defined in: [modules/finances/index.ts:68](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L68)

Отчёт о продажах по реализации

Метод возвращает детализации к [отчётам реализации](https://seller.wildberries.ru/suppliers-mutual-settlements). <br><br> Данные доступны с 29 января 2024 года. <div class="description_important"> Вы можете выгрузить данные в <a href="https://dev.wildberries.ru/ru/cases/1">Google Таблицы</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | \{ `dateFrom`: `string`; `dateTo`: `string`; `limit?`: `number`; `rrdid?`: `number`; `period?`: `"weekly"` \| `"daily"`; \} | Query parameters including required dateFrom and dateTo |
| `options.dateFrom` | `string` | - |
| `options.dateTo` | `string` | - |
| `options.limit?` | `number` | - |
| `options.rrdid?` | `number` | - |
| `options.period?` | `"weekly"` \| `"daily"` | - |

#### Returns

`Promise`\<[`DetailReportItem`](../-internal-/interfaces/DetailReportItem.md)[]\>

Array of detailed report items for the specified period

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty](https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty)

#### Example

```typescript
const result = await sdk.finances.getSupplierReportDetailByPeriod({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31',
  period: 'weekly',
});
console.log(result);
```

***

### getDocumentsCategories()

```ts
getDocumentsCategories(options?: {
  locale?: DocumentsLocale;
}): Promise<GetCategories>;
```

Defined in: [modules/finances/index.ts:99](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L99)

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

Defined in: [modules/finances/index.ts:130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L130)

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

The `sort` and `order` parameters work together — specifying `order` without `sort` has no effect.

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

Defined in: [modules/finances/index.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L168)

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

Defined in: [modules/finances/index.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/78738509e2ed1dae9297c4199278cfbc419b5742/src/modules/finances/index.ts#L195)

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
