---
id: TASK-230
title: Correct CPC support documentation for bid recommendations
status: Done
assignee: []
created_date: '2026-10-11 16:46'
updated_date: '2026-10-11 17:39'
labels:
  - promotion
  - jsdoc
  - news-audit
dependencies: []
priority: high
type: docs
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Remove the stale CPM-only statement on getBidsRecommendations so its public API documentation agrees with the existing CPC runtime response types and tests delivered under TASK-200.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The getBidsRecommendations JSDoc states that recommended bids support both CPM and CPC campaigns and describes their existing response variants accurately.
- [x] #2 No runtime, public type, limiter behavior, or unrelated promotion documentation changes.
- [x] #3 Scoped formatting, lint, type-check, and relevant promotion tests pass.
- [x] #4 Task notes and the final delivery report identify this as closure of a TASK-216 audit residual with no live call.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Compare the method JSDoc with the TASK-200 runtime types and CPC unit test.
2. Replace only the contradictory CPM-only statement with source-faithful CPM/CPC wording.
3. Run scoped formatting/lint plus relevant type-check and promotion tests.
4. Record the residual closure and no-live-call boundary.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Corrected getBidsRecommendations JSDoc to describe both existing CPM and CPC response variants, matching the discriminated response type and runtime/tests. No runtime, type, endpoint, limiter, or unrelated Promotion documentation change was introduced. Focused Promotion tests passed 65/65; full suite, type-check, lint, format, build, and final delivery documentation passed. No live WB call.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
