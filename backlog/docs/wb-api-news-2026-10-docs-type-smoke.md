# WB API news 2026-10 documentation public type smoke

Date: 2026-10-11 (Europe/Moscow)

## Result

**Test health: NEEDS ATTENTION.** The October Products and DBS documentation shapes compile under the repository's strict Bundler-resolution type surface, including the current built root declarations and the live source surface. A strict NodeNext package consumer does **not** compile because the generated root declarations use extensionless ESM-relative imports. This package-level declaration failure occurs before NodeNext can establish a clean pass for the documentation snippets.

No code example was executed. No WB endpoint, token, environment value, dotenv loader, network operation, dependency installation, build, publish, full test suite, or user-facing mutation was run. The `process.env.WB_TEST_TOKEN!` expression from the two DBS guide fences was retained inside an uninvoked compile-only function; `tsc --noEmit` parsed it and did not evaluate it.

## Owned artifacts

- `.tmp-docs-public-type-smoke.mts` — ESM package-root consumer smoke covering the actual news snippets, public option types, the three sandbox delivery values, optional sandbox fields, all four GTIN placements, and `RequestOptions.operationKey`.
- `.tmp-docs-public-type-smoke.cts` — CommonJS-form package-root consumer smoke for the same public module/type surface.
- `.tmp-docs-source-type-smoke.mts` — separately labelled direct-source type smoke; this does not substitute for package-root consumer proof.
- `.tmp-docs-public-okpd-ru-only-negative.mts` — one-behavior negative contract check proving that full OKPD2 rejects `locale: 'en'`.

No `any`, `ts-ignore`, `ts-expect-error`, SDK stub, or invented API was used in these artifacts. Undefined guide context was supplied only by importing the real public symbols and, for the Products fences, placing the exact fence bodies inside an uninvoked function with a real `WildberriesSDK` parameter.

Artifact SHA-256 at report time:

| Artifact | SHA-256 |
|---|---|
| `.tmp-docs-public-type-smoke.mts` | `5aa08eb5a56adf7170f04e50d3093d87293fa562ef504e23f9c2d1568b8f8e02` |
| `.tmp-docs-public-type-smoke.cts` | `81b09c7f23fdc60df3285955d6573988b9e4b94ee99011cb0236fc7791dde395` |
| `.tmp-docs-source-type-smoke.mts` | `22fa74224704808c951a968bd89a39b7e477cd5e1f08f2c9b2ead8df47da2c23` |
| `.tmp-docs-public-okpd-ru-only-negative.mts` | `62303a7b77351654ce7c7d28192a81be6e866d2f8e0696abdf2abbc85cff268c` |

## Markdown source coverage

The following line numbers and hashes describe the live working-tree content inspected for this report. Concurrent documentation edits occurred during the lane, so these hashes are the source freeze used for the final report rather than the earlier observation.

| Source | SHA-256 | Relevant TypeScript fence coverage | Result |
|---|---|---|---|
| `docs/modules/products.md` | `8aacbdda16f39f286e44c4d1d3455647ea53955722df3485ce8ab024f8de98d6` | lines 229-245: three directory calls; lines 495-504: `createCardsUpload()` GTIN | Exact bodies compile in the ESM smoke under strict Bundler resolution. |
| `docs/ru/guides/working-with-product-cards.md` | `0cf9c38f9060e1afaa36310c3fc1fc9d55cbdc02554d79119f1b6b3ddcf747c7` | lines 885-901: three directory calls; lines 923-932: `createCardsUpload()` GTIN | Exact bodies compile in the ESM smoke under strict Bundler resolution. |
| `docs/guides/orders-dbs-getting-started.md` | `b92fe227f2e4f02000e17ccbb66c7c3f8af097acff00833b15a5d275cd56b0d1` | lines 98-121: sandbox import, test-token placeholder, typed request, `dbsPickupPoint`, full address, `sandbox.ordersDBS.createTestOrders()` | Exact fence compiles under strict Bundler resolution. It is never executed. |
| `docs/ru/guides/orders-dbs-getting-started.md` | `2f606dfea5d5dc4177aaaae6f940409b413bb048ed966c4a796f924f618adfbe` | lines 98-121: same public sandbox fence in Russian guide | Exact fence compiles under strict Bundler resolution. It is never executed. |
| `docs/guides/working-with-product-cards.md` | `e0fb187230eed35975e55e45718044940ebb493adb42f588defcf4a93ce3cacd` | No October directory or additional-GTIN fence exists in the live English guide | No October fence could honestly be extracted from this file. Historical placeholder fences were left out of scope. |

The Products module and Russian guide explicitly name all four GTIN placements. The displayed fence exercises `createCardsUpload().variants[].gtin`. The smoke adds the other three named public placements without pretending they came from additional fences:

1. `createCardsUpdate()` item-level `gtin`.
2. `createUploadAdd().cardsToAdd[].gtin`.
3. `getCardsList()` response `cards[].gtin` as `string | undefined`.

## Public type assertions

The package-root ESM smoke checks the following public types from `daytona-wildberries-typescript-sdk`:

- `GetDirectoryTnvedAllOptions`: numeric `search`, locale `ru | en`.
- `GetDirectoryOkpdOptions`: required numeric `subjectId`, dotted-string `search`, locale `ru` only.
- `GetDirectoryOkpdAllOptions`: numeric `search`, locale `ru` only.
- `DbsTestDeliveryType`: exactly `dbs | dbsPickupPoint | edbs`.
- `CreateTestDbsOrdersRequest`: `deliveryType` and `address` are optional; the full documented address shape is accepted; omission of both is accepted.
- `RequestOptions.operationKey`: public and typed as `string | undefined`.

The positive smoke instantiates all three sandbox delivery values with synthetic data. The negative OKPD2 smoke produces exactly the expected consumer error:

```text
.tmp-docs-public-okpd-ru-only-negative.mts(6,3): error TS2322: Type '"en"' is not assignable to type '"ru"'.
```

The current built declarations independently expose these shapes at:

- `dist/esm/types/products.types.d.ts:853-883` for the directory locales and options.
- `dist/esm/types/orders-dbs.types.d.ts:28-60` for the three sandbox values, request, and address.
- `dist/esm/modules/products/index.d.ts:575,699,1055,1130` for the four GTIN placements.
- `dist/esm/config/sdk-config.d.ts:232-240` for `RequestOptions.operationKey`.
- `dist/esm/index.d.ts:556,574,580` for root public re-exports.

## Compile evidence

Local compiler: TypeScript `5.9.3`; package version: `4.6.0`. All commands used the already installed compiler via `npx --no-install`.

### Required strict NodeNext package-consumer checks

ESM command:

```text
npx --no-install tsc --noEmit --strict --module NodeNext --moduleResolution NodeNext --target ES2022 --types node --skipLibCheck false .tmp-docs-public-type-smoke.mts
```

Result: **exit 2**. The first package errors are `TS2834` at `dist/esm/index.d.ts:1-15`: ESM-relative declaration imports such as `./modules/general` lack explicit extensions. Root type re-exports then fail with `TS2307`, including `./types/orders-dbs.types` and `./types/products.types`. The type-level assertions in the consumer cannot resolve cleanly after those declaration failures. This is a package-root NodeNext failure, not evidence that the guide object literals themselves are wrong.

CommonJS-form command:

```text
npx --no-install tsc --noEmit --strict --module NodeNext --moduleResolution NodeNext --target ES2022 --types node --skipLibCheck false .tmp-docs-public-type-smoke.cts
```

Result: **exit 2** with the same `dist/esm/index.d.ts` TS2834/TS2307 declaration failures. The package maps both consumer forms to the same top-level `types` declaration entry, so the CJS runtime export does not provide an independent NodeNext-safe declaration graph.

Direct-source NodeNext command:

```text
npx --no-install tsc --noEmit --strict --module NodeNext --moduleResolution NodeNext --target ES2022 --types node --skipLibCheck false .tmp-docs-source-type-smoke.mts
```

Result: **exit 2** before snippet validation. `src/index.ts` has extensionless relative imports (`TS2834`/`TS2835`) and imports `package.json` without the NodeNext-required JSON import attribute (`TS1543`). This is recorded only as direct-source evidence and does not change the package-consumer result.

### Supplemental strict shape-isolation checks

Because NodeNext is blocked at the declaration/module graph, these checks use the repository-compatible Bundler resolver to isolate the actual news API shapes. They are supplemental and are not labelled NodeNext success.

```text
npx --no-install tsc --noEmit --strict --module ESNext --moduleResolution Bundler --target ES2022 --types node --skipLibCheck false .tmp-docs-public-type-smoke.mts
```

Result: **exit 0**, no diagnostics. This compiles the package-root ESM declarations and all covered news shapes.

```text
npx --no-install tsc --noEmit --strict --module Preserve --moduleResolution Bundler --target ES2022 --types node --skipLibCheck false .tmp-docs-public-type-smoke.cts
```

Result: **exit 0**, no diagnostics. This validates the CommonJS-form consumer source against the root public types under Bundler resolution; it does not execute or prove the CJS runtime.

```text
npx --no-install tsc --noEmit --strict --module ESNext --moduleResolution Bundler --target ES2022 --types node --skipLibCheck false .tmp-docs-source-type-smoke.mts
```

Result: **exit 0**, no diagnostics. This confirms the live source type surface supports the same directory, sandbox, GTIN, and `operationKey` shapes. It is not package-root proof.

```text
npx --no-install tsc --noEmit --strict --module ESNext --moduleResolution Bundler --target ES2022 --types node --skipLibCheck false .tmp-docs-public-okpd-ru-only-negative.mts
```

Result: **exit 2 as expected**, with only the `locale: 'en'` versus `'ru'` error quoted above.

## Built declaration identity

The observed `dist/` tree is ignored by Git and contained **190 files**, not the reported 193. `dist/esm/index.d.ts` had mtime `2026-10-11T21:27:43+0300` and SHA-256 `489ac46139d08434565cdd695783b2ed9d6855727e65297378d75805ed169c65`. The built declarations contain the current October directory, sandbox, GTIN, and `operationKey` additions, but there is no tracked build manifest tying this ignored tree to the live source hashes. Therefore:

- the package-root Bundler check proves the observed built declarations accept the smoke;
- the direct-source Bundler check proves the observed live source accepts the smoke;
- neither observation establishes that the ignored `dist` is a reproducible build of the exact live source state;
- no build was run in this lane because final build/full-suite ownership belongs to the final executor.

Relevant declaration/source SHA-256 values:

| Surface | SHA-256 |
|---|---|
| `dist/esm/index.d.ts` | `489ac46139d08434565cdd695783b2ed9d6855727e65297378d75805ed169c65` |
| `dist/esm/modules/products/index.d.ts` | `d6146aa24e5e4c194dc9ee236ba9740b87e283b7ee17966b8f1c143f5b16b425` |
| `dist/esm/modules/orders-dbs/index.d.ts` | `3ebf0b22b792e70ca12d115e096d06dc30cc4742d03635cc6a0c1858aef76aaf` |
| `dist/esm/types/products.types.d.ts` | `50d51e9ae3e4a0d6bd20ab4b95f159a4f7a09b13ef22ffc3083d12300997a0d8` |
| `dist/esm/types/orders-dbs.types.d.ts` | `bb1d11321533599205f6458565530897ffadfcc3a83418e52ce7c0b02a316435` |
| `src/index.ts` | `36a196b444106fda4e5a94ee0839a308bacd2f334ae3bd1c5c3968443e66e7c2` |
| `src/modules/products/index.ts` | `bbd1221bf68428fddb9feff90201930eacf3ed89c8fd2e14d6903ce9b050194f` |
| `src/modules/orders-dbs/index.ts` | `d72c63e1d01bbdf52ebe451411579746dc3645905e7576a24721880d33183b19` |
| `src/types/products.types.ts` | `a736b3bab3ad88ce3daf664f7db038c859b038d2eb6f38d03ec496a28b227226` |
| `src/types/orders-dbs.types.ts` | `05c26c40275b3d1e714ede57f8ff412323ae73e428cedca178bb3b56873a598d` |

## Existing documentation validator limitation

`scripts/validate-doc-examples.ts` is not a TypeScript compiler. It extracts `typescript` fences, introspects SDK method names, and applies regular expressions for method and `await` usage. Its SDK call pattern is exactly `/sdk\.(\w+)\.(\w+)\(/g`; the await pattern is also anchored to `sdk.`. Consequently, the actual DBS fence call `sandbox.ordersDBS.createTestOrders(request)` is outside those method/await checks. Its response-wrapper heuristic was removed, so a green result from that script cannot prove TypeScript assignability, imports, option objects, enum values, return properties, package declaration resolution, or the sandbox call.

This lane did not edit or run that validator.

## Required corrections and remaining gaps

1. **Package declaration correction required:** generate/publish a NodeNext-safe declaration graph. At minimum, ESM-relative imports/re-exports in `dist/esm/**/*.d.ts` need NodeNext-resolvable specifiers (normally explicit `.js` targets), and the package's types routing must remain usable from both ESM and CJS consumers. Re-run both strict NodeNext commands after the final build. Until then, do not claim strict NodeNext package-consumer compilation.
2. **English Products guide parity required:** `docs/guides/working-with-product-cards.md` currently has no October TN VED/OKPD2 or additional-GTIN section/fence, while its Russian counterpart does. Add English equivalents for the three directory calls, the raw-contract distinction that both OKPD2 locales are `ru` only, numeric full-OKPD `search` versus dotted string subject-OKPD `search`, and the four GTIN placements. This lane did not edit the executor-owned guide.
3. **GTIN fence coverage is partial by design:** the docs name four placements but their only displayed example exercises `createCardsUpload`. The supplemental smoke proves the other three public shapes, but readers do not receive runnable examples for them. If the intended acceptance criterion is example-level coverage of all four placements, add bounded snippets or one compact typed example covering update, upload-add, and response access.
4. **Build identity remains unproven:** regenerate `dist` in the final executor lane, record the resulting file count and package-root declaration hashes, and repeat the NodeNext checks. The current ignored tree has 190 files.
5. **Runtime semantics remain NOT RUN:** no sandbox creation, production call, account-history GTIN validation, server rejection of locale values, or environment/token behavior was tested. These are outside this type-smoke lane.

Stop condition reached: the owned snippets and public contract assertions were compiled as far as the package graph permits, the NodeNext blocker was reproduced in both consumer forms, the API shapes were isolated under strict Bundler resolution, the exact documentation gap was identified, and the source/report evidence was frozen without touching executor-owned files or running the global suite.

## Final integration follow-up

The final integration owner rebuilt the package from the current source, validated 193
packed files across 5 exports, and compiled strict packed `.mts` and `.cts` consumers
with the repository-supported `module: Preserve` / `moduleResolution: Bundler`
configuration. Those consumers cover the sandbox method/types, Products locale
aliases, nullable DBS `orders`, and Returns types; packed ESM import and CJS require
also passed. The NodeNext extensionless-declaration limitation reproduced above remains
a separate pre-existing package compatibility constraint and is not represented as
fixed.

The four changed Products/DBS EN/RU guides are now included in configured example
validation; the final validator passed 50 files and 378 code examples. The temporary
root-level compile fixtures listed above were removed after their evidence was captured;
the durable final commands and results are recorded in
`wb-api-news-2026-10-final-evidence/packed-consumers.log`. No example or API call was
executed against Wildberries.

## Final NodeNext correction — 2026-10-11

The immediately preceding integration follow-up is now superseded on the declaration issue.
It described a temporary Bundler-only package check before the supported declaration repair
was integrated. The historical failure reproduction and its original conclusions above remain
an accurate record of that earlier artifact; they are not the current package state.

The final integration now uses the supported `vite-plugin-dts` `beforeWriteFile` hook and a
TypeScript AST transform to emit explicit `.js` or `/index.js` relative targets. The persistent
package-root fixtures under `package-consumer-fixtures/` replace the removed root
`.tmp-docs-public-*` files. They cover all five public exports plus the October directory
methods and locale unions, all four GTIN positions, sandbox request/delivery types and
`RequestOptions.operationKey`, nullable DBS `orders` with optional non-null phone arrays, and
Returns request/response/export shapes. A separate negative fixture admits no `any`, ignore,
or suppression and is required to fail specifically because full OKPD2 rejects `locale: 'en'`.

After a fresh build, `npm run validate:package` compiled the `.mts` and `.cts` consumers with
`module: NodeNext`, `moduleResolution: NodeNext`, `strict: true`, and
`skipLibCheck: false`, observed the expected locale-negative diagnostic, and passed packed ESM
import plus CommonJS require for all five exports. It validated 193 packed files; the current
`dist` tree contains 190 files because the tarball adds the package-root README, LICENSE, and
package manifest. No SDK constructor, documentation snippet, or WB request was executed by the
type fixtures.
