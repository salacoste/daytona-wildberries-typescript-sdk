# Promotion & Advertising Module Guide

This guide covers the Promotion (Advertising) module of the Wildberries SDK, including campaign management, bid control, budget operations, and analytics.

## Overview

The Promotion module provides complete access to Wildberries advertising capabilities:

- **Campaign Management**: Create, start, pause, stop, and delete advertising campaigns
- **Budget Operations**: Deposit funds and track campaign spending
- **Bid Management**: Set and manage bids for search and recommendations
- **Keyword/Phrase Control**: Manage fixed phrases and excluded (minus) phrases
- **Analytics**: Get campaign statistics by keywords and performance metrics

## Quick Start

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get advertising balance
const balance = await sdk.promotion.getAdvBalance();
console.log(`Balance: ${balance.net}₽`);

// Get all campaigns overview
const campaigns = await sdk.promotion.getCampaignCount();
console.log(`Total campaigns: ${campaigns.all}`);
```

## Campaign Lifecycle

### Campaign Statuses

| Status | Code | Description |
|--------|------|-------------|
| Ready | `4` | Campaign created, ready to launch |
| Finished | `7` | Campaign ended |
| Cancelled | `8` | Campaign cancelled |
| Active | `9` | Campaign is running |
| Paused | `11` | Campaign on pause |
| Deleting | `-1` | Campaign being deleted (3-10 min) |

### Campaign Types

| Type | Description | Status |
|------|-------------|--------|
| `4` | In catalog | **Deprecated** |
| `5` | In product card | **Deprecated** |
| `6` | In search | **Deprecated** |
| `7` | In recommendations | **Deprecated** |
| `8` | Unified bid | **Deprecated** |
| `9` | Unified or manual bid | **Current** |

::: warning Important: Campaign Listing
Wildberries moved all campaign listing to the V2 endpoint. Use **`getAdvertsV2()`** to list campaigns of any type with filtering by `statuses`, `payment_type`, or `ids`. The legacy `getAuctionAdverts()` (type 9 only) and `createPromotionAdvert()` (types 4-8) methods were removed in v4.0.0.
:::

### Bid Types

| Bid Type | Description |
|----------|-------------|
| `manual` | Manual bid - control bids per placement |
| `unified` | Unified bid - single bid for all placements |

### Placement Types

| Placement | Description |
|-----------|-------------|
| `search` | Ads in search results |
| `recommendations` | Ads in recommendations |
| `combined` | Both search and recommendations |

## Campaign Management

### Create Campaign

```typescript
// Create campaign with manual bid for search
const campaign = await sdk.promotion.createCampaign({
  name: 'Winter Collection 2024',
  nms: [168120815, 173574852], // Product NM IDs (max 50)
  bid_type: 'manual',
  payment_type: 'cpm',
  placement_types: ['search']
});

console.log(`Campaign created: ID ${campaign}`);
```

### Get Campaign Information

#### List All Campaigns

```typescript
// Get all campaigns grouped by type and status
const overview = await sdk.promotion.getCampaignCount();

overview.adverts?.forEach(group => {
  console.log(`Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);

  // List campaign IDs
  group.advert_list?.forEach(ad => {
    console.log(`  Campaign ID: ${ad.advertId}`);
  });
});
```

#### Get Campaign Details (V2)

Use `getAdvertsV2()` to list campaigns with filtering by status, payment type, or IDs. This replaces the removed `getAuctionAdverts()` (type 9 only) and `createPromotionAdvert()` (types 4-8) methods.

```typescript
// List all campaigns
const allCampaigns = await sdk.promotion.getAdvertsV2({});
allCampaigns.adverts?.forEach(campaign => {
  console.log(`Campaign ${campaign.id}: status=${campaign.status}, bid_type=${campaign.bid_type}`);
});

// Filter by status or payment type
const activeCampaigns = await sdk.promotion.getAdvertsV2({
  statuses: '9',        // Active only
  payment_type: 'cpm'   // CPM campaigns
});

// Get specific campaigns by IDs
const specificCampaigns = await sdk.promotion.getAdvertsV2({
  ids: '12345,67890'    // Max 50 IDs
});
```

#### Complete Workflow: Get ALL Campaign Details

```typescript
async function getAllCampaignDetails(sdk: WildberriesSDK) {
  // Step 1: Get list of ALL campaigns
  const allCampaigns = await sdk.promotion.getCampaignCount();

  // Step 2: Collect all campaign IDs
  const allIds: number[] = [];
  allCampaigns.adverts?.forEach(group => {
    group.advert_list?.forEach(advert => {
      allIds.push(advert.advertId!);
    });
  });

  console.log(`Found ${allIds.length} campaigns`);

  // Step 3: Get details in batches of 50 (V2 max IDs per request)
  if (allIds.length > 0) {
    const details = await sdk.promotion.getAdvertsV2({
      ids: allIds.slice(0, 50).join(',')
    });
    console.log('Campaign details:', details);
  }
}
```

### Campaign Control Methods

```typescript
// Start campaign (requires status 4 or 11 + budget)
await sdk.promotion.startCampaign(campaignId);

// Pause campaign (only for status 9 - active)
await sdk.promotion.pauseCampaign(campaignId);

// Stop/finish campaign (for statuses 4, 9, 11)
await sdk.promotion.getAdvStop({ id: campaignId });

// Delete campaign (only for status 4 - ready)
await sdk.promotion.getAdvDelete({ id: campaignId });

// Rename campaign
await sdk.promotion.createAdvRename({
  advertId: campaignId,
  name: 'New Campaign Name'
});
```

### Valid Status Transitions

```
┌─────────┐     start      ┌────────┐
│  Ready  │ ──────────────>│ Active │
│   (4)   │                │   (9)  │
└────┬────┘                └───┬────┘
     │                         │
     │ delete                  │ pause
     ▼                         ▼
┌──────────┐            ┌─────────┐
│ Deleting │            │ Paused  │
│   (-1)   │            │  (11)   │
└──────────┘            └────┬────┘
                             │
     ┌───────────────────────┤ start
     │                       │
     │      stop             ▼
     │    ◄──────────────────┘
     ▼
┌──────────┐
│ Finished │
│   (7)    │
└──────────┘
```

## Budget Operations

### Check Balance

```typescript
const balance = await sdk.promotion.getAdvBalance();
console.log(`Account balance (счёт): ${balance.balance}₽`);
console.log(`Cabinet balance (кабинет): ${balance.net}₽`);
console.log(`Bonus: ${balance.bonus}₽`);

// Cashback info if available
if (balance.cashbacks?.length) {
  balance.cashbacks.forEach(cb => {
    console.log(`Cashback: ${cb.percent}% (max ${cb.sum}₽)`);
  });
}
```

### Deposit Budget to Campaign

> **Important**: Per API documentation, budget deposit requires campaign in status `11` (paused). However, testing showed it may also work for status `4` (ready).

```typescript
// First pause the campaign if active
await sdk.promotion.pauseCampaign(campaignId);

// Deposit 1000₽ from cabinet balance
await sdk.promotion.createBudgetDeposit(
  {
    sum: 1000,
    type: 1  // 0=счёт, 1=баланс (cabinet), 3=бонусы
  },
  { id: campaignId }
);

// Verify budget
const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
console.log(`Campaign budget: ${budget.total}₽`);
```

### Get Campaign Budget

```typescript
const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
console.log(`Cash: ${budget.cash}₽`);
console.log(`Netting: ${budget.netting}₽`);
console.log(`Total: ${budget.total}₽`);
```

### Get Expense History

```typescript
const to = new Date();
const from = new Date();
from.setDate(from.getDate() - 30);

const expenses = await sdk.promotion.getAdvUpd({
  from: from.toISOString().split('T')[0],
  to: to.toISOString().split('T')[0]
});

let totalSpent = 0;
expenses.forEach(record => {
  console.log(`${record.campName}: ${record.updSum}₽`);
  totalSpent += record.updSum || 0;
});
console.log(`Total spent in 30 days: ${totalSpent}₽`);
```

## Bid Management

### Get Minimum Bids

```typescript
// Get minimum bids for products in a campaign (V2 — kopecks)
const minBids = await sdk.promotion.getBidsMinV2({
  advert_id: campaignId,
  nm_ids: [168120815, 173574852],
  payment_type: 'cpm',  // 'cpm' (per 1000 views) or 'cpc' (per click)
  placement_types: ['search']
});

minBids.bids.forEach(bid => {
  console.log(`NM ${bid.nm_id}: min bid = ${bid.bid}₽`);
});
```

### Update Bids (Kopecks)

`updateBids()` is the single bid-update method (kopecks-based). It handles both unified and manual bid campaigns — the rubles-based `updateAdvBid()` and `updateAuctionBid()` were removed in v4.0.0.

```typescript
// For campaigns with manual bid (bid_type: 'manual') — per-product, per-placement
await sdk.promotion.updateBids({
  bids: [{
    advert_id: campaignId,
    nm_bids: [{
      nm_id: 168120815,
      bid_kopecks: 28000,  // 280₽ in kopecks
      placement: 'search'  // or 'recommendations', 'combined'
    }]
  }]
});
```

## Keyword/Phrase Management

### Excluded Phrases (Minus-words)

> **Important**: Minus-phrase management requires the campaign to be active (status 9). The removed `createSearchSetExcluded()` / `createAutoSetExcluded()` methods are replaced by the normquery-based `setMinusPhrases()` / `getMinusPhrases()`.

```typescript
// Set minus-phrases for a campaign+product (normquery-based)
await sdk.promotion.setMinusPhrases({
  advert_id: campaignId,
  nm_id: 168120815,
  norm_queries: ['cheap', 'discount', 'used']
});

// Clear all minus-phrases (pass an empty array)
await sdk.promotion.setMinusPhrases({
  advert_id: campaignId,
  nm_id: 168120815,
  norm_queries: []
});

// Read current minus-phrases
const mp = await sdk.promotion.getMinusPhrases({
  items: [{ advert_id: campaignId, nm_id: 168120815 }]
});
```

### Fixed Phrases (Removed in v4.0.0)

The fixed-phrase management methods (`createSearchSetPlu()`, `getSearchSetPlus()`) were **removed in v4.0.0** — WB dropped the underlying v1 search-phrase endpoints. There is no 1:1 replacement. For keyword-level performance, use `getAdvFullstats()` (see [Campaign Statistics](#campaign-statistics)).

## Campaign Statistics

### Keyword Statistics (Last 7 Days)

> The standalone `getStatsKeywords()` method was **removed in v4.0.0**. Use `getAdvFullstats()` for keyword/SKU-level performance — it returns per-day, per-platform, and per-SKU breakdowns.

```typescript
const to = new Date();
const from = new Date();
from.setDate(from.getDate() - 7);

const stats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),
  beginDate: from.toISOString().split('T')[0],
  endDate: to.toISOString().split('T')[0]  // max 31 days
});

stats.forEach(campaign => {
  console.log(`Campaign ${campaign.advertId}: ${campaign.views} views, ${campaign.clicks} clicks, CTR ${campaign.ctr}%`);
  campaign.days.forEach(day => {
    console.log(`  ${day.date}: views=${day.views}, clicks=${day.clicks}, sum=${day.sum}`);
    day.apps?.forEach(app => {
      app.nms?.forEach(nm => {
        console.log(`    SKU ${nm.nmId}: ${nm.clicks} clicks, ${nm.orders} orders`);
      });
    });
  });
});
```

> The bid-type-specific stats methods `getStatWords()` (manual bid) and `getAutoStatWords()` (unified bid) were **removed in v4.0.0**. `getAdvFullstats()` is now the universal statistics method for all campaign types.

### Full Campaign Statistics (getAdvFullstats)

::: warning Strict Rate Limit
This endpoint has very strict rate limits: **3 requests per minute** with **20 second intervals**.
If you call it faster, you'll get 429 errors.
:::

```typescript
const end = new Date();
const begin = new Date();
begin.setDate(begin.getDate() - 7);

const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),  // Can pass multiple: "123,456,789" (max 100)
  beginDate: begin.toISOString().split('T')[0],
  endDate: end.toISOString().split('T')[0]  // Max 31 days from beginDate
});

fullStats.forEach(stat => {
  console.log(`Campaign ${stat.advertId}:`);
  console.log(`  Views: ${stat.views}`);
  console.log(`  Clicks: ${stat.clicks}`);
  console.log(`  CTR: ${stat.ctr}%`);
  console.log(`  CPC: ${stat.cpc}₽`);
  console.log(`  Orders: ${stat.orders}`);
  console.log(`  Sum: ${stat.sum}₽`);

  // Detailed breakdown by day and platform
  stat.days.forEach(day => {
    console.log(`  ${day.date}:`);
    day.apps?.forEach(app => {
      console.log(`    Platform ${app.appType}: ${app.clicks} clicks, ${app.orders} orders`);
    });
  });
});
```

#### Batch Request (Multiple Campaigns)

You can request statistics for up to 100 campaigns in a single call:

```typescript
// Get stats for multiple campaigns at once
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511,23332267,27052565',  // Comma-separated IDs
  beginDate: '2025-12-16',
  endDate: '2025-12-22'
});

// Returns array with data for each campaign
stats.forEach(s => {
  console.log(`Campaign ${s.advertId}: ${s.clicks} clicks, ${s.sum}₽ spent`);
});
```

#### With Rate Limit Handling

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

const RATE_LIMIT_DELAY = 21000; // 21 seconds between requests

async function getStatsForCampaigns(campaignIds: number[]) {
  const results = [];

  for (const id of campaignIds) {
    try {
      const stats = await sdk.promotion.getAdvFullstats({
        ids: String(id),
        beginDate: '2025-12-16',
        endDate: '2025-12-22'
      });
      results.push(...stats);

      // Wait before next request to avoid rate limit
      await new Promise(r => setTimeout(r, RATE_LIMIT_DELAY));

    } catch (error) {
      if (error instanceof RateLimitError) {
        console.log(`Rate limited, waiting ${error.retryAfter}ms`);
        await new Promise(r => setTimeout(r, error.retryAfter));
        // Retry this campaign
        campaignIds.push(id);
      } else {
        throw error;
      }
    }
  }

  return results;
}
```

#### Response Structure

```typescript
interface FullStatsResponse {
  advertId: number;      // Campaign ID
  clicks: number;        // Total clicks
  views: number;         // Total views
  ctr: number;           // Click-through rate %
  cpc: number;           // Cost per click ₽
  orders: number;        // Total orders
  sum: number;           // Total spent ₽
  atbs: number;          // Add to basket count
  cr: number;            // Conversion rate
  days: Array<{
    date: string;        // "2025-12-17T00:00:00Z"
    clicks: number;
    views: number;
    orders: number;
    sum: number;
    apps: Array<{        // Breakdown by platform
      appType: number;   // 1=site, 32=android, 64=ios
      clicks: number;
      views: number;
      orders: number;
      sum: number;
      nms: Array<{       // Breakdown by product
        nmId: number;
        name: string;
        clicks: number;
        views: number;
        orders: number;
        sum: number;
      }>;
    }>;
  }>;
}
```

#### Extracting SKU-Level Statistics

The `nmId` data is nested inside `days → apps → nms`. Here's how to extract it:

```typescript
import type {
  FullStatsNmItem,
  FullStatsAppItem
} from 'daytona-wildberries-typescript-sdk';

// Get full statistics
const stats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),
  beginDate: '2025-12-16',
  endDate: '2025-12-22'
});

// Extract all SKU-level stats across all days and platforms
interface SkuStats {
  nmId: number;
  name: string;
  totalClicks: number;
  totalViews: number;
  totalOrders: number;
  totalSpent: number;
}

const skuMap = new Map<number, SkuStats>();

for (const campaign of stats) {
  for (const day of campaign.days) {
    for (const app of day.apps) {
      for (const nm of app.nms) {
        const existing = skuMap.get(nm.nmId) || {
          nmId: nm.nmId,
          name: nm.name,
          totalClicks: 0,
          totalViews: 0,
          totalOrders: 0,
          totalSpent: 0
        };

        existing.totalClicks += nm.clicks;
        existing.totalViews += nm.views;
        existing.totalOrders += nm.orders;
        existing.totalSpent += nm.sum;

        skuMap.set(nm.nmId, existing);
      }
    }
  }
}

// Print SKU breakdown
for (const [nmId, stats] of skuMap) {
  console.log(`SKU ${nmId} (${stats.name}):`);
  console.log(`  Clicks: ${stats.totalClicks}`);
  console.log(`  Views: ${stats.totalViews}`);
  console.log(`  Orders: ${stats.totalOrders}`);
  console.log(`  Spent: ${stats.totalSpent}₽`);
}
```

#### Stats by Platform and SKU

```typescript
// Platform names for display
const PLATFORMS: Record<number, string> = {
  1: 'Website',
  32: 'Android',
  64: 'iOS'
};

const stats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),
  beginDate: '2025-12-16',
  endDate: '2025-12-22'
});

for (const campaign of stats) {
  console.log(`\n=== Campaign ${campaign.advertId} ===`);

  for (const day of campaign.days) {
    console.log(`\nDate: ${day.date}`);

    for (const app of day.apps) {
      console.log(`  ${PLATFORMS[app.appType] || app.appType}:`);

      for (const nm of app.nms) {
        console.log(`    SKU ${nm.nmId}: ${nm.clicks} clicks, ${nm.orders} orders, ${nm.sum}₽`);
      }
    }
  }
}
```

::: tip TypeScript Types
The SDK exports fully typed interfaces for SKU-level data:
- `FullStatsNmItem` - SKU statistics (nmId, name, clicks, etc.)
- `FullStatsAppItem` - Platform statistics with `nms` array
- `FullStatsDayItem` - Daily statistics with `apps` array
:::

## Complete Workflow Example

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

async function runAdvertisingCampaign() {
  const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

  const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
  const RATE_LIMIT_DELAY = 5000;

  let campaignId: number | null = null;

  try {
    // 1. Check balance
    const balance = await sdk.promotion.getAdvBalance();
    console.log(`Available balance: ${balance.net}₽`);
    await delay(RATE_LIMIT_DELAY);

    if (balance.net < 1000) {
      throw new Error('Insufficient balance');
    }

    // 2. Create campaign
    campaignId = await sdk.promotion.createCampaign({
      name: 'SDK Test Campaign',
      nms: [168120815],
      bid_type: 'manual',
      payment_type: 'cpm',
      placement_types: ['search']
    }) as number;
    console.log(`Created campaign: ${campaignId}`);
    await delay(RATE_LIMIT_DELAY);

    // 3. Deposit budget
    await sdk.promotion.createBudgetDeposit(
      { sum: 1000, type: 1 },
      { id: campaignId }
    );
    console.log('Budget deposited: 1000₽');
    await delay(RATE_LIMIT_DELAY);

    // 4. Get minimum bids
    const minBids = await sdk.promotion.getBidsMinV2({
      advert_id: campaignId,
      nm_ids: [168120815],
      payment_type: 'cpm',
      placement_types: ['search']
    });
    console.log(`Minimum bid: ${minBids.bids[0]?.bid || 'N/A'}₽`);
    await delay(RATE_LIMIT_DELAY);

    // 5. Start campaign
    await sdk.promotion.startCampaign(campaignId);
    console.log('Campaign started!');

    // 6. Monitor (in real scenario, poll periodically)
    // ... campaign runs ...

  } finally {
    // Cleanup: Delete test campaign
    if (campaignId) {
      try {
        await sdk.promotion.pauseCampaign(campaignId);
        await delay(2000);
        await sdk.promotion.getAdvDelete({ id: campaignId });
        console.log('Campaign deleted');
      } catch (e) {
        // Try stop if delete fails (campaign may not be in status 4)
        await sdk.promotion.getAdvStop({ id: campaignId });
        console.log('Campaign stopped');
      }
    }
  }
}
```

## Rate Limits

| Operation | Rate Limit |
|-----------|------------|
| Most operations | 5 req/sec (200ms interval) |
| Campaign creation | 5 req/min (12s interval) |
| Budget deposit | 1 req/sec |
| Statistics | 1 req/min |
| Minimum bids | 20 req/min (3s interval) |

Always implement proper delays between API calls:

```typescript
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// Between most operations
await delay(5000); // 5 seconds

// Between statistics queries
await delay(60000); // 1 minute
```

## Error Handling

```typescript
import {
  ValidationError,
  AuthenticationError,
  RateLimitError
} from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.startCampaign(campaignId);
} catch (error) {
  if (error instanceof ValidationError) {
    // Invalid campaign ID or wrong status
    console.error('Validation error:', error.message);
  } else if (error instanceof AuthenticationError) {
    // API key doesn't have write permissions
    console.error('Auth error: Check API key permissions');
  } else if (error instanceof RateLimitError) {
    // Too many requests
    console.error('Rate limit hit, retry after:', error.retryAfter);
  }
}
```

## Method Reference

### Campaign Listing & Details

::: tip Campaign Listing
Use `getAdvertsV2()` to list campaigns of any type. The legacy `getAuctionAdverts()` (type 9) and `createPromotionAdvert()` (types 4-8) were removed in v4.0.0.
:::

| Method | API Endpoint | Campaign Types | Description |
|--------|--------------|----------------|-------------|
| `getCampaignCount()` | `GET /adv/v1/promotion/count` | **ALL** | List all campaigns with IDs |
| `getAdvertsV2()` | `GET /adv/v2/adverts` | **ALL** | Get filtered campaign details |

### Campaign Management

| Method | Description | Required Status |
|--------|-------------|-----------------|
| `createCampaign()` | Create campaign (type 9) | - |
| `startCampaign()` | Start campaign | 4 or 11 |
| `pauseCampaign()` | Pause campaign | 9 |
| `getAdvStop()` | Stop/finish campaign | 4, 9, or 11 |
| `getAdvDelete()` | Delete campaign | 4 only |
| `createAdvRename()` | Rename campaign | any |

### Budget & Finance

| Method | Description |
|--------|-------------|
| `getAdvBalance()` | Get account balance |
| `createBudgetDeposit()` | Deposit to campaign (status 11) |
| `getAdvBudget()` | Get campaign budget |
| `getAdvUpd()` | Get expense history |

### Bidding

| Method | Description |
|--------|-------------|
| `getBidsMinV2()` | Get minimum bids (kopecks) |
| `updateBids()` | Update bids (kopecks) |

### Keywords & Phrases

| Method | Description | Bid Type |
|--------|-------------|----------|
| `setMinusPhrases()` | Set/get minus-words (normquery-based) | all |
| `getMinusPhrases()` | Get minus-words | all |

> The fixed-phrase methods (`getSearchSetPlus`, `createSearchSetPlu`) and `createSearchSetExcluded` / `createAutoSetExcluded` were removed in v4.0.0.

### Statistics

| Method | Description |
|--------|-------------|
| `getAdvFullstats()` | Full campaign statistics (universal — replaces `getStatsKeywords`, `getStatWords`, `getAutoStatWords`) |

## Troubleshooting

### Common Issues

1. **"Validation failed" on budget deposit**
   - Campaign must be in status 11 (paused)
   - Pause the campaign first: `pauseCampaign(id)`

2. **"Validation failed" on excluded/fixed phrases**
   - Campaign must be active (status 9)
   - Start the campaign first

3. **"Authentication failed" on write operations**
   - Check API key has advertising write permissions
   - Request elevated permissions from WB seller portal

4. **Campaign created with status 7 (finished)**
   - Product may not be eligible for advertising
   - Check product availability and stock

5. **Cannot delete campaign**
   - Only campaigns in status 4 (ready) can be deleted
   - Use `getAdvStop()` to finish other campaigns

6. **getAdvFullstats returns null/undefined or hangs**

   ::: danger Common Mistake
   Using optional chaining with nullish coalescing hides errors:
   ```typescript
   // ❌ WRONG - This swallows errors and returns null
   const response = await (sdk.promotion as any).getAdvFullstats?.({...})
     ?? Promise.resolve(null);
   ```
   :::

   **Causes:**
   - Optional chaining `?.` returns undefined if method doesn't exist
   - Nullish coalescing `??` catches that and returns null
   - Rate limit errors (429) are swallowed, not surfaced
   - You never see the actual error

   **Solution:**
   ```typescript
   // ✅ CORRECT - Proper error handling
   try {
     const stats = await sdk.promotion.getAdvFullstats({
       ids: String(campaignId),
       beginDate: '2025-12-16',
       endDate: '2025-12-22'
     });
     console.log(stats);
   } catch (error) {
     if (error instanceof RateLimitError) {
       // Wait and retry - endpoint allows only 3 req/min
       await new Promise(r => setTimeout(r, 21000));
     }
     throw error;
   }
   ```

   **Rate Limits for this endpoint:**
   | Period | Limit | Interval |
   |--------|-------|----------|
   | 1 minute | 3 requests | 20 seconds |

7. **getAdvFullstats returns empty array**
   - Check campaign status is 7, 9, or 11 (method works only for these)
   - Verify date range doesn't exceed 31 days
   - Ensure campaign had activity during the requested period

## TypeScript Type Notes

### Required Parameters in getAdvFullstats()

`getStatsKeywords()` was removed in v4.0.0. Use `getAdvFullstats()` — all parameters are **required**:

```typescript
// CORRECT: All parameters are required
const stats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),  // Required - campaign ID(s), comma-separated string
  beginDate: '2024-01-01',  // Required - start date
  endDate: '2024-01-07'     // Required - end date (max 31 days from start)
});

// WRONG: TypeScript will show error if parameters are missing
// const stats = await sdk.promotion.getAdvFullstats({});  // Error!
```

### Placement Types Array Syntax

The `placement_types` parameter is an **array of strings**, not a union:

```typescript
// CORRECT: Array of placement types
const request = {
  placement_types: ['search', 'recommendation']  // ('search' | 'recommendation')[]
};

// CORRECT: Single element array
const request2 = {
  placement_types: ['search']
};

// WRONG: This is NOT how the type works
// placement_types: 'search'  // Error - must be array
```

### Type Definition Reference

```typescript
// getBidsMinV2 parameter type (V2 — kopecks)
interface BidsMinV2Request {
  advert_id: number;
  nm_ids: number[];
  payment_type: 'cpm' | 'cpc';
  placement_types: ('combined' | 'search' | 'recommendation')[];  // Array!
}

// createCampaign parameter type
interface CreateCampaignRequest {
  name: string;
  nms: number[];
  bid_type: 'manual' | 'unified';
  payment_type: 'cpm' | 'cpc';
  placement_types?: ('search' | 'recommendations')[];  // Optional array
}
```

## WB Marketplace Promotions (Calendar API)

::: tip Promotions ≠ Advertising Campaigns
WB Marketplace **Promotions** are sales events organized by Wildberries (like "Black Friday", "Flash Sales").
They are different from **Advertising Campaigns** that you create and manage.

| Aspect | Promotions | Advertising Campaigns |
|--------|------------|----------------------|
| Creator | Wildberries | Seller |
| API Domain | `dp-calendar-api.wildberries.ru` | `advert-api.wildberries.ru` |
| Purpose | Marketplace-wide sales events | Paid product advertising |
| Cost | Usually free participation | Paid per click/impression |
:::

### Get Available Promotions

```typescript
// Get promotions for a date range
const promotions = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01T00:00:00Z',  // Required - ISO 8601 format
  endDateTime: '2024-12-31T23:59:59Z',    // Required - ISO 8601 format
  allPromo: true,                          // Required - include all promotion types
  limit: 100,                              // Optional - max results
  offset: 0                                // Optional - pagination offset
});

promotions.data?.promotions?.forEach(promo => {
  console.log(`Promotion: ${promo.name}`);
  console.log(`  Type: ${promo.type}`);
  console.log(`  Period: ${promo.startDateTime} - ${promo.endDateTime}`);
});
```

### Get Promotion Details

```typescript
// Get detailed information about specific promotions
const details = await sdk.promotion.getPromotionsDetails({
  promotionIDs: '1854,1852,1851'  // Required - comma-separated IDs
});

details.data?.promotions?.forEach(promo => {
  console.log(`${promo.name}:`);
  console.log(`  Description: ${promo.description}`);
  console.log(`  In promo: ${promo.inPromoActionTotal} products`);
  console.log(`  Not in promo: ${promo.notInPromoActionTotal} products`);
});
```

### Get Products for Promotion

```typescript
// Get products eligible for a specific promotion
const products = await sdk.promotion.getPromotionsNomenclatures({
  promotionID: 1854,     // Required - promotion ID
  inAction: false,       // Required - true=already added, false=can be added
  limit: 100,            // Optional
  offset: 0              // Optional
});

products.data?.nomenclatures?.forEach(nm => {
  console.log(`NM ${nm.nmID}: ${nm.vendorCode}, in promotion: ${nm.inAction}`);
});
```

### Add Products to Promotion

```typescript
// Upload products to a promotion
const result = await sdk.promotion.createPromotionsUpload({
  data: {
    promotionID: 1854,           // Required - promotion ID
    uploadNow: true,             // Required - true=apply now, false=on promo start
    nomenclatures: [123456, 789012]  // Required - product NM IDs to add
  }
});

console.log(`Upload task ID: ${result.data?.uploadID}`);
```

### Calendar API Response Types

```typescript
// getCalendarPromotions response
interface CalendarPromotionsResponse {
  data?: {
    promotions?: Array<{
      id?: number;
      name?: string;
      type?: string;           // 'regular' | 'auto' | 'express'
      startDateTime?: string;  // ISO 8601
      endDateTime?: string;    // ISO 8601
    }>;
  };
}

// getPromotionsDetails response
interface PromotionsDetailsResponse {
  data?: {
    promotions?: Array<{
      id?: number;
      name?: string;
      description?: string;
      startDateTime?: string;
      endDateTime?: string;
      inPromoActionLeftovers?: number;     // Products in promo with stock
      inPromoActionTotal?: number;          // Total products in promo
      notInPromoActionLeftovers?: number;   // Products not in promo with stock
      notInPromoActionTotal?: number;       // Total products not in promo
    }>;
  };
}

// getPromotionsNomenclatures response
interface PromotionsNomenclaturesResponse {
  data?: {
    nomenclatures?: Array<{
      nmID?: number;
      vendorCode?: string;
      inAction?: boolean;
    }>;
  };
}
```

## Complete API Reference

### Campaign Lifecycle Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `startCampaign` | `(id: number) => Promise<void>` | Start campaign |
| `pauseCampaign` | `(id: number) => Promise<void>` | Pause campaign |
| `getAdvStop` | `(options: { id: number }) => Promise<unknown>` | Stop campaign |
| `getAdvDelete` | `(options: { id: number }) => Promise<unknown>` | Delete campaign |
| `createAdvRename` | `(data: { advertId: number; name: string }) => Promise<unknown>` | Rename campaign |

### Budget Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getAdvBalance` | `() => Promise<AdvBalanceResponse>` | Get account balance |
| `getAdvBudget` | `(options: { id: number }) => Promise<BudgetResponse>` | Get campaign budget |
| `createBudgetDeposit` | `(data: BudgetDepositData, options: { id: number }) => Promise<ResponseWithReturn>` | Deposit to campaign |
| `getAdvUpd` | `(options: { from: string; to: string }) => Promise<AdvUpdRecord[]>` | Get expense history |

### Keyword/Phrase Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `setMinusPhrases` | `(request: SetMinusPhrasesRequest) => Promise<void>` | Set minus-phrases (normquery-based) |
| `getMinusPhrases` | `(request: GetMinusPhrasesRequest) => Promise<GetMinusPhrasesResponse>` | Get minus-phrases |
| `getSupplierNms` | `(subjectIds: number[]) => Promise<SupplierNmItem[]>` | Get available products |
| `updateCampaignProducts` | `(data: UpdateCampaignProductsRequest) => Promise<UpdateCampaignProductsResponse>` | Update campaign products |

> The fixed-phrase methods (`getSearchSetPlus`, `createSearchSetPlu`) and the legacy `createSearchSetExcluded` / `createAutoSetExcluded` / `getAutoGetnmtoadd` / `createAutoUpdatenm` were removed in v4.0.0.

### Calendar API Methods

| Method | Signature | Description |
|--------|-----------|-------------|
| `getCalendarPromotions` | `(options: { startDateTime: string; endDateTime: string; allPromo: boolean; limit?: number; offset?: number }) => Promise<CalendarPromotionsResponse>` | Get WB promotions |
| `getPromotionsDetails` | `(options: { promotionIDs: string }) => Promise<PromotionsDetailsResponse>` | Get promotion details |
| `getPromotionsNomenclatures` | `(options: { promotionID: number; inAction: boolean; limit?: number; offset?: number }) => Promise<PromotionsNomenclaturesResponse>` | Get products for promotion |
| `createPromotionsUpload` | `(data: { data: { promotionID: number; uploadNow: boolean; nomenclatures: number[] }}) => Promise<{ data?: { uploadID?: number }}>` | Add products to promotion |

## Breaking Changes (v2.2.3)

::: danger Required Parameters Update
In v2.2.3, many methods changed from **optional** to **required** parameters to match the actual WB API contract. This may cause TypeScript compilation errors in existing code.
:::

### Methods with Changed Signatures

::: warning Several of these methods were later removed in v4.0.0
This table records v2.2.3 signature changes only. The methods marked ⛔ below were **subsequently removed in v4.0.0** and no longer exist — see `docs/guides/migration-v4.md` for their replacements.
:::

| Method | Before (v2.2.2) | After (v2.2.3) |
|--------|-----------------|----------------|
| `getAdvStart` ⛔ | `options?: { id }` | `options: { id }` |
| `getAdvPause` ⛔ | `options?: { id }` | `options: { id }` |
| `getAdvStop` | `options?: { id }` | `options: { id }` |
| `getAdvDelete` | `options?: { id }` | `options: { id }` |
| `getAdvBudget` | `options?: { id }` | `options: { id }` |
| `getSearchSetPlus` ⛔ | `options?: { id; fixed? }` | `options: { id; fixed? }` |
| `getAutoGetnmtoadd` ⛔ | `options?: { id }` | `options: { id }` |
| `createBudgetDeposit` | `options?: { id }` | `options: { id }` |
| `createSearchSetPlu` ⛔ | `options?: { id }` | `options: { id }` |
| `createSearchSetExcluded` ⛔ | `options?: { id }` | `options: { id }` |
| `createAutoSetExcluded` ⛔ | `options?: { id }` | `options: { id }` |
| `createAutoUpdatenm` ⛔ | `options?: { id }` | `options: { id }` |
| `getAdvUpd` | `options?: { from; to }` | `options: { from; to }` |
| `createAdvRename` | `data?: { advertId; name }` | `data: { advertId; name }` |
| `getCalendarPromotions` | `options?: { ... }` | `options: { startDateTime; endDateTime; allPromo; limit?; offset? }` |
| `getPromotionsDetails` | `options?: { promotionIDs }` | `options: { promotionIDs }` |
| `getPromotionsNomenclatures` | `options?: { ... }` | `options: { promotionID; inAction; limit?; offset? }` |

### Migration Guide

```typescript
// Before (v2.2.2) - This would compile but fail at runtime
await sdk.promotion.getAdvBudget();  // ❌ No error, but API returns 400

// After (v2.2.3) - TypeScript catches the error
await sdk.promotion.getAdvBudget();  // ❌ TypeScript error: 'options' is required
await sdk.promotion.getAdvBudget({ id: 12345 });  // ✅ Correct
```

### Calendar API - Typed Responses

Calendar API methods now return typed responses instead of `Promise<unknown>`:

```typescript
// Before (v2.2.2)
const promotions = await sdk.promotion.getCalendarPromotions({...});
// promotions: unknown - no autocomplete

// After (v2.2.3)
const promotions = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01',
  endDateTime: '2024-12-31',
  allPromo: true
});
// promotions.data?.promotions?.forEach(p => p.name) - full autocomplete!
```

### Version History

- **v2.2.3** (December 2024):
  - Made 18 method parameters required (matching WB API contract)
  - Added typed responses for Calendar API methods
  - Fixed JSDoc examples from `sdk.general.*` to `sdk.promotion.*`
  - Added comprehensive Calendar API documentation
- **v2.2.2** (December 2024): Fixed `getStatsKeywords()` parameters to be required; fixed array type definitions for `placement_types`
- **v2.2.1** (December 2024): Fixed `getStatsKeywords()` URL and campaign types documentation

## See Also

- [Tariffs Module](./commissions-fees.md) - For ROI calculations
- [Best Practices](./best-practices.md) - General SDK best practices
- [Troubleshooting](./troubleshooting.md) - Common issues
- [Story 8.3: Promotion Type Fixes](/docs/stories/8.3.promotion-type-fixes.md) - Type definition fixes
- [Story 9.9: SDK Parameter Fixes](/docs/stories/9.9.promotion-sdk-type-fixes.md) - Required parameter fixes
