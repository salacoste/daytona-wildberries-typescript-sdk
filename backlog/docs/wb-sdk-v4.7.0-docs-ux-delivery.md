# WB SDK v4.7.0 documentation UX delivery record

Prepared at `2026-10-12T03:48:49Z` (`2026-10-12 06:48:49 MSK`).

## Status

**PRECOMMIT DELIVERY RECORD — the independently accepted documentation UX candidate is reproduced exactly and ready for its normal hook-protected commit and guarded push.**

This record is intentionally written before the delivery commit so it can travel with the reviewed change. The final commit, workflow, deployment, `gh-pages`, and public-route identities belong in a separate postcommit receipt after the push-triggered jobs complete. `TASK-236` and `TASK-238` remain **In Progress** until fresh public proof is collected.

## Accepted identity

- Repository: `salacoste/daytona-wildberries-typescript-sdk`.
- Baseline local `HEAD`, local `main`, remote `main`, and peeled `v4.7.0` release target: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Annotated `v4.7.0` tag object: `b62c3d6ee97c2d58db6934917b674199ea138791`.
- Accepted SDK `src/` tree: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`.
- Accepted 23-path temporary-index tree: `0f8c904af4384bdbcf423a7f170182f3a660cbe6`.
- Accepted canonical full-index binary patch SHA-256 relative to the baseline: `f87b9a8512fe69019205306a093cb30a2cf76c5ccab2cca0937c0cc8e4eaaeef`.
- Independent exact-review verdict: **ACCEPT**, with zero CRITICAL, HIGH, MEDIUM, or LOW findings.

The temporary-index tree and binary-patch digest were reproduced before staging. The real index remained empty during reproduction.

## Immutable input records

| Record | SHA-256 |
| --- | --- |
| `backlog/docs/wb-sdk-v4.7.0-publication-evidence.md` | `8e3327feb478916ef2c2a3e7a705c2f8cfde1ee3769ef846887206712d35dd9a` |
| `backlog/docs/wb-sdk-v4.7.0-public-verification.md` | `11e98eb8141e047472359fbdf4feffe3f09334d1907f2e2448ac89d7e23bf1d4` |
| `backlog/docs/wb-sdk-v4.7.0-public-ux-fix.md` | `9e5c0a9dd465bb735368ba5dfc3d13c9647a7ae63084bdf13606d6881c75cd52` |
| `backlog/docs/wb-sdk-v4.7.0-public-ux-exact-review.md` | `b08a12cc5a6c22bef76117d0481843a78a4e393d28ecb5c01a6205f9fee6ae1c` |
| `backlog/tasks/task-238 - Fix-public-Russian-API-placeholders-and-favicon.md` | `f06b3645c208b83997585f5d12c9816465bccf3f3807c6cf839752bb405a81a1` |
| `docs/public/favicon.svg` | `1d009aec81ddc1b1f01e1d6af4e05507e430f8e70a47163e451083b24fc7571e` |

These records were read and their bytes were not changed by this delivery lane.

## Delivery scope

The accepted product delta contains exactly:

- 16 Russian API placeholder pages with a visible Russian notice and explicit English reference link;
- one base-aware VitePress favicon configuration change and one local SVG asset;
- the rendered-documentation validator runtime, declaration, and focused regression test changes;
- the exact reviewed `TASK-238` file and its implementation report.

The commit also carries the four immutable publication, public-verification, UX implementation, and exact-review reports listed above, plus this precommit delivery record. It does not change package metadata, dependencies, workflows, SDK source, generated `docs/api`, the canonical specification, the capability matrix, the `v4.7.0` tag or release, or npm publication.

The bounded release scope remains the September evidence through `2026-09-24` inclusive, the nine supplied October announcements, Returns pagination, and NodeNext/documentation behavior. This delivery makes no exhaustive all-Wildberries-through-`2026-10-12` claim. `TASK-209`, `TASK-214`, and `TASK-223` remain separate future work, and credential follow-up `TASK-211` remains separate.

## Fresh precommit checks

| Check | Result |
| --- | --- |
| Validator syntax | `node --check scripts/validate-rendered-docs.mjs` exited `0`. |
| Focused regression suite | Vitest passed `25/25` tests in one file. |
| VitePress configuration | `npm run validate:docs:config` exited `0`. |
| Existing rendered artifact | `npm run validate:docs:rendered` passed `1,005` routes, `144,097` internal references, `14,004` fragments, and one root favicon reference with zero failures. |
| Scoped lint and formatting | ESLint and Prettier exited `0`. |
| Whitespace | `git diff --check` exited `0`. |
| Generated API docs | `git diff -- docs/api` is empty. |

The full test, coverage, build, package, documentation, NodeNext, and deployment sequence is intentionally left to the push-triggered exact-head CI jobs rather than repeated locally.

## Protected state and limits

- Protected foreign `backlog/config.yml` remained unstaged and untouched with SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- No broad add, reset, clean, rebase, force push, hook bypass, tag movement, version bump, npm republish, credential read, dotenv read, or token-value read occurred.
- WB live API and sandbox calls are **NOT RUN**. The eight historical `NetworkError` reads remain failed attempts and do not establish successful live behavior.
- Fresh exact-head CI, Secret Scan, documentation deploy, final Pages build, `gh-pages` source marker, favicon response, and isolated public placeholder behavior remain delivery-phase gates after the commit is pushed.
