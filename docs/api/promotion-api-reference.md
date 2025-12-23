# Promotion Module API Reference

Complete API reference for the Wildberries Promotion (Advertising) module with all method signatures, parameters, and response types.

## Module Overview

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Access promotion module
sdk.promotion.methodName(params);
```

**Total Methods**: 42
**Base URL**: `https://advert-api.wildberries.ru`

---

## Table of Contents

1. [Campaign Listing](#campaign-listing)
2. [Campaign Creation](#campaign-creation)
3. [Campaign Control](#campaign-control)
4. [Bid Management](#bid-management)
5. [Financial Operations](#financial-operations)
6. [Keyword/Phrase Management](#keywordphrase-management)
7. [Product Management](#product-management)
8. [Statistics](#statistics)
9. [Media Campaigns](#media-campaigns)
10. [Promotions Calendar](#promotions-calendar)

---

## Campaign Listing

### getPromotionCount()

Returns all advertising campaigns grouped by type and status.

```typescript
async getPromotionCount(): Promise<{
  adverts?: {
    type?: number;
    status?: number;
    count?: number;
    advert_list?: {
      advertId?: number;
      changeTime?: string;
    }[];
  }[];
  all?: number;
}>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Response Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `adverts` | array | Campaign groups by type and status |
| `adverts[].type` | number | Campaign type (4-9) |
| `adverts[].status` | number | Campaign status (-1, 4, 7, 8, 9, 11) |
| `adverts[].count` | number | Number of campaigns |
| `adverts[].advert_list` | array | List of campaign IDs |
| `all` | number | Total number of campaigns |

**Example**:
```typescript
const campaigns = await sdk.promotion.getPromotionCount();
console.log(`Total: ${campaigns.all}`);

campaigns.adverts?.forEach(group => {
  console.log(`Type ${group.type}, Status ${group.status}: ${group.count}`);
});
```

---

### getAuctionAdverts()

Returns information about type 9 campaigns (unified/manual bid).

```typescript
async getAuctionAdverts(options?: {
  ids?: string;                              // Comma-separated campaign IDs
  statuses?: '-1' | '4' | '7' | '8' | '9' | '11';
  payment_type?: 'cpm' | 'cpc';
}): Promise<{
  adverts?: {
    id: number;
    status: number;
    bid_type: 'manual' | 'unified';
    name?: string;
    // ... additional fields
  }[];
}>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `ids` | string | No | Comma-separated campaign IDs |
| `statuses` | string | No | Filter by status |
| `payment_type` | string | No | Filter by payment type (cpm/cpc) |

**Example**:
```typescript
const result = await sdk.promotion.getAuctionAdverts({
  statuses: '9',
  payment_type: 'cpm'
});

result.adverts?.forEach(campaign => {
  console.log(`${campaign.id}: ${campaign.bid_type}, status ${campaign.status}`);
});
```

---

### createPromotionAdvert()

Returns information about campaigns with legacy types (4-8).

```typescript
async createPromotionAdvert(
  data: number[],  // Campaign IDs
  options?: {
    status?: -1 | 4 | 7 | 8 | 9 | 11;
    type?: 4 | 5 | 6 | 7 | 8;
    order?: 'create' | 'change' | 'id';
    direction?: 'desc' | 'asc';
  }
): Promise<ResponseInfoAdvertType8 | ResponseInfoAdvert | ResponseInfoAdvertType9[]>
```

**Rate Limit**: 5 req/sec (200ms interval)

---

## Campaign Creation

### createSeacatSaveAd()

Creates a type 9 campaign with manual or unified bid.

```typescript
async createSeacatSaveAd(data?: {
  name?: string;                            // Campaign name
  nms?: number[];                           // Product NM IDs (max 50)
  bid_type?: 'manual' | 'unified';          // Bid type
  placement_types?: ('search' | 'recommendations')[];  // For manual bid only
}): Promise<number>  // Returns campaign ID
```

**Rate Limit**: 5 req/min (12s interval)

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `name` | string | No | Campaign name |
| `nms` | number[] | Yes | Product NM IDs (max 50) |
| `bid_type` | string | No | `manual` or `unified` (default: `manual`) |
| `placement_types` | string[] | No | For manual bid: `search`, `recommendations` |

**Example**:
```typescript
const campaignId = await sdk.promotion.createSeacatSaveAd({
  name: 'Winter Collection 2024',
  nms: [168120815, 173574852],
  bid_type: 'manual',
  placement_types: ['search']
});

console.log(`Created campaign: ${campaignId}`);
```

---

### createAdvSaveAd()

Creates a unified bid campaign (legacy method).

```typescript
async createAdvSaveAd(data: {
  type?: number;
  name?: string;
  subjectId?: number;
  sum?: number;
  btype?: number;
  on_pause?: boolean;
  nms?: number[];
  cpm?: number;
}): Promise<string>
```

**Rate Limit**: 1 req/20s

---

### createBidsMin()

Returns minimum bids for product cards by payment type and placement.

```typescript
async createBidsMin(data: {
  advert_id: number;                                    // Campaign ID
  nm_ids: number[];                                     // Product NM IDs
  payment_type: 'cpm' | 'cpc';                         // Payment type
  placement_types: ('combined' | 'search' | 'recommendation')[];
}): Promise<{
  bids: {
    bids: { type: PlacementType; value: number }[];
    nm_id: number;
  }[];
}>
```

**Rate Limit**: 20 req/min (3s interval)

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `advert_id` | number | Yes | Campaign ID |
| `nm_ids` | number[] | Yes | Product NM IDs |
| `payment_type` | string | Yes | `cpm` (per 1000 views) or `cpc` (per click) |
| `placement_types` | string[] | Yes | `combined`, `search`, `recommendation` |

**Example**:
```typescript
const minBids = await sdk.promotion.createBidsMin({
  advert_id: 32129132,
  nm_ids: [168120815],
  payment_type: 'cpm',
  placement_types: ['search']
});

minBids.bids.forEach(item => {
  console.log(`NM ${item.nm_id}:`);
  item.bids.forEach(b => console.log(`  ${b.type}: ${b.value}₽`));
});
```

---

### getSupplierSubjects()

Returns list of subjects (categories) available for advertising campaigns.

```typescript
async getSupplierSubjects(): Promise<{
  id?: number;
  name?: string;
  count?: number;
}[]>
```

**Rate Limit**: 1 req/12s

---

### createSupplierNm()

Returns product cards available for advertising campaigns by subject IDs.

```typescript
async createSupplierNm(data?: number[]): Promise<{
  title?: string;
  nm?: number;
  subjectId?: number;
}[]>
```

**Rate Limit**: 5 req/min (12s interval)

---

## Campaign Control

### getAdvStart()

Starts a campaign. Works for campaigns in status 4 (ready) or 11 (paused).

```typescript
async getAdvStart(options?: { id: number }): Promise<unknown>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Requirements**:
- Campaign must be in status `4` or `11`
- Campaign must have budget

**Example**:
```typescript
await sdk.promotion.getAdvStart({ id: 32129132 });
```

---

### getAdvPause()

Pauses a campaign. Works only for campaigns in status 9 (active).

```typescript
async getAdvPause(options?: { id: number }): Promise<unknown>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Requirements**:
- Campaign must be in status `9` (active)

---

### getAdvStop()

Stops/finishes a campaign. Works for campaigns in status 4, 9, or 11.

```typescript
async getAdvStop(options?: { id: number }): Promise<unknown>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Requirements**:
- Campaign must be in status `4`, `9`, or `11`

---

### getAdvDelete()

Deletes a campaign. Works only for campaigns in status 4 (ready).

```typescript
async getAdvDelete(options?: { id: number }): Promise<unknown>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Requirements**:
- Campaign must be in status `4` (ready)
- After deletion, campaign will be in status `-1` for 3-10 minutes

---

### createAdvRename()

Renames a campaign. Can be done at any time.

```typescript
async createAdvRename(data?: {
  advertId: number;
  name: string;
}): Promise<unknown>
```

**Rate Limit**: 5 req/sec (200ms interval)

---

## Bid Management

### updateAdvBid()

Updates bids for unified bid campaigns.

```typescript
async updateAdvBid(data: {
  bids: {
    advert_id: number;
    bid: number;        // CPM bid in rubles
  }[];
}): Promise<void>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Requirements**:
- Campaign must be in status `4`, `9`, or `11`
- Campaign must have unified bid type

**Example**:
```typescript
await sdk.promotion.updateAdvBid({
  bids: [{
    advert_id: 32129132,
    bid: 280
  }]
});
```

---

### updateAuctionBid()

Updates bids for manual bid campaigns.

```typescript
async updateAuctionBid(data: {
  bids: {
    advert_id: number;
    nm_bids: {
      nm_id: number;
      bid: number;
      placement: 'search' | 'recommendations' | 'combined';
    }[];
  }[];
}): Promise<{
  bids: {
    advert_id: number;
    nm_bids: { nm_id: number; bid: number; placement: string }[];
  }[];
}>
```

**Rate Limit**: 5 req/sec (200ms interval)

**Requirements**:
- Campaign must be in status `4`, `9`, or `11`
- Campaign must have manual bid type

**Example**:
```typescript
await sdk.promotion.updateAuctionBid({
  bids: [{
    advert_id: 32129132,
    nm_bids: [{
      nm_id: 168120815,
      bid: 280,
      placement: 'search'
    }]
  }]
});
```

---

### updateAuctionPlacement()

Changes placement types for manual bid campaigns.

```typescript
async updateAuctionPlacement(data: {
  placements: {
    advert_id: number;
    placements: {
      search: boolean;
      recommendations: boolean;
    };
  }[];
}): Promise<void>
```

**Rate Limit**: 1 req/sec

---

## Financial Operations

### getAdvBalance()

Returns advertising account balance.

```typescript
async getAdvBalance(): Promise<{
  balance?: number;    // Взаиморасчёт (netting) balance
  net?: number;        // Cabinet balance (can be deposited)
  bonus?: number;      // Bonus balance
  cashbacks?: {
    sum?: number;
    percent?: number;
    expiration_date?: string;
  }[];
}>
```

**Rate Limit**: 1 req/sec

**Response Fields**:
| Field | Type | Description |
|-------|------|-------------|
| `balance` | number | Netting balance (взаиморасчёт) |
| `net` | number | Cabinet balance |
| `bonus` | number | Bonus balance |
| `cashbacks` | array | Active cashback offers |

**Example**:
```typescript
const balance = await sdk.promotion.getAdvBalance();
console.log(`Cabinet: ${balance.net}₽`);
console.log(`Bonus: ${balance.bonus}₽`);
```

---

### getAdvBudget()

Returns campaign budget information.

```typescript
async getAdvBudget(options?: { id: number }): Promise<{
  cash?: number;       // From cash deposits
  netting?: number;    // From netting balance
  total?: number;      // Total budget
}>
```

**Rate Limit**: 4 req/sec (250ms interval)

**Example**:
```typescript
const budget = await sdk.promotion.getAdvBudget({ id: 32129132 });
console.log(`Total budget: ${budget.total}₽`);
```

---

### createBudgetDeposit()

Deposits funds to campaign budget.

```typescript
async createBudgetDeposit(
  data: {
    sum?: number;              // Amount to deposit
    cashback_sum?: number;     // Cashback amount (optional)
    cashback_percent?: number; // Cashback percent (optional)
    type?: number;             // 0=счёт, 1=баланс, 3=бонусы
    return?: boolean;          // Return details
  },
  options?: { id: number }     // Campaign ID
): Promise<ResponseWithReturn>
```

**Rate Limit**: 1 req/sec

**Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `sum` | number | Yes | Amount to deposit |
| `type` | number | No | Source: 0=счёт, 1=баланс (cabinet), 3=бонусы |
| `id` | number | Yes | Campaign ID (query param) |

**Requirements**:
- Per docs: Campaign should be in status `11` (paused)
- Testing showed it may work for status `4` as well

**Example**:
```typescript
await sdk.promotion.createBudgetDeposit(
  { sum: 1000, type: 1 },
  { id: 32129132 }
);
```

---

### getAdvUpd()

Returns expense history for a period.

```typescript
async getAdvUpd(options?: {
  from: string;   // Start date (YYYY-MM-DD)
  to: string;     // End date (YYYY-MM-DD)
}): Promise<{
  updNum?: number;
  updTime?: string;
  updSum?: number;
  advertId?: number;
  campName?: string;
  advertType?: number;
  paymentType?: string;
  advertStatus?: number;
}[]>
```

**Rate Limit**: 1 req/sec

**Example**:
```typescript
const expenses = await sdk.promotion.getAdvUpd({
  from: '2024-12-01',
  to: '2024-12-22'
});

let total = 0;
expenses.forEach(e => {
  console.log(`${e.campName}: ${e.updSum}₽`);
  total += e.updSum || 0;
});
console.log(`Total: ${total}₽`);
```

---

### getAdvPayments()

Returns payment history (account deposits).

```typescript
async getAdvPayments(options?: {
  from?: string;
  to?: string;
}): Promise<{
  id?: number;
  date?: string;
  sum?: number;
  type?: number;
  statusId?: number;
  cardStatus?: string;
}[]>
```

**Rate Limit**: 1 req/sec

---

## Keyword/Phrase Management

### getSearchSetPlus()

Manages fixed phrases activity for manual bid campaigns.

```typescript
async getSearchSetPlus(options?: {
  id: number;        // Campaign ID
  fixed?: boolean;   // true=activate, false=deactivate
}): Promise<unknown>
```

**Rate Limit**: 2 req/sec (500ms interval)

**Requirements**:
- Campaign must have manual bid type
- Campaign should be active (status 9)

---

### createSearchSetPlu()

Sets or removes fixed phrases for manual bid campaigns.

```typescript
async createSearchSetPlu(
  data: { pluse?: string[] },    // Phrases to fix
  options?: { id: number }       // Campaign ID
): Promise<string[]>
```

**Rate Limit**: 2 req/sec (500ms interval)

**Requirements**:
- Phrases must exist in campaign's keyword list
- Empty array removes all fixed phrases

**Example**:
```typescript
// Set fixed phrases
await sdk.promotion.createSearchSetPlu(
  { pluse: ['winter jacket', 'warm coat'] },
  { id: 32129132 }
);

// Remove all fixed phrases
await sdk.promotion.createSearchSetPlu(
  { pluse: [] },
  { id: 32129132 }
);
```

---

### createSearchSetExcluded()

Sets or removes excluded (minus) phrases for manual bid campaigns.

```typescript
async createSearchSetExcluded(
  data: { excluded?: string[] },
  options?: { id: number }
): Promise<unknown>
```

**Rate Limit**: 2 req/sec (500ms interval)

**Requirements**:
- Campaign must have manual bid type
- Campaign should be active (status 9)
- Maximum 1000 excluded phrases

**Example**:
```typescript
// Set excluded phrases
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['cheap', 'discount', 'used'] },
  { id: 32129132 }
);

// Clear all excluded phrases
await sdk.promotion.createSearchSetExcluded(
  { excluded: [] },
  { id: 32129132 }
);
```

---

### createAutoSetExcluded()

Sets or removes excluded phrases for unified bid campaigns.

```typescript
async createAutoSetExcluded(
  data: { excluded?: string[] },
  options?: { id: number }
): Promise<unknown>
```

**Rate Limit**: 1 req/6s

---

## Product Management

### getAutoGetnmtoadd()

Returns product cards that can be added to unified bid campaign.

```typescript
async getAutoGetnmtoadd(options?: { id: number }): Promise<number[]>
```

**Rate Limit**: 1 req/sec

---

### createAutoUpdatenm()

Adds or removes products from unified bid campaign.

```typescript
async createAutoUpdatenm(
  data: {
    add?: number[];
    delete?: number[];
  },
  options?: { id: number }
): Promise<unknown>
```

**Rate Limit**: 60 req/min (1 req/sec)

---

### updateAuctionNm()

Adds or removes products from campaigns.

```typescript
async updateAuctionNm(data: {
  nms: {
    advert_id: number;
    nms: {
      add?: unknown;
      delete?: number[];
    };
  }[];
}): Promise<{
  nms: {
    advert_id: number;
    nms: {
      added: number[];
      deleted: number[];
    };
  }[];
}>
```

**Rate Limit**: 1 req/sec

---

## Statistics

### getStatsKeywords()

Returns keyword statistics for a campaign (max 7 days).

```typescript
async getStatsKeywords(options?: {
  advert_id: number;
  from: string;       // YYYY-MM-DD
  to: string;         // YYYY-MM-DD
}): Promise<{
  keywords?: {
    date: string;
    stats?: {
      keyword: string;
      views: number;
      clicks: number;
      ctr: number;
      sum: number;
    }[];
  }[];
}>
```

**Rate Limit**: 4 req/sec (250ms interval)

**Requirements**:
- Maximum period: 7 days
- Data updated hourly

**Example**:
```typescript
const stats = await sdk.promotion.getStatsKeywords({
  advert_id: 32129132,
  from: '2024-12-15',
  to: '2024-12-22'
});

stats.keywords?.forEach(day => {
  console.log(`\n${day.date}:`);
  day.stats?.forEach(kw => {
    console.log(`  ${kw.keyword}: ${kw.views} views, ${kw.sum}₽`);
  });
});
```

---

### getStatWords()

Returns keyword statistics for manual bid campaigns.

```typescript
async getStatWords(options?: { id: number }): Promise<{
  words?: {
    phrase?: string[];
    strong?: string[];
    excluded?: string[];
    pluse?: string[];
    keywords?: { keyword?: string; count?: number }[];
    fixed?: boolean;
  };
  stat?: {
    advertId?: number;
    keyword?: string;
    views?: number;
    clicks?: number;
    ctr?: number;
    cpc?: number;
    sum?: number;
  }[];
}>
```

**Rate Limit**: 4 req/sec (250ms interval)

---

### getAutoStatWords()

Returns cluster statistics for unified bid campaigns.

```typescript
async getAutoStatWords(options?: { id: number }): Promise<{
  excluded?: string[];
  clusters?: {
    cluster?: string;
    count?: number;
    keywords?: string[];
  }[];
}>
```

**Rate Limit**: 4 req/sec (250ms interval)

---

### getAdvFullstats()

Returns full campaign statistics.

```typescript
async getAdvFullstats(options?: {
  ids: string;           // Comma-separated campaign IDs
  beginDate: string;     // YYYY-MM-DD
  endDate: string;       // YYYY-MM-DD
}): Promise<{
  advertId: number;
  views: number;
  clicks: number;
  ctr: number;
  cpc: number;
  sum: number;
  orders: number;
  // ... additional fields
}[]>
```

**Rate Limit**: 3 req/min (20s interval)

**Requirements**:
- Maximum period: 31 days
- Campaign must be in status `7`, `9`, or `11`

**Example**:
```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '32129132,32129133',
  beginDate: '2024-12-01',
  endDate: '2024-12-22'
});

stats.forEach(s => {
  console.log(`Campaign ${s.advertId}:`);
  console.log(`  Views: ${s.views}, Clicks: ${s.clicks}`);
  console.log(`  CTR: ${s.ctr}%, CPC: ${s.cpc}₽`);
  console.log(`  Spent: ${s.sum}₽, Orders: ${s.orders}`);
});
```

---

### createAdvFullstat()

Returns campaign statistics (legacy method, deprecated Sep 2024).

```typescript
async createAdvFullstat(
  data: RequestWithDate | RequestWithInterval | RequestWithCampaignID[]
): Promise<ResponseWithDate | ResponseWithInterval>
```

**Rate Limit**: 1 req/min

---

## Media Campaigns

### getAdvCount()

Returns media campaign count grouped by status.

```typescript
async getAdvCount(): Promise<{
  all?: number;
  adverts?: {
    type?: number;
    status?: number;
    count?: number;
  };
}>
```

**Base URL**: `https://advert-media-api.wildberries.ru`
**Rate Limit**: 10 req/sec (100ms interval)

---

### getAdvAdverts()

Returns list of media campaigns.

```typescript
async getAdvAdverts(options?: {
  status?: number;
  type?: number;
  limit?: number;
  offset?: number;
  order?: string;
  direction?: string;
}): Promise<{
  advertId?: number;
  name?: string;
  brand?: string;
  type?: number;
  status?: number;
  createTime?: string;
  endTime?: string;
}[]>
```

**Base URL**: `https://advert-media-api.wildberries.ru`
**Rate Limit**: 10 req/sec (100ms interval)

---

### getAdvAdvert()

Returns detailed media campaign information.

```typescript
async getAdvAdvert(options?: { id: number }): Promise<{
  advertId?: number;
  name?: string;
  brand?: string;
  type?: number;
  status?: number;
  createTime?: string;
  extended?: {
    reason?: string;
    expenses?: number;
    from?: string;
    to?: string;
    budget?: number;
  };
  items?: {
    id?: number;
    name?: string;
    status?: number;
    place?: number;
    budget?: number;
    cpm?: number;
    url?: string;
  }[];
}>
```

**Base URL**: `https://advert-media-api.wildberries.ru`
**Rate Limit**: 10 req/sec (100ms interval)

---

### createAdvStat()

Returns media campaign statistics.

```typescript
async createAdvStat(
  data: RequestWithDate | RequestWithInterval | RequestWithCampaignID[]
): Promise<StatInterval | StatDate | Stat[]>
```

**Base URL**: `https://advert-media-api.wildberries.ru`
**Rate Limit**: 10 req/sec (100ms interval)

---

## Promotions Calendar

### getCalendarPromotions()

Returns list of WB promotions.

```typescript
async getCalendarPromotions(options?: {
  startDateTime: string;
  endDateTime: string;
  allPromo: boolean;
  limit?: number;
  offset?: number;
}): Promise<unknown>
```

**Base URL**: `https://dp-calendar-api.wildberries.ru`
**Rate Limit**: 10 req/6s (600ms interval)

---

### getPromotionsDetails()

Returns detailed promotion information.

```typescript
async getPromotionsDetails(options?: {
  promotionIDs: string;   // Comma-separated promotion IDs
}): Promise<unknown>
```

**Base URL**: `https://dp-calendar-api.wildberries.ru`
**Rate Limit**: 10 req/6s (600ms interval)

---

### getPromotionsNomenclatures()

Returns products eligible for a promotion.

```typescript
async getPromotionsNomenclatures(options?: {
  promotionID: number;
  inAction: boolean;
  limit?: number;
  offset?: number;
}): Promise<unknown>
```

**Base URL**: `https://dp-calendar-api.wildberries.ru`
**Rate Limit**: 10 req/6s (600ms interval)

---

### createPromotionsUpload()

Creates a task to add product to a promotion.

```typescript
async createPromotionsUpload(): Promise<unknown>
```

**Base URL**: `https://dp-calendar-api.wildberries.ru`
**Rate Limit**: 10 req/6s (600ms interval)

---

## Configuration

### getAdvConfig()

Returns promotion configuration values.

```typescript
async getAdvConfig(): Promise<{
  categories?: {
    id: number;
    name: string;
    cpm_min: number;
    cpc_min: number;
  }[];
  config?: {
    description?: string;
    name?: string;
    value?: string;
  }[];
}>
```

**Rate Limit**: 1 req/min

---

## Error Handling

All methods may throw these errors:

```typescript
import {
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NetworkError
} from 'daytona-wildberries-typescript-sdk';

try {
  await sdk.promotion.getAdvStart({ id: 12345 });
} catch (error) {
  if (error instanceof AuthenticationError) {
    // API key invalid or lacks permissions
  }
  if (error instanceof RateLimitError) {
    // Too many requests, wait error.retryAfter ms
  }
  if (error instanceof ValidationError) {
    // Invalid parameters or campaign state
  }
  if (error instanceof NetworkError) {
    // Network connection issue
  }
}
```

---

## Campaign Statuses Reference

| Code | Name | Description |
|------|------|-------------|
| `-1` | Deleting | Campaign being deleted (3-10 min) |
| `4` | Ready | Ready to launch |
| `7` | Finished | Campaign ended |
| `8` | Cancelled | Campaign cancelled |
| `9` | Active | Campaign running |
| `11` | Paused | Campaign paused |

---

## Rate Limits Summary

| Category | Limit |
|----------|-------|
| Most GET operations | 5 req/sec |
| Statistics | 1-4 req/min |
| Campaign creation | 5 req/min |
| Budget operations | 1 req/sec |
| Configuration | 1 req/min |
| Media campaigns | 10 req/sec |
| Promotions calendar | 10 req/6s |

---

## See Also

- [Promotion & Advertising Guide](/guides/promotion-advertising) - Usage examples
- [Error Handling](/api/classes/WBAPIError) - Error class reference
- [SDK Configuration](/api/interfaces/SDKConfig) - SDK setup options
