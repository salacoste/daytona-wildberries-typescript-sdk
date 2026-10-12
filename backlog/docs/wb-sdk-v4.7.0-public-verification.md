# WB SDK v4.7.0 independent public verification

Verified at: `2026-10-12T03:22:21Z` (`2026-10-12 06:22:21 MSK`)

## Verdict

**PASS — the public `v4.7.0` GitHub release, npm artifact and provenance, and GitHub Pages deployment satisfy the bounded release acceptance gates.**

This verdict is based on newly fetched public GitHub, npm registry, Sigstore, GitHub Actions, GitHub Pages, and isolated consumer/browser evidence. It does not treat the local source build or a local repack as proof of the published artifact. No WB API, WB sandbox, credential, dotenv, token-value, SDK constructor, or SDK method call was used.

The verifier did not modify source/product files, Git refs, task state, the index, or the publication receipt. `TASK-236` remains for its owner to update or close.

## Public Git and GitHub Release identity

### Result: PASS

- Public repository: `salacoste/daytona-wildberries-typescript-sdk`.
- `refs/heads/main`: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Annotated `refs/tags/v4.7.0` object: `b62c3d6ee97c2d58db6934917b674199ea138791`.
- Peeled tag target: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Release: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/releases/tag/v4.7.0>.
- Release state: published, `draft=false`, `prerelease=false`, published at `2026-10-12T03:03:17Z`.
- `releases/latest` resolves to the same `v4.7.0` release.
- Public commit tree: `564f2fc520d83400b715130b62322bb8149bd7ac`.
- Accepted SDK `src/` tree within that public commit: `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`.
- The accepted ancestor `1fc8230122b571d1635d0133aaabce64876925c6` is public. GitHub Compare reports `status=ahead`, `ahead_by=2`, `behind_by=0`, and merge base `1fc8230122b571d1635d0133aaabce64876925c6` for the range to the release head.
- The ancestor's public `src/` tree is also `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`, proving source-tree equality through the two evidence/recovery commits.

Representative public checks:

```text
git ls-remote https://github.com/salacoste/daytona-wildberries-typescript-sdk.git \
  refs/heads/main refs/tags/v4.7.0 'refs/tags/v4.7.0^{}'

265292a0e17d35c82d821297c57856e4537b60cd refs/heads/main
b62c3d6ee97c2d58db6934917b674199ea138791 refs/tags/v4.7.0
265292a0e17d35c82d821297c57856e4537b60cd refs/tags/v4.7.0^{}
```

The GitHub Git Data API identifies `b62c3d6...` as `type=tag` and its target as `type=commit`, so this is an annotated tag rather than a lightweight tag. GitHub reports the tag object itself as unsigned. A signed Git tag was not an acceptance requirement; npm provenance is verified separately below.

Public identity links:

- Release head: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/commit/265292a0e17d35c82d821297c57856e4537b60cd>
- Accepted ancestor: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/commit/1fc8230122b571d1635d0133aaabce64876925c6>
- Ancestry comparison: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/compare/1fc8230122b571d1635d0133aaabce64876925c6...265292a0e17d35c82d821297c57856e4537b60cd>

## Exact-head CI, security, publication, and Pages workflows

### Result: PASS

Fresh public GitHub Actions API reads produced:

| Workflow | Public run | Head | Result |
| --- | --- | --- | --- |
| CI/CD | [38197588069](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38197588069) | `265292a0e17d35c82d821297c57856e4537b60cd` on `main` | `completed/success` |
| Secret Scan | [38197588038](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38197588038) | `265292a0e17d35c82d821297c57856e4537b60cd` on `main` | `completed/success` |
| Publish to npm | [38198236993](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198236993) | `265292a0e17d35c82d821297c57856e4537b60cd` at `v4.7.0` | `completed/success` |
| Pages build and deployment | [38198164020](https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198164020) | `21f0072681d5a5f5535abd48817faac8c7603222` on `gh-pages` | `completed/success` |

The CI job list independently confirms:

- `CI (Node 20.x)` job `114643628708`: success; lint, type checking, docs links/examples, tests, build, package artifacts, documentation build, rendered docs/NodeNext validation, and docs artifact upload succeeded.
- `CI (Node 22.x)` job `114643628677`: success.
- `CI (Node 24.x)` job `114643628380`: success.
- `Deploy Documentation` job `114644947158`: success.
- `gitleaks` job `114643628553`: success.
- npm `publish` job `114645614212`: success; the public step list shows checkout, Node setup, npm OIDC upgrade, dependency install, and publish all succeeded.

No local repetition of the full CI suite was performed. These are the published exact-head workflow results, supplemented by the public-artifact-specific checks below.

## npm registry metadata and tarball identity

### Result: PASS

Public registry metadata at verification time:

- Package: `daytona-wildberries-typescript-sdk@4.7.0`.
- `dist-tags.latest`: `4.7.0`.
- `gitHead`: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Published: `2026-10-12T03:06:23.696Z`.
- Registry tarball: <https://registry.npmjs.org/daytona-wildberries-typescript-sdk/-/daytona-wildberries-typescript-sdk-4.7.0.tgz>.
- Registry file count: `193`.
- Registry unpacked size: `5,180,261` bytes.
- Downloaded tarball size: `988,029` bytes.
- Registry SHA-1: `b74e32228ddffa92328337155c8b32cc2ca357e4`.
- Downloaded SHA-1: `b74e32228ddffa92328337155c8b32cc2ca357e4`.
- Registry integrity: `sha512-v7TBUvRo3ORkVwpqSEcjl3eRaoODGEVTMnc2715l8hOVFclwaFULHRGPvZvDlu8YjgG9QxpC6p+YPZGEzwVYpw==`.
- Downloaded SHA-512 base64: `v7TBUvRo3ORkVwpqSEcjl3eRaoODGEVTMnc2715l8hOVFclwaFULHRGPvZvDlu8YjgG9QxpC6p+YPZGEzwVYpw==`.
- Downloaded SHA-512 hex: `bfb4c152f468dce464570a6a4847239777916a8383184553327736ef5e65f2139515c97068550b1d118fbd9bc396ef188e01bd431a42ea9f983d9184cf0558a7`.
- Independent SHA-256 for the downloaded bytes: `574b3c19bccf5e1331b987ed531149d271de618a000ae57d4949d12ec833020e`.
- `tar -tzf ... | wc -l`: `193`.

The actual registry tarball exposes exactly five package export keys:

1. `.`
2. `./finances`
3. `./analytics`
4. `./communications`
5. `./reports`

Each key has `types`, `import`, and `require` conditions. The installed public artifact resolved every target.

## Isolated published-package consumers

### Result: PASS

A fresh temporary consumer used a fresh temporary npm cache and ran:

```text
npm install --ignore-scripts --no-audit --no-fund \
  --cache <owned-temporary-cache> \
  daytona-wildberries-typescript-sdk@4.7.0
```

The install added `29` packages and `npm ls --depth=0 --json` resolved the target to `4.7.0` from the public registry tarball URL. No project dependency or global npm configuration changed.

Runtime smokes loaded exports only and never constructed the SDK or a module and never called an SDK method:

```text
ESM export loads PASS: ., ./finances, ./analytics, ./communications, ./reports
CommonJS export loads PASS: ., ./finances, ./analytics, ./communications, ./reports
```

Strict TypeScript validation used `module=NodeNext`, `moduleResolution=NodeNext`, `target=ES2022`, `strict=true`, `skipLibCheck=false`, and `noEmit=true`:

- The existing five-export `package-consumer-fixtures/news-public-types.mts` fixture compiled against the installed public package.
- The existing five-export `package-consumer-fixtures/news-public-types.cts` fixture compiled against the installed public package.
- Exact byte copies of `tests/fixtures/docs/nodenext/consumer.mts` and `consumer.cts` were compared with `cmp`, then compiled against the installed public package under the same strict NodeNext flags.

All four compiles exited `0` with no diagnostics. This is compile-only evidence for examples and type surfaces. It is not a live WB runtime test.

## npm registry signatures and provenance

### Result: PASS

`npm audit signatures --json --include-attestations` ran in the fresh isolated consumer using npm `12.2.0`. The result contained:

- exactly one verified target record for `daytona-wildberries-typescript-sdk@4.7.0`;
- one separately identified dependency attestation record, `axios@1.20.0`;
- `invalid=[]`;
- `missing=[]`.

The target SDK result is therefore isolated from the dependency result. The verified target record contains two Sigstore bundles:

1. npm publish attestation, transparency-log index `3219790837`;
2. SLSA provenance v1, transparency-log index `3219759843`.

Official public evidence:

- npm attestations endpoint: <https://registry.npmjs.org/-/npm/v1/attestations/daytona-wildberries-typescript-sdk@4.7.0> — HTTP 200 and two bundles.
- Provenance transparency log: <https://search.sigstore.dev/?logIndex=3219759843> — HTTP 200.
- Publish-attestation transparency log: <https://search.sigstore.dev/?logIndex=3219790837> — HTTP 200.
- GitHub Actions invocation: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198236993/attempts/1> — HTTP 200; public run conclusion `success`.
- Workflow at the attested source revision: <https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/265292a0e17d35c82d821297c57856e4537b60cd/.github/workflows/publish.yml>.

The cryptographically verified SLSA statement records:

- Subject: `pkg:npm/daytona-wildberries-typescript-sdk@4.7.0`.
- Subject SHA-512: `bfb4c152f468dce464570a6a4847239777916a8383184553327736ef5e65f2139515c97068550b1d118fbd9bc396ef188e01bd431a42ea9f983d9184cf0558a7`.
- Repository: `https://github.com/salacoste/daytona-wildberries-typescript-sdk`.
- Workflow path: `.github/workflows/publish.yml`.
- Workflow ref: `refs/tags/v4.7.0`.
- Git commit: `265292a0e17d35c82d821297c57856e4537b60cd`.
- Event: `release`.
- Builder: `https://github.com/actions/runner/github-hosted`.
- Invocation: `https://github.com/salacoste/daytona-wildberries-typescript-sdk/actions/runs/38198236993/attempts/1`.

The provenance subject digest exactly equals the SHA-512 of the independently downloaded registry tarball. The workflow file fetched from the attested commit has SHA-256 `e992245f94690acdb69d075706a7357b6315e80257dd1425fdd58ca8677709bc` and contains `npm publish --provenance --access public`, with `id-token: write`.

## GitHub Pages source identity

### Result: PASS

- Public `refs/heads/gh-pages`: `21f0072681d5a5f5535abd48817faac8c7603222`.
- Public `gh-pages` commit message: `docs: deploy v4.7.0 - 265292a0e17d35c82d821297c57856e4537b60cd 265292a0e17d35c82d821297c57856e4537b60cd`.
- Public `gh-pages` commit tree: `2bf915e97b92f04a0c87bc5043459f297b891c0a`.
- Pages workflow run `38198164020`: `completed/success` for `gh-pages` commit `21f0072...`; public build and deploy jobs both succeeded.
- Exact-head main workflow run `38197588069` deployed the documentation after Node 20 CI. Its public workflow at source commit `265292a...` deploys `docs/.vitepress/dist` to `gh-pages` and embeds `github.sha` in the commit message. The fetched workflow SHA-256 is `5a6bd9b2a474a96b8d951122706a86dc2d136d0490878e3c5a096bd689c4e164`.

Eight bounded public route responses were compared byte-for-byte to the corresponding immutable files in `gh-pages` commit `21f0072...`. All eight matched:

| Public route | HTTP/title result | SHA-256 of matching public and `gh-pages` bytes |
| --- | --- | --- |
| `/` | 200 — `Wildberries TypeScript SDK` | `055d06d4336d7acc4fafd9856ad86974a6e3baf53f95c846c07d88b941f53f1b` |
| `/ru/` | 200 — `Wildberries TypeScript SDK` | `12fec8aeb18fb8fef52a37cd5e8b9961966d53f00e5637d149e7c9304c2bf5e0` |
| `/guides/` | 200 — `Guides \| Wildberries TypeScript SDK` | `e51acc402989330344f7c191702a17be32a87eba2a00ebe3c31183f8acc7d872` |
| `/ru/guides/` | 200 — `Руководства \| Wildberries TypeScript SDK` | `b009fae39bf873db57a9b2007ecded03b2d2114bc1d0187904a7c343da97958c` |
| `/guides/nodenext` | 200 — `NodeNext ESM and CommonJS \| Wildberries TypeScript SDK` | `411edacfa0c2854bcb30e1bc3e7ece6eef26056fb83170f31b59a5e736fe41ac` |
| `/ru/guides/nodenext` | 200 — `NodeNext — ESM и CommonJS \| Wildberries TypeScript SDK` | `827bc9de5837fe37a8f6b07350db0b76465d63759f9b0f7b8e47a0c7c8b9e8e0` |
| `/api/classes/ReturnsModule` | 200 — `Class: ReturnsModule \| Wildberries TypeScript SDK` | `61ec43a4d5b5865e09e48ee23113cf34a30e59a3ac67d5d3ec614178933593e2` |
| `/api/classes/UserManagementModule` | 200 — `Class: UserManagementModule \| Wildberries TypeScript SDK` | `00b3f1105986b2596d7c3d2cdd09f24608e13138d95c6b448db0bc42e8ec7dbd` |

## Bounded public route, navigation, fragment, and source-link checks

### Result: PASS

The eight-page HTTP sample above additionally verified:

- every sampled same-origin link remains under `/daytona-wildberries-typescript-sdk/`;
- English NodeNext links reciprocally to `/ru/guides/nodenext.html`;
- Russian NodeNext links reciprocally to `/guides/nodenext.html`;
- both NodeNext pages link to `ReturnsModule` and `UserManagementModule` API pages;
- English NodeNext content includes `moduleResolution` and `skipLibCheck`;
- Russian NodeNext content includes the same strict settings;
- meaningful existing fragments are present:
  - English NodeNext: `#esm-with-mts`, `#commonjs-with-cts`, `#offline-verification`;
  - Russian NodeNext: `#esm-в-фаиле-mts`, `#commonjs-в-фаиле-cts`, `#офлаин-проверка`;
  - Returns API: `#class-returnsmodule`, `#getreturns`, `#getreturnstats`;
  - User Management API: `#class-usermanagementmodule`, `#createinvite`, `#getusers`, `#updateuseraccess`.

The two sampled API pages contain `11` unique GitHub source links. All `11` pin the immutable release revision `265292a0e17d35c82d821297c57856e4537b60cd` under `src/modules/returns/index.ts` or `src/modules/user-management/index.ts`. Public raw GitHub and GitHub Contents API reads returned identical bytes for both files:

- Returns source: `579` lines, SHA-256 `c90c4bea42996d45bcf521d5bb853550e666e1dc4acad563a51aae097069ad63`.
- User Management source: `178` lines, SHA-256 `65c8ff5a93167cc73fb85e53f1476ca200f8f792c010dcaeca9043eb18d8af0a`.

All referenced `#L...` line numbers are within those public file lengths. Sequential GitHub HTML link requests were temporarily served HTTP 503 for 10 of the 11 line-fragment URLs; this was not classified as missing source because the same immutable public files were independently retrieved through both official raw GitHub and Contents API surfaces and the URLs are present in the deployed HTML.

This public check is intentionally bounded. The earlier rendered-build gate covered `1,005` rendered routes, `143,092` internal references, and `14,004` fragment references; those counts come from the exact-head CI/local rendered artifact gate and were not reproduced by this public HTTP sample. The earlier `4,624` unique external URLs are an inventory, not an exhaustive external HTTP-validity result.

## Fresh isolated browser verification

### Result: PASS for the required browser gates

Browser automation used `playwright-cli 0.1.22` in a newly opened named session, `v470-public-verify`, with the default in-memory profile. It did not attach to Chrome, Edge, an extension, or any user browser, did not load storage state, and reported `No cookies found`. The runtime was headless Chrome `154.0.0.0`.

Hydrated checks and user-visible navigation:

1. Opened English NodeNext; `document.readyState=complete`, `#app` contained the guide heading, and VitePress content was hydrated.
2. Clicked `Change language to Русский`; the browser reached `/ru/guides/nodenext.html` with title `NodeNext — ESM и CommonJS | Wildberries TypeScript SDK`.
3. Clicked `Change language to English`; the browser returned to `/guides/nodenext.html` with the English title.
4. Expanded the English `API Reference` and nested `Modules` sidebar groups. The sidebar exposed both `/api/classes/ReturnsModule.html` and `/api/classes/UserManagementModule.html`.
5. Clicked `ReturnsModule`; the browser reached the hydrated public class page with the expected title.
6. On the untranslated Returns API page, the locale control targeted `/ru/`; clicking it reached the Russian locale home. This proves the required no-counterpart locale-home fallback.
7. Returned to NodeNext, expanded the API sidebar, clicked `UserManagementModule`, and reached the hydrated public class page with the expected title.
8. On the hydrated Russian NodeNext page, DOM inspection found the shared-English sidebar links `ReturnsModule (English)` and `UserManagementModule (English)`, both targeting the English API routes under the configured base.

The isolated browser session was closed and its owned session data was deleted; the CLI reported that no persistent user data existed.

## Gaps and non-blocking observations

- The sampled public Pages routes request `https://salacoste.github.io/favicon.ico`, which returned HTTP 404 in the browser console. This did not affect navigation, content hydration, or the release acceptance routes.
- The public Russian `UserManagementModule` placeholder exists as a rendered counterpart. Clicking the locale switch from the English User Management API page reaches that placeholder, whose body visibly includes the literal `<script setup>` block rather than auto-redirecting. The required shared-English sidebar target and the explicit no-counterpart fallback on Returns both pass, so this does not invalidate the bounded release gate, but it is a separate documentation UX defect worth tracking.
- GitHub's unauthenticated repository Pages configuration API returned HTTP 404. Pages identity is nevertheless established independently by the public `gh-pages` ref and commit, the successful public Pages workflow, the source workflow/commit marker, and byte-for-byte equality for all eight sampled public files.
- No live WB or sandbox runtime proof was attempted. Earlier release notes accurately preserve that limitation.

## Protected state and cleanup

- `backlog/config.yml` remains the only tracked worktree change and retains SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.
- The completed publication receipt `backlog/docs/wb-sdk-v4.7.0-publication-evidence.md` was read before finalizing this verdict. Its release, registry, provenance, and Pages identities agree with the independently fetched public evidence above.
- Temporary tarball, registry JSON, attestation bundles, workflow JSON, downloaded Pages HTML, isolated npm cache/install, raw public sources, and browser snapshots were verifier-owned and removed after this durable sanitized report was written.
- No source/product/task/index/Git-ref mutation, stage, commit, push, tag, release, deployment, npm publication, global configuration change, dependency addition, credential read, or WB call was performed by this verification lane.
