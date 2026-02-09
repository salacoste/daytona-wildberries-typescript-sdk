# Promotion Module

The **Promotion** module manages advertising campaigns, bid management, budget operations, keyword statistics, search cluster targeting, and calendar promotions on the Wildberries marketplace.

---

## Overview

| Property | Value |
|----------|-------|
| **Module Name** | `promotion` |
| **SDK Namespace** | `sdk.promotion.*` |
| **Base URLs** | `https://advert-api.wildberries.ru`, `https://advert-media-api.wildberries.ru`, `https://dp-calendar-api.wildberries.ru`, `https://api.wildberries.ru` |
| **Source Swagger** | `wildberries_api_doc/08-promotion/` |
| **Swagger Endpoints** | 50 (34 active + 16 deprecated) |
| **Implemented Methods** | 39 (37 active + 2 deprecated) |
| **Total Types** | 83 TypeScript interfaces/types |
| **Authentication** | API Key (Header) |

### What's New (February 2026)

- **Campaign Creation & Lifecycle**: 6 new methods for campaign creation, product selection, and state control
- **Search Clusters (NormQuery) API**: 6 new methods for managing search cluster targeting and bids
- **V2 API Replacements**: 3 new methods replacing deprecated v0/v1 endpoints with improved functionality
- **19 Deprecated Methods**: Legacy endpoints marked for removal with migration paths

---

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Get campaigns info (V2 API - recommended)
const campaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9,11',
  payment_type: 'cpm'
});

// Get account balance
const balance = await sdk.promotion.getAdvBalance();

// Get full campaign statistics
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345,23456',
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});

// NEW: Get search cluster statistics
const clusterStats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-07',
  items: [{ advert_id: 12345, nm_id: 98765432 }]
});

// NEW: Set bids for search clusters
await sdk.promotion.setNormqueryBids({
  bids: [{
    advert_id: 12345,
    nm_id: 98765432,
    norm_query: 'search phrase',
    bid: 1000
  }]
});
```

---

## Methods Reference

### Campaign Management (5 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `getAdvDelete()` | GET | `/adv/v0/delete` | Delete campaigns in "ready to launch" status | Active |
| `createAdvRename()` | POST | `/adv/v0/rename` | Rename a campaign | Active |
| `getAdvStop()` | GET | `/adv/v0/stop` | Complete campaigns | Active |
| `updateAuctionPlacement()` | PUT | `/adv/v0/auction/placements` | Change placement locations | Active |
| `updateAuctionNm()` | PATCH | `/adv/v0/auction/nms` | Add/remove product cards in campaigns | Active |

### Bidding (2 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `updateAuctionBid()` | PATCH | `/adv/v0/auction/bids` | Change bids for type 9 campaigns | Deprecated |
| `updateBidsV2()` | PATCH | `/api/advert/v1/bids` | **NEW**: Change bids (kopecks) - replaces v0 | Active |

### Search Clusters / NormQuery (6 methods) - NEW

These methods enable advanced search cluster targeting for CPM campaigns.

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getNormqueryStats()` | POST | `/adv/v0/normquery/stats` | Get search cluster statistics for date range |
| `getNormqueryBids()` | POST | `/adv/v0/normquery/get-bids` | Get list of search cluster bids |
| `setNormqueryBids()` | POST | `/adv/v0/normquery/bids` | Set bids for search clusters |
| `deleteNormqueryBids()` | DELETE | `/adv/v0/normquery/bids` | Remove bids from search clusters |
| `getNormqueryMinus()` | POST | `/adv/v0/normquery/get-minus` | Get minus-phrases for campaigns |
| `setNormqueryMinus()` | POST | `/adv/v0/normquery/set-minus` | Set/remove minus-phrases |

::: tip NormQuery API
Search Clusters (NormQuery) methods work only with CPM campaigns (cost per thousand impressions) and manual bid campaigns.
:::

### V2 API Replacements (3 methods) - NEW

These methods replace deprecated endpoints with improved functionality.

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvertsV2()` | GET | `/api/advert/v2/adverts` | Get campaigns info (replaces v1) |
| `getBidsMinV2()` | POST | `/api/advert/v1/bids/min` | Get minimum bids in kopecks (replaces v0) |
| `updateBidsV2()` | PATCH | `/api/advert/v1/bids` | Update bids in kopecks (replaces v0) |

### Budget & Finance (5 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvBalance()` | GET | `/adv/v1/balance` | Get account balance and bonus accruals |
| `getAdvBudget()` | GET | `/adv/v1/budget` | Get campaign budget info |
| `createBudgetDeposit()` | POST | `/adv/v1/budget/deposit` | Replenish campaign budget |
| `getAdvUpd()` | GET | `/adv/v1/upd` | Get actual campaign spending history |
| `getAdvPayments()` | GET | `/adv/v1/payments` | Get account replenishment history |

### Unified Bid Methods (2 methods - Deprecated)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `createAutoSetExcluded()` | POST | `/adv/v1/auto/set-excluded` | Set/remove minus-phrases (unified bid) | Deprecated |
| `createAutoUpdatenm()` | POST | `/adv/v1/auto/updatenm` | Change product cards (unified bid) | Deprecated |

::: warning Deprecated Methods
The unified bid methods `createAutoSetExcluded()` and `createAutoUpdatenm()` are deprecated and will be removed on February 2, 2026.
Use `setNormqueryMinus()` and `updateAuctionNm()` instead.
:::

### Media Campaigns (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvCount()` | GET | `/adv/v1/count` | Get media campaign count by status |
| `getAdvAdverts()` | GET | `/adv/v1/adverts` | Get all media campaigns |
| `getAdvAdvert()` | GET | `/adv/v1/advert` | Get WB Media campaign info |

### Statistics (3 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `getAdvFullstats()` | GET | `/adv/v3/fullstats` | Get full statistics for all campaign types | Active |
| `getStatsKeywords()` | GET | `/adv/v0/stats/keywords` | Get keyword stats for all campaign types | Deprecated |
| `createAdvStat()` | POST | `/adv/v1/stats` | Get WB Media campaign statistics | Active |

### Calendar Promotions (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getCalendarPromotions()` | GET | `/api/v1/calendar/promotions` | Get WB promotions list with dates |
| `getPromotionsDetails()` | GET | `/api/v1/calendar/promotions/details` | Get promotion details by ID |
| `getPromotionsNomenclatures()` | GET | `/api/v1/calendar/promotions/nomenclatures` | Get eligible products for promotion |
| `createPromotionsUpload()` | POST | `/api/v1/calendar/promotions/upload` | Add product to promotion |

### Campaign Creation & Lifecycle (6 methods)

| Method | HTTP | Endpoint | Description | Rate Limit |
|--------|------|----------|-------------|------------|
| `getCampaignCount()` | GET | `/adv/v1/promotion/count` | Get campaign counts by type/status | 300 req/min |
| `createCampaign(data)` | POST | `/adv/v2/seacat/save-ad` | Create campaign with manual/single bid | 5 req/min |
| `getSupplierSubjects(params?)` | GET | `/adv/v1/supplier/subjects` | Get product subjects for campaigns | 5 req/min |
| `getSupplierNms(subjectIds)` | POST | `/adv/v2/supplier/nms` | Get product cards for campaigns | 5 req/min |
| `startCampaign(id)` | GET | `/adv/v0/start` | Start/resume campaign | 300 req/min |
| `pauseCampaign(id)` | GET | `/adv/v0/pause` | Pause active campaign | 300 req/min |

::: warning Deprecated Endpoint
`/adv/v1/auto/getnmtoadd` is deprecated and will be removed February 2, 2026. It is intentionally not implemented.
:::

---

## Deprecated Methods (Implemented)

The following 4 methods are deprecated but still available in the SDK with deprecation warnings.

| Deprecated Method | Replacement | Scheduled Removal |
|------------------|-------------|-------------------|
| `updateAuctionBid()` | `updateBidsV2()` | TBD |
| `getStatsKeywords()` | `getAdvFullstats()` | TBD |
| `createAutoSetExcluded()` | `setNormqueryMinus()` | February 2, 2026 |
| `createAutoUpdatenm()` | `updateAuctionNm()` | February 2, 2026 |

---

## Not Yet Implemented

All endpoints from the Swagger specification are now implemented. Only deprecated endpoints remain intentionally unimplemented:

### Deprecated in Swagger (Not Implemented)

These endpoints are deprecated in the Swagger spec and intentionally not implemented:

- `/adv/v1/promotion/adverts` (POST) - Use `getAdvertsV2()` instead
- `/adv/v0/auction/adverts` (GET) - Use `getAdvertsV2()` instead
- `/adv/v0/config` (GET) - Configuration endpoint deprecated
- `/adv/v0/bids/min` (POST) - Use `getBidsMinV2()` instead
- `/adv/v0/bids` (PATCH) - Use `updateBidsV2()` instead
- `/adv/v1/search/set-plus` (GET/POST) - Removed January 15, 2025
- `/adv/v1/search/set-excluded` (POST) - Use `setNormqueryMinus()` instead
- `/adv/v2/fullstats` (POST) - Use `getAdvFullstats()` instead
- `/adv/v2/auto/stat-words` (GET) - Use `getAdvFullstats()` instead
- `/adv/v1/stat/words` (GET) - Use `getStatsKeywords()` instead

---

## Rate Limits

| Tier | Operations | Limit | Interval |
|------|-----------|-------|----------|
| T1 Ultra-High | Media campaigns (count, list, info, stats) | 600 req/min | 100ms |
| T2 Very High | Campaign list, management, bid changes | 300 req/min | 200ms |
| T3 High | Budget queries, keyword stats | 240 req/min | 250ms |
| T4 Medium | Negative phrases (search) | 120 req/min | 500ms |
| T5 Moderate | Calendar promotions | 100 req/min | 600ms |
| T6 Low | Balance, placements, spending history | 60 req/min | 1s |
| T7 Very Low | Minimum bids | 20 req/min | 3s |
| T8 Minimal | Fixed/negative phrases, NormQuery | 10 req/min | 600ms |
| T9 Extremely Low | Campaign creation | 5 req/min | 12s |
| T10 Single | Config, full statistics | 1-3 req/min | 20-60s |

### NormQuery Rate Limits

| Method | Limit | Interval | Burst |
|--------|-------|----------|-------|
| `getNormqueryStats()` | 10 req/min | 6s | 20 |
| `getNormqueryBids()` | 300 req/min | 200ms | 10 |
| `setNormqueryBids()` | 120 req/min | 500ms | 4 |
| `deleteNormqueryBids()` | 300 req/min | 200ms | 10 |
| `getNormqueryMinus()` | 300 req/min | 200ms | 10 |
| `setNormqueryMinus()` | 300 req/min | 200ms | 10 |

---

## Usage Examples

### Search Cluster Targeting

```typescript
// Get statistics for search clusters
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-07',
  items: [{ advert_id: 12345, nm_id: 98765432 }]
});

for (const stat of stats.stats) {
  console.log(`Cluster: ${stat.norm_query}`);
  console.log(`Views: ${stat.views}, Clicks: ${stat.clicks}`);
  console.log(`CTR: ${stat.ctr}%, CPC: ${stat.cpc}`);
}

// Set custom bids for high-performing clusters
await sdk.promotion.setNormqueryBids({
  bids: [
    {
      advert_id: 12345,
      nm_id: 98765432,
      norm_query: 'high performing phrase',
      bid: 1500  // in kopecks
    }
  ]
});

// Add minus-phrases to exclude unwanted traffic
await sdk.promotion.setNormqueryMinus({
  advert_id: 12345,
  nm_id: 98765432,
  norm_queries: ['irrelevant phrase 1', 'irrelevant phrase 2']
});
```

### Campaign Management with V2 API

```typescript
// Get campaigns using V2 API (recommended)
const campaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,23456,34567',
  statuses: '9,11',  // active and paused
  payment_type: 'cpm'
});

// Get minimum bids in kopecks
const minBids = await sdk.promotion.getBidsMinV2({
  advert_id: 12345,
  nm_ids: [98765432, 87654321],
  payment_type: 'cpm',
  placement_types: ['combined', 'search', 'recommendation']
});

// Update bids in kopecks
await sdk.promotion.updateBidsV2({
  bids: [{
    advert_id: 12345,
    nm_bids: [{
      nm_id: 98765432,
      bid_kopecks: 250,
      placement: 'recommendations'
    }]
  }]
});
```

### Budget Management

```typescript
// Check account balance
const balance = await sdk.promotion.getAdvBalance();
console.log(`Account: ${balance.balance} RUB`);
console.log(`Net balance: ${balance.net} RUB`);
console.log(`Bonus: ${balance.bonus} RUB`);

// Check campaign budget
const budget = await sdk.promotion.getAdvBudget({ id: 12345 });
console.log(`Total budget: ${budget.total} RUB`);

// Deposit to campaign budget
await sdk.promotion.createBudgetDeposit(
  { sum: 5000, type: 1 },
  { id: 12345 }
);
```

### Calendar Promotions

```typescript
// Get upcoming promotions
const promos = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2025-01-01T00:00:00Z',
  endDateTime: '2025-03-31T23:59:59Z',
  allPromo: true,
  limit: 100
});

// Get promotion details
const details = await sdk.promotion.getPromotionsDetails({
  promotionIDs: '12345,23456'
});

// Get eligible products for a promotion
const products = await sdk.promotion.getPromotionsNomenclatures({
  promotionID: 12345,
  inAction: false,
  limit: 100
});
```

### Campaign Creation & Lifecycle

```typescript
// Get campaign counts grouped by type and status
const counts = await sdk.promotion.getCampaignCount();
console.log(`Total campaigns: ${counts.all}`);
if (counts.adverts) {
  for (const group of counts.adverts) {
    console.log(`Type ${group.type}: ${group.count} campaigns`);
  }
}

// Get available product subjects for campaigns
const subjects = await sdk.promotion.getSupplierSubjects();
if (subjects) {
  for (const subject of subjects) {
    console.log(`${subject.id}: ${subject.name} (${subject.count} products)`);
  }
}

// Get product cards for specific subjects
const products = await sdk.promotion.getSupplierNms([123, 456]);
for (const product of products) {
  console.log(`NM: ${product.nm}, Name: ${product.name}`);
}

// Create a new CPM campaign
const campaignId = await sdk.promotion.createCampaign({
  name: 'Summer Sale Campaign',
  nms: [12345678, 87654321],
  bid_type: 'manual',
  payment_type: 'cpm',
  placement_types: ['search', 'recommendations']
});
console.log(`Created campaign: ${campaignId}`);

// Control campaign state
await sdk.promotion.startCampaign(campaignId);   // Start/resume
await sdk.promotion.pauseCampaign(campaignId);   // Pause
```

---

## Related Resources

### Guides

- [Promotion Getting Started](/guides/promotion-getting-started) - Quick start guide for the Promotion module
- [Promotion Module Guide](/guides/promotion-advertising) - Comprehensive advertising guide
- [Advertising Campaigns](/guides/advertising-campaigns) - Campaign creation and management
- [Advertising Statistics Guide](/guides/advertising-statistics-guide) - Statistics and analytics for advertising
- [Advertising Best Practices](/guides/best-practices-advertising) - Optimization and best practices
- [Migration Guide: v2.4 Promotion Deprecation](/guides/migration-v2.4-promotion-deprecation) - Migrating from deprecated endpoints

### API Reference

- [PromotionModule Class](/api/classes/PromotionModule) - TypeDoc generated reference
- [Wildberries Advertising API](https://dev.wildberries.ru/openapi/work-with-advertising-campaigns) - Official API documentation

### Related Modules

- [Analytics Module](/modules/analytics) - Sales analytics and statistics
- [Finances Module](/modules/finances) - Budget and payment tracking
