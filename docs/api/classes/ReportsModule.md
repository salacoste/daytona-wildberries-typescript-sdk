[Wildberries API TypeScript SDK](../modules.md) / ReportsModule

# Class: ReportsModule

Defined in: [modules/reports/index.ts:42](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L42)

ReportsModule - Generate and retrieve various business reports

- Basic reports: incomes, stocks, orders, sales (with pagination)
- Excise reports: compliance tracking for mandatory labeling
- Async reports: warehouse remains with configurable grouping/filtering

## Example

```typescript
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Get recent incomes with pagination
const incomes = await sdk.reports.getIncomes('2024-01-01');

// Create async warehouse remains report
const task = await sdk.reports.createWarehouseRemainsReport({
  locale: 'ru',
  groupByBrand: true
});
```

## Constructors

### Constructor

```ts
new ReportsModule(client: BaseClient): ReportsModule;
```

Defined in: [modules/reports/index.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L43)

#### Parameters

| Parameter | Type |
| ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) |

#### Returns

`ReportsModule`

## Methods

### getIncomes()

```ts
getIncomes(dateFrom: string, flag?: number): Promise<IncomesItem[]>;
```

Defined in: [modules/reports/index.ts:96](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L96)

Get inbound shipment data from warehouses

Supports pagination for large datasets (up to 100,000 rows per request).

**Pagination Strategy**:
1. Make initial request with desired dateFrom
2. Check if response length equals 100,000 (indicates more data)
3. Use lastChangeDate from last row as dateFrom in next request
4. Continue until response is empty array []

**Date Format**: RFC3339 in Moscow timezone (UTC+3)
- Date only: `2019-06-20`
- Date with time: `2019-06-20T23:59:59`
- With milliseconds: `2019-06-20T00:00:00.12345`

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dateFrom` | `string` | RFC3339 date/datetime for last change (Moscow UTC+3) |
| `flag?` | `number` | Optional filter mode: - 0 or undefined: All changes since dateFrom (default) - 1: Only new records |

#### Returns

`Promise`\<[`IncomesItem`](../interfaces/IncomesItem.md)[]\>

Promise resolving to array of IncomesItem (max 100,000 rows)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When dateFrom format is invalid

#### Throws

When network or server error occurs

#### Example

```typescript
// Fetch all incomes with pagination
let allIncomes: IncomesItem[] = [];
let dateFrom = '2024-01-01';

while (true) {
  const incomes = await sdk.reports.getIncomes(dateFrom);
  if (incomes.length === 0) break;

  allIncomes = allIncomes.concat(incomes);
  console.log(`Fetched ${incomes.length} incomes, total: ${allIncomes.length}`);

  // Use lastChangeDate from last row for next request
  dateFrom = incomes[incomes.length - 1].lastChangeDate;

  // Check if we hit the 100K limit
  if (incomes.length < 100000) break;
}
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1incomes/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1incomes/get)

***

### getStocks()

```ts
getStocks(dateFrom: string): Promise<StocksItem[]>;
```

Defined in: [modules/reports/index.ts:152](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L152)

Get current stock levels across WB warehouses

Data is updated every 30 minutes. Maximum 60,000 rows per response.

**Stock Quantity Fields**:
- `quantity`: Available stock in warehouse (can be added to cart)
- `inWayToClient`: In transit to customer
- `inWayFromClient`: In transit from customer (returns)
- `quantityFull`: Total quantity (quantity + inWayToClient + inWayFromClient)

**For Full Stock Snapshot**: Use early date like `2019-06-20` to get all current stock

**Pagination Strategy**: Same as getIncomes(), use lastChangeDate from last row

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dateFrom` | `string` | RFC3339 date/datetime (use early date like 2019-06-20 for full snapshot) |

#### Returns

`Promise`\<[`StocksItem`](../interfaces/StocksItem.md)[]\>

Promise resolving to array of StocksItem with quantity breakdown (max 60,000 rows)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When dateFrom format is invalid

#### Throws

When network or server error occurs

#### Example

```typescript
// Get current stock snapshot
const stocks = await sdk.reports.getStocks('2019-01-01');

// Analyze stock levels
let totalAvailable = 0;
let totalInTransit = 0;

stocks.forEach(stock => {
  totalAvailable += stock.quantity;
  totalInTransit += stock.inWayToClient + stock.inWayFromClient;
});

console.log(`Available: ${totalAvailable}`);
console.log(`In Transit: ${totalInTransit}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1stocks/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1stocks/get)

***

### getOrders()

```ts
getOrders(dateFrom: string, flag?: number): Promise<OrdersItem[]>;
```

Defined in: [modules/reports/index.ts:195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L195)

Get order information for all customer orders

Maximum 80,000 rows per response.

**Important Notes**:
- 1 row = 1 order = 1 assembly task = 1 product unit
- Use `srid` field for unique order identification
- `isCancel` field indicates canceled orders (with cancelDate)
- Data retention: 90 days from order creation

**Pagination Strategy**: Use lastChangeDate from last row, 80,000 row limit

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dateFrom` | `string` | RFC3339 date/datetime for last change |
| `flag?` | `number` | Optional filter mode: - 0 or undefined: All changes since dateFrom (default) - 1: Only new records |

#### Returns

`Promise`\<[`OrdersItem`](../interfaces/OrdersItem.md)[]\>

Promise resolving to array of OrdersItem (max 80,000 rows)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When dateFrom format is invalid

#### Throws

When network or server error occurs

#### Example

```typescript
// Get recent orders and track cancellations
const orders = await sdk.reports.getOrders('2024-01-01', 1);

const canceledOrders = orders.filter(o => o.isCancel);
console.log(`Canceled: ${canceledOrders.length} / ${orders.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1orders/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1orders/get)

***

### getSales()

```ts
getSales(dateFrom: string, flag?: number): Promise<SalesItem[]>;
```

Defined in: [modules/reports/index.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L255)

Get sales and returns data

Data is updated every 30 minutes with 90-day retention.
Maximum 80,000 rows per response.

**Payment Fields**:
- `paymentSaleAmount`: Payment from sale (negative for returns)
- `forPay`: Amount to be paid to seller
- `saleID`: Unique sale identifier (S********** = sale, R********** = return)

**Returns Detection**: Negative `paymentSaleAmount` indicates return

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dateFrom` | `string` | RFC3339 date/datetime for last change |
| `flag?` | `number` | Optional filter mode: - 0 or undefined: All changes since dateFrom (default) - 1: Only new records |

#### Returns

`Promise`\<[`SalesItem`](../interfaces/SalesItem.md)[]\>

Promise resolving to array of SalesItem with payment info (max 80,000 rows)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When dateFrom format is invalid

#### Throws

When network or server error occurs

#### Example

```typescript
// Calculate revenue and returns
const sales = await sdk.reports.getSales('2024-01-01');

let totalRevenue = 0;
let totalReturns = 0;

sales.forEach(sale => {
  if (sale.paymentSaleAmount > 0) {
    totalRevenue += sale.forPay;
  } else {
    totalReturns += Math.abs(sale.forPay);
  }
});

console.log(`Revenue: ${totalRevenue}`);
console.log(`Returns: ${totalReturns}`);
console.log(`Net: ${totalRevenue - totalReturns}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1sales/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-statistiki/paths/~1api~1v1~1supplier~1sales/get)

***

### getExciseReport()

```ts
getExciseReport(
   dateFrom: string, 
   dateTo: string, 
body?: ExciseReportRequest): Promise<ExciseReportResponse>;
```

Defined in: [modules/reports/index.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L309)

Get report on goods with mandatory labeling (excise goods)

Used for tracking labeling operations and regulatory compliance.

**Country Codes** (ISO 3166-2):
- AM: Armenia
- BY: Belarus
- KG: Kyrgyzstan
- KZ: Kazakhstan
- RU: Russia
- UZ: Uzbekistan

**Operation Types**:
- 1: Withdrawal from circulation
- 2: Return to circulation

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dateFrom` | `string` | RFC3339 date for report start |
| `dateTo` | `string` | RFC3339 date for report end |
| `body?` | [`ExciseReportRequest`](../interfaces/ExciseReportRequest.md) | Optional filters: countries, brands, inns |

#### Returns

`Promise`\<[`ExciseReportResponse`](../interfaces/ExciseReportResponse.md)\>

Promise resolving to ExciseReportResponse with labeling operations

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (10 req/5hrs)

#### Throws

When date format or parameters invalid

#### Throws

When network or server error occurs

#### Example

```typescript
// Get excise report for Russia
const report = await sdk.reports.getExciseReport(
  '2024-01-01',
  '2024-01-31',
  { countries: ['RU'] }
);

console.log(`Operations tracked: ${report.response.data.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-po-markirovke-tovarov/paths/~1api~1v1~1analytics~1excise-report/post](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-po-markirovke-tovarov/paths/~1api~1v1~1analytics~1excise-report/post)

***

### createWarehouseRemainsReport()

```ts
createWarehouseRemainsReport(params: WarehouseRemainsParams): Promise<ReportTaskResponse>;
```

Defined in: [modules/reports/index.ts:366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L366)

Create async task to generate warehouse remains report

Returns taskId for status checking and download.

**Async Workflow**:
1. Create task with this method (get taskId)
2. Poll status with checkReportStatus() every 5-10 seconds
3. Download with downloadReport() when status is 'done'

**Locale Options**:
- ru: Russian (default)
- en: English
- zh: Chinese (warehouseName in English)

**GroupBy Options**: groupByBrand, groupBySubject, groupBySa, groupBySize, groupByNm, groupByBarcode

**Filter Options**: filterPics (-1/0/1), filterVolume (-1/0/3)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`WarehouseRemainsParams`](../interfaces/WarehouseRemainsParams.md) | Report configuration with locale, groupBy options, and filters |

#### Returns

`Promise`\<[`ReportTaskResponse`](../interfaces/ReportTaskResponse.md)\>

Promise resolving to ReportTaskResponse with taskId

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min, burst 5)

#### Throws

When parameters are invalid

#### Throws

When network or server error occurs

#### Example

```typescript
// Create report with brand and subject grouping
const task = await sdk.reports.createWarehouseRemainsReport({
  locale: 'ru',
  groupByBrand: true,
  groupBySubject: true
});

console.log(`Task created: ${task.data.taskId}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse\_remains/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains/get)

***

### checkReportStatus()

```ts
checkReportStatus(taskId: string, reportType: ReportType): Promise<ReportsReportStatus>;
```

Defined in: [modules/reports/index.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L417)

Check async report generation status

Poll every 5-10 seconds until status is 'done' or 'error'.

**Status Values**:
- new: Queued
- processing: Generating report
- done: Ready for download
- error: Generation failed (check error field)
- purged: Report deleted
- canceled: Task canceled

**Polling Strategy**: Check every 5-10 seconds until 'done' or 'error'

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from createWarehouseRemainsReport() |
| `reportType` | [`ReportType`](../type-aliases/ReportType.md) | Type of report being generated |

#### Returns

`Promise`\<[`ReportsReportStatus`](../interfaces/ReportsReportStatus.md)\>

Promise resolving to ReportStatus with current status

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/5s, burst 5)

#### Throws

When network error occurs

#### Example

```typescript
// Poll status until done
let status: ReportStatus;
do {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s

  status = await sdk.reports.checkReportStatus(
    taskId,
    'warehouse_remains'
  );

  console.log(`Status: ${status.data.status}`);
} while (status.data.status === 'new' || status.data.status === 'processing');
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse\_remains~1tasks~1%7Btask\_id%7D~1status/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1status/get)

***

### downloadReport()

```ts
downloadReport(taskId: string, reportType: ReportType): Promise<Blob>;
```

Defined in: [modules/reports/index.ts:471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L471)

Download completed async report

Report format is Excel (.xlsx) file with tabular data.

**Prerequisites**: Task status must be 'done' before downloading

**Report Format**: Excel (.xlsx) file

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from createWarehouseRemainsReport() |
| `reportType` | [`ReportType`](../type-aliases/ReportType.md) | Type of report to download |

#### Returns

`Promise`\<`Blob`\>

Promise resolving to Blob (report file data)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network error occurs

#### Example

```typescript
// Download and save report
const reportBlob = await sdk.reports.downloadReport(
  taskId,
  'warehouse_remains'
);

// Save to file (Node.js)
const fs = require('fs');
const buffer = await reportBlob.arrayBuffer();
fs.writeFileSync('warehouse_remains.xlsx', Buffer.from(buffer));

console.log('Report downloaded: warehouse_remains.xlsx');
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse\_remains~1tasks~1%7Btask\_id%7D~1download/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get)

***

### getGoodsLabelingReport()

```ts
getGoodsLabelingReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:515](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L515)

Get report on goods with mandatory labeling requirements

Used for tracking compliance with Russian marking system (Честный ЗНАК).

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters for filtering |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of labeling items

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const labelingReport = await sdk.reports.getGoodsLabelingReport();
console.log(`Products requiring labeling: ${labelingReport.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-tovarah-c-obyazatelnoj-markirovkoj](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-tovarah-c-obyazatelnoj-markirovkoj)

***

### getCharacteristicsChangeReport()

```ts
getCharacteristicsChangeReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:543](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L543)

Get report on product characteristics changes

Used for tracking product data modifications and compliance.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters for filtering |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of characteristic change records

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const changes = await sdk.reports.getCharacteristicsChangeReport();
console.log(`Characteristics changes: ${changes.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

***

### getAntifraudDetailsReport()

```ts
getAntifraudDetailsReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:571](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L571)

Get antifraud system details report

Used for tracking fraud prevention measures and blocked operations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters for filtering |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to antifraud details

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const antifraud = await sdk.reports.getAntifraudDetailsReport();
console.log(`Antifraud records: ${antifraud.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

***

### getIncorrectAttachmentsReport()

```ts
getIncorrectAttachmentsReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:599](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L599)

Get report on incorrect product attachments

Used for identifying and fixing product data quality issues.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters for filtering |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of incorrect attachment records

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const incorrect = await sdk.reports.getIncorrectAttachmentsReport();
console.log(`Products with incorrect attachments: ${incorrect.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

***

### getWarehouseMeasurementsReport()

```ts
getWarehouseMeasurementsReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:629](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L629)

Get warehouse measurements report

Used for tracking dimensional weight and storage calculations.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters for filtering |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to warehouse measurements data

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const measurements = await sdk.reports.getWarehouseMeasurementsReport();
console.log(`Measurement records: ${measurements.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

***

### requestAcceptanceReport()

```ts
requestAcceptanceReport(params?: Record<string, unknown>): Promise<ReportTaskResponse>;
```

Defined in: [modules/reports/index.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L665)

Create async task to generate acceptance report

Returns taskId for status checking and download.

**Async Workflow**:
1. Create task with this method (get taskId)
2. Poll status with getAcceptanceReportStatus() every 5-10 seconds
3. Download with downloadAcceptanceReport() when status is 'done'

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Report parameters (date range, filters) |

#### Returns

`Promise`\<[`ReportTaskResponse`](../interfaces/ReportTaskResponse.md)\>

Promise resolving to ReportTaskResponse with taskId

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When parameters are invalid

#### Throws

When network or server error occurs

#### Example

```typescript
const task = await sdk.reports.requestAcceptanceReport({});
console.log(`Task created: ${task.data.taskId}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka](https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka)

***

### getAcceptanceReportStatus()

```ts
getAcceptanceReportStatus(taskId: string): Promise<ReportsReportStatus>;
```

Defined in: [modules/reports/index.ts:695](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L695)

Check acceptance report generation status

Poll every 5-10 seconds until status is 'done' or 'error'.

**Status Values**: new, processing, done, error, purged, canceled

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from requestAcceptanceReport() |

#### Returns

`Promise`\<[`ReportsReportStatus`](../interfaces/ReportsReportStatus.md)\>

Promise resolving to ReportStatus with current status

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/5s)

#### Throws

When network error occurs

#### Example

```typescript
const status = await sdk.reports.getAcceptanceReportStatus(taskId);
console.log(`Status: ${status.data.status}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka](https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka)

***

### downloadAcceptanceReport()

```ts
downloadAcceptanceReport(taskId: string): Promise<Blob>;
```

Defined in: [modules/reports/index.ts:722](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L722)

Download completed acceptance report

Report format is Excel (.xlsx) file with acceptance fee details.

**Prerequisites**: Task status must be 'done' before downloading

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from requestAcceptanceReport() |

#### Returns

`Promise`\<`Blob`\>

Promise resolving to Blob (report file data)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network error occurs

#### Example

```typescript
const reportBlob = await sdk.reports.downloadAcceptanceReport(taskId);
// Save to file...
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka](https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka)

***

### requestPaidStorageReport()

```ts
requestPaidStorageReport(params?: Record<string, unknown>): Promise<ReportTaskResponse>;
```

Defined in: [modules/reports/index.ts:755](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L755)

Create async task to generate paid storage report

Returns taskId for status checking and download.

**Async Workflow**:
1. Create task with this method (get taskId)
2. Poll status with getPaidStorageReportStatus() every 5-10 seconds
3. Download with downloadPaidStorageReport() when status is 'done'

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Report parameters (date range, filters) |

#### Returns

`Promise`\<[`ReportTaskResponse`](../interfaces/ReportTaskResponse.md)\>

Promise resolving to ReportTaskResponse with taskId

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When parameters are invalid

#### Throws

When network or server error occurs

#### Example

```typescript
const task = await sdk.reports.requestPaidStorageReport({});
console.log(`Task created: ${task.data.taskId}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie](https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie)

***

### getPaidStorageReportStatus()

```ts
getPaidStorageReportStatus(taskId: string): Promise<ReportsReportStatus>;
```

Defined in: [modules/reports/index.ts:785](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L785)

Check paid storage report generation status

Poll every 5-10 seconds until status is 'done' or 'error'.

**Status Values**: new, processing, done, error, purged, canceled

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from requestPaidStorageReport() |

#### Returns

`Promise`\<[`ReportsReportStatus`](../interfaces/ReportsReportStatus.md)\>

Promise resolving to ReportStatus with current status

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/5s)

#### Throws

When network error occurs

#### Example

```typescript
const status = await sdk.reports.getPaidStorageReportStatus(taskId);
console.log(`Status: ${status.data.status}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie](https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie)

***

### downloadPaidStorageReport()

```ts
downloadPaidStorageReport(taskId: string): Promise<Blob>;
```

Defined in: [modules/reports/index.ts:812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L812)

Download completed paid storage report

Report format is Excel (.xlsx) file with storage cost details.

**Prerequisites**: Task status must be 'done' before downloading

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from requestPaidStorageReport() |

#### Returns

`Promise`\<`Blob`\>

Promise resolving to Blob (report file data)

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network error occurs

#### Example

```typescript
const reportBlob = await sdk.reports.downloadPaidStorageReport(taskId);
// Save to file...
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie](https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie)

***

### getRegionalSalesReport()

```ts
getRegionalSalesReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:841](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L841)

Get sales by region report

Used for geographic sales analysis and regional performance tracking.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters (date range, filters) |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of regional sales data

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const regionalSales = await sdk.reports.getRegionalSalesReport();
regionalSales.forEach(region => {
  console.log(`${region.regionName}: ${region.sales} sales`);
});
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Prodazhi-po-regionam](https://dev.wildberries.ru/openapi/reports#tag/Prodazhi-po-regionam)

***

### getBrandsForBrandShare()

```ts
getBrandsForBrandShare(): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:867](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L867)

Get list of brands for brand share analysis

Used as prerequisite for getBrandShareReport().

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of brand information

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const brands = await sdk.reports.getBrandsForBrandShare();
console.log(`Available brands: ${brands.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah](https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah)

***

### getParentSubjectsForBrandShare()

```ts
getParentSubjectsForBrandShare(): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:893](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L893)

Get list of parent subjects (categories) for brand share analysis

Used as prerequisite for getBrandShareReport().

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of category information

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const categories = await sdk.reports.getParentSubjectsForBrandShare();
console.log(`Available categories: ${categories.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah](https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah)

***

### getBrandShareReport()

```ts
getBrandShareReport(params: Record<string, unknown>): Promise<unknown>;
```

Defined in: [modules/reports/index.ts:925](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L925)

Get brand market share report

Shows brand performance relative to category market.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | `Record`\<`string`, `unknown`\> | Query parameters (brand ID, category ID, date range) |

#### Returns

`Promise`\<`unknown`\>

Promise resolving to brand share data

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When required parameters missing

#### Throws

When network or server error occurs

#### Example

```typescript
const shareReport = await sdk.reports.getBrandShareReport({
  brandId: 123,
  categoryId: 456
});
console.log(`Market share: ${shareReport.sharePercent}%`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah](https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah)

***

### getBlockedProductsReport()

```ts
getBlockedProductsReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:956](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L956)

Get blocked products report

Used for identifying and resolving product listing issues.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters for filtering |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of blocked products

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const blocked = await sdk.reports.getBlockedProductsReport();
console.log(`Blocked products: ${blocked.length}`);
blocked.forEach(product => {
  console.log(`Product ${product.nmId}: ${product.blockReason}`);
});
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary](https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary)

***

### getShadowedProductsReport()

```ts
getShadowedProductsReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:984](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L984)

Get shadowed (hidden) products report

Used for identifying products with visibility issues.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters for filtering |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of hidden products

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const shadowed = await sdk.reports.getShadowedProductsReport();
console.log(`Hidden products: ${shadowed.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary](https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary)

***

### getGoodsReturnReport()

```ts
getGoodsReturnReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:1014](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/modules/reports/index.ts#L1014)

Get goods return and movement report

Used for tracking return rates, reasons, and product flow.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | `Record`\<`string`, `unknown`\> | Optional query parameters (date range, filters) |

#### Returns

`Promise`\<`unknown`[]\>

Promise resolving to array of return/movement records

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const returns = await sdk.reports.getGoodsReturnReport();
console.log(`Return records: ${returns.length}`);
const returnRate = (returns.length / totalSales) * 100;
console.log(`Return rate: ${returnRate.toFixed(2)}%`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov)
