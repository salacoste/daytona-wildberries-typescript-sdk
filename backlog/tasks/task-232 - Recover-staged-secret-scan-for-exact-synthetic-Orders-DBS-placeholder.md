---
id: TASK-232
title: Recover staged secret scan for exact synthetic Orders DBS placeholder
status: Done
assignee: []
created_date: '2026-10-11 20:18'
updated_date: '2026-10-11 20:59'
labels: []
dependencies: []
documentation:
  - backlog/docs/wb-api-news-2026-10-secret-scan-recovery.md
modified_files:
  - .gitleaks.toml
  - backlog/docs/wb-api-news-intake-2026-10.md
  - backlog/docs/wb-api-news-2026-10-secret-scan-recovery.md
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->
Restore the normal staged secret-scan gate after it flagged one documented synthetic Orders DBS API-key placeholder, while preserving unrelated-secret detection, the accepted source candidate, protected configuration, and truthful intake runtime boundaries.
<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria
<!-- AC:BEGIN -->
- [x] #1 The exact complete generic-api-key finding for caller-provided-test-scope-token is allowlisted while synthetic prefix and suffix variants remain detected
- [x] #2 An unrelated synthetic generic API-key negative control is still detected by gitleaks
- [x] #3 The normal staged gitleaks scan passes with redaction using the repository config
- [x] #4 All accepted source and build-input hashes and protected foreign configuration remain unchanged
- [x] #5 The October intake records the accepted Done disposition while preserving sandbox hidden-schema and server-default uncertainty, the eight failed NetworkError attempts, the raw locale conflict, and the absence of successful live calls
- [x] #6 An independent recovery review records ACCEPT
<!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->
1. Confirm the exact gitleaks finding and the accepted candidate identity from persisted evidence.
2. Add one literal-only allowlist regex for the synthetic Orders DBS placeholder.
3. Correct the four stale intake dispositions while preserving all runtime and contract limits.
4. Run the redacted staged scan plus an unrelated synthetic negative-control scan.
5. Reverify all 93 source/build hashes, protected configuration, all 11 capabilities, scoped whitespace, and owned staged identity.
6. Record recovery evidence and task notes; leave the independent-review criterion unchecked pending a separate reviewer.

7. Address the independent reviewer finding by anchoring the allowlist to the complete observed generic-api-key finding, then prove exact-positive, unrelated, prefix, and suffix behavior before requesting fresh review.
<!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->
Added one literal-only regex for caller-provided-test-scope-token to the existing known-placeholder allowlist; no rule, path, category, or hook exemption was added. Corrected only the four stale review-state references in the October intake while retaining hidden-schema/server-default uncertainty, eight failed NetworkError attempts, the raw/rendered locale conflict, and no successful live/sandbox proof. A redacted staged gitleaks scan exited 0. A temporary unrelated synthetic generic-api-key control exited 1 with one generic-api-key finding, then all temporary artifacts were removed. Python/hashlib verified all 93 source/build inputs with zero mismatches; protected backlog/config.yml retained SHA-256 bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9; all 11 capability definitions retained SHA-256 0799cb05c13c0252aec16f2aa05a640c1af6a67a55a6161547df684f6a8fe7ee; scoped whitespace passed. The full test suite and build were intentionally not rerun because this recovery changes only scanner config and prose. Independent recovery review remains pending, so AC #6 is unchecked and the task remains In Progress.

Bounded reviewer correction: the first unanchored literal exception is retained as historical failed evidence because independent review proved it also suppressed longer prefix and suffix values and issued REQUEST CHANGES with one MEDIUM finding. Replaced only that entry with the reviewer-proven regex anchored to the complete observed generic-api-key finding; the generic rule, paths, categories, and hooks remain unchanged. Fresh redacted controls produced: exact assignment exit 0 with zero findings; unrelated, prefix, and suffix values each exit 1 with exactly one generic-api-key finding. The corrected normal staged scan exited 0. Reverification found 93 build-input entries with zero mismatches, protected backlog/config.yml at SHA-256 bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9, all 11 capability definitions unchanged at SHA-256 0799cb05c13c0252aec16f2aa05a640c1af6a67a55a6161547df684f6a8fe7ee, and scoped whitespace exit 0. Full tests/build remain intentionally not rerun. AC #6 and In Progress status remain pending a fresh independent recovery ACCEPT.

Independent corrected review FINAL ACCEPT: native code-reviewer task corrected_scanner_review (child 01a12cb9-08e1-70b1-854a-d834e2c17357) completed 2026-10-11T20:53:08.189Z. Durable report backlog/docs/wb-api-news-2026-10-secret-scan-corrected-review.md has SHA-256 1604e48657e65347e7ed999058939e75bcda54387d9bd3dde653b292484c0580 and zero CRITICAL, HIGH, MEDIUM, or LOW findings. The review independently confirmed the corrected staged tree 582a91e34acb46d9ff6c7f7eb502ca7983f152cb, normal staged gitleaks exit 0 with zero findings, exact control exit 0 with zero findings, and unrelated/prefix/suffix controls each exit 1 with exactly one generic-api-key finding. The historical first REQUEST CHANGES review remains unchanged. AC #6 is therefore satisfied; task closed Done through Backlog CLI.
<!-- SECTION:NOTES:END -->

## Final Summary

<!-- SECTION:FINAL_SUMMARY:BEGIN -->
Recovered the ordinary staged secret-scan gate with a complete-match anchored exception for the documented synthetic Orders DBS placeholder. Independent corrected review accepted the frozen candidate with all boundary controls passing; accepted source/build inputs and protected foreign configuration remained unchanged.
<!-- SECTION:FINAL_SUMMARY:END -->
