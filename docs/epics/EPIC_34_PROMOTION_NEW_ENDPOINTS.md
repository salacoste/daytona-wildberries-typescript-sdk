# EPIC 34: Promotion New Endpoints — Search Clusters + v2 Replacements

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 34 |
| **Module** | promotion (`08-promotion.yaml`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-34 |
| **Depends On** | EPIC 33 (task-33) — Type expansion must be completed first |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 4.5 (Promotion & Tariffs Modules) |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Module implementation | `src/modules/promotion/index.ts` | 808 lines, 42 methods (`PromotionModule` class) |
| Types | `src/types/promotion.types.ts` | 44 TypeScript interfaces (being expanded to 62 in EPIC 33) |
| Rate limit config | `src/config/promotion-rate-limits.ts` | 42 rate limit entries |
| Unit tests | `tests/unit/modules/promotion.test.ts` | 643 lines, 111 test cases |
| Integration tests | `tests/integration/promotion.integration.test.ts` | 490 lines, 78 test cases |

### What Is Missing

- **9 new endpoints** found in the February 2026 swagger audit:
  - **6 Search Cluster (Normquery) endpoints** — Entirely new tag "Поисковые кластеры" for managing search cluster advertising bids and minus-phrases
  - **3 Replacement endpoints** — New `/api/advert/` URL prefix endpoints that replace deprecated v0/v1 counterparts

### Why This Matters

The Search Clusters feature is a significant new advertising capability on Wildberries. Without SDK support:
- Sellers cannot manage search cluster bids programmatically
- Minus-phrase management for search clusters is unavailable
- Cluster statistics cannot be accessed via the SDK
- The 3 replacement endpoints provide improved versions of deprecated methods

---

## New Endpoints Detail

### Search Clusters (Поисковые кластеры) — 6 Endpoints

All endpoints use base URL `https://advert-api.wildberries.ru`:

| # | HTTP Method | Endpoint | SDK Method Name | Purpose |
|---|------------|----------|-----------------|---------|
| 1 | POST | `/adv/v0/normquery/stats` | `getNormqueryStats()` | Get statistics for search clusters by campaign (tagged under "Статистика" in swagger) |
| 2 | POST | `/adv/v0/normquery/get-bids` | `getNormqueryBids()` | Get current bid amounts for search clusters |
| 3 | POST | `/adv/v0/normquery/bids` | `setNormqueryBids()` | Set/update bids for search clusters |
| 4 | DELETE | `/adv/v0/normquery/bids` | `deleteNormqueryBids()` | Remove bids from search clusters |
| 5 | POST | `/adv/v0/normquery/get-minus` | `getNormqueryMinus()` | Get minus-phrases for search clusters |
| 6 | POST | `/adv/v0/normquery/set-minus` | `setNormqueryMinus()` | Set minus-phrases for search clusters |

### Replacement Endpoints — 3 Endpoints

These replace deprecated v0/v1 endpoints under a new `/api/advert/` URL prefix:

| # | HTTP Method | Endpoint | SDK Method Name | Replaces |
|---|------------|----------|-----------------|----------|
| 7 | GET | `/api/advert/v2/adverts` | `getAdvertsV2()` | `POST /adv/v1/promotion/adverts` (deprecated) |
| 8 | POST | `/api/advert/v1/bids/min` | `getBidsMinV2()` | `POST /adv/v0/bids/min` (deprecated) |
| 9 | PATCH | `/api/advert/v1/bids` | `updateBidsV2()` | `PATCH /adv/v0/bids` (deprecated) |

---

## Implementation Approach

### Step 1: Verify Types Available (Depends on EPIC 33)
Ensure all normquery and v2 replacement TypeScript types are generated and available in `src/types/promotion.types.ts`.

### Step 2: Implement 6 Normquery Methods
Add 6 methods to `PromotionModule` class following the existing SDK pattern:
- Each method calls BaseClient with correct HTTP method and URL
- Each method passes `rateLimitKey` to BaseClient
- Each method has full JSDoc with `@example` using `sdk.promotion.*`
- Request/response types from generated schemas

### Step 3: Implement 3 Replacement Methods
Add 3 v2 replacement methods:
- These use the new `/api/advert/` URL prefix (not the old `/adv/` prefix)
- Include JSDoc noting which deprecated method they replace
- Wire rateLimitKey for each

### Step 4: Add Rate Limit Entries
Add 9 new entries to `src/config/promotion-rate-limits.ts` for the new endpoints.

### Step 5: Unit Tests
Create unit tests for all 9 new methods covering:
- Correct URL called
- Correct HTTP method used
- Request body/params passed correctly
- Rate limit key wired
- Response type handling

### Step 6: Validate
Run `npx tsc --noEmit`, `npm run lint`, and `npm test` to ensure zero errors.

---

## Rate Limit Configuration for New Endpoints

| SDK Method | Proposed Config Key | Expected Tier |
|------------|-------------------|---------------|
| `getNormqueryStats()` | `promotion.normqueryStats` | Tier 2 |
| `getNormqueryBids()` | `promotion.normqueryGetBids` | Tier 2 |
| `setNormqueryBids()` | `promotion.normquerySetBids` | Tier 2 |
| `deleteNormqueryBids()` | `promotion.normqueryDeleteBids` | Tier 2 |
| `getNormqueryMinus()` | `promotion.normqueryGetMinus` | Tier 2 |
| `setNormqueryMinus()` | `promotion.normquerySetMinus` | Tier 2 |
| `getAdvertsV2()` | `promotion.advertsV2` | Tier 2 |
| `getBidsMinV2()` | `promotion.bidsMinV2` | Tier 2 |
| `updateBidsV2()` | `promotion.bidsV2` | Tier 2 |

Note: Exact rate limits to be extracted from swagger `description` fields during implementation.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/modules/promotion/index.ts` | Add 9 new methods (~200 lines) | Medium |
| `src/config/promotion-rate-limits.ts` | Add 9 new rate limit entries | Low |
| `tests/unit/modules/promotion.test.ts` | Add tests for 9 new methods | Medium |

---

## Success Criteria

- [ ] 6 normquery methods implemented: getNormqueryStats, getNormqueryBids, setNormqueryBids, deleteNormqueryBids, getNormqueryMinus, setNormqueryMinus
- [ ] 3 replacement methods implemented: getAdvertsV2, getBidsMinV2, updateBidsV2
- [ ] All 9 methods have correct URLs, HTTP methods, request/response types
- [ ] All 9 methods have JSDoc with `@example` referencing `sdk.promotion.*`
- [ ] All 9 methods pass `rateLimitKey` to BaseClient
- [ ] TypeScript types generated for all 9 endpoint request/response schemas
- [ ] Rate limit config entries added for all 9 new endpoints
- [ ] TypeScript strict mode passes (`npx tsc --noEmit` exits 0)
- [ ] Unit tests created for all 9 new methods
- [ ] No regressions in existing tests

---

## Dependencies

### Hard Dependencies

- **EPIC 33 (task-33)**: Must be completed first. New methods require TypeScript types for normquery and v2 replacement schemas.

### Soft Dependencies

- **EPIC 35 (task-35)**: Code quality fixes (JSDoc, deprecated marking, rate limit wiring for existing methods). Can be done in parallel but completing it first ensures consistent patterns.

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/08-promotion.yaml` |
| Search clusters shard | `wildberries_api_doc/08-promotion/poiskovye-klastery.yaml` (5 endpoints) |
| Module source | `src/modules/promotion/index.ts` (808 lines) |
| Rate limit config | `src/config/promotion-rate-limits.ts` (42 entries) |
| Types | `src/types/promotion.types.ts` |
| Unit tests | `tests/unit/modules/promotion.test.ts` (643 lines) |
| Story 4.5 | `docs/stories/4.5.promotion-tariffs-modules.md` |
| QA Gate 4.5 | `docs/qa/gates/4.5-promotion-tariffs-modules.yml` |
| EPIC 33 (prerequisite) | `docs/epics/EPIC_33_PROMOTION_TYPE_EXPANSION.md` |
| EPIC 35 (related) | `docs/epics/EPIC_35_PROMOTION_CODE_QUALITY.md` |
| Backlog task | `backlog/tasks/task-34` |
