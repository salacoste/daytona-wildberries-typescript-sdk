# Epic 19: Products Module Type Safety -- Wire Types & Fix Promise\<unknown\>

**Epic Goal**: Eliminate all `Promise<unknown>` return types, wire existing TypeScript interfaces to method signatures, generate missing response wrapper types, and extract inline types to named interfaces across the entire Products module.

**Target Completion**: Epic 19.x (Stories 19.1-19.4)
**SDK Version**: 3.x.0
**Status**: DONE

**Business Value**:
- Restores compile-time type safety for 11 Prices & Discounts methods (currently zero autocomplete, zero type checking)
- Fixes 3 POST methods that silently discard request bodies (data never reaches the API)
- Provides named interfaces for 20 inline-typed methods, improving code maintainability and documentation
- Unblocks downstream consumers who depend on typed responses for business-critical pricing workflows

---

## Epic 19 Overview

### Strategic Context

The Products module (`src/modules/products/index.ts`) was auto-generated from `02-products.yaml` but the code generator failed to wire types for the Prices & Discounts subsystem. The TypeScript interfaces already exist in `src/types/products.types.ts` -- they were generated correctly -- but the module methods do not import or reference them.

This was identified during the task-4.6 comparison audit (December 2025) but no remediation task was created. The result is that the most business-critical pricing operations provide zero type safety to SDK consumers.

### Technical Context

**Module File**: `src/modules/products/index.ts` (49 unique methods + 7 deprecated wrappers = 56 total)
**Types File**: `src/types/products.types.ts` (types exist but are unused by 11 methods)
**Swagger Source**: `wildberries_api_doc/02-products.yaml` + `wildberries_api_doc/02-products/_schemas.yaml`

**Scope of the Problem**:
- **11 methods** return `Promise<unknown>` -- no type information at all
- **3 POST methods** accept no parameters despite Swagger defining request bodies
- **~7 response wrapper types** are missing from `products.types.ts` (need to be generated)
- **20 methods** use verbose inline types instead of named interfaces

### Dependencies

**Depends On:**
- Epic 1 Complete -- Foundation infrastructure (BaseClient)
- Epic 2 Complete -- Products module generated (the module exists but has type gaps)
- Types file (`src/types/products.types.ts`) already contains base entity types

---

## Problem Inventory

### 11 Promise\<unknown\> Methods

All located in `src/modules/products/index.ts` lines 565-754. These are the Prices & Discounts subsystem methods.

| # | Method | Line | HTTP | Endpoint | Correct Return Type | Existing Type? |
|---|--------|------|------|----------|-------------------|----------------|
| 1 | `createUploadTask()` | 565 | POST | `/api/v2/upload/task` | `Promise<TaskCreated>` | YES -- `TaskCreated` |
| 2 | `createTaskSize()` | 583 | POST | `/api/v2/upload/task/size` | `Promise<TaskCreated>` | YES -- `TaskCreated` |
| 3 | `createTaskClubDiscount()` | 601 | POST | `/api/v2/upload/task/club-discount` | `Promise<TaskCreated>` | YES -- `TaskCreated` |
| 4 | `getHistoryTasks()` | 620 | GET | `/api/v2/history/tasks` | `Promise<ResponseTaskHistory>` | NO -- needs wrapper |
| 5 | `getGoodsTask()` | 639 | GET | `/api/v2/history/goods/task` | `Promise<ResponseGoodHistories>` | NO -- needs wrapper (uses `GoodHistory`) |
| 6 | `getBufferTasks()` | 658 | GET | `/api/v2/buffer/tasks` | `Promise<ResponseTaskBuffer>` | NO -- needs wrapper |
| 7 | `getGoodsTask2()` | 677 | GET | `/api/v2/buffer/goods/task` | `Promise<ResponseGoodBufferHistories>` | NO -- needs wrapper (uses `GoodBufferHistory`) |
| 8 | `getGoodsFilter()` | 696 | GET | `/api/v2/list/goods/filter` | `Promise<ResponseGoodsLists>` | NO -- needs wrapper (uses `GoodsList`) |
| 9 | `createGoodsFilter()` | 714 | POST | `/api/v2/list/goods/filter` | `Promise<ResponseGoodsLists>` | NO -- needs wrapper (uses `GoodsList`) |
| 10 | `getSizeNm()` | 733 | GET | `/api/v2/list/goods/size/nm` | `Promise<ResponseSizeLists>` | NO -- needs wrapper (uses `SizeGood`) |
| 11 | `getQuarantineGoods()` | 752 | GET | `/api/v2/quarantine/goods` | `Promise<ResponseQuarantineGoods>` | NO -- needs wrapper (uses `QuarantineGoods`) |

### 3 POST Methods Missing Request Body Parameters

These methods send `undefined` as the request body despite the Swagger defining required request schemas.

| # | Method | Swagger Request Body | Existing Type? | Current Signature | Correct Signature |
|---|--------|---------------------|---------------|-------------------|-------------------|
| 1 | `createUploadTask()` | `Goods` (array of `Good`) | YES -- `Goods` | `(): Promise<unknown>` | `(data: Goods): Promise<TaskCreated>` |
| 2 | `createTaskSize()` | `SizeGoodsBody` (array of `SizeGoodReq`) | YES -- `SizeGoodsBody` | `(): Promise<unknown>` | `(data: SizeGoodsBody): Promise<TaskCreated>` |
| 3 | `createTaskClubDiscount()` | `ClubDisc` (array of `ClubDiscReq`) | YES -- `ClubDisc` | `(): Promise<unknown>` | `(data: ClubDisc): Promise<TaskCreated>` |

**Severity**: HIGH -- These methods currently send no data to the API, making them non-functional. Callers cannot set prices, size prices, or club discounts through the SDK.

### 7 Missing Response Wrapper Types

The base entity types exist (`GoodHistory`, `GoodBufferHistory`, `GoodsList`, `SizeGood`, `QuarantineGoods`, `SupplierTaskMetadata`, `SupplierTaskMetadataBuffer`) but the API returns them wrapped in response envelopes. These wrappers need to be generated in `products.types.ts`.

| # | Wrapper Type Name | Inner Entity Type | Swagger Schema |
|---|------------------|------------------|----------------|
| 1 | `ResponseTaskHistory` | `SupplierTaskMetadata` | Response for `/api/v2/history/tasks` |
| 2 | `ResponseGoodHistories` | `GoodHistory[]` | Response for `/api/v2/history/goods/task` |
| 3 | `ResponseTaskBuffer` | `SupplierTaskMetadataBuffer` | Response for `/api/v2/buffer/tasks` |
| 4 | `ResponseGoodBufferHistories` | `GoodBufferHistory[]` | Response for `/api/v2/buffer/goods/task` |
| 5 | `ResponseGoodsLists` | `GoodsList[]` | Response for `/api/v2/list/goods/filter` (GET and POST) |
| 6 | `ResponseSizeLists` | `SizeGood[]` | Response for `/api/v2/list/goods/size/nm` |
| 7 | `ResponseQuarantineGoods` | `QuarantineGoods[]` | Response for `/api/v2/quarantine/goods` |

### 20 Inline-Typed Methods

These methods use verbose inline object types in their signatures instead of referencing named interfaces. Example:

```typescript
// Current (inline):
async getParentAll(options?: { locale?: string }): Promise<{
  data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string
}> { ... }

// Target (named interface):
async getParentAll(options?: GetParentAllParams): Promise<ResponseParentAll> { ... }
```

**Affected methods** (representative sample from `src/modules/products/index.ts`):

| # | Method | Line | Inline Return Type |
|---|--------|------|--------------------|
| 1 | `getParentAll()` | 28 | `{ data?: unknown; error?: boolean; errorText?: string; additionalErrors?: string }` |
| 2 | `getObjectAll()` | 47 | `{ data?: { subjectID?; parentID?; ... }[]; error?; ... }` |
| 3 | `getObjectCharc()` | 67 | `{ data?: { charcID?; subjectName?; ... }[]; error?; ... }` |
| 4 | `getDirectoryColors()` | 86 | `{ data?: unknown; error?; ... }` |
| 5 | `getDirectoryKinds()` | 105 | `{ data?: string[]; error?; ... }` |
| 6 | `getDirectoryCountries()` | 124 | `{ data?: unknown; error?; ... }` |
| 7 | `getDirectorySeasons()` | 143 | `{ data?: string[]; error?; ... }` |
| 8 | `getDirectoryVat()` | 162 | `{ data?: string[]; error?; ... }` |
| 9 | `getDirectoryTnved()` | 181 | `{ data?: { tnved?; isKiz? }[]; error?; ... }` |
| 10 | `getContentTags()` | 199 | `{ data?: unknown; error?; ... }` |
| 11 | `createDeleteTrash()` | 396 | `{ data?: Record<string, never>; error?; ... }` |
| 12 | `createCardsRecover()` | 415 | `{ data?: Record<string, never>; error?; ... }` |
| 13 | `getCardsLimits()` | 453 | `{ data?: { freeLimits?; paidLimits? }; error?; ... }` |
| 14 | `createContentBarcode()` | 472 | `{ data?: string[]; error?; ... }` |
| 15 | `createMediaFile()` | 528 | `{ data?: Record<string, never>; error?; ... }` |
| 16 | `createMediaSave()` | 547 | `{ data?: Record<string, never>; error?; ... }` |
| 17 | `createStock()` | 772 | `{ stocks?: { sku?; amount? }[] }` |
| 18 | `createWarehous()` | 865 | `{ id?: number }` |
| 19 | `getWarehousesContact()` | 921 | `{ contacts?: { comment?; phone? }[] }` |
| 20 | additional inline methods | various | various inline shapes |

---

## Story Breakdown

### Story 19.1: Wire Existing Types to Promise\<unknown\> Methods (CRITICAL)

**Priority**: CRITICAL -- Highest-impact, lowest-effort fix
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Import existing types from `products.types.ts` and wire them to the 3 methods that already have exact type matches (`TaskCreated`). Also add missing request body parameters to the 3 POST methods.

**Key Deliverables**:
- Import `TaskCreated`, `Goods`, `SizeGoodsBody`, `ClubDisc` from `products.types.ts`
- Wire `createUploadTask(data: Goods): Promise<TaskCreated>`
- Wire `createTaskSize(data: SizeGoodsBody): Promise<TaskCreated>`
- Wire `createTaskClubDiscount(data: ClubDisc): Promise<TaskCreated>`
- Pass `data` to `this.client.post()` instead of `undefined`

**Files Modified**:
- `src/modules/products/index.ts` (import + 3 method signature changes + 3 body fixes)

**Before/After**:
```typescript
// BEFORE (broken -- no data, no types):
async createUploadTask(): Promise<unknown> {
  return this.client.post<unknown>('.../upload/task', undefined);
}

// AFTER (functional -- typed data, typed response):
async createUploadTask(data: Goods): Promise<TaskCreated> {
  return this.client.post<TaskCreated>('.../upload/task', data);
}
```

**Acceptance Criteria**: AC #1 (partial), AC #2, AC #5 (3 of 11), AC #6

---

### Story 19.2: Generate Missing Response Wrapper Types (CRITICAL)

**Priority**: CRITICAL -- Unblocks remaining 8 Promise\<unknown\> methods
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Generate 7 missing response wrapper types in `products.types.ts` based on the Swagger response schemas. These wrap existing entity types in standard API response envelopes.

**Key Deliverables**:
- Generate `ResponseTaskHistory` wrapping `SupplierTaskMetadata`
- Generate `ResponseGoodHistories` wrapping `GoodHistory[]`
- Generate `ResponseTaskBuffer` wrapping `SupplierTaskMetadataBuffer`
- Generate `ResponseGoodBufferHistories` wrapping `GoodBufferHistory[]`
- Generate `ResponseGoodsLists` wrapping `GoodsList[]`
- Generate `ResponseSizeLists` wrapping `SizeGood[]`
- Generate `ResponseQuarantineGoods` wrapping `QuarantineGoods[]`

**Example Generated Type**:
```typescript
/** Response wrapper for GET /api/v2/list/goods/filter */
export interface ResponseGoodsLists {
  data?: {
    listGoods?: GoodsList[];
  };
}

/** Response wrapper for GET /api/v2/history/tasks */
export interface ResponseTaskHistory {
  data?: SupplierTaskMetadata;
}
```

**Wire to Methods**:
- `getHistoryTasks()` -> `Promise<ResponseTaskHistory>`
- `getGoodsTask()` -> `Promise<ResponseGoodHistories>`
- `getBufferTasks()` -> `Promise<ResponseTaskBuffer>`
- `getGoodsTask2()` -> `Promise<ResponseGoodBufferHistories>`
- `getGoodsFilter()` -> `Promise<ResponseGoodsLists>`
- `createGoodsFilter()` -> `Promise<ResponseGoodsLists>`
- `getSizeNm()` -> `Promise<ResponseSizeLists>`
- `getQuarantineGoods()` -> `Promise<ResponseQuarantineGoods>`

**Files Modified**:
- `src/types/products.types.ts` (add 7 response wrapper interfaces)
- `src/modules/products/index.ts` (import + wire 8 method return types)

**Acceptance Criteria**: AC #1 (complete), AC #3, AC #5 (all 11), AC #6

---

### Story 19.3: Extract Inline Types to Named Interfaces (HIGH)

**Priority**: HIGH -- Maintainability and documentation improvement
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Extract all 20 inline object types from method signatures into named interfaces in `products.types.ts`. This improves IDE documentation, enables type reuse, and makes the module file readable.

**Naming Convention**:
- Response types: `Response{OperationName}` (e.g., `ResponseParentAll`, `ResponseObjectAll`)
- Parameter types: `{OperationName}Params` (e.g., `GetObjectAllParams`, `GetGoodsFilterParams`)

**Key Deliverables**:
- Extract ~20 inline return types into named `Response*` interfaces
- Extract inline parameter types into named `*Params` interfaces where complex
- Update all method signatures to reference named types
- Ensure all new types are exported from `products.types.ts`

**Example Extraction**:
```typescript
// IN products.types.ts (new):
export interface ResponseParentAll {
  data?: unknown;
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}

export interface ObjectCharacteristic {
  charcID?: number;
  subjectName?: string;
  subjectID?: number;
  name?: string;
  required?: boolean;
  unitName?: string;
  maxCount?: number;
  popular?: boolean;
  charcType?: number;
}

export interface ResponseObjectCharc {
  data?: ObjectCharacteristic[];
  error?: boolean;
  errorText?: string;
  additionalErrors?: string;
}

// IN products/index.ts (updated):
async getObjectCharc(subjectId: number, options?: { locale?: string }): Promise<ResponseObjectCharc> { ... }
```

**Files Modified**:
- `src/types/products.types.ts` (add ~20+ named interfaces)
- `src/modules/products/index.ts` (update ~20 method signatures + imports)

**Acceptance Criteria**: AC #4

---

### Story 19.4: Validation, Tests, and Final Audit (HIGH)

**Priority**: HIGH -- Quality assurance
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Run TypeScript strict mode validation, update existing tests, add new type tests, and perform a final audit confirming zero `Promise<unknown>` remains in the Products module.

**Key Deliverables**:
- `npm run type-check` passes with zero errors in strict mode
- Grep audit: zero occurrences of `Promise<unknown>` in `src/modules/products/index.ts`
- Grep audit: zero occurrences of `<unknown>` in `this.client.post<unknown>` or `this.client.get<unknown>`
- Type assignability tests for all 7 new response wrapper types
- Unit tests for the 3 fixed POST methods (verify data is passed to client)
- Update existing products module tests if signatures changed

**Verification Commands**:
```bash
# Must return zero matches:
grep -c "Promise<unknown>" src/modules/products/index.ts
# Expected: 0

# Must pass:
npm run type-check
npm test -- tests/unit/modules/products
```

**Files Created**:
- `tests/unit/types/products-type-safety.test.ts`

**Files Modified**:
- `tests/unit/modules/products.test.ts` (update for new signatures)

**Acceptance Criteria**: AC #5, AC #7

---

## Implementation Plan Summary

The implementation follows a dependency-ordered sequence:

```
Story 19.1 (Wire 3 existing types + fix 3 POST bodies)
    |
    v
Story 19.2 (Generate 7 missing wrapper types + wire remaining 8 methods)
    |
    v
Story 19.3 (Extract 20 inline types to named interfaces)
    |
    v
Story 19.4 (Validation, tests, final zero-unknown audit)
```

**Phase 1** (Stories 19.1 + 19.2): Eliminate all `Promise<unknown>` -- the critical type safety gap.
**Phase 2** (Story 19.3): Improve code quality by extracting inline types.
**Phase 3** (Story 19.4): Validate and lock down with tests.

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `tests/unit/types/products-type-safety.test.ts` | Type safety validation tests |

### Modified Files
| File | Changes |
|------|---------|
| `src/modules/products/index.ts` | Wire types for 11 methods, add params to 3 POSTs, extract 20 inline types |
| `src/types/products.types.ts` | Add 7 response wrapper types, add ~20 named interfaces for inline types |
| `tests/unit/modules/products.test.ts` | Update tests for new method signatures |

---

## Success Metrics

- Zero occurrences of `Promise<unknown>` in `src/modules/products/index.ts`
- Zero occurrences of `this.client.post<unknown>(..., undefined)` for methods with defined request bodies
- All 47 Products methods have fully typed return values
- All 47 Products methods have fully typed parameters
- TypeScript strict mode passes with zero errors
- All existing and new tests pass

---

## Risk Assessment

### Low Risk
- Types already exist in `products.types.ts` -- Story 19.1 is pure wiring
- Existing entity types (`GoodHistory`, `GoodsList`, etc.) are well-defined
- No changes to HTTP behavior or API endpoints

### Medium Risk
- Response wrapper types (Story 19.2) must match actual API response shapes -- verify against Swagger schemas
- Extracting inline types (Story 19.3) may reveal inconsistencies between generated inline types and Swagger schemas
- The 3 POST body fixes (Story 19.1) change method signatures -- a breaking change for callers who currently call with zero arguments

### Mitigation
- Cross-reference all wrapper types with `02-products/_schemas.yaml` before implementation
- Provide overloaded signatures or optional parameters if backward compatibility is needed for the 3 POST methods
- Run full test suite after each story to catch regressions early

---

## Backlog Reference

**Task**: task-16 -- EPIC 19: Products Module Type Safety -- Wire Types & Fix Promise\<unknown\>
**Labels**: products, type-safety, epic, critical
**Priority**: High
