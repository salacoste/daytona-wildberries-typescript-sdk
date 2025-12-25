# Migration Guide: Promotion API Deprecation (v2.4)

**⚠️ CRITICAL**: Wildberries is deprecating standard bid campaign methods (type 8) on **February 2, 2026**.

---

## Overview

Wildberries is transitioning from standard bid campaigns (type 8) to campaigns with custom and standard bids (type 9). Four API methods will be **disabled on February 2, 2026**.

**Source**: [Wildberries Release Notes #429](https://dev.wildberries.ru/en/release-notes?id=429)

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

---

## Need Help?

- **GitHub Issues**: [Report migration issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- **GitHub Discussions**: [Ask questions](https://github.com/salacoste/daytona-wildberries-typescript-sdk/discussions)

---

**Last Updated**: December 24, 2024
**Applies to**: SDK v2.4+
**Deadline**: February 2, 2026
