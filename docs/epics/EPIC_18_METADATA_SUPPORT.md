# Epic 18: Operation Metadata Support (x-readonly-method, x-category)

**Epic Goal**: Extract `x-readonly-method` and `x-category` vendor extension metadata from all Swagger operations and expose it in the SDK at runtime, enabling smarter retry logic, rate-limit bucketing, and permission validation.

**Target Completion**: Epic 18.x (Stories 18.1-18.5)
**SDK Version**: 3.x.0
**Status**: TO DO

**Business Value**:
- Enables safe automatic retry for read-only operations without risking duplicate writes
- Provides domain-category awareness for intelligent rate-limit bucketing (content vs marketplace vs discountsandprices)
- Lays groundwork for API key permission validation (read-only keys cannot call write operations)
- Improves developer experience with runtime introspection of operation characteristics

---

## Epic 18 Overview

### Strategic Context

The upstream Wildberries Swagger specifications now include two vendor extension fields on every operation:

- **`x-readonly-method`** (boolean): `true` for read-only operations (GET, list-style POSTs), `false` for write/mutating operations (create, update, delete).
- **`x-category`** (string): Groups operations by API domain. Known values: `"content"`, `"discountsandprices"`, `"marketplace"`, `"general"`.

These fields are present on all 49 operations in `02-products.yaml` and all operations in `01-general.yaml`. They will appear on all future module Swagger files as well.

Currently the SDK ignores these fields during code generation. This epic adds first-class support: extraction during generation, a runtime registry, and integration with the RetryHandler for safe retry decisions.

### Technical Context

**API Documentation**: All `wildberries_api_doc/*.yaml` files (vendor extensions on every `operation` object)
**Impact**: Cross-cutting -- affects ALL modules (general, products, and all future modules)

**Swagger Extension Examples:**
```yaml
# Read-only operation
/content/v2/object/parent/all:
  get:
    x-readonly-method: true
    x-category: "content"
    ...

# Write operation
/content/v2/cards:
  post:
    x-readonly-method: false
    x-category: "content"
    ...
```

### Architecture Decision: Registry Design

**Decision**: Create a separate `OperationMetadata` registry (`src/config/operation-metadata.ts`) rather than extending the existing `RateLimitConfig` interface.

**Rationale**:
1. **Separation of Concerns**: Rate limits and operation metadata serve different purposes. Rate limits control request throttling; metadata describes operation characteristics. Mixing them increases coupling.
2. **Consistency with Existing Pattern**: The `src/config/` directory already contains per-module rate-limit config files (`products-rate-limits.ts`, `general-rate-limits.ts`, etc.). A parallel `operation-metadata.ts` file follows the same auto-generated config pattern.
3. **Extensibility**: Future vendor extensions (e.g., `x-idempotent`, `x-deprecated-date`) can be added to `OperationMetadata` without touching rate-limit logic.
4. **Code Generator Alignment**: The generator already produces one config file per concern. Adding a new metadata output target is cleaner than widening an existing output.

**Alternative Considered**: Extending `RateLimitConfig` with `readonly` and `category` fields. Rejected because it violates single-responsibility -- the `RateLimiter` class should not need to know about retry safety or API categories.

### Dependencies

**Depends On:**
- Epic 1 Complete -- Foundation infrastructure (BaseClient, RetryHandler, RateLimiter)
- Epic 2 Complete -- Products module (49 operations to populate)
- Code generator (`tools/generate-sdk.ts`) operational

---

## Story Breakdown

### Story 18.1: OperationMetadata Type and Registry (CRITICAL)

**Priority**: CRITICAL -- Foundation for all other stories
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Define the `OperationMetadata` interface and create the registry file structure.

**Key Deliverables**:
- `OperationMetadata` interface with `readonly: boolean`, `category: string`, `rateLimitKey: string`
- Empty registry scaffold in `src/config/operation-metadata.ts`
- Export from `src/config/index.ts`

**Target Type Definition**:
```typescript
export interface OperationMetadata {
  /** Whether this operation is read-only (safe to auto-retry) */
  readonly: boolean;
  /** API domain category from x-category */
  category: 'content' | 'discountsandprices' | 'marketplace' | 'general' | string;
  /** Corresponding rate limit key (links to rate-limit config) */
  rateLimitKey: string;
}

export const operationMetadata: Record<string, OperationMetadata> = {
  // Populated by code generator (Story 18.2)
};
```

**Files Created**:
- `src/config/operation-metadata.ts`

**Files Modified**:
- `src/config/index.ts` (re-export)

---

### Story 18.2: Code Generator Extraction (CRITICAL)

**Priority**: CRITICAL -- Populates metadata for all modules
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Update `tools/generate-sdk.ts` to extract `x-readonly-method` and `x-category` from each Swagger operation and generate the `operation-metadata.ts` config file alongside existing rate-limit configs.

**Key Deliverables**:
- Generator reads `x-readonly-method` (boolean, default `false` if missing)
- Generator reads `x-category` (string, default `"unknown"` if missing)
- Generates `src/config/operation-metadata.ts` with all operations keyed by `module.operationId`
- Maintains existing rate-limit generation unchanged

**Generator Output Example**:
```typescript
// Auto-generated from wildberries_api_doc/*.yaml
export const operationMetadata: Record<string, OperationMetadata> = {
  'general.ping': { readonly: true, category: 'general', rateLimitKey: 'general.ping' },
  'products.getParentAll': { readonly: true, category: 'content', rateLimitKey: 'products.contentObjectParentAll' },
  'products.createUploadTask': { readonly: false, category: 'discountsandprices', rateLimitKey: 'products.uploadTask' },
  // ... all operations across all modules
};
```

**Files Modified**:
- `tools/generate-sdk.ts`

**Files Generated**:
- `src/config/operation-metadata.ts` (regenerated)

---

### Story 18.3: RetryHandler Integration (HIGH)

**Priority**: HIGH -- Core safety improvement
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Integrate the operation metadata registry with `RetryHandler` so that only read-only operations are automatically retried. Write operations require explicit opt-in.

**Current Behavior** (in `src/client/retry-handler.ts`):
- Retries on: `NetworkError` (5xx, timeout), `RateLimitError` (429)
- No retry on: `AuthenticationError`, `ValidationError`
- No awareness of whether the operation is read-only or write

**Target Behavior**:
- Read-only operations (`readonly: true`): Retry automatically on transient failures (existing behavior)
- Write operations (`readonly: false`): Skip automatic retry by default to prevent duplicate side effects
- Write operations with explicit opt-in: Allow retry when caller passes `{ forceRetry: true }`

**Key Deliverables**:
- `executeWithRetry()` accepts optional `operationKey` parameter
- Looks up `operationMetadata[operationKey]` to check `readonly` flag
- Write operations throw immediately on transient errors unless `forceRetry` is set
- Logging indicates when retry is skipped due to write-safety

**Integration Points**:
```typescript
// In BaseClient, when calling RetryHandler:
const metadata = operationMetadata[rateLimitKey];
const result = await this.retryHandler.executeWithRetry(
  () => this.httpClient.request(config),
  rateLimitKey,
  { readonlyOperation: metadata?.readonly ?? false }
);
```

**Files Modified**:
- `src/client/retry-handler.ts` (add readonly-aware retry logic)
- `src/client/base-client.ts` (pass metadata to RetryHandler)

---

### Story 18.4: Populate Metadata for Existing Modules (HIGH)

**Priority**: HIGH -- Activates feature for current modules
**Estimated Complexity**: LOW
**Status**: TO DO

**Description**: Run the updated code generator (Story 18.2) against existing Swagger files to populate metadata for all current modules.

**Key Deliverables**:
- General module: 3 operations with metadata
- Products module: 49 operations with metadata
- All other existing modules populated via generation
- Manual verification that `readonly` and `category` values match Swagger source

**Operation Counts by Category**:
| Module | Operations | Expected Categories |
|--------|-----------|-------------------|
| general | 3 | `general` |
| products | 49 | `content`, `discountsandprices`, `marketplace` |
| analytics | 19 | `marketplace` |
| finances | varies | `marketplace` |
| orders-fbs | varies | `marketplace` |
| (all others) | varies | per Swagger |

**Files Generated**:
- `src/config/operation-metadata.ts` (populated with all operations)

---

### Story 18.5: Architecture Decision Documentation and Tests (MEDIUM)

**Priority**: MEDIUM -- Quality assurance and documentation
**Estimated Complexity**: MEDIUM
**Status**: TO DO

**Description**: Document the architecture decision in `backlog/decisions/`, write unit tests for metadata registry and retry integration.

**Key Deliverables**:
- Architecture decision record in `backlog/decisions/`
- Unit tests: metadata registry completeness (every module method has an entry)
- Unit tests: RetryHandler skips retry for write operations
- Unit tests: RetryHandler retries for read-only operations
- Unit tests: forceRetry override works for write operations
- Integration test: end-to-end metadata-driven retry behavior

**Files Created**:
- `backlog/decisions/adr-NNN-operation-metadata-registry.md`
- `tests/unit/config/operation-metadata.test.ts`
- `tests/unit/client/retry-handler-metadata.test.ts`

---

## Files Modified Summary

### New Files
| File | Purpose |
|------|---------|
| `src/config/operation-metadata.ts` | Operation metadata registry (auto-generated) |
| `backlog/decisions/adr-NNN-operation-metadata-registry.md` | Architecture decision record |
| `tests/unit/config/operation-metadata.test.ts` | Metadata registry tests |
| `tests/unit/client/retry-handler-metadata.test.ts` | Retry + metadata integration tests |

### Modified Files
| File | Changes |
|------|---------|
| `tools/generate-sdk.ts` | Extract x-readonly-method, x-category; generate metadata config |
| `src/client/retry-handler.ts` | Add readonly-aware retry logic |
| `src/client/base-client.ts` | Pass operation metadata to RetryHandler |
| `src/config/index.ts` | Re-export operation metadata |

---

## Metadata Field Reference

### x-readonly-method

| Value | Meaning | Retry Behavior | Examples |
|-------|---------|---------------|----------|
| `true` | Read-only, no side effects | Auto-retry on transient failures | GET endpoints, list-style POSTs |
| `false` | Write/mutating operation | No auto-retry (prevents duplicates) | Create, update, delete operations |

### x-category

| Value | API Domain | Base URL |
|-------|-----------|----------|
| `"content"` | Content API | `https://content-api.wildberries.ru` |
| `"discountsandprices"` | Discounts & Prices API | `https://discounts-prices-api.wildberries.ru` |
| `"marketplace"` | Marketplace API | `https://marketplace-api.wildberries.ru` |
| `"general"` | Common API | `https://common-api.wildberries.ru` |

---

## Risk Assessment

### Low Risk
- Metadata extraction is additive -- no existing behavior changes unless RetryHandler integration is enabled
- Registry follows established `src/config/` patterns
- Auto-generated file reduces manual maintenance burden

### Medium Risk
- RetryHandler change alters default retry behavior for write operations (previously retried, now skipped)
- Existing tests that rely on write-operation retries will need updates
- If upstream Swagger files lack `x-readonly-method` on some operations, default to `false` (safe -- no retry)

### Mitigation
- Feature flag or config option to opt in to metadata-aware retries (`useMetadataRetry: true` in SDKConfig)
- Gradual rollout: Story 18.1-18.2 (registry only) can ship independently of 18.3 (retry integration)
- Comprehensive test coverage before changing default retry behavior

---

## Backlog Reference

**Task**: task-15 -- EPIC 18: Add x-readonly-method and x-category Metadata Support to SDK
**Labels**: cross-cutting, metadata, epic, architecture
**Priority**: Medium
