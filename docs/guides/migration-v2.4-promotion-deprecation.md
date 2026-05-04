# Migration Guide: Promotion API Deprecation (v2.4)

**⚠️ CRITICAL**: Wildberries is deprecating standard bid campaign methods (type 8) on **February 2, 2026**.

---

## Overview

Wildberries is transitioning from standard bid campaigns (type 8) to campaigns with custom and standard bids (type 9). Four API methods will be **disabled on February 2, 2026**.

**Source**: [Wildberries Release Notes #429](https://dev.wildberries.ru/en/release-notes?id=429)

---

## Quick Start: How to Migrate in 3 Steps

### Step 1: Identify Type 8 Campaigns (2 minutes)

Run this script to find all type 8 campaigns in your account:

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function findType8Campaigns() {
  const campaigns = await sdk.promotion.getPromotionCount();

  const type8 = campaigns.adverts?.filter(advert => advert.type === 8) || [];
  const type9 = campaigns.adverts?.filter(advert => advert.type === 9) || [];

  console.log(`\n📊 Campaign Analysis:`);
  console.log(`✅ Type 9 campaigns (safe): ${type9.length}`);
  console.log(`⚠️  Type 8 campaigns (need migration): ${type8.length}\n`);

  if (type8.length > 0) {
    console.log('Type 8 campaigns that need migration:');
    type8.forEach(camp => {
      console.log(`  - Campaign ID ${camp.advertId}: ${camp.name || 'Unnamed'}`);
    });
    console.log(`\n⏰ Deadline: February 2, 2026\n`);
  } else {
    console.log('✅ All your campaigns are already type 9. No migration needed!');
  }

  return type8;
}

// Run the check
findType8Campaigns();
```

### Step 2: Update Your Code (10-30 minutes)

Replace deprecated methods in your codebase:

```bash
# Search for deprecated methods in your project
grep -r "getAutoGetnmtoadd\|createAutoUpdatenm\|getAutoStatWords\|createAutoSetExcluded" ./src
```

**Quick replacement guide**:

| Deprecated Method | Replace With | Time Required |
|-------------------|--------------|---------------|
| `getAutoGetnmtoadd()` | `getAuctionAdverts()` | 2 min |
| `createAutoUpdatenm()` | `updateAuctionNm()` | 5 min |
| `getAutoStatWords()` | `getAdvFullstats()` | 10 min |
| `createAutoSetExcluded()` | Type 9 campaign creation | 15 min |

### Step 3: Test and Deploy (15 minutes)

```typescript
// Test your migrated code
async function testMigration() {
  const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

  // ✅ Test: Fetch campaign info (replaces getAutoGetnmtoadd)
  const campaigns = await sdk.promotion.getAuctionAdverts({
    id: [your_campaign_id]
  });
  console.log('✅ Campaign fetch works:', campaigns.adverts?.[0]?.name);

  // ✅ Test: Update products (replaces createAutoUpdatenm)
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: your_campaign_id,
      nms: { add: [product_id_to_add] }
    }]
  });
  console.log('✅ Product update works');

  // ✅ Test: Get statistics (replaces getAutoStatWords)
  const stats = await sdk.promotion.getAdvFullstats({
    ids: String(your_campaign_id),
    beginDate: '2026-01-01',
    endDate: '2026-01-31'
  });
  console.log('✅ Statistics fetch works:', stats);
}
```

**Total migration time: 30-60 minutes** for most projects.

---

## Deprecated Methods

### 1. `getAutoGetnmtoadd()` - List of Product Cards

**Endpoint**: `GET /adv/v1/auto/getnmtoadd`
**Deprecation Date**: February 2, 2026
**Affected**: Standard bid campaigns (type 8)

**Migration Path**:
```typescript
// ❌ DEPRECATED (will stop working Feb 2, 2026)
const cards = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });

// ✅ RECOMMENDED: Use type 9 campaigns
// 1. Get campaign information
const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });

// 2. View products in campaign (included in campaign details)
const campaign = campaigns.adverts?.[0];
console.log('Products:', campaign.nms);
```

---

### 2. `createAutoUpdatenm()` - Update Product Cards

**Endpoint**: `POST /adv/v1/auto/updatenm`
**Deprecation Date**: February 2, 2026
**Affected**: Standard bid campaigns (type 8)

**Migration Path**:
```typescript
// ❌ DEPRECATED (will stop working Feb 2, 2026)
await sdk.promotion.createAutoUpdatenm({
  add: [123456, 789012],
  delete: [345678]
}, { id: campaignId });

// ✅ RECOMMENDED: Use type 9 campaigns with updateAuctionNm()
await sdk.promotion.updateAuctionNm({
  nms: [{
    advert_id: campaignId,
    nms: {
      add: [123456, 789012],
      delete: [345678]
    }
  }]
});
```

---

### 3. `getAutoStatWords()` - Statistics by Phrase Clusters

**Endpoint**: `GET /adv/v2/auto/stat-words`
**Deprecation Date**: February 2, 2026
**Affected**: Standard bid campaigns (type 8)

**Migration Path**:
```typescript
// ❌ DEPRECATED (will stop working Feb 2, 2026)
const stats = await sdk.promotion.getAutoStatWords({ id: campaignId });
console.log('Clusters:', stats.clusters);
console.log('Excluded:', stats.excluded);

// ✅ RECOMMENDED: Use universal statistics method
const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});

// getAdvFullstats() provides comprehensive statistics for ALL campaign types
console.log('Campaign stats:', fullStats);
```

**Note**: `getAdvFullstats()` provides more detailed statistics than `getAutoStatWords()`, including:
- Views, clicks, orders, revenue
- CTR, CR, conversion rates
- Daily breakdown by SKU
- Keywords and phrase performance

---

### 4. `createAutoSetExcluded()` - Set/Remove Minus-Phrases

**Endpoint**: `POST /adv/v1/auto/set-excluded`
**Deprecation Date**: February 2, 2026 (moved from Jan 15)
**Affected**: Standard bid campaigns (type 8)

**Migration Path**:
```typescript
// ❌ DEPRECATED (will stop working Feb 2, 2026)
await sdk.promotion.createAutoSetExcluded({
  excluded: ['Samsung', 'Xiaomi']
}, { id: campaignId });

// ✅ RECOMMENDED: Use type 9 campaigns
// Minus-phrases are configured via campaign creation/management endpoints
// Consult Wildberries API documentation for type 9 minus-phrase management
```

---

## Campaign Type 8 vs Type 9

### Type 8: Standard Bid Campaigns (Deprecated)

- **Single bid** for all products in campaign
- **Limited control** over individual product bids
- **Being phased out** on February 2, 2026

### Type 9: Custom/Standard Bid Campaigns (Current)

- **Flexible bidding**: Choose between unified bid or manual bid per product
- **More control**: Set individual bids for each product/placement
- **Future-proof**: All new features will support type 9

**Check campaign type**:
```typescript
const campaigns = await sdk.promotion.getPromotionCount();

campaigns.adverts?.forEach(advert => {
  if (advert.type === 8) {
    console.warn('⚠️ Type 8 campaign detected - migrate to type 9!');
  } else if (advert.type === 9) {
    console.log('✅ Type 9 campaign - no migration needed');
  }
});
```

---

## Migration Checklist

### Before February 2, 2026

- [ ] **Audit your code** for deprecated method usage:
  ```bash
  # Search for deprecated methods in your codebase
  grep -r "getAutoGetnmtoadd\|createAutoUpdatenm\|getAutoStatWords\|createAutoSetExcluded" .
  ```

- [ ] **Identify type 8 campaigns** using `getPromotionCount()`:
  ```typescript
  const campaigns = await sdk.promotion.getPromotionCount();
  const type8Campaigns = campaigns.adverts?.filter(a => a.type === 8);
  console.log(`Found ${type8Campaigns?.length} type 8 campaigns`);
  ```

- [ ] **Migrate to type 9 alternatives**:
  - Replace `createAutoUpdatenm()` → `updateAuctionNm()`
  - Replace `getAutoStatWords()` → `getAdvFullstats()`
  - Update campaign creation logic to use type 9

- [ ] **Test migration** in staging environment

- [ ] **Monitor TypeScript/IDE warnings**: Methods marked with `@deprecated` will show strikethrough in IDE

- [ ] **Update documentation** and team knowledge base

---

## IDE Support

The SDK now marks deprecated methods with `@deprecated` JSDoc tags. Your IDE will display:

- ~~Strikethrough~~ on deprecated method names
- Warning messages with migration hints
- Links to alternative methods

**Example in VS Code**:
```typescript
// IDE shows strikethrough and warning
sdk.promotion.getAutoStatWords({ id: 123 });
          //  ~~~~~~~~~~~~~~~~
          //  @deprecated This method is deprecated and will be disabled on February 2, 2026.
          //  Migrate to universal statistics method getAdvFullstats()
```

---

## Timeline

| Date | Event |
|------|-------|
| **December 24, 2024** | Wildberries announces deprecation |
| **January 15, 2025** | Original deprecation date for `createAutoSetExcluded()` |
| **February 2, 2026** | **All 4 methods will be disabled** |

**Recommendation**: Migrate **before January 31, 2025** to allow buffer time for testing.

---

## Common Migration Patterns

### Pattern 1: Fetching Campaign Products

**Scenario**: You need to get the list of products in a campaign.

```typescript
// ❌ OLD CODE (Type 8)
async function getCampaignProducts(campaignId: number) {
  const productIds = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });
  return productIds;
}

// ✅ NEW CODE (Type 9)
async function getCampaignProducts(campaignId: number) {
  const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
  const campaign = campaigns.adverts?.[0];
  return campaign?.nms || []; // Returns array of product IDs
}
```

**Key difference**: Type 9 returns complete campaign info, including products in `nms` field.

---

### Pattern 2: Adding Products to Campaign

**Scenario**: You need to add multiple products to an existing campaign.

```typescript
// ❌ OLD CODE (Type 8)
async function addProductsToCampaign(campaignId: number, productIds: number[]) {
  await sdk.promotion.createAutoUpdatenm(
    { add: productIds },
    { id: campaignId }
  );
}

// ✅ NEW CODE (Type 9)
async function addProductsToCampaign(campaignId: number, productIds: number[]) {
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: campaignId,
      nms: { add: productIds }
    }]
  });
}

// ✅ BATCH UPDATE (Type 9) - Update multiple campaigns at once!
async function addProductsToMultipleCampaigns(
  updates: Array<{ campaignId: number; productIds: number[] }>
) {
  await sdk.promotion.updateAuctionNm({
    nms: updates.map(u => ({
      advert_id: u.campaignId,
      nms: { add: u.productIds }
    }))
  });
}
```

**Advantage**: Type 9 allows batch updates across multiple campaigns in one API call!

---

### Pattern 3: Removing Products from Campaign

**Scenario**: You need to remove specific products from a campaign.

```typescript
// ❌ OLD CODE (Type 8)
async function removeProducts(campaignId: number, productIds: number[]) {
  await sdk.promotion.createAutoUpdatenm(
    { delete: productIds },
    { id: campaignId }
  );
}

// ✅ NEW CODE (Type 9)
async function removeProducts(campaignId: number, productIds: number[]) {
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: campaignId,
      nms: { delete: productIds }
    }]
  });
}
```

---

### Pattern 4: Getting Campaign Statistics

**Scenario**: You need to analyze campaign performance and keyword clusters.

```typescript
// ❌ OLD CODE (Type 8) - Limited statistics
async function getCampaignStats(campaignId: number) {
  const stats = await sdk.promotion.getAutoStatWords({ id: campaignId });

  console.log('Keyword clusters:', stats.clusters);
  console.log('Excluded phrases:', stats.excluded);
  // ⚠️ Missing: views, clicks, orders, revenue, CTR, conversion rate
}

// ✅ NEW CODE (Type 9) - Comprehensive statistics
async function getCampaignStats(campaignId: number) {
  const stats = await sdk.promotion.getAdvFullstats({
    ids: String(campaignId),
    beginDate: '2026-01-01',
    endDate: '2026-01-31'
  });

  // ✅ Access to MUCH MORE data:
  console.log('Views:', stats.views);
  console.log('Clicks:', stats.clicks);
  console.log('Orders:', stats.orders);
  console.log('Revenue:', stats.sum);
  console.log('CTR:', stats.ctr);
  console.log('Conversion Rate:', stats.cr);

  // ✅ Daily breakdown by SKU
  stats.days?.forEach(day => {
    console.log(`Date ${day.date}:`, {
      views: day.views,
      clicks: day.clicks,
      orders: day.orders
    });

    // Per-SKU statistics
    day.apps?.forEach(sku => {
      console.log(`  SKU ${sku.nm_id}: ${sku.views} views, ${sku.clicks} clicks`);
    });
  });
}
```

**Major improvement**: `getAdvFullstats()` provides 10x more data than `getAutoStatWords()`!

---

### Pattern 5: Campaign Type Detection and Auto-Migration

**Scenario**: You want to automatically handle both type 8 and type 9 campaigns during the transition period.

```typescript
// ✅ SMART MIGRATION WRAPPER
async function getProducts(campaignId: number): Promise<number[]> {
  // Step 1: Check campaign type
  const allCampaigns = await sdk.promotion.getPromotionCount();
  const campaign = allCampaigns.adverts?.find(c => c.advertId === campaignId);

  if (!campaign) {
    throw new Error(`Campaign ${campaignId} not found`);
  }

  // Step 2: Use appropriate method based on type
  if (campaign.type === 8) {
    console.warn(`⚠️  Campaign ${campaignId} is type 8 (deprecated). Please migrate to type 9!`);
    // Still works until Feb 2, 2026, but show warning
    return await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });
  } else if (campaign.type === 9) {
    // Use modern type 9 method
    const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
    return campaigns.adverts?.[0]?.nms || [];
  } else {
    throw new Error(`Unknown campaign type: ${campaign.type}`);
  }
}
```

**Use this pattern during transition** to gracefully handle both campaign types while encouraging migration.

---

### Pattern 6: Complete Campaign Management Workflow

**Scenario**: Complete workflow for managing campaign products (check, add, remove, verify).

```typescript
// ✅ MODERN WORKFLOW (Type 9)
async function manageCampaignProducts() {
  const campaignId = 12345;

  // 1. Get current campaign state
  const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
  const campaign = campaigns.adverts?.[0];

  console.log(`Campaign: ${campaign.name}`);
  console.log(`Current products: ${campaign.nms?.length || 0}`);

  // 2. Add new products
  const newProducts = [111111, 222222, 333333];
  await sdk.promotion.updateAuctionNm({
    nms: [{
      advert_id: campaignId,
      nms: { add: newProducts }
    }]
  });
  console.log(`✅ Added ${newProducts.length} products`);

  // 3. Remove underperforming products (based on statistics)
  const stats = await sdk.promotion.getAdvFullstats({
    ids: String(campaignId),
    beginDate: '2026-01-01',
    endDate: '2026-01-31'
  });

  // Find SKUs with zero orders
  const underperforming = stats.days?.flatMap(day =>
    day.apps?.filter(sku => sku.orders === 0).map(sku => sku.nm_id) || []
  ) || [];

  if (underperforming.length > 0) {
    await sdk.promotion.updateAuctionNm({
      nms: [{
        advert_id: campaignId,
        nms: { delete: underperforming }
      }]
    });
    console.log(`✅ Removed ${underperforming.length} underperforming products`);
  }

  // 4. Verify final state
  const updated = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
  console.log(`Final product count: ${updated.adverts?.[0]?.nms?.length || 0}`);
}
```

This demonstrates the **power of type 9 campaigns**: unified API, batch operations, rich statistics!

---

## Complete Migration Example

### Before (Type 8 - Deprecated)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ All these methods will stop working Feb 2, 2026
const campaignId = 12345;

// Get products available for campaign
const availableProducts = await sdk.promotion.getAutoGetnmtoadd({ id: campaignId });

// Update products in campaign
await sdk.promotion.createAutoUpdatenm({
  add: [111111, 222222],
  delete: [333333]
}, { id: campaignId });

// Get statistics
const stats = await sdk.promotion.getAutoStatWords({ id: campaignId });
console.log('Keyword clusters:', stats.clusters);

// Set minus-phrases
await sdk.promotion.createAutoSetExcluded({
  excluded: ['competitor brand']
}, { id: campaignId });
```

### After (Type 9 - Recommended)

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Use type 9 campaign methods
const campaignId = 12345;

// Get campaign information (includes products)
const campaigns = await sdk.promotion.getAuctionAdverts({ id: [campaignId] });
const campaign = campaigns.adverts?.[0];
console.log('Campaign products:', campaign.nms);

// Update products in campaign
await sdk.promotion.updateAuctionNm({
  nms: [{
    advert_id: campaignId,
    nms: {
      add: [111111, 222222],
      delete: [333333]
    }
  }]
});

// Get comprehensive statistics (supports all campaign types)
const fullStats = await sdk.promotion.getAdvFullstats({
  ids: String(campaignId),
  beginDate: '2025-01-01',
  endDate: '2025-01-31'
});
console.log('Full statistics:', fullStats);

// Minus-phrases configuration for type 9
// (Consult Wildberries documentation for current type 9 API)
```

---

## Additional Resources

- **[Wildberries Release Notes](https://dev.wildberries.ru/en/release-notes?id=429)** - Official announcement
- **[Promotion API Documentation](https://dev.wildberries.ru/openapi/promotion)** - Complete API reference
- **[SDK Promotion Module](https://salacoste.github.io/daytona-wildberries-typescript-sdk/api/classes/PromotionModule.html)** - TypeDoc reference
- **[Promotion Guide](./promotion-advertising.md)** - SDK usage guide

## Related Migration Guides

- [Migration v2.3 - Promotion Required Parameters](/guides/migration-v2.3) — earlier breaking changes that led to this deprecation
- [Type 8 → Type 9 Campaign Migration](/guides/migration-type8-to-type9) — the definitive step-by-step guide for this same migration
- [Migration v2.7 - Analytics v3 Sales Funnel](/guides/migration-v2.7-analytics-v3) — Analytics module v3 endpoint migration
- [Migration v3.0 - Complete Guide](/guides/migration-v3) — all breaking changes in v3.0.0

---

## Need Help?

- **GitHub Issues**: [Report migration issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

---

**Last Updated**: December 24, 2024
**Applies to**: SDK v2.4+
**Deadline**: February 2, 2026
