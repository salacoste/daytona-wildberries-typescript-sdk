# EPIC 36: Communications Type Expansion — Cover All 27 Swagger Schemas

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 36 |
| **Module** | communications (`09-communications.yaml`) |
| **Priority** | Medium |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-36 |
| **Depends On** | None |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 4.2 (Communications Customer Engagement) |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Types file | `src/types/communications.types.ts` | 42 TypeScript types (was 16, +26 new) |
| Module implementation | `src/modules/communications/index.ts` | ~1211 lines (was ~497) |
| Methods | 31 methods | was 26, +5 new |
| Rate limit entries | 31 entries | was 26, +5 new |
| Swagger spec | `wildberries_api_doc/09-communications.yaml` | 27 schemas |
| Swagger shards | `wildberries_api_doc/09-communications/` | 5 shards |

### What Is Missing

- **~11 TypeScript interfaces/types**: Remote swagger defines 27 schemas, but only 16 are covered in `src/types/communications.types.ts`
- Missing types include Pinned Reviews schemas:
  - Pins list response
  - Pin request body
  - Pin count response
  - Pin limits response
- Additional schemas that have been added since initial implementation

### What Is Deprecated

- **3 types for removed "Response Templates" tag**: The swagger no longer includes the "Shablony otvetov" (Response Templates) tag, making these types obsolete:
  - `ResponseTemplate`
  - `PostTemplate`
  - `PatchDelResp`
- These types should be marked with `@deprecated` JSDoc tags rather than removed, to avoid breaking existing consumers

### Why This Matters

TypeScript types are the foundation for type-safe SDK development. Without complete type coverage:
- New endpoint implementations (EPIC 37) cannot be properly typed
- IDE autocompletion is incomplete for consumers
- Runtime type mismatches go undetected
- Generated documentation is incomplete
- Deprecated types without markers mislead developers into using removed endpoints

---

## Gap Analysis

### Schema Coverage Comparison

| Category | Local Types | Swagger Schemas | Gap |
|----------|------------|-----------------|-----|
| Chat/Message schemas | ~6 | ~8 | ~2 missing |
| Q&A schemas | ~4 | ~6 | ~2 missing |
| Review schemas | ~3 | ~6 | ~3 missing |
| Pinned Reviews schemas | 0 | 4 | 4 missing (all new) |
| Template schemas (deprecated) | 3 | 0 | 3 to deprecate |
| **Total** | **16** | **27** | **~11 missing, 3 to deprecate** |

### New Pinned Reviews Types

These are entirely new schemas for the Pinned Reviews feature:

| Schema Name | Purpose | Used By |
|-------------|---------|---------|
| Pins list response | Response with list of pinned reviews | `GET` pinned reviews endpoint |
| Pin request body | Request to pin/unpin a review | `POST` pin review endpoint |
| Pin count response | Response with current pin count | `GET` pin count endpoint |
| Pin limits response | Response with pin limits per product | `GET` pin limits endpoint |

### Deprecated Template Types

| Type Name | Reason | Action |
|-----------|--------|--------|
| `ResponseTemplate` | "Response Templates" tag removed from swagger | Mark `@deprecated` |
| `PostTemplate` | "Response Templates" tag removed from swagger | Mark `@deprecated` |
| `PatchDelResp` | "Response Templates" tag removed from swagger | Mark `@deprecated` |

---

## Implementation Approach

### Step 1: Audit Existing Types
Compare each of the 16 existing types against the current swagger definitions (27 schemas). Identify exact gaps, property additions, removals, or type changes.

### Step 2: Generate Missing Types
Generate all ~11 missing TypeScript interfaces from the swagger schemas, with particular focus on Pinned Reviews types which are entirely new.

### Step 3: Mark Deprecated Types
Add `@deprecated` JSDoc tags to `ResponseTemplate`, `PostTemplate`, and `PatchDelResp` types. Include a message indicating the "Response Templates" tag has been removed from the API.

### Step 4: Verify Type Naming Conventions
Ensure all new types follow SDK PascalCase conventions and don't conflict with existing type names.

### Step 5: Validate Type Safety
Run `npx tsc --noEmit` to ensure zero type errors across the project.

### Step 6: Verify No Regressions
Check that all existing code importing communications types continues to compile and function correctly.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/types/communications.types.ts` | Add ~11 new interfaces, mark 3 deprecated | Medium |

---

## Success Criteria

- [x] All 27 swagger schemas have corresponding TypeScript interfaces
- [x] New Pinned Reviews types generated (4 types)
- [x] 3 deprecated template types marked with `@deprecated`
- [x] All types use strict TypeScript with proper optional/required fields
- [x] TypeScript strict mode passes (`npx tsc --noEmit` exits 0)
- [x] No regressions in existing code importing communications types

---

## Risk Assessment

**Risk Level: LOW**

- Text-only type additions with no runtime behavior changes
- `@deprecated` tags are informational only and do not break existing consumers
- No changes to module implementation or test files
- Isolated to a single types file

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/09-communications.yaml` |
| Swagger shards | `wildberries_api_doc/09-communications/` (5 shards) |
| Module source | `src/modules/communications/index.ts` (497 lines) |
| Types file | `src/types/communications.types.ts` (16 types) |
| Story 4.2 | `docs/stories/4.2.communications-customer-engagement.md` |
| QA Gate 4.2 | `docs/qa/gates/4.2-communications-customer-engagement.yml` |
| EPIC 37 (new endpoints) | `docs/epics/EPIC_37_COMMUNICATIONS_NEW_ENDPOINTS.md` |
| EPIC 38 (code quality) | `docs/epics/EPIC_38_COMMUNICATIONS_CODE_QUALITY.md` |
| Backlog task | `backlog/tasks/task-36` |

---

## Implementation Notes (Completed 2026-02-06)

### Types Added (21 new)
- 5 enums/union types: ReviewPinMethod, ReviewPinOn, ReviewState, UnpinnedCause, PinnedReviewErrorStatus
- 11 interfaces for Pinned Reviews: PinnedReviewsListResponse, PinnedReviewsCreateRequest/Response, PinnedReviewsDeleteResponse, PinnedReviewsCountParams/Response, PinnedReviewsLimitsResponse, PinReviewItem, etc.
- 2 type aliases: PinnedReviewsCreateRequest, PinnedReviewsDeleteRequest
- 2 additional response types: NewFeedbacksQuestionsResponse, FeedbackListResponse

### Deprecated Markers Added
- 3 deprecated type annotations: ResponseTemplate, PostTemplate, PatchDelResp
- 4 deprecated field annotations: Chat.clientID, Event.clientID, GoodCard.needRefund, GoodCard.statusID

### Verification
- TypeScript compilation: PASSED
- TDD tests: 5/5 passed
- All 1769 unit tests pass
