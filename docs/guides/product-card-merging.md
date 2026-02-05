# Product Card Merging & Analytics Guide

This comprehensive guide covers Wildberries product card merging (склейка карточек), including creation, management, analytics tracking, and advertising traffic distribution across merged cards.

## Table of Contents

- [Overview](#overview)
- [Understanding Card Merging](#understanding-card-merging)
- [Managing Merged Cards](#managing-merged-cards)
- [Analytics for Merged Cards](#analytics-for-merged-cards)
- [Advertising Analytics](#advertising-analytics)
- [Traffic Distribution in Merged Cards](#traffic-distribution-in-merged-cards)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Overview

**Product card merging** (объединение карточек) is a powerful Wildberries feature that allows sellers to combine multiple product cards (different variants) under a single unified listing. This creates a better customer experience and enables sophisticated advertising strategies.

### Key Capabilities

- **Unified Listing**: Multiple product variants (colors, sizes, configurations) appear as one card
- **Shared Traffic**: Advertising purchased for one variant drives traffic to all variants in the merged card
- **Cross-Variant Sales**: Customers arriving via one variant can purchase any variant in the merged card
- **Centralized Analytics**: Track performance across all variants in the merged card
- **Advertising Efficiency**: Optimize ad spend by targeting high-conversion variants while benefiting entire product line

### The `imtID` Concept

All merged cards share a common identifier: **`imtID`** (ID объединённой карточки товара).

- Every product card has an `imtID`, even if not merged with others
- Cards with the **same `imtID`** are merged together
- `imtID` persists across the merged card lifecycle
- Use `imtID` to identify, filter, and manage merged cards

---

## Understanding Card Merging

### What is a Merged Card?

A **merged card** is a group of product cards (variants) that appear as a single listing to customers on Wildberries marketplace.

**Example Scenario:**

```
Smartphone "SuperPhone X"
├─ Black, 128GB (nmID: 12345678, imtID: 999888)
├─ White, 128GB (nmID: 23456789, imtID: 999888)
├─ Black, 256GB (nmID: 34567890, imtID: 999888)
└─ White, 256GB (nmID: 45678901, imtID: 999888)

All 4 variants share imtID: 999888 → Merged Card
```

### How Customers See Merged Cards

On the Wildberries marketplace, customers see:
- **One main product card** with primary image
- **Variant selectors** (color, size, configuration buttons)
- **Unified reviews** across all variants
- **Combined availability** from all variants

### Benefits of Merging Cards

1. **Better Customer Experience**: Easy variant selection without searching multiple listings
2. **Improved Conversion**: Customers find all options in one place
3. **SEO Advantages**: Consolidated reviews and traffic signals
4. **Advertising Efficiency**: Buy ads for one variant, benefit entire product line
5. **Simplified Management**: Manage related products as a group

### Merging Requirements

⚠️ **Critical Limitation**: You can only merge cards with **identical subjectID** (product category).

```typescript
// ✅ Valid merge: Same subjectID (3091 - Smartphones)
const validMerge = {
  targetIMT: 999888,
  nmIDs: [12345678, 23456789, 34567890] // All have subjectID: 3091
};

// ❌ Invalid merge: Different subjectIDs
const invalidMerge = {
  targetIMT: 999888,
  nmIDs: [12345678, 99887766] // Different subjectIDs → API error
};
```

---

## Managing Merged Cards

### Identifying Merged Cards

#### Method 1: Filter by `imtID`

Get all cards in a specific merged card:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Get all variants in merged card 999888
const response = await sdk.products.getCardsList({
  settings: {
    filter: {
      imtID: 999888,
      withPhoto: -1 // All cards (with or without photos)
    },
    cursor: {
      limit: 100
    }
  }
});

console.log(`Merged card contains ${response.cards?.length} variants`);
response.cards?.forEach(card => {
  console.log(`- nmID: ${card.nmID}, Vendor Code: ${card.vendorCode}`);
});
```

#### Method 2: Find All Merged Cards

Identify all merged cards in your catalog:

```typescript
// Get all product cards
const allCards = await sdk.products.getCardsList({
  settings: {
    filter: { withPhoto: -1 },
    cursor: { limit: 1000 }
  }
});

// Group by imtID
const grouped = (allCards.cards || []).reduce((acc, card) => {
  const id = card.imtID!;
  if (!acc[id]) acc[id] = [];
  acc[id].push(card);
  return acc;
}, {} as Record<number, typeof allCards.cards>);

// Find merged cards (imtID with multiple cards)
const mergedCards = Object.entries(grouped)
  .filter(([_, cards]) => cards.length > 1)
  .map(([imtID, cards]) => ({
    imtID: Number(imtID),
    variantCount: cards.length,
    nmIDs: cards.map(c => c.nmID),
    vendorCodes: cards.map(c => c.vendorCode)
  }));

console.log(`Found ${mergedCards.length} merged cards`);
mergedCards.forEach(merged => {
  console.log(`\nimtID ${merged.imtID}: ${merged.variantCount} variants`);
  console.log(`  Vendor Codes: ${merged.vendorCodes.join(', ')}`);
});
```

**Output Example:**
```
Found 3 merged cards

imtID 999888: 4 variants
  Vendor Codes: PHONE-BLK-128, PHONE-WHT-128, PHONE-BLK-256, PHONE-WHT-256

imtID 777666: 2 variants
  Vendor Codes: CASE-BLK, CASE-WHT

imtID 555444: 3 variants
  Vendor Codes: HEADPHONES-BLK, HEADPHONES-WHT, HEADPHONES-BLUE
```

### Creating Merged Cards

#### Option 1: Merge Existing Cards

Combine existing product cards under one `imtID`:

```typescript
// Merge 3 existing cards under existing imtID 999888
await sdk.products.createCardsMovenm({
  targetIMT: 999888,        // Existing imtID (from any card you want to keep)
  nmIDs: [12345678, 23456789, 34567890]  // Up to 30 cards
});

console.log('Cards merged successfully');
```

**Response:**
```json
{
  "data": null,
  "error": false,
  "errorText": "",
  "additionalErrors": {}
}
```

#### Option 2: Create Card and Attach to Existing Merged Card

Create a new variant and immediately attach to an existing merged card:

```typescript
// Create new variant and attach to imtID 999888
const result = await sdk.products.createUploadAdd({
  imtID: 999888,
  cardsToAdd: [
    {
      vendorCode: 'PHONE-BLUE-128',
      title: 'SuperPhone X Blue 128GB',
      description: 'Latest smartphone in stunning blue',
      characteristics: [
        { id: 14177858, value: 'SuperBrand' }, // Brand
        { id: 85, value: ['Blue'] },           // Color
        { id: 200, value: 128 }                // Storage
      ],
      sizes: [
        {
          techSize: '0',
          skus: ['8800555123456'],
          price: 49990
        }
      ]
    }
  ]
});

console.log('New variant created and attached to merged card');
```

#### Option 3: Create Merged Card from Scratch

Create multiple variants as a merged card in one request:

```typescript
const newMergedCard = await sdk.products.createCardsUpload([
  {
    subjectID: 3091, // Smartphones
    variants: [
      {
        vendorCode: 'PHONE-BLK-128',
        title: 'SuperPhone X Black 128GB',
        description: 'Flagship smartphone',
        characteristics: [
          { id: 14177858, value: 'SuperBrand' },
          { id: 85, value: ['Black'] },
          { id: 200, value: 128 }
        ],
        sizes: [
          {
            techSize: '0',
            skus: ['8800555111111'],
            price: 49990
          }
        ]
      },
      {
        vendorCode: 'PHONE-WHT-128',
        title: 'SuperPhone X White 128GB',
        description: 'Flagship smartphone',
        characteristics: [
          { id: 14177858, value: 'SuperBrand' },
          { id: 85, value: ['White'] },
          { id: 200, value: 128 }
        ],
        sizes: [
          {
            techSize: '0',
            skus: ['8800555222222'],
            price: 49990
          }
        ]
      }
    ]
  }
]);

console.log('Merged card created with 2 variants');
```

### Unmerging Cards

Separate merged cards to give each variant a unique `imtID`:

```typescript
// Unmerge ONE card at a time to get unique imtID
await sdk.products.createCardsMovenm({
  nmIDs: [12345678] // Pass single nmID for unique imtID
});

console.log('Card unmerged with new unique imtID');
```

⚠️ **Important**: If you unmerge multiple cards simultaneously, they will be merged together under a new `imtID`. To give each card a unique `imtID`, **unmerge one card per request**.

```typescript
// ❌ Wrong: Will merge these 3 cards together under new imtID
await sdk.products.createCardsMovenm({
  nmIDs: [12345678, 23456789, 34567890]
});

// ✅ Correct: Each gets unique imtID
await sdk.products.createCardsMovenm({ nmIDs: [12345678] });
await sdk.products.createCardsMovenm({ nmIDs: [23456789] });
await sdk.products.createCardsMovenm({ nmIDs: [34567890] });
```

---

## Analytics for Merged Cards

### Understanding Merged Card Analytics

Wildberries tracks performance metrics at multiple levels:
- **Per-variant (nmID)**: Individual product card performance
- **Per-merged-card (imtID)**: Aggregated performance across all variants

### Key Analytics Metrics

| Metric | Description | Available At |
|--------|-------------|--------------|
| Views | Product page views | Per-variant, Per-merged-card |
| Add to Cart | Items added to cart | Per-variant, Per-merged-card |
| Orders | Completed purchases | Per-variant, Per-merged-card |
| Revenue | Total sales value | Per-variant, Per-merged-card |
| Conversion Rate | Orders / Views | Per-variant, Per-merged-card |
| Return Rate | Returns / Orders | Per-variant, Per-merged-card |

### Getting Analytics for Merged Cards

#### Sales Funnel Analytics

Track conversion funnel for each variant:

```typescript
// Get sales funnel for specific variant (v3 API)
const funnel = await sdk.analytics.getSalesFunnelProducts({
  nmIds: [12345678],
  selectedPeriod: {
    start: '2026-01-01',
    end: '2026-01-31'
  },
  limit: 10,
  offset: 0
});

console.log('Variant Performance:');
console.log(`Views: ${funnel.data?.[0]?.openCardCount}`);
console.log(`Add to Cart: ${funnel.data?.[0]?.addToCartCount}`);
console.log(`Orders: ${funnel.data?.[0]?.ordersCount}`);
console.log(`Conversion: ${(funnel.data?.[0]?.ordersCount / funnel.data?.[0]?.openCardCount * 100).toFixed(2)}%`);
```

#### Aggregated Analytics for All Variants

Calculate merged card total performance:

```typescript
// Get all variants in merged card
const mergedCardVariants = await sdk.products.getCardsList({
  settings: {
    filter: { imtID: 999888 }
  }
});

const nmIDs = mergedCardVariants.cards!.map(c => c.nmID!);

// Get analytics for all variants (v3 API)
const allFunnels = await sdk.analytics.getSalesFunnelProducts({
  nmIds: nmIDs,
  selectedPeriod: {
    start: '2026-01-01',
    end: '2026-01-31'
  },
  limit: 50,
  offset: 0
});

// Aggregate metrics
const totals = (allFunnels.data || []).reduce((acc, variant) => ({
  views: acc.views + (variant.openCardCount || 0),
  addToCart: acc.addToCart + (variant.addToCartCount || 0),
  orders: acc.orders + (variant.ordersCount || 0),
  revenue: acc.revenue + (variant.ordersCount || 0) * (variant.avgPriceRub || 0)
}), { views: 0, addToCart: 0, orders: 0, revenue: 0 });

console.log('Merged Card Total Performance:');
console.log(`Total Views: ${totals.views}`);
console.log(`Total Orders: ${totals.orders}`);
console.log(`Total Revenue: ${totals.revenue.toFixed(2)}₽`);
console.log(`Overall Conversion: ${(totals.orders / totals.views * 100).toFixed(2)}%`);
```

---

## Advertising Analytics

### How Advertising Works with Merged Cards

This is the **most powerful feature** of merged cards for advertising optimization.

#### The Traffic Distribution Model

When you run advertising campaigns on Wildberries:

1. **Purchase Ads for Specific Variant(s)**: You select which nmID(s) to advertise
2. **Customers Click Advertised Variant**: Landing on the product card
3. **Customer Sees All Variants**: Due to merged card, all variants are visible
4. **Customer Can Purchase Any Variant**: Not limited to the advertised one
5. **Attribution**: Sale is attributed to the advertised variant in campaign stats, but revenue goes to purchased variant

**Visual Flow:**

```
┌─────────────────────────────────────────────────────────────┐
│ Ad Campaign: Target Black 128GB (nmID: 12345678)            │
│ Budget: 10,000₽/day                                         │
└─────────────────────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────┐
        │ Customer clicks ad         │
        │ Lands on Black 128GB      │
        └───────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────────────────────────┐
        │ Merged Card Displayed (imtID: 999888)         │
        │                                               │
        │  ○ Black 128GB  (advertised)                 │
        │  ○ White 128GB  (visible variant)            │
        │  ○ Black 256GB  (visible variant)            │
        │  ○ White 256GB  (visible variant)            │
        └───────────────────────────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────┐
        │ Customer selects:          │
        │ White 256GB ✓             │
        │ (Different variant!)       │
        └───────────────────────────┘
                        │
                        ▼
        ┌───────────────────────────┐
        │ Purchase Completed         │
        │ Revenue: 59,990₽          │
        │ Goes to: White 256GB      │
        └───────────────────────────┘
```

### Tracking Advertising Attribution

#### Campaign Statistics

Get advertising campaign performance:

```typescript
// Get campaign statistics for advertised variant
const campaignStats = await sdk.promotion.getAutoStatWords({
  id: 123456 // Campaign ID
});

console.log('Campaign Performance:');
campaignStats.forEach(stat => {
  console.log(`Keyword: ${stat.keyword}`);
  console.log(`  Clicks: ${stat.clicks}`);
  console.log(`  Views: ${stat.views}`);
  console.log(`  CTR: ${(stat.clicks / stat.views * 100).toFixed(2)}%`);
  console.log(`  Orders: ${stat.orders}`);
  console.log(`  Spend: ${stat.sum}₽`);
});
```

#### Cross-Variant Sales Attribution

**Critical Understanding**: Campaign stats show orders attributed to the **advertised variant**, but actual sales might come from **other variants** in the merged card.

To get the full picture:

```typescript
interface AdvertisingAnalytics {
  campaignId: number;
  advertisedVariant: number; // nmID
  imtID: number;

  // Campaign metrics (from Promotion API)
  clicks: number;
  impressions: number;
  spend: number;
  attributedOrders: number; // Orders clicked through advertised variant

  // Actual sales metrics (from Analytics API)
  variantSales: {
    nmID: number;
    vendorCode: string;
    orders: number;
    revenue: number;
  }[];

  totalOrders: number;
  totalRevenue: number;
}

async function getComprehensiveAdAnalytics(
  campaignId: number,
  advertisedNmID: number,
  imtID: number,
  dateRange: { begin: string; end: string }
): Promise<AdvertisingAnalytics> {

  // 1. Get campaign performance
  const campaignStats = await sdk.promotion.getAutoStatWords({ id: campaignId });
  const campaignMetrics = campaignStats.reduce((acc, stat) => ({
    clicks: acc.clicks + stat.clicks,
    impressions: acc.impressions + stat.views,
    spend: acc.spend + stat.sum,
    attributedOrders: acc.attributedOrders + stat.orders
  }), { clicks: 0, impressions: 0, spend: 0, attributedOrders: 0 });

  // 2. Get all variants in merged card
  const mergedCard = await sdk.products.getCardsList({
    settings: {
      filter: { imtID }
    }
  });

  const allNmIDs = mergedCard.cards!.map(c => c.nmID!);

  // 3. Get actual sales for each variant (v3 API)
  const salesData = await sdk.analytics.getSalesFunnelProducts({
    nmIds: allNmIDs,
    selectedPeriod: { start: dateRange.begin, end: dateRange.end },
    limit: 50,
    offset: 0,
  });

  const variantSales = (salesData.data || []).map(variant => ({
    nmID: variant.nmID!,
    vendorCode: mergedCard.cards!.find(c => c.nmID === variant.nmID)?.vendorCode || '',
    orders: variant.ordersCount || 0,
    revenue: (variant.ordersCount || 0) * (variant.avgPriceRub || 0)
  }));

  const totals = variantSales.reduce((acc, v) => ({
    orders: acc.orders + v.orders,
    revenue: acc.revenue + v.revenue
  }), { orders: 0, revenue: 0 });

  return {
    campaignId,
    advertisedVariant: advertisedNmID,
    imtID,
    ...campaignMetrics,
    variantSales,
    totalOrders: totals.orders,
    totalRevenue: totals.revenue
  };
}

// Usage
const analytics = await getComprehensiveAdAnalytics(
  123456,          // Campaign ID
  12345678,        // Advertised nmID (Black 128GB)
  999888,          // imtID
  {
    begin: '2024-01-01',
    end: '2024-01-31'
  }
);

console.log('\n=== Advertising Performance Report ===\n');
console.log(`Campaign ID: ${analytics.campaignId}`);
console.log(`Advertised Variant: ${analytics.advertisedVariant}`);
console.log(`\nCampaign Metrics:`);
console.log(`  Impressions: ${analytics.impressions}`);
console.log(`  Clicks: ${analytics.clicks}`);
console.log(`  CTR: ${(analytics.clicks / analytics.impressions * 100).toFixed(2)}%`);
console.log(`  Spend: ${analytics.spend.toFixed(2)}₽`);
console.log(`  Attributed Orders: ${analytics.attributedOrders}`);

console.log(`\nActual Sales by Variant:`);
analytics.variantSales.forEach(variant => {
  const percentage = (variant.orders / analytics.totalOrders * 100).toFixed(1);
  console.log(`  ${variant.vendorCode}: ${variant.orders} orders (${percentage}%) - ${variant.revenue.toFixed(2)}₽`);
});

console.log(`\nTotals:`);
console.log(`  Total Orders: ${analytics.totalOrders}`);
console.log(`  Total Revenue: ${analytics.totalRevenue.toFixed(2)}₽`);
console.log(`  CPA: ${(analytics.spend / analytics.totalOrders).toFixed(2)}₽`);
console.log(`  ROAS: ${(analytics.totalRevenue / analytics.spend).toFixed(2)}x`);
```

**Example Output:**

```
=== Advertising Performance Report ===

Campaign ID: 123456
Advertised Variant: 12345678 (PHONE-BLK-128)

Campaign Metrics:
  Impressions: 50,000
  Clicks: 1,500
  CTR: 3.00%
  Spend: 7,500.00₽
  Attributed Orders: 45

Actual Sales by Variant:
  PHONE-BLK-128: 12 orders (26.7%) - 599,880.00₽
  PHONE-WHT-128: 15 orders (33.3%) - 749,850.00₽
  PHONE-BLK-256: 8 orders (17.8%) - 479,920.00₽
  PHONE-WHT-256: 10 orders (22.2%) - 599,900.00₽

Totals:
  Total Orders: 45
  Total Revenue: 2,429,550.00₽
  CPA: 166.67₽
  ROAS: 323.94x
```

**Key Insight**: Only **26.7%** of orders came from the advertised variant (Black 128GB), but the campaign drove sales across all 4 variants, generating **3.24x** return on ad spend.

---

## Traffic Distribution in Merged Cards

### Strategic Advertising Approaches

#### Strategy 1: Advertise Best-Converting Variant

Identify the variant with the best conversion rate and advertise it:

```typescript
// 1. Analyze conversion rates for all variants (v3 API)
const variants = await sdk.analytics.getSalesFunnelProducts({
  nmIds: [12345678, 23456789, 34567890, 45678901],
  selectedPeriod: { start: '2026-01-01', end: '2026-01-31' },
  limit: 50,
  offset: 0,
});

const bestVariant = (variants.data || [])
  .map(v => ({
    nmID: v.nmID!,
    conversionRate: (v.ordersCount || 0) / (v.openCardCount || 1)
  }))
  .sort((a, b) => b.conversionRate - a.conversionRate)[0];

console.log(`Best converting variant: ${bestVariant.nmID}`);
console.log(`Conversion rate: ${(bestVariant.conversionRate * 100).toFixed(2)}%`);

// 2. Create campaign targeting best variant
const campaign = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - Best Performer',
  nms: [bestVariant.nmID],
  bid_type: 'manual',
  placement_types: ['search', 'recommendations']
});

console.log('Campaign created targeting best-converting variant');
```

#### Strategy 2: Advertise Multiple Variants Simultaneously

Run separate campaigns for different variants to capture different search intents:

```typescript
// Campaign 1: Target "black smartphone" searches
const campaign1 = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - Black Variant',
  nms: [12345678], // Black 128GB
  bid_type: 'manual',
  placement_types: ['search']
});

// Campaign 2: Target "white smartphone" searches
const campaign2 = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - White Variant',
  nms: [23456789], // White 128GB
  bid_type: 'manual',
  placement_types: ['search']
});

// Campaign 3: Target "large storage smartphone" searches
const campaign3 = await sdk.promotion.createSeacatSaveAd({
  name: 'SuperPhone - 256GB Variant',
  nms: [34567890], // Black 256GB
  bid_type: 'manual',
  placement_types: ['search']
});

console.log('Multi-variant advertising strategy deployed');
```

#### Strategy 3: A/B Test Variants

Test which variant drives better overall merged card performance:

```typescript
interface VariantTest {
  variantName: string;
  nmID: number;
  campaignId: number;
  budget: number;

  // Test results
  impressions: number;
  clicks: number;
  ctr: number;
  spend: number;
  totalOrders: number;
  totalRevenue: number;
  roas: number;
}

const tests: VariantTest[] = [
  {
    variantName: 'Black 128GB',
    nmID: 12345678,
    campaignId: 111111,
    budget: 5000,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    spend: 0,
    totalOrders: 0,
    totalRevenue: 0,
    roas: 0
  },
  {
    variantName: 'White 128GB',
    nmID: 23456789,
    campaignId: 222222,
    budget: 5000,
    impressions: 0,
    clicks: 0,
    ctr: 0,
    spend: 0,
    totalOrders: 0,
    totalRevenue: 0,
    roas: 0
  }
];

// Run test for 7 days, then analyze
async function analyzeABTest() {
  for (const test of tests) {
    // Get campaign stats
    const campaignStats = await sdk.promotion.getAutoStatWords({
      id: test.campaignId
    });

    const metrics = campaignStats.reduce((acc, stat) => ({
      impressions: acc.impressions + stat.views,
      clicks: acc.clicks + stat.clicks,
      spend: acc.spend + stat.sum
    }), { impressions: 0, clicks: 0, spend: 0 });

    // Get merged card sales (v3 API)
    const sales = await sdk.analytics.getSalesFunnelProducts({
      nmIds: [12345678, 23456789, 34567890, 45678901],
      selectedPeriod: { start: '2026-01-01', end: '2026-01-07' },
      limit: 50,
      offset: 0,
    });

    const totalOrders = sales.data?.reduce((sum, v) => sum + (v.ordersCount || 0), 0) || 0;
    const totalRevenue = sales.data?.reduce((sum, v) =>
      sum + (v.ordersCount || 0) * (v.avgPriceRub || 0), 0) || 0;

    test.impressions = metrics.impressions;
    test.clicks = metrics.clicks;
    test.ctr = metrics.clicks / metrics.impressions;
    test.spend = metrics.spend;
    test.totalOrders = totalOrders;
    test.totalRevenue = totalRevenue;
    test.roas = totalRevenue / metrics.spend;
  }

  // Compare results
  console.log('\n=== A/B Test Results ===\n');
  tests.forEach(test => {
    console.log(`${test.variantName}:`);
    console.log(`  Impressions: ${test.impressions}`);
    console.log(`  Clicks: ${test.clicks} (CTR: ${(test.ctr * 100).toFixed(2)}%)`);
    console.log(`  Spend: ${test.spend.toFixed(2)}₽`);
    console.log(`  Total Orders (All Variants): ${test.totalOrders}`);
    console.log(`  Total Revenue (All Variants): ${test.totalRevenue.toFixed(2)}₽`);
    console.log(`  ROAS: ${test.roas.toFixed(2)}x\n`);
  });

  const winner = tests.sort((a, b) => b.roas - a.roas)[0];
  console.log(`🏆 Winner: ${winner.variantName} with ${winner.roas.toFixed(2)}x ROAS`);
}
```

---

## Financial Analytics for Merged Cards

### The Cost Allocation Problem

When running advertising campaigns on merged cards, you face a **critical financial analytics challenge**:

**Scenario:**
- **Campaign**: Advertise Black 128GB variant (nmID: 12345678)
- **Ad Spend**: 10,000₽
- **Sales Result**: Customers bought ALL variants in merged card

**The Problem:**
```
Sales by Variant:
  Black 128GB:   12 orders × 49,990₽ = 599,880₽  (advertised)
  White 128GB:   15 orders × 49,990₽ = 749,850₽  (NOT advertised)
  Black 256GB:   8 orders × 59,990₽ = 479,920₽   (NOT advertised)
  White 256GB:   10 orders × 59,990₽ = 599,900₽  (NOT advertised)

❌ WRONG Calculation:
  White 128GB Metrics:
    Ad Spend: 0₽
    Revenue: 749,850₽
    ROAS: ∞ (meaningless!)

✅ CORRECT Understanding:
  All 45 sales resulted from ONE campaign with 10,000₽ spend
  Need to ALLOCATE ad spend across variants!
```

**Why This Matters:**
- **Profitability Analysis**: Which variants are actually profitable?
- **Budget Optimization**: Where to invest more/less advertising budget?
- **Pricing Strategy**: Which variants subsidize others?
- **Product Mix**: Which variants to promote/discontinue?

### Cost Allocation Methods

There are **4 main approaches** to allocating advertising costs across merged card variants:

#### Method 1: Proportional to Orders (Unit-Based)

Allocate ad spend based on the number of orders each variant generated.

**Formula:**
```
Variant Ad Cost = Total Ad Spend × (Variant Orders / Total Orders)
```

**Implementation:**
```typescript
interface VariantFinancials {
  nmID: number;
  vendorCode: string;
  orders: number;
  revenue: number;
  allocatedAdCost: number;
  profit: number;
  roas: number;
  profitMargin: number;
}

function allocateByOrders(
  totalAdSpend: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  const totalOrders = variantSales.reduce((sum, v) => sum + v.orders, 0);

  return variantSales.map(variant => {
    const allocatedAdCost = totalAdSpend * (variant.orders / totalOrders);
    const profit = variant.revenue - allocatedAdCost;
    const roas = variant.revenue / allocatedAdCost;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}

// Usage
const totalAdSpend = 10000;
const variantSales = [
  { nmID: 12345678, vendorCode: 'PHONE-BLK-128', orders: 12, revenue: 599880 },
  { nmID: 23456789, vendorCode: 'PHONE-WHT-128', orders: 15, revenue: 749850 },
  { nmID: 34567890, vendorCode: 'PHONE-BLK-256', orders: 8, revenue: 479920 },
  { nmID: 45678901, vendorCode: 'PHONE-WHT-256', orders: 10, revenue: 599900 }
];

const financials = allocateByOrders(totalAdSpend, variantSales);

console.log('\n=== Financial Analysis: Allocation by Orders ===\n');
financials.forEach(v => {
  console.log(`${v.vendorCode}:`);
  console.log(`  Orders: ${v.orders}`);
  console.log(`  Revenue: ${v.revenue.toFixed(2)}₽`);
  console.log(`  Allocated Ad Cost: ${v.allocatedAdCost.toFixed(2)}₽`);
  console.log(`  Profit: ${v.profit.toFixed(2)}₽`);
  console.log(`  ROAS: ${v.roas.toFixed(2)}x`);
  console.log(`  Profit Margin: ${v.profitMargin.toFixed(1)}%\n`);
});
```

**Example Output:**
```
=== Financial Analysis: Allocation by Orders ===

PHONE-BLK-128:
  Orders: 12
  Revenue: 599,880.00₽
  Allocated Ad Cost: 2,666.67₽  (12/45 × 10,000₽)
  Profit: 597,213.33₽
  ROAS: 225.00x
  Profit Margin: 99.6%

PHONE-WHT-128:
  Orders: 15
  Revenue: 749,850.00₽
  Allocated Ad Cost: 3,333.33₽  (15/45 × 10,000₽)
  Profit: 746,516.67₽
  ROAS: 225.00x
  Profit Margin: 99.6%

PHONE-BLK-256:
  Orders: 8
  Revenue: 479,920.00₽
  Allocated Ad Cost: 1,777.78₽  (8/45 × 10,000₽)
  Profit: 478,142.22₽
  ROAS: 269.94x
  Profit Margin: 99.6%

PHONE-WHT-256:
  Orders: 10
  Revenue: 599,900.00₽
  Allocated Ad Cost: 2,222.22₽  (10/45 × 10,000₽)
  Profit: 597,677.78₽
  ROAS: 269.96x
  Profit Margin: 99.6%
```

**Pros:**
- ✅ Simple and intuitive
- ✅ Fair if all variants have similar prices
- ✅ Encourages selling more units

**Cons:**
- ❌ Ignores price differences (1 high-priced item = 1 low-priced item)
- ❌ May undervalue premium variants

**Best For:** Products with uniform pricing across variants

---

#### Method 2: Proportional to Revenue (Value-Based)

Allocate ad spend based on the revenue each variant generated.

**Formula:**
```
Variant Ad Cost = Total Ad Spend × (Variant Revenue / Total Revenue)
```

**Implementation:**
```typescript
function allocateByRevenue(
  totalAdSpend: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  const totalRevenue = variantSales.reduce((sum, v) => sum + v.revenue, 0);

  return variantSales.map(variant => {
    const allocatedAdCost = totalAdSpend * (variant.revenue / totalRevenue);
    const profit = variant.revenue - allocatedAdCost;
    const roas = variant.revenue / allocatedAdCost;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}
```

**Example Output:**
```
=== Financial Analysis: Allocation by Revenue ===

PHONE-BLK-128:
  Orders: 12
  Revenue: 599,880.00₽
  Allocated Ad Cost: 2,469.34₽  (599,880 / 2,429,550 × 10,000₽)
  Profit: 597,410.66₽
  ROAS: 243.00x
  Profit Margin: 99.6%

PHONE-WHT-128:
  Orders: 15
  Revenue: 749,850.00₽
  Allocated Ad Cost: 3,086.68₽  (749,850 / 2,429,550 × 10,000₽)
  Profit: 746,763.32₽
  ROAS: 243.00x
  Profit Margin: 99.6%

PHONE-BLK-256:
  Orders: 8
  Revenue: 479,920.00₽
  Allocated Ad Cost: 1,975.47₽  (479,920 / 2,429,550 × 10,000₽)
  Profit: 477,944.53₽
  ROAS: 243.00x
  Profit Margin: 99.6%

PHONE-WHT-256:
  Orders: 10
  Revenue: 599,900.00₽
  Allocated Ad Cost: 2,468.51₽  (599,900 / 2,429,550 × 10,000₽)
  Profit: 597,431.49₽
  ROAS: 243.00x
  Profit Margin: 99.6%
```

**Pros:**
- ✅ Accounts for price differences
- ✅ High-revenue variants bear proportional ad cost
- ✅ More accurate profit calculation

**Cons:**
- ❌ May penalize premium variants
- ❌ Doesn't account for profit margins (high revenue ≠ high profit)

**Best For:** Products with varying prices across variants

---

#### Method 3: Equal Distribution

Allocate ad spend equally across all variants in merged card.

**Formula:**
```
Variant Ad Cost = Total Ad Spend / Number of Variants
```

**Implementation:**
```typescript
function allocateEqually(
  totalAdSpend: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  const variantCount = variantSales.length;
  const allocatedAdCost = totalAdSpend / variantCount;

  return variantSales.map(variant => {
    const profit = variant.revenue - allocatedAdCost;
    const roas = variant.revenue / allocatedAdCost;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}
```

**Example Output:**
```
=== Financial Analysis: Equal Distribution ===

PHONE-BLK-128:
  Orders: 12
  Revenue: 599,880.00₽
  Allocated Ad Cost: 2,500.00₽  (10,000₽ / 4 variants)
  Profit: 597,380.00₽
  ROAS: 239.95x
  Profit Margin: 99.6%

PHONE-WHT-128:
  Orders: 15
  Revenue: 749,850.00₽
  Allocated Ad Cost: 2,500.00₽
  Profit: 747,350.00₽
  ROAS: 299.94x
  Profit Margin: 99.7%

PHONE-BLK-256:
  Orders: 8
  Revenue: 479,920.00₽
  Allocated Ad Cost: 2,500.00₽
  Profit: 477,420.00₽
  ROAS: 191.97x
  Profit Margin: 99.5%

PHONE-WHT-256:
  Orders: 10
  Revenue: 599,900.00₽
  Allocated Ad Cost: 2,500.00₽
  Profit: 597,400.00₽
  ROAS: 239.96x
  Profit Margin: 99.6%
```

**Pros:**
- ✅ Simplest method
- ✅ No favoritism
- ✅ Easy to explain

**Cons:**
- ❌ Ignores actual performance differences
- ❌ Treats high/low performers equally

**Best For:** Initial analysis, evenly-performing variants

---

#### Method 4: Advertised Variant Only (Zero-Cost for Others)

Allocate ALL ad spend to the advertised variant only. Other variants treated as "free traffic bonus".

**Formula:**
```
Advertised Variant Ad Cost = Total Ad Spend
Other Variants Ad Cost = 0₽
```

**Implementation:**
```typescript
function allocateToAdvertisedOnly(
  totalAdSpend: number,
  advertisedNmID: number,
  variantSales: { nmID: number; vendorCode: string; orders: number; revenue: number }[]
): VariantFinancials[] {
  return variantSales.map(variant => {
    const allocatedAdCost = variant.nmID === advertisedNmID ? totalAdSpend : 0;
    const profit = variant.revenue - allocatedAdCost;
    const roas = allocatedAdCost > 0 ? variant.revenue / allocatedAdCost : Infinity;
    const profitMargin = (profit / variant.revenue) * 100;

    return {
      nmID: variant.nmID,
      vendorCode: variant.vendorCode,
      orders: variant.orders,
      revenue: variant.revenue,
      allocatedAdCost,
      profit,
      roas,
      profitMargin
    };
  });
}
```

**Example Output:**
```
=== Financial Analysis: Advertised Variant Only ===

PHONE-BLK-128: (ADVERTISED)
  Orders: 12
  Revenue: 599,880.00₽
  Allocated Ad Cost: 10,000.00₽
  Profit: 589,880.00₽
  ROAS: 59.99x
  Profit Margin: 98.3%

PHONE-WHT-128: (Free Traffic)
  Orders: 15
  Revenue: 749,850.00₽
  Allocated Ad Cost: 0.00₽
  Profit: 749,850.00₽
  ROAS: ∞
  Profit Margin: 100.0%

PHONE-BLK-256: (Free Traffic)
  Orders: 8
  Revenue: 479,920.00₽
  Allocated Ad Cost: 0.00₽
  Profit: 479,920.00₽
  ROAS: ∞
  Profit Margin: 100.0%

PHONE-WHT-256: (Free Traffic)
  Orders: 10
  Revenue: 599,900.00₽
  Allocated Ad Cost: 0.00₽
  Profit: 599,900.00₽
  ROAS: ∞
  Profit Margin: 100.0%
```

**Pros:**
- ✅ Conservative profitability view
- ✅ Highlights "bonus" sales from non-advertised variants
- ✅ Useful for understanding advertised variant standalone performance

**Cons:**
- ❌ Overstates profitability of non-advertised variants
- ❌ Doesn't reflect economic reality of shared campaign
- ❌ Can't compare variants on equal footing

**Best For:** Understanding minimum guaranteed ROAS, conservative profit estimates

---

### Choosing the Right Method

| Scenario | Recommended Method | Reason |
|----------|-------------------|--------|
| **Uniform prices** (all variants ~same price) | Method 1: By Orders | Simple and fair when price doesn't vary |
| **Variable prices** (premium vs budget variants) | Method 2: By Revenue | Accounts for value contribution |
| **Initial analysis** or **evenly-performing variants** | Method 3: Equal Distribution | Simple baseline |
| **Conservative estimates** or **evaluating advertised variant** | Method 4: Advertised Only | Shows minimum guaranteed performance |
| **Executive reporting** | Methods 1 + 2 | Show multiple perspectives |
| **Product mix decisions** | Method 2: By Revenue | Revenue-based allocation best for pricing/mix strategy |

### Comprehensive Financial Dashboard

Combine all methods for complete picture:

```typescript
interface ComprehensiveFinancialReport {
  campaignId: number;
  imtID: number;
  totalAdSpend: number;
  totalRevenue: number;
  totalOrders: number;
  overallROAS: number;

  methodComparison: {
    byOrders: VariantFinancials[];
    byRevenue: VariantFinancials[];
    equalDistribution: VariantFinancials[];
    advertisedOnly: VariantFinancials[];
  };

  insights: {
    bestPerformer: { nmID: number; vendorCode: string; roas: number };
    worstPerformer: { nmID: number; vendorCode: string; roas: number };
    totalProfit: number;
    averageROAS: number;
  };
}

async function generateFinancialReport(
  campaignId: number,
  advertisedNmID: number,
  imtID: number,
  dateRange: { begin: string; end: string }
): Promise<ComprehensiveFinancialReport> {

  // Get campaign data
  const campaignStats = await sdk.promotion.getAutoStatWords({ id: campaignId });
  const totalAdSpend = campaignStats.reduce((sum, s) => sum + s.sum, 0);

  // Get merged card variants
  const mergedCard = await sdk.products.getCardsList({
    settings: { filter: { imtID } }
  });
  const nmIDs = mergedCard.cards!.map(c => c.nmID!);

  // Get sales data (v3 API)
  const salesData = await sdk.analytics.getSalesFunnelProducts({
    nmIds: nmIDs,
    selectedPeriod: { start: dateRange.begin, end: dateRange.end },
    limit: 50,
    offset: 0,
  });

  const variantSales = (salesData.data || []).map(variant => ({
    nmID: variant.nmID!,
    vendorCode: mergedCard.cards!.find(c => c.nmID === variant.nmID)?.vendorCode || '',
    orders: variant.ordersCount || 0,
    revenue: (variant.ordersCount || 0) * (variant.avgPriceRub || 0)
  }));

  const totalRevenue = variantSales.reduce((sum, v) => sum + v.revenue, 0);
  const totalOrders = variantSales.reduce((sum, v) => sum + v.orders, 0);

  // Calculate with all methods
  const byOrders = allocateByOrders(totalAdSpend, variantSales);
  const byRevenue = allocateByRevenue(totalAdSpend, variantSales);
  const equalDistribution = allocateEqually(totalAdSpend, variantSales);
  const advertisedOnly = allocateToAdvertisedOnly(totalAdSpend, advertisedNmID, variantSales);

  // Use revenue-based allocation for insights (most balanced)
  const sortedByROAS = [...byRevenue].sort((a, b) => b.roas - a.roas);
  const bestPerformer = sortedByROAS[0];
  const worstPerformer = sortedByROAS[sortedByROAS.length - 1];
  const totalProfit = totalRevenue - totalAdSpend;
  const averageROAS = byRevenue.reduce((sum, v) => sum + v.roas, 0) / byRevenue.length;

  return {
    campaignId,
    imtID,
    totalAdSpend,
    totalRevenue,
    totalOrders,
    overallROAS: totalRevenue / totalAdSpend,
    methodComparison: {
      byOrders,
      byRevenue,
      equalDistribution,
      advertisedOnly
    },
    insights: {
      bestPerformer: {
        nmID: bestPerformer.nmID,
        vendorCode: bestPerformer.vendorCode,
        roas: bestPerformer.roas
      },
      worstPerformer: {
        nmID: worstPerformer.nmID,
        vendorCode: worstPerformer.vendorCode,
        roas: worstPerformer.roas
      },
      totalProfit,
      averageROAS
    }
  };
}

// Usage
const report = await generateFinancialReport(
  123456,
  12345678,
  999888,
  { begin: '2024-01-01', end: '2024-01-31' }
);

console.log('\n=== COMPREHENSIVE FINANCIAL REPORT ===\n');
console.log(`Campaign ID: ${report.campaignId}`);
console.log(`Merged Card (imtID): ${report.imtID}`);
console.log(`Total Ad Spend: ${report.totalAdSpend.toFixed(2)}₽`);
console.log(`Total Revenue: ${report.totalRevenue.toFixed(2)}₽`);
console.log(`Total Orders: ${report.totalOrders}`);
console.log(`Overall ROAS: ${report.overallROAS.toFixed(2)}x`);
console.log(`Total Profit: ${report.insights.totalProfit.toFixed(2)}₽`);

console.log('\n--- Best/Worst Performers (by revenue allocation) ---');
console.log(`Best: ${report.insights.bestPerformer.vendorCode} (${report.insights.bestPerformer.roas.toFixed(2)}x ROAS)`);
console.log(`Worst: ${report.insights.worstPerformer.vendorCode} (${report.insights.worstPerformer.roas.toFixed(2)}x ROAS)`);

console.log('\n--- Comparison Across Methods ---');
report.methodComparison.byRevenue.forEach((variant, index) => {
  console.log(`\n${variant.vendorCode}:`);
  console.log(`  Orders: ${variant.orders}, Revenue: ${variant.revenue.toFixed(2)}₽`);
  console.log(`  Method 1 (Orders): Ad Cost ${report.methodComparison.byOrders[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.byOrders[index].roas.toFixed(2)}x`);
  console.log(`  Method 2 (Revenue): Ad Cost ${report.methodComparison.byRevenue[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.byRevenue[index].roas.toFixed(2)}x`);
  console.log(`  Method 3 (Equal): Ad Cost ${report.methodComparison.equalDistribution[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.equalDistribution[index].roas.toFixed(2)}x`);
  console.log(`  Method 4 (Advertised Only): Ad Cost ${report.methodComparison.advertisedOnly[index].allocatedAdCost.toFixed(2)}₽, ROAS ${report.methodComparison.advertisedOnly[index].roas.toFixed(2)}x`);
});
```

### Key Financial Insights

#### 1. Understanding "Free Traffic" vs "Shared Cost"

**Myth**: "Non-advertised variants get free traffic"

**Reality**: All variants benefit from the same advertising campaign, so costs should be allocated.

**Example:**
```
If you allocate 0₽ to non-advertised variants:
→ You can't make budget decisions (which variants to advertise?)
→ You can't evaluate product mix profitability
→ You inflate profit margins artificially

If you allocate proportionally:
→ You understand true per-variant economics
→ You can optimize advertising strategy
→ You make informed pricing decisions
```

#### 2. ROAS Normalization Effect

Notice that with **proportional allocation** (Methods 1-2), all variants have **similar ROAS**:

```
Method 2 (By Revenue):
  Black 128GB: ROAS = 243.00x
  White 128GB: ROAS = 243.00x
  Black 256GB: ROAS = 243.00x
  White 256GB: ROAS = 243.00x

This is expected! It reflects that advertising lifts the entire merged card.
```

To find **true variant performance differences**, compare:
- **Conversion rates** (orders / views)
- **Add-to-cart rates**
- **Average order value**
- **Return rates**

#### 3. Budgeting Recommendation

For **next campaign budget allocation**, use this formula:

```typescript
// Based on Method 2 (revenue allocation)
const nextMonthBudget = 50000; // Total budget

const budgetByVariant = report.methodComparison.byRevenue.map(variant => ({
  vendorCode: variant.vendorCode,
  currentRevenue: variant.revenue,
  revenueShare: variant.revenue / report.totalRevenue,
  suggestedBudget: nextMonthBudget * (variant.revenue / report.totalRevenue)
}));

console.log('\n=== Suggested Budget Allocation for Next Month ===');
budgetByVariant.forEach(b => {
  console.log(`${b.vendorCode}:`);
  console.log(`  Revenue Share: ${(b.revenueShare * 100).toFixed(1)}%`);
  console.log(`  Suggested Budget: ${b.suggestedBudget.toFixed(2)}₽`);
});
```

---

## Practical Examples

### Example 1: Launch Product Line with Merged Cards

Complete workflow for launching a new product with multiple variants:

```typescript
async function launchProductLine() {
  // Step 1: Create merged card with all variants
  console.log('Creating merged card with 4 variants...');

  const product = await sdk.products.createCardsUpload([
    {
      subjectID: 3091,
      variants: [
        {
          vendorCode: 'PHONE-BLK-128',
          title: 'SuperPhone X Black 128GB',
          description: 'Premium flagship smartphone',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['Black'] },
            { id: 200, value: 128 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555111111'], price: 49990 }]
        },
        {
          vendorCode: 'PHONE-WHT-128',
          title: 'SuperPhone X White 128GB',
          description: 'Premium flagship smartphone',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['White'] },
            { id: 200, value: 128 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555222222'], price: 49990 }]
        },
        {
          vendorCode: 'PHONE-BLK-256',
          title: 'SuperPhone X Black 256GB',
          description: 'Premium flagship smartphone',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['Black'] },
            { id: 200, value: 256 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555333333'], price: 59990 }]
        },
        {
          vendorCode: 'PHONE-WHT-256',
          title: 'SuperPhone X White 256GB',
          description: 'Premium flagship smartphone',
          characteristics: [
            { id: 14177858, value: 'SuperBrand' },
            { id: 85, value: ['White'] },
            { id: 200, value: 256 }
          ],
          sizes: [{ techSize: '0', skus: ['8800555444444'], price: 59990 }]
        }
      ]
    }
  ]);

  console.log('✅ Product created');

  // Step 2: Get imtID of created merged card
  const cards = await sdk.products.getCardsList({
    settings: {
      filter: {
        textSearch: 'PHONE-BLK-128' // Search by vendor code
      }
    }
  });

  const imtID = cards.cards?.[0]?.imtID;
  const nmIDs = cards.cards?.map(c => c.nmID!);

  console.log(`✅ imtID: ${imtID}`);
  console.log(`✅ nmIDs: ${nmIDs?.join(', ')}`);

  // Step 3: Set stock levels
  console.log('\nSetting stock levels...');

  await sdk.products.updateStocks({
    stocks: [
      { sku: '8800555111111', amount: 100, warehouseId: 117501 },
      { sku: '8800555222222', amount: 100, warehouseId: 117501 },
      { sku: '8800555333333', amount: 50, warehouseId: 117501 },
      { sku: '8800555444444', amount: 50, warehouseId: 117501 }
    ]
  });

  console.log('✅ Stock levels set');

  // Step 4: Create advertising campaign
  console.log('\nCreating advertising campaign...');

  const campaign = await sdk.promotion.createSeacatSaveAd({
    name: 'SuperPhone X Launch Campaign',
    nms: [nmIDs![0]], // Advertise Black 128GB variant
    bid_type: 'manual',
    placement_types: ['search', 'recommendations']
  });

  console.log(`✅ Campaign created: ID ${campaign}`);

  // Step 5: Set bids
  await sdk.promotion.setCpmParams({
    id: campaign,
    cpm: 150 // 1.5₽ per 1000 impressions
  });

  console.log('✅ Bid set to 150 CPM');

  // Step 6: Activate campaign
  await sdk.promotion.changePromotionAdvert({
    id: campaign,
    status: 9 // Active
  });

  console.log('✅ Campaign activated');

  console.log('\n🎉 Product line launched successfully!');
  console.log('Monitor performance in analytics dashboard');
}

// Execute
launchProductLine().catch(console.error);
```

### Example 2: Optimize Merged Card Advertising

Monitor and optimize advertising for merged cards:

```typescript
async function optimizeMergedCardAds(imtID: number, campaignId: number) {
  console.log(`Optimizing merged card ${imtID} campaign ${campaignId}...`);

  // Get 7-day performance
  const endDate = new Date();
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 7);

  const dateRange = {
    begin: startDate.toISOString().split('T')[0],
    end: endDate.toISOString().split('T')[0]
  };

  // Get all variants
  const mergedCard = await sdk.products.getCardsList({
    settings: { filter: { imtID } }
  });

  const nmIDs = mergedCard.cards!.map(c => c.nmID!);

  // Get sales performance (v3 API)
  const sales = await sdk.analytics.getSalesFunnelProducts({
    nmIds: nmIDs,
    selectedPeriod: { start: dateRange.begin, end: dateRange.end },
    limit: 50,
    offset: 0,
  });

  // Get campaign performance
  const campaignStats = await sdk.promotion.getAutoStatWords({ id: campaignId });

  const totalSpend = campaignStats.reduce((sum, s) => sum + s.sum, 0);
  const totalClicks = campaignStats.reduce((sum, s) => sum + s.clicks, 0);
  const totalImpressions = campaignStats.reduce((sum, s) => sum + s.views, 0);

  const totalRevenue = (sales.data || []).reduce((sum, v) =>
    sum + (v.ordersCount || 0) * (v.avgPriceRub || 0), 0);

  const totalOrders = (sales.data || []).reduce((sum, v) =>
    sum + (v.ordersCount || 0), 0);

  const roas = totalRevenue / totalSpend;
  const ctr = totalClicks / totalImpressions;
  const conversionRate = totalOrders / totalClicks;

  console.log('\n=== 7-Day Performance ===');
  console.log(`Impressions: ${totalImpressions}`);
  console.log(`Clicks: ${totalClicks} (CTR: ${(ctr * 100).toFixed(2)}%)`);
  console.log(`Orders: ${totalOrders} (CR: ${(conversionRate * 100).toFixed(2)}%)`);
  console.log(`Revenue: ${totalRevenue.toFixed(2)}₽`);
  console.log(`Spend: ${totalSpend.toFixed(2)}₽`);
  console.log(`ROAS: ${roas.toFixed(2)}x`);

  // Optimization recommendations
  console.log('\n=== Optimization Recommendations ===');

  if (roas < 2) {
    console.log('⚠️ Low ROAS - Consider:');
    console.log('  - Lowering bids');
    console.log('  - Improving product images/descriptions');
    console.log('  - Testing different advertised variants');
  } else if (roas > 5) {
    console.log('✅ Excellent ROAS - Consider:');
    console.log('  - Increasing budget to scale');
    console.log('  - Raising bids to increase market share');
  } else {
    console.log('✅ Healthy ROAS - Maintain current strategy');
  }

  if (ctr < 0.02) {
    console.log('\n⚠️ Low CTR - Improve ad relevance:');
    console.log('  - Use more specific keywords');
    console.log('  - Improve main product image');
    console.log('  - Test advertising different variants');
  }

  if (conversionRate < 0.05) {
    console.log('\n⚠️ Low conversion rate - Optimize:');
    console.log('  - Product pricing');
    console.log('  - Product description');
    console.log('  - Product images');
    console.log('  - Stock availability');
  }
}

// Usage
optimizeMergedCardAds(999888, 123456).catch(console.error);
```

---

## Best Practices

### 1. Strategic Merging

✅ **Do:**
- Merge true product variants (color, size, storage)
- Keep merged cards to 5-10 variants maximum
- Use consistent naming conventions for variant vendor codes
- Merge products with similar pricing tiers

❌ **Don't:**
- Merge unrelated products
- Merge products with vastly different prices
- Create merged cards with 20+ variants (confusing UX)
- Merge products from different categories (API will reject)

### 2. Advertising Optimization

✅ **Do:**
- Start by advertising best-converting variant
- Track sales distribution across all variants
- Monitor ROAS at merged card level, not just advertised variant
- A/B test different variants as ad targets
- Use variant-specific keywords for search campaigns

❌ **Don't:**
- Only track advertised variant performance
- Assume campaign stats reflect total sales
- Ignore low-performing variants in merged cards
- Run identical campaigns for all variants

### 3. Analytics Tracking

✅ **Do:**
- Track both campaign attribution and actual sales
- Calculate merged card-level KPIs
- Monitor variant contribution percentages
- Compare variant conversion rates
- Use comprehensive analytics functions (see examples)

❌ **Don't:**
- Rely solely on campaign stats
- Ignore cross-variant sales patterns
- Skip per-variant performance analysis
- Forget to aggregate merged card totals

### 4. Inventory Management

✅ **Do:**
- Maintain stock across all variants
- Monitor stock levels for popular variants
- Restock based on variant sales distribution
- Use analytics to predict variant demand

❌ **Don't:**
- Let popular variants go out of stock
- Stock only advertised variant
- Ignore low-stock warnings for non-advertised variants

---

## Troubleshooting

### Common Issues

#### Issue: Cards Won't Merge

**Error:**
```json
{
  "error": true,
  "errorText": "Объединение товаров с разными предметами невозможно"
}
```

**Cause**: Trying to merge cards with different `subjectID`

**Solution:**
```typescript
// Check subjectID before merging
const cards = await sdk.products.getCardsList({
  settings: {
    filter: {
      textSearch: 'vendor-code'
    }
  }
});

cards.cards?.forEach(card => {
  console.log(`nmID: ${card.nmID}, subjectID: ${card.subjectID}`);
});

// Only merge cards with matching subjectID
```

#### Issue: Campaign Stats Don't Match Sales

**Symptom**: Campaign shows 20 orders, but analytics shows 45 orders

**Cause**: This is **expected behavior** - campaign stats show attributed orders (clicks on advertised variant), analytics shows all sales

**Solution**: Use comprehensive analytics approach:
```typescript
const fullPicture = await getComprehensiveAdAnalytics(
  campaignId,
  advertisedNmID,
  imtID,
  dateRange
);

console.log(`Campaign attributed orders: ${fullPicture.attributedOrders}`);
console.log(`Actual total orders: ${fullPicture.totalOrders}`);
console.log(`Cross-variant sales: ${fullPicture.totalOrders - fullPicture.attributedOrders}`);
```

#### Issue: Can't Find Merged Card

**Symptom**: Filter by `imtID` returns empty results

**Cause**: Wrong `imtID` or card moved to trash

**Solution:**
```typescript
// Search by vendor code first
const found = await sdk.products.getCardsList({
  settings: {
    filter: {
      textSearch: 'known-vendor-code'
    }
  }
});

console.log(`Found imtID: ${found.cards?.[0]?.imtID}`);

// Check trash
const trash = await sdk.products.getTrashedCards({
  settings: {
    filter: { textSearch: 'known-vendor-code' },
    cursor: { limit: 100 }
  }
});
```

#### Issue: Unmerge Creates New Merge

**Symptom**: Tried to separate 3 cards, they merged into new group

**Cause**: Passing multiple nmIDs in unmerge request

**Solution:**
```typescript
// ❌ Wrong
await sdk.products.createCardsMovenm({ nmIDs: [111, 222, 333] });

// ✅ Correct - one at a time
for (const nmID of [111, 222, 333]) {
  await sdk.products.createCardsMovenm({ nmIDs: [nmID] });
}
```

---

## Related Resources

- **[Working with Product Cards](./working-with-product-cards.md)** - Complete guide to fetching, filtering, and paginating product cards
- **[Promotion & Advertising Guide](./promotion-advertising.md)** - Advertising campaign management
- **[API Reference: ProductsModule](/api/classes/ProductsModule)** - Products API documentation
- **[API Reference: AnalyticsModule](/api/classes/AnalyticsModule)** - Analytics API documentation
- **[Best Practices](./best-practices.md)** - General SDK usage best practices
- **[API Reference](../api/)** - Complete TypeDoc documentation

---

## Summary

Product card merging is a powerful feature that enables:

✅ **Unified customer experience** across product variants
✅ **Advertising efficiency** - buy ads for one, sell across all
✅ **Cross-variant traffic distribution** - maximize conversion opportunities
✅ **Comprehensive analytics** - track performance holistically
✅ **Strategic optimization** - test and optimize variant performance

**Key Takeaway**: When advertising merged cards, always track both **campaign attribution** (clicks on advertised variant) and **actual sales distribution** (orders across all variants) to get accurate ROAS and optimize effectively.

---

**Need Help?** Open an issue on [GitHub](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues) or check the [FAQ](../FAQ.md).
