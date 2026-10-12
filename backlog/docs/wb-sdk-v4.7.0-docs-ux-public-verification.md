# WB SDK v4.7.0 documentation UX independent public verification

Verified at `2026-10-12T04:16:15Z` (`2026-10-12 07:16:15 MSK`).

## Verdict

**PASS — the deployed documentation UX fix is publicly live from the expected immutable `gh-pages` commit, the selected public bytes match that commit exactly, the required hydrated locale/navigation behavior works in fresh isolated browsers, and the release/npm/CI identities remain unchanged.**

This is a bounded independent public verification. It sampled the repaired Russian placeholder and representative guide/API routes; it did not repeat the publisher's 16/16 public-placeholder sweep or make an exhaustive external-HTTP claim.

## Acceptance result

| Requirement | Result | Independent evidence |
| --- | --- | --- |
| Expected delivery identity | PASS | Public `main` is `c58c1f230720db6470b2cba2a6b0e19d1f933777`; public `gh-pages` is `092f5446c50bda5cb77bd4d4fd23d312a2888af5`. The `gh-pages` commit message is `docs: deploy v4.7.0 - c58c1f230720db6470b2cba2a6b0e19d1f933777 c58c1f230720db6470b2cba2a6b0e19d1f933777`, with tree `cd0cf7e25f85a10fa94e2f3dd0baf1e9d8b7e025`. |
| Selected public bytes equal immutable `gh-pages` | PASS | Eight selected files returned HTTP 200 and were byte-identical to the same paths fetched from immutable commit `092f5446...`; exact hashes are recorded below. |
| Reciprocal NodeNext locale switching | PASS | A fresh hydrated browser clicked English `Change language to Русский` to `/ru/guides/nodenext.html`, then Russian `Change language to English` back to `/guides/nodenext.html`; both headings and titles matched their locale. |
| Russian `UserManagementModule` placeholder | PASS | The hydrated page visibly contained `Автоматический переход не выполняется.`, exposed the explicit English API link, contained no visible literal `<script setup>`, and remained on the Russian URL after a 1.5-second bounded wait. Clicking the explicit English link reached the hydrated English `Class: UserManagementModule` page. |
| Shared-English Russian sidebar links | PASS | After expanding `Модули`, `ReturnsModule (English)` and `UserManagementModule (English)` were both visible and targeted their English API routes under the configured project base. |
| No-counterpart locale fallback | PASS | `docs/ru/api/classes/ReturnsModule.md` is absent at current `HEAD`, and the immutable `gh-pages` path `ru/api/classes/ReturnsModule.html` returns HTTP 404. On the hydrated English `ReturnsModule` page, the visible Russian locale link targeted `/ru/`; clicking it reached the Russian locale home. |
| Representative API page | PASS | `/api/classes/ProductsModule.html` hydrated with title and heading `Class: ProductsModule`. Its public bytes matched immutable `gh-pages`. |
| Project-base favicon | PASS | Root HTML references `/daytona-wildberries-typescript-sdk/favicon.svg`. The public SVG returned HTTP 200, `image/svg+xml`, 500 bytes, and SHA-256 `1d009aec81ddc1b1f01e1d6af4e05507e430f8e70a47163e451083b24fc7571e`, byte-identical to both the accepted local asset and immutable `gh-pages`. |
| Fresh browser avoids root favicon 404 | PASS | A second fresh in-memory browser loaded the public root with no cookies. Its complete static request list included only the configured project-base `favicon.svg` at HTTP 200 and no `https://salacoste.github.io/favicon.ico` request; console output contained zero errors and zero warnings. |
| Release/npm identity remains unchanged | PASS | Annotated tag object `b62c3d6ee97c2d58db6934917b674199ea138791` still targets commit `265292a0e17d35c82d821297c57856e4537b60cd`. npm `latest` is `4.7.0`; `4.7.0` still reports that `gitHead`, integrity `sha512-v7TBUvRo3ORkVwpqSEcjl3eRaoODGEVTMnc2715l8hOVFclwaFULHRGPvZvDlu8YjgG9QxpC6p+YPZGEzwVYpw==`, and SHA-1 `b74e32228ddffa92328337155c8b32cc2ca357e4`. |
| Exact-head CI/public workflow identities | PASS | CI/CD `38201377429`, Secret Scan `38201377406`, Documentation Deploy `38201377475`, and Pages `38201520683` are all `completed/success` on their expected heads. CI Node 20/22/24 and documentation deploy jobs, gitleaks, standalone documentation deployment, and all three Pages jobs are successful. |

## Public byte comparison

Public files were compared with `cmp` and SHA-256 against `raw.githubusercontent.com/.../092f5446c50bda5cb77bd4d4fd23d312a2888af5/<path>`. Every comparison returned equal bytes.

| Path | Bytes | SHA-256 |
| --- | ---: | --- |
| `index.html` | 122,400 | `3aeb58e5298cf713d20e06258e308e4d972a54b94814927d5bebffb6271bf99b` |
| `guides/nodenext.html` | 162,597 | `e0c181cd8b848611f89b605eb1fa548f144c040d1b4ee82505dfbdfbc9e2d139` |
| `ru/guides/nodenext.html` | 160,835 | `6c0da440b51808159cc4244a900380c06ba4f5b2f003279cdd2d62492969eae4` |
| `api/classes/ReturnsModule.html` | 175,526 | `8f3c92d71573b636fc4bbdd9378d0220550b8a21d2b092a139cffc0a5aee2218` |
| `api/classes/UserManagementModule.html` | 176,594 | `f15b96f389c8f76e1d609fca33b998575e8baa78546d21031b8bb179e5b27d74` |
| `ru/api/classes/UserManagementModule.html` | 147,443 | `e7819c9cdb7a92cd09aeb282b5daef6b4bea57ad810121a11563b389a55d3dbe` |
| `api/classes/ProductsModule.html` | 520,152 | `5c5e266c86258b0e32f74366aca3c7ab1df9c4c21f9b53da0d4180fe4c3fe9d0` |
| `favicon.svg` | 500 | `1d009aec81ddc1b1f01e1d6af4e05507e430f8e70a47163e451083b24fc7571e` |

The selected Russian placeholder HTML contained one visible no-auto-transition notice, at least one exact English `UserManagementModule` target, zero literal `<script setup>` occurrences, and zero HTML-escaped `<script setup>` occurrences.

## Git, release, npm, and workflow evidence

Fresh public reads produced these identities:

- `git ls-remote`:
  - `refs/heads/main` -> `c58c1f230720db6470b2cba2a6b0e19d1f933777`
  - `refs/heads/gh-pages` -> `092f5446c50bda5cb77bd4d4fd23d312a2888af5`
  - `refs/tags/v4.7.0` -> annotated object `b62c3d6ee97c2d58db6934917b674199ea138791`
  - peeled `refs/tags/v4.7.0^{}` -> `265292a0e17d35c82d821297c57856e4537b60cd`
- GitHub's tag-object API reports `type=commit` and target `265292a0...`, confirming that the annotated tag has not moved.
- Current `HEAD:src` is `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`, unchanged from the accepted SDK source tree.
- Delivery receipt SHA-256 is exactly `844038eaef0f400aa430026ebeb16042ca598a2eed1400799745c23952b237c8`.

Fresh GitHub Actions API reads:

| Workflow/job | Head | Result |
| --- | --- | --- |
| CI/CD run `38201377429` | `c58c1f230720db6470b2cba2a6b0e19d1f933777` | `completed/success` |
| CI Node 20 job `114655320982` | same main head | `success` |
| CI Node 22 job `114655320880` | same main head | `success` |
| CI Node 24 job `114655320761` | same main head | `success` |
| CI Deploy Documentation job `114656678389` | same main head | `success` |
| Secret Scan run `38201377406`; gitleaks job `114655320587` | same main head | `completed/success`; `success` |
| Documentation Deploy run `38201377475`; job `114655320958` | same main head | `completed/success`; `success` |
| Pages run `38201520683` | `092f5446c50bda5cb77bd4d4fd23d312a2888af5` | `completed/success` |
| Pages build/report/deploy jobs `114655764533`, `114655810637`, `114655810728` | same `gh-pages` head | all `success` |

## Fresh isolated browser evidence

Browser automation used `playwright-cli 0.1.22` with two newly opened named sessions, both using the default in-memory profile. Neither session attached to Chrome, Edge, an extension, CDP, a user profile, or saved storage state. Both reported `No cookies found` where checked.

The main session proved:

1. English NodeNext hydrated at `/guides/nodenext.html` with its English heading and a visible locale link to the exact Russian counterpart.
2. Clicking the locale link reached hydrated Russian NodeNext; its visible English locale link returned to the exact English counterpart.
3. Russian `UserManagementModule` rendered the Russian notice and explicit English action, stayed on the Russian page without automatic navigation, and showed no literal script setup text.
4. Expanding the Russian sidebar module group made both required shared-English module links visible.
5. Clicking the explicit `UserManagementModule` English link reached the hydrated English API page.
6. English `ReturnsModule`, which has no Russian counterpart in the immutable deployment, visibly targeted `/ru/`; clicking the locale control reached the Russian home.
7. English `ProductsModule` hydrated as the representative large API reference page.

The second fresh session loaded the site root. `playwright-cli requests --static` recorded the configured `/daytona-wildberries-typescript-sdk/favicon.svg` request at HTTP 200 and no root `/favicon.ico` request. `playwright-cli console` reported `Total messages: 0 (Errors: 0, Warnings: 0)`.

## Evidence gap and report-text mismatch

- This verifier sampled one of the 16 repaired Russian placeholders. The completed delivery receipt records the publisher's 16/16 public sweep; that sweep was not repeated here.
- `backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md` says a real Russian `ReturnsModule` page was left unchanged. Current `HEAD` has no `docs/ru/api/classes/ReturnsModule.md`, and immutable `gh-pages` has no `ru/api/classes/ReturnsModule.html`. The actual public locale behavior is internally consistent and passes the required no-counterpart fallback test, but that sentence in the implementation report is stale/inaccurate. This verifier did not edit the historical report.
- No new install, tarball download, Sigstore/attestation verification, export smoke, strict NodeNext consumer compile, full test suite, or full documentation build was run. The SDK `src/` tree, annotated release tag, npm `latest`/`gitHead`/integrity, and published package identity are unchanged; the initial independent public-verification report already contains those artifact-specific proofs.
- External-link status was not exhaustively checked. The earlier external URL inventory is not treated as exhaustive reachability proof.

## Scope limits

- The accepted audit boundary remains documentation/evidence through `2026-09-24`, the nine supplied October announcements, Returns pagination behavior, and NodeNext/package evidence.
- The eight historical WB `NetworkError` attempts remain failed attempts and are not successful runtime proof.
- WB live API and WB sandbox calls are **NOT RUN**.
- Future `TASK-209`, `TASK-214`, and `TASK-223`, plus credential follow-up `TASK-211`, remain separate.
- No exhaustive current Wildberries-news or external-HTTP claim is made.

## Protected state and cleanup

- Protected foreign `backlog/config.yml` remains the only tracked worktree modification, remains unstaged, and retains SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- Both owned browser sessions were closed. `playwright-cli list` reported no open browsers, and each session reported no persistent user data to delete.
- The nine verifier-owned browser snapshot files were removed by exact path. The bounded byte-comparison temporary directory was removed by an exact-path shell trap.
- No SDK source, documentation source, package metadata, workflow, canonical specification, task, index entry, Git ref, historical report, dependency, global configuration, credential, dotenv file, customer data, WB endpoint, SDK constructor, or SDK method was mutated or invoked.

## Risks

- The public result is tied to the observed immutable identities above. A later change to `main`, `gh-pages`, npm dist-tags, or Pages content requires a new verification.
- The stale `ReturnsModule` sentence in the implementation report could mislead a future reader about counterpart availability; it does not change the deployed behavior verified here.
