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
const campaigns = await sdk.promotion.getPromotionCount();
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

::: warning Important: Different Methods for Different Types
Wildberries API uses **different endpoints** for different campaign types:
- **`getAuctionAdverts()`** - for type 9 campaigns ONLY
- **`createPromotionAdvert()`** - for types 4-8 (legacy) campaigns ONLY

There is NO universal method to get details for all campaign types in one call.
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
const campaign = await sdk.promotion.createSeacatSaveAd({
  name: 'Winter Collection 2024',
  nms: [168120815, 173574852], // Product NM IDs (max 50)
  bid_type: 'manual',
  placement_types: ['search']
});

console.log(`Campaign created: ID ${campaign}`);
```

### Get Campaign Information

#### List All Campaigns

```typescript
// Get all campaigns grouped by type and status
const overview = await sdk.promotion.getPromotionCount();

overview.adverts?.forEach(group => {
  console.log(`Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);

  // List campaign IDs
  group.advert_list?.forEach(ad => {
    console.log(`  Campaign ID: ${ad.advertId}`);
  });
});
```

#### Get Details for Type 9 Campaigns (Modern)

```typescript
// Get auction campaigns (type 9)
const auctionCampaigns = await sdk.promotion.getAuctionAdverts({});
auctionCampaigns.adverts?.forEach(campaign => {
  console.log(`Campaign ${campaign.id}: status=${campaign.status}, bid_type=${campaign.bid_type}`);
});

// Filter by status or payment type
const activeCampaigns = await sdk.promotion.getAuctionAdverts({
  statuses: '9',        // Active only
  payment_type: 'cpm'   // CPM campaigns
});

// Get specific campaigns by IDs
const specificCampaigns = await sdk.promotion.getAuctionAdverts({
  ids: '12345,67890'    // Max 50 IDs
});
```

#### Get Details for Legacy Campaigns (Types 4-8)

::: warning Method Name Confusion
`createPromotionAdvert()` does NOT create campaigns - it RETRIEVES information about legacy campaigns.
This naming is generated from the Swagger spec and can be confusing.
:::

```typescript
// Get details for legacy campaigns (types 4-8)
const legacyDetails = await sdk.promotion.createPromotionAdvert(
  [12345, 67890],     // Array of campaign IDs (max 50)
  {
    status: 9,        // Filter by status (optional)
    type: 8,          // Filter by type (optional)
    order: 'change',  // Sort by: 'create', 'change', 'id'
    direction: 'desc' // Sort direction: 'asc' or 'desc'
  }
);

console.log('Legacy campaign details:', legacyDetails);
```

#### Complete Workflow: Get ALL Campaign Details

```typescript
async function getAllCampaignDetails(sdk: WildberriesSDK) {
  // Step 1: Get list of ALL campaigns
  const allCampaigns = await sdk.promotion.getPromotionCount();

  // Step 2: Separate by type
  const type9Ids: number[] = [];
  const legacyIds: number[] = [];

  allCampaigns.adverts?.forEach(group => {
    group.advert_list?.forEach(advert => {
      if (group.type === 9) {
        type9Ids.push(advert.advertId!);
      } else if (group.type && group.type >= 4 && group.type <= 8) {
        legacyIds.push(advert.advertId!);
      }
    });
  });

  console.log(`Found ${type9Ids.length} type 9 campaigns (modern)`);
  console.log(`Found ${legacyIds.length} legacy campaigns (types 4-8)`);

  // Step 3: Get details for type 9 campaigns
  if (type9Ids.length > 0) {
    const type9Details = await sdk.promotion.getAuctionAdverts({
      ids: type9Ids.slice(0, 50).join(',')  // Max 50 IDs per request
    });
    console.log('Type 9 campaign details:', type9Details);
  }

  // Step 4: Get details for legacy campaigns
  if (legacyIds.length > 0) {
    const legacyDetails = await sdk.promotion.createPromotionAdvert(
      legacyIds.slice(0, 50)  // Max 50 IDs per request
    );
    console.log('Legacy campaign details:', legacyDetails);
  }
}
```

### Campaign Control Methods

```typescript
// Start campaign (requires status 4 or 11 + budget)
await sdk.promotion.getAdvStart({ id: campaignId });

// Pause campaign (only for status 9 - active)
await sdk.promotion.getAdvPause({ id: campaignId });

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
await sdk.promotion.getAdvPause({ id: campaignId });

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
// Get minimum bids for products in a campaign
const minBids = await sdk.promotion.createBidsMin({
  advert_id: campaignId,
  nm_ids: [168120815, 173574852],
  payment_type: 'cpm',  // 'cpm' (per 1000 views) or 'cpc' (per click)
  placement_types: ['search']
});

minBids.forEach(bid => {
  console.log(`NM ${bid.nm_id}: min bid = ${bid.bid}₽`);
});
```

### Update Bids for Unified Bid Campaigns

```typescript
// For campaigns with unified bid (bid_type: 'unified')
await sdk.promotion.updateAdvBid({
  bids: [{
    advert_id: campaignId,
    bid: 280  // CPM bid in rubles
  }]
});
```

### Update Bids for Manual Bid Campaigns

```typescript
// For campaigns with manual bid (bid_type: 'manual')
await sdk.promotion.updateAuctionBid({
  bids: [{
    advert_id: campaignId,
    nm_bids: [{
      nm_id: 168120815,
      bid: 280,
      placement: 'search'  // or 'recommendations', 'combined'
    }]
  }]
});
```

## Keyword/Phrase Management

### Excluded Phrases (Minus-words) for Manual Bid

> **Important**: These methods require campaign to be active (status 9).

```typescript
// Set excluded phrases
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['cheap', 'discount', 'used'] },
  { id: campaignId }
);

// Clear all excluded phrases
await sdk.promotion.createSearchSetExcluded(
  { excluded: [] },
  { id: campaignId }
);
```

### Excluded Phrases for Unified Bid

```typescript
// Set excluded phrases for unified bid campaign
await sdk.promotion.createAutoSetExcluded(
  { excluded: ['cheap', 'discount'] },
  { id: campaignId }
);
```

### Fixed Phrases (for Manual Bid)

Fixed phrases ensure your product appears only for specific search queries.

```typescript
// Get fixed phrases activity status
const activity = await sdk.promotion.getSearchSetPlus({ id: campaignId });

// Set fixed phrases (phrases must exist in campaign's keyword list)
await sdk.promotion.createSearchSetPlu(
  { pluse: ['winter jacket', 'warm coat'] },
  { id: campaignId }
);

// Remove all fixed phrases
await sdk.promotion.createSearchSetPlu(
  { pluse: [] },
  { id: campaignId }
);

// Toggle fixed phrases activity (true = active, false = inactive)
await sdk.promotion.getSearchSetPlus({
  id: campaignId,
  fixed: true
});
```

## Campaign Statistics

### Keyword Statistics (Last 7 Days)

```typescript
const to = new Date();
const from = new Date();
from.setDate(from.getDate() - 7);

const stats = await sdk.promotion.getStatsKeywords({
  advert_id: campaignId,
  from: from.toISOString().split('T')[0],
  to: to.toISOString().split('T')[0]
});

stats.keywords?.forEach(day => {
  console.log(`\nDate: ${day.date}`);
  day.stats?.forEach(kw => {
    console.log(`  "${kw.keyword}": views=${kw.views}, clicks=${kw.clicks}, sum=${kw.sum}₽`);
  });
});
```

### Keyword Stats for Manual Bid Campaigns

```typescript
const manualStats = await sdk.promotion.getStatWords({ id: campaignId });

if (manualStats.stat) {
  manualStats.stat.forEach(s => {
    console.log(`"${s.keyword}": views=${s.views}, clicks=${s.clicks}, ctr=${s.ctr}%`);
  });
}
```

### Cluster Stats for Unified Bid Campaigns

```typescript
const unifiedStats = await sdk.promotion.getAutoStatWords({ id: campaignId });

if (unifiedStats.clusters) {
  unifiedStats.clusters.forEach(c => {
    console.log(`Cluster "${c.cluster}": ${c.count} keywords`);
  });
}

if (unifiedStats.excluded) {
  console.log(`Excluded phrases: ${unifiedStats.excluded.length}`);
}
```

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
    campaignId = await sdk.promotion.createSeacatSaveAd({
      name: 'SDK Test Campaign',
      nms: [168120815],
      bid_type: 'manual',
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
    const minBids = await sdk.promotion.createBidsMin({
      advert_id: campaignId,
      nm_ids: [168120815],
      payment_type: 'cpm',
      placement_types: ['search']
    });
    console.log(`Minimum bid: ${minBids[0]?.bid || 'N/A'}₽`);
    await delay(RATE_LIMIT_DELAY);

    // 5. Start campaign
    await sdk.promotion.getAdvStart({ id: campaignId });
    console.log('Campaign started!');

    // 6. Monitor (in real scenario, poll periodically)
    // ... campaign runs ...

  } finally {
    // Cleanup: Delete test campaign
    if (campaignId) {
      try {
        await sdk.promotion.getAdvPause({ id: campaignId });
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
  await sdk.promotion.getAdvStart({ id: campaignId });
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

::: tip Campaign Types Quick Reference
- **Type 9** (current): Use `getAuctionAdverts()`
- **Types 4-8** (legacy): Use `createPromotionAdvert()`
:::

| Method | API Endpoint | Campaign Types | Description |
|--------|--------------|----------------|-------------|
| `getPromotionCount()` | `GET /adv/v1/promotion/count` | **ALL** | List all campaigns with IDs |
| `getAuctionAdverts()` | `GET /adv/v0/auction/adverts` | **9 only** | Get details for modern campaigns |
| `createPromotionAdvert()` | `POST /adv/v1/promotion/adverts` | **4-8 only** | Get details for legacy campaigns |

### Campaign Management

| Method | Description | Required Status |
|--------|-------------|-----------------|
| `createSeacatSaveAd()` | Create campaign (type 9) | - |
| `getAdvStart()` | Start campaign | 4 or 11 |
| `getAdvPause()` | Pause campaign | 9 |
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
| `createBidsMin()` | Get minimum bids |
| `updateAdvBid()` | Update unified bid |
| `updateAuctionBid()` | Update manual bids |

### Keywords & Phrases

| Method | Description | Bid Type |
|--------|-------------|----------|
| `createSearchSetExcluded()` | Set minus-words | manual |
| `createAutoSetExcluded()` | Set minus-words | unified |
| `getSearchSetPlus()` | Get/toggle fixed phrases | manual |
| `createSearchSetPlu()` | Set fixed phrases | manual |

### Statistics

| Method | Description |
|--------|-------------|
| `getStatsKeywords()` | Keyword stats (7 days) |
| `getStatWords()` | Keyword stats (manual bid) |
| `getAutoStatWords()` | Cluster stats (unified bid) |
| `getAdvFullstats()` | Full campaign statistics |

## Troubleshooting

### Common Issues

1. **"Validation failed" on budget deposit**
   - Campaign must be in status 11 (paused)
   - Pause the campaign first: `getAdvPause({ id })`

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

### Required Parameters in getStatsKeywords()

All parameters are **required** - this matches the WB API contract:

```typescript
// CORRECT: All parameters are required
const stats = await sdk.promotion.getStatsKeywords({
  advert_id: campaignId,  // Required - campaign ID
  from: '2024-01-01',     // Required - start date
  to: '2024-01-07'        // Required - end date (max 7 days from start)
});

// WRONG: TypeScript will show error if parameters are missing
// const stats = await sdk.promotion.getStatsKeywords({});  // Error!
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
// createBidsMin parameter type
interface BidsMinRequest {
  advert_id: number;
  nm_ids: number[];
  payment_type: 'cpm' | 'cpc';
  placement_types: ('combined' | 'search' | 'recommendation')[];  // Array!
}

// createSeacatSaveAd parameter type
interface SeacatSaveAdRequest {
  name: string;
  nms: number[];
  bid_type: 'manual' | 'unified';
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
| `getAdvStart` | `(options: { id: number }) => Promise<unknown>` | Start campaign |
| `getAdvPause` | `(options: { id: number }) => Promise<unknown>` | Pause campaign |
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
| `getSearchSetPlus` | `(options: { id: number; fixed?: boolean }) => Promise<unknown>` | Get/toggle fixed phrases |
| `createSearchSetPlu` | `(data: { pluse?: string[] }, options: { id: number }) => Promise<string[]>` | Set fixed phrases |
| `createSearchSetExcluded` | `(data: { excluded?: string[] }, options: { id: number }) => Promise<unknown>` | Set minus-phrases (manual) |
| `createAutoSetExcluded` | `(data: { excluded?: string[] }, options: { id: number }) => Promise<unknown>` | Set minus-phrases (unified) |
| `getAutoGetnmtoadd` | `(options: { id: number }) => Promise<number[]>` | Get available products |
| `createAutoUpdatenm` | `(data: { add?: number[]; delete?: number[] }, options: { id: number }) => Promise<unknown>` | Update campaign products |

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

| Method | Before (v2.2.2) | After (v2.2.3) |
|--------|-----------------|----------------|
| `getAdvStart` | `options?: { id }` | `options: { id }` |
| `getAdvPause` | `options?: { id }` | `options: { id }` |
| `getAdvStop` | `options?: { id }` | `options: { id }` |
| `getAdvDelete` | `options?: { id }` | `options: { id }` |
| `getAdvBudget` | `options?: { id }` | `options: { id }` |
| `getSearchSetPlus` | `options?: { id; fixed? }` | `options: { id; fixed? }` |
| `getAutoGetnmtoadd` | `options?: { id }` | `options: { id }` |
| `createBudgetDeposit` | `options?: { id }` | `options: { id }` |
| `createSearchSetPlu` | `options?: { id }` | `options: { id }` |
| `createSearchSetExcluded` | `options?: { id }` | `options: { id }` |
| `createAutoSetExcluded` | `options?: { id }` | `options: { id }` |
| `createAutoUpdatenm` | `options?: { id }` | `options: { id }` |
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
