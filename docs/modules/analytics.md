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
| **Methods** | 21 |
| **Authentication** | API Key (Header) |

### What's New (Unreleased)

- **NEW `getOrderFeed()`** (WB news 2026-09): real-time **Order Feed** report — orders and buyouts unified in one method, with statuses (`created`/`buyout`/`cancel`/`return`/`returnDefective`), cancel reasons (`cancelType`), a B2B flag, and `snapshotTime`-cursor offset pagination. Replaces `sdk.reports.getSupplierOrders()` and `sdk.reports.getSupplierSales()` (both still work; WB announced a future shutdown without a date).
- **6 new types**: `OrderFeedSelectedPeriod`, `OrderFeedPagination`, `OrderFeedRequest`, `OrderFeedOrder`, `OrderFeedResponse`, `OrderFeedResponseWrapper`
- **NEW `getSellerWarehousesStock()`** (WB news 2026-09): current inventory across ALL seller warehouses — no warehouse/size IDs required in the request. Replaces per-warehouse `POST /api/v3/stocks/{warehouseId}` usage. Data refreshes once every 30 minutes.
- **3 new types**: `SellerWarehousesStockRequest`, `SellerWarehouseStockItem`, `SellerWarehousesStockResponse`

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
| `createProductsGroup()` | POST | `/api/v2/stocks-report/products/groups` | Get stock data by product groups. ⚠️ Since 2026-09-17 data refreshes once per 2 hours |
| `createProductsProduct()` | POST | `/api/v2/stocks-report/products/products` | Get stock data by products. ⚠️ Since 2026-09-17 data refreshes once per 2 hours |
| `createProductsSize()` | POST | `/api/v2/stocks-report/products/sizes` | Get stock data by product sizes. ⚠️ Since 2026-09-17 data refreshes once per 2 hours |
| `createStocksReportOffice()` | POST | `/api/v2/stocks-report/offices` | Get stock data by warehouses. ⚠️ Since 2026-09-17 data refreshes once per 2 hours |

> ⚠️ **Data freshness (WB news 2026-09-17)**: all four stocks-history report groups above refresh **once per 2 hours**; the `STOCK_HISTORY_REPORT_CSV` / `STOCK_HISTORY_DAILY_CSV` report types via `createNmReportDownload()` share the same cadence. For current stocks without the update delay use `getWbWarehousesStock()` or `getSellerWarehousesStock()` (refreshes every 30 minutes).

### WB Warehouse Inventory (1 method) - NEW in v3.4.0

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getWbWarehousesStock()` | POST | `/api/analytics/v1/stocks-report/wb-warehouses` | Get current inventory on WB warehouses |

### Seller Warehouse Inventory (1 method) - NEW (WB news 2026-09)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getSellerWarehousesStock()` | POST | `/api/analytics/v1/stocks-report/seller-warehouses` | Get current inventory across ALL seller warehouses — no warehouse/size IDs needed |

### Order Feed (1 method) - NEW (WB news 2026-09)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getOrderFeed()` | POST | `/api/analytics/v1/order-feed` | Real-time orders + buyouts in one report, with statuses, cancel reasons and B2B flag |

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
| `getSellerWarehousesStock()` | 3 req/min | 20s | 1 |
| `getOrderFeed()` | 1 req/min | 1 min | 1 (Base token without secret: 1 req per 3 h) |

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

### getSellerWarehousesStock() - Seller Warehouse Inventory (NEW, WB news 2026-09)

Returns current inventory quantities across **all seller warehouses** in a single request —
no warehouse or size IDs are required (filters are optional). Data is updated once every
30 minutes. Each row represents one item size in one seller warehouse.

**Endpoint:** `POST /api/analytics/v1/stocks-report/seller-warehouses`

**Request parameters (`SellerWarehousesStockRequest`):**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| nmIds | number[] | No | WB article IDs to filter (0-1000 items, empty = all products) |
| chrtIds | number[] | No | Size IDs (only used for articles specified in nmIds) |
| limit | number | No | Rows in response (max 250000, default 250000) |
| offset | number | No | Number of results to skip for pagination (default 0) |

**Response fields (`SellerWarehouseStockItem`):**

| Field | Type | Description |
|-------|------|-------------|
| `nmId` | number | WB article ID |
| `chrtId` | number | Size ID |
| `warehouseId` | number | Seller warehouse ID |
| `warehouseName` | string | Seller warehouse name |
| `regionName` | string | Region name |
| `quantity` | number | Current quantity in warehouse |

Unlike the WB-warehouses report, no `inWayToClient`/`inWayFromClient` in-transit counts are returned.

**Rate Limit:** 3 requests/minute, 20-second interval, burst 1 (strict)

**Token types:** Only available for Personal and Service tokens.

::: tip Replaces Per-Warehouse Stocks Calls
WB recommends this report instead of `sdk.products.getStocks()`
(`POST /api/v3/stocks/{warehouseId}`), which requires a warehouse ID and size IDs per call.
The products method is **not deprecated** — but for read-only stock visibility across all
seller warehouses, prefer `getSellerWarehousesStock()`.
:::

```typescript
// Get inventory across ALL seller warehouses — no warehouse/size IDs needed
const stock = await sdk.analytics.getSellerWarehousesStock();
for (const item of stock.data.items) {
  console.log(
    `nmId=${item.nmId} chrtId=${item.chrtId} ` +
    `${item.warehouseName} (${item.regionName}): ${item.quantity}`
  );
}

// Filter by specific articles with pagination
const page = await sdk.analytics.getSellerWarehousesStock({
  nmIds: [47254354, 268913787],
  limit: 100,
  offset: 0,
});
console.log(`Found ${page.data.items.length} inventory rows`);
```

---

### getOrderFeed() - Order Feed (NEW, WB news 2026-09)

Real-time report that unifies **orders and buyouts in one method**. 1 order = 1 assembly
order = 1 item. Unlike the legacy `supplier/orders` + `supplier/sales` reports, a buyout
does not create a second row — the same order row transitions between statuses
(`created` → `buyout`/`cancel`/`return`/`returnDefective`). **Statuses are the only
mutating fields**: re-request the same period to track an order's status transitions.
Cancelled orders additionally carry `cancelType` (`app`/`receipt`/`expire`/`other`), and
`isB2b` splits B2B from B2C sales.

**Endpoint:** `POST /api/analytics/v1/order-feed`

**Request parameters (`OrderFeedRequest`):**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| selectedPeriod.start | string (date-time) | Yes | Period start — by date of the **current** order status; max 31 days back |
| selectedPeriod.end | string (date-time) | No | Period end |
| nmIds | number[] | No | WB article IDs to filter (max 1000, empty = all orders) |
| subjectIds | number[] | No | Subcategory IDs to filter (max 50) |
| brandNames | string[] | No | Brands to filter (max 50) |
| tagIds | number[] | No | Label IDs to filter (max 50) |
| pagination.snapshotTime | string (date-time) | No | Snapshot cursor — reuse across pages of one selection |
| pagination.offset | number | No | Results to skip (default 0) |
| pagination.limit | number | No | Orders per response (max 10000, default 50) |

Multiple filters combine with AND; empty filter arrays return all seller orders.

**Response fields (`OrderFeedOrder` highlights):**

| Field | Type | Description |
|-------|------|-------------|
| `status` | `'created' \| 'buyout' \| 'cancel' \| 'return' \| 'returnDefective'` | Current order status |
| `cancelType` | `'app' \| 'receipt' \| 'expire' \| 'other'`? | Present only when `status = "cancel"` |
| `isMp` | boolean | `true` — seller warehouse, `false` — WB warehouse |
| `sellerPrice` | number | Seller price with seller discount (excl. WB Club discount and B2B wholesale) |
| `isB2b` | boolean | `true` — B2B, `false` — B2C |
| `data.snapshotTime` | string | Cursor — date of the last data update; drives consistent pagination |

**Rate Limit:** 1 request/minute, 1-minute interval, burst 1. Base token without a
secret: 1 request per 3 hours. Available for any token type (Analytics category).

::: warning Replaces supplier/orders + supplier/sales
WB recommends this report instead of `sdk.reports.getSupplierOrders()`
(`GET /api/v1/supplier/orders`) and `sdk.reports.getSupplierSales()`
(`GET /api/v1/supplier/sales`). Both legacy endpoints still work, but WB announced
they **will be disabled in the future — no date announced yet**.
:::

**Cursor pagination:** the report data updates asynchronously. To avoid skipping or
duplicating orders, all requests of one selection must share the same `snapshotTime`:
omit it on the first request (`offset: 0`), then pass the `data.snapshotTime` value from
that first response on every subsequent page. When changing the period or filters,
start over with `offset: 0` and no `snapshotTime`.

```typescript
// First page — offset 0, no snapshotTime
const first = await sdk.analytics.getOrderFeed({
  selectedPeriod: { start: '2026-08-24T00:00:00Z', end: '2026-09-23T00:00:00Z' },
  nmIds: [47254354],
  pagination: { offset: 0, limit: 1000 },
});
console.log(first.data.snapshotTime, first.data.currency);

// Subsequent pages — SAME snapshotTime cursor (mind the 1 req/min limit)
if (first.data.orders.length === 1000) {
  const page2 = await sdk.analytics.getOrderFeed({
    selectedPeriod: { start: '2026-08-24T00:00:00Z', end: '2026-09-23T00:00:00Z' },
    nmIds: [47254354],
    pagination: { snapshotTime: first.data.snapshotTime, offset: 1000, limit: 1000 },
  });
  console.log(`Page 2: ${page2.data.orders.length} orders`);
}
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
