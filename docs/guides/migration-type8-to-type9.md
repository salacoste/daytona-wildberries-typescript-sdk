---
title: "Migration Guide: Type 8 to Type 9 Campaigns"
description: Complete guide for migrating advertising campaigns from Type 8 (unified bid) to Type 9 (manual bid) in the Wildberries SDK
layout: doc
---

# Migration Guide: Type 8 to Type 9 Campaigns

This guide helps SDK users migrate from deprecated Type 8 campaigns (unified bidding) to the current Type 9 campaigns (manual bidding).

> **Deadline**: Wildberries is deprecating Type 8 campaign endpoints on **February 2, 2026**. Migrate before this date.

## Table of Contents

- [Overview of Changes](#overview-of-changes)
- [1. Campaign bid_type Enum Changes](#1-campaign-bid_type-enum-changes)
- [2. Bid Values: Rubles to Kopecks](#2-bid-values-rubles-to-kopecks)
- [3. nm_id Handling](#3-nm_id-handling)
- [4. Search Clusters (NormQuery)](#4-search-clusters-normquery)
- [5. New SDK Methods](#5-new-sdk-methods)
- [6. Deprecated Methods and Replacements](#6-deprecated-methods-and-replacements)
- [7. Migration Checklist](#7-migration-checklist)
- [8. Code Examples](#8-code-examples)
- [See Also](#see-also)

---

## Overview of Changes

Wildberries is migrating all advertising campaigns from **Type 8** (unified bid) to **Type 9** (manual bid).

### Key Differences Summary

| Aspect | Type 8 (Legacy) | Type 9 (Current) |
|--------|-----------------|------------------|
| **bid_type** | `'auto'` (formerly `'unified'`) | `'manual'` |
| **nm_id** | `0` for campaign-wide settings | Actual WB article ID |
| **Bid values** | Often in rubles (varies) | **Kopecks** (1 ruble = 100 kopecks) |
| **Bid granularity** | Campaign-level (same bid for all products) | Per-article (individual bid per product) |
| **Search clusters** | Shared across campaign | Individual per article |
| **Minus-phrases** | Campaign-wide (`nm_id=0`) | Per-article (`nm_id` = real article ID) |
| **Placements** | `'combined'` (search + recommendations) | `'search'` or `'recommendations'` separately |

### What's Changing in the API?

1. **New V2 endpoints** use `bid_kopecks` instead of `bid` (in rubles)
2. **bid_type enum** changed from `'unified'` to `'auto'`
3. **nm_id handling** requires real article IDs for Type 9 campaigns
4. **Placement targeting** is more granular with manual bidding

---

## 1. Campaign bid_type Enum Changes

### Before (SDK v2.x with Type 8)

```typescript
// Old bid_type values
type BidType = 'unified' | 'manual';

// Campaign response
const campaign = {
  id: 123456,
  bid_type: 'unified',  // OLD: Type 8 campaigns
  // ...
};
```

### After (SDK v3.x with Type 9)

```typescript
// New bid_type values
type BidType = 'auto' | 'manual';

// Campaign response from getAdvertsV2()
const campaign: AdvertV2 = {
  id: 123456,
  bid_type: 'auto',     // NEW: corresponds to Type 8 (automatic/unified)
  // OR
  bid_type: 'manual',   // Type 9 (manual bidding)
  // ...
};
```

### Migration Steps

```typescript
// Check campaign type
const campaigns = await sdk.promotion.getAdvertsV2({ statuses: '9' });

for (const campaign of campaigns.adverts ?? []) {
  if (campaign.bid_type === 'auto') {
    console.log(`Campaign ${campaign.id} uses automatic bidding (Type 8 style)`);
    // Consider migrating to manual bidding for more control
  } else if (campaign.bid_type === 'manual') {
    console.log(`Campaign ${campaign.id} uses manual bidding (Type 9)`);
    // Already using the recommended approach
  }
}
```

---

## 2. Bid Values: Rubles to Kopecks

### Critical Change

The V1/V2 API uses **kopecks** (1/100 of a ruble) instead of rubles for all bid values.

### Before (Rubles)

```typescript
// OLD approach (deprecated endpoints)
await sdk.promotion.updateAdvBid({
  advertId: 123456,
  bid: 15  // 15 rubles (unclear units)
});
```

### After (Kopecks)

```typescript
import { UpdateBidsRequest } from 'daytona-wildberries-typescript-sdk';

// NEW approach using PATCH /api/advert/v1/bids
const request: UpdateBidsRequest = {
  bids: [{
    advert_id: 123456,
    nm_bids: [{
      nm_id: 789012,           // Actual WB article ID
      bid_kopecks: 1500,       // 15.00 rubles = 1500 kopecks
      placement: 'search'       // 'search', 'recommendations', or 'combined'
    }]
  }]
};

await sdk.promotion.updateBids(request);
```

### Conversion Functions

```typescript
/**
 * Convert rubles to kopecks for API requests
 * @param rubles - Amount in rubles (e.g., 15.50)
 * @returns Amount in kopecks (e.g., 1550)
 */
export const rublesToKopecks = (rubles: number): number => {
  return Math.round(rubles * 100);
};

/**
 * Convert kopecks to rubles for display
 * @param kopecks - Amount in kopecks (e.g., 1550)
 * @returns Amount in rubles (e.g., 15.50)
 */
export const kopecksToRubles = (kopecks: number): number => {
  return kopecks / 100;
};

// Usage examples
console.log(rublesToKopecks(15.50));   // 1550
console.log(rublesToKopecks(2.50));    // 250
console.log(kopecksToRubles(1550));    // 15.50
console.log(kopecksToRubles(11200));   // 112.00
```

### Reading Bids from V2 Response

```typescript
// Response from getAdvertsV2() uses bids_kopecks structure
const campaigns = await sdk.promotion.getAdvertsV2({ statuses: '9' });

for (const campaign of campaigns.adverts ?? []) {
  for (const nmSetting of campaign.nm_settings ?? []) {
    const searchBidRubles = kopecksToRubles(nmSetting.bids_kopecks.search);
    const recomBidRubles = kopecksToRubles(nmSetting.bids_kopecks.recommendations);

    console.log(`Article ${nmSetting.nm_id}:`);
    console.log(`  Search bid: ${searchBidRubles} RUB`);
    console.log(`  Recommendations bid: ${recomBidRubles} RUB`);
  }
}
```

---

## 3. nm_id Handling

### The Key Difference

- **Type 8**: `nm_id = 0` means campaign-wide settings (unified for all products)
- **Type 9**: `nm_id` must be an actual WB article ID for per-product settings

### Before (Type 8 - Campaign-wide)

```typescript
// OLD: Setting minus-phrases for entire campaign (Type 8)
await sdk.promotion.setMinusPhrases({
  advert_id: 123456,
  nm_id: 0,                    // 0 = entire campaign
  norm_queries: ['unwanted phrase 1', 'unwanted phrase 2']
});
```

### After (Type 9 - Per-article)

```typescript
// NEW: Setting minus-phrases per article (Type 9)
await sdk.promotion.setMinusPhrases({
  advert_id: 123456,
  nm_id: 789012,               // Real WB article ID
  norm_queries: ['unwanted phrase 1', 'unwanted phrase 2']
});
```

### Migration Pattern for nm_id

```typescript
// Get campaign details to find all articles
const campaigns = await sdk.promotion.getAdvertsV2({
  ids: '123456'
});

const campaign = campaigns.adverts?.[0];
if (!campaign) throw new Error('Campaign not found');

// Set minus-phrases for EACH article individually
for (const nmSetting of campaign.nm_settings ?? []) {
  await sdk.promotion.setMinusPhrases({
    advert_id: campaign.id,
    nm_id: nmSetting.nm_id,    // Use actual article ID
    norm_queries: ['unwanted phrase']
  });

  console.log(`Set minus-phrases for article ${nmSetting.nm_id}`);
}
```

---

## 4. Search Clusters (NormQuery)

### Statistics Request

```typescript
import { GetSearchClusterStatsRequest } from 'daytona-wildberries-typescript-sdk';

const request: GetSearchClusterStatsRequest = {
  from: '2025-10-07',
  to: '2025-10-14',
  items: [
    {
      advert_id: 123456,
      nm_id: 789012    // Type 9: use real article ID
      // nm_id: 0      // Type 8 (legacy): would get aggregate stats
    }
  ]
};

const stats = await sdk.promotion.getSearchClusterStats(request);

for (const item of stats.stats ?? []) {
  console.log(`Campaign ${item.advert_id}, Article ${item.nm_id}:`);
  for (const cluster of item.stats ?? []) {
    console.log(`  "${cluster.norm_query}": ${cluster.views} views, ${cluster.clicks} clicks`);
    console.log(`    CTR: ${cluster.ctr}%, CPC: ${cluster.cpc} RUB, Avg Position: ${cluster.avg_pos}`);
  }
}
```

### Setting Cluster Bids

```typescript
// Set bids for specific search clusters (Type 9 only)
await sdk.promotion.setNormqueryBids({
  bids: [{
    advert_id: 123456,
    nm_id: 789012,              // Real article ID (Type 9)
    norm_query: 'target phrase',
    bid: 2500                   // Bid in kopecks (25.00 RUB)
  }]
});
```

---

## 5. New SDK Methods

These methods are added or updated in SDK v3.x for Type 9 campaigns:

| Method | Endpoint | Description |
|--------|----------|-------------|
| `getAdvertsV2()` | GET /api/advert/v2/adverts | Get campaigns with `bid_type` field |
| `updateBids()` | PATCH /api/advert/v1/bids | Update bids in kopecks |
| `updateCampaignProducts()` | PATCH /adv/v0/auction/nms | Add/remove products from campaigns |
| `getMinusPhrases()` | POST /adv/v0/normquery/get-minus | Get minus-phrases by article |
| `setMinusPhrases()` | POST /adv/v0/normquery/set-minus | Set minus-phrases per article |
| `getSearchClusterStats()` | POST /adv/v0/normquery/stats | Get cluster statistics per article |
| `setNormqueryBids()` | POST /adv/v0/normquery/bids | Set cluster bids |

### Usage Examples

```typescript
// Update bids (V1 API with kopecks)
await sdk.promotion.updateBids({
  bids: [{
    advert_id: 123456,
    nm_bids: [{
      nm_id: 789012,
      bid_kopecks: 1500,
      placement: 'search'
    }]
  }]
});

// Add/remove products from campaign
await sdk.promotion.updateCampaignProducts({
  campaigns: [{
    advert_id: 123456,
    add_nms: [111111, 222222],     // Articles to add
    delete_nms: [333333]           // Articles to remove
  }]
});

// Get minus-phrases
const minusPhrases = await sdk.promotion.getMinusPhrases({
  items: [{ advert_id: 123456, nm_id: 789012 }]
});
```

---

## 6. Deprecated Methods and Replacements

The following methods are **deprecated** and will be disabled on **February 2, 2026**:

| Deprecated Method | Replacement | Notes |
|-------------------|-------------|-------|
| `getPromotionAdverts()` | `getAdvertsV2()` | V2 includes `bid_type` field |
| `getAuctionAdverts()` | `getAdvertsV2()` | Unified method for all campaign types |
| `getAutoGetnmtoadd()` | `getAdvertsV2()` + `updateCampaignProducts()` | Type 8 product list |
| `createAutoUpdatenm()` | `updateCampaignProducts()` | Type 8 product management |
| `getAutoStatWords()` | `getAdvFullstats()` | Type 8 phrase statistics |
| `createAutoSetExcluded()` | `setMinusPhrases()` | Type 8 minus-phrases |
| `updateAdvBid()` | `updateBids()` | Uses kopecks instead of rubles |

### Example Migration

```typescript
// BEFORE (deprecated, Type 8)
await sdk.promotion.createAutoSetExcluded({
  advertId: 123456,
  excluded: ['unwanted phrase']
});

// AFTER (Type 9)
await sdk.promotion.setMinusPhrases({
  advert_id: 123456,
  nm_id: 789012,    // Real article ID
  norm_queries: ['unwanted phrase']
});
```

---

## 7. Migration Checklist

Use this checklist when migrating your integration:

### Pre-Migration

- [ ] Update SDK to v3.x: `npm install daytona-wildberries-typescript-sdk@latest`
- [ ] Review current code for deprecated method usage
- [ ] Identify all Type 8 campaigns that need migration
- [ ] Export current campaign settings (bids, minus-phrases, clusters)

### Code Changes

- [ ] Replace `'unified'` with `'auto'` in bid_type checks
- [ ] Convert bid values from rubles to kopecks (multiply by 100)
- [ ] Update `nm_id: 0` to actual WB article IDs
- [ ] Replace deprecated methods with new equivalents
- [ ] Update TypeScript imports for new type definitions

### Testing

- [ ] Test bid updates with kopecks conversion
- [ ] Verify minus-phrases are set per article
- [ ] Confirm search cluster stats return per-article data
- [ ] Test adding/removing products from campaigns
- [ ] Validate error handling for new endpoints

### Post-Migration

- [ ] Monitor campaign performance after changes
- [ ] Remove deprecated method calls from codebase
- [ ] Update documentation and internal guides
- [ ] Set up alerts for migration deadline (February 2, 2026)

---

## 8. Code Examples

### Complete Migration Example

```typescript
import {
  WildberriesSDK,
  UpdateBidsRequest,
  SetMinusPhrasesRequest
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Helper functions
const rublesToKopecks = (rubles: number): number => Math.round(rubles * 100);
const kopecksToRubles = (kopecks: number): number => kopecks / 100;

async function migrateCampaign(campaignId: number) {
  // 1. Get current campaign details
  const campaigns = await sdk.promotion.getAdvertsV2({
    ids: String(campaignId)
  });

  const campaign = campaigns.adverts?.[0];
  if (!campaign) {
    throw new Error(`Campaign ${campaignId} not found`);
  }

  console.log(`Campaign ${campaign.id}: ${campaign.settings.name}`);
  console.log(`  bid_type: ${campaign.bid_type}`);
  console.log(`  status: ${campaign.status}`);

  // 2. Update bids for each article (if needed)
  for (const nmSetting of campaign.nm_settings ?? []) {
    console.log(`  Article ${nmSetting.nm_id}:`);
    console.log(`    Current search bid: ${kopecksToRubles(nmSetting.bids_kopecks.search)} RUB`);

    // Example: set a new bid
    const newBidRubles = 15.00;
    await sdk.promotion.updateBids({
      bids: [{
        advert_id: campaign.id,
        nm_bids: [{
          nm_id: nmSetting.nm_id,
          bid_kopecks: rublesToKopecks(newBidRubles),
          placement: 'search'
        }]
      }]
    });
    console.log(`    Updated search bid to ${newBidRubles} RUB`);
  }

  // 3. Set minus-phrases per article
  const minusPhrases = ['unwanted term 1', 'unwanted term 2'];

  for (const nmSetting of campaign.nm_settings ?? []) {
    await sdk.promotion.setMinusPhrases({
      advert_id: campaign.id,
      nm_id: nmSetting.nm_id,
      norm_queries: minusPhrases
    });
    console.log(`  Set minus-phrases for article ${nmSetting.nm_id}`);
  }

  console.log('Migration complete!');
}

// Run migration
migrateCampaign(123456).catch(console.error);
```

### Reading Campaign Data (V2 API)

```typescript
async function analyzeCampaigns() {
  // Get all active campaigns
  const campaigns = await sdk.promotion.getAdvertsV2({
    statuses: '9',        // Active campaigns
    payment_type: 'cpm'   // CPM campaigns
  });

  console.log(`Found ${campaigns.adverts?.length ?? 0} campaigns\n`);

  for (const campaign of campaigns.adverts ?? []) {
    console.log(`Campaign ${campaign.id}: ${campaign.settings.name}`);
    console.log(`  Type: ${campaign.bid_type === 'auto' ? 'Automatic (Type 8)' : 'Manual (Type 9)'}`);
    console.log(`  Payment: ${campaign.settings.payment_type}`);
    console.log(`  Placements: Search=${campaign.settings.placements.search}, Rec=${campaign.settings.placements.recommendations}`);
    console.log(`  Created: ${campaign.timestamps.created}`);

    console.log('  Articles:');
    for (const nm of campaign.nm_settings ?? []) {
      console.log(`    - ${nm.nm_id} (${nm.subject.name})`);
      console.log(`      Search: ${kopecksToRubles(nm.bids_kopecks.search)} RUB`);
      console.log(`      Recommendations: ${kopecksToRubles(nm.bids_kopecks.recommendations)} RUB`);
    }
    console.log('');
  }
}
```

---

## See Also

- [Promotion Module Getting Started Guide](/guides/promotion-getting-started) - Complete module documentation
- [Promotion API Deprecation Notice](/guides/migration-v2.4-promotion-deprecation) - February 2, 2026 deadline
- [v3 Migration Guide](/guides/migration-v3) - Complete SDK v3 migration
- [Advertising Statistics Guide](/guides/advertising-statistics-guide) - Statistics and analytics
- [Best Practices for Advertising](/guides/best-practices-advertising) - Optimization tips

### Wildberries Resources

- [Release Notes #388](https://dev.wildberries.ru/release-notes?id=388) - Type 8 deprecation announcement
- [Promotion API Documentation](https://dev.wildberries.ru/openapi/promotion) - Official API reference

---

**Document Version**: 1.0.0
**Last Updated**: February 2026
**SDK Version**: 3.x
