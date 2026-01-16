[Wildberries API TypeScript SDK](../modules.md) / FinancesModule

# Class: FinancesModule

Defined in: [modules/finances/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L10)

## Constructors

### Constructor

```ts
new FinancesModule(client: BaseClient): FinancesModule;
```

Defined in: [modules/finances/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`FinancesModule`

## Methods

### getAccountBalance()

```ts
getAccountBalance(): Promise<{
  currency?: string;
  current?: number;
  for_withdraw?: number;
}>;
```

Defined in: [modules/finances/index.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L27)

Получить баланс продавца

Метод возвращает данные виджета баланса на [главной странице](https://seller.wildberries.ru) портала продавцов. <br><br> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Returns

`Promise`\<\{
  `currency?`: `string`;
  `current?`: `number`;
  `for_withdraw?`: `number`;
\}\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.getAccountBalance();
console.log(result);
```

***

### getSupplierReportdetailbyperiod()

```ts
getSupplierReportdetailbyperiod(options?: {
  dateFrom: string;
  dateTo: string;
  limit?: number;
  rrdid?: number;
  period?: "weekly" | "daily";
}): Promise<DetailReportItem[]>;
```

Defined in: [modules/finances/index.ts:46](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L46)

Отчёт о продажах по реализации

Метод возвращает детализации к [отчётам реализации](https://seller.wildberries.ru/suppliers-mutual-settlements). <br><br> Данные доступны с 29 января 2024 года. <div class="description_important"> Вы можете выгрузить данные в <a href="https://dev.wildberries.ru/ru/cases/1">Google Таблицы</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; `limit?`: `number`; `rrdid?`: `number`; `period?`: `"weekly"` \| `"daily"`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |
| `options.limit?` | `number` | - |
| `options.rrdid?` | `number` | - |
| `options.period?` | `"weekly"` \| `"daily"` | - |

#### Returns

`Promise`\<[`DetailReportItem`](../-internal-/interfaces/DetailReportItem.md)[]\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.getSupplierReportdetailbyperiod({});
console.log(result);
```

***

### getDocumentsCategories()

```ts
getDocumentsCategories(options?: {
  locale?: string;
}): Promise<GetCategories>;
```

Defined in: [modules/finances/index.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L65)

Категории документов

Метод возвращает категории документов для получения [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |

#### Returns

`Promise`\<[`GetCategories`](../-internal-/interfaces/GetCategories.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.getDocumentsCategories({});
console.log(result);
```

***

### getDocumentsList()

```ts
getDocumentsList(options?: {
  locale?: string;
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

Defined in: [modules/finances/index.ts:84](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L84)

Список документов

Метод возвращает список документов продавца. Вы можете получить [один](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1download/get) или [несколько](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1download~1all/post) документов из полученного списка. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; `beginTime?`: `string`; `endTime?`: `string`; `sort?`: `"date"` \| `"category"`; `order?`: `"desc"` \| `"asc"`; `category?`: `string`; `serviceName?`: `string`; `limit?`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.locale?` | `string` | - |
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

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.getDocumentsList({});
console.log(result);
```

***

### getDocumentsDownload()

```ts
getDocumentsDownload(options?: {
  serviceName: string;
  extension: string;
}): Promise<GetDoc>;
```

Defined in: [modules/finances/index.ts:103](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L103)

Получить документ

Метод загружает один документ из [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `serviceName`: `string`; `extension`: `string`; \} | Query parameters |
| `options.serviceName?` | `string` | - |
| `options.extension?` | `string` | - |

#### Returns

`Promise`\<[`GetDoc`](../-internal-/interfaces/GetDoc.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.getDocumentsDownload({});
console.log(result);
```

***

### createDownloadAll()

```ts
createDownloadAll(data?: RequestDownload): Promise<GetDocs>;
```

Defined in: [modules/finances/index.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/finances/index.ts#L122)

Получить документы

Метод загружает несколько документов из [списка документов продавца](/openapi/financial-reports-and-accounting#tag/Dokumenty/paths/~1api~1v1~1documents~1list/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 минут | 1 запрос | 5 минут | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | [`RequestDownload`](../-internal-/interfaces/RequestDownload.md) | Request body data |

#### Returns

`Promise`\<[`GetDocs`](../-internal-/interfaces/GetDocs.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Example

```ts
const result = await sdk.general.createDownloadAll({});
console.log(result);
```
