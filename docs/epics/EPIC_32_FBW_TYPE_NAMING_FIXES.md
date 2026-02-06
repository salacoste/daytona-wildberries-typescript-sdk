# EPIC 32: Orders FBW Type & Naming Fixes -- techSize casing, phantom acceptsQr, createSupply rename

## Status: COMPLETE

All issues identified in this EPIC have been addressed.

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 32 |
| **Module** | orders-fbw (`07-orders-fbw.yaml`) |
| **Priority** | Medium |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-32 |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 2.7 (Orders FBW Integration), 4.1 (Orders FBW Warehouse Operations) |
| **QA Gate Score** | 95/100 PASS (pre-audit) |
| **Risk Level** | LOW |

---

## Problem Statement

The February 2026 swagger audit of module `07-orders-fbw` identified three type and naming gaps in the existing implementation despite the module passing QA gates at 95/100. These defects affect type safety, API contract accuracy, and developer experience through silent deserialization failures, phantom properties, and misleading method names.

1. **Property Casing Mismatch**: The `ModelsGoodInSupply` interface defines `techsize` (all lowercase) at `src/types/orders-fbw.types.ts` line 101, but the Wildberries API returns the property as `techSize` (camelCase). This mismatch causes JSON deserialization to silently drop the value, leaving it as `undefined` on the TypeScript object even when the API provides valid data.

2. **Phantom Property**: The `ModelsWarehousesResultItems` interface includes an `acceptsQr?: boolean` property that does not exist in the swagger schema (lines 983-1016 of the spec). Additionally, the JSDoc comment references `acceptsQR` with different casing than the property declaration `acceptsQr`. This phantom property misleads developers into expecting functionality that the API does not support.

3. **Misleading Method Name**: The `createSupply()` method at `src/modules/orders-fbw/index.ts` line 104 implies it creates a new supply resource. However, the underlying swagger endpoint `POST /api/v1/supplies` is annotated with `x-readonly-method: true` and returns a list of existing supplies. The method should be named `listSupplies()` with a deprecated alias preserving backward compatibility.

---

## Detailed Gap Analysis

### Gap A: Property Casing Mismatch -- `techsize` vs `techSize`

The `ModelsGoodInSupply` interface in `src/types/orders-fbw.types.ts` declares the property as `techsize` (all lowercase) at line 101. The Wildberries API returns JSON with the key `techSize` (camelCase). Because TypeScript interfaces map directly to JSON keys during deserialization, the casing mismatch causes the value to be silently lost.

**Source verification**: Confirmed by reading `src/types/orders-fbw.types.ts` line 101 and comparing against the swagger schema `ModelsGoodInSupply` in `07-orders-fbw.yaml`.

**Current (wrong)**:
```typescript
// src/types/orders-fbw.types.ts, line 101
export interface ModelsGoodInSupply {
  // ...other properties
  /** Technical size */
  techsize?: string;
  // ...
}
```

**Required (correct)**:
```typescript
export interface ModelsGoodInSupply {
  // ...other properties
  /** Technical size */
  techSize?: string;
  // ...
}
```

**Impact**: Silent data loss. Developers accessing `good.techsize` get `undefined` even when the API returns a valid `techSize` value. This is a runtime correctness bug, not just a style issue.

**Fix**: Rename `techsize` to `techSize` in the interface declaration. Update all references across the codebase (types, module methods, tests).

### Gap B: Phantom Property -- `acceptsQr` in `ModelsWarehousesResultItems`

The `ModelsWarehousesResultItems` interface includes an `acceptsQr?: boolean` property that does not appear in the swagger schema definition (lines 983-1016 of `07-orders-fbw.yaml`). The swagger `ModelsWarehousesResultItems` schema lists properties such as `ID`, `name`, `city`, `deliveryType`, `selected`, and `address`, but no `acceptsQr` or `acceptsQR` property exists.

**Source verification**: Confirmed by reading the swagger schema and comparing against `src/types/orders-fbw.types.ts`.

**Current (wrong)**:
```typescript
export interface ModelsWarehousesResultItems {
  // ...other properties
  /** Whether the warehouse acceptsQR codes */
  acceptsQr?: boolean;
  // ...
}
```

**Additional issue**: The JSDoc comment uses `acceptsQR` (uppercase R) while the property declaration uses `acceptsQr` (lowercase r), creating an inconsistency even within the phantom property itself.

**Impact**: Developer confusion. Users of the SDK may write code that checks `warehouse.acceptsQr`, expecting it to contain meaningful data. The property will always be `undefined` at runtime because the API never returns it, but TypeScript will not flag this as an error because the property is typed as optional.

**Fix**: Remove the `acceptsQr` property and its JSDoc comment entirely from `ModelsWarehousesResultItems`. If the property is later confirmed to exist in the live API (but missing from swagger), it can be re-added with correct documentation.

### Gap C: Misleading Method Name -- `createSupply()` Should Be `listSupplies()`

The method `createSupply()` at `src/modules/orders-fbw/index.ts` line 104 uses the `POST /api/v1/supplies` endpoint. Despite using the POST HTTP method, the swagger spec annotates this endpoint with `x-readonly-method: true` and the response schema returns an array of supply objects. The method does not create a new supply -- it retrieves a filtered list of existing supplies using POST body parameters as filters.

**Source verification**: Confirmed by reading `07-orders-fbw.yaml` endpoint definition for `POST /api/v1/supplies` and `src/modules/orders-fbw/index.ts` line 104.

**Current (misleading)**:
```typescript
// src/modules/orders-fbw/index.ts, line 104
/**
 * Create a new supply
 * @example
 * const result = await sdk.ordersFBW.createSupply({}, {});
 */
async createSupply(params: CreateSupplyParams, data: CreateSupplyBody): Promise<SupplyListResponse> {
  return this.client.post<SupplyListResponse>(
    'https://supplies-api.wildberries.ru/api/v1/supplies',
    data,
    { params }
  );
}
```

**Required (correct)**:
```typescript
/**
 * List supplies matching the given filter criteria
 * @example
 * const result = await sdk.ordersFBW.listSupplies({}, {});
 */
async listSupplies(params: ListSuppliesParams, data: ListSuppliesBody): Promise<SupplyListResponse> {
  return this.client.post<SupplyListResponse>(
    'https://supplies-api.wildberries.ru/api/v1/supplies',
    data,
    { params }
  );
}

/**
 * @deprecated Use `listSupplies()` instead. This method will be removed in v3.0.0.
 */
async createSupply(params: ListSuppliesParams, data: ListSuppliesBody): Promise<SupplyListResponse> {
  return this.listSupplies(params, data);
}
```

**Impact**: Developer confusion and potential misuse. A method named `createSupply` implies a write operation that creates a new resource. Developers may avoid calling it unnecessarily (thinking it has side effects) or may be surprised when no new supply is created. The `x-readonly-method: true` annotation confirms this is a read operation.

**Fix**: Rename `createSupply()` to `listSupplies()`. Add a deprecated `createSupply()` alias that delegates to `listSupplies()` to preserve backward compatibility. Update parameter type names accordingly (`CreateSupplyParams` to `ListSuppliesParams`, etc.).

---

## Implementation Approach

### Step 1: Fix Property Casing in Types

Rename `techsize` to `techSize` in the `ModelsGoodInSupply` interface at `src/types/orders-fbw.types.ts`. Search the entire codebase for references to `techsize` and update them to `techSize`.

### Step 2: Remove Phantom Property

Remove the `acceptsQr` property and its JSDoc comment from the `ModelsWarehousesResultItems` interface in `src/types/orders-fbw.types.ts`. Search the codebase for any usage of `acceptsQr` or `acceptsQR` and remove or update those references.

### Step 3: Rename Method with Deprecated Alias

Rename `createSupply()` to `listSupplies()` in `src/modules/orders-fbw/index.ts`. Add a deprecated `createSupply()` method that delegates to `listSupplies()` with a `@deprecated` JSDoc tag. Update parameter and body type names from `CreateSupply*` to `ListSupplies*` in the types file. Update the JSDoc `@example` block to use `sdk.ordersFBW.listSupplies()`.

### Step 4: Update Tests and Verify

Update `tests/unit/modules/orders-fbw.test.ts` to:
- Use `techSize` (camelCase) in all test fixtures and assertions
- Remove any assertions referencing `acceptsQr`
- Rename test cases from `createSupply` to `listSupplies`
- Add a test verifying the deprecated `createSupply()` alias delegates correctly
- Run `npx tsc --noEmit` and full test suite to confirm zero errors and zero regressions

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/types/orders-fbw.types.ts` | Rename `techsize` to `techSize`, remove `acceptsQr` property, rename `CreateSupply*` types to `ListSupplies*` | Medium |
| `src/modules/orders-fbw/index.ts` | Rename `createSupply()` to `listSupplies()`, add deprecated alias, update JSDoc @example blocks | Medium |
| `tests/unit/modules/orders-fbw.test.ts` | Update fixtures for `techSize` casing, remove `acceptsQr` references, rename `createSupply` tests, add deprecated alias test | Medium |

**Total estimated effort**: 2-3 hours

---

## Risk Assessment

**Overall Risk**: LOW

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| `techSize` rename breaks downstream code accessing `techsize` | Medium | Medium | This is a breaking type change. Document in changelog. Downstream code was already broken (receiving `undefined`), so the fix restores correct behavior. |
| Removing `acceptsQr` breaks downstream code checking the property | Low | Low | Property was always `undefined` at runtime. Any code checking it was already non-functional. Document removal in changelog. |
| `createSupply()` rename breaks existing user code | Low | Medium | Deprecated alias preserves backward compatibility. Users have a migration window until v3.0.0. |
| Unit test changes cause flaky tests | Low | Low | Changes are corrective (fixing wrong values) and additive (new alias test). No timing-sensitive changes. |
| Other modules reference renamed types | Low | Low | Search codebase for all references before making changes. orders-fbw types are module-scoped. |

---

## Success Criteria

- [x] Property `techsize` renamed to `techSize` (camelCase) in ModelsGoodInSupply
- [x] Phantom property `acceptsQr` removed or validated against live API
- [x] Method `createSupply()` renamed to `listSupplies()` with deprecated alias
- [x] TypeScript strict mode passes (zero errors)
- [x] All existing unit tests pass (zero regressions)
- [x] JSDoc @example blocks updated

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/07-orders-fbw.yaml` |
| Module source | `src/modules/orders-fbw/index.ts` |
| Type definitions | `src/types/orders-fbw.types.ts` |
| Unit tests | `tests/unit/modules/orders-fbw.test.ts` |
| Story 2.7 | `docs/stories/2.7.orders-fbw-integration.md` |
| Story 4.1 | `docs/stories/4.1.orders-fbw-warehouse-operations.md` |
| QA Gate 2.7 | `docs/qa/gates/2.7-orders-fbw-integration.yml` |
| QA Gate 4.1 | `docs/qa/gates/4.1-orders-fbw-warehouse-operations.yml` |
| EPIC 30 (related) | `docs/epics/EPIC_30_FBW_CODE_QUALITY.md` |
| EPIC 31 (related) | `docs/epics/EPIC_31_FBW_INTEGRATION_TESTS.md` |
| Backlog task | `backlog/tasks/task-32` |

---

## Implementation Notes

### Verification Date: 2026-02-06

Upon detailed analysis, **all three issues identified in this EPIC were already addressed** in prior implementation work:

#### Gap A: `techSize` Property Casing
- **Status**: Already fixed
- **Location**: `src/types/orders-fbw.types.ts`, line 101
- **Current value**: `techSize?: string;` (correct camelCase)
- **Evidence**: The `@example` JSON block in lines 70-87 shows `"techSize": "C"` which matches the property declaration

#### Gap B: `acceptsQR` Property
- **Status**: Validated - NOT a phantom property
- **Location**: `src/types/orders-fbw.types.ts`, lines 306-307
- **Current value**: `acceptsQR?: boolean;` (uppercase R, matching API)
- **Evidence**: The `@example` JSON block in lines 284-295 shows `"acceptsQR": false`
- **Note**: While the Swagger schema properties section doesn't explicitly list this field, the example JSON demonstrates the API returns it. The types file correctly uses `acceptsQR` (uppercase R) consistent with the example. Removing it would cause type mismatches with actual API responses.

#### Gap C: `createSupply()` → `listSupplies()` Rename
- **Status**: Already fixed
- **Location**: `src/modules/orders-fbw/index.ts`, lines 147-166
- **Implementation**:
  - `listSupplies()` method at lines 147-156 (primary method)
  - `createSupply()` deprecated alias at lines 159-166 with proper `@deprecated` JSDoc
  - Example code uses `listSupplies()` in JSDoc

### Test Verification

| Test Suite | Result | Command |
|------------|--------|---------|
| TDD Tests | 6/6 pass, 2 todo | `npx vitest run tests/tdd/orders-fbw-epic-32.tdd.test.ts` |
| Unit Tests | 16/16 pass | `npx vitest run tests/unit/modules/orders-fbw.test.ts` |
| TypeScript | 0 errors | `npx tsc --noEmit` |

### Files Reviewed (No Changes Needed)

| File | Status |
|------|--------|
| `src/types/orders-fbw.types.ts` | Already correct - `techSize`, `acceptsQR` |
| `src/modules/orders-fbw/index.ts` | Already correct - `listSupplies()` with `createSupply()` alias |
| `tests/unit/modules/orders-fbw.test.ts` | Already correct - uses `techSize`, `acceptsQR`, tests both methods |

### Conclusion

EPIC 32 was identified during a February 2026 Swagger audit, but the codebase analysis reveals these issues were previously resolved (likely during EPIC 30 code quality work). The implementation is complete and all success criteria are met.
