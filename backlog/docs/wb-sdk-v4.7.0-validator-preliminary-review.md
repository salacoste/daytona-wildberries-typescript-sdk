# SDK v4.7.0 rendered-validator preliminary review

Date: 2026-10-12 (Europe/Moscow)

## Verdict

**REQUEST CHANGES for the bounded validator, NodeNext guide, and CI integration snapshot reviewed below.**

The current rendered site passes its positive route and fragment scan, and the dedicated NodeNext fixtures compile offline. The bounded change is not ready for exact-candidate review because the new fixtures break the repository's existing `npm run type-check` gate, absolute same-site URLs bypass internal validation, and locale/navigation completeness plus guide/fixture parity are not locked by persistent negative controls.

This is an early independent code/spec/security review only. It is not an exact-candidate review, whole-release acceptance, publication approval, or a re-review of the API source accepted at `1fc8230122b571d1635d0133aaabce64876925c6`.

## Scope and specification trace

The review used `TASK-233`, `TASK-234`, and `TASK-235` as the specification, plus `backlog/docs/wb-sdk-v4.7.0-release-evidence.md` and `backlog/docs/wb-sdk-v4.7.0-release-notes.md` for the release boundary.

- `TASK-233`: the current rendered scan reaches 919 root-locale routes and 86 Russian routes with zero internal errors. The English and Russian navigation surfaces render Returns and User Management entries, and both NodeNext locale routes are present.
- `TASK-234`: both guides use only the root export and the four package subpaths declared in `package.json`; the dedicated strict NodeNext fixture command passes without a WB call. Finding M-02 records the missing persistent guide/fixture parity lock.
- `TASK-235`: rendered routes, fragments, base-prefixed links, assets, root navigation, Russian navigation, and repeated sidebar links are scanned. Findings H-01 and M-01 record the remaining classification and completeness gaps. The broad external suppression at `docs/.vitepress/config.ts:161-167` is not backed by the “validated separately” status check described in its comment.

## Files reviewed and SHA-256 identities

These hashes identify the exact preliminary snapshot. Concurrent changes after this report require a fresh review and new hashes.

| File | SHA-256 |
|---|---|
| `scripts/validate-rendered-docs.mjs` | `fd3e2538cb12318fae36b2ad5cb95420930331a32f484df7d96652976ab62156` |
| `tests/unit/scripts/validate-rendered-docs.test.ts` | `77cb15e2763d3930d9a08dcc19902626d22949f16b8b2b5f74a68a9eb4929b8c` |
| `tests/fixtures/docs/nodenext/tsconfig.json` | `c32adf9df5a9ea89167b6556e94c2dd080e8f9e9ba877221eedb99fc2c6baa21` |
| `tests/fixtures/docs/nodenext/consumer.mts` | `847fc27503b5453f3a76f6bd57857aba68ad038d27a5196e1a5576bb33d7053e` |
| `tests/fixtures/docs/nodenext/consumer.cts` | `1e66fad4b47faa5b18aa76313a14f18ac2f65614472d46149c60c60f16d54652` |
| `docs/guides/nodenext.md` | `a031701739823156b57d7ab0163d9ee1b37c402289e12d4d2bd87702625e4ee0` |
| `docs/ru/guides/nodenext.md` | `a24ae29d5195b09ae7676bff5c2b578ecd66ff7a33a88e7b04cf9f6d93905be8` |
| `docs/guides/index.md` | `7f81bd7a03de681192f50aa6e16d5b9e181e0c41310b35f8a3b4beb586f5f2bd` |
| `docs/ru/guides/index.md` | `8e7d4e25f981885bbf1a4a794318e80c1f833f858364a8a01258f98d339dd86e` |
| `docs/.vitepress/config.ts` | `5d57c91bb3fb49925a2c731f4ee2cb4033d16b46720677f845cc312f61680fed` |
| `package.json` | `1a90adf7f1da0f3522e5776a490d8c85914ad01f3b5056e452b72fa771f01ec3` |
| `.github/workflows/docs.yml` | `ccf1287bef327df6517055dfa60e1fbece922cd27680428ed8c11d8cd7e0b7e6` |
| `.github/workflows/main.yml` | `5a6bd9b2a474a96b8d951122706a86dc2d136d0490878e3c5a096bd689c4e164` |
| `tsconfig.json` | `b56b80c5fec74522a743187484af593d3696ccdad2dfc8b1d8533f09fe6253f4` |

Protected foreign state was read only. `backlog/config.yml` remained SHA-256 `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`.

## Findings

### [HIGH] H-01 — Absolute links to the deployed documentation origin bypass internal route and fragment validation

**Evidence:** `scripts/validate-rendered-docs.mjs:147-160`, `tests/unit/scripts/validate-rendered-docs.test.ts:31-78`, `docs/.vitepress/config.ts:161-167`, `package.json:87-89`.

The validator builds relative URLs against the synthetic `https://docs.invalid/` origin, then classifies every `http:`, `https:`, or protocol-relative URL as external before parsing its host and path. It therefore cannot distinguish an actual external URL from an absolute URL back to `https://salacoste.github.io/daytona-wildberries-typescript-sdk/`.

Concrete negative control:

```text
fixture hrefs:
  https://salacoste.github.io/daytona-wildberries-typescript-sdk/missing.html#absent
  https://example.com/external

actual result:
  internalReferences: 0
  externalReferences: 2
  errors: []
```

The current rendered output contains four references across two unique canonical same-site URLs, and they are included in the external count rather than validated against `dist`. A broken absolute same-site route or fragment can therefore pass CI. The VitePress config also suppresses every HTTP(S) dead link while claiming external URLs are validated separately; the new scripts only count and list external URLs and explicitly report `network not requested`, so no external status or anti-bot outcome is produced by this integration.

**Minimum fix:** add an explicit canonical site origin, for example `--origin https://salacoste.github.io`, to the package command and validator API. Parse each URL first; treat exact same-origin URLs and protocol-relative same-host URLs under the configured base as internal, and validate their route and fragment. Treat other origins and non-route schemes separately. Add regression cases for valid and broken absolute same-site routes/fragments, same-host wrong-base URLs, protocol-relative same-site URLs, and a genuinely external URL. Either implement a separate non-gating external-status artifact/check or change the config/task claim so it does not assert that external statuses are validated.

### [HIGH] H-02 — The new NodeNext fixtures break the repository type-check gate before CI reaches the documentation checks

**Evidence:** `tsconfig.json:24-25`, `tests/fixtures/docs/nodenext/consumer.mts:1-3`, `tests/fixtures/docs/nodenext/consumer.cts:1-3`, `.github/workflows/main.yml:42-47`.

The root project includes all of `tests/**/*`. The new consumer fixtures import the repository through its own package export map, which makes the root ambiguous to the existing Bundler-resolution project.

Concrete reproducer:

```text
$ npm run type-check
exit 2
error TS2209: The project root is ambiguous, but is required to resolve export map entry '.'
in package.json. Supply the rootDir compiler option to disambiguate.
```

The main workflow runs this command before the new rendered-site job. The dedicated fixture command passing does not repair the primary CI contract.

**Minimum fix:** exclude `tests/fixtures/docs/nodenext/` from the root `tsconfig.json`; its dedicated `tsconfig.json` already owns those package-consumer files. Re-run both `npm run type-check` and `npm run validate:docs:nodenext`. Adding a broad `rootDir` is a larger change and should be avoided unless its declaration/build effects are separately reviewed.

### [MEDIUM] M-01 — Locale and navigation completeness is reported but not enforced

**Evidence:** `scripts/validate-rendered-docs.mjs:142-145`, `scripts/validate-rendered-docs.mjs:221-230`, `tests/unit/scripts/validate-rendered-docs.test.ts:31-78`.

The implementation scans every rendered `href`, so it correctly validates nav and sidebar targets that exist. It only returns locale route counts, however, and has no required-route or required-navigation contract. A fixture containing only `index.html`, no Russian tree, and no links returns:

```json
{
  "errors": [],
  "htmlRoutes": 1,
  "rootLocaleRoutes": 1,
  "russianLocaleRoutes": 0,
  "internalReferences": 0
}
```

The existing “root and Russian navigation” positive test proves successful traversal but has no negative assertion for a missing locale root, missing locale switch, or missing required nav/sidebar entry. This allows a configuration regression that removes a whole locale or required navigation item to pass.

**Minimum fix:** give the project-level invocation explicit required routes and discoverability targets, at least `/`, `/ru/`, `/guides/nodenext`, and `/ru/guides/nodenext`, and fail when they are absent. Add negative tests that remove the Russian root, locale switch, and a required sidebar target. Keep generic link validity separate from project-specific completeness.

### [MEDIUM] M-02 — Persistent NodeNext fixtures do not compile the snippets the guides call “equivalent”

**Evidence:** `docs/guides/nodenext.md:31-65`, `docs/ru/guides/nodenext.md:35-69`, `tests/fixtures/docs/nodenext/consumer.mts:1-9`, `tests/fixtures/docs/nodenext/consumer.cts:1-9`.

The English and Russian snippets are identical to each other, and an ad hoc extraction of their exact `.mts` and `.cts` bodies compiled successfully in this review. The persistent fixtures use different imports and different type expressions: the guide ESM snippet uses a value import and `FinancesModule`, while the fixture uses type-only root/Finances/Analytics imports; the guide CommonJS snippet checks `InstanceType` for root and Reports constructors, while the fixture checks root property access plus Communications and Reports methods.

The current examples are valid, but the claimed parity is not durable: either guide can drift or adopt an unsupported subpath while `npm run validate:docs:nodenext` continues to pass unchanged.

**Minimum fix:** make the persistent consumers contain the exact documented examples, with any additional export coverage in separate assertions, or add a small test that extracts and compiles the guide code fences. Keep the fixture offline and type-only; no SDK construction or WB method invocation is needed.

## Verification evidence

| Check | Exit/result | Meaning |
|---|---:|---|
| `node scripts/validate-rendered-docs.mjs --dist docs/.vitepress/dist --base /daytona-wildberries-typescript-sdk/` | 0 | 1,005 HTML routes: 919 root, 86 Russian; 142,084 internal references; 14,004 fragment references; 9,249 external references / 4,626 unique; zero internal errors. External network/status checks were not performed. |
| `npx --no-install vitest run tests/unit/scripts/validate-rendered-docs.test.ts` | 0 | 1 file, 10/10 tests passed. |
| `npm run validate:docs:nodenext` | 0 | Fresh local build transformed 115 modules; strict `.mts` and `.cts` fixture compile passed with `skipLibCheck: false`. No SDK method or WB request ran. |
| Exact EN/RU guide `.mts` and `.cts` code compiled in a temporary dedicated NodeNext project | 0 | Current documented snippets are type-correct against the fresh local build. Temporary files were removed. |
| Unsupported `/products` subpath temporary negative control | 2, expected | `TS2307` proved the package rejects an unlisted subpath. Temporary files were removed. |
| Broken absolute same-site URL negative control | unexpected pass | `errors: []`; reproduced H-01. |
| Missing Russian locale/navigation negative control | unexpected pass | `errors: []`, `russianLocaleRoutes: 0`; reproduced M-01. |
| `npm run type-check` | 2 | `TS2209`; reproduced H-02. |
| `node --check scripts/validate-rendered-docs.mjs` | 0 | Validator syntax accepted by Node. |
| `npx --no-install eslint tests/unit/scripts/validate-rendered-docs.test.ts` | 0 | Changed TypeScript test file passed repository ESLint. The validator `.mjs` is intentionally ignored by the repository ESLint config. |
| Targeted Prettier check over validator, test, fixtures, guides, package JSON, guide indexes, and VitePress config | 0 | Reviewed core files matched Prettier. A broader check including the two existing workflow files reports formatting warnings; this review did not treat pre-existing YAML formatting as a release blocker. |
| `git diff --check` over the bounded files | 0 | No whitespace errors. |
| Production VitePress preview | local HTTP 200 | `/daytona-wildberries-typescript-sdk/guides/nodenext` and `.html`, plus the Russian equivalents, returned 200; the same path outside the configured base returned 404. Generated navigation uses explicit `.html` URLs. |
| `actionlint .github/workflows/docs.yml .github/workflows/main.yml` | nonzero | The new validator steps had no reported syntax issue. Actionlint reported the existing unquoted `$GITHUB_ENV` redirection and existing `peaceiris/actions-gh-pages@v3` runner-age warnings outside this bounded change. |
| Secret/pattern scan over bounded files | no secret match | Only intentional CLI `console.log`/`console.error` output was found; no hardcoded API key, password, token assignment, empty catch, or WB credential use was found. |

No `lsp_diagnostics` tool was available in this leaf's tool surface. The repository TypeScript compiler and ESLint were used as the closest static diagnostics, and the failing root type-check independently prevents approval.

## Security, performance, and limitations

- No credential, dotenv file, token, customer row, or live WB API was read or executed.
- No dependency was added. Temporary probes used existing Node, TypeScript, VitePress, and filesystem facilities and were removed.
- The validator completed the 142,084-reference scan in a few seconds on the current tree. No material performance blocker was observed.
- External URLs were inventoried only. Their current HTTP statuses, including WB anti-bot responses, are `NOT RUN` in this review and cannot be inferred from the passing internal scan.
- GitHub Pages was not deployed or fetched. Clean and explicit `.html` behavior was verified only against the local VitePress production preview. The generated site itself links page routes with `.html`.
- The rendered output changed during the concurrent documentation repair. The final positive evidence and hashes above were taken after the rendered validator reached exit 0; this remains a preliminary shared-worktree snapshot, not a frozen Git candidate.

## Severity summary

- CRITICAL: 0
- HIGH: 2
- MEDIUM: 2
- LOW: 0 recorded

Stop condition: the named files and acceptance criteria were inspected, positive and adversarial checks were run, current identities were recorded, and all blocking findings have concrete reproducers and minimum repairs. Exact-candidate review must wait for H-01 and H-02 to be fixed and for all hashes and gates to be recomputed.
