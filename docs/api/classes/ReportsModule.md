[Wildberries API TypeScript SDK](../modules.md) / ReportsModule

# Class: ReportsModule

Defined in: [modules/reports/index.ts:36](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L36)

## Constructors

### Constructor

```ts
new ReportsModule(client: BaseClient): ReportsModule;
```

Defined in: [modules/reports/index.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L37)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`ReportsModule`

## Methods

### getSupplierStocks()

```ts
getSupplierStocks(options?: {
  dateFrom: string;
}): Promise<StocksItem[]>;
```

Defined in: [modules/reports/index.ts:54](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L54)

Склады

Метод возвращает количество остатков товаров на складах WB.<br>Данные обновляются раз в 30 минут. <br><br> Для одного ответа в системе установлено условное ограничение 60000 строк. Поэтому, чтобы получить все остатки, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom` используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все остатки уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |

#### Returns

`Promise`\<[`StocksItem`](../-internal-/interfaces/StocksItem.md)[]\>

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
const result = await sdk.reports.getSupplierStocks({});
console.log(result);
```

***

### getSupplierOrders()

```ts
getSupplierOrders(options?: {
  dateFrom: string;
  flag?: number;
}): Promise<OrdersItem[]>;
```

Defined in: [modules/reports/index.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L76)

Заказы

Метод возвращает информацию обо всех заказах.<br>Данные обновляются раз в 30 минут.<br><br> 1 строка = 1 заказ = 1 cборочное задание = 1 единица товара.<br>Для определения заказа рекомендуем использовать поле `srid`.<br><br> Информация о заказе хранится 90 дней с момента оформления.<br><br> Для одного ответа на запрос с `flag=0` или без `flag` в системе установлено условное ограничение 80000 строк. Поэтому, чтобы получить все заказы, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom` используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все заказы уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `flag?`: `number`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.flag?` | `number` | - |

#### Returns

`Promise`\<[`OrdersItem`](../-internal-/interfaces/OrdersItem.md)[]\>

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
const result = await sdk.reports.getSupplierOrders({});
console.log(result);
```

***

### getSupplierSales()

```ts
getSupplierSales(options?: {
  dateFrom: string;
  flag?: number;
}): Promise<SalesItem[]>;
```

Defined in: [modules/reports/index.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L98)

Продажи

Метод возвращает информацию о продажах и возвратах.<br>Данные обновляются раз в 30 минут.<br><br> 1 строка = 1 заказ = 1 cборочное задание = 1 единица товара.<br>Для определения заказа рекомендуем использовать поле `srid`.<br><br> Информация о заказе хранится 90 дней с момента оформления.<br><br> Для одного ответа на запрос с `flag=0` или без `flag` в системе установлено условное ограничение 80000 строк. Поэтому, чтобы получить все продажи и возвраты, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom `используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все продажи и возвраты уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `flag?`: `number`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.flag?` | `number` | - |

#### Returns

`Promise`\<[`SalesItem`](../-internal-/interfaces/SalesItem.md)[]\>

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
const result = await sdk.reports.getSupplierSales({});
console.log(result);
```

***

### createAnalyticsExciseReport()

```ts
createAnalyticsExciseReport(options?: {
  dateFrom: string;
  dateTo: string;
}, data?: ExciseReportRequest): Promise<ExciseReportResponse>;
```

Defined in: [modules/reports/index.ts:121](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L121)

Получить отчёт

Метод возвращает отчёт с [операциями по товарам с обязательной маркировкой](https://seller.wildberries.ru/analytics-reports/excise-report).<br><br> Данный отчёт можно сохранить в [формате таблиц](https://dev.wildberries.ru/cases/1). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 часов | 10 запросов | 30 минут | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |
| `data?` | [`ExciseReportRequest`](../-internal-/interfaces/ExciseReportRequest.md) | Request body data |

#### Returns

`Promise`\<[`ExciseReportResponse`](../-internal-/interfaces/ExciseReportResponse.md)\>

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
const result = await sdk.reports.createAnalyticsExciseReport({}, {});
console.log(result);
```

***

### warehouseRemains()

```ts
warehouseRemains(options?: {
  locale?: string;
  groupByBrand?: boolean;
  groupBySubject?: boolean;
  groupBySa?: boolean;
  groupByNm?: boolean;
  groupByBarcode?: boolean;
  groupBySize?: boolean;
  filterPics?: number;
  filterVolume?: number;
}): Promise<CreateTaskResponse>;
```

Defined in: [modules/reports/index.ts:147](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L147)

Создать отчёт

Метод создаёт [задание на генерацию](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1status/get) отчёта об [остатках на складах WB](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get).<br><br> Параметры `groupBy` и `filter` (группировки и фильтры) можно задать в любой комбинации — аналогично [версии](https://seller.wildberries.ru/analytics-reports/warehouse-remains) в личном кабинете. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; `groupByBrand?`: `boolean`; `groupBySubject?`: `boolean`; `groupBySa?`: `boolean`; `groupByNm?`: `boolean`; `groupByBarcode?`: `boolean`; `groupBySize?`: `boolean`; `filterPics?`: `number`; `filterVolume?`: `number`; \} | Query parameters |
| `options.locale?` | `string` | - |
| `options.groupByBrand?` | `boolean` | - |
| `options.groupBySubject?` | `boolean` | - |
| `options.groupBySa?` | `boolean` | - |
| `options.groupByNm?` | `boolean` | - |
| `options.groupByBarcode?` | `boolean` | - |
| `options.groupBySize?` | `boolean` | - |
| `options.filterPics?` | `number` | - |
| `options.filterVolume?` | `number` | - |

#### Returns

`Promise`\<[`CreateTaskResponse`](../-internal-/interfaces/CreateTaskResponse.md)\>

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
const result = await sdk.reports.warehouseRemains({});
console.log(result);
```

***

### getWarehouseRemainsTaskStatus()

```ts
getWarehouseRemainsTaskStatus(task_id: string): Promise<GetTasksResponse>;
```

Defined in: [modules/reports/index.ts:177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L177)

Проверить статус задания на генерацию отчёта об остатках на складах WB

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`GetTasksResponse`](../-internal-/interfaces/GetTasksResponse.md)\>

Статус задания

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
const result = await sdk.reports.getWarehouseRemainsTaskStatus('task-uuid');
console.log(result.data?.status);
```

***

### downloadWarehouseRemainsReport()

```ts
downloadWarehouseRemainsReport(task_id: string): Promise<WarehouseRemainsDownloadItem[]>;
```

Defined in: [modules/reports/index.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L197)

Получить отчёт об остатках на складах WB

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`WarehouseRemainsDownloadItem`](../-internal-/interfaces/WarehouseRemainsDownloadItem.md)[]\>

Данные отчёта

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
const result = await sdk.reports.downloadWarehouseRemainsReport('task-uuid');
console.log(result);
```

***

### getAnalyticsAntifraudDetails()

```ts
getAnalyticsAntifraudDetails(options?: {
  date?: string;
}): Promise<AntifraudDetailsResponse>;
```

Defined in: [modules/reports/index.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L219)

Самовыкупы

Метод возвращает отчёт об удержаниях за самовыкупы. Отчёт формируется каждую неделю по средам, до 7:00 по московскому времени, и содержит данные за одну неделю.<br><br> Удержание за самовыкуп — 30% от стоимости товаров.<br>Минимальная сумма всех удержаний — 100 000 ₽, если за неделю в ПВЗ привезли ваших товаров больше, чем на сумму 100 000 ₽.<br><br> Данные доступны с августа 2023. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 100 минут | 10 запросов | 10 минут | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `date?`: `string`; \} | Query parameters |
| `options.date?` | `string` | - |

#### Returns

`Promise`\<[`AntifraudDetailsResponse`](../-internal-/interfaces/AntifraudDetailsResponse.md)\>

Response data

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
const result = await sdk.reports.getAnalyticsAntifraudDetails({});
console.log(result);
```

***

### getAnalyticsGoodsLabeling()

```ts
getAnalyticsGoodsLabeling(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<GoodsLabelingResponse>;
```

Defined in: [modules/reports/index.ts:243](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L243)

Маркировка товара

Метод возвращает отчёт о штрафах за отсутствие обязательной маркировки товаров.<br> В отчёте представлены фотографии товаров, на которых маркировка отсутствует либо не считывается.<br><br> Можно получить данные максимум за 31 день. Данные доступны с марта 2024. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 минут | 10 запросов | 1 минута | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<[`GoodsLabelingResponse`](../-internal-/interfaces/GoodsLabelingResponse.md)\>

Response data

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
const result = await sdk.reports.getAnalyticsGoodsLabeling({});
console.log(result);
```

***

### acceptanceReport()

```ts
acceptanceReport(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<CreateTaskResponse>;
```

Defined in: [modules/reports/index.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L268)

Создать отчёт

Метод создаёт [задание на генерацию](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report~1tasks~1%7Btask_id%7D~1status/get) отчёта о [платной приёмке](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report~1tasks~1%7Btask_id%7D~1download/get).<br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<[`CreateTaskResponse`](../-internal-/interfaces/CreateTaskResponse.md)\>

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
const result = await sdk.reports.acceptanceReport({});
console.log(result);
```

***

### getAcceptanceReportTaskStatus()

```ts
getAcceptanceReportTaskStatus(task_id: string): Promise<GetTasksResponse>;
```

Defined in: [modules/reports/index.ts:291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L291)

Проверить статус задания на генерацию отчёта о платной приёмке

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`GetTasksResponse`](../-internal-/interfaces/GetTasksResponse.md)\>

Статус задания

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
const result = await sdk.reports.getAcceptanceReportTaskStatus('task-uuid');
console.log(result.data?.status);
```

***

### downloadAcceptanceReport()

```ts
downloadAcceptanceReport(task_id: string): Promise<AcceptanceReportDownloadItem[]>;
```

Defined in: [modules/reports/index.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L311)

Получить отчёт о платной приёмке

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`AcceptanceReportDownloadItem`](../-internal-/interfaces/AcceptanceReportDownloadItem.md)[]\>

Данные отчёта

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
const result = await sdk.reports.downloadAcceptanceReport('task-uuid');
console.log(result);
```

***

### paidStorage()

```ts
paidStorage(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<CreateTaskResponse>;
```

Defined in: [modules/reports/index.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L333)

Создать отчёт

Метод создаёт [задание на генерацию](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage~1tasks~1%7Btask_id%7D~1status/get) отчёта о [платном хранении](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage~1tasks~1%7Btask_id%7D~1download/get).<br><br> Можно получить отчёт максимум за 8 дней. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<[`CreateTaskResponse`](../-internal-/interfaces/CreateTaskResponse.md)\>

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
const result = await sdk.reports.paidStorage({});
console.log(result);
```

***

### getPaidStorageTaskStatus()

```ts
getPaidStorageTaskStatus(task_id: string): Promise<GetTasksResponse>;
```

Defined in: [modules/reports/index.ts:353](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L353)

Проверить статус задания на генерацию отчёта о платном хранении

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`GetTasksResponse`](../-internal-/interfaces/GetTasksResponse.md)\>

Статус задания

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
const result = await sdk.reports.getPaidStorageTaskStatus('task-uuid');
console.log(result.data?.status);
```

***

### downloadPaidStorageReport()

```ts
downloadPaidStorageReport(task_id: string): Promise<ResponsePaidStorage>;
```

Defined in: [modules/reports/index.ts:373](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L373)

Получить отчёт о платном хранении

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`ResponsePaidStorage`](../-internal-/type-aliases/ResponsePaidStorage.md)\>

Данные отчёта

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
const result = await sdk.reports.downloadPaidStorageReport('task-uuid');
console.log(result);
```

***

### getAnalyticsRegionSale()

```ts
getAnalyticsRegionSale(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<RegionSaleResponse>;
```

Defined in: [modules/reports/index.ts:395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L395)

Получить отчёт

Метод возвращает отчёт с [данными продаж, сгруппированных по регионам стран](https://seller.wildberries.ru/analytics-reports/region-sale).<br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<[`RegionSaleResponse`](../-internal-/interfaces/RegionSaleResponse.md)\>

Response data

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
const result = await sdk.reports.getAnalyticsRegionSale({});
console.log(result);
```

***

### getBrandShareBrands()

```ts
getBrandShareBrands(): Promise<BrandShareBrandsResponse>;
```

Defined in: [modules/reports/index.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L419)

Бренды продавца

Метод возвращает список брендов продавца для отчёта о [доле бренда в продажах](https://seller.wildberries.ru/analytics-reports/brand-share). <br><br> Можно получить только бренды, которые: - Продавались за последние 90 дней. - Есть на складе WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>

#### Returns

`Promise`\<[`BrandShareBrandsResponse`](../-internal-/interfaces/BrandShareBrandsResponse.md)\>

Response data

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
const result = await sdk.reports.getBrandShareBrands();
console.log(result);
```

***

### getBrandShareParentSubjects()

```ts
getBrandShareParentSubjects(options?: {
  locale?: string;
  brand: string;
  dateFrom: string;
  dateTo: string;
}): Promise<BrandShareParentSubjectsResponse>;
```

Defined in: [modules/reports/index.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L441)

Родительские категории бренда

Метод возвращает родительские категории бренда продавца для отчёта о [доле бренда в продажах](https://seller.wildberries.ru/analytics-reports/brand-share).<br><br> Можно получить отчёт максимум за 365 дней. Данные доступны с 1 ноября 2022. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 20 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `locale?`: `string`; `brand`: `string`; `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.locale?` | `string` | - |
| `options.brand?` | `string` | - |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<[`BrandShareParentSubjectsResponse`](../-internal-/interfaces/BrandShareParentSubjectsResponse.md)\>

Response data

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
const result = await sdk.reports.getBrandShareParentSubjects({});
console.log(result);
```

***

### getAnalyticsBrandShare()

```ts
getAnalyticsBrandShare(options?: {
  parentId: number;
  brand: string;
  dateFrom: string;
  dateTo: string;
}): Promise<BrandShareResponse>;
```

Defined in: [modules/reports/index.ts:468](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L468)

Получить отчёт

Метод возвращает отчёт о [доле бренда продавца в продажах](https://seller.wildberries.ru/analytics-reports/brand-share). <br><br> Можно получить отчёт максимум за 365 дней. Данные доступны с 1 ноября 2022. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 20 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `parentId`: `number`; `brand`: `string`; `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.parentId?` | `number` | - |
| `options.brand?` | `string` | - |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<[`BrandShareResponse`](../-internal-/interfaces/BrandShareResponse.md)\>

Response data

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
const result = await sdk.reports.getAnalyticsBrandShare({});
console.log(result);
```

***

### getBannedProductsBlocked()

```ts
getBannedProductsBlocked(options?: {
  sort: "brand" | "nmId" | "title" | "vendorCode" | "reason";
  order: "desc" | "asc";
}): Promise<BannedProductsBlockedResponse>;
```

Defined in: [modules/reports/index.ts:495](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L495)

Заблокированные карточки

Метод возвращает список [заблокированных карточек товаров продавца](https://seller.wildberries.ru/analytics-reports/banned-products) с причинами блокировки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `sort`: `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"reason"`; `order`: `"desc"` \| `"asc"`; \} | Query parameters |
| `options.sort?` | `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"reason"` | - |
| `options.order?` | `"desc"` \| `"asc"` | - |

#### Returns

`Promise`\<[`BannedProductsBlockedResponse`](../-internal-/interfaces/BannedProductsBlockedResponse.md)\>

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
const result = await sdk.reports.getBannedProductsBlocked({});
console.log(result);
```

***

### getBannedProductsShadowed()

```ts
getBannedProductsShadowed(options?: {
  sort: "brand" | "nmId" | "title" | "vendorCode" | "nmRating";
  order: "desc" | "asc";
}): Promise<BannedProductsShadowedResponse>;
```

Defined in: [modules/reports/index.ts:520](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L520)

Скрытые из каталога

Метод возвращает список [товаров продавца, скрытых из каталога](https://seller.wildberries.ru/analytics-reports/banned-products/shadowed). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `sort`: `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"nmRating"`; `order`: `"desc"` \| `"asc"`; \} | Query parameters |
| `options.sort?` | `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"nmRating"` | - |
| `options.order?` | `"desc"` \| `"asc"` | - |

#### Returns

`Promise`\<[`BannedProductsShadowedResponse`](../-internal-/interfaces/BannedProductsShadowedResponse.md)\>

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
const result = await sdk.reports.getBannedProductsShadowed({});
console.log(result);
```

***

### getAnalyticsGoodsReturn()

```ts
getAnalyticsGoodsReturn(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<GoodsReturnResponse>;
```

Defined in: [modules/reports/index.ts:545](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L545)

Получить отчёт

Метод возвращает отчёт о [возвратах товаров продавцу](https://seller.wildberries.ru/analytics-reports/goods-return). <br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<[`GoodsReturnResponse`](../-internal-/interfaces/GoodsReturnResponse.md)\>

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
const result = await sdk.reports.getAnalyticsGoodsReturn({});
console.log(result);
```

***

### getMeasurementPenalties()

```ts
getMeasurementPenalties(options: MeasurementPenaltiesParams): Promise<MeasurementPenaltiesResponse>;
```

Defined in: [modules/reports/index.ts:584](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L584)

Занижение габаритов упаковки (штрафы)

Метод возвращает отчёт об удержаниях за занижение габаритов упаковки.

Rate limit: 1 req/min, 1 min interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`MeasurementPenaltiesParams`](../-internal-/interfaces/MeasurementPenaltiesParams.md) | Query parameters |

#### Returns

`Promise`\<[`MeasurementPenaltiesResponse`](../-internal-/interfaces/MeasurementPenaltiesResponse.md)\>

Penalty reports with total count

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

EPIC 44 - New endpoint replacing tab=penalty on old warehouse-measurements

#### Example

```ts
const result = await sdk.reports.getMeasurementPenalties({
  dateTo: '2026-02-06',
  limit: 100
});
console.log(result.data?.reports);
```

***

### getWarehouseMeasurementsV2()

```ts
getWarehouseMeasurementsV2(options: WarehouseMeasurementsV2Params): Promise<WarehouseMeasurementsV2Response>;
```

Defined in: [modules/reports/index.ts:618](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L618)

Замеры склада

Метод возвращает отчёт о замерах склада.

Rate limit: 1 req/min, 1 min interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`WarehouseMeasurementsV2Params`](../-internal-/interfaces/WarehouseMeasurementsV2Params.md) | Query parameters |

#### Returns

`Promise`\<[`WarehouseMeasurementsV2Response`](../-internal-/interfaces/WarehouseMeasurementsV2Response.md)\>

Measurement reports with total count

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

EPIC 44 - New endpoint replacing tab=measurement on old warehouse-measurements

#### Example

```ts
const result = await sdk.reports.getWarehouseMeasurementsV2({
  dateTo: '2026-02-06',
  limit: 100
});
console.log(result.data?.reports);
```

***

### getDeductions()

```ts
getDeductions(options: DeductionsParams): Promise<DeductionsResponse>;
```

Defined in: [modules/reports/index.ts:657](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/modules/reports/index.ts#L657)

Удержания за подмену и некорректные вложения

Метод возвращает отчёт об удержаниях за подмену товара и некорректные вложения.
Заменяет удалённый endpoint /api/v1/analytics/incorrect-attachments.

Rate limit: 1 req/min, 1 min interval, burst 1

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options` | [`DeductionsParams`](../-internal-/interfaces/DeductionsParams.md) | Query parameters |

#### Returns

`Promise`\<[`DeductionsResponse`](../-internal-/interfaces/DeductionsResponse.md)\>

Deduction reports with total count

#### Throws

When API key is invalid (401/403)

#### Throws

When rate limit exceeded (429)

#### Throws

When request data is invalid (400/422)

#### Throws

When network request fails or times out

#### See

EPIC 44 - New endpoint replacing removed incorrect-attachments

#### Example

```ts
const result = await sdk.reports.getDeductions({
  dateTo: '2026-02-06',
  limit: 100,
  sort: 'dtBonus',
  order: 'desc'
});
console.log(result.data?.reports);
```
