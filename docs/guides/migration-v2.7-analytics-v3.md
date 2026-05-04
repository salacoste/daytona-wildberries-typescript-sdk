# Migration Guide: Analytics v3 Sales Funnel (v2.7)

**SDK Version**: 2.7.0
**Affects**: Analytics module -- Sales Funnel methods
**Urgency**: HIGH -- v2 endpoints already return 404

---

## Overview

Wildberries migrated the Sales Funnel analytics endpoints from v2 to v3. The old `/api/v2/nm-report/*` endpoints are **dead and return 404**. SDK v2.7.0 adds new v3 methods and preserves the old v2 methods as deprecated wrappers.

**What happened:**
- v2 endpoints (`/api/v2/nm-report/detail`, `/api/v2/nm-report/detail/history`, `/api/v2/nm-report/grouped/history`) are dead (404)
- v3 endpoints (`/api/analytics/v3/sales-funnel/*`) are active and return data
- The deprecated v2 wrapper methods internally delegate to v3, so existing code still works but returns v3 response shapes

---

## Quick Start: How to Migrate in 3 Steps

### Step 1: Find Affected Code (1 minute)

```bash
# Search for deprecated v2 method names in your project
grep -r "createNmReportDetail\|createDetailHistory\|createGroupedHistory" ./src
```

### Step 2: Replace Methods (5-15 minutes)

| Deprecated Method (v2) | New Method (v3) | Time |
|-------------------------|-----------------|------|
| `createNmReportDetail()` | `getSalesFunnelProducts()` | 5 min |
| `createDetailHistory()` | `getSalesFunnelProductsHistory()` | 5 min |
| `createGroupedHistory()` | `getSalesFunnelGroupedHistory()` | 5 min |

### Step 3: Update Types and Test (5 minutes)

```bash
npm run type-check
npm test
```

---

## Endpoint Migration Map

| Old (dead, 404) | New (active) |
|---|---|
| `POST /api/v2/nm-report/detail` | `POST /api/analytics/v3/sales-funnel/products` |
| `POST /api/v2/nm-report/detail/history` | `POST /api/analytics/v3/sales-funnel/products/history` |
| `POST /api/v2/nm-report/grouped/history` | `POST /api/analytics/v3/sales-funnel/grouped/history` |
| `POST /api/v2/nm-report/grouped` | *(removed by WB, no replacement)* |

---

## Request Field Changes

The v3 API uses different field names from v2. Here is a complete mapping:

| v2 Field | v3 Field | Notes |
|---|---|---|
| `period: { begin, end }` | `selectedPeriod: { start, end }` | Renamed container and `begin` to `start` |
| `nmIDs` | `nmIds` | Lowercase `ds` |
| `objectIDs` | `subjectIds` | Renamed from "object" to "subject" |
| `tagIDs` | `tagIds` | Lowercase `ds` |
| `page` | `limit` + `offset` | Page-based to offset-based pagination |
| `timezone` | *(removed)* | No longer accepted |
| *(new)* | `skipDeletedNm` | Option to hide deleted product cards |
| *(new)* | `pastPeriod` | Comparison period for trend analysis |
| `aggregationLevel` (string) | `aggregationLevel` (enum: `'day'` \| `'week'`) | Now a typed enum |

---

## Method 1: `createNmReportDetail()` to `getSalesFunnelProducts()`

### Before (v2 -- deprecated)

```typescript
const result = await sdk.analytics.createNmReportDetail({
  period: { begin: '2026-01-01', end: '2026-01-31' },
  nmIDs: [268913787],
  objectIDs: [105],
  tagIDs: [12],
  brandNames: ['MyBrand'],
  orderBy: { field: 'openCard', mode: 'desc' },
  page: 1,
});

// Access data
const cards = result.data?.cards;
cards?.forEach(card => {
  console.log(card.nmID, card.statistics?.selectedPeriod?.openCardCount);
});
```

### After (v3 -- recommended)

```typescript
const result = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  nmIds: [268913787],
  subjectIds: [105],
  tagIds: [12],
  brandNames: ['MyBrand'],
  orderBy: { field: 'openCount', mode: 'desc' },
  limit: 50,
  offset: 0,
});

// Access data
const products = result.products;
products?.forEach(product => {
  console.log(product.product.nmId, product.currentPeriod?.openCount);
});
```

**Key differences:**
- `period.begin/end` becomes `selectedPeriod.start/end`
- `nmIDs` becomes `nmIds`, `objectIDs` becomes `subjectIds`, `tagIDs` becomes `tagIds`
- `page: 1` becomes `limit: 50, offset: 0`
- Response: `data.cards` becomes `products` at top level
- Response field `openCardCount` becomes `openCount`

---

## Method 2: `createDetailHistory()` to `getSalesFunnelProductsHistory()`

### Before (v2 -- deprecated)

```typescript
const result = await sdk.analytics.createDetailHistory({
  nmIDs: [268913787],
  period: { begin: '2026-01-01', end: '2026-01-07' },
  timezone: 'Europe/Moscow',
  aggregationLevel: 'day',
});

result.data?.forEach(item => {
  console.log(item.nmID, item.history);
});
```

### After (v3 -- recommended)

```typescript
const result = await sdk.analytics.getSalesFunnelProductsHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  nmIds: [268913787],
  aggregationLevel: 'day',
});

result.forEach(item => {
  console.log(item.product.nmId, item.periodStats);
});
```

**Key differences:**
- `period.begin/end` becomes `selectedPeriod.start/end`
- `nmIDs` becomes `nmIds`
- `timezone` is removed (no longer supported)
- Response is a direct array, not wrapped in `data`

---

## Method 3: `createGroupedHistory()` to `getSalesFunnelGroupedHistory()`

### Before (v2 -- deprecated)

```typescript
const result = await sdk.analytics.createGroupedHistory({
  objectIDs: [105],
  brandNames: ['MyBrand'],
  tagIDs: [12],
  period: { begin: '2026-01-01', end: '2026-01-07' },
  timezone: 'Europe/Moscow',
  aggregationLevel: 'day',
});

result.data?.forEach(group => {
  console.log(group.object?.name, group.history);
});
```

### After (v3 -- recommended)

```typescript
const result = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  subjectIds: [105],
  brandNames: ['MyBrand'],
  tagIds: [12],
  aggregationLevel: 'day',
});

result.forEach(group => {
  console.log(group.product.subjectName, group.periodStats);
});
```

**Key differences:**
- `objectIDs` becomes `subjectIds`, `tagIDs` becomes `tagIds`
- `period.begin/end` becomes `selectedPeriod.start/end`
- `timezone` is removed
- Response is a direct array, not wrapped in `data`

---

## Response Field Changes

| v2 Field | v3 Field |
|---|---|
| `openCardCount` | `openCount` |
| `addToCartCount` | `cartCount` |
| `ordersCount` | `orderCount` |
| `ordersSumRub` | `orderSum` |
| `buyoutsSumRub` | `buyoutSum` |
| `cancelSumRub` | `cancelSum` |
| `avgPriceRub` | `avgPrice` |
| `dt` | `date` |

---

## Type Migration

### Request Types

| Deprecated Type | New Type |
|---|---|
| `NmReportDetailRequest` | `SalesFunnelProductsRequest` |
| `NmReportDetailHistoryRequest` | `SalesFunnelProductsHistoryRequest` |
| `NmReportGroupedHistoryRequest` | `SalesFunnelGroupedHistoryRequest` |

### Response Types

| Deprecated Type | New Type |
|---|---|
| `NmReportDetailResponse` | `SalesFunnelProductsResponse` |
| `NmReportDetailHistoryResponse` | `SalesFunnelProductsHistoryResponse` |
| `NmReportGroupedHistoryResponse` | `SalesFunnelGroupedHistoryResponse` |

Import the new types:

```typescript
import type {
  SalesFunnelProductsRequest,
  SalesFunnelProductsResponse,
  SalesFunnelProductsHistoryRequest,
  SalesFunnelProductsHistoryResponse,
  SalesFunnelGroupedHistoryRequest,
  SalesFunnelGroupedHistoryResponse,
} from 'daytona-wildberries-typescript-sdk';
```

---

## Deprecated Wrapper Behavior

The old v2 methods (`createNmReportDetail`, `createDetailHistory`, `createGroupedHistory`) are preserved as deprecated wrappers. They:

1. Accept the old v2 request format
2. Internally map parameters to v3 format (e.g., `period.begin` to `selectedPeriod.start`)
3. Call the new v3 endpoint
4. Return the v3 response shape (cast to the old type for backward compatibility)

**Important**: Because the wrappers return v3 response data cast to v2 types, the actual response field names will be v3 names (`openCount` instead of `openCardCount`). If your code accesses specific response fields by name, you should migrate to the v3 methods and types.

---

## IDE Support

Deprecated methods are marked with `@deprecated` JSDoc tags. Your IDE will show:

- ~~Strikethrough~~ on deprecated method names
- Warning messages with migration hints
- Links to the replacement v3 methods

```typescript
// IDE shows strikethrough and deprecation warning
sdk.analytics.createNmReportDetail({ ... });
//             ~~~~~~~~~~~~~~~~~~~~
//  @deprecated Use getSalesFunnelProducts instead.
//  v2 endpoint is dead (404).
```

---

## Migration Checklist

- [ ] Search codebase for `createNmReportDetail` calls -- replace with `getSalesFunnelProducts`
- [ ] Search codebase for `createDetailHistory` calls -- replace with `getSalesFunnelProductsHistory`
- [ ] Search codebase for `createGroupedHistory` calls -- replace with `getSalesFunnelGroupedHistory`
- [ ] Update request objects: `period` to `selectedPeriod`, `begin` to `start`
- [ ] Update request objects: `nmIDs` to `nmIds`, `objectIDs` to `subjectIds`, `tagIDs` to `tagIds`
- [ ] Update request objects: `page` to `limit` + `offset`
- [ ] Remove `timezone` from request objects
- [ ] Update response field access: `openCardCount` to `openCount`, etc.
- [ ] Update type imports to use `SalesFunnel*` types
- [ ] Run `npm run type-check` -- no TypeScript errors
- [ ] Run `npm test` -- all tests pass

---

## Related Migration Guides

- [Migration v3.0 - Complete Guide](/guides/migration-v3) — all breaking changes in v3.0.0 (62 removed methods, 14 removed types)
- [Type 8 → Type 9 Campaign Migration](/guides/migration-type8-to-type9) — migrate Promotion campaigns before February 2, 2026
- [Migration v2.3 - Promotion Required Parameters](/guides/migration-v2.3) — earlier breaking changes in v2.3
- [Finance Reports v5 → v1 Migration](/guides/migration-finance-reports-v5-to-v1) — migrate Finance Reports before July 15, 2026

## Additional Resources

- **[CHANGELOG v2.7.0](/CHANGELOG.md)** -- Full list of changes
- **[Analytics API Documentation](https://dev.wildberries.ru/openapi/seller-analytics#tag/Voronka-prodazh)** -- Official v3 endpoint docs
- **[Analytics Dashboard Example](/examples/analytics-dashboard.ts)** -- Updated example using v3 methods
- **[EPIC 13 Summary](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/docs/epics/EPIC_13_ANALYTICS_V3.md)** -- Technical implementation details

---

**Last Updated**: February 3, 2026
**Applies to**: SDK v2.7.0+
