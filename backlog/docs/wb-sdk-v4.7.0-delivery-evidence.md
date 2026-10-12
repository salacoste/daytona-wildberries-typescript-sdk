# WB SDK v4.7.0 Delivery Evidence

## Delivery status

**BLOCKED** — the accepted release candidate was committed and pushed to `origin/main`, but exact-head CI failed on a circular pre-tag documentation link. Publication remains stopped until the independent recovery change is completed, reviewed and frozen, committed and pushed, and exact-head CI passes.

## Pushed release candidate

- Pushed commit: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`
- Commit tree: `9421d8407658f70594f93a34f192182f4a0f401e`
- Parent and source commit: `1fc8230122b571d1635d0133aaabce64876925c6`
- Commit message: `feat(release): v4.7.0 — docs navigation and NodeNext validation`
- Evidence-inclusive patch SHA-256 relative to the parent: `14bca436fd5b9b6dc602728ef1739072f2377de9e2ac68708e8818698ac161e5`
- Evidence-inclusive commit paths: 873

The pre-push `origin/main` head was `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`, and it was verified as an ancestor of the local delivery head before push. The guarded push succeeded. Remote `main` then resolved to `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.

Normal pre-commit hooks were used and passed:

- Root TypeScript type-check: passed.
- Local staged gitleaks scan: passed with no leaks.
- Hooks were not bypassed.

The push reported an administrative branch-rule bypass while the required `gitleaks` check was pending. The corresponding Secret Scan workflow subsequently completed successfully, as recorded below.

## Reviewed product identity

The product candidate reviewed and accepted before the evidence-only files were added had this identity:

- Product index tree: `0200074e0ed3aee160ebaee56ba2e97287294f2a`
- Product binary patch SHA-256: `ac809dafe04d2350dda6819f545995192031271e71a46b88422c789b0cd129ac`
- Product paths: 871
- Baseline and candidate source tree: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`
- Generated source references: 4,486, all pinned to `1fc8230122b571d1635d0133aaabce64876925c6`
- Review verdict: `ACCEPT`

## Evidence-only delta

The accepted product tree was extended only by these two evidence files when the release commit was created:

- `backlog/docs/wb-sdk-v4.7.0-candidate-manifest-v2.md`
  - SHA-256: `898e95aa7490c79834e5b0f01489087e0b9f03327446dfa64fbed104cd7115d4`
- `backlog/docs/wb-sdk-v4.7.0-exact-candidate-review-v2.md`
  - Verdict: `ACCEPT`
  - SHA-256: `d8b6e99f1292027bfa8c86995f97d4b8d898d749cdccef28fff5b1a4fec4ab9d`

## Exact-head workflow evidence

Every workflow result in this receipt targets exact delivery head `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.

### CI/CD — failed

- Run: [38195381100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38195381100)
- Result: `failure`

The Node 22 job failed in `Validate documentation links`:

- Job: [Node 22](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38195381100/job/114636752911)
- Broken URL: `https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/v4.7.0/CHANGELOG.md`
- HTTP status: `404`
- Source: `backlog/docs/wb-sdk-v4.7.0-release-notes.md:22`
- Link-validation scope: 1,291 Markdown files and 175 links, with exactly one broken link.

The failure was caused by a circular pre-tag dependency: the release notes linked to the `v4.7.0` tag, while tag creation was gated on successful CI.

Matrix consequences:

- [Node 20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38195381100/job/114636752494): `cancelled` by matrix fail-fast after the Node 22 failure.
- [Node 24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38195381100/job/114636752425): `cancelled` by matrix fail-fast after the Node 22 failure.
- [CI/CD Deploy Documentation](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38195381100/job/114637085005): `skipped` because CI failed.

### Documentation Deploy — passed

- Run: [38195381078](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38195381078)
- Result: `success`
- VitePress build, documentation validation, and GitHub Pages deployment passed.
- Independent verification of the public Pages routes remains pending.

### Secret Scan — passed

- Run: [38195381148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38195381148)
- Result: `success`
- Required job: `gitleaks`
- The branch-protection-required secret scan passed.

## Publication state

Publication stopped after exact-head CI failed. The following actions are **NOT RUN**:

- Annotated `v4.7.0` tag creation.
- Tag push.
- GitHub Release creation.
- npm OIDC Trusted Publishing workflow.
- npm provenance verification.
- npm public artifact verification.
- Independent public Pages route verification.
- WB live API calls.
- WB sandbox writes.

Before the failed run, release vacancy was verified: no local or remote `v4.7.0` tag existed, no GitHub Release named `v4.7.0` existed, and npm returned E404 for `daytona-wildberries-typescript-sdk@4.7.0`.

The tag must not be created early to make the link pass. The recovery replaces the circular tag URL with a URL pinned to the already-pushed immutable commit.

## Recovery ownership

The independent recovery executor `/root/release_ci_link_fix` exclusively owns:

- The one-line link correction in `backlog/docs/wb-sdk-v4.7.0-release-notes.md`.
- A new atomic Backlog recovery task.
- `backlog/docs/wb-sdk-v4.7.0-ci-link-recovery.md`.

The intended replacement URL is:

`https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f7fc0e2de8f35e107d68d0f149ae17631184d3fe/CHANGELOG.md`

That recovery lane is responsible for proving HTTP 200, validating formatting, running the complete existing `npm run validate:links`, and leaving its changes for independent review and freeze.

## Protected foreign state

`backlog/config.yml` is foreign, protected, and must remain unstaged. Its protected SHA-256 is:

`bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`

This delivery receipt is also intentionally local and unstaged.

## Stop condition

This delivery lane remains **BLOCKED** until all of the following are true:

1. The independent recovery change is complete.
2. The recovery candidate is independently reviewed and frozen.
3. The accepted recovery is committed and pushed.
4. CI passes against the resulting exact remote head.

Only after that gate passes may the release process reassess tag, GitHub Release, npm Trusted Publishing, provenance, public artifact, and public documentation verification steps.
