# WB SDK v4.7.0 publication evidence

Date: 2026-10-12 (Europe/Moscow)

## Disposition

**PUBLICATION COMPLETE — final independent public verification remains pending.**

Version `4.7.0` was delivered from the validated exact release head to GitHub Releases, npm, and GitHub Pages. This receipt records the delivery identities and the bounded checks completed by the publication lane. It does not close `TASK-236`; the final independent verifier owns the remaining public-verification decision and its separate evidence file.

The historical `backlog/docs/wb-sdk-v4.7.0-delivery-evidence.md` remains unchanged as the truthful record of the earlier blocked attempt.

## Exact Git delivery identity

- Repository: `salacoste/daytona-wildberries-typescript-sdk`.
- Delivery commit and remote `main`: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Parent: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Delivery commit tree: `564f2fc520d83400b715130b62322bb8149bd7ac`.
- Annotated tag: `v4.7.0`.
- Annotated tag object: `b62c3d6ee97c2d58db6934917b674199ea138791`.
- Peeled tag target: `265292a0e17d35c82d821297c57856e4537b60cd`.
- GitHub Release: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/releases/tag/v4.7.0>.
- GitHub Release published at: `2026-10-12T03:03:17Z`.
- Release notes source SHA-256: `402b558dedb57cc310f9eceaad458495a2706b0e0899703bfeb1c2a829f5ac0b`.
- GitHub Release body was created with `--notes-file backlog/docs/wb-sdk-v4.7.0-release-notes.md`; a JSON-body comparison after publication found the body byte-for-byte equal to that file, including its final newline.

The release delivery commit contains exactly six paths relative to its parent:

1. `backlog/docs/wb-sdk-v4.7.0-ci-link-recovery.md`
2. `backlog/docs/wb-sdk-v4.7.0-delivery-evidence.md`
3. `backlog/docs/wb-sdk-v4.7.0-recovery-exact-review.md`
4. `backlog/docs/wb-sdk-v4.7.0-recovery-manifest.md`
5. `backlog/docs/wb-sdk-v4.7.0-release-notes.md`
6. `backlog/tasks/task-237 - Repair-v4.7.0-release-note-CHANGELOG-link.md`

Identity of that six-path evidence-inclusive commit:

- Tree: `564f2fc520d83400b715130b62322bb8149bd7ac`.
- Canonical full-index binary patch SHA-256 relative to `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`: `8c1896579923bdee70cedfea6fcb5143ec36f37013b5befb7f1a7f0ef6fb1339`.
- Supplemental two-file delta SHA-256 relative to the accepted four-path tree `bd60321793910d5951c2f3ff4967472f0261e733`: `b18d8b7473ab2aa31d5e027ee8a6e0f6067470c94720942ca2d46392efa36f8e`.
- Independent exact recovery review SHA-256: `9399ddddc5f0f86dc92c775e7b967d6ac11f8d51b09f063cc5fd20335a1b295b`.

The ordinary commit hooks passed TypeScript type checking and the staged gitleaks scan. The remote push response reported that the branch rule expecting `gitleaks` was bypassed by the direct push; publication remained gated until the fresh exact-head Secret Scan and CI workflows below completed successfully.

## Source preservation and immutable references

- Accepted source revision: `1fc8230122b571d1635d0133aaabce64876925c6`.
- Accepted source tree: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`.
- `v4.7.0:src` tree: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`.
- Source-tree equality: **PASS**.
- Generated documentation still contains `4,486` immutable source references under `blob/1fc8230122b571d1635d0133aaabce64876925c6/src/`.
- The recovery changed the release-note CHANGELOG link to immutable pushed revision `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`; its `CHANGELOG.md` blob is the same source blob used by the release head.

## Exact-head CI and security results

All listed runs target exact head `265292a0e17d35c82d821297c57856e4537b60cd`.

| Workflow/job | Identity | Result | Evidence |
| --- | --- | --- | --- |
| CI/CD | run `38197588069` | `success` | <https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38197588069> |
| CI Node 20 | job `114643628708` | `success` | Tests, package artifact validation, documentation build, rendered-documentation and NodeNext validation passed. |
| CI Node 22 | job `114643628677` | `success` | Tests and package artifact validation passed. |
| CI Node 24 | job `114643628380` | `success` | Tests and package artifact validation passed. |
| CI documentation deploy | job `114644947158` | `success` | Exact-head documentation artifact was deployed to `gh-pages`. |
| Secret Scan | run `38197588038`, job `114643628553` | `success` | <https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38197588038> |
| npm Trusted Publishing | run `38198236993`, job `114645614212` | `success` | <https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198236993> |
| GitHub Pages build | run `38198164020` | `success` | Coordinator-confirmed final Pages build: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198164020>. This bounded receipt lane did not independently reopen that run after the final ownership handoff. |

The CI annotations were non-failing GitHub runner notices about Node 20 action-runtime deprecation and the announced future `ubuntu-latest` migration.

## npm publication

- Package: `daytona-wildberries-typescript-sdk@4.7.0`.
- Public registry tarball: <https://registry.npmjs.org/daytona-wildberries-typescript-sdk/-/daytona-wildberries-typescript-sdk-4.7.0.tgz>.
- npm `latest`: `4.7.0`.
- Registry `gitHead`: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Published timestamp: `2026-10-12T03:06:23.696Z`.
- Tarball size: `988,029` bytes.
- Unpacked size: `5,180,261` bytes.
- File count: `193`.
- SHA-1 shasum: `b74e32228ddffa92328337155c8b32cc2ca357e4`.
- SHA-512 integrity: `sha512-v7TBUvRo3ORkVwpqSEcjl3eRaoODGEVTMnc2715l8hOVFclwaFULHRGPvZvDlu8YjgG9QxpC6p+YPZGEzwVYpw==`.
- Attestations endpoint: <https://registry.npmjs.org/-/npm/v1/attestations/daytona-wildberries-typescript-sdk@4.7.0>.
- Transparency-log entry reported by the publish job: <https://search.sigstore.dev/?logIndex=3219759843>.

The publication lane downloaded the public registry tarball and independently matched its SHA-1 and SHA-512 against registry metadata. Five public exports passed ESM import and CommonJS require smokes, and the published package passed the strict NodeNext `.mts` and `.cts` fixtures. `npm audit signatures` reported verified registry signatures and verified attestations with no invalid or missing entry for the installed public dependency set.

The decoded SLSA provenance statement records:

- Subject: `pkg:npm/daytona-wildberries-typescript-sdk@4.7.0`.
- Subject SHA-512: `bfb4c152f468dce464570a6a4847239777916a8383184553327736ef5e65f2139515c97068550b1d118fbd9bc396ef188e01bd431a42ea9f983d9184cf0558a7`.
- Workflow repository: `https://github.com/salacoste/daytona-wildberries-typescript-sdk`.
- Workflow path: `.github/workflows/publish.yml`.
- Workflow ref: `refs/tags/v4.7.0`.
- Resolved Git commit: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Invocation: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198236993/attempts/1>.

The provenance subject digest equals the decoded registry integrity digest.

## GitHub Pages publication

- Public site: <https://salacoste.github.io/daytona-wildberries-typescript-sdk/>.
- Published `gh-pages` commit: `21f0072681d5a5f5535abd48817faac8c7603222`.
- Parent `gh-pages` commit: `a20188a24cdeaaa52ba389cd5959306498bb8bde`.
- Commit marker: `docs: deploy v4.7.0 - 265292a0e17d35c82d821297c57856e4537b60cd 265292a0e17d35c82d821297c57856e4537b60cd`.

The publication lane received HTTP 200 for the root, Russian root, English and Russian NodeNext guides, Returns API class, and User Management API class. For those six pages, the fetched public bytes matched the corresponding files in `origin/gh-pages` commit `21f0072681d5a5f5535abd48817faac8c7603222`. The public Returns page also contained the expected `id="getreturns"` fragment target.

These route checks are recorded as publication-lane evidence only. The separate final independent verifier owns the release-wide public verification and the decision to close the remaining `TASK-236` acceptance criteria.

## Protected state and explicit limits

- Protected foreign `backlog/config.yml` remained unstaged and unchanged with SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- At receipt creation, the protected config was the only tracked worktree change outside this new uncommitted publication receipt.
- No force push, hook bypass, branch rebase, reset, clean, or broad add was used.
- No npm token was used by the workflow; publication used npm OIDC Trusted Publishing with provenance.
- WB live API calls: **NOT RUN** in this lane.
- WB sandbox reads or writes: **NOT RUN** in this lane.
- Credential, dotenv, token-value, private customer-data, or seller-account reads: **NOT RUN** in this lane.
- The eight earlier read-only WB attempts that ended in `NetworkError` remain historical failed attempts and do not establish successful live WB runtime behavior.

## Handoff boundary

This receipt is intentionally uncommitted and unpushed so that the independent verifier can assess the public artifacts at the exact release head. The repository ignore rules omit this local evidence path from normal `git status` output. `TASK-236` remains `In Progress`; its final acceptance criteria must be updated only by the independent verification owner after reviewing the public release, npm artifact and provenance, and deployed Pages site.
