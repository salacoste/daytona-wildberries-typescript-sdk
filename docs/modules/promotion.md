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
| **Total Methods** | 48 (29 active + 19 deprecated) |
| **Total Types** | 83 TypeScript interfaces/types |
| **Authentication** | API Key (Header) |

### What's New (February 2026)

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

### Campaign Information (4 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `getPromotionCount()` | GET | `/adv/v1/promotion/count` | Get campaign counts by type and status | Deprecated |
| `createPromotionAdvert()` | POST | `/adv/v1/promotion/adverts` | Get campaigns info by status, type and ID | Deprecated |
| `getAuctionAdverts()` | GET | `/adv/v0/auction/adverts` | Get manual bid campaigns by status | Deprecated |
| `getAdvConfig()` | GET | `/adv/v0/config` | Get allowed config parameters | Deprecated |

### Campaign Creation (4 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `createBidsMin()` | POST | `/adv/v0/bids/min` | Get minimum bids for product cards | Deprecated |
| `createAdvSaveAd()` | POST | `/adv/v1/save-ad` | Create campaign with single bid | Deprecated |
| `createSeacatSaveAd()` | POST | `/adv/v2/seacat/save-ad` | Create campaign with manual or single bid | Deprecated |
| `getSupplierSubjects()` | GET | `/adv/v1/supplier/subjects` | Get product items for campaigns | Deprecated |

### Campaign Management (9 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `createSupplierNm()` | POST | `/adv/v2/supplier/nms` | Get product cards for campaigns | Deprecated |
| `getAdvDelete()` | GET | `/adv/v0/delete` | Delete campaigns in "ready to launch" status | Active |
| `createAdvRename()` | POST | `/adv/v0/rename` | Rename a campaign | Active |
| `getAdvStart()` | GET | `/adv/v0/start` | Launch campaigns (ready or paused) | Deprecated |
| `getAdvPause()` | GET | `/adv/v0/pause` | Pause active campaigns | Deprecated |
| `getAdvStop()` | GET | `/adv/v0/stop` | Complete campaigns | Active |
| `updateAdvBid()` | PATCH | `/adv/v0/bids` | Change bids for single bid campaigns | Deprecated |
| `updateAuctionPlacement()` | PUT | `/adv/v0/auction/placements` | Change placement locations | Active |
| `updateAuctionNm()` | PATCH | `/adv/v0/auction/nms` | Add/remove product cards in campaigns | Active |

### Bidding (2 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `updateAuctionBid()` | PATCH | `/adv/v0/auction/bids` | Change bids for type 9 campaigns | Active |
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

### Keyword Management (5 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `getSearchSetPlus()` | GET | `/adv/v1/search/set-plus` | Get fixed phrases activity status | Deprecated |
| `createSearchSetPlu()` | POST | `/adv/v1/search/set-plus` | Set/remove fixed phrases | Deprecated |
| `createSearchSetExcluded()` | POST | `/adv/v1/search/set-excluded` | Set/remove negative phrases | Deprecated |
| `createAutoSetExcluded()` | POST | `/adv/v1/auto/set-excluded` | Set/remove minus-phrases (unified bid) | Active |
| `createAutoUpdatenm()` | POST | `/adv/v1/auto/updatenm` | Change product cards (unified bid) | Active |

### Legacy Unified Bid Methods (2 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `getAutoGetnmtoadd()` | GET | `/adv/v1/auto/getnmtoadd` | Get available products for unified bid campaign | Deprecated |
| `getAutoStatWords()` | GET | `/adv/v2/auto/stat-words` | Get cluster stats for unified bid campaign | Deprecated |

### Media Campaigns (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvCount()` | GET | `/adv/v1/count` | Get media campaign count by status |
| `getAdvAdverts()` | GET | `/adv/v1/adverts` | Get all media campaigns |
| `getAdvAdvert()` | GET | `/adv/v1/advert` | Get WB Media campaign info |

### Statistics (5 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `createAdvFullstat()` | POST | `/adv/v2/fullstats` | Get campaign statistics (v2) | Deprecated |
| `getAdvFullstats()` | GET | `/adv/v3/fullstats` | Get full statistics for all campaign types | Active |
| `getStatWords()` | GET | `/adv/v1/stat/words` | Get manual bid campaign keyword stats | Deprecated |
| `getStatsKeywords()` | GET | `/adv/v0/stats/keywords` | Get keyword stats for all campaign types | Active |
| `createAdvStat()` | POST | `/adv/v1/stats` | Get WB Media campaign statistics | Active |

### Calendar Promotions (4 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getCalendarPromotions()` | GET | `/api/v1/calendar/promotions` | Get WB promotions list with dates |
| `getPromotionsDetails()` | GET | `/api/v1/calendar/promotions/details` | Get promotion details by ID |
| `getPromotionsNomenclatures()` | GET | `/api/v1/calendar/promotions/nomenclatures` | Get eligible products for promotion |
| `createPromotionsUpload()` | POST | `/api/v1/calendar/promotions/upload` | Add product to promotion |

---

## Deprecated Methods

The following 19 methods are deprecated and will be removed in future versions. Use the recommended replacements.

| Deprecated Method | Replacement | Removal Date |
|------------------|-------------|--------------|
| `getPromotionCount()` | `getAdvertsV2()` | TBD |
| `createPromotionAdvert()` | `getAdvertsV2()` | TBD |
| `getAuctionAdverts()` | `getAdvertsV2()` | TBD |
| `getAdvConfig()` | Updated configuration API | TBD |
| `createBidsMin()` | `getBidsMinV2()` | TBD |
| `createAdvSaveAd()` | Current campaign creation API | Removed |
| `createSeacatSaveAd()` | Current campaign creation API | TBD |
| `getSupplierSubjects()` | Updated supplier API | TBD |
| `createSupplierNm()` | Updated supplier API | TBD |
| `getAdvStart()` | Updated campaign management API | TBD |
| `getAdvPause()` | Updated campaign management API | TBD |
| `updateAdvBid()` | `updateBidsV2()` | TBD |
| `getSearchSetPlus()` | N/A | January 15, 2025 |
| `createSearchSetPlu()` | N/A | January 15, 2025 |
| `createSearchSetExcluded()` | `setNormqueryMinus()` | January 15, 2025 |
| `getAutoGetnmtoadd()` | `getAuctionAdverts()` + `updateAuctionNm()` | February 2, 2026 |
| `getAutoStatWords()` | `getAdvFullstats()` | February 2, 2026 |
| `createAdvFullstat()` | `getAdvFullstats()` | September 30, 2025 |
| `getStatWords()` | `getStatsKeywords()` | TBD |

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

---

## Related Resources

- [API Reference: PromotionModule](/api/classes/PromotionModule)
- [Promotion Module Guide](/guides/promotion-advertising)
- [Advertising Statistics Guide](/guides/advertising-statistics-guide)
- [Advertising Best Practices](/guides/best-practices-advertising)
