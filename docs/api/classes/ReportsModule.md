[Wildberries API TypeScript SDK](../modules.md) / ReportsModule

# Class: ReportsModule

Defined in: [modules/reports/index.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L10)

## Constructors

### Constructor

```ts
new ReportsModule(client: BaseClient): ReportsModule;
```

Defined in: [modules/reports/index.ts:11](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L11)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`ReportsModule`

## Methods

### getSupplierIncomes()

```ts
getSupplierIncomes(options?: {
  dateFrom: string;
}): Promise<IncomesItem[]>;
```

Defined in: [modules/reports/index.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L28)

Поставки

Метод возвращает количество поставок товаров для хранения на складах WB.<br>Данные обновляются раз в 30 минут. <br><br> Для одного ответа в системе установлено условное ограничение 100000 строк. Поэтому, чтобы получить все поставки, может потребоваться более, чем один запрос. Во втором и далее запросе в параметре `dateFrom` используйте полное значение поля `lastChangeDate` из последней строки ответа на предыдущий запрос.<br> Если в ответе отдаётся пустой массив `[]`, все поставки уже выгружены. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |

#### Returns

`Promise`\<[`IncomesItem`](../-internal-/interfaces/IncomesItem.md)[]\>

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
const result = await sdk.general.getSupplierIncomes({});
console.log(result);
```

***

### getSupplierStocks()

```ts
getSupplierStocks(options?: {
  dateFrom: string;
}): Promise<StocksItem[]>;
```

Defined in: [modules/reports/index.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L47)

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
const result = await sdk.general.getSupplierStocks({});
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

Defined in: [modules/reports/index.ts:66](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L66)

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
const result = await sdk.general.getSupplierOrders({});
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

Defined in: [modules/reports/index.ts:85](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L85)

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
const result = await sdk.general.getSupplierSales({});
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

Defined in: [modules/reports/index.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L105)

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
const result = await sdk.general.createAnalyticsExciseReport({}, {});
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

Defined in: [modules/reports/index.ts:124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L124)

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
const result = await sdk.general.warehouseRemains({});
console.log(result);
```

***

### getTasksStatu()

```ts
getTasksStatu(task_id: string): Promise<GetTasksResponse>;
```

Defined in: [modules/reports/index.ts:143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L143)

Проверить статус

Метод возвращает статус [задания на генерацию](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains/get) отчёта об [остатках на складах WB](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`GetTasksResponse`](../-internal-/interfaces/GetTasksResponse.md)\>

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
const result = await sdk.general.getTasksStatu('task_id-value');
console.log(result);
```

***

### getTasksDownload()

```ts
getTasksDownload(task_id: string): Promise<{
  brand?: string;
  subjectName?: string;
  vendorCode?: string;
  nmId?: number;
  barcode?: string;
  techSize?: string;
  volume?: number;
  warehouses?: {
     warehouseName?: string;
     quantity?: number;
  }[];
}[]>;
```

Defined in: [modules/reports/index.ts:162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L162)

Получить отчёт

Метод возвращает отчёт об [остатках на складах WB](https://seller.wildberries.ru/analytics-reports/warehouse-remains) по ID [задания на генерацию](/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<\{
  `brand?`: `string`;
  `subjectName?`: `string`;
  `vendorCode?`: `string`;
  `nmId?`: `number`;
  `barcode?`: `string`;
  `techSize?`: `string`;
  `volume?`: `number`;
  `warehouses?`: \{
     `warehouseName?`: `string`;
     `quantity?`: `number`;
  \}[];
\}[]\>

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
const result = await sdk.general.getTasksDownload('task_id-value');
console.log(result);
```

***

### getAnalyticsWarehouseMeasurements()

```ts
getAnalyticsWarehouseMeasurements(options?: {
  dateFrom?: string;
  dateTo: string;
  tab: "penalty" | "measurement";
  limit: number;
  offset?: number;
}): Promise<
  | Penalty
| Measurement>;
```

Defined in: [modules/reports/index.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L181)

Занижение габаритов упаковки

Метод возвращает отчёты об [удержаниях за занижение габаритов упаковки](https://seller.wildberries.ru/analytics-reports/dimensions-penalties) и [замерах склада](https://seller.wildberries.ru/analytics-reports/dimensions-penalties/warehouse-measurements) <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 5 запросов | 12 секунд | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom?`: `string`; `dateTo`: `string`; `tab`: `"penalty"` \| `"measurement"`; `limit`: `number`; `offset?`: `number`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |
| `options.tab?` | `"penalty"` \| `"measurement"` | - |
| `options.limit?` | `number` | - |
| `options.offset?` | `number` | - |

#### Returns

`Promise`\<
  \| [`Penalty`](../-internal-/interfaces/Penalty.md)
  \| [`Measurement`](../-internal-/interfaces/Measurement.md)\>

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
const result = await sdk.general.getAnalyticsWarehouseMeasurements({});
console.log(result);
```

***

### getAnalyticsAntifraudDetails()

```ts
getAnalyticsAntifraudDetails(options?: {
  date?: string;
}): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L200)

Самовыкупы

Метод возвращает отчёт об удержаниях за самовыкупы. Отчёт формируется каждую неделю по средам, до 7:00 по московскому времени, и содержит данные за одну неделю.<br><br> Удержание за самовыкуп — 30% от стоимости товаров.<br>Минимальная сумма всех удержаний — 100 000 ₽, если за неделю в ПВЗ привезли ваших товаров больше, чем на сумму 100 000 ₽.<br><br> Данные доступны с августа 2023. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 100 минут | 10 запросов | 10 минут | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `date?`: `string`; \} | Query parameters |
| `options.date?` | `string` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.general.getAnalyticsAntifraudDetails({});
console.log(result);
```

***

### getAnalyticsIncorrectAttachments()

```ts
getAnalyticsIncorrectAttachments(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L219)

Подмена товара

Метод возвращает отчёт об удержаниях за отправку ошибочных товаров, пустых коробок или коробок без товара, но с посторонними предметами. В таких случаях удерживается 100% от стоимости заказа.<br><br> Можно получить отчёт максимум за 31 день. Данные доступны с июня 2023. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.general.getAnalyticsIncorrectAttachments({});
console.log(result);
```

***

### getAnalyticsGoodsLabeling()

```ts
getAnalyticsGoodsLabeling(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L238)

Маркировка товара

Метод возвращает отчёт о штрафах за отсутствие обязательной маркировки товаров.<br> В отчёте представлены фотографии товаров, на которых маркировка отсутствует либо не считывается.<br><br> Можно получить данные максимум за 31 день. Данные доступны с марта 2024. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 минут | 10 запросов | 1 минута | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.general.getAnalyticsGoodsLabeling({});
console.log(result);
```

***

### getAnalyticsCharacteristicsChange()

```ts
getAnalyticsCharacteristicsChange(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L257)

Смена характеристик

Метод возвращает отчёт об удержаниях за смену характеристик товара. Если товары после приёмки не соответствуют заявленным цветам и размерам, и на складе их перемаркировали с правильными характеристиками, по таким товарам назначается штраф.<br><br> Можно получить отчёт максимум за 31 день. Данные доступны с 28 декабря 2021. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 минут | 10 запросов | 1 минута | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.general.getAnalyticsCharacteristicsChange({});
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

Defined in: [modules/reports/index.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L276)

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
const result = await sdk.general.acceptanceReport({});
console.log(result);
```

***

### getTasksStatu2()

```ts
getTasksStatu2(task_id: string): Promise<GetTasksResponse>;
```

Defined in: [modules/reports/index.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L295)

Проверить статус

Метод возвращает статус [задания на генерацию](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report/get) отчёта о [платной приёмке](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report~1tasks~1%7Btask_id%7D~1download/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`GetTasksResponse`](../-internal-/interfaces/GetTasksResponse.md)\>

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
const result = await sdk.general.getTasksStatu('task_id-value');
console.log(result);
```

***

### getTasksDownload2()

```ts
getTasksDownload2(task_id: string): Promise<{
  count?: number;
  giCreateDate?: string;
  incomeId?: number;
  nmID?: number;
  shkCreateDate?: string;
  subjectName?: string;
  total?: number;
}[]>;
```

Defined in: [modules/reports/index.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L314)

Получить отчёт

Метод возвращает отчёт о [платной приёмке](https://seller.wildberries.ru/analytics-reports/acceptance-report) по ID [задания на генерацию](/openapi/reports#tag/Platnaya-priyomka/paths/~1api~1v1~1acceptance_report/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<\{
  `count?`: `number`;
  `giCreateDate?`: `string`;
  `incomeId?`: `number`;
  `nmID?`: `number`;
  `shkCreateDate?`: `string`;
  `subjectName?`: `string`;
  `total?`: `number`;
\}[]\>

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
const result = await sdk.general.getTasksDownload('task_id-value');
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

Defined in: [modules/reports/index.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L333)

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
const result = await sdk.general.paidStorage({});
console.log(result);
```

***

### getTasksStatu3()

```ts
getTasksStatu3(task_id: string): Promise<GetTasksResponse>;
```

Defined in: [modules/reports/index.ts:352](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L352)

Проверить статус

Метод возвращает статус [задания на генерацию](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage/get) отчёта о [платном хранении](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage~1tasks~1%7Btask_id%7D~1download/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 5 секунд | 1 запрос | 5 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`GetTasksResponse`](../-internal-/interfaces/GetTasksResponse.md)\>

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
const result = await sdk.general.getTasksStatu('task_id-value');
console.log(result);
```

***

### getTasksDownload3()

```ts
getTasksDownload3(task_id: string): Promise<ResponsePaidStorage>;
```

Defined in: [modules/reports/index.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L371)

Получить отчёт

Метод возвращает отчёт о [платном хранении](https://seller.wildberries.ru/analytics-reports/paid-storage/storage) по ID [задания на генерацию](/openapi/reports#tag/Platnoe-hranenie/paths/~1api~1v1~1paid_storage/get). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 1 запрос | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `task_id` | `string` | ID задания на генерацию |

#### Returns

`Promise`\<[`ResponsePaidStorage`](../-internal-/type-aliases/ResponsePaidStorage.md)\>

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
const result = await sdk.general.getTasksDownload('task_id-value');
console.log(result);
```

***

### getAnalyticsRegionSale()

```ts
getAnalyticsRegionSale(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:390](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L390)

Получить отчёт

Метод возвращает отчёт с [данными продаж, сгруппированных по регионам стран](https://seller.wildberries.ru/analytics-reports/region-sale).<br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 5 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.general.getAnalyticsRegionSale({});
console.log(result);
```

***

### getBrandShareBrands()

```ts
getBrandShareBrands(): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:408](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L408)

Бренды продавца

Метод возвращает список брендов продавца для отчёта о [доле бренда в продажах](https://seller.wildberries.ru/analytics-reports/brand-share). <br><br> Можно получить только бренды, которые: - Продавались за последние 90 дней. - Есть на складе WB. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>

#### Returns

`Promise`\<`unknown`\>

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
const result = await sdk.general.getBrandShareBrands();
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
}): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L427)

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

`Promise`\<`unknown`\>

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
const result = await sdk.general.getBrandShareParentSubjects({});
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
}): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L446)

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

`Promise`\<`unknown`\>

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
const result = await sdk.general.getAnalyticsBrandShare({});
console.log(result);
```

***

### getBannedProductsBlocked()

```ts
getBannedProductsBlocked(options?: {
  sort: "brand" | "nmId" | "title" | "vendorCode" | "reason";
  order: "desc" | "asc";
}): Promise<{
  report?: {
     brand?: string;
     nmId?: number;
     title?: string;
     vendorCode?: string;
     reason?: string;
  }[];
}>;
```

Defined in: [modules/reports/index.ts:465](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L465)

Заблокированные карточки

Метод возвращает список [заблокированных карточек товаров продавца](https://seller.wildberries.ru/analytics-reports/banned-products) с причинами блокировки. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `sort`: `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"reason"`; `order`: `"desc"` \| `"asc"`; \} | Query parameters |
| `options.sort?` | `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"reason"` | - |
| `options.order?` | `"desc"` \| `"asc"` | - |

#### Returns

`Promise`\<\{
  `report?`: \{
     `brand?`: `string`;
     `nmId?`: `number`;
     `title?`: `string`;
     `vendorCode?`: `string`;
     `reason?`: `string`;
  \}[];
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
const result = await sdk.general.getBannedProductsBlocked({});
console.log(result);
```

***

### getBannedProductsShadowed()

```ts
getBannedProductsShadowed(options?: {
  sort: "brand" | "nmId" | "title" | "vendorCode" | "nmRating";
  order: "desc" | "asc";
}): Promise<{
  report?: {
     brand?: string;
     nmId?: number;
     title?: string;
     vendorCode?: string;
     nmRating?: number;
  }[];
}>;
```

Defined in: [modules/reports/index.ts:484](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L484)

Скрытые из каталога

Метод возвращает список [товаров продавца, скрытых из каталога](https://seller.wildberries.ru/analytics-reports/banned-products/shadowed). <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 10 секунд | 1 запрос | 10 секунд | 6 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `sort`: `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"nmRating"`; `order`: `"desc"` \| `"asc"`; \} | Query parameters |
| `options.sort?` | `"brand"` \| `"nmId"` \| `"title"` \| `"vendorCode"` \| `"nmRating"` | - |
| `options.order?` | `"desc"` \| `"asc"` | - |

#### Returns

`Promise`\<\{
  `report?`: \{
     `brand?`: `string`;
     `nmId?`: `number`;
     `title?`: `string`;
     `vendorCode?`: `string`;
     `nmRating?`: `number`;
  \}[];
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
const result = await sdk.general.getBannedProductsShadowed({});
console.log(result);
```

***

### getAnalyticsGoodsReturn()

```ts
getAnalyticsGoodsReturn(options?: {
  dateFrom: string;
  dateTo: string;
}): Promise<{
  report?: {
     barcode?: string;
     brand?: string;
     completedDt?: string;
     dstOfficeAddress?: string;
     dstOfficeId?: number;
     expiredDt?: string;
     isStatusActive?: 0 | 1;
     nmId?: number;
     orderDt?: string;
     orderId?: number;
     readyToReturnDt?: string;
     reason?: string;
     returnType?: string;
     shkId?: number;
     srid?: string;
     status?: string;
     stickerId?: string;
     subjectName?: string;
     techSize?: string;
  }[];
}>;
```

Defined in: [modules/reports/index.ts:503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/modules/reports/index.ts#L503)

Получить отчёт

Метод возвращает отчёт о [возвратах товаров продавцу](https://seller.wildberries.ru/analytics-reports/goods-return). <br><br> Можно получить отчёт максимум за 31 день. <div class="description_limit"> <a href="/openapi/api-information#tag/Vvedenie/Limity-zaprosov">Лимит запросов</a> на один аккаунт продавца: | Период | Лимит | Интервал | Всплеск | | --- | --- | --- | --- | | 1 минута | 1 запрос | 1 минута | 10 запросов | </div>

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `options?` | \{ `dateFrom`: `string`; `dateTo`: `string`; \} | Query parameters |
| `options.dateFrom?` | `string` | - |
| `options.dateTo?` | `string` | - |

#### Returns

`Promise`\<\{
  `report?`: \{
     `barcode?`: `string`;
     `brand?`: `string`;
     `completedDt?`: `string`;
     `dstOfficeAddress?`: `string`;
     `dstOfficeId?`: `number`;
     `expiredDt?`: `string`;
     `isStatusActive?`: `0` \| `1`;
     `nmId?`: `number`;
     `orderDt?`: `string`;
     `orderId?`: `number`;
     `readyToReturnDt?`: `string`;
     `reason?`: `string`;
     `returnType?`: `string`;
     `shkId?`: `number`;
     `srid?`: `string`;
     `status?`: `string`;
     `stickerId?`: `string`;
     `subjectName?`: `string`;
     `techSize?`: `string`;
  \}[];
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
const result = await sdk.general.getAnalyticsGoodsReturn({});
console.log(result);
```
