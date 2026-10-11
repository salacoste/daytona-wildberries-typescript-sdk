# Independent Verification Gap Review: Products and Analytics, October 2026

## Review identity

- Layer: BMAD `verification-gap`.
- Frozen review artifact: `/tmp/wbpa-review-snapshot-20261011-f8B7ee/products-analytics-review.diff`.
- Verified SHA-256: `c5c532df0c16a0db613965cf9d6eac2dcbe2bfdf01b0f793f456f2b3646b9cf8`.
- Verified changed-file count: 39 `diff --git` records.
- Baseline: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`.
- Claims input: `/tmp/wbpa-review-snapshot-20261011-f8B7ee/claims-verbatim.txt`.
- Contract inputs: `_bmad-output/specs/spec-wb-api-news-2026-10/SPEC.md` and `_bmad-output/specs/spec-wb-api-news-2026-10/source-coverage.md`.
- Scope: CAP-1, CAP-3, CAP-4, CAP-5 and CAP-8 plus their stated constraints. Outside-core and sandbox capabilities were not treated as missing implementation.
- Layer verdict: **REQUEST CHANGES**. All five supported gaps are **MEDIUM** severity: each can let a public TypeScript or OpenAPI contract regress without a normal verification failure, but none establishes a current production exploit, data loss path, or runtime outage.

## Verification-gap findings

### [MEDIUM] Public directory type exports can disappear without a normal verification failure

- **Changed surface:** the package root adds the ten directory type exports at `src/index.ts:765`, including `GetDirectoryTnvedAllOptions`, `GetDirectoryOkpdOptions`, `GetDirectoryOkpdAllOptions` and their response/entry/locale types through `src/index.ts:777`.
- **Impacted consumer or site:** TypeScript consumers importing the new public directory contracts from the package root represented by `src/index.ts:765`; this is the supported public entry point whose declaration is built and published.
- **Existing test evidence:** `tests/unit/modules/products-news-2026-10.test.ts:5` imports only six directory types directly from the internal `src/types/products.types` file, through line 12. The whole-repository symbol/import search found the locale and entry types only in `src/types/products.types.ts`, `src/modules/products/index.ts`, and `src/index.ts`, with no test import. Searches for all options/response type names found no test importing them from `src` or `src/index`. The only root-index assertion in `tests/unit/index.test.ts:2` imports `version`; its assertion at lines 5-8 does not observe any type export. `npm run build` and `npm run type-check` can both succeed when an otherwise valid type export is omitted unless a consumer imports that exact export.
- **Missing verification:** a checked-in TypeScript consumer compiled by the normal `npm run type-check` path that imports every new directory type from `../../src` (or `../../src/index`) and uses them in representative values.
- **Demonstration:** deleting `GetDirectoryOkpdResponse` or `TnvedDirectoryEntry` from the export block at `src/index.ts:765` leaves the internal imports and every assertion in `tests/unit/modules/products-news-2026-10.test.ts` intact. The existing build can still emit a valid declaration file that simply lacks the promised public name, so the checked verification would not fail even though package consumers can no longer import it.
- **Consequence:** a release can ship the three runtime methods while omitting one or more of their advertised public directory types from the package entry point.
- **Disposition:** `patch` — add a root-entry type-contract test, following the repository's existing TypeScript-under-`tests/` pattern, that imports all ten directory types from `../../src`; the normal CI type-check at `.github/workflows/main.yml:45` will then make an export deletion fail.

### [MEDIUM] The subject OKPD query's required and optional boundaries are covered only by an all-fields-present case

- **Changed surface:** `GetDirectoryOkpdOptions` requires `subjectId` while keeping `search` and `locale` optional at `src/types/products.types.ts:935`; `getDirectoryOkpd` exposes that interface at `src/modules/products/index.ts:460`.
- **Impacted consumer or site:** a TypeScript consumer calling `sdk.products.getDirectoryOkpd({ subjectId })` and relying on the official ability to omit both optional filters.
- **Existing test evidence:** the sole `GetDirectoryOkpdOptions` value in `tests/unit/modules/products-news-2026-10.test.ts:70` supplies `subjectId`, `search`, and `locale`; the request assertion at lines 78-84 repeats all three. Whole-repository searches for `GetDirectoryOkpdOptions` and `getDirectoryOkpd({` found no TypeScript test with only `subjectId`, no negative case omitting `subjectId`, and no negative locale-enum case. The two no-options checks at lines 118-130 exercise only `getDirectoryTnvedAll()` and `getDirectoryOkpdAll()` and therefore do not protect this contract.
- **Missing verification:** a compile-checked valid call with `{ subjectId: 105 }`, plus negative type cases proving `subjectId` remains required and OKPD locale does not widen beyond `'ru'`.
- **Demonstration:** changing `search?: string` or `locale?: 'ru'` to required properties would not break the all-fields-present fixture or its runtime assertion. Conversely, making `subjectId` optional or widening the locale would also leave that fixture green. Each regression changes the public request contract while all checked tests continue to pass.
- **Consequence:** the SDK can reject an officially valid minimal subject lookup at compile time, or silently widen the documented required/enum boundary, without the normal verification path detecting it.
- **Disposition:** `patch` — extend `tests/unit/modules/products-news-2026-10.test.ts` with a subject-only call/value and compile-time negative cases using the repository's established `@ts-expect-error` pattern.

### [MEDIUM] GTIN tests do not pin the non-null TypeScript boundary

- **Changed surface:** optional non-null `gtin?: string` is added to the cards-list response and the three write payload positions at `src/modules/products/index.ts:769`, `src/modules/products/index.ts:855`, `src/modules/products/index.ts:977`, `src/modules/products/index.ts:1395`, and `src/modules/products/index.ts:1462`.
- **Impacted consumer or site:** package consumers constructing create, update, and upload-add requests or reading `getCardsList()` results under CAP-5's exact optional/non-null contract.
- **Existing test evidence:** `tests/unit/modules/products-news-2026-10.test.ts:151`, `:169`, and `:184` cover string-valued GTINs at the three request locations; lines 200-220 cover a string-valued cards-list response and an absent field; lines 223-238 prove omission remains accepted. Searches for `gtin` plus `null` in the changed Products source/test surface found no negative compile-time assertion that rejects `null`. The repository already uses `@ts-expect-error` for non-null contract checks in other module tests, so this boundary is testable in the normal type-check path.
- **Missing verification:** compile-time assertions that `null` is rejected at each of the three request positions and in the declared cards-list item shape while omission remains valid.
- **Demonstration:** widening any changed annotation from `gtin?: string` to `gtin?: string | null` leaves every current positive and omission test green. A consumer could then compile a null-valued request that violates the pinned non-null contract and is passed through to WB unchanged.
- **Consequence:** the published TypeScript contract can begin accepting a server-invalid null GTIN without CI detecting the regression.
- **Disposition:** `patch` — add `@ts-expect-error` type-contract cases beside the existing GTIN placement/omission tests; keep them compile-only so the SDK continues to rely on WB for account-history validation rather than adding runtime validation.

### [MEDIUM] Directory OpenAPI semantics are not checked by any durable contract test

- **Changed surface:** the three directory operations are added to the root OpenAPI at `wildberries_api_doc/02-products.yaml:916`, `:989`, and `:1068`, to the category shard at `wildberries_api_doc/02-products/kategorii-predmety-i-kharakteristiki.yaml:887`, `:960`, and `:1039`, and to the raw reference copy at `docs/api-reference/raw-yaml/02-products.local-stopgap.yaml:916`, `:989`, and `:1068`.
- **Impacted consumer or site:** the repository generator that parses a supplied OpenAPI file at `tools/generate-sdk.ts:29` and derives types, methods, and rate limits at lines 38-45, plus local API-reference consumers of the root/shard/raw copies.
- **Existing test evidence:** the runtime tests at `tests/unit/modules/products-news-2026-10.test.ts:40` through `:145` assert hand-written URLs, query objects, response passthrough, and limiter values, but they never load a Products OpenAPI file. Exact-path and type-name searches across `tests/` and `scripts/` found no test that reads the three new Products paths. `scripts/validate_shards.cjs:50` checks only file existence, non-empty size, YAML parseability, and a positive manifest endpoint count through line 81; it does not count actual paths or compare path parameters/responses with the root/raw copies.
- **Missing verification:** parsed-OpenAPI assertions for all three copies covering each exact path, required `subjectId`, the three distinct `search` types, locale enums, response envelope/entry shapes, and the 100/minute metadata.
- **Demonstration:** changing `subjectId` from required to optional, changing the subject-specific `search` from string to number, or deleting one response field in only the root OpenAPI leaves the module unit tests unchanged and still produces syntactically valid YAML, so `validate_shards` remains green. A later generator/reference consumer then observes a contract that differs from the shipped hand-written SDK.
- **Consequence:** the Products runtime/types and one or more local OpenAPI copies can drift while all durable verification still passes.
- **Disposition:** `patch` — add a parsed structural contract test for the three directory paths across root, category shard, and raw reference copy, asserting semantic fields rather than source wording.

### [MEDIUM] GTIN OpenAPI placements are not checked by any durable contract test

- **Changed surface:** GTIN is added to four root OpenAPI schema locations at `wildberries_api_doc/02-products.yaml:1813`, `:2349`, `:3355`, and `:3606`, with corresponding shard placements at `wildberries_api_doc/02-products/kartochki-tovarov-part1.yaml:217`, `wildberries_api_doc/02-products/kartochki-tovarov-part2.yaml:225`, and `wildberries_api_doc/02-products/sozdanie-kartochek-tovarov.yaml:215` and `:466`, plus raw-copy placements at `docs/api-reference/raw-yaml/02-products.local-stopgap.yaml:1813`, `:2242`, `:3226`, and `:3461`.
- **Impacted consumer or site:** code/reference consumers of the Products OpenAPI root and shards, including the generator entry at `tools/generate-sdk.ts:29`, which must observe GTIN under `variants[]`, each update item, `cardsToAdd[]`, and cards-list response items with string/non-null/optional semantics.
- **Existing test evidence:** `tests/unit/modules/products-news-2026-10.test.ts:148` through `:238` verifies the four hand-written module type/call surfaces and optionality, but does not read any OpenAPI copy. Exact Products-path, `02-products.yaml`, and GTIN-placement searches across `tests/` and `scripts/` found no test that resolves these four schema locations. The shard validator at `scripts/validate_shards.cjs:50` accepts any parsable schema content and does not compare root, shard, or raw field placement.
- **Missing verification:** parsed structural assertions that each of the four operations exposes `gtin` at its exact nested location, as an optional non-null string, in root, relevant shard, and raw reference copies.
- **Demonstration:** moving the cards-upload `gtin` from `variants[]` to the outer item, marking cards-list `gtin` nullable, or dropping it from one shard still leaves valid YAML and does not affect the hand-written runtime tests. The local OpenAPI consumer then receives a materially different contract without a failing check.
- **Consequence:** generated/reference users can receive the wrong GTIN shape even while the SDK's runtime tests remain green.
- **Disposition:** `patch` — extend the same parsed Products OpenAPI contract test proposed for the directory methods with exact four-operation GTIN placement, optionality, type, and nullability assertions across all maintained copies.

## Reviewed surfaces without a filed gap

- CAP-1 and CAP-8 changes in this snapshot are documentation, JSDoc, and OpenAPI-description freshness statements only. They do not change return values, thrown errors, side effects, observable runtime state, or request limit configuration, so the Verification Gap prompt requires them to be screened out rather than protected with brittle source-wording tests.
- CAP-4 has no SDK CSV parser or public CSV row type to exercise. The changed deterministic OpenAPI/example surface is observed by `tests/unit/modules/analytics-csv-contract.test.ts`: it loads the root, schema-shard, and raw copies; checks all three synthetic variant headers; checks text-only removal and retained neighboring metrics; and checks the download field table in root, seller-CSV shard, and raw copies. The test is included by the default `tests/**/*.test.ts` Vitest pattern. No additional CAP-4 verification gap was grounded.
- CAP-3 runtime routing, query serialization, unfiltered full-directory calls, response passthrough, and rate-limit values are directly asserted in `tests/unit/modules/products-news-2026-10.test.ts:39` through `:145`.
- CAP-5 request placement, pass-through behavior, cards-list response exposure, and compatibility when GTIN is absent are directly asserted in `tests/unit/modules/products-news-2026-10.test.ts:148` through `:238`.
- The frozen snapshot's unchanged baseline completeness assertion for Products limiter key count would detect the three added keys; the separately described concurrent correction from 51 to 54 is outside this frozen diff and was not reviewed as part of this layer.

## Evidence boundaries and limitations

- No source file, test, fixture, task, index, configuration, dependency, Git state, or publication state was modified by this reviewer. This Markdown file is the only write.
- No tests, type-check, lint, build, shard validation, package validation, live WB call, credential read, or secret access was run. Test behavior above is based on reading the tests, scripts, CI configuration, source, and frozen diff as required by the layer and by the explicit no-execution boundary.
- Direct WB documentation remained unavailable in the supplied evidence because it returned HTTP 498. The pinned `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed` snapshot was treated only as supplemental non-official evidence, distinct from the official announcement and URLs.
- The CAP-5 rule was reviewed as allowing a GTIN previously present in `skus` of one of the seller's listings, without a same-card restriction and without client-side account-history validation.
- Concurrent final deltas identified by the coordinator (Products limiter-count update, `src/index` Returns JSDoc, FBS waybill OpenAPI, CPC JSDoc, and final metadata) are not present in the frozen diff and were not folded into this independent layer.
