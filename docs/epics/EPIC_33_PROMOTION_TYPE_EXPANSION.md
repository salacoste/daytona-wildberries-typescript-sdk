# EPIC 33: Promotion Type Expansion — Cover All 62 Swagger Schemas

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 33 |
| **Module** | promotion (`08-promotion.yaml`) |
| **Priority** | Medium |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-33 |
| **Depends On** | None |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 4.5 (Promotion & Tariffs Modules) |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Types file | `src/types/promotion.types.ts` | 44 TypeScript interfaces/types |
| Module implementation | `src/modules/promotion/index.ts` | 808 lines, 42 methods (`PromotionModule` class) |
| Rate limit config | `src/config/promotion-rate-limits.ts` | 42 rate limit entries |
| Unit tests | `tests/unit/modules/promotion.test.ts` | 643 lines, 111 test cases |
| Integration tests | `tests/integration/promotion.integration.test.ts` | 490 lines, 78 test cases |

### What Is Missing

- **18 TypeScript interfaces/types**: Remote swagger defines 62 schemas, but only 44 are covered in `src/types/promotion.types.ts`
- Missing types include normquery (Search Clusters) request/response schemas:
  - `V0GetNormQueryStatsRequest` / `V0GetNormQueryStatsResponse`
  - `V0SetNormQueryBidsRequest`
  - `V0GetNormQueryBidsRequest` / `V0GetNormQueryBidsResponse`
  - `V0GetNormQueryMinusRequest` / `V0GetNormQueryMinusResponse`
  - `V0SetMinusNormQueryRequest`
- Missing types for new v2 replacement endpoints
- Additional campaign types that may have evolved since initial implementation

### Why This Matters

TypeScript types are the foundation for type-safe SDK development. Without complete type coverage:
- New endpoint implementations (EPIC 34) cannot be properly typed
- IDE autocompletion is incomplete for consumers
- Runtime type mismatches go undetected
- Generated documentation is incomplete

---

## Gap Analysis

### Schema Coverage Comparison

| Category | Local Types | Swagger Schemas | Gap |
|----------|------------|-----------------|-----|
| Campaign schemas | ~25 | ~30 | ~5 missing |
| Statistics schemas | ~8 | ~10 | ~2 missing |
| Normquery schemas | 0 | 8 | 8 missing (all new) |
| Financial schemas | ~5 | ~7 | ~2 missing |
| Calendar schemas | ~3 | ~4 | ~1 missing |
| Media schemas | 0 | ~3 | ~3 missing |
| **Total** | **41** | **62** | **~21 missing** |

### New Normquery Types (Search Clusters)

These are entirely new schemas for the "Поисковые кластеры" (Search Clusters) feature:

| Schema Name | Purpose | Used By |
|-------------|---------|---------|
| `V0GetNormQueryStatsRequest` | Request for normquery statistics | `GET /adv/v0/normquery/stats` |
| `V0GetNormQueryStatsResponse` | Statistics response with cluster data | `GET /adv/v0/normquery/stats` |
| `V0GetNormQueryBidsRequest` | Request for cluster bid information | `POST /adv/v0/normquery/get-bids` |
| `V0GetNormQueryBidsResponse` | Bid data per cluster | `POST /adv/v0/normquery/get-bids` |
| `V0SetNormQueryBidsRequest` | Set bids for search clusters | `POST /adv/v0/normquery/bids` |
| `V0GetNormQueryMinusRequest` | Request minus-phrase data | `POST /adv/v0/normquery/get-minus` |
| `V0GetNormQueryMinusResponse` | Minus-phrase data per cluster | `POST /adv/v0/normquery/get-minus` |
| `V0SetMinusNormQueryRequest` | Set minus-phrases for clusters | `POST /adv/v0/normquery/set-minus` |

---

## Implementation Approach

### Step 1: Audit Existing Types
Compare each of the 41 existing types against the current swagger definitions. Identify any property additions, removals, or type changes.

### Step 2: Generate Normquery Types
Generate all 8 normquery TypeScript interfaces from the swagger schemas. These are entirely new and have no existing counterparts.

### Step 3: Generate Missing Campaign/Financial/Media Types
Generate the remaining ~13 missing types for campaigns, statistics, financial, calendar, and media schemas.

### Step 4: Verify Type Compatibility
Ensure new types don't conflict with existing ones. Check for naming collisions and import consistency.

### Step 5: Update Imports
Update `src/modules/promotion/index.ts` to import any newly generated types that existing methods need.

### Step 6: Validate
Run `npx tsc --noEmit` and `npm run lint` to ensure zero errors.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/types/promotion.types.ts` | Add ~18 new interfaces, verify 44 existing | Medium |
| `src/modules/promotion/index.ts` | Update imports for any changed type names | Low |

---

## Success Criteria

- [ ] All 62 swagger schemas have corresponding TypeScript interfaces
- [ ] New normquery request/response types generated (8 types)
- [ ] Existing types verified against current swagger definitions
- [ ] No duplicate or conflicting type names
- [ ] TypeScript strict mode passes (`npx tsc --noEmit` exits 0)
- [ ] All imports in promotion module updated
- [ ] No regressions in existing tests

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/08-promotion.yaml` |
| Swagger shards | `wildberries_api_doc/08-promotion/` (9 shards + _schemas.yaml) |
| Module source | `src/modules/promotion/index.ts` (808 lines) |
| Types file | `src/types/promotion.types.ts` (41 types) |
| Unit tests | `tests/unit/modules/promotion.test.ts` (643 lines) |
| Integration tests | `tests/integration/promotion.integration.test.ts` (490 lines) |
| Story 4.5 | `docs/stories/4.5.promotion-tariffs-modules.md` |
| QA Gate 4.5 | `docs/qa/gates/4.5-promotion-tariffs-modules.yml` |
| EPIC 34 (depends on this) | `docs/epics/EPIC_34_PROMOTION_NEW_ENDPOINTS.md` |
| Backlog task | `backlog/tasks/task-33` |
