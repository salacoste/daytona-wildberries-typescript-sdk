---
id: TASK-218
title: Add finance detailed-report buyer KPP and UPD/UKD fields
status: Done
assignee: []
created_date: '2026-10-11 15:32'
updated_date: '2026-10-11 17:38'
labels:
  - finances
  - news-2026-10
  - api-contract
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId
  - >-
    https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed
priority: high
type: feature
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Expose the three newly announced buyer and universal-transfer-document fields consistently from both v1 detailed sales report operations without duplicating or conflating the unrelated acquiring-report KPP field.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Official announcement and operation URLs remain controlling; the dated official raw `13-finances.yaml` capture confirms all three fields as required non-null strings and `utdUcdDate` as `format: date`.
- [x] #2 The shared SalesReportDetailedItem public type exposes all three fields and SalesReportDetailedField includes them through keyof without a duplicate list.
- [x] #3 Both local detailed-report OpenAPI operations and generated declarations include the three fields consistently.
- [x] #4 Focused finance tests cover populated and projected-away values while keeping the unrelated acquiring taxRegistrationReasonCode unchanged; unsupported official nullability claims are not made.
- [x] #5 EN/RU finance documentation and release notes state the evidence boundary; type-check, lint, affected tests, OpenAPI validation, and package declaration/build smoke pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Capture and pin the official schemas for both operations, resolving optionality, nullability, and format before edits.
2. Add the three fields to the shared finance type and synchronized local OpenAPI/generation surfaces.
3. Add focused synthetic contract tests and update EN/RU documentation/release notes.
4. Run finance tests, OpenAPI validation, type-check, lint, and declaration/package build smoke.

5. Replace any official-property wording with evidence-qualified supplemental wording and keep the release gate explicit.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added buyerTaxRegistrationReasonCode, utdUcdNumber, and utdUcdDate to the shared detailed-report type, both local OpenAPI operations, tests, and EN/RU documentation. Independent review confirmed internal schema consistency and required evidence qualification. The initial rendered-page retrieval returned HTTP 498 and used a supplemental non-official snapshot; a later official raw `13-finances.yaml` capture (SHA-256 `b2ef4fae9fa1601cc33942081fcd7d48ce5255101946ba014d9b5abd8f95cb96`) closed the property gate and confirmed required non-null strings plus `format: date`. Public TypeScript remains optional only because official selective `fields` projections may omit these members. Final validation evidence is recorded in the delivery report.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
