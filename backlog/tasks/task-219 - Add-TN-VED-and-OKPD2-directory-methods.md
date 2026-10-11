---
id: TASK-219
title: Add TN VED and OKPD2 directory methods
status: Done
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 20:10'
labels:
  - products
  - news-2026-10
  - api-contract
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnvedAll
  - >-
    https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpd
  - >-
    https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpdAll
priority: high
type: feature
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Let SDK consumers retrieve official TN VED and OKPD2 directory data needed for listing classification through the three new item-management operations.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Official operation URLs remain controlling; the dated official raw `02-items.yaml` capture closes the exact request/response gate, while the rendered `okpd/all` locale conflict is retained without a runtime-rejection claim.
- [x] #2 The Products module exposes three clearly named typed methods that call the exact evidence-supported paths and preserve the captured required/optional behavior.
- [x] #3 Public types, exports, rate-limit keys, local OpenAPI shards, and generated declarations represent all three operations without any/unknown leakage.
- [x] #4 Targeted unit tests verify URL, query serialization, rate-limit key, typed response passthrough, representative empty/list results, public root type exports, required/optional boundaries, and root/shard/raw OpenAPI parity.
- [x] #5 EN/RU product documentation and release notes cover intended use, the raw/rendered locale conflict, and the no-runtime-proof boundary; type-check, lint, affected tests, OpenAPI validation, and package declaration/build smoke pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Resolve all three endpoint contracts from the same selected official OpenAPI evidence set, with official URLs controlling and the pinned snapshot identified as supplemental non-official evidence.
2. Map existing Products directory naming, types, limiter, exports, and local spec patterns.
3. Implement the three methods and types with focused synthetic tests.
4. Update EN/RU docs/release notes and run products tests, OpenAPI validation, type-check, lint, and package declaration/build smoke.
5. Assert the exact 54-key Products limiter keyset, including the three new directory keys.
6. Address accepted independent-review gaps with root-entry type imports, minimal/negative OKPD compile contracts, and parsed root/shard/raw OpenAPI parity assertions for paths, parameters, schemas, and rate-limit metadata.

7. Add the three accepted read-only Products directory entries to operation metadata and cover full helper output plus operation-key-aware transient retry behavior.

8. Reconcile the headed rendered observation against official raw Swagger: narrow `/api/content/v2/directory/okpd/all` to raw `ru`, keep TN VED `ru|en` and per-subject OKPD2 `ru`, preserve numeric search, synchronize Products root/shard/raw OpenAPI, add focused negative type coverage, and document both the source conflict and no-runtime-proof boundary.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added three typed Products directory methods, exact query/locale boundaries, dedicated 100/min limiter keys, root exports, local root/shard/raw OpenAPI parity, operation metadata, and operation-key retry behavior. Independent review findings added exact 54-key limiter coverage, root import/type boundaries, structural OpenAPI tests, and metadata/helper/retry tests. This initial integration used evidence-qualified supplemental material after rendered-page retrieval returned HTTP 498; the later official raw reconciliation below supersedes that temporary gate.

Direct official rendered delta (2026-10-11): /api/content/v2/directory/okpd/all now has a separate public ru|en locale type and matching root/shard/raw OpenAPI, while per-subject /okpd remains ru-only. The official search number-versus-dotted-text mismatch remains documented and the numeric type is preserved. Focused Products/DBS tests passed 87/87; type-check, scoped lint/format, 60/60 shard validation, build, and package validation passed. See backlog/docs/wb-api-news-2026-10-official-delta.md. Task remains In Progress pending independent review and closure of strict external/raw-schema gates; the earlier Done state is superseded.

Official raw reconciliation (2026-10-11): WB public `02-items.yaml` (SHA-256 `e2eef8712991355a44e5c28cdb96ad493a31775d18605f6b3263a3a84f0aa220`) narrows full OKPD2 locale to `ru`; root/shard/raw OpenAPI, `OkpdFullDirectoryLocale`, focused tests, and EN/RU guidance now match. The earlier rendered `ru,en` observation remains recorded as an official-documentation conflict and is not treated as proof that runtime rejects `en`. The raw source gate is closed; task stays In Progress only for composed independent review and final offline validation.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.

Closeout 2026-10-11: independent composed review ACCEPT with zero findings in backlog/docs/wb-api-news-2026-10-accepted-composed-review.md. The exact 226-path frozen candidate passed the review gate; all acceptance criteria remain proven by the recorded offline checks. Successful live WB calls, push, npm publication, release and deploy remain outside this task.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Accepted TN VED and OKPD2 directory contracts, exports, rate limits, metadata, OpenAPI, documentation and regression coverage. Independent composed review accepted the exact frozen candidate; offline verification is complete and live/runtime publication remains unproven.
<!-- SECTION:FINAL_SUMMARY:END -->
