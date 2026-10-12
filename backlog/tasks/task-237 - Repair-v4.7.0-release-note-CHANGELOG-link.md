---
id: TASK-237
title: Repair v4.7.0 release-note CHANGELOG link
status: Done
assignee: []
created_date: '2026-10-12 02:26'
updated_date: '2026-10-12 02:34'
labels: []
dependencies: []
documentation:
  - backlog/docs/wb-sdk-v4.7.0-ci-link-recovery.md
modified_files:
  - backlog/docs/wb-sdk-v4.7.0-release-notes.md
  - backlog/docs/wb-sdk-v4.7.0-ci-link-recovery.md
  - backlog/tasks/task-237 - Repair-v4.7.0-release-note-CHANGELOG-link.md
priority: high
type: bug
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Restore the release CI link gate by making the public CHANGELOG reference resolve before the gated v4.7.0 tag exists, while preserving the already pushed release candidate and publication boundary.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The release-notes CHANGELOG hyperlink resolves with HTTP 200 at immutable pushed revision f7fc0e2de8f35e107d68d0f149ae17631184d3fe, and that revision contains the same CHANGELOG blob as current HEAD.
- [x] #2 The release-notes document passes formatting and the full existing link validator, including its external HTTP checks.
- [x] #3 The recovery changes only the owned release notes, recovery task, and recovery evidence; API source, package metadata, generated documentation, validator policy, CI policy, frozen release identity, and protected backlog configuration remain unchanged.
- [x] #4 Recovery evidence records exact file and diff identities, verification commands and scope, protected configuration SHA-256, publication limitations, and confirms that no tag, publish, or deployment occurred.
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Confirm the failing tag-gated URL and prove current HEAD and the pinned pushed revision have identical CHANGELOG blobs.
2. Replace only the release-notes CHANGELOG target with the immutable pushed revision and add a bounded recovery receipt.
3. Run targeted HTTP, formatting, full link-validation, identity, scope, and protected-config checks.
4. Record exact evidence, self-review the owned diff, complete every scoped acceptance criterion, and mark the task Done only after all checks pass.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Replaced only the release-notes CHANGELOG hyperlink target, moving it from the CI-gated v4.7.0 tag to immutable pushed revision f7fc0e2de8f35e107d68d0f149ae17631184d3fe. Proved local HEAD, origin/main, current CHANGELOG, and the pinned revision identify the same source bytes.

Added a bounded recovery receipt with release-note file/blob/patch identities, frozen source/package/docs identities, direct old-404 and new-200 HTTP evidence, full link-validator scope and its existing immutable-blob exclusion, formatting and preservation results, protected config SHA-256, and the no-publish boundary. No validator ignore, CI policy, API/source, package metadata, generated docs, tag, publish, or deployment was changed.

Fresh checks: targeted pinned URL HTTP 200; Prettier passed all three owned Markdown files; full npm run validate:links passed 1,656/1,656 Markdown files with 192 reported links and 0 broken; protected-path diff and release-notes whitespace checks exited 0; protected backlog/config.yml remained bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Recovered the v4.7.0 release CI link by pinning the release-note CHANGELOG reference to the already pushed immutable candidate revision, with direct HTTP, full link-validation, formatting, identity, and scope-preservation evidence.
<!-- SECTION:FINAL_SUMMARY:END -->
