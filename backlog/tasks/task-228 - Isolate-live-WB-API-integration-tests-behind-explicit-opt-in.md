---
id: TASK-228
title: Isolate live WB API integration tests behind explicit opt-in
status: Done
assignee: []
created_date: '2026-10-11 16:46'
updated_date: '2026-10-11 17:39'
labels:
  - integration-tests
  - safety
  - news-2026-10
dependencies: []
priority: high
type: chore
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Keep the default integration runner deterministic and credential-safe after the current integration command selected the live API file, loaded the existing dotenv environment, and produced eight network failures.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The default Vitest integration configuration excludes tests/integration/api.test.ts and selects only mocked integration tests.
- [x] #2 tests/integration/api.test.ts checks WB_LIVE_API_TESTS=true before importing or invoking dotenv, creating the SDK, reading token variables, or issuing any request.
- [x] #3 Source/config inspection and Vitest test listing prove default exclusion and stable explicit opt-in selection without executing a live request or inspecting environment values.
- [x] #4 Documentation records the earlier attempted run honestly as 228 passed, 1 skipped, and 8 NetworkError failures after dotenv loaded an existing environment, and documents the manual authorized opt-in command.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect the current integration config and live test module initialization order.
2. Exclude the live file from the default integration runner and add an exact pre-dotenv WB_LIVE_API_TESTS=true guard.
3. Verify with source inspection and Vitest test listing only; do not run the live file or inspect credentials.
4. Record the failed earlier attempt and the corrected default runner evidence in the final delivery report.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Default vitest.integration.config.ts selects 13 mocked integration files and excludes tests/integration/api.test.ts. Exact WB_LIVE_API_TESTS=true selects only the live file; api.test.ts checks the flag before dynamic dotenv/axios/path imports, WB_API_KEY access, client construction, or requests. Source/config listings proved both selections without evaluating live mode. Earlier unguarded run is recorded honestly: dotenv loaded existing state, 228 mocked passed, 1 skipped, and 8 live tests failed with NetworkError; no credential values are retained. Corrected default run: 13 files, 228 passed, 1 skipped.

Final integration verification (2026-10-11): the default suite passed 2,577 tests across 89 files with 1 skipped; mocked integration passed 228 tests across 13 files with 1 skipped; the default list contains only those 13 mocked files and static exact-opt-in selection contains only tests/integration/api.test.ts. Type-check, lint, format, build, package validation (193 files/5 exports), strict packed .mts/.cts consumers, ESM/CJS runtime imports, TypeDoc validation, 50-file/378-example validation, 1,627-file link validation, 61/61 shards, and isolated VitePress build passed. No live, sandbox, production, publish, or deploy action was performed.
<!-- SECTION:NOTES:END -->
