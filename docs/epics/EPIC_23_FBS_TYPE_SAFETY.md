# Epic 23: Orders FBS Type Safety and Naming Cleanup

**Epic Goal**: Eliminate 1 `Promise<unknown>` return type, extract ~18 inline type definitions into named types, fix 1 method name typo, add 4 missing schema types, and resolve the `Error` type that shadows the built-in `Error` global.

**Target Completion**: Epic 23.x (Stories 23.1-23.3)
**SDK Version**: 2.8.0
**Status**: TO DO

**Business Value**:
- Full type safety across all 34 FBS methods -- no `unknown` returns
- Named types enable IDE autocomplete and refactoring support for SDK consumers
- Fixes a method typo (`createOrdersStatu`) that degrades developer experience
- Eliminates the `Error` shadow that could cause subtle TypeScript resolution bugs
- Enables downstream documentation generation (TypeDoc) for all request/response shapes

---

## Epic 23 Overview

### Strategic Context

The Orders FBS module was auto-generated from Swagger and has several type safety gaps. Inline type literals in method signatures prevent SDK consumers from referencing request/response types by name. One method returns `Promise<unknown>`, removing all type information. The `Error` interface in `orders-fbs.types.ts` shadows TypeScript's built-in `Error`, which can cause confusing type resolution issues. This epic systematically addresses all type safety issues.

### Technical Context

**Files Under Audit**:
- `src/modules/orders-fbs/index.ts` -- 34 methods, ~18 inline types, 1 typo, 1 `unknown`
- `src/types/orders-fbs.types.ts` -- 14 named types, `Error` shadow, 4 missing schemas

**Current Type Inventory**:
- Named types in `orders-fbs.types.ts`: `PassOffice`, `Error`, `Next`, `Order`, `Supply`, `OrderNew`, `SupplyOrder`, `SupplyTrbx`, `TrbxStickers`, `Meta`, `Pass`, `CrossborderTurkeyClientInfo`, `CrossborderTurkeyClientInfoResp`, `OrdersRequestAPI`
- Inline types in `index.ts`: ~15 request parameter types + ~18 response types defined inline in method signatures

### Dependencies

**Depends On:**
- Epic 22 Complete - URL fixes must land first since new bulk methods introduce additional types

---

## Story Breakdown

### Story 23.1: Fix `Promise<unknown>` and Method Typo (CRITICAL)

**Priority**: CRITICAL - Type safety hole and naming bug
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Fix the two most impactful issues that affect every consumer of the SDK.

**Issue 1: `Promise<unknown>` in `getOrdersReshipment()`**

Current signature:
```typescript
async getOrdersReshipment(): Promise<{ orders?: { supplyID?: unknown; orderID?: unknown }[] }>
```

The `supplyID` and `orderID` fields are typed as `unknown`. Based on the Swagger spec, `supplyID` is `string` and `orderID` is `number`. Create a named `ReshipmentOrder` type.

**Issue 2: Method name typo `createOrdersStatu`**

The method `createOrdersStatu` should be `createOrdersStatus` (missing the trailing `s`). Provide the corrected method and a deprecated alias.

**Key Deliverables**:
- New type: `ReshipmentOrder` with `supplyID: string` and `orderID: number`
- New type: `ReshipmentOrdersResponse` wrapping `{ orders?: ReshipmentOrder[] }`
- Fix `getOrdersReshipment()` return type to `Promise<ReshipmentOrdersResponse>`
- Rename `createOrdersStatu()` to `createOrdersStatus()`
- Deprecated alias: `createOrdersStatu()` delegates to `createOrdersStatus()`

**Acceptance Criteria**:
- [ ] `getOrdersReshipment()` returns `Promise<ReshipmentOrdersResponse>` with no `unknown` fields
- [ ] `ReshipmentOrder` type has `supplyID: string` and `orderID: number`
- [ ] Method `createOrdersStatus()` exists with correct spelling
- [ ] `createOrdersStatu()` marked `@deprecated` and delegates to `createOrdersStatus()`
- [ ] Zero `unknown` types remain in the module
- [ ] TypeScript compilation passes in strict mode

**Files Modified**:
- `src/modules/orders-fbs/index.ts`
- `src/types/orders-fbs.types.ts`

---

### Story 23.2: Extract Inline Types to Named Interfaces (HIGH)

**Priority**: HIGH - Developer experience and documentation
**Estimated Complexity**: HIGH
**Status**: TO DO

**Description**: Extract all inline type literals from method signatures in `index.ts` into named interfaces in `orders-fbs.types.ts`. This enables SDK consumers to import and reference these types.

**Full Inventory of Inline Types to Extract**:

#### Request Parameter Types (inline in method signatures)

| # | Method | Current Inline Type | Proposed Named Type |
|---|--------|-------------------|-------------------|
| 1 | `createPass()` | `{ firstName: string; lastName: string; carModel: string; carNumber: string; officeId: number }` | `CreatePassRequest` |
| 2 | `updatePass()` | `{ firstName: string; lastName: string; carModel: string; carNumber: string; officeId: number }` | `UpdatePassRequest` |
| 3 | `orders()` | `{ limit: number; next: number; dateFrom?: number; dateTo?: number }` | `GetOrdersParams` |
| 4 | `createOrdersStatu()` | `{ orders: number[] }` | `OrderStatusRequest` |
| 5 | `createOrdersSticker()` options | `{ type: 'svg' \| 'zplv' \| 'zplh' \| 'png'; width: 58 \| 40; height: 40 \| 30 }` | `StickerFormatParams` |
| 6 | `createOrdersSticker()` body | `{ orders?: number[] }` | `OrderStickerRequest` |
| 7 | `deleteOrdersMeta()` options | `{ key?: string }` | `DeleteMetaParams` |
| 8 | `updateMetaSgtin()` body | `{ sgtins?: string[] }` | `MetaSgtinRequest` |
| 9 | `updateMetaUin()` body | `{ uin: string }` | `MetaUinRequest` |
| 10 | `updateMetaImei()` body | `{ imei: string }` | `MetaImeiRequest` |
| 11 | `updateMetaGtin()` body | `{ gtin: string }` | `MetaGtinRequest` |
| 12 | `updateMetaExpiration()` body | `{ expiration?: string }` | `MetaExpirationRequest` |
| 13 | `createSupply()` body | `{ name?: string }` | `CreateSupplyRequest` |
| 14 | `supplies()` options | `{ limit: number; next: number }` | `GetSuppliesParams` |
| 15 | `createSuppliesTrbx()` body | `{ amount: number }` | `CreateTrbxRequest` |
| 16 | `deleteSuppliesTrbx()` body | `{ trbxIds: string[] }` | `DeleteTrbxRequest` |
| 17 | `getSuppliesBarcode()` options | `{ type: 'svg' \| 'zplv' \| 'zplh' \| 'png' }` | `BarcodeFormatParams` |
| 18 | `createTrbxSticker()` options | `{ type: 'svg' \| 'zplv' \| 'zplh' \| 'png' }` | `BarcodeFormatParams` (reuse) |
| 19 | `createTrbxSticker()` body | `{ trbxIds: string[] }` | `TrbxStickerRequest` |

#### Response Types (inline in method signatures)

| # | Method | Current Inline Return Type | Proposed Named Type |
|---|--------|--------------------------|-------------------|
| 1 | `getOrdersNew()` | `{ orders?: OrderNew[] }` | `OrdersNewResponse` |
| 2 | `createOrdersStatu()` | `{ orders?: { id?: number; supplierStatus?: ...; wbStatus?: ... }[] }` | `OrderStatusResponse` + `OrderStatusItem` |
| 3 | `getOrdersReshipment()` | `{ orders?: { supplyID?: unknown; orderID?: unknown }[] }` | `ReshipmentOrdersResponse` (Story 23.1) |
| 4 | `createPass()` | `{ id?: number }` | `CreatePassResponse` |
| 5 | `orders()` | `{ next?: Next; orders?: Order[] }` | `OrdersListResponse` |
| 6 | `createOrdersSticker()` | `{ stickers?: { orderId?: number; partA?: string; partB?: string; barcode?: string; file?: string }[] }` | `OrderStickersResponse` + `OrderSticker` |
| 7 | `getOrdersMeta()` | `{ meta?: Meta }` | `OrderMetaResponse` |
| 8 | `createStickersCrossBorder()` | `{ stickers?: { file?: string; orderId?: number }[] }` | `CrossBorderStickersResponse` + `CrossBorderSticker` |
| 9 | `createOrdersExternalSticker()` | `{ stickers?: { orderID?: number; url?: string; parcelID?: string }[] }` | `ExternalStickersResponse` + `ExternalSticker` |
| 10 | `createStatusHistory()` | `{ orders?: { deliveryDate?: string; statuses?: { date?: string; code?: string }[]; orderID?: number }[] }` | `StatusHistoryResponse` + `StatusHistoryOrder` + `StatusHistoryEntry` |
| 11 | `supplies()` | `{ next?: Next; supplies?: Supply[] }` | `SuppliesListResponse` |
| 12 | `createSupply()` | `{ id?: string }` | `CreateSupplyResponse` |
| 13 | `getSuppliesOrder()` | `{ orders?: SupplyOrder[] }` | `SupplyOrdersResponse` |
| 14 | `getSuppliesTrbx()` | `{ trbxes?: SupplyTrbx[] }` | `SupplyTrbxListResponse` |
| 15 | `createSuppliesTrbx()` | `{ trbxIds?: string[] }` | `CreateTrbxResponse` |
| 16 | `getSuppliesBarcode()` | `{ barcode?: string; file?: string }` | `SupplyBarcodeResponse` |
| 17 | `createTrbxSticker()` | `{ stickers?: TrbxStickers[] }` | `TrbxStickersResponse` |
| 18 | `createOrdersClient()` | Already uses `CrossborderTurkeyClientInfoResp` | _(no change)_ |

**Shared Enums to Extract**:
```typescript
/** Sticker format type */
type StickerFormat = 'svg' | 'zplv' | 'zplh' | 'png';

/** Order supplier status */
type SupplierStatus = 'new' | 'confirm' | 'complete' | 'cancel';

/** Order WB system status */
type WbStatus = 'waiting' | 'sorted' | 'sold' | 'canceled' | 'canceled_by_client' | 'declined_by_client' | 'defect' | 'ready_for_pickup' | 'postponed_delivery';

/** Cargo size type: 1=small, 2=oversized, 3=large */
type CargoType = 1 | 2 | 3;
```

**Acceptance Criteria**:
- [ ] All ~15 inline request types extracted to named interfaces in `orders-fbs.types.ts`
- [ ] All ~18 inline response types extracted to named interfaces in `orders-fbs.types.ts`
- [ ] Shared enums/unions (`StickerFormat`, `SupplierStatus`, `WbStatus`, `CargoType`) defined once and reused
- [ ] All types exported from `orders-fbs.types.ts` and re-exported from `src/index.ts`
- [ ] Method signatures in `index.ts` reference named types instead of inline literals
- [ ] TypeScript compilation passes in strict mode
- [ ] No functional behavior changes -- only type extraction

**Files Modified**:
- `src/types/orders-fbs.types.ts`
- `src/modules/orders-fbs/index.ts`
- `src/index.ts` (re-exports)

---

### Story 23.3: Fix `Error` Shadow and Add Missing Schema Types (MEDIUM)

**Priority**: MEDIUM - Type hygiene
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Rename the `Error` interface to `FbsApiError` to avoid shadowing TypeScript's built-in `Error` global. Add 4 missing schema types referenced in the Swagger spec but absent from the types file.

**Issue 1: `Error` Shadow**

Current:
```typescript
export interface Error {
  code?: string;
  message?: string;
  data?: Record<string, never>;
}
```

This shadows the global `Error` class. Any code importing this type alongside `try/catch` error handling could get unexpected type resolution.

**Fix**: Rename to `FbsApiError` and update all references.

**Issue 2: Missing Schema Types**

The following types are referenced in Swagger schemas but not present in `orders-fbs.types.ts`:

| # | Missing Type | Used By | Schema Source |
|---|-------------|---------|---------------|
| 1 | `OrderAddress` | `Order.address`, `OrderNew.address` | Inline object in `address` field |
| 2 | `OrderOptions` | `Order.options`, `OrderNew.options` | Inline object in `options` field |
| 3 | `MetaValue` | `Meta.imei`, `Meta.uin`, `Meta.gtin`, `Meta.expiration`, `Meta.customsDeclaration` | Inline `{ value?: string }` pattern |
| 4 | `MetaSgtinValue` | `Meta.sgtin` | Inline `{ value?: string[] }` pattern |

**Acceptance Criteria**:
- [ ] `Error` interface renamed to `FbsApiError`
- [ ] All internal references to `Error` updated to `FbsApiError`
- [ ] `OrderAddress` extracted from inline `address` objects in `Order` and `OrderNew`
- [ ] `OrderOptions` extracted from inline `options` objects in `Order` and `OrderNew`
- [ ] `MetaValue` type created for the `{ value?: string }` pattern used in `Meta`
- [ ] `MetaSgtinValue` type created for the `{ value?: string[] }` pattern used in `Meta`
- [ ] `Meta` interface updated to use `MetaValue` and `MetaSgtinValue`
- [ ] `Order` and `OrderNew` updated to use `OrderAddress` and `OrderOptions`
- [ ] TypeScript compilation passes in strict mode

**Files Modified**:
- `src/types/orders-fbs.types.ts`

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `docs/epics/EPIC_23_FBS_TYPE_SAFETY.md` | This EPIC summary |

### Modified Files
| File | Changes |
|------|---------|
| `src/types/orders-fbs.types.ts` | ~35 new named types, rename `Error` to `FbsApiError`, extract inline objects |
| `src/modules/orders-fbs/index.ts` | Replace all inline types with named references, fix `createOrdersStatu` typo |
| `src/index.ts` | Re-export all new named types |

---

## Breaking Changes Summary

### What Breaks
- `Error` type renamed to `FbsApiError` -- any code importing `Error` from `orders-fbs.types.ts` must update the import
- `createOrdersStatu()` renamed to `createOrdersStatus()` -- old name remains as deprecated alias

### What Does NOT Break
- All method signatures remain functionally identical -- only type references change
- Runtime behavior is completely unchanged
- Existing code that does not import FBS types directly is unaffected

### Migration Effort
- **Zero migration** if not importing `Error` type from FBS module
- **1 minute** to rename `Error` import to `FbsApiError`
- **1 minute** to rename `createOrdersStatu` calls to `createOrdersStatus`

---

## Type Metrics (Before / After)

| Metric | Before | After |
|--------|--------|-------|
| Named types in `orders-fbs.types.ts` | 14 | ~49 |
| Inline types in `index.ts` | ~33 | 0 |
| `unknown` types | 2 | 0 |
| Global type shadows | 1 (`Error`) | 0 |
| Method typos | 1 (`createOrdersStatu`) | 0 |
| Shared enum types | 0 | 4 (`StickerFormat`, `SupplierStatus`, `WbStatus`, `CargoType`) |
| Importable request types | 1 (`OrdersRequestAPI`) | ~16 |
| Importable response types | 1 (`CrossborderTurkeyClientInfoResp`) | ~18 |

---

## Risk Assessment

### Low Risk
- All changes are type-level only -- no runtime behavior changes
- Deprecated alias for `createOrdersStatu` preserves backward compatibility
- Inline type extraction is a mechanical refactoring

### Medium Risk
- Renaming `Error` to `FbsApiError` is a breaking change for direct importers
- Large number of new types could have naming conflicts with other modules

### Mitigation
- Prefix all ambiguous types with context (e.g., `OrderSticker` not just `Sticker`)
- Deprecated alias preserves old method name
- Clear JSDoc on `FbsApiError` explaining the rename rationale

---

## Notes

- The `createOrdersStatu` typo originates from the auto-generator truncating "status" -- the generator should also be fixed to prevent recurrence
- The `Error` shadow is present in multiple modules (not just FBS) -- a cross-module audit should follow in a separate epic
- Shared types like `StickerFormat` could potentially be promoted to a shared `src/types/common.types.ts` in a future refactor
- The inline types in `Order` and `OrderNew` have significant overlap -- `OrderNew` extends `Order` with additional fields. Consider using type composition.
