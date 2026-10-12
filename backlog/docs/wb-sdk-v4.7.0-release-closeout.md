# WB SDK v4.7.0 release closeout

Closed at `2026-10-12T04:22:00Z` (`2026-10-12 07:22:00 MSK`).

## Outcome

**PASS — `daytona-wildberries-typescript-sdk@4.7.0` is published and independently verified, the post-release documentation UX repair is live and independently verified, and `TASK-236` and `TASK-238` are complete.**

The release package remains tied to the accepted release head. The later documentation-only repair advanced `main` and `gh-pages` without changing the annotated tag, npm artifact, SDK source tree, or release scope.

## Final identities

| Surface | Final identity | Result |
| --- | --- | --- |
| Repository `main` before this closeout commit | `c58c1f230720db6470b2cba2a6b0e19d1f933777` | Accepted documentation UX delivery head |
| GitHub Release and npm `gitHead` | `265292a0e17d35c82d821297c57856e4537b60cd` | Immutable release/package head |
| Annotated tag object | `b62c3d6ee97c2d58db6934917b674199ea138791` | Peels to the release head above |
| SDK `src/` tree | `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d` | Unchanged from the accepted source through the current documentation head |
| `gh-pages` | `092f5446c50bda5cb77bd4d4fd23d312a2888af5` | Published documentation UX output |
| `gh-pages` source marker | `docs: deploy v4.7.0 - c58c1f230720db6470b2cba2a6b0e19d1f933777 c58c1f230720db6470b2cba2a6b0e19d1f933777` | Matches the accepted documentation head |
| npm package | `daytona-wildberries-typescript-sdk@4.7.0` | `latest=4.7.0`; 193 files; five exports |

The closeout commit identity is intentionally omitted from this precommit record. It is recorded after the normal hook-protected commit, guarded fast-forward push, and exact-head workflows in the repository-ignored local postcommit receipt `backlog/docs/wb-sdk-v4.7.0-closeout-delivery-receipt.md`.

## Release and package proof

The initial release chain passed every bounded publication gate:

- CI/CD run [38197588069](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38197588069): `completed/success`, including Node 20, 22, and 24 plus documentation deployment.
- Secret Scan run [38197588038](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38197588038): `completed/success`.
- npm Trusted Publishing run [38198236993](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198236993): `completed/success`.
- Pages run [38198164020](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198164020): `completed/success`.
- The public 193-file npm tarball matched the registry SHA-1 and SHA-512 metadata. All five export keys passed ESM import and CommonJS require checks, strict NodeNext `.mts` and `.cts` consumers compiled, npm signatures and attestations verified, and the decoded SLSA provenance subject digest matched the public tarball integrity. Provenance resolves to workflow `.github/workflows/publish.yml`, tag `v4.7.0`, and commit `265292a0e17d35c82d821297c57856e4537b60cd`.
- Generated source links use the immutable accepted source revision, and that revision, the final tag, and the current documentation head share SDK source tree `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`.

Detailed proof is preserved in:

- [`wb-sdk-v4.7.0-publication-evidence.md`](./wb-sdk-v4.7.0-publication-evidence.md)
- [`wb-sdk-v4.7.0-public-verification.md`](./wb-sdk-v4.7.0-public-verification.md)
- [`wb-sdk-v4.7.0-release-evidence.md`](./wb-sdk-v4.7.0-release-evidence.md)

## Documentation UX proof

The post-release repair removed ineffective redirect code from all 16 affected Russian API placeholders, rendered a visible Russian notice with an explicit English reference link, preserved the shared-English sidebar and locale controls, and added a local favicon under the configured Pages base. The rendered validator and focused tests enforce these behaviors.

Accepted local evidence passed validator syntax, 25/25 focused tests, scoped ESLint and Prettier, strict VitePress configuration, repository type checking, 16/16 source assertions, a 1,005-page production documentation build, and the aggregate documentation gate with 144,097 internal references, 14,004 fragments, one root favicon reference, and zero failures. The separate inventory counted 9,245 external references and 4,624 unique external targets; it was an inventory, not exhaustive HTTP reachability proof.

The exact public documentation repair passed:

- CI/CD run [38201377429](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38201377429): `completed/success`, including Node 20, 22, and 24 and the documentation deploy job.
- Secret Scan run [38201377406](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38201377406): `completed/success`.
- Documentation Deploy run [38201377475](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38201377475): `completed/success`.
- Pages run [38201520683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38201520683): `completed/success` on `gh-pages` commit `092f5446c50bda5cb77bd4d4fd23d312a2888af5`.

The delivery owner observed all 16 public Russian placeholder routes at HTTP 200 with the expected notice, explicit English target, and no literal script-setup text. The independent public verifier separately checked immutable public bytes, hydrated reciprocal NodeNext locale switching, the Russian `UserManagementModule` placeholder and explicit English navigation, shared-English sidebar targets, the no-counterpart `ReturnsModule` locale fallback, a representative large API page, and the project-base favicon in fresh isolated browsers. The public favicon is byte-identical to the accepted source asset.

Detailed proof is preserved in:

- [`wb-sdk-v4.7.0-public-ux-fix.md`](./wb-sdk-v4.7.0-public-ux-fix.md)
- [`wb-sdk-v4.7.0-public-ux-exact-review.md`](./wb-sdk-v4.7.0-public-ux-exact-review.md)
- [`wb-sdk-v4.7.0-docs-ux-delivery.md`](./wb-sdk-v4.7.0-docs-ux-delivery.md)
- [`wb-sdk-v4.7.0-docs-ux-delivery-receipt.md`](./wb-sdk-v4.7.0-docs-ux-delivery-receipt.md), accepted SHA-256 `844038eaef0f400aa430026ebeb16042ca598a2eed1400799745c23952b237c8`
- [`wb-sdk-v4.7.0-docs-ux-public-verification.md`](./wb-sdk-v4.7.0-docs-ux-public-verification.md), accepted SHA-256 `65870ab2361817570fb68616d58cd825c4f832ae13017b2350c416ab44982ad3`

## Dated erratum — 2026-10-12

The historical implementation report `wb-sdk-v4.7.0-public-ux-fix.md` says that a real Russian `ReturnsModule` page remained unchanged. That sentence is stale and inaccurate. There is no `docs/ru/api/classes/ReturnsModule.md` source file and no `ru/api/classes/ReturnsModule.html` in the accepted deployment. The correct locale behavior for the English `ReturnsModule` page is the no-counterpart fallback to `/ru/`; the independent public verifier observed the visible Russian locale target and successfully navigated to the Russian home.

The historical implementation, review, delivery, and verification records remain byte-unchanged. This erratum corrects the closeout interpretation without rewriting those records.

## Scope and limitations

- The accepted source-coverage boundary is evidence through `2026-09-24` inclusive plus the nine supplied October announcements, Returns pagination, NodeNext, and documentation behavior. It is not an exhaustive Wildberries-news audit through `2026-10-12`.
- The canonical source-only specification remains `CAP-1` through `CAP-11`. The separately authorized release work in `TASK-236` did not expand that source-only specification.
- Current WB live API and sandbox calls are **NOT RUN**. The eight historical WB reads that ended in `NetworkError` remain failed attempts and are not successful live-runtime proof.
- External links were inventoried but not exhaustively checked over HTTP.
- No local reinstall, public-tarball redownload, cryptographic reverification, full test suite, or full documentation rebuild was repeated during this report-only closeout. Product files are unchanged from the accepted and exact-head-CI-verified heads.
- Future-v5 `TASK-209`, `TASK-214`, and `TASK-223`, plus credential follow-up `TASK-211`, remain separate.

## Task and protected-state result

- `TASK-236`: **Done**, acceptance criteria 1–6 checked.
- `TASK-238`: **Done**, acceptance criteria 1–6 checked.
- Protected foreign `backlog/config.yml` remained unstaged and byte-unchanged with SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- The closeout changes only task/evidence/report paths. No `src`, product documentation, scripts, tests, package metadata, lockfile, workflow, tag, release, npm package, or existing Git ref was changed while preparing this report.

Stop condition reached: the release and follow-up documentation UX work have accepted public evidence, all task acceptance criteria are checked, both tasks are Done, and no authorized precommit closeout work remains.
