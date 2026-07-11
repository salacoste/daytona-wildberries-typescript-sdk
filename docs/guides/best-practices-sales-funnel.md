---
title: "Sales Funnel Analytics Best Practices"
description: "Complete guide to analyzing Wildberries sales funnels — organic product performance, advertising campaign analytics, cross-channel comparison, and data-driven optimization strategies"
layout: doc
---

# Sales Funnel Analytics Best Practices

Complete guide to analyzing Wildberries sales funnels -- combining organic product performance data from the Analytics module with advertising campaign statistics from the Promotion module for data-driven optimization.

**Target Audience**: E-commerce analysts, product managers, and developers building analytics dashboards for Wildberries sellers

**Prerequisites**: SDK installed and configured, valid API key with Analytics and Promotion permissions

**Estimated Reading Time**: 40 minutes

---

## Table of Contents

1. [Understanding Wildberries Sales Funnels](#understanding-wildberries-sales-funnels)
2. [Organic Sales Funnel (Analytics v3 API)](#organic-sales-funnel-analytics-v3-api)
3. [Advertising Funnel (Promotion Statistics)](#advertising-funnel-promotion-statistics)
4. [Cross-Channel Funnel Analysis](#cross-channel-funnel-analysis)
5. [Historical Trend Analysis](#historical-trend-analysis)
6. [Data Aggregation Patterns](#data-aggregation-patterns)
7. [Optimization Strategies](#optimization-strategies)
8. [Rate Limiting and Performance](#rate-limiting-and-performance)
9. [Migration Notes (v2.6 to v2.7)](#migration-notes-v26-to-v27)
10. [Complete Dashboard Example](#complete-dashboard-example)

---

## Understanding Wildberries Sales Funnels

### What is a Sales Funnel on Wildberries?

A sales funnel on Wildberries tracks the customer journey from initial product discovery through purchase completion. Every product listing generates a measurable funnel that reveals how effectively your products convert browsing activity into revenue.

### Two Data Sources

The SDK provides funnel data from two independent modules:

| Source | Module | What It Measures |
|--------|--------|------------------|
| **Analytics module** | `sdk.analytics.*` | Organic product performance -- all traffic regardless of source |
| **Promotion module** | `sdk.promotion.*` | Advertising-driven performance -- paid traffic only |

Combining both sources gives you a complete picture of your product performance and advertising ROI.

### The Funnel Stages

```
┌─────────────────────────────────────────────────┐
│                    VIEWS                         │
│              (openCount)                         │
│    Customer opens the product card               │
└──────────────────────┬──────────────────────────┘
                       │  addToCartConversion %
┌──────────────────────▼──────────────────────────┐
│                     CART                         │
│              (cartCount)                         │
│    Customer adds the product to cart             │
└──────────────────────┬──────────────────────────┘
                       │  cartToOrderConversion %
┌──────────────────────▼──────────────────────────┐
│                    ORDERS                        │
│              (orderCount / orderSum)             │
│    Customer places the order                     │
└──────────────────────┬──────────────────────────┘
                       │  buyoutPercent %
┌──────────────────────▼──────────────────────────┐
│                   BUYOUTS                        │
│           (buyoutCount / buyoutSum)              │
│    Customer receives and keeps the product       │
└─────────────────────────────────────────────────┘
```

### Key Conversion Metrics

| Metric | Formula | What It Tells You |
|--------|---------|-------------------|
| `addToCartConversion` | cartCount / openCount | How appealing your product card is |
| `cartToOrderConversion` | orderCount / cartCount | How well your pricing and availability convert |
| `buyoutPercent` | buyoutCount / orderCount | How satisfied customers are upon delivery |

::: tip
A healthy Wildberries funnel typically shows: card-to-cart conversion of 5-15%, cart-to-order conversion of 20-40%, and buyout rate of 60-90% depending on the category.
:::

---

## Organic Sales Funnel (Analytics v3 API)

These are the v3 endpoints introduced in SDK v2.7.0, replacing the deprecated v2 endpoints that now return 404.

::: warning
The old v2 methods (`createNmReportDetail`, `createDetailHistory`, `createGroupedHistory`) still exist as deprecated wrappers but internally call v3. Migrate to the new methods for correct type safety. See [Migration Notes](#migration-notes-v26-to-v27).
:::

### Product-Level Analytics: getSalesFunnelProducts()

Retrieves funnel statistics for individual products with optional period-over-period comparison.

**Rate limit**: 3 requests/minute, 20-second interval, burst of 3

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const products = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  pastPeriod: { start: '2025-12-01', end: '2025-12-31' },  // optional comparison
  nmIds: [168120815, 173574852],
  subjectIds: [],
  tagIds: [],
  brandNames: [],
  limit: 10,
  offset: 0,
  skipDeletedNm: true,
  orderBy: { field: 'orderCount', mode: 'desc' }
});

// Response structure: products[].product + products[].statistic
for (const item of products.products) {
  const { product, statistic } = item;
  console.log(`${product.title} (${product.nmId}):`);
  console.log(`  Views: ${statistic.selected.openCount}`);
  console.log(`  Cart: ${statistic.selected.cartCount}`);
  console.log(`  Orders: ${statistic.selected.orderCount}`);
  console.log(`  Revenue: ${statistic.selected.orderSum} RUB`);
  console.log(`  Avg Price: ${statistic.selected.avgPrice} RUB`);
  console.log(`  Cart Conv: ${statistic.selected.conversions.addToCartPercent}%`);
  console.log(`  Order Conv: ${statistic.selected.conversions.cartToOrderPercent}%`);
  console.log(`  Buyout Rate: ${statistic.selected.conversions.buyoutPercent}%`);

  // Comparison with past period (available when pastPeriod is provided)
  if (statistic.comparison) {
    console.log(`  Views change: ${statistic.comparison.openCountDynamic}%`);
    console.log(`  Orders change: ${statistic.comparison.orderCountDynamic}%`);
  }
}
```

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|:--------:|-------------|
| `selectedPeriod` | `{ start, end }` | Yes | Date range in `YYYY-MM-DD` format |
| `pastPeriod` | `{ start, end }` | No | Comparison period for trend analysis |
| `nmIds` | `number[]` | No | Filter by WB article numbers |
| `subjectIds` | `number[]` | No | Filter by category (subject) IDs |
| `tagIds` | `number[]` | No | Filter by tag IDs |
| `brandNames` | `string[]` | No | Filter by brand names |
| `limit` | `number` | No | Items per page |
| `offset` | `number` | No | Number of items to skip |
| `skipDeletedNm` | `boolean` | No | Hide deleted product cards |
| `orderBy` | `{ field, mode }` | No | Sort field and direction (`asc`/`desc`) |

#### Available Sort Fields

`openCard`, `addToCart`, `orderCount`, `orderSum`, `buyoutCount`, `buyoutSum`, `cancelCount`, `cancelSum`, `avgPrice`, `stockMpQty`, `stockWbQty`, `shareOrderPercent`, `addToWishlist`, `timeToReady`, `localizationPercent`

WB Club sorting is also available: `wbClub.orderCount`, `wbClub.orderSum`, `wbClub.buyoutSum`, `wbClub.cancelSum`, `wbClub.buyoutCount`, `wbClub.avgPrice`, `wbClub.buyoutPercent`, `wbClub.avgOrderCountPerDay`, `wbClub.cancelCount`

#### Response Fields (v3)

Each product entry includes:

**Product info** (`product`): `nmId`, `title`, `vendorCode`, `brandName`, `subjectId`, `subjectName`, `tags[]`, `productRating`, `feedbackRating`, `stocks.wb`, `stocks.mp`, `stocks.balanceSum`

**Statistics** (`statistic.selected`): `openCount`, `cartCount`, `orderCount`, `orderSum`, `buyoutCount`, `buyoutSum`, `cancelCount`, `cancelSum`, `avgPrice`, `avgOrdersCountPerDay`, `shareOrderPercent`, `addToWishlist`, `timeToReady`, `localizationPercent`, `wbClub.*`, `conversions.*`

**Comparison** (`statistic.comparison`): All `*Dynamic` fields showing percentage change vs the past period.

### Product History: getSalesFunnelProductsHistory()

Returns day-by-day or week-by-week statistics for specific products.

**Rate limit**: 3 requests/minute, 20-second interval, burst of 3

```typescript
const history = await sdk.analytics.getSalesFunnelProductsHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  nmIds: [168120815],
  subjectIds: [],
  tagIds: [],
  brandNames: [],
  aggregationLevel: 'day',  // 'day' | 'week'
  skipDeletedNm: true
});

// Response: array of { product, history[] }
for (const item of history) {
  console.log(`Product: ${item.product.title} (${item.product.nmId})`);
  for (const day of item.history) {
    console.log(`  ${day.date}: views=${day.openCount}, cart=${day.cartCount}, orders=${day.orderCount}`);
    console.log(`    Cart conv: ${day.addToCartConversion}%, Order conv: ${day.cartToOrderConversion}%`);
    console.log(`    Buyout: ${day.buyoutCount} (${day.buyoutPercent}%), Wishlist: ${day.addToWishlistCount}`);
  }
}
```

::: info
This endpoint does **not** support pagination (`limit`/`offset`). It returns all data for the requested products within the period.
:::

#### History Entry Fields

| Field | Type | Description |
|-------|------|-------------|
| `date` | `string` | Date of the statistics entry |
| `openCount` | `number` | Product card views |
| `cartCount` | `number` | Added to cart |
| `orderCount` | `number` | Orders placed |
| `orderSum` | `number` | Order revenue in RUB |
| `buyoutCount` | `number` | Buyouts (kept by customer) |
| `buyoutSum` | `number` | Buyout revenue in RUB |
| `buyoutPercent` | `number` | Buyout rate % |
| `addToCartConversion` | `number` | Card-to-cart conversion % |
| `cartToOrderConversion` | `number` | Cart-to-order conversion % |
| `addToWishlistCount` | `number` | Added to wishlist |

### Grouped History: getSalesFunnelGroupedHistory()

Returns daily or weekly statistics grouped by brand, subject, and tag combinations.

**Rate limit**: 3 requests/minute, 20-second interval, burst of 3

```typescript
const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
  brandNames: ['BrandA'],
  subjectIds: [100, 200],
  tagIds: [],
  aggregationLevel: 'day',
  skipDeletedNm: true
});

for (const entry of grouped) {
  console.log(`Group: ${entry.product.brandName} - ${entry.product.subjectName}`);
  for (const day of entry.history) {
    console.log(`  ${day.date}: ${day.openCount} views, ${day.orderCount} orders, ${day.orderSum} RUB`);
  }
}
```

This endpoint is useful for category-level trend analysis without loading individual product data.

---

## Advertising Funnel (Promotion Statistics)

Advertising funnel data comes from the Promotion module. While the Analytics module tracks all organic traffic, the Promotion module provides metrics specifically for paid advertising campaigns.

### Full Campaign Statistics: getAdvFullstats()

The primary method for retrieving advertising performance data.

**Rate limit**: 3 requests/minute, 20-second interval

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511,23332267',   // Campaign IDs as comma-separated string
  beginDate: '2026-01-01',
  endDate: '2026-01-31'
});

for (const campaign of stats) {
  console.log(`Campaign ${campaign.advertId}:`);
  console.log(`  Views: ${campaign.views}, Clicks: ${campaign.clicks}`);
  console.log(`  CTR: ${campaign.ctr}%, CPC: ${campaign.cpc} RUB`);
  console.log(`  Orders: ${campaign.orders}, Revenue: ${campaign.sum_price} RUB`);
  console.log(`  Spent: ${campaign.sum} RUB`);
  console.log(`  Add to basket: ${campaign.atbs}`);
  console.log(`  Conversion rate: ${campaign.cr}%`);
  console.log(`  Canceled: ${campaign.canceled}`);
}
```

::: warning
- Campaign IDs are passed as a **string** (comma-separated), not an array
- Maximum **100** campaign IDs per request
- Maximum period: **31 days** from `beginDate`
- Only works for campaigns in statuses: 7 (completed), 9 (active), 11 (paused)
:::

#### Nested Data Structure

The response includes a nested breakdown: `days[] -> apps[] -> nms[]`

- **days**: Daily breakdown of stats
- **apps**: Platform breakdown (1 = Website, 32 = Android, 64 = iOS)
- **nms**: SKU-level (nmId) breakdown within each platform

This allows drill-down from campaign totals to individual product performance per platform per day.

### Keyword & SKU Performance: getAdvFullstats()

> The standalone `getStatsKeywords()`, `getStatWords()`, and `getAutoStatWords()` methods were **removed in v4.0.0**. Use `getAdvFullstats()` for all advertising performance data — it returns per-day, per-platform, and per-SKU breakdowns.

**Rate limit**: 3 requests/minute, 20s interval

```typescript
const stats = await sdk.promotion.getAdvFullstats({
  ids: '24483511',
  beginDate: '2026-01-01',
  endDate: '2026-01-07'
});

// SKU-level aggregation across days and platforms
for (const campaign of stats) {
  for (const day of campaign.days ?? []) {
    for (const app of day.apps ?? []) {
      for (const nm of app.nms ?? []) {
        console.log(`SKU ${nm.nmId}: ${nm.views} views, ${nm.clicks} clicks, ${nm.orders} orders`);
      }
    }
  }
}
```

---

## Cross-Channel Funnel Analysis

This is the most valuable analytical pattern -- combining organic funnel data from the Analytics module with advertising statistics from the Promotion module to build a complete performance picture.

### Architecture

```
┌──────────────────────┐     ┌──────────────────────┐
│   Analytics Module   │     │   Promotion Module   │
│   (Organic Funnel)   │     │   (Advertising)      │
│                      │     │                      │
│  getSalesFunnel      │     │  getAdvFullstats()   │
│  Products()          │     │  (universal stats)   │
│  ProductsHistory()   │     │                      │
│  GroupedHistory()    │     │                      │
└──────────┬───────────┘     └──────────┬───────────┘
           │                            │
           │      nmId (common key)     │
           └────────────┬───────────────┘
                        │
           ┌────────────▼───────────────┐
           │   Combined Analysis        │
           │                            │
           │  - Organic vs Paid split   │
           │  - ROAS calculation        │
           │  - CPA comparison          │
           │  - Blended conversion      │
           └────────────────────────────┘
```

The `nmId` (WB article number) is the common key that links organic product data to advertising campaign data at the SKU level.

### Combined Analysis Pattern

```typescript
import { WildberriesSDK, RateLimitError } from 'daytona-wildberries-typescript-sdk';

async function crossChannelAnalysis(
  sdk: WildberriesSDK,
  nmIds: number[],
  period: { start: string; end: string }
) {
  // Step 1: Get organic funnel data
  const organic = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: period,
    nmIds,
    subjectIds: [],
    tagIds: [],
    brandNames: [],
    limit: 100,
    offset: 0,
    skipDeletedNm: true,
  });

  // Step 2: Get advertising campaign IDs
  const campaigns = await sdk.promotion.getCampaignCount();
  const campaignIds = campaigns.adverts
    ?.flatMap(g => g.advert_list?.map(a => a.advertId) ?? [])
    .filter((id): id is number => id !== undefined);

  // Step 3: Get advertising stats (max 100 IDs per request)
  const adStats = campaignIds && campaignIds.length > 0
    ? await sdk.promotion.getAdvFullstats({
        ids: campaignIds.slice(0, 100).join(','),
        beginDate: period.start,
        endDate: period.end,
      })
    : [];

  // Step 4: Build SKU-level advertising metrics map
  const adMetrics = new Map<number, {
    clicks: number; views: number; orders: number; spent: number;
  }>();

  for (const campaign of adStats) {
    if (!campaign.days) continue;
    for (const day of campaign.days as any[]) {
      for (const app of day.apps ?? []) {
        for (const nm of app.nms ?? []) {
          const existing = adMetrics.get(nm.nmId) ?? {
            clicks: 0, views: 0, orders: 0, spent: 0,
          };
          existing.clicks += nm.clicks ?? 0;
          existing.views += nm.views ?? 0;
          existing.orders += nm.orders ?? 0;
          existing.spent += nm.sum ?? 0;
          adMetrics.set(nm.nmId, existing);
        }
      }
    }
  }

  // Step 5: Combine organic + advertising data per product
  const results = [];

  for (const item of organic.products) {
    const { product, statistic } = item;
    const ad = adMetrics.get(product.nmId);

    const entry = {
      nmId: product.nmId,
      title: product.title,
      organic: {
        views: statistic.selected.openCount,
        cart: statistic.selected.cartCount,
        orders: statistic.selected.orderCount,
        revenue: statistic.selected.orderSum,
        avgPrice: statistic.selected.avgPrice,
      },
      advertising: ad ?? null,
      roas: ad && ad.spent > 0
        ? statistic.selected.orderSum / ad.spent
        : null,
      cpa: ad && ad.orders > 0
        ? ad.spent / ad.orders
        : null,
    };

    results.push(entry);
  }

  return results;
}

// Usage
const analysis = await crossChannelAnalysis(sdk, [168120815, 173574852], {
  start: '2026-01-01',
  end: '2026-01-31',
});

for (const item of analysis) {
  console.log(`\n${item.title} (${item.nmId}):`);
  console.log(`  ORGANIC: views=${item.organic.views}, cart=${item.organic.cart}, orders=${item.organic.orders}, revenue=${item.organic.revenue} RUB`);

  if (item.advertising) {
    console.log(`  ADS: views=${item.advertising.views}, clicks=${item.advertising.clicks}, orders=${item.advertising.orders}, spent=${item.advertising.spent} RUB`);
    console.log(`  ROAS: ${item.roas?.toFixed(2) ?? 'N/A'}x`);
    console.log(`  CPA: ${item.cpa?.toFixed(0) ?? 'N/A'} RUB`);
  } else {
    console.log(`  ADS: No advertising data`);
  }
}
```

### Calculating Key Metrics

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **ROAS** (Return on Ad Spend) | `revenue / adSpent` | Values above 1.0 mean profitable advertising |
| **CPA** (Cost per Acquisition) | `adSpent / adOrders` | Lower is better; compare across products |
| **Organic vs Paid Split** | `organicOrders / totalOrders` | High organic share means strong product positioning |
| **Blended Conversion** | `totalOrders / totalViews` | Overall funnel health metric |

::: tip
ROAS above 3x is generally considered strong on Wildberries. If a product's ROAS drops below 1.5x, consider pausing advertising and investigating the product card quality, pricing, or reviews.
:::

---

## Historical Trend Analysis

### Daily and Weekly Trends

Use `getSalesFunnelProductsHistory()` to track how product performance changes over time:

```typescript
async function trendAnalysis(
  sdk: WildberriesSDK,
  nmIds: number[],
  period: { start: string; end: string }
) {
  const history = await sdk.analytics.getSalesFunnelProductsHistory({
    selectedPeriod: period,
    nmIds,
    aggregationLevel: 'day',
    skipDeletedNm: true,
  });

  for (const item of history) {
    console.log(`\nTrend: ${item.product.title}`);
    console.log('Date       | Views | Cart | Orders | Revenue    | Cart% | Order%');
    console.log('-----------|-------|------|--------|------------|-------|-------');

    for (const day of item.history) {
      const date = day.date.substring(0, 10);
      console.log(
        `${date} | ${String(day.openCount).padStart(5)} | ${String(day.cartCount).padStart(4)} | ${String(day.orderCount).padStart(6)} | ${String(day.orderSum).padStart(10)} | ${day.addToCartConversion.toFixed(1).padStart(5)}% | ${day.cartToOrderConversion.toFixed(1).padStart(5)}%`
      );
    }
  }
}
```

### Period-over-Period Comparison

Use the `pastPeriod` parameter in `getSalesFunnelProducts()` to compare two time ranges:

```typescript
const comparison = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  pastPeriod: { start: '2025-12-01', end: '2025-12-31' },
  nmIds: [168120815],
  subjectIds: [],
  tagIds: [],
  brandNames: [],
  limit: 10,
  offset: 0,
  skipDeletedNm: true,
});

for (const item of comparison.products) {
  const { product, statistic } = item;
  const comp = statistic.comparison;

  console.log(`${product.title}:`);
  console.log(`  Current month: ${statistic.selected.orderCount} orders, ${statistic.selected.orderSum} RUB`);

  if (statistic.past) {
    console.log(`  Previous month: ${statistic.past.orderCount} orders, ${statistic.past.orderSum} RUB`);
  }

  if (comp) {
    console.log(`  Changes:`);
    console.log(`    Views: ${comp.openCountDynamic > 0 ? '+' : ''}${comp.openCountDynamic}%`);
    console.log(`    Cart: ${comp.cartCountDynamic > 0 ? '+' : ''}${comp.cartCountDynamic}%`);
    console.log(`    Orders: ${comp.orderCountDynamic > 0 ? '+' : ''}${comp.orderCountDynamic}%`);
    console.log(`    Revenue: ${comp.orderSumDynamic > 0 ? '+' : ''}${comp.orderSumDynamic}%`);
    console.log(`    Buyouts: ${comp.buyoutCountDynamic > 0 ? '+' : ''}${comp.buyoutCountDynamic}%`);
    console.log(`    Wishlist: ${comp.addToWishlistDynamic > 0 ? '+' : ''}${comp.addToWishlistDynamic}%`);
  }
}
```

#### Comparison (Dynamic) Fields

All dynamic fields are percentage changes between `selectedPeriod` and `pastPeriod`:

`openCountDynamic`, `cartCountDynamic`, `orderCountDynamic`, `orderSumDynamic`, `buyoutCountDynamic`, `buyoutSumDynamic`, `cancelCountDynamic`, `cancelSumDynamic`, `avgOrdersCountPerDayDynamic`, `avgPriceDynamic`, `shareOrderPercentDynamic`, `addToWishlistDynamic`, `timeToReadyDynamic`, `localizationPercentDynamic`, `wbClubDynamic.*`

### Building Week-over-Week Reports

```typescript
async function weekOverWeekReport(sdk: WildberriesSDK, nmIds: number[]) {
  const now = new Date();
  const thisWeekEnd = now.toISOString().split('T')[0];
  const thisWeekStart = new Date(now.getTime() - 6 * 86400000).toISOString().split('T')[0];
  const lastWeekEnd = new Date(now.getTime() - 7 * 86400000).toISOString().split('T')[0];
  const lastWeekStart = new Date(now.getTime() - 13 * 86400000).toISOString().split('T')[0];

  const result = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: { start: thisWeekStart, end: thisWeekEnd },
    pastPeriod: { start: lastWeekStart, end: lastWeekEnd },
    nmIds,
    subjectIds: [],
    tagIds: [],
    brandNames: [],
    limit: 50,
    offset: 0,
    skipDeletedNm: true,
    orderBy: { field: 'orderSum', mode: 'desc' },
  });

  console.log(`\nWeek-over-Week Report (${thisWeekStart} vs ${lastWeekStart})\n`);

  for (const item of result.products) {
    const { product, statistic } = item;
    const change = statistic.comparison;

    console.log(`${product.title}:`);
    console.log(`  This week: ${statistic.selected.orderCount} orders, ${statistic.selected.orderSum} RUB`);
    if (change) {
      const trend = change.orderCountDynamic > 0 ? 'UP' : change.orderCountDynamic < 0 ? 'DOWN' : 'FLAT';
      console.log(`  Trend: ${trend} (${change.orderCountDynamic}%)`);
    }
  }
}
```

---

## Data Aggregation Patterns

### Aggregating by Brand

Filter funnel data for a specific brand to assess brand-level performance:

```typescript
const brandData = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  brandNames: ['MyBrand'],
  subjectIds: [],
  tagIds: [],
  limit: 100,
  offset: 0,
  skipDeletedNm: true,
  orderBy: { field: 'orderSum', mode: 'desc' },
});

let totalViews = 0;
let totalOrders = 0;
let totalRevenue = 0;

for (const item of brandData.products) {
  totalViews += item.statistic.selected.openCount;
  totalOrders += item.statistic.selected.orderCount;
  totalRevenue += item.statistic.selected.orderSum;
}

console.log(`Brand totals: ${totalViews} views, ${totalOrders} orders, ${totalRevenue} RUB`);
console.log(`Blended conversion: ${((totalOrders / totalViews) * 100).toFixed(2)}%`);
```

### Aggregating by Category

Use `subjectIds` to focus on specific product categories:

```typescript
const categoryData = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  subjectIds: [105, 206],  // Specific category IDs
  brandNames: [],
  tagIds: [],
  limit: 100,
  offset: 0,
  skipDeletedNm: true,
});
```

### Using Tags for Custom Grouping

Tags allow custom product grouping (e.g., "seasonal", "bestsellers", "clearance"):

```typescript
const tagData = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  tagIds: [42],  // Custom tag ID
  subjectIds: [],
  brandNames: [],
  limit: 100,
  offset: 0,
  skipDeletedNm: true,
});
```

### Pre-Aggregated Group History

Use `getSalesFunnelGroupedHistory()` for aggregate trends without loading individual products:

```typescript
const groupedTrends = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  brandNames: ['BrandA', 'BrandB'],
  subjectIds: [],
  tagIds: [],
  aggregationLevel: 'week',
  skipDeletedNm: true,
});

for (const group of groupedTrends) {
  console.log(`\nGroup: ${group.product.brandName} - ${group.product.subjectName}`);
  for (const week of group.history) {
    console.log(`  ${week.date}: ${week.orderCount} orders, ${week.orderSum} RUB, buyout ${week.buyoutPercent}%`);
  }
}
```

### Pagination for Large Catalogs

When your catalog exceeds the page limit, iterate with `offset`:

```typescript
async function fetchAllProducts(
  sdk: WildberriesSDK,
  period: { start: string; end: string }
) {
  const pageSize = 100;
  let offset = 0;
  const allProducts: Array<{ product: any; statistic: any }> = [];

  while (true) {
    const page = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: period,
      subjectIds: [],
      tagIds: [],
      brandNames: [],
      limit: pageSize,
      offset,
      skipDeletedNm: true,
      orderBy: { field: 'orderSum', mode: 'desc' },
    });

    allProducts.push(...page.products);

    if (page.products.length < pageSize) {
      break;  // Last page
    }

    offset += pageSize;

    // Respect rate limit: 3 req/min with 20s intervals
    await new Promise(resolve => setTimeout(resolve, 21_000));
  }

  console.log(`Fetched ${allProducts.length} products total`);
  return allProducts;
}
```

::: danger
Always add a delay of at least 21 seconds between paginated requests to `getSalesFunnelProducts()`. The rate limit is 3 requests per minute with 20-second intervals.
:::

---

## Optimization Strategies

### Identify Underperforming Products

Products with high views but low conversion indicate card quality issues:

```typescript
function findUnderperformers(
  products: Array<{ product: any; statistic: any }>,
  minViews: number = 100
) {
  return products
    .filter(item => {
      const stats = item.statistic.selected;
      return stats.openCount >= minViews
        && stats.conversions.addToCartPercent < 3;
    })
    .sort((a, b) =>
      b.statistic.selected.openCount - a.statistic.selected.openCount
    );
}
```

::: tip
A card-to-cart conversion below 3% with over 100 views typically indicates issues with photos, description, pricing, or reviews. Check `productRating` and `feedbackRating` in the product data.
:::

### Find Products Benefiting from Advertising

Compare advertising orders to organic performance to measure ad dependency:

```typescript
function analyzeAdDependency(
  crossChannelData: Array<{
    organic: { orders: number };
    advertising: { orders: number; spent: number } | null;
    roas: number | null;
  }>
) {
  for (const item of crossChannelData) {
    if (!item.advertising) continue;
    const adOrderShare = item.advertising.orders / (item.organic.orders || 1);

    if (adOrderShare > 0.5 && (item.roas ?? 0) < 1.5) {
      // High ad dependency with low ROAS -- review advertising strategy
    }
  }
}
```

### Budget Reallocation Based on ROAS

Sort products by ROAS and recommend budget changes:

- **ROAS above 3x**: Increase budget -- strong return
- **ROAS 1.5x-3x**: Maintain budget -- acceptable return
- **ROAS below 1.5x**: Decrease budget or pause -- poor return

### Stock Management Integration

The v3 funnel data includes `stocks.wb` (WB warehouse) and `stocks.mp` (seller warehouse). Combine with `avgOrdersCountPerDay` to calculate days-of-stock and create low-stock alerts:

```typescript
function checkStockHealth(products: Array<{ product: any; statistic: any }>) {
  for (const item of products) {
    const { product, statistic } = item;
    const totalStock = product.stocks.wb + product.stocks.mp;
    const dailyOrders = statistic.selected.avgOrdersCountPerDay;

    if (dailyOrders > 0) {
      const daysOfStock = totalStock / dailyOrders;
      if (daysOfStock < 7) {
        console.log(`LOW STOCK: ${product.title} -- ${daysOfStock.toFixed(0)} days left`);
      }
    }
  }
}
```

---

## Rate Limiting and Performance

### Rate Limits Reference

| Method | Module | Rate Limit | Interval |
|--------|--------|------------|----------|
| `getSalesFunnelProducts()` | Analytics | 3 req/min | 20s between requests |
| `getSalesFunnelProductsHistory()` | Analytics | 3 req/min | 20s between requests |
| `getSalesFunnelGroupedHistory()` | Analytics | 3 req/min | 20s between requests |
| `getAdvFullstats()` | Promotion | 3 req/min | 20s between requests |

::: warning Removed in v4.0.0
The standalone `getStatsKeywords()`, `getStatWords()`, and `getAutoStatWords()` methods were **removed in v4.0.0** (WB disabled the underlying v0/v1 advert API). They are no longer available — use `getAdvFullstats()` for all advertising performance data. See `docs/guides/migration-v4.md` for the full replacement table.
:::

### Sequential Polling with Rate Limit Safety

```typescript
import { RateLimitError } from 'daytona-wildberries-typescript-sdk';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function safeFunnelRequest<T>(
  fn: () => Promise<T>,
  retries: number = 2
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (error instanceof RateLimitError && attempt < retries) {
        console.log(`Rate limited, waiting 21s (attempt ${attempt + 1}/${retries})`);
        await delay(21_000);
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
}
```

### Batch Campaign IDs

When fetching advertising stats, batch up to 100 campaign IDs per request:

```typescript
async function batchAdStats(sdk: WildberriesSDK, ids: number[], period: { start: string; end: string }) {
  const results = [];
  for (let i = 0; i < ids.length; i += 100) {
    const batch = ids.slice(i, i + 100);
    const stats = await sdk.promotion.getAdvFullstats({
      ids: batch.join(','),
      beginDate: period.start,
      endDate: period.end,
    });
    results.push(...stats);
    if (i + 100 < ids.length) await delay(21_000);
  }
  return results;
}
```

### Caching Recommendations

| Data Type | Cache Duration | Reason |
|-----------|---------------|--------|
| Product funnel data | 30-60 min | Updates are not real-time |
| Advertising stats | 15-30 min | Updates more frequently |
| Historical data | 2-4 hours | Past data does not change |
| Campaign list | 5-10 min | Campaigns may be created/paused |

---

## Migration Notes (v2.6 to v2.7)

### Deprecated Methods

| Deprecated (v2) | Replacement (v3) |
|------------------|------------------|
| `createNmReportDetail()` | `getSalesFunnelProducts()` |
| `createDetailHistory()` | `getSalesFunnelProductsHistory()` |
| `createGroupedHistory()` | `getSalesFunnelGroupedHistory()` |

The deprecated methods still exist as wrappers that internally call v3, but they return v3 response shapes cast to old types. Migrate for correct TypeScript types.

### Request Field Renames

| v2 Field | v3 Field |
|----------|----------|
| `period: { begin, end }` | `selectedPeriod: { start, end }` |
| `nmIDs` | `nmIds` |
| `objectIDs` | `subjectIds` |
| `tagIDs` | `tagIds` |
| `page` | `limit` + `offset` |
| `timezone` | *(removed)* |

### Response Field Renames

| v2 Field | v3 Field |
|----------|----------|
| `openCardCount` | `openCount` |
| `addToCartCount` | `cartCount` |
| `ordersCount` | `orderCount` |
| `ordersSumRub` | `orderSum` |
| `buyoutsSumRub` | `buyoutSum` |
| `cancelSumRub` | `cancelSum` |
| `avgPriceRub` | `avgPrice` |
| `dt` | `date` |

### New v3-Only Fields

`shareOrderPercent`, `addToWishlist`, `timeToReady`, `localizationPercent`, `wbClub.*`, `productRating`, `feedbackRating`, `stocks.balanceSum`

For the full migration guide, see [Migration v2.7 - Analytics v3](./migration-v2.7-analytics-v3.md).

---

## Complete Dashboard Example

A full example combining organic and advertising data into a console dashboard:

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
} from 'daytona-wildberries-typescript-sdk';

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function analyticsDashboard() {
  const sdk = new WildberriesSDK({
    apiKey: process.env.WB_API_KEY!,
    retryConfig: { maxRetries: 3, retryDelay: 1000, exponentialBackoff: true },
  });

  const period = { start: '2026-01-01', end: '2026-01-31' };

  try {
    // 1. Fetch top products by revenue
    console.log('Fetching organic funnel data...');
    const products = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: period,
      pastPeriod: { start: '2025-12-01', end: '2025-12-31' },
      subjectIds: [],
      tagIds: [],
      brandNames: [],
      limit: 20,
      offset: 0,
      skipDeletedNm: true,
      orderBy: { field: 'orderSum', mode: 'desc' },
    });

    await delay(21_000);

    // 2. Fetch campaign list
    console.log('Fetching campaign list...');
    const campaigns = await sdk.promotion.getCampaignCount();
    const activeIds = campaigns.adverts
      ?.filter(g => g.status === 9)
      .flatMap(g => g.advert_list?.map(a => a.advertId) ?? [])
      .filter((id): id is number => id !== undefined) ?? [];

    await delay(21_000);

    // 3. Fetch advertising stats
    let adStats: any[] = [];
    if (activeIds.length > 0) {
      console.log(`Fetching ad stats for ${activeIds.length} campaigns...`);
      adStats = await sdk.promotion.getAdvFullstats({
        ids: activeIds.slice(0, 100).join(','),
        beginDate: period.start,
        endDate: period.end,
      });
    }

    // 4. Build ad metrics map by nmId
    const adMap = new Map<number, { clicks: number; views: number; orders: number; spent: number }>();
    for (const c of adStats) {
      if (!c.days) continue;
      for (const day of c.days as any[]) {
        for (const app of day.apps ?? []) {
          for (const nm of app.nms ?? []) {
            const e = adMap.get(nm.nmId) ?? { clicks: 0, views: 0, orders: 0, spent: 0 };
            e.clicks += nm.clicks ?? 0;
            e.views += nm.views ?? 0;
            e.orders += nm.orders ?? 0;
            e.spent += nm.sum ?? 0;
            adMap.set(nm.nmId, e);
          }
        }
      }
    }

    // 5. Print dashboard
    console.log('\n========================================');
    console.log('  WILDBERRIES ANALYTICS DASHBOARD');
    console.log(`  Period: ${period.start} to ${period.end}`);
    console.log('========================================\n');

    let totalRevenue = 0;
    let totalAdSpend = 0;

    for (const item of products.products) {
      const { product, statistic } = item;
      const ad = adMap.get(product.nmId);
      const sel = statistic.selected;

      totalRevenue += sel.orderSum;
      if (ad) totalAdSpend += ad.spent;

      console.log(`--- ${product.title} (${product.nmId}) ---`);
      console.log(`  Views: ${sel.openCount} | Orders: ${sel.orderCount} | Revenue: ${sel.orderSum} RUB`);
      console.log(`  Conv: cart ${sel.conversions.addToCartPercent}% | order ${sel.conversions.cartToOrderPercent}% | buyout ${sel.conversions.buyoutPercent}%`);

      if (ad) {
        const roas = ad.spent > 0 ? (sel.orderSum / ad.spent).toFixed(2) : 'N/A';
        console.log(`  Ads: ${ad.clicks} clicks, ${ad.orders} orders, ${ad.spent} RUB spent | ROAS: ${roas}x`);
      }
      console.log('');
    }

    console.log('========================================');
    console.log(`  Total Revenue: ${totalRevenue} RUB`);
    console.log(`  Total Ad Spend: ${totalAdSpend} RUB`);
    if (totalAdSpend > 0) {
      console.log(`  Overall ROAS: ${(totalRevenue / totalAdSpend).toFixed(2)}x`);
    }
    console.log('========================================');

  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.error('Authentication failed. Check your API key.');
    } else if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded. Increase delays between requests.');
    } else if (error instanceof ValidationError) {
      console.error('Validation error:', (error as any).message);
    } else {
      throw error;
    }
  }
}

analyticsDashboard();
```

---

## Related Guides

- [Advertising Campaign Best Practices](./best-practices-advertising.md)
- [Advertising Statistics Guide](./advertising-statistics-guide.md)
- [Migration v2.7 - Analytics v3](./migration-v2.7-analytics-v3.md)
- [Production Best Practices](./best-practices.md)
- [Analytics Dashboard Tutorial](/getting-started/tutorials/analytics-dashboard.md)
