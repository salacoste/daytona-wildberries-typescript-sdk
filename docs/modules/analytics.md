# Analytics Module

The **Analytics** module provides access to sales funnel analytics, search query reports, stock history, and CSV report generation for the Wildberries marketplace.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `analytics` |
| **SDK Namespace** | `sdk.analytics.*` |
| **Base URL** | `https://seller-analytics-api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/11-analytics/` |
| **Methods** | 19 (16 active + 3 deprecated) |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get product card statistics (v3)
const stats = await sdk.analytics.getSalesFunnelProducts({
  dateFrom: '2026-01-01',
  dateTo: '2026-01-31'
});

// Get search query report
const report = await sdk.analytics.createSearchReportReport({ ... });

// Get stock data by warehouses
const stocks = await sdk.analytics.createStocksReportOffice({ ... });

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

### Deprecated v2 (3 methods)

> Use v3 Sales Funnel methods instead.

| Method | Replacement |
|--------|-------------|
| `createNmReportDetail()` | `getSalesFunnelProducts()` |
| `createDetailHistory()` | `getSalesFunnelProductsHistory()` |
| `createGroupedHistory()` | `getSalesFunnelGroupedHistory()` |

---

## Rate Limits

All methods share the same rate limit tier:

| Operation | Limit | Interval |
|-----------|-------|----------|
| All analytics endpoints | 3 req/min | 20s |

---

## Related Resources

- [API Reference: AnalyticsModule](/api/classes/AnalyticsModule)
- [Sales Funnel Analytics Best Practices](/guides/best-practices-sales-funnel)
- [Migration v2.7 - Analytics v3](/guides/migration-v2.7-analytics-v3)
