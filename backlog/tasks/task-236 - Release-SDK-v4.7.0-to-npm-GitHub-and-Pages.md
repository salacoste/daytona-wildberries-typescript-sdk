---
id: TASK-236
title: Release SDK v4.7.0 to npm GitHub and Pages
status: Done
assignee: []
created_date: '2026-10-12 00:31'
updated_date: '2026-10-12 04:22'
labels:
  - release
  - npm
  - github
  - pages
dependencies: []
documentation:
  - backlog/docs/wb-sdk-v4.7.0-release-closeout.md
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
- [x] #2 Generated source references point to an immutable pushed revision whose source files match the final tag
- [x] #3 GitHub tag and release resolve to the validated exact candidate head
- [x] #4 npm latest and version tarball pass import require NodeNext integrity gitHead and provenance linkage checks
- [x] #5 GitHub Pages deploys the release revision and public guide and API routes pass rendered navigation and fragment checks
- [x] #6 Release evidence records CI publication identities protected config hash and runtime limitations without overstating live WB proof
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Prepare and independently review the accepted v4.7.0 candidate while preserving the bounded source-coverage and runtime-proof limits.
2. Commit and push the exact candidate, then publish the annotated GitHub tag and release, npm package with provenance, and GitHub Pages output.
3. Independently verify the public Git, GitHub Release, npm tarball, exports, NodeNext consumers, integrity, provenance, CI, security, Pages bytes, routes, navigation, and fragments.
4. Repair the two public documentation UX defects found after release, independently review the exact fix, deliver it, and verify the deployed Russian placeholders, locale behavior, and project-base favicon.
5. Reconcile immutable evidence, record the final identities and limitations in the release closeout, and close TASK-236 only after every acceptance criterion has evidence.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Release v4.7.0 completed and independently verified on 2026-10-12.

Delivery and evidence:
- The accepted SDK source tree 60fdf1df73311d8c4e5113e80e7e319ae9e5da2d is unchanged between the accepted source ancestor and release head 265292a0e17d35c82d821297c57856e4537b60cd. Generated source references use an immutable pushed revision whose src tree matches the final tag.
- Annotated tag object b62c3d6ee97c2d58db6934917b674199ea138791 peels to release head 265292a0e17d35c82d821297c57856e4537b60cd. The public GitHub Release is published and unchanged.
- npm latest is 4.7.0. Independent public-artifact verification proved the 193-file registry tarball, five exports, ESM and CommonJS loads, strict NodeNext .mts and .cts consumers, SHA-1/SHA-512 integrity, gitHead, npm signatures, and SLSA provenance linkage to the release workflow and commit.
- Initial exact-head CI 38197588069, Secret Scan 38197588038, npm publish 38198236993, and Pages 38198164020 passed.
- The documentation UX follow-up is public from main c58c1f230720db6470b2cba2a6b0e19d1f933777 and gh-pages 092f5446c50bda5cb77bd4d4fd23d312a2888af5. Exact-head CI 38201377429, Secret Scan 38201377406, Documentation Deploy 38201377475, and Pages 38201520683 passed, including Node 20, 22, 24 and deploy jobs. Fresh isolated public verification accepted the repaired Russian placeholders, locale navigation, explicit English API links, and project-base favicon.
- Release evidence records protected backlog/config.yml SHA-256 bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9 and the bounded runtime limitations.

The final closeout is recorded in backlog/docs/wb-sdk-v4.7.0-release-closeout.md. Historical preparation, blocked-attempt, review, publication, and verification records remain unchanged.

Scope and limits:
- Accepted coverage is evidence through 2026-09-24 inclusive plus the nine supplied October announcements, Returns pagination, NodeNext, and documentation behavior; it is not an exhaustive Wildberries-news audit through 2026-10-12.
- Current WB live API and sandbox calls were not run. Eight historical NetworkError reads remain failed attempts and are not live proof.
- Future-v5 TASK-209, TASK-214, TASK-223, and credential follow-up TASK-211 remain separate.
- No product files changed during closeout, so local dependency installation, repack, cryptographic verification, full tests, and documentation rebuild were not repeated; the accepted artifact-specific and exact-head workflow evidence remains the proof.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
DONE — SDK v4.7.0 is published to GitHub Releases and npm with verified integrity and provenance, Pages is deployed with the accepted documentation UX follow-up, all exact-head workflows and bounded independent public checks passed, and the release limitations are recorded in the closeout report.
<!-- SECTION:FINAL_SUMMARY:END -->
