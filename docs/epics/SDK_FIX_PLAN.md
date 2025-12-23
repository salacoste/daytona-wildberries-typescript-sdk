# SDK Promotion Module Fix Plan

## Overview
Fix all identified issues in `/src/modules/promotion/index.ts`

**Status: COMPLETED** - All phases executed successfully on 2025-12-23

---

## Phase 1: Fix Example Namespaces (sdk.general -> sdk.promotion) ✅ COMPLETED

All JSDoc examples incorrectly use `sdk.general.*` instead of `sdk.promotion.*`

### Methods fixed (~35 methods):
- [x] All methods - Fixed using global `replace_all` operation

**Strategy**: Used `replace_all` to replace `sdk.general.` with `sdk.promotion.`

---

## Phase 2: Fix Required Parameters (options? -> options) ✅ COMPLETED

### Group A: Single `id` parameter required ✅
- [x] getAdvDelete
- [x] getAdvStart
- [x] getAdvPause
- [x] getAdvStop
- [x] getAdvBudget
- [x] getSearchSetPlus (also has optional `fixed`)
- [x] getAutoGetnmtoadd

### Group B: `id` parameter in options with body ✅
- [x] createBudgetDeposit
- [x] createSearchSetPlu
- [x] createSearchSetExcluded
- [x] createAutoSetExcluded
- [x] createAutoUpdatenm

### Group C: Multiple required parameters ✅
- [x] getAdvUpd (from, to parameters)

### Group D: Calendar API methods ✅
- [x] getCalendarPromotions (startDateTime, endDateTime, allPromo)
- [x] getPromotionsDetails (promotionIDs)
- [x] getPromotionsNomenclatures (promotionID, inAction)

### Group E: Required body parameters ✅
- [x] createAdvRename (advertId, name)

---

## Phase 3: Fix Return Types (unknown -> proper types) ✅ COMPLETED

### Calendar API response types:

1. **getCalendarPromotions** ✅
```typescript
Promise<{ data?: { promotions?: { id?: number; name?: string; type?: string; startDateTime?: string; endDateTime?: string }[] } }>
```

2. **getPromotionsDetails** ✅
```typescript
Promise<{ data?: { promotions?: { id?: number; name?: string; description?: string; startDateTime?: string; endDateTime?: string; inPromoActionLeftovers?: number; inPromoActionTotal?: number; notInPromoActionLeftovers?: number; notInPromoActionTotal?: number }[] } }>
```

3. **getPromotionsNomenclatures** ✅
```typescript
Promise<{ data?: { nomenclatures?: { nmID?: number; vendorCode?: string; inAction?: boolean }[] } }>
```

---

## Phase 4: Verification ✅ COMPLETED

- [x] Run `npm run build` - PASSED
- [x] Run `npm run type-check` - PASSED
- [x] Run `npm run lint` - PASSED (3 unrelated warnings in tariffs tests)
- [x] Run `npm run test` - PASSED (951 tests passed, 6 skipped)

---

## Execution Summary

| Phase | Description | Status |
|-------|-------------|--------|
| 1 | Global replace sdk.general → sdk.promotion | ✅ Complete |
| 2A | Fix required id parameters (7 methods) | ✅ Complete |
| 2B | Fix required id with body (5 methods) | ✅ Complete |
| 2C | Fix getAdvUpd required params | ✅ Complete |
| 2D | Fix Calendar API required params (3 methods) | ✅ Complete |
| 2E | Fix createAdvRename required body | ✅ Complete |
| 3 | Fix unknown return types (3 methods) | ✅ Complete |
| 4 | Verify build and tests | ✅ Complete |

**Total edits performed**: ~25 individual edits
**All tests passing**: 951 passed, 6 skipped
