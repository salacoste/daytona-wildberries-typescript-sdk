---
id: TASK-235
title: Validate rendered documentation routes and fragments
status: Done
assignee: []
created_date: '2026-10-12 00:31'
updated_date: '2026-10-12 02:04'
labels:
  - docs
  - validation
  - ci
dependencies: []
documentation:
  - backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md
  - backlog/docs/wb-sdk-v4.7.0-config-types-fix.md
modified_files:
  - scripts/validate-rendered-docs.mjs
  - scripts/validate-rendered-docs.d.mts
  - tests/unit/scripts/validate-rendered-docs.test.ts
  - docs/.vitepress/fragment-utils.ts
  - tests/unit/docs/fragment-utils.test.ts
  - package.json
  - .github/workflows/docs.yml
  - .github/workflows/main.yml
priority: high
type: chore
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make documentation validation enforce the routes users actually receive from VitePress, including locale navigation, base-path handling, sidebar targets, page fragments, and absolute or protocol-relative same-origin routes and fragments. Inventory real external URLs separately; external HTTP status and anti-bot checks are explicitly NOT RUN.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Validator checks Markdown routes and fragments after VitePress rendering
- [x] #2 Validator checks nav and sidebar targets for both locales using the configured base path
- [x] #3 Validator checks absolute and protocol-relative same-origin routes and fragments, inventories real external URLs separately, and explicitly records external HTTP status and anti-bot checks as NOT RUN
- [x] #4 VitePress dead-link suppressions are narrowed to specific justified targets
- [x] #5 Regression tests cover valid and invalid routes fragments locales and base-path behavior
- [x] #6 Documentation CI runs the effective rendered-site validator
- [x] #7 Dedicated strict TypeScript validation of the VitePress config passes and runs at the start of validate:docs:site before rendered-site and NodeNext validation
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Map VitePress output, locale config, base path, and current link-check gaps.
2. Implement an effective rendered-site validator with explicit internal and external outcomes.
3. Add fixture-driven regression tests for routes, fragments, locale navigation, and base-path handling.
4. Wire the validator into documentation CI without adding dependencies.
5. Run focused tests, existing link checks, and the documentation build; record evidence and complete the task.

6. Add a dedicated strict VitePress config type-check, fix markdown-it token construction and type the custom theme field without runtime changes, wire the check before the rendered-site and NodeNext gates, and record targeted verification evidence.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented a dependency-free validator over rendered VitePress HTML. It validates base-prefixed relative, absolute, and protocol-relative same-origin routes and fragments; inventories real external URLs without network requests; enforces required root and Russian routes plus locale-switch and module-navigation targets; and reports external references separately. Removed blanket VitePress dead-link suppressions, preserved exact TypeDoc IDs during heading-fragment normalization, added 24 focused regression controls across the validator and documentation helpers, and wired the effective validator plus NodeNext gate into both documentation workflows. Final production output: 1,005 routes, 143,092 internal references, 14,004 fragment references, and zero internal failures. Full evidence: backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md.

Reviewer-permitted prose correction: the task description and AC #3 now match the implemented boundary—absolute and protocol-relative same-origin routes/fragments are validated, real external URLs are inventoried separately, and external HTTP status/anti-bot checks are NOT RUN. This changes documentation only; validator behavior, tests, workflows, and release scope are unchanged. The existing fresh full-suite evidence remains applicable, so repeating the full suite would add no behavioral evidence; validation for this correction is limited to Backlog rendering, scoped diff/whitespace checks, artifact hashes, and preservation of the frozen index and protected config.

Strict config reviewer follow-up closed three TS2351 token-constructor diagnostics and the TS2353 custom-theme diagnostic without suppressions or runtime contract changes. Markdown-it token creation now uses typed state.Token; DocumentationThemeConfig extends DefaultTheme.Config and is applied through VitePress defineConfigWithTheme; a dedicated strict docs config tsconfig and validate:docs:config script run first in validate:docs:site. Fresh validation passed: strict config check, root type-check, lint, repository and targeted formatting checks, production documentation build, rendered-site validation, and offline NodeNext gate. The full unit and integration suites were not repeated because SDK and WB request behavior did not change. Root direct content-freeze comparison confirmed staged tree be0cbb72b4e4870c6ab01c1b02e73f0ec8924713 and staged patch SHA-256 78c2276051ba75534a1653f940396c5f302e580bf5ff05359b81855a1b9e9c8b unchanged; raw index SHA drift is stat/cache metadata only. Modified files for this follow-up: docs/.vitepress/config.ts, docs/.vitepress/tsconfig.json, package.json, and backlog/docs/wb-sdk-v4.7.0-config-types-fix.md. Full evidence: backlog/docs/wb-sdk-v4.7.0-config-types-fix.md.
<!-- SECTION:NOTES:END -->
