# Independent corrected review — WB API news secret-scan recovery

**Date:** 2026-10-11 (Europe/Moscow)

**Reviewer lane:** independent native `code-reviewer`, task `corrected_scanner_review`

**Independent final verdict:** **FINAL ACCEPT**

**Findings:** `0 CRITICAL / 0 HIGH / 0 MEDIUM / 0 LOW`

## Outcome

The corrected scanner recovery satisfies `TASK-232` AC #1–#5 and resolves the single MEDIUM finding from the historical first review. The allowlist is now anchored to the complete observed `generic-api-key` match for the exact synthetic Orders DBS placeholder. Fresh redacted controls prove that the exact assignment is allowed while unrelated, prefix, and suffix variants remain detected. The normal staged gitleaks scan passes.

No source, build-input, test, package, generated API, raw OpenAPI, public-contract, package-version, protected-config, or capability drift was found. The historical first review at `backlog/docs/wb-api-news-2026-10-secret-scan-recovery-review.md` remains unchanged as a `REQUEST CHANGES` record with one MEDIUM finding; this report reviews the corrected frozen index and does not rewrite that history.

## Reviewed identity

| Field | Fresh result |
|---|---|
| Baseline / current `HEAD` | `6e8d6269140e3ae0a5aa5cb12ac714f457af4263` |
| Package version | `4.6.0` |
| Accepted source candidate tree | `2c5e186e065f9eb3242b438ccdcadffae5b2d7c6` |
| Rejected recovery tree | `439bbd0761c98870f9ef2bff7a298ec806bf775b` |
| Corrected frozen staged tree | `582a91e34acb46d9ff6c7f7eb502ca7983f152cb` |
| Corrected staged patch SHA-256 | `453553753d49a7e167c2c4259df945ddd32f2f9836fc57bfd6b6a255cf5028d2` |
| Corrected staged paths | `231` |
| Protected foreign `backlog/config.yml` SHA-256 | `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9` |

The baseline, tree, canonical `git diff --cached --binary` hash, staged path count, package version, and protected-config hash were recomputed from the current repository state. The corrected review report is an authorized evidence-only write and was not part of the frozen index identity above.

## Stage 1 — recovery contract compliance

The correction relative to rejected tree `439bbd0761c98870f9ef2bff7a298ec806bf775b` modifies exactly three paths:

1. `.gitleaks.toml` replaces the rejected unanchored literal with the complete-match anchored expression already recorded in the staged file.
2. `backlog/docs/wb-api-news-2026-10-secret-scan-recovery.md` preserves the failed first attempt and records the corrected boundary controls.
3. `backlog/tasks/task-232 - Recover-staged-secret-scan-for-exact-synthetic-Orders-DBS-placeholder.md` updates AC #1 and Implementation Notes for the reviewer-requested correction while leaving AC #6 unchecked and status `In Progress` pending administrative closure.

The generic scanner rule, allowlisted paths, secret categories, hooks, source code, and build inputs are unchanged by this correction. The change repairs the overbroad exception at its boundary and does not mask failures, suppress unrelated evidence, or add an alternate execution path. Root-cause/fallback guard: **PASS**.

`backlog task 232 --plain` successfully parsed the task and confirmed AC #1–#5 checked, AC #6 unchecked, the implementation plan and implementation notes present, and status `In Progress`. The task can be administratively closed only after this durable independent `FINAL ACCEPT` is staged by the downstream closure owner.

## Stage 2 — scanner and security evidence

Fresh independent checks used gitleaks `8.30.1`, the staged repository config, temporary non-secret controls, redacted reports, and no credential or environment-value reads:

| Check | Exit | Findings | Rule IDs | Result |
|---|---:|---:|---|---|
| Exact documented assignment | `0` | `0` | none | PASS |
| Unrelated 32-plus-character synthetic value | `1` | `1` | `generic-api-key` | PASS |
| Longer value with placeholder as prefix | `1` | `1` | `generic-api-key` | PASS |
| Longer value with placeholder as suffix | `1` | `1` | `generic-api-key` | PASS |
| Normal staged scan: `gitleaks git --pre-commit --staged --redact --config .gitleaks.toml` | `0` | `0` | none | PASS |

Only statuses, counts, and rule IDs were reported. Raw negative-control values, finding contents, reports, and scanner logs were not retained. All temporary control files and logs were removed, and cleanup was confirmed.

The successful staged scan also proves that `.gitleaks.toml` parses under the repository's actual scanner. No hardcoded real secret, credential, private key, token, or customer data was introduced by the correction.

## Preservation evidence

- All `93` entries in `backlog/docs/wb-api-news-2026-10-final-evidence/source-build-manifest.txt` were recomputed: `0` missing and `0` mismatches. Re-hashing the normalized manifest lines reproduced aggregate SHA-256 `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367`.
- Diffing accepted tree `2c5e186e065f9eb3242b438ccdcadffae5b2d7c6` against corrected tree `582a91e34acb46d9ff6c7f7eb502ca7983f152cb` under `src/`, `scripts/`, `tests/`, package manifests, Vite/Vitest build config, generated API docs, and raw OpenAPI produced no paths. The accepted source/build/test/package/raw API candidate is unchanged.
- The canonical capability block in accepted and corrected trees contains exactly `CAP-1` through `CAP-11`; both reproduce SHA-256 `0799cb05c13c0252aec16f2aa05a640c1af6a67a55a6161547df684f6a8fe7ee`.
- Foreign `backlog/config.yml` remains unstaged, untouched by this review, and hashes to `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- Correction-only whitespace validation between rejected and corrected trees exits `0`.
- Full cached whitespace validation exits `2` only for the already documented historical Markdown hard breaks and final blank line in `backlog/docs/wb-api-news-2026-10-final-review.md` and hard breaks in `backlog/docs/wb-api-news-2026-10-gtin-fixture-fix.md`. The scanner correction adds no whitespace defect.

## Validation scope and runtime limits

The exhaustive suites and build were not rerun because all 93 source/build inputs and the accepted source surfaces are byte-identical. The accepted frozen evidence remains applicable: 90 files with 2,580 passed and 1 skipped; mocked integration 13 files with 228 passed and 1 skipped; NodeNext helper 19/19; type-check, lint, configured format, and isolated docs build exit `0`; build 115 modules; actual tarball 193 files and five exports with strict `.mts`/`.cts` consumers and `skipLibCheck: false`.

Native `lsp_diagnostics` and `ast_grep_search` are unavailable in this reviewer environment. The bounded correction contains TOML and Markdown only, changes no TypeScript source, and was validated through the real staged scanner, four boundary controls, Backlog parsing, exact tree/diff checks, manifest hashing, capability hashing, and whitespace checks.

No network, live seller, or sandbox call was made. The evidence still records eight earlier read-only live attempts ending in `NetworkError` and zero successful seller or sandbox proof. Publication, deployment, version bump, dependency installation, commit, and push are outside this review and are not claimed.

## Recommendation

**FINAL ACCEPT.** The corrected frozen staged candidate has no CRITICAL, HIGH, MEDIUM, or LOW finding in the assigned scanner-recovery scope. The downstream administrative owner may use this report to satisfy `TASK-232` AC #6, complete the prescribed Backlog/BMAD closeout, stage the exact owned evidence paths, and attempt the ordinary hook-protected local commit without bypassing hooks.
