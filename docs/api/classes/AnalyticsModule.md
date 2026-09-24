[Wildberries API TypeScript SDK](../modules.md) / AnalyticsModule

# Class: AnalyticsModule

Defined in: [modules/analytics/index.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L57)

## Constructors

### Constructor

```ts
new AnalyticsModule(client: BaseClient): AnalyticsModule;
```

Defined in: [modules/analytics/index.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L58)

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

Defined in: [modules/analytics/index.ts:78](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L78)

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
  | StocksReportReq
| InventoryHistoryReportReq): Promise<NmReportCreateReportResponse>;
```

Defined in: [modules/analytics/index.ts:113](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L113)

Создать отчёт

Метод создаёт задание на генерацию отчёта с расширенной аналитикой продавца.
Вы можете создать CSV-версии отчётов по воронке продаж или параметрам поиска с группировкой по артикулам WB, предметам, брендам и ярлыкам.
В отчётах по воронке продаж можно группировать данные по дням, неделям или месяцам.
Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.

Rate limit: 3 requests/minute, 20-second interval, burst 3

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \| [`SalesFunnelProductReq`](../-internal-/interfaces/SalesFunnelProductReq.md) \| [`SalesFunnelGroupReq`](../-internal-/interfaces/SalesFunnelGroupReq.md) \| [`SearchReportGroupReq`](../-internal-/interfaces/SearchReportGroupReq.md) \| [`SearchReportProductReq`](../-internal-/interfaces/SearchReportProductReq.md) \| [`SearchReportTextReq`](../-internal-/interfaces/SearchReportTextReq.md) \| [`StocksReportReq`](../-internal-/interfaces/StocksReportReq.md) \| [`InventoryHistoryReportReq`](../-internal-/interfaces/InventoryHistoryReportReq.md) | Request body data |

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

⚠️ Для типов отчётов STOCK_HISTORY_REPORT_CSV и STOCK_HISTORY_DAILY_CSV с 17.09.2026
данные обновляются 1 раз в 2 часа (новость WB от 2026-09). Для остатков без задержки —
{@link AnalyticsModule.getSellerWarehousesStock} / {@link AnalyticsModule.getWbWarehousesStock} (task-190).
```

***

### createDownloadsRetry()

```ts
createDownloadsRetry(data: NmReportRetryReportRequest): Promise<NmReportRetryReportResponse>;
```

Defined in: [modules/analytics/index.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L149)

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

Defined in: [modules/analytics/index.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L179)

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

Defined in: [modules/analytics/index.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L205)

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

Defined in: [modules/analytics/index.ts:235](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L235)

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

Defined in: [modules/analytics/index.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L265)

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

Defined in: [modules/analytics/index.ts:294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L294)

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

Defined in: [modules/analytics/index.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L322)

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

Defined in: [modules/analytics/index.ts:355](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L355)

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

⚠️ С 17.09.2026 данные истории остатков обновляются 1 раз в 2 часа (новость WB от 2026-09).
Для остатков без задержки используйте {@link AnalyticsModule.getSellerWarehousesStock}
или {@link AnalyticsModule.getWbWarehousesStock} (task-190).
```

***

### createProductsProduct()

```ts
createProductsProduct(data: TableProductRequest): Promise<{
  data: TableProductResponse;
}>;
```

Defined in: [modules/analytics/index.ts:386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L386)

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

⚠️ С 17.09.2026 данные истории остатков обновляются 1 раз в 2 часа (новость WB от 2026-09).
Для остатков без задержки используйте {@link AnalyticsModule.getSellerWarehousesStock}
или {@link AnalyticsModule.getWbWarehousesStock} (task-190).
```

***

### createProductsSize()

```ts
createProductsSize(data: CommonSizeFilters): Promise<{
  data: TableSizeResponse;
}>;
```

Defined in: [modules/analytics/index.ts:418](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L418)

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

⚠️ С 17.09.2026 данные истории остатков обновляются 1 раз в 2 часа (новость WB от 2026-09).
Для остатков без задержки используйте {@link AnalyticsModule.getSellerWarehousesStock}
или {@link AnalyticsModule.getWbWarehousesStock} (task-190).
```

***

### createStocksReportOffice()

```ts
createStocksReportOffice(data: CommonShippingOfficeFilters): Promise<{
  data: TableShippingOfficeResponse;
}>;
```

Defined in: [modules/analytics/index.ts:449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L449)

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

⚠️ С 17.09.2026 данные истории остатков обновляются 1 раз в 2 часа (новость WB от 2026-09).
Для остатков без задержки используйте {@link AnalyticsModule.getSellerWarehousesStock}
или {@link AnalyticsModule.getWbWarehousesStock} (task-190).
```

***

### getSalesFunnelProducts()

```ts
getSalesFunnelProducts(data: SalesFunnelProductsRequest): Promise<SalesFunnelProductsResponse>;
```

Defined in: [modules/analytics/index.ts:485](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L485)

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

Defined in: [modules/analytics/index.ts:517](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L517)

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

Defined in: [modules/analytics/index.ts:548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L548)

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

Defined in: [modules/analytics/index.ts:604](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L604)

Текущие остатки на складах WB

Возвращает актуальные остатки товаров на складах Wildberries.
Данные обновляются раз в 30 минут. Одна строка = один размер на одном складе.
Результаты отсортированы по возрастанию nmId.

Доступен только для токенов типа Personal и Service.

**WB expanded access:** now also available to registered/authorized services
via a basic token + secret (not just personal/service tokens).

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

 - [https://dev.wildberries.ru/docs/openapi/analytics#tag/Istoriya-ostatkov/operation/postV1StocksReportWbWarehouses](https://dev.wildberries.ru/docs/openapi/analytics#tag/Istoriya-ostatkov/operation/postV1StocksReportWbWarehouses)
 - [Stocks History guide](https://dev.wildberries.ru/knowledge-base/articles/019ef14c-c72d-717a-9fc2-b0b2f361dc80)

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

***

### getSellerWarehousesStock()

```ts
getSellerWarehousesStock(data?: SellerWarehousesStockRequest): Promise<SellerWarehousesStockResponse>;
```

Defined in: [modules/analytics/index.ts:658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L658)

Текущие остатки на складах продавца

Возвращает актуальные остатки товаров на складах продавца (FBS) сразу по
ВСЕМ складам — в запросе не нужно передавать ID складов и размеры товаров
(фильтры nmIds/chrtIds опциональны).

Данные обновляются раз в 30 минут. Одна строка ответа = один размер
товара на одном складе продавца.

Доступен только для токенов типа Personal и Service.

**Заменяет использование** `POST /api/v3/stocks/{warehouseId}`
(`sdk.products.getStocks`) — WB recommends this report instead
of fetching stocks warehouse-by-warehouse.

Rate limit: 3 requests per minute, 20-second interval, burst 1 (strict)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | [`SellerWarehousesStockRequest`](../-internal-/interfaces/SellerWarehousesStockRequest.md) | Filter and pagination parameters (all optional) |

#### Returns

`Promise`\<[`SellerWarehousesStockResponse`](../-internal-/interfaces/SellerWarehousesStockResponse.md)\>

Current seller-warehouse inventory with warehouse IDs, region names, quantities

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

task-199

#### See

[https://dev.wildberries.ru/docs/openapi/analytics#tag/stocksReport/operation/postAnalyticsV1StocksReportSellerWarehouses](https://dev.wildberries.ru/docs/openapi/analytics#tag/stocksReport/operation/postAnalyticsV1StocksReportSellerWarehouses)

#### Example

```typescript
// Get inventory across ALL seller warehouses — no warehouse/size IDs needed
const stock = await sdk.analytics.getSellerWarehousesStock();
for (const item of stock.data.items) {
  console.log(`${item.warehouseName} (${item.regionName}): ${item.quantity} шт.`);
}

// With filters and pagination
const page = await sdk.analytics.getSellerWarehousesStock({
  nmIds: [395996251],
  limit: 100,
  offset: 0,
});
```

***

### getOrderFeed()

```ts
getOrderFeed(data: OrderFeedRequest): Promise<OrderFeedResponseWrapper>;
```

Defined in: [modules/analytics/index.ts:745](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L745)

Лента заказов — заказы и продажи в одном отчёте (реальном времени)

Метод формирует датасет по заказам и продажам продавца. Данные отчёта
обновляются **в реальном времени**. 1 заказ = 1 сборочное задание =
1 единица товара.

В отличие от устаревших отчётов `GET /api/v1/supplier/orders` и
`GET /api/v1/supplier/sales`, заказы и выкупы возвращаются **одним
методом**: статус заказа меняется в той же строке (`created` → `buyout`
/ `cancel` / `return` / `returnDefective`), отдельные строки для выкупа
не создаются. При отмене (`status: "cancel"`) дополнительно возвращается
причина `cancelType` (`app` — отказ до получения, `receipt` — отказ в
пункте выдачи, `expire` — истёк срок хранения, `other` — техническая
отмена). Поле `isB2b` разделяет B2B/B2C-продажи.

**Статусы — единственные изменяемые поля**: чтобы отслеживать переходы
заказа между статусами, повторно запрашивайте тот же период — строка
обновится на месте. Период выбирается **по дате текущего статуса**
заказа, максимум 31 день назад.

Фильтры `nmIds`, `subjectIds`, `brandNames`, `tagIds` можно передавать
пустыми массивами `[]` — тогда вернутся все заказы продавца. Несколько
фильтров объединяются по И (AND); если ни один заказ не подошёл,
вернётся пустой массив `[]`.

Пагинация выполняется по `offset` **в пределах одного снимка данных**:
данные обновляются асинхронно, поэтому все запросы одной выборки должны
использовать один и тот же курсор `snapshotTime` (из ответа на первый
запрос с `offset: 0`). При смене периода или фильтров начинайте выборку
заново с `offset: 0` и без `snapshotTime`.

**Заменяет** `GET /api/v1/supplier/orders` и `GET /api/v1/supplier/sales`
(`sdk.reports.getSupplierOrders` / `sdk.reports.getSupplierSales`) —
оба ещё работают, но WB анонсировала их будущее отключение (дата не
объявлена).

Rate limit: 1 запрос в минуту, интервал 1 минута, burst 1.
Базовый токен без секрет: 1 запрос в 3 часа.

Доступен для любого типа токена, категория Analytics.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`OrderFeedRequest`](../-internal-/interfaces/OrderFeedRequest.md) | Период, фильтры и параметры пагинации |

#### Returns

`Promise`\<[`OrderFeedResponseWrapper`](../-internal-/interfaces/OrderFeedResponseWrapper.md)\>

Снимок данных с курсором `snapshotTime`, валютой и списком заказов

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

task-204

#### See

[https://dev.wildberries.ru/docs/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed](https://dev.wildberries.ru/docs/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed)

#### Example

```typescript
// Первая страница — offset: 0, без snapshotTime
const first = await sdk.analytics.getOrderFeed({
  selectedPeriod: { start: '2026-08-24T00:00:00Z', end: '2026-09-23T00:00:00Z' },
  pagination: { offset: 0, limit: 1000 },
});

// Следующие страницы — тот же курсор snapshotTime из первого ответа
let snapshot = first.data.snapshotTime;
let offset = first.data.orders.length;
while (offset < 5000) { // пока не собрано всё (лимит запроса — 1 в минуту)
  const page = await sdk.analytics.getOrderFeed({
    selectedPeriod: { start: '2026-08-24T00:00:00Z', end: '2026-09-23T00:00:00Z' },
    pagination: { snapshotTime: snapshot, offset, limit: 1000 },
  });
  if (page.data.orders.length === 0) break;
  offset += page.data.orders.length;
}
```

***

### getItemRatingV2()

```ts
getItemRatingV2(data: ItemRatingV2Request): Promise<ItemRatingV2ResponseWrapper>;
```

Defined in: [modules/analytics/index.ts:781](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L781)

Get the v2 item-rating report, including catalog visibility.

Use `onlyShadowedNms: true` to replace the deprecated
`reports.getBannedProductsShadowed()` report. Each returned item includes
`isShadowed`, and the per-product array is named `items` (not the v1 `cards`).

Rate limit: 3 requests per minute, 20s interval, burst 3.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ItemRatingV2Request`](../-internal-/interfaces/ItemRatingV2Request.md) | V2 report filters, sorting, and pagination. |

#### Returns

`Promise`\<[`ItemRatingV2ResponseWrapper`](../-internal-/interfaces/ItemRatingV2ResponseWrapper.md)\>

Seller rating, feedback summary, and per-product rows with `isShadowed`.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Since

4.1.0

#### See

[https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV2ItemRating](https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV2ItemRating)

#### Example

```typescript
const hiddenProducts = await sdk.analytics.getItemRatingV2({
  currentPeriod: { start: '2026-07-01', end: '2026-07-18' },
  onlyShadowedNms: true,
  orderBy: { field: 'feedbackCount', mode: 'desc' },
  offset: 0,
});
console.log(hiddenProducts.data.items[0]?.isShadowed);
```

***

### ~~getItemRating()~~

```ts
getItemRating(data: ItemRatingRequest): Promise<ItemRatingResponseWrapper>;
```

Defined in: [modules/analytics/index.ts:842](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/modules/analytics/index.ts#L842)

Get item rating with feedback distribution.

Returns the seller rating, a feedback-increase summary (total + per-star 1-5
with optional dynamics vs. the previous period), and a per-item breakdown
of feedback counts and star distribution.

Rate limit: 3 requests per minute, 20s interval, burst 3.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`ItemRatingRequest`](../-internal-/interfaces/ItemRatingRequest.md) | Request parameters. `currentPeriod`, `orderBy`, and `offset` are required. Pass `pastPeriod` to enable compare mode (yields `dynamics` fields in the response). |

#### Returns

`Promise`\<[`ItemRatingResponseWrapper`](../-internal-/interfaces/ItemRatingResponseWrapper.md)\>

Seller rating, feedback-increase summary, and per-item array.

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### Deprecated

Scheduled for removal by Wildberries on 2026-07-30. Use
[AnalyticsModule.getItemRatingV2](#getitemratingv2); note the v2 response uses `items`
instead of `cards` and the no-sales filter is `isNotIncludeNmsWithoutSales`.

#### Since

3.16.0

#### See

[https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV1ItemRating](https://dev.wildberries.ru/docs/openapi/analytics#tag/Ocenka-tovara/operation/postV1ItemRating)

#### Example

```typescript
// Period mode (single period, no dynamics)
const rating = await sdk.analytics.getItemRating({
  currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
  orderBy: { field: 'feedbackCount', mode: 'desc' },
  offset: 0,
  limit: 100,
});
console.log(rating.data.sellerRating.current); // e.g. 3.56

// Compare mode (current + past period — yields `dynamics` fields)
const compared = await sdk.analytics.getItemRating({
  currentPeriod: { start: '2026-02-10', end: '2026-02-10' },
  pastPeriod: { start: '2026-02-08', end: '2026-02-08' },
  nmIds: [162579635, 166699779],
  orderBy: { field: 'fiveStar', mode: 'desc' },
  offset: 0,
});
console.log(compared.data.feedbackIncrease.fiveStar.dynamics); // % change vs past period
```
