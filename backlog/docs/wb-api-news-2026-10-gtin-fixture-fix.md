# WB API October 2026 — GTIN fixture correction evidence

**Date:** 2026-10-11 (Europe/Moscow)  
**Authorization:** existing `TASK-221`; bounded test/documentation follow-up only  
**Disposition:** historical reviewer MEDIUM resolved  
**Source status:** `SOURCE_FROZEN`

## Finding and correction

The card-upload success fixture in
`tests/unit/modules/products-news-2026-10.test.ts` used the same synthetic value for
both `variants[].gtin` and the current `variants[].sizes[].skus[]` entry. That fixture
conflicted with the documented WB rule: the additional GTIN must have occurred
historically in `skus` of one of the seller's listings, while current SKU values remain
unique across listings and sizes.

The fixture now keeps the historical GTIN `04600000000018` in `variants[].gtin` and
uses the distinct current SKU `04600000000995` in `sizes[].skus[]`. The exact wire-call
assertion still compares the posted body to the complete `request` object. No test was
added or removed. A bounded scan found no other happy-path fixture in this test file
that reused the GTIN as a current SKU; the update and merged-card fixtures use empty
`sizes` arrays.

The SDK still performs no caller-history or account-wide GTIN validation. The WB rule
depends on remote seller history and remains server-enforced, as required by TASK-221
and the official raw-contract report.

## Modified paths

- `tests/unit/modules/products-news-2026-10.test.ts`
- `backlog/docs/wb-api-news-2026-10-gtin-fixture-fix.md`

No SDK source, task file, OpenAPI file, dependency, credential, environment value,
staging area, or commit was changed by this lane.

Before this lane, the test already existed as a staged added file at Git blob
`58af6ef04ced741f4ff6249ffb13597ae33fe6dd`; this lane added only the bounded
working-tree delta shown by `git diff -- tests/unit/modules/products-news-2026-10.test.ts`.
Its resulting scoped status is `AM`. The report is a new ignored path because
`.gitignore:14` ignores `backlog/`; it does not appear in ordinary `git status` unless
explicitly queried through ignore diagnostics.

## Verification

| Check | Result |
| --- | --- |
| `npx vitest run tests/unit/modules/products-news-2026-10.test.ts` | exit 0; 1 file passed; 13 tests passed; 0 failed; test count unchanged |
| `npm run type-check` | exit 0; `tsc --noEmit` passed |
| `npx eslint tests/unit/modules/products-news-2026-10.test.ts` | exit 0; no diagnostics |
| `npx prettier --check tests/unit/modules/products-news-2026-10.test.ts backlog/docs/wb-api-news-2026-10-gtin-fixture-fix.md` | exit 0; both scoped files matched Prettier style |
| `git diff --check -- tests/unit/modules/products-news-2026-10.test.ts` | exit 0; no whitespace errors |
| bounded `rg` scan for `skus: [gtin]` / equivalent in the test file | no matches after correction |

The targeted test completed in the initial command invocation; no running session ID
was returned. Builds and live/sandbox/production calls were outside scope and were not
run.

## Hashes and source freeze

SHA-256 values observed after the correction:

| Path/evidence | SHA-256 |
| --- | --- |
| `tests/unit/modules/products-news-2026-10.test.ts` before this lane's edit | `23bd1750c4e7e81802849d7e1f4624c3d61ef7eb297ad7adb3dd070c715812cb` |
| `tests/unit/modules/products-news-2026-10.test.ts` after this lane's edit | `777d54262fbb06f2668074f2be6a41862f8b7b1abd048469b43fa897a777b20d` |
| `src/types/products.types.ts` (read-only) | `a736b3bab3ad88ce3daf664f7db038c859b038d2eb6f38d03ec496a28b227226` |
| `src/modules/products/index.ts` (read-only) | `bbd1221bf68428fddb9feff90201930eacf3ed89c8fd2e14d6903ce9b050194f` |
| `backlog/docs/wb-api-news-2026-10-official-raw-contracts.md` (read-only) | `476688dc8737f2a984cd8b44c085a4a4f869f7bce3e20c5a64ee8868bd1bcf38` |
| `backlog/tasks/task-221 - Add-additional-GTIN-fields-to-product-card-contracts.md` (read-only) | `c5a3d0309612e6af57723c7e3a889642018ec6a384149e4cf9bcd8ccd531b99f` |

The official raw-contract report records WB public `02-items.yaml` SHA-256
`e2eef8712991355a44e5c28cdb96ad493a31775d18605f6b3263a3a84f0aa220` and states
that an additional GTIN must previously have occurred in `skus` of one seller listing,
with no local historical/reuse validation warranted. Source files were inspected but
not edited: `SOURCE_FROZEN`.

## Integration handoff

Integration should stage exactly the corrected test and this report. A future final
check is necessary only if either file, or the frozen GTIN source contract they rely on,
changes after the hashes recorded here. Because the report is under the ignored
`backlog/` tree, integration will need to force-add that exact report path while staging
the test normally.
