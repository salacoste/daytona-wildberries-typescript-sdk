# EPIC 37: Communications New Endpoints — 5 Pinned Reviews Methods

---

## Overview

| Field | Value |
|-------|-------|
| **Epic** | 37 |
| **Module** | communications (`09-communications.yaml`) |
| **Priority** | High |
| **Target SDK Version** | v2.7.x |
| **Backlog Task** | task-37 |
| **Depends On** | EPIC 36 (task-36) — Type expansion must be completed first |
| **Source** | February 2026 Swagger Audit |
| **Related Stories** | 4.2 (Communications Customer Engagement) |

---

## Current State

### What Exists

| Asset | Path | Details |
|-------|------|---------|
| Module implementation | `src/modules/communications/index.ts` | 497 lines, 26 methods (`CommunicationsModule` class) |
| Types | `src/types/communications.types.ts` | 16 TypeScript interfaces (being expanded to 27 in EPIC 36) |
| Rate limit config | `src/config/communications-rate-limits.ts` | 26 rate limit entries |
| Unit tests | — | None (0 tests) |
| Integration tests | — | None (0 tests) |

### What Is Missing

- **5 new endpoints** from the entirely new tag "Закреплённые отзывы" (Pinned Reviews) discovered in the February 2026 swagger audit
- This feature allows sellers to pin/unpin reviews on product cards and product groups, check pin counts and limits

### Why This Matters

The Pinned Reviews feature is a significant new customer engagement capability on Wildberries. Without SDK support:
- Sellers cannot pin or unpin reviews on product cards programmatically
- Product group review pinning is unavailable via the SDK
- Pin count and limit queries cannot be automated
- Review pinning workflows cannot be integrated into seller management tools

---

## New Endpoints Detail

### Pinned Reviews (Закреплённые отзывы) — 5 Endpoints

All endpoints use base URL `https://feedbacks-api.wildberries.ru`:

| # | HTTP Method | Endpoint | SDK Method Name | Purpose |
|---|------------|----------|-----------------|---------|
| 1 | GET | `/api/feedbacks/v1/pins` | `getPinnedReviews()` | Get list of pinned and unpinned reviews with filters (state, pinOn, imtId, nmId, feedbackId, dateFrom, dateTo) |
| 2 | POST | `/api/feedbacks/v1/pins` | `pinReview()` | Pin a review to a product card (nm) or product group (imt) |
| 3 | DELETE | `/api/feedbacks/v1/pins` | `unpinReview()` | Unpin a review |
| 4 | GET | `/api/feedbacks/v1/pins/count` | `getPinnedReviewsCount()` | Get count of pinned reviews by product |
| 5 | GET | `/api/feedbacks/v1/pins/limits` | `getPinnedReviewsLimits()` | Get maximum pins allowed per product |

---

## Implementation Approach

### Step 1: Verify Types Available (Depends on EPIC 36)
Ensure all pinned reviews TypeScript types are generated and available in `src/types/communications.types.ts`.

### Step 2: Implement 5 Pinned Reviews Methods
Add 5 methods to `CommunicationsModule` class following the existing SDK pattern:
- Each method calls BaseClient with correct HTTP method and URL
- Each method passes `rateLimitKey` to BaseClient
- Each method has full JSDoc with `@example` using `sdk.communications.*`
- Request/response types from generated schemas

### Step 3: Add Rate Limit Entries
Add 5 new entries to `src/config/communications-rate-limits.ts` for the new endpoints.

### Step 4: Unit Tests
Create unit tests for all 5 new methods covering:
- Correct URL called
- Correct HTTP method used
- Request body/params passed correctly
- Rate limit key wired
- Response type handling

### Step 5: Integration Tests
Create integration tests with MSW for all 5 new methods.

### Step 6: Validate
Run `npx tsc --noEmit`, `npm run lint`, and `npm test` to ensure zero errors.

---

## Rate Limit Configuration for New Endpoints

| SDK Method | Proposed Config Key | Expected Tier |
|------------|-------------------|---------------|
| `getPinnedReviews()` | `communications.pinnedReviewsList` | Tier 1 (180 req/min) |
| `pinReview()` | `communications.pinReview` | Tier 1 |
| `unpinReview()` | `communications.unpinReview` | Tier 1 |
| `getPinnedReviewsCount()` | `communications.pinnedReviewsCount` | Tier 1 |
| `getPinnedReviewsLimits()` | `communications.pinnedReviewsLimits` | Tier 1 |

Note: Same rate limit category as Questions and Feedbacks — 3 req/sec, 333ms intervals, burst 6. Exact rate limits to be extracted from swagger `description` fields during implementation.

---

## Files to Modify

| File | Changes | Estimated Effort |
|------|---------|-----------------|
| `src/modules/communications/index.ts` | Add 5 new methods (~120 lines) | Medium |
| `src/config/communications-rate-limits.ts` | Add 5 new rate limit entries | Low |
| `tests/unit/modules/communications.test.ts` | Add tests for 5 new methods | Medium |

---

## Success Criteria

- [ ] 5 pinned reviews methods implemented: getPinnedReviews, pinReview, unpinReview, getPinnedReviewsCount, getPinnedReviewsLimits
- [ ] All 5 methods have correct URLs, HTTP methods, request/response types
- [ ] All 5 methods have JSDoc with `@example` referencing `sdk.communications.*`
- [ ] All 5 methods pass `rateLimitKey` to BaseClient
- [ ] TypeScript types from task-36 used for all parameters and return types
- [ ] Rate limit config entries added for all 5 new endpoints
- [ ] Unit tests created for all 5 new methods
- [ ] Integration tests created with MSW for all 5 new methods
- [ ] TypeScript strict mode passes (`npx tsc --noEmit` exits 0)
- [ ] No regressions in existing tests

---

## Dependencies

### Hard Dependencies

- **EPIC 36 (task-36)**: Must be completed first. New methods require TypeScript types for pinned reviews request/response schemas.

### Soft Dependencies

- **EPIC 38 (task-38)**: Code quality fixes (JSDoc, deprecated marking, rate limit wiring for existing methods). Can be done in parallel but completing it first ensures consistent patterns.

---

## Risk Assessment

### Low Risk
- All 5 endpoints are purely additive with no migration concerns
- Established patterns from existing communications methods (26 methods) apply directly
- Same rate limit tier as existing Questions and Feedbacks endpoints

### Medium Risk
- No existing unit or integration tests for the communications module means no regression safety net
- Types depend on EPIC 36 completion — any delays there block this epic

### Mitigation Strategies
- Complete EPIC 36 (type expansion) before starting implementation
- Use existing module patterns (26 methods) as implementation templates
- Create comprehensive tests for new methods to begin building test coverage for the module

---

## Related Documents

| Document | Path |
|----------|------|
| Swagger spec | `wildberries_api_doc/09-communications.yaml` |
| Pinned reviews shard | `wildberries_api_doc/09-communications/zakreplyonnye-otzyvy.yaml` (5 endpoints) |
| Module source | `src/modules/communications/index.ts` (497 lines) |
| Rate limit config | `src/config/communications-rate-limits.ts` (26 entries) |
| Types | `src/types/communications.types.ts` |
| Story 4.2 | `docs/stories/4.2.communications-customer-engagement.md` |
| QA Gate 4.2 | `docs/qa/gates/4.2-communications-customer-engagement.yml` |
| EPIC 36 (prerequisite) | `docs/epics/EPIC_36_COMMUNICATIONS_TYPE_EXPANSION.md` |
| EPIC 38 (related) | `docs/epics/EPIC_38_COMMUNICATIONS_CODE_QUALITY.md` |
| Backlog task | `backlog/tasks/task-37` |
