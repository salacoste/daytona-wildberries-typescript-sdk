# SDK v4.7.0 VitePress config strict type fix

Date: 2026-10-12 04:59 MSK (Europe/Moscow)

## Result

The VitePress configuration now passes a dedicated strict TypeScript check. The check runs first in `validate:docs:site`, before rendered-site validation and the offline NodeNext package-consumer gate. The repair uses supported markdown-it and VitePress type surfaces, adds no dependency or suppression, and does not change the documentation contract or release scope.

The supplied reviewer log path, `/tmp/wb-sdk-exact-review-vitepress-ts.log`, was not present when implementation began. The reported four source diagnostics were reproduced exactly with a local strict invocation before editing: three `TS2351` errors for `new child.constructor(...)` and one `TS2353` error for the custom `localeCounterparts` theme property.

## Implementation

- `docs/.vitepress/config.ts` constructs replacement markdown-it tokens with the typed `state.Token` constructor exposed by the active parser state.
- `DocumentationThemeConfig` explicitly extends `DefaultTheme.Config` with the optional shared `localeCounterparts` field, and the config uses VitePress's generic `defineConfigWithTheme<DocumentationThemeConfig>` helper. The field is optional at the type level because VitePress applies the same theme type to locale-specific partial theme configs; the shared runtime config still provides the complete array.
- `docs/.vitepress/tsconfig.json` extends the repository TypeScript policy, keeps `strict: true`, emits nothing, loads Node types, and includes only the VitePress config plus its local fragment helper.
- `package.json` adds `validate:docs:config` and runs it first in `validate:docs:site`.

## Fresh verification

| Command | Exit | Result |
|---|---:|---|
| `npx --no-install tsc --noEmit --strict --skipLibCheck true --target ES2020 --module ESNext --moduleResolution bundler --types node docs/.vitepress/config.ts` before the repair | 2, expected | Reproduced exactly three `TS2351` errors at the token-construction sites and one `TS2353` error for `localeCounterparts`. |
| `npm run validate:docs:config` | 0 | Dedicated strict VitePress config check passed. |
| `npm run type-check` | 0 | Root `tsc --noEmit` passed. |
| `npm run lint` | 0 | Repository ESLint passed for its configured `src` and `tests` scope. |
| `npm run format:check` | 0 | Repository TypeScript formatting gate passed. |
| `npx --no-install prettier --check docs/.vitepress/config.ts docs/.vitepress/tsconfig.json package.json` | 0 | All changed implementation and configuration files use the repository's Prettier style. |
| `NODE_ENV=production npm run docs:build` | 0 | TypeDoc generation and VitePress 1.6.4 production build completed in 23.17 seconds. The existing non-gating Rollup chunk-size warning remained. |
| `npm run validate:docs:site` | 0 | The strict config check ran first; rendered validation then passed 1,005 routes, 143,092 internal references, 14,004 fragments, and 9,245 external references / 4,624 unique; the package built 115 modules and strict NodeNext ESM/CommonJS fixtures passed offline. |

The full unit and integration suites were not repeated because parser output and the rendered documentation contract are already exercised by the fresh production build plus rendered-site validation, and this repair does not change SDK or WB request behavior.

## Source and runtime boundary

- The new persistent gate is compile-time validation only.
- `state.Token` is the typed constructor supplied by the same markdown-it parser state that owns the child tokens; it replaces an untyped access through JavaScript's generic `constructor` property without changing token types, content, or ordering.
- `defineConfigWithTheme` is VitePress's supported generic config helper and returns the same runtime configuration object while checking the extended default-theme shape.
- External URL HTTP requests and anti-bot checks remain **NOT RUN**. WB live API and sandbox calls remain **NOT RUN**.
- GitHub Pages deployment, npm publication, GitHub release, commit, staging, push, and tag remain **NOT RUN**.

## Artifact identities

| File | SHA-256 |
|---|---|
| `docs/.vitepress/config.ts` | `abeb23e362b7b65a00a3fdf8bc85090577e66eac2b2ffb493e9869c1b66d5a5f` |
| `docs/.vitepress/tsconfig.json` | `9319d69bce9d02dc5e1addfb9f1a4c363dcea2e2683638a4b50a06931942a616` |
| `package.json` | `76e58418f45d2ed2359dcc8801eb3b504be29bf4e56549796d4bd068be26d0df` |

Protected `backlog/config.yml` remained SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9` through the pre-implementation Backlog mutation and all implementation checks.

## Final content-freeze comparison

The root's direct comparison confirmed that the immutable staged content did not change during this follow-up:

- staged tree before and after: `be0cbb72b4e4870c6ab01c1b02e73f0ec8924713`;
- staged patch SHA-256 before and after: `78c2276051ba75534a1653f940396c5f302e580bf5ff05359b81855a1b9e9c8b`;
- `git diff-index --cached --quiet` comparison: equal.

The serialized `.git/index` SHA-256 changed from `62446c3f1fb75299811fbe5298afe67f4e0730e8a344329e7554f694e971e82f` to `31071df4714cae41c3b2ad474fb03553063d7beefa30a4f2ccc949a21795ea75` after required build output rewrote file timestamps and a read-only Git status refreshed index stat/cache metadata. Raw index serialization is not the content-freeze contract; no staged path, blob, mode, or patch changed, and no restoration or Git mutation was attempted.

After task closure through Backlog CLI, protected `backlog/config.yml` remained SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
