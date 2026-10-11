# Independent review — WB API news secret-scan recovery

**Date:** 2026-10-11 (Europe/Moscow)

**Reviewer lane:** independent native `code-reviewer`, task `secret_scan_recovery_review`

**Verdict:** **REQUEST CHANGES**

**Findings:** `0 CRITICAL / 0 HIGH / 1 MEDIUM / 0 LOW`

## Outcome

The recovery cannot be accepted yet. The staged source candidate and all administrative records remain internally consistent, but the new gitleaks allowlist expression is not limited to the authorized exact literal. Because the expression is unanchored, gitleaks also suppresses a longer value when the documented placeholder is only its prefix or suffix. That violates `TASK-232` AC #1 and the explicit recovery boundary.

No source, build-input, test, public-contract, generated API, package-version, protected-config, or capability drift was found. No commit has been created. The earlier failed normal-hook attempt remains historical evidence; this review does not claim that a future commit will succeed.

## Reviewed identity

| Field | Fresh result |
|---|---|
| Baseline / current `HEAD` | `6e8d6269140e3ae0a5aa5cb12ac714f457af4263` |
| Package version | `4.6.0` |
| Previously accepted source tree | `2c5e186e065f9eb3242b438ccdcadffae5b2d7c6` |
| Previously accepted source patch SHA-256 | `e6d29b2b957ea07f850a7d06c19f79aef1cb7bcf5f051f8839c4088b92201354` |
| Current staged patch SHA-256 | `25938c3180a2a6cd92298a9c0f4fa0ac1d043a9340feccd80585e6cf7a156184` |
| Current staged tree | `439bbd0761c98870f9ef2bff7a298ec806bf775b` |
| Current staged paths | `231` |
| Protected foreign `backlog/config.yml` SHA-256 | `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9` |

The current staged identity was recomputed from the frozen index. The patch hash above uses the canonical `git diff --cached --binary` byte stream; the older hash from a different diff-command variant is not used. The tree was recomputed from a temporary copy of the index so the review did not mutate the repository index. The current tree, patch and 231-path count match the assigned freeze exactly.

The delta from the previously accepted tree contains 14 administrative/configuration paths: `.gitleaks.toml`, the accepted-review and recovery reports, the intake, four task closures, `TASK-232`, final-delivery/local-closeout records, and the three canonical BMAD derived records. It contains zero `src/`, build-input, test, public-contract, generated API, raw OpenAPI, or package-version changes.

## Finding

### [MEDIUM] The allowlist regex also suppresses longer values containing the placeholder

**File:** `.gitleaks.toml:115`

The added expression is `caller-provided-test-scope-token` without anchors around the complete `generic-api-key` match. Gitleaks applies the global allowlist regex to the finding value with substring matching. Fresh privacy-safe controls showed:

- the normal staged scan exits `0`;
- an unrelated synthetic API-key control exits `1` with exactly one `generic-api-key` finding;
- a longer synthetic value with the placeholder as a prefix exits `0` with zero findings;
- a longer synthetic value with the placeholder as a suffix exits `0` with zero findings.

The last two results prove the exception is broader than the authorized exact placeholder. Consequently, the checked statement in `backlog/tasks/task-232 - Recover-staged-secret-scan-for-exact-synthetic-Orders-DBS-placeholder.md:26` and the exact-only claims in `backlog/docs/wb-api-news-2026-10-secret-scan-recovery.md:13`, `:17`, and task Implementation Notes are not yet proven.

**Fix:** replace the new entry with an expression anchored to the complete observed `generic-api-key` match, without adding a path/category exemption or changing scanner rules. A temporary-config proof established that this exact candidate has the required behavior:

```toml
'''^apiKey: 'caller-provided-test-scope-token$''',
```

With that candidate, the staged scan exits `0`, the exact documented assignment is allowed, and prefix, suffix, and unrelated synthetic controls each exit `1` with exactly one `generic-api-key` finding. After applying the correction, update the recovery evidence and AC #1 to reflect those boundary controls, then obtain a fresh independent recovery review. Keep `TASK-232` In Progress and AC #6 unchecked until that review records `ACCEPT`.

## Stage 1 — spec and administrative compliance

- The previously accepted report still records `ACCEPT` with zero findings for the immutable 226-path source candidate.
- `TASK-215`–`TASK-222` and `TASK-224`–`TASK-231` are `Done`; their acceptance criteria are checked and Implementation Notes are present. `TASK-209`, `TASK-214`, and `TASK-223` remain `To Do`.
- `TASK-232` is `In Progress`; AC #2–#5 have supporting evidence, AC #6 remains unchecked, and AC #1 must be reopened or corrected because of the finding above.
- The intake preserves hidden sandbox schema and server-default uncertainty, eight failed `NetworkError` attempts, the raw/rendered full-OKPD2 locale conflict, and the absence of successful live or sandbox proof.
- Canonical SPEC/memlog/source-coverage still contain exactly `CAP-1`–`CAP-11`. The accepted and current capability blocks both hash to `0799cb05c13c0252aec16f2aa05a640c1af6a67a55a6161547df684f6a8fe7ee`.
- The final-delivery and local-closeout records truthfully preserve the failed first normal-hook attempt and state that no commit object or commit SHA exists. This review makes no claim about a future commit.
- The executor transcript ends with real `task_complete` at `2026-10-11T20:24:32.229Z`. Its bounded command outputs record staged gitleaks exit `0`, unrelated negative-control exit `1`, one `generic-api-key` finding, 93 unchanged build inputs, the protected config hash, the 11-capability hash, and the current staged identity. The original git-master second follow-up ends with `task_complete` at `2026-10-11T20:25:47.712Z`.

Stage 1 fails only on the exact-literal boundary, so the verdict is `REQUEST CHANGES` even though the remaining acceptance and administrative checks pass.

## Stage 2 — quality, security and preservation evidence

- Fresh `gitleaks git --pre-commit --staged --redact --config .gitleaks.toml`: exit `0`.
- Fresh unrelated non-secret negative control: exit `1`, exactly one `generic-api-key` finding. Raw finding content was not retained or reported.
- All 93 `[build-inputs]` entries were recomputed with Python `hashlib.sha256`: zero missing files, zero mismatches, aggregate `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367`.
- Protected foreign `backlog/config.yml` remains unstaged and hashes to `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- The immutable candidate-identity, hash, source-build, and command-status manifests have no staged or unstaged delta relative to the accepted tree.
- `.gitleaks.toml` parses successfully. Scanner rules and allowlisted paths are byte-semantically unchanged; exactly one regex was added and none removed.
- `TASK-232` YAML frontmatter parses successfully.
- The full cached whitespace check exits `2` only for the already documented hard breaks/final blank line in `backlog/docs/wb-api-news-2026-10-final-review.md` and hard breaks in `backlog/docs/wb-api-news-2026-10-gtin-fixture-fix.md`. The complete post-acceptance recovery/admin delta passes `git diff --cached --check` with exit `0`.
- Native `lsp_diagnostics` and `ast_grep_search` are unavailable in this reviewer environment. The reviewed delta contains TOML/Markdown only and no source code; TOML/YAML parsing, targeted added-line pattern searches, gitleaks controls, hash verification, and cached whitespace checks were used instead. No full test suite or build was rerun because source/build inputs are unchanged and the recovery contract permits only bounded scanner verification.
- No live/sandbox/network call, dependency installation, credential/env-value read, source/build edit, staging action, commit, push, publication, deployment, or version change was performed by this review.

## Recommendation

**REQUEST CHANGES.** Return the single bounded `.gitleaks.toml` correction and its task/recovery evidence update to the executor lane, then run a fresh independent recovery review against the new staged identity. Do not hand off to git-master until the exact-literal boundary controls pass and the reviewer records `ACCEPT`.
