[Wildberries API TypeScript SDK](../modules.md) / ReportsModule

# Class: ReportsModule

Defined in: [modules/reports/index.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L63)

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

Defined in: [modules/reports/index.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L64)

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

Defined in: [modules/reports/index.ts:117](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L117)

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

Defined in: [modules/reports/index.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L173)

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

Defined in: [modules/reports/index.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L216)

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

Defined in: [modules/reports/index.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L276)

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

Defined in: [modules/reports/index.ts:330](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L330)

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

Defined in: [modules/reports/index.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L387)

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

Defined in: [modules/reports/index.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L438)

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

Defined in: [modules/reports/index.ts:492](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L492)

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

### getWarehouseRemainsReportStatus()

```ts
getWarehouseRemainsReportStatus(taskId: string): Promise<ReportsReportStatus>;
```

Defined in: [modules/reports/index.ts:538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L538)

Check warehouse remains report generation status

Poll every 5-10 seconds until status is 'done' or 'error'.

**Status Values**: new, processing, done, error, purged, canceled

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from createWarehouseRemainsReport() |

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
const status = await sdk.reports.getWarehouseRemainsReportStatus(taskId);
console.log(`Status: ${status.data.status}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse\_remains~1tasks~1%7Btask\_id%7D~1status/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1status/get)

***

### downloadWarehouseRemainsReport()

```ts
downloadWarehouseRemainsReport(taskId: string): Promise<Blob>;
```

Defined in: [modules/reports/index.ts:568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L568)

Download completed warehouse remains report

Report format is Excel (.xlsx) file with warehouse remains data.

**Prerequisites**: Task status must be 'done' before downloading

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `taskId` | `string` | Task ID from createWarehouseRemainsReport() |

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
const reportBlob = await sdk.reports.downloadWarehouseRemainsReport(taskId);
// Save to file...
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse\_remains~1tasks~1%7Btask\_id%7D~1download/get](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah/paths/~1api~1v1~1warehouse_remains~1tasks~1%7Btask_id%7D~1download/get)

***

### getGoodsLabelingReport()

```ts
getGoodsLabelingReport(params: DateRangeParams): Promise<GoodsLabelingItem[]>;
```

Defined in: [modules/reports/index.ts:605](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L605)

Get report on goods with mandatory labeling requirements

Used for tracking compliance with Russian marking system (Честный ЗНАК).
Maximum 31 days per report. Data available since June 2023.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`DateRangeParams`](../-internal-/interfaces/DateRangeParams.md) | Date range parameters (dateFrom, dateTo required) |

#### Returns

`Promise`\<[`GoodsLabelingItem`](../-internal-/interfaces/GoodsLabelingItem.md)[]\>

Promise resolving to array of labeling items

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const labelingReport = await sdk.reports.getGoodsLabelingReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
console.log(`Products requiring labeling: ${labelingReport.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-tovarah-c-obyazatelnoj-markirovkoj](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-tovarah-c-obyazatelnoj-markirovkoj)

***

### getCharacteristicsChangeReport()

```ts
getCharacteristicsChangeReport(params: DateRangeParams): Promise<CharacteristicsChangeItem[]>;
```

Defined in: [modules/reports/index.ts:637](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L637)

Get report on product characteristics changes

Used for tracking product data modifications and compliance.
Maximum 31 days per report.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`DateRangeParams`](../-internal-/interfaces/DateRangeParams.md) | Date range parameters (dateFrom, dateTo required) |

#### Returns

`Promise`\<[`CharacteristicsChangeItem`](../-internal-/interfaces/CharacteristicsChangeItem.md)[]\>

Promise resolving to array of characteristic change records

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const changes = await sdk.reports.getCharacteristicsChangeReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
console.log(`Characteristics changes: ${changes.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

***

### getAntifraudDetailsReport()

```ts
getAntifraudDetailsReport(params?: Record<string, unknown>): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L665)

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
getIncorrectAttachmentsReport(params: DateRangeParams): Promise<IncorrectAttachmentItem[]>;
```

Defined in: [modules/reports/index.ts:698](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L698)

Get report on incorrect product attachments (penalties for wrong items)

Returns penalties for sending wrong items, empty boxes, or boxes with foreign objects.
100% of order cost is charged in such cases.
Maximum 31 days per report. Data available since June 2023.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`DateRangeParams`](../-internal-/interfaces/DateRangeParams.md) | Date range parameters (dateFrom, dateTo required) |

#### Returns

`Promise`\<[`IncorrectAttachmentItem`](../-internal-/interfaces/IncorrectAttachmentItem.md)[]\>

Promise resolving to array of incorrect attachment penalty records

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const incorrect = await sdk.reports.getIncorrectAttachmentsReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
console.log(`Penalties for incorrect attachments: ${incorrect.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

***

### getWarehouseMeasurementsReport()

```ts
getWarehouseMeasurementsReport(params: WarehouseMeasurementsParams): Promise<WarehouseMeasurementItem[]>;
```

Defined in: [modules/reports/index.ts:737](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L737)

Get warehouse measurements report (packaging dimension penalties)

Returns reports on penalties for underestimated packaging dimensions
and warehouse measurements.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`WarehouseMeasurementsParams`](../-internal-/interfaces/WarehouseMeasurementsParams.md) | Required parameters: - dateTo: End date (required) - tab: 'penalty' | 'measurement' (required) - dateFrom: Start date (optional, defaults to first data date) - limit: Number of records (optional, default: 1000) |

#### Returns

`Promise`\<[`WarehouseMeasurementItem`](../-internal-/interfaces/WarehouseMeasurementItem.md)[]\>

Promise resolving to warehouse measurements/penalty data

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (5 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const measurements = await sdk.reports.getWarehouseMeasurementsReport({
  dateTo: '2024-01-31T23:59:59Z',
  tab: 'penalty',
  limit: 500
});
console.log(`Penalty records: ${measurements.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah](https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah)

***

### requestAcceptanceReport()

```ts
requestAcceptanceReport(params: DateRangeParams): Promise<ReportTaskResponse>;
```

Defined in: [modules/reports/index.ts:777](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L777)

Create async task to generate acceptance report

Returns taskId for status checking and download.
Maximum 31 days per report.

**Async Workflow**:
1. Create task with this method (get taskId)
2. Poll status with getAcceptanceReportStatus() every 5-10 seconds
3. Download with downloadAcceptanceReport() when status is 'done'

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`DateRangeParams`](../-internal-/interfaces/DateRangeParams.md) | Date range parameters (dateFrom, dateTo required) |

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
const task = await sdk.reports.requestAcceptanceReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
console.log(`Task created: ${task.data.taskId}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka](https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka)

***

### getAcceptanceReportStatus()

```ts
getAcceptanceReportStatus(taskId: string): Promise<ReportsReportStatus>;
```

Defined in: [modules/reports/index.ts:807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L807)

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

Defined in: [modules/reports/index.ts:837](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L837)

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
requestPaidStorageReport(params: DateRangeParams): Promise<ReportTaskResponse>;
```

Defined in: [modules/reports/index.ts:880](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L880)

Create async task to generate paid storage report

Returns taskId for status checking and download.
Maximum 8 days per report.

**Async Workflow**:
1. Create task with this method (get taskId)
2. Poll status with getPaidStorageReportStatus() every 5-10 seconds
3. Download with downloadPaidStorageReport() when status is 'done'

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`DateRangeParams`](../-internal-/interfaces/DateRangeParams.md) | Date range parameters (dateFrom, dateTo required) |

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
const task = await sdk.reports.requestPaidStorageReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-08'
});
console.log(`Task created: ${task.data.taskId}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie](https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie)

***

### getPaidStorageReportStatus()

```ts
getPaidStorageReportStatus(taskId: string): Promise<ReportsReportStatus>;
```

Defined in: [modules/reports/index.ts:910](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L910)

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

Defined in: [modules/reports/index.ts:940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L940)

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
getRegionalSalesReport(params: DateRangeParams): Promise<RegionalSalesItem[]>;
```

Defined in: [modules/reports/index.ts:978](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L978)

Get sales by region report

Returns sales data grouped by regions and countries.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`DateRangeParams`](../-internal-/interfaces/DateRangeParams.md) | Date range parameters (dateFrom, dateTo required) |

#### Returns

`Promise`\<[`RegionalSalesItem`](../-internal-/interfaces/RegionalSalesItem.md)[]\>

Promise resolving to array of regional sales data

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const regionalSales = await sdk.reports.getRegionalSalesReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
regionalSales.forEach(region => {
  console.log(`${region.region}: ${region.salesCount} sales`);
});
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Prodazhi-po-regionam](https://dev.wildberries.ru/openapi/reports#tag/Prodazhi-po-regionam)

***

### getBrandsForBrandShare()

```ts
getBrandsForBrandShare(): Promise<unknown[]>;
```

Defined in: [modules/reports/index.ts:1004](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L1004)

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
getParentSubjectsForBrandShare(): Promise<BrandShareParentSubject[]>;
```

Defined in: [modules/reports/index.ts:1030](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L1030)

Get list of parent subjects (categories) for brand share analysis

Used as prerequisite for getBrandShareReport() to get available category IDs.

#### Returns

`Promise`\<[`BrandShareParentSubject`](../-internal-/interfaces/BrandShareParentSubject.md)[]\>

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
getBrandShareReport(params: BrandShareParams): Promise<BrandShareData>;
```

Defined in: [modules/reports/index.ts:1069](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L1069)

Get brand market share report

Shows brand performance relative to category market.
Maximum 365 days per report. Data available since November 1, 2022.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`BrandShareParams`](../-internal-/interfaces/BrandShareParams.md) | Required parameters: - parentId: Parent category ID (required) - brand: Brand name (required) - dateFrom: Start date (optional) - dateTo: End date (optional) |

#### Returns

`Promise`\<[`BrandShareData`](../-internal-/interfaces/BrandShareData.md)\>

Promise resolving to brand share data

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/5s)

#### Throws

When required parameters missing

#### Throws

When network or server error occurs

#### Example

```typescript
const shareReport = await sdk.reports.getBrandShareReport({
  parentId: 123,
  brand: 'MyBrand',
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
console.log(`Market share: ${shareReport.brandShare}%`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah](https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah)

***

### getBlockedProductsReport()

```ts
getBlockedProductsReport(params?: BannedProductsParams): Promise<BannedProductItem[]>;
```

Defined in: [modules/reports/index.ts:1105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L1105)

Get blocked products report

Returns list of blocked product cards with block reasons.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`BannedProductsParams`](../-internal-/interfaces/BannedProductsParams.md) | Optional sorting parameters: - sort: Field to sort by - order: 'asc' | 'desc' |

#### Returns

`Promise`\<[`BannedProductItem`](../-internal-/interfaces/BannedProductItem.md)[]\>

Promise resolving to array of blocked products

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const blocked = await sdk.reports.getBlockedProductsReport({
  sort: 'date',
  order: 'desc'
});
console.log(`Blocked products: ${blocked.length}`);
blocked.forEach(product => {
  console.log(`Product ${product.nmId}: ${product.reason}`);
});
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary](https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary)

***

### getShadowedProductsReport()

```ts
getShadowedProductsReport(params?: BannedProductsParams): Promise<BannedProductItem[]>;
```

Defined in: [modules/reports/index.ts:1137](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L1137)

Get shadowed (hidden) products report

Returns list of products hidden from catalog with reasons.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params?` | [`BannedProductsParams`](../-internal-/interfaces/BannedProductsParams.md) | Optional sorting parameters: - sort: Field to sort by - order: 'asc' | 'desc' |

#### Returns

`Promise`\<[`BannedProductItem`](../-internal-/interfaces/BannedProductItem.md)[]\>

Promise resolving to array of hidden products

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const shadowed = await sdk.reports.getShadowedProductsReport({
  order: 'desc'
});
console.log(`Hidden products: ${shadowed.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary](https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary)

***

### getGoodsReturnReport()

```ts
getGoodsReturnReport(params: DateRangeParams): Promise<GoodsReturnItem[]>;
```

Defined in: [modules/reports/index.ts:1168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/reports/index.ts#L1168)

Get goods return and movement report

Returns data on product returns and movements.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `params` | [`DateRangeParams`](../-internal-/interfaces/DateRangeParams.md) | Date range parameters (dateFrom, dateTo required) |

#### Returns

`Promise`\<[`GoodsReturnItem`](../-internal-/interfaces/GoodsReturnItem.md)[]\>

Promise resolving to array of return/movement records

#### Throws

When API key is invalid

#### Throws

When rate limit exceeded (1 req/min)

#### Throws

When network or server error occurs

#### Example

```typescript
const returns = await sdk.reports.getGoodsReturnReport({
  dateFrom: '2024-01-01',
  dateTo: '2024-01-31'
});
console.log(`Return records: ${returns.length}`);
```

#### See

[https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov](https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov)
