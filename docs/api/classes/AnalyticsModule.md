[Wildberries API TypeScript SDK](../modules.md) / AnalyticsModule

# Class: AnalyticsModule

Defined in: [modules/analytics/index.ts:58](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L58)

AnalyticsModule

Manages analytics and reporting operations for Wildberries sellers including:
- Sales funnel conversion metrics (views → cart → purchases)
- Product performance tracking and comparison
- Search query analysis and optimization
- Category-level performance metrics
- Time-series data for trend analysis
- CSV report generation

## Example

```typescript
const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Get sales funnel metrics
const funnel = await sdk.analytics.getSalesFunnel({
  from: '2024-01-01',
  to: '2024-01-31'
});
console.log(`Conversion Rate: ${funnel.data.cards[0].statistics.selectedPeriod.conversions.buyoutsPercent}%`);

// Compare product performance
const performance = await sdk.analytics.getProductPerformance(
  ['12345', '67890'],
  { from: '2024-01-01', to: '2024-01-31' }
);
```

## Constructors

### Constructor

```ts
new AnalyticsModule(client: BaseClient): AnalyticsModule;
```

Defined in: [modules/analytics/index.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L63)

Creates an instance of AnalyticsModule

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `client` | [`BaseClient`](BaseClient.md) | BaseClient instance for making HTTP requests |

#### Returns

`AnalyticsModule`

## Methods

### getSalesFunnel()

```ts
getSalesFunnel(request: ProductStatisticsRequest): Promise<ProductStatisticsResponse>;
```

Defined in: [modules/analytics/index.ts:97](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L97)

Get sales funnel conversion metrics for products

Retrieves detailed statistics about product performance including views,
add-to-cart actions, orders, and purchases with conversion rates at each stage.
Compares selected period with previous period to track trends.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`ProductStatisticsRequest`](../interfaces/ProductStatisticsRequest.md) | Product statistics request with filters and period |

#### Returns

`Promise`\<[`ProductStatisticsResponse`](../interfaces/ProductStatisticsResponse.md)\>

Promise resolving to product statistics with funnel metrics

#### Throws

When date range is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Get sales funnel for last 30 days
const funnel = await sdk.analytics.getSalesFunnel({
  period: {
    begin: '2024-01-01 00:00:00',
    end: '2024-01-31 23:59:59'
  },
  page: 1,
  pageSize: 100
});

funnel.data.cards.forEach(card => {
  const stats = card.statistics.selectedPeriod;
  console.log(`${card.brandName}: ${stats.conversions.buyoutsPercent}% conversion`);
});
```

***

### getProductHistory()

```ts
getProductHistory(request: HistoricalStatisticsRequest): Promise<HistoricalStatisticsResponse>;
```

Defined in: [modules/analytics/index.ts:144](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L144)

Get daily historical statistics for product cards

Returns time-series data showing product performance by day.
Maximum 7 days of data can be retrieved per request.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`HistoricalStatisticsRequest`](../interfaces/HistoricalStatisticsRequest.md) | Historical statistics request with date range and filters |

#### Returns

`Promise`\<[`HistoricalStatisticsResponse`](../interfaces/HistoricalStatisticsResponse.md)\>

Promise resolving to daily product statistics

#### Throws

When date range exceeds 7 days

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Get daily statistics for specific products
const history = await sdk.analytics.getProductHistory({
  period: {
    begin: '2024-01-01 00:00:00',
    end: '2024-01-07 23:59:59'
  },
  nmIDs: [12345, 67890]
});

history.data.forEach(product => {
  product.history.forEach(day => {
    console.log(`${day.date}: ${day.ordersCount} orders`);
  });
});
```

***

### getProductPerformance()

```ts
getProductPerformance(productIds: number[], dateRange: DateRange): Promise<ProductPerformanceResponse>;
```

Defined in: [modules/analytics/index.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L180)

Get performance metrics for specific products

Analyzes performance of individual products with revenue, units sold,
conversion rates, and return rates. Useful for product comparison.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `productIds` | `number`[] | Array of product article numbers (nmIDs) to analyze |
| `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for performance data |

#### Returns

`Promise`\<[`ProductPerformanceResponse`](../interfaces/ProductPerformanceResponse.md)\>

Promise resolving to product performance metrics

#### Throws

When productIds is empty or exceeds limit (max 50)

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded

#### Throws

When network request fails

#### Example

```typescript
// Compare performance of multiple products
const performance = await sdk.analytics.getProductPerformance(
  [12345, 67890, 11111],
  { from: '2024-01-01', to: '2024-01-31' }
);

// Sort by revenue
const topPerformers = performance.products
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 5);
```

***

### getSearchQueries()

```ts
getSearchQueries(dateRange: DateRange): Promise<SearchQueriesResponse>;
```

Defined in: [modules/analytics/index.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L268)

Get search queries that led to product views

Note: This endpoint returns search query data. The actual implementation
depends on the search-report endpoints in the OpenAPI spec.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for search query data |

#### Returns

`Promise`\<[`SearchQueriesResponse`](../interfaces/SearchQueriesResponse.md)\>

Promise resolving to search query metrics

#### Throws

When date range is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded

#### Throws

When network request fails

#### Example

```typescript
// Get top search queries
const queries = await sdk.analytics.getSearchQueries({
  from: '2024-01-01',
  to: '2024-01-31'
});

// Find high-volume low-conversion queries for optimization
const opportunities = queries.data
  .filter(q => q.searchCount > 1000 && q.conversionRate < 2)
  .sort((a, b) => b.searchCount - a.searchCount);
```

***

### getCategoryPerformance()

```ts
getCategoryPerformance(categoryId: string, dateRange: DateRange): Promise<CategoryPerformanceResponse>;
```

Defined in: [modules/analytics/index.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L316)

Get category-level performance metrics

Analyzes performance at category level including revenue, units sold,
product count, and top performers within the category.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `categoryId` | `string` | Category identifier (object ID) |
| `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for category analysis |

#### Returns

`Promise`\<[`CategoryPerformanceResponse`](../interfaces/CategoryPerformanceResponse.md)\>

Promise resolving to category performance metrics

#### Throws

When categoryId is invalid or date range is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded

#### Throws

When network request fails

#### Example

```typescript
// Analyze category performance
const category = await sdk.analytics.getCategoryPerformance(
  '447',  // Category ID
  { from: '2024-01-01', to: '2024-01-31' }
);

console.log(`Category Revenue: ${category.data.revenue} RUB`);
console.log(`Top Products:`, category.data.topProducts.slice(0, 5));
```

***

### generateReport()

```ts
generateReport(request: GenerateReportRequest): Promise<GenerateReportResponse>;
```

Defined in: [modules/analytics/index.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L409)

Generate CSV/Excel report for analytics data

Creates an asynchronous report generation task. Use getReport() to
check status and retrieve download URL when complete.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`GenerateReportRequest`](../-internal-/interfaces/GenerateReportRequest.md) | Report generation request with type, format, and filters |

#### Returns

`Promise`\<[`GenerateReportResponse`](../-internal-/interfaces/GenerateReportResponse.md)\>

Promise resolving to report generation response with reportId

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (2 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Generate sales funnel CSV report
const report = await sdk.analytics.generateReport({
  reportType: 'sales_funnel',
  dateRange: { from: '2024-01-01', to: '2024-01-31' },
  format: 'CSV'
});

console.log(`Report ID: ${report.reportId}`);
console.log(`Status: ${report.status}`);
```

***

### getReport()

```ts
getReport(reportId: string): Promise<ReportInfo>;
```

Defined in: [modules/analytics/index.ts:451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L451)

Get report status and download information

Checks the status of a previously generated report and provides
download URL when the report is ready.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` | Report identifier from generateReport() |

#### Returns

`Promise`\<[`ReportInfo`](../-internal-/interfaces/ReportInfo.md)\>

Promise resolving to report info with status and download URL

#### Throws

When reportId is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (10 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Check report status
const info = await sdk.analytics.getReport(reportId);

if (info.status === 'completed') {
  console.log(`Download: ${info.downloadUrl}`);
  console.log(`Expires: ${info.expiresAt}`);
} else {
  console.log(`Status: ${info.status}`);
}
```

***

### downloadReport()

```ts
downloadReport(reportId: string): Promise<{
  url: string;
  format: string;
  expiresAt?: string;
}>;
```

Defined in: [modules/analytics/index.ts:483](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L483)

Download completed report (helper method)

Convenience method that checks report status and returns download URL
only when the report is completed.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` | Report identifier from generateReport() |

#### Returns

`Promise`\<\{
  `url`: `string`;
  `format`: `string`;
  `expiresAt?`: `string`;
\}\>

Promise resolving to download information

#### Throws

When report is not completed

#### Example

```typescript
const download = await sdk.analytics.downloadReport(reportId);
console.log(`Download URL: ${download.url}`);
console.log(`Format: ${download.format}`);
```

***

### getStockHistory()

```ts
getStockHistory(productId: string, dateRange: DateRange): Promise<StockHistoryResponse>;
```

Defined in: [modules/analytics/index.ts:551](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L551)

Get historical stock level changes for a product

Retrieves complete stock history showing all stock level changes over time,
including the reason for each change (sales, returns, adjustments, transfers,
damaged goods, lost inventory).

Use this data for:
- Inventory trend analysis
- Stock velocity calculations (average daily sales)
- Restock date predictions
- Identifying slow-moving inventory
- Tracking warehouse transfers and adjustments

Rate limit: 10 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `productId` | `string` | Product article number (nmID) or vendor code |
| `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for stock history (max 90 days recommended) |

#### Returns

`Promise`\<[`StockHistoryResponse`](../interfaces/StockHistoryResponse.md)\>

Promise resolving to stock changes with time-series summary

#### Throws

When productId is empty or dateRange is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (10 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Get stock history for product
const history = await sdk.analytics.getStockHistory(
  'prod_123',
  { from: '2024-01-01', to: '2024-12-31' }
);

console.log('Stock Changes:', history.changes.length);
console.log('Starting Stock:', history.summary.startingStock);
console.log('Ending Stock:', history.summary.endingStock);
console.log('Net Change:', history.summary.netChange);
console.log('Avg Daily Velocity:', history.summary.avgDailyVelocity.toFixed(2), 'units/day');

// Analyze stock changes by reason
const salesChanges = history.changes.filter(c => c.reason === 'sale');
const returnChanges = history.changes.filter(c => c.reason === 'return');
console.log(`Sales: ${salesChanges.length}, Returns: ${returnChanges.length}`);
```

***

### exportAnalyticsCSV()

```ts
exportAnalyticsCSV(
   reportType: AnalyticsReportTypeEnum, 
   dateRange: DateRange, 
options?: CSVFormatOptions): Promise<CSVExportResponse>;
```

Defined in: [modules/analytics/index.ts:632](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L632)

Generate CSV export of analytics data (asynchronous)

Initiates CSV generation for analytics data. The export is processed
asynchronously, returning a report ID immediately. Use getCSVReportStatus()
to poll for completion and retrieve the download URL.

Supported report types:
- `sales_funnel`: Sales conversion funnel data
- `product_performance`: Product-level performance metrics
- `stock_history`: Historical stock changes
- `search_queries`: Search query analytics

CSV format options:
- Delimiter: comma (`,`), semicolon (`;`), or tab (`\t`)
- Headers: Include/exclude column headers
- Encoding: UTF-8 or UTF-8 with BOM (for Excel compatibility)

Rate limit: 2 requests per minute (stricter due to resource-intensive operation)

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportType` | [`AnalyticsReportTypeEnum`](../type-aliases/AnalyticsReportTypeEnum.md) | Type of analytics data to export |
| `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for the exported data |
| `options?` | [`CSVFormatOptions`](../interfaces/CSVFormatOptions.md) | Optional CSV formatting options |

#### Returns

`Promise`\<[`CSVExportResponse`](../interfaces/CSVExportResponse.md)\>

Promise resolving to export status with reportId for tracking

#### Throws

When reportType is invalid or dateRange exceeds limits

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (2 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Export product performance to CSV for Excel
const csvExport = await sdk.analytics.exportAnalyticsCSV(
  'product_performance',
  { from: '2024-01-01', to: '2024-12-31' },
  {
    delimiter: ';',           // European Excel format
    includeHeaders: true,
    encoding: 'utf-8-bom'     // Excel compatibility
  }
);

console.log(`CSV export started: ${csvExport.reportId}`);
console.log(`Status: ${csvExport.status}`);
console.log(`ETA: ${csvExport.estimatedCompletionTime}`);

// Poll for completion (see getCSVReportStatus example)
```

***

### getCSVReportStatus()

```ts
getCSVReportStatus(reportId: string): Promise<CSVReport>;
```

Defined in: [modules/analytics/index.ts:725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L725)

Check CSV export status and get download URL

Checks the status of a previously initiated CSV export and provides
download URL when the report is ready. Poll this endpoint until status
becomes 'completed'.

Status lifecycle:
- `pending`: Export queued, not yet started
- `processing`: CSV generation in progress
- `completed`: CSV ready for download (downloadUrl available)
- `failed`: Export failed (check errorMessage)

Download URLs:
- Pre-signed URLs (typically S3/CDN)
- Expire after 24 hours (check expiresAt field)
- Direct file download, not through API

Rate limit: 10 requests per minute

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` | Report identifier from exportAnalyticsCSV() |

#### Returns

`Promise`\<[`CSVReport`](../interfaces/CSVReport.md)\>

Promise resolving to CSV report details with download URL if completed

#### Throws

When reportId is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (10 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Poll for CSV completion
const reportId = 'csv_abc123';
let csvReport;

do {
  await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5s
  csvReport = await sdk.analytics.getCSVReportStatus(reportId);
  console.log(`Status: ${csvReport.status}`);
} while (csvReport.status === 'pending' || csvReport.status === 'processing');

if (csvReport.status === 'completed') {
  console.log(`Download: ${csvReport.downloadUrl}`);
  console.log(`File size: ${csvReport.fileSize} bytes`);
  console.log(`Rows: ${csvReport.rowCount}`);
  console.log(`Expires: ${csvReport.expiresAt}`);
} else {
  console.error(`Export failed: ${csvReport.errorMessage}`);
}
```

***

### downloadCSVReport()

```ts
downloadCSVReport(reportId: string): Promise<CSVReport>;
```

Defined in: [modules/analytics/index.ts:773](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/modules/analytics/index.ts#L773)

Get download URL for completed CSV report (helper method)

Convenience method that checks report status and returns download details
only when the report is completed. Throws ValidationError if report is not ready.

Use this when you want to fail fast if the report isn't ready, rather than
checking status manually.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `reportId` | `string` | Report identifier from exportAnalyticsCSV() |

#### Returns

`Promise`\<[`CSVReport`](../interfaces/CSVReport.md)\>

Promise resolving to CSV report with download URL

#### Throws

When report is not completed or URL is missing

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded

#### Throws

When network request fails

#### Example

```typescript
try {
  const csvReport = await sdk.analytics.downloadCSVReport(reportId);
  console.log(`Download: ${csvReport.downloadUrl}`);
  console.log(`File size: ${csvReport.fileSize} bytes`);

  // Download file using HTTP client
  // In browser: window.open(csvReport.downloadUrl)
  // In Node.js: axios.get(csvReport.downloadUrl, { responseType: 'stream' })
} catch (error) {
  if (error instanceof ValidationError) {
    console.error('Report not ready yet, try again later');
  }
}
```
