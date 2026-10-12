---
id: TASK-238
title: Fix public Russian API placeholders and favicon
status: In Progress
assignee: []
created_date: '2026-10-12 03:27'
updated_date: '2026-10-12 03:33'
labels:
  - docs
  - validation
  - ux
dependencies: []
documentation:
  - backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md
modified_files:
  - docs/ru/api/index.md
  - docs/ru/api/classes/AnalyticsModule.md
  - docs/ru/api/classes/BaseClient.md
  - docs/ru/api/classes/CommunicationsModule.md
  - docs/ru/api/classes/FinancesModule.md
  - docs/ru/api/classes/GeneralModule.md
  - docs/ru/api/classes/InStorePickupModule.md
  - docs/ru/api/classes/OrdersDbsModule.md
  - docs/ru/api/classes/OrdersFbsModule.md
  - docs/ru/api/classes/OrdersFbwModule.md
  - docs/ru/api/classes/ProductsModule.md
  - docs/ru/api/classes/PromotionModule.md
  - docs/ru/api/classes/ReportsModule.md
  - docs/ru/api/classes/TariffsModule.md
  - docs/ru/api/classes/UserManagementModule.md
  - docs/ru/api/classes/WildberriesSDK.md
  - docs/.vitepress/config.ts
  - docs/public/favicon.svg
  - scripts/validate-rendered-docs.mjs
  - scripts/validate-rendered-docs.d.mts
  - tests/unit/scripts/validate-rendered-docs.test.ts
  - backlog/tasks/task-238 - Fix-public-Russian-API-placeholders-and-favicon.md
  - backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md
priority: high
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Repair the published documentation UX defects found by independent public verification: Russian API placeholder pages must render a clear notice with explicit English reference links without exposing or executing redirect code, and the documentation site must serve a local favicon under its configured base path.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Every Russian API placeholder renders an understandable Russian notice and an explicit valid link to the corresponding English API reference without literal script setup text or automatic redirect behavior
- [x] #2 The existing shared-English Russian sidebar targets and locale controls remain available
- [x] #3 Production documentation references a minimal local SVG favicon through the configured Pages base path and the built asset exists
- [x] #4 Rendered documentation validation fails for literal script setup text on Russian API placeholders and for a missing or wrong-base favicon
- [x] #5 Targeted tests, strict VitePress config validation, production documentation build, aggregate documentation gate, and applicable scoped lint, typecheck, and formatting checks pass
- [x] #6 A bounded implementation report records exact owned files, fresh evidence, cleanup, and the remaining independent-review and public-deployment gaps
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Map every Russian API placeholder, current locale/sidebar behavior, VitePress head configuration, and rendered-validator conventions.
2. Remove the ineffective redirect blocks while preserving clear Russian notices and explicit English reference links.
3. Add a minimal branded SVG favicon and configure it through VitePress with the deployment base.
4. Extend the existing rendered validator and focused tests to guard placeholder source leakage and favicon base/asset behavior.
5. Run focused tests, strict config validation, production docs build, aggregate docs validation, and scoped quality checks.
6. Record exact evidence and limitations in the bounded report, add implementation notes, and leave the task In Progress pending independent review and public deployment proof.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Repaired all 16 Russian API placeholders that exposed ineffective script-setup redirects. Each now provides a clear Russian no-auto-transition notice and an explicit valid English API link; the real Russian ReturnsModule page, shared-English sidebar, and locale controls remain unchanged. Added a local base-aware WB SVG favicon using the existing purple palette. Extended rendered validation and focused tests to reject literal script-setup placeholder output and missing or wrong-base favicon behavior.

Fresh checks passed: validator syntax; focused Vitest 25/25; scoped ESLint and Prettier; strict VitePress config; repository type-check; 16/16 source assertions; production docs build (1,005 pages); emitted favicon/placeholder/sidebar/locale assertions; aggregate docs gate (144,097 internal references, 14,004 fragments, one root favicon reference, zero failures, strict NodeNext build); and git diff whitespace checks. The docs build's 803 tracked TypeDoc hash-only side effects were reversed, leaving no docs/api diff. Protected backlog/config.yml remains SHA-256 bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9.

Evidence: backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md, SHA-256 9e5c0a9dd465bb735368ba5dfc3d13c9647a7ae63084bdf13606d6881c75cd52. Task intentionally remains In Progress pending independent review, delivery, and fresh public Pages/browser proof. No WB/sandbox call, credential/env inspection, whole repeated test suite, commit, push, tag, release, deploy, or npm publication was performed.
<!-- SECTION:NOTES:END -->
