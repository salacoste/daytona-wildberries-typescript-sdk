# WB SDK v4.7.0 documentation UX postcommit receipt

Completed at `2026-10-12T04:01:57Z` (`2026-10-12 07:01:57 MSK`).

## Verdict

**PASS — the exact accepted documentation UX candidate was committed, pushed without force, validated by exact-head CI and Secret Scan, deployed to GitHub Pages, and verified against the public site in a fresh isolated browser session.**

This receipt is intentionally repository-ignored and unstaged. The committed precommit record remains `backlog/docs/wb-sdk-v4.7.0-docs-ux-delivery.md`. `TASK-236` and `TASK-238` remain **In Progress** and were not mutated after review.

## Git identity

- Commit: `c58c1f230720db6470b2cba2a6b0e19d1f933777`.
- Parent: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Commit tree: `e64e792d7658b232708fbb62a3b51a05abae66c8`.
- Commit subject: `fix(docs): repair public Russian API UX`.
- Changed paths: `27`.
- Canonical full-index binary commit patch SHA-256 relative to the parent: `5a4faadf9fd955c546c5d3a637bcec5d800ea37993d487de10b896f6f30776e8`.
- Precommit delivery-record SHA-256: `d642b4bdeb368f79e50a40fdefb089038497a1196297cb524d42cf4410eb8932`.
- Accepted 23-path candidate tree reproduced before staging: `0f8c904af4384bdbcf423a7f170182f3a660cbe6`.
- Accepted 23-path candidate binary patch SHA-256: `f87b9a8512fe69019205306a093cb30a2cf76c5ccab2cca0937c0cc8e4eaaeef`.
- SDK `src/` tree in the delivery commit: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`, unchanged from the accepted release.

The normal commit hook passed the repository TypeScript check and staged gitleaks scan. The push was a guarded nonforce fast-forward from the verified remote parent. GitHub reported the expected temporary bypass of the required `gitleaks` status because the new exact-head run had not completed at push time; the exact-head Secret Scan below then passed.

## Final remote refs and Pages source

- Remote `main`: `c58c1f230720db6470b2cba2a6b0e19d1f933777`.
- Remote `gh-pages`: `092f5446c50bda5cb77bd4d4fd23d312a2888af5`.
- `gh-pages` parent: `21f0072681d5a5f5535abd48817faac8c7603222`.
- `gh-pages` tree: `cd0cf7e25f85a10fa94e2f3dd0baf1e9d8b7e025`.
- `gh-pages` source marker: `docs: deploy v4.7.0 - c58c1f230720db6470b2cba2a6b0e19d1f933777 c58c1f230720db6470b2cba2a6b0e19d1f933777`.
- Annotated `v4.7.0` tag object: `b62c3d6ee97c2d58db6934917b674199ea138791`.
- Peeled `v4.7.0` release target: `265292a0e17d35c82d821297c57856e4537b60cd`, unchanged.

The standalone documentation workflow created the final `gh-pages` commit. The later CI-owned deploy completed successfully with byte-identical output and did not advance `gh-pages`, so the final source remains `092f5446...` and its successful Pages build remains the final build for this content.

## Exact-head workflow evidence

All source workflows below target `c58c1f230720db6470b2cba2a6b0e19d1f933777` and completed successfully.

| Workflow or job | Identity | Result |
| --- | --- | --- |
| CI/CD | run `38201377429` | `completed/success` |
| CI Node 20 | job `114655320982` | `success`; full test, coverage, build, documentation, rendered-site, and NodeNext sequence passed |
| CI Node 22 | job `114655320880` | `success`; test, coverage, and build sequence passed |
| CI Node 24 | job `114655320761` | `success`; test, coverage, and build sequence passed |
| CI documentation deploy | job `114656678389` | `success`; artifact download, VitePress build, rendered validation, and Pages push passed |
| Documentation Deploy | run `38201377475` | `completed/success` |
| Standalone documentation deploy | job `114655320958` | `success`; generated API docs, VitePress build, rendered validation, and Pages push passed |
| Secret Scan | run `38201377406` | `completed/success` |
| gitleaks | job `114655320587` | `success` |

The only CI annotations were existing GitHub runner notices for the Node 20 action-runtime deprecation and the future `ubuntu-latest` migration.

## Final Pages build

- Pages run: `38201520683`, `completed/success`.
- Pages head: `092f5446c50bda5cb77bd4d4fd23d312a2888af5` on `gh-pages`.
- Build job: `114655764533`, `success`.
- Build-status job: `114655810637`, `success`.
- Deploy job: `114655810728`, `success`.

## Fresh isolated public proof

Browser proof used `playwright-cli 0.1.22` in a new in-memory session named `v470-docs-ux-delivery`. The session did not attach to a user browser, reported no cookies, and produced no console errors or warnings on the representative hydrated page.

All 16 repaired public Russian API routes were opened and inspected after the Pages run completed. Every route:

- returned HTTP `200`;
- rendered `Автоматический переход не выполняется.` inside the VitePress document body;
- exposed an explicit English API target under `/daytona-wildberries-typescript-sdk/api/`;
- contained no literal `<script setup>` text in the rendered document body.

The deployed favicon proof returned:

- URL: `https://salacoste.github.io/daytona-wildberries-typescript-sdk/favicon.svg`;
- HTTP status: `200`;
- content type: `image/svg+xml`;
- byte length: `500`;
- SHA-256: `1d009aec81ddc1b1f01e1d6af4e05507e430f8e70a47163e451083b24fc7571e`, byte-identical to the accepted source asset.

## Protected state, cleanup, and limits

- Protected foreign `backlog/config.yml` remains the only tracked worktree change, is unstaged, and retains SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- The browser session was closed, reported no persistent user data, and its owned snapshot was removed. `playwright-cli list` reports no open browsers.
- The real Git index is empty. No temporary index, browser profile, generated API-doc diff, or owned untracked product file remains.
- This ignored receipt is the only retained local delivery artifact from the postcommit lane.
- No reset, clean, rebase, force push, hook bypass, tag movement, version bump, npm republish, dependency change, credential read, dotenv read, or token-value read occurred.
- WB live API and sandbox calls are **NOT RUN**. The eight historical `NetworkError` reads remain failed attempts. No exhaustive all-Wildberries-through-`2026-10-12` claim is made.
- The accepted bounded scope remains the September evidence through `2026-09-24` inclusive, the nine supplied October announcements, Returns pagination, and NodeNext/documentation behavior. Future `TASK-209`, `TASK-214`, `TASK-223`, and credential follow-up `TASK-211` remain separate.
