---
id: TASK-238
title: Fix public Russian API placeholders and favicon
status: Done
assignee: []
created_date: '2026-10-12 03:27'
updated_date: '2026-10-12 04:22'
labels:
  - docs
  - validation
  - ux
dependencies: []
documentation:
  - backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md
  - backlog/docs/wb-sdk-v4.7.0-release-closeout.md
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
1. Map every Russian API placeholder, shared-English sidebar target, locale fallback, favicon configuration, and rendered-validator contract.
2. Replace ineffective redirect blocks with visible Russian notices and explicit English API links, and add a base-aware local SVG favicon.
3. Extend rendered validation and focused tests for placeholder leakage and favicon base/asset behavior, then run targeted quality and production-documentation checks.
4. Independently review the exact candidate, commit and push it, wait for exact-head CI, security, documentation deploy, and Pages success, then verify the public routes in fresh isolated browsers.
5. Record the verified public behavior and the ReturnsModule counterpart correction, preserve historical evidence, and close the task.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
The documentation UX repair completed and was independently verified in public on 2026-10-12.

Implementation and review:
- All 16 affected Russian API placeholders render a clear Russian no-auto-transition notice and an explicit English API reference link without literal script-setup text or automatic redirect behavior.
- Shared-English Russian sidebar links and locale controls remain available. For ReturnsModule specifically, there is no Russian source page and no deployed Russian counterpart. The correct no-counterpart locale target is /ru/, and an independent hydrated-browser check observed that fallback. This corrects the stale sentence in the historical implementation report without rewriting that immutable report.
- Production documentation uses the configured project base for the local SVG favicon. The emitted and public favicon is byte-identical to the accepted source asset.
- Rendered validation and focused tests enforce the placeholder and favicon behavior. The accepted checks passed: validator syntax, 25/25 focused tests, scoped ESLint and Prettier, strict VitePress config, repository type-check, 16/16 source assertions, a 1,005-page production build, and the aggregate gate with 144,097 internal references, 14,004 fragments, one root favicon reference, and zero failures.
- Independent exact-candidate review accepted the 23-path change with zero findings. Delivery commit c58c1f230720db6470b2cba2a6b0e19d1f933777 was pushed to main; gh-pages 092f5446c50bda5cb77bd4d4fd23d312a2888af5 carries its source marker. Exact-head CI 38201377429, Secret Scan 38201377406, Documentation Deploy 38201377475, and Pages 38201520683 all passed.
- Fresh isolated public verification proved the selected bytes, reciprocal NodeNext locale switching, explicit English placeholder link, shared-English sidebar links, ReturnsModule fallback to /ru/, representative API hydration, and project-base favicon behavior.

Evidence is preserved in backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md, backlog/docs/wb-sdk-v4.7.0-public-ux-exact-review.md, backlog/docs/wb-sdk-v4.7.0-docs-ux-delivery.md, the accepted local delivery/public-verification receipts, and backlog/docs/wb-sdk-v4.7.0-release-closeout.md. Protected backlog/config.yml remains unstaged with SHA-256 bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9. No WB live API or sandbox call was run.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
DONE — the Russian API placeholders and configured-base favicon are deployed from the accepted exact candidate, all exact-head workflows passed, and fresh isolated public verification accepted the rendered behavior, including the correct ReturnsModule fallback to /ru/.
<!-- SECTION:FINAL_SUMMARY:END -->
