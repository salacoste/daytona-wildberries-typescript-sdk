[Wildberries API TypeScript SDK](../modules.md) / AnalyticsModule

# Class: AnalyticsModule

Defined in: [modules/analytics/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L10)

## Constructors

### Constructor

```ts
new AnalyticsModule(client: BaseClient): AnalyticsModule;
```

Defined in: [modules/analytics/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`AnalyticsModule`

## Methods

### createNmReportDetail()

```ts
createNmReportDetail(data: NmReportDetailRequest): Promise<NmReportDetailResponse>;
```

Defined in: [modules/analytics/index.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L28)

Статистика карточек товаров за период

Метод формирует отчёт о товарах, сравнивая ключевые показатели — например, добавления в корзину, заказы и переходы в карточку товара — за текущий период с аналогичным прошлым.<br><br> Параметры `brandNames`,`objectIDs`, `tagIDs`, `nmIDs` могут быть пустыми `[]`, тогда в ответе возвращаются все карточки продавца.<br><br> Если выбрано несколько параметров, в ответе будут карточки, в которых есть одновременно все эти параметры. Если карточки не подходят по параметрам запроса, вернётся пустой ответ `[]`.<br><br> Можно получить отчёт максимум за последние 365 дней.<br><br> В данных предыдущего периода: * Данные в `previousPeriod` указаны за такой же период, что и в `selectedPeriod`. * Если дата начала `previousPeriod` раньше, чем год назад от текущей даты, она будет приведена к виду: `previousPeriod.begin = текущая дата — 365 дней.` <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`NmReportDetailRequest`](../-internal-/interfaces/NmReportDetailRequest.md) | Parameter |

#### Returns

`Promise`\<[`NmReportDetailResponse`](../-internal-/interfaces/NmReportDetailResponse.md)\>

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
const result = await sdk.general.createNmReportDetail({});
console.log(result);
```

***

### createDetailHistory()

```ts
createDetailHistory(data: NmReportDetailHistoryRequest): Promise<NmReportDetailHistoryResponse>;
```

Defined in: [modules/analytics/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L47)

Статистика карточек товаров по дням

Метод возвращает статистику карточек товаров по дням. Можно получить данные по добавлениям в корзину, заказам, переходам в карточку товара и так далее.<br><br> Можно получить данные максимум за последнюю неделю. <div class="description_important"> Чтобы получать <a href="/openapi/analytics#tag/Analitika-prodavca-CSV">отчёты за период до года</a>, подпишитесь на <a href='https://seller.wildberries.ru/monetization/jam'>расширенную аналитику Джем</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`NmReportDetailHistoryRequest`](../-internal-/interfaces/NmReportDetailHistoryRequest.md) | Parameter |

#### Returns

`Promise`\<[`NmReportDetailHistoryResponse`](../-internal-/interfaces/NmReportDetailHistoryResponse.md)\>

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
const result = await sdk.general.createDetailHistory({});
console.log(result);
```

***

### createGroupedHistory()

```ts
createGroupedHistory(data: NmReportGroupedHistoryRequest): Promise<NmReportGroupedHistoryResponse>;
```

Defined in: [modules/analytics/index.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L66)

Статистика групп карточек товаров по дням

Метод возвращает статистику карточек товаров по дням. Карточки товаров сгруппированы по предметам, брендам и ярлыкам. Можно получить данные по добавлениям в корзину, заказам, переходам в карточку товара и так далее.<br><br> Параметры `brandNames`, `objectIDs`, `tagIDs` могут быть пустыми `[]`, тогда группировка происходит по всем карточкам продавца.<br><br> Произведение количества предметов, брендов, ярлыков в запросе может быть не больше 16.<br><br> Можно получить данные максимум за последнюю неделю. <div class="description_important"> Чтобы получать <a href="/openapi/analytics#tag/Analitika-prodavca-CSV">отчёты за период до года</a>, подпишитесь на <a href='https://seller.wildberries.ru/monetization/jam'>расширенную аналитику Джем</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | [`NmReportGroupedHistoryRequest`](../-internal-/interfaces/NmReportGroupedHistoryRequest.md) | Parameter |

#### Returns

`Promise`\<[`NmReportGroupedHistoryResponse`](../-internal-/interfaces/NmReportGroupedHistoryResponse.md)\>

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
const result = await sdk.general.createGroupedHistory({});
console.log(result);
```

***

### getNmReportDownloads()

```ts
getNmReportDownloads(options?: {
  filter[downloadIds]?: string[];
}): Promise<NmReportGetReportsResponse>;
```

Defined in: [modules/analytics/index.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L85)

Получить список отчётов

Метод возвращает список отчётов с расширенной аналитикой продавца. Ответ содержит ID [созданных отчётов](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/post) и статусы генерации. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.getNmReportDownloads({});
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

Defined in: [modules/analytics/index.ts:104](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L104)

Создать отчёт

Метод создаёт задание на генерацию отчёта с расширенной аналитикой продавца.<br><br> Вы можете создать CSV-версии отчётов по [воронке продаж](/openapi/analytics#tag/Voronka-prodazh) или [параметрам поиска](/openapi/analytics#tag/Poiskovye-zaprosy) с группировкой по: * артикулам WB * предметам, брендам и ярлыкам В отчётах по воронке продаж можно группировать данные по дням, неделям или месяцам.<br><br> Также можете создать CSV-версии отчётов по [текстам поисковых запросов](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1product~1search-texts/post) и [истории остатков](/openapi/analytics#tag/Istoriya-ostatkov).<br><br> Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`.<br><br> Если не удалось [получить отчёт](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads~1file~1%7BdownloadId%7D/get), можно создать [повторное задание на генерацию](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads~1retry/post). Также можно [получить список и проверить статусы](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/get) отчётов. <div class="description_important"> Отчёт по <a href="https://seller.wildberries.ru/content-analytics/history-remains">истории остатков</a> — модель <code>StocksReportReq</code> — можно создать без подписки <a href="https://seller.wildberries.ru/monetization/jam">Джем</a> </div> <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data?` | \| [`SalesFunnelProductReq`](../-internal-/interfaces/SalesFunnelProductReq.md) \| [`SalesFunnelGroupReq`](../-internal-/interfaces/SalesFunnelGroupReq.md) \| [`SearchReportGroupReq`](../-internal-/interfaces/SearchReportGroupReq.md) \| [`SearchReportProductReq`](../-internal-/interfaces/SearchReportProductReq.md) \| [`SearchReportTextReq`](../-internal-/interfaces/SearchReportTextReq.md) \| [`StocksReportReq`](../-internal-/interfaces/StocksReportReq.md) | Request body data |

#### Returns

`Promise`\<[`NmReportCreateReportResponse`](../-internal-/interfaces/NmReportCreateReportResponse.md)\>

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
const result = await sdk.general.createNmReportDownload({});
console.log(result);
```

***

### createDownloadsRetry()

```ts
createDownloadsRetry(data: NmReportRetryReportRequest): Promise<NmReportRetryReportResponse>;
```

Defined in: [modules/analytics/index.ts:123](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L123)

Сгенерировать отчёт повторно

Метод создает повторное [задание на генерацию](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/post) отчёта с расширенной аналитикой продавца. Необходимо, если при генерации отчёта вы [получили статус](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/get) `FAILED`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createDownloadsRetry({});
console.log(result);
```

***

### getDownloadsFile()

```ts
getDownloadsFile(downloadId: string): Promise<unknown>;
```

Defined in: [modules/analytics/index.ts:142](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L142)

Получить отчёт

Метод возвращает отчёт с расширенной аналитикой продавца по ID [задания на генерацию](/openapi/analytics#tag/Analitika-prodavca-CSV/paths/~1api~1v2~1nm-report~1downloads/post). <br><br> Можно получить отчёт, который сгенерирован за последние 48 часов.<br>Отчёт будет загружен внутри архива ZIP в формате CSV. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `downloadId` | `string` | ID отчёта |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.general.getDownloadsFile('downloadId-value');
console.log(result);
```

***

### createSearchReportReport()

```ts
createSearchReportReport(data: MainRequest): Promise<CommonResponseProperties & {
  data: MainResponse;
}>;
```

Defined in: [modules/analytics/index.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L161)

Основная страница

Метод формирует набор данных для основной страницы отчёта по поисковым запросам с: - общей информацией - позициями товаров - данными по видимости и переходам в карточку - данными для таблицы по группам Для получения дополнительных данных в таблице используйте отдельный запрос для: - [пагинации по группам](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1table~1groups/post) - [получения по товарам в группе](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1table~1details/post) Дополнительный параметр выбора списка товаров в таблице: - `positionCluster` — средняя позиция в поиске Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createSearchReportReport({});
console.log(result);
```

***

### createTableGroup()

```ts
createTableGroup(data: TableGroupRequest): Promise<CommonResponseProperties & {
  data: TableGroupResponse;
}>;
```

Defined in: [modules/analytics/index.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L180)

Пагинация по группам

Метод формирует дополнительные данные к [основному отчёту](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1report/post) с пагинацией по группам. Пагинация возможна только при наличии фильтра по бренду, предмету или ярлыку.<br><br> Дополнительный параметр выбора списка товаров в таблице: - `positionCluster` — средняя позиция в поиске Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createTableGroup({});
console.log(result);
```

***

### createTableDetail()

```ts
createTableDetail(data: TableDetailsRequest): Promise<CommonResponseProperties & {
  data: TableDetailsResponse;
}>;
```

Defined in: [modules/analytics/index.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L199)

Пагинация по товарам в группе

Метод формирует дополнительные данные к [основному отчёту](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1report/post) с пагинацией по товарам в группе. Пагинация возможна вне зависимости от наличия фильтров.<br><br> Фильтры для пагинации по товарам в группе или без фильтров: - кортеж `subjectId`,`brandName`,`tagId` — фильтр для группы - `nmIds` — фильтр по карточке товара Дополнительный параметр выбора списка товаров: - `positionCluster` — средняя позиция в поиске Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createTableDetail({});
console.log(result);
```

***

### createProductSearchText()

```ts
createProductSearchText(data: ProductSearchTextsRequest): Promise<CommonResponseProperties & {
  data: ProductSearchTextsResponse;
}>;
```

Defined in: [modules/analytics/index.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L218)

Поисковые запросы по товару

Метод формирует топ поисковых запросов по товару. Параметры выбора поисковых запросов: - `limit` — количество запросов, максимум 30 (для тарифа [Продвинутый](https://seller.wildberries.ru/monetization/tariffs) — 100) - `topOrderBy` — способ выбора топа запросов Параметры `includeSubstitutedSKUs` и `includeSearchTexts` не могут одновременно иметь значение `false`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createProductSearchText({});
console.log(result);
```

***

### createProductOrder()

```ts
createProductOrder(data: ProductOrdersRequest): Promise<CommonResponseProperties & {
  data: ProductOrdersResponse;
}>;
```

Defined in: [modules/analytics/index.ts:237](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L237)

Заказы и позиции по поисковым запросам товара

Метод формирует данные для таблицы по количеству заказов и позиций в поиске по запросам покупателя. Данные указаны в рамках периода для [запрошенного товара](/openapi/analytics#tag/Poiskovye-zaprosy/paths/~1api~1v2~1search-report~1product~1search-texts/post). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createProductOrder({});
console.log(result);
```

***

### createProductsGroup()

```ts
createProductsGroup(data: TableGroupRequestSt): Promise<{
  data: TableGroupResponseSt;
}>;
```

Defined in: [modules/analytics/index.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L256)

Данные по группам

Метод формирует набор данных об остатках по группам товаров. <br><br> Группа товаров описывается кортежем `subjectID, brandName, tagID`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createProductsGroup({});
console.log(result);
```

***

### createProductsProduct()

```ts
createProductsProduct(data: TableProductRequest): Promise<{
  data: TableProductResponse;
}>;
```

Defined in: [modules/analytics/index.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L275)

Данные по товарам

Метод формирует набор данных об остатках по товарам. <br><br> Можно получить данные как по отдельным товарам, так и в рамках всего отчёта — если в запросе отсутствуют фильтры: `nmIDs`, `subjectID`, `brandName`, `tagID`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createProductsProduct({});
console.log(result);
```

***

### createProductsSize()

```ts
createProductsSize(data: CommonSizeFilters): Promise<{
  data: TableSizeResponse;
}>;
```

Defined in: [modules/analytics/index.ts:294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L294)

Данные по размерам

Метод формирует набор данных об остатках по размерам товара. <br><br> Возможны случаи: 1. Товар имеет размеры и `"includeOffice":true`, тогда в ответе будут данные об остатках по каждому из размеров с вложенной детализацией по складам. 2. Товар имеет размеры и `"includeOffice":false`, тогда в ответе будут данные об остатках по каждому из размеров без вложенной детализации по складам. 3. Товар не имеет размера и `"includeOffice":true`, тогда в ответе будет детализация по складам. Без данных об остатках по каждому из размеров. 4. Товар не имеет размера и `"includeOffice":false`, тогда тело ответа будет пустым.<br></br> Товар не имеет размера, если у него единственный размер с `"techSize":"0"`. В ответах метода получения данных по [товарам](/openapi/analytics#tag/Istoriya-ostatkov/paths/~1api~1v2~1stocks-report~1products~1products/post) у таких товаров `"hasSizes":false`.<br></br> Данные по складам Маркетплейс (FBS) приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам — эти записи будут с `"regionName":"Маркетплейс"` и `"officeName":""`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createProductsSize({});
console.log(result);
```

***

### createStocksReportOffice()

```ts
createStocksReportOffice(data: CommonShippingOfficeFilters): Promise<{
  data: TableShippingOfficeResponse;
}>;
```

Defined in: [modules/analytics/index.ts:313](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/modules/analytics/index.ts#L313)

Данные по складам

Метод формирует набор данных об остатках по складам. <br><br> Данные по складам Маркетплейс (FBS) приходят в агрегированном виде — по всем сразу, без детализации по конкретным складам — эти записи будут с `"regionName":"Маркетплейс"` и `"offices":[]`. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 3 запроса | 20 секунд | 3 запроса | </div>

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

#### Example

```ts
const result = await sdk.general.createStocksReportOffice({});
console.log(result);
```
