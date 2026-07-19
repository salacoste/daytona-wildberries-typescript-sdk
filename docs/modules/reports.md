# Reports Module

The **Reports** module provides access to supplier reports, warehouse stock reports, penalty reports, paid storage/acceptance reports, regional sales, brand share analytics, and blocked product listings.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `reports` |
| **SDK Namespace** | `sdk.reports.*` |
| **Base URLs** | `https://statistics-api.wildberries.ru`, `https://seller-analytics-api.wildberries.ru`, `https://api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/12-reports/` |
| **Methods** | 25 |
| **Authentication** | API Key (Header) |

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get supplier sales data
const sales = await sdk.reports.getSupplierSales({ dateFrom: '2026-01-01' });

// Get warehouse stock balance
const stocks = await sdk.reports.getSupplierStocks({ dateFrom: '2026-01-01' });

// Get regional sales report
const regions = await sdk.reports.getAnalyticsRegionSale();

// Get brand share in sales
const brandShare = await sdk.reports.getAnalyticsBrandShare();
```

---

## Methods Reference

### Core Supplier Reports (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getSupplierStocks()` | GET | `/api/v1/supplier/stocks` | Get warehouse stock balance |
| `getSupplierOrders()` | GET | `/api/v1/supplier/orders` | Get all orders |
| `getSupplierSales()` | GET | `/api/v1/supplier/sales` | Get sales and returns |

### Excise Report (1 method)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `createAnalyticsExciseReport()` | POST | `/api/v1/analytics/excise-report` | Get excisable goods operations report |

### Warehouse Remains (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `warehouseRemains()` | GET | `/api/v1/warehouse_remains` | Create warehouse stock report task |
| `getWarehouseRemainsTaskStatus()` | GET | `/api/v1/warehouse_remains/tasks/{task_id}/status` | Check warehouse report task status |
| `downloadWarehouseRemainsReport()` | GET | `/api/v1/warehouse_remains/tasks/{task_id}/download` | Download warehouse report |

### Penalty Reports (5 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getMeasurementPenalties()` | GET | `/api/analytics/v1/measurement-penalties` | Get dimension penalties report |
| `getWarehouseMeasurementsV2()` | GET | `/api/analytics/v1/warehouse-measurements` | Get warehouse measurements (V2) |
| `getAnalyticsAntifraudDetails()` | GET | `/api/v1/analytics/antifraud-details` | Get self-purchase penalties report |
| `getAnalyticsGoodsLabeling()` | GET | `/api/v1/analytics/goods-labeling` | Get marking violations penalties |
| `getDeductions()` | GET | `/api/analytics/v1/deductions` | Get substitution and attachment deductions |

> **Note:** Methods `getAnalyticsWarehouseMeasurements()`, `getAnalyticsIncorrectAttachments()`, and `getAnalyticsCharacteristicsChange()` have been removed. Use the new methods above.

### Paid Acceptance (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `acceptanceReport()` | GET | `/api/v1/acceptance_report` | Create paid acceptance report task |
| `getAcceptanceReportTaskStatus()` | GET | `/api/v1/acceptance_report/tasks/{task_id}/status` | Check acceptance report task status |
| `downloadAcceptanceReport()` | GET | `/api/v1/acceptance_report/tasks/{task_id}/download` | Download acceptance report |

### Paid Storage (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `paidStorage()` | GET | `/api/v1/paid_storage` | Create paid storage report task |
| `getPaidStorageTaskStatus()` | GET | `/api/v1/paid_storage/tasks/{task_id}/status` | Check paid storage task status |
| `downloadPaidStorageReport()` | GET | `/api/v1/paid_storage/tasks/{task_id}/download` | Download paid storage report |

### Regional & Brand Analytics (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAnalyticsRegionSale()` | GET | `/api/v1/analytics/region-sale` | Get regional sales report |
| `getBrandShareBrands()` | GET | `/api/v1/analytics/brand-share/brands` | Get seller brands list |
| `getBrandShareParentSubjects()` | GET | `/api/v1/analytics/brand-share/parent-subjects` | Get brand parent categories |
| `getAnalyticsBrandShare()` | GET | `/api/v1/analytics/brand-share` | Get brand share in sales |

### Blocked Products & Returns (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getBannedProductsBlocked()` | GET | `/api/v1/analytics/banned-products/blocked` | Get blocked products list |
| `getBannedProductsShadowed()` | GET | `/api/v1/analytics/banned-products/shadowed` | **Deprecated:** WB removal on 2026-07-30; use `analytics.getItemRatingV2({ onlyShadowedNms: true, ... })` |
| `getAnalyticsGoodsReturn()` | GET | `/api/v1/analytics/goods-return` | Get goods returns report |

---

## Rate Limits

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 Standard | Supplier reports (stocks, orders, sales) | 1 req/min | 60s |
| T2 Task Status | Report task status checks | 12 req/5s | ~420ms |
| T3 Downloads | Report downloads | 1 req/min | 60s |
| T4 Penalties | Measurement, labeling, characteristics penalties | 1-5 req/min | 12-60s |
| T5 Antifraud | Self-purchase penalties | 10 req/100min | 10min |
| T6 Excise | Excisable goods report | 10 req/5h | 30min |
| T7 Regional | Regional sales, blocked products | 6 req/10s | ~1.7s |
| T8 Brand Share | Brand share, parent subjects | 12 req/5s | ~420ms |

---

## Related Resources

- [API Reference: ReportsModule](/api/classes/ReportsModule)
- [Reports Module Guide](/guides/reports-module)
- [Realization Report Guide](/guides/realization-report)
- [Storage Fees Integration](/guides/storage-fees-integration)
