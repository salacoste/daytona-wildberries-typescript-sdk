---
id: TASK-227
title: Fix package export validator npm pack JSON parsing
status: Done
assignee: []
created_date: '2026-10-11 16:04'
updated_date: '2026-10-11 17:39'
labels: []
dependencies: []
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Make local packaging readiness reliable when npm pack --dry-run --json emits valid JSON on stdout, so the validator checks the packed file inventory instead of treating the JSON payload as a tarball path.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The validator accepts both npm array-form and package-name-keyed npm pack --dry-run --json manifests and reads their files inventories.
- [x] #2 Regression tests reproduce both supported npm JSON output shapes without executing a real publish.
- [x] #3 Empty, malformed, or structurally invalid npm pack JSON fails with an actionable error.
- [x] #4 Targeted tests, type-check, lint, build, and package validation pass without publishing.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Reproduce the npm pack --dry-run --json stdout shape against the current validator.
2. Parse and validate supported manifest shapes while preserving the existing package-content checks.
3. Add focused regression tests for supported, empty, malformed, and structurally invalid output.
4. Run the targeted regression, type-check, lint, build, and package export validation; document the exact evidence.

5. Validate that files is non-empty and every member is a non-null object with a non-empty string path; add index-specific failures for both supported outer forms.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Normalized npm array and package-name-keyed npm pack JSON forms. Independent review found that member-level files validation was missing; parser now requires a non-empty array and every member to be a non-null object with a non-empty string path, with outer-form/member-index diagnostics. Regression suite covers empty, malformed, null, missing, empty, and non-string paths across both outer forms: 16/16 passed. Type-check, lint, build, validate:package (5 exports/191 files), and strict packed ESM/CJS consumers passed; no publish occurred.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
