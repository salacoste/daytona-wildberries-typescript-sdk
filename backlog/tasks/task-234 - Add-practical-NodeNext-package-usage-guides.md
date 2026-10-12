---
id: TASK-234
title: Add practical NodeNext package usage guides
status: Done
assignee: []
created_date: '2026-10-12 00:31'
updated_date: '2026-10-12 01:36'
labels:
  - docs
  - typescript
  - nodenext
dependencies: []
documentation:
  - backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md
modified_files:
  - docs/guides/nodenext.md
  - docs/ru/guides/nodenext.md
  - tests/fixtures/docs/nodenext/consumer.mts
  - tests/fixtures/docs/nodenext/consumer.cts
  - tests/fixtures/docs/nodenext/tsconfig.json
  - tests/unit/docs/nodenext-guides.test.ts
  - tsconfig.json
priority: high
type: docs
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Give ESM and CommonJS TypeScript consumers a discoverable English and Russian guide that uses the package's supported exports and can be compiled offline as release evidence.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 English and Russian guides show strict NodeNext compiler configuration for .mts and .cts consumers
- [x] #2 Guides use only package root and supported package subpath imports
- [x] #3 Persistent offline fixtures compile with skipLibCheck false and make no WB API calls
- [x] #4 Both locale navigation surfaces expose the guide
- [x] #5 Targeted fixture compilation and documentation build pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect current package exports and packed-consumer validation.
2. Write equivalent practical English and Russian NodeNext guides.
3. Add persistent .mts and .cts guide fixtures and a deterministic offline compile check.
4. Expose the guides in locale navigation and run focused and documentation validation.
5. Record evidence and complete the task.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added discoverable English and Russian strict NodeNext guides for .mts and .cts consumers using only the package root and supported finances and reports subpaths. Added persistent offline consumer fixtures with skipLibCheck false and no SDK construction or WB calls. Added a byte-for-byte guide-to-fixture parity regression test, excluded the dedicated package-consumer project from the root Bundler type-check and ESLint scans, and kept its own strict compile gate. npm run validate:docs:nodenext passed after a 115-module package build; the production documentation build and complete offline test matrix also passed. Full evidence: backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md.
<!-- SECTION:NOTES:END -->
