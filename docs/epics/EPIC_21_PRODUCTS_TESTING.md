# Epic 21: Products Module Test Coverage -- Target 80%

**Epic Goal**: Raise Products module test coverage from 21.3% (10/47 methods) to 80%+ (38+/47 methods), unblock all skipped integration tests, and generate test fixtures from Swagger schema examples.

**Target Completion**: Epic 21.x (Stories 21.1-21.5)

**Business Value**:
- Products module is the highest-traffic SDK module (categories, cards, pricing, stock)
- 37 methods currently have ZERO test coverage -- any regression ships undetected
- 18 integration tests are completely skipped, providing no validation of real HTTP flows
- 80%+ coverage enables confident releases and refactoring (Epics 19, 20)

---

## Epic 21 Overview

### Strategic Context

**Current Test State:**

| Metric | Value | Target |
| --- | --- | --- |
| Methods with unit tests | 10 / 47 (21.3%) | 38+ / 47 (80%+) |
| Unit test cases | 63 | ~200+ |
| Integration tests | 18 (ALL SKIPPED) | 18+ (ALL RUNNING) |
| Methods with zero coverage | 37 | <=9 |

**Test Files:**
- Unit tests: `tests/unit/modules/products-crud-critical.test.ts` -- 63 test cases covering 10 CRUD methods
- Integration tests: `tests/integration/products-categories.integration.test.ts` -- 18 tests, ALL inside `describe.skip`

**Why Tests Are Skipped:**
The integration test file documents the blocker at line 1:
```
@skip MSW v2.x localStorage compatibility issue

MSW's CookieStore accesses localStorage.getItem() during import,
before any test setup can polyfill it.
```

Workarounds attempted and failed:
- `setupFiles` with polyfill (runs after imports)
- `globalSetup` (separate process, does not share globals)
- `vitest.config.ts` top-level polyfill (main process only)
- `--require`/`--import` preload (not inherited by workers)
- `jsdom` environment (still imports before environment setup)

### Technical Context

**Module File**: `src/modules/products/index.ts` (47 methods, ~940 lines)
**Swagger Source**: `wildberries_api_doc/02-products/*.yaml`

**Existing Test Pattern** (from `products-crud-critical.test.ts`):
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProductsModule } from '../../../src/modules/products';
import type { BaseClient } from '../../../src/client/base-client';

describe('ProductsModule - Critical CRUD Operations', () => {
  let mockClient: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
    put: ReturnType<typeof vi.fn>;
    patch: ReturnType<typeof vi.fn>;
    delete: ReturnType<typeof vi.fn>;
  };

  let productsModule: ProductsModule;

  beforeEach(() => {
    mockClient = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    };
    productsModule = new ProductsModule(mockClient as unknown as BaseClient);
  });
```

### Dependencies

**Depends On:**
- task-16 (Epic 19: Products Module Type Safety) - Typed methods before writing typed tests
- task-17 (Epic 20: Products Module Method Naming) - Correct method names before writing tests against them

---

## Story Breakdown

### Story 21.1: Unblock Integration Tests -- MSW Compatibility Fix (CRITICAL)

**Priority**: CRITICAL - 18 tests completely skipped
**Estimated Complexity**: HIGH
**Story Points**: 5

**Description**: Resolve the MSW v2.x `localStorage` compatibility issue that causes all integration tests to be skipped. MSW's `CookieStore` accesses `localStorage.getItem()` during module import, before any test environment setup can polyfill it.

**Investigation Paths**:
1. **happy-dom environment**: Switch Vitest environment from `node` to `happy-dom` which provides `localStorage` natively
2. **MSW v3 upgrade**: Check if MSW v3.x resolves the Node.js `localStorage` issue
3. **Vitest `pool` configuration**: Use `--pool=forks` instead of `--pool=threads` to allow `globalSetup` to share globals
4. **Custom Vitest plugin**: Write a Vitest plugin that injects `localStorage` polyfill before any imports
5. **Selective MSW import**: Use `msw/node` with a custom setup that avoids `CookieStore`

**Acceptance Criteria**:
1. `describe.skip` removed from integration test file
2. All 18 existing integration tests pass in CI
3. MSW server setup works in Node.js test environment
4. Solution documented for other modules to follow
5. No performance regression in test execution time

---

### Story 21.2: Tier 1 Unit Tests -- Business-Critical Methods (CRITICAL)

**Priority**: CRITICAL - Core product lifecycle operations
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Add comprehensive unit tests for the most business-critical methods that handle product card creation, updates, and media management.

**Tier 1 Methods**:
| Method | Line | HTTP | Description |
| --- | --- | --- | --- |
| `createCardsList()` / `getCardsList()` | 296 | `POST` | List product cards with cursor pagination |
| `createUploadAdd()` | 510 | `POST` | Add variants to existing product cards |
| `createMediaFile()` | 528 | `POST` | Upload product media files |
| `createMediaSave()` | 547 | `POST` | Save uploaded media to product card |

**Test Cases Per Method**:
- Happy path with valid response
- Error handling (401, 403, 429, 400/422)
- Edge cases (empty data, max limits, null fields)
- Cursor pagination validation (max 100 cards limit for `createCardsList`)
- Type verification of request/response shapes

**Acceptance Criteria**:
1. All 4 Tier 1 methods have comprehensive unit tests
2. Each method has minimum 5 test cases (happy, auth error, rate limit, validation, edge case)
3. Cursor limit validation tested for `createCardsList` (max 100)
4. Tests follow existing pattern from `products-crud-critical.test.ts`
5. All tests pass with no skips

---

### Story 21.3: Tier 2 Unit Tests -- Pricing & Discounts (HIGH)

**Priority**: HIGH - Financial impact methods
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Add unit tests for pricing, task management, and goods filtering methods that affect product pricing and visibility.

**Tier 2 Methods**:
| Method | Line | HTTP | Description |
| --- | --- | --- | --- |
| `createUploadTask()` | 565 | `POST` | Upload pricing task |
| `createTaskSize()` | 583 | `POST` | Size-based pricing task |
| `createTaskClubDiscount()` | 601 | `POST` | Club discount task |
| `getGoodsFilter()` | 696 | `GET` | Filter goods list |
| `createGoodsFilter()` | 714 | `POST` | Create goods filter |
| `getQuarantineGoods()` | 752 | `GET` | Quarantined goods list |

**Acceptance Criteria**:
1. All 6 Tier 2 methods have unit tests
2. Each method has minimum 3 test cases (happy, error, edge case)
3. Typed request/response handling verified
4. Pagination parameters tested where applicable
5. All tests pass with no skips

---

### Story 21.4: Tier 3 Unit Tests -- Warehouse & Stock (HIGH)

**Priority**: HIGH - Inventory management
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Add unit tests for warehouse and stock management methods. Note that method names may change under Epic 20 (typo fixes and renames) -- tests should target the corrected names.

**Tier 3 Methods**:
| Method | Current Name | Expected Name (post-Epic 20) | HTTP | Description |
| --- | --- | --- | --- | --- |
| Stock read | `createStock()` | `getStocks()` | `POST` | Read stock levels |
| Stock update | `updateStock()` | `updateStock()` | `PUT` | Update stock quantities |
| Stock delete | `deleteStock()` | `deleteStock()` | `DELETE` | Delete stock records |
| Warehouse create | `createWarehous()` | `createWarehouse()` | `POST` | Create seller warehouse |
| Warehouse update | `updateWarehous()` | `updateWarehouse()` | `PUT` | Update warehouse config |
| Warehouse delete | `deleteWarehous()` | `deleteWarehouse()` | `DELETE` | Delete warehouse |

**Acceptance Criteria**:
1. All 6 Tier 3 methods have unit tests (using corrected names from Epic 20)
2. CRUD lifecycle tested: create -> read -> update -> delete
3. Path parameter handling verified (`warehouseId` in URL)
4. 409 conflict error handling tested (counts as 10 requests per rate limit rules)
5. All tests pass with no skips

---

### Story 21.5: Tier 4 Unit Tests & Test Fixtures (MEDIUM)

**Priority**: MEDIUM - Read-only methods and infrastructure
**Estimated Complexity**: MEDIUM
**Story Points**: 5

**Description**: Add unit tests for remaining read-only methods (directories, tags, task history) and generate reusable test fixtures from Swagger `_schemas.yaml` example values.

**Tier 4 Methods**:
| Method | HTTP | Description |
| --- | --- | --- |
| `getContentTags()` | `GET` | Product tags list |
| `getCardsLimits()` | `GET` | Card creation limits |
| `getDirectoryColors()` | `GET` | Color directory |
| `getDirectoryKinds()` | `GET` | Product kinds |
| `getDirectoryCountries()` | `GET` | Country directory |
| `getDirectorySeasons()` | `GET` | Season directory |
| `getDirectoryVat()` | `GET` | VAT rates |
| `getDirectoryTnved()` | `GET` | TNVED codes |
| `getParentAll()` | `GET` | Parent categories |
| `getObjectAll()` | `GET` | Object categories |
| `getObjectCharc()` | `GET` | Object characteristics |
| `getHistoryTasks()` | `GET` | Upload task history |
| `getGoodsTask()` | `GET` | Goods task status |
| `getBufferTasks()` | `GET` | Buffer task status |
| `getGoodsTask2()` / `getBufferGoodsTask()` | `GET` | Buffer goods task |
| `getSizeNm()` | `GET` | Size nomenclature |

**Test Fixture Generation**:
- Parse `wildberries_api_doc/02-products/*_schemas.yaml` for `examples` sections
- Generate TypeScript fixture files in `tests/fixtures/products/`
- Fixtures provide realistic response data for both unit and integration tests
- Reuse across all Products test files

**Acceptance Criteria**:
1. All 16 Tier 4 methods have unit tests (minimum 2 test cases each)
2. Test fixtures generated from Swagger schema examples
3. Fixtures stored in `tests/fixtures/products/` as TypeScript exports
4. Directory methods tested with locale parameter handling
5. Query parameter serialization verified for paginated methods
6. All tests pass with no skips
7. Overall Products module coverage reaches 80%+

---

## Implementation Strategy

### Phase 1: Unblock Integration Tests (Story 21.1)
**Timeline**: 2-3 days
**Focus**: Resolve MSW v2.x `localStorage` blocker
**Dependencies**: None (can start immediately)

### Phase 2: Tier 1 Tests (Story 21.2)
**Timeline**: 2 days
**Focus**: Business-critical card and media methods
**Dependencies**: task-16 complete (for typed responses)

### Phase 3: Tier 2 Tests (Story 21.3)
**Timeline**: 2 days
**Focus**: Pricing and discount methods
**Dependencies**: Story 21.2 complete (shared test patterns)

### Phase 4: Tier 3 Tests (Story 21.4)
**Timeline**: 2 days
**Focus**: Warehouse and stock CRUD methods
**Dependencies**: task-17 complete (for corrected method names)

### Phase 5: Tier 4 Tests & Fixtures (Story 21.5)
**Timeline**: 2-3 days
**Focus**: Read-only methods and test fixture infrastructure
**Dependencies**: Stories 21.2-21.4 complete

**Total Epic 21 Duration**: ~10-13 days

---

## Test Coverage Progression

| Phase | Methods Covered | Coverage % | Cumulative Test Cases |
| --- | --- | --- | --- |
| Current state | 10 / 47 | 21.3% | 63 unit + 18 integration (skipped) |
| After Story 21.1 | 10 / 47 | 21.3% | 63 unit + 18 integration (running) |
| After Story 21.2 | 14 / 47 | 29.8% | ~83 unit + 18 integration |
| After Story 21.3 | 20 / 47 | 42.6% | ~101 unit + 18 integration |
| After Story 21.4 | 26 / 47 | 55.3% | ~119 unit + 18 integration |
| After Story 21.5 | 42 / 47 | 89.4% | ~151 unit + 18 integration |

**Note**: The 5 remaining untested methods (~10.6%) will be duplicates marked `@deprecated` in Epic 20. Testing the primary method name provides effective coverage for the wrapper.

---

## Success Metrics

### Coverage Targets
- **ProductsModule**: >= 80% method coverage (38+ of 47 methods)
- **Critical paths**: 100% coverage (card CRUD, stock management, pricing)
- **Integration tests**: 100% running (0 skipped)

### Quality Gates
- All tests passing in CI with no skips
- TypeScript strict mode compilation clean
- Test execution time < 30 seconds for unit suite
- No flaky tests (deterministic mocking)
- Fixtures validated against Swagger schemas

### Documentation Completeness
- Test fixture generation documented
- MSW compatibility fix documented for other modules
- Test patterns documented for contributor onboarding

---

## Risk Assessment

### High Risk
- MSW v2.x `localStorage` blocker may require significant investigation or MSW version migration
- All 5 documented workarounds have already failed

### Medium Risk
- Epic 20 renames may require test updates if timing overlaps
- Some methods return `Promise<unknown>` (type safety gaps from Epic 19)

### Low Risk
- Unit test patterns are well-established from existing 63 test cases
- Swagger schemas provide realistic fixture data

### Mitigation Strategies
- Story 21.1 (MSW fix) has highest priority and longest investigation budget
- If MSW fix proves infeasible, consider alternative mocking (e.g., `nock`, manual fetch mocks)
- Coordinate with Epic 20 on method name timeline to avoid double-renaming tests
- Use `unknown` type assertions in tests until Epic 19 type improvements land

---

## Follow-Up: JSDoc Enrichment (task-19)

**Task**: task-19 (Products Module JSDoc Enrichment -- Rate Limits & Examples)
**Priority**: Low
**Dependency**: task-16, task-17

Once Epic 20 (naming) and Epic 21 (testing) are complete, task-19 adds the final quality layer:
- `@example` code snippets for all 49 methods
- Rate limit documentation extracted from Swagger (4 tiers: Content standard 100 req/min, Content exceptions 10 req/min, Prices & Discounts 10 req/6s, Marketplace 300 req/min)
- `@see` links to official Wildberries documentation
- `@throws` documentation for all error types

This task targets the correctly named methods (post-Epic 20) and benefits from the test coverage (Epic 21) to validate examples.

---

## Backlog References

- **Primary Task**: task-18 (EPIC 21: Products Module Test Coverage -- Target 80%)
- **Follow-Up Task**: task-19 (Products Module JSDoc Enrichment -- Rate Limits & Examples)
- **Dependencies**: task-16 (Epic 19: Type Safety), task-17 (Epic 20: Naming Cleanup)

---

## Notes

- Epic 21 is a quality epic that provides the safety net for all other Products module work
- The 63 existing unit tests in `products-crud-critical.test.ts` provide an excellent pattern to follow
- The MSW `localStorage` issue affects ALL integration tests in the project, not just Products -- solving it here unblocks other modules
- Test fixture generation from Swagger schemas can be reused for all 11 SDK modules
- The 80% target is a floor, not a ceiling -- Tier 4 coverage pushes actual coverage to ~89%
- Integration tests validate the full request flow: SDK method -> BaseClient -> HTTP (MSW) -> response parsing

---

## Status: ✅ COMPLETE

**Implementation Date**: 2025-01-17

**Summary**: Epic 21 successfully raised Products module test coverage to 80%+ and unblocked all integration tests.

### Completed Work

#### Story 21.1: MSW Compatibility Fix
- [x] Resolved MSW v2.x `localStorage` compatibility issue
- [x] `describe.skip` removed from integration test file
- [x] All 18 integration tests now running and passing
- [x] Solution documented for other modules to follow

#### Story 21.2: Tier 1 Unit Tests (Business-Critical)
- [x] `getCardsList()` - comprehensive tests with cursor pagination
- [x] `createUploadAdd()` - tests for variant additions
- [x] `createMediaFile()` - media upload tests
- [x] `createMediaSave()` - media save tests
- [x] Minimum 5 test cases per method

#### Story 21.3: Tier 2 Unit Tests (Pricing & Discounts)
- [x] `createUploadTask()` - pricing task tests
- [x] `createTaskSize()` - size-based pricing tests
- [x] `createTaskClubDiscount()` - club discount tests
- [x] `getGoodsFilter()` - goods filter tests
- [x] `createGoodsFilter()` - filter creation tests
- [x] `getQuarantineGoods()` - quarantine tests

#### Story 21.4: Tier 3 Unit Tests (Warehouse & Stock)
- [x] `getStocks()` - stock read tests
- [x] `updateStock()` - stock update tests
- [x] `deleteStock()` - stock delete tests
- [x] `createWarehouse()` - warehouse create tests
- [x] `updateWarehouse()` - warehouse update tests
- [x] `deleteWarehouse()` - warehouse delete tests

#### Story 21.5: Tier 4 Unit Tests & Fixtures
- [x] All 16 read-only directory methods tested
- [x] Test fixtures generated from Swagger schemas
- [x] Fixtures stored in `tests/fixtures/products/`

### Success Criteria - All Met
- [x] ProductsModule: >= 80% method coverage achieved (~89%)
- [x] Critical paths: 100% coverage
- [x] Integration tests: 100% running (0 skipped)
- [x] All tests passing in CI with no skips
- [x] TypeScript strict mode compilation clean
- [x] Test execution time < 30 seconds
- [x] No flaky tests
