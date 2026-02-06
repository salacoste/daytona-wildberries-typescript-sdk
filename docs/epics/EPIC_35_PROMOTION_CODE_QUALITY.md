# EPIC 35: Promotion Code Quality — Deprecated Marking, JSDoc Fix, Rate Limit Wiring

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 35 |
| **Module** | promotion (`08-promotion.yaml`) |
| **Priority** | Medium |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-35 |
| **Depends On** | None |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 4.5 (Promotion & Tariffs Modules) |

---

## Problem Statement

The February 2026 swagger audit of module `08-promotion` identified significant code quality gaps despite the module passing QA gates at 95/100. The SDK has 42 methods covering 42 of the 50 swagger endpoints (the other 8 being new — covered by EPIC 34), but the existing code has defects affecting developer experience, runtime correctness, and API compliance:

1. **16 Deprecated Endpoints Not Marked**: 16 endpoints are deprecated in swagger (32% deprecation rate!) but the SDK has zero `@deprecated` JSDoc tags and zero runtime warnings.

2. **1 Removed Endpoint**: `POST /adv/v1/save-ad` has been completely removed from the swagger, but the SDK still has `createAdvSaveAd()` calling this non-existent endpoint.

3. **JSDoc @example Bug**: All 42 `@example` blocks reference `sdk.general.*` instead of `sdk.promotion.*`. Copy-paste from JSDoc fails at runtime.

4. **Rate Limit Keys Not Wired**: 42 rate limit configuration entries exist in `src/config/promotion-rate-limits.ts` but zero methods pass `rateLimitKey` to BaseClient. Rate limits are defined but never enforced.

---

## Detailed Gap Analysis

### Gap 1: Deprecated Endpoints (16 methods)

The following 16 endpoints are deprecated in the swagger but have no `@deprecated` tag in the SDK:

| # | Deprecated Endpoint | SDK Method | Swagger Shard | Replacement |
|---|-------------------|------------|---------------|-------------|
| 1 | `POST /adv/v1/promotion/adverts` | `getAdvPromotionAdverts()` | kampanii.yaml | `GET /api/advert/v2/adverts` |
| 2 | `GET /adv/v1/promotion/count` | `getAdvPromotionCount()` | kampanii.yaml | None specified |
| 3 | `POST /adv/v1/save-ad` | `createAdvSaveAd()` | sozdanie-kampaniy.yaml | **REMOVED from swagger** |
| 4 | `POST /adv/v2/seacat/save-ad` | `createAdvSeacatSaveAd()` | sozdanie-kampaniy.yaml | None specified |
| 5 | `GET /adv/v0/start` | `getAdvStart()` | upravlenie-kampaniyami.yaml | None specified |
| 6 | `GET /adv/v0/pause` | `getAdvPause()` | upravlenie-kampaniyami.yaml | None specified |
| 7 | `GET /adv/v0/config` | `getAdvConfig()` | parametry-kampaniy.yaml | None specified |
| 8 | `GET /adv/v0/auction/adverts` | `getAdvAuctionAdverts()` | parametry-kampaniy.yaml | None specified |
| 9 | `POST /adv/v0/bids/min` | `createAdvBidsMin()` | parametry-kampaniy.yaml | `POST /api/advert/v1/bids/min` |
| 10 | `PATCH /adv/v0/bids` | `updateAdvBids()` | parametry-kampaniy.yaml | `PATCH /api/advert/v1/bids` |
| 11 | `POST /adv/v2/supplier/nms` | `createAdvSupplierNms()` | parametry-kampaniy.yaml | None specified |
| 12 | `GET /adv/v1/supplier/subjects` | `getAdvSupplierSubjects()` | parametry-kampaniy.yaml | None specified |
| 13 | `POST /adv/v1/fullstats` | `createAdvFullstats()` | statistika.yaml | None specified |
| 14 | `GET /adv/v1/stat/words` | `getAdvStatWords()` | statistika.yaml | None specified |
| 15 | `POST /adv/v2/auto/daily-words` | `createAdvAutoDailyWords()` | statistika.yaml | None specified |
| 16 | `GET /adv/v0/advert-list` | `getAdvAdvertList()` | statistika.yaml | None specified |

**Required changes per method**:
1. Add `@deprecated` JSDoc tag with migration guidance (where replacement exists)
2. Add `console.warn()` on first invocation using a static flag per method (warn-once pattern)
3. Method must continue to function — deprecation is informational

### Gap 2: Removed Endpoint (1 method)

`POST /adv/v1/save-ad` → `createAdvSaveAd()` — This endpoint has been completely removed from the swagger. The SDK method will fail with a 404 at runtime.

**Required changes**:
- Mark with `@deprecated` and strong warning that endpoint is removed
- Add `console.warn` noting the endpoint no longer exists
- Consider adding a runtime check or alias to a replacement if one exists

### Gap 3: JSDoc @example Bug (20 methods)

All 42 methods have `@example` blocks referencing `sdk.general.*` instead of `sdk.promotion.*`. This is the same code generation template bug found in other modules (in-store-pickup: 16, orders-fbw: 8).

**Fix**: Replace all 42 occurrences of `sdk.general.` with `sdk.promotion.` in `@example` blocks.

### Gap 4: Rate Limit Keys Not Wired (42 methods)

The file `src/config/promotion-rate-limits.ts` defines 42 rate limit entries across 3 tiers:
- **Tier 1**: 300-600 req/min (7 entries)
- **Tier 2**: 1-240 req/min (25 entries)
- **Tier 3**: 1-5 req/min (10 entries)

None of the 42 module methods pass `rateLimitKey` to BaseClient. This means rate limits are defined but never enforced at runtime, putting users at risk of 429 errors and potential API blocks.

**Fix**: Add `rateLimitKey` option to all 42 BaseClient calls using the config keys from `promotion-rate-limits.ts`.

---

## Implementation Approach

### Step 1: Fix JSDoc @example Blocks
Replace all 42 occurrences of `sdk.general.` with `sdk.promotion.` in `src/modules/promotion/index.ts`.

### Step 2: Mark 16 Deprecated Methods
Add `@deprecated` JSDoc tag and `console.warn()` (warn-once pattern) to all 16 deprecated methods. Group related static flags to avoid excessive class-level properties.

### Step 3: Handle Removed Endpoint
Mark `createAdvSaveAd()` with `@deprecated` and a strong removal warning. Add runtime `console.warn` noting the endpoint no longer exists in the API.

### Step 4: Wire Rate Limit Keys
Add `rateLimitKey` option to all 42 BaseClient calls. Also add 9 new entries for EPIC 34 endpoints (total ~51).

### Step 5: Update Unit Tests
Update `tests/unit/modules/promotion.test.ts` to:
- Verify rateLimitKey presence in all 42 method calls
- Add deprecation warning tests for the 16 deprecated methods
- Add removal warning test for createAdvSaveAd

### Step 6: Verify Build and Lint
Run `npx tsc --noEmit` and `npm run lint` to ensure zero errors.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/modules/promotion/index.ts` | Fix 42 @example blocks, add 16 @deprecated tags + console.warn, handle 1 removed endpoint, add rateLimitKey to 42 methods | High |
| `src/config/promotion-rate-limits.ts` | Add 9 new entries for EPIC 34 endpoints | Low |
| `tests/unit/modules/promotion.test.ts` | Add rateLimitKey assertions, deprecation warning tests | Medium |

---

## Risk Assessment

**Overall Risk**: MEDIUM (higher than FBW due to 16 deprecated methods and 42 rate limit wirings)

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Deprecated warnings break CI | Low | Medium | Use warn-once pattern; mock console.warn in tests |
| Rate limit wiring changes behavior | Low | Medium | Rate limits are correct per swagger; prevents 429 errors |
| Removed endpoint handling | Medium | Low | Clear deprecation message; method still callable but will fail |
| 20 JSDoc fixes break something | Very Low | Low | Text-only changes in comments |
| Many changes to one file | Medium | Medium | Careful testing; all changes are additive or comment-only |

---

## Success Criteria

- [x] All 16 deprecated methods marked with `@deprecated` JSDoc tag and `console.warn` on first call
- [x] `createAdvSaveAd()` marked as `@deprecated` (endpoint removed from swagger)
- [x] All 42 JSDoc `@example` blocks reference `sdk.promotion.*` (not `sdk.general.*`)
- [x] All 42 methods pass correct `rateLimitKey` from promotion-rate-limits config to BaseClient
- [ ] Rate limit config updated with 9 new entries for EPIC 34 endpoints (total ~51)
- [x] `npx tsc --noEmit` exits 0
- [x] `npm run lint` exits 0
- [x] All existing unit tests pass with zero regressions
- [x] New unit tests for rateLimitKey and deprecation pass

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/08-promotion.yaml` |
| Swagger shards | `wildberries_api_doc/08-promotion/` (9 shards) |
| Module source | `src/modules/promotion/index.ts` (808 lines) |
| Rate limit config | `src/config/promotion-rate-limits.ts` (42 entries) |
| Types | `src/types/promotion.types.ts` |
| Unit tests | `tests/unit/modules/promotion.test.ts` (643 lines) |
| Integration tests | `tests/integration/promotion.integration.test.ts` (490 lines) |
| Story 4.5 | `docs/stories/4.5.promotion-tariffs-modules.md` |
| QA Gate 4.5 | `docs/qa/gates/4.5-promotion-tariffs-modules.yml` |
| EPIC 33 (types) | `docs/epics/EPIC_33_PROMOTION_TYPE_EXPANSION.md` |
| EPIC 34 (new endpoints) | `docs/epics/EPIC_34_PROMOTION_NEW_ENDPOINTS.md` |
| Backlog task (code quality) | `backlog/tasks/task-35` |

---

## Completion Status

**Status**: COMPLETE (as of 2026-02-06)

### Implementation Summary
- Marked all 16 deprecated methods with @deprecated JSDoc tag and console.warn (warn-once pattern)
- Marked createAdvSaveAd() as deprecated (endpoint removed from swagger)
- Fixed all 42 JSDoc @example blocks to reference sdk.promotion.* instead of sdk.general.*
- Wired rateLimitKey to all 42 existing methods for proper rate limit enforcement
- TypeScript strict mode passes
- Linting passes
- All existing unit tests pass with zero regressions
- New unit tests added for rateLimitKey verification and deprecation warnings

### Remaining Items
- Rate limit config entries for EPIC 34's 9 new endpoints (AC #5) - to be completed as part of EPIC 34 implementation
