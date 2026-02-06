# EPIC 41: Analytics Type & Schema Fixes — AvailabilityFilters bug, TableProductItem, missing schemas

---

## Status: ✅ COMPLETE

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 41 |
| **Module** | analytics (`11-analytics.yaml`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-41 |
| **Depends On** | None (standalone type fixes) |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 3.3 (Analytics Sales Statistics), 3.4 (Analytics Stock CSV Reports), 4.3 (Analytics Sales Statistics) |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Module implementation | `src/modules/analytics/index.ts` | 533 lines, 19 methods |
| Types file | `src/types/analytics.types.ts` | 1901 lines, ~100 interfaces/types |
| Rate limits | `src/config/analytics-rate-limits.ts` | 97 lines |
| Unit tests | `tests/unit/modules/analytics-v3-methods.test.ts` | 659 lines |
| Swagger spec | `wildberries_api_doc/11-analytics.yaml` | 92 schemas |
| Swagger shards | `wildberries_api_doc/11-analytics/` | 4 shards (voronka-prodazh, poiskovye-zaprosy, istoriya-ostatkov, analitika-prodavtsa-csv) |
| Deprecated v2 spec | `wildberries_api_doc/11-analytics.v2-deprecated.yaml` | Legacy v2 endpoints |

### What Is Wrong

Six issues have been identified in the analytics module types:

1. **AvailabilityFilters union/array precedence bug (CRITICAL)**: The current type is defined as `'deficient' | 'actual' | 'balanced' | 'nonActual' | 'nonLiquid' | 'invalidData'[]`. Due to TypeScript operator precedence, only the last variant `'invalidData'` becomes an array — the type parses as `'deficient' | 'actual' | 'balanced' | 'nonActual' | 'nonLiquid' | 'invalidData'[]` instead of an array of the union. The swagger defines this as `type: array, items: { type: string, enum: [...] }`, meaning the entire value should be an array of enum strings.

2. **TableProductItem is an empty interface (HIGH)**: Currently defined as an empty interface with a comment "API returns empty object". The swagger defines 18+ fields via an `allOf` structure including product identifiers, metrics, and visibility data. This means SDK consumers get no type safety for table product responses.

3. **Missing ErrorObject type (MEDIUM)**: The v3 endpoints return error responses with `code` and `message` fields, but no `ErrorObject` type exists in the SDK to represent them.

4. **OrderByMainAndDetails schema not properly represented (MEDIUM)**: The swagger defines an `OrderByMainAndDetails` schema, but the SDK uses a generic `OrderBy` name. This creates a mismatch between the swagger specification and SDK types.

5. **getDownloadsFile returns Promise\<unknown\> (MEDIUM)**: The swagger specifies `application/zip` binary response for file downloads, but the method returns `Promise<unknown>` instead of `Promise<ArrayBuffer>` or an appropriate binary type.

6. **ResponseError orphan type (LOW)**: A `ResponseError` type exists in the SDK that does not correspond to any swagger schema. It should be removed or documented with rationale.

### Why This Matters

- **AvailabilityFilters silently accepts wrong data**: The malformed union means TypeScript will accept a bare string `'deficient'` where an array is expected, causing runtime type mismatches with the API
- **TableProductItem provides zero type safety**: SDK consumers must cast or use `as any` to access the 18+ fields the API actually returns, defeating the purpose of a typed SDK
- **Missing error types**: v3 error responses cannot be properly typed or handled
- **Binary download is untyped**: File download consumers have no type guidance for handling the response
- **6 deprecated v2 types must be preserved**: Removing them would break existing consumers

---

## Gap Analysis

### AvailabilityFilters Type Comparison

| Current (Malformed) | Correct (Per Swagger) |
|---------------------|----------------------|
| `'deficient' \| 'actual' \| 'balanced' \| 'nonActual' \| 'nonLiquid' \| 'invalidData'[]` | `('deficient' \| 'actual' \| 'balanced' \| 'nonActual' \| 'nonLiquid' \| 'invalidData')[]` |
| Only `'invalidData'` is treated as array element | Entire union is the array element type |
| Accepts bare strings — wrong | Only accepts array of enum values — correct |

### TableProductItem Field Gap

| Field | Type | Source |
|-------|------|--------|
| `nmId` | `number` | allOf structure in swagger |
| `name` | `string` | allOf structure in swagger |
| `vendorCode` | `string` | allOf structure in swagger |
| `subjectName` | `string` | allOf structure in swagger |
| `brandName` | `string` | allOf structure in swagger |
| `mainPhoto` | `string` | allOf structure in swagger |
| `isAdvertised` | `boolean` | allOf structure in swagger |
| `isSubstitutedSKU` | `boolean` | allOf structure in swagger |
| `isCardRated` | `boolean` | allOf structure in swagger |
| `rating` | `number` | allOf structure in swagger |
| `feedbackRating` | `number` | allOf structure in swagger |
| `price` | `number` | allOf structure in swagger |
| `avgPosition` | `number` | allOf structure in swagger |
| `openCard` | `number` | allOf structure in swagger |
| `addToCart` | `number` | allOf structure in swagger |
| `openToCart` | `number` | allOf structure in swagger |
| `orders` | `number` | allOf structure in swagger |
| `cartToOrder` | `number` | allOf structure in swagger |
| `visibility` | `number` | allOf structure in swagger |

### Missing Types

| Schema Name | Purpose | Used By |
|-------------|---------|---------|
| `ErrorObject` | v3 error response with `code` and `message` fields | All v3 analytics endpoints |
| `OrderByMainAndDetails` | Sort order for main/details combined queries | Sales funnel v3 endpoints |

### Method Signature Issues

| Method | Current Return Type | Required Return Type | Impact |
|--------|-------------------|---------------------|--------|
| `getDownloadsFile` | `Promise<unknown>` | `Promise<ArrayBuffer>` | No type safety for binary download |

### Orphan Types

| Type Name | Status | Action |
|-----------|--------|--------|
| `ResponseError` | Not in swagger | Remove or document rationale |

### Deprecated v2 Types (Must Preserve)

| Type Name | Status | Action |
|-----------|--------|--------|
| `NmReportDetailRequest` | Deprecated | Retain with `@deprecated` tag |
| `NmReportDetailResponse` | Deprecated | Retain with `@deprecated` tag |
| `NmReportDetail*` (6 types total) | Deprecated | Retain with `@deprecated` tags, do NOT remove |

---

## Implementation Approach

### Step 1: Fix AvailabilityFilters Type
Change the type from the malformed union `'deficient' | 'actual' | ... | 'invalidData'[]` to the correctly parenthesized array type `('deficient' | 'actual' | 'balanced' | 'nonActual' | 'nonLiquid' | 'invalidData')[]`. This ensures the entire union is the element type of the array, matching the swagger `type: array, items: { type: string, enum: [...] }` definition.

### Step 2: Populate TableProductItem Interface
Replace the empty interface with all 18+ fields from the swagger `allOf` structure: `nmId`, `name`, `vendorCode`, `subjectName`, `brandName`, `mainPhoto`, `isAdvertised`, `isSubstitutedSKU`, `isCardRated`, `rating`, `feedbackRating`, `price`, `avgPosition`, `openCard`, `addToCart`, `openToCart`, `orders`, `cartToOrder`, `visibility`.

### Step 3: Add ErrorObject Type
Add the `ErrorObject` interface to `analytics.types.ts` with `code` (number) and `message` (string) fields based on the v3 error response schema.

### Step 4: Add OrderByMainAndDetails Schema
Either rename the generic `OrderBy` type to `OrderByMainAndDetails` or add a type alias so the SDK type name matches the swagger schema name.

### Step 5: Fix getDownloadsFile Return Type
Change the return type from `Promise<unknown>` to `Promise<ArrayBuffer>` in `src/modules/analytics/index.ts` to match the swagger `application/zip` binary response specification.

### Step 6: Clean Up ResponseError Orphan Type
Remove the `ResponseError` type that has no corresponding swagger schema, or if it serves an internal purpose, add documentation explaining why it exists.

### Step 7: Verify Backward Compatibility
Confirm that all 6 deprecated v2 types (`NmReportDetail*Request/Response` variants) retain their `@deprecated` tags and are NOT removed.

### Step 8: Validate Type Safety
Run `npx tsc --noEmit` to ensure zero TypeScript errors in strict mode across the entire project.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/types/analytics.types.ts` | Fix AvailabilityFilters, populate TableProductItem, add ErrorObject, add OrderByMainAndDetails, remove/document ResponseError, preserve deprecated types | High |
| `src/modules/analytics/index.ts` | Fix getDownloadsFile return type | Low |

---

## Success Criteria

- [x] AvailabilityFilters type fixed from malformed union to proper array type: `('deficient' | 'actual' | ... | 'invalidData')[]`
- [x] TableProductItem interface populated with all 18+ fields from swagger (nmId, name, vendorCode, subjectName, brandName, mainPhoto, isAdvertised, isSubstitutedSKU, isCardRated, rating, feedbackRating, price, avgPosition, openCard, addToCart, openToCart, orders, cartToOrder, visibility)
- [x] ErrorObject type added for v3 endpoint error responses (code, message fields)
- [x] OrderByMainAndDetails schema represented in SDK types (either rename or add alias)
- [x] getDownloadsFile return type changed from `Promise<unknown>` to `Promise<ArrayBuffer>` or appropriate binary type
- [x] 6 deprecated v2 types (NmReportDetail*Request/Response) retain `@deprecated` tags and are NOT removed for backward compatibility
- [x] ResponseError orphan type either removed or documented with rationale
- [x] All type changes pass TypeScript strict compilation with zero errors

---

## Risk Assessment

**Risk Level: MEDIUM**

- **AvailabilityFilters fix is a BREAKING CHANGE**: Any code passing a bare string where the corrected array type is expected will fail to compile. This is intentional — the old type was incorrect and did not match the API contract.
- **TableProductItem population is technically breaking**: Any code relying on the empty interface (e.g., casting to `any` or using index signatures) may need adjustment. However, adding fields to a previously empty interface is additive in practice.
- **getDownloadsFile return type change is breaking**: Code using `Promise<unknown>` may need type adjustments, but this fix provides correct type information for binary responses.
- **Removing ResponseError is breaking if imported**: Any consumer importing this orphan type will break. If removal is too risky, document it instead.
- **Adding new types is non-breaking**: `ErrorObject` and `OrderByMainAndDetails` are additive changes.
- **Preserving deprecated types is non-breaking**: No removal, only annotation.

---

## Dependencies

- **Depends on**: None (standalone type fixes)
- **Blocks**: task-42 (Analytics Code Quality — JSDoc, Rate Limits, Tests, Config Cleanup)

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/11-analytics.yaml` |
| Swagger shards | `wildberries_api_doc/11-analytics/` (4 shards) |
| Deprecated v2 spec | `wildberries_api_doc/11-analytics.v2-deprecated.yaml` |
| Module source | `src/modules/analytics/index.ts` (533 lines) |
| Types file | `src/types/analytics.types.ts` (1901 lines) |
| Rate limits config | `src/config/analytics-rate-limits.ts` (97 lines) |
| Unit tests | `tests/unit/modules/analytics-v3-methods.test.ts` (659 lines) |
| Story 3.3 | `docs/stories/3.3.analytics-sales-statistics.md` |
| Story 3.4 | `docs/stories/3.4.analytics-stock-csv-reports.md` |
| Story 4.3 | `docs/stories/4.3.analytics-sales-statistics.md` |
| QA Gate 3.3 | `docs/qa/gates/3.3-analytics-sales-statistics.yml` |
| QA Gate 3.4 | `docs/qa/gates/3.4-analytics-stock-csv-reports.yml` |
| QA Gate 4.3 | `docs/qa/gates/4.3-analytics-sales-statistics.yml` |
| EPIC 42 (code quality) | `docs/epics/EPIC_42_ANALYTICS_CODE_QUALITY.md` |
| Backlog task | `backlog/tasks/task-41` |

---

## Implementation Notes

Completed on 2026-02-06.

### Changes Made
1. **AvailabilityFilters** - Fixed malformed union/array precedence bug. Changed from `'deficient' | 'actual' | ... | 'invalidData'[]` to `('deficient' | 'actual' | 'balanced' | 'nonActual' | 'nonLiquid' | 'invalidData')[]`
2. **TableProductItem** - Populated with 18+ fields from swagger (nmId, name, vendorCode, subjectName, brandName, mainPhoto, isAdvertised, isSubstitutedSKU, isCardRated, rating, feedbackRating, price, avgPosition, openCard, addToCart, openToCart, orders, cartToOrder, visibility)
3. **ErrorObject** - Added generic error object type for v3 endpoints
4. **OrderByMainAndDetails** - Added type alias for OrderBy
5. **getDownloadsFile** - Changed return type from `Promise<unknown>` to `Promise<ArrayBuffer>`
6. **ResponseError** - Documented with @internal JSDoc tag
7. **Deprecated v2 types** - Verified all 6 NmReportDetail* types preserved with @deprecated tags

### Files Modified
- `src/types/analytics.types.ts`
- `src/modules/analytics/index.ts`

### Verification
- TypeScript compilation passes (npx tsc --noEmit)
- 24 unit tests pass
