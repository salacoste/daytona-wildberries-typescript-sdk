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
| **Swagger Endpoints** | 50+ (34 active + 16 deprecated) |
| **Implemented Methods** | 45 (all active) |
| **Total Types** | 101+ TypeScript interfaces/types |
| **Authentication** | API Key (Header) |

### What's New (v3.8.0)

- **`warnOnce()` for deprecation warnings**: Introduced the shared `warnOnce()` utility (exported from the SDK) so deprecation warnings fire once per process. (Note: the v0/v1 advert methods that used this in v3.8.0 — `createAutoSetExcluded()`, `createAutoUpdatenm()`, `getPromotionAdverts()`, `getAuctionAdverts()` — were **removed in v4.0.0**. `warnOnce()`/`resetDeprecationWarnings()` remain available for other deprecation paths and tests.)

### What's New (v3.4.0 - March 2026)

- **`getAdvertsV2()` return type changed**: Now returns `GetAdvertsV2Response` (was `GetAdverts`). Includes `bid_type` (auto/manual), `bids_kopecks` per product, and data sync timing notes.
- **NEW `getBidsRecommendations()`**: Get recommended bids for product cards and search clusters (CPM only). Returns `reachMin`/`reachMedium`/`reachMax` per norm query plus optional `base` card-level bids.
- **NormQuery/stats CPC support**: `getSearchClusterStats()` and `getNormqueryStats()` now support CPC campaigns. For CPC campaigns, `views`, `ctr`, and `cpm` fields are absent from the response.
- **6 new types**: `GetBidsRecommendationsParams`, `ReachBid`, `NormQueryBidRecommendation`, `BaseBidRecommendation`, `BidsRecommendationsResponse`, `GetAdvertsV2Response`

### What's New (February 2026)

- **Unified Bid API (V1)**: New `updateBids()` method with kopecks-based bidding replacing v0 endpoint
- **Campaign Products Management**: New `updateCampaignProducts()` for adding/removing products from Type 9 campaigns
- **Minus Phrases API**: New `getMinusPhrases()` and `setMinusPhrases()` methods with clear naming
- **Search Cluster Statistics**: New `getSearchClusterStats()` method for CPM campaign analytics
- **Campaign Creation & Lifecycle**: Methods for campaign creation, product selection, and state control
- **V2 API Replacements**: Methods replacing the deprecated v0/v1 endpoints with improved functionality
- **Deprecated v0/v1 methods removed**: The legacy endpoints were removed in v4.0.0 (WB disabled them February 2, 2026). See `docs/guides/migration-v4.md`.
- **Migration Guide**: See [Type 8 to Type 9 Migration Guide](/guides/migration-type8-to-type9) for detailed migration instructions

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
// Response now includes bid_type and bids_kopecks per product
for (const advert of campaigns.adverts) {
  console.log(advert.id, advert.bid_type, advert.status);
}

// Get account balance
const balance = await sdk.promotion.getAdvBalance();

// Get full campaign statistics
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345,23456',
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});

// NEW: Get bid recommendations for a product in a CPM campaign
const reco = await sdk.promotion.getBidsRecommendations({
  advertId: 29081652,
  nmId: 148190095,
});
for (const nq of reco.normQueries) {
  console.log(`${nq.normQuery}: min=${nq.reachMin.bidKopecks} med=${nq.reachMedium.bidKopecks} max=${nq.reachMax.bidKopecks}`);
}

// Get search cluster statistics (supports CPM and CPC)
const clusterStats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-07',
  items: [{ advert_id: 12345, nm_id: 98765432 }]
});

// Set bids for search clusters
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

### Campaign Management (6 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `getAdvDelete()` | GET | `/adv/v0/delete` | Delete campaigns in "ready to launch" status | Active |
| `createAdvRename()` | POST | `/adv/v0/rename` | Rename a campaign | Active |
| `getAdvStop()` | GET | `/adv/v0/stop` | Complete campaigns | Active |
| `updateAuctionPlacement()` | PUT | `/adv/v0/auction/placements` | Change placement locations | Active |
| `updateAuctionNm()` | PATCH | `/adv/v0/auction/nms` | Add/remove product cards in campaigns | Active |
| `updateCampaignProducts()` | PATCH | `/adv/v0/auction/nms` | **NEW**: Add/remove products (cleaner API) | Active |

::: tip updateCampaignProducts vs updateAuctionNm
Both methods use the same endpoint. `updateCampaignProducts()` provides a cleaner interface:
- Uses `add_nms` and `delete_nms` arrays instead of nested `nms.add/delete`
- Returns structured `CampaignProductsResult` objects
- Only works with Type 9 campaigns
:::

### Bidding (3 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `updateBids()` | PATCH | `/api/advert/v1/bids` | Change bids in kopecks (recommended) | Active |
| `updateBidsV2()` | PATCH | `/api/advert/v1/bids` | Alias for updateBids() | Active |
| `getBidsRecommendations()` | GET | `/api/advert/v0/bids/recommendations` | **NEW**: Get recommended bids per search cluster (CPM only) | Active |

> **Removed in v4.0.0** — `updateAuctionBid()` (`PATCH /adv/v0/auction/bids`) was deleted (WB disabled the v0 auction API 2026-02-02). Use `updateBids()` (kopeck-based) for type 9 campaign bids. See `docs/guides/migration-v4.md`.

::: tip Bid Units
The new `updateBids()` method uses **kopecks** (100 kopecks = 1 RUB) for bid values via `bid_kopecks` field.
Example: `bid_kopecks: 250` = 2.50 RUB
:::

### Search Clusters / NormQuery (9 methods) - NEW

These methods enable advanced search cluster targeting for CPM campaigns. The SDK provides both original NormQuery naming and clearer alternative names.

| Method | Alternative Name | HTTP | Endpoint | Description |
|--------|-----------------|------|----------|-------------|
| `getSearchClusterStats()` | `getNormqueryStats()` | POST | `/adv/v0/normquery/stats` | Get search cluster statistics for date range |
| `getNormqueryBids()` | - | POST | `/adv/v0/normquery/get-bids` | Get list of search cluster bids |
| `setNormqueryBids()` | - | POST | `/adv/v0/normquery/bids` | Set bids for search clusters |
| `deleteNormqueryBids()` | - | DELETE | `/adv/v0/normquery/bids` | Remove bids from search clusters |
| `getMinusPhrases()` | `getNormqueryMinus()` | POST | `/adv/v0/normquery/get-minus` | Get minus-phrases for campaigns |
| `setMinusPhrases()` | `setNormqueryMinus()` | POST | `/adv/v0/normquery/set-minus` | Set/remove minus-phrases |

::: tip NormQuery API and CPC Support
Search Clusters (NormQuery) stats methods now support both **CPM** and **CPC** campaigns.
For CPC campaigns, the `views`, `ctr`, and `cpm` fields are absent from the response.
Bidding and minus-phrase methods still require CPM campaigns with manual bidding.
:::

::: warning Empty Array Behavior
Calling `setMinusPhrases()` or `setNormqueryMinus()` with an **empty `norm_queries` array will DELETE ALL minus-phrases** from the campaign!
:::

### V2 API Replacements (3 methods) - NEW

These methods replace deprecated endpoints with improved functionality.

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvertsV2()` | GET | `/api/advert/v2/adverts` | Get campaigns info (replaces v1). Returns `GetAdvertsV2Response` with `bid_type` and `bids_kopecks`. |
| `getBidsMinV2()` | POST | `/api/advert/v1/bids/min` | Get minimum bids in kopecks (replaces v0) |
| `updateBidsV2()` | PATCH | `/api/advert/v1/bids` | Update bids in kopecks (replaces v0) |

::: info getAdvertsV2() Data Sync
Data is synchronized with the database every 3 minutes. Campaign statuses update every minute. Campaign bids update every 30 seconds.
:::

### Budget & Finance (5 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvBalance()` | GET | `/adv/v1/balance` | Get account balance and bonus accruals |
| `getAdvBudget()` | GET | `/adv/v1/budget` | Get campaign budget info |
| `createBudgetDeposit()` | POST | `/adv/v1/budget/deposit` | Replenish campaign budget |
| `getAdvUpd()` | GET | `/adv/v1/upd` | Get actual campaign spending history |
| `getAdvPayments()` | GET | `/adv/v1/payments` | Get account replenishment history |

### Unified Bid Methods (removed)

> **Removed in v4.0.0** — `createAutoSetExcluded()` (`POST /adv/v1/auto/set-excluded`) and `createAutoUpdatenm()` (`POST /adv/v1/auto/updatenm`) were deleted (WB disabled the v0/v1 advert API 2026-02-02). Use `setMinusPhrases()` / `setNormqueryMinus()` (minus phrases) and `updateCampaignProducts()` / `updateAuctionNm()` (product cards) instead. See `docs/guides/migration-v4.md`.

### Media Campaigns (3 methods)

| Method | HTTP | Endpoint | Description |
|--------|------|----------|-------------|
| `getAdvCount()` | GET | `/adv/v1/count` | Get media campaign count by status |
| `getAdvAdverts()` | GET | `/adv/v1/adverts` | Get all media campaigns |
| `getAdvAdvert()` | GET | `/adv/v1/advert` | Get WB Media campaign info |

### Statistics (2 methods)

| Method | HTTP | Endpoint | Description | Status |
|--------|------|----------|-------------|--------|
| `getAdvFullstats()` | GET | `/adv/v3/fullstats` | Get full statistics for all campaign types | Active |
| `createAdvStat()` | POST | `/adv/v1/stats` | Get WB Media campaign statistics | Active |

> **Removed in v4.0.0** — `getStatsKeywords()` (`GET /adv/v0/stats/keywords`) was deleted (WB disabled the v0 advert API 2026-02-02). Use `getAdvFullstats()` for keyword/campaign statistics. See `docs/guides/migration-v4.md`.

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

## Removed Methods (v4.0.0)

The following 6 legacy advert methods were **removed in v4.0.0** (WB disabled the v0/v1 advert API on 2026-02-02). They are no longer in the SDK — each is now a compile error pointing at its replacement. See `docs/guides/migration-v4.md`.

| Removed Method | Replacement |
|----------------|-------------|
| `getPromotionAdverts()` | `getAdvertsV2()` |
| `getAuctionAdverts()` | `getAdvertsV2()` |
| `updateAuctionBid()` | `updateBids()` (kopeck-based) |
| `getStatsKeywords()` | `getAdvFullstats()` |
| `createAutoSetExcluded()` | `setMinusPhrases()` / `setNormqueryMinus()` |
| `createAutoUpdatenm()` | `updateCampaignProducts()` / `updateAuctionNm()` |

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
- `/adv/v1/stat/words` (GET) - Use `getAdvFullstats()` instead

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
| T9 Extremely Low | Campaign creation, bid recommendations | 5 req/min | 12s |
| T10 Single | Config, full statistics | 1-3 req/min | 20-60s |

### NormQuery / Search Clusters Rate Limits

| Method | Alternative Name | Limit | Interval | Burst |
|--------|-----------------|-------|----------|-------|
| `getSearchClusterStats()` | `getNormqueryStats()` | 10 req/min | 6s | 20 |
| `getNormqueryBids()` | - | 300 req/min | 200ms | 10 |
| `setNormqueryBids()` | - | 120 req/min | 500ms | 4 |
| `deleteNormqueryBids()` | - | 300 req/min | 200ms | 10 |
| `getMinusPhrases()` | `getNormqueryMinus()` | 300 req/min | 200ms | 10 |
| `setMinusPhrases()` | `setNormqueryMinus()` | 300 req/min | 200ms | 10 |

### V1 API Rate Limits (NEW)

| Method | Limit | Interval | Burst |
|--------|-------|----------|-------|
| `updateBids()` | 300 req/min | 200ms | 5 |
| `updateCampaignProducts()` | 60 req/min | 1s | 1 |
| `getBidsRecommendations()` | 5 req/min | 12s | 5 |

---

## Usage Examples

### getBidsRecommendations() - Get Bid Recommendations (NEW in v3.4.0)

Returns recommended bids for a product card and its search clusters in a CPM campaign. Useful for optimizing bid strategy.

**Endpoint:** `GET /api/advert/v0/bids/recommendations`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| advertId | number | Yes | Campaign ID |
| nmId | number | Yes | WB article ID (must belong to the campaign) |

**Response types:**

| Type | Description |
|------|-------------|
| `BidsRecommendationsResponse` | Top-level response with `base` and `normQueries` |
| `NormQueryBidRecommendation` | Per-cluster: `normQuery`, `reachMin`, `reachMedium`, `reachMax` |
| `BaseBidRecommendation` | Card-level: `competitiveBid`, `leadersBid`, `top2` (all optional) |
| `ReachBid` | `{ bidKopecks: number }` |

**Rate Limit:** 5 requests/minute (12-second interval)

::: info CPM Only
This method only works with campaigns that use the `cpm` payment type (cost per thousand impressions). For paused campaigns, `normQueries` may be an empty array.
:::

::: info Data Sync
Data is synchronized with the database every 3 minutes.
:::

```typescript
const reco = await sdk.promotion.getBidsRecommendations({
  advertId: 29081652,
  nmId: 148190095,
});

// Card-level recommendations (optional)
if (reco.base) {
  console.log('Card-level bids:');
  if (reco.base.competitiveBid) console.log(`  Competitive: ${reco.base.competitiveBid.bidKopecks} kop`);
  if (reco.base.leadersBid) console.log(`  Leaders: ${reco.base.leadersBid.bidKopecks} kop`);
  if (reco.base.top2) console.log(`  Top-2: ${reco.base.top2.bidKopecks} kop`);
}

// Per-cluster recommendations
for (const nq of reco.normQueries) {
  console.log(`Cluster "${nq.normQuery}":`);
  console.log(`  Min reach: ${nq.reachMin.bidKopecks} kop`);
  console.log(`  Medium reach: ${nq.reachMedium.bidKopecks} kop`);
  console.log(`  Max reach: ${nq.reachMax.bidKopecks} kop`);
}
```

---

### getAdvertsV2() - Get Campaigns Info (Updated in v3.4.0)

Returns campaign information with improved typing. Now returns `GetAdvertsV2Response` (was `GetAdverts`).

**Endpoint:** `GET /api/advert/v2/adverts`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| ids | string | No | Campaign IDs, comma-separated (max 50) |
| statuses | string | No | Status codes: -1 (deleted), 4 (ready), 7 (finished), 8 (cancelled), 9 (active), 11 (paused) |
| payment_type | 'cpm' \| 'cpc' | No | Payment type filter |

**Response includes:**
- `bid_type`: `'auto'` or `'manual'` per campaign
- `bids_kopecks`: bid values in kopecks per product and placement
- `nm_settings`: product-level configuration

**Rate Limit:** 5 requests/second (200ms interval)

::: info Data Sync Timing
- Campaign data syncs every **3 minutes**
- Campaign statuses update every **1 minute**
- Campaign bids update every **30 seconds**
:::

```typescript
const campaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,23456',
  statuses: '9,11',
  payment_type: 'cpm',
});

for (const advert of campaigns.adverts) {
  console.log(`Campaign ${advert.id}: bid_type=${advert.bid_type}, status=${advert.status}`);
  for (const nm of advert.nm_settings) {
    console.log(`  nmId=${nm.nm_id} search=${nm.bids_kopecks.search} reco=${nm.bids_kopecks.recommendations}`);
  }
}
```

---

### updateBids() - Update Bids in Kopecks (NEW)

Updates bids for product cards in campaigns with unified or manual bidding.

**Endpoint:** `PATCH /api/advert/v1/bids`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| bids | UpdateBidsCampaign[] | Yes | Array of campaigns with bid updates (max 50) |
| bids[].advert_id | number | Yes | Campaign ID |
| bids[].nm_bids | NmBid[] | Yes | Array of product bids (max 100 per campaign) |
| bids[].nm_bids[].nm_id | number | Yes | WB Article ID |
| bids[].nm_bids[].bid_kopecks | number | Yes | Bid in kopecks (100 kop = 1 RUB) |
| bids[].nm_bids[].placement | string | Yes | "search", "recommendations", or "combined" |

**Rate Limit:** 300 requests/minute (5 req/sec, 200ms interval)

```typescript
// Update bids using the new V1 API with kopecks
const result = await sdk.promotion.updateBids({
  bids: [{
    advert_id: 12345,
    nm_bids: [{
      nm_id: 98765432,
      bid_kopecks: 1500,  // 15.00 RUB
      placement: 'search'
    }, {
      nm_id: 87654321,
      bid_kopecks: 250,   // 2.50 RUB
      placement: 'recommendations'
    }]
  }]
});

console.log('Updated bids:', result.bids);
```

---

### updateCampaignProducts() - Manage Campaign Products (NEW)

Adds and removes product cards from Type 9 campaigns.

**Endpoint:** `PATCH /adv/v0/auction/nms`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| campaigns | CampaignProductsUpdate[] | Yes | Array of campaigns to update (max 20) |
| campaigns[].advert_id | number | Yes | Campaign ID |
| campaigns[].add_nms | number[] | No | Product IDs to add (max 50) |
| campaigns[].delete_nms | number[] | No | Product IDs to remove |

**Rate Limit:** 60 requests/minute (1 req/sec)

```typescript
// Add and remove products from a Type 9 campaign
const result = await sdk.promotion.updateCampaignProducts({
  campaigns: [{
    advert_id: 12345,
    add_nms: [111222333, 444555666],    // Products to add
    delete_nms: [777888999]              // Products to remove
  }]
});

console.log('Added:', result.nms[0].nms.added);
console.log('Deleted:', result.nms[0].nms.deleted);
```

---

### getMinusPhrases() - Get Minus Phrases (NEW)

Returns the list of minus phrases for campaigns by campaign ID and WB article.

**Endpoint:** `POST /adv/v0/normquery/get-minus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| items | GetMinusPhrasesRequestItem[] | Yes | Array of campaign/product pairs (max 100) |
| items[].advert_id | number | Yes | Campaign ID |
| items[].nm_id | number | Yes | WB Article ID (use 0 for Type 8 campaign-wide) |

**Rate Limit:** 300 requests/minute (5 req/sec, 200ms interval)

```typescript
// Get current minus phrases for a campaign
const result = await sdk.promotion.getMinusPhrases({
  items: [{ advert_id: 123456, nm_id: 789012 }]
});

for (const item of result.items) {
  console.log(`Campaign ${item.advert_id}, Product ${item.nm_id}:`);
  console.log('  Minus phrases:', item.norm_queries || []);
}
```

---

### setMinusPhrases() - Set Minus Phrases (NEW)

Sets minus phrases for campaigns with manual bidding and CPM payment type.

**Endpoint:** `POST /adv/v0/normquery/set-minus`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| advert_id | number | Yes | Campaign ID |
| nm_id | number | Yes | WB Article ID (use 0 for Type 8 campaign-wide) |
| norm_queries | string[] | Yes | Minus phrases (max 1000). **Empty array DELETES ALL!** |

**Rate Limit:** 300 requests/minute (5 req/sec, 200ms interval)

::: danger Empty Array Warning
Sending an **empty `norm_queries` array will DELETE ALL minus phrases** from the campaign! This is by design in the Wildberries API.
:::

```typescript
// Set new minus phrases (replaces existing)
await sdk.promotion.setMinusPhrases({
  advert_id: 123456,
  nm_id: 789012,
  norm_queries: ['unwanted phrase 1', 'competitor brand', 'irrelevant term']
});

// WARNING: This DELETES ALL minus phrases!
await sdk.promotion.setMinusPhrases({
  advert_id: 123456,
  nm_id: 789012,
  norm_queries: []  // Danger: removes everything!
});
```

---

### getSearchClusterStats() - Search Cluster Statistics (NEW)

Returns statistics for search clusters over a date range. Supports both **CPM** and **CPC** campaigns.

**Endpoint:** `POST /adv/v0/normquery/stats`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| from | string | Yes | Start date (YYYY-MM-DD) |
| to | string | Yes | End date (YYYY-MM-DD) |
| items | GetSearchClusterStatsRequestItem[] | Yes | Campaign/product pairs (max 100) |
| items[].advert_id | number | Yes | Campaign ID |
| items[].nm_id | number | Yes | WB Article ID (use 0 for Type 8 aggregate) |

**Response fields per cluster (`V0GetNormQueryStatsItemStat`):**

| Field | Type | CPM | CPC | Description |
|-------|------|-----|-----|-------------|
| `norm_query` | string | Yes | Yes | Search cluster text |
| `views` | number | Yes | **absent** | Number of impressions |
| `clicks` | number | Yes | Yes | Number of clicks |
| `atbs` | number | Yes | Yes | Add-to-basket count |
| `orders` | number | Yes | Yes | Order count |
| `ctr` | number | Yes | **absent** | Click-through rate, % |
| `cpc` | number | Yes | Yes | Cost per click, RUB |
| `cpm` | number | Yes | **absent** | Cost per 1000 impressions, RUB |
| `avg_pos` | number | Yes | Yes | Average search position |

**Rate Limit:** 10 requests/minute (6 second interval)

```typescript
// Get search cluster statistics for CPM campaigns
const stats = await sdk.promotion.getSearchClusterStats({
  from: '2026-02-01',
  to: '2026-02-09',
  items: [{ advert_id: 123456, nm_id: 789012 }]
});

for (const item of stats.stats) {
  console.log(`Campaign ${item.advert_id}, Product ${item.nm_id}:`);
  for (const cluster of item.stats) {
    console.log(`  Cluster: "${cluster.norm_query}"`);
    console.log(`    Clicks: ${cluster.clicks}, CPC: ${cluster.cpc} RUB`);
    // For CPM campaigns only:
    if (cluster.views !== undefined) {
      console.log(`    Views: ${cluster.views}, CTR: ${cluster.ctr}%, CPM: ${cluster.cpm} RUB`);
    }
    console.log(`    Orders: ${cluster.orders}, Sum: ${cluster.sum} kop`);
  }
}
```

---

### Search Cluster Targeting (Legacy Naming)

```typescript
// Get statistics for search clusters (legacy method name)
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-07',
  items: [{ advert_id: 12345, nm_id: 98765432 }]
});

for (const stat of stats.stats) {
  console.log(`Cluster: ${stat.norm_query}`);
  console.log(`Clicks: ${stat.clicks}, CPC: ${stat.cpc}`);
  // views/ctr/cpm only present for CPM campaigns
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

// Add minus-phrases to exclude unwanted traffic (legacy method name)
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
