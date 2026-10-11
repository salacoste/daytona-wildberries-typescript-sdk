---
id: task-215
title: >-
  returns.getReturns(): migrate FBO source from deprecated
  getAnalyticsGoodsReturn to getAnalyticsV1GoodsReturn (deadline 2026-10-26)
status: Done
assignee: []
created_date: '2026-09-24 16:50'
updated_date: '2026-10-11 17:38'
due_date: '2026-10-26'
labels:
  - reports
  - returns
  - news-16
  - deprecation
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/reports#tag/goodsReturns/operation/getAnalyticsV1GoodsReturn
priority: high
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Discovered at v4.6.0: ReturnsModule.getReturns() (aggregator since v3.10.0) fetches FBO returns via reports.getAnalyticsGoodsReturn(), which WB disables on 2026-10-26. After that date the whole getReturns() FBO source breaks. Migration scope: (1) replace the single legacy call with the new endpoint — TWO calls (status=active + status=archive) to reproduce the old combined result, paginated (limit<=1000, loop by offset until report.length < limit; 204 = empty); (2) field mapping in the enrichment path (enrichReturnsWithType consumes GoodsReturnItem with barcode/status/reason/isStatusActive — new items have sku/returnStatus/returnReason and no isStatusActive); (3) rate-limit budget: legacy = 1 call/min, new = 2+ calls/min at 1/min per call — budget or sequence the two status calls; (4) update unit tests (tests/unit/modules/returns.test.ts, 19 call-sites) + the date-range validation message in returns/index.ts:58. Interim state (v4.6.0): call-site carries an eslint-disable with a task-215 pointer; returns.test.ts has a file-level no-deprecated disable. Ideal: verify live contract with a fresh test-cabinet key before shipping (current .env key expired). Ship as v4.7.0 before 2026-10-26.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 ReturnsModule.getReturns no longer calls deprecated reports.getAnalyticsGoodsReturn and instead retrieves both active and archive FBO returns from the validated GET /api/analytics/v1/item-returns contract.
- [x] #2 Each status is paginated with limit at most 1000 until the response page is shorter than the limit; HTTP 204 or equivalent empty response contributes no items.
- [x] #3 Active and archive requests are sequenced within the configured one-request-per-minute budget without bypassing the SDK rate limiter.
- [x] #4 GoodsReturnV1Item fields sku, returnStatus, returnReason, and status context map correctly into the stable ReturnsModule public model, preserving FBS aggregation behavior.
- [x] #5 Focused tests cover two-status aggregation, multiple pages, 204/empty responses, field mapping, partial-source failures under existing error policy, and date-range validation text without real account data.
- [x] #6 The temporary no-deprecated lint suppressions tied to task-215 are removed; returns/reports tests, type-check, lint, and package declaration/build smoke pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Re-read the official item-returns contract and current ReturnsModule aggregation/error policy.
2. Add a rate-limit-safe active/archive pagination helper within the existing module boundary and map v1 fields to the stable return model.
3. Replace the legacy call, remove task-215 lint suppressions, and add focused synthetic tests for pagination, empty responses, mapping, and failures.
4. Run returns/reports tests, type-check, lint, package declaration/build smoke, and update migration/release documentation.

5. Apply independent review findings: strict same-date rejection before source calls; archive-over-active duplicate precedence; public sku mapping; exact-full-page terminal pagination and status/reason boundary tests; correct public JSDoc.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Migrated ReturnsModule to sequential active/archive GET /api/analytics/v1/item-returns pagination through the shared limiter. Added 204-empty and exact-full-page termination handling, strict dateTo-after-dateFrom validation before calls, public sku mapping, archive-over-active duplicate precedence, status/date/reason mapping, and corrected public JSDoc. Focused Returns/Reports coverage includes active completedDt, archive without completedDt, defect classification, partial failures, and pagination. Final verification: core focused 201/201, full suite 2555 passed/1 skipped, type-check/lint/build/declarations/packed consumers passed. No live WB proof.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
