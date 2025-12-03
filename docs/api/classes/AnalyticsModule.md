[Wildberries API TypeScript SDK](../modules.md) / AnalyticsModule

# Class: AnalyticsModule

Defined in: [modules/analytics/index.ts:75](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L75)

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

Defined in: [modules/analytics/index.ts:80](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L80)

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

Defined in: [modules/analytics/index.ts:114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L114)

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

Defined in: [modules/analytics/index.ts:161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L161)

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

Defined in: [modules/analytics/index.ts:197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L197)

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
getSearchQueries(dateRange: DateRange, options?: {
  nmIds?: number[];
  subjectIds?: number[];
  brandNames?: string[];
  tagIds?: number[];
}): Promise<SearchQueriesResponse>;
```

Defined in: [modules/analytics/index.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L289)

Get search queries that led to product views

Retrieves search query analytics data for the main report page including
positions, visibility, and transitions to product cards.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for search query data (start/end dates in YYYY-MM-DD format) |
| `options?` | \{ `nmIds?`: `number`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; \} | Optional filters and parameters |
| `options.nmIds?` | `number`[] | - |
| `options.subjectIds?` | `number`[] | - |
| `options.brandNames?` | `string`[] | - |
| `options.tagIds?` | `number`[] | - |

#### Returns

`Promise`\<[`SearchQueriesResponse`](../interfaces/SearchQueriesResponse.md)\>

Promise resolving to search query metrics

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
// Get search queries for a date range
const queries = await sdk.analytics.getSearchQueries({
  from: '2024-01-01',
  to: '2024-01-31'
});

// Get queries with filters
const filtered = await sdk.analytics.getSearchQueries(
  { from: '2024-01-01', to: '2024-01-31' },
  { nmIds: [12345, 67890], brandNames: ['MyBrand'] }
);
```

***

### getCategoryPerformance()

```ts
getCategoryPerformance(categoryId: string, dateRange: DateRange): Promise<CategoryPerformanceResponse>;
```

Defined in: [modules/analytics/index.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L351)

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

Defined in: [modules/analytics/index.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L444)

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

Defined in: [modules/analytics/index.ts:486](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L486)

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

Defined in: [modules/analytics/index.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L518)

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

### getDetailedSalesReport()

```ts
getDetailedSalesReport(request: {
  period: {
     begin: string;
     end: string;
  };
  nmIDs?: number[];
  brandNames?: string[];
  objectIDs?: number[];
  tagIDs?: number[];
  page?: number;
  limit?: number;
}): Promise<{
  data: {
     page: number;
     isNextPage: boolean;
     cards: {
        nmID: number;
        sellerArticle: string;
        brandName: string;
        subjectName: string;
        statistics: {
           selectedPeriod: {
              ordersCount: number;
              buyoutsCount: number;
              revenue: number;
              averageBill: number;
              conversions: {
                 addToCartPercent: number;
                 buyoutsPercent: number;
                 ordersPercent: number;
              };
              viewsCount: number;
              cartAddsCount: number;
              returnsCount: number;
           };
           previousPeriod?: {
              ordersCount: number;
              buyoutsCount: number;
              revenue: number;
              averageBill: number;
              conversions: {
                 addToCartPercent: number;
                 buyoutsPercent: number;
                 ordersPercent: number;
              };
              viewsCount: number;
              cartAddsCount: number;
              returnsCount: number;
           };
        };
     }[];
  };
}>;
```

Defined in: [modules/analytics/index.ts:579](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L579)

Get detailed sales report for products with comprehensive metrics

Provides detailed sales analytics including views, cart additions, orders,
conversions, and revenue metrics for specified products and time period.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | \{ `period`: \{ `begin`: `string`; `end`: `string`; \}; `nmIDs?`: `number`[]; `brandNames?`: `string`[]; `objectIDs?`: `number`[]; `tagIDs?`: `number`[]; `page?`: `number`; `limit?`: `number`; \} | Detailed sales report parameters |
| `request.period` | \{ `begin`: `string`; `end`: `string`; \} | - |
| `request.period.begin` | `string` | - |
| `request.period.end` | `string` | - |
| `request.nmIDs?` | `number`[] | - |
| `request.brandNames?` | `string`[] | - |
| `request.objectIDs?` | `number`[] | - |
| `request.tagIDs?` | `number`[] | - |
| `request.page?` | `number` | - |
| `request.limit?` | `number` | - |

#### Returns

`Promise`\<\{
  `data`: \{
     `page`: `number`;
     `isNextPage`: `boolean`;
     `cards`: \{
        `nmID`: `number`;
        `sellerArticle`: `string`;
        `brandName`: `string`;
        `subjectName`: `string`;
        `statistics`: \{
           `selectedPeriod`: \{
              `ordersCount`: `number`;
              `buyoutsCount`: `number`;
              `revenue`: `number`;
              `averageBill`: `number`;
              `conversions`: \{
                 `addToCartPercent`: `number`;
                 `buyoutsPercent`: `number`;
                 `ordersPercent`: `number`;
              \};
              `viewsCount`: `number`;
              `cartAddsCount`: `number`;
              `returnsCount`: `number`;
           \};
           `previousPeriod?`: \{
              `ordersCount`: `number`;
              `buyoutsCount`: `number`;
              `revenue`: `number`;
              `averageBill`: `number`;
              `conversions`: \{
                 `addToCartPercent`: `number`;
                 `buyoutsPercent`: `number`;
                 `ordersPercent`: `number`;
              \};
              `viewsCount`: `number`;
              `cartAddsCount`: `number`;
              `returnsCount`: `number`;
           \};
        \};
     \}[];
  \};
\}\>

Comprehensive sales analytics data

#### Throws

When request parameters are invalid

#### Throws

When rate limit exceeded (3 req/min)

#### Example

```typescript
const report = await sdk.analytics.getDetailedSalesReport({
  period: {
    begin: '2024-01-01',
    end: '2024-01-31'
  },
  nmIDs: [1234567, 8910112]
});
console.log(`Total revenue: ${report.data.cards.reduce((sum, card) => sum + card.revenue, 0)}`);
```

***

### getCategoryAnalytics()

```ts
getCategoryAnalytics(request: {
  categoryIds: number[];
  period: {
     begin: string;
     end: string;
  };
  includeSubcategories?: boolean;
  sortBy?: "revenue" | "orders" | "views" | "conversion";
  limit?: number;
}): {
  data: {
     categoryId: number;
     categoryName: string;
     totalRevenue: number;
     totalOrders: number;
     totalViews: number;
     conversionRate: number;
     averageOrderValue: number;
     topProducts: {
        nmID: number;
        brandName: string;
        subjectName: string;
        revenue: number;
        orders: number;
        views: number;
     }[];
     subcategories?: {
        categoryId: number;
        categoryName: string;
        revenue: number;
        orders: number;
     }[];
  }[];
};
```

Defined in: [modules/analytics/index.ts:684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L684)

Get comprehensive category analytics and performance metrics

Provides category-level analytics including sales trends, top products,
conversion rates, and market share insights for specific categories.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | \{ `categoryIds`: `number`[]; `period`: \{ `begin`: `string`; `end`: `string`; \}; `includeSubcategories?`: `boolean`; `sortBy?`: `"revenue"` \| `"orders"` \| `"views"` \| `"conversion"`; `limit?`: `number`; \} | Category analytics parameters |
| `request.categoryIds` | `number`[] | - |
| `request.period` | \{ `begin`: `string`; `end`: `string`; \} | - |
| `request.period.begin` | `string` | - |
| `request.period.end` | `string` | - |
| `request.includeSubcategories?` | `boolean` | - |
| `request.sortBy?` | `"revenue"` \| `"orders"` \| `"views"` \| `"conversion"` | - |
| `request.limit?` | `number` | - |

#### Returns

```ts
{
  data: {
     categoryId: number;
     categoryName: string;
     totalRevenue: number;
     totalOrders: number;
     totalViews: number;
     conversionRate: number;
     averageOrderValue: number;
     topProducts: {
        nmID: number;
        brandName: string;
        subjectName: string;
        revenue: number;
        orders: number;
        views: number;
     }[];
     subcategories?: {
        categoryId: number;
        categoryName: string;
        revenue: number;
        orders: number;
     }[];
  }[];
}
```

Category performance analytics data

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `data` | \{ `categoryId`: `number`; `categoryName`: `string`; `totalRevenue`: `number`; `totalOrders`: `number`; `totalViews`: `number`; `conversionRate`: `number`; `averageOrderValue`: `number`; `topProducts`: \{ `nmID`: `number`; `brandName`: `string`; `subjectName`: `string`; `revenue`: `number`; `orders`: `number`; `views`: `number`; \}[]; `subcategories?`: \{ `categoryId`: `number`; `categoryName`: `string`; `revenue`: `number`; `orders`: `number`; \}[]; \}[] | [modules/analytics/index.ts:694](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L694) |

#### Throws

When request parameters are invalid

#### Example

```typescript
const categoryData = await sdk.analytics.getCategoryAnalytics({
  categoryIds: [2541, 1234],
  period: {
    begin: '2024-01-01',
    end: '2024-01-31'
  }
});
```

***

### getCompetitorAnalysis()

```ts
getCompetitorAnalysis(request: {
  searchTerms: string[];
  period: {
     begin: string;
     end: string;
  };
  includeMyProducts?: boolean;
  limit?: number;
}): Promise<{
  data: {
     searchTerm: string;
     totalSearches: number;
     averagePosition: number;
     topCompetitors: {
        brandName: string;
        productCount: number;
        averagePosition: number;
        totalClicks: number;
        clickThroughRate: number;
     }[];
     myProducts?: {
        nmID: number;
        subjectName: string;
        position: number;
        clicks: number;
        impressions: number;
        clickThroughRate: number;
     }[];
     marketInsights: {
        competitionLevel: "low" | "medium" | "high";
        topBrands: string[];
        averagePrice: number;
        totalProducts: number;
     };
  }[];
}>;
```

Defined in: [modules/analytics/index.ts:771](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L771)

Get competitor analysis and market insights

Provides competitive intelligence including search performance,
market position analysis, and competitor product comparisons.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | \{ `searchTerms`: `string`[]; `period`: \{ `begin`: `string`; `end`: `string`; \}; `includeMyProducts?`: `boolean`; `limit?`: `number`; \} | Competitor analysis parameters |
| `request.searchTerms` | `string`[] | - |
| `request.period` | \{ `begin`: `string`; `end`: `string`; \} | - |
| `request.period.begin` | `string` | - |
| `request.period.end` | `string` | - |
| `request.includeMyProducts?` | `boolean` | - |
| `request.limit?` | `number` | - |

#### Returns

`Promise`\<\{
  `data`: \{
     `searchTerm`: `string`;
     `totalSearches`: `number`;
     `averagePosition`: `number`;
     `topCompetitors`: \{
        `brandName`: `string`;
        `productCount`: `number`;
        `averagePosition`: `number`;
        `totalClicks`: `number`;
        `clickThroughRate`: `number`;
     \}[];
     `myProducts?`: \{
        `nmID`: `number`;
        `subjectName`: `string`;
        `position`: `number`;
        `clicks`: `number`;
        `impressions`: `number`;
        `clickThroughRate`: `number`;
     \}[];
     `marketInsights`: \{
        `competitionLevel`: `"low"` \| `"medium"` \| `"high"`;
        `topBrands`: `string`[];
        `averagePrice`: `number`;
        `totalProducts`: `number`;
     \};
  \}[];
\}\>

Competitor and market analysis data

#### Throws

When request parameters are invalid

#### Example

```typescript
const competitorData = await sdk.analytics.getCompetitorAnalysis({
  searchTerms: ['беспроводные наушники', 'bluetooth headphones'],
  period: {
    begin: '2024-01-01',
    end: '2024-01-31'
  },
  includeMyProducts: true
});
```

***

### getReportDownloads()

```ts
getReportDownloads(downloadIds?: string[]): Promise<ReportDownloadsResponse>;
```

Defined in: [modules/analytics/index.ts:882](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L882)

List generated reports and their statuses

Retrieves a list of all generated analytics reports with their current status
and download URLs when available.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `downloadIds?` | `string`[] | Optional array of specific report IDs to filter by |

#### Returns

`Promise`\<[`ReportDownloadsResponse`](../-internal-/interfaces/ReportDownloadsResponse.md)\>

Promise resolving to list of report downloads

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
// Get all reports
const reports = await sdk.analytics.getReportDownloads();
console.log('Reports:', reports.data.length);

// Get specific reports
const specific = await sdk.analytics.getReportDownloads([
  '06eae887-9d9f-491f-b16a-bb1766fcb8d2'
]);
```

***

### getProductSearchTexts()

```ts
getProductSearchTexts(request: ProductSearchTextsRequest): Promise<ProductSearchTextsResponse>;
```

Defined in: [modules/analytics/index.ts:923](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L923)

Get top search queries for a specific product

Returns the most popular search queries that lead to a specific product,
with metrics like position, card opens, cart additions, and orders.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`ProductSearchTextsRequest`](../-internal-/interfaces/ProductSearchTextsRequest.md) | Product search texts request parameters |

#### Returns

`Promise`\<[`ProductSearchTextsResponse`](../-internal-/interfaces/ProductSearchTextsResponse.md)\>

Promise resolving to search texts for the product

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const searchTexts = await sdk.analytics.getProductSearchTexts({
  currentPeriod: { start: '2024-01-01', end: '2024-01-31' },
  nmId: 12345678,
  limit: 30,
  topOrderBy: 'orders'
});
console.log('Top queries:', searchTexts.data.texts);
```

***

### getProductOrders()

```ts
getProductOrders(request: ProductOrdersRequest): Promise<ProductOrdersResponse>;
```

Defined in: [modules/analytics/index.ts:973](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L973)

Get orders and positions by search queries for a product

Returns order data and search positions for a specific product
filtered by a particular search query text.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`ProductOrdersRequest`](../-internal-/interfaces/ProductOrdersRequest.md) | Product orders request parameters |

#### Returns

`Promise`\<[`ProductOrdersResponse`](../-internal-/interfaces/ProductOrdersResponse.md)\>

Promise resolving to orders by date for the search query

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const orders = await sdk.analytics.getProductOrders({
  currentPeriod: { start: '2024-01-01', end: '2024-01-31' },
  nmId: 12345678,
  text: 'кондиционер для волос'
});
console.log('Orders by date:', orders.data.ordersByDate);
```

***

### getStocksProducts()

```ts
getStocksProducts(request: StocksProductsRequest): Promise<StocksProductsResponse>;
```

Defined in: [modules/analytics/index.ts:1029](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1029)

Get stock history data by products

Returns stock level data for products with filtering options.
Can retrieve data for specific products or all products.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`StocksProductsRequest`](../-internal-/interfaces/StocksProductsRequest.md) | Stock products request parameters |

#### Returns

`Promise`\<[`StocksProductsResponse`](../-internal-/interfaces/StocksProductsResponse.md)\>

Promise resolving to stock data by products

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const stocks = await sdk.analytics.getStocksProducts({
  period: { start: '2024-01-01', end: '2024-01-31' },
  nmIds: [12345678, 87654321],
  page: 1,
  limit: 100
});
console.log('Product stocks:', stocks.data.products);
```

***

### getStocksOffices()

```ts
getStocksOffices(request: StocksOfficesRequest): Promise<StocksOfficesResponse>;
```

Defined in: [modules/analytics/index.ts:1069](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1069)

Get stock history data by warehouses/offices

Returns stock level data grouped by warehouses and regions.
FBS (Marketplace) data comes aggregated without warehouse details.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`StocksOfficesRequest`](../-internal-/interfaces/StocksOfficesRequest.md) | Stock offices request parameters |

#### Returns

`Promise`\<[`StocksOfficesResponse`](../-internal-/interfaces/StocksOfficesResponse.md)\>

Promise resolving to stock data by offices/warehouses

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const stocks = await sdk.analytics.getStocksOffices({
  period: { start: '2024-01-01', end: '2024-01-31' },
  nmIds: [12345678]
});
console.log('Stock by offices:', stocks.data.offices);
```

***

### getGroupedHistory()

```ts
getGroupedHistory(request: GroupedHistoryRequest): Promise<GroupedHistoryResponse>;
```

Defined in: [modules/analytics/index.ts:1112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1112)

Get grouped history statistics by days

Returns statistics for product cards grouped by subjects, brands, and tags.
Data is aggregated by day or week. Maximum 7 days of data can be retrieved.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`GroupedHistoryRequest`](../-internal-/interfaces/GroupedHistoryRequest.md) | Grouped history request parameters |

#### Returns

`Promise`\<[`GroupedHistoryResponse`](../-internal-/interfaces/GroupedHistoryResponse.md)\>

Promise resolving to grouped history data

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const history = await sdk.analytics.getGroupedHistory({
  period: { begin: '2024-01-01', end: '2024-01-07' },
  brandNames: ['MyBrand'],
  aggregationLevel: 'day'
});
console.log('Grouped history:', history.data);
```

***

### retryReportGeneration()

```ts
retryReportGeneration(request: RetryReportRequest): Promise<RetryReportResponse>;
```

Defined in: [modules/analytics/index.ts:1163](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1163)

Retry failed report generation

Creates a new report generation task for a previously failed report.
Use this when a report generation returned FAILED status.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`RetryReportRequest`](../-internal-/interfaces/RetryReportRequest.md) | Retry report request with download ID |

#### Returns

`Promise`\<[`RetryReportResponse`](../-internal-/interfaces/RetryReportResponse.md)\>

Promise resolving to new report ID

#### Throws

When download ID is invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const result = await sdk.analytics.retryReportGeneration({
  downloadId: '06eae887-9d9f-491f-b16a-bb1766fcb8d2'
});
console.log('New report ID:', result.data.id);
```

***

### getSearchReportTableGroups()

```ts
getSearchReportTableGroups(request: SearchReportTableGroupsRequest): Promise<SearchReportTableGroupsResponse>;
```

Defined in: [modules/analytics/index.ts:1216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1216)

Get search report data with pagination by groups

Returns additional data for search report with pagination by groups
(subjects, brands, tags). Pagination is only possible with brand,
subject, or tag filter.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SearchReportTableGroupsRequest`](../-internal-/interfaces/SearchReportTableGroupsRequest.md) | Search report table groups request parameters |

#### Returns

`Promise`\<[`SearchReportTableGroupsResponse`](../-internal-/interfaces/SearchReportTableGroupsResponse.md)\>

Promise resolving to grouped search report data

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const groups = await sdk.analytics.getSearchReportTableGroups({
  currentPeriod: { start: '2024-01-01', end: '2024-01-31' },
  positionCluster: 'all',
  orderBy: { field: 'avgPosition', mode: 'asc' },
  limit: 100,
  offset: 0
});
console.log('Search groups:', groups.data.groups);
```

***

### getSearchReportTableDetails()

```ts
getSearchReportTableDetails(request: SearchReportTableDetailsRequest): Promise<SearchReportTableDetailsResponse>;
```

Defined in: [modules/analytics/index.ts:1270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1270)

Get search report data with pagination by products in group

Returns additional data for search report with pagination by products
within a group. Pagination is possible regardless of filters.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`SearchReportTableDetailsRequest`](../-internal-/interfaces/SearchReportTableDetailsRequest.md) | Search report table details request parameters |

#### Returns

`Promise`\<[`SearchReportTableDetailsResponse`](../-internal-/interfaces/SearchReportTableDetailsResponse.md)\>

Promise resolving to product-level search report data

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const products = await sdk.analytics.getSearchReportTableDetails({
  currentPeriod: { start: '2024-01-01', end: '2024-01-31' },
  subjectId: 123,
  brandName: 'MyBrand',
  positionCluster: 'firstHundred',
  orderBy: { field: 'orders', mode: 'desc' },
  limit: 50,
  offset: 0
});
console.log('Products:', products.data.products);
```

***

### getStocksProductsGroups()

```ts
getStocksProductsGroups(request: StocksProductsGroupsRequest): Promise<StocksProductsGroupsResponse>;
```

Defined in: [modules/analytics/index.ts:1327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1327)

Get stock data by product groups

Returns stock data grouped by subjects, brands, and tags.
Groups are described by the tuple (subjectID, brandName, tagID).

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`StocksProductsGroupsRequest`](../-internal-/interfaces/StocksProductsGroupsRequest.md) | Stocks products groups request parameters |

#### Returns

`Promise`\<[`StocksProductsGroupsResponse`](../-internal-/interfaces/StocksProductsGroupsResponse.md)\>

Promise resolving to grouped stock data

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const stockGroups = await sdk.analytics.getStocksProductsGroups({
  period: { start: '2024-01-01', end: '2024-01-31' },
  stockType: 'all',
  orderBy: { field: 'stockCount', mode: 'desc' }
});
console.log('Stock groups:', stockGroups.data.groups);
```

***

### getStocksProductsSizes()

```ts
getStocksProductsSizes(request: StocksProductsSizesRequest): Promise<StocksProductsSizesResponse>;
```

Defined in: [modules/analytics/index.ts:1370](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/modules/analytics/index.ts#L1370)

Get stock data by product sizes

Returns stock data by sizes for a specific product.
Can include warehouse details when includeOffice is true.

Rate limit: 3 requests per minute with 20 second intervals

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `request` | [`StocksProductsSizesRequest`](../-internal-/interfaces/StocksProductsSizesRequest.md) | Stocks products sizes request parameters |

#### Returns

`Promise`\<[`StocksProductsSizesResponse`](../-internal-/interfaces/StocksProductsSizesResponse.md)\>

Promise resolving to size-level stock data

#### Throws

When request parameters are invalid

#### Throws

When API key is invalid

#### Throws

When rate limit is exceeded (3 requests/minute)

#### Throws

When network request fails

#### Example

```typescript
const stockSizes = await sdk.analytics.getStocksProductsSizes({
  period: { start: '2024-01-01', end: '2024-01-31' },
  nmID: 12345678,
  includeOffice: true
});
console.log('Stock by sizes:', stockSizes.data.sizes);
```
