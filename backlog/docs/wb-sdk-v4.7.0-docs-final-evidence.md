# SDK v4.7.0 documentation final evidence

Date: 2026-10-12 04:34 MSK (Europe/Moscow)

## Result

Tasks 233–235 are locally complete and verified against the accepted source commit. The production VitePress build renders 1,005 HTML routes and the effective rendered-site validator reports zero internal route, base-path, fragment, locale-completeness, or required-navigation failures. The strict NodeNext ESM/CommonJS fixtures compile offline, their source is locked byte-for-byte to both language guides, and the repository type-check, lint, formatting, tests, integration tests, package validation, and dry-pack controls pass.

This evidence records local readiness only. It is not a commit, publication, deployment, GitHub release, or WB runtime acceptance.

## Source and worktree identity

- Branch: `main`
- Accepted source HEAD: `1fc8230122b571d1635d0133aaabce64876925c6`
- HEAD at final verification: `1fc8230122b571d1635d0133aaabce64876925c6`
- The shared worktree remained intentionally dirty because concurrent release and generated-documentation work is present. No reset, clean, staging, commit, push, tag, publication, or deployment was performed.
- Generated TypeDoc Markdown contains 4,486 repository source references. Every detected `.../blob/<sha>/src/...` reference is pinned to `1fc8230122b571d1635d0133aaabce64876925c6`; no second SHA was found.
- Protected `backlog/config.yml` final SHA-256: `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.

## Implemented controls

### Public documentation and locale navigation

- English and Russian sidebars expose the NodeNext guide.
- English API navigation exposes `ReturnsModule` and `UserManagementModule`.
- Russian shared-English API navigation exposes `ReturnsModule (English)` and `UserManagementModule (English)`.
- Stale public routes and fragments were repaired in source Markdown and VitePress configuration; generated HTML was not hand-edited.
- The locale switch uses a real translated counterpart when one exists and a valid locale home when it does not. Rendered proof:
  - `/guides/nodenext.html` -> `/ru/guides/nodenext.html`
  - `/ru/guides/nodenext.html` -> `/guides/nodenext.html`
  - `/api/-internal-/interfaces/AccessItem.html` -> `/ru/` because no Russian counterpart exists
  - `/ru/api/classes/ProductsModule.html` -> `/api/classes/ProductsModule.html`
- The built-in VitePress locale controls are hidden only after the custom counterpart-aware control is present. The original `custom.css` import remains active alongside the new locale-switch stylesheet; its Wildberries purple variables (`#c502db`, `#d83cf0`) are present in built CSS.

### Rendered-site validation

- Same-origin absolute and protocol-relative URLs are classified as internal before external URLs and are checked for base, route, and fragment integrity.
- The canonical site origin is explicit: `https://salacoste.github.io`.
- Project invocation requires `/`, `/ru/`, both NodeNext locale routes, reciprocal NodeNext locale switches, and Returns/User Management navigation targets from both locale guide surfaces.
- External URLs are inventoried separately. No external network request is made by the validator.
- VitePress no longer uses blanket `ignoreDeadLinks` suppressions. Internal link failures remain build- or validator-gating.
- Fragment normalization matches VitePress heading slugs while preserving exact explicit TypeDoc IDs such as IDs containing underscores. The controls cover both behaviors.

### NodeNext guide verification

- English and Russian guides document strict `NodeNext` `.mts` and `.cts` use with `skipLibCheck: false`.
- The persistent consumers contain the exact documented ESM and CommonJS snippets.
- A regression test extracts the two TypeScript fences from both guides and compares them byte-for-byte with `consumer.mts` and `consumer.cts`.
- The fixtures import only the package root and supported `/finances` and `/reports` export surfaces. They declare types and values only; they do not construct the SDK or invoke a WB method.
- The dedicated package-consumer fixture is excluded from the root Bundler-resolution TypeScript and ESLint projects because its purpose is to exercise NodeNext and CommonJS `import = require(...)` syntax under its own strict `tsconfig.json`.

## Fresh verification

| Command | Exit | Fresh result |
|---|---:|---|
| `node --check scripts/validate-rendered-docs.mjs` | 0 | Executable ESM syntax accepted. |
| `npx --no-install vitest run tests/unit/scripts/validate-rendered-docs.test.ts tests/unit/docs/fragment-utils.test.ts tests/unit/docs/nodenext-guides.test.ts --reporter=dot` | 0 | 3 files, 24/24 tests passed. Controls include valid and invalid routes/fragments, root/Russian locales, base handling, extensionless and `.html` routes, same-origin absolute and protocol-relative links, wrong-base absolute links, real external classification, missing required locale route, missing locale switch, missing sidebar target, explicit TypeDoc IDs, and guide/fixture parity. |
| `npm run type-check` | 0 | Root `tsc --noEmit` passed; preliminary TS2209 fixture regression is closed. |
| `npm run lint` | 0 | Repository ESLint passed for `src` and `tests`, excluding only the dedicated NodeNext package-consumer directory. |
| `npm run format:check` | 0 | Repository TypeScript formatting passed. |
| Targeted `prettier --check` over changed VitePress, validator, fixture, test, guide, `tsconfig.json`, and `package.json` files | 0 | All matched files use Prettier formatting. |
| `npm run validate:docs:nodenext` | 0 | Package build transformed 115 modules; strict `.mts` and `.cts` fixture compilation passed with `skipLibCheck: false`. |
| `NODE_ENV=production npm run docs:build` | 0 | TypeDoc generation and VitePress 1.6.4 client/server build passed; 1,005 pages rendered in 25.46 seconds. Only the non-gating Rollup chunk-size warning was emitted. |
| `npm run validate:docs:rendered` | 0 | 1,005 HTML routes, 143,092 internal references, 14,004 fragment references, 9,245 external references / 4,624 unique; zero internal failures. |
| `npm run validate:docs:site` | 0 | Effective rendered-site contract passed, then the package rebuilt 115 modules and both NodeNext fixtures compiled. |
| `env -u WB_LIVE_API_TESTS npm test -- --reporter=dot` | 0 | 93 files passed; 2,604 tests passed and 1 skipped. WB live-test opt-in was removed from the environment. |
| `env -u WB_LIVE_API_TESTS npm run test:integration -- --reporter=dot` | 0 | 13 files passed; 228 tests passed and 1 skipped. Requests are mocked/local test behavior; no WB live call was authorized. |
| `npm run build` | 0 | Vite 6.4.3 transformed 115 modules and emitted ESM, CommonJS, declarations, and source maps. |
| `npm run validate:package` | 0 | Validated 5 export surfaces across 193 packed files with strict NodeNext ESM/CommonJS type and runtime consumers. |
| `npm pack --dry-run --json --ignore-scripts` | 0 | `daytona-wildberries-typescript-sdk-4.7.0.tgz`; 193 files; 983,668 bytes packed; 5,180,161 bytes unpacked. No tarball was published. |
| `git diff --check -- docs typedoc.json scripts tests .github/workflows package.json tsconfig.json` | 0 | No whitespace errors in the owned change surface. |
| `shasum -a 256 backlog/config.yml` | 0 | Protected hash remained `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`. |

The final rendered validator classified four canonical same-site absolute references as internal. Compared with the preliminary result, internal references increased from 143,088 to 143,092 and external references decreased from 9,249 to 9,245. This directly closes preliminary finding H-01.

## Core file identities

The table below records the documentation candidate v1 snapshot reviewed in `wb-sdk-v4.7.0-exact-candidate-review.md`. The post-review strict VitePress configuration fix supersedes only the `docs/.vitepress/config.ts` and `package.json` rows in this historical table; all other listed identities remain the v1 evidence baseline.

| File | SHA-256 |
|---|---|
| `scripts/validate-rendered-docs.mjs` | `82758bd3f86b39ad14a9c2b133140891a35490f896ba02f432f2e4d715cbdb28` |
| `scripts/validate-rendered-docs.d.mts` | `f06b62f4264525d5dfd623c878d0896a8631c72ce8c58d10727fc8d04f3a0db3` |
| `tests/unit/scripts/validate-rendered-docs.test.ts` | `2a99e519bb35de442fa71e33d2b11899f2fa7b79c94899f8db47336a095453d1` |
| `docs/.vitepress/config.ts` | `9a70f7baa4f505f83a848f0298b14da01a270e359c4bb3c46e0066c0c9db70d3` |
| `docs/.vitepress/fragment-utils.ts` | `74a4884ee2ac990eddb113bc0f67866210dbccb6201184ad0d76e8f0c1f28d8f` |
| `docs/.vitepress/theme/index.ts` | `6480a2f12b0ea53de4167283d4841f9c0df192a22ae23a53f09bd489eb25486f` |
| `docs/.vitepress/theme/LocaleSwitch.vue` | `0e2563b89fbb3c09886bd5623d0669a02732fae4d566193d88ebdbc1d4153c9b` |
| `docs/guides/nodenext.md` | `a031701739823156b57d7ab0163d9ee1b37c402289e12d4d2bd87702625e4ee0` |
| `docs/ru/guides/nodenext.md` | `a24ae29d5195b09ae7676bff5c2b578ecd66ff7a33a88e7b04cf9f6d93905be8` |
| `tests/fixtures/docs/nodenext/consumer.mts` | `72e12c9bf1bb2a8d4a7c8a511d59cef5b774930103c9508026f998b91dc37f7f` |
| `tests/fixtures/docs/nodenext/consumer.cts` | `05293cf90a2881afacc31b2c27ce436be448f7d88375f0cae9b8eaf1bf6ecef0` |
| `tests/unit/docs/fragment-utils.test.ts` | `7f0c9aed0107d5de931df35cfe231a95d0918e933e4dd191078f7e42caa6696a` |
| `tests/unit/docs/nodenext-guides.test.ts` | `ce33da403cc4d80c475c7970140d572603dfc4bcee913679cfca477aabee066c` |
| `tsconfig.json` | `9b3e9bc99438cdfaf5f67dc66c5d8515a344f7c042651c8e5b94d80392371a0d` |
| `package.json` | `330d940068bc0e5d1ad6df806788799b09fbf9ba1eb7cd0099a18a0632e8f196` |

### Post-review VitePress config type-fix identities

| File | Superseding SHA-256 |
|---|---|
| `docs/.vitepress/config.ts` | `abeb23e362b7b65a00a3fdf8bc85090577e66eac2b2ffb493e9869c1b66d5a5f` |
| `docs/.vitepress/tsconfig.json` | `9319d69bce9d02dc5e1addfb9f1a4c363dcea2e2683638a4b50a06931942a616` |
| `package.json` | `76e58418f45d2ed2359dcc8801eb3b504be29bf4e56549796d4bd068be26d0df` |

Fresh post-review checks are recorded in `backlog/docs/wb-sdk-v4.7.0-config-types-fix.md`: `npm run validate:docs:config`, root type-check, lint, formatting, the production documentation build, and the effective `validate:docs:site` gate all exited 0. The full unit and integration suites were not repeated because the fix changes only the typed VitePress configuration surface and its persistent compile-time gate.

## Safety boundaries and remaining limits

- WB live API calls: **NOT RUN**.
- WB sandbox writes: **NOT RUN**. Tests mentioning the sandbox use mocked clients and do not perform a remote write.
- External URL status requests, including anti-bot behavior: **NOT RUN**. The validator inventories 9,245 references / 4,624 unique URLs and reports them separately from internal failures.
- GitHub Pages deployment and remote fetch: **NOT RUN**.
- npm publication, GitHub release, commit, push, and tag: **NOT RUN**.
- `actionlint` reports the same four pre-existing workflow warnings recorded by the preliminary review: two unquoted `$GITHUB_ENV` shellcheck notices and two `peaceiris/actions-gh-pages@v3` runner-age notices. The validator steps themselves have no reported workflow syntax finding. Updating the deployment action is outside tasks 233–235 and was not folded into this documentation repair.
- The site build retains the existing Rollup chunk-size warning. It does not fail the build and no performance regression was observed in the validator scan.

Stop condition reached: all task 233–235 acceptance criteria have fresh local evidence, the four preliminary review findings H-01, H-02, M-01, and M-02 are closed by regression controls, and no authorized local verification remains pending.

## Task 235 wording clarification

Task 235's description and acceptance criterion #3 now state the implemented and evidenced boundary precisely: absolute and protocol-relative same-origin routes and fragments are validated, while real external URLs are inventoried separately. External HTTP status requests and anti-bot checks remain **NOT RUN**. This is a prose-only clarification; validator behavior, scope, and the verification results above are unchanged.
