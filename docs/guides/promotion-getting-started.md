---
title: Promotion Module Getting Started Guide
description: Complete guide to using the Promotion module for managing advertising campaigns, bidding, and search clusters on Wildberries
layout: doc
---

# Promotion Module Getting Started Guide

This guide covers everything you need to know to work with advertising campaigns and promotion features in the Wildberries TypeScript SDK.

> **v4.0.0**: Several legacy promotion methods (type 8 campaigns and the v0/v1 advert API) were **removed**. Use the V2 methods and type 9 campaigns described in this guide. See the [v4.0.0 Migration Guide](/guides/migration-v4) and the [Type 8→9 Migration Guide](/guides/migration-v2.4-promotion-deprecation) for details.

## Table of Contents

- [What is the Promotion Module?](#what-is-the-promotion-module)
- [Key Capabilities](#key-capabilities)
- [Prerequisites](#prerequisites)
- [Basic Usage](#basic-usage)
- [Campaign Management](#campaign-management)
- [Search Clusters (NormQuery)](#search-clusters-normquery)
- [Bidding Operations](#bidding-operations)
- [Campaign Finances](#campaign-finances)
- [Statistics and Analytics](#statistics-and-analytics)
- [Deprecated Methods](#deprecated-methods)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Best Practices](#best-practices)

## What is the Promotion Module?

The **Promotion module** provides complete control over Wildberries advertising campaigns, including:

- **Campaign Management**: Create, start, pause, stop, and delete advertising campaigns
- **Bidding**: Set and manage bids for products across different placements (search, recommendations)
- **Search Clusters (NormQuery)**: Target specific keyword clusters with custom bids
- **Minus-Phrases**: Exclude unwanted search terms from your campaigns
- **Statistics**: Track campaign performance with detailed metrics
- **Finances**: Monitor balance, budgets, and spending history

## Key Capabilities

| Feature | Description | Key Methods |
|---------|-------------|-------------|
| **Campaign Listing** | Get all campaigns with filtering | `getAdvertsV2()`, `getCampaignCount()` |
| **Campaign Control** | Start, pause, stop, delete | `startCampaign()`, `pauseCampaign()`, `getAdvStop()`, `getAdvDelete()` |
| **Bidding** | Bid management in kopecks | `getBidsMinV2()`, `updateBids()` |
| **Search Clusters** | Keyword cluster targeting | `getNormqueryStats()`, `setNormqueryBids()` |
| **Minus-Phrases** | Negative keyword management | `getNormqueryMinus()`, `setNormqueryMinus()` |
| **Finances** | Balance and budget management | `getAdvBalance()`, `getAdvBudget()`, `createBudgetDeposit()` |
| **Statistics** | Performance metrics | `getAdvFullstats()`, `getNormqueryStats()` |

## Prerequisites

### SDK Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

### API Key Setup

You need a valid Wildberries API key with promotion permissions. Create a `.env` file:

```bash
WB_API_KEY=your_api_key_here
```

### Import and Initialize

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});
```

## Basic Usage

### Quick Start Example

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function main() {
  // Get all active campaigns using V2 endpoint
  const campaigns = await sdk.promotion.getAdvertsV2({
    statuses: '9', // Status 9 = active
    payment_type: 'cpm'
  });

  console.log(`Found ${campaigns.adverts?.length ?? 0} active campaigns`);

  for (const campaign of campaigns.adverts ?? []) {
    console.log(`Campaign ${campaign.advert_id}: ${campaign.name}`);
    console.log(`  Status: ${campaign.status}`);
    console.log(`  Payment type: ${campaign.payment_type}`);
  }
}

main();
```

## Campaign Management

### Listing Campaigns (V2 - Recommended)

Use `getAdvertsV2()` for modern campaign retrieval with filtering:

```typescript
// Get all campaigns
const allCampaigns = await sdk.promotion.getAdvertsV2();

// Filter by status (9 = active, 11 = paused)
const activeCampaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9,11'
});

// Filter by specific IDs
const specificCampaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,23456,34567'
});

// Filter by payment type
const cpmCampaigns = await sdk.promotion.getAdvertsV2({
  payment_type: 'cpm' // or 'cpc' for cost-per-click
});
```

### Campaign Count

> **Note**: `getCampaignCount()` returns counts grouped by type and status. For filtered campaign details, use `getAdvertsV2()`.

```typescript
// Get campaign counts grouped by type and status
const counts = await sdk.promotion.getCampaignCount();
console.log(`Total campaigns: ${counts.all}`);

// Check for type 8 campaigns that need migration
const type8 = counts.adverts?.filter(a => a.type === 8);
if (type8?.length) {
  console.warn(`Warning: ${type8.length} type 8 campaigns need migration to type 9`);
}
```

### Campaign Control

```typescript
const campaignId = 12345;

// Start a campaign (must be in status 4 or 11)
await sdk.promotion.startCampaign(campaignId);
console.log('Campaign started');

// Pause an active campaign (status 9)
await sdk.promotion.pauseCampaign(campaignId);
console.log('Campaign paused');

// Stop a campaign completely
await sdk.promotion.getAdvStop({ id: campaignId });
console.log('Campaign stopped');

// Delete a campaign (only in status 4 - ready to start)
await sdk.promotion.getAdvDelete({ id: campaignId });
console.log('Campaign deleted');

// Rename a campaign
await sdk.promotion.createAdvRename({
  advertId: campaignId,
  name: 'New Campaign Name'
});
```

### Managing Products in Campaigns

```typescript
// Add and remove products from type 9 campaigns
await sdk.promotion.updateAuctionNm({
  nms: [{
    advert_id: campaignId,
    nms: {
      add: [111111, 222222],     // WB article numbers to add
      delete: [333333, 444444]   // WB article numbers to remove
    }
  }]
});

// Can update multiple campaigns at once
await sdk.promotion.updateAuctionNm({
  nms: [
    { advert_id: 12345, nms: { add: [111111] } },
    { advert_id: 23456, nms: { add: [222222] } },
    { advert_id: 34567, nms: { delete: [333333] } }
  ]
});
```

## Search Clusters (NormQuery)

Search clusters (NormQuery) allow you to target specific keyword groupings with custom bids. This is a powerful feature for CPM campaigns with manual bidding.

### Get Search Cluster Statistics

```typescript
// Get statistics for search clusters over a date range
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-31',
  items: [
    { advert_id: 12345, nm_id: 983512347 },
    { advert_id: 12345, nm_id: 123456789 }
  ]
});

console.log('Search cluster stats:');
for (const stat of stats.stats ?? []) {
  console.log(`  Campaign ${stat.advert_id}, Product ${stat.nm_id}:`);
  console.log(`    Views: ${stat.views}`);
  console.log(`    Clicks: ${stat.clicks}`);
  console.log(`    Orders: ${stat.orders}`);
}
```

### Get Current Cluster Bids

```typescript
// Get current bids for search clusters
const bids = await sdk.promotion.getNormqueryBids({
  items: [
    { advert_id: 12345, nm_id: 983512347 }
  ]
});

console.log('Current cluster bids:');
for (const item of bids.bids ?? []) {
  console.log(`Campaign ${item.advert_id}, Product ${item.nm_id}:`);
  for (const cluster of item.clusters ?? []) {
    console.log(`  "${cluster.norm_query}": ${cluster.bid} kopecks`);
  }
}
```

### Set Bids for Search Clusters

```typescript
// Set custom bids for specific keyword clusters
// Only for manual bid CPM campaigns
await sdk.promotion.setNormqueryBids({
  bids: [
    {
      advert_id: 12345,
      nm_id: 983512347,
      norm_query: 'Популярная фраза',  // The keyword cluster
      bid: 1500  // Bid in kopecks (15 rubles)
    },
    {
      advert_id: 12345,
      nm_id: 983512347,
      norm_query: 'Другая фраза',
      bid: 1000  // 10 rubles
    }
  ]
});
console.log('Cluster bids set successfully');
```

### Delete Cluster Bids

```typescript
// Remove custom bids from clusters (reverts to default bid)
await sdk.promotion.deleteNormqueryBids({
  bids: [
    {
      advert_id: 12345,
      nm_id: 983512347,
      norm_query: 'Фраза для удаления',
      bid: 1000  // Include current bid
    }
  ]
});
```

### Manage Minus-Phrases

```typescript
// Get current minus-phrases for campaigns
const minusPhrases = await sdk.promotion.getNormqueryMinus({
  items: [
    { advert_id: 12345, nm_id: 983512347 }
  ]
});

for (const item of minusPhrases.items ?? []) {
  console.log(`Campaign ${item.advert_id}:`);
  console.log(`  Minus-phrases: ${item.norm_queries?.join(', ')}`);
}

// Set minus-phrases (excludes these keywords)
// Sending empty array removes all minus-phrases
await sdk.promotion.setNormqueryMinus({
  advert_id: 12345,
  nm_id: 983512347,
  norm_queries: ['Конкурент', 'Нежелательная фраза', 'Дешевый']
});
```

## Bidding Operations

### Get Minimum Bids (V2 - Kopecks)

The V2 bid methods work with **kopecks** (1 ruble = 100 kopecks) for precision:

```typescript
// Get minimum allowed bids for products by placement
const minBids = await sdk.promotion.getBidsMinV2({
  advert_id: 12345,
  nm_ids: [983512347, 123456789],
  payment_type: 'cpm',  // or 'cpc'
  placement_types: ['combined', 'search', 'recommendation']
});

console.log('Minimum bids:');
for (const product of minBids.bids) {
  console.log(`Product ${product.nm_id}:`);
  for (const bid of product.bids) {
    console.log(`  ${bid.type}: ${bid.value} kopecks (${bid.value / 100} rubles)`);
  }
}
```

### Update Bids (Kopecks)

```typescript
// Update bids for products in campaigns
// Works for campaigns in statuses 4, 9, and 11
const result = await sdk.promotion.updateBids({
  bids: [{
    advert_id: 12345,
    nm_bids: [
      {
        nm_id: 983512347,
        bid_kopecks: 500,  // 5 rubles
        placement: 'search'
      },
      {
        nm_id: 983512347,
        bid_kopecks: 300,  // 3 rubles
        placement: 'recommendations'
      },
      {
        nm_id: 123456789,
        bid_kopecks: 450,  // 4.5 rubles
        placement: 'combined'  // Both search and recommendations
      }
    ]
  }]
});

console.log('Bids updated:', result.bids);
```

> The rubles-based `updateAuctionBid()` was removed in v4.0.0. Use `updateBids()` (kopecks) for all bid updates.

## Campaign Finances

### Check Account Balance

```typescript
// Get promotion account balance
const balance = await sdk.promotion.getAdvBalance();

console.log('Promotion Account:');
console.log(`  Balance: ${balance.balance} rubles`);
console.log(`  Net (settlement): ${balance.net} rubles`);
console.log(`  Bonus: ${balance.bonus} rubles`);

// Cashback info
for (const cb of balance.cashbacks ?? []) {
  console.log(`  Cashback: ${cb.sum} (${cb.percent}%), expires ${cb.expiration_date}`);
}
```

### Check Campaign Budget

```typescript
// Get budget for specific campaign
const budget = await sdk.promotion.getAdvBudget({ id: 12345 });

console.log(`Campaign budget:`);
console.log(`  Cash: ${budget.cash} rubles`);
console.log(`  Settlement: ${budget.netting} rubles`);
console.log(`  Total: ${budget.total} rubles`);
```

### Deposit to Campaign Budget

```typescript
// Add funds to campaign budget (campaign must be in status 11 - paused)
const deposit = await sdk.promotion.createBudgetDeposit(
  {
    sum: 10000,           // Amount in rubles
    type: 0,              // 0 = from balance, 1 = from settlement
    return: false         // Don't return funds to balance
  },
  { id: 12345 }           // Campaign ID
);

console.log('Deposit successful');

// Start the campaign after depositing
await sdk.promotion.startCampaign(12345);
```

### View Spending History

```typescript
// Get spending history for a date range
const spending = await sdk.promotion.getAdvUpd({
  from: '2025-01-01',
  to: '2025-01-31'
});

console.log('Spending history:');
for (const upd of spending) {
  console.log(`${upd.updTime}: Campaign ${upd.advertId} (${upd.campName})`);
  console.log(`  Amount: ${upd.updSum} rubles`);
  console.log(`  Payment type: ${upd.paymentType}`);
}
```

### View Payment History

```typescript
// Get account top-up history
const payments = await sdk.promotion.getAdvPayments({
  from: '2025-01-01',
  to: '2025-01-31'
});

console.log('Payment history:');
for (const payment of payments) {
  console.log(`${payment.date}: ${payment.sum} rubles (Status: ${payment.cardStatus})`);
}
```

## Statistics and Analytics

### Full Campaign Statistics

```typescript
// Get comprehensive statistics for campaigns
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345,23456',  // Campaign IDs
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});

console.log('Campaign performance:', stats);
```

### Keyword Statistics

> The standalone `getStatsKeywords()` method was **removed in v4.0.0** (WB disabled the underlying v0/v1 advert API). Use `getAdvFullstats()` for campaign performance — it returns per-day, per-platform, and per-SKU breakdowns including clicks, views, CTR, and spend.

```typescript
// Get campaign statistics (use for keyword/SKU-level performance)
const stats = await sdk.promotion.getAdvFullstats({
  ids: '12345',
  beginDate: '2025-01-01',
  endDate: '2025-01-07'  // max 7 days for keyword-level granularity
});

for (const campaign of stats) {
  console.log(`Campaign ${campaign.advertId}: ${campaign.views} views, ${campaign.clicks} clicks, CTR ${campaign.ctr}%`);
}
```

## Removed Methods (v4.0.0)

The following methods were **removed in v4.0.0** (WB disabled the underlying v0/v1 advert API on 2026-02-02). Use the replacements listed.

| Removed Method | Replacement | Notes |
|-------------------|-------------|-------|
| `getPromotionCount()` | `getCampaignCount()` | Same endpoint, renamed |
| `createPromotionAdvert()` | `getAdvertsV2()` | Use V2 for campaign info |
| `getAuctionAdverts()` | `getAdvertsV2()` | V2 unified method |
| `createBidsMin()` | `getBidsMinV2()` | V2 uses kopecks |
| `updateAdvBid()` | `updateBids()` | Uses kopecks |
| `updateBidsV2()` | `updateBids()` | Renamed |
| `updateAuctionBid()` | `updateBids()` | Rubles→kopecks |
| `getAdvStart()` | `startCampaign(id)` | Renamed |
| `getAdvPause()` | `pauseCampaign(id)` | Renamed |
| `createSeacatSaveAd()` | `createCampaign(data)` | Renamed |
| `getAutoGetnmtoadd()` | `getSupplierNms(subjectIds)` | Type 9 campaigns |
| `createAutoUpdatenm()` | `updateCampaignProducts()` | Type 9 campaigns |
| `getAutoStatWords()` | `getAdvFullstats()` | Universal statistics |
| `createAutoSetExcluded()` | `setMinusPhrases()` | Minus-phrase management |
| `getStatsKeywords()` | `getAdvFullstats()` | Keyword stats via full stats |
| `getStatWords()` | `getAdvFullstats()` | Keyword stats via full stats |
| `createAdvFullstat()` | `getAdvFullstats()` | v2 POST → v3 GET |

### Migration Example

```typescript
// ❌ OLD (removed in v4.0.0)
const oldCampaigns = await sdk.promotion.getPromotionCount();

// ✅ NEW
const counts = await sdk.promotion.getCampaignCount();
const campaigns = await sdk.promotion.getAdvertsV2();
```

```typescript
// ❌ OLD (removed, used rubles)
const oldMinBids = await sdk.promotion.createBidsMin({
  advert_id: 12345,
  nm_ids: [983512347],
  payment_type: 'cpm',
  placement_types: ['search', 'recommendation']
});

// ✅ NEW (uses kopecks)
const newMinBids = await sdk.promotion.getBidsMinV2({
  advert_id: 12345,
  nm_ids: [983512347],
  payment_type: 'cpm',
  placement_types: ['search', 'recommendation']
});
```

See the [v4.0.0 Migration Guide](/guides/migration-v4) for the complete removal list and [Migration Guide: Type 8 to Type 9](/guides/migration-v2.4-promotion-deprecation) for campaign-type migration.

## Error Handling

### Comprehensive Error Handling

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function manageCampaign(campaignId: number) {
  try {
    const campaigns = await sdk.promotion.getAdvertsV2({ ids: String(campaignId) });
    // Process campaigns...
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded');
      console.error(`Retry after: ${error.retryAfter}ms`);
      // SDK handles retry automatically
    } else if (error instanceof AuthenticationError) {
      console.error('Invalid API key - check your credentials');
    } else if (error instanceof ValidationError) {
      console.error('Invalid request:', error.message);
      // Fix request parameters
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
      // Check connectivity
    } else if (error instanceof WBAPIError) {
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Handling Specific Scenarios

```typescript
// Campaign not found
try {
  await sdk.promotion.startCampaign(999999999);
} catch (error) {
  if (error instanceof WBAPIError && error.statusCode === 404) {
    console.error('Campaign not found');
  }
}

// Invalid campaign state
try {
  // Trying to pause an already paused campaign
  await sdk.promotion.pauseCampaign(pausedCampaignId);
} catch (error) {
  if (error instanceof WBAPIError && error.statusCode === 400) {
    console.error('Campaign is not in a valid state for this operation');
  }
}
```

## Rate Limits

The Promotion API uses different rate limits for different endpoint categories:

### Rate Limit Tiers

| Category | Requests/Min | Interval | Burst | Methods |
|----------|-------------|----------|-------|---------|
| **Campaign Control** | 300 | 200ms | 5 | `startCampaign`, `pauseCampaign`, `getAdvStop`, `getAdvDelete` |
| **Campaign Info (V2)** | 300 | 200ms | 5 | `getAdvertsV2`, `getCampaignCount` |
| **Bid Updates** | 300 | 200ms | 5 | `updateBids` |
| **Min Bids** | 20 | 3s | 5 | `getBidsMinV2` |
| **Balance/Budget** | 60 | 1s | 5 | `getAdvBalance`, `getAdvBudget` |
| **NormQuery Stats** | 10 | 6s | 20 | `getNormqueryStats` |
| **NormQuery Bids** | 300 | 200ms | 10 | `getNormqueryBids`, `deleteNormqueryBids` |
| **NormQuery Set Bids** | 120 | 500ms | 4 | `setNormqueryBids` |
| **Full Statistics** | 3 | 20s | 1 | `getAdvFullstats` |

### Rate Limit Tips

- The SDK handles rate limiting automatically with queuing and retry
- **Statistics methods are slowest** - `getAdvFullstats()` allows only 3 requests per minute
- **NormQuery stats** are also limited at 10 requests per minute
- **Batch your operations** when possible to reduce API calls
- Use `getAdvertsV2()` filtering to reduce the number of campaigns returned

```typescript
// Efficient: Filter on server side
const activeCampaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9', // Only active
  payment_type: 'cpm'
});

// Inefficient: Fetch all and filter locally
const allCampaigns = await sdk.promotion.getAdvertsV2();
const filtered = allCampaigns.adverts?.filter(c => c.status === 9);
```

## Best Practices

### 1. Use V2 Methods

Always prefer V2 methods over deprecated equivalents:

```typescript
// ✅ Recommended
const campaigns = await sdk.promotion.getAdvertsV2();
const minBids = await sdk.promotion.getBidsMinV2({ ... });
await sdk.promotion.updateBids({ ... });

// ❌ Removed in v4.0.0
// const oldCampaigns = await sdk.promotion.getPromotionCount();
// const oldMinBids = await sdk.promotion.createBidsMin({ ... });
// await sdk.promotion.updateBidsV2({ ... });
```

### 2. Respect Rate Limits

```typescript
// Use filtering to reduce calls
const campaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9,11' // Only active and paused
});

// Don't poll statistics too frequently
// getAdvFullstats has a 20-second interval limit
```

### 3. Handle Type 9 Campaigns

All new campaigns should be type 9 (manual/unified bid):

```typescript
// Create type 9 campaign with manual bids
const campaignId = await sdk.promotion.createCampaign({
  name: 'My Campaign',
  nms: [983512347, 123456789],
  bid_type: 'manual',
  payment_type: 'cpm',
  placement_types: ['search', 'recommendations']
});
```

### 4. Monitor Campaign Performance

```typescript
async function monitorCampaigns() {
  const campaigns = await sdk.promotion.getAdvertsV2({ statuses: '9' });

  for (const campaign of campaigns.adverts ?? []) {
    // Check budget
    const budget = await sdk.promotion.getAdvBudget({ id: campaign.advert_id });

    if ((budget.total ?? 0) < 1000) {
      console.warn(`Campaign ${campaign.advert_id} has low budget: ${budget.total} rubles`);
    }
  }
}
```

### 5. Use Search Clusters for Optimization

```typescript
// Analyze cluster performance
const stats = await sdk.promotion.getNormqueryStats({
  from: '2025-01-01',
  to: '2025-01-31',
  items: [{ advert_id: 12345, nm_id: 983512347 }]
});

// Increase bids for high-converting clusters
const highPerformers = stats.stats?.filter(s => (s.orders ?? 0) > 10);

if (highPerformers?.length) {
  await sdk.promotion.setNormqueryBids({
    bids: highPerformers.map(stat => ({
      advert_id: stat.advert_id!,
      nm_id: stat.nm_id!,
      norm_query: stat.norm_query!,
      bid: (stat.bid ?? 500) + 200 // Increase by 2 rubles
    }))
  });
}
```

## Related Resources

- [API Reference: PromotionModule](/api/classes/PromotionModule)
- [Migration Guide: Type 8 to Type 9](/guides/migration-v2.4-promotion-deprecation)
- [Advertising Best Practices](/guides/best-practices-advertising)
- [Advertising Statistics Guide](/guides/advertising-statistics-guide)
- [Official WB Promotion API](https://dev.wildberries.ru/openapi/promotion)
