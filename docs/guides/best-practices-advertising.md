---
title: "Advertising Campaign Best Practices"
description: "Complete guide to managing Wildberries advertising campaigns effectively — campaign lifecycle, budget optimization, bid strategies, keyword management, and performance monitoring"
layout: doc
---

# Advertising Campaign Best Practices

Complete guide to managing Wildberries advertising campaigns using the SDK — from campaign creation to performance optimization.

**Target Audience**: E-commerce developers building advertising management tools for Wildberries marketplace
**Prerequisites**: Basic SDK setup, familiarity with TypeScript and async/await
**Estimated Reading Time**: 30 minutes

---

## Table of Contents

1. [Campaign Architecture](#campaign-architecture)
2. [Campaign Lifecycle Best Practices](#campaign-lifecycle-best-practices)
3. [Budget Management](#budget-management)
4. [Bid Optimization](#bid-optimization)
5. [Keyword & Phrase Management](#keyword-phrase-management)
6. [Campaign Statistics & Monitoring](#campaign-statistics-monitoring)
7. [WB Marketplace Promotions](#wb-marketplace-promotions)
8. [Rate Limit Strategy](#rate-limit-strategy)
9. [Error Handling & Troubleshooting](#error-handling-troubleshooting)
10. [Complete Workflow Example](#complete-workflow-example)

---

## Campaign Architecture

### Campaign Types

| Type | Description | Status |
|------|-------------|--------|
| `4` | In catalog | **Deprecated** |
| `5` | In product card | **Deprecated** |
| `6` | In search | **Deprecated** |
| `7` | In recommendations | **Deprecated** |
| `8` | Unified bid | **Deprecated** |
| `9` | Unified or manual bid | **Current** |

::: warning Types 4–8 Are Legacy
All new campaigns should use type `9`. Types 4–8 are deprecated and use different API endpoints. Use `getAuctionAdverts()` for type 9 and `createPromotionAdvert()` for legacy types.
:::

### Campaign Statuses

| Status | Code | Description |
|--------|------|-------------|
| Ready | `4` | Campaign created, ready to launch |
| Finished | `7` | Campaign ended |
| Cancelled | `8` | Campaign cancelled |
| Active | `9` | Campaign is running |
| Paused | `11` | Campaign on pause |
| Deleting | `-1` | Campaign being deleted (3–10 min) |

### Bid Types

| Bid Type | Description | Use Case |
|----------|-------------|----------|
| `manual` | Set bids per product and placement individually | Fine-grained control over spend |
| `unified` | Single bid for all products and placements | Simpler management, broader reach |

### Placement Types

| Placement | Description |
|-----------|-------------|
| `search` | Ads in search results |
| `recommendations` | Ads in recommendation blocks |
| `combined` | Both search and recommendations |

### Status Transition Diagram

```
┌─────────┐     start      ┌────────┐
│  Ready  │ ──────────────> │ Active │
│   (4)   │                 │   (9)  │
└────┬────┘                 └───┬────┘
     │                          │
     │ delete                   │ pause
     ▼                          ▼
┌──────────┐             ┌─────────┐
│ Deleting │             │ Paused  │
│   (-1)   │             │  (11)   │
└──────────┘             └────┬────┘
                              │
     ┌────────────────────────┤ start
     │                        │
     │      stop              ▼
     │    ◄───────────────────┘
     ▼
┌──────────┐
│ Finished │
│   (7)    │
└──────────┘
```

---

## Campaign Lifecycle Best Practices

### Pre-Launch Checklist

Before creating a campaign:

1. **Check account balance** — ensure sufficient funds
2. **Verify products** — products must be in stock and eligible for advertising
3. **Choose bid type** — `manual` for granular control, `unified` for simplicity
4. **Choose placement** — `search` for purchase-intent traffic, `recommendations` for discovery

### Creating a Campaign

```typescript
import { WildberriesSDK, RateLimitError, ValidationError } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Step 1: Check balance before creating
const balance = await sdk.promotion.getAdvBalance();
console.log(`Available balance: ${balance.net}₽`);

if (balance.net < 500) {
  throw new Error('Insufficient balance for advertising');
}

// Step 2: Create campaign
const campaignId = await sdk.promotion.createSeacatSaveAd({
  name: 'Winter Collection 2026',
  nms: [168120815, 173574852], // Product NM IDs (max 50)
  bid_type: 'manual',
  placement_types: ['search']
});

console.log(`Campaign created: ID ${campaignId}`);
```

### Launch Sequence

The correct sequence is: **Create → Deposit Budget → Start**.

```typescript
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

// 1. Create campaign (returns in status 4 = Ready)
const campaignId = await sdk.promotion.createSeacatSaveAd({
  name: 'Spring Sale 2026',
  nms: [168120815],
  bid_type: 'unified',
  placement_types: ['search', 'recommendations']
});
await delay(5000);

// 2. Deposit budget (campaign must be in status 4 or 11)
await sdk.promotion.createBudgetDeposit(
  { sum: 1000, type: 1 }, // type: 0=account, 1=cabinet balance, 3=bonus
  { id: campaignId as number }
);
await delay(5000);

// 3. Start campaign (moves from status 4 → 9)
await sdk.promotion.getAdvStart({ id: campaignId as number });
console.log('Campaign launched!');
```

### Campaign Control Methods

```typescript
// Pause active campaign (status 9 → 11)
await sdk.promotion.getAdvPause({ id: campaignId });

// Resume paused campaign (status 11 → 9)
await sdk.promotion.getAdvStart({ id: campaignId });

// Stop campaign permanently (status 4/9/11 → 7)
await sdk.promotion.getAdvStop({ id: campaignId });

// Delete campaign (status 4 only → -1)
await sdk.promotion.getAdvDelete({ id: campaignId });

// Rename campaign (any status)
await sdk.promotion.createAdvRename({
  advertId: campaignId,
  name: 'Updated Campaign Name'
});
```

::: danger Status Requirements
- **Budget deposit**: Campaign must be paused (status `11`) or ready (status `4`)
- **Delete**: Only works for status `4` (Ready). Active campaigns must be stopped first.
- **Phrase management**: Campaign must be active (status `9`)
:::

### Listing All Campaigns

```typescript
// Get all campaigns grouped by type and status
const overview = await sdk.promotion.getPromotionCount();
console.log(`Total campaigns: ${overview.all}`);

overview.adverts?.forEach(group => {
  console.log(`Type ${group.type}, Status ${group.status}: ${group.count} campaigns`);
  group.advert_list?.forEach(ad => {
    console.log(`  ID: ${ad.advertId}, Last changed: ${ad.changeTime}`);
  });
});
```

### Getting Campaign Details

```typescript
// Type 9 campaigns (modern)
const type9Details = await sdk.promotion.getAuctionAdverts({
  statuses: '9',      // Filter: active only
  payment_type: 'cpm' // Filter: CPM campaigns
});

// Legacy campaigns (types 4–8)
// Note: method name is misleading — it RETRIEVES data, not creates
const legacyDetails = await sdk.promotion.createPromotionAdvert(
  [12345, 67890], // Campaign IDs (max 50)
  { status: 9, order: 'change', direction: 'desc' }
);
```

::: warning Method Name Confusion
`createPromotionAdvert()` does NOT create campaigns — it retrieves information about legacy campaigns (types 4–8). This naming comes from the Swagger spec (POST method mapped to a GET-like operation).
:::

---

## Budget Management

### Checking Account Balance

```typescript
const balance = await sdk.promotion.getAdvBalance();
console.log(`Account balance (счёт): ${balance.balance}₽`);
console.log(`Cabinet balance (кабинет): ${balance.net}₽`);
console.log(`Bonus: ${balance.bonus}₽`);

if (balance.cashbacks?.length) {
  balance.cashbacks.forEach(cb => {
    console.log(`Cashback: ${cb.percent}% (max ${cb.sum}₽)`);
  });
}
```

### Depositing Budget

::: tip Best Practice
Always pause the campaign before depositing budget to avoid race conditions.
:::

```typescript
// Pause campaign first
await sdk.promotion.getAdvPause({ id: campaignId });
await delay(2000);

// Deposit 1000₽ from cabinet balance
await sdk.promotion.createBudgetDeposit(
  {
    sum: 1000,
    type: 1  // 0 = account (счёт), 1 = cabinet (баланс), 3 = bonus
  },
  { id: campaignId }
);

// Verify budget
const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
console.log(`Campaign budget: cash=${budget.cash}₽, netting=${budget.netting}₽, total=${budget.total}₽`);

// Resume campaign
await sdk.promotion.getAdvStart({ id: campaignId });
```

### Expense Tracking

```typescript
const to = new Date();
const from = new Date();
from.setDate(from.getDate() - 30);

// Get expense history (УПД)
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

// Get payment (top-up) history
const payments = await sdk.promotion.getAdvPayments({
  from: from.toISOString().split('T')[0],
  to: to.toISOString().split('T')[0]
});
```

### Budget Monitoring Function

```typescript
async function monitorBudget(sdk: WildberriesSDK, campaignId: number, threshold: number) {
  const budget = await sdk.promotion.getAdvBudget({ id: campaignId });

  if (budget.total < threshold) {
    console.warn(`⚠️ Campaign ${campaignId} budget low: ${budget.total}₽ (threshold: ${threshold}₽)`);

    // Auto-deposit from cabinet balance
    const balance = await sdk.promotion.getAdvBalance();
    if (balance.net >= 500) {
      await sdk.promotion.getAdvPause({ id: campaignId });
      await delay(2000);
      await sdk.promotion.createBudgetDeposit(
        { sum: 500, type: 1 },
        { id: campaignId }
      );
      await sdk.promotion.getAdvStart({ id: campaignId });
      console.log(`✅ Deposited 500₽ to campaign ${campaignId}`);
    } else {
      console.error(`❌ Insufficient cabinet balance: ${balance.net}₽`);
    }
  }
}
```

---

## Bid Optimization

### Getting Minimum Bids

Before setting bids, check the minimum required:

```typescript
const minBids = await sdk.promotion.createBidsMin({
  advert_id: campaignId,
  nm_ids: [168120815, 173574852],
  payment_type: 'cpm',  // 'cpm' (per 1000 impressions) or 'cpc' (per click)
  placement_types: ['search']
});

minBids.forEach(bid => {
  console.log(`Product ${bid.nm_id}: min bid = ${bid.bid}₽`);
});
```

### Updating Unified Bids

For campaigns with `bid_type: 'unified'`:

```typescript
await sdk.promotion.updateAdvBid({
  bids: [{
    advert_id: campaignId,
    bid: 280  // CPM bid in rubles
  }]
});
```

### Updating Manual Bids

For campaigns with `bid_type: 'manual'` — set per-product, per-placement bids:

```typescript
await sdk.promotion.updateAuctionBid({
  bids: [{
    advert_id: campaignId,
    nm_bids: [
      {
        nm_id: 168120815,
        bid: 300,
        placement: 'search'
      },
      {
        nm_id: 168120815,
        bid: 200,
        placement: 'recommendations'
      },
      {
        nm_id: 173574852,
        bid: 250,
        placement: 'search'
      }
    ]
  }]
});
```

### CPM vs CPC Strategy

| Strategy | When to Use | Advantage |
|----------|-------------|-----------|
| **CPM** (cost per 1000 impressions) | Brand awareness, new products | Predictable cost, maximum visibility |
| **CPC** (cost per click) | Performance campaigns, proven products | Pay only for engagement |

::: tip Bid Optimization Strategy
1. Start with minimum bids to test performance
2. Monitor CTR and conversion for 3–5 days
3. Increase bids gradually for high-performing products
4. Reduce or pause bids for products with low ROAS
:::

---

## Keyword & Phrase Management

::: warning Active Campaign Required
Keyword and phrase management methods require the campaign to be in **active** status (`9`). Start the campaign before modifying keywords.
:::

### Excluded Phrases (Minus-Words)

Remove irrelevant search queries to improve ad targeting:

```typescript
// For manual bid campaigns
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['cheap', 'discount', 'used', 'broken'] },
  { id: campaignId }
);

// For unified bid campaigns
await sdk.promotion.createAutoSetExcluded(
  { excluded: ['cheap', 'discount'] },
  { id: campaignId }
);

// Clear all excluded phrases
await sdk.promotion.createSearchSetExcluded(
  { excluded: [] },
  { id: campaignId }
);
```

### Fixed Phrases (Manual Bid Only)

Lock your ads to specific search queries:

```typescript
// Set fixed phrases
await sdk.promotion.createSearchSetPlu(
  { pluse: ['winter jacket men', 'warm coat'] },
  { id: campaignId }
);

// Check fixed phrases activity
const activity = await sdk.promotion.getSearchSetPlus({ id: campaignId });

// Toggle fixed phrases on/off
await sdk.promotion.getSearchSetPlus({
  id: campaignId,
  fixed: true  // true = active, false = inactive
});

// Remove all fixed phrases
await sdk.promotion.createSearchSetPlu(
  { pluse: [] },
  { id: campaignId }
);
```

### Managing Products in Campaign

```typescript
// Get products available to add
const available = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });
console.log(`Available products: ${available.length}`);

// Add/remove products
await sdk.promotion.createAutoUpdatenm(
  {
    add: [168120815, 173574852],    // Add these products
    delete: [111111111]              // Remove this product
  },
  { id: campaignId }
);
```

### Keyword Refinement Workflow

::: tip Iterative Keyword Optimization
1. Launch campaign with broad targeting (no fixed phrases)
2. After 3–5 days, check `getStatsKeywords()` for keyword performance
3. Add low-performing keywords to excluded phrases
4. Optionally lock top-performing keywords as fixed phrases
5. Repeat every 1–2 weeks
:::

---

## Campaign Statistics & Monitoring

### Full Campaign Statistics

::: danger Strict Rate Limit
`getAdvFullstats()` allows only **3 requests per minute** with **20-second intervals**. Exceeding this will result in 429 errors.
:::

```typescript
const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),     // Comma-separated, max 100 IDs
  beginDate: '2026-01-01',
  endDate: '2026-01-31'        // Max 31 days from beginDate
});

fullStats.forEach(stat => {
  console.log(`Campaign ${stat.advertId}:`);
  console.log(`  Views: ${stat.views}`);
  console.log(`  Clicks: ${stat.clicks}`);
  console.log(`  CTR: ${stat.ctr}%`);
  console.log(`  CPC: ${stat.cpc}₽`);
  console.log(`  Orders: ${stat.orders}`);
  console.log(`  Add to cart: ${stat.atbs}`);
  console.log(`  Conversion: ${stat.cr}%`);
  console.log(`  Total spent: ${stat.sum}₽`);
});
```

### SKU-Level Performance Drill-Down

The response has a nested structure: `campaign → days[] → apps[] → nms[]`.

```typescript
const PLATFORMS: Record<number, string> = {
  1: 'Website',
  32: 'Android',
  64: 'iOS'
};

interface SkuMetrics {
  nmId: number;
  name: string;
  clicks: number;
  views: number;
  orders: number;
  spent: number;
}

const skuMap = new Map<number, SkuMetrics>();

for (const campaign of fullStats) {
  for (const day of campaign.days) {
    for (const app of day.apps) {
      for (const nm of app.nms) {
        const existing = skuMap.get(nm.nmId) || {
          nmId: nm.nmId,
          name: nm.name,
          clicks: 0, views: 0, orders: 0, spent: 0
        };
        existing.clicks += nm.clicks;
        existing.views += nm.views;
        existing.orders += nm.orders;
        existing.spent += nm.sum;
        skuMap.set(nm.nmId, existing);
      }
    }
  }
}

for (const [nmId, metrics] of skuMap) {
  const cpa = metrics.orders > 0 ? (metrics.spent / metrics.orders).toFixed(2) : 'N/A';
  console.log(`SKU ${nmId} (${metrics.name}): ${metrics.clicks} clicks, ${metrics.orders} orders, ${metrics.spent}₽ spent, CPA=${cpa}₽`);
}
```

### Keyword Statistics

```typescript
// Keyword performance for last 7 days
const kwStats = await sdk.promotion.getStatsKeywords({
  advert_id: campaignId,
  from: '2026-01-25',
  to: '2026-01-31'     // Max 7 days range
});

kwStats.keywords?.forEach(day => {
  console.log(`\nDate: ${day.date}`);
  day.stats?.forEach(kw => {
    console.log(`  "${kw.keyword}": views=${kw.views}, clicks=${kw.clicks}, spend=${kw.sum}₽`);
  });
});
```

### Bid-Type-Specific Stats

```typescript
// Manual bid campaigns — keyword-level stats
const manualStats = await sdk.promotion.getStatWords({ id: campaignId });
manualStats.stat?.forEach(s => {
  console.log(`"${s.keyword}": views=${s.views}, clicks=${s.clicks}, ctr=${s.ctr}%`);
});

// Unified bid campaigns — cluster-level stats
const unifiedStats = await sdk.promotion.getAutoStatWords({ id: campaignId });
unifiedStats.clusters?.forEach(c => {
  console.log(`Cluster "${c.cluster}": ${c.count} keywords`);
});
if (unifiedStats.excluded) {
  console.log(`Excluded phrases: ${unifiedStats.excluded.length}`);
}
```

### Rate-Limit-Safe Polling Pattern

```typescript
const SAFE_DELAY = 21000; // 21 seconds between requests

async function getStatsForCampaigns(sdk: WildberriesSDK, campaignIds: number[], period: { start: string; end: string }) {
  const results = [];

  // Batch: up to 100 IDs per request
  for (let i = 0; i < campaignIds.length; i += 100) {
    const batch = campaignIds.slice(i, i + 100);

    try {
      const stats = await sdk.promotion.getAdvFullstats({
        ids: batch.join(','),
        beginDate: period.start,
        endDate: period.end
      });
      results.push(...stats);
    } catch (error) {
      if (error instanceof RateLimitError) {
        console.log(`Rate limited, waiting ${error.retryAfter}ms`);
        await delay(error.retryAfter);
        i -= 100; // Retry this batch
        continue;
      }
      throw error;
    }

    // Wait between batches
    if (i + 100 < campaignIds.length) {
      await delay(SAFE_DELAY);
    }
  }

  return results;
}
```

---

## WB Marketplace Promotions

::: info Promotions ≠ Advertising Campaigns
WB **Marketplace Promotions** are sales events organized by Wildberries (e.g., "Black Friday", "Flash Sales"). They are different from **Advertising Campaigns** that sellers create and manage.

| Aspect | Promotions | Advertising |
|--------|------------|-------------|
| Creator | Wildberries | Seller |
| API Domain | `dp-calendar-api.wildberries.ru` | `advert-api.wildberries.ru` |
| Purpose | Marketplace-wide sales events | Paid product advertising |
| Cost | Usually free participation | Paid per click/impression |
:::

### Working with Promotions Calendar

```typescript
// Get available promotions for a date range
const promotions = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2026-01-01T00:00:00Z',
  endDateTime: '2026-12-31T23:59:59Z',
  allPromo: true,
  limit: 100,
  offset: 0
});

promotions.data?.promotions?.forEach(promo => {
  console.log(`${promo.name} (${promo.type}): ${promo.startDateTime} — ${promo.endDateTime}`);
});
```

### Get Promotion Details

```typescript
const details = await sdk.promotion.getPromotionsDetails({
  promotionIDs: '1854,1852,1851'
});

details.data?.promotions?.forEach(promo => {
  console.log(`${promo.name}:`);
  console.log(`  In promo: ${promo.inPromoActionTotal} products`);
  console.log(`  Available: ${promo.notInPromoActionTotal} products`);
});
```

### Add Products to Promotions

```typescript
// Check eligible products first
const eligible = await sdk.promotion.getPromotionsNomenclatures({
  promotionID: 1854,
  inAction: false,  // false = not yet added, can be added
  limit: 100,
  offset: 0
});

console.log(`Eligible products: ${eligible.data?.nomenclatures?.length}`);

// Add products
const result = await sdk.promotion.createPromotionsUpload({
  data: {
    promotionID: 1854,
    uploadNow: true,        // true = apply now, false = on promo start
    nomenclatures: [123456, 789012]
  }
});
console.log(`Upload task: ${result.data?.uploadID}`);
```

::: tip Combine Promotions with Advertising
Participating in WB marketplace promotions while running advertising campaigns can amplify visibility. Products in promotions get organic boosts — adding paid advertising on top increases conversions.
:::

---

## Rate Limit Strategy

### Rate Limits Reference

| Method | Rate Limit | Interval |
|--------|------------|----------|
| Most campaign operations | 5 req/sec | 200ms |
| `createSeacatSaveAd()` | 5 req/min | 12s |
| `getAdvConfig()` | 1 req/min | 60s |
| `createBudgetDeposit()` | 1 req/sec | 1s |
| `getAdvFullstats()` | 3 req/min | 20s |
| `createAdvStat()` | 1 req/min | 60s |
| `createBidsMin()` | 20 req/min | 3s |
| `getStatsKeywords()` | 240 req/min | — |
| `getStatWords()` | 240 req/min | — |
| `getAutoStatWords()` | 240 req/min | — |
| `getAdvBalance()` | 60 req/min | — |
| `getAdvBudget()` | 240 req/min | — |
| `getPromotionCount()` | 300 req/min | — |
| `getAuctionAdverts()` | 300 req/min | — |

### Rate Limit Error Handling

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

async function safeApiCall<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof RateLimitError) {
        const waitTime = error.retryAfter || 21000;
        console.log(`Rate limited (attempt ${attempt + 1}), waiting ${waitTime}ms`);
        await delay(waitTime);
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}

// Usage
const stats = await safeApiCall(() =>
  sdk.promotion.getAdvFullstats({
    ids: '12345',
    beginDate: '2026-01-01',
    endDate: '2026-01-31'
  })
);
```

---

## Error Handling & Troubleshooting

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Validation error on budget deposit | Campaign not in status 11 | Pause campaign first: `getAdvPause()` |
| Validation error on phrases | Campaign not active (status 9) | Start campaign first: `getAdvStart()` |
| Auth error on write operations | API key lacks advertising permissions | Request elevated permissions from WB portal |
| Campaign created with status 7 | Product not eligible for advertising | Check product availability and stock |
| Cannot delete campaign | Campaign not in status 4 | Use `getAdvStop()` first |
| `getAdvFullstats()` returns empty array | Campaign had no activity in period | Verify dates and campaign status (7/9/11) |
| Rate limit 429 errors | Too many requests | Implement delays (see Rate Limit Strategy) |

### Comprehensive Error Handling

```typescript
import {
  WildberriesSDK,
  ValidationError,
  AuthenticationError,
  RateLimitError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function safeCampaignOperation(sdk: WildberriesSDK, campaignId: number) {
  try {
    await sdk.promotion.getAdvStart({ id: campaignId });
    console.log('Campaign started');
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(`Invalid operation: ${error.message}`);
      // Check campaign status and retry with correct state
    } else if (error instanceof AuthenticationError) {
      console.error('API key lacks required permissions');
      // Alert admin about permission issue
    } else if (error instanceof RateLimitError) {
      console.error(`Rate limited, retry after ${error.retryAfter}ms`);
      await delay(error.retryAfter);
      // Retry the operation
    } else if (error instanceof NetworkError) {
      console.error('Network error, check connectivity');
      // Implement retry with exponential backoff
    } else if (error instanceof WBAPIError) {
      console.error(`API error ${error.statusCode}: ${error.message}`);
    } else {
      throw error;
    }
  }
}
```

---

## Complete Workflow Example

End-to-end campaign management with proper error handling and rate limiting:

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  ValidationError
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

async function runCampaignWorkflow() {
  let campaignId: number | null = null;

  try {
    // ── Step 1: Check Balance ──
    const balance = await sdk.promotion.getAdvBalance();
    console.log(`\n=== Account Balance ===`);
    console.log(`Cabinet: ${balance.net}₽, Bonus: ${balance.bonus}₽`);
    if (balance.net < 1000) {
      throw new Error(`Insufficient balance: ${balance.net}₽ (need 1000₽)`);
    }
    await delay(1000);

    // ── Step 2: Create Campaign ──
    console.log(`\n=== Creating Campaign ===`);
    campaignId = await sdk.promotion.createSeacatSaveAd({
      name: 'SDK Best Practices Demo',
      nms: [168120815],
      bid_type: 'manual',
      placement_types: ['search']
    }) as number;
    console.log(`Created campaign: ${campaignId}`);
    await delay(5000);

    // ── Step 3: Deposit Budget ──
    console.log(`\n=== Depositing Budget ===`);
    await sdk.promotion.createBudgetDeposit(
      { sum: 1000, type: 1 },
      { id: campaignId }
    );
    const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
    console.log(`Budget: ${budget.total}₽`);
    await delay(5000);

    // ── Step 4: Check Minimum Bids ──
    console.log(`\n=== Checking Bids ===`);
    const minBids = await sdk.promotion.createBidsMin({
      advert_id: campaignId,
      nm_ids: [168120815],
      payment_type: 'cpm',
      placement_types: ['search']
    });
    const minBid = minBids[0]?.bid || 100;
    console.log(`Minimum bid: ${minBid}₽`);
    await delay(5000);

    // ── Step 5: Set Bids ──
    console.log(`\n=== Setting Bids ===`);
    await sdk.promotion.updateAuctionBid({
      bids: [{
        advert_id: campaignId,
        nm_bids: [{
          nm_id: 168120815,
          bid: minBid + 50,  // Bid slightly above minimum
          placement: 'search'
        }]
      }]
    });
    console.log(`Bid set: ${minBid + 50}₽`);
    await delay(5000);

    // ── Step 6: Start Campaign ──
    console.log(`\n=== Starting Campaign ===`);
    await sdk.promotion.getAdvStart({ id: campaignId });
    console.log('Campaign started!');
    await delay(5000);

    // ── Step 7: Set Excluded Phrases ──
    console.log(`\n=== Managing Keywords ===`);
    await sdk.promotion.createSearchSetExcluded(
      { excluded: ['cheap', 'used', 'broken', 'fake'] },
      { id: campaignId }
    );
    console.log('Excluded phrases set');
    await delay(5000);

    // ── Step 8: Monitor Performance ──
    console.log(`\n=== Campaign Performance ===`);
    // Wait for campaign to accumulate data (in production, poll periodically)
    const stats = await sdk.promotion.getAdvFullstats({
      ids: String(campaignId),
      beginDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    });

    if (stats.length > 0) {
      const s = stats[0];
      console.log(`Views: ${s.views}, Clicks: ${s.clicks}, CTR: ${s.ctr}%`);
      console.log(`Orders: ${s.orders}, Spent: ${s.sum}₽`);
      console.log(`CPC: ${s.cpc}₽, Conversion: ${s.cr}%`);

      // ── Step 9: Optimize Based on Data ──
      if (s.ctr < 1.0) {
        console.log('\n⚠️ Low CTR — consider adjusting bid or adding excluded phrases');
      }
      if (s.orders > 0 && s.sum / s.orders > 500) {
        console.log('\n⚠️ High CPA — consider reducing bid');
      }
    }

  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error(`Rate limited. Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof ValidationError) {
      console.error(`Validation error: ${error.message}`);
    } else {
      console.error('Unexpected error:', error);
    }
  } finally {
    // ── Cleanup ──
    if (campaignId) {
      try {
        await sdk.promotion.getAdvPause({ id: campaignId });
        await delay(2000);
        await sdk.promotion.getAdvStop({ id: campaignId });
        console.log(`\nCampaign ${campaignId} stopped`);
      } catch {
        console.log('Cleanup: campaign may already be stopped');
      }
    }
  }
}

runCampaignWorkflow();
```

---

## See Also

- [Sales Funnel Analytics Best Practices](./best-practices-sales-funnel.md) — Organic + advertising funnel analysis
- [Advertising Statistics Guide](./advertising-statistics-guide.md) — Detailed statistics methods reference (RU)
- [Promotion Module Guide](./promotion-advertising.md) — Complete Promotion module API reference
- [Production Best Practices](./best-practices.md) — General SDK best practices
- [Troubleshooting](./troubleshooting.md) — Common issues and solutions
