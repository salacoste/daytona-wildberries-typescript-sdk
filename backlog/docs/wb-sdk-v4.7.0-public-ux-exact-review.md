# WB SDK v4.7.0 public UX exact candidate review

Reviewed at `2026-10-12T03:41:26Z` (`2026-10-12 06:41:26 MSK`).

## Verdict

**ACCEPT — exact local candidate accepted for the code/spec/security lane.**

No CRITICAL, HIGH, MEDIUM, or LOW finding was found in the 23-path candidate. The candidate directly repairs the two public documentation defects recorded by the independent public verifier: all 16 Russian API placeholders now render a clear Russian notice and an explicit English reference link without redirect code, and the VitePress site now emits a local SVG favicon under the configured Pages base. The rendered validator, declaration surface, and focused tests enforce both behaviors.

This is a local-candidate verdict only. It does not prove delivery or public closure. The post-release documentation fix still requires its own commit/push, Pages deployment, and fresh isolated public verification before the published site can be described as repaired. No npm republish is implied: `daytona-wildberries-typescript-sdk@4.7.0` and npm `latest` are already published from release head `265292a0e17d35c82d821297c57856e4537b60cd`.

## Exact candidate identity

- Baseline local `HEAD`, local `main`, and release commit: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Annotated `v4.7.0` tag object: `b62c3d6ee97c2d58db6934917b674199ea138791`.
- Peeled tag target: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Candidate paths: `23` (`20` tracked product/guard paths, one new favicon, `TASK-238`, and the immutable implementation report).
- Read-only candidate tree reconstructed through an isolated temporary index: `0f8c904af4384bdbcf423a7f170182f3a660cbe6`.
- Canonical full-index binary owned diff SHA-256 relative to baseline `HEAD`: `f87b9a8512fe69019205306a093cb30a2cf76c5ccab2cca0937c0cc8e4eaaeef`.

The canonical patch identity was computed without touching the real index:

```sh
LC_ALL=C git diff --cached --binary --full-index --no-ext-diff --no-textconv 265292a0e17d35c82d821297c57856e4537b60cd -- | shasum -a 256
```

The isolated index was initialized from the baseline commit and populated with exactly the 23 paths below. The same tree and patch hash were reproduced before and after focused review checks.

## Complete candidate manifest

| Status | Mode | Path | Git blob | SHA-256 |
| --- | --- | --- | --- | --- |
| `M` | `100644` | `docs/.vitepress/config.ts` | `1ca29ee1092a6c4f9f16c5577e3decfaa9568363` | `12468b6a86ea92f8cf1fe52a88051e9c47cd08782c4fb9c838683ddab68cf8cc` |
| `M` | `100644` | `docs/ru/api/classes/AnalyticsModule.md` | `017fd3bb9a86fd51dc3d097f8996858484ae7108` | `64e484c0a788f46ad686726f2acbbcd9b9820d7abff2abac422d42c7d351f610` |
| `M` | `100644` | `docs/ru/api/classes/BaseClient.md` | `dca7d325a9b8b42be0aa7066227e2e3b8ba8e088` | `8701bca7dbe310626a2311cc333b029a4282187d786588acc56b969d39fe689a` |
| `M` | `100644` | `docs/ru/api/classes/CommunicationsModule.md` | `2a19a8a879d9b6aab7b0782323fea78a1262daf0` | `e855d51b62c50c367d817f83af0b0d6c6e4c4c11eaaed70f5e78c6d5a568af3e` |
| `M` | `100644` | `docs/ru/api/classes/FinancesModule.md` | `48a3cb0d3700626af83caac3749e84a9e855da98` | `e71c22825662a800ca777546eacb62545d368b4a6a395cedfb5b55eb0c60189f` |
| `M` | `100644` | `docs/ru/api/classes/GeneralModule.md` | `73b3998d52f978d023e32226b17b280c8a53a681` | `7cc8af8f7878f5e1f4e92641234f8ebb1513766ae0c9ed5ace16b7cdd4b9b3d1` |
| `M` | `100644` | `docs/ru/api/classes/InStorePickupModule.md` | `469d7bb6ccfb3b9d85f02e266d3ce28a0b372a42` | `872c1764efff7156d5cca5e362a88df1fbc835e6ba0ca125e917bb9367c9af41` |
| `M` | `100644` | `docs/ru/api/classes/OrdersDbsModule.md` | `5cf1defd03c6273750f1584afdfbab33792bd6f5` | `4e6fae91bbf78dfdc2d959fd6b5ae91e22be7a64c3c431c7d0cebd3aa3de43e3` |
| `M` | `100644` | `docs/ru/api/classes/OrdersFbsModule.md` | `57166e8285ae74b874418945f2dab52ee458ffaf` | `31a54c450f3c7a7d6136fb26f9d1b1efdad04fd3f019b48b059c155f15b15c9e` |
| `M` | `100644` | `docs/ru/api/classes/OrdersFbwModule.md` | `3cc094904d92cf0cdd2ddda4fc1152d83807479b` | `bbeff60df80770f15a2d091e6ca84fc0de3efeb033b57bba9031a2569be602f6` |
| `M` | `100644` | `docs/ru/api/classes/ProductsModule.md` | `8ea52f34d6592e7b7ae7715bf432c4d8dfbf1380` | `2b7879c9edcbdcdded654754be1ed567eaf3db7a7aae178d1aaea09f3a8f699d` |
| `M` | `100644` | `docs/ru/api/classes/PromotionModule.md` | `0d7b8bd948e9aedb28ebced1230a83f0cd411345` | `cf153b6e9a0e2af514759663934be5edda43360334da95e5dce6f334b03354c3` |
| `M` | `100644` | `docs/ru/api/classes/ReportsModule.md` | `e18c82ccfc17ac7fc2787a5ad2246242f56b6ef8` | `778c1aa56f10676fdc62ff44d2d4f1dd145611199fd1709a6effa76d37fa435b` |
| `M` | `100644` | `docs/ru/api/classes/TariffsModule.md` | `4766b9a5b630688bb1c243635dd8ee715cdeedde` | `9d64c2a084f640c3fb56ca4bd993e277c5a8062d556e65173f7101b03311564a` |
| `M` | `100644` | `docs/ru/api/classes/UserManagementModule.md` | `79a814e0e0d57783a7559c6f841d1bd268f0dca6` | `b154c006dda5b4dd6b87efcc01e1210d50215b5a94012f4fa09bfb2b519928f2` |
| `M` | `100644` | `docs/ru/api/classes/WildberriesSDK.md` | `1d72054bda4e2d8e9ca654ae4f13f4bed2bd3bb2` | `f9a3aa8475ed99bb04df5772d55808791b8b34381bd1be2ec8deab4837b9d824` |
| `M` | `100644` | `docs/ru/api/index.md` | `8e737c37bd3c4ac78eca2f9f304fb1fbdbe711b3` | `383e71f568f7815aac6dba3ec7f52b26f734c8fcad6a1f34fa246287455c1162` |
| `M` | `100644` | `scripts/validate-rendered-docs.d.mts` | `d08b19416e7cf315851e0ed41fec918bc1b4540b` | `c75503a27156c6d3864671ae134117b2e84d4b6d2801e89f0f8f6a704340d1d1` |
| `M` | `100644` | `scripts/validate-rendered-docs.mjs` | `49bdc6b9068d8d67c5cd498bdfa2980604b7c0c0` | `ef8b26675bde89b8644230ab8b0363251c648cd308a6fc3bc4b19d7fdd476ecd` |
| `M` | `100644` | `tests/unit/scripts/validate-rendered-docs.test.ts` | `440b4be2c7c97c3ef83a4a5237d3a88244a8f170` | `a10e6e45fdfef06fd44d51522a867d929055eadacdbf723f0ee128000345c574` |
| `A` | `100644` | `docs/public/favicon.svg` | `2b9250c9e7d0a1c11779c9decf4ee2b61f43c51d` | `1d009aec81ddc1b1f01e1d6af4e05507e430f8e70a47163e451083b24fc7571e` |
| `A` | `100644` | `backlog/tasks/task-238 - Fix-public-Russian-API-placeholders-and-favicon.md` | `97aa6c8b7b2bf47a3670be79c3bc434bc3e58c29` | `f06b3645c208b83997585f5d12c9816465bccf3f3807c6cf839752bb405a81a1` |
| `A` | `100644` | `backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md` | `496d5c76adcccc946409f9f3b8d9b81102e8959b` | `9e5c0a9dd465bb735368ba5dfc3d13c9647a7ae63084bdf13606d6881c75cd52` |

New-file SHA-256 values are therefore:

- `docs/public/favicon.svg`: `1d009aec81ddc1b1f01e1d6af4e05507e430f8e70a47163e451083b24fc7571e`.
- `backlog/tasks/task-238 - Fix-public-Russian-API-placeholders-and-favicon.md`: `f06b3645c208b83997585f5d12c9816465bccf3f3807c6cf839752bb405a81a1`.
- `backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md`: `9e5c0a9dd465bb735368ba5dfc3d13c9647a7ae63084bdf13606d6881c75cd52`.

## Stage 1: specification compliance

`TASK-238` acceptance criteria are satisfied by the exact candidate:

1. The 16 affected sources are the Russian API index plus 15 class placeholders. Every one contains `Автоматический переход не выполняется.` and an explicit `/api/` English reference link. No `<script setup>`, `window.location`, or `setTimeout(` remains under `docs/ru/api`.
2. The shared-English Russian sidebar targets remain present, including `ReturnsModule (English)` and `UserManagementModule (English)`. Locale-switch behavior remains present; the only VitePress config delta outside the new base constant is the favicon head entry.
3. Production config uses the same `documentationBase` for `base` and the favicon href. The fresh rendered artifact references `/daytona-wildberries-typescript-sdk/favicon.svg`, and the emitted favicon is byte-identical to `docs/public/favicon.svg`.
4. The CLI guard requires a valid same-origin SVG favicon under the configured base and rejects literal or HTML-escaped `<script setup>` on `/ru/api/` routes. The declaration file exposes the new option/result/error contracts, and the focused regression tests exercise the valid case plus missing favicon, wrong-base favicon, and leaked script-setup cases.
5. Focused review checks pass; the implementation report also retains the fresh production build and aggregate documentation evidence.
6. `TASK-238` and the implementation report contain the bounded owned-file list, evidence, cleanup, and pending deployment boundary.

The root-cause guard passes. This patch removes the ineffective redirect blocks and adds direct rendered-output enforcement. It does not swallow the defect, downgrade diagnostics, return a silent default, introduce a broad compatibility shim, or route around a broken primary contract. The favicon URL parse catch remains narrow, and malformed hrefs still flow through the normal href validator, which reports an explicit route error.

## Stage 2: code, security, and regression review

- Security: no credential, token, hardcoded secret, user-input execution, or injected script was added. The change removes executable-looking placeholder text from rendered pages.
- Correctness: favicon discovery is restricted to `<link>` elements whose `rel` token contains `icon`; acceptance requires same origin, configured-base containment, `.svg`, and an existing emitted file. General link validation still independently reports malformed, wrong-base, or missing targets.
- Performance: the added favicon inspection runs only for the root HTML route; literal-script scanning is one regular-expression test per configured route. This does not materially change the existing rendered-site traversal complexity.
- Maintainability: the single `documentationBase` eliminates duplicated base selection, declaration changes match runtime fields, and focused tests cover both positive and negative behavior.
- Pattern review: no empty catch, hardcoded API key, or broad fallback was added. Existing CLI `console.log` calls are the validator's intended command output.

`lsp_diagnostics` and AST-grep are not exposed in this native leaf tool surface. The strict VitePress TypeScript project, validator syntax check, focused Vitest suite, scoped ESLint, scoped Prettier, exact source inspection, and pattern search were used as the available diagnostic substitutes. No type or syntax error was observed in the reviewed runtime/type/test files.

## Fresh independent checks

| Check | Result |
| --- | --- |
| `node --check scripts/validate-rendered-docs.mjs` | Exit `0`. |
| `npx --no-install vitest run tests/unit/scripts/validate-rendered-docs.test.ts --reporter=dot` | Exit `0`; `1` file, `25/25` tests passed. |
| `npm run validate:docs:config` | Exit `0`; dedicated VitePress TypeScript configuration passed. |
| `npx --no-install eslint tests/unit/scripts/validate-rendered-docs.test.ts` | Exit `0`. |
| Scoped `prettier --check` over config, validator, declaration, test, 16 placeholders, and SVG | Exit `0`; all files match repository formatting. |
| `npm run validate:docs:rendered` against the fresh existing production artifact | Exit `0`; `1,005` routes, `144,097` internal references, `14,004` fragments, one root favicon reference, zero failures. |
| Bounded source/rendered assertions | `16/16` notices and English targets; no redirect/script pattern; configured-base favicon present; source/emitted SVG SHA-256 values match. |
| `git diff --check` | Exit `0`. |
| Canonical isolated-index identity, repeated after checks | Tree `0f8c904af4384bdbcf423a7f170182f3a660cbe6`; patch SHA-256 `f87b9a8512fe69019205306a093cb30a2cf76c5ccab2cca0937c0cc8e4eaaeef`; `23` paths. |

The whole test suite, production documentation build, and aggregate NodeNext gate were not repeated in this review lane. The immutable implementation report records those fresh successful runs; this lane reran only the focused checks needed to independently validate the UX delta and the existing rendered artifact.

## Protected state and scope boundaries

- Protected foreign `backlog/config.yml` remains unstaged and was not edited, staged, reset, or restored. Its SHA-256 remains `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- Baseline and current `src/` tree remain `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`; the candidate contains no SDK source change.
- No `package.json`, lockfile, workflow, generated `docs/api`, canonical `_bmad-output/specs/spec-wb-api-news-2026-10/SPEC.md`, companion source coverage, capability matrix, or historical release/publication receipt is changed. `git diff -- docs/api` is empty.
- The canonical contract still contains exactly `CAP-1` through `CAP-11`. This documentation-only candidate does not change the bounded September audit through `2026-09-24`, the nine supplied October announcements, Returns pagination behavior, NodeNext/package evidence, or their historical receipts.
- `TASK-209`, `TASK-214`, and `TASK-223` remain separate future-v5 work; credential follow-up `TASK-211` remains separate.
- WB live API and sandbox calls are **NOT RUN**. The eight historical `NetworkError` reads remain failed historical attempts and are not successful live proof. No exhaustive current-news claim through `2026-10-12` is made.
- No credential, dotenv, private customer-data, external deployment, Git stage/commit/push/tag/release action, npm publication, or task-status mutation was performed by this review lane.
- `TASK-236` and `TASK-238` remain **In Progress** pending their respective remaining delivery/public-verification integration steps.

## Findings by severity

- CRITICAL: `0`
- HIGH: `0`
- MEDIUM: `0`
- LOW: `0`

## Recommendation

**ACCEPT** the exact 23-path local candidate identified above. Delivery remains gated on exact-candidate commit/push, Pages deployment, and fresh public browser verification of the Russian placeholder UX and configured-base favicon.
