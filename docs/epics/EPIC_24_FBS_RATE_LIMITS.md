# Epic 24: Orders FBS Rate Limit Audit and Update

**Epic Goal**: Audit and correct the rate limit configuration for all Orders FBS endpoints. Add missing entries for new bulk endpoints (from Epic 22), remove the deprecated endpoint entry, and verify all 4 rate limit tiers are correctly mapped.

**Target Completion**: Epic 24.x (Stories 24.1-24.3)
**SDK Version**: 2.8.0
**Status**: TO DO

**Business Value**:
- Prevents 429 rate limit errors and the 5x penalty multiplier for 409 responses
- Ensures new bulk endpoints from Epic 22 have correct rate limits from day one
- Removes stale configuration for the deprecated external stickers endpoint
- Documents the complete rate limit tier system for FBS module maintainers

---

## Epic 24 Overview

### Strategic Context

The Orders FBS module has 4 distinct rate limit tiers applied across 35+ endpoints. The current `orders-fbs-rate-limits.ts` file has 31 entries. After Epic 22 (URL fixes), new bulk endpoints need rate limit entries, one deprecated entry needs removal, and the `createPass` endpoint has a unique tier that needs verification. This epic ensures every FBS endpoint has a correctly configured rate limit entry.

### Technical Context

**Configuration File**: `src/config/orders-fbs-rate-limits.ts`
**Rate Limiter**: `src/client/rate-limiter.ts` (token bucket algorithm from Story 1.4)
**Swagger Source**: `wildberries_api_doc/03-orders-fbs/` shards

### Rate Limit Tiers

The Wildberries FBS API uses 4 distinct rate limit tiers. All tiers include a **409 penalty**: one request returning HTTP 409 counts as 5 requests against the limit.

| Tier | Name | Period | Limit | Interval | Burst | 409 Penalty | Endpoint Count | Applied To |
|------|------|--------|-------|----------|-------|-------------|----------------|------------|
| **T1** | General FBS | 1 minute | 300 requests | 200ms | 20 requests | 1 req = 5 reqs | 28 endpoints | Orders, supplies, passes, barcode, trbx, crossborder, status history |
| **T2** | Cancel Order | 1 minute | 100 requests | 600ms | 20 requests | 1 req = 5 reqs | 1 endpoint | `updateOrdersCancel` only |
| **T3** | Meta Attachment | 1 minute | 1000 requests | 60ms | 20 requests | 1 req = 5 reqs | 6 endpoints | `updateMetaSgtin`, `updateMetaUin`, `updateMetaImei`, `updateMetaGtin`, `updateMetaExpiration`, `setCustomsDeclaration` |
| **T4** | Create Pass | 10 minutes | 1 request | N/A | 1 request | N/A | 1 endpoint | `createPass` only |

**Note on Tier grouping from Swagger descriptions**:
- T1 applies to "methods of assembly tasks, supplies, and passes FBS"
- T2 applies specifically to "cancellation of assembly task" with its own limit table
- T3 applies to "all methods for attaching metadata FBS"
- T4 is stated as "Maximum 1 request per 10 minutes" with no burst/interval table

### Dependencies

**Depends On:**
- Epic 22 Complete - New bulk methods require new rate limit entries

---

## Story Breakdown

### Story 24.1: Audit Current Configuration Against Swagger (HIGH)

**Priority**: HIGH - Foundation for correctness
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Systematically audit every entry in `orders-fbs-rate-limits.ts` against the Swagger descriptions to verify correctness.

**Current Configuration (31 entries)**:

| # | Rate Limit Key | RPM | Interval(s) | Burst | Tier | Status |
|---|---------------|-----|-------------|-------|------|--------|
| 1 | `orders-fbs.passesOffices` | 300 | 0.2 | 20 | T1 | OK |
| 2 | `orders-fbs.passes` | 300 | 0.2 | 20 | T1 | OK |
| 3 | `orders-fbs.postPasses` | 10 | 6 | 5 | **??** | **WRONG** -- should be T4 (1 req/10min) |
| 4 | `orders-fbs.putPasses` | 300 | 0.2 | 20 | T1 | OK |
| 5 | `orders-fbs.deletePasses` | 300 | 0.2 | 20 | T1 | OK |
| 6 | `orders-fbs.ordersNew` | 300 | 0.2 | 20 | T1 | OK |
| 7 | `orders-fbs.orders` | 300 | 0.2 | 20 | T1 | OK |
| 8 | `orders-fbs.postOrdersStatus` | 300 | 0.2 | 20 | T1 | OK |
| 9 | `orders-fbs.suppliesOrdersReshipment` | 300 | 0.2 | 20 | T1 | OK |
| 10 | `orders-fbs.patchOrdersCancel` | 100 | 0.6 | 20 | T2 | OK |
| 11 | `orders-fbs.postOrdersStickers` | 300 | 0.2 | 20 | T1 | OK |
| 12 | `orders-fbs.ordersMeta` | 300 | 0.2 | 20 | T1 | OK |
| 13 | `orders-fbs.deleteOrdersMeta` | 300 | 0.2 | 20 | T1 | OK |
| 14 | `orders-fbs.putOrdersMetaSgtin` | 1000 | 0.06 | 20 | T3 | OK |
| 15 | `orders-fbs.putOrdersMetaUin` | 1000 | 0.06 | 20 | T3 | OK |
| 16 | `orders-fbs.putOrdersMetaImei` | 1000 | 0.06 | 20 | T3 | OK |
| 17 | `orders-fbs.putOrdersMetaGtin` | 1000 | 0.06 | 20 | T3 | OK |
| 18 | `orders-fbs.putOrdersMetaExpiration` | 1000 | 0.06 | 20 | T3 | OK |
| 19 | `orders-fbs.putOrdersMetaCustomsDeclaration` | 1000 | 0.06 | 20 | T3 | OK |
| 20 | `orders-fbs.postOrdersStickersCrossBorder` | 300 | 0.2 | 20 | T1 | OK |
| 21 | `orders-fbs.postFilesOrdersExternalStickers` | 10 | 6 | 5 | **??** | **REMOVE** -- endpoint deprecated (Epic 22) |
| 22 | `orders-fbs.postOrdersStatusHistory` | 300 | 0.2 | 20 | T1 | OK |
| 23 | `orders-fbs.postOrdersClient` | 300 | 0.2 | 20 | T1 | OK |
| 24 | `orders-fbs.supplies` | 300 | 0.2 | 20 | T1 | OK |
| 25 | `orders-fbs.postSupplies` | 300 | 0.2 | 20 | T1 | OK |
| 26 | `orders-fbs.patchSuppliesOrders` | 1000 | 0.06 | 20 | T3 | **VERIFY** -- Swagger says T3 for "add order to supply" |
| 27 | `orders-fbs.deleteSupplies` | 300 | 0.2 | 20 | T1 | OK |
| 28 | `orders-fbs.suppliesOrders` | 300 | 0.2 | 20 | T1 | OK |
| 29 | `orders-fbs.patchSuppliesDeliver` | 300 | 0.2 | 20 | T1 | OK |
| 30 | `orders-fbs.suppliesBarcode` | 300 | 0.2 | 20 | T1 | OK |
| 31 | `orders-fbs.suppliesTrbx` | 300 | 0.2 | 20 | T1 | OK |
| -- | (missing) `orders-fbs.postSuppliesTrbx` | -- | -- | -- | -- | **PRESENT** in config (entry exists) |
| -- | (missing) `orders-fbs.deleteSuppliesTrbx` | -- | -- | -- | -- | **PRESENT** in config (entry exists) |
| -- | (missing) `orders-fbs.postSuppliesTrbxStickers` | -- | -- | -- | -- | **PRESENT** in config (entry exists) |

**Issues Found**:
1. `orders-fbs.postPasses` (createPass) -- configured as 10 RPM / 6s interval / burst 5, but Swagger says "Maximum 1 request per 10 minutes" -- should be `requestsPerMinute: 0.1, intervalSeconds: 600, burstLimit: 1`
2. `orders-fbs.postFilesOrdersExternalStickers` -- endpoint removed, entry should be deleted
3. `orders-fbs.patchSuppliesOrders` -- configured as T3 (1000/min) per the "add order to supply" description, needs verification against updated Swagger shard

**Acceptance Criteria**:
- [ ] Every entry in config verified against Swagger description
- [ ] `orders-fbs.postPasses` corrected to 1 req / 10 min (T4)
- [ ] Discrepancies documented with Swagger line references
- [ ] Verification checklist completed for all 31 entries

**Files Modified**:
- `src/config/orders-fbs-rate-limits.ts`

---

### Story 24.2: Add Rate Limits for New Bulk Endpoints (HIGH)

**Priority**: HIGH - New methods from Epic 22 need rate limits
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Add rate limit configuration entries for the 3 new bulk methods introduced in Epic 22.

**New Entries Required**:

| # | Rate Limit Key | Method | Endpoint | Tier | RPM | Interval(s) | Burst |
|---|---------------|--------|----------|------|-----|-------------|-------|
| 1 | `orders-fbs.postOrdersMetaBulk` | `getOrdersMetaBulk()` | `POST /api/marketplace/v3/orders/meta` | T1 | 300 | 0.2 | 20 |
| 2 | `orders-fbs.patchSuppliesOrdersBulk` | `addOrdersToSupply()` | `PATCH /api/marketplace/v3/supplies/{supplyId}/orders` | T3 | 1000 | 0.06 | 20 |
| 3 | `orders-fbs.suppliesOrderIds` | `getSupplyOrderIds()` | `GET /api/marketplace/v3/supplies/{supplyId}/order-ids` | T1 | 300 | 0.2 | 20 |

**Acceptance Criteria**:
- [ ] 3 new entries added to `ordersFbsRateLimits` config object
- [ ] Each entry references the correct tier based on Swagger description
- [ ] New methods in `index.ts` pass the correct `rateLimitKey` to `BaseClient`
- [ ] Rate limit keys follow the existing naming convention

**Files Modified**:
- `src/config/orders-fbs-rate-limits.ts`
- `src/modules/orders-fbs/index.ts` (add `rateLimitKey` options to new methods)

---

### Story 24.3: Remove Deprecated Entry and Add 409 Penalty Documentation (MEDIUM)

**Priority**: MEDIUM - Cleanup and documentation
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Remove the rate limit entry for the deprecated `createOrdersExternalSticker` endpoint. Add JSDoc documentation to the rate limits config explaining the 409 penalty multiplier and the tier system.

**Acceptance Criteria**:
- [ ] `orders-fbs.postFilesOrdersExternalStickers` entry removed from config
- [ ] JSDoc header on `ordersFbsRateLimits` documents all 4 tiers
- [ ] JSDoc explains the 409 penalty (1 request with 409 = 5 requests against limit)
- [ ] Inline comments on each entry indicate which tier it belongs to
- [ ] Total entry count after changes: 33 (31 - 1 removed + 3 added)

**Files Modified**:
- `src/config/orders-fbs-rate-limits.ts`

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `docs/epics/EPIC_24_FBS_RATE_LIMITS.md` | This EPIC summary |

### Modified Files
| File | Changes |
|------|---------|
| `src/config/orders-fbs-rate-limits.ts` | Fix T4 entry, add 3 bulk entries, remove 1 deprecated entry, add tier docs |
| `src/modules/orders-fbs/index.ts` | Add `rateLimitKey` options to 3 new bulk methods |

---

## Rate Limit Configuration (Post-Update)

### Tier T1: General FBS (300 req/min, 200ms interval, burst 20)

**28 endpoints**:
```
passesOffices, passes, putPasses, deletePasses, ordersNew, orders,
postOrdersStatus, suppliesOrdersReshipment, postOrdersStickers,
ordersMeta, deleteOrdersMeta, postOrdersStickersCrossBorder,
postOrdersStatusHistory, postOrdersClient, supplies, postSupplies,
deleteSupplies, suppliesOrders, patchSuppliesDeliver, suppliesBarcode,
suppliesTrbx, postSuppliesTrbx, deleteSuppliesTrbx,
postSuppliesTrbxStickers, getSupply,
postOrdersMetaBulk (NEW), suppliesOrderIds (NEW)
```

### Tier T2: Cancel Order (100 req/min, 600ms interval, burst 20)

**1 endpoint**:
```
patchOrdersCancel
```

### Tier T3: Meta Attachment + Supply Orders (1000 req/min, 60ms interval, burst 20)

**7 endpoints**:
```
putOrdersMetaSgtin, putOrdersMetaUin, putOrdersMetaImei,
putOrdersMetaGtin, putOrdersMetaExpiration, putOrdersMetaCustomsDeclaration,
patchSuppliesOrdersBulk (NEW)
```

### Tier T4: Create Pass (1 req/10 min)

**1 endpoint**:
```
postPasses (CORRECTED)
```

**Total Entries**: 33 (was 31: +3 new, -1 deprecated)

---

## Breaking Changes Summary

### What Breaks
- None -- rate limit configuration is internal to the SDK

### What Does NOT Break
- All method signatures remain unchanged
- Rate limiting behavior only becomes more accurate
- External API contract is unaffected

---

## Risk Assessment

### Low Risk
- Rate limit config changes are internal and do not affect the public API
- Adding entries for new endpoints is straightforward
- Removing the deprecated entry aligns with Epic 22

### Medium Risk
- Correcting `createPass` from 10 RPM to 0.1 RPM (1 per 10 min) will cause the SDK to throttle more aggressively. Users who were previously creating multiple passes in quick succession will now be throttled. This is correct behavior -- the old config allowed exceeding the API limit.

### Mitigation
- The `createPass` correction prevents 429 errors that users were likely already experiencing
- Clear JSDoc documentation explains the tier system for future maintainers
- Tier comments on each entry make the config self-documenting

---

## Notes

- The 409 penalty multiplier (1 req = 5 reqs) is unique to the FBS module and not present in all WB API modules
- The `patchSuppliesOrders` entry being T3 (1000/min) needs verification -- the Swagger description for "add order to supply" lists its own rate limit table with 1000/60ms/20 which matches T3
- Consider adding a runtime warning when the rate limiter applies the 409 penalty, to help developers debug throttling issues
- The `getSupply` method (single supply info) is missing from the current config -- it should be T1 (add as part of this audit)
