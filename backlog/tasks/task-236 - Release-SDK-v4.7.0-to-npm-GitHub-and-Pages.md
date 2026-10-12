---
id: TASK-236
title: Release SDK v4.7.0 to npm GitHub and Pages
status: In Progress
assignee: []
created_date: '2026-10-12 00:31'
updated_date: '2026-10-12 00:40'
labels:
  - release
  - npm
  - github
  - pages
dependencies: []
priority: high
type: chore
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Publish the accepted October SDK and documentation work as version 4.7.0 with immutable source references and verified public artifacts.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 Version 4.7.0 metadata lockfile and release notes are internally consistent
- [ ] #2 Generated source references point to an immutable pushed revision whose source files match the final tag
- [ ] #3 GitHub tag and release resolve to the validated exact candidate head
- [ ] #4 npm latest and version tarball pass import require NodeNext integrity gitHead and provenance linkage checks
- [ ] #5 GitHub Pages deploys the release revision and public guide and API routes pass rendered navigation and fragment checks
- [ ] #6 Release evidence records CI publication identities protected config hash and runtime limitations without overstating live WB proof
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Verify that npm version 4.7.0 and GitHub tag/release v4.7.0 are vacant, and capture the accepted candidate identity and protected config hash.
2. Update only package/version lock metadata and the changelog/release notes for the accepted additive October SDK scope, preserving runtime-proof limitations.
3. Run offline-safe metadata, lockfile, build, and package validation without live WB or sandbox calls.
4. Record exact commands, results, source identities, limitations, and the owned-path manifest for review and later immutable-reference/publication steps.
5. Leave publication acceptance criteria open until source-reference regeneration, independent review, CI, npm, GitHub Release, and Pages verification are complete.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Release-metadata preparation completed by native executor leaf /root/release_metadata.

Approach and decisions:
- Verified npm 4.7.0, Git tag v4.7.0, and GitHub Release v4.7.0 were vacant before selecting the additive minor version.
- Updated only the package version field, the two lockfile root version fields, and promoted the accepted changelog section to 4.7.0 dated 2026-10-12; package scripts remained under the documentation-validator lane.
- Added durable GitHub Release notes and preparation evidence covering the nine supplied October changes, Returns pagination, NodeNext package compatibility, the 2026-09-24 inclusive bounded cutoff, eight failed NetworkError reads, and sandbox write NOT RUN.
- Left immutable source-reference regeneration, commits/push, CI, tag/Release, npm publication/provenance, Pages deployment, and public verification pending for later authorized leaf roles.

Modified paths:
- package.json
- package-lock.json
- CHANGELOG.md
- backlog/docs/wb-sdk-v4.7.0-release-notes.md
- backlog/docs/wb-sdk-v4.7.0-release-evidence.md
- backlog/tasks/task-236 - Release-SDK-v4.7.0-to-npm-GitHub-and-Pages.md

Fresh checks:
- version/lock consistency assertion: exit 0
- npm ci --ignore-scripts --dry-run: exit 0
- npm run build: exit 0, 115 modules
- npm run validate:package: exit 0, 5 exports / 193 packed files / strict NodeNext ESM+CJS consumers
- npm run type-check: exit 0
- npm pack --dry-run --json --ignore-scripts: exit 0, package identity 4.7.0 / 193 files
- Prettier and git diff whitespace checks: exit 0
- protected backlog/config.yml SHA-256 remained bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9

No live WB or sandbox SDK call, credential read, dotenv read, Git commit, push, tag, release, publish, or deployment occurred in this preparation lane.
<!-- SECTION:NOTES:END -->
