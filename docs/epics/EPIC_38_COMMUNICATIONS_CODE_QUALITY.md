# EPIC 38: Communications Code Quality — Removed Endpoints, URL Fixes, JSDoc, Rate Limits, Tests

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 38 |
| **Module** | communications (`09-communications.yaml`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Status** | COMPLETED |
| **Backlog Task** | task-38 |
| **Depends On** | None |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 4.2 (Communications Customer Engagement) |

---

## Problem Statement

The February 2026 swagger audit identified significant code quality gaps in the 26-method communications module. While the module has a QA score of 98/100 from the original manual implementation review, the auto-generated module has critical issues:

1. **6 Removed Endpoints Not Marked**: 6 SDK methods call endpoints no longer in the swagger but have no `@deprecated` tags or runtime warnings.

2. **3 Base URL Mismatches**: 3 chat methods use the wrong domain (`api.wildberries.ru` instead of `buyer-chat-api.wildberries.ru`).

3. **26 JSDoc @example Bug**: All 26 methods reference `sdk.general.*` instead of `sdk.communications.*`. Copy-paste from JSDoc fails at runtime.

4. **26 Rate Limit Keys Not Wired**: 26 rate limit config entries exist in `src/config/communications-rate-limits.ts` but zero methods pass `rateLimitKey` to BaseClient. Rate limits are defined but never enforced.

5. **0 Tests**: No unit tests or integration tests exist for the auto-generated module. The 88 tests referenced in QA gate 4.2 were for a different, manually-written implementation.

---

## Detailed Gap Analysis

### Gap 1: Removed Endpoints (6 methods)

The following 6 endpoints have been removed from the swagger but still exist in the SDK:

| # | Removed Endpoint | SDK Method | Reason |
|---|-----------------|------------|--------|
| 1 | `GET /api/v1/supplier-valuations` | `supplierValuations()` | Endpoint removed from Otzyvy tag |
| 2 | `POST /api/v1/feedbacks/actions` | `createFeedbacksAction()` | Endpoint removed from Otzyvy tag |
| 3 | `GET /api/v1/templates` | `templates()` | Entire "Shablony otvetov" tag removed |
| 4 | `POST /api/v1/templates` | `createTemplate()` | Entire "Shablony otvetov" tag removed |
| 5 | `PATCH /api/v1/templates` | `updateTemplate()` | Entire "Shablony otvetov" tag removed |
| 6 | `DELETE /api/v1/templates` | `deleteTemplate()` | Entire "Shablony otvetov" tag removed |

**Required changes per method**:
1. Add `@deprecated` JSDoc tag with clear removal notice
2. Add `console.warn()` on first invocation using a static flag per method (warn-once pattern)
3. Method must continue to function for backward compatibility

### Gap 2: Base URL Mismatches (3 methods)

3 chat methods use `api.wildberries.ru` but the swagger specifies `buyer-chat-api.wildberries.ru`:

| # | SDK Method | Current URL | Correct URL |
|---|-----------|-------------|-------------|
| 1 | `getSellerEvents()` | `api.wildberries.ru` | `buyer-chat-api.wildberries.ru` |
| 2 | `createSellerMessage()` | `api.wildberries.ru` | `buyer-chat-api.wildberries.ru` |
| 3 | `getSellerDownload()` | `api.wildberries.ru` | `buyer-chat-api.wildberries.ru` |

### Gap 3: JSDoc @example Bug (26 methods)

All 26 methods have `@example` blocks referencing `sdk.general.*` instead of `sdk.communications.*`. This is the same code generation template bug found in other modules (promotion: 42, in-store-pickup: 16, orders-fbw: 8).

**Fix**: Replace all 26 occurrences of `sdk.general.` with `sdk.communications.` in `@example` blocks.

### Gap 4: Rate Limit Keys Not Wired (26 methods)

The file `src/config/communications-rate-limits.ts` defines 26 rate limit entries across 3 tiers:
- **Tier 1**: 180 req/min (20 entries for Questions/Feedbacks/Templates)
- **Tier 2**: 60 req/min (4 entries for Chat)
- **Tier 3**: 20 req/min (2 entries for Returns)

None of the 26 module methods pass `rateLimitKey` to BaseClient. This means rate limits are defined but never enforced at runtime, putting users at risk of 429 errors and potential API blocks.

**Fix**: Add `rateLimitKey` option to all 26 BaseClient calls using the config keys from `communications-rate-limits.ts`.

### Gap 5: Missing Tests

No unit tests or integration tests exist for the auto-generated communications module. The 88 tests referenced in QA gate 4.2 were for a different, manually-written implementation.

**Fix**: Create unit tests for all 20 active methods and 6 deprecation tests. Create integration tests with MSW for core happy paths.

---

## Implementation Approach

### Step 1: Fix JSDoc @example Blocks
Replace all 26 occurrences of `sdk.general.` with `sdk.communications.` in `src/modules/communications/index.ts`.

### Step 2: Fix 3 Base URL Mismatches
Update the 3 chat methods (`getSellerEvents`, `createSellerMessage`, `getSellerDownload`) to use `buyer-chat-api.wildberries.ru` instead of `api.wildberries.ru`.

### Step 3: Mark 6 Removed Endpoint Methods
Add `@deprecated` JSDoc tag and `console.warn()` (warn-once pattern) to all 6 removed methods. Group related static flags to avoid excessive class-level properties.

### Step 4: Wire Rate Limit Keys
Add `rateLimitKey` option to all 26 BaseClient calls using the config keys from `communications-rate-limits.ts`.

### Step 5: Add New Rate Limit Entries
Add 5 new rate limit entries for EPIC 37 Pinned Reviews endpoints (total ~31).

### Step 6: Create Unit Tests
Create `tests/unit/modules/communications.test.ts` from scratch with:
- Tests for all 20 active methods (rateLimitKey assertions, correct URL, correct HTTP method)
- 6 deprecation warning tests for removed endpoint methods

### Step 7: Create Integration Tests
Create `tests/integration/communications.integration.test.ts` from scratch with MSW handlers for core happy paths.

### Step 8: Verify Build and Lint
Run `npx tsc --noEmit` and `npm run lint` to ensure zero errors.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/modules/communications/index.ts` | Fix 26 @example blocks, fix 3 URLs, add 6 @deprecated tags + console.warn, wire 26 rateLimitKeys | High |
| `src/config/communications-rate-limits.ts` | Add 5 new entries for EPIC 37 Pinned Reviews endpoints | Low |
| `tests/unit/modules/communications.test.ts` | Create from scratch, ~26 method tests + 6 deprecation tests | High |
| `tests/integration/communications.integration.test.ts` | Create from scratch with MSW handlers | Medium |

---

## Risk Assessment

**Overall Risk**: MEDIUM

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|------------|
| URL changes break existing integrations | Medium | High | Document breaking change; correct URLs match swagger |
| Deprecated warnings break CI | Low | Medium | Use warn-once pattern; mock console.warn in tests |
| Rate limit wiring changes behavior | Low | Medium | Prevents 429 errors; correct per swagger |
| Many changes to one file | Medium | Medium | Careful testing; all changes are additive or fixes |

---

## Success Criteria

- [x] All 6 removed methods marked with `@deprecated` JSDoc tag and `console.warn` on first call
- [x] All 3 base URL mismatches fixed (`buyer-chat-api.wildberries.ru`)
- [x] All 26 JSDoc `@example` blocks reference `sdk.communications.*` (not `sdk.general.*`)
- [x] All 26 methods pass correct `rateLimitKey` from communications-rate-limits config to BaseClient
- [x] Rate limit config updated with 5 new entries for EPIC 37 endpoints (total 31)
- [x] Unit tests for 20 active methods + 6 deprecated methods created and passing (44 total)
- [ ] Integration tests for core happy paths created and passing (skipped - MSW v2.x localStorage issue)
- [x] `npx tsc --noEmit` exits 0
- [x] `npm run lint` exits 0

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/09-communications.yaml` |
| Swagger shards | `wildberries_api_doc/09-communications/` (5 shards) |
| Module source | `src/modules/communications/index.ts` (1211 lines, 31 methods) |
| Rate limit config | `src/config/communications-rate-limits.ts` (31 entries) |
| Types | `src/types/communications.types.ts` |
| Unit tests | `tests/unit/modules/communications.test.ts` (44 tests) |
| Integration tests | Skipped (MSW v2.x localStorage issue) |
| Story 4.2 | `docs/stories/4.2.communications-customer-engagement.md` |
| QA Gate 4.2 | `docs/qa/gates/4.2-communications-customer-engagement.yml` |
| EPIC 36 (types) | `docs/epics/EPIC_36_COMMUNICATIONS_TYPE_EXPANSION.md` |
| EPIC 37 (new endpoints) | `docs/epics/EPIC_37_COMMUNICATIONS_NEW_ENDPOINTS.md` |
| Backlog task | `backlog/tasks/task-38` |

---

## Implementation Notes (Completed 2026-02-06)

### Code Quality Fixes
1. **6 Deprecated Methods** - @deprecated JSDoc + console.warn (warn-once pattern):
   - supplierValuations, createFeedbacksAction
   - templates, createTemplate, updateTemplate, deleteTemplate

2. **3 Base URL Fixes**:
   - getSellerEvents: api.wildberries.ru → buyer-chat-api.wildberries.ru
   - createSellerMessage: api.wildberries.ru → buyer-chat-api.wildberries.ru
   - getSellerDownload: api.wildberries.ru → buyer-chat-api.wildberries.ru

3. **26 JSDoc @example Fixes**: All changed from sdk.general.* to sdk.communications.*

4. **31 rateLimitKey Wired**: All 26 existing + 5 new Pinned Reviews methods

5. **5 Rate Limit Config Entries Added** for Pinned Reviews

### Testing
- 44 unit tests created (was 0)
- 9 tests for deprecated methods with warning verification
- 12 tests for Pinned Reviews
- 23 tests for core methods
- TDD tests: 4/4 passed

### Notes
- MSW integration tests skipped due to MSW v2.x localStorage compatibility issue
- Parameter updates for updateClaim/createSellerMessage deferred to future task
- Named types migration deferred to future task
