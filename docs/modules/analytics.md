# Analytics Module

The **Analytics** module provides access to sales funnel analytics, search query reports, stock history, WB warehouse inventory, and CSV report generation for the Wildberries marketplace.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `analytics` |
| **SDK Namespace** | `sdk.analytics.*` |
| **Base URL** | `https://seller-analytics-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/11-analytics/` |
| **Methods** | 19 |
| **Authentication** | API Key (Header) |

### What's New (v3.4.0 - March 2026)

- **NEW `getWbWarehousesStock()`**: Get current inventory on WB warehouses. Replaces deprecated `GET /api/v1/supplier/stocks` (disabled June 23, 2026). Returns per-size, per-warehouse quantities with region names and in-transit counts.
- **`currency` field**: Added to `SalesFunnelProductsResponse`, `SalesFunnelProductsHistoryResponse`, and `SalesFunnelGroupedHistoryResponse`. Returns the currency code (e.g., `"RUB"`) for monetary values in the response.
- **3 new types**: `WbWarehousesStockRequest`, `WbWarehouseStockItem`, `WbWarehousesStockResponse`

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get product card statistics (v3)
const stats = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  orderBy: { field: 'orderCount', mode: 'desc' },
  limit: 10,
  offset: 0
});
console.log('Currency:', stats.currency); // e.g. "RUB"

// Get search query report
const report = await sdk.analytics.createSearchReportReport({ ... });

// Get stock data by warehouses
const stocks = await sdk.analytics.createStocksReportOffice({ ... });

// NEW: Get current inventory on WB warehouses
const inventory = await sdk.analytics.getWbWarehousesStock({
  nmIds: [395996251],
  limit: 100,
  offset: 0,
});
for (const item of inventory.data.items) {
  console.log(`${item.warehouseName} (${item.regionName}): ${item.quantity} pcs`);
}

// Create analytics CSV report
const download = await sdk.analytics.createNmReportDownload({ ... });
```

---

## Methods Reference

### Sales Funnel v3 (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getSalesFunnelProducts()` | POST | `/api/analytics/v3/sales-funnel/products` | Product card statistics for period |
| `getSalesFunnelProductsHistory()` | POST | `/api/analytics/v3/sales-funnel/products/history` | Product statistics by day/week |
| `getSalesFunnelGroupedHistory()` | POST | `/api/analytics/v3/sales-funnel/grouped/history` | Grouped product statistics by day |

::: info Currency Field (v3.4.0)
All three Sales Funnel v3 responses now include an optional `currency` field (e.g., `"RUB"`) indicating the currency of monetary values in the response.
:::

### CSV Reports (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getNmReportDownloads()` | GET | `/api/v2/nm-report/downloads` | Get list of analytics reports |
| `createNmReportDownload()` | POST | `/api/v2/nm-report/downloads` | Create analytics report task |
| `createDownloadsRetry()` | POST | `/api/v2/nm-report/downloads/retry` | Retry failed report generation |
| `getDownloadsFile()` | GET | `/api/v2/nm-report/downloads/file/{downloadId}` | Download generated report file |

### Search Query Reports (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createSearchReportReport()` | POST | `/api/v2/search-report/report` | Get search query report main page |
| `createTableGroup()` | POST | `/api/v2/search-report/table/groups` | Paginate by groups in search report |
| `createTableDetail()` | POST | `/api/v2/search-report/table/details` | Paginate by products in search report |
| `createProductSearchText()` | POST | `/api/v2/search-report/product/search-texts` | Get product search texts |

### Search Query - Product Orders (1 method)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createProductOrder()` | POST | `/api/v2/search-report/product/orders` | Get product order data by search texts |

### Stock History (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createProductsGroup()` | POST | `/api/v2/stocks-report/products/groups` | Get stock data by product groups |
| `createProductsProduct()` | POST | `/api/v2/stocks-report/products/products` | Get stock data by products |
| `createProductsSize()` | POST | `/api/v2/stocks-report/products/sizes` | Get stock data by product sizes |
| `createStocksReportOffice()` | POST | `/api/v2/stocks-report/offices` | Get stock data by warehouses |

### WB Warehouse Inventory (1 method) - NEW in v3.4.0

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getWbWarehousesStock()` | POST | `/api/analytics/v1/stocks-report/wb-warehouses` | Get current inventory on WB warehouses |

### Item Rating

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getItemRatingV2()` | POST | `/api/analytics/v2/item-rating` | Current item-rating report; supports catalog-hidden filtering and returns `items[].isShadowed` |
| `getItemRating()` | POST | `/api/analytics/v1/item-rating` | **Deprecated:** WB removal on 2026-07-30 |

Use `onlyShadowedNms: true` with `getItemRatingV2()` to retrieve only products hidden
from the catalog. See the [v2 migration guide](../guides/migration-item-rating-v2.md).

### Previously Deprecated v2 (removed from source)

> These methods were deprecated and have been removed. Use v3 Sales Funnel methods instead.

| Removed Method | Replacement |
|----------------|-------------|
| `createNmReportDetail()` | `getSalesFunnelProducts()` |
| `createDetailHistory()` | `getSalesFunnelProductsHistory()` |
| `createGroupedHistory()` | `getSalesFunnelGroupedHistory()` |

---

## Rate Limits

All methods share the same rate limit tier:

| Operation | Limit | Interval | Burst |
|-----------|-------|----------|-------|
| All analytics endpoints | 3 req/min | 20s | 3 |
| `getWbWarehousesStock()` | 3 req/min | 20s | 1 |

---

## Usage Examples

### getWbWarehousesStock() - WB Warehouse Inventory (NEW in v3.4.0)

Returns current inventory quantities on Wildberries warehouses. Data is updated every 30 minutes. Each row represents one size on one warehouse.

**Endpoint:** `POST /api/analytics/v1/stocks-report/wb-warehouses`

**Request parameters (`WbWarehousesStockRequest`):**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| nmIds | number[] | No | WB article IDs to filter (0-1000 items, empty = all products) |
| chrtIds | number[] | No | Size IDs (only used for articles specified in nmIds) |
| limit | number | No | Rows in response (max 250000, default 250000) |
| offset | number | No | Number of results to skip for pagination (default 0) |

**Response fields (`WbWarehouseStockItem`):**

| Field | Type | Description |
|-------|------|-------------|
| `nmId` | number | WB article ID |
| `chrtId` | number | Size ID |
| `warehouseId` | number | WB warehouse ID |
| `warehouseName` | string | WB warehouse name |
| `regionName` | string | Region name |
| `quantity` | number | Current quantity in warehouse |
| `inWayToClient` | number | Quantity in transit to client |
| `inWayFromClient` | number | Quantity in transit from client (returns) |

**Rate Limit:** 3 requests/minute, 20-second interval, burst 1

**Token types:** Only available for Personal and Service tokens.

::: warning Replaces Deprecated Endpoint
This method replaces the deprecated `GET /api/v1/supplier/stocks`, which will be **disabled on June 23, 2026**. Migrate to `getWbWarehousesStock()` before that date.
:::

```typescript
// Get all inventory across WB warehouses
const stock = await sdk.analytics.getWbWarehousesStock();
for (const item of stock.data.items) {
  console.log(
    `nmId=${item.nmId} chrtId=${item.chrtId} ` +
    `${item.warehouseName} (${item.regionName}): ` +
    `${item.quantity} in stock, ${item.inWayToClient} in transit`
  );
}

// Filter by specific articles with pagination
const page = await sdk.analytics.getWbWarehousesStock({
  nmIds: [395996251, 268913787],
  limit: 100,
  offset: 0,
});
console.log(`Found ${page.data.items.length} inventory rows`);

// Filter by specific sizes
const sized = await sdk.analytics.getWbWarehousesStock({
  nmIds: [395996251],
  chrtIds: [123456789],
});
```

---

### Sales Funnel v3

```typescript
// Get product card statistics (v3)
const stats = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  orderBy: { field: 'orderCount', mode: 'desc' },
  limit: 10,
  offset: 0,
});
console.log('Currency:', stats.currency); // "RUB"
for (const { product, statistic } of stats.products) {
  console.log(`${product.nmId}: ${statistic.orderCount} orders`);
}

// Product statistics by day
const history = await sdk.analytics.getSalesFunnelProductsHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  nmIds: [268913787],
  aggregationLevel: 'day',
});
// history[0].currency is now available

// Grouped statistics by day
const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  aggregationLevel: 'day',
});
// grouped[0].currency is now available
```

### CSV Report Generation

```typescript
// Create analytics CSV report
const report = await sdk.analytics.createNmReportDownload({
  // SalesFunnelProductReq, SearchReportGroupReq, etc.
});

// Check report status
const reports = await sdk.analytics.getNmReportDownloads({
  'filter[downloadIds]': [report.downloadId],
});

// Download completed report (returns ArrayBuffer - ZIP with CSV)
const file = await sdk.analytics.getDownloadsFile(report.downloadId);

// Retry failed report
await sdk.analytics.createDownloadsRetry({ downloadId: report.downloadId });
```

### Search Query Reports

```typescript
// Get main search report
const report = await sdk.analytics.createSearchReportReport({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  // ... filters
});

// Paginate by groups
const groups = await sdk.analytics.createTableGroup({ ... });

// Paginate by products within a group
const details = await sdk.analytics.createTableDetail({ ... });

// Get search texts for a product
const texts = await sdk.analytics.createProductSearchText({ ... });

// Get product order data by search texts
const orders = await sdk.analytics.createProductOrder({ ... });
```

### Stock History

```typescript
// Stock data by product groups
const groups = await sdk.analytics.createProductsGroup({ ... });

// Stock data by individual products
const products = await sdk.analytics.createProductsProduct({ ... });

// Stock data by product sizes
const sizes = await sdk.analytics.createProductsSize({ ... });

// Stock data by warehouses
const offices = await sdk.analytics.createStocksReportOffice({ ... });
```

---

## Related Resources

- [API Reference: AnalyticsModule](/api/classes/AnalyticsModule)
- [Sales Funnel Analytics Best Practices](/guides/best-practices-sales-funnel)
- [Migration v2.7 - Analytics v3](/guides/migration-v2.7-analytics-v3)
