[Wildberries API TypeScript SDK](../modules.md) / AnalyticsModule

# Class: AnalyticsModule

Defined in: [modules/analytics/index.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L48)

## Constructors

### Constructor

```ts
new AnalyticsModule(client: BaseClient): AnalyticsModule;
```

Defined in: [modules/analytics/index.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L49)

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

Defined in: [modules/analytics/index.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L69)

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

Defined in: [modules/analytics/index.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L100)

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

Defined in: [modules/analytics/index.ts:135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L135)

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

Defined in: [modules/analytics/index.ts:165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L165)

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

Defined in: [modules/analytics/index.ts:191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L191)

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

Defined in: [modules/analytics/index.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L221)

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

Defined in: [modules/analytics/index.ts:251](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L251)

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

Defined in: [modules/analytics/index.ts:280](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L280)

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

Defined in: [modules/analytics/index.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L308)

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

Defined in: [modules/analytics/index.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L337)

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

Defined in: [modules/analytics/index.ts:364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L364)

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

Defined in: [modules/analytics/index.ts:392](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L392)

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

Defined in: [modules/analytics/index.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L419)

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

Defined in: [modules/analytics/index.ts:455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L455)

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

Defined in: [modules/analytics/index.ts:487](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L487)

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

Defined in: [modules/analytics/index.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L518)

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

***

### getWbWarehousesStock()

```ts
getWbWarehousesStock(data?: WbWarehousesStockRequest): Promise<WbWarehousesStockResponse>;
```

Defined in: [modules/analytics/index.ts:570](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/modules/analytics/index.ts#L570)

Текущие остатки на складах WB

Возвращает актуальные остатки товаров на складах Wildberries.
Данные обновляются раз в 30 минут. Одна строка = один размер на одном складе.
Результаты отсортированы по возрастанию nmId.

Доступен только для токенов типа Personal и Service.

**Заменяет устаревший метод** `GET /api/v1/supplier/stocks`,
который будет отключён 23 июня 2026.

Rate limit: 3 requests per minute, 20-second interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | [`WbWarehousesStockRequest`](../-internal-/interfaces/WbWarehousesStockRequest.md) | Filter and pagination parameters (all optional) |

#### Returns

`Promise`\<[`WbWarehousesStockResponse`](../-internal-/interfaces/WbWarehousesStockResponse.md)\>

Current inventory with warehouse IDs, region names, quantities

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

3.4.0

#### See

[https://dev.wildberries.ru/docs/openapi/analytics#tag/Istoriya-ostatkov/operation/postV1StocksReportWbWarehouses](https://dev.wildberries.ru/docs/openapi/analytics#tag/Istoriya-ostatkov/operation/postV1StocksReportWbWarehouses)

#### Example

```typescript
// Get all inventory
const stock = await sdk.analytics.getWbWarehousesStock();
for (const item of stock.data.items) {
  console.log(`${item.warehouseName} (${item.regionName}): ${item.quantity} шт.`);
}

// With filters and pagination
const page = await sdk.analytics.getWbWarehousesStock({
  nmIds: [395996251],
  limit: 100,
  offset: 0,
});
```
