---
title: Migration Guide v2.x → v3.0.0
description: Complete guide for migrating from SDK v2.x to v3.0.0
---

# Migration Guide: v2.x → v3.0.0

## Overview

v3.0.0 is a major release that removes all deprecated methods. This guide helps you migrate your code from SDK v2.x to v3.0.0.

**Release Timeline**:
| Version | Date | Description |
|---------|------|-------------|
| v2.8.0 | February 2026 | Deprecation warnings added |
| v2.9.0 | March 2026 | Final deprecation warnings |
| v3.0.0 | April 2026 | Deprecated methods removed |

**Quick Stats**:
- **62 methods** deprecated across 9 modules
- **14 types** deprecated
- Most have direct 1:1 replacements
- Some endpoints removed entirely from Wildberries API

## Breaking Changes Summary

### Removed Methods by Module

---

## Promotion Module (19 methods removed)

The promotion module has the most deprecations, primarily due to Wildberries transitioning from "unified bid" campaigns (type 8) to "manual/unified bid" campaigns (type 9).

### Campaign Management

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getPromotionCount()` | `getAdvAdverts()` | Use GET /api/advert/v2/adverts |
| `createPromotionAdvert()` | `getAdvAdverts()` | For campaign info by type/status |
| `getAuctionAdverts()` | Updated campaign management API | Type 9 campaigns |
| `getAdvConfig()` | Updated configuration API | |
| `getAdvStart()` | Updated campaign management API | |
| `getAdvPause()` | Updated campaign management API | |

### Campaign Creation

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `createAdvSaveAd()` | `createSeacatSaveAd()` | POST /adv/v2/seacat/save-ad |
| `createSeacatSaveAd()` | Current campaign creation API | For type 9 campaigns |
| `createBidsMin()` | POST /api/advert/v1/bids/min | Minimum bids for product cards |
| `updateAdvBid()` | PATCH /api/advert/v1/bids | Bid updates |

### Supplier Methods

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getSupplierSubjects()` | Updated supplier API | Subjects for campaigns |
| `createSupplierNm()` | Updated supplier API | Product cards for campaigns |

### Fixed Phrases (Search)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getSearchSetPlus()` | Use type 9 campaign methods | Fixed phrase activity |
| `createSearchSetPlu()` | Use type 9 campaign methods | Set/remove fixed phrases |
| `createSearchSetExcluded()` | Use type 9 campaign methods | Minus phrases in search |

### Unified Bid Campaign Methods (Type 8 → Type 9)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getAutoGetnmtoadd()` | `getAuctionAdverts()` + `updateAuctionNm()` | Product cards for unified bid campaigns |

### Statistics

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `createAdvFullstat()` | `getAdvFullstats()` | GET /adv/v3/fullstats |
| `getAutoStatWords()` | `getAdvFullstats()` | Removed February 2, 2026 |
| `getStatWords()` | `getStatsKeywords()` | GET /adv/v0/stats/keywords |

### Migration Examples

```typescript
// Before (v2.x) - Get campaign count
const count = await sdk.promotion.getPromotionCount();

// After (v3.0.0) - Use adverts list
const adverts = await sdk.promotion.getAdvAdverts();
const count = adverts.length;
```

```typescript
// Before (v2.x) - Get campaign statistics
const stats = await sdk.promotion.createAdvFullstat({
  date_from: '2026-01-01',
  date_to: '2026-01-31',
});

// After (v3.0.0) - Use new statistics endpoint
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345,67890',
  beginDate: '2026-01-01',
  endDate: '2026-01-31',
});
```

```typescript
// Before (v2.x) - Start campaign
await sdk.promotion.getAdvStart({ id: 12345 });

// After (v3.0.0) - Use updated campaign management
// Contact Wildberries for updated API endpoint
```

---

## Orders DBS Module (13 methods removed)

DBS (Delivery by Seller) module transitioned from single-order endpoints to bulk operations.

### Metadata Operations (Removed April 13, 2026)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getMeta(orderId)` | `getMetaBulk({ orders: [orderId] })` | Bulk metadata retrieval |
| `deleteMeta(orderId, key)` | `deleteMetaBulk({ orders: [orderId], key })` | Bulk metadata deletion |
| `setSgtin(orderId, sgtins)` | `setSgtinBulk({ orders: [{ orderId, sgtins }] })` | Bulk SGTIN setting |
| `setUin(orderId, uin)` | `setUinBulk({ orders: [{ orderId, uin }] })` | Bulk UIN setting |
| `setImei(orderId, imei)` | `setImeiBulk({ orders: [{ orderId, imei }] })` | Bulk IMEI setting |
| `setGtin(orderId, gtin)` | `setGtinBulk({ orders: [{ orderId, gtin }] })` | Bulk GTIN setting |
| `setCustomsDeclaration(orderId, cd)` | `setCustomsDeclarationBulk({ orders: [{ orderId, customsDeclaration }] })` | Bulk customs declaration |

### Status Operations (Removed April 13, 2026)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getStatuses(orderIds)` | `getStatusesBulk(orderIds)` | Improved response format |
| `confirm(orderId)` | `confirmBulk([orderId])` | Bulk confirmation |
| `deliver(orderId)` | `deliverBulk([orderId])` | Bulk delivery |
| `receive(orderId, code)` | `receiveBulk([{ orderId, code }])` | Bulk receive |
| `reject(orderId, code)` | `rejectBulk([{ orderId, code }])` | Bulk rejection |
| `cancel(orderId)` | `cancelBulk([orderId])` | Bulk cancellation |

### Migration Examples

```typescript
// Before (v2.x) - Set SGTIN for single order
await sdk.ordersDBS.setSgtin(123456, ['1234567890123456']);

// After (v3.0.0) - Use bulk method
await sdk.ordersDBS.setSgtinBulk({
  orders: [{ orderId: 123456, sgtins: ['1234567890123456'] }]
});
```

```typescript
// Before (v2.x) - Get metadata for single order
const meta = await sdk.ordersDBS.getMeta(123456);

// After (v3.0.0) - Use bulk method
const result = await sdk.ordersDBS.getMetaBulk({ orders: [123456] });
const meta = result.orders?.[0];
```

```typescript
// Before (v2.x) - Confirm single order
await sdk.ordersDBS.confirm(123456);

// After (v3.0.0) - Use bulk method
await sdk.ordersDBS.confirmBulk([123456]);
```

```typescript
// Before (v2.x) - Receive order with code
await sdk.ordersDBS.receive(123456, 'ABC123');

// After (v3.0.0) - Use bulk method
await sdk.ordersDBS.receiveBulk([{ orderId: 123456, code: 'ABC123' }]);
```

---

## Reports Module (10 methods removed)

### Task Status/Download Methods (Renamed for clarity)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getTasksStatu(task_id)` | `getWarehouseRemainsTaskStatus(task_id)` | Warehouse remains report |
| `getTasksDownload(task_id)` | `downloadWarehouseRemainsReport(task_id)` | Warehouse remains report |
| `getTasksStatu2(task_id)` | `getAcceptanceReportTaskStatus(task_id)` | Acceptance report |
| `getTasksDownload2(task_id)` | `downloadAcceptanceReport(task_id)` | Acceptance report |
| `getTasksStatu3(task_id)` | `getPaidStorageTaskStatus(task_id)` | Paid storage report |
| `getTasksDownload3(task_id)` | `downloadPaidStorageReport(task_id)` | Paid storage report |

### Removed Endpoints

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getSupplierIncomes()` | None | Deprecated March 11, 2026 |
| `getAnalyticsWarehouseMeasurements()` | `getMeasurementPenalties()` or `getWarehouseMeasurementsV2()` | Split into two endpoints |
| `getAnalyticsIncorrectAttachments()` | `getDeductions()` | Combined with substitutions |
| `getAnalyticsCharacteristicsChange()` | None | Endpoint removed from API |

### Migration Examples

```typescript
// Before (v2.x) - Check warehouse remains task status
const status = await sdk.reports.getTasksStatu('task-uuid');

// After (v3.0.0) - Use descriptive method name
const status = await sdk.reports.getWarehouseRemainsTaskStatus('task-uuid');
```

```typescript
// Before (v2.x) - Download paid storage report
const report = await sdk.reports.getTasksDownload3('task-uuid');

// After (v3.0.0) - Use descriptive method name
const report = await sdk.reports.downloadPaidStorageReport('task-uuid');
```

```typescript
// Before (v2.x) - Get warehouse measurements
const data = await sdk.reports.getAnalyticsWarehouseMeasurements({
  dateFrom: '2026-01-01',
  dateTo: '2026-01-31',
  tab: 'penalty',
  limit: 100,
});

// After (v3.0.0) - Use specific method
const penalties = await sdk.reports.getMeasurementPenalties({
  dateTo: '2026-01-31',
  limit: 100,
});

// Or for measurements:
const measurements = await sdk.reports.getWarehouseMeasurementsV2({
  dateTo: '2026-01-31',
  limit: 100,
});
```

---

## Communications Module (6 methods removed)

All template-related endpoints have been removed from the Wildberries API.

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `supplierValuations()` | None | Endpoint removed from API |
| `createFeedbacksAction()` | None | Endpoint removed from API |
| `templates()` | None | Template feature discontinued |
| `createTemplate()` | None | Template feature discontinued |
| `updateTemplate()` | None | Template feature discontinued |
| `deleteTemplate()` | None | Template feature discontinued |

### Migration Notes

The response template feature has been discontinued by Wildberries. There is no direct replacement in the API.

```typescript
// Before (v2.x) - Get templates
const templates = await sdk.communications.templates({ templateType: 1 });

// After (v3.0.0) - No replacement available
// You need to manage response templates externally
// Consider storing templates in your own database
```

---

## Orders FBS Module (5 methods removed)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getOrdersStatu(orderIds)` | `getOrderStatuses(orderIds)` | Fixed typo in method name |
| `getOrderMeta(orderId)` | `getOrdersMetaBulk({ orders: [orderId] })` | Use bulk endpoint |
| `getFilesOrdersExternalStickers()` | `createStickersCrossBorder()` | Returns PDF format |
| `addOrderToSupply(orderId, supplyId)` | `addOrdersToSupply(supplyId, orderIds)` | Bulk assignment |
| `getSupplyOrders(supplyId)` | `getSupplyOrderIds(supplyId)` | Updated response format |

### Migration Examples

```typescript
// Before (v2.x) - Get order statuses (typo in method name)
const statuses = await sdk.ordersFBS.getOrdersStatu([123456, 789012]);

// After (v3.0.0) - Use correctly named method
const statuses = await sdk.ordersFBS.getOrderStatuses([123456, 789012]);
```

```typescript
// Before (v2.x) - Get single order metadata
const meta = await sdk.ordersFBS.getOrderMeta(123456);

// After (v3.0.0) - Use bulk method
const result = await sdk.ordersFBS.getOrdersMetaBulk({ orders: [123456] });
const meta = result.orders?.[0];
```

```typescript
// Before (v2.x) - Add order to supply
await sdk.ordersFBS.addOrderToSupply(123456, 'WB-GI-12345');

// After (v3.0.0) - Use bulk method
await sdk.ordersFBS.addOrdersToSupply('WB-GI-12345', [123456]);
```

---

## Products Module (7 methods removed)

### Card List Methods (Renamed)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `createCardsList()` | `getCardsList()` | Same functionality, better name |
| `createCardsTrash()` | `getTrashedCards()` | Same functionality, better name |

### Buffer Goods Task

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getGoodsTask2()` | `getBufferGoodsTask()` | Same functionality, better name |

### Stock Methods

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `createStock()` | `getStocks()` | Same functionality, better name |

### Warehouse Methods (Typo fixes)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `createWarehous()` | `createWarehouse()` | Fixed typo |
| `updateWarehous()` | `updateWarehouse()` | Fixed typo |
| `deleteWarehous()` | `deleteWarehouse()` | Fixed typo |

### Migration Examples

```typescript
// Before (v2.x) - Get product cards list
const cards = await sdk.products.createCardsList({
  settings: { cursor: { limit: 100 } }
});

// After (v3.0.0) - Use descriptive method name
const cards = await sdk.products.getCardsList({
  settings: { cursor: { limit: 100 } }
});
```

```typescript
// Before (v2.x) - Get trashed cards
const trashed = await sdk.products.createCardsTrash({
  settings: { cursor: { limit: 100 } }
});

// After (v3.0.0) - Use descriptive method name
const trashed = await sdk.products.getTrashedCards({
  settings: { cursor: { limit: 100 } }
});
```

```typescript
// Before (v2.x) - Create warehouse (typo)
const result = await sdk.products.createWarehous({
  name: 'My Warehouse',
  officeId: 123
});

// After (v3.0.0) - Fixed method name
const result = await sdk.products.createWarehouse({
  name: 'My Warehouse',
  officeId: 123
});
```

---

## Analytics Module (3 methods removed)

All v2 sales funnel endpoints are dead (return 404). Use v3 endpoints.

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `createNmReportDetail()` | `getSalesFunnelProducts()` | v2 → v3 endpoint |
| `createNmReportDetailHistory()` | `getSalesFunnelProductsHistory()` | v2 → v3 endpoint |
| `createNmReportGroupedHistory()` | `getSalesFunnelGroupedHistory()` | v2 → v3 endpoint |

### Migration Examples

```typescript
// Before (v2.x) - Get sales funnel products (dead endpoint)
const data = await sdk.analytics.createNmReportDetail({
  brandNames: ['MyBrand'],
  // v2 parameters
});

// After (v3.0.0) - Use v3 endpoint
const data = await sdk.analytics.getSalesFunnelProducts({
  brandNames: ['MyBrand'],
  period: { begin: '2026-01-01', end: '2026-01-31' },
  page: 1,
  // v3 parameters
});
```

---

## In-Store Pickup Module (1 method removed)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `createOrdersStatu()` | `createOrdersStatus()` | Fixed typo in method name |

### Migration Example

```typescript
// Before (v2.x) - Typo in method name
const status = await sdk.inStorePickup.createOrdersStatu({
  orders: [123456]
});

// After (v3.0.0) - Fixed method name
const status = await sdk.inStorePickup.createOrdersStatus({
  orders: [123456]
});
```

---

## Orders FBW Module (2 methods removed)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getAcceptanceCoefficients()` | `sdk.tariffs.getAcceptanceCoefficients()` | Moved to tariffs module |
| `createSupply()` | `listSupplies()` | Supply listing |

### Migration Examples

```typescript
// Before (v2.x) - Get acceptance coefficients from FBW module
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// After (v3.0.0) - Use tariffs module
const coefficients = await sdk.tariffs.getAcceptanceCoefficients();
```

---

## Finances Module (1 method removed)

| Removed Method | Alternative | Notes |
|----------------|-------------|-------|
| `getSupplierReportdetailbyperiod()` | `getSupplierReportDetailByPeriod()` | Fixed casing |

### Migration Example

```typescript
// Before (v2.x) - Incorrect casing
const report = await sdk.finances.getSupplierReportdetailbyperiod({
  dateFrom: '2026-01-01',
  dateTo: '2026-01-31'
});

// After (v3.0.0) - Correct casing
const report = await sdk.finances.getSupplierReportDetailByPeriod({
  dateFrom: '2026-01-01',
  dateTo: '2026-01-31'
});
```

---

## Removed Types

The following TypeScript types are removed in v3.0.0:

### Orders DBS Types

| Removed Type | Alternative |
|--------------|-------------|
| `DBSOrderStatusLegacy` | `DBSOrderStatusBulk` |
| `GetStatusResponseLegacy` | `GetStatusInfoResponse` |

### Analytics Types

| Removed Type | Alternative |
|--------------|-------------|
| `NmReportDetailRequest` | `SalesFunnelProductsRequest` |
| `NmReportDetailHistoryRequest` | `SalesFunnelProductsHistoryRequest` |
| `NmReportGroupedHistoryRequest` | `SalesFunnelGroupedHistoryRequest` |
| `NmReportDetailResponse` | `SalesFunnelProductsResponse` |
| `NmReportDetailHistoryResponse` | `SalesFunnelProductsHistoryResponse` |
| `NmReportGroupedHistoryResponse` | `SalesFunnelGroupedHistoryResponse` |

### Reports Types

| Removed Type | Alternative |
|--------------|-------------|
| `Response400WHM` | `Response400Retentions` |
| `Response403WHM` | `Response403Retentions` |

### Communications Types

| Removed Type | Alternative |
|--------------|-------------|
| `ResponseTemplate` | None (feature discontinued) |
| `PostTemplate` | None (feature discontinued) |
| `PatchDelResp` | None (feature discontinued) |

---

## Automated Migration

### Find Deprecated Method Usage

Run this command to find deprecated method usage in your codebase:

```bash
# Search for deprecated method calls
grep -rn "getPromotionCount\|createPromotionAdvert\|getAuctionAdverts\|getAdvConfig\|createBidsMin\|createAdvSaveAd\|createSeacatSaveAd\|getSupplierSubjects\|createSupplierNm\|getAdvStart\|getAdvPause\|updateAdvBid\|getSearchSetPlus\|createSearchSetPlu\|createSearchSetExcluded\|getAutoGetnmtoadd\|createAdvFullstat\|getAutoStatWords\|getStatWords" src/
```

### TypeScript Migration Helper

Add this to your `tsconfig.json` to catch deprecated method usage:

```json
{
  "compilerOptions": {
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

The SDK marks all deprecated methods with `@deprecated` JSDoc tags, which modern IDEs will highlight.

---

## Deprecation Warnings

In v2.x, deprecated methods emit console warnings:

```
[WB SDK] getPromotionCount() is deprecated. Use GET /api/advert/v2/adverts instead.
[WB SDK] setSgtin() is deprecated. Use setSgtinBulk() instead.
[WB SDK] getTasksStatu() is deprecated. Use getWarehouseRemainsTaskStatus() instead.
```

These warnings help identify code that needs migration before upgrading to v3.0.0.

---

## FAQ

### Q: Can I suppress deprecation warnings?

A: Yes, but we recommend fixing them instead:

```typescript
// Suppress specific warning (not recommended)
const originalWarn = console.warn;
console.warn = (...args) => {
  if (!args[0]?.includes('[WB SDK]')) {
    originalWarn.apply(console, args);
  }
};
```

### Q: What if there's no replacement for a removed method?

A: Some methods were removed because Wildberries discontinued the underlying API endpoint. For these cases:
- Check the [Wildberries API changelog](https://dev.wildberries.ru/release-notes)
- Contact Wildberries support for alternatives
- Implement workarounds using available endpoints

### Q: How do I handle breaking changes in response types?

A: The bulk methods often return slightly different response structures. Check the TypeScript types for the new response format:

```typescript
// Example: Bulk status response includes additional error information
const result = await sdk.ordersDBS.getStatusesBulk([123456]);
// Check for errors per order
for (const order of result.orders ?? []) {
  if (order.errorCode) {
    console.error(`Order ${order.orderId}: ${order.errorMessage}`);
  }
}
```

### Q: Will v2.x continue to receive updates?

A: v2.x will receive security patches until v3.0.0 is released. New features will only be added to v3.x.

---

## Need Help?

- **SDK Issues**: [GitHub Issues](https://github.com/your-org/wb-api-sdk/issues)
- **API Documentation**: [Wildberries Developer Portal](https://dev.wildberries.ru/openapi)
- **API Changelog**: [Release Notes](https://dev.wildberries.ru/release-notes)
- **Community**: [Telegram Channel](https://t.me/wb_api_community)

---

## Changelog

### v3.0.0 (April 2026)
- Removed all deprecated methods (62 methods across 9 modules)
- Removed deprecated types (14 types)
- Breaking: Minimum Node.js version is now 18
- Breaking: ES2020 target (was ES2018)

### v2.9.0 (March 2026)
- Final deprecation warnings
- Added migration helpers

### v2.8.0 (February 2026)
- Initial deprecation warnings
- Added bulk methods as alternatives
