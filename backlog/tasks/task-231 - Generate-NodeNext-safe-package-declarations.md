---
id: TASK-231
title: Generate NodeNext-safe package declarations
status: Done
assignee: []
created_date: '2026-10-11 18:56'
updated_date: '2026-10-11 20:10'
labels: []
dependencies: []
references:
  - backlog/docs/wb-api-news-2026-10-docs-type-smoke.md
documentation:
  - backlog/docs/wb-api-news-2026-10-nodenext-declarations.md
modified_files:
  - vite.config.ts
  - scripts/node-next-declarations.ts
  - scripts/validate-package-exports.mjs
  - package-consumer-fixtures/news-public-types.mts
  - package-consumer-fixtures/news-public-types.cts
  - package-consumer-fixtures/full-okpd-locale-negative.mts
  - tests/unit/scripts/node-next-declarations.test.ts
  - backlog/tasks/task-231 - Generate-NodeNext-safe-package-declarations.md
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make the published declaration graph consumable by strict NodeNext ESM and CommonJS TypeScript projects across every public package export, with packed-artifact checks that prevent extensionless declaration regressions.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 A clean build emits NodeNext-resolvable declarations for all five public exports without weakening compiler strictness or patching dist manually.
- [x] #2 Packed ESM .mts and CommonJS .cts consumers compile all five public exports with module NodeNext, moduleResolution NodeNext, strict mode, and skipLibCheck false.
- [x] #3 Packed runtime import and require smoke checks resolve all five public exports without making SDK requests.
- [x] #4 Package validation and focused regression tests permanently verify declaration specifiers, packed type consumers, and runtime export routing.
- [x] #5 Targeted tests, type-check, lint, format check, build, package validation, and strict packed consumer checks pass using installed dependencies only, with evidence recorded in the NodeNext declaration report.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect vite-plugin-dts 4.5.4 hooks and the emitted declaration graph to define file-versus-directory specifier rewriting.
2. Add the smallest build-time declaration transform and focused tests, extending package validation only where it provides durable packed-consumer proof.
3. Build once from the frozen source state, capture source and artifact manifests, and verify all five packed ESM/CJS type and runtime surfaces.
4. Run targeted tests plus owned type-check, lint, and format checks; record exact results, hashes, counts, and remaining risks without marking the task Done.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Implemented a vite-plugin-dts 4.5.4 beforeWriteFile transform that rewrites AST-recognized relative declaration specifiers to source-proven .js or /index.js targets and fails unresolved targets. Added focused transformer tests and upgraded package validation to pack, extract, strictly compile NodeNext ESM/CJS consumers across all five exports with skipLibCheck false, then run packed import/require smokes without SDK calls. No package export change was needed: an isolated probe and the final tarball validation proved the shared ESM declaration graph works for import-equals CommonJS consumers. Fresh evidence: 19/19 targeted tests, stable build input manifest, build pass, 81 declarations with 0 unsafe specifiers, validate:package pass across 193 packed files, and final repository-wide type-check pass. Owned strict type checks, lint, syntax, formatting, and diff checks pass. An earlier global type-check observation caught four unused aliases in a foreign concurrently edited docs fixture; its owner resolved them before the final passing rerun. Exact earlier .tmp docs smokes could not be rerun because those other-owner artifacts disappeared during the lane. Full evidence and hashes are in backlog/docs/wb-api-news-2026-10-nodenext-declarations.md.

Final integration replaced the deleted root `.tmp-docs-public-*` inputs with persistent package-consumer fixtures copied into the extracted-tarball workspace. The strict `.mts` and `.cts` fixtures cover the October Products methods and locale contract, all four GTIN positions, sandbox delivery types and operation key, DBS nullable orders/non-null optional phone arrays, Returns public exports, and all five package export paths. A suppression-free negative fixture fails only on full-OKPD2 `locale: 'en'`. The fixtures live at repository root outside configured source/test projects because package-name resolution is intentionally provided only by the packed consumer; ordinary lint and repository type-check remain unchanged.

Final verification after the fixture-path freeze passed without weakening compiler options: 2 focused files with 19/19 tests; global type-check, lint, format and targeted diagnostics; clean build of 115 Vite modules; declaration scan of 81 files and 200 relative specifiers with zero unsafe extensionless specifiers; actual 193-file tarball validation across five exports with strict NodeNext `.mts`/`.cts` consumers and runtime import/require; 90 full-suite files with 2,580 passed and 1 skipped; and 13 mocked integration files with 228 passed and 1 skipped. All five acceptance criteria are proved and checked. The task intentionally remains In Progress until the independent composed review accepts the staged candidate.

Closeout 2026-10-11: independent composed review ACCEPT with zero findings in backlog/docs/wb-api-news-2026-10-accepted-composed-review.md. The exact frozen package candidate passed strict NodeNext ESM/CJS consumer, five-export runtime smoke and declaration-resolution review. All acceptance criteria remain proven; no version bump, npm publication, release, deploy or network call was performed.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Accepted build-time NodeNext-safe declaration rewriting and actual packed-artifact validation for all five exports, with strict ESM/CommonJS consumers, locale-negative proof and import/require smokes. Independent composed review accepted the frozen candidate.
<!-- SECTION:FINAL_SUMMARY:END -->
