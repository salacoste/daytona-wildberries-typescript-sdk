---
id: TASK-233
title: Repair public documentation navigation and links
status: Done
assignee: []
created_date: '2026-10-12 00:31'
updated_date: '2026-10-12 01:35'
labels:
  - docs
  - navigation
dependencies: []
documentation:
  - backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md
modified_files:
  - docs/.vitepress/config.ts
  - docs/.vitepress/theme/index.ts
  - docs/.vitepress/theme/LocaleSwitch.vue
  - docs/.vitepress/theme/style.css
priority: high
type: docs
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Ensure English and Russian readers can reach all public SDK modules and related documentation without landing on private planning pages or stale generated-reference paths.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 English API navigation includes ReturnsModule and UserManagementModule
- [x] #2 Russian navigation includes ReturnsModule and UserManagementModule with a clear consistent shared-English label
- [x] #3 Known stale links in performance tuning Products and Russian troubleshooting resolve to public rendered routes
- [x] #4 Communications and glossary HTML-style links are retained or corrected based on actual rendered resolution
- [x] #5 Documentation build and rendered-route validation pass
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Inspect effective VitePress routes and generated API filenames.
2. Repair navigation labels and exact stale public links.
3. Run focused rendered-route validation and the documentation build.
4. Record verification evidence and complete the task.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Repaired public English and Russian navigation, stale public routes, and stale fragments in source Markdown and VitePress configuration. Added ReturnsModule and UserManagementModule to English navigation and clear shared-English labels to Russian navigation. Added counterpart-aware locale switching that falls back to a valid locale home and restored the existing custom.css theme import. Regenerated TypeDoc output from accepted HEAD 1fc8230122b571d1635d0133aaabce64876925c6. Production docs build rendered 1,005 pages; the effective validator passed 143,092 internal references and 14,004 fragments with zero internal failures. Full evidence: backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md.
<!-- SECTION:NOTES:END -->
