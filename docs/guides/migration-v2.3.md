# Migration Guide: v2.2 to v2.3

This guide helps you migrate from SDK version 2.2.x to version 2.3.0. This release focuses on **type safety improvements** and **API contract alignment** for the Promotion module.

## Overview

Version 2.3.0 includes:

- **18 breaking changes** in method signatures (optional → required parameters)
- **3 new typed responses** for Calendar API methods
- **35 JSDoc fixes** for code examples
- **Improved TypeScript developer experience**

::: danger Breaking Changes
This release contains breaking changes that may cause TypeScript compilation errors in existing code. Read this guide carefully before upgrading.
:::

## Quick Migration

### Step 1: Update Package

```bash
npm update daytona-wildberries-typescript-sdk
# or
yarn upgrade daytona-wildberries-typescript-sdk
```

### Step 2: Fix Compilation Errors

After updating, run TypeScript compilation:

```bash
npm run type-check
```

Fix any errors by adding required parameters (see [Affected Methods](#affected-methods) below).

### Step 3: Verify Tests

```bash
npm test
```

## What Changed

### Required Parameters (18 Methods)

In v2.2.x, many Promotion module methods had **optional parameters** that were actually **required by the WB API**. This led to:

- Code that compiled but failed at runtime
- No TypeScript errors for missing required parameters
- Runtime 400 errors from Wildberries API

**v2.3.0 fixes this** by making these parameters required at the TypeScript level.

### Before vs After

```typescript
// ❌ v2.2.x - Compiled without error, but API returned 400
await sdk.promotion.getAdvBudget();
await sdk.promotion.getAdvStart();
await sdk.promotion.getCalendarPromotions({ allPromo: true });

// ✅ v2.3.0 - TypeScript catches the error at compile time
await sdk.promotion.getAdvBudget({ id: 12345 });
await sdk.promotion.getAdvStart({ id: 12345 });
await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01T00:00:00Z',
  endDateTime: '2024-12-31T23:59:59Z',
  allPromo: true
});
```

## Affected Methods

### Campaign Control Methods

| Method | v2.2.x | v2.3.0 |
|--------|--------|--------|
| `getAdvStart()` | `options?: { id: number }` | `options: { id: number }` |
| `getAdvPause()` | `options?: { id: number }` | `options: { id: number }` |
| `getAdvStop()` | `options?: { id: number }` | `options: { id: number }` |
| `getAdvDelete()` | `options?: { id: number }` | `options: { id: number }` |

**Migration:**
```typescript
// Before
await sdk.promotion.getAdvStart();  // Wrong - but compiled

// After
await sdk.promotion.getAdvStart({ id: campaignId });  // Correct
```

### Budget Methods

| Method | v2.2.x | v2.3.0 |
|--------|--------|--------|
| `getAdvBudget()` | `options?: { id: number }` | `options: { id: number }` |
| `createBudgetDeposit()` | `options?: { id: number }` | `options: { id: number }` |

**Migration:**
```typescript
// Before
const budget = await sdk.promotion.getAdvBudget();

// After
const budget = await sdk.promotion.getAdvBudget({ id: campaignId });
```

### Keyword/Phrase Methods

| Method | v2.2.x | v2.3.0 |
|--------|--------|--------|
| `getSearchSetPlus()` | `options?: { id; fixed? }` | `options: { id; fixed? }` |
| `createSearchSetPlu()` | `options?: { id }` | `options: { id }` |
| `createSearchSetExcluded()` | `options?: { id }` | `options: { id }` |
| `createAutoSetExcluded()` | `options?: { id }` | `options: { id }` |

**Migration:**
```typescript
// Before
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['cheap', 'discount'] }
);

// After
await sdk.promotion.createSearchSetExcluded(
  { excluded: ['cheap', 'discount'] },
  { id: campaignId }  // Required
);
```

### Product Management Methods

| Method | v2.2.x | v2.3.0 |
|--------|--------|--------|
| `getAutoGetnmtoadd()` | `options?: { id }` | `options: { id }` |
| `createAutoUpdatenm()` | `options?: { id }` | `options: { id }` |

### Other Methods

| Method | v2.2.x | v2.3.0 |
|--------|--------|--------|
| `getAdvUpd()` | `options?: { from; to }` | `options: { from; to }` |
| `createAdvRename()` | `data?: { advertId; name }` | `data: { advertId; name }` |

**Migration:**
```typescript
// Before
await sdk.promotion.getAdvUpd();  // Missing required dates

// After
await sdk.promotion.getAdvUpd({
  from: '2024-01-01',
  to: '2024-12-31'
});
```

### Calendar API Methods

| Method | v2.2.x | v2.3.0 |
|--------|--------|--------|
| `getCalendarPromotions()` | `options?: { ... }` | `options: { startDateTime; endDateTime; allPromo; limit?; offset? }` |
| `getPromotionsDetails()` | `options?: { promotionIDs }` | `options: { promotionIDs }` |
| `getPromotionsNomenclatures()` | `options?: { ... }` | `options: { promotionID; inAction; limit?; offset? }` |

**Migration:**
```typescript
// Before
const promos = await sdk.promotion.getCalendarPromotions({ allPromo: true });

// After
const promos = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01T00:00:00Z',  // Required
  endDateTime: '2024-12-31T23:59:59Z',     // Required
  allPromo: true                            // Required
});
```

## New Features in v2.3.0

### Typed Calendar API Responses

Calendar API methods now return properly typed responses instead of `Promise<unknown>`:

```typescript
// v2.2.x - No autocomplete, unknown type
const promos = await sdk.promotion.getCalendarPromotions({...});
// promos: unknown

// v2.3.0 - Full TypeScript support
const promos = await sdk.promotion.getCalendarPromotions({
  startDateTime: '2024-01-01T00:00:00Z',
  endDateTime: '2024-12-31T23:59:59Z',
  allPromo: true
});

// Now with full autocomplete!
promos.data?.promotions?.forEach(promo => {
  console.log(promo.name);          // ✅ TypeScript knows about .name
  console.log(promo.type);          // ✅ TypeScript knows about .type
  console.log(promo.startDateTime); // ✅ TypeScript knows about .startDateTime
});
```

### Response Type Definitions

```typescript
// getCalendarPromotions() response
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

// getPromotionsDetails() response
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

// getPromotionsNomenclatures() response
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

### Fixed JSDoc Examples

All 35 Promotion module methods now have correct JSDoc examples using `sdk.promotion.*` instead of the incorrect `sdk.general.*`:

```typescript
// v2.2.x (incorrect)
/**
 * @example
 * const result = await sdk.general.getPromotionCount();  // Wrong namespace
 */

// v2.3.0 (correct)
/**
 * @example
 * const result = await sdk.promotion.getPromotionCount();  // Correct namespace
 */
```

## Complete Migration Checklist

Use this checklist to ensure your migration is complete:

### Required Parameter Updates

- [ ] `getAdvStart()` - Add `{ id }` parameter
- [ ] `getAdvPause()` - Add `{ id }` parameter
- [ ] `getAdvStop()` - Add `{ id }` parameter
- [ ] `getAdvDelete()` - Add `{ id }` parameter
- [ ] `getAdvBudget()` - Add `{ id }` parameter
- [ ] `createBudgetDeposit()` - Add `{ id }` parameter
- [ ] `getSearchSetPlus()` - Add `{ id }` parameter
- [ ] `createSearchSetPlu()` - Add `{ id }` parameter
- [ ] `createSearchSetExcluded()` - Add `{ id }` parameter
- [ ] `createAutoSetExcluded()` - Add `{ id }` parameter
- [ ] `getAutoGetnmtoadd()` - Add `{ id }` parameter
- [ ] `createAutoUpdatenm()` - Add `{ id }` parameter
- [ ] `getAdvUpd()` - Add `{ from, to }` parameters
- [ ] `createAdvRename()` - Ensure `{ advertId, name }` is provided
- [ ] `getCalendarPromotions()` - Add `{ startDateTime, endDateTime, allPromo }` parameters
- [ ] `getPromotionsDetails()` - Add `{ promotionIDs }` parameter
- [ ] `getPromotionsNomenclatures()` - Add `{ promotionID, inAction }` parameters

### Verification Steps

- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm test` - All tests pass
- [ ] Test Promotion module methods in development environment
- [ ] Verify Calendar API responses are properly typed

## FAQ

### Why were these changes made?

The WB API requires these parameters - they were never optional. The v2.2.x SDK incorrectly marked them as optional, which meant:
- TypeScript didn't catch missing parameters
- Code compiled but failed at runtime with 400 errors
- Developer experience was poor (no IDE warnings)

### Will this break my production code?

If your code was working before, it was already passing the required parameters. This change will only break code that:
- Called methods without required parameters (which would fail at runtime anyway)
- Used TypeScript strict mode and relied on optional parameters

### Can I stay on v2.2.x?

Yes, but you'll miss out on:
- Calendar API typed responses
- Better TypeScript error messages
- Correct JSDoc examples

### What if I find a bug?

Please report issues at: https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues

## Version History

| Version | Date | Changes |
|---------|------|---------|
| **2.3.0** | Dec 2024 | Breaking: 18 required parameters, Calendar API types, JSDoc fixes |
| 2.2.2 | Dec 2024 | Fixed `getStatsKeywords()` required parameters |
| 2.2.1 | Dec 2024 | Fixed `getStatsKeywords()` URL |
| 2.2.0 | Dec 2024 | Added Promotion module comprehensive testing |

## See Also

- [Promotion & Advertising Guide](/guides/promotion-advertising) - Complete module documentation
- [Promotion API Reference](/api/promotion-api-reference) - Full API reference
- [Story 9.9: SDK Parameter Fixes](/docs/stories/9.9.promotion-sdk-type-fixes.md) - Technical details
- [Troubleshooting Guide](/guides/troubleshooting) - Common issues and solutions
