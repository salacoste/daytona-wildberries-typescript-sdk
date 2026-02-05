# Epic 27: DBS Module - Rate Limit Audit and Correction

**Epic Goal**: Audit and correct the rate limit configuration for all Orders DBS endpoints. Fix 23 key mismatches between the config file and module code, replace uniform 300/min values with the correct 4-tier rate limit system from swagger, and add entries for new endpoints from Epic 26.

**Target Completion**: Epic 27.x (Single story -- 27.1)
**SDK Version**: 2.9.0
**Status**: DONE

**Business Value**:
- Fixes a critical bug: the rate limiter cannot find limits for most DBS methods due to key mismatches, so rate limiting is effectively disabled
- Prevents 429 rate limit errors by enforcing correct per-tier limits
- Ensures bulk metadata endpoints (Epic 26) have correct rate limits from day one
- Documents the complete 4-tier rate limit system for DBS module maintainers

---

## Epic 27 Overview

### Problem Statement

The DBS module rate limit configuration (`src/config/orders-dbs-rate-limits.ts`, 201 lines) has **23 rate limit key mismatches** between the config file and the module code (`src/modules/orders-dbs/index.ts`, 714 lines). When the module code calls `this.client.post(..., { rateLimitKey: 'orders-dbs.getMeta' })`, the rate limiter looks up that key in the config. But the config file has the key `orders-dbs.getOrderMeta` instead. The rate limiter finds no match, so **no rate limiting is applied** for that method.

Additionally, all 23 entries in the config use the same uniform values: 300 req/min, 200ms interval, 20 burst. The swagger specification defines **4 distinct rate limit tiers** with different values. The status write methods should be 1 req/sec (not 300/min), and the metadata methods have their own tiers (150/min for read/delete, 500/min for set).

### Strategic Context

This is a companion epic to Epic 26 (DBS New Endpoints). The rate limit config must be corrected before adding entries for the 9 new endpoints, otherwise the new entries would inherit the same problems. Epic 27 should be completed first or in parallel with Epic 26.

### Technical Context

**Configuration File**: `src/config/orders-dbs-rate-limits.ts` (201 lines, 23 entries)
**Module File**: `src/modules/orders-dbs/index.ts` (714 lines, 22 methods)
**Rate Limiter**: `src/client/rate-limiter.ts` (token bucket algorithm from Story 1.4)
**Swagger Source**: `wildberries_api_doc/04-orders-dbs/` (4 shard files)

### Dependencies

**Depends On:**
- Epic 12 Complete - DBS module foundation

**Blocks:**
- Epic 26 - New endpoint rate limit entries should use correct keys and tiers

---

## Rate Limit Tier System

The Wildberries DBS API uses 4 distinct rate limit tiers extracted from swagger operation descriptions.

| Tier | Name | RPM | Interval | Burst | Endpoint Count | Applied To |
|------|------|-----|----------|-------|----------------|------------|
| **T1** | Assembly Read | 300 req/min | 200ms | 20 | 7 endpoints | Core read operations, B2B info, info endpoints |
| **T2** | Status Write | ~60 req/min (1/sec) | 1s | 10 | 5 endpoints | Bulk status confirm/deliver/receive/reject/cancel |
| **T3** | Meta Read/Delete | 150 req/min | 400ms | 20 | 2 endpoints | Bulk meta info, bulk meta delete |
| **T4** | Meta Set | 500 req/min | 120ms | 20 | 5 endpoints | Bulk meta sgtin/uin/imei/gtin/customs-declaration |

**Current config problem**: All 23 entries use T1 values (300/min, 200ms, 20 burst), regardless of actual tier.

---

## Key Mismatch Inventory

### Complete Mismatch Table

All 23 entries in the config file compared against the `rateLimitKey` values used in the module code.

| # | Config Key (in `orders-dbs-rate-limits.ts`) | Module `rateLimitKey` (in `index.ts`) | Match? | Correct Tier | Current RPM | Correct RPM |
|---|---------------------------------------------|---------------------------------------|--------|--------------|-------------|-------------|
| **Core Operations (Story 12.1)** | | | | | | |
| 1 | `orders-dbs.getNewOrders` | `orders-dbs.getNewOrders` | YES | T1 | 300 | 300 |
| 2 | `orders-dbs.getOrders` | `orders-dbs.getOrders` | YES | T1 | 300 | 300 |
| 3 | `orders-dbs.getClientInfo` | `orders-dbs.getClientInfo` | YES | T1 | 300 | 300 |
| **Bulk Status (Story 12.2)** | | | | | | |
| 4 | `orders-dbs.getStatusInfoBulk` | `orders-dbs.getStatusesBulk` | NO | T1 | 300 | 300 |
| 5 | `orders-dbs.confirmOrdersBulk` | `orders-dbs.confirmBulk` | NO | T2 | 300 | **60** |
| 6 | `orders-dbs.deliverOrdersBulk` | `orders-dbs.deliverBulk` | NO | T2 | 300 | **60** |
| 7 | `orders-dbs.receiveOrdersBulk` | `orders-dbs.receiveBulk` | NO | T2 | 300 | **60** |
| 8 | `orders-dbs.rejectOrdersBulk` | `orders-dbs.rejectBulk` | NO | T2 | 300 | **60** |
| 9 | `orders-dbs.cancelOrdersBulk` | `orders-dbs.cancelBulk` | NO | T2 | 300 | **60** |
| **Deprecated Status (Story 12.2)** | | | | | | |
| 10 | `orders-dbs.getStatusLegacy` | `orders-dbs.getStatuses` | NO | T1 | 300 | 300 |
| 11 | `orders-dbs.confirmOrderLegacy` | `orders-dbs.confirm` | NO | T2 | 300 | **60** |
| 12 | `orders-dbs.deliverOrderLegacy` | `orders-dbs.deliver` | NO | T2 | 300 | **60** |
| 13 | `orders-dbs.receiveOrderLegacy` | `orders-dbs.receive` | NO | T2 | 300 | **60** |
| 14 | `orders-dbs.rejectOrderLegacy` | `orders-dbs.reject` | NO | T2 | 300 | **60** |
| 15 | `orders-dbs.cancelOrderLegacy` | `orders-dbs.cancel` | NO | T2 | 300 | **60** |
| **Metadata (Story 12.3)** | | | | | | |
| 16 | `orders-dbs.getOrderMeta` | `orders-dbs.getMeta` | NO | T3 | 300 | **150** |
| 17 | `orders-dbs.addOrderMeta` | _(no matching method)_ | N/A | -- | 300 | **REMOVE** |
| 18 | `orders-dbs.updateOrderMeta` | _(no matching method)_ | N/A | -- | 300 | **REMOVE** |
| 19 | `orders-dbs.deleteOrderMeta` | `orders-dbs.deleteMeta` | NO | T3 | 300 | **150** |
| 20 | `orders-dbs.setSGTIN` | `orders-dbs.setMeta` | NO | T4 | 300 | **500** |
| 21 | `orders-dbs.setUIN` | `orders-dbs.setMeta` | NO | T4 | 300 | **500** |
| 22 | `orders-dbs.setIMEI` | `orders-dbs.setMeta` | NO | T4 | 300 | **500** |
| **B2B (Story 12.4)** | | | | | | |
| 23 | `orders-dbs.getB2BInfo` | `orders-dbs.getB2BInfo` | YES | T1 | 300 | 300 |

### Summary of Issues

| Issue Type | Count | Details |
|-----------|-------|---------|
| Key matches correctly | 4 | Entries 1, 2, 3, 23 |
| Key mismatch (config != module) | 17 | Entries 4-16, 19-22 |
| Orphan entries (config key has no matching method) | 2 | Entries 17, 18 (`addOrderMeta`, `updateOrderMeta`) |
| Wrong RPM value | 15 | T2 entries at 300 instead of 60, T3 entries at 300 instead of 150 |
| Shared key in module | 3 | `setSgtin`, `setUin`, `setImei`, `setGtin`, `setCustomsDeclaration` all use `orders-dbs.setMeta` |

### Additional Notes on Shared Keys

The module code uses a single shared key `orders-dbs.setMeta` for all 5 metadata set methods (`setSgtin`, `setUin`, `setImei`, `setGtin`, `setCustomsDeclaration`). The config has 3 separate entries (`setSGTIN`, `setUIN`, `setIMEI`) that do not match the shared key. There are two possible corrections:

**Option A (Shared Key)**: Keep the single `orders-dbs.setMeta` key in the module, add one config entry for it at T4 (500/min). Remove the 3 individual entries. This matches the current module design.

**Option B (Individual Keys)**: Change the module to use individual keys (`orders-dbs.setSgtin`, `orders-dbs.setUin`, etc.) and update config entries to match. This provides finer-grained rate limit control.

Recommendation: **Option A** -- the shared key approach is simpler and matches the swagger description that groups all metadata set methods under one rate limit.

---

## Story Breakdown

### Story 27.1: Rate Limit Key and Value Correction (CRITICAL)

**Priority**: CRITICAL - Rate limiting is effectively disabled for most DBS methods
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Fix all 23 rate limit key mismatches and correct the rate limit values to match the 4-tier system from swagger.

**Acceptance Criteria**:
1. All config keys match the `rateLimitKey` values used in `src/modules/orders-dbs/index.ts`
2. Orphan entries (`addOrderMeta`, `updateOrderMeta`) removed from config
3. T1 entries (core read, B2B) verified at 300 req/min, 200ms, burst 20
4. T2 entries (status write) corrected to 60 req/min (~1/sec), 1s interval, burst 10
5. T3 entries (meta read/delete) corrected to 150 req/min, 400ms interval, burst 20
6. T4 entry (meta set) added at 500 req/min, 120ms interval, burst 20 with shared key
7. JSDoc header documents all 4 tiers with their values
8. Inline comments on each entry indicate which tier it belongs to
9. Unit tests verify that every `rateLimitKey` in the module has a matching config entry
10. No regressions -- existing tests pass after changes

**Corrected Configuration (Target State)**:

```typescript
export const ordersDbsRateLimits: Record<string, RateLimitConfig> = {
  // === T1: Assembly Read (300/min, 200ms, burst 20) ===
  'orders-dbs.getNewOrders':    { requestsPerMinute: 300, intervalSeconds: 0.2,  burstLimit: 20 },
  'orders-dbs.getOrders':       { requestsPerMinute: 300, intervalSeconds: 0.2,  burstLimit: 20 },
  'orders-dbs.getClientInfo':   { requestsPerMinute: 300, intervalSeconds: 0.2,  burstLimit: 20 },
  'orders-dbs.getStatusesBulk': { requestsPerMinute: 300, intervalSeconds: 0.2,  burstLimit: 20 },
  'orders-dbs.getStatuses':     { requestsPerMinute: 300, intervalSeconds: 0.2,  burstLimit: 20 },
  'orders-dbs.getB2BInfo':      { requestsPerMinute: 300, intervalSeconds: 0.2,  burstLimit: 20 },

  // === T2: Status Write (~60/min, 1s interval, burst 10) ===
  'orders-dbs.confirmBulk':     { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.deliverBulk':     { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.receiveBulk':     { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.rejectBulk':      { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.cancelBulk':      { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.confirm':         { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.deliver':         { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.receive':         { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.reject':          { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },
  'orders-dbs.cancel':          { requestsPerMinute: 60,  intervalSeconds: 1.0,  burstLimit: 10 },

  // === T3: Meta Read/Delete (150/min, 400ms, burst 20) ===
  'orders-dbs.getMeta':         { requestsPerMinute: 150, intervalSeconds: 0.4,  burstLimit: 20 },
  'orders-dbs.deleteMeta':      { requestsPerMinute: 150, intervalSeconds: 0.4,  burstLimit: 20 },

  // === T4: Meta Set (500/min, 120ms, burst 20) — shared key ===
  'orders-dbs.setMeta':         { requestsPerMinute: 500, intervalSeconds: 0.12, burstLimit: 20 },
};
```

**Total entries**: 19 (was 23: -2 orphans, -3 individual meta set keys replaced by 1 shared key, +0 new, keys renamed to match module)

**Files Modified**:
- `src/config/orders-dbs-rate-limits.ts` -- Rewrite with correct keys, values, and tier documentation

---

## Files Modified Summary

### Modified Files
| File | Changes |
|------|---------|
| `src/config/orders-dbs-rate-limits.ts` | Fix 17 key mismatches, remove 2 orphan entries, correct RPM values for T2/T3/T4, add tier documentation |

### No Module Changes Required
The module file (`src/modules/orders-dbs/index.ts`) does NOT need changes -- the config keys must be updated to match the module's `rateLimitKey` values, not the other way around. The module keys are well-named and consistent.

---

## Rate Limit Configuration (Post-Update)

### Tier T1: Assembly Read (300 req/min, 200ms interval, burst 20)

**6 entries**:
```
getNewOrders, getOrders, getClientInfo, getStatusesBulk, getStatuses, getB2BInfo
```

### Tier T2: Status Write (60 req/min, 1s interval, burst 10)

**10 entries**:
```
confirmBulk, deliverBulk, receiveBulk, rejectBulk, cancelBulk,
confirm, deliver, receive, reject, cancel
```

### Tier T3: Meta Read/Delete (150 req/min, 400ms interval, burst 20)

**2 entries**:
```
getMeta, deleteMeta
```

### Tier T4: Meta Set (500 req/min, 120ms interval, burst 20)

**1 entry (shared key)**:
```
setMeta (covers setSgtin, setUin, setImei, setGtin, setCustomsDeclaration)
```

**Total Entries**: 19 (down from 23)

---

## Breaking Changes Summary

### What Breaks
- None externally -- rate limit configuration is internal to the SDK

### Behavior Changes
- **T2 methods** (status write) will now throttle at 1 req/sec instead of 5 req/sec. Sellers who were making rapid successive status changes may notice slower throughput. This is correct behavior -- the old config allowed exceeding the API limit, which would result in 429 errors.
- **T3 methods** (meta read/delete) will throttle at 150/min instead of 300/min. Same reasoning.
- **T4 methods** (meta set) will throttle at 500/min instead of 300/min. This actually **increases** allowed throughput for metadata set operations.

### What Does NOT Break
- All method signatures remain unchanged
- All public types remain unchanged
- External API contract is unaffected

---

## Risk Assessment

### Low Risk
- Config file changes are internal and do not affect the public API
- Key renames are straightforward string replacements
- Removing orphan entries has no impact (no method references them)

### Medium Risk
- T2 correction from 300/min to 60/min is a 5x reduction in allowed rate. Sellers making rapid status changes will be throttled more aggressively. This prevents 429 errors that they were likely already experiencing.

### Mitigation
- The corrections prevent 429 errors that users were experiencing with the old (too permissive) config
- Clear JSDoc documentation explains the 4-tier system
- Unit test validates that every module `rateLimitKey` has a matching config entry, preventing future drift

---

## Backlog References

- **task-25**: Implementation task for Epic 27
- **task-24**: Implementation task for Epic 26 (depends on this epic)

---

## Notes

- The 2 orphan entries (`addOrderMeta`, `updateOrderMeta`) were likely generated from a preliminary swagger parse and do not correspond to any implemented SDK method
- The shared `orders-dbs.setMeta` key in the module code was an intentional design decision in Epic 12 Story 12.3 -- all PUT metadata methods share one rate limit bucket per the swagger description
- Consider adding a runtime warning when the rate limiter cannot find a config entry for a `rateLimitKey`, to catch future key drift early
- This epic follows the same pattern as Epic 24 (FBS Rate Limit Audit) and can reference it for implementation patterns
