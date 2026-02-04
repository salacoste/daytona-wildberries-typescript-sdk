# Epic 25: Orders FBS Test Coverage (0% to 80%)

**Epic Goal**: Build comprehensive test coverage for the Orders FBS module from zero to 80%+ coverage across 34 methods. Establish unit tests, integration tests with MSW v2, and test fixtures generated from Swagger schemas.

**Target Completion**: Epic 25.x (Stories 25.1-25.4)
**SDK Version**: 2.8.0
**Status**: TO DO

**Business Value**:
- Prevents regression when fixing broken endpoints (Epic 22) and refactoring types (Epic 23)
- Provides confidence for future SDK releases affecting the FBS module
- Establishes reusable test patterns and fixtures for other modules
- Documents expected API behavior through executable test specifications

---

## Epic 25 Overview

### Strategic Context

The Orders FBS module has 34 methods and zero tests. This is the highest-traffic module in the SDK (orders, supplies, passes, metadata). With Epic 22 introducing breaking endpoint changes and Epic 23 refactoring all types, test coverage is essential to prevent regressions. This epic builds a complete test suite in priority tiers.

### Technical Context

**Module Under Test**: `src/modules/orders-fbs/index.ts` (class `OrdersFbsModule`)
**Types File**: `src/types/orders-fbs.types.ts`
**Rate Limits**: `src/config/orders-fbs-rate-limits.ts`
**Test Framework**: Vitest
**Mock Server**: MSW v2 (`msw/node`, `http`, `HttpResponse`)
**Base URL**: `https://marketplace-api.wildberries.ru`

### Current State

| Metric | Value |
|--------|-------|
| Total methods | 34 |
| Unit tests | 0 |
| Integration tests | 0 |
| Test files | 0 |
| Line coverage | 0% |
| Branch coverage | 0% |

### Target State

| Metric | Target |
|--------|--------|
| Methods with unit tests | 28+ (80%+) |
| Methods with integration tests | 12+ (core flows) |
| Test files | 4-5 |
| Line coverage | 80%+ |
| Branch coverage | 70%+ |

### Dependencies

**Depends On:**
- Epic 22 Complete - URL fixes must land so tests verify correct endpoints
- Epic 23 Complete - Type extraction so tests use named types

**Should Complete Before:**
- Any future FBS module changes

---

## Test Tier Prioritization

### Method Classification by Test Priority

#### Tier 1: Core Order Operations (6 methods) -- MUST TEST

These are the most critical methods for daily seller operations.

| # | Method | HTTP | Endpoint | Priority |
|---|--------|------|----------|----------|
| 1 | `getOrdersNew()` | GET | `/api/v3/orders/new` | CRITICAL -- main order intake |
| 2 | `orders()` | GET | `/api/v3/orders` | CRITICAL -- order listing with pagination |
| 3 | `createOrdersStatus()` | POST | `/api/v3/orders/status` | CRITICAL -- status checking |
| 4 | `updateOrdersCancel()` | PATCH | `/api/v3/orders/{orderId}/cancel` | CRITICAL -- order cancellation |
| 5 | `createOrdersSticker()` | POST | `/api/v3/orders/stickers` | CRITICAL -- sticker printing |
| 6 | `getOrdersMetaBulk()` | POST | `/api/marketplace/v3/orders/meta` | CRITICAL -- metadata retrieval (new from Epic 22) |

#### Tier 2: Supply Management (8 methods) -- SHOULD TEST

Supply operations are the second most common workflow after orders.

| # | Method | HTTP | Endpoint | Priority |
|---|--------|------|----------|----------|
| 7 | `supplies()` | GET | `/api/v3/supplies` | HIGH -- supply listing |
| 8 | `createSupply()` | POST | `/api/v3/supplies` | HIGH -- supply creation |
| 9 | `getSupply()` | GET | `/api/v3/supplies/{supplyId}` | HIGH -- supply details |
| 10 | `addOrdersToSupply()` | PATCH | `/api/marketplace/v3/supplies/{supplyId}/orders` | HIGH -- bulk add (new from Epic 22) |
| 11 | `getSupplyOrderIds()` | GET | `/api/marketplace/v3/supplies/{supplyId}/order-ids` | HIGH -- supply orders (new from Epic 22) |
| 12 | `updateSuppliesDeliver()` | PATCH | `/api/v3/supplies/{supplyId}/deliver` | HIGH -- close supply |
| 13 | `deleteSupply()` | DELETE | `/api/v3/supplies/{supplyId}` | HIGH -- supply deletion |
| 14 | `getSuppliesBarcode()` | GET | `/api/v3/supplies/{supplyId}/barcode` | HIGH -- QR code |

#### Tier 3: Metadata Operations (6 methods) -- SHOULD TEST

Metadata attachment for compliance (marking, IMEI, customs).

| # | Method | HTTP | Endpoint | Priority |
|---|--------|------|----------|----------|
| 15 | `updateMetaSgtin()` | PUT | `/api/v3/orders/{orderId}/meta/sgtin` | MEDIUM |
| 16 | `updateMetaImei()` | PUT | `/api/v3/orders/{orderId}/meta/imei` | MEDIUM |
| 17 | `updateMetaUin()` | PUT | `/api/v3/orders/{orderId}/meta/uin` | MEDIUM |
| 18 | `updateMetaGtin()` | PUT | `/api/v3/orders/{orderId}/meta/gtin` | MEDIUM |
| 19 | `updateMetaExpiration()` | PUT | `/api/v3/orders/{orderId}/meta/expiration` | MEDIUM |
| 20 | `setCustomsDeclaration()` | PUT | `/api/marketplace/v3/orders/{orderId}/meta/customs-declaration` | MEDIUM |

#### Tier 4: Passes, Crossborder, Trbx (14 methods) -- NICE TO HAVE

Less frequently used operations.

| # | Method | HTTP | Priority |
|---|--------|------|----------|
| 21 | `getPassesOffices()` | GET | LOW |
| 22 | `passes()` | GET | LOW |
| 23 | `createPass()` | POST | LOW |
| 24 | `updatePass()` | PUT | LOW |
| 25 | `deletePass()` | DELETE | LOW |
| 26 | `getOrdersReshipment()` | GET | LOW |
| 27 | `deleteOrdersMeta()` | DELETE | LOW |
| 28 | `createStickersCrossBorder()` | POST | LOW |
| 29 | `createStatusHistory()` | POST | LOW |
| 30 | `createOrdersClient()` | POST | LOW |
| 31 | `getSuppliesTrbx()` | GET | LOW |
| 32 | `createSuppliesTrbx()` | POST | LOW |
| 33 | `deleteSuppliesTrbx()` | DELETE | LOW |
| 34 | `createTrbxSticker()` | POST | LOW |

---

## Story Breakdown

### Story 25.1: Test Infrastructure and Fixtures (CRITICAL)

**Priority**: CRITICAL - Foundation for all tests
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Set up the test infrastructure for the FBS module: MSW v2 server configuration, shared test fixtures generated from `_schemas.yaml` examples, mock `BaseClient` factory, and test helpers.

**Key Deliverables**:

**1. MSW v2 Server Setup**:
```typescript
// tests/integration/orders-fbs/setup.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

**2. MSW Request Handlers**:
```typescript
// tests/integration/orders-fbs/handlers.ts
import { http, HttpResponse } from 'msw';

const BASE = 'https://marketplace-api.wildberries.ru';

export const handlers = [
  // Tier 1: Core Orders
  http.get(`${BASE}/api/v3/orders/new`, () => {
    return HttpResponse.json({ orders: [fixtures.orderNew] });
  }),
  http.get(`${BASE}/api/v3/orders`, ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get('limit')) || 10;
    return HttpResponse.json({ next: 13833711, orders: fixtures.orders.slice(0, limit) });
  }),
  // ... handlers for all endpoints
];
```

**3. Test Fixtures** (generated from `_schemas.yaml` examples):
```typescript
// tests/fixtures/orders-fbs.fixtures.ts
export const fixtures = {
  orderNew: { id: 123456, nmId: 789, article: 'TEST-001', ... },
  order: { id: 123456, nmId: 789, warehouseId: 1, ... },
  supply: { id: 'WB-GI-12345', done: false, name: 'Test Supply', ... },
  meta: { imei: { value: '123456789012345' }, sgtin: { value: ['01234567890'] }, ... },
  pass: { id: 1, firstName: 'Ivan', lastName: 'Petrov', ... },
  // ... fixtures for all schema types
};
```

**4. Mock BaseClient Factory**:
```typescript
// tests/unit/orders-fbs/helpers.ts
import { vi } from 'vitest';
import { BaseClient } from '../../../src/client/base-client';
import { OrdersFbsModule } from '../../../src/modules/orders-fbs';

export function createMockModule() {
  const mockClient = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  } as unknown as BaseClient;

  const module = new OrdersFbsModule(mockClient);
  return { module, mockClient };
}
```

**Acceptance Criteria**:
- [ ] MSW v2 server setup file with `beforeAll`/`afterEach`/`afterAll` lifecycle
- [ ] Request handlers for all Tier 1 and Tier 2 endpoints (14 handlers minimum)
- [ ] Fixture file with valid data for all major schema types
- [ ] Mock BaseClient factory function
- [ ] Test helper utilities (e.g., `expectCalledWithUrl`, `expectPostBody`)
- [ ] All infrastructure files compile without errors

**Files Created**:
- `tests/unit/orders-fbs/helpers.ts`
- `tests/integration/orders-fbs/setup.ts`
- `tests/integration/orders-fbs/handlers.ts`
- `tests/fixtures/orders-fbs.fixtures.ts`

---

### Story 25.2: Tier 1 Unit Tests -- Core Order Operations (CRITICAL)

**Priority**: CRITICAL - Highest-impact coverage
**Estimated Complexity**: HIGH
**Status**: TO DO

**Description**: Write unit tests for the 6 Tier 1 methods using the mock BaseClient. These tests verify correct endpoint URLs, HTTP methods, parameter passing, and return types.

**Test Plan**:

```
orders-fbs-core.test.ts
  describe('OrdersFbsModule - Core Order Operations')
    describe('getOrdersNew()')
      it('should call GET /api/v3/orders/new')
      it('should return orders array')
      it('should handle empty response')

    describe('orders()')
      it('should call GET /api/v3/orders with query params')
      it('should pass limit and next as query parameters')
      it('should handle optional dateFrom/dateTo parameters')
      it('should return paginated response with next cursor')
      it('should handle empty orders list')

    describe('createOrdersStatus()')
      it('should call POST /api/v3/orders/status with order IDs')
      it('should return status array with supplierStatus and wbStatus')
      it('should handle empty order IDs array')

    describe('updateOrdersCancel()')
      it('should call PATCH /api/v3/orders/{orderId}/cancel')
      it('should interpolate orderId into URL')
      it('should return void on success')

    describe('createOrdersSticker()')
      it('should call POST /api/v3/orders/stickers with format options')
      it('should pass type, width, height as query params')
      it('should pass order IDs in request body')
      it('should return stickers array with barcode and file')

    describe('getOrdersMetaBulk()')
      it('should call POST /api/marketplace/v3/orders/meta')
      it('should pass order IDs array in request body')
      it('should return array of order meta objects')
      it('should handle single order ID')

    describe('getOrdersMeta() - deprecated wrapper')
      it('should delegate to getOrdersMetaBulk with single ID')
      it('should unwrap the bulk response to single meta object')
```

**Acceptance Criteria**:
- [ ] All 6 Tier 1 methods have unit tests
- [ ] Each test verifies: correct URL, correct HTTP method, correct parameters
- [ ] Edge cases tested: empty responses, single vs. multiple items
- [ ] Deprecated wrapper delegation tested
- [ ] All tests pass with `npm test`

**Files Created**:
- `tests/unit/modules/orders-fbs-core.test.ts`

---

### Story 25.3: Tier 2 Unit Tests -- Supply Management (HIGH)

**Priority**: HIGH - Second most critical workflow
**Estimated Complexity**: HIGH
**Status**: TO DO

**Description**: Write unit tests for the 8 Tier 2 methods covering supply CRUD operations, order assignment, delivery, and barcode generation.

**Test Plan**:

```
orders-fbs-supplies.test.ts
  describe('OrdersFbsModule - Supply Management')
    describe('supplies()')
      it('should call GET /api/v3/supplies with pagination params')
      it('should return paginated supply list')

    describe('createSupply()')
      it('should call POST /api/v3/supplies with name')
      it('should return created supply ID')

    describe('getSupply()')
      it('should call GET /api/v3/supplies/{supplyId}')
      it('should return full supply details')

    describe('addOrdersToSupply()')
      it('should call PATCH /api/marketplace/v3/supplies/{supplyId}/orders')
      it('should pass order IDs array in body')
      it('should return void on success')

    describe('updateSuppliesOrder() - deprecated wrapper')
      it('should delegate to addOrdersToSupply with single order')

    describe('getSupplyOrderIds()')
      it('should call GET /api/marketplace/v3/supplies/{supplyId}/order-ids')
      it('should return array of order IDs')

    describe('getSuppliesOrder() - deprecated wrapper')
      it('should be marked deprecated')

    describe('updateSuppliesDeliver()')
      it('should call PATCH /api/v3/supplies/{supplyId}/deliver')
      it('should return void on success')

    describe('deleteSupply()')
      it('should call DELETE /api/v3/supplies/{supplyId}')
      it('should return void on success')

    describe('getSuppliesBarcode()')
      it('should call GET /api/v3/supplies/{supplyId}/barcode with format')
      it('should return barcode and file data')
```

**Acceptance Criteria**:
- [ ] All 8 Tier 2 methods have unit tests
- [ ] Deprecated wrapper delegation tested for both `updateSuppliesOrder` and `getSuppliesOrder`
- [ ] Pagination parameters tested for `supplies()`
- [ ] Path parameter interpolation tested for all methods with `supplyId`
- [ ] All tests pass with `npm test`

**Files Created**:
- `tests/unit/modules/orders-fbs-supplies.test.ts`

---

### Story 25.4: Integration Tests and Remaining Coverage (HIGH)

**Priority**: HIGH - End-to-end validation
**Estimated Complexity**: HIGH
**Status**: TO DO

**Description**: Write integration tests using MSW v2 that exercise the full SDK stack (OrdersFbsModule -> BaseClient -> HTTP -> MSW). Cover Tier 3 and Tier 4 methods with unit tests to reach 80%+ total coverage.

**Integration Test Plan**:

```
orders-fbs.integration.test.ts
  describe('Orders FBS Integration Tests')
    describe('Order Lifecycle')
      it('should fetch new orders')
      it('should get order statuses')
      it('should get order metadata in bulk')
      it('should print order stickers')
      it('should cancel an order')

    describe('Supply Lifecycle')
      it('should create a new supply')
      it('should add orders to supply')
      it('should get order IDs in supply')
      it('should deliver the supply')
      it('should get supply barcode after delivery')

    describe('Metadata Attachment')
      it('should attach SGTIN marking code')
      it('should attach IMEI')
      it('should set customs declaration')

    describe('Error Handling')
      it('should handle 401 authentication error')
      it('should handle 429 rate limit error')
      it('should handle 404 not found error')
      it('should handle network timeout')
```

**Tier 3+4 Unit Test Plan**:

```
orders-fbs-meta.test.ts
  describe('OrdersFbsModule - Metadata Operations')
    it('should call PUT .../meta/sgtin with sgtins array')
    it('should call PUT .../meta/imei with imei string')
    it('should call PUT .../meta/uin with uin string')
    it('should call PUT .../meta/gtin with gtin string')
    it('should call PUT .../meta/expiration with date string')
    it('should call PUT .../meta/customs-declaration with correct URL prefix')

orders-fbs-remaining.test.ts
  describe('OrdersFbsModule - Passes, Crossborder, Trbx')
    // Passes
    it('should fetch pass offices')
    it('should list passes')
    it('should create a pass')
    it('should update a pass')
    it('should delete a pass')
    // Crossborder
    it('should get crossborder stickers')
    it('should get status history with correct domain')
    it('should get Turkey client info')
    // Trbx
    it('should list trbx boxes')
    it('should create trbx boxes')
    it('should delete trbx boxes')
    it('should get trbx stickers')
    // Deprecated
    it('should throw from createOrdersExternalSticker')
    // Reshipment
    it('should get reshipment orders with typed response')
```

**Acceptance Criteria**:
- [ ] Integration tests cover the 2 main lifecycle flows (order + supply)
- [ ] Integration tests cover 3 metadata attachment operations
- [ ] Integration tests cover 4 error scenarios (401, 429, 404, timeout)
- [ ] Tier 3 unit tests cover all 6 metadata methods
- [ ] Tier 4 unit tests cover remaining 14 methods
- [ ] Total method coverage: 28+ out of 34 (80%+)
- [ ] All tests pass with `npm test`
- [ ] Coverage report shows 80%+ line coverage for `orders-fbs/index.ts`

**Files Created**:
- `tests/integration/orders-fbs/orders-fbs.integration.test.ts`
- `tests/unit/modules/orders-fbs-meta.test.ts`
- `tests/unit/modules/orders-fbs-remaining.test.ts`

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `docs/epics/EPIC_25_FBS_TESTING.md` | This EPIC summary |
| `tests/unit/orders-fbs/helpers.ts` | Mock BaseClient factory and test utilities |
| `tests/unit/modules/orders-fbs-core.test.ts` | Tier 1 unit tests (6 methods) |
| `tests/unit/modules/orders-fbs-supplies.test.ts` | Tier 2 unit tests (8 methods) |
| `tests/unit/modules/orders-fbs-meta.test.ts` | Tier 3 unit tests (6 methods) |
| `tests/unit/modules/orders-fbs-remaining.test.ts` | Tier 4 unit tests (14 methods) |
| `tests/integration/orders-fbs/setup.ts` | MSW v2 server lifecycle |
| `tests/integration/orders-fbs/handlers.ts` | MSW request handlers for FBS endpoints |
| `tests/integration/orders-fbs/orders-fbs.integration.test.ts` | Integration test suite |
| `tests/fixtures/orders-fbs.fixtures.ts` | Test fixture data |

### Modified Files
| File | Changes |
|------|---------|
| None | All test files are new additions |

---

## Test Coverage Targets

### Coverage Breakdown by Story

| Story | Tests | Methods Covered | Estimated Line Coverage |
|-------|-------|----------------|------------------------|
| 25.1 | 0 (infrastructure only) | 0 | 0% |
| 25.2 | ~20 tests | 6 Tier 1 methods | ~30% |
| 25.3 | ~15 tests | 8 Tier 2 methods | ~55% |
| 25.4 | ~30 tests | 20 Tier 3+4 methods + integration | ~85% |
| **Total** | **~65 tests** | **34 methods** | **80%+** |

### Coverage by Test Type

| Test Type | File Count | Test Count | Focus |
|-----------|-----------|------------|-------|
| Unit (mock client) | 4 | ~50 | URL correctness, parameter passing, return types |
| Integration (MSW) | 1 | ~15 | Full stack, error handling, lifecycle flows |
| **Total** | **5** | **~65** | **Comprehensive FBS coverage** |

---

## Integration Test Strategy

### MSW v2 Handler Design

All handlers target `https://marketplace-api.wildberries.ru` with the following patterns:

**GET endpoints**: Return fixture data, support query parameter filtering
```typescript
http.get(`${BASE}/api/v3/orders`, ({ request }) => {
  const url = new URL(request.url);
  // Parse pagination params, return fixture subset
});
```

**POST endpoints**: Validate request body shape, return fixture data
```typescript
http.post(`${BASE}/api/v3/orders/status`, async ({ request }) => {
  const body = await request.json();
  // Validate body.orders is array of numbers
  // Return fixture status data
});
```

**PATCH/PUT/DELETE endpoints**: Validate path params, return 204 or error
```typescript
http.patch(`${BASE}/api/v3/orders/:orderId/cancel`, ({ params }) => {
  const { orderId } = params;
  // Return 204 No Content
  return new HttpResponse(null, { status: 204 });
});
```

**Error handlers**: Override specific endpoints for error testing
```typescript
// In individual tests:
server.use(
  http.get(`${BASE}/api/v3/orders/new`, () => {
    return HttpResponse.json({ code: 'Unauthorized' }, { status: 401 });
  })
);
```

### Fixture Generation Strategy

Fixtures are generated from the `_schemas.yaml` file in the Swagger source directory. Each schema's `example` field provides realistic test data.

**Fixture file structure**:
```typescript
// Tests can import individual fixtures or the whole set
export const fixtures = {
  // Single entities
  orderNew: OrderNewFixture,
  order: OrderFixture,
  supply: SupplyFixture,
  meta: MetaFixture,
  pass: PassFixture,
  sticker: StickerFixture,

  // Collections
  orders: [OrderFixture, OrderFixture2],
  supplies: [SupplyFixture, SupplyFixture2],

  // Error responses
  errors: {
    unauthorized: { code: 'Unauthorized', message: 'Invalid API key' },
    rateLimited: { code: 'TooManyRequests', message: 'Rate limit exceeded' },
    notFound: { code: 'NotFound', message: 'Order not found' },
  },
};
```

---

## Risk Assessment

### Low Risk
- Test infrastructure is additive -- no existing code is modified
- MSW v2 provides reliable HTTP mocking without flaky network calls
- Vitest is already configured in the project

### Medium Risk
- Integration tests depend on Epics 22 and 23 being complete -- if those epics change the method signatures, tests need updating
- MSW handlers must match the exact URL patterns used in the module -- any URL discrepancy causes false failures
- 80% coverage target may be tight if some methods have complex branching not visible in the current code

### Mitigation
- Run tests against the actual module code to catch URL mismatches early
- Use parameterized test helpers to reduce duplication across similar methods (e.g., all metadata PUT methods)
- Review coverage report after Story 25.3 to assess whether 80% is achievable before starting Story 25.4

---

## Success Metrics

- 80%+ line coverage on `src/modules/orders-fbs/index.ts`
- 70%+ branch coverage on `src/modules/orders-fbs/index.ts`
- All 6 Tier 1 methods have unit + integration tests
- All 8 Tier 2 methods have unit tests
- Error handling scenarios tested (401, 429, 404, timeout)
- Deprecated wrapper delegation verified for all 4 deprecated methods
- Zero test flakiness -- all tests deterministic via MSW mocks
- Tests run in under 5 seconds total

---

## Notes

- The existing test infrastructure in `tests/` should be surveyed for patterns used by other modules (e.g., analytics tests from Epic 13)
- Consider extracting the MSW server setup into a shared helper if other modules follow the same pattern
- The `_schemas.yaml` file in the Swagger directory may contain `example` fields that can be directly used as fixture data
- Vitest's `vi.fn()` mock tracking is sufficient for unit tests -- no need for more complex mocking libraries
- The test file naming convention follows the existing pattern: `{module-name}-{focus}.test.ts`
