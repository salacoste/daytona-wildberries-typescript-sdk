---
id: TASK-229
title: Restore FBS waybill OpenAPI parity
status: Done
assignee: []
created_date: '2026-10-11 16:46'
updated_date: '2026-10-11 17:39'
labels:
  - orders-fbs
  - openapi
  - news-audit
dependencies: []
priority: high
type: docs
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Represent the already implemented FBS electronic waybill method in every repository-owned OpenAPI copy so generated and source documentation match the shipped SDK contract.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The root FBS OpenAPI, postavki-fbs shard, shard index/count metadata, shared schemas, and raw-yaml documentation copy include PATCH /api/marketplace/v3/fbs/supplies/waybill with the contract pinned by TASK-208 evidence.
- [x] #2 The request schema and responses match the captured official contract and existing runtime types/tests without guessed fields or behavior.
- [x] #3 Root, shard, and raw-yaml parity checks plus OpenAPI/shard validation pass.
- [x] #4 Documentation and the final delivery report identify this as closure of a TASK-216 audit residual, without claiming live WB execution.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Extract the exact waybill path, schemas, response references, server, category, and rate-limit prose from the TASK-208 captured contract.
2. Insert the operation and schemas into the root FBS OpenAPI, supplies shard, shard metadata, and raw-yaml copy using existing repository patterns.
3. Run targeted root/shard/raw parity and OpenAPI/shard validation.
4. Record the audit residual closure and evidence boundaries in task notes and the final delivery report.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added PATCH /api/marketplace/v3/fbs/supplies/waybill from the captured TASK-208 contract to the root FBS OpenAPI, supplies shard, shared schemas/examples, shard counts, and raw-yaml copy. Added UpdateSuppliesWaybill and UpdateSupplyWaybill plus the captured per-supply response example. Final YAML parse and semantic root/shard/raw parity passed with 42 root operations and 19 supplies operations; validate:shards passed 60/60; existing mocked Orders FBS tests passed 107/107. Final delivery report identifies this TASK-216 residual. No live WB call.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
