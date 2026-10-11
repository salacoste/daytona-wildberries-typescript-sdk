---
id: TASK-226
title: Add sandbox DBS deliveryType support
status: Done
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 20:10'
labels:
  - sandbox
  - orders-dbs
  - news-2026-10
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs/operation/postV3TestDbsOrdersMake
priority: high
type: feature
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Allow SDK users to create DBS-to-PVZ and EDBS test assembly orders in the Wildberries sandbox using the new deliveryType contract without any production-order behavior.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Official rendered WB evidence pins the visible request contract for POST /api/v3/test/dbs/orders/make: fixed sandbox host, required body and orders, top-level string deliveryType with dbs, dbsPickupPoint, and edbs values plus displayed dbs default and no displayed required badge, address behavior, HTTP 204, and one request per second; hidden raw required and nullable flags and live runtime behavior remain explicitly unproven.
- [x] #2 The SDK exposes ordersDBS.createTestOrders(request) as the smallest sandbox-only typed surface, always uses the fixed sandbox host, preserves optional deliveryType and address omission, validates only visible order constraints, and does not add production order creation or a sandbox namespace.
- [x] #3 Public exports, local OpenAPI root, shard, index, shared schema and raw stopgap copies, generated declarations, JSDoc, and English and Russian DBS documentation describe the evidence-supported test behavior and its evidence limits consistently.
- [x] #4 Focused mocked tests verify every displayed deliveryType value, omission compatibility, fixed-host serialization, visible validation bounds, write-operation retry safety, metadata, rate limits, public exports, and OpenAPI parity without live or production calls.
- [x] #5 Fresh targeted tests, affected checks, type-check, scoped lint and format, shard validation, build, and packed declaration smoke pass; TASK-226 remains In Progress until the composed integration review is complete.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Reconcile the already-present sandbox DBS implementation against the rendered official contract and preserve the documented raw-schema/runtime limits.
2. Make only necessary sandbox-scope corrections, including a synthetic caller-provided Test-scope token in the createTestOrders JSDoc example, without reading environment credentials or changing production routing.
3. Verify the focused runtime, type/export, retry-safety, metadata, rate-limit, OpenAPI, documentation, build/declaration, lint, and format surfaces with fresh local checks; do not run live requests or the integration-owned global full suite.
4. Update the task acceptance criteria and implementation notes to distinguish visible client interpretation from unproven hidden raw-schema flags, while keeping TASK-226 In Progress pending composed review.
5. Write the sandbox implementation report with exact results and a source-hash manifest, mark SOURCE_FROZEN, and perform no further writes.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Research 2026-10-11: added backlog/docs/wb-api-sandbox-delivery-type-contract-2026-10.md. Official WB operation URL and a fresh isolated public browser session both returned HTTP 498; no CAPTCHA, credentials, or sandbox/production request was used. Pinned supplemental eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed contains no sandbox operation/spec for POST /api/v3/test/dbs/orders/make. Do not guess deliveryType enum, optionality/default, request/response, host, or limit; baseline has no sandbox SDK namespace, so revise AC #2 before code after a directly accessible official operation schema is captured. Task remains In Progress; ACs remain unchecked.

Official evidence supplement backlog/docs/wb-api-sandbox-delivery-type-search-evidence-2026-10.md confirms the sandbox host, route, required orders array (1-10), optional address with documented default-address behavior, HTTP 204 success, and 1 request/second per DBS sandbox method. The official change notice confirms deliveryType is in the request, but its placement, JSON type, enum, requiredness, nullability, and default remain unresolved. The SDK has no existing sandbox namespace. No guessed code was added; task remains In Progress behind this narrow property-schema blocker.

Закрытие реализации 2026-10-11: существующий код сверен с отображённым официальным контрактом и принятым локальным дизайном. Метод ordersDBS.createTestOrders(request) использует только фиксированный sandbox URL, сериализует optional deliveryType/address без подстановки значений, валидирует 1–10 orders, целочисленный amount и максимум 10, применяет отдельный лимит 60 запросов/мин с интервалом 1с и всплеском 1, а operationKey отключает автоматический повтор write-операции. Публичные типы, корневой экспорт, локальные OpenAPI root/shard/index/shared/raw копии и EN/RU DBS-документация синхронизированы. JSDoc-пример нового метода использует явное синтетическое значение caller-provided-test-scope-token и не читает process.env.

Свежая локальная проверка: точный целевой срез — 4 файла, 93/93 теста; расширенный затронутый срез — 6 файлов, 195/195 тестов; npm run type-check — exit 0; scoped ESLint — exit 0; scoped Prettier check — exit 0; npm run validate:shards — 61/61 clean; npm run build — exit 0, ESM/CJS/declarations generated; npm run validate:package — 5 export surfaces, 193 packed files; generated declarations содержат createTestOrders и публичные sandbox DBS types; scoped git diff --check — exit 0. Глобальный полный suite в этом lane не запускался: он закреплён за владельцем финальной интеграции. Live/sandbox/production запросы не выполнялись.

Граница доказательства сохранена: optional deliveryType/address — клиентская интерпретация отображённых badges и документированных defaults; скрытые raw required/nullable flags, server-side defaulting, HTTP 204 runtime и фактический rate enforcement не доказаны. TASK-226 остаётся In Progress до составного integration review.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.

Closeout 2026-10-11: independent composed review ACCEPT with zero findings in backlog/docs/wb-api-news-2026-10-accepted-composed-review.md. The root-cause guard confirmed the fixed sandbox POST uses registered non-readonly operation metadata, suppresses automatic write retry, and rethrows the original failure. All acceptance criteria remain proven offline; hidden raw flags, server-side defaulting, HTTP 204 runtime, actual limiter enforcement and successful sandbox execution remain unproven.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Accepted the bounded sandbox DBS createTestOrders contract, fixed-host routing, visible validation, dedicated limiter, write-retry safety, public types, OpenAPI, documentation and mocked tests. No sandbox or production request was used as proof.
<!-- SECTION:FINAL_SUMMARY:END -->
