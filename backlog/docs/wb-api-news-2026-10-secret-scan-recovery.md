# WB API news candidate — exact synthetic secret-scan recovery

**Date:** 2026-10-11 (Europe/Moscow)

**Task:** `TASK-232`

**Result:** corrected recovery independently accepted; `TASK-232` closed `Done`; ordinary hook-protected local commit is eligible

## Trigger and boundary

The first normal commit attempt reported a successful type-check followed by a `generic-api-key` gitleaks finding at `src/modules/orders-dbs/index.ts:108`. The matched value was the exact synthetic JSDoc request-scope placeholder `caller-provided-test-scope-token`; no credential value is retained in this report.

The first recovery used an unanchored literal allowlist expression. Its staged scan and unrelated synthetic control passed, but an independent reviewer correctly found that longer values containing the literal as a prefix or suffix were also suppressed. The reviewer recorded `REQUEST CHANGES` with one MEDIUM finding. That failed boundary is retained here as historical evidence rather than overwritten.

The corrected recovery changes no source or build input. It anchors the allowlist to the complete observed `generic-api-key` match, corrects four stale intake dispositions after the accepted composed review, and records both recovery attempts. It does not disable a rule, exempt a path or secret category, bypass a hook, read environment values, make a live or sandbox request, rerun the full suite/build, push, publish, deploy, or bump the version.

## Changes

- `.gitleaks.toml` adds the anchored expression `^apiKey: 'caller-provided-test-scope-token$` to the existing known documentation/example placeholder allowlist. The anchors cover the complete observed `generic-api-key` finding, so longer prefix and suffix values remain detectable.
- `backlog/docs/wb-api-news-intake-2026-10.md` updates four stale current-state references: the opening review-gated task disposition, the sandbox matrix row, the sandbox status paragraph, and integration step 4. `TASK-219`, `TASK-224`, `TASK-226`, and `TASK-231` are recorded as Done after the composed review accepted the final staged candidate.
- The intake continues to state that hidden sandbox schema flags and server-side defaulting are unproven, all eight attempted live tests failed with `NetworkError`, the raw/rendered full-OKPD2 locale conflict remains unresolved by runtime evidence, and no successful live or sandbox proof exists.

## Verification evidence

### Accepted candidate identity

- Baseline / HEAD: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`.
- Accepted source candidate tree: `2c5e186e065f9eb3242b438ccdcadffae5b2d7c6`.
- Accepted source candidate staged patch SHA-256: `e6d29b2b957ea07f850a7d06c19f79aef1cb7bcf5f051f8839c4088b92201354`.
- The accepted composed review records `ACCEPT` with zero CRITICAL, HIGH, MEDIUM, or LOW findings for that source candidate.

### Secret-scan behavior

- Historical first attempt: the unanchored expression allowed the documented value and retained detection of one unrelated value, but the reviewer independently proved that prefix and suffix variants both exited `0` with zero findings. This was insufficient and caused the `REQUEST CHANGES` verdict.
- Corrected exact control: the documented assignment exited `0` with zero findings.
- Corrected unrelated control: a different 32-plus-character synthetic `apiKey` exited `1` with exactly one `generic-api-key` finding.
- Corrected prefix control: a longer value beginning with the placeholder exited `1` with exactly one `generic-api-key` finding.
- Corrected suffix control: a longer value ending with the placeholder exited `1` with exactly one `generic-api-key` finding.
- All four corrected controls used temporary non-secret inputs and redacted reports. Only statuses, counts, and rule IDs were retained; the temporary inputs, reports, and command logs were deleted.
- Independent corrected review reran `gitleaks git --pre-commit --staged --redact --config .gitleaks.toml`; it exited `0` with zero findings after the corrected config, task, and evidence were staged.

### Candidate preservation

- Python `hashlib.sha256` checked all `93` entries under `[build-inputs]` in `backlog/docs/wb-api-news-2026-10-final-evidence/source-build-manifest.txt`: `0` missing files and `0` mismatches. The retained aggregate is `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367` before and after.
- Protected foreign `backlog/config.yml` remains SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9` and remains outside this recovery scope.
- The accepted and current canonical capability blocks each contain `11` IDs and have the same SHA-256 `0799cb05c13c0252aec16f2aa05a640c1af6a67a55a6161547df684f6a8fe7ee`.
- Fresh task reads confirmed `TASK-219`, `TASK-224`, `TASK-226`, and `TASK-231` are `Done`, matching the corrected intake.
- Scoped whitespace validation covers only `.gitleaks.toml`, the intake, this report, and `TASK-232`; historical unrelated whitespace remains outside this recovery.

## Independent acceptance and closure

The native `code-reviewer` lane `corrected_scanner_review` (`01a12cb9-08e1-70b1-854a-d834e2c17357`) completed at `2026-10-11T20:53:08.189Z` with **FINAL ACCEPT** and `0 CRITICAL / 0 HIGH / 0 MEDIUM / 0 LOW` findings. Its durable report is `backlog/docs/wb-api-news-2026-10-secret-scan-corrected-review.md`, SHA-256 `1604e48657e65347e7ed999058939e75bcda54387d9bd3dde653b292484c0580`. The report independently confirms corrected tree `582a91e34acb46d9ff6c7f7eb502ca7983f152cb`, exact and staged-scan success, retained detection for unrelated/prefix/suffix controls, unchanged 93 build inputs, unchanged 11-capability block, and protected foreign config preservation.

`TASK-232` has all six acceptance criteria checked and is closed `Done` through Backlog CLI. The historical first hook failure and first recovery `REQUEST CHANGES` report remain preserved. The corrected delivery is eligible for the one authorized ordinary hook-protected local commit. The authoritative identity of the committed record is the Git commit object containing it; no prospective commit SHA is embedded here.
