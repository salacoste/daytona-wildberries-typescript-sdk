# WB SDK v4.7.0 public documentation UX fix

Implemented and verified at `2026-10-12T03:32:31Z` (`2026-10-12 06:32:31 MSK`).

## Status

**LOCAL IMPLEMENTATION PASS — ready for independent review. Public deployment and post-deployment browser verification are NOT RUN.**

This bounded change repairs the two documentation UX defects recorded in `wb-sdk-v4.7.0-public-verification.md`: Russian API placeholders exposed literal Vue setup source, and the deployed site had no base-aware local favicon. `TASK-238` remains **In Progress** pending independent review and public deployment proof.

## Implemented behavior

- Removed the ineffective `<script setup>` redirect blocks from all 16 affected Russian API placeholder sources. Each page now states that the API reference is available only in English, states that no automatic transition occurs, and provides an explicit link to the corresponding English reference.
- Kept `docs/ru/api/classes/ReturnsModule.md` unchanged because it is a real Russian API page and did not contain the defective placeholder pattern.
- Preserved the shared-English Russian sidebar entries and the existing locale-switch implementation. The rendered `UserManagementModule` placeholder contains `ReturnsModule (English)`, `UserManagementModule (English)`, and a locale-switch link to the English counterpart.
- Added `docs/public/favicon.svg`, a dependency-free `WB` mark using the existing documentation brand colors `#c502db` and `#d83cf0`.
- Reused one `documentationBase` value for the VitePress `base` and favicon head entry. The production build emits `/daytona-wildberries-typescript-sdk/favicon.svg`, and the emitted SVG is byte-identical to the source asset.
- Extended the rendered-site validator. CLI validation now requires an existing local SVG favicon under the configured base and rejects literal `<script setup>` source on `/ru/api/` routes. The programmatic validator exposes the same checks as explicit options for focused fixtures.

No translation of the English TypeDoc reference was invented, and no automatic redirect remains.

## Exact owned files

Documentation placeholders:

- `docs/ru/api/index.md`
- `docs/ru/api/classes/AnalyticsModule.md`
- `docs/ru/api/classes/BaseClient.md`
- `docs/ru/api/classes/CommunicationsModule.md`
- `docs/ru/api/classes/FinancesModule.md`
- `docs/ru/api/classes/GeneralModule.md`
- `docs/ru/api/classes/InStorePickupModule.md`
- `docs/ru/api/classes/OrdersDbsModule.md`
- `docs/ru/api/classes/OrdersFbsModule.md`
- `docs/ru/api/classes/OrdersFbwModule.md`
- `docs/ru/api/classes/ProductsModule.md`
- `docs/ru/api/classes/PromotionModule.md`
- `docs/ru/api/classes/ReportsModule.md`
- `docs/ru/api/classes/TariffsModule.md`
- `docs/ru/api/classes/UserManagementModule.md`
- `docs/ru/api/classes/WildberriesSDK.md`

Favicon and validation:

- `docs/.vitepress/config.ts`
- `docs/public/favicon.svg`
- `scripts/validate-rendered-docs.mjs`
- `scripts/validate-rendered-docs.d.mts`
- `tests/unit/scripts/validate-rendered-docs.test.ts`

Task and evidence:

- `backlog/tasks/task-238 - Fix-public-Russian-API-placeholders-and-favicon.md`
- `backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md`

No package metadata, dependency, workflow, SDK source, canonical specification, capability matrix, release artifact, or historical report was edited.

## Fresh validation evidence

| Command or check | Result |
| --- | --- |
| `node --check scripts/validate-rendered-docs.mjs` | Exit 0. Validator ESM syntax accepted. |
| `npx --no-install vitest run tests/unit/scripts/validate-rendered-docs.test.ts --reporter=dot` | Exit 0. One file, 25/25 tests passed. New controls accept a valid base-aware local SVG favicon and clean Russian placeholder, and reject a missing favicon, wrong-base favicon, and escaped literal script-setup placeholder. |
| `npx --no-install eslint tests/unit/scripts/validate-rendered-docs.test.ts` | Exit 0. Scoped lint passed. The `.mjs` validator remains intentionally outside the repository ESLint target. |
| `npx --no-install prettier --check docs/.vitepress/config.ts scripts/validate-rendered-docs.mjs scripts/validate-rendered-docs.d.mts tests/unit/scripts/validate-rendered-docs.test.ts docs/ru/api/index.md docs/ru/api/classes/*.md docs/public/favicon.svg` | Exit 0. All scoped files match repository formatting. |
| `npm run validate:docs:config` | Exit 0. Strict VitePress configuration TypeScript validation passed. |
| `npm run type-check` | Exit 0. Repository TypeScript check completed without diagnostics. |
| Bounded source assertions over `docs/ru/api` | Exit 0. All 16 defective-pattern pages contain the no-auto-transition notice and an explicit English `/api/` link; no `<script setup>`, `window.location`, or `setTimeout(` remains anywhere under `docs/ru/api`. |
| `NODE_ENV=production npm run docs:build` | Exit 0. TypeDoc plus VitePress 1.6.4 production build completed in 21.34 seconds. The existing non-gating Rollup chunk-size warning was emitted. |
| Bounded rendered assertions | Exit 0. Root HTML contains `/daytona-wildberries-typescript-sdk/favicon.svg`; emitted and source SVG bytes match; rendered Russian API pages contain no literal/escaped script-setup or redirect source; the expected Russian notice, English reference link, shared-English sidebar targets, and locale switch are present. |
| `npm run validate:docs:site` | Exit 0. Strict config, rendered-site validation, SDK build, and strict NodeNext fixture compile passed. The rendered validator checked 1,005 routes (919 root, 86 Russian), 144,097 internal references, 14,004 fragments, one root favicon reference, and 9,245 external references / 4,624 unique external URLs, with zero internal failures. SDK build transformed 115 modules. External network status was not requested. |
| `git diff --check` | Exit 0. No whitespace errors. |
| `shasum -a 256 backlog/config.yml` | `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`, unchanged from the protected foreign baseline. |

## Cleanup and boundaries

- The production docs build regenerated 803 tracked `docs/api` files by changing only the immutable source revision in 4,486 links. Those build-owned substitutions were mechanically reversed to their exact pre-build value; `git diff -- docs/api` is empty.
- `docs/.vitepress/dist/` is repository-ignored and remains as the fresh rendered artifact used by the aggregate gate. No temporary directory or cache was created for this work.
- The pre-existing foreign `backlog/config.yml` modification was not staged, reset, restored, or edited, and its required SHA-256 is preserved.
- No WB API or sandbox request, secret or environment inspection, whole repeated test suite, Git staging, commit, push, tag, GitHub Release, deployment, or npm publication was performed.
- Public Pages still serves the old behavior until this local change is independently reviewed, delivered, and deployed. A fresh isolated public browser check of the Russian placeholder and favicon is therefore still required before claiming public closure.
