# Final command/status manifest

Date: 2026-10-11
Baseline HEAD: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`
Package version: `4.6.0`

Every pipeline below that writes through `tee` used `set -o pipefail`. Exit codes are the raw process results returned by the command runner, not an inferred status from log text.

| Command or gate | Exit | Observed result | Evidence |
|---|---:|---|---|
| `env -u WB_LIVE_API_TESTS npm test -- --reporter=dot` | 0 | 90 files; 2,580 passed; 1 skipped; 2,581 total | `full-test.log` |
| `env -u WB_LIVE_API_TESTS npm run test:integration -- --reporter=dot` | 0 | 13 mocked files; 228 passed; 1 skipped; 229 total | `mocked-integration.log` |
| `env -u WB_LIVE_API_TESTS npx vitest list --config vitest.integration.config.ts --filesOnly` | 0 | 13 mocked integration files; live file absent | `default-integration-list.log` |
| `WB_LIVE_API_TESTS=true npx vitest list --config vitest.integration.config.ts --filesOnly --staticParse` | 0 | only `tests/integration/api.test.ts`; static listing only | `live-static-list.log` |
| `npx vitest run tests/unit/scripts/node-next-declarations.test.ts tests/unit/scripts/validate-package-exports.test.ts --reporter=dot` | 0 | 2 files; 19/19 tests | `node-next-target-test.log` |
| `npm run type-check` | 0 | global TypeScript check clean | `type-check.log` |
| `npm run lint` | 0 | global ESLint check clean | `lint.log` |
| `npm run format:check` | 0 | configured TypeScript files formatted | `format-check.log` |
| targeted helper/config TypeScript, syntax, ESLint and Prettier diagnostics | 0 | strict diagnostics clean | `targeted-diagnostics.log` |
| `npm run build` | 0 | 115 Vite modules; ESM, CJS and declarations generated | `build.log` |
| source/build identity manifest | 0 | 93 inputs; before/after SHA-256 `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367`; identical | `source-build-manifest.txt` |
| `npm run validate:package` | 0 | all 5 exports; actual 193-file tarball; strict NodeNext `.mts`/`.cts`; expected locale-negative failure; runtime import/require | `package-validation.log`, `packed-consumers.log` |
| declaration AST scan | 0 | 81 files; 200 relative specifiers; 152 file targets; 48 `/index.js`; 0 unsafe | `declaration-scan.log` |
| `npm run docs:validate` | 0 | TypeDoc validation passed | `docs-validate.log` |
| English Products fixture compile and fence comparator | 0 | strict source Bundler compile; exact fence comparison 2/2 | `actual-snippet-compile.log` |
| `npm run validate:examples` | 0 | 50/50 files; 380 examples; static regex validator | `examples-validation.log` |
| `npm run validate:links` | 0 | 1,633/1,633 Markdown files; 192 links; 0 broken | `links-validation.log` |
| `npm run validate:shards` | 0 | 61/61 clean | `shards-validation.log` |
| isolated `vitepress build docs` over the final staged generated API set | 0 | API index/template hashes matched; full site rendered in 32.64s; temporary output deleted by exact scoped `find -delete` cleanup | `isolated-docs-build.log` |
| original 219-path unstaged and staged `git diff --check` | 0 | pre-correction worktree and candidate index were whitespace-clean | `git-diff-check.log` |

## Evidence boundaries

- Successful live WB seller calls: **NOT RUN / unproven**.
- Successful sandbox DBS order creation: **NOT RUN / unproven**.
- Runtime sandbox default, HTTP 204 and limiter enforcement: **unproven**.
- Runtime full-OKPD2 rejection of `locale: 'en'`: **unproven**; compile-time raw-contract typing is proven.
- Remote historical GTIN acceptance: **unproven**.
- The earlier eight live read-only attempts all ended in `NetworkError`; they are failed network attempts, not successful runtime proof.
- SDK or documentation snippets were not executed by packed consumers or the English fixture compile.
- Commit, push, publish, release, deploy and version bump: **not performed**.

Candidate staged patch SHA-256, byte size, staged path count, tree identity and per-path hashes are recorded only after exact-path staging. Self-referential hash metadata is excluded from its own hash set and documented separately.

## Administrative completeness correction

The original 219-path freeze had patch SHA-256 `4558edb0fb775a1003bf760dcd067607745361ac7c9a94b545f58c1152cfbf23` and tree `a66cc12c3ed9d967161530f4991fdf5b929fffd1`. A later staging-completeness audit found six delivery records omitted from that index: the NodeNext, GTIN fixture and Returns guide correction reports; `TASK-231`; the unchanged historical blocked review; and the September source-of-record linked from canonical SPEC/source coverage. All six were force-added by exact path. The staged candidate identity report is also now durable in the index.

This correction changed delivery/evidence metadata only. The 93-file build-input manifest remains SHA-256 `7925c8e30ad92753a35d62bc62697ea675005012258d36fc0e3a4560e1a77367`, so the suites, build and slow/network link validator were not rerun. Scoped existence, staged-blob hashing, whitespace and index-completeness checks were run after the correction. The scoped cached whitespace check for the five administrative files changed by the correction exited 0. The final full `git diff --cached --check` reports only the exact preserved GTIN report's original Markdown hard breaks and the historical review's original Markdown hard breaks/final blank line; those required evidence files were force-added without rewriting their bytes. The final full-index patch/tree values are intentionally computed after staging the self-referential identity reports and are reproducible with the commands recorded in `candidate-identity.txt`.
