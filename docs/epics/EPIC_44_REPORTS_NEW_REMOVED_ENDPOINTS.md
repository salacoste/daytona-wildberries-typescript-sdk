# EPIC 44: Reports New & Removed Endpoints

---

## Status: ✅ COMPLETE

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 44 |
| **Module** | Reports (`src/modules/reports/`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-44 |
| **Depends On** | EPIC 43 (task-43) — Reports Type & Schema Fixes |
| **Blocks** | EPIC 45 (task-45) — Reports Code Quality |
| **Source** | February 2026 Swagger Audit |
| **Swagger** | `wildberries_api_doc/12-reports.yaml` |
| **Related Stories** | 3.7, 4.4 |
| **Related QA Gates** | 3.7, 4.4 |
| **Related EPICs** | EPIC 43 |

---

## Background

The February 2026 swagger audit revealed significant structural changes in the "Отчёты об удержаниях" (Deductions Reports) tag. The old combined endpoint `GET /api/v1/analytics/warehouse-measurements` with a `tab` query parameter (`penalty` | `measurement`) was replaced by 3 separate endpoints under the new `/api/analytics/v1/` path prefix:

- **measurement-penalties** — Penalties for understated packaging dimensions (5 query params including limit/offset pagination)
- **warehouse-measurements** — Warehouse measurement reports (4 query params including limit/offset pagination)
- **deductions** — Substitutions and incorrect attachments (6 query params including limit/offset pagination, sort/order)

Additionally, 2 other endpoints were **removed entirely** from the swagger spec with no direct replacement:

- `GET /api/v1/analytics/incorrect-attachments` — Replaced by the new `/api/analytics/v1/deductions` endpoint
- `GET /api/v1/analytics/characteristics-change` — Removed with no replacement

And 1 endpoint is now explicitly **deprecated** in swagger:

- `GET /api/v1/supplier/incomes` — Marked `deprecated: true` with notice: "Данный метод устарел. Он будет удалён 11 марта"

The SDK currently has 26 methods in the `ReportsModule` class. Three of those methods (`getAnalyticsWarehouseMeasurements`, `getAnalyticsIncorrectAttachments`, `getAnalyticsCharacteristicsChange`) call endpoints that no longer exist in swagger. Additionally, 6 methods have poor auto-generated names (`getTasksStatu`, `getTasksStatu2`, `getTasksStatu3`, `getTasksDownload`, `getTasksDownload2`, `getTasksDownload3`) that provide no context about which report type they operate on.

---

## Endpoint Evolution

| Old Endpoint | New Endpoint | Change Type |
|---|---|---|
| `GET /api/v1/analytics/warehouse-measurements` (tab=penalty) | `GET /api/analytics/v1/measurement-penalties` | Split into separate endpoint |
| `GET /api/v1/analytics/warehouse-measurements` (tab=measurement) | `GET /api/analytics/v1/warehouse-measurements` | Split into separate endpoint |
| `GET /api/v1/analytics/incorrect-attachments` | `GET /api/analytics/v1/deductions` | Replaced by new endpoint |
| `GET /api/v1/analytics/characteristics-change` | REMOVED | No replacement; endpoint removed from swagger entirely |
| `GET /api/v1/supplier/incomes` | Unchanged but `deprecated: true` | Will be removed 11 March 2026 |

---

## New Endpoints Detail

All 3 new endpoints use base URL `https://seller-analytics-api.wildberries.ru` and share the same rate limit: **1 req/min, 1 min interval, 1 burst**.

### 1. GET /api/analytics/v1/measurement-penalties

**operationId**: `getMeasurementPenalties`
**SDK Method**: `getMeasurementPenalties()`
**Purpose**: Returns the report on penalties for understated packaging dimensions.

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateFrom` | string (date-time) | No | Start of reporting period (defaults to earliest data date) |
| `dateTo` | string (date-time) | Yes | End of reporting period |
| `limit` | integer (max 1000) | Yes | Number of items in response |
| `offset` | integer (default 0) | No | Number of items to skip |

**Response Schema**: `MeasurementPenalties` — Contains `data.reports[]` (penalty items with nmId, subjectName, dimId, prcOver, volume, width, length, height, volumeSup, widthSup, lengthSup, heightSup, photoUrls, dtBonus, isValid, isValidDt, reversalAmount, penaltyAmount) and `data.total` (total count without limit/offset).

### 2. GET /api/analytics/v1/warehouse-measurements

**operationId**: `getWarehouseMeasurements`
**SDK Method**: `getWarehouseMeasurementsV2()`
**Purpose**: Returns warehouse measurement reports.

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateFrom` | string (date-time) | No | Start of reporting period |
| `dateTo` | string (date-time) | Yes | End of reporting period |
| `limit` | integer (max 1000) | Yes | Number of items in response |
| `offset` | integer (default 0) | No | Number of items to skip |

**Response Schema**: `WHM` — Contains `data.reports[]` (measurement items with nmId, subjectName, dimId, volume, width, length, height, photoUrls, dt) and `data.total` (total count without limit/offset).

### 3. GET /api/analytics/v1/deductions

**operationId**: `getDeductions`
**SDK Method**: `getDeductions()`
**Purpose**: Returns report on deductions for substitutions and incorrect attachments. Replaces the removed `/api/v1/analytics/incorrect-attachments` endpoint.

**Query Parameters**:
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `dateFrom` | string (date-time) | No | Start of reporting period |
| `dateTo` | string (date-time) | Yes | End of reporting period |
| `sort` | string enum: `nmId`, `dtBonus`, `bonusSumm` | No | Sort field (default: `dtBonus`) |
| `order` | string enum: `desc`, `asc` | No | Sort order (default: `desc`) |
| `limit` | integer (max 1000) | Yes | Number of items in response |
| `offset` | integer (default 0) | No | Number of items to skip |

**Response Schema**: `SuccessSubstIncorAttachResponse` (inline) — Contains `data.reports[]` (deduction items with dtBonus, nmId, oldShkId, oldColor, oldSize, oldSku, oldVendorCode, newShkId, newColor, newSize, newSku, newVendorCode, bonusSumm, bonusType, photoUrls) and `data.total` (total count without limit/offset).

---

## Method Naming Improvements

The code generator produced ambiguous names for the 3 async task workflow groups (warehouse remains, acceptance report, paid storage). Each group has a "check status" and "download report" method, but the generated names are indistinguishable.

| Current Name | New Name | Report Type | Reason |
|---|---|---|---|
| `getTasksStatu` | `getWarehouseRemainsTaskStatus` | Warehouse Remains | Descriptive name identifying the report type |
| `getTasksStatu2` | `getAcceptanceReportTaskStatus` | Acceptance Report | Descriptive name identifying the report type |
| `getTasksStatu3` | `getPaidStorageTaskStatus` | Paid Storage | Descriptive name identifying the report type |
| `getTasksDownload` | `downloadWarehouseRemainsReport` | Warehouse Remains | Descriptive name identifying the report type |
| `getTasksDownload2` | `downloadAcceptanceReport` | Acceptance Report | Descriptive name identifying the report type |
| `getTasksDownload3` | `downloadPaidStorageReport` | Paid Storage | Descriptive name identifying the report type |

Backward compatibility is maintained by keeping the old method names as `@deprecated` wrappers that delegate to the new methods.

---

## Implementation Approach

### Step 1: Verify Types Available (Depends on EPIC 43)

Ensure all required TypeScript types from EPIC 43 are in place:
- `MeasurementPenalties` response type (updated from old `Penalty` schema)
- `WHM` response type (updated from old `Measurement` schema)
- `DeductionsResponse` type (new, from `SuccessSubstIncorAttachResponse` inline schema)
- `MeasurementPenaltiesParams`, `WarehouseMeasurementsParams`, `DeductionsParams` request param types

### Step 2: Implement 3 New Deduction Endpoint Methods

Add 3 methods to `ReportsModule` class following existing SDK patterns:
- `getMeasurementPenalties()` — GET with 4 query params, returns `MeasurementPenalties`
- `getWarehouseMeasurementsV2()` — GET with 4 query params, returns `WHM`
- `getDeductions()` — GET with 6 query params, returns `DeductionsResponse`

Each method calls BaseClient with correct HTTP method and URL (`https://seller-analytics-api.wildberries.ru`), passes `rateLimitKey`, and has full JSDoc with `@example` using `sdk.reports.*`.

### Step 3: Mark 3 Stale Methods as @deprecated

Add `@deprecated` JSDoc and `console.warn` to the 3 methods calling removed endpoints:
- `getAnalyticsWarehouseMeasurements()` — Point users to `getMeasurementPenalties()`, `getWarehouseMeasurementsV2()`, and `getDeductions()`
- `getAnalyticsIncorrectAttachments()` — Point users to `getDeductions()`
- `getAnalyticsCharacteristicsChange()` — Note endpoint removed with no replacement; also fix base URL bug from `api.wildberries.ru` to `seller-analytics-api.wildberries.ru`

### Step 4: Mark getSupplierIncomes as @deprecated

Add `@deprecated` JSDoc and `console.warn` per swagger `deprecated: true` flag. Note: endpoint will be removed on 11 March 2026.

### Step 5: Rename 6 Ambiguous Task Methods

Rename the auto-generated task status and download methods:
- `getTasksStatu` -> `getWarehouseRemainsTaskStatus`
- `getTasksStatu2` -> `getAcceptanceReportTaskStatus`
- `getTasksStatu3` -> `getPaidStorageTaskStatus`
- `getTasksDownload` -> `downloadWarehouseRemainsReport`
- `getTasksDownload2` -> `downloadAcceptanceReport`
- `getTasksDownload3` -> `downloadPaidStorageReport`

Keep old names as `@deprecated` wrapper methods that delegate to the new names.

### Step 6: Add Rate Limit Configuration Entries

Add 3 new entries to `src/config/reports-rate-limits.ts` for the new endpoints:

| Config Key | Limit | Interval | Burst |
|------------|-------|----------|-------|
| `reports.measurementPenalties` | 1 req/min | 60s | 1 |
| `reports.warehouseMeasurementsV2` | 1 req/min | 60s | 1 |
| `reports.deductions` | 1 req/min | 60s | 1 |

### Step 7: Add New Request Parameter Types

Add TypeScript interfaces for the query parameters of the 3 new endpoints:
- `MeasurementPenaltiesParams` — dateFrom?, dateTo, limit, offset?
- `WarehouseMeasurementsV2Params` — dateFrom?, dateTo, limit, offset?
- `DeductionsParams` — dateFrom?, dateTo, sort?, order?, limit, offset?

### Step 8: Add Unit Tests for New Methods

Create unit tests for all 3 new methods and deprecation behavior:
- Correct URL called
- Correct HTTP method (GET)
- Query parameters passed correctly
- Rate limit key wired
- Response type handling
- Deprecated wrapper delegation

### Step 9: Verify Build and Lint

Run `npx tsc --noEmit` and `npm run lint` to ensure zero errors.

### Step 10: Update Exports

Ensure all new types and renamed methods are properly exported from `src/types/reports.types.ts` and `src/modules/reports/index.ts`.

---

## Rate Limit Configuration for New Endpoints

All 3 new endpoints share the same rate limit (extracted from swagger descriptions):

| SDK Method | Config Key | Limit | Interval | Burst |
|------------|-----------|-------|----------|-------|
| `getMeasurementPenalties()` | `reports.measurementPenalties` | 1 req/min | 60s | 1 |
| `getWarehouseMeasurementsV2()` | `reports.warehouseMeasurementsV2` | 1 req/min | 60s | 1 |
| `getDeductions()` | `reports.deductions` | 1 req/min | 60s | 1 |

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/modules/reports/index.ts` (~506 lines, 26 methods) | Add 3 new methods, deprecate 4 methods, rename 6 methods with deprecated wrappers | High |
| `src/types/reports.types.ts` (~478 lines) | Add `DeductionsResponse`, `DeductionsReportItem`, `MeasurementPenaltiesParams`, `WarehouseMeasurementsV2Params`, `DeductionsParams` | Medium |
| `src/config/reports-rate-limits.ts` (26 entries) | Add 3 new rate limit entries | Low |
| `tests/unit/modules/reports.test.ts` | Create from scratch; tests for 3 new methods, deprecation wrappers, renamed methods | High |

---

## Success Criteria

- [x] `getMeasurementPenalties()` method added for `GET /api/analytics/v1/measurement-penalties` with proper typed params (dateFrom, dateTo, limit, offset) and response type
- [x] `getWarehouseMeasurementsV2()` method added for `GET /api/analytics/v1/warehouse-measurements` with proper typed params and response type
- [x] `getDeductions()` method added for `GET /api/analytics/v1/deductions` with proper typed params (dateFrom, dateTo, sort, order, limit, offset) and response type
- [x] `getAnalyticsWarehouseMeasurements()` marked `@deprecated` with `console.warn` and reference to new `getMeasurementPenalties` / `getWarehouseMeasurementsV2` / `getDeductions`
- [x] `getAnalyticsIncorrectAttachments()` marked `@deprecated` with `console.warn` (endpoint removed from swagger, replaced by `getDeductions`)
- [x] `getAnalyticsCharacteristicsChange()` marked `@deprecated` with `console.warn` AND base URL fixed from `api.wildberries.ru` to `seller-analytics-api.wildberries.ru`
- [x] `getSupplierIncomes()` marked `@deprecated` per swagger (`deprecated: true`; removal date: 11 March 2026)
- [x] Method naming improved: `getTasksStatu`/`2`/`3` renamed to `getWarehouseRemainsTaskStatus`/`getAcceptanceReportTaskStatus`/`getPaidStorageTaskStatus`; `getTasksDownload`/`2`/`3` renamed to `downloadWarehouseRemainsReport`/`downloadAcceptanceReport`/`downloadPaidStorageReport`
- [x] Backward compatibility maintained via `@deprecated` wrappers for all 6 renamed methods that delegate to the new names
- [x] All 3 new methods use correct base URL `https://seller-analytics-api.wildberries.ru` and pass `rateLimitKey` to BaseClient

---

## Implementation Notes

Completed on 2026-02-06.

### Changes Made
1. **3 new methods added**: getMeasurementPenalties(), getWarehouseMeasurementsV2(), getDeductions()
2. **4 deprecated methods**: getAnalyticsWarehouseMeasurements, getAnalyticsIncorrectAttachments, getAnalyticsCharacteristicsChange, getSupplierIncomes
3. **6 renamed methods**: getTasksStatu→getWarehouseRemainsTaskStatus, getTasksDownload→downloadWarehouseRemainsReport, etc.
4. **3 rate limit config entries** added for new endpoints
5. **10 deprecated wrappers** created for backward compatibility

### Files Modified
- `src/modules/reports/index.ts` (~839 lines, 35 methods)
- `src/types/reports.types.ts` (14 new types)
- `src/config/reports-rate-limits.ts` (3 new entries)

### Verification
- TypeScript compilation passes
- All 45 unit tests pass
- Integration tests deferred to task-48 (MSW v2.x localStorage issue)

---

## Risk Assessment

**Overall Risk**: MEDIUM

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| **Breaking changes from method renames** | Medium | High | Deprecated wrappers preserve backward compatibility; old method names still callable |
| **Deprecated methods still called by consumers** | Medium | Medium | `console.warn` alerts users at runtime; JSDoc `@deprecated` shows in IDE |
| **Base URL bug in characteristics-change** | Confirmed | Low | Fixed as part of deprecation; endpoint is removed anyway |
| **Type dependency on EPIC 43** | Low | Medium | EPIC 43 must complete first; types required for new response schemas |
| **3 stale methods calling removed endpoints** | High (already broken) | Medium | Deprecation + `console.warn` alerts users; methods will return API errors |
| **Supplier incomes removal (11 March 2026)** | Certain | Low | Deprecation marking gives consumers advance warning |

---

## Dependencies

| Type | Dependency | Reason |
|------|-----------|--------|
| **Hard** | EPIC 43 (task-43) | Reports Type & Schema Fixes must be completed first. New methods require updated `MeasurementPenalties`, `WHM` response types and new `DeductionsResponse` type. |
| **Blocks** | EPIC 45 (task-45) | Reports Code Quality depends on this EPIC completing first (JSDoc fixes, rate limit wiring, tests apply to all methods including new ones). |

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/12-reports.yaml` |
| Module source | `src/modules/reports/index.ts` (507 lines, 26 methods) |
| Rate limit config | `src/config/reports-rate-limits.ts` (26 entries) |
| Types | `src/types/reports.types.ts` (479 lines) |
| Unit tests | None (to be created) |
| Integration tests | None (to be created in EPIC 45) |
| Story 3.7 | `docs/stories/3.7.reports-generation-retrieval.md` |
| Story 4.4 | `docs/stories/4.4.reports-generation-retrieval.md` |
| QA Gate 3.7 | `docs/qa/gates/3.7-reports-generation-retrieval.yml` |
| QA Gate 4.4 | `docs/qa/gates/4.4-reports-generation-retrieval.yml` |
| EPIC 43 (prerequisite) | `docs/epics/EPIC_43_REPORTS_TYPE_SCHEMA_FIXES.md` (to be created) |
| EPIC 45 (blocked) | `docs/epics/EPIC_45_REPORTS_CODE_QUALITY.md` (to be created) |
| Backlog task | `backlog/tasks/task-44` |
