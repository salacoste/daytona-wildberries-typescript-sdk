[Wildberries API TypeScript SDK](../modules.md) / AnalyticsModule

# Class: AnalyticsModule

Defined in: [modules/analytics/index.ts:46](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L46)

## Constructors

### Constructor

```ts
new AnalyticsModule(client: BaseClient): AnalyticsModule;
```

Defined in: [modules/analytics/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L47)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`AnalyticsModule`

## Methods

### getNmReportDownloads()

```ts
getNmReportDownloads(options?: {
  filter[downloadIds]?: string[];
}): Promise<NmReportGetReportsResponse>;
```

Defined in: [modules/analytics/index.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L67)

Получить список отчётов

Метод возвращает список отчётов с расширенной аналитикой продавца. Ответ содержит ID созданных отчётов и статусы генерации.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `filter[downloadIds]?`: `string`[]; \} | Query parameters |
| `options.filter[downloadIds]?` | `string`[] | - |

#### Returns

`Promise`\<[`NmReportGetReportsResponse`](../-internal-/interfaces/NmReportGetReportsResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV](https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV)

#### Example

```ts
const result = await sdk.analytics.getNmReportDownloads({});
console.log(result);
```

***

### createNmReportDownload()

```ts
createNmReportDownload(data?: 
  | SalesFunnelProductReq
  | SalesFunnelGroupReq
  | SearchReportGroupReq
  | SearchReportProductReq
  | SearchReportTextReq
| StocksReportReq): Promise<NmReportCreateReportResponse>;
```

Defined in: [modules/analytics/index.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L98)

Создать отчёт

Метод создаёт задание на генерацию отчёта с расширенной аналитикой продавца.
Вы можете создать CSV-версии отчётов по воронке продаж или параметрам поиска с группировкой по артикулам WB, предметам, брендам и ярлыкам.
В отчётах по воронке продаж можно группировать данные по дням, неделям или месяцам.
Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \| [`SalesFunnelProductReq`](../-internal-/interfaces/SalesFunnelProductReq.md) \| [`SalesFunnelGroupReq`](../-internal-/interfaces/SalesFunnelGroupReq.md) \| [`SearchReportGroupReq`](../-internal-/interfaces/SearchReportGroupReq.md) \| [`SearchReportProductReq`](../-internal-/interfaces/SearchReportProductReq.md) \| [`SearchReportTextReq`](../-internal-/interfaces/SearchReportTextReq.md) \| [`StocksReportReq`](../-internal-/interfaces/StocksReportReq.md) | Request body data |

#### Returns

`Promise`\<[`NmReportCreateReportResponse`](../-internal-/interfaces/NmReportCreateReportResponse.md)\>

Успешно

#### Remarks

Daily limit: 20 reports per day per seller account.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV](https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV)

#### Example

```ts
const result = await sdk.analytics.createNmReportDownload({});
console.log(result);
```

***

### createDownloadsRetry()

```ts
createDownloadsRetry(data: NmReportRetryReportRequest): Promise<NmReportRetryReportResponse>;
```

Defined in: [modules/analytics/index.ts:133](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L133)

Сгенерировать отчёт повторно

Метод создает повторное задание на генерацию отчёта с расширенной аналитикой продавца.
Необходимо, если при генерации отчёта вы получили статус `FAILED`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`NmReportRetryReportRequest`](../-internal-/interfaces/NmReportRetryReportRequest.md) | Request body data |

#### Returns

`Promise`\<[`NmReportRetryReportResponse`](../-internal-/interfaces/NmReportRetryReportResponse.md)\>

Успешно

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV](https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV)

#### Example

```ts
const result = await sdk.analytics.createDownloadsRetry({});
console.log(result);
```

***

### getDownloadsFile()

```ts
getDownloadsFile(downloadId: string): Promise<ArrayBuffer>;
```

Defined in: [modules/analytics/index.ts:163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L163)

Получить отчёт

Метод возвращает отчёт с расширенной аналитикой продавца по ID задания на генерацию.
Можно получить отчёт, который сгенерирован за последние 48 часов.
Отчёт будет загружен внутри архива ZIP в формате CSV.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `downloadId` | `string` | ID отчёта (UUID format) |

#### Returns

`Promise`\<`ArrayBuffer`\>

Успешно - ZIP архив с CSV файлом

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV](https://dev.wildberries.ru/openapi/seller-analytics#tag/Analitika-prodavca-CSV)

#### Example

```ts
const result = await sdk.analytics.getDownloadsFile('downloadId-value');
console.log(result);
```

***

### createSearchReportReport()

```ts
createSearchReportReport(data: MainRequest): Promise<CommonResponseProperties & {
  data: MainResponse;
}>;
```

Defined in: [modules/analytics/index.ts:189](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L189)

Основная страница

Метод формирует набор данных для основной страницы отчёта по поисковым запросам с общей информацией, позициями товаров, данными по видимости и переходам в карточку, данными для таблицы по группам.
Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`MainRequest`](../-internal-/interfaces/MainRequest.md) | Request body data |

#### Returns

`Promise`\<[`CommonResponseProperties`](../-internal-/interfaces/CommonResponseProperties.md) & \{
  `data`: [`MainResponse`](../-internal-/interfaces/MainResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy](https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy)

#### Example

```ts
const result = await sdk.analytics.createSearchReportReport({});
console.log(result);
```

***

### createTableGroup()

```ts
createTableGroup(data: TableGroupRequest): Promise<CommonResponseProperties & {
  data: TableGroupResponse;
}>;
```

Defined in: [modules/analytics/index.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L219)

Пагинация по группам

Метод формирует дополнительные данные к основному отчёту с пагинацией по группам.
Пагинация возможна только при наличии фильтра по бренду, предмету или ярлыку.
Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`TableGroupRequest`](../-internal-/interfaces/TableGroupRequest.md) | Request body data |

#### Returns

`Promise`\<[`CommonResponseProperties`](../-internal-/interfaces/CommonResponseProperties.md) & \{
  `data`: [`TableGroupResponse`](../-internal-/interfaces/TableGroupResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy](https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy)

#### Example

```ts
const result = await sdk.analytics.createTableGroup({});
console.log(result);
```

***

### createTableDetail()

```ts
createTableDetail(data: TableDetailsRequest): Promise<CommonResponseProperties & {
  data: TableDetailsResponse;
}>;
```

Defined in: [modules/analytics/index.ts:249](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L249)

Пагинация по товарам в группе

Метод формирует дополнительные данные к основному отчёту с пагинацией по товарам в группе.
Пагинация возможна вне зависимости от наличия фильтров.
Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`TableDetailsRequest`](../-internal-/interfaces/TableDetailsRequest.md) | Request body data |

#### Returns

`Promise`\<[`CommonResponseProperties`](../-internal-/interfaces/CommonResponseProperties.md) & \{
  `data`: [`TableDetailsResponse`](../-internal-/interfaces/TableDetailsResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy](https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy)

#### Example

```ts
const result = await sdk.analytics.createTableDetail({});
console.log(result);
```

***

### createProductSearchText()

```ts
createProductSearchText(data: ProductSearchTextsRequest): Promise<CommonResponseProperties & {
  data: ProductSearchTextsResponse;
}>;
```

Defined in: [modules/analytics/index.ts:278](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L278)

Поисковые запросы по товару

Метод формирует топ поисковых запросов по товару.
Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ProductSearchTextsRequest`](../-internal-/interfaces/ProductSearchTextsRequest.md) | Request body data |

#### Returns

`Promise`\<[`CommonResponseProperties`](../-internal-/interfaces/CommonResponseProperties.md) & \{
  `data`: [`ProductSearchTextsResponse`](../-internal-/interfaces/ProductSearchTextsResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy](https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy)

#### Example

```ts
const result = await sdk.analytics.createProductSearchText({});
console.log(result);
```

***

### createProductOrder()

```ts
createProductOrder(data: ProductOrdersRequest): Promise<CommonResponseProperties & {
  data: ProductOrdersResponse;
}>;
```

Defined in: [modules/analytics/index.ts:306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L306)

Заказы и позиции по поисковым запросам товара

Метод формирует данные для таблицы по количеству заказов и позиций в поиске по запросам покупателя.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ProductOrdersRequest`](../-internal-/interfaces/ProductOrdersRequest.md) | Request body data |

#### Returns

`Promise`\<[`CommonResponseProperties`](../-internal-/interfaces/CommonResponseProperties.md) & \{
  `data`: [`ProductOrdersResponse`](../-internal-/interfaces/ProductOrdersResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy](https://dev.wildberries.ru/openapi/seller-analytics#tag/Poiskovye-zaprosy)

#### Example

```ts
const result = await sdk.analytics.createProductOrder({});
console.log(result);
```

***

### createProductsGroup()

```ts
createProductsGroup(data: TableGroupRequestSt): Promise<{
  data: TableGroupResponseSt;
}>;
```

Defined in: [modules/analytics/index.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L335)

Данные по группам

Метод формирует набор данных об остатках по группам товаров.
Группа товаров описывается кортежем `subjectID, brandName, tagID`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`TableGroupRequestSt`](../-internal-/type-aliases/TableGroupRequestSt.md) | Request body data |

#### Returns

`Promise`\<\{
  `data`: [`TableGroupResponseSt`](../-internal-/interfaces/TableGroupResponseSt.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov](https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov)

#### Example

```ts
const result = await sdk.analytics.createProductsGroup({});
console.log(result);
```

***

### createProductsProduct()

```ts
createProductsProduct(data: TableProductRequest): Promise<{
  data: TableProductResponse;
}>;
```

Defined in: [modules/analytics/index.ts:362](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L362)

Данные по товарам

Метод формирует набор данных об остатках по товарам.
Можно получить данные как по отдельным товарам, так и в рамках всего отчёта — если в запросе отсутствуют фильтры: `nmIDs`, `subjectID`, `brandName`, `tagID`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`TableProductRequest`](../-internal-/type-aliases/TableProductRequest.md) | Request body data |

#### Returns

`Promise`\<\{
  `data`: [`TableProductResponse`](../-internal-/interfaces/TableProductResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov](https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov)

#### Example

```ts
const result = await sdk.analytics.createProductsProduct({});
console.log(result);
```

***

### createProductsSize()

```ts
createProductsSize(data: CommonSizeFilters): Promise<{
  data: TableSizeResponse;
}>;
```

Defined in: [modules/analytics/index.ts:390](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L390)

Данные по размерам

Метод формирует набор данных об остатках по размерам товара.
Товар не имеет размера, если у него единственный размер с `"techSize":"0"`.
Данные по складам Маркетплейс (FBS) приходят в агрегированном виде.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`CommonSizeFilters`](../-internal-/interfaces/CommonSizeFilters.md) | Request body data |

#### Returns

`Promise`\<\{
  `data`: [`TableSizeResponse`](../-internal-/interfaces/TableSizeResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov](https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov)

#### Example

```ts
const result = await sdk.analytics.createProductsSize({});
console.log(result);
```

***

### createStocksReportOffice()

```ts
createStocksReportOffice(data: CommonShippingOfficeFilters): Promise<{
  data: TableShippingOfficeResponse;
}>;
```

Defined in: [modules/analytics/index.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L417)

Данные по складам

Метод формирует набор данных об остатках по складам.
Данные по складам Маркетплейс (FBS) приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`CommonShippingOfficeFilters`](../-internal-/interfaces/CommonShippingOfficeFilters.md) | Request body data |

#### Returns

`Promise`\<\{
  `data`: [`TableShippingOfficeResponse`](../-internal-/interfaces/TableShippingOfficeResponse.md);
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

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov](https://dev.wildberries.ru/openapi/seller-analytics#tag/Istoriya-ostatkov)

#### Example

```ts
const result = await sdk.analytics.createStocksReportOffice({});
console.log(result);
```

***

### getSalesFunnelProducts()

```ts
getSalesFunnelProducts(data: SalesFunnelProductsRequest): Promise<SalesFunnelProductsResponse>;
```

Defined in: [modules/analytics/index.ts:453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L453)

Статистика карточек товаров за период (v3)

Возвращает отчёт о товарах с ключевыми показателями — переходы в карточку,
добавления в корзину, заказы — за текущий и прошлый периоды.

Rate limit: 3 requests/minute, 20-second interval, 3-request burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SalesFunnelProductsRequest`](../-internal-/interfaces/SalesFunnelProductsRequest.md) | Request parameters |

#### Returns

`Promise`\<[`SalesFunnelProductsResponse`](../-internal-/interfaces/SalesFunnelProductsResponse.md)\>

Sales funnel products statistics

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh](https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh)

#### Example

```ts
const result = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  orderBy: { field: 'orderCount', mode: 'desc' },
  limit: 10,
  offset: 0,
});
console.log(result.products);
```

***

### getSalesFunnelProductsHistory()

```ts
getSalesFunnelProductsHistory(data: SalesFunnelProductsHistoryRequest): Promise<SalesFunnelProductsHistoryResponse>;
```

Defined in: [modules/analytics/index.ts:485](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L485)

Статистика карточек товаров по дням (v3)

Возвращает статистику карточек товаров по дням или неделям.

Rate limit: 3 requests/minute, 20-second interval, 3-request burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SalesFunnelProductsHistoryRequest`](../-internal-/interfaces/SalesFunnelProductsHistoryRequest.md) | Request parameters |

#### Returns

`Promise`\<[`SalesFunnelProductsHistoryResponse`](../-internal-/type-aliases/SalesFunnelProductsHistoryResponse.md)\>

Products history statistics

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh](https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh)

#### Example

```ts
const result = await sdk.analytics.getSalesFunnelProductsHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  nmIds: [268913787],
  aggregationLevel: 'day',
});
console.log(result);
```

***

### getSalesFunnelGroupedHistory()

```ts
getSalesFunnelGroupedHistory(data: SalesFunnelGroupedHistoryRequest): Promise<SalesFunnelGroupedHistoryResponse>;
```

Defined in: [modules/analytics/index.ts:516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/modules/analytics/index.ts#L516)

Статистика групп карточек товаров по дням (v3)

Возвращает статистику карточек товаров по дням, сгруппированных по предметам, брендам и ярлыкам.

Rate limit: 3 requests/minute, 20-second interval, 3-request burst

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`SalesFunnelGroupedHistoryRequest`](../-internal-/interfaces/SalesFunnelGroupedHistoryRequest.md) | Request parameters |

#### Returns

`Promise`\<[`SalesFunnelGroupedHistoryResponse`](../-internal-/type-aliases/SalesFunnelGroupedHistoryResponse.md)\>

Grouped history statistics

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

[https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh](https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh)

#### Example

```ts
const result = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  aggregationLevel: 'day',
});
console.log(result);
```
