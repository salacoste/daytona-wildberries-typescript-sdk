# WB API October 2026 — English Products guide parity

Date: 2026-10-11 (Europe/Moscow)

## Result

**SOURCE_FROZEN: YES.** The English product-card guide now matches the October Products
guidance already present in the Products module and Russian guide. It documents all three
classification-directory calls, the raw-contract locale and search-type boundaries, and all
four optional non-null GTIN placements. Both new TypeScript fences are retained byte for byte
in a persistent compile-only fixture with supplemental public-shape assertions.

No snippet or SDK method was executed. No token, environment variable, network request,
sandbox or production call, dependency install, build, package, publish, staging, commit, or
cleanup of the pre-existing root `.tmp-*` smoke artifacts occurred in this lane.

## Owned changes

- `docs/guides/working-with-product-cards.md`
  - Added table-of-contents entries and bounded English sections for the October directory and
    additional-GTIN contracts.
  - Preserved the existing pagination, filtering, troubleshooting, response, and documents
    material without broad rewriting.
- `tests/fixtures/docs/english-products-guide-parity.mts`
  - Stores the exact two new fence bodies inside an uninvoked function.
  - Adds type-level equality assertions proving all four `gtin` locations are exactly
    `string | undefined`, plus payload values proving the three write fields may be omitted.
- `backlog/docs/wb-api-news-2026-10-english-products-parity.md`
  - Records the frozen source identity, extraction coverage, compile command, results, and
    remaining evidence boundaries.

Existing tasks 219 and 221 authorize this documentation parity repair. No additional product
backlog task was created or modified.

## Source freeze

These hashes identify the working-tree evidence used for this lane. The official raw report
records the separately fetched WB `02-items.yaml` asset as SHA-256
`e2eef8712991355a44e5c28cdb96ad493a31775d18605f6b3263a3a84f0aa220`.

| Source | SHA-256 | Use |
|---|---|---|
| `backlog/docs/wb-api-news-2026-10-docs-type-smoke.md` | `ac30d3357667e9ad396b35abb038cdf71321ffe1e0056497a1eb5ddb084c7786` | Identified the English parity gap, prior compile boundary, validator limitation, observed `dist` identity, and later integration follow-up. |
| `backlog/docs/wb-api-news-2026-10-official-raw-contracts.md` | `476688dc8737f2a984cd8b44c085a4a4f869f7bce3e20c5a64ee8868bd1bcf38` | Controlling raw directory and GTIN property evidence, including the rendered/raw locale conflict. |
| `docs/modules/products.md` | `8aacbdda16f39f286e44c4d1d3455647ea53955722df3485ce8ab024f8de98d6` | Existing English method names, examples, rate limits, and GTIN rule wording. |
| `docs/ru/guides/working-with-product-cards.md` | `0cf9c38f9060e1afaa36310c3fc1fc9d55cbdc02554d79119f1b6b3ddcf747c7` | Russian guide sections used as the parity reference. |
| `src/types/products.types.ts` | `a736b3bab3ad88ce3daf664f7db038c859b038d2eb6f38d03ec496a28b227226` | Directory option types. |
| `src/modules/products/index.ts` | `bbd1221bf68428fddb9feff90201930eacf3ed89c8fd2e14d6903ce9b050194f` | Product method signatures and the four GTIN placements. |
| `backlog/tasks/task-219 - Add-TN-VED-and-OKPD2-directory-methods.md` | `5424c89a7b440b2c762f33d7a69165166886a6045c5aa685b16f18820b79b72a` | Existing task scope and final directory acceptance evidence. |
| `backlog/tasks/task-221 - Add-additional-GTIN-fields-to-product-card-contracts.md` | `c5a3d0309612e6af57723c7e3a889642018ec6a384149e4cf9bcd8ccd531b99f` | Existing task scope and final GTIN acceptance evidence. |
| `scripts/validate-doc-examples.ts` | `566fb2764e0bb264b3f0953bbee6157d9d20f0b47e22ca40992d0027ff5d361b` | Validator behavior and regex limitation. |
| `package.json` | `53de9fe8bd51c7e57c8a1912a07fb8908f89d6e20083e8fb042b22ba8e885917` | Compiler script context and package version. |

The English guide's pre-change SHA-256 was
`e0fb187230eed35975e55e45718044940ebb493adb42f588defcf4a93ce3cacd`, as
recorded by the source smoke. Its frozen post-change hash is
`3efe91d16c72e3daa3fc278a4d3f7626e7148f4c57545947e378f372dcf6cbfd`.
The fixture's frozen hash is
`3a84d4eb9a4bce4a8d7d8bfde064a458b15e274bdebf05a993cf7fc7d7003f1b`.

## Contract coverage

### Classification directories

The English guide now shows these three calls in one TypeScript fence:

1. `getDirectoryTnvedAll({ search: 6106, locale: 'en' })` — numeric search and the
   raw-supported `ru | en` locale boundary.
2. `getDirectoryOkpd({ subjectId: 105, search: '61.06', locale: 'ru' })` — required subject,
   dotted-string search, and raw `ru`-only locale.
3. `getDirectoryOkpdAll({ search: 61.06, locale: 'ru' })` — full-directory numeric search and
   raw `ru`-only locale.

The prose preserves the official-source conflict: the dated raw Swagger allows only `ru` for
full OKPD2, while the same-day rendered portal showed `ru` and `en`. The guide states the SDK's
raw-contract choice without claiming that WB runtime rejects `en`; no live call was made.

### Additional GTIN

The guide identifies and compiles all four optional, non-null string placements:

| Operation | Exact placement |
|---|---|
| `createCardsUpload()` | `variants[].gtin` |
| `createCardsUpdate()` | each update item's `gtin` |
| `createUploadAdd()` | `cardsToAdd[].gtin` |
| `getCardsList()` | response `cards[].gtin` when populated |

The example uses one `historicalGtin` that is absent from every current `skus` array. Each
current `skus` array contains a distinct value. This illustrates both official conditions:
the additional GTIN must have appeared historically in `skus` of one of the seller's listings,
and current SKU values must not be duplicated across listings or sizes. The guide also states
that WB enforces the remote-history rule, the SDK does not validate it locally, and the pinned
contract limits the feature to Russian sellers.

## Exact fence extraction

The new guide fences and fixture coverage are:

| Guide context | Guide lines | Fence SHA-256 | Fixture lines |
|---|---:|---|---:|
| `## TN VED and OKPD2 Directories` | 885-901 | `f7749515a9cd3c328d9b878c3d2d9b80ce57926d630a2d936ca4a40b0670eabc` | 12-26 |
| `## Additional GTIN` | 926-958 | `f96da924b2adcbad3f4d8da9bed4ed16ece93d4c01735f90ab64f3acd4e4e1f4` | 29-59 |

A read-only Node comparator extracted both bodies from the Markdown headings, removed only the
fixture function's two-space indentation, and compared the resulting strings. Command context:
repository root, Node's built-in `fs`, no SDK import or execution. Result:

```text
exact-fence-match: 2/2
```

This exact-match gate means the bodies compiled below are the displayed guide bodies, not
manually simplified substitutes. The fixture adds only the surrounding uninvoked function,
real `WildberriesSDK` source import, `void` uses, and supplemental type assertions.

## Compile-only verification

Installed compiler: TypeScript `5.9.3`. Exact command from the repository root:

```text
npx --no-install tsc --noEmit --strict --module ESNext --moduleResolution Bundler --target ES2022 --types node --skipLibCheck false tests/fixtures/docs/english-products-guide-parity.mts
```

Result: **exit 0**, no TypeScript diagnostics. `npx --no-install` used the installed compiler
and installed dependencies; it did not install anything. Bundler resolution compiled the live
source surface imported by the fixture. This is source-surface compile evidence, not package
build, packed-consumer, runtime, or network evidence.

The supplemental assertions cover exact equality to `string | undefined` at create, update,
add, and list locations, so `null` is not admitted under `strictNullChecks`. Separate typed
values omit `gtin` from all three write payloads and construct a list card without it, proving
the optional boundary without `any`, `ts-ignore`, `ts-expect-error`, or an SDK stub.

Additional scoped checks:

| Command | Result |
|---|---|
| `npx --no-install eslint tests/fixtures/docs/english-products-guide-parity.mts` | exit 0; no diagnostics |
| `npx --no-install prettier --check docs/guides/working-with-product-cards.md tests/fixtures/docs/english-products-guide-parity.mts backlog/docs/wb-api-news-2026-10-english-products-parity.md` | exit 0; all three files use Prettier style |
| `git diff --check -- docs/guides/working-with-product-cards.md` | exit 0; no whitespace errors in the tracked guide diff |

## `validate:examples` limitation

`npm run validate:examples` was **NOT RUN** because this lane was explicitly compile-only and
the script constructs a `WildberriesSDK` instance while loading. More importantly, it is not a
TypeScript compiler. It extracts `typescript` fences, discovers method names from a constructed
SDK instance, and uses regexes such as `/sdk\.(\w+)\.(\w+)\(/g` plus an `sdk.`-anchored await
check. It cannot prove argument assignability, locale unions, number-versus-string search,
optional/non-null fields, imports, declaration resolution, or response-property types. Its
green result would therefore not replace the strict `tsc` evidence above.

## `dist` count versus historical packed count

The original smoke report observed an ignored local `dist/` tree containing **190 filesystem
files**, with `dist/esm/index.d.ts` SHA-256
`489ac46139d08434565cdd695783b2ed9d6855727e65297378d75805ed169c65`. A fresh read-only count
in this lane also returned 190; no build changed that tree.

The **193 packed files** recorded in task 219, task 221, task 226, and the sandbox implementation
report are historical `npm run validate:package` results after a different final integration
build. A packed-package inventory can include package-root files outside `dist`, so 193 packed
files is not the expected count of `find dist -type f`. The historical 193 result does not prove
the identity or reproducibility of the currently ignored 190-file `dist` tree, and this lane
does not relabel either count as fresh package/build evidence.

## Evidence boundary and stop condition

- Proven: the English guide has the requested parity content; its two new fence bodies exactly
  match the persistent fixture; the live source types compile them and the supplemental shape
  assertions under strict Bundler resolution with `skipLibCheck: false`.
- Not run: snippets, SDK construction, `validate:examples`, package build, package validation,
  tests, live/sandbox/production API calls, environment/token access, staging, or commit.
- Not proven: WB runtime locale rejection, account-history GTIN acceptance, published package
  contents, or reproducibility of the ignored `dist` tree.

Stop condition reached: the bounded English parity gap is implemented, source-frozen, and
compile-verified without touching integration-owned files or executing any SDK/network path.

## Final integration follow-up — 2026-10-11

The composed integration changed only the four type-assertion aliases in the persistent
fixture from unexported `_...` names to exported names so the repository-wide
`noUnusedLocals` check can compile the fixture. The guide fence bodies did not change.

- Current fixture SHA-256:
  `c3b55362db9e8478cc9f3c62a852aa17c4b927383472fd0a3de2223dc72404f6`.
- Strict source Bundler compile with `skipLibCheck: false`: exit 0.
- Fresh heading-based comparator: both displayed fences still match the fixture exactly,
  `2/2`; their hashes remain
  `f7749515a9cd3c328d9b878c3d2d9b80ce57926d630a2d936ca4a40b0670eabc` and
  `f96da924b2adcbad3f4d8da9bed4ed16ece93d4c01735f90ab64f3acd4e4e1f4`.
- The earlier fixture hash above remains the historical source-freeze identity for the
  documentation lane; this follow-up is the current integrated identity.

The fixture was compiled only. Neither displayed snippet nor any SDK/API operation was
executed.
