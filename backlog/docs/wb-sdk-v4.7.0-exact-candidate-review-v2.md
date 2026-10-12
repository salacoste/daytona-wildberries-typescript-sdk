# SDK v4.7.0 exact-candidate code review v2

Date: 2026-10-12 (Europe/Moscow)

## Verdict

**ACCEPT**

The frozen v2 index has the authoritative expected identity, preserves the accepted SDK source tree, and closes both medium-severity findings from the historical v1 review. Task 235 now states the implemented external-network boundary accurately, and the VitePress configuration is covered by a dedicated strict TypeScript gate that runs first in the effective documentation validation command. No critical, high, medium, or low code/spec/security finding remains in this candidate.

Severity summary:

- CRITICAL: 0
- HIGH: 0
- MEDIUM: 0
- LOW: 0

This acceptance applies only to the frozen v2 candidate identified below and only to the code/spec/security review lane. Architecture status belongs to the separate architecture lane.

## Exact candidate identity

- Baseline and current `HEAD`: `1fc8230122b571d1635d0133aaabce64876925c6`.
- Frozen v2 index tree: `0200074e0ed3aee160ebaee56ba2e97287294f2a`.
- A read-only reconstruction from `git ls-files -s -z` rebuilt the canonical Git tree entry ordering and hashing without writing objects. It produced `0200074e0ed3aee160ebaee56ba2e97287294f2a`.
- `git diff-index --cached --quiet 0200074e0ed3aee160ebaee56ba2e97287294f2a --` exited 0.
- Canonical staged patch SHA-256: `ac809dafe04d2350dda6819f545995192031271e71a46b88422c789b0cd129ac`.
- Canonical patch command:

  ```sh
  LC_ALL=C git diff --cached --binary --full-index --no-ext-diff --no-textconv 1fc8230122b571d1635d0133aaabce64876925c6 -- | shasum -a 256
  ```

- Candidate scope: 871 staged paths.
- Authoritative external manifest: `backlog/docs/wb-sdk-v4.7.0-candidate-manifest-v2.md`, SHA-256 `898e95aa7490c79834e5b0f01489087e0b9f03327446dfa64fbed104cd7115d4`. It is intentionally unstaged to avoid self-reference.
- The manifest's 871-row status/path block is byte-for-byte equal to `git diff --cached --name-status 1fc8230122b571d1635d0133aaabce64876925c6 --`.
- Protected foreign `backlog/config.yml` remains unstaged with SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.

## Stage 1 — specification compliance

The staged implementation and evidence continue to satisfy tasks 233 and 234: the public navigation and locale controls expose the repaired module and NodeNext targets, the English and Russian NodeNext examples remain locked to strict ESM/CommonJS fixtures, and the rendered validator covers configured-base, route, fragment, locale, switch, and required-navigation behavior.

Task 235 is `Done`, and all seven acceptance criteria are checked. In particular:

1. Validation operates on routes and fragments after VitePress rendering.
2. Both locale navigation surfaces are checked using the configured base path.
3. Absolute and protocol-relative same-origin routes and fragments are validated; real external URLs are inventoried separately; external HTTP status and anti-bot checks are explicitly `NOT RUN`.
4. Blanket VitePress dead-link suppression is absent; exclusions are narrow and justified.
5. Regression tests cover valid and invalid routes, fragments, locales, and base-path behavior.
6. Documentation CI invokes the effective rendered-site validator.
7. Dedicated strict VitePress configuration validation passes and runs first in `validate:docs:site`, before rendered-site and NodeNext validation.

Task 236 correctly remains `In Progress`. Publication, provenance, GitHub release, deployment, public-route, and live-runtime criteria are still open and were not treated as satisfied by this local review.

The root-cause guard passes. The v2 changes repair the two v1 defects directly: they correct the inaccurate task contract and add an enforceable strict compiler gate for the previously uncovered VitePress configuration. They do not swallow diagnostics, return silent defaults, or route around a failing primary contract. The existing locale-home behavior remains a documented and tested boundary for content without a translated counterpart, while required navigation continues to fail validation when missing.

## Closure of historical v1 findings

### M-01 — task 235 external-status overclaim: closed

The staged task description at `backlog/tasks/task-235 - Validate-rendered-documentation-routes-and-fragments.md:32` and checked acceptance criterion 3 at line 39 now match the implementation and evidence: same-origin routes and fragments are validated, external URLs are inventoried separately, and external HTTP/anti-bot behavior is `NOT RUN`. The correction preserves the existing validator boundary instead of claiming evidence from network checks that were never executed.

The staged task also adds and checks acceptance criterion 7 at line 43, and all seven criteria are checked.

### M-02 — uncovered VitePress TypeScript errors: closed

The staged implementation removes the four reproduced strict TypeScript diagnostics without suppressions:

- `docs/.vitepress/config.ts:16-21` imports `defineConfigWithTheme` and declares `DocumentationThemeConfig extends DefaultTheme.Config` with the shared optional `localeCounterparts` property.
- `docs/.vitepress/config.ts:65` applies that type through `defineConfigWithTheme<DocumentationThemeConfig>`.
- `docs/.vitepress/config.ts:104`, `:109`, and `:116` construct replacement markdown-it tokens through the typed `state.Token` constructor instead of the untyped generic `child.constructor` property.
- `docs/.vitepress/config.ts:737` supplies `localeCounterparts` through the declared custom theme shape.
- `docs/.vitepress/tsconfig.json` is a dedicated strict, no-emit project covering `config.ts` and `fragment-utils.ts` with Node types.
- `package.json:87` defines `validate:docs:config` as `tsc -p docs/.vitepress/tsconfig.json`.
- `package.json:90` runs `validate:docs:config` first in `validate:docs:site`, followed by rendered-site and NodeNext validation.

Both documentation workflows use the effective aggregate gate:

- `.github/workflows/docs.yml:59`
- `.github/workflows/main.yml:90`
- `.github/workflows/main.yml:147`

Each call site executes `npm run validate:docs:site`; no workflow delta was needed between v1 and v2 because these call sites already used the aggregate command.

## Exact-index implementation assessment

- **Accepted source equality:** baseline `1fc8230122b571d1635d0133aaabce64876925c6:src` and candidate `0200074e0ed3aee160ebaee56ba2e97287294f2a:src` both resolve to tree `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`. Cached and worktree `src/` comparisons are empty.
- **Generated source identity:** all 4,486 generated source references match `blob/1fc8230122b571d1635d0133aaabce64876925c6/src/`; no other source SHA occurs.
- **Artifact identities:** all three superseding hashes recorded in `backlog/docs/wb-sdk-v4.7.0-config-types-fix.md` match their exact staged blobs:
  - `docs/.vitepress/config.ts`: `abeb23e362b7b65a00a3fdf8bc85090577e66eac2b2ffb493e9869c1b66d5a5f`.
  - `docs/.vitepress/tsconfig.json`: `9319d69bce9d02dc5e1addfb9f1a4c363dcea2e2683638a4b50a06931942a616`.
  - `package.json`: `76e58418f45d2ed2359dcc8801eb3b504be29bf4e56549796d4bd068be26d0df`.
- **Evidence history:** `backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md` labels its v1 hash table as historical and provides a distinct superseding table for the three changed config/package artifacts. It does not rewrite the earlier snapshot as though it described v2.
- **CI/static-gate order:** strict config type-check, rendered-site validator, then NodeNext consumer validation. The persistent gate covers the exact TypeScript surface implicated by M-02.
- **Whitespace:** `git diff --cached --check` exited 0.

## Focused review verification

| Check | Result | Scope/meaning |
|---|---:|---|
| Canonical staged patch hashing command | match | Produced `ac809dafe04d2350dda6819f545995192031271e71a46b88422c789b0cd129ac`. |
| Read-only canonical tree reconstruction | match | Produced `0200074e0ed3aee160ebaee56ba2e97287294f2a`. |
| `git diff-index --cached --quiet <v2-tree> --` | exit 0 | The current index equals the frozen candidate tree. |
| Candidate manifest vs cached name-status | exit 0 | All 871 status/path rows agree byte-for-byte. |
| Baseline/candidate `src/` tree comparison | match | Both resolve to `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`; no SDK source change. |
| Generated source-reference inventory | pass | 4,486/4,486 references use the accepted baseline SHA. |
| Superseding artifact hash table | pass | 3/3 staged blob hashes match. |
| `npm run validate:docs:config` | exit 0 | Dedicated strict VitePress config project passes. |
| `npm run type-check` | exit 0 | The root TypeScript project passes. |
| Targeted Prettier check | exit 0 | `config.ts`, the dedicated tsconfig, and `package.json` match repository formatting. |
| Targeted Vitest suite | exit 0 | 3 files and 24/24 route, fragment, config-helper, and NodeNext guide tests passed. |
| `git diff --cached --check` | exit 0 | No staged whitespace error. |
| Protected config hash | match | Remains `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`. |

No `lsp_diagnostics` or AST-grep tool was available in this leaf review surface. The dedicated strict compiler gate, root compiler, targeted formatting and regression tests, exact source inspection, and pattern review were used instead. They expose the relevant TypeScript, fallback, empty-catch, logging, and hardcoded-secret risk surfaces without leaving an uncovered type error in the reviewed files.

The full unit/integration suites and production documentation build were not repeated in this exact-review lane. The staged, hash-matched fix report records successful lint, repository and targeted formatting, production VitePress build, rendered-site validation, and aggregate `validate:docs:site` execution. This review freshly reran the focused compiler, formatting, and 24-test regression controls needed to establish closure of M-01 and M-02.

## Explicit limits and NOT RUN evidence

- WB live API calls: **NOT RUN**.
- WB sandbox writes: **NOT RUN**.
- Credential, dotenv, or private customer-data reads: **NOT RUN**.
- External HTTP status and anti-bot checks: **NOT RUN**; external URLs are inventoried without network requests.
- npm publication and provenance verification: **NOT RUN**.
- GitHub commit, push, tag, Release, and CI completion: **NOT RUN**.
- GitHub Pages deployment, public-route fetch, and final published artifact identity: **NOT RUN**.
- No stage, reset, restore, checkout, clean, commit, push, tag, release, publish, deployment, WB request, or protected-config edit was performed by this review. The only authored artifact is this unstaged v2 review report, which is outside the frozen index.

## Recommendation

**ACCEPT** the exact frozen v2 candidate for the code/spec/security lane. This verdict stops at local candidate readiness: task 236 must retain the publication, provenance, remote CI, deployment, public-route, and live-runtime gates until each has its own direct evidence.
