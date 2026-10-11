---
id: TASK-220
title: Remove disabled percentile columns from Search Queries text CSV contract
status: Done
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 17:39'
due_date: '2026-10-12'
labels:
  - analytics
  - news-2026-10
  - csv-contract
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/analytics/#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId
priority: high
type: enhancement
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Keep CSV parsing and public typing accurate when Wildberries stops emitting five percentile columns in the Search Queries Premium text export on 2026-10-12.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Only SEARCH_QUERIES_PREMIUM_REPORT_TEXT assumptions for OpenCardPercentile, AddToCartPercentile, OpenToCartPercentile, OrdersPercentile, and CartToOrderPercentile are removed or made compatible with absence.
- [x] #2 Repository search proves similarly named percentile fields in unrelated reports, types, fixtures, and documentation remain unchanged.
- [x] #3 CSV parser mandatory-column logic, public types, fixtures, examples, and EN/RU documentation accept post-2026-10-12 text files that omit all five columns.
- [x] #4 Regression tests cover a post-change text CSV fixture and preserve parsing behavior for unaffected Search Queries CSV variants.
- [x] #5 Type-check, lint, targeted analytics/CSV tests, declaration/build smoke, and any repository CSV validation pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Проверить все CSV consumers: SDK отдаёт ArrayBuffer, встроенного parser/mandatory columns/CSV row types нет.\n2. Синтетическими fixtures и regression проверить post-change text CSV и неизменные GROUP/PRODUCT варианты.\n3. Удалить только пять percentile колонок из активных text CSV OpenAPI descriptions/examples; сохранить JSON percentile и архивные snapshots.\n4. Обновить EN/RU docs и выполнить focused tests, type/lint/docs/shards/build проверки.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Removed only OpenCardPercentile, AddToCartPercentile, OpenToCartPercentile, OrdersPercentile, and CartToOrderPercentile assumptions from the SEARCH_QUERIES_PREMIUM_REPORT_TEXT contract/fixture. Preserved group/product CSV and JSON percentile fields. Regression tests prove scope and the SDK remains an ArrayBuffer downloader rather than inventing a CSV parser. Independent review accepted this boundary. Full tests, analytics contracts, docs checks, lint, type-check, build, and package validation passed.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
