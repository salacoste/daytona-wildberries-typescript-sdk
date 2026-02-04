# EPIC 47: Finances Code Quality — JSDoc, Rate Limits, Tests, Naming Fixes

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 47 |
| **Module** | Finances (`src/modules/finances/`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-47 |
| **Depends On** | EPIC 46 (task-46) — Finances Type & Parameter Fixes |
| **Blocks** | None |
| **Source** | February 2026 Swagger Audit |
| **Swagger** | `wildberries_api_doc/13-finances.yaml` |
| **Related Stories** | 3.1, 3.2, 7.9, 8.2 |
| **Related QA Gates** | 3.1, 3.2 |
| **Related EPICs** | EPIC 46 |

---

## Problem Statement

The February 2026 swagger audit identified extensive code quality issues in the 6-method finances module:

1. **6 JSDoc @example Bugs**: ALL 6 `@example` blocks reference `sdk.general.*` instead of `sdk.finances.*`. This is the same code generation template bug found across other modules (analytics: 13, tariffs: 4, communications: 26, reports: 26, promotion: 42, in-store-pickup: 16, orders-fbw: 8).

2. **0 Rate Limit Keys Wired**: `src/config/finances-rate-limits.ts` defines 6 entries but NONE of the 6 module methods pass `rateLimitKey` to BaseClient. Rate limits are defined but never enforced at runtime, putting users at risk of 429 errors and potential API blocks.

3. **1 Inaccurate Rate Limit Config Value**: `finances.postDocumentsDownloadAll` has `requestsPerMinute: 0` but swagger specifies 1 req/5min (5min interval, burst 5). The `requestsPerMinute: 0` is incorrect and should represent 1 req/5min.

4. **1 Rate Limit Key Naming Inconsistency**: The config key `finances.postDocumentsDownloadAll` does not match the actual method name `createDownloadAll`. Config keys should mirror method names for maintainability and debugging.

5. **1 Method Naming Casing Bug**: `getSupplierReportdetailbyperiod` uses incorrect casing — "detailbyperiod" should be "DetailByPeriod" per camelCase convention. The swagger `operationId` is `getSupplierReportDetailByPeriod`. Renaming requires a deprecated wrapper for backward compatibility.

6. **3 JSDoc Description Mismatches vs Swagger**: `acceptance` says "Платная приёмка" but swagger says "Операции на приёмке"; `trbx_id` says "Номер короба для платной приёмки" but swagger says "Номер короба для обработки товара"; `report_type` lists only 2 values (`1`, `2`) but swagger defines 4 values (`1`, `2`, `3`, `4`).

7. **3 Stale Method References in src/index.ts JSDoc**: The finances module JSDoc in `src/index.ts` references methods that do not exist: `getBalance()` (actual: `getAccountBalance()`), `getTransactions()` (actual: `getSupplierReportdetailbyperiod()`), and `getDocuments()` (actual: `getDocumentsList()` / `getDocumentsDownload()`).

8. **0 Unit Tests**: No unit test file exists for the finances module (0/6 methods tested).

9. **0 Integration Tests**: No integration test file exists for the finances module.

10. **0 @see Links**: No methods have `@see` links to official WB documentation at `https://dev.wildberries.ru/openapi/financial-reports-and-accounting`.

11. **2 Undocumented Parameter Co-Dependencies**: `getDocumentsList` has `sort`/`order` parameters that work together (specifying `order` without `sort` is meaningless), and `beginTime`/`endTime` parameters that define a date range and should be used as a pair. Neither co-dependency is documented in JSDoc.

12. **2 Extended JSDoc Fields Not From Swagger**: `delivery_method` in the types file has an extended JSDoc description with possible values not present in the swagger `description` field. `loyalty_id` and `loyalty_discount` include release notes metadata ("Added in API 13 January 2026, Release #433") that is not part of the swagger schema.

---

## Detailed Gap Analysis

### Gap 4 (CRITICAL): Rate Limit Keys Not Wired (6 methods) — Severity: CRITICAL

The file `src/config/finances-rate-limits.ts` defines 6 rate limit entries, but NONE of the 6 module methods pass `rateLimitKey` to BaseClient. This means rate limits are defined but never enforced at runtime.

**Before** (current):
```typescript
async getAccountBalance(): Promise<{ currency?: string; current?: number; for_withdraw?: number }> {
  return this.client.get<{ currency?: string; current?: number; for_withdraw?: number }>(
    'https://finance-api.wildberries.ru/api/v1/account/balance'
  );
}
```

**After** (required):
```typescript
async getAccountBalance(): Promise<{ currency?: string; current?: number; for_withdraw?: number }> {
  return this.client.get<{ currency?: string; current?: number; for_withdraw?: number }>(
    'https://finance-api.wildberries.ru/api/v1/account/balance',
    { rateLimitKey: 'finances.accountBalance' }
  );
}
```

All 6 methods need `rateLimitKey: 'finances.<key>'` added to their BaseClient options:

| # | Method | Config Key |
|---|--------|-----------|
| 1 | `getAccountBalance` | `finances.accountBalance` |
| 2 | `getSupplierReportdetailbyperiod` | `finances.supplierReportDetailByPeriod` |
| 3 | `getDocumentsCategories` | `finances.documentsCategories` |
| 4 | `getDocumentsList` | `finances.documentsList` |
| 5 | `getDocumentsDownload` | `finances.documentsDownload` |
| 6 | `createDownloadAll` | `finances.createDownloadAll` (after rename from `postDocumentsDownloadAll`) |

### Gap 5 (HIGH): No Unit or Integration Tests — Severity: HIGH

No test files exist for the finances module. All 6 methods are untested. Tests should cover:
- Correct URL construction for each method
- Correct HTTP method (GET vs POST)
- Query parameter forwarding
- `rateLimitKey` assertion for every method
- Error handling for 401, 429, 400/422 responses
- MSW-based integration tests for all 3 endpoint tags

### Gap 8 (HIGH): acceptance JSDoc Mismatch — Severity: HIGH

| Field | Current SDK JSDoc | Swagger Description |
|-------|-------------------|---------------------|
| `acceptance` | "Платная приёмка" | "Операции на приёмке" |

The SDK description implies the field relates only to paid acceptance, but the swagger description is broader: "Operations at acceptance" — covering all acceptance-related operations.

### Gap 9 (HIGH): trbx_id JSDoc Mismatch — Severity: HIGH

| Field | Current SDK JSDoc | Swagger Description |
|-------|-------------------|---------------------|
| `trbx_id` | "Номер короба для платной приёмки" | "Номер короба для обработки товара" |

The SDK description incorrectly scopes the field to paid acceptance. The swagger description is "Box number for goods processing" — a more general purpose.

### Gap 10 (HIGH): report_type JSDoc Incomplete — Severity: HIGH

| Field | Current SDK Values | Swagger Values |
|-------|-------------------|----------------|
| `report_type` | `1 \| 2` with descriptions for 2 values | `1 \| 2 \| 3 \| 4` — includes values `3` and `4` for Georgia buyout notifications |

**Current type definition**: `report_type?: 1 | 2`

**Swagger enum**: `[1, 2, 3, 4]` with description:
- `1` — standard
- `2` — buyout notification
- `3`, `4` — buyout notification for Georgia

The TypeScript union type and JSDoc must be updated to include all 4 values.

### Gap 12 (HIGH): postDocumentsDownloadAll requestsPerMinute: 0 — Severity: HIGH

| Config Key | Current Value | Swagger Value | Issue |
|------------|---------------|---------------|-------|
| `finances.postDocumentsDownloadAll` | `requestsPerMinute: 0, intervalSeconds: 300, burstLimit: 5` | 1 req/5min, 5min interval, burst 5 | `requestsPerMinute: 0` is incorrect; should represent 1 req/5min |

### Gap 13 (MEDIUM): JSDoc @example Bug (6 methods) — Severity: MEDIUM

All 6 methods have `@example` blocks referencing `sdk.general.*` instead of `sdk.finances.*`. This misleads IDE autocomplete and generated documentation.

| # | Method Name | Current @example Reference | Correct @example Reference |
|---|-------------|---------------------------|---------------------------|
| 1 | `getAccountBalance` | `sdk.general.getAccountBalance` | `sdk.finances.getAccountBalance` |
| 2 | `getSupplierReportdetailbyperiod` | `sdk.general.getSupplierReportdetailbyperiod` | `sdk.finances.getSupplierReportDetailByPeriod` |
| 3 | `getDocumentsCategories` | `sdk.general.getDocumentsCategories` | `sdk.finances.getDocumentsCategories` |
| 4 | `getDocumentsList` | `sdk.general.getDocumentsList` | `sdk.finances.getDocumentsList` |
| 5 | `getDocumentsDownload` | `sdk.general.getDocumentsDownload` | `sdk.finances.getDocumentsDownload` |
| 6 | `createDownloadAll` | `sdk.general.createDownloadAll` | `sdk.finances.createDownloadAll` |

### Gap 14 (MEDIUM): Stale Method References in src/index.ts JSDoc — Severity: MEDIUM

The `src/index.ts` finances module JSDoc block references methods that do not exist in the module:

| Stale Reference | Actual Method |
|-----------------|---------------|
| `sdk.finances.getBalance()` | `sdk.finances.getAccountBalance()` |
| `sdk.finances.getTransactions({...})` | `sdk.finances.getSupplierReportDetailByPeriod({...})` |
| `sdk.finances.getDocuments()` | `sdk.finances.getDocumentsList()` / `sdk.finances.getDocumentsDownload()` |

### Gap 15 (MEDIUM): Method Naming Casing Bug — Severity: MEDIUM

| Current Method Name | Correct camelCase Name | Swagger operationId |
|--------------------|------------------------|---------------------|
| `getSupplierReportdetailbyperiod` | `getSupplierReportDetailByPeriod` | `getSupplierReportDetailByPeriod` |

Renaming requires a deprecated wrapper for backward compatibility:
```typescript
/** @deprecated Use getSupplierReportDetailByPeriod instead */
async getSupplierReportdetailbyperiod(...args) {
  return this.getSupplierReportDetailByPeriod(...args);
}
```

### Gap 16 (MEDIUM): Missing @see Links (6 methods) — Severity: MEDIUM

All 6 methods lack `@see` links to official WB documentation. Links should point to the appropriate tag anchors:

| Swagger Tag | Methods | @see Link |
|-------------|---------|-----------|
| Баланс | `getAccountBalance` | `https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Balans` |
| Финансовые отчёты | `getSupplierReportDetailByPeriod` | `https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Finansovye-otchyoty` |
| Документы | `getDocumentsCategories`, `getDocumentsList`, `getDocumentsDownload`, `createDownloadAll` | `https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/Dokumenty` |

### Gap 17 (MEDIUM): delivery_method Extended JSDoc Not From Swagger — Severity: MEDIUM

The `delivery_method` field in `finances.types.ts` has an extended JSDoc comment listing possible values (`FBS`, `FBW`, `DBS`) that are not present in the swagger `description` field. The swagger only specifies: `type: string`. While the extended documentation may be useful, it should be clearly marked as supplementary information.

### Gap 18 (MEDIUM): loyalty_id/loyalty_discount Extended JSDoc With Release Notes — Severity: MEDIUM

The `loyalty_id` and `loyalty_discount` fields include release notes metadata ("Added in API 13 January 2026, Release #433") that is not part of the swagger schema description. This metadata may become stale and should be removed or moved to a changelog.

### Gap 19 (MEDIUM): Rate Limit Key Naming Inconsistency — Severity: MEDIUM

| Config Key | Method Name | Issue |
|------------|-------------|-------|
| `finances.postDocumentsDownloadAll` | `createDownloadAll` | Key uses HTTP verb prefix `post` instead of matching method name |

The key should be renamed to `finances.createDownloadAll` for consistency with the method name.

### Gap 20 (LOW): Swagger Rate Limit Notation Inconsistency — Severity: LOW

The swagger uses inconsistent time notation across endpoints: some use abbreviated form ("1 мин", "10 сек", "5 мин") while the reports endpoints use full form ("1 минута", "10 секунд"). This is a swagger authoring inconsistency, not an SDK bug, but it complicates automated rate limit extraction.

### Gap 24 (LOW): sort/order Co-Dependency Not Documented — Severity: LOW

The `getDocumentsList` method accepts `sort` and `order` parameters. Specifying `order` without `sort` has no effect. This co-dependency is not documented in the method JSDoc.

### Gap 25 (LOW): beginTime/endTime Co-Dependency Not Documented — Severity: LOW

The `getDocumentsList` method accepts `beginTime` and `endTime` parameters that define a date range. These parameters should be used together for meaningful filtering. This co-dependency is not documented in the method JSDoc.

---

## Rate Limit Detail

All 6 endpoints with their swagger-specified rate limits:

| # | Method | Endpoint | Swagger Rate Limit | Config Key | Config Correct? |
|---|--------|----------|-------------------|------------|-----------------|
| 1 | `getAccountBalance` | `GET /api/v1/account/balance` | 1 req/1min, 1min interval, burst 1 | `finances.accountBalance` | Yes |
| 2 | `getSupplierReportDetailByPeriod` | `GET /api/v5/supplier/reportDetailByPeriod` | 1 req/1min, 1min interval, burst 1 | `finances.supplierReportDetailByPeriod` | Yes |
| 3 | `getDocumentsCategories` | `GET /api/v1/documents/categories` | 1 req/10sec, 10sec interval, burst 5 | `finances.documentsCategories` | Yes |
| 4 | `getDocumentsList` | `GET /api/v1/documents/list` | 1 req/10sec, 10sec interval, burst 5 | `finances.documentsList` | Yes |
| 5 | `getDocumentsDownload` | `GET /api/v1/documents/download` | 1 req/10sec, 10sec interval, burst 5 | `finances.documentsDownload` | Yes |
| 6 | `createDownloadAll` | `POST /api/v1/documents/download/all` | 1 req/5min, 5min interval, burst 5 | `finances.postDocumentsDownloadAll` | No — `requestsPerMinute: 0` and key name mismatch |

**Base URLs** (3 distinct domains):
- `https://finance-api.wildberries.ru` — Balance endpoint
- `https://statistics-api.wildberries.ru` — Financial reports endpoint
- `https://documents-api.wildberries.ru` — Documents endpoints (4 methods)

---

## Implementation Approach

### Step 1: Fix JSDoc @example Blocks
Replace all 6 occurrences of `sdk.general.` with `sdk.finances.` in `src/modules/finances/index.ts`. Update the renamed method's example to use the new camelCase name.

### Step 2: Wire Rate Limit Keys
Add `rateLimitKey: 'finances.<key>'` to all 6 BaseClient calls using the corresponding config keys from `finances-rate-limits.ts`.

### Step 3: Fix Rate Limit Config for postDocumentsDownloadAll
Update `finances.postDocumentsDownloadAll` entry: change `requestsPerMinute: 0` to `requestsPerMinute: 1` and ensure `intervalSeconds: 300` (5 minutes) is correct. The rate limiter uses the combination of `requestsPerMinute` and `intervalSeconds` to enforce 1 request per 5-minute window. A value of `0` is invalid and could cause division-by-zero or no-op behavior.

### Step 4: Rename Rate Limit Key
Rename config key from `finances.postDocumentsDownloadAll` to `finances.createDownloadAll` to match the actual method name.

### Step 5: Rename Method — getSupplierReportdetailbyperiod
Rename `getSupplierReportdetailbyperiod` to `getSupplierReportDetailByPeriod` with proper camelCase. Add a deprecated wrapper method preserving the old name for backward compatibility:
```typescript
/** @deprecated Use getSupplierReportDetailByPeriod instead. Will be removed in v3.0.0. */
async getSupplierReportdetailbyperiod(
  options: { dateFrom: string; dateTo: string; limit?: number; rrdid?: number; period?: 'weekly' | 'daily' }
): Promise<DetailReportItem[]> {
  return this.getSupplierReportDetailByPeriod(options);
}
```

### Step 6: Fix JSDoc Descriptions for acceptance, trbx_id, report_type
Update `src/types/finances.types.ts`:
- `acceptance`: Change "Платная приёмка" to "Операции на приёмке"
- `trbx_id`: Change "Номер короба для платной приёмки" to "Номер короба для обработки товара"
- `report_type`: Update JSDoc descriptions to cover all 4 values (1=standard, 2=buyout notification, 3/4=buyout notification for Georgia). Note: the type union expansion from `1 | 2` to `1 | 2 | 3 | 4` is already handled by EPIC 46 (task-46 AC#1); this step only updates the JSDoc text

### Step 7: Add @see Links
Add `@see {@link https://dev.wildberries.ru/openapi/financial-reports-and-accounting#tag/...}` to all 6 methods with the correct tag anchor for each endpoint category (see Gap 16 table).

### Step 8: Remove Stale Method References from src/index.ts JSDoc
Update the finances module JSDoc block in `src/index.ts` to reference actual method names:
- `getBalance()` -> `getAccountBalance()`
- `getTransactions({...})` -> `getSupplierReportDetailByPeriod({...})`
- `getDocuments()` -> `getDocumentsList()` / `getDocumentsDownload()`

### Step 9: Document Parameter Co-Dependencies in getDocumentsList JSDoc
Add JSDoc notes for:
- `sort`/`order`: Specifying `order` without `sort` has no effect; use together
- `beginTime`/`endTime`: Define a date range filter; should be used as a pair

### Step 10: Create Unit Tests
Create `tests/unit/modules/finances.test.ts` with tests for all 6 methods covering:
- Correct URL construction (including 3 different base URL domains)
- HTTP method verification (GET for 5 methods, POST for 1)
- Query/path parameter forwarding
- `rateLimitKey` assertion for every method
- Deprecated method wrapper behavior

### Step 11: Create Integration Tests
Create `tests/integration/finances.integration.test.ts` with MSW handlers covering all 3 endpoint tags:
- Balance: `getAccountBalance`
- Financial reports: `getSupplierReportDetailByPeriod`
- Documents: `getDocumentsCategories`, `getDocumentsList`, `getDocumentsDownload`, `createDownloadAll`

### Step 12: Verify Build and Lint
Run `npx tsc --noEmit` and `npm run lint` to ensure zero errors. Run all tests to confirm passing.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/modules/finances/index.ts` | Fix 6 @example blocks, wire 6 rateLimitKeys, add 6 @see links, rename method with deprecated wrapper, document parameter co-dependencies | High |
| `src/types/finances.types.ts` | Fix JSDoc for acceptance, trbx_id, report_type; align delivery_method/loyalty JSDoc with swagger | Low |
| `src/config/finances-rate-limits.ts` | Fix postDocumentsDownloadAll requestsPerMinute and rename key | Low |
| `src/index.ts` | Remove stale JSDoc method references (getBalance, getTransactions, getDocuments) | Low |
| `tests/unit/modules/finances.test.ts` | Create from scratch — all 6 methods + deprecated wrapper | High |
| `tests/integration/finances.integration.test.ts` | Create from scratch — MSW-based for all 3 endpoint tags | High |

---

## Test Categories

### 1. Balance (1 endpoint)
- `getAccountBalance` — seller balance data from finance-api domain

### 2. Financial Reports (1 endpoint)
- `getSupplierReportDetailByPeriod` — detailed sales realization report with dateFrom/dateTo pagination, period selection (weekly/daily), and rrdid cursor from statistics-api domain

### 3. Documents — Categories (1 endpoint)
- `getDocumentsCategories` — document category list with optional locale parameter from documents-api domain

### 4. Documents — List (1 endpoint)
- `getDocumentsList` — document list with sort/order, beginTime/endTime date range, category/serviceName filtering, and limit/offset pagination from documents-api domain

### 5. Documents — Single Download (1 endpoint)
- `getDocumentsDownload` — single document download by serviceName and extension format from documents-api domain

### 6. Documents — Batch Download (1 endpoint)
- `createDownloadAll` — POST to download multiple documents by serviceName/extension pairs from documents-api domain

---

## Success Criteria

- [x] All 6 `@example` blocks reference `sdk.finances.*` (not `sdk.general.*`)
- [x] All 6 methods pass correct `rateLimitKey` from finances-rate-limits config to BaseClient
- [x] Rate limit config for `postDocumentsDownloadAll` fixed from `requestsPerMinute: 0` to correct value representing 1 req/5min
- [x] Rate limit key renamed from `postDocumentsDownloadAll` to `createDownloadAll` to match method name
- [x] Method `getSupplierReportdetailbyperiod` renamed to `getSupplierReportDetailByPeriod` with deprecated wrapper for backward compatibility
- [x] JSDoc for `DetailReportItem.acceptance` fixed from "Платная приёмка" to "Операции на приёмке" per swagger
- [x] JSDoc for `DetailReportItem.trbx_id` fixed from "Номер короба для платной приёмки" to "Номер короба для обработки товара" per swagger
- [x] JSDoc for `report_type` updated with descriptions for all 4 enum values (1, 2, 3, 4) per swagger
- [x] `@see` links added to all 6 methods pointing to official WB documentation tag anchors
- [x] Stale method references in `src/index.ts` JSDoc removed (`getBalance`, `getTransactions`, `getDocuments`)
- [x] Unit tests created for all 6 methods (minimum 6 tests covering URL, HTTP method, params, rateLimitKey)
- [x] Integration tests created with MSW covering all 3 endpoint tags (balance, reports, documents)
- [x] Parameter co-dependency constraints documented in JSDoc: `sort`/`order` and `beginTime`/`endTime` for `getDocumentsList`
- [x] All tests pass and `npx tsc --noEmit` + `npm run lint` exit 0

---

## Risk Assessment

**Overall Risk**: LOW-MEDIUM

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Method rename breaks existing consumer code | Medium | Medium | Deprecated wrapper preserves old method name; migration path documented |
| Rate limit wiring changes runtime behavior | Low | Medium | Prevents 429 errors; correct per swagger specs |
| JSDoc changes are text-only | Very Low | Low | No runtime behavior change |
| Rate limit config key rename could break references | Low | Low | Search for references before renaming; old key removed atomically with new key addition |
| report_type JSDoc update (add values 3/4 descriptions) | Low | Low | Documentation-only change; type union already done by EPIC 46 |
| Integration test MSW handlers may not match API | Medium | Low | Validate against swagger examples and response schemas |
| Deprecated wrapper adds minor runtime overhead | Very Low | Very Low | Simple delegation; negligible performance impact |

---

## Dependencies

| Type | Dependency | Reason |
|------|-----------|--------|
| **Hard** | EPIC 46 (task-46) | Finances type and parameter fixes must be completed first |
| **Soft** | None | -- |

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/13-finances.yaml` |
| Module source | `src/modules/finances/index.ts` (~126 lines, 6 methods) |
| Rate limit config | `src/config/finances-rate-limits.ts` (6 entries) |
| Types | `src/types/finances.types.ts` (~252 lines, 6 interfaces) |
| Main SDK entry | `src/index.ts` (stale JSDoc references at lines 188-199) |
| Unit tests | None (to be created) |
| Integration tests | None (to be created) |
| Story 3.1 | `docs/stories/3.1.finances-balance-transactions.md` |
| Story 3.2 | `docs/stories/3.2.finances-reports-payouts.md` |
| Story 7.9 | `docs/stories/7.9.finances-implementation-analysis.md` |
| Story 8.2 | `docs/stories/8.2.finances-delivery-method-field.md` |
| QA Gate 3.1 | `docs/qa/gates/3.1-finances-balance-transactions.yml` |
| QA Gate 3.2 | `docs/qa/gates/3.2-finances-reports-payouts.yml` |
| EPIC 46 (prerequisite) | Finances Type & Parameter Fixes |
| Backlog task | `backlog/tasks/task-47 - Finances-Code-Quality-—-JSDoc,-Rate-Limits,-Tests,-Naming-Fixes.md` |
