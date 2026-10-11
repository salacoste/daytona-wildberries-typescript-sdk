---
id: TASK-225
title: Document two-hour Search Queries API and CSV data freshness
status: Done
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 17:39'
due_date: '2026-10-12'
labels:
  - analytics
  - news-2026-10
  - data-freshness
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportReport
  - >-
    https://dev.wildberries.ru/docs/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads
priority: high
type: docs
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Prevent search-query analytics consumers from assuming fresher data than Wildberries provides after the 2026-10-12 two-hour refresh change.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 JSDoc and EN/RU analytics documentation identify the five affected Search Queries API operations and SEARCH_QUERIES_PREMIUM_REPORT_GROUP, SEARCH_QUERIES_PREMIUM_REPORT_PRODUCT, and SEARCH_QUERIES_PREMIUM_REPORT_TEXT CSV exports.
- [x] #2 Documentation states that affected data refreshes once every two hours from 2026-10-12 and does not describe this as a request-rate limit.
- [x] #3 The cadence update remains separate from the five percentile-column removal in SEARCH_QUERIES_PREMIUM_REPORT_TEXT and does not alter unrelated report schemas.
- [x] #4 No rate-limit configuration changes are introduced without separate official rate-limit evidence.
- [x] #5 Documentation/static checks and affected analytics tests pass, with repository search proving all eight affected surfaces are covered.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Использовать CAP-8 существующего SPEC; сопоставить 5 Search Queries API и 3 CSV report types.
2. Обновить JSDoc, EN/RU guides и активные OpenAPI descriptions: раз в 2 часа с 2026-10-12, отдельно от rate limits и percentile removal.
3. Проверить coverage всех 8 поверхностей, неизменность limiter и analytics/docs/static/type/lint/build evidence.
4. Устранить принятую independent-review коллизию: удалить устаревшие one-hour предложения только у пяти затронутых Search Queries операций в raw English OpenAPI и проверить отсутствие противоречия.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Updated five Search Queries API operations and three CSV report types for the two-hour freshness effective 2026-10-12, keeping percentile removal separate and request limiter settings unchanged. Independent review found stale hourly sentences in raw English descriptions; integration removed only those eight contradictions and added a root/shard/raw freshness regression. Full analytics tests, docs validation/examples/links/build, lint, type-check, package validation, and full suite passed.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
