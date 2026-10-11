---
id: TASK-222
title: Deprecate region-sale report with verified Order Feed migration guidance
status: Done
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 17:39'
due_date: '2026-11-03'
labels:
  - reports
  - analytics
  - news-2026-10
  - deprecation
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/knowledge-base/articles/01a09d9e-4f79-7016-b641-0718252e6572/lenta-zakazov#prodazhi-po-regionam
  - >-
    https://dev.wildberries.ru/docs/openapi/reports#tag/salesByRegions/operation/getV1AnalyticsRegionSale
  - 'https://seller.wildberries.ru/news-v2/news-details?id=14313'
priority: high
type: enhancement
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Give 4.x consumers a truthful migration path before Wildberries disables the regional-sales report, while preserving compatibility and avoiding a silent non-equivalent replacement.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The supplied official WB news and knowledge-base URLs remain the controlling sources for the 2026-11-03 shutdown and recommended Order Feed source; local documentation does not claim a freshly retrieved versioned official schema.
- [x] #2 The existing 4.x region-sale method remains callable but gains dated @deprecated and warn-once guidance; no physical removal occurs in 4.x.
- [x] #3 Migration documentation explains Order Feed pagination, snapshot behavior, maximum time range, regional source fields, and per-page aggregation needed to approximate regional sales without retaining the entire feed.
- [x] #4 Documentation states the semantic differences and does not claim Order Feed is a drop-in equivalent or silently substitute its response for region-sale.
- [x] #5 Focused tests cover warn-once compatibility and unchanged legacy request behavior; reports/analytics tests, type-check, lint, docs checks, and package declaration/build smoke pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Confirm the shutdown notice and official migration article without logging into Seller Cabinet.
2. Trace the existing method, consumers, and Order Feed contract; document non-equivalent aggregation semantics.
3. Add dated 4.x deprecation/warn-once behavior and focused tests while preserving request/response compatibility.
4. Update EN/RU migration docs/release notes and run reports/analytics tests, type-check, lint, docs checks, and package declaration/build smoke.

5. Fold each Order Feed page directly into the regional aggregate and guard non-advancing full-page pagination in EN/RU examples.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Kept getAnalyticsRegionSale callable in 4.x, added dated @deprecated and warn-once guidance, and preserved the legacy wire request. Added EN/RU migration guides for Order Feed snapshot pagination, 31-day range, regional fields, status semantics, and non-equivalence. Independent review finding was accepted: examples now fold each page directly into the regional aggregate and guard offset advancement. Supplied official URLs remain controlling without claiming a freshly retrieved versioned schema. Focused reports tests, docs examples/links/build, full suite, lint, type-check, declarations, and package validation passed.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
