# WB SDK v4.7.0 recovery freeze manifest

Date: 2026-10-12 (Europe/Moscow)

## Frozen recovery identity

- Baseline local `HEAD`: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Baseline read-only `origin/main`: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Baseline remote `main`: `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`.
- Baseline commit tree: `9421d8407658f70594f93a34f192182f4a0f401e`.
- Frozen recovery index tree: `bd60321793910d5951c2f3ff4967472f0261e733`.
- Canonical full-index binary patch SHA-256 relative to the baseline: `8be75bd6243f51e46ca5e93d13b1b54128b4e2a49a2c1dc7a69687bbb4ee7d09`.
- Frozen paths: 4.

The canonical patch identity uses:

```sh
LC_ALL=C git diff --cached --binary --full-index --no-ext-diff --no-textconv f7fc0e2de8f35e107d68d0f149ae17631184d3fe -- | shasum -a 256
```

## Complete four-path manifest

| Status | Mode | Path | Git blob | SHA-256 |
| --- | --- | --- | --- | --- |
| `M` | `100644` | `backlog/docs/wb-sdk-v4.7.0-release-notes.md` | `0478fd776e997260538730ca167f21b956d1effa` | `402b558dedb57cc310f9eceaad458495a2706b0e0899703bfeb1c2a829f5ac0b` |
| `A` | `100644` | `backlog/docs/wb-sdk-v4.7.0-ci-link-recovery.md` | `c54bdf88af5b2fc0000793d12e101e3234a52da3` | `bf2cba886dc02eab59c0a88bb13ba7101bdc40cce07696b1eabe5fa7ae44a833` |
| `A` | `100644` | `backlog/docs/wb-sdk-v4.7.0-delivery-evidence.md` | `334e2b38bc3c2ef3779c92052a4416bb5aa0c6af` | `e2b1fdf96f849d8da3708c997f07a4b0cef48a86d2601c799a15397502f67cbf` |
| `A` | `100644` | `backlog/tasks/task-237 - Repair-v4.7.0-release-note-CHANGELOG-link.md` | `b5d60d6f25cf305d23c90fbb6c6932b9f6cc03e8` | `ff3a3113657e5a483a371a0ef935d7d59b92d1bbe787e037be1188ea68273e0a` |

The release-note product delta is one hyperlink target: the not-yet-created `v4.7.0` tag reference is replaced by immutable commit `f7fc0e2de8f35e107d68d0f149ae17631184d3fe`. Current `CHANGELOG.md`, `HEAD:CHANGELOG.md`, and the pinned revision all resolve to Git blob `f0f547630043e287ea7e66f7a92eafd9251b320f` and SHA-256 `1fa7ef89aadaa2fdf71f630761dbc09061aa6c327cbeb3692a5c35ee20bd7dd3`.

## Preservation checks

- Accepted `src/` tree: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`; unchanged from the baseline.
- `src/`, generated `docs/`, `package.json`, `package-lock.json`, `scripts/`, `.github/`, and `.markdown-link-check.json` have no staged or worktree delta from the baseline.
- Protected foreign `backlog/config.yml` remains unstaged with SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- `git diff --cached --check` passed.
- No full test suite was rerun for this freeze-only lane; completed task 237 and its recovery receipt retain the targeted verification evidence.

## Boundary

This manifest is intentionally outside the frozen index. This lane performed no commit, push, tag, GitHub Release, npm publish, documentation deployment, WB API call, or sandbox write.
