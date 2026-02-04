# Epic 20: Products Module Method Naming & Duplicate Cleanup

**Epic Goal**: Resolve all method naming inconsistencies, fix typos, rename misleading methods, and consolidate ~28 duplicate methods accumulated from code generation iterations.

**Target Completion**: Epic 20.x (Stories 20.1-20.3)

**Business Value**:
- Correct API surface for SDK consumers (no more guessing `createWarehous` vs `createWarehouse`)
- Eliminate confusion from misleading method names (e.g., `createStock()` that actually reads data)
- Remove ~28 duplicate methods that bloat autocomplete and documentation
- Non-breaking migration path via `@deprecated` wrappers

---

## Epic 20 Overview

### Strategic Context

**Problem Statement:**
The Products module (`src/modules/products/index.ts`) has accumulated naming issues from automated code generation against the Wildberries OpenAPI specification. These fall into three categories:

1. **Typos**: Method names with spelling errors carried over from operationId values
2. **Misleading Names**: Methods whose names imply a write operation but actually perform reads (POST endpoints with `x-readonly-method: true`)
3. **Duplicates**: Multiple methods calling the same endpoint with different names, produced across generation iterations

**Impact on SDK Users:**
- TypeScript autocomplete shows duplicate entries for the same endpoint
- Developers call `createStock()` expecting to create stock, but it returns existing stock levels
- Typo methods (`createWarehous`) cause confusion and reduce trust in the SDK
- 47+ methods in a single module when ~19 unique endpoints exist

### Technical Context

**API Documentation**: `wildberries_api_doc/02-products/*.yaml`
**Module File**: `src/modules/products/index.ts` (47 methods, ~940 lines)

**Naming Issues Identified (from task-4.6 comparison + PM audit):**

| Category | Count | Severity |
| --- | --- | --- |
| Typo methods | 3 | HIGH - spelling errors in public API |
| Misleading names | 4 | HIGH - wrong verb implies wrong operation |
| Duplicate methods | ~28 | MEDIUM - bloat and confusion |
| **Total** | **~35** | |

### Dependencies

**Depends On:**
- task-16 (Epic 19: Products Module Type Safety) - Type improvements must land first so renames operate on clean types

---

## Story Breakdown

### Story 20.1: Fix Typo Methods (HIGH)

**Priority**: HIGH - Spelling errors in public API surface
**Estimated Complexity**: LOW
**Story Points**: 2

**Description**: Three warehouse management methods have a missing trailing "e" in "Warehouse", carried over from malformed `operationId` values in the Swagger specification.

**Affected Methods**:

| Current (Typo) | Correct Name | Line | HTTP Method | Endpoint |
| --- | --- | --- | --- | --- |
| `createWarehous()` | `createWarehouse()` | 865 | `POST` | `/api/v3/warehouses` |
| `updateWarehous()` | `updateWarehouse()` | 884 | `PUT` | `/api/v3/warehouses/{warehouseId}` |
| `deleteWarehous()` | `deleteWarehouse()` | 902 | `DELETE` | `/api/v3/warehouses/{warehouseId}` |

**Migration Strategy**:
1. Create correctly named methods (`createWarehouse`, `updateWarehouse`, `deleteWarehouse`)
2. Convert old methods to `@deprecated` wrappers that delegate to the new names
3. Add JSDoc deprecation notice with migration path

**Example Wrapper**:
```typescript
/**
 * @deprecated Use {@link createWarehouse} instead. Will be removed in next major version.
 */
async createWarehous(data: { name: string; officeId: number }): Promise<{ id?: number }> {
  return this.createWarehouse(data);
}
```

**Acceptance Criteria**:
1. Three correctly spelled methods exist: `createWarehouse()`, `updateWarehouse()`, `deleteWarehouse()`
2. Old typo methods preserved as `@deprecated` wrappers delegating to new methods
3. JSDoc on deprecated methods includes `@deprecated` tag with `@see` link to replacement
4. All existing tests updated to use new method names
5. TypeScript compiles cleanly

---

### Story 20.2: Rename Misleading Methods (HIGH)

**Priority**: HIGH - Method names contradict their actual behavior
**Estimated Complexity**: MEDIUM
**Story Points**: 3

**Description**: Four methods have names that strongly imply a write/create operation but actually perform read operations. This is the most dangerous naming issue because developers may avoid calling them for reads, or expect side effects that do not occur.

**Affected Methods**:

| Current Name | Correct Name | Reason | HTTP | Actual Behavior |
| --- | --- | --- | --- | --- |
| `createStock()` | `getStocks()` | POST that reads stock levels (`x-readonly-method: true`) | `POST` | Returns stock quantities for given SKUs |
| `createCardsList()` | `getCardsList()` | POST that reads/lists product cards | `POST` | Returns paginated list of product cards |
| `createCardsTrash()` | `getTrashedCards()` | POST that reads/lists trashed cards | `POST` | Returns paginated list of trashed cards |
| `getGoodsTask2()` | `getBufferGoodsTask()` | Name collision workaround from generation | `GET` | Returns buffer goods task status |

**Note on POST-as-GET Pattern**: The Wildberries API uses `POST` for several read operations that require complex filter/cursor payloads in the request body. The `createStock()` method at line 772 accepts a warehouse ID and SKU list, then returns stock quantities -- purely a read operation despite using `POST`.

**Migration Strategy**: Same as Story 20.1 -- add correct names, wrap old names with `@deprecated`.

**Acceptance Criteria**:
1. Four correctly named methods exist: `getStocks()`, `getCardsList()`, `getTrashedCards()`, `getBufferGoodsTask()`
2. Old method names preserved as `@deprecated` wrappers
3. JSDoc on new methods clearly documents the read-only nature of POST endpoints
4. `getCardsList()` retains the cursor limit validation logic (max 100 cards)
5. All existing tests updated to use new method names
6. TypeScript compiles cleanly

---

### Story 20.3: Consolidate Duplicate Methods (MEDIUM)

**Priority**: MEDIUM - API surface bloat
**Estimated Complexity**: HIGH
**Story Points**: 5

**Description**: Approximately 28 methods are duplicates -- multiple method names calling the same endpoint. These accumulated across code generation iterations (e.g., `warehouses()` vs `getWarehouses()`, `offices()` vs `getWBOffices()`).

**Approach**:
1. Audit all 47 methods and map each to its target endpoint
2. For each endpoint, select the primary method name following SDK conventions:
   - `get*` for read operations
   - `create*` for resource creation
   - `update*` for modifications
   - `delete*` for removals
3. Mark duplicates as `@deprecated` with JSDoc pointing to the primary name
4. Document the full mapping in CHANGELOG

**Naming Convention Rules**:
```
GET  /resource       → getResources()     (plural for lists)
GET  /resource/{id}  → getResource(id)    (singular for single)
POST /resource       → createResource()   (for actual creates)
POST /resource       → getResource()      (for POST-as-GET reads)
PUT  /resource/{id}  → updateResource()
DELETE /resource/{id} → deleteResource()
```

**Acceptance Criteria**:
1. Complete endpoint-to-method mapping documented
2. Primary method selected for each unique endpoint following naming conventions
3. Duplicate methods marked `@deprecated` with `@see` pointing to primary method
4. No endpoint loses coverage -- all existing functionality preserved
5. CHANGELOG documents the full rename mapping with migration guide
6. All tests updated to use primary method names
7. TypeScript compiles cleanly with no errors

---

## Implementation Strategy

### Phase 1: Typo Fixes (Story 20.1)
**Timeline**: 1 day
**Focus**: Simplest changes, highest visibility improvement
**Dependencies**: task-16 complete

### Phase 2: Misleading Renames (Story 20.2)
**Timeline**: 1-2 days
**Focus**: Correct verb semantics for read-only POST methods
**Dependencies**: Story 20.1 complete (avoid conflicting edits)

### Phase 3: Duplicate Consolidation (Story 20.3)
**Timeline**: 2-3 days
**Focus**: Full audit and consolidation of ~28 duplicate methods
**Dependencies**: Stories 20.1-20.2 complete

**Total Epic 20 Duration**: ~4-6 days

---

## Methods Summary

### Typo Fixes (Story 20.1)
| Current | Renamed To | Endpoint |
| --- | --- | --- |
| `createWarehous()` | `createWarehouse()` | `POST /api/v3/warehouses` |
| `updateWarehous()` | `updateWarehouse()` | `PUT /api/v3/warehouses/{id}` |
| `deleteWarehous()` | `deleteWarehouse()` | `DELETE /api/v3/warehouses/{id}` |

### Misleading Renames (Story 20.2)
| Current | Renamed To | Endpoint | Reason |
| --- | --- | --- | --- |
| `createStock()` | `getStocks()` | `POST /api/v3/stocks/{id}` | POST reads stock levels |
| `createCardsList()` | `getCardsList()` | `POST /content/v2/get/cards/list` | POST reads card list |
| `createCardsTrash()` | `getTrashedCards()` | `POST /content/v2/get/cards/trash` | POST reads trashed cards |
| `getGoodsTask2()` | `getBufferGoodsTask()` | `GET /api/v1/goods/task/buffer` | Name collision workaround |

### Duplicate Consolidation (Story 20.3)
| Primary Name | Deprecated Aliases | Endpoint |
| --- | --- | --- |
| `getWBOffices()` | `offices()` | `GET /api/v3/offices` |
| `getWarehouses()` | `warehouses()` | `GET /api/v3/warehouses` |
| *(~26 more to be identified during audit)* | | |

---

## Success Metrics

### Coverage Targets
- **Renamed Methods**: 100% of identified typos, misleading names, and duplicates addressed
- **Deprecation Wrappers**: 100% backward compatibility preserved via `@deprecated` methods

### Quality Gates
- All tests passing with new method names
- TypeScript strict mode compilation clean
- ESLint + Prettier passing
- Zero breaking changes for existing consumers (old names still work)
- All `@deprecated` methods include JSDoc with replacement reference

### Documentation Completeness
- CHANGELOG with complete rename mapping and migration guide
- JSDoc on all new methods
- JSDoc deprecation notices on all old methods with `@see` links

---

## Risk Assessment

### Low Risk
- Typo fixes are mechanical and well-scoped
- `@deprecated` wrappers provide full backward compatibility
- Existing test infrastructure covers affected methods

### Medium Risk
- Duplicate audit may reveal methods with subtle parameter differences (not true duplicates)
- Large number of renames in one epic requires careful coordination

### Mitigation Strategies
- Complete audit before any changes (discovery-first approach)
- Each story is independently shippable
- `@deprecated` wrappers ensure no consumer breakage
- Comprehensive test updates validate each rename

---

## Backlog Reference

- **Primary Task**: task-17 (EPIC 20: Products Module Method Naming & Duplicate Cleanup)
- **Dependency**: task-16 (Epic 19: Products Module Type Safety)
- **Follow-up**: task-19 (Products Module JSDoc Enrichment) -- enriched JSDoc should target the correctly named methods

---

## Notes

- Epic 20 is a cleanup epic that improves developer experience without changing any API behavior
- The `@deprecated` wrapper approach ensures semver compliance -- no breaking changes until next major version
- The ~28 duplicate count is approximate and will be confirmed during Story 20.3 audit
- `createStock()` is the most confusing rename: it uses `POST` but the Swagger spec marks it `x-readonly-method: true`, meaning it only reads stock levels for the given SKUs
- All renamed methods should be the targets for task-19 JSDoc enrichment work
