# Quick Fix Guide - CI/CD TypeScript Errors

> **v2.7.0 Note**: This guide was written before the Analytics v3 migration (EPIC 13). The v2 endpoints and types referenced below (`/api/v2/nm-report/detail`, `NmReportDetailedByPeriodItem`) have been replaced by v3 equivalents. See `docs/guides/migration-v2.7-analytics-v3.md` for current analytics types and endpoints.

🔴 **CRITICAL**: All CI/CD builds failing. See [`typescript_type_errors.md`](./typescript_type_errors.md) for full details.

---

## 🚨 TL;DR

**File**: `tests/integration/cross-module-examples.integration.test.ts`
**Problem**: Mock data structure doesn't match SDK type definitions
**Impact**: CI/CD type-check fails on all Node versions

---

## ⚡ Quick Fix (30 mins)

### 1. Fix Import (Line 26) - ✅ ALREADY DONE
```diff
- import type { NmReportDetailedByPeriodItem } from '../../src/types/analytics.types';
```

### 2. Fix Mock Response Structure (Lines 66-92)
```typescript
// Replace this entire mock handler:
http.post('https://seller-analytics-api.wildberries.ru/api/v2/nm-report/detail', () => {
  return HttpResponse.json({
    data: {  // ← Add wrapper object
      page: 1,
      isNextPage: false,
      cards: [  // ← Rename from direct array
        {
          nmID: 12345,
          vendorCode: 'SKU001',
          brandName: 'TestBrand',
          tags: [],
          object: { id: 1, name: 'Category' },
          statistics: {
            current: {
              openCardCount: 1000,  // ← renamed from openCard
              addToCartCount: 200,
              ordersCount: 150,
              buyoutsCount: 120,
              cancelCount: 30
            },
            previous: null,
            dynamics: null
          },
          stocks: { stocksMp: 0, stocksWb: 0 }
        } as any,  // ← Use 'any' for quick fix
        {
          nmID: 12346,
          vendorCode: 'SKU002',
          brandName: 'TestBrand',
          tags: [],
          object: { id: 1, name: 'Category' },
          statistics: {
            current: {
              openCardCount: 800,
              addToCartCount: 150,
              ordersCount: 100,
              buyoutsCount: 80,
              cancelCount: 20
            },
            previous: null,
            dynamics: null
          },
          stocks: { stocksMp: 0, stocksWb: 0 }
        } as any
      ]
    }
  });
});
```

### 3. Fix All Test Code References

**Search and Replace** (use your IDE):

```
Find:    analytics.data.length
Replace: analytics.data.cards.length

Find:    analytics.data[0]
Replace: analytics.data.cards[0]

Find:    analytics.data.reduce
Replace: analytics.data.cards.reduce
```

**Manual Fix for Reduce** (Lines 304-306):
```typescript
// OLD:
const totalViews = analytics.data.reduce((sum, item) => sum + (item.openCard ?? 0), 0);
const totalOrders = analytics.data.reduce((sum, item) => sum + (item.ordersCount ?? 0), 0);

// NEW:
const totalViews = analytics.data.cards.reduce(
  (sum: number, item: any) => sum + (item.statistics?.current?.openCardCount ?? 0),
  0
);
const totalOrders = analytics.data.cards.reduce(
  (sum: number, item: any) => sum + (item.statistics?.current?.ordersCount ?? 0),
  0
);
```

### 4. Fix Type Conversions (Lines 62, ~200)

**Line 62** (Transaction):
```typescript
] as unknown as Transaction[]  // ← Add 'unknown'
```

**Line ~200** (SalesItem):
```typescript
] as unknown as SalesItem[]  // ← Add 'unknown'
```

### 5. Verify & Commit

```bash
# Test locally
npm run type-check
npm test cross-module-examples

# Commit
git add tests/integration/cross-module-examples.integration.test.ts
git commit -m "fix(tests): correct TypeScript types in cross-module tests"
git push origin main
```

---

## 🎯 Expected Outcome

✅ CI/CD builds pass on all Node versions
✅ Type checking succeeds
✅ All tests pass

**CI Duration**: ~40-50 seconds

---

## 📋 Checklist

- [ ] Import removed (already done)
- [ ] Mock data wrapped in `{ data: { page, isNextPage, cards } }`
- [ ] Field names updated (`openCard` → `openCardCount`)
- [ ] All `analytics.data` changed to `analytics.data.cards`
- [ ] Reduce functions have explicit types
- [ ] Type conversions use `unknown`
- [ ] Local type-check passes
- [ ] Local tests pass
- [ ] Changes committed and pushed

---

**Questions?** See full guide: [`typescript_type_errors.md`](./typescript_type_errors.md)
