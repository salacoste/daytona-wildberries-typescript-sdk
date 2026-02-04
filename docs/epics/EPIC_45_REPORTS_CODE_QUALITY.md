# EPIC 45: Reports Code Quality — JSDoc, Rate Limits, Tests, Config Cleanup

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 45 |
| **Module** | Reports (`src/modules/reports/`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-45 |
| **Depends On** | EPIC 43 (task-43), EPIC 44 (task-44) |
| **Blocks** | None |
| **Source** | February 2026 Swagger Audit |
| **Swagger** | `wildberries_api_doc/12-reports.yaml` |
| **Related Stories** | 3.7, 4.4 |
| **Related QA Gates** | 3.7, 4.4 |
| **Related EPICs** | EPIC 43, EPIC 44 |

---

## Problem Statement

The February 2026 swagger audit identified critical code quality gaps in the 26-method reports module:

1. **26 JSDoc @example Bugs**: ALL 26 `@example` blocks reference `sdk.general.*` instead of `sdk.reports.*`. This is the same code generation template bug found across other modules (analytics: 13, tariffs: 4, communications: 26, promotion: 42, in-store-pickup: 16, orders-fbw: 8).

2. **0 Rate Limit Keys Wired**: `src/config/reports-rate-limits.ts` defines 26 entries but NONE of the 26 module methods pass `rateLimitKey` to BaseClient. Rate limits are defined but never enforced at runtime, putting users at risk of 429 errors and potential API blocks.

3. **3 New Endpoints Need Rate Limit Config**: The deductions endpoints (`getAnalyticsIncorrectAttachments`, `getAnalyticsGoodsLabeling`, and `getAnalyticsAntifraudDetails`) require accurate rate limit config entries matching their swagger specifications.

4. **2 Inaccurate Rate Limit Config Values**: `reports.postAnalyticsExciseReport` has `requestsPerMinute: 0` but swagger specifies 10 req/5h (30min interval, burst 10). `reports.analyticsAntifraudDetails` has `requestsPerMinute: 0` but swagger specifies 1 req/10min (10min interval, burst 10).

5. **1 Stale Config Entry**: `reports.analyticsCharacteristicsChange` — the `/api/v1/analytics/characteristics-change` path does NOT exist in `12-reports.yaml`. The module method `getAnalyticsCharacteristicsChange` points to `api.wildberries.ru` (a different domain), not the reports swagger domain. This config entry is dead weight.

6. **1 Missing @deprecated Marking**: `getSupplierIncomes` is marked `deprecated: true` in the swagger with a note it will be removed on March 11, but the SDK method has no `@deprecated` JSDoc tag or runtime deprecation warning.

7. **0 Unit Tests**: No unit test file exists for the reports module (0/26 methods tested).

8. **0 Integration Tests**: No integration test file exists for the reports module.

9. **0 @see Links**: No methods have `@see` links to official WB documentation at `https://dev.wildberries.ru/openapi/reports`.

---

## Detailed Gap Analysis

### Gap 1: JSDoc @example Bug (26 methods) — Severity: MEDIUM

All 26 methods have `@example` blocks referencing `sdk.general.*` instead of `sdk.reports.*`. This misleads IDE autocomplete and generated documentation.

| # | Method Name | Current @example Reference | Correct @example Reference |
|---|-------------|---------------------------|---------------------------|
| 1 | `getSupplierIncomes` | `sdk.general.getSupplierIncomes` | `sdk.reports.getSupplierIncomes` |
| 2 | `getSupplierStocks` | `sdk.general.getSupplierStocks` | `sdk.reports.getSupplierStocks` |
| 3 | `getSupplierOrders` | `sdk.general.getSupplierOrders` | `sdk.reports.getSupplierOrders` |
| 4 | `getSupplierSales` | `sdk.general.getSupplierSales` | `sdk.reports.getSupplierSales` |
| 5 | `createAnalyticsExciseReport` | `sdk.general.createAnalyticsExciseReport` | `sdk.reports.createAnalyticsExciseReport` |
| 6 | `warehouseRemains` | `sdk.general.warehouseRemains` | `sdk.reports.warehouseRemains` |
| 7 | `getTasksStatu` | `sdk.general.getTasksStatu` | `sdk.reports.getTasksStatu` |
| 8 | `getTasksDownload` | `sdk.general.getTasksDownload` | `sdk.reports.getTasksDownload` |
| 9 | `getAnalyticsWarehouseMeasurements` | `sdk.general.getAnalyticsWarehouseMeasurements` | `sdk.reports.getAnalyticsWarehouseMeasurements` |
| 10 | `getAnalyticsAntifraudDetails` | `sdk.general.getAnalyticsAntifraudDetails` | `sdk.reports.getAnalyticsAntifraudDetails` |
| 11 | `getAnalyticsIncorrectAttachments` | `sdk.general.getAnalyticsIncorrectAttachments` | `sdk.reports.getAnalyticsIncorrectAttachments` |
| 12 | `getAnalyticsGoodsLabeling` | `sdk.general.getAnalyticsGoodsLabeling` | `sdk.reports.getAnalyticsGoodsLabeling` |
| 13 | `getAnalyticsCharacteristicsChange` | `sdk.general.getAnalyticsCharacteristicsChange` | `sdk.reports.getAnalyticsCharacteristicsChange` |
| 14 | `acceptanceReport` | `sdk.general.acceptanceReport` | `sdk.reports.acceptanceReport` |
| 15 | `getTasksStatu2` | `sdk.general.getTasksStatu` | `sdk.reports.getTasksStatu2` |
| 16 | `getTasksDownload2` | `sdk.general.getTasksDownload` | `sdk.reports.getTasksDownload2` |
| 17 | `paidStorage` | `sdk.general.paidStorage` | `sdk.reports.paidStorage` |
| 18 | `getTasksStatu3` | `sdk.general.getTasksStatu` | `sdk.reports.getTasksStatu3` |
| 19 | `getTasksDownload3` | `sdk.general.getTasksDownload` | `sdk.reports.getTasksDownload3` |
| 20 | `getAnalyticsRegionSale` | `sdk.general.getAnalyticsRegionSale` | `sdk.reports.getAnalyticsRegionSale` |
| 21 | `getBrandShareBrands` | `sdk.general.getBrandShareBrands` | `sdk.reports.getBrandShareBrands` |
| 22 | `getBrandShareParentSubjects` | `sdk.general.getBrandShareParentSubjects` | `sdk.reports.getBrandShareParentSubjects` |
| 23 | `getAnalyticsBrandShare` | `sdk.general.getAnalyticsBrandShare` | `sdk.reports.getAnalyticsBrandShare` |
| 24 | `getBannedProductsBlocked` | `sdk.general.getBannedProductsBlocked` | `sdk.reports.getBannedProductsBlocked` |
| 25 | `getBannedProductsShadowed` | `sdk.general.getBannedProductsShadowed` | `sdk.reports.getBannedProductsShadowed` |
| 26 | `getAnalyticsGoodsReturn` | `sdk.general.getAnalyticsGoodsReturn` | `sdk.reports.getAnalyticsGoodsReturn` |

### Gap 2: Rate Limit Keys Not Wired (26 methods) — Severity: HIGH

The file `src/config/reports-rate-limits.ts` defines 25 rate limit entries, but NONE of the 26 module methods pass `rateLimitKey` to BaseClient. This means rate limits are defined but never enforced at runtime, putting users at risk of 429 errors and potential API blocks.

**Before** (current):
```typescript
async getSupplierIncomes(options?: { dateFrom: string }): Promise<IncomesItem[]> {
  return this.client.get<IncomesItem[]>(
    'https://statistics-api.wildberries.ru/api/v1/supplier/incomes',
    { params: options }
  );
}
```

**After** (required):
```typescript
async getSupplierIncomes(options?: { dateFrom: string }): Promise<IncomesItem[]> {
  return this.client.get<IncomesItem[]>(
    'https://statistics-api.wildberries.ru/api/v1/supplier/incomes',
    { params: options, rateLimitKey: 'reports.supplierIncomes' }
  );
}
```

All 26 methods need `rateLimitKey: 'reports.<key>'` added to their BaseClient options.

### Gap 3: Inaccurate Rate Limit Config Values (2 entries) — Severity: HIGH

Two config entries have values that do not match the swagger specification:

| Config Key | Current Value | Swagger Value | Issue |
|------------|---------------|---------------|-------|
| `reports.postAnalyticsExciseReport` | `requestsPerMinute: 0, intervalSeconds: 1800, burstLimit: 10` | 10 req/5h, 30min interval, burst 10 | `requestsPerMinute: 0` is incorrect; should be `2` (10 req / 5 hours = 2 req/hr, expressed per the config convention) |
| `reports.analyticsAntifraudDetails` | `requestsPerMinute: 0, intervalSeconds: 600, burstLimit: 10` | 1 req/10min, 10min interval, burst 10 | `requestsPerMinute: 0` is incorrect; should reflect 1 req/10min |

### Gap 4: Stale Config Entry (1 entry) — Severity: MEDIUM

`reports.analyticsCharacteristicsChange` has a config entry but the endpoint path `/api/v1/analytics/characteristics-change` does NOT exist in `12-reports.yaml`. The module method `getAnalyticsCharacteristicsChange` points to `https://api.wildberries.ru` (a completely different domain from any reports swagger server). This config entry should be removed or deprecated.

### Gap 5: Missing @deprecated Marking — Severity: HIGH

The swagger marks `GET /api/v1/supplier/incomes` as `deprecated: true` with the description: "Данный метод устарел. Он будет удалён 11 марта." However, the SDK method `getSupplierIncomes` has:
- No `@deprecated` JSDoc tag
- No runtime `console.warn()` deprecation notice
- No alternative method suggestion in the documentation

### Gap 6: Missing @see Links (26 methods) — Severity: LOW

All 26 methods lack `@see` links to official WB documentation. Links should point to the appropriate tag anchors on `https://dev.wildberries.ru/openapi/reports`.

| Swagger Tag | Methods | @see Link |
|-------------|---------|-----------|
| Основные отчёты | `getSupplierIncomes`, `getSupplierStocks`, `getSupplierOrders`, `getSupplierSales` | `https://dev.wildberries.ru/openapi/reports#tag/Osnovnye-otchyoty` |
| Отчёт о товарах c обязательной маркировкой | `createAnalyticsExciseReport` | `https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-tovarah-c-obyazatelnoj-markirovkoj` |
| Отчёт об остатках на складах | `warehouseRemains`, `getTasksStatu`, `getTasksDownload` | `https://dev.wildberries.ru/openapi/reports#tag/Otchyot-ob-ostatkah-na-skladah` |
| Отчёты об удержаниях | `getAnalyticsWarehouseMeasurements`, `getAnalyticsAntifraudDetails`, `getAnalyticsIncorrectAttachments`, `getAnalyticsGoodsLabeling`, `getAnalyticsCharacteristicsChange` | `https://dev.wildberries.ru/openapi/reports#tag/Otchyoty-ob-uderzhaniyah` |
| Платная приёмка | `acceptanceReport`, `getTasksStatu2`, `getTasksDownload2` | `https://dev.wildberries.ru/openapi/reports#tag/Platnaya-priyomka` |
| Платное хранение | `paidStorage`, `getTasksStatu3`, `getTasksDownload3` | `https://dev.wildberries.ru/openapi/reports#tag/Platnoe-hranenie` |
| Продажи по регионам | `getAnalyticsRegionSale` | `https://dev.wildberries.ru/openapi/reports#tag/Prodazhi-po-regionam` |
| Доля бренда в продажах | `getBrandShareBrands`, `getBrandShareParentSubjects`, `getAnalyticsBrandShare` | `https://dev.wildberries.ru/openapi/reports#tag/Dolya-brenda-v-prodazhah` |
| Скрытые товары | `getBannedProductsBlocked`, `getBannedProductsShadowed` | `https://dev.wildberries.ru/openapi/reports#tag/Skrytye-tovary` |
| Отчёт о возвратах и перемещении товаров | `getAnalyticsGoodsReturn` | `https://dev.wildberries.ru/openapi/reports#tag/Otchyot-o-vozvratah-i-peremeshenii-tovarov` |

### Gap 7: No Unit Tests (0/26 methods) — Severity: HIGH

No unit test file exists for the reports module. All 26 methods are untested. Tests should cover:
- Correct URL construction for each method
- Correct HTTP method (GET vs POST)
- Query parameter forwarding
- Path parameter interpolation (task_id-based methods)
- `rateLimitKey` assertion for every method
- Error handling for 401, 429, 400/422 responses

### Gap 8: No Integration Tests — Severity: HIGH

No integration test file exists for the reports module. MSW-based integration tests should cover all 10 endpoint categories with realistic request/response flows.

### Gap 9: No Async Task Workflow Tests — Severity: MEDIUM

The reports module has 3 async task workflows (warehouse remains, acceptance, paid storage), each consisting of create/poll/download steps. These multi-step workflows have no test coverage for the complete create-poll-download lifecycle.

### Gap 10: No Deductions Report Tests — Severity: MEDIUM

The 5 deductions endpoints (`getAnalyticsWarehouseMeasurements`, `getAnalyticsAntifraudDetails`, `getAnalyticsIncorrectAttachments`, `getAnalyticsGoodsLabeling`, `getAnalyticsCharacteristicsChange`) return different response shapes including the `Penalty | Measurement` union type. No tests validate these response type variations.

### Gap 11: No Edge Case Tests — Severity: MEDIUM

Missing test coverage for:
- **429 Rate Limit**: Verify `RateLimitError` is thrown with `retryAfter` value
- **Pagination**: `getSupplierOrders` and `getSupplierSales` with `flag` parameter variations
- **Union Response Types**: `getAnalyticsWarehouseMeasurements` returns `Penalty | Measurement` based on `tab` parameter
- **Empty Response Arrays**: Methods returning arrays should handle `[]` gracefully

### Gap 12: Missing Rate Limit Config Entry for goodsReturn — Severity: LOW

While `reports.analyticsGoodsReturn` exists in the current config (1 rpm, 60s interval, burst 10), its values should be verified against the swagger (1 req/1min, 1min interval, burst 10) to ensure accuracy. The config values appear correct for this entry.

---

## Implementation Approach

### Step 1: Fix JSDoc @example Blocks
Replace all 26 occurrences of `sdk.general.` with `sdk.reports.` in `src/modules/reports/index.ts`. Also fix the 3 duplicate method name references in examples (e.g., `getTasksStatu` should be `getTasksStatu2` for the acceptance report variant).

### Step 2: Add @deprecated to getSupplierIncomes
Add `@deprecated` JSDoc tag with deprecation notice and removal date (March 11). Add `console.warn()` runtime deprecation notice at method entry.

### Step 3: Add @see Links
Add `@see {@link https://dev.wildberries.ru/openapi/reports#tag/...}` to all 26 methods with the correct tag anchor for each endpoint category (see Gap 6 table).

### Step 4: Wire Rate Limit Keys
Add `rateLimitKey: 'reports.<key>'` to all 26 BaseClient calls using the corresponding config keys from `reports-rate-limits.ts`.

### Step 5: Fix Inaccurate Rate Limit Config Values
Update 2 config entries to match swagger specifications:
- `reports.postAnalyticsExciseReport`: Fix `requestsPerMinute` from `0` to correct value for 10 req/5h
- `reports.analyticsAntifraudDetails`: Fix `requestsPerMinute` from `0` to correct value for 1 req/10min

### Step 6: Remove Stale Config Entry
Remove `reports.analyticsCharacteristicsChange` — the endpoint path does not exist in the reports swagger. Document removal rationale.

### Step 7: Verify goodsReturn Config Accuracy
Confirm `reports.analyticsGoodsReturn` values (1 rpm, 60s, burst 10) match swagger. Add entry if missing or correct if inaccurate.

### Step 8: Create Unit Tests
Create `tests/unit/modules/reports.test.ts` with tests for all 26 methods covering:
- Correct URL construction
- HTTP method verification (GET/POST)
- Query/path parameter forwarding
- `rateLimitKey` assertion for every method
- `@deprecated` method warning

### Step 9: Create Integration Tests
Create `tests/integration/reports.integration.test.ts` with MSW handlers for all endpoint categories.

### Step 10: Add Async Task Workflow Tests
Add tests for the 3 create/poll/download workflows:
- Warehouse remains: `warehouseRemains` -> `getTasksStatu` -> `getTasksDownload`
- Acceptance: `acceptanceReport` -> `getTasksStatu2` -> `getTasksDownload2`
- Paid storage: `paidStorage` -> `getTasksStatu3` -> `getTasksDownload3`

### Step 11: Add Edge Case Tests
Add tests for 429 rate limit responses, union response type handling (`Penalty | Measurement`), empty array responses, and `flag` parameter variations.

### Step 12: Verify Build and Lint
Run `npx tsc --noEmit` and `npm run lint` to ensure zero errors.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/modules/reports/index.ts` | Fix 26 @example blocks, add 26 @see links, wire 26 rateLimitKeys, add @deprecated to getSupplierIncomes | High |
| `src/config/reports-rate-limits.ts` | Fix 2 inaccurate entries (excise, antifraud), remove 1 stale entry (characteristicsChange), verify goodsReturn | Low |
| `tests/unit/modules/reports.test.ts` | Create from scratch — all 26 methods | High |
| `tests/integration/reports.integration.test.ts` | Create from scratch — MSW-based for all categories | High |

---

## Test Categories

### 1. Basic Statistics Reports (4 endpoints)
- `getSupplierIncomes` — supplies data with dateFrom pagination
- `getSupplierStocks` — warehouse stock levels with dateFrom pagination
- `getSupplierOrders` — order data with flag parameter variations
- `getSupplierSales` — sales and returns data with flag parameter

### 2. Excise/Compliance Reports (1 endpoint)
- `createAnalyticsExciseReport` — POST with query params + optional request body

### 3. Warehouse Remains Async Workflow (3 endpoints)
- `warehouseRemains` — create task with groupBy/filter options
- `getTasksStatu` — poll task status by task_id
- `getTasksDownload` — download completed report by task_id

### 4. Deductions Reports (5 endpoints)
- `getAnalyticsWarehouseMeasurements` — union type Penalty | Measurement based on tab param
- `getAnalyticsAntifraudDetails` — weekly self-purchase deductions
- `getAnalyticsIncorrectAttachments` — incorrect attachment deductions (max 31 days)
- `getAnalyticsGoodsLabeling` — missing labeling penalties (max 31 days)
- `getAnalyticsCharacteristicsChange` — characteristics change penalties (max 31 days)

### 5. Acceptance Report Async Workflow (3 endpoints)
- `acceptanceReport` — create task with date range
- `getTasksStatu2` — poll task status
- `getTasksDownload2` — download acceptance report

### 6. Paid Storage Async Workflow (3 endpoints)
- `paidStorage` — create task (max 8 days)
- `getTasksStatu3` — poll task status
- `getTasksDownload3` — download paid storage report

### 7. Regional Sales (1 endpoint)
- `getAnalyticsRegionSale` — sales by country region (max 31 days)

### 8. Brand Share (3 endpoints)
- `getBrandShareBrands` — seller's brand list
- `getBrandShareParentSubjects` — parent categories for a brand (max 365 days)
- `getAnalyticsBrandShare` — brand share in sales (max 365 days)

### 9. Banned/Hidden Products (2 endpoints)
- `getBannedProductsBlocked` — blocked product cards with sort/order
- `getBannedProductsShadowed` — catalog-hidden products with sort/order

### 10. Goods Return (1 endpoint)
- `getAnalyticsGoodsReturn` — product returns report (max 31 days)

---

## Success Criteria

- [ ] All 26 `@example` blocks reference `sdk.reports.*` (not `sdk.general.*`)
- [ ] All 26 active methods pass correct `rateLimitKey` from reports-rate-limits config to BaseClient
- [ ] `getSupplierIncomes` has `@deprecated` JSDoc tag and runtime `console.warn()` deprecation notice
- [ ] Rate limit config for `postAnalyticsExciseReport` fixed to match swagger (10 req/5h, 30min interval, burst 10)
- [ ] Rate limit config for `analyticsAntifraudDetails` fixed to match swagger (1 req/10min, 10min interval, burst 10)
- [ ] Stale config entry `analyticsCharacteristicsChange` removed or deprecated
- [ ] Config entry for `analyticsGoodsReturn` verified accurate against swagger
- [ ] `@see` links added to all 26 methods pointing to official WB documentation tag anchors
- [ ] Unit tests created for all 26 methods (URL construction, HTTP method, params, rateLimitKey assertions)
- [ ] Integration tests created with MSW covering all 10 endpoint categories
- [ ] Async task workflow tests cover create/poll/download for warehouse remains, acceptance, paid storage
- [ ] All tests pass and `npx tsc --noEmit` + `npm run lint` exit 0

---

## Risk Assessment

**Overall Risk**: LOW-MEDIUM

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| Rate limit wiring changes runtime behavior | Low | Medium | Prevents 429 errors; correct per swagger specs |
| JSDoc changes are text-only | Very Low | Low | No runtime behavior change |
| Stale config removal could break references | Low | Low | Search for references before removing; method still exists |
| Inaccurate rate limit fixes change throttling | Low | Medium | Values now match swagger; users get correct throttling |
| @deprecated warning adds console output | Low | Low | Standard pattern; matches swagger deprecation notice |
| Integration test MSW handlers may not match API | Medium | Low | Validate against swagger examples and response schemas |
| getAnalyticsCharacteristicsChange points to wrong domain | Medium | Medium | Document that endpoint may not be in reports swagger; may need investigation in EPIC 43/44 |

---

## Dependencies

| Type | Dependency | Reason |
|------|-----------|--------|
| **Hard** | EPIC 43 (task-43) | Reports type and schema fixes must be completed first |
| **Hard** | EPIC 44 (task-44) | Reports structural fixes must be completed first |
| **Soft** | None | -- |

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/12-reports.yaml` |
| Module source | `src/modules/reports/index.ts` (507 lines, 26 methods) |
| Rate limit config | `src/config/reports-rate-limits.ts` (26 entries) |
| Types | `src/types/reports.types.ts` |
| Unit tests | None (to be created) |
| Integration tests | None (to be created) |
| Story 3.7 | `docs/stories/3.7.reports-generation-retrieval.md` |
| Story 4.4 | `docs/stories/4.4.reports-generation-retrieval.md` |
| QA Gate 3.7 | `docs/qa/gates/3.7-reports-generation-retrieval.yml` |
| QA Gate 4.4 | `docs/qa/gates/4.4-reports-generation-retrieval.yml` |
| EPIC 43 (prerequisite) | TBD — Reports type/schema fixes |
| EPIC 44 (prerequisite) | TBD — Reports structural fixes |
| Backlog task | `backlog/tasks/task-45 - Reports-Code-Quality-—-JSDoc,-Rate-Limits,-Tests,-Config-Cleanup.md` |
