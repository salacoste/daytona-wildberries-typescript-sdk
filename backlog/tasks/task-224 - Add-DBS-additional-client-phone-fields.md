---
id: TASK-224
title: Add DBS additional client phone fields
status: Done
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 20:10'
labels:
  - orders-dbs
  - news-2026-10
  - privacy
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient
priority: high
type: enhancement
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Expose the newly announced additional and replacement phone data from DBS order client information using the exact optional and nullable contract without retaining real personal data in tests or documentation.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Official announcement and operation URLs remain controlling; the dated official raw `05-dbs.yaml` capture confirms both phone fields as optional non-null arrays of non-null strings and confirms nullable top-level `orders`.
- [x] #2 The shared public DBS client-info response types, supported root exports, local OpenAPI, and generated declarations expose both fields exactly once.
- [x] #3 Focused unit/type tests cover presence, absence, list cases, nullable top-level `orders`, root type imports, and compile-time phone-array null rejection using synthetic phone values only.
- [x] #4 Documentation and examples avoid real customer data, explain the official raw contract and no-runtime-proof boundary, and prohibit logging or persistence.
- [x] #5 Orders-DBS tests, type-check, lint, OpenAPI validation, packed root-import consumers, and package declaration/build smoke pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Pin the official client-info response schema and locate the shared DBS response type/local spec.
2. Add both fields with exact optional/null/list semantics and synchronize exports/declarations.
3. Add synthetic privacy-safe tests and concise documentation.
4. Run orders-DBS tests, OpenAPI validation, type-check, lint, and package declaration/build smoke.

5. Add supported root type exports and keep property claims bounded to captured evidence.

6. Reconcile the headed and raw official DBS contract: allow the top-level getClientInfo response orders value to be null, model both phone arrays as optional non-null arrays, synchronize DBS root/shard/raw OpenAPI, and add synthetic mock passthrough and public compile coverage.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added additionalPhones and replacementAdditionalPhones to DBS client info, local OpenAPI, synthetic tests, EN/RU privacy guidance, and supported root type exports for DBSClientInfo/GetClientInfoResponse. Independent review removed unsupported property claims and packed strict ESM/CJS declaration consumers verified root imports. This initial integration used evidence-qualified supplemental material after rendered-page retrieval returned HTTP 498; the later official raw reconciliation below supersedes that temporary gate.

Direct official rendered delta (2026-10-11): GetClientInfoResponse.orders now accepts DBSClientInfo[] | null, with matching root/shard/raw OpenAPI and synthetic null passthrough/public compile coverage. No field-level optionality/nullability was inferred for the two phone arrays from missing badges. Focused Products/DBS tests passed 87/87; type-check, scoped lint/format, 60/60 shard validation, build, and package validation passed. See backlog/docs/wb-api-news-2026-10-official-delta.md. Task remains In Progress pending independent review and raw/full official schema evidence for unresolved phone-field metadata; the earlier Done state is superseded.

Official raw reconciliation (2026-10-11): WB public `05-dbs.yaml` (SHA-256 `b5f8ab9d9828757540cb9e7b230fa8c501ab5c1c02f788c2f15af595573c4f31`) confirms `additionalPhones` and `replacementAdditionalPhones` are optional non-null arrays with non-null string items, and confirms top-level `orders` is nullable. Types, OpenAPI, declarations, privacy-safe tests, and docs match. The raw source gate is closed; task stays In Progress only for composed independent review and final offline validation.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.

Closeout 2026-10-11: independent composed review ACCEPT with zero findings in backlog/docs/wb-api-news-2026-10-accepted-composed-review.md. The exact 226-path frozen candidate passed the review gate; all acceptance criteria remain proven by the recorded offline checks. Successful live WB calls, push, npm publication, release and deploy remain outside this task.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Accepted nullable DBS client orders and optional non-null additional phone arrays across public types, exports, OpenAPI, generated declarations, privacy-safe documentation and synthetic tests. Independent composed review accepted the frozen candidate.
<!-- SECTION:FINAL_SUMMARY:END -->
