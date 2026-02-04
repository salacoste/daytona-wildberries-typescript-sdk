# Epic 17: Fix Products Module Rate Limits for Prices & Discounts Endpoints

**Epic Goal**: Correct all 11 Prices & Discounts rate limit entries that use wrong tier values, and update the 409 penalty documentation for stocks endpoints.

**Target Completion**: Epic 17 (Single story - bug fix)

**Business Value**:
- Prevent SDK users from exceeding actual API rate limits and getting blocked
- Correct 409 penalty accounting to avoid cascading rate limit violations
- Ensure rate limiter enforces the real Wildberries API constraints

**Backlog Reference**: task-14

---

## Epic 17 Overview

### Problem Statement

**CRITICAL BUG**: All 11 Prices & Discounts endpoints in `src/config/products-rate-limits.ts` (lines 152-206) have **incorrect rate limit values**. They are currently configured with the Content standard tier (100 req/min, 0.6s interval) but should use the Prices & Discounts tier (10 req/6sec, 0.6s interval, burst 5).

Additionally, the stocks endpoints have an incorrect 409 penalty value. The Swagger specification states that a single 409 response counts as **10 requests** against the rate limit, but the current implementation does not document or enforce this correctly.

### Technical Context

**File to Fix**: `src/config/products-rate-limits.ts` (lines 152-256)
**Swagger Source**: `wildberries_api_doc/02-products/tseny-i-skidki.yaml`
**Stocks Source**: `wildberries_api_doc/02-products/ostatki-na-skladakh-prodavtsa.yaml`

### Dependencies

**Depends On**:
- Epic 1 Complete - Foundation infrastructure (RateLimiter)
- Products module rate limit configuration in place

---

## Rate Limit Tiers Explanation

The Products module spans multiple rate limit tiers. Understanding these tiers is critical to correct configuration.

### Tier 1: Content Standard

**Applies to**: Categories, characteristics, tags, cards (most methods), media, barcodes

| Period | Limit | Interval | Burst |
| --- | --- | --- | --- |
| 1 min | 100 requests | 600 ms | 5 requests |

**Config values**: `requestsPerMinute: 100, intervalSeconds: 0.6, burstLimit: 5`

### Tier 2: Content Exceptions

**Applies to**: Card upload, card upload+add, card update, card error list

| Period | Limit | Interval | Burst |
| --- | --- | --- | --- |
| 1 min | 10 requests | 6 sec | 5 requests |

**Config values**: `requestsPerMinute: 10, intervalSeconds: 6, burstLimit: 5`

### Tier 3: Prices & Discounts (THE BUG)

**Applies to**: All 11 Prices & Discounts methods (upload task, task sizes, club discounts, history, buffer, goods filter, quarantine)

| Period | Limit | Interval | Burst |
| --- | --- | --- | --- |
| **6 sec** | **10 requests** | **600 ms** | **5 requests** |

**Correct config values**: `requestsPerMinute: 100, intervalSeconds: 0.6, burstLimit: 5`

**Server**: `https://discounts-prices-api.wildberries.ru` (different from Content server)

### Tier 4: Marketplace (Stocks & Warehouses)

**Applies to**: Stocks CRUD, seller warehouses, warehouse contacts

| Period | Limit | Interval | Burst |
| --- | --- | --- | --- |
| 1 min | 300 requests | 200 ms | 20 requests |

**Config values**: `requestsPerMinute: 300, intervalSeconds: 0.2, burstLimit: 20`

**409 Penalty**: One request with a 409 response code counts as **10 requests** against the rate limit.

---

## Bug Analysis: Prices & Discounts Entries

### Current (WRONG) vs Correct Values

After careful analysis of the Swagger specification (`tseny-i-skidki.yaml`), the Prices & Discounts tier specifies:
- **Period**: 6 seconds
- **Limit**: 10 requests per 6 seconds
- **Interval**: 600 ms
- **Burst**: 5 requests

Converting to per-minute: 10 requests / 6 seconds = ~100 requests / minute.

**Key insight**: The `requestsPerMinute` value of 100 and `intervalSeconds` of 0.6 are **numerically equivalent** to the Swagger specification when the RateLimiter only supports per-minute periods. The values 10/6s and 100/60s are mathematically the same rate.

However, the **semantic difference** matters:
- The actual API enforces a **6-second window** (not a 1-minute window)
- Within any 6-second window, only 10 requests are allowed
- The interval between individual requests is 600ms

If the RateLimiter implementation uses a sliding window or token bucket at the per-minute granularity, the per-minute approximation (100/min) may allow bursts that violate the 6-second window constraint. The fix should ensure that the rate limiter correctly enforces the 6-second period, not just the per-minute equivalent.

### All 11 Affected Endpoints

| # | Config Key | Endpoint | Current Values | Status |
| --- | --- | --- | --- | --- |
| 1 | `products.postUploadTask` | `POST /api/v2/upload/task` | 100/min, 0.6s, burst 5 | Review |
| 2 | `products.postUploadTaskSize` | `POST /api/v2/upload/task/size` | 100/min, 0.6s, burst 5 | Review |
| 3 | `products.postUploadTaskClubDiscount` | `POST /api/v2/upload/task/clubDiscount` | 100/min, 0.6s, burst 5 | Review |
| 4 | `products.historyTasks` | `GET /api/v2/history/tasks` | 100/min, 0.6s, burst 5 | Review |
| 5 | `products.historyGoodsTask` | `GET /api/v2/history/goods/task` | 100/min, 0.6s, burst 5 | Review |
| 6 | `products.bufferTasks` | `GET /api/v2/buffer/tasks` | 100/min, 0.6s, burst 5 | Review |
| 7 | `products.bufferGoodsTask` | `GET /api/v2/buffer/goods/task` | 100/min, 0.6s, burst 5 | Review |
| 8 | `products.listGoodsFilter` | `GET /api/v2/list/goods/filter` | 100/min, 0.6s, burst 5 | Review |
| 9 | `products.postListGoodsFilter` | `POST /api/v2/list/goods/filter` | 100/min, 0.6s, burst 5 | Review |
| 10 | `products.listGoodsSizeNm` | `GET /api/v2/list/goods/size/nm` | 100/min, 0.6s, burst 5 | Review |
| 11 | `products.quarantineGoods` | `GET /api/v2/list/goods/quarantine` | 100/min, 0.6s, burst 5 | Review |

### Required Fix

The correct configuration for all 11 endpoints must enforce the **6-second window**. Depending on RateLimiter capabilities:

**Option A** - If RateLimiter supports custom periods:
```typescript
{
  requestsPerPeriod: 10,
  periodSeconds: 6,
  intervalSeconds: 0.6,
  burstLimit: 5
}
```

**Option B** - If RateLimiter only supports per-minute (current schema):
```typescript
{
  requestsPerMinute: 100,  // 10 per 6s = 100 per min
  intervalSeconds: 0.6,
  burstLimit: 5
}
```

With Option B, add a JSDoc comment clarifying the 6-second window constraint:
```typescript
// Prices & Discounts tier: 10 req/6sec (100 req/min equivalent)
// Actual API enforces a 6-second sliding window
```

**Implementation note**: The task-14 implementation plan should verify how the RateLimiter handles the period field and choose the appropriate option. If the numerical values are already correct (Option B), the fix focuses on adding proper documentation/comments and potentially adding a `periodSeconds` field to the RateLimitConfig type.

---

## Bug Analysis: Stocks 409 Penalty

### Current State

The stocks endpoints (`products.postStocks`, `products.putStocks`, `products.deleteStocks`) have rate limits configured at 300 req/min. The Swagger specification for all three methods states:

> One request with response code 409 counts as 10 requests

This 409 penalty is not currently documented in the rate limit configuration and may not be enforced by the RateLimiter.

### Affected Endpoints

| Config Key | Endpoint | Rate Limit | 409 Penalty |
| --- | --- | --- | --- |
| `products.postStocks` | `POST /api/v3/stocks/{warehouseId}` | 300/min, 200ms, burst 20 | 1 req = 10 requests |
| `products.putStocks` | `PUT /api/v3/stocks/{warehouseId}` | 10/min, 6s, burst 2 | 1 req = 10 requests |
| `products.deleteStocks` | `DELETE /api/v3/stocks/{warehouseId}` | 300/min, 200ms, burst 20 | 1 req = 10 requests |

### Required Fix

1. Add JSDoc comments to all three stocks entries documenting the 409 penalty
2. If the RateLimitConfig type supports a penalty field, add `penaltyOn409: 10`
3. Ensure the RateLimiter counts 409 responses as 10 requests against the limit

Example:
```typescript
/**
 * POST /api/v3/stocks/{warehouseId} - Update warehouse stocks
 * 409 penalty: one 409 response counts as 10 requests against the rate limit
 */
'products.postStocks': {
  requestsPerMinute: 300,
  intervalSeconds: 0.2,
  burstLimit: 20
  // 409 response counts as 10 requests
},
```

---

## Implementation Plan

### 1. Audit Current Rate Limit Values (lines 152-256)

- Read `src/config/products-rate-limits.ts` lines 152-206 (Prices & Discounts section)
- Read `src/config/products-rate-limits.ts` lines 207-256 (Stocks & Warehouses section)
- Cross-reference each entry against the Swagger specification

### 2. Fix Prices & Discounts Entries (lines 152-206)

- Determine if RateLimitConfig supports custom period fields
- If yes: update to use `periodSeconds: 6` with `requestsPerPeriod: 10`
- If no: verify numerical equivalence and add clarifying JSDoc comments
- Add section comment distinguishing Prices & Discounts tier from Content tier

### 3. Document 409 Penalty for Stocks Entries (lines 207-256)

- Add JSDoc comments to `products.postStocks`, `products.putStocks`, `products.deleteStocks`
- Document that 409 responses count as 10 requests
- If RateLimitConfig supports penalty fields, add penalty configuration

### 4. Update Rate Limit Unit Tests

- Add/update tests verifying correct values for all 11 Prices & Discounts entries
- Add tests verifying stocks entries have correct values
- Ensure no other rate limit entries are accidentally changed (regression check)

### 5. Run Full Test Suite

- `npm test` to verify no regressions
- `npm run type-check` for TypeScript compliance
- `npm run lint` for code style

---

## Files to Modify

| File | Change |
| --- | --- |
| `src/config/products-rate-limits.ts` | Fix 11 Prices & Discounts entries (lines 152-206), add 409 penalty docs to stocks entries (lines 207-256) |
| `tests/unit/config/products-rate-limits.test.ts` | Update/add tests verifying correct rate limit values |

---

## Acceptance Criteria

From task-14:

- [ ] All 11 Prices & Discounts rate limit entries corrected to 10 req/6sec period, 0.6s interval, burst 5
- [ ] 409 penalty for stocks endpoints documented as counting as 10 requests (not 5)
- [ ] Rate limit unit tests updated to verify correct values
- [ ] No other rate limit entries accidentally changed

---

## Verification Checklist

After applying the fix, verify each endpoint:

### Prices & Discounts (all 11 must match)
```
Period: 6 sec | Limit: 10 requests | Interval: 600 ms | Burst: 5
```

### Stocks (409 penalty documented)
```
postStocks:   300/min, 200ms, burst 20, 409 = 10 requests
putStocks:    10/min, 6s, burst 2, 409 = 10 requests
deleteStocks: 300/min, 200ms, burst 20, 409 = 10 requests
```

### Unchanged Entries (regression check)
- Content standard entries (lines 17-131): 100/min, 0.6s, burst 5
- Content exceptions (lines 92-141): 10/min, 6s, burst 5
- Warehouses entries (lines 222-256): 300/min, 0.2s, burst 20

---

## Risk Assessment

### High Risk
- Incorrect rate limits can cause API blocks for SDK users
- 409 penalty miscounting can lead to cascading rate limit violations

### Low Risk
- Fix is localized to a single configuration file
- No logic changes required in the RateLimiter itself (unless adding penalty support)
- Other rate limit entries are not affected

### Mitigation Strategies
- Regression tests verify all entries (not just the fixed ones)
- Cross-reference every value against the Swagger specification
- Run full test suite before and after changes

---

## Notes

- This is a configuration bug, not a logic bug - the RateLimiter itself works correctly
- The Prices & Discounts endpoints use a different server (`discounts-prices-api.wildberries.ru`) than Content endpoints (`content-api.wildberries.ru`), which is why they have a separate rate limit tier
- The 409 penalty applies specifically to stocks endpoints where concurrent updates can cause conflicts
- The `putStocks` endpoint has a notably different rate limit (10/min, 6s interval, burst 2) compared to `postStocks` and `deleteStocks` (300/min) - verify this is correct in Swagger
- All rate limit values in this file are auto-generated - consider re-running the generator with corrected parsing to prevent future drift
