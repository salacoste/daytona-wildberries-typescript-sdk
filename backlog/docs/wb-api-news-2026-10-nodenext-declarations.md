# WB API news 2026-10 NodeNext declaration repair

Date: 2026-10-11 (Europe/Moscow)

## Result

**Declaration repair: PASS. Composed repository review: PENDING.** A clean Vite build now emits a NodeNext-resolvable ESM declaration graph. An actual 193-file npm tarball was unpacked into an isolated consumer, where strict ESM `.mts` and CommonJS `.cts` consumers compiled all five public exports with `module: NodeNext`, `moduleResolution: NodeNext`, `strict: true`, and `skipLibCheck: false`. Runtime `import` and `require` smokes also resolved all five packed exports without constructing an SDK instance or making a request.

TASK-231 remains **In Progress** and its acceptance boxes remain unchecked for composed review. No package was published, no dependency was installed, no external WB request was made, and no credential, environment value, or dotenv file was inspected.

## Root cause and repair

`vite-plugin-dts` 4.5.4 preserved the repository's extensionless source specifiers in `dist/esm/**/*.d.ts`. Under NodeNext, those declarations are ESM because the package has `"type": "module"`; their relative import and re-export targets therefore need runtime-resolvable extensions. Directory targets also need their actual `index.js` path rather than a bare directory specifier.

The installed 4.5.4 README and `dist/index.d.ts` document `beforeWriteFile(filePath, content)` as the supported hook for transforming declaration content before it is written. `vite.config.ts` now uses that hook. The transformer:

- parses declarations with the TypeScript AST, so JSDoc examples and arbitrary strings are not rewritten;
- maps relative specifiers to the mirrored `src` tree;
- emits `.js` for source-file targets such as `./types/products.types.js`;
- emits `/index.js` for directory targets such as `./modules/analytics/index.js`;
- fails the build if a real relative declaration specifier cannot be classified;
- leaves package imports and already explicit runtime extensions unchanged.

The rebuilt graph contains 81 declaration files and 200 relative module specifiers: 152 file targets and 48 `index.js` directory targets. A post-build AST scan found zero unsafe extensionless relative specifiers.

## CommonJS type routing decision

No package export-map or second CommonJS declaration tree was added. Before implementation, an isolated temporary package copy was used to correct only the ESM declaration specifiers, then compile both consumer modes across all five exports. Both commands exited 0, including CommonJS `import = require(...)` consumers. The final packed-artifact validator independently confirmed the same result.

The existing top-level `types` target is therefore sufficient for the tested TypeScript 5.9.3 NodeNext consumer forms. Adding `.d.cts` copies or nested `types` conditions would duplicate the declaration graph without solving an observed failure. `package.json` and `package-lock.json` are unchanged.

## Permanent package proof

`scripts/validate-package-exports.mjs` now creates a real tarball with `npm pack --json --ignore-scripts`, extracts it in an OS temporary directory, and installs that extracted package as the consumer's package. It then:

1. verifies every `import`, `require`, and `types` export target is present in the tarball manifest;
2. compiles an ESM `.mts` consumer importing the constructors from `.`, `./finances`, `./analytics`, `./communications`, and `./reports`;
3. compiles a CommonJS `.cts` consumer using `import = require(...)` for the same five exports;
4. runs ESM `import` and CommonJS `require` smokes against those packed paths;
5. removes only its own OS temporary directory.

Both compile commands use `--strict --module NodeNext --moduleResolution NodeNext --target ES2022 --skipLibCheck false`. The packed consumers only reference constructors; they do not instantiate modules or call SDK methods.

## Build identity

The owned build ran from `2026-10-11T22:01:21+03:00` through `2026-10-11T22:01:22+03:00`.

- Build-input manifest: 90 files (`src/**` plus `vite.config.ts`, the declaration helper, package validator, `package.json`, `package-lock.json`, and `tsconfig.json`).
- Start manifest SHA-256: `fd669f7cff9676a651c8ef79b151f838ef5d409b075cde78ed614721805f6331`.
- End manifest SHA-256: `fd669f7cff9676a651c8ef79b151f838ef5d409b075cde78ed614721805f6331`.
- Start/end comparison: identical; no build input changed during the build.
- `dist` artifact count: 190 files.
- Packed artifact count: 193 files. The three-file difference is package metadata/documentation and is not a defect.
- `dist` artifact-manifest SHA-256: `9d07a7c3ee0a07f93811d5aba6ff6580513b6cf129bbc2c7eb8da75880befe8e`.

Key artifact SHA-256 values:

| Artifact | SHA-256 |
|---|---|
| `dist/esm/index.d.ts` | `f5c36ae59bb9d2b91e99ee4bb9f2d6b5c2c3d2fd1530eb076141178c1e499fea` |
| `dist/esm/modules/finances/index.d.ts` | `306816f380b4687f7aed27006044abb2cd077ca7936dc1fd95b85f4b0f2e1e0b` |
| `dist/esm/modules/analytics/index.d.ts` | `26eccdc9ad873fc847b56dfe869fb39dc722d818b72cbddd6816c00f2101a855` |
| `dist/esm/modules/communications/index.d.ts` | `81b8508f1237bf081a8a6be831cb7f7b75f76853a5bfd1fba16db9442571e490` |
| `dist/esm/modules/reports/index.d.ts` | `892b48fcfa918c3328b3999913b8ac291d878813f79185943542f7b756aec17c` |
| `dist/cjs/index.cjs` | `677a8ae6051026890183d5df1b998502c59040e4fa09e68b85535267c3ad3496` |

Owned build-input SHA-256 values:

| Input | SHA-256 |
|---|---|
| `vite.config.ts` | `202d671f35b12b207c9c9b37742b7b9fbaf501f53f1e6b99e3542b1893055308` |
| `scripts/node-next-declarations.ts` | `a32f8bc459b0d3b10206abd3809d588b64eaa5407966189d2a470ee77b5f4bd4` |
| `scripts/validate-package-exports.mjs` | `1abdb1424f3c8b047f2057ff63ef04b55c2228e0516fc626d37d368b20ea75bb` |
| `package.json` | `53de9fe8bd51c7e57c8a1912a07fb8908f89d6e20083e8fb042b22ba8e885917` |
| `package-lock.json` | `6a069aaf3d975cad32f2a450a07a7f95cd84ae7e36556988fb6090d233e3dfd1` |
| `tsconfig.json` | `b56b80c5fec74522a743187484af593d3696ccdad2dfc8b1d8533f09fe6253f4` |

## Verification

| Command | Exit | Observed result |
|---|---:|---|
| `npx --no-install vitest run tests/unit/scripts/node-next-declarations.test.ts tests/unit/scripts/validate-package-exports.test.ts --reporter=dot` | 0 | 2 files, 19 tests passed. The new tests cover file targets, directory targets, `.types` basenames, import types, import-equals declarations, explicit extensions, package imports, JSDoc preservation, and unresolved-target failure. |
| `npm run build` | 0 | Vite 6.4.3 transformed 115 modules and generated declarations through the supported build hook. |
| `npm run validate:package` | 0 | Validated 5 exports across 193 packed files with strict NodeNext ESM/CommonJS type consumers and packed runtime consumers. |
| Declaration AST scan | 0 | 81 declaration files; 200 relative specifiers; zero unsafe extensionless specifiers. |
| `npx --no-install tsc --noEmit --strict --module ESNext --moduleResolution Bundler --target ES2022 --types node --skipLibCheck false vite.config.ts scripts/node-next-declarations.ts` | 0 | Owned build configuration and transformer type-check passed with library checking enabled. |
| `npx --no-install tsc --noEmit --strict --module ESNext --moduleResolution Bundler --target ES2022 --types node,vitest/globals --skipLibCheck false scripts/node-next-declarations.ts tests/unit/scripts/node-next-declarations.test.ts tests/unit/scripts/validate-package-exports.test.ts` | 0 | Owned helper and regression tests type-check passed with library checking enabled. |
| `npm run type-check` | 0 | Fresh final repository-wide type-check passed after the concurrent documentation fixture owner completed their update. |
| `npx --no-install eslint tests/unit/scripts/node-next-declarations.test.ts tests/unit/scripts/validate-package-exports.test.ts` | 0 | Targeted repository lint passed. `vite.config.ts` and `scripts/**` are intentionally ignored by the repository ESLint configuration. |
| `node --check scripts/validate-package-exports.mjs` | 0 | Package validator syntax check passed. |
| `npx --no-install prettier --check vite.config.ts scripts/node-next-declarations.ts scripts/validate-package-exports.mjs tests/unit/scripts/node-next-declarations.test.ts tests/unit/scripts/validate-package-exports.test.ts` | 0 | All owned/touched paths match repository formatting. |
| `git diff --check -- <owned paths>` | 0 | No whitespace errors. |

## Corrected strictness claim and validation gap

The older documentation type-smoke report correctly recorded `skipLibCheck: false` failures and must not be read as strict NodeNext success. The new packed ESM and CommonJS checks are the first observed strict NodeNext passes in this lane; they use `skipLibCheck false` against an extracted tarball, not the repository source tree or an ignored pre-existing `dist` tree.

An earlier repository-wide `npm run type-check` observation exited 2 while the concurrent, foreign file `tests/fixtures/docs/english-products-guide-parity.mts` still declared four unused `_...GtinIsOptionalNonNullString` aliases. This repair did not edit that file. After that owner completed the update, the fresh final `npm run type-check` exited 0. The owned config/helper/tests checks independently passed with `skipLibCheck false` throughout.

The four root `.tmp-docs-public-*` artifacts existed when this lane started but were absent by the time the rebuilt package was ready, so the exact earlier documentation smoke commands could not be rerun without recreating another owner's temporary files. This lane did not delete or recreate them. The durable packed validator covers both strict consumer modes across all five exports and is broader at the package boundary, but it does not reproduce the documentation snippets themselves.

No full unit/integration suite was run in this lane because the concurrent integration executor owns the composed global checks. No external WB runtime behavior was tested.

## Final integration paths

- `vite.config.ts`
- `scripts/node-next-declarations.ts`
- `scripts/validate-package-exports.mjs`
- `tests/unit/scripts/node-next-declarations.test.ts`
- `backlog/tasks/task-231 - Generate-NodeNext-safe-package-declarations.md`
- `backlog/docs/wb-api-news-2026-10-nodenext-declarations.md`

SOURCE_FROZEN

## Final integration follow-up — expanded news consumer

The final integration made the packed consumer durable and broadened its assertions without
changing package exports. `package-consumer-fixtures/news-public-types.mts` and `.cts`
are copied into the isolated extracted-tarball consumer. They now verify all five public export
paths plus October Products directory methods and exact locale/search types, all four optional
non-null GTIN placements, sandbox request/delivery types and `RequestOptions.operationKey`,
nullable DBS `orders`, optional non-null phone arrays, and Returns request/response/public
exports. `full-okpd-locale-negative.mts` is compiled as an expected failure and must produce
the exact `"en"` versus `"ru"` diagnostic; it uses no `any`, ignore, or diagnostic suppression.

Current source hashes after that bounded expansion:

| Path | SHA-256 |
|---|---|
| `scripts/validate-package-exports.mjs` | `4865011d6b25898bff013cce7a313831d0db4a6e47ab8e606f66cb8b541d9553` |
| `package-consumer-fixtures/news-public-types.mts` | `823c8cc0f9dc8f07953bcee1f82aadaac758a2072aff2b5d5a2afa7cc2be7d5b` |
| `package-consumer-fixtures/news-public-types.cts` | `7e660f21686fdd612b32197192fdf116aa2b8949ffbcc648ad072ee46e8cbe03` |
| `package-consumer-fixtures/full-okpd-locale-negative.mts` | `14f276fc7b47c1bd1e8f1573a3de4e8fefe71f988588f434beb1e32b314e0566` |

Fresh pre-compose checks after this expansion: the two helper test files pass 19/19,
`npm run build` exits 0, `npm run validate:package` exits 0 across 193 packed files with strict
NodeNext `.mts`/`.cts` consumers and runtime imports, and `npm run type-check` exits 0. The
package-consumer fixture directory lives outside the repository's configured `src`, `tests`,
and `tools` projects because those files resolve the package name only inside the isolated
packed consumer; the package validator is their compiler and fails on either unexpected
positive or unexpected negative results. Final composed evidence is recorded separately after
the last source change.
