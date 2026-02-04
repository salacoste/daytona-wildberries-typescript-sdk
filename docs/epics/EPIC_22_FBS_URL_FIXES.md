# Epic 22: Orders FBS Broken Endpoint URL Fixes

**Epic Goal**: Fix 5 methods calling removed/changed API endpoints and deprecate 1 method whose endpoint was entirely removed. These are production-critical bugs causing 404 and connection errors for FBS order operations.

**Target Completion**: Epic 22.x (Stories 22.1-22.5)
**SDK Version**: 2.8.0
**Status**: DONE

**Business Value**:
- Restores core FBS order management functionality (meta, supplies, crossborder)
- Fixes 5 silently failing endpoints that return 404 or connection errors in production
- Properly deprecates 1 method whose endpoint was removed by Wildberries
- Backward-compatible deprecated wrappers minimize breaking changes for existing users

---

## Epic 22 Overview

### Strategic Context

Wildberries has migrated several Orders FBS endpoints from `/api/v3/` to `/api/marketplace/v3/` and changed some from single-resource to bulk operations. The SDK currently calls the old endpoints, resulting in 404 errors or connection failures. One endpoint (`/api/v3/files/orders/external-stickers`) was entirely removed. This epic fixes all 6 affected methods to restore FBS order management.

### Technical Context

**API Documentation**: `wildberries_api_doc/03-orders-fbs/` shards
**Base URL**: `https://marketplace-api.wildberries.ru`

**Affected Methods (6 total):**

| # | SDK Method | Current (Broken) Endpoint | New (Working) Endpoint | Change Type |
|---|-----------|--------------------------|----------------------|-------------|
| 1 | `getOrdersMeta()` | `GET /api/v3/orders/{orderId}/meta` | `POST /api/marketplace/v3/orders/meta` | Single-to-bulk, GET-to-POST, new schemas |
| 2 | `updateSuppliesOrder()` | `PATCH .../supplies/{supplyId}/orders/{orderId}` | `PATCH /api/marketplace/v3/supplies/{supplyId}/orders` | Single-to-bulk, body replaces path param |
| 3 | `getSuppliesOrder()` | `GET .../supplies/{supplyId}/orders` | `GET /api/marketplace/v3/supplies/{supplyId}/order-ids` | Path change, response shape change |
| 4 | `setCustomsDeclaration()` | `PUT /api/v3/orders/{orderId}/meta/customs-declaration` | `PUT /api/marketplace/v3/orders/{orderId}/meta/customs-declaration` | URL prefix fix (`/api/v3/` to `/api/marketplace/v3/`) |
| 5 | `createStatusHistory()` | `POST https://api.wildberries.ru/api/v3/orders/status/history` | `POST https://marketplace-api.wildberries.ru/api/v3/orders/status/history` | Domain fix (`api.wildberries.ru` to `marketplace-api.wildberries.ru`) |
| 6 | `createOrdersExternalSticker()` | `POST /api/v3/files/orders/external-stickers` | _Removed entirely_ | Mark `@deprecated`, throw descriptive error |

### Dependencies

**Depends On:**
- Epic 1 Complete - Foundation infrastructure (BaseClient, rate limiting)
- Epic 3/4 Complete - Orders FBS module (existing methods)

---

## Story Breakdown

### Story 22.1: Fix `getOrdersMeta()` -- Single-to-Bulk Migration (CRITICAL)

**Priority**: CRITICAL - Core metadata retrieval is broken
**Estimated Complexity**: HIGH
**Status**: TO DO

**Description**: Migrate `getOrdersMeta()` from the removed single-order GET endpoint to the new bulk POST endpoint. Provide a backward-compatible wrapper that accepts a single `orderId` and unwraps the bulk response.

**Current (Broken)**:
```typescript
// GET /api/v3/orders/{orderId}/meta  -->  404
async getOrdersMeta(orderId: number): Promise<{ meta?: Meta }> {
  return this.client.get<{ meta?: Meta }>(
    `https://marketplace-api.wildberries.ru/api/v3/orders/${orderId}/meta`
  );
}
```

**New v3 Endpoint**:
- `POST /api/marketplace/v3/orders/meta`
- Request body: `{ orders: number[] }` (array of order IDs)
- Response: `{ orders?: OrderMetaItem[] }` (array of order meta objects)

**Key Deliverables**:
- New method: `getOrdersMetaBulk(orderIds: number[]): Promise<OrdersMetaBulkResponse>`
- New types: `OrdersMetaBulkRequest`, `OrdersMetaBulkResponse`, `OrderMetaItem`
- Deprecated wrapper: `getOrdersMeta(orderId)` calls `getOrdersMetaBulk([orderId])` and unwraps

**Acceptance Criteria**:
- [ ] `getOrdersMetaBulk()` calls `POST /api/marketplace/v3/orders/meta` with correct body
- [ ] `getOrdersMeta()` is marked `@deprecated` with JSDoc pointing to `getOrdersMetaBulk()`
- [ ] `getOrdersMeta()` delegates to `getOrdersMetaBulk()` and unwraps the single result
- [ ] New request/response types added to `orders-fbs.types.ts`
- [ ] Rate limit entry added for bulk endpoint
- [ ] Unit tests cover both bulk and deprecated wrapper methods

**Files Modified**:
- `src/modules/orders-fbs/index.ts`
- `src/types/orders-fbs.types.ts`
- `src/config/orders-fbs-rate-limits.ts`

---

### Story 22.2: Fix `updateSuppliesOrder()` -- Single-to-Bulk Migration (CRITICAL)

**Priority**: CRITICAL - Adding orders to supplies is broken
**Estimated Complexity**: HIGH
**Status**: TO DO

**Description**: Migrate `updateSuppliesOrder()` from the removed single-order PATCH endpoint to the new bulk PATCH endpoint. Provide a backward-compatible wrapper.

**Current (Broken)**:
```typescript
// PATCH .../supplies/{supplyId}/orders/{orderId}  -->  404
async updateSuppliesOrder(supplyId: string, orderId: number): Promise<void> {
  return this.client.patch(
    `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders/${orderId}`,
    undefined
  );
}
```

**New v3 Endpoint**:
- `PATCH /api/marketplace/v3/supplies/{supplyId}/orders`
- Request body: `{ orders: number[] }` (array of order IDs to add)
- Response: `void` (204 No Content)

**Key Deliverables**:
- New method: `addOrdersToSupply(supplyId: string, orderIds: number[]): Promise<void>`
- Deprecated wrapper: `updateSuppliesOrder(supplyId, orderId)` calls `addOrdersToSupply(supplyId, [orderId])`

**Acceptance Criteria**:
- [ ] `addOrdersToSupply()` calls `PATCH /api/marketplace/v3/supplies/{supplyId}/orders` with body
- [ ] `updateSuppliesOrder()` is marked `@deprecated` with JSDoc pointing to `addOrdersToSupply()`
- [ ] `updateSuppliesOrder()` delegates to `addOrdersToSupply()` internally
- [ ] Rate limit entry updated for the new bulk endpoint key
- [ ] Unit tests cover both methods

**Files Modified**:
- `src/modules/orders-fbs/index.ts`
- `src/config/orders-fbs-rate-limits.ts`

---

### Story 22.3: Fix `getSuppliesOrder()` -- Response Shape Change (CRITICAL)

**Priority**: CRITICAL - Supply order listing is broken
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Migrate `getSuppliesOrder()` from the removed endpoint to the new `/order-ids` endpoint. The response shape changes from full order objects to order ID arrays.

**Current (Broken)**:
```typescript
// GET .../supplies/{supplyId}/orders  -->  404
async getSuppliesOrder(supplyId: string): Promise<{ orders?: SupplyOrder[] }> {
  return this.client.get<{ orders?: SupplyOrder[] }>(
    `https://marketplace-api.wildberries.ru/api/v3/supplies/${supplyId}/orders`
  );
}
```

**New v3 Endpoint**:
- `GET /api/marketplace/v3/supplies/{supplyId}/order-ids`
- Response: `{ orderIds?: number[] }` (array of order IDs, not full objects)

**Key Deliverables**:
- New method: `getSupplyOrderIds(supplyId: string): Promise<SupplyOrderIdsResponse>`
- New type: `SupplyOrderIdsResponse`
- Deprecated wrapper: `getSuppliesOrder()` marked `@deprecated` with migration note

**Acceptance Criteria**:
- [ ] `getSupplyOrderIds()` calls `GET /api/marketplace/v3/supplies/{supplyId}/order-ids`
- [ ] New `SupplyOrderIdsResponse` type with `orderIds?: number[]`
- [ ] `getSuppliesOrder()` is marked `@deprecated` -- cannot fully delegate since response shapes differ
- [ ] JSDoc on deprecated method explains the response shape change
- [ ] Rate limit entry updated for new endpoint key
- [ ] Unit tests for new method

**Files Modified**:
- `src/modules/orders-fbs/index.ts`
- `src/types/orders-fbs.types.ts`
- `src/config/orders-fbs-rate-limits.ts`

---

### Story 22.4: Fix URL Prefix and Domain Issues (HIGH)

**Priority**: HIGH - Two methods silently fail
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Fix the URL prefix for `setCustomsDeclaration()` and the domain for `createStatusHistory()`. These are simple string fixes with no schema changes.

**Fix 1: `setCustomsDeclaration()`**:
```
BEFORE: https://marketplace-api.wildberries.ru/api/v3/orders/{orderId}/meta/customs-declaration
AFTER:  https://marketplace-api.wildberries.ru/api/marketplace/v3/orders/{orderId}/meta/customs-declaration
```
Change: `/api/v3/` to `/api/marketplace/v3/`

**Fix 2: `createStatusHistory()`**:
```
BEFORE: https://api.wildberries.ru/api/v3/orders/status/history
AFTER:  https://marketplace-api.wildberries.ru/api/v3/orders/status/history
```
Change: `api.wildberries.ru` to `marketplace-api.wildberries.ru`

**Acceptance Criteria**:
- [ ] `setCustomsDeclaration()` URL updated to `/api/marketplace/v3/` prefix
- [ ] `createStatusHistory()` domain updated to `marketplace-api.wildberries.ru`
- [ ] No signature or type changes needed
- [ ] Unit tests verify correct URLs are called
- [ ] Rate limit keys remain unchanged

**Files Modified**:
- `src/modules/orders-fbs/index.ts`

---

### Story 22.5: Deprecate `createOrdersExternalSticker()` (HIGH)

**Priority**: HIGH - Method calls a removed endpoint
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: The `createOrdersExternalSticker()` method calls `POST /api/v3/files/orders/external-stickers`, which was removed by Wildberries on October 23. Mark this method as `@deprecated` and have it throw a descriptive error directing users to `createStickersCrossBorder()`.

**Current (Removed endpoint)**:
```typescript
async createOrdersExternalSticker(data?: { orders?: number[] }): Promise<...> {
  return this.client.post<...>(
    'https://marketplace-api.wildberries.ru/api/v3/files/orders/external-stickers',
    data
  );
}
```

**Acceptance Criteria**:
- [ ] `createOrdersExternalSticker()` marked `@deprecated` with JSDoc explaining removal
- [ ] Method body throws `WBAPIError` with message directing users to `createStickersCrossBorder()`
- [ ] Rate limit entry `orders-fbs.postFilesOrdersExternalStickers` removed from config
- [ ] Unit test verifies the method throws with correct error message

**Files Modified**:
- `src/modules/orders-fbs/index.ts`
- `src/config/orders-fbs-rate-limits.ts`

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `docs/epics/EPIC_22_FBS_URL_FIXES.md` | This EPIC summary |

### Modified Files
| File | Changes |
|------|---------|
| `src/modules/orders-fbs/index.ts` | Fix 5 endpoint URLs, add 3 new bulk methods, deprecate 4 old methods |
| `src/types/orders-fbs.types.ts` | Add `OrdersMetaBulkRequest`, `OrdersMetaBulkResponse`, `OrderMetaItem`, `SupplyOrderIdsResponse` |
| `src/config/orders-fbs-rate-limits.ts` | Add entries for bulk endpoints, remove deprecated endpoint entry |

---

## Breaking Changes Summary

### What Breaks
- `getOrdersMeta()` -- Return type changes when deprecated wrapper delegates to bulk. Callers accessing `meta` field directly may need adjustment
- `updateSuppliesOrder()` -- Still works via deprecated wrapper but signature semantics change (single to bulk internally)
- `getSuppliesOrder()` -- Response shape changes from `SupplyOrder[]` to `number[]`. **Cannot be fully wrapped** -- callers must migrate to `getSupplyOrderIds()`
- `createOrdersExternalSticker()` -- Will throw instead of making HTTP request

### What Does NOT Break
- All other 28 FBS methods remain unchanged
- No changes to SDK initialization or configuration
- Rate limiting behavior unchanged for unaffected endpoints
- The `setCustomsDeclaration()` and `createStatusHistory()` fixes are transparent (same signature, correct URL)

### Migration Effort
- **No migration needed** for `setCustomsDeclaration()` and `createStatusHistory()` -- transparent fixes
- **5 minutes** to replace `getOrdersMeta()` with `getOrdersMetaBulk()` for bulk usage
- **5 minutes** to replace `updateSuppliesOrder()` with `addOrdersToSupply()` for bulk usage
- **10 minutes** to replace `getSuppliesOrder()` with `getSupplyOrderIds()` (response shape differs)
- **2 minutes** to replace `createOrdersExternalSticker()` with `createStickersCrossBorder()`

---

## Risk Assessment

### High Risk
- `getOrdersMeta()` changes from single GET to bulk POST -- fundamentally different API contract
- `getSuppliesOrder()` response shape change from full objects to IDs only -- cannot wrap seamlessly
- `updateSuppliesOrder()` moves orderId from path to body -- breaking signature change for the new method

### Medium Risk
- Deprecated wrappers for `getOrdersMeta` and `updateSuppliesOrder` may have edge cases in parameter mapping
- Users relying on `SupplyOrder` objects from `getSuppliesOrder()` need full migration

### Low Risk
- URL prefix fix for `setCustomsDeclaration()` -- simple string change
- Domain fix for `createStatusHistory()` -- simple string change
- Deprecation of `createOrdersExternalSticker()` -- endpoint already dead

### Mitigation
- Clear `@deprecated` JSDoc on all affected methods with specific migration instructions
- New bulk methods have distinct names to avoid confusion (`getOrdersMetaBulk`, `addOrdersToSupply`, `getSupplyOrderIds`)
- Deprecated wrappers delegate internally where possible to maintain backward compatibility
- Unit tests cover both old (deprecated) and new method signatures

---

## API Methods Summary (Post-Fix)

### New Methods
| SDK Method | Endpoint | Description |
|---|---|---|
| `getOrdersMetaBulk()` | `POST /api/marketplace/v3/orders/meta` | Bulk metadata retrieval for multiple orders |
| `addOrdersToSupply()` | `PATCH /api/marketplace/v3/supplies/{supplyId}/orders` | Bulk add orders to a supply |
| `getSupplyOrderIds()` | `GET /api/marketplace/v3/supplies/{supplyId}/order-ids` | Get order IDs in a supply |

### Fixed Methods (Transparent)
| SDK Method | Fix | Description |
|---|---|---|
| `setCustomsDeclaration()` | URL prefix `/api/v3/` to `/api/marketplace/v3/` | Customs declaration metadata |
| `createStatusHistory()` | Domain `api.wildberries.ru` to `marketplace-api.wildberries.ru` | Crossborder status history |

### Deprecated Methods
| SDK Method | Status | Replacement |
|---|---|---|
| `getOrdersMeta()` | @deprecated | `getOrdersMetaBulk()` |
| `updateSuppliesOrder()` | @deprecated | `addOrdersToSupply()` |
| `getSuppliesOrder()` | @deprecated | `getSupplyOrderIds()` |
| `createOrdersExternalSticker()` | @deprecated (throws) | `createStickersCrossBorder()` |

### Unchanged Methods (28 methods)
- Passes: `getPassesOffices`, `passes`, `createPass`, `updatePass`, `deletePass`
- Orders: `getOrdersNew`, `orders`, `createOrdersStatu`, `getOrdersReshipment`, `updateOrdersCancel`, `createOrdersSticker`
- Meta: `deleteOrdersMeta`, `updateMetaSgtin`, `updateMetaUin`, `updateMetaImei`, `updateMetaGtin`, `updateMetaExpiration`
- Crossborder: `createStickersCrossBorder`, `createOrdersClient`
- Supplies: `supplies`, `createSupply`, `getSupply`, `deleteSupply`, `updateSuppliesDeliver`, `getSuppliesBarcode`
- Trbx: `getSuppliesTrbx`, `createSuppliesTrbx`, `deleteSuppliesTrbx`, `createTrbxSticker`

**Total Orders FBS Module Methods**: 37 (3 new + 4 deprecated + 2 fixed + 28 unchanged)

---

## Notes

- The Swagger shards in `wildberries_api_doc/03-orders-fbs/` should be verified against the live API for each fix
- All 3 breaking methods (getOrdersMeta, updateSuppliesOrder, getSuppliesOrder) need `@deprecated` wrappers with the `@see` tag pointing to replacements
- The `createOrdersExternalSticker` was announced as removed on October 23 per the WB release notes linked in the JSDoc
- Rate limit tiers remain the same for the new endpoints -- only the endpoint keys change in configuration
