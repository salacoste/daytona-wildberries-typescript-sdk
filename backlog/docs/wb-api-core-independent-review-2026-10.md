# WB API core independent acceptance review — October 2026

**Review date:** 2026-10-11 (Europe/Moscow)

**Reviewer lane:** native `code-reviewer`; code/spec/security review only

**Current source baseline:** `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`

**Verdict:** **REQUEST CHANGES**

## Review outcome

The current implementation does not satisfy all acceptance criteria for CORE CAP-2, CAP-6, CAP-7, CAP-10, `task-215`, and `task-227`. The review found two HIGH, five MEDIUM, and two LOW issues. No CRITICAL issue was found.

The main blockers are:

1. the strict official-schema gates for Finance and DBS remain open, while several current docs/tests describe supplemental schema facts as official;
2. the new DBS response types have no supported public package import path;
3. Returns accepts a same-day range that the local contract rejects, resolves active/archive duplicates using an unjustified active-first policy, and drops the distinct `sku` value required by `task-215`;
4. the package validator accepts structurally invalid `files` arrays and can fail later with a raw `TypeError`;
5. required Returns boundary coverage and the Order Feed migration example need correction.

This review does not mark any task Done. CAP-2 and CAP-7 cannot pass their strict official-source criteria until the official property schemas are available even after the local code issues are fixed.

### Severity summary

| Severity | Count | Release effect |
| --- | ---: | --- |
| CRITICAL | 0 | — |
| HIGH | 2 | Must fix or keep the affected capability acceptance open |
| MEDIUM | 5 | Must fix for the named task acceptance |
| LOW | 2 | Correct before final task closure |
| **Total** | **9** | **REQUEST CHANGES** |

## Scope and concurrency boundary

This review covers only:

- CORE CAP-2 / `TASK-218` — Finance detailed-report buyer KPP and UPD/UKD fields;
- CORE CAP-6 / `TASK-222` — regional-sales deprecation and Order Feed migration;
- CORE CAP-7 / `TASK-224` — DBS additional phone fields;
- CORE CAP-10 / `task-215` — `ReturnsModule.getReturns()` migration;
- `TASK-227` — `npm pack --dry-run --json` manifest parsing.

The active integration executor owns source, tests, task files, indexes, and all unrelated dirty state. This reviewer changed only this report. The current filesystem implementation was reviewed independently because the worktree is concurrently changing. No source, test, task, index, package configuration, credential, or external system was modified.

The user required exactly one native child, so the architect lane described by the installed review workflow was not run. Architectural concerns are identified only where they affect the code/spec/security verdict; this report must not be read as an independent architecture approval.

## Provenance and evidence limits

### Historical handoff inputs

| Input | Verified identity | Use in this review |
| --- | --- | --- |
| `/tmp/wb-sdk-nonproducts-core-review-20261011.patch` | 2,545 lines; SHA-256 `4f17f066bd944cce5b122372de93d7f98e30cbdd58093af103121be80d062263` | Historical context only; current files were reviewed separately |
| `/tmp/wb-sdk-nonproducts-core-claims-20261011.md` | SHA-256 `3b328be572de5438fa1711ca337bb8fa497dd6e78d9c55b9e79c5276d6d560d7` | Prior implementer/reviewer claims and prior validation results |
| Git baseline / current `HEAD` | `6e8d6269140e3ae0a5aa5cb12ac714f457af4263` | Source identity at review time |

The previously reported mismatching handoff hash is **not certified**. Only the patch identity above was reproduced in this review.

### Evidence categories

| Evidence | Status | What it proves |
| --- | --- | --- |
| Current source, tests, tasks, local OpenAPI shards, and docs inspection | **Fresh** | Present implementation and acceptance mismatches cited below |
| Focused package-validator regression | **Fresh:** `6/6` passed | Existing supported/empty/malformed outer-format tests pass; it does not prove member-level structural validation |
| Direct parser probes | **Fresh** | Both outer formats accept `files: [null]`, `files: [{}]`, and `files: []`; `null` later causes a raw `TypeError` at `file.path` |
| YAML parse and Finance reference inspection | **Fresh** | The inspected Finance, DBS, and report YAML files parse; both local Finance operations reference the same local `SalesReportsDetailedRes` schema |
| `git diff --check` on the reviewed current subset | **Fresh** | No whitespace errors were found in that bounded subset |
| Focused `188/188`, lint, type-check, offline integration, build, docs, OpenAPI, package, and packed-consumer checks | **Historical only** | Reported in `/tmp/wb-sdk-nonproducts-core-claims-20261011.md`; not rerun by this reviewer |
| Live WB API calls | **NOT RUN** | No runtime/account claim is made |
| Current official property-schema retrieval | **NOT AVAILABLE** | Direct official pages returned HTTP 498; property-level official gates remain open |
| LSP diagnostics | **NOT AVAILABLE** | No LSP diagnostic tool was exposed to this child; no LSP-clean claim is made |
| Architect review lane | **NOT RUN** | Explicit one-child constraint; no architecture approval is claimed |

The prior `188/188` focused result is credible historical evidence but is not a fresh result from this review. The same restriction applies to prior lint, type-check, build, package, declaration-consumer, docs, and broader test claims.

## Stage 1 — acceptance compliance

### CORE CAP-2 / TASK-218 — Finance detailed-report fields

| AC | Status | Evidence and rationale |
| --- | --- | --- |
| #1 Official schema establishes exact names, optionality, nullability, and date format | **DEFERRED / OPEN** | `backlog/docs/wb-api-news-2026-10-official-confirmation.md:89-107` states that the required property-level official text was absent. The pinned third-party snapshot is supplemental evidence only. |
| #2 Shared public type exposes all three fields and the field selector includes them through `keyof` | **ACCEPTED against current source, subject to AC #1** | `src/types/finances.types.ts:377-384` exposes the three optional fields. Current tests exercise field selection. Optionality is internally coherent with selective `fields` projection, but cannot be called officially proven. |
| #3 Both local operations and declarations include the fields consistently | **ACCEPTED for local consistency; fresh declaration build not run** | `wildberries_api_doc/13-finances/finansovye-otchety.yaml:43-50` and `:97-105` both reference `_schemas.yaml#/SalesReportsDetailedRes`; `wildberries_api_doc/13-finances/_schemas.yaml:1-25` defines one shared schema. Prior build/declaration evidence is historical. |
| #4 Focused tests cover supported values while unrelated acquiring KPP remains unchanged | **CONDITIONALLY ACCEPTED** | `tests/unit/modules/finances.test.ts:620-647` covers populated values and `:800-822` covers selector/absence. The official nullability matrix remains unavailable. |
| #5 EN/RU docs and validation | **REJECTED** | `docs/modules/finances.md:247-255` and both migration guides at `:73-75` call supplemental required/non-null/date facts official. Prior validation is historical only. |

**Capability status:** **DEFERRED + REQUEST CHANGES.** The local implementation is internally consistent, but the strict official source gate is open and public wording overstates the evidence.

### CORE CAP-6 / TASK-222 — regional-sales deprecation

| AC | Status | Evidence and rationale |
| --- | --- | --- |
| #1 Official shutdown and recommended source | **DEFERRED / OPEN** | This child did not obtain fresh direct official proof of the 2026-11-03 shutdown. The implementation rests on the supplied announcement context and supplemental snapshot. Do not upgrade that to fresh official confirmation. |
| #2 Callable 4.x method, dated deprecation, warn-once, unchanged wire call | **ACCEPTED against current source** | `src/modules/reports/index.ts:397-430` retains the method and request, adds dated guidance, and warns once. `tests/unit/modules/reports.test.ts:334-355` covers the unchanged request and one warning across two calls. |
| #3 Migration guide covers pagination, snapshot, range, regional fields, aggregation | **CONDITIONALLY ACCEPTED** | EN/RU guides cover the behavior, but the example retains the entire dataset before aggregation at `docs/guides/region-sale-to-order-feed.md:40-72` and `docs/ru/guides/region-sale-to-order-feed.md:40-72`. |
| #4 No drop-in equivalence claim | **ACCEPTED** | The method deprecation text at `src/modules/reports/index.ts:402-405` and guide text at `docs/guides/region-sale-to-order-feed.md:76-80` state the semantic difference. |
| #5 Focused compatibility and validation | **CONDITIONALLY ACCEPTED** | The focused warn-once/request test is present. The broader validation results are historical, not fresh. |

**Capability status:** **CONDITIONAL / REQUEST CHANGES.** Preserve the deprecation implementation, fix the migration example memory behavior, and keep the official-source claim bounded.

### CORE CAP-7 / TASK-224 — DBS additional phones

| AC | Status | Evidence and rationale |
| --- | --- | --- |
| #1 Official type/optional/null/list schema | **DEFERRED / OPEN** | `backlog/docs/wb-api-news-2026-10-official-confirmation.md:109-122` confirms the operation/request only. The two response properties and empty-array semantics were absent from retrieved official schema text. |
| #2 Shared public type, local OpenAPI, exports, declarations | **REJECTED** | `src/types/orders-dbs.types.ts:131-147` and `:348-350` define the types, and `src/modules/orders-dbs/index.ts:216-225` uses them. But `src/index.ts:703-718` says orders-dbs lacks a public type path and exports only `MetaValidationDetail`; `package.json:21-47` has no `./orders-dbs` export. |
| #3 Presence, absence, null, list tests | **CONDITIONALLY ACCEPTED** | Synthetic tests exist, but comments at `tests/unit/modules/orders-dbs.test.ts:527-536` incorrectly call the non-null rule official. The exact official nullability contract remains open. |
| #4 Privacy-safe docs | **ACCEPTED** | `docs/modules/orders-dbs.md:56` instructs consumers not to log or persist customer contact payloads. Fixtures are synthetic. |
| #5 Validation and package declarations | **REJECTED for consumer accessibility** | Prior checks are historical, and a declaration build cannot make a type publicly importable without a supported export path. |

**Capability status:** **REQUEST CHANGES.** Add a supported public type import path and keep property-level schema claims supplemental until official evidence is retrieved.

### CORE CAP-10 / task-215 — Returns migration

| AC | Status | Evidence and rationale |
| --- | --- | --- |
| #1 Deprecated source removed; active and archive fetched | **ACCEPTED against current source** | `src/modules/returns/index.ts:222-243` calls `getAnalyticsV1GoodsReturn()` for `active` and `archive`; no deprecated call remains in `ReturnsModule`. |
| #2 Pagination to short/empty response | **CONDITIONALLY ACCEPTED** | The loop at `src/modules/returns/index.ts:227-242` handles short and null/undefined responses. The exact-full-page then empty-terminal boundary is not isolated by a focused regression. |
| #3 Sequenced through configured limiter | **ACCEPTED against current source** | Calls are awaited sequentially. The inherited claims report records the shared `reports.analyticsGoodsReturnV1` 1/min, burst-1 limiter; no bypass was found. |
| #4 Field/status mapping and stable model | **REJECTED** | `src/modules/returns/index.ts:86-106` maps status/reason/nmId but drops distinct `sku`; `backlog/tasks/task-215 - returns.getReturns()-migrate-FBO-source-from-deprecated-getAnalyticsGoodsReturn-to-getAnalyticsV1GoodsReturn-(deadline-2026-10-26).md:34` explicitly requires `sku` mapping. Active-first dedup can also preserve stale state. |
| #5 Focused boundary coverage | **REJECTED** | Current tests do not isolate active + populated `completedDt`, archive + missing `completedDt`, public `Брак товара` → `defect`, same-date rejection, active/archive duplicate precedence, or exactly-full then empty termination. |
| #6 Suppressions removed and validation green | **CONDITIONALLY ACCEPTED** | Task-specific suppressions were not found in the current Returns path. Broader lint/type/build/package evidence is historical only. |

**Capability status:** **REQUEST CHANGES.** Same-date validation, cross-status precedence, `sku` contract handling, and the named regression evidence remain open.

### TASK-227 — package manifest validator

| AC | Status | Evidence and rationale |
| --- | --- | --- |
| #1 Supports array and package-name-keyed outer forms | **ACCEPTED** | `scripts/validate-package-exports.mjs:35-45` recognizes both forms. |
| #2 Regression tests for both forms | **ACCEPTED** | `tests/unit/scripts/validate-package-exports.test.ts:14-22`; fresh focused run passed `6/6`. |
| #3 Empty, malformed, structurally invalid JSON fails actionably | **REJECTED** | `scripts/validate-package-exports.mjs:41-45` validates only that `files` is an array, then `:98-100` assumes every member has `path`. Fresh probes confirmed `files: [null]`, `[{}]`, and `[]` are accepted in both outer forms. |
| #4 Validation passes | **CONDITIONALLY ACCEPTED** | The parser regression passed fresh. Type-check/lint/build/package validation are inherited historical evidence only, and passing them does not cover the structural defect. |

**Task status:** **REQUEST CHANGES.** Passing current tests does not satisfy the structural-invalid-output criterion.

## Stage 2 — severity-rated findings

### [HIGH] Strict official-source gates remain open, but current text presents supplemental schema details as official

**Files:**

- `backlog/docs/wb-api-news-2026-10-official-confirmation.md:8-12`, `:89-107`, `:109-122`
- `docs/modules/finances.md:247-255`
- `docs/guides/migration-finance-reports-v5-to-v1.md:73-75`
- `docs/ru/guides/migration-finance-reports-v5-to-v1.md:73-75`
- `tests/unit/modules/orders-dbs.test.ts:527-536`
- `docs/modules/orders-dbs.md:56`

**Issue:** The bounded official-confirmation report explicitly says current property-level official schemas were not retrieved. Finance docs nevertheless say the official full-row schema makes all three fields required, and DBS tests say the official schema declares non-null arrays. The DBS module doc also states non-null/empty-array semantics without an evidence qualifier. `TASK-218` AC #1 and `TASK-224` AC #1 therefore remain open. `TASK-222` AC #1 is also deferred because this child did not freshly establish the shutdown date from a directly inspectable official source.

**Why it matters:** Acceptance criteria explicitly require official evidence. Labeling supplemental assumptions as official converts an evidence gap into a false contract guarantee and can drive the wrong runtime/type tests.

**Fix:** Describe requiredness, nullability, date format, and empty-array semantics as pinned supplemental assumptions. Keep `TASK-218` AC #1 and `TASK-224` AC #1 unchecked. Obtain either an accessible expanded official OpenAPI schema or an official WB-published versioned artifact with property, `required`, `nullable`, item type, and format before closure. For `TASK-222`, pin an attributable official shutdown/replacement source before closing AC #1.

### [HIGH] DBS response types are not importable through a supported public package path

**Files:**

- `src/types/orders-dbs.types.ts:131-147`, `:348-350`
- `src/modules/orders-dbs/index.ts:216-225`
- `src/index.ts:703-718`
- `package.json:21-47`
- `backlog/tasks/task-224 - Add-DBS-additional-client-phone-fields.md:28-32`

**Issue:** `DBSClientInfo` and `GetClientInfoResponse` exist internally and appear in the method signature, but the root exports only `MetaValidationDetail`, the source comment explicitly says orders-dbs has no public type access path, and the package has no `./orders-dbs` subpath export.

**Why it matters:** `TASK-224` requires shared public exports and generated declarations. Consumers cannot explicitly import the new types from a supported package path, so the public API acceptance criterion is not met.

**Fix:** Export the response types from a supported root surface or add an `./orders-dbs` subpath with runtime and declaration targets. Add a packed-tarball consumer smoke that imports the types from that public path and compiles against both the ESM and CommonJS declaration consumers.

### [MEDIUM] Returns accepts a same-day window rejected by the local contract

**Files:**

- `src/modules/returns/index.ts:41-65`
- `src/modules/reports/index.ts:615-626`
- `wildberries_api_doc/12-reports/_schemas.yaml:928-933`

**Issue:** `validateDateRange()` rejects only `diffDays < 0`, so equal dates pass. The method contract says `dateTo > dateFrom`, and the local `DateRanges` error says `dateTo should be greater dateFrom`.

**Why it matters:** The wrapper allows a request its own contract identifies as invalid, delaying a deterministic validation failure until a rate-limited external call.

**Fix:** Reject `diffDays <= 0` before any source call and update the message to require `dateTo` strictly after `dateFrom`. Add a same-date test asserting that no report or finance source is called.

### [MEDIUM] Active/archive duplicate precedence can preserve stale active state

**Files:**

- `src/modules/returns/index.ts:167-179`
- `src/modules/returns/index.ts:222-243`
- `src/modules/returns/index.ts:401-405`

**Issue:** The fetch order is active then archive, and deduplication keeps the first matching `srid`. A return can move to archive during the minute-separated requests; if it appears in both responses, the active record survives and the archive terminal state is dropped.

**Why it matters:** The resulting public status can be stale even though a later, more terminal representation was fetched successfully.

**Fix:** Define explicit cross-status precedence, normally archive/newer terminal state over active, while preserving the intended FBO/FBS rule. Add a same-`srid` active/archive regression that proves the selected status/date/reason.

### [MEDIUM] Package manifest member validation is incomplete

**Files:**

- `scripts/validate-package-exports.mjs:25-45`, `:98-105`
- `tests/unit/scripts/validate-package-exports.test.ts:8-29`
- `backlog/tasks/task-227 - Fix-package-export-validator-npm-pack-JSON-parsing.md:18-23`

**Issue:** The parser validates only that `files` is an array. It accepts an empty array, null members, object members without `path`, and empty/non-string paths. A null member later throws `TypeError: Cannot read properties of null (reading 'path')`; `{}` maps to `undefined` and can produce misleading missing-export output.

**Why it matters:** `TASK-227` AC #3 requires structurally invalid JSON to fail with an actionable validator error. A downstream raw exception masks which manifest entry is invalid.

**Fix:** Require a non-empty `files` array and require each member to be a non-null object with a non-empty string `path`. Report the outer form and member index in the error. Add tests for `null`, `{}`, missing/empty/non-string `path`, and empty `files` in both supported outer forms.

### [MEDIUM] task-215 requires `sku` mapping, but the stable public model drops it

**Files:**

- `backlog/tasks/task-215 - returns.getReturns()-migrate-FBO-source-from-deprecated-getAnalyticsGoodsReturn-to-getAnalyticsV1GoodsReturn-(deadline-2026-10-26).md:31-36`
- `src/modules/returns/index.ts:86-106`
- `src/types/returns.types.ts:42-62`

**Issue:** The new source exposes distinct `sku` and `nmId` values. The mapper copies `nmId` but not `sku`; the stable `ReturnItem` has no barcode/SKU field and describes `nmId` as “SKU.” This does not meet the explicit AC requiring `sku` to map into the stable public model.

**Why it matters:** A WB article ID (`nmId`) and barcode/SKU are not interchangeable. Silently dropping the new source field loses data and makes the public JSDoc misleading.

**Fix:** Expose and map a documented barcode/SKU field with a public regression, or revise the task acceptance criterion before implementation to explicitly document an intentional omission. Do not relabel `nmId` as the source `sku`.

### [MEDIUM] Order Feed migration example retains every row before aggregation

**Files:**

- `docs/guides/region-sale-to-order-feed.md:35-72`
- `docs/ru/guides/region-sale-to-order-feed.md:35-72`

**Issue:** The example appends every paged order to `all` and groups only after all pages are loaded. For a maximum 31-day range, memory grows with every order although the desired result is a small regional aggregate.

**Why it matters:** This is copyable migration code for a potentially large feed and can create avoidable memory pressure in production consumers.

**Fix:** Initialize the aggregation map before pagination and fold each page directly into it. Return the map values after termination. Also guard or document the behavior for a non-advancing full page so malformed pagination cannot loop indefinitely.

### [LOW] Returns boundary coverage does not prove the named transition and termination cases

**Files:**

- `tests/unit/modules/returns.test.ts:112-213`
- `src/modules/returns/index.ts:68-108`, `:222-243`
- `tests/unit/utils/classifyReturnReason.test.ts:19-20`

**Issue:** The main pagination test covers 1000 + 1 rows for each status, not exactly 1000 followed by the required empty terminal page. It also does not isolate active with populated `completedDt` → `initiated`, archive without `completedDt` → `received`, or the full `ReturnsModule` mapping of synthetic `returnReason: "Брак товара"` → public `returnReasonCode: "defect"`. The classifier-only test does not prove module wiring.

**Why it matters:** These are the boundaries most likely to regress during the source migration and were explicitly identified for acceptance auditing.

**Fix:** Add focused `ReturnsModule` regressions for all four cases, including call order and the empty terminal request before archive processing.

### [LOW] Returns public JSDoc still names the deprecated source and incorrect date provenance

**Files:**

- `src/types/returns.types.ts:30-36`, `:43-56`
- `src/modules/returns/index.ts:92-103`

**Issue:** The public model still says FBO records come from `getAnalyticsGoodsReturn()` and says `returnDate` comes from `completedDt`. The current mapper uses the v1 item-return source and falls back through `readyToReturnDt` and `orderDt`. It also labels `nmId` as SKU.

**Why it matters:** Generated public documentation gives consumers stale source/provenance information.

**Fix:** Name `getAnalyticsV1GoodsReturn()`, document the date fallback order, and describe `nmId` accurately. Coordinate the last change with the `sku` resolution above.

## Required candidate triage

| Candidate | Disposition | Priority | Rationale | Corrective evidence required |
| --- | --- | --- | --- | --- |
| Full-page pagination termination | **ACCEPTED as evidence gap** | P2 | Current test uses 1000 + 1; it does not prove that exactly 1000 triggers offset 1000 and an empty page stops before archive processing proceeds. | Focused test with active page sizes 1000 then 0, asserted offsets/order, then archive processing. |
| Active/archive duplicate precedence | **ACCEPTED as correctness risk** | P1 | Active is fetched first and first occurrence wins; this policy is unjustified and untested. | Same-`srid` active/archive regression plus documented precedence selecting the intended terminal/newer record. |
| Same-date validation | **ACCEPTED as defect** | P1 | Local contract requires strict `dateTo > dateFrom`; validator permits equality. | Same-date rejection test with zero source calls and corrected validator. |
| Finance OpenAPI consistency | **REJECTED as an internal consistency defect** | — | Both local operations reference the same schema. Required/non-null supplemental schema versus optional TypeScript is intentionally compatible with `fields` projection. | No consistency repair required. **Official provenance remains separately DEFERRED** until property-level official evidence is available. |
| Malformed manifest entries | **ACCEPTED as defect** | P1 | Fresh probes confirm null/object/empty entries are accepted and can surface raw or misleading failures. | Member-level validation and both-outer-format regressions for null, object/missing path, empty path, wrong path type, and empty files. |
| Migration-example memory | **ACCEPTED as documentation/code-example quality issue** | P2 | Both guides retain every Order Feed row before aggregation. | EN/RU examples aggregate per page and a docs example/compile check covers the revised code. |
| Active + populated `completedDt` → `initiated` | **ACCEPTED as test gap** | P1 | Source logic is correct, but no focused module assertion isolates the priority rule. | Focused public result assertion through `ReturnsModule`. |
| Archive + no `completedDt` → `received` | **ACCEPTED as test gap** | P1 | Source logic is correct, but no focused module assertion proves the fallback state. | Focused public result assertion through `ReturnsModule`. |
| Synthetic `Брак товара` → public `defect` | **ACCEPTED as integration coverage gap** | P1 | Classifier coverage exists, but module wiring is not asserted. | Synthetic `ReturnsModule` test asserting `returnReason` and `returnReasonCode`. |
| Null/object manifest files in both outer formats | **ACCEPTED as validator defect** | P1 | Parser accepts them; null later throws a raw `TypeError`, object maps to undefined. | Actionable index-specific parser errors for both outer forms. |

## Security, quality, and root-cause guard

- No hardcoded credential or secret was found in the reviewed changes or fixtures.
- DBS test values are synthetic, and `docs/modules/orders-dbs.md:56` contains appropriate no-log/no-persist privacy guidance.
- No live API, seller account, sandbox, publish, deployment, or credential operation was performed.
- No newly added fallback was accepted as a substitute for a controllable root-cause repair. In particular, passing package checks do not excuse the manifest parser defect, and supplemental schema evidence does not close an official-source gate.
- Null/undefined item-return responses are treated as the documented 204-equivalent empty result; this narrow behavior does not hide an error response in the reviewed code path.
- The Finance optional TypeScript fields are not treated as a defect: their optionality models selective `fields` projection. The unresolved issue is evidence provenance and wording, not local schema sharing.

## Validation record

Fresh bounded checks performed by this reviewer:

```text
npx vitest run tests/unit/scripts/validate-package-exports.test.ts --reporter=dot
Result: 1 test file, 6/6 tests passed
```

Direct `parseNpmPackManifest()` probes:

| Outer form | `files` value | Parser result | Downstream result |
| --- | --- | --- | --- |
| npm array | `[null]` | Accepted | Raw `TypeError` reading `path` |
| package-name keyed object | `[null]` | Accepted | Raw `TypeError` reading `path` |
| npm array | `[{}]` | Accepted | Produces `undefined` path |
| package-name keyed object | `[{}]` | Accepted | Produces `undefined` path |
| either | `[]` | Accepted | No structural error at parse boundary |

Fresh YAML parsing succeeded for:

- `wildberries_api_doc/13-finances.yaml`
- `wildberries_api_doc/13-finances/_schemas.yaml`
- `wildberries_api_doc/04-orders-dbs.yaml`
- `wildberries_api_doc/04-orders-dbs/_schemas.yaml`

Both detailed Finance operations in `wildberries_api_doc/13-finances/finansovye-otchety.yaml` reference `_schemas.yaml#/SalesReportsDetailedRes`. The local/pinned supplemental schema lists `buyerTaxRegistrationReasonCode`, `utdUcdNumber`, and `utdUcdDate` as required non-null strings, while the TypeScript properties are intentionally optional because a `fields` projection may omit them. This is internally coherent and is not official-property proof.

Historical evidence from the claims file, not rerun here:

- focused suite: `188/188` passed;
- lint and type-check passed;
- offline integration: 228 passed, 1 skipped;
- build and declaration emission passed;
- docs validation/build, links, and examples passed;
- OpenAPI shards: 60/60 passed;
- package validation and isolated ESM/CommonJS packed consumers passed;
- full test run reported 2,499 passed, 1 skipped, and one unrelated Products expectation failure;
- live-network integration checks failed with Network Error and are not runtime proof.

## Stop condition and handoff

The verdict remains **REQUEST CHANGES** until all P1 implementation/spec defects are corrected and the focused corrective evidence listed in the triage table passes. The CAP-7 public import path must be validated from a packed consumer. The P2 pagination and migration-example evidence should be completed before the corresponding tasks are closed.

CAP-2 / `TASK-218` AC #1 and CAP-7 / `TASK-224` AC #1 remain **DEFERRED** after local fixes until one of these is available:

1. an accessible current official WB OpenAPI page with the expanded response schema; or
2. an official WB-published, versioned OpenAPI artifact whose provenance, retrieval date, operation, property names, `required`, `nullable`, `type`, item type, and format can be pinned.

CAP-6 / `TASK-222` AC #1 likewise requires an attributable official shutdown/replacement source before closure. A notification excerpt, response sample, search index, crawler timestamp, or third-party snapshot is not a substitute for the required official evidence.

No task should be marked Done from this report alone. LSP diagnostics, live API behavior, and an architect-lane verdict remain unproven by explicit review constraints.
