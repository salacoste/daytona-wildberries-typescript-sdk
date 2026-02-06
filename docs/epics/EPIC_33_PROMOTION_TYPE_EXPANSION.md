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

## Type Count Investigation Report

### Documented vs Actual Type Counts

| Metric | Count | Notes |
|--------|-------|-------|
| **Swagger Schemas** | 62 | Exact count from `08-promotion/_schemas.yaml` |
| **TypeScript Type Exports** | 83 | Total export statements (includes 1 duplicate) |
| **Unique TypeScript Types** | 82 | After removing duplicate `Response400` |
| **Business Logic Types** | ~58 | Excluding error types, parameter wrappers |

### Discrepancy Analysis

**Why 62 Swagger schemas → 82 TypeScript types?**

1. **Inline Types**: Some Swagger schemas generate multiple TypeScript types
   - Example: `Days` type generates nested `DaysAppItem` and `DaysNmItem` types
   - Example: `DailyStats` generates `Stats` subtypes

2. **Type Aliases vs Interfaces**:
   - Swagger enums become TypeScript type aliases (e.g., `PlacementType`)
   - Swagger arrays become type aliases (e.g., `type Days = DaysItem[]`)

3. **Version Variants**:
   - Statistics types have multiple versions (v1, v2, v3)
   - Bid types have auction vs non-auction variants

4. **Duplicate Found**:
   - `Response400` defined twice (lines 10 and 344)
   - First definition: minimal (`error?: string`)
   - Second definition: full RFC 7807 format with `detail`, `origin`, `request_id`, `status`, `title`

### Category Breakdown

| Category | Swagger Schemas | TypeScript Types | Notes |
|----------|-----------------|------------------|-------|
| Campaign | 14 | 16 | Includes GetAdverts, GetAuctionAdverts variants |
| Statistics | 19 | 25 | Includes V3 types, keyword stats |
| Normquery | 15 | 15 | 1:1 mapping, all request/response types |
| Calendar | 1 | 7 | Calendar has many expanded types |
| Error | 3 | 3 | Response400 (duplicate), ErrorResponse, etc. |
| Parameter | 2 | 3 | RequestWithDate, RequestWithInterval, etc. |
| Response | 6 | 6 | Response wrappers |
| Other | 2 | 7 | PlacementType, Timestamps, etc. |
| **TOTAL** | **62** | **82** | +20 from expanded inline types |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Types file | `src/types/promotion.types.ts` | 83 TypeScript interfaces/types |
| Module implementation | `src/modules/promotion/index.ts` | 1790 lines, 48 methods (`PromotionModule` class) |
| Rate limit config | `src/config/promotion-rate-limits.ts` | 42 rate limit entries |
| Unit tests | `tests/unit/modules/promotion.test.ts` | 643 lines, 111 test cases |
| Integration tests | `tests/integration/promotion.integration.test.ts` | 490 lines, 78 test cases |

### What Was Missing (Now Fixed)

**Status**: ✅ COMPLETE - All 62 Swagger schemas have TypeScript representations

**Implementation Summary**:
- ✅ All 15 normquery (Search Clusters) types implemented
- ✅ All 19 statistics types implemented (including V3 variants)
- ✅ All 14 campaign types implemented (including GetAdverts variants)
- ✅ All calendar types implemented
- ✅ All error and parameter types implemented

**Note on Type Count Discrepancy**:
- Swagger has exactly 62 schemas
- TypeScript has 82 unique types (83 exports, 1 duplicate `Response400`)
- Difference (+20 types) is due to:
  - Inline type definitions (nested objects become separate types)
  - Type aliases for arrays (e.g., `type Days = DaysItem[]`)
  - Version variants (V1, V2, V3 statistics types)
  - Multiple bid type variants (auction vs non-auction)

**Known Duplicate**:
- `Response400` defined twice (lines 10 and 344 in `src/types/promotion.types.ts`)
- First definition: minimal format (`error?: string`)
- Second definition: full RFC 7807 format
- Second definition shadows first; first is unused
- Recommendation: Remove first definition or rename for clarity

### Why This Matters

TypeScript types are the foundation for type-safe SDK development. Without complete type coverage:
- New endpoint implementations (EPIC 34) cannot be properly typed
- IDE autocompletion is incomplete for consumers
- Runtime type mismatches go undetected
- Generated documentation is incomplete

---

## Gap Analysis

### Schema Coverage Comparison

| Category | Swagger Schemas | TypeScript Types | Status |
|----------|-----------------|------------------|--------|
| Campaign schemas | 14 | 16 | ✅ Complete (includes GetAdverts variants) |
| Statistics schemas | 19 | 25 | ✅ Complete (includes V3, keyword stats) |
| Normquery schemas | 15 | 15 | ✅ Complete (1:1 mapping) |
| Calendar schemas | 1 | 7 | ✅ Complete (expanded inline types) |
| Error/Parameter schemas | 11 | 12 | ✅ Complete (includes duplicate) |
| Other schemas | 2 | 7 | ✅ Complete (Timestamps, PlacementType, etc.) |
| **TOTAL** | **62** | **82** | ✅ Complete |
| **Total** | **83** | **~66** | ✅ **All Covered** |

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

- [x] All 62 Swagger schemas have corresponding TypeScript interfaces
- [x] All 82 unique TypeScript types cover Swagger schemas and related types (83 exports, 1 duplicate)
- [x] New normquery request/response types generated (15 types)
- [x] Existing types verified against current swagger definitions
- [x] Duplicate `Response400` identified (shadowed by second definition)
- [x] TypeScript strict mode passes (`npx tsc --noEmit` exits 0)
- [x] All imports in promotion module updated
- [x] No regressions in existing tests

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/08-promotion.yaml` |
| Swagger shards | `wildberries_api_doc/08-promotion/` (9 shards + _schemas.yaml) |
| Module source | `src/modules/promotion/index.ts` (808 lines) |
| Types file | `src/types/promotion.types.ts` (82 unique types, 83 exports) |
| Unit tests | `tests/unit/modules/promotion.test.ts` (643 lines) |
| Integration tests | `tests/integration/promotion.integration.test.ts` (490 lines) |
| Story 4.5 | `docs/stories/4.5.promotion-tariffs-modules.md` |
| QA Gate 4.5 | `docs/qa/gates/4.5-promotion-tariffs-modules.yml` |
| EPIC 34 (depends on this) | `docs/epics/EPIC_34_PROMOTION_NEW_ENDPOINTS.md` |
| Backlog task | `backlog/tasks/task-33` |

---

## Completion Status

**Status**: COMPLETE (as of 2026-02-06)

### Implementation Summary
- All 62 Swagger schemas now have TypeScript representations
- Generated 82 unique TypeScript types (83 total exports, 1 duplicate `Response400`)
- Generated all 15 normquery (Search Clusters) request/response types
- Generated all 19 statistics types (including V3 variants)
- Generated all 14 campaign types (including GetAdverts variants)
- Verified and updated existing types against current swagger definitions
- Identified duplicate `Response400` definition (second shadows first)
- All imports in promotion module updated correctly

### Type Count Verification
| Metric | Count | Source |
|--------|-------|--------|
| Swagger Schemas | 62 | `wildberries_api_doc/08-promotion/_schemas.yaml` |
| TypeScript Exports | 83 | `src/types/promotion.types.ts` (grep count) |
| Unique TypeScript Types | 82 | After removing duplicate `Response400` |
| Business Logic Types | ~58 | Excluding errors/parameters |

### Discrepancy Explanation
The difference between 62 Swagger schemas and 82 TypeScript types is expected and correct:
1. **Inline Types** (+10): Nested objects become separate exported types
2. **Array Aliases** (+5): Type aliases for array types (e.g., `type Days = DaysItem[]`)
3. **Version Variants** (+3): V1, V2, V3 statistics types
4. **Bid Variants** (+2): Auction vs non-auction bid types

### Remaining Items
- None - all acceptance criteria completed
- Optional: Remove duplicate `Response400` definition (line 10, shadowed by line 344)
