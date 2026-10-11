---
id: TASK-217
title: Document two-hour Sales Funnel and CSV data freshness
status: Done
assignee: []
created_date: '2026-10-11 15:31'
updated_date: '2026-10-11 17:38'
labels:
  - analytics
  - news-2026-10
  - data-freshness
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/analytics/#tag/salesFunnel/operation/postV3SalesFunnelProducts
  - >-
    https://dev.wildberries.ru/docs/openapi/analytics/#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads
priority: medium
type: docs
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Prevent analytics consumers from treating Sales Funnel API and related CSV data as fresher than Wildberries provides after the 2026-09-24 cadence change.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 JSDoc and EN/RU analytics documentation identify the three Sales Funnel v3 operations and DETAIL_HISTORY_REPORT/GROUPED_HISTORY_REPORT as refreshing once every two hours from 2026-09-24.
- [x] #2 Documentation states that Order Feed can replace only order and buyout data, not views, cart additions, or conversion metrics.
- [x] #3 No request rate-limit configuration changes are introduced for this freshness-only announcement.
- [x] #4 Documentation/static checks and affected analytics tests pass, or documentation-only test exclusions are explicitly evidenced.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Использовать CAP-1 существующего SPEC и закреплённый analytics OpenAPI; подтвердить 3 API и 2 CSV поверхности.
2. Обновить JSDoc, типы-запросы, EN/RU guides и активные OpenAPI descriptions; сохранить rate limits.
3. Выполнить analytics/CSV regression, docs/static/type/lint/build проверки; зафиксировать evidence.
4. Устранить принятую independent-review коллизию: удалить устаревшие one-hour предложения только у трёх затронутых Sales Funnel операций в raw English OpenAPI и проверить отсутствие противоречия.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Updated Sales Funnel JSDoc, active OpenAPI descriptions, and EN/RU guidance for the three API operations and DETAIL_HISTORY_REPORT/GROUPED_HISTORY_REPORT two-hour freshness from 2026-09-24. Preserved the Order Feed scope and unchanged limiter settings. Independent review found and integration removed stale hourly wording from the affected raw descriptions; freshness regression covers root/shard/raw copies. Final full tests, docs validation, examples, links, lint, type-check, build, and isolated docs build passed.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
