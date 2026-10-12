# SDK v4.7.0 release evidence

Date: 2026-10-12 (Europe/Moscow)

## Scope and identities

- Preparation baseline HEAD: `1fc8230122b571d1635d0133aaabce64876925c6` on `main`.
- Remote `origin/main` before delivery: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`.
- Previous published npm `latest`: `4.6.0`.
- Candidate version: `4.7.0` (additive minor release).
- Protected foreign `backlog/config.yml` SHA-256: `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`; this lane did not edit or stage it.

## Vacancy checks

| Command | Exit | Observed result |
|---|---:|---|
| `npm view daytona-wildberries-typescript-sdk@4.7.0 version --json` | 1 | Registry returned `E404 No match found for version 4.7.0`. |
| `npm view daytona-wildberries-typescript-sdk dist-tags versions --json` | 0 | `latest` was `4.6.0`; the published version list ended at `4.6.0`. |
| `git ls-remote --tags origin refs/tags/v4.7.0 refs/tags/v4.7.0^{}` | 0 | Empty output; no remote `v4.7.0` tag existed. |
| `gh release view v4.7.0 --repo salacoste/daytona-wildberries-typescript-sdk --json tagName,url,isDraft,isPrerelease,publishedAt,targetCommitish` | 1 | `release not found`. |
| `gh api repos/salacoste/daytona-wildberries-typescript-sdk/git/ref/tags/v4.7.0` | 1 | GitHub returned HTTP 404 `Not Found`. |

These are point-in-time vacancy observations before publication. Delivery must re-check them immediately before creating the tag or release and must not overwrite an existing tag.

## Metadata preparation

Owned paths in this lane:

- `package.json` — version field only; concurrent script ownership remains with the documentation validator lane.
- `package-lock.json` — top-level and root-package version metadata only.
- `CHANGELOG.md` — promote the accepted Unreleased record to 4.7.0 dated 2026-10-12.
- `backlog/docs/wb-sdk-v4.7.0-release-notes.md` — GitHub Release body source.
- `backlog/docs/wb-sdk-v4.7.0-release-evidence.md` — durable release evidence.
- `backlog/tasks/task-236 - Release-SDK-v4.7.0-to-npm-GitHub-and-Pages.md` — task status, plan, and later delivery closeout.

The release notes cover the nine supplied October changes, Returns v1 pagination, and the NodeNext declaration/package correction. They preserve the bounded prior-news cutoff through 2026-09-24 inclusive and do not claim an exhaustive WB-news audit through 2026-10-12.

## Runtime limitations

- Eight historical read-only WB attempts ended in `NetworkError`; they are failed network attempts, not successful live proof.
- A sandbox write was **NOT RUN**. Sandbox HTTP behavior, server-side defaulting, and successful order creation remain unproven.
- No credential value, dotenv file, live WB request, or sandbox request was read or executed in this lane.

## Preparation validation

| Command | Exit | Observed result |
|---|---:|---|
| Version-consistency assertion over `package.json` and `package-lock.json` | 0 | Package, lockfile, and root-package versions were all `4.7.0`. |
| `npm ci --ignore-scripts --dry-run` | 0 | Lockfile/package dependency graph accepted; `up to date`. |
| `npm run build` | 0 | Vite 6.4.3 transformed 115 modules and generated declarations. |
| `npm run validate:package` | 0 | Validated 5 public package exports across 193 packed files with strict NodeNext ESM/CommonJS type and runtime consumers. |
| `npm run type-check` | 0 | Repository TypeScript check passed. |
| `npm pack --dry-run --json --ignore-scripts` | 0 | Produced manifest identity `daytona-wildberries-typescript-sdk@4.7.0`, filename `daytona-wildberries-typescript-sdk-4.7.0.tgz`, 193 files, SHA-1 `97d85ffa18caaca8d2139f9b00ede09a5abc8c55`, and integrity `sha512-BmlHQG65zEzP5z6WPFHA0pwN6csi9yRqbAoQ4Q+TZIe2U9X2jiD8dE/5kuKMjsyo2chnEFRGU9hz9PtdHT1heg==`. This is the local preparation snapshot; final publication verification must recompute the published tarball identity after all release files are integrated. |
| `npx --no-install prettier --check CHANGELOG.md backlog/docs/wb-sdk-v4.7.0-release-notes.md backlog/docs/wb-sdk-v4.7.0-release-evidence.md` | 0 | All three files matched repository formatting. |
| `git diff --check -- package.json package-lock.json CHANGELOG.md` | 0 | No whitespace errors. |
| `shasum -a 256 backlog/config.yml` | 0 | Protected hash remained `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`. |

All checks were offline-safe with respect to WB: no SDK method was invoked and no credential or dotenv value was loaded. Registry and GitHub vacancy checks were public release-coordination reads only.

## Publication validation

Pending later leaf roles: exact-candidate independent review, pushed immutable source-reference regeneration, ordinary-hook commits, required CI, tag/GitHub Release, npm trusted publication/provenance, Pages deployment, and public rendered-route checks.
