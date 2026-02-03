# Session Summary: Promotion Module Validation

**Date**: 2025-01-28
**SDK Version**: v2.6.0
**Request**: User team's support request about `getAdvFullstats()` returning HTTP 400

---

## Context: Original Support Request

**From**: User team using the SDK
**Problem**: `sdk.promotion.getAdvFullstats()` returns HTTP 400 from WB API

**User's Code**:
```typescript
sdk.promotion.getAdvFullstats({
  ids: "123,456,789",
  nDate: "2025-12-01",    // ❌ TYPO: should be "beginDate"
  endDate: "2026-01-28",
});
```

**Root Cause Identified**: Parameter name typo (`nDate` instead of `beginDate`)

**SDK Status**: ✅ **CORRECT** - v2.6.0 already uses GET with query params for `/adv/v3/fullstats`

---

## What Was Done

### 1. Swagger Specification Analysis
**File**: `wildberries_api_doc/08-promotion.yaml`
**Discovered**: All 44+ promotion endpoints across 8 categories:

| Category | Endpoints | Key Discovery |
|----------|-----------|---------------|
| Campaign Info | 3 methods | `getPromotionCount`, `getAuctionAdverts`, `createPromotionAdvert` |
| Campaign Creation | 5 methods | `createSeacatSaveAd` (type 9), `createAdvSaveAd` (deprecated) |
| Campaign Management | 8 methods | delete, rename, start, pause, stop, bids, placements |
| Budget & Finances | 5 methods | `getAdvBalance`, `createBudgetDeposit`, `getAdvUpd`, `getAdvPayments` |
| Keywords/Phrases | 5 methods | Fixed phrases, minus phrases, keyword stats |
| Statistics | 6 methods | **`getAdvFullstats` (v3)** - CURRENT RECOMMENDED |
| Media Campaigns | 4 methods | Separate API: `advert-media-api.wildberries.ru` |
| Calendar Promotions | 4 methods | API: `dp-calendar-api.wildberries.ru` |

**Critical Finding**:
- `/adv/v2/fullstats` (POST) - **DEPRECATED Sep 30**
- `/adv/v3/fullstats` (GET) - **CURRENT** with query params: `ids`, `beginDate`, `endDate`

### 2. SDK Code Review
**File**: `src/modules/promotion/index.ts`
**Lines**: 654-656

```typescript
async getAdvFullstats(options?: { ids: string; beginDate: string; endDate: string }): Promise<ResponseFullStats> {
  return this.client.get<ResponseFullStats>('https://advert-api.wildberries.ru/adv/v3/fullstats', { params: options });
}
```

**Status**: ✅ **CORRECT** - Uses GET with query params

### 3. Validation Script Created
**File**: `scripts/validate-promotion-all-methods.ts`
**Status**: ✅ Created, compiles without TypeScript errors

**Script Coverage**:
- Phase 1: Live GET tests (24 methods) - read-only operations
- Phase 2: Structural validation (18 methods) - POST/PATCH/PUT existence check
- Phase 3: Safe POST tests (3 methods) - read-like POST operations

**Total Methods**: 44 promotion module methods

---

## Response to Support Request (Draft)

| Question | Answer |
|----------|--------|
| **Q1: HTTP method used?** | GET ✅ (SDK v2.6.0 is correct) |
| **Q2: Fix needed?** | NO - SDK already uses GET |
| **Q3: Cause of HTTP 400** | User error: `nDate` should be `beginDate` |
| **Q4: Parameter format** | Query params: `?ids=123,456&beginDate=2025-12-01&endDate=2026-01-28` |
| **Q5: Workaround** | Use `sdk.client.get()` directly (not needed - fix param name) |

**All Promotion Statistics Methods**:

| Method | HTTP | Endpoint | Status |
|--------|------|----------|--------|
| `getAdvFullstats()` | GET | `/adv/v3/fullstats` | **CURRENT** ✅ |
| `createAdvFullstat()` | POST | `/adv/v2/fullstats` | Deprecated (Sep 30) |
| `getAutoStatWords()` | GET | `/adv/v2/auto/stat-words` | Deprecated (Feb 2, 2026) |
| `getStatWords()` | GET | `/adv/v1/stat/words` | Current |
| `getStatsKeywords()` | GET | `/adv/v0/stats/keywords` | Current (max 7 days) |
| `createAdvStat()` | POST | `/adv/v1/stats` (media) | Current |

---

## Files Created/Modified

### New Files
| File | Purpose |
|------|---------|
| `scripts/validate-promotion-all-methods.ts` | Full validation script for all 44 promotion methods |

### Existing Files Referenced
| File | Purpose |
|------|---------|
| `wildberries_api_doc/08-promotion.yaml` | Source Swagger specification |
| `src/modules/promotion/index.ts` | SDK promotion module implementation |
| `src/types/promotion.types.ts` | TypeScript type definitions |
| `scripts/test-promotion-comprehensive.ts` | Existing test (has outdated method names) |

---

## Manual Tasks Remaining

### 1. Run Validation Script
```bash
npx tsx scripts/validate-promotion-all-methods.ts
```

**Expected runtime**: ~3-4 minutes (due to WB rate limits)
**Exit codes**: 0 = all pass, 1 = failures detected

### 2. Review Test Output
Check for:
- `[FAIL]` entries - API endpoints not working
- `[SKIP]` entries - campaigns needed for full testing

### 3. Document Results
After running, update documentation with:
- Which methods passed/failed
- Any API changes needed
- Response to support request team

### 4. Fix Existing Test Script
**File**: `scripts/test-promotion-comprehensive.ts`

**Issue**: Uses non-existent methods:
- `pauseAdvert` → should be `getAdvPause`
- `startAdvert` → should be `getAdvStart`
- `deleteAdvert` → should be `getAdvDelete`

### 5. Send Response to User Team
Based on findings, send them:

```
Subject: RE: getAdvFullstats() HTTP 400 Error

Hi team,

We analyzed your issue with sdk.promotion.getAdvFullstats().

Root Cause: Parameter name typo in your code

Your code:
  sdk.promotion.getAdvFullstats({
    ids: "123,456,789",
    nDate: "2025-12-01",    // ❌ Wrong parameter name
    endDate: "2026-01-28",
  });

Should be:
  sdk.promotion.getAdvFullstats({
    ids: "123,456,789",
    beginDate: "2025-12-01",  // ✅ Correct
    endDate: "2026-01-28",
  });

SDK v2.6.0 already uses the correct API endpoint:
- HTTP Method: GET ✅
- Endpoint: /adv/v3/fullstats ✅
- Parameters: ids, beginDate, endDate (as query params) ✅

Rate limits: 3 requests/min, 20s interval, max 31 days date range

No SDK fix required. Please update your code to use "beginDate".
```

---

## API Rate Limits Reference

| Endpoint | Limit | Interval | Burst |
|----------|-------|----------|-------|
| `/adv/v1/promotion/count` | 5 req/s | 200ms | 5 |
| `/adv/v0/auction/adverts` | 5 req/s | 200ms | 5 |
| `/adv/v0/config` | 1 req/min | 60s | 1 |
| `/adv/v1/supplier/subjects` | 1 req | 12s | 5 |
| `/adv/v1/balance` | 1 req/s | 1s | 5 |
| `/adv/v1/budget` | 4 req/s | 250ms | 4 |
| `/adv/v3/fullstats` | 3 req/min | 20s | 1 |
| `/adv/v1/stats/words` | 4 req/s | 250ms | 4 |
| Media APIs | 10 req/s | 100ms | 10 |

---

## Key Takeaways

1. **SDK is correct** - v2.6.0 properly implements `/adv/v3/fullstats` with GET
2. **User error** - typo `nDate` instead of `beginDate`
3. **Validation script ready** - covers all 44 promotion methods
4. **Manual run needed** - script not executed by AI (security policy)

---

## Next Steps for Next Agent/Session

1. Run validation script: `npx tsx scripts/validate-promotion-all-methods.ts`
2. Review output and document any failures
3. Send response to user team with findings
4. Consider fixing `test-promotion-comprehensive.ts` with correct method names
5. Update documentation if any API changes discovered

---

## Session Meta

- **Files analyzed**: 8+ files including Swagger spec, SDK code, test scripts
- **Files created**: 1 (validation script)
- **TypeScript compilation**: ✅ Clean (no errors after fixes)

**Decisions**:
- Validation with live API token declined for security reasons
- Alternative: validation script for user to run manually
- Final deliverable: summary document + validation script
