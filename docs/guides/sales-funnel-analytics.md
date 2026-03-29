---
title: Sales Funnel Analytics
description: Comprehensive guide to analyzing sales funnel data using the Wildberries SDK
layout: doc
---

# Sales Funnel Analytics

This guide covers the Wildberries Sales Funnel API (v3) and explains how to use the SDK to retrieve, filter, and analyze product performance data at every stage of the buyer journey.

**Target Audience**: Developers building analytics dashboards, product managers tracking conversion metrics, and data analysts working with Wildberries seller data

**Prerequisites**: SDK installed and configured, valid API key with Analytics permissions

**Estimated Reading Time**: 25 minutes

---

## Table of Contents

1. [What is the Sales Funnel](#what-is-the-sales-funnel)
2. [SDK Methods](#sdk-methods)
3. [Key Metrics Reference](#key-metrics-reference)
4. [Filtering and Sorting](#filtering-and-sorting)
5. [Practical Scenarios](#practical-scenarios)
6. [CSV Reports for Extended Periods](#csv-reports-for-extended-periods)
7. [Rate Limits](#rate-limits)
8. [Error Handling](#error-handling)
9. [Related Resources](#related-resources)

---

## What is the Sales Funnel

The sales funnel on Wildberries tracks the buyer journey from initial product discovery through to a completed purchase that the customer keeps. The Wildberries API provides quantitative metrics for each stage, allowing you to measure how effectively your products convert browsing activity into revenue.

### Funnel Stages

```
Impressions (openCount)
    Product card views -- the customer opens the product page
        |
        |  addToCartPercent  (view-to-cart conversion)
        v
Cart (cartCount)
    Customer adds the product to their cart
        |
        |  cartToOrderPercent  (cart-to-order conversion)
        v
Orders (orderCount / orderSum)
    Customer places the order and pays
        |
        |  buyoutPercent  (order-to-buyout conversion)
        v
Purchases (buyoutCount / buyoutSum)
    Customer receives and keeps the product
```

At each transition, a percentage of customers drops off. The SDK returns conversion rates for every transition so you can identify where products lose the most potential buyers.

Cancellations (`cancelCount`, `cancelSum`) are tracked separately and represent orders that were placed but later cancelled before or after delivery.

---

## SDK Methods

The Analytics module provides three methods for sales funnel data. Each targets a different analytical use case.

### getSalesFunnelProducts -- Summary Report

Returns a paginated list of products with aggregated funnel metrics for a selected period. Optionally compares the selected period against a past period, producing delta values for every metric.

**Period limit**: up to 365 days.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: {
    start: '2026-01-01',
    end: '2026-01-31',
  },
  pastPeriod: {
    start: '2025-12-01',
    end: '2025-12-31',
  },
  orderBy: { field: 'orderSum', mode: 'desc' },
  limit: 20,
  offset: 0,
  skipDeletedNm: true,
});

for (const entry of report.products) {
  const { product, statistic } = entry;
  const current = statistic.selected;
  console.log(
    `${product.title} (nmId: ${product.nmId})`,
    `| Views: ${current.openCount}`,
    `| Cart: ${current.cartCount}`,
    `| Orders: ${current.orderCount} (${current.orderSum} ${report.currency})`,
    `| Buyout: ${current.buyoutCount} (${current.conversions.buyoutPercent}%)`,
  );

  // Period-over-period comparison (available when pastPeriod is provided)
  if (statistic.comparison) {
    console.log(
      `  Delta: orders ${statistic.comparison.orderCountDynamic > 0 ? '+' : ''}${statistic.comparison.orderCountDynamic}%`,
      `| buyouts ${statistic.comparison.buyoutCountDynamic > 0 ? '+' : ''}${statistic.comparison.buyoutCountDynamic}%`,
    );
  }
}
```

**Request parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selectedPeriod` | `DatePeriod` | Yes | Start and end dates (`YYYY-MM-DD`) for the report |
| `pastPeriod` | `DatePeriod` | No | Comparison period. When provided, response includes `comparison` deltas |
| `nmIds` | `number[]` | No | Filter by WB article IDs |
| `brandNames` | `string[]` | No | Filter by brand names |
| `subjectIds` | `number[]` | No | Filter by subject (category) IDs |
| `tagIds` | `number[]` | No | Filter by tag IDs |
| `skipDeletedNm` | `boolean` | No | Exclude deleted product cards from results |
| `orderBy` | `SalesFunnelOrderBy` | No | Sort field and direction (`asc` or `desc`) |
| `limit` | `number` | No | Number of products per page |
| `offset` | `number` | No | Number of products to skip (for pagination) |

### getSalesFunnelProductsHistory -- Daily/Weekly Breakdown

Returns day-by-day or week-by-week statistics for specific products. Use this method to track how individual product metrics change over time.

**Period limit**: maximum 7 days.

**Note**: The `nmIds` parameter is required for this method.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const history = await sdk.analytics.getSalesFunnelProductsHistory({
  selectedPeriod: {
    start: '2026-03-22',
    end: '2026-03-28',
  },
  nmIds: [268913787],
  aggregationLevel: 'day',
  skipDeletedNm: true,
});

// Response is an array -- one element per product
for (const item of history) {
  console.log(`Product: ${item.product.title} (nmId: ${item.product.nmId})`);

  for (const day of item.history) {
    console.log(
      `  ${day.date}`,
      `| Views: ${day.openCount}`,
      `| Cart: ${day.cartCount} (${day.addToCartConversion}%)`,
      `| Orders: ${day.orderCount} (${day.cartToOrderConversion}%)`,
      `| Buyout: ${day.buyoutCount} (${day.buyoutPercent}%)`,
    );
  }
}
```

**Request parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selectedPeriod` | `DatePeriod` | Yes | Start and end dates (max 7-day span) |
| `nmIds` | `number[]` | Yes | WB article IDs to retrieve history for |
| `skipDeletedNm` | `boolean` | No | Exclude deleted product cards |
| `aggregationLevel` | `'day' \| 'week'` | No | Granularity of the breakdown. Defaults to `'day'` |

### getSalesFunnelGroupedHistory -- Grouped by Category/Brand/Tag

Returns daily or weekly statistics grouped by subjects, brands, or tags rather than individual products. Use this to analyze performance trends at the category or brand level.

**Period limit**: maximum 7 days.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: {
    start: '2026-03-22',
    end: '2026-03-28',
  },
  subjectIds: [105],       // e.g., "T-shirts" category
  aggregationLevel: 'day',
  skipDeletedNm: true,
});

for (const group of grouped) {
  console.log(`Group: ${group.product.subjectName} / ${group.product.brandName}`);
  for (const day of group.history) {
    console.log(
      `  ${day.date}: ${day.orderCount} orders, ${day.buyoutPercent}% buyout`,
    );
  }
}
```

**Request parameters**:

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `selectedPeriod` | `DatePeriod` | Yes | Start and end dates (max 7-day span) |
| `brandNames` | `string[]` | No | Filter by brand names |
| `subjectIds` | `number[]` | No | Filter by subject (category) IDs |
| `tagIds` | `number[]` | No | Filter by tag IDs |
| `skipDeletedNm` | `boolean` | No | Exclude deleted product cards |
| `aggregationLevel` | `'day' \| 'week'` | No | Granularity of the breakdown. Defaults to `'day'` |

---

## Key Metrics Reference

### Funnel Volume Metrics

| Metric | Type | Description |
|--------|------|-------------|
| `openCount` | `number` | Product card views (impressions) |
| `cartCount` | `number` | Times the product was added to cart |
| `orderCount` | `number` | Number of orders placed |
| `orderSum` | `number` | Total monetary value of orders |
| `buyoutCount` | `number` | Number of completed purchases (kept by customer) |
| `buyoutSum` | `number` | Total monetary value of buyouts |
| `cancelCount` | `number` | Number of cancelled orders |
| `cancelSum` | `number` | Total monetary value of cancellations |

### Conversion Metrics

The `conversions` object contains the three stage-to-stage conversion rates:

| Metric | Type | Description |
|--------|------|-------------|
| `addToCartPercent` | `number` | Percentage of viewers who added the product to cart |
| `cartToOrderPercent` | `number` | Percentage of cart additions that converted to orders |
| `buyoutPercent` | `number` | Percentage of orders that were completed as purchases |

### Pricing and Revenue

| Metric | Type | Description |
|--------|------|-------------|
| `avgPrice` | `number` | Average selling price for the period |
| `avgOrdersCountPerDay` | `number` | Average number of orders per day |
| `shareOrderPercent` | `number` | Product's share of total seller revenue |

### Engagement and Logistics

| Metric | Type | Description |
|--------|------|-------------|
| `addToWishlist` | `number` | Times the product was added to the Wishlist |
| `timeToReady` | `SalesFunnelTimeToReady` | Average delivery time (days, hours, minutes) |
| `localizationPercent` | `number` | Percentage of orders that are intra-regional (same region as warehouse) |

### WB Club Metrics

The `wbClub` object contains metrics specifically for orders placed by WB Club members:

| Metric | Type | Description |
|--------|------|-------------|
| `wbClub.orderCount` | `number` | Orders from WB Club members |
| `wbClub.orderSum` | `number` | Order value from WB Club members |
| `wbClub.buyoutCount` | `number` | Buyouts by WB Club members |
| `wbClub.buyoutSum` | `number` | Buyout value from WB Club members |
| `wbClub.buyoutPercent` | `number` | Buyout rate for WB Club members |
| `wbClub.avgOrderCountPerDay` | `number` | Average daily orders from WB Club |

### History-Specific Metrics

The daily/weekly history endpoints (`getSalesFunnelProductsHistory` and `getSalesFunnelGroupedHistory`) return `SalesFunnelHistory` records with these fields per time period:

| Field | Type | Description |
|-------|------|-------------|
| `date` | `string` | Date of the data point |
| `openCount` | `number` | Views for that day/week |
| `cartCount` | `number` | Cart additions |
| `orderCount` | `number` | Orders placed |
| `orderSum` | `number` | Order value |
| `buyoutCount` | `number` | Completed purchases |
| `buyoutSum` | `number` | Buyout value |
| `buyoutPercent` | `number` | Buyout rate |
| `addToCartConversion` | `number` | View-to-cart conversion rate |
| `cartToOrderConversion` | `number` | Cart-to-order conversion rate |
| `addToWishlistCount` | `number` | Wishlist additions |

---

## Filtering and Sorting

### Filter Parameters

All three methods support filtering to narrow down the dataset. The summary method (`getSalesFunnelProducts`) supports all filters; the history methods support a subset.

#### nmIds -- Filter by WB Article

Pass an array of Wildberries article numbers to retrieve data for specific products. This is the most common filter when you want to monitor a known set of SKUs.

```typescript
// Monitor your top 5 products
const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
  nmIds: [268913787, 395996251, 112334455, 998877665, 554433221],
});
```

**Supported by**: `getSalesFunnelProducts`, `getSalesFunnelProductsHistory`

#### brandNames -- Filter by Brand

Useful when your seller account manages multiple brands and you want to analyze brand-level performance.

```typescript
const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
  brandNames: ['MyBrand', 'SecondBrand'],
  orderBy: { field: 'orderSum', mode: 'desc' },
  limit: 50,
  offset: 0,
});
```

**Supported by**: `getSalesFunnelProducts`, `getSalesFunnelGroupedHistory`

#### subjectIds -- Filter by Subject (Category)

Subject IDs correspond to Wildberries product categories (e.g., T-shirts, Sneakers). Use this when comparing performance across categories.

```typescript
const grouped = await sdk.analytics.getSalesFunnelGroupedHistory({
  selectedPeriod: { start: '2026-03-22', end: '2026-03-28' },
  subjectIds: [105, 210],   // Two categories
  aggregationLevel: 'day',
});
```

**Supported by**: `getSalesFunnelProducts`, `getSalesFunnelGroupedHistory`

#### tagIds -- Filter by Tag

Tags are seller-defined labels assigned to products in the Wildberries seller portal. Use this to segment analytics by your own organizational structure (e.g., "Summer Collection", "Clearance").

```typescript
const report = await sdk.analytics.getSalesFunnelProducts({
  selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
  tagIds: [42],   // "Summer Collection" tag
  orderBy: { field: 'buyoutCount', mode: 'desc' },
  limit: 100,
  offset: 0,
});
```

**Supported by**: `getSalesFunnelProducts`, `getSalesFunnelGroupedHistory`

#### skipDeletedNm -- Exclude Deleted Cards

When set to `true`, products that have been deleted from your catalog are excluded from results. This keeps your analytics clean when products are discontinued.

**Supported by**: all three methods.

### Sorting (getSalesFunnelProducts only)

The `orderBy` parameter controls the sort order of the paginated result set. It accepts a `field` and a `mode` (`'asc'` or `'desc'`).

Available sort fields:

| Field | Description |
|-------|-------------|
| `openCard` | Sort by product card views |
| `addToCart` | Sort by cart additions |
| `orderCount` | Sort by order quantity |
| `orderSum` | Sort by order revenue |
| `buyoutCount` | Sort by buyout quantity |
| `buyoutSum` | Sort by buyout revenue |
| `cancelCount` | Sort by cancellations |
| `cancelSum` | Sort by cancellation value |
| `avgPrice` | Sort by average price |
| `stockMpQty` | Sort by seller warehouse stock |
| `stockWbQty` | Sort by WB warehouse stock |
| `shareOrderPercent` | Sort by revenue share |
| `addToWishlist` | Sort by wishlist additions |
| `timeToReady` | Sort by delivery time |
| `localizationPercent` | Sort by regional order percentage |

WB Club fields are also available with the `wbClub.` prefix (e.g., `wbClub.orderCount`, `wbClub.buyoutPercent`).

---

## Practical Scenarios

### ABC Analysis of Product Assortment

ABC analysis classifies products into three groups by their contribution to total revenue. Group A products generate roughly 80% of revenue, Group B the next 15%, and Group C the remaining 5%.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function abcAnalysis(startDate: string, endDate: string) {
  // Fetch all products sorted by revenue descending
  const allProducts: Array<{
    nmId: number;
    title: string;
    revenue: number;
    buyoutPercent: number;
  }> = [];

  let offset = 0;
  const pageSize = 100;
  let hasMore = true;

  while (hasMore) {
    const page = await sdk.analytics.getSalesFunnelProducts({
      selectedPeriod: { start: startDate, end: endDate },
      orderBy: { field: 'buyoutSum', mode: 'desc' },
      limit: pageSize,
      offset,
      skipDeletedNm: true,
    });

    for (const entry of page.products) {
      allProducts.push({
        nmId: entry.product.nmId,
        title: entry.product.title,
        revenue: entry.statistic.selected.buyoutSum,
        buyoutPercent: entry.statistic.selected.conversions.buyoutPercent,
      });
    }

    hasMore = page.products.length === pageSize;
    offset += pageSize;
  }

  // Calculate cumulative revenue share
  const totalRevenue = allProducts.reduce((sum, p) => sum + p.revenue, 0);
  let cumulativeShare = 0;

  const classified = allProducts.map((product) => {
    cumulativeShare += product.revenue / totalRevenue;
    let group: 'A' | 'B' | 'C';
    if (cumulativeShare <= 0.8) {
      group = 'A';
    } else if (cumulativeShare <= 0.95) {
      group = 'B';
    } else {
      group = 'C';
    }
    return { ...product, group };
  });

  // Summary
  const groups = { A: 0, B: 0, C: 0 };
  for (const item of classified) {
    groups[item.group]++;
  }

  console.log(`ABC Analysis for ${startDate} to ${endDate}:`);
  console.log(`  Total products: ${classified.length}`);
  console.log(`  Total revenue: ${totalRevenue.toLocaleString()}`);
  console.log(`  Group A: ${groups.A} products (80% of revenue)`);
  console.log(`  Group B: ${groups.B} products (next 15%)`);
  console.log(`  Group C: ${groups.C} products (remaining 5%)`);

  return classified;
}

const result = await abcAnalysis('2026-01-01', '2026-03-28');
```

### Comparing Conversion Rates Across Periods

Identify whether your conversion metrics are improving or declining by comparing the current month against the previous month.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function compareConversions() {
  const report = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: {
      start: '2026-03-01',
      end: '2026-03-28',
    },
    pastPeriod: {
      start: '2026-02-01',
      end: '2026-02-28',
    },
    orderBy: { field: 'orderSum', mode: 'desc' },
    limit: 50,
    offset: 0,
    skipDeletedNm: true,
  });

  console.log('Product Conversion Comparison (March vs February):');
  console.log('---------------------------------------------------');

  for (const entry of report.products) {
    const { product, statistic } = entry;
    const current = statistic.selected.conversions;
    const past = statistic.past?.conversions;

    console.log(`\n${product.title} (${product.nmId}):`);
    console.log(`  Add-to-cart:    ${current.addToCartPercent}%`);
    console.log(`  Cart-to-order:  ${current.cartToOrderPercent}%`);
    console.log(`  Buyout:         ${current.buyoutPercent}%`);

    if (past) {
      const cartDelta = current.addToCartPercent - past.addToCartPercent;
      const orderDelta = current.cartToOrderPercent - past.cartToOrderPercent;
      const buyoutDelta = current.buyoutPercent - past.buyoutPercent;

      console.log(`  vs. past period:`);
      console.log(`    Add-to-cart:   ${cartDelta > 0 ? '+' : ''}${cartDelta.toFixed(1)}pp`);
      console.log(`    Cart-to-order: ${orderDelta > 0 ? '+' : ''}${orderDelta.toFixed(1)}pp`);
      console.log(`    Buyout:        ${buyoutDelta > 0 ? '+' : ''}${buyoutDelta.toFixed(1)}pp`);
    }
  }
}

await compareConversions();
```

### Tracking Daily Trends for a Product

Monitor a specific product's performance day-by-day to detect sudden changes or the impact of promotions.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function trackDailyTrends(nmId: number) {
  const history = await sdk.analytics.getSalesFunnelProductsHistory({
    selectedPeriod: {
      start: '2026-03-22',
      end: '2026-03-28',
    },
    nmIds: [nmId],
    aggregationLevel: 'day',
    skipDeletedNm: true,
  });

  if (history.length === 0) {
    console.log(`No data found for nmId ${nmId}`);
    return;
  }

  const item = history[0];
  console.log(`Daily trends for: ${item.product.title}`);
  console.log(`Period: ${item.history[0]?.date} to ${item.history[item.history.length - 1]?.date}`);
  console.log('');

  // Calculate averages
  const days = item.history;
  const avgViews = days.reduce((s, d) => s + d.openCount, 0) / days.length;
  const avgOrders = days.reduce((s, d) => s + d.orderCount, 0) / days.length;

  console.log(`  Average daily views:  ${avgViews.toFixed(0)}`);
  console.log(`  Average daily orders: ${avgOrders.toFixed(1)}`);
  console.log('');

  // Day-by-day breakdown
  for (const day of days) {
    const viewsVsAvg = ((day.openCount - avgViews) / avgViews * 100).toFixed(0);
    const marker = Math.abs(Number(viewsVsAvg)) > 30 ? ' <-- significant change' : '';

    console.log(
      `  ${day.date}:`,
      `Views: ${day.openCount} (${Number(viewsVsAvg) > 0 ? '+' : ''}${viewsVsAvg}% vs avg)`,
      `| Cart: ${day.addToCartConversion}%`,
      `| Orders: ${day.orderCount}`,
      `| Buyout: ${day.buyoutPercent}%`,
      marker,
    );
  }
}

await trackDailyTrends(268913787);
```

---

## CSV Reports for Extended Periods

The three JSON-based sales funnel methods described above are limited to 365 days (summary) or 7 days (history). For longer time ranges or very large datasets, use the CSV report endpoints instead.

CSV reports are generated asynchronously. You create a report generation task, poll for its status, and then download the resulting ZIP archive containing a CSV file.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Step 1: Create a report generation task
const task = await sdk.analytics.createNmReportDownload({
  reportType: 'SALES_FUNNEL_PRODUCT',
  userReportName: 'Q1 2026 Sales Funnel',
  params: {
    selectedPeriod: {
      start: '2026-01-01',
      end: '2026-03-31',
    },
    aggregationLevel: 'month',
    skipDeletedNm: true,
  },
});

console.log('Report task created:', task.data?.downloadId);
```

CSV reports require a Jam subscription for certain report types. If you need to detect your subscription tier before making requests, see the [Jam Subscription Detection](/guides/jam-subscription) guide.

For a complete walkthrough of the CSV report workflow (creation, polling, download, and parsing), see the [Seller Analytics CSV Reports](/guides/seller-analytics-csv) guide.

---

## Rate Limits

All three sales funnel methods share the same rate limit:

- **3 requests per minute**
- **20-second interval** between requests
- **Burst limit**: 3 requests

The SDK enforces these limits automatically through its built-in rate limiter. If you exceed the limit, the SDK throws a `RateLimitError` with retry timing information.

When paginating through large datasets, add a brief delay between pages:

```typescript
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

let offset = 0;
const pageSize = 100;

while (true) {
  const page = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: { start: '2026-01-01', end: '2026-03-28' },
    orderBy: { field: 'orderSum', mode: 'desc' },
    limit: pageSize,
    offset,
  });

  // Process page...

  if (page.products.length < pageSize) break;
  offset += pageSize;

  // Respect the 20-second interval
  await delay(20_000);
}
```

---

## Error Handling

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';
import {
  RateLimitError,
  AuthenticationError,
  ValidationError,
} from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

try {
  const report = await sdk.analytics.getSalesFunnelProducts({
    selectedPeriod: { start: '2026-03-01', end: '2026-03-28' },
    limit: 20,
    offset: 0,
  });
  // Process report...
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error(`Rate limited. Retry after ${error.retryAfter}ms`);
  } else if (error instanceof AuthenticationError) {
    console.error('Invalid API key. Check your credentials.');
  } else if (error instanceof ValidationError) {
    console.error('Invalid request parameters:', error.message);
  } else {
    throw error;
  }
}
```

Common validation errors:

- **Period exceeds maximum**: The summary endpoint allows up to 365 days; the history endpoints allow up to 7 days. Exceeding these limits returns a 400 error.
- **Missing required nmIds**: The `getSalesFunnelProductsHistory` method requires at least one `nmId`.
- **Invalid date format**: Dates must be in `YYYY-MM-DD` format.

---

## Related Resources

- [Analytics Module Reference](/modules/analytics) -- Full API reference for all analytics methods
- [Sales Funnel Analytics Best Practices](/guides/best-practices-sales-funnel) -- Optimization strategies combining organic and advertising funnel data
- [Jam Subscription Detection](/guides/jam-subscription) -- Detect your Jam tier for correct analytics limits
- [Production Best Practices](/guides/best-practices) -- Error handling, rate limiting, and deployment patterns
