# V3 Migration Master Plan

## Overview

**Goal**: Clean v3.0.0 release with all deprecated methods removed + EPIC-18 metadata infrastructure

**Timeline**: February - April 2026

---

## Phase 1: v2.8.0 — Deprecation Warnings (Week 1)

### 1.1 Add Runtime Warnings to All Deprecated Methods

**Scope**: 66 deprecated methods across 7 modules

| Module | Count | File |
|--------|-------|------|
| promotion | 19 | `src/modules/promotion/index.ts` |
| orders-dbs | 13 | `src/modules/orders-dbs/index.ts` |
| reports | 8 | `src/modules/reports/index.ts` |
| communications | 6 | `src/modules/communications/index.ts` |
| orders-fbs | 5 | `src/modules/orders-fbs/index.ts` |
| products | 7 | `src/modules/products/index.ts` |
| analytics | 3 | `src/modules/analytics/index.ts` |
| in-store-pickup | 1 | `src/modules/in-store-pickup/index.ts` |
| **Total** | **66** | |

**Pattern**:
```typescript
/**
 * @deprecated Removed in v3.0.0. Use {@link newMethod} instead.
 */
oldMethod(): Promise<T> {
  console.warn(
    '[Wildberries SDK] DEPRECATION WARNING: oldMethod() is deprecated and will be removed in v3.0.0. ' +
    'Please migrate to newMethod(). See: https://docs.sdk/migration-v3'
  );
  return this._oldMethodImpl();
}
```

### 1.2 Create Migration Guide

**File**: `docs/guides/migration-v3.md`

**Content**:
- Full list of removed methods with alternatives
- Code examples for each migration path
- Breaking changes summary
- Timeline and version history

### 1.3 Update CHANGELOG

**File**: `CHANGELOG.md`

**Content**:
- v2.8.0 section with deprecation notices
- Full list of methods to be removed in v3.0.0
- Links to migration guide

---

## Phase 2: EPIC-18 — Operation Metadata (Weeks 2-3)

### 2.1 Story 18.1: OperationMetadata Type & Registry

**Files**:
- `src/types/operation-metadata.types.ts` (NEW)
- `src/config/operation-metadata.ts` (UPDATE - expand)

**Interface**:
```typescript
export interface OperationMetadata {
  /** Operation is read-only (safe for retry) */
  readonly: boolean;
  /** Operation category for rate limit grouping */
  category: 'content' | 'marketplace' | 'analytics' | 'finance' | 'statistics' | 'common';
  /** Rate limit key for this operation */
  rateLimitKey: string;
  /** Operation is idempotent (safe to repeat) */
  idempotent?: boolean;
  /** HTTP method */
  httpMethod: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  /** Deprecated info if applicable */
  deprecated?: {
    since: string;
    removeIn: string;
    alternative?: string;
  };
}
```

### 2.2 Story 18.2: Code Generator Enhancement

**Files**:
- `tools/generate-types.ts` (UPDATE)

**Goal**: Extract metadata from swagger x-* extensions

### 2.3 Story 18.3: RetryHandler Integration

**Files**:
- `src/client/retry-handler.ts` (UPDATE)
- `src/client/base-client.ts` (UPDATE)

**Goal**: Use metadata.readonly for smart retry decisions

### 2.4 Story 18.4: Populate Metadata Registry

**File**: `src/config/operation-metadata.ts`

**Goal**: Full registry for all ~280 SDK operations

### 2.5 Story 18.5: Documentation & Tests

**Files**:
- `docs/guides/operation-metadata.md` (NEW)
- `tests/unit/config/operation-metadata.test.ts` (NEW)

---

## Phase 3: v2.9.0 — Final Warnings (Week 4)

### 3.1 Intensify Warnings

Change warning message to:
```typescript
'[Wildberries SDK] FINAL WARNING: oldMethod() will be REMOVED in the NEXT version (v3.0.0). ' +
'This is your last chance to migrate. See: https://docs.sdk/migration-v3'
```

### 3.2 Add Deprecation Metrics

Optional: Track deprecation usage for analytics

---

## Phase 4: v3.0.0 — Clean Slate (April 2026)

### 4.1 Remove Deprecated Methods

**Total**: 66 methods

### 4.2 Remove Deprecated Types

**Total**: 14 types

### 4.3 Update All Documentation

Remove references to deprecated methods

### 4.4 Release Notes

Comprehensive v3.0.0 release notes

---

## Agent Assignments

### Wave 1: v2.8.0 Foundation (Parallel)

| Agent | Role | Scope |
|-------|------|-------|
| A1 | Deprecation Warnings | promotion, orders-dbs (32 methods) |
| A2 | Deprecation Warnings | reports, communications, analytics (17 methods) |
| A3 | Deprecation Warnings | orders-fbs, products, in-store-pickup (13 methods) |
| A4 | Migration Guide | docs/guides/migration-v3.md |
| A5 | CHANGELOG | CHANGELOG.md update |

### Wave 2: EPIC-18 (Sequential then Parallel)

| Agent | Role | Scope |
|-------|------|-------|
| B1 | Types & Registry | Story 18.1 |
| B2 | Code Generator | Story 18.2 (after B1) |
| B3 | RetryHandler | Story 18.3 (after B1) |
| B4 | Populate Registry | Story 18.4 (after B1) |
| B5 | Docs & Tests | Story 18.5 (after B4) |

### Wave 3: v2.9.0 + v3.0.0 (Future)

To be planned after Wave 1-2 completion

---

## Success Criteria

### v2.8.0 ✅ COMPLETE (Wave 1 - Feb 7, 2026)
- [x] All 66 deprecated methods emit console.warn (28 new + 38 existing)
- [x] Migration guide complete with all alternatives (`docs/guides/migration-v3.md`)
- [x] CHANGELOG updated with v2.8.0 section
- [x] All tests pass (2134 passed)
- [x] TypeScript strict mode passes

### EPIC-18 ✅ COMPLETE (Wave 2 - Feb 7, 2026)
- [x] OperationMetadata interface defined (`src/config/operation-metadata.ts`)
- [x] Registry populated for all operations (296 entries)
- [x] RetryHandler uses metadata.readonly (`RetryOptions.operationKey`)
- [x] Helper functions: `isOperationReadonly()`, `getOperationCategory()`, etc.
- [x] 69 unit tests for metadata registry

### v3.0.0
- [ ] All 66 deprecated methods removed
- [ ] All 14 deprecated types removed
- [ ] Zero deprecated warnings in codebase
- [ ] All tests pass
- [ ] Documentation updated

---

## Timeline

```
Week 1 (Feb 7):     v2.8.0 - Wave 1 agents ✅ DONE
                    EPIC-18 - Wave 2 agents ✅ DONE (ahead of schedule!)
Week 2 (Feb 14):    v2.9.0 - Final warnings (optional)
Week 3-6:           Community feedback
April 13+:          v3.0.0 release
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Breaking user code | Deprecation warnings 2 months before removal |
| Missing alternatives | Migration guide with code examples |
| EPIC-18 complexity | Incremental implementation with tests |
| Timeline slip | Parallel agent execution |

