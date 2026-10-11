---
id: TASK-221
title: Add additional GTIN fields to product card contracts
status: Done
assignee: []
created_date: '2026-10-11 15:33'
updated_date: '2026-10-11 17:39'
labels:
  - products
  - news-2026-10
  - api-contract
dependencies: []
references:
  - >-
    https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUpload
  - >-
    https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate
  - >-
    https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd
  - >-
    https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList
priority: high
type: enhancement
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Expose Wildberries additional-GTIN support across product card create, update, add, and list contracts while documenting the listing-level reuse restriction accurately.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Official operation URLs remain controlling; the dated official raw `02-items.yaml` capture confirms all four exact GTIN placements as optional non-null strings and closes the property gate.
- [x] #2 Public request and response types, exports, local OpenAPI, and generated declarations include gtin consistently for all four operations without changing existing skus behavior.
- [x] #3 JSDoc and EN/RU product documentation state that an additional GTIN is allowed only when the same GTIN was previously present in skus of one of the seller listings; the SDK does not restrict reuse to the same listing.
- [x] #4 The SDK does not attempt unverifiable account-wide or historical GTIN enforcement; documentation identifies this as a server-side business rule.
- [x] #5 Focused type/runtime tests cover valid field placement, absent-field compatibility, non-null boundaries, public/OpenAPI parity, and the corrected cross-listing example; type-check, lint, affected tests, OpenAPI validation, and package declaration/build smoke pass.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Pin the four official schemas and locate the shared card request/response types.
2. Add gtin at the exact contract locations and synchronize local OpenAPI/declarations.
3. Add compatibility/type tests and document the server-enforced rule that the value must previously appear in skus of one of the seller listings, without client history validation.
4. Run products tests, OpenAPI validation, type-check, lint, and package declaration/build smoke.
5. Address accepted independent-review gaps with compile-time non-null GTIN assertions and parsed root/shard/raw OpenAPI checks for all four exact placements.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added optional non-null gtin to the three write positions and cards-list response, synchronized root/shard/raw OpenAPI, public root types, tests, and EN/RU docs. Independent review added exact compile-time null rejection, structural parity, and corrected examples showing a different current SKU while the GTIN previously existed in one of the seller listings. This initial integration used evidence-qualified supplemental material after rendered-page retrieval returned HTTP 498; the official raw follow-up below supersedes that temporary gate.

Official raw follow-up (2026-10-11): WB public `02-items.yaml` (SHA-256 `e2eef8712991355a44e5c28cdb96ad493a31775d18605f6b3263a3a84f0aa220`) confirms `gtin` is absent from each parent `required` list, has `type: string`, and has no nullable allowance in all four placements. Existing `gtin?: string` types and non-null tests are exact. The source gate is closed; final composed review remains pending.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
