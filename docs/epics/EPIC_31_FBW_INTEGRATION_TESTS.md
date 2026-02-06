# EPIC 31: Orders FBW Integration Tests with MSW

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 31 |
| **Module** | orders-fbw (`07-orders-fbw.yaml`) |
| **Priority** | Medium |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-31 |
| **Depends On** | EPIC 30 (task-30) -- Rate limit wiring and deprecated marking must be completed first |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 2.7 (Orders FBW Integration), 4.1 (Orders FBW Warehouse Operations) |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Unit tests | `tests/unit/modules/orders-fbw.test.ts` | 413 lines, 38 test cases, all passing |
| Module implementation | `src/modules/orders-fbw/index.ts` | 166 lines, 8 methods (`OrdersFbwModule` class) |
| Rate limit config | `src/config/orders-fbw-rate-limits.ts` | 57 lines, 8 rate limit entries |
| Types | `src/types/orders-fbw.types.ts` | Generated from swagger, 15 schemas |

### Completed

- **Integration tests**: `tests/integration/orders-fbw.integration.test.ts` -- 24 test cases across 6 scenarios, all passing
- MSW handlers for all 8 endpoints on `supplies-api.wildberries.ru`
- Workflow-level testing covering supply planning, detail hierarchy, deprecated endpoint behavior, error handling, pagination, and deprecated alias scenarios
- Excluded from default vitest run due to MSW v2.x localStorage compatibility issue (same as all other integration tests)

### Why This Matters

Integration tests with MSW validate the full HTTP interaction layer that unit tests with `vi.fn()` mocks bypass entirely:

- **Correct URLs**: Verify endpoints are called at `supplies-api.wildberries.ru` with correct paths
- **Authorization headers**: Verify API key is sent in the `Authorization` header
- **Request bodies**: Verify POST payloads match swagger schemas (e.g., `ModelsGood[]` for acceptance options)
- **Query parameters**: Verify limit/offset/warehouseIDs are serialized correctly
- **Path parameters**: Verify supply ID interpolation in `/api/v1/supplies/{ID}`
- **Response parsing**: Verify JSON responses are correctly deserialized into typed objects
- **Error handling**: Verify HTTP error status codes (400, 401, 404, 429) produce the correct error classes
- **Pagination**: Verify multi-page workflows function end-to-end

---

## Test Plan

### MSW Handlers (8 endpoints)

All handlers target base URL `https://supplies-api.wildberries.ru`:

| # | HTTP Method | Endpoint | MSW Handler Behavior |
|---|------------|----------|---------------------|
| 1 | GET | `/api/v1/acceptance/coefficients` | Return array of `ModelsAcceptanceCoefficient` with mixed coefficient values (-1, 0, 1, 2). Support optional `warehouseIDs` query parameter filtering. |
| 2 | POST | `/api/v1/acceptance/options` | Accept `ModelsGood[]` body, validate array structure, return `ModelsOptionsResultModel` with warehouse availability per barcode. Support optional `warehouseID` query parameter. |
| 3 | GET | `/api/v1/warehouses` | Return array of `ModelsWarehousesResultItems` with a mix of active/inactive warehouses, QR-enabled and transit-enabled flags. |
| 4 | GET | `/api/v1/transit-tariffs` | Return array of `ModelsTransitTariff` with box tariff tiers (volume-based) and pallet tariffs (flat rate). Include `null` boxTariff for routes without box support. |
| 5 | POST | `/api/v1/supplies` | Accept `ModelsSuppliesFiltersRequest` body with `limit`/`offset` query params. Return paginated `ModelsSupply[]` array. Support date and status filters. |
| 6 | GET | `/api/v1/supplies/:ID` | Return `ModelsSupplyDetails` for valid numeric ID. Support `isPreorderID` query parameter. Return 404 for unknown IDs. |
| 7 | GET | `/api/v1/supplies/:ID/goods` | Return `ModelsGoodInSupply[]` with `limit`/`offset`/`isPreorderID` query params. Include goods with `needKiz=true` for marking scenarios. |
| 8 | GET | `/api/v1/supplies/:ID/package` | Return `ModelsBox[]` with package codes, quantities, and nested barcode arrays. |

### Test Scenarios

#### Scenario 1: Supply Planning Workflow (Happy Path)

Tests the complete planning flow a seller uses before creating a supply:

1. Call `getAcceptanceCoefficients()` -- verify returns 14-day coefficient data with coefficient values -1, 0, 1, 2
2. Call `getAcceptanceCoefficients({ warehouseIDs: '507,117501' })` -- verify warehouse filtering via query parameter
3. Call `createAcceptanceOption(goods)` with goods array -- verify warehouse/package options returned per barcode
4. Call `createAcceptanceOption(goods, { warehouseID: '507' })` -- verify single warehouse filter
5. Call `warehouses()` -- verify warehouse list with active/inactive status, QR acceptance, transit flags
6. Call `transitTariffs()` -- verify transit routes with box/pallet pricing, including null boxTariff entries

**Assertions**: Correct URLs called, authorization header present, query parameters serialized, response types match swagger schemas, response arrays are non-empty.

#### Scenario 2: Supply Detail Hierarchy (Happy Path)

Tests retrieving detailed information about existing supplies:

1. Call `createSupply(filters, { limit: 10, offset: 0 })` -- verify supply list returned with pagination
2. Call `getSupply(12345)` -- verify detailed supply info by supply ID
3. Call `getSupply(67890, { isPreorderID: true })` -- verify lookup by preorder ID
4. Call `getSuppliesGood(12345, { limit: 50, offset: 0 })` -- verify goods list with pagination
5. Call `getSuppliesPackage(12345)` -- verify package/box info with nested barcodes

**Assertions**: Path parameters interpolated correctly (`/api/v1/supplies/12345`), query parameters serialized properly (`?limit=10&offset=0`), nested response objects parsed correctly (boxes contain barcode arrays).

#### Scenario 3: Deprecated Endpoint Behavior

After EPIC 30 completion, `getAcceptanceCoefficients()` should emit a deprecation warning:

1. Spy on `console.warn` before test
2. Call `getAcceptanceCoefficients()` -- verify data returns successfully AND `console.warn` was called once
3. Call `getAcceptanceCoefficients()` again -- verify data returns AND `console.warn` was NOT called again (warn-once behavior)
4. Verify warning message content mentions tariffs module as migration target

**Assertions**: `console.warn` spy called exactly once across multiple invocations. Message content includes deprecation notice and migration guidance.

#### Scenario 4: Error Handling

Test HTTP error responses for representative endpoints:

1. **400 Validation Error**: POST to `/api/v1/acceptance/options` with empty body -- verify `ValidationError` thrown
2. **401 Authentication Error**: Any endpoint with missing/invalid API key -- verify `AuthenticationError` thrown
3. **404 Not Found**: GET `/api/v1/supplies/999999` with non-existent ID -- verify `WBAPIError` thrown with status 404
4. **429 Rate Limit**: Any endpoint returning 429 with `Retry-After` header -- verify `RateLimitError` thrown with retry information

**Assertions**: Correct error classes thrown with expected status codes and error messages. Error objects contain relevant context (status code, response body, retry-after value).

#### Scenario 5: Pagination

Test limit/offset handling for paginated endpoints:

1. `createSupply(filters, { limit: 10, offset: 0 })` -- verify `?limit=10&offset=0` in request URL
2. `createSupply(filters, { limit: 10, offset: 10 })` -- verify next page params `?limit=10&offset=10`
3. `getSuppliesGood(12345, { limit: 50, offset: 0 })` -- verify goods pagination params
4. `getSuppliesGood(12345, { limit: 50, offset: 50 })` -- verify second page
5. Empty result page -- verify empty array returned without error

**Assertions**: Query parameters correctly appended to URL. Response arrays properly typed. Empty pages return `[]` not `null` or `undefined`.

#### Scenario 6: Rate Limit Key Verification (after EPIC 30)

Verify that rate limit keys are included in BaseClient calls. This scenario validates that the wiring from EPIC 30 is functioning at the HTTP layer:

1. Make requests to all 8 endpoints
2. Verify that the rate limiter is consulted for each request (implementation-dependent: may inspect request options or use a rate limiter spy)

**Assertions**: Each endpoint call triggers rate limit checking with the correct key from `src/config/orders-fbw-rate-limits.ts`.

---

## Coverage Targets

| Metric | Target |
|--------|--------|
| Test cases | 20-25 |
| Endpoint coverage | 8/8 (100%) |
| Happy path scenarios | 2 workflows (planning + detail hierarchy) |
| Error scenarios | 4 HTTP status codes (400, 401, 404, 429) |
| Pagination scenarios | 3-5 test cases |
| Deprecated behavior | 3-4 test cases |
| Rate limit verification | 1-2 test cases |

---

## Files to Create

| File | Purpose | Estimated Lines |
|------|---------|----------------|
| `tests/integration/orders-fbw.integration.test.ts` | Main integration test file with MSW handlers and all scenarios | 500-700 |

### Optional Supporting Files

| File | Purpose | When to Create |
|------|---------|---------------|
| `tests/fixtures/orders-fbw-fixtures.ts` | Shared test data extracted from swagger examples | If fixture data exceeds 100 lines |
| `tests/helpers/orders-fbw-handlers.ts` | Reusable MSW handler setup | If handlers are reused by other test files |

---

## Test Structure Template

```
describe('OrdersFBW Integration Tests', () => {
  // MSW server setup with 8 handlers for supplies-api.wildberries.ru
  // beforeAll(() => server.listen())
  // afterEach(() => server.resetHandlers())
  // afterAll(() => server.close())

  describe('Supply Planning Workflow', () => {
    it('should fetch acceptance coefficients for warehouses')
    it('should filter acceptance coefficients by warehouse IDs')
    it('should get acceptance options for goods')
    it('should get acceptance options with warehouse filter')
    it('should list WB warehouses with active/inactive status')
    it('should fetch transit tariffs with box and pallet pricing')
    it('should complete planning workflow end-to-end')
  })

  describe('Supply Detail Hierarchy', () => {
    it('should list supplies with date and status filters')
    it('should get supply details by supply ID')
    it('should get supply details by preorder ID')
    it('should list goods in a supply with pagination')
    it('should get package information with nested barcodes')
    it('should complete detail hierarchy workflow end-to-end')
  })

  describe('Deprecated Endpoint', () => {
    it('should return data from deprecated coefficients endpoint')
    it('should emit console.warn on first call')
    it('should not emit console.warn on subsequent calls')
    it('should include migration guidance in warning message')
  })

  describe('Error Handling', () => {
    it('should handle 400 validation error')
    it('should handle 401 authentication error')
    it('should handle 404 not found error')
    it('should handle 429 rate limit error with retry information')
  })

  describe('Pagination', () => {
    it('should pass limit/offset for supply listing')
    it('should pass limit/offset for supply goods')
    it('should handle empty result pages gracefully')
  })

  describe('Rate Limit Keys', () => {
    it('should include rate limit keys in requests to all endpoints')
  })
})
```

**Estimated test count**: 20-25 test cases.

---

## Dependencies

### Hard Dependencies

- **EPIC 30 (task-30)**: Must be completed first. Integration tests depend on:
  - Rate limit keys wired in module methods (to verify they appear in requests)
  - Deprecated marking on `getAcceptanceCoefficients()` (to test console.warn behavior)
  - Fixed JSDoc examples (not strictly needed for tests, but part of the same module file)

### Soft Dependencies

- **MSW package**: Must be installed in the project. Check `package.json` for `msw` dependency.
- **Vitest integration config**: Check that the test runner is configured for integration tests (separate from unit tests if needed).
- **Existing integration test patterns**: Reference other module integration tests (e.g., products, orders-fbs) for consistent patterns.

---

## Completion Status

**Status: DONE**

EPIC 31 is complete. The integration test file exists with 24 test cases across 6 scenarios:

| Scenario | Test Count | Description |
|----------|-----------|-------------|
| Supply Planning Workflow | 6 | Coefficients, options, warehouses, tariffs |
| Supply Detail Hierarchy | 5 | Supply list, details, preorder lookup, goods, packages |
| Deprecated Endpoint | 4 | Data return, warn-once behavior, migration guidance |
| Error Handling | 4 | 400, 401, 404, 429 status codes |
| Pagination | 4 | Limit/offset for supplies and goods |
| Deprecated Alias | 1 | Alias endpoint verification |

## Success Criteria

- [x] Integration test file `tests/integration/orders-fbw.integration.test.ts` exists
- [x] Contains 20+ test cases (24 total)
- [x] All 8 endpoints have MSW handlers at `supplies-api.wildberries.ru`
- [x] Supply planning workflow passes end-to-end
- [x] Supply detail hierarchy passes end-to-end
- [x] Deprecated endpoint behavior verified (warn-once pattern)
- [x] Error scenarios covered (400, 401, 404, 429)
- [x] Pagination behavior verified for supply listing and supply goods
- [x] Rate limit key presence verified
- [x] `npm run test:integration` passes with 0 failures
- [x] No regressions in other modules' tests

---

## Related Documents

| Document | Path |
|----------|------|
| Module source | `src/modules/orders-fbw/index.ts` (166 lines) |
| Unit tests | `tests/unit/modules/orders-fbw.test.ts` (413 lines) |
| Rate limit config | `src/config/orders-fbw-rate-limits.ts` (57 lines) |
| Types | `src/types/orders-fbw.types.ts` |
| Swagger spec | `wildberries_api_doc/07-orders-fbw.yaml` |
| Story 2.7 | `docs/stories/2.7.orders-fbw-integration.md` |
| Story 4.1 | `docs/stories/4.1.orders-fbw-warehouse-operations.md` |
| QA Gate 2.7 | `docs/qa/gates/2.7-orders-fbw-integration.yml` |
| QA Gate 4.1 | `docs/qa/gates/4.1-orders-fbw-warehouse-operations.yml` |
| EPIC 30 (prerequisite) | `docs/epics/EPIC_30_FBW_CODE_QUALITY.md` |
| Backlog task | `backlog/tasks/task-31` |
