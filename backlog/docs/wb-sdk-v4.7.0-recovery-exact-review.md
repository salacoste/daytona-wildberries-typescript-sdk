# WB SDK v4.7.0 recovery exact-index review

Date: 2026-10-12 (Europe/Moscow)

Freeze completion supplied by the coordinator: `2026-10-12T02:42:08.741Z`.

## Verdict

**ACCEPT**

The frozen four-path recovery index matches the external recovery manifest exactly by path, status, mode, Git blob, and SHA-256. Its independently reconstructed tree and canonical binary patch identities match the frozen identities. The product change is exactly one release-note hyperlink target, and the pinned immutable target returns HTTP 200 while resolving to the same `CHANGELOG.md` bytes as current `HEAD`.

Severity summary:

- CRITICAL: 0
- HIGH: 0
- MEDIUM: 0
- LOW: 0

This verdict applies only to the exact frozen recovery index identified below. It does not authorize or establish a commit, push, tag, GitHub Release, npm publication, provenance result, Pages deployment, or final exact-head CI success.

## Review scope

Staged paths reviewed: 4.

1. `backlog/docs/wb-sdk-v4.7.0-ci-link-recovery.md`
2. `backlog/docs/wb-sdk-v4.7.0-delivery-evidence.md`
3. `backlog/docs/wb-sdk-v4.7.0-release-notes.md`
4. `backlog/tasks/task-237 - Repair-v4.7.0-release-note-CHANGELOG-link.md`

Read-only reference evidence included the external recovery manifest, task 236, the v2 exact-candidate ACCEPT receipt, the v4.7.0 release evidence, the local Git identities, and public unauthenticated GitHub workflow metadata. This review report is intentionally outside the frozen index.

## Exact frozen identity

- Baseline and current `HEAD`: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Read-only local `origin/main`: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Baseline commit tree: `9421d8407658f70594f93a34f192182f4a0f401e`.
- Frozen index tree: `bd60321793910d5951c2f3ff4967472f0261e733`.
- Independently reconstructed index tree from all 4,035 stage-0 `git ls-files -s -z` entries: `bd60321793910d5951c2f3ff4967472f0261e733`.
- Read-only `git diff-index --cached --quiet bd60321793910d5951c2f3ff4967472f0261e733 --`: exit `0`.
- Canonical full-index binary patch SHA-256 relative to the baseline: `8be75bd6243f51e46ca5e93d13b1b54128b4e2a49a2c1dc7a69687bbb4ee7d09`.
- Frozen staged paths: 4.

The recursive tree reconstruction calculated canonical Git tree entry ordering and object hashing entirely in memory from the index entries. It did not run `git write-tree` or write any Git object.

The canonical patch identity was recomputed with:

```sh
LC_ALL=C git diff --cached --binary --full-index --no-ext-diff --no-textconv f7fc0e2de8f35e107d68d0f149ae17631184d3fe -- | shasum -a 256
```

No raw index-file hash was used as a gate.

## Four-path manifest verification

| Status | Mode | Path | Git blob | SHA-256 |
| --- | --- | --- | --- | --- |
| `A` | `100644` | `backlog/docs/wb-sdk-v4.7.0-ci-link-recovery.md` | `c54bdf88af5b2fc0000793d12e101e3234a52da3` | `bf2cba886dc02eab59c0a88bb13ba7101bdc40cce07696b1eabe5fa7ae44a833` |
| `A` | `100644` | `backlog/docs/wb-sdk-v4.7.0-delivery-evidence.md` | `334e2b38bc3c2ef3779c92052a4416bb5aa0c6af` | `e2b1fdf96f849d8da3708c997f07a4b0cef48a86d2601c799a15397502f67cbf` |
| `M` | `100644` | `backlog/docs/wb-sdk-v4.7.0-release-notes.md` | `0478fd776e997260538730ca167f21b956d1effa` | `402b558dedb57cc310f9eceaad458495a2706b0e0899703bfeb1c2a829f5ac0b` |
| `A` | `100644` | `backlog/tasks/task-237 - Repair-v4.7.0-release-note-CHANGELOG-link.md` | `b5d60d6f25cf305d23c90fbb6c6932b9f6cc03e8` | `ff3a3113657e5a483a371a0ef935d7d59b92d1bbe787e037be1188ea68273e0a` |

The four entries match `backlog/docs/wb-sdk-v4.7.0-recovery-manifest.md` exactly as a set. The manifest presents the release-note row first, while Git's name-status output is lexical; this presentation order has no identity significance.

## Stage 1 — specification compliance

Task 237 is `Done`, all four acceptance criteria are checked, and its completed state is supported by the frozen content:

1. The release-note product delta is exactly one line: the not-yet-created `v4.7.0` tag URL is replaced by the already pushed immutable commit URL.
2. A fresh dedicated GET of `https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f7fc0e2de8f35e107d68d0f149ae17631184d3fe/CHANGELOG.md` followed redirects and returned HTTP `200`.
3. Worktree `CHANGELOG.md`, `HEAD:CHANGELOG.md`, and `f7fc0e2de8f35e107d68d0f149ae17631184d3fe:CHANGELOG.md` all resolve to Git blob `f0f547630043e287ea7e66f7a92eafd9251b320f` and SHA-256 `1fa7ef89aadaa2fdf71f630761dbc09061aa6c327cbeb3692a5c35ee20bd7dd3`.
4. The accepted `src/` tree remains `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`.
5. `src/`, generated `docs/`, `package.json`, `package-lock.json`, `scripts/`, `.github/`, and `.markdown-link-check.json` have neither staged nor worktree changes from the baseline.
6. The protected foreign `backlog/config.yml` remains the sole unstaged tracked change and has SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.

The root-cause guard passes. The correction removes the circular pre-tag dependency at its source by linking to the immutable pushed commit that contains the same CHANGELOG bytes. It does not suppress the validator, add an ignore, swallow a failure, return a silent default, or route through a broad fallback.

## Historical delivery receipt assessment

The staged delivery receipt is a truthful historical record of the delivery lane's blocked state and remains correctly **BLOCKED** at this review point. Public unauthenticated GitHub metadata independently confirmed that all three recorded workflows targeted exact head `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`:

- CI/CD run `38195381100`: completed with `failure`.
- Documentation Deploy run `38195381078`: completed with `success`.
- Secret Scan run `38195381148`: completed with `success`.
- CI job `114636752911` for Node 22: `failure`.
- CI jobs `114636752494` for Node 20 and `114636752425` for Node 24: `cancelled`.
- CI documentation deployment job `114637085005`: `skipped`.

Task 237 now establishes that the local recovery is complete, but the accepted recovery has not been committed and pushed and no exact-head CI run for that future commit exists. Therefore the receipt's overall `BLOCKED` conclusion and publication stop remain accurate. Its statement that the receipt was local and unstaged describes the historical delivery-lane snapshot; the current recovery manifest is the authoritative record that this historical receipt is now one of the four frozen staged paths.

Task 236 correctly remains `In Progress`. Its publication, tag, provenance, exact-head CI, public artifact, Pages, and live-runtime acceptance criteria remain open.

## Stage 2 — quality and security

- `git diff --cached --check`: exit `0`.
- Staged-content Prettier comparison: PASS for all four reviewed Markdown files.
- Targeted credential-shaped pattern scan of the canonical staged diff: PASS; no API key, GitHub token, npm token, bearer credential, or private-key material was detected.
- No source code, executable configuration, dependency, package metadata, CI policy, or validator policy changed.
- No broad fallback, empty catch, logging statement, hardcoded secret, or alternate execution path was introduced.

No Markdown-capable `lsp_diagnostics` or AST-grep tool was exposed in this leaf review surface. Because the frozen changes are Markdown-only and the only product delta is a URL string, staged-content Prettier comparison, whitespace validation, exact blob hashing, direct HTTP verification, credential-pattern review, and manual content inspection provide the relevant static coverage. This tool-availability gap does not leave a TypeScript or runtime code surface unchecked because none changed.

## Validation boundaries

The completed task 237 and hash-matched recovery receipt record a prior full link-validator result of `1,656/1,656` Markdown files, `192` reported links, and `0` broken links. This review did not repeat that unchanged full validator, the full test suite, a build, or package validation. Fresh review checks were limited to the exact-index identities, four-path manifest, staged formatting and whitespace, source/protected-scope preservation, CHANGELOG byte equality, the dedicated HTTP 200 request, public workflow metadata, and focused security inspection.

The existing validator's immutable-GitHub-blob exclusion means its recorded aggregate pass does not itself prove the corrected pinned URL's live status. The fresh dedicated HTTP request supplies that proof.

The following remain **NOT RUN** in this review:

- Git commit, stage mutation, push, tag, or GitHub Release creation.
- npm publish, Trusted Publishing, provenance, or public package verification.
- GitHub Pages deployment or final public-route verification.
- WB live API calls or sandbox reads/writes.
- Credential, dotenv, token, or private customer-data reads.
- Full link validator, full tests, build, and package validation repetition.

## Recommendation

**ACCEPT** the exact frozen recovery index identified by tree `bd60321793910d5951c2f3ff4967472f0261e733` and canonical patch SHA-256 `8be75bd6243f51e46ca5e93d13b1b54128b4e2a49a2c1dc7a69687bbb4ee7d09` for the code/spec/security lane.

The next delivery lane must preserve these identities through its guarded commit/push flow and require fresh exact-head CI before any tag or publication step. Task 236 must remain open until its remaining acceptance criteria have direct evidence.
