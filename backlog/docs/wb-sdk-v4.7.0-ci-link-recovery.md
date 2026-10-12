# SDK v4.7.0 release-note CI link recovery

Date: 2026-10-12 (Europe/Moscow)

## Trigger and bounded scope

The supplied remote-CI evidence identified one failure in main workflow run `38195381100`: the release notes linked to `blob/v4.7.0/CHANGELOG.md`, which returned HTTP 404 while creation of `v4.7.0` remained gated on green CI. The supplied evidence also states that documentation workflow run `38195381078` and the secret scan passed. This recovery does not reclassify or independently rerun those remote jobs.

The correction changes only the `CHANGELOG.md` target in `backlog/docs/wb-sdk-v4.7.0-release-notes.md`, from the not-yet-created tag to the already pushed immutable source revision `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`. No validator exclusion, CI rule, source, package metadata, generated documentation, or release identity changed.

## Immutable source proof

- Local `HEAD`: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Read-only `origin/main`: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Current worktree `CHANGELOG.md` Git blob: `f0f547630043e287ea7e66f7a92eafd9251b320f`.
- `HEAD:CHANGELOG.md` Git blob: `f0f547630043e287ea7e66f7a92eafd9251b320f`.
- `f7fc0e2de8f35e107d68d0f149ae17631184d3fe:CHANGELOG.md` Git blob: `f0f547630043e287ea7e66f7a92eafd9251b320f`.
- Current and pinned `CHANGELOG.md` SHA-256: `1fa7ef89aadaa2fdf71f630761dbc09061aa6c327cbeb3692a5c35ee20bd7dd3`.

The current file, current `HEAD`, pushed branch tip, and pinned link therefore identify the same `CHANGELOG.md` bytes.

## Exact change identities

- Frozen pushed commit: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Frozen pushed commit tree: `9421d8407658f70594f93a34f192182f4a0f401e`.
- Accepted source tree: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`.
- Generated documentation tree: `2a544ff690a5a97f22940ca3e23de6ba29bcc0f4`.
- `package.json` Git blob: `4905d089e6ac338170ce35d517895196947d6354`.
- `package-lock.json` Git blob: `9b2a34e5eaf58bd65f474eca04b7ce66f5ce162e`.
- Corrected release-notes SHA-256: `402b558dedb57cc310f9eceaad458495a2706b0e0899703bfeb1c2a829f5ac0b`.
- Corrected release-notes Git blob: `0478fd776e997260538730ca167f21b956d1effa`.
- Canonical release-notes-only worktree patch SHA-256: `2cd1eb0dda5487901ee0120d4f064589feaf0fb932aefaf0b6f8a161b48a224f`.
- Protected `backlog/config.yml` SHA-256: `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.

The canonical patch identity uses:

```sh
LC_ALL=C git diff --binary --full-index --no-ext-diff --no-textconv HEAD -- backlog/docs/wb-sdk-v4.7.0-release-notes.md | shasum -a 256
```

## Verification

- Before correction, `curl -sS -L` against the tag-gated target returned HTTP `404`.
- After correction, `curl -sS -L` against the pinned target returned HTTP `200`.
- `git diff --check -- backlog/docs/wb-sdk-v4.7.0-release-notes.md`: PASS.
- `npx prettier --check` for the release notes, this receipt, and task 237: PASS; all three files use Prettier style.
- `npm run validate:links`: PASS; `1,656/1,656` Markdown files checked, `192` links reported, `0` broken links.
- `git diff --quiet HEAD -- src docs package.json package-lock.json scripts .github .markdown-link-check.json`: PASS with exit `0`; API/source, package metadata, generated documentation, validator implementation/configuration, and CI workflows have no worktree delta from the frozen pushed commit.
- Owned release-notes `git diff --check`: PASS with exit `0`.

The full link validator recursively enumerates non-hidden Markdown files from the repository root, skips hidden directories plus `node_modules` and `dist`, and runs `markdown-link-check` in batches of 100 using `.markdown-link-check.json`. It performs external HTTP checks for URLs outside the configured ignore patterns. The pre-existing immutable-GitHub-blob ignore pattern matches the corrected SHA-pinned target, so the full validator does not request that one URL; the dedicated `curl` check above supplies its direct HTTP `200` evidence. No ignore pattern or validator behavior was changed.

## Publication boundary

This recovery performs no commit, push, tag, GitHub Release, npm publish, Pages deployment, credential or dotenv read, WB API call, or sandbox read/write. A later authorized delivery lane must rerun remote CI and retain the tag/publication gates. Local link and formatting results establish only the bounded documentation correction described here.
