# EPIC 29: In-Store Pickup Test Coverage -- Unit & Integration Tests

## Overview

| Field | Value |
|-------|-------|
| Epic | 29 |
| Module | in-store-pickup |
| Priority | Medium |
| Backlog Task | task-27 |
| Target | SDK v2.7.x |
| Depends On | EPIC 28 (code quality fixes should land first) |
| Source Swagger | `wildberries_api_doc/06-in-store-pickup.yaml` |
| Audit Date | February 2026 |
| Status | DONE |

---

## Current State

The February 2026 swagger audit confirmed that the in-store-pickup module has **zero test files** in the repository. The QA gate for Story 4.6 claims 60 tests passing (Quality Score 96/100), but no corresponding test files exist at the expected locations:

- `tests/unit/modules/in-store-pickup.test.ts` -- **does not exist**
- `tests/integration/in-store-pickup.integration.test.ts` -- **does not exist**
- `tests/fixtures/in-store-pickup/` -- **does not exist**

The Story 7.6 analysis file (`docs/stories/7.6.in-store-pickup-analysis.md`) contains a runtime test script rather than a proper story document, and it is not an automated test suite -- it requires a live API key and produces console output only.

**Conclusion:** The module has no automated test coverage. All tests must be written from scratch.

---

## Test Plan

### Module Under Test

`src/modules/in-store-pickup/index.ts` -- `InStorePickupModule` class with 16 methods:

| Category | Methods | Count |
|----------|---------|-------|
| Assembly Tasks | `getOrdersNew`, `updateOrdersConfirm`, `updateOrdersPrepare`, `updateOrdersReceive`, `updateOrdersReject`, `updateOrdersCancel` | 6 |
| Order Queries | `getClickCollectOrders`, `createOrdersStatus` | 2 |
| Customer Interaction | `createOrdersClient`, `createClientIdentity` | 2 |
| Metadata (Read/Delete) | `getOrdersMeta`, `deleteOrdersMeta` | 2 |
| Metadata (Write) | `updateMetaSgtin`, `updateMetaUin`, `updateMetaImei`, `updateMetaGtin` | 4 |

### Types Under Test

`src/types/in-store-pickup.types.ts` -- 12 imported types:

`ApiCheckIdentityRequest`, `ApiCheckedIdentity`, `ApiGTINRequest`, `ApiIMEIRequest`, `ApiNewOrders`, `ApiOrderClientInfoResp`, `ApiOrderStatuses`, `ApiOrders`, `ApiOrdersMeta`, `ApiOrdersRequest`, `ApiSGTINsRequest`, `ApiUINRequest`

---

## Unit Tests

**File:** `tests/unit/modules/in-store-pickup.test.ts`

### Test Structure

```
describe('InStorePickupModule')
  describe('Assembly Task Operations')
    it('should fetch new pickup orders')
    it('should confirm an order for assembly')
    it('should mark an order as prepared for pickup')
    it('should mark an order as received by customer')
    it('should reject an order')
    it('should cancel an order')

  describe('Order Query Operations')
    it('should fetch orders with pagination parameters')
    it('should fetch orders without parameters')
    it('should get order statuses by order IDs')

  describe('Customer Interaction Operations')
    it('should fetch customer info for an order')
    it('should verify customer identity with code')

  describe('Metadata Read/Delete Operations')
    it('should fetch order metadata by orderId')
    it('should delete order metadata with key parameter')

  describe('Metadata Write Operations')
    it('should set SGTIN code for an order')
    it('should set UIN code for an order')
    it('should set IMEI code for an order')
    it('should set GTIN code for an order')

  describe('Error Handling')
    it('should throw AuthenticationError on 401 response')
    it('should throw AuthenticationError on 403 response')
    it('should throw ValidationError on 400 response')
    it('should throw RateLimitError on 429 response')
    it('should throw NetworkError on timeout')
    it('should throw appropriate error on 404 response')
    it('should handle 409 conflict for state transition methods')
    it('should handle 409 conflict for metadata write methods')

  describe('Rate Limit Key Presence')
    it('should pass rateLimitKey for getOrdersNew')
    it('should pass rateLimitKey for updateOrdersConfirm')
    it('should pass rateLimitKey for updateOrdersPrepare')
    it('should pass rateLimitKey for createOrdersClient')
    it('should pass rateLimitKey for createClientIdentity')
    it('should pass rateLimitKey for updateOrdersReceive')
    it('should pass rateLimitKey for updateOrdersReject')
    it('should pass rateLimitKey for createOrdersStatus')
    it('should pass rateLimitKey for getClickCollectOrders')
    it('should pass rateLimitKey for updateOrdersCancel')
    it('should pass rateLimitKey for getOrdersMeta')
    it('should pass rateLimitKey for deleteOrdersMeta')
    it('should pass rateLimitKey for updateMetaSgtin')
    it('should pass rateLimitKey for updateMetaUin')
    it('should pass rateLimitKey for updateMetaImei')
    it('should pass rateLimitKey for updateMetaGtin')
```

**Estimated test count:** ~45 unit tests

### Test Approach

- Mock `BaseClient` using `vi.fn()` for all HTTP methods (`get`, `post`, `patch`, `put`, `delete`).
- Verify correct URL construction including path parameter interpolation.
- Verify correct HTTP method selection per endpoint (GET/POST/PATCH/PUT/DELETE).
- Verify `rateLimitKey` is passed in options (after EPIC 28 fixes land).
- Verify request body payloads are forwarded correctly.
- Verify query parameters are passed via `params` option.
- Test error transformation for 401, 403, 400, 404, 409, 429, and network errors.

---

## Integration Tests

**File:** `tests/integration/in-store-pickup.integration.test.ts`

### MSW Handler Setup

Configure Mock Service Worker handlers for all 16 endpoints at base URL `https://marketplace-api.wildberries.ru`:

| HTTP Method | Path Pattern | Handler Purpose |
|-------------|-------------|-----------------|
| GET | `/api/v3/click-collect/orders/new` | Return new orders list |
| PATCH | `/api/v3/click-collect/orders/:orderId/confirm` | Return 204 on success |
| PATCH | `/api/v3/click-collect/orders/:orderId/prepare` | Return 204 on success |
| POST | `/api/v3/click-collect/orders/client` | Return customer info |
| POST | `/api/v3/click-collect/orders/client/identity` | Return identity check result |
| PATCH | `/api/v3/click-collect/orders/:orderId/receive` | Return 204 on success |
| PATCH | `/api/v3/click-collect/orders/:orderId/reject` | Return 204 on success |
| POST | `/api/v3/click-collect/orders/status` | Return order statuses |
| GET | `/api/v3/click-collect/orders` | Return paginated orders |
| PATCH | `/api/v3/click-collect/orders/:orderId/cancel` | Return 204 on success |
| GET | `/api/v3/click-collect/orders/:orderId/meta` | Return metadata object |
| DELETE | `/api/v3/click-collect/orders/:orderId/meta` | Return 204 on success |
| PUT | `/api/v3/click-collect/orders/:orderId/meta/sgtin` | Return 204 on success |
| PUT | `/api/v3/click-collect/orders/:orderId/meta/uin` | Return 204 on success |
| PUT | `/api/v3/click-collect/orders/:orderId/meta/imei` | Return 204 on success |
| PUT | `/api/v3/click-collect/orders/:orderId/meta/gtin` | Return 204 on success |

### Workflow Tests

```
describe('In-Store Pickup Integration Tests')
  describe('Order Lifecycle: new -> confirm -> prepare -> receive')
    it('should complete the full happy-path pickup workflow')
    it('should complete the full rejection workflow: new -> confirm -> prepare -> reject')
    it('should complete the cancellation workflow: new -> cancel')

  describe('Customer Identity Verification Flow')
    it('should fetch customer info and verify identity successfully')
    it('should handle identity verification failure')

  describe('Metadata Binding Workflow')
    it('should set SGTIN code and retrieve metadata')
    it('should set UIN code and retrieve metadata')
    it('should set IMEI code and retrieve metadata')
    it('should set GTIN code and retrieve metadata')
    it('should delete metadata successfully')

  describe('Order Query and Pagination')
    it('should list orders with pagination via next cursor')
    it('should list orders with dateFrom/dateTo filters')
    it('should get statuses for multiple order IDs')

  describe('Error Scenarios')
    it('should handle 401 authentication error')
    it('should handle 403 forbidden error')
    it('should handle 404 order not found')
    it('should handle 409 conflict on invalid state transition')
    it('should handle 429 rate limit exceeded with retry-after')
    it('should handle network timeout')
```

**Estimated test count:** ~20 integration tests

---

## Edge Cases

### 409 Penalty (10x Multiplier)

The swagger specifies that a 409 response counts as 10 requests toward the rate limit. Tests must verify:
- The rate limiter consumes 9 additional tokens when a 409 is received.
- The penalty is applied per-key (state transition tier vs. metadata tier).
- Subsequent requests are correctly delayed after a 409.

**Note:** This matches the FBS/FBW 10x penalty. The test must verify the 10x value.

### Pagination (Cursor-Based)

The `getClickCollectOrders` method supports cursor-based pagination via the `next` parameter:
- First call: `{ limit: 10 }` -- returns orders and a `next` value.
- Subsequent call: `{ limit: 10, next: <cursor> }` -- returns next page.
- Final page: `next` is `0` or absent, indicating no more results.

Tests must cover:
- First page with `next` cursor returned.
- Middle page with both data and `next` cursor.
- Final page with empty or zero `next`.

### Empty Responses

- `getOrdersNew()` returning an empty `orders` array (no new orders).
- `getClickCollectOrders()` returning an empty array (no orders in range).
- `createOrdersStatus()` with empty `orderIds` array.

### Identity Verification Edge Cases

- Verification returning `isIdentified: false` (customer not verified).
- Verification called for an order not in `prepare` status (should fail).

---

## Coverage Target

| Metric | Target | Rationale |
|--------|--------|-----------|
| Unit test line coverage | >= 80% | Matches SDK-wide standard |
| Integration test coverage | >= 70% | Covers all critical workflows |
| Method coverage | 100% | All 16 methods must have at least one test |
| Error path coverage | >= 80% | All HTTP error codes tested |
| Rate limit key coverage | 100% | All 16 keys verified in unit tests |

---

## Files to Create

| File | Purpose | Estimated Size |
|------|---------|---------------|
| `tests/unit/modules/in-store-pickup.test.ts` | Unit tests for all 16 methods | ~600 lines |
| `tests/integration/in-store-pickup.integration.test.ts` | MSW-based integration tests | ~500 lines |
| `tests/fixtures/in-store-pickup/new-orders.json` | Mock response for `getOrdersNew` | ~30 lines |
| `tests/fixtures/in-store-pickup/orders-list.json` | Mock response for `getClickCollectOrders` | ~40 lines |
| `tests/fixtures/in-store-pickup/order-statuses.json` | Mock response for `createOrdersStatus` | ~20 lines |
| `tests/fixtures/in-store-pickup/customer-info.json` | Mock response for `createOrdersClient` | ~15 lines |
| `tests/fixtures/in-store-pickup/identity-check.json` | Mock response for `createClientIdentity` | ~10 lines |
| `tests/fixtures/in-store-pickup/order-metadata.json` | Mock response for `getOrdersMeta` | ~20 lines |

---

## Test Dependencies

| Dependency | Version | Purpose |
|-----------|---------|---------|
| vitest | (existing) | Test runner and assertion library |
| msw | (existing) | Mock Service Worker for HTTP mocking |
| @types/node | (existing) | TypeScript Node.js types |

No new dependencies required. All test infrastructure is already in place from other module test suites.

---

## Relationship to EPIC 28

EPIC 28 (Code Quality) should be completed **before** writing tests, because:

1. The method rename (`createOrdersStatu` -> `createOrdersStatus`) affects test method names.
2. Rate limit key wiring must be in place before rate limit key presence tests can pass.
3. JSDoc fixes affect any documentation-based test generation.

Tests written against the post-EPIC-28 codebase will not need updating when EPIC 28 lands.

---

## Related Documents

| Document | Relationship |
|----------|-------------|
| [EPIC 28: In-Store Pickup Code Quality](./EPIC_28_PICKUP_CODE_QUALITY.md) | Prerequisite -- code fixes before test creation |
| [Story 4.6: In-Store Pickup Management](../stories/4.6.in-store-pickup-management.md) | Original implementation story |
| [Story 7.6: In-Store Pickup Analysis](../stories/7.6.in-store-pickup-analysis.md) | Runtime analysis script (not automated tests) |

---

## Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-02-04 | 1.0 | Initial epic creation from February 2026 swagger audit | Technical Writer |

---

### Post-Implementation Note (2026-02-05)
The Wildberries Marketplace updated the swagger specification: 409 penalty was changed from 5x to 10x. TDD tests referencing the 5x value have been updated. All rate limit config entries now use `penaltyMultiplier: 10`.
