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

| Type | Description |
|------|-------------|
| `8` | Unified bid campaign (deprecated) |
| `9` | Unified or manual bid campaign (current) |

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

// Get auction campaigns (type 9)
const auctionCampaigns = await sdk.promotion.getAuctionAdverts({});
auctionCampaigns.adverts?.forEach(campaign => {
  console.log(`Campaign ${campaign.id}: status=${campaign.status}, bid_type=${campaign.bid_type}`);
});
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

### Full Campaign Statistics

```typescript
const end = new Date();
const begin = new Date();
begin.setDate(begin.getDate() - 7);

const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),  // Can pass multiple: "123,456,789"
  beginDate: begin.toISOString().split('T')[0],
  endDate: end.toISOString().split('T')[0]
});

fullStats.forEach(stat => {
  console.log(`Campaign ${stat.advertId}:`);
  console.log(`  Views: ${stat.views}`);
  console.log(`  Clicks: ${stat.clicks}`);
  console.log(`  CTR: ${stat.ctr}%`);
  console.log(`  CPC: ${stat.cpc}₽`);
  console.log(`  Orders: ${stat.orders}`);
  console.log(`  Sum: ${stat.sum}₽`);
});
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

### Campaign Management

| Method | Description | Required Status |
|--------|-------------|-----------------|
| `getPromotionCount()` | Get campaigns overview | - |
| `getAuctionAdverts()` | Get type 9 campaigns | - |
| `createSeacatSaveAd()` | Create campaign | - |
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

## See Also

- [Tariffs Module](./commissions-fees.md) - For ROI calculations
- [Best Practices](./best-practices.md) - General SDK best practices
- [Troubleshooting](./troubleshooting.md) - Common issues
