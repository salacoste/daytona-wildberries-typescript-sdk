# EPIC 43: Reports Type & Schema Fixes — ExciseReportRequest bug, MeasurementPenalties/WHM drift, missing types, Promise\<unknown\>

---

## Status: ✅ COMPLETE

---

## Overview

| Field | Value |
|-------|-------|
| **EPIC** | 43 |
| **Module** | Reports (`src/modules/reports/`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-43 |
| **Depends On** | None (standalone type fixes) |
| **Blocks** | task-44 (Reports New & Removed Endpoints), task-45 (Reports Code Quality) |
| **Source** | February 2026 Swagger Audit |
| **Swagger** | `wildberries_api_doc/12-reports.yaml` |
| **Related Stories** | 3.7 (Reports Generation & Retrieval), 4.4 (Reports Generation & Retrieval) |
| **Related QA Gates** | 3.7, 4.4 |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Module implementation | `src/modules/reports/index.ts` | 507 lines, 26 methods |
| Types file | `src/types/reports.types.ts` | 479 lines, 18 interfaces + 2 type aliases |
| Rate limits | `src/config/reports-rate-limits.ts` | 147 lines, 25 rate limit entries |
| Unit tests | (none) | No dedicated test file exists yet |
| Swagger spec | `wildberries_api_doc/12-reports.yaml` | 26 endpoints, 20 schemas |

### What Is Wrong

Eight issues have been identified in the reports module types:

1. **ExciseReportRequest.countries union/array precedence bug (HIGH)**: The current type is defined as `'AM' | 'BY' | 'KG' | 'KZ' | 'RU' | 'UZ'[]`. Due to TypeScript operator precedence, only the last variant `'UZ'` becomes an array element type -- the type parses as `'AM' | 'BY' | 'KG' | 'KZ' | 'RU' | ('UZ'[])` instead of an array of the union. The swagger defines this as `type: array, items: { type: string, enum: [AM, BY, KG, KZ, RU, UZ] }`, meaning the entire value should be an array of enum strings. This is the same class of bug as analytics `AvailabilityFilters` (EPIC 41).

2. **Penalty/MeasurementPenalties schema drift (HIGH)**: The SDK `Penalty` interface has diverged from the swagger `MeasurementPenalties` schema. Missing field: `subjectName` (string, "Predmet"). Naming mismatch: SDK uses `totalCount` while swagger uses `total`. The SDK `Penalty` type also retains `subject` (old name) instead of `subjectName`.

3. **Measurement/WHM schema drift (HIGH)**: The SDK `Measurement` interface contains stale fields `dateStart` and `dateEnd` that do not exist in the current swagger `WHM` schema. The WHM schema has only a single `dt` field for date/time. Additionally, `subjectName` is missing from the SDK type. SDK uses `totalCount` while swagger uses `total`. SDK also has `prcOver`, `volumeSup`, `widthSup`, `lengthSup`, `heightSup` fields that are not in the WHM schema (those belong only to MeasurementPenalties).

4. **8 methods return Promise\<unknown\> (HIGH)**: The following methods lack proper response types: `getAnalyticsAntifraudDetails`, `getAnalyticsIncorrectAttachments`, `getAnalyticsGoodsLabeling`, `getAnalyticsCharacteristicsChange`, `getAnalyticsRegionSale`, `getBrandShareBrands`, `getBrandShareParentSubjects`, `getAnalyticsBrandShare`. Of these, 6 are targeted by task-43 AC #4 (excluding `getAnalyticsIncorrectAttachments` and `getAnalyticsCharacteristicsChange` which may be addressed in task-44).

5. **Missing error types (MEDIUM)**: `Response400Retentions` and `Response403Retentions` schemas exist in the swagger (used by penalty, measurement, and deduction endpoints) but are not present in the SDK types file.

6. **Stale error types (LOW)**: `Response400WHM` and `Response403WHM` exist in the SDK types file but are not referenced by any current swagger schema. The swagger now uses `Response400Retentions` and `Response403Retentions` for both penalty and measurement endpoints.

7. **Inline type literals in 5 methods (MEDIUM)**: Five methods use inline object types instead of named interfaces, reducing reusability and readability:
   - `getTasksDownload` (warehouse remains download -- 8 fields with nested `warehouses` array)
   - `getTasksDownload2` (acceptance report download -- 7 fields)
   - `getBannedProductsBlocked` (blocked products -- nested `report` array with 5 fields)
   - `getBannedProductsShadowed` (shadowed products -- nested `report` array with 5 fields)
   - `getAnalyticsGoodsReturn` (goods return -- nested `report` array with 19 fields)

8. **All changes must pass TypeScript strict compilation**: Zero errors under `npx tsc --noEmit` with strict mode enabled.

### Why This Matters

- **ExciseReportRequest silently accepts wrong data**: The malformed union means TypeScript will accept a bare string `'AM'` where an array is expected, causing runtime type mismatches with the API. Sellers generating excise reports for multiple countries will get incorrect results.
- **Penalty/Measurement schema drift breaks consumers**: The `totalCount` field does not exist in the API response -- only `total` does. SDK consumers reading `totalCount` will get `undefined`.
- **Stale fields cause confusion**: `dateStart`/`dateEnd` in the Measurement type do not come from the API, leading developers to expect data that never arrives.
- **Promise\<unknown\> defeats SDK purpose**: Six active methods provide zero type safety, forcing consumers to cast or use `as any` for antifraud details, goods labeling, region sales, and brand share reports.
- **Missing error types**: Retentions error responses (400/403) cannot be properly typed in catch blocks, reducing error handling quality.
- **Inline types reduce maintainability**: Five methods with complex inline object types are difficult to document, test, and reuse.

---

## Gap Analysis

### ExciseReportRequest.countries Type Comparison

| Current (Malformed) | Correct (Per Swagger) |
|---------------------|----------------------|
| `'AM' \| 'BY' \| 'KG' \| 'KZ' \| 'RU' \| 'UZ'[]` | `('AM' \| 'BY' \| 'KG' \| 'KZ' \| 'RU' \| 'UZ')[]` |
| Only `'UZ'` is treated as array element | Entire union is the array element type |
| Accepts bare strings -- wrong | Only accepts array of enum values -- correct |

### Penalty / MeasurementPenalties Field Comparison

| Field | SDK `Penalty` | Swagger `MeasurementPenalties` | Action |
|-------|---------------|-------------------------------|--------|
| `nmId` | `number` | `integer` | OK |
| `subjectName` | **MISSING** | `string` ("Predmet") | **ADD** |
| `subject` | `string` | **NOT IN SCHEMA** | **REMOVE** (replaced by `subjectName`) |
| `dimId` | `number` | `integer` | OK |
| `prcOver` | `number` | `number` | OK |
| `volume` | `number` | `number` | OK |
| `width` | `number` | `integer` | OK |
| `length` | `number` | `integer` | OK |
| `height` | `number` | `integer` | OK |
| `volumeSup` | `number` | `number` | OK |
| `widthSup` | `number` | `integer` | OK |
| `lengthSup` | `number` | `integer` | OK |
| `heightSup` | `number` | `integer` | OK |
| `photoUrls` | `string[]` | `string[]` | OK |
| `dtBonus` | `string` | `string (date-time)` | OK |
| `isValid` | `boolean` | `boolean` | OK |
| `isValidDt` | `string` | `string (date-time)` | OK |
| `reversalAmount` | `number` | `number` | OK |
| `penaltyAmount` | `number` | `number` | OK |
| `data.totalCount` | `number` | **NOT IN SCHEMA** | **RENAME to `total`** |
| `data.total` | **MISSING** | `integer` | **ADD** (replaces `totalCount`) |

### Measurement / WHM Field Comparison

| Field | SDK `Measurement` | Swagger `WHM` | Action |
|-------|-------------------|---------------|--------|
| `nmId` | `number` | `integer` | OK |
| `subjectName` | **MISSING** | `string` ("Predmet") | **ADD** |
| `subject` | `string` | **NOT IN SCHEMA** | **REMOVE** |
| `dimId` | `number` | `integer` | OK |
| `prcOver` | `number` | **NOT IN SCHEMA** | **REMOVE** (only in MeasurementPenalties) |
| `volume` | `number` | `number` | OK |
| `width` | `number` | `integer` | OK |
| `length` | `number` | `integer` | OK |
| `height` | `number` | `integer` | OK |
| `volumeSup` | `number` | **NOT IN SCHEMA** | **REMOVE** (only in MeasurementPenalties) |
| `widthSup` | `number` | **NOT IN SCHEMA** | **REMOVE** (only in MeasurementPenalties) |
| `lengthSup` | `number` | **NOT IN SCHEMA** | **REMOVE** (only in MeasurementPenalties) |
| `heightSup` | `number` | **NOT IN SCHEMA** | **REMOVE** (only in MeasurementPenalties) |
| `photoUrls` | `string[]` | `string[]` | OK |
| `dt` | `string` | `string (date-time)` | OK |
| `dateStart` | `string` | **NOT IN SCHEMA** | **REMOVE** (stale) |
| `dateEnd` | `string` | **NOT IN SCHEMA** | **REMOVE** (stale) |
| `data.totalCount` | `number` | **NOT IN SCHEMA** | **RENAME to `total`** |
| `data.total` | **MISSING** | `integer` | **ADD** (replaces `totalCount`) |

### Methods Returning Promise\<unknown\>

| Method | Current Return Type | Required Return Type | Endpoint |
|--------|-------------------|---------------------|----------|
| `getAnalyticsAntifraudDetails` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/antifraud-details` |
| `getAnalyticsIncorrectAttachments` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/incorrect-attachments` |
| `getAnalyticsGoodsLabeling` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/goods-labeling` |
| `getAnalyticsCharacteristicsChange` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/characteristics-change` |
| `getAnalyticsRegionSale` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/region-sale` |
| `getBrandShareBrands` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/brand-share/brands` |
| `getBrandShareParentSubjects` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/brand-share/parent-subjects` |
| `getAnalyticsBrandShare` | `Promise<unknown>` | Needs new interface | `/api/v1/analytics/brand-share` |

**Note**: task-43 AC #4 targets 6 of these 8 methods (excluding `getAnalyticsIncorrectAttachments` and `getAnalyticsCharacteristicsChange` which may be scoped to task-44).

### Missing Error Types

| Schema Name | Purpose | Used By |
|-------------|---------|---------|
| `Response400Retentions` | 400 error for retentions endpoints (title, status, detail, requestId, origin) | `getMeasurementPenalties`, `getWarehouseMeasurements`, `getDeductions` |
| `Response403Retentions` | 403 error for retentions endpoints (title, status, detail, requestId, origin) | `getMeasurementPenalties`, `getWarehouseMeasurements`, `getDeductions` |

### Stale Types

| Type Name | Status | Action |
|-----------|--------|--------|
| `Response400WHM` | Not in current swagger | Mark `@deprecated` or remove |
| `Response403WHM` | Not in current swagger | Mark `@deprecated` or remove |

### Inline Type Literals Requiring Extraction

| Method | Inline Type Location | Proposed Interface Name |
|--------|---------------------|------------------------|
| `getTasksDownload` | Return type (warehouse remains) | `WarehouseRemainsDownloadItem` |
| `getTasksDownload2` | Return type (acceptance report) | `AcceptanceReportDownloadItem` |
| `getBannedProductsBlocked` | Return type (blocked products) | `BannedProductsBlockedResponse` |
| `getBannedProductsShadowed` | Return type (shadowed products) | `BannedProductsShadowedResponse` |
| `getAnalyticsGoodsReturn` | Return type (goods return) | `GoodsReturnResponse` |

---

## Implementation Approach

### Step 1: Fix ExciseReportRequest.countries Type

Change the type from the malformed union `'AM' | 'BY' | 'KG' | 'KZ' | 'RU' | 'UZ'[]` to the correctly parenthesized array type `('AM' | 'BY' | 'KG' | 'KZ' | 'RU' | 'UZ')[]`. This ensures the entire union is the element type of the array, matching the swagger `type: array, items: { type: string, enum: [...] }` definition.

### Step 2: Update Penalty Interface to Match MeasurementPenalties Schema

- Add `subjectName?: string` field to the reports item
- Remove stale `subject` field (replaced by `subjectName`)
- Rename `totalCount` to `total` in the `data` wrapper
- Verify all remaining fields match the swagger `MeasurementPenalties` schema

### Step 3: Update Measurement Interface to Match WHM Schema

- Remove stale fields: `dateStart`, `dateEnd` (not in WHM schema)
- Remove fields that belong only to MeasurementPenalties: `prcOver`, `volumeSup`, `widthSup`, `lengthSup`, `heightSup`
- Remove stale `subject` field, add `subjectName?: string`
- Rename `totalCount` to `total` in the `data` wrapper
- Verify remaining fields: `nmId`, `dimId`, `volume`, `width`, `length`, `height`, `photoUrls`, `dt`

### Step 4: Add Response Types for Promise\<unknown\> Methods

Create new interfaces for the 6 targeted methods (per task-43 AC #4):
- `AntifraudDetailsResponse` for `getAnalyticsAntifraudDetails`
- `GoodsLabelingResponse` for `getAnalyticsGoodsLabeling`
- `RegionSaleResponse` for `getAnalyticsRegionSale`
- `BrandShareBrandsResponse` for `getBrandShareBrands`
- `BrandShareParentSubjectsResponse` for `getBrandShareParentSubjects`
- `BrandShareResponse` for `getAnalyticsBrandShare`

Define fields based on swagger response schemas where available, or use best-effort typing from API documentation and examples.

### Step 5: Add Missing Error Types

Add `Response400Retentions` and `Response403Retentions` interfaces to `reports.types.ts` matching the swagger schemas:
- Both have: `title?: string`, `status?: number`, `detail?: string`, `requestId?: string`, `origin?: string`

### Step 6: Handle Stale Error Types

Mark `Response400WHM` and `Response403WHM` with `@deprecated` tags since they are no longer in the current swagger. These may still be imported by consumer code, so removal would be a breaking change. Mark deprecated with a note pointing to `Response400Retentions`/`Response403Retentions`.

### Step 7: Extract Inline Type Literals to Named Interfaces

Extract the 5 inline object types into named interfaces:
- `WarehouseRemainsDownloadItem` (8 fields + nested `warehouses` array)
- `AcceptanceReportDownloadItem` (7 fields)
- `BannedProductsBlockedResponse` (nested `report` array with 5 fields)
- `BannedProductsShadowedResponse` (nested `report` array with 5 fields)
- `GoodsReturnResponse` (nested `report` array with 19 fields)

Update the corresponding method signatures and generic type parameters in `src/modules/reports/index.ts`.

### Step 8: Validate Type Safety

Run `npx tsc --noEmit` to ensure zero TypeScript errors in strict mode across the entire project. Verify that all imports are resolved and no circular dependencies are introduced.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/types/reports.types.ts` | Fix ExciseReportRequest.countries, update Penalty/Measurement, add error types, deprecate stale types, add response types for Promise\<unknown\> methods, extract inline types to named interfaces | High |
| `src/modules/reports/index.ts` | Update return types for 6 Promise\<unknown\> methods, replace 5 inline type literals with named interface references, update import statement | Medium |

---

## Success Criteria

- [x] ExciseReportRequest.countries type fixed from malformed union to proper array: `('AM' | 'BY' | 'KG' | 'KZ' | 'RU' | 'UZ')[]`
- [x] Penalty interface updated to match MeasurementPenalties swagger schema (add `subjectName`, rename `totalCount` to `total`, remove stale `subject`, verify all fields)
- [x] Measurement interface updated to match WHM swagger schema (remove stale `dateStart`/`dateEnd`/`prcOver`/`volumeSup`/`widthSup`/`lengthSup`/`heightSup`/`subject`, add `subjectName`, rename `totalCount` to `total`)
- [x] 6 active methods with `Promise<unknown>` replaced with proper response types: `getAnalyticsAntifraudDetails`, `getAnalyticsGoodsLabeling`, `getAnalyticsRegionSale`, `getBrandShareBrands`, `getBrandShareParentSubjects`, `getAnalyticsBrandShare`
- [x] `Response400Retentions` and `Response403Retentions` error types added from swagger
- [x] Stale `Response400WHM` and `Response403WHM` types marked `@deprecated` with migration guidance
- [x] 5 methods using inline object type literals refactored to named interfaces (`getTasksDownload` variants, `getBannedProducts` variants, `getAnalyticsGoodsReturn`)
- [x] All type changes pass TypeScript strict compilation with zero errors

---

## Implementation Notes

Completed on 2026-02-06.

### Changes Made
1. **ExciseReportRequest.countries** - Fixed malformed union/array precedence bug
2. **Penalty/MeasurementPenalties** - Updated to match swagger schema, renamed totalCount→total
3. **Measurement/WHM** - Removed stale fields, aligned with swagger
4. **Promise\<unknown\>** - Replaced with 14 properly typed interfaces
5. **Error types** - Added Response400Retentions, Response403Retentions
6. **Inline types** - Extracted WarehouseRemainsDownloadItem, AcceptanceReportDownloadItem, etc.

### Files Modified
- `src/types/reports.types.ts`
- `src/modules/reports/index.ts`

### Verification
- TypeScript compilation passes (npx tsc --noEmit)
- All unit tests pass

---

## Risk Assessment

**Risk Level: MEDIUM**

- **ExciseReportRequest.countries fix is a BREAKING CHANGE**: Any code passing a bare string where the corrected array type is expected will fail to compile. This is intentional -- the old type was incorrect and did not match the API contract.
- **Penalty `totalCount` to `total` rename is a BREAKING CHANGE**: Consumers reading `data.totalCount` must update to `data.total`. The old field name was incorrect per the API response.
- **Measurement field removals are BREAKING CHANGES**: Removing `dateStart`, `dateEnd`, `prcOver`, `volumeSup`, `widthSup`, `lengthSup`, `heightSup`, and `subject` will break any code referencing these fields. However, these fields were never populated by the API (they do not exist in the WHM schema), so consumers using them were already getting `undefined`.
- **Adding `subjectName` to both types is non-breaking**: Additive field addition.
- **Adding new response types is non-breaking**: `AntifraudDetailsResponse`, `GoodsLabelingResponse`, etc. are additive changes.
- **Adding error types is non-breaking**: `Response400Retentions` and `Response403Retentions` are additive.
- **Deprecating stale types is non-breaking**: `Response400WHM` and `Response403WHM` are marked deprecated but not removed.
- **Extracting inline types is technically breaking**: If any consumer imports the module type and relies on the exact inline shape via structural typing, the change to a named interface is structurally compatible but the import path changes. In practice, this is non-breaking since the shapes are preserved.

**Mitigation**: Document all breaking changes in the release notes with migration examples. Bump minor version to signal potentially breaking type corrections.

---

## Dependencies

- **Depends on**: None (standalone type fixes)
- **Blocks**: task-44 (Reports New & Removed Endpoints -- 3 new deductions endpoints, 3 stale removals, @deprecated marking), task-45 (Reports Code Quality -- JSDoc, Rate Limits, Tests, Config Cleanup)

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/12-reports.yaml` |
| Module source | `src/modules/reports/index.ts` (507 lines, 26 methods) |
| Types file | `src/types/reports.types.ts` (479 lines, 18 interfaces + 2 type aliases) |
| Rate limits config | `src/config/reports-rate-limits.ts` (147 lines) |
| Story 3.7 | `docs/stories/3.7.reports-generation-retrieval.md` |
| Story 4.4 | `docs/stories/4.4.reports-generation-retrieval.md` |
| QA Gate 3.7 | `docs/qa/gates/3.7-reports-generation-retrieval.yml` |
| QA Gate 4.4 | `docs/qa/gates/4.4-reports-generation-retrieval.yml` |
| EPIC 41 (analytics analog) | `docs/epics/EPIC_41_ANALYTICS_TYPE_SCHEMA_FIXES.md` |
| EPIC 44 (reports endpoints) | task-44 (Reports New & Removed Endpoints) |
| EPIC 45 (reports quality) | task-45 (Reports Code Quality) |
| Backlog task | `backlog/tasks/task-43` |
