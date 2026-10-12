# SDK v4.7.0 exact-candidate code review

Date: 2026-10-12 (Europe/Moscow)

## Verdict

**REQUEST CHANGES**

The frozen index has the expected exact identity and the implemented documentation controls close the four technical findings from the preliminary review. The candidate is not acceptable as-is because one checked task requirement still claims an external network/anti-bot result that the validator deliberately does not produce, and the newly expanded VitePress TypeScript configuration is outside the repository type-check while containing four strict TypeScript errors.

Severity summary:

- CRITICAL: 0
- HIGH: 0
- MEDIUM: 2
- LOW: 0

This is the code/spec/security lane. It does not replace the separate architecture lane's status.

## Exact candidate identity

- Baseline and current `HEAD`: `1fc8230122b571d1635d0133aaabce64876925c6`.
- Actual frozen index tree: `be0cbb72b4e4870c6ab01c1b02e73f0ec8924713`.
- Expected-tree comparison: `git diff-index --cached --quiet be0cbb72b4e4870c6ab01c1b02e73f0ec8924713 --` exited 0.
- The tree ID was also recomputed read-only from `git ls-files -s -z`: a Node script rebuilt each Git tree entry in canonical byte order and SHA-1 hashed the resulting tree objects without writing to the Git object database. Result: `be0cbb72b4e4870c6ab01c1b02e73f0ec8924713`.
- Actual staged patch SHA-256: `78c2276051ba75534a1653f940396c5f302e580bf5ff05359b81855a1b9e9c8b`.
- Patch command used:

  ```sh
  LC_ALL=C git diff --cached --binary --full-index --no-ext-diff --no-textconv 1fc8230122b571d1635d0133aaabce64876925c6 -- | shasum -a 256
  ```

- Candidate scope: 867 paths, comprising 21 additions and 846 modifications; no staged `src/` path.
- The 867-line path block in `backlog/docs/wb-sdk-v4.7.0-candidate-manifest.md` is byte-for-byte equal to `git diff --cached --name-status 1fc8230122b571d1635d0133aaabce64876925c6 --`.
- Manifest SHA-256: `02274d018ab23bdbd690a6978817787c689ba741d500263f134061f08b45ecf1`.
- Protected foreign `backlog/config.yml` SHA-256: `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`; it remains unstaged and was not edited, staged, restored, or reset by this review.
- The frozen index remained unchanged during review. An unstaged, post-freeze edit to task 235 corrects finding M-01 below, but it is outside the reviewed tree and patch and therefore is not credited to this verdict.

## Stage 1 — specification compliance

Tasks 233 and 234 are represented by the exact-index implementation and focused evidence: both locale navigation surfaces expose the repaired module and NodeNext targets; the English and Russian NodeNext snippets are identical to the compiled fixtures; and the rendered validator enforces same-origin routes, configured base handling, fragments, required locale routes, locale switches, and module-navigation links.

Task 235 is technically implemented except for the wording mismatch in M-01. The candidate's own implementation notes and final evidence correctly state that external URLs are inventoried without network requests, while the checked description and acceptance criterion claim external anti-bot failures/statuses are reported.

Task 236 correctly remains `In Progress`. Only its metadata criterion is checked. Immutable pushed source references, the exact release/tag identity, npm publication/provenance, GitHub Release, Pages deployment, and public-route verification remain open and were not treated as complete.

The root-cause guard passes for the implementation itself. The locale-home behavior is a documented, bounded fallback for missing translations, not a silent failure path; required navigation remains explicitly enforced. The validator does not swallow internal route or fragment failures or route around the preliminary defects.

## Findings

### [MEDIUM] M-01 — Task 235 checks an external-status promise that was not implemented

**Evidence:** `backlog/tasks/task-235 - Validate-rendered-documentation-routes-and-fragments.md:31`, `backlog/tasks/task-235 - Validate-rendered-documentation-routes-and-fragments.md:38`, `scripts/validate-rendered-docs.mjs:194-197`, `scripts/validate-rendered-docs.mjs:339-341`, `backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md:40`, `backlog/docs/wb-sdk-v4.7.0-docs-final-evidence.md:100`.

The task description says the validator reports external anti-bot failures separately, and checked acceptance criterion 3 says external anti-bot statuses are reported. The implementation classifies other origins as external, counts and inventories their original URLs, and prints `network not requested`. The final evidence explicitly records external HTTP status and anti-bot behavior as `NOT RUN`.

This is a release-spec integrity defect: a checked criterion promises evidence that does not exist. It does not indicate a validator runtime failure, and the preliminary review explicitly allowed the task claim to be corrected instead of adding a network check.

**Smallest fix:** update the task description and acceptance criterion 3 to say that absolute and protocol-relative same-origin routes/fragments are validated, real external URLs are inventoried separately, and external HTTP status/anti-bot checks are `NOT RUN`. The current unstaged task edit already has that shape; integrate it into a newly frozen candidate and recompute the tree and patch identities.

### [MEDIUM] M-02 — The new VitePress TypeScript control surface is not covered by `npm run type-check` and currently fails a direct strict check

**Evidence:** `tsconfig.json:24-32`, `docs/.vitepress/config.ts:100`, `docs/.vitepress/config.ts:105`, `docs/.vitepress/config.ts:112`, `docs/.vitepress/config.ts:733`.

The root TypeScript project includes `.vitepress/**/*`, but the actual configuration lives under `docs/.vitepress/`. Consequently, `npm run type-check` exits 0 without checking the new fragment-rewrite and locale-counterpart configuration. A direct strict check of `docs/.vitepress/config.ts` and `docs/.vitepress/fragment-utils.ts` exits 2 with:

```text
docs/.vitepress/config.ts(100,39): error TS2351: This expression is not constructable.
docs/.vitepress/config.ts(105,39): error TS2351: This expression is not constructable.
docs/.vitepress/config.ts(112,37): error TS2351: This expression is not constructable.
docs/.vitepress/config.ts(733,5): error TS2353: Object literal may only specify known properties, and 'localeCounterparts' does not exist in type 'Config'.
```

The production VitePress build transpiles and runs this code, so the current rendered output can pass despite these errors. That does not satisfy the candidate's static-analysis claim and leaves the newly added link/fragment control surface outside the repository's type-safety gate.

**Smallest fix:** construct Markdown-It tokens with the typed `state.Token` constructor instead of `child.constructor`; declare the custom theme shape and use VitePress's typed custom-theme configuration entry point, such as `defineConfigWithTheme<DefaultTheme.Config & { localeCounterparts: string[] }>`; and add `docs/.vitepress/config.ts` plus `docs/.vitepress/fragment-utils.ts` to a repository or dedicated strict TypeScript check. Add that check to CI, then prove both it and the existing root `npm run type-check` pass. Avoid a broad exclusion or type assertion that merely hides the diagnostics.

## Exact-index implementation assessment

- **Accepted source equality:** baseline `1fc8230122b571d1635d0133aaabce64876925c6:src` and candidate `be0cbb72b4e4870c6ab01c1b02e73f0ec8924713:src` both resolve to tree `60fdf1df73311d8c4e5113e80e7e319ae9e5da2d`; cached and worktree source diffs are empty.
- **Generated source references:** 4,486 staged `docs/api` references match `blob/<40-hex>/src/`; the only referenced SHA is `1fc8230122b571d1635d0133aaabce64876925c6`.
- **Rendered validator:** exact-index code parses URLs before classification, validates exact same-origin HTTP(S) links under the configured base, rejects same-origin wrong-base paths, checks resolved routes and fragments, and enforces project-specific required routes and links. The regression suite covers valid and broken same-origin absolute links, protocol-relative same-origin links, external classification, missing locales, missing locale switches, missing navigation targets, route variants, and fragments.
- **Guide parity:** both EN/RU guides contain the exact `.mts` and `.cts` fixture bodies. The parity test extracts both `typescript` fences from each guide and compares them byte-for-byte to the fixtures.
- **Scoped exclusions:** `tests/fixtures/docs/nodenext` is excluded from only the root Bundler-resolution TypeScript project and the repository ESLint scan. Its dedicated `NodeNext` project retains `strict: true`, `skipLibCheck: false`, and `noEmit: true`. Finding M-02 is separate: the repository's existing `.vitepress/**/*` include does not reach `docs/.vitepress/`.
- **Theme and locale switch:** the custom theme keeps `custom.css`, adds the locale-switch stylesheet, renders desktop/mobile controls in VitePress layout slots, uses real counterpart routes when present, and falls back to the valid target-locale home when absent. The validator's required-link checks cover the reciprocal NodeNext switches and shared-English module navigation. The CSS hides the built-in translation controls after the custom theme is installed.
- **Fragment behavior:** human-readable fragments use the VitePress-compatible slug function while exact generated TypeDoc IDs are preserved when present in the target Markdown inventory.
- **Package metadata:** `package.json.version`, `package-lock.json.version`, and `package-lock.json.packages[""].version` are all `4.7.0`; lockfile version is 3. No dependency version changed in this release patch.
- **CI integration:** both documentation workflows replace existence-only checks with `validate:docs:site`; the main workflow builds the VitePress site before the rendered validation. The effective site command runs rendered-route validation and the dedicated NodeNext compile. M-02 remains because the VitePress TypeScript configuration itself lacks a strict type-check gate.
- **Final-evidence identity:** all 15 SHA-256 entries in the final evidence's core-file table match the exact staged blobs.
- **Whitespace:** `git diff --cached --check` exited 0.

## Focused verification performed

| Check | Result | Scope/meaning |
|---|---:|---|
| Exact patch hashing command above | match | Produced `78c2276051ba75534a1653f940396c5f302e580bf5ff05359b81855a1b9e9c8b`. |
| Read-only canonical tree recomputation | match | Produced `be0cbb72b4e4870c6ab01c1b02e73f0ec8924713`. |
| Candidate manifest vs cached name-status | exit 0 | All 867 status/path rows agree. |
| `git diff-index --cached --quiet <expected-tree> --` | exit 0 | Frozen index equals the expected tree. |
| Generated source-reference inventory | pass | 4,486/4,486 references use the accepted baseline SHA. |
| Final-evidence core SHA table | pass | 15/15 staged blob hashes match. |
| `node --check scripts/validate-rendered-docs.mjs` | exit 0 | Validator ESM syntax accepted. |
| `npm run type-check` | exit 0 | Existing root project passes, but does not cover `docs/.vitepress/`. |
| Direct strict TypeScript check for VitePress config/helpers | exit 2 | Reproduced M-02 with four diagnostics. |
| `npx --no-install tsc -p tests/fixtures/docs/nodenext/tsconfig.json` | exit 0 | Strict NodeNext fixtures compile against the existing local package build; no SDK construction or WB request. |
| Targeted ESLint over the three changed TypeScript test files | exit 0 | Focused test code passes repository lint rules. |
| Targeted Vitest suite | exit 0 | 3 files, 24/24 tests passed. |
| `npm run validate:docs:rendered` | exit 0 | Existing rendered output: 1,005 routes, 143,092 internal references, 14,004 fragment references, 9,245 external references / 4,624 unique, zero internal failures. |
| `git diff --cached --check` | exit 0 | No staged whitespace error. |
| Protected config hash | match | `bd618437cd04a4d71ad67a4f671100a7b968630f72daf17378ce3d2561c0b1b9`. |

No `lsp_diagnostics` or AST-grep tool was available in this leaf's tool surface. The root compiler, a direct strict TypeScript invocation for the otherwise uncovered VitePress files, targeted ESLint, syntax checking, focused tests, and source inspection were used instead. The direct compiler check found M-02, so the candidate is not approved.

## Explicit limits and NOT RUN evidence

- The full unit/integration suite, package build, package validation, dry pack, and VitePress production build were not repeated in this exact-review lane. Their recorded final evidence remains applicable to the staged core files because all 15 recorded blob hashes match; the focused regression and rendered-validator checks above were rerun.
- The rendered-validator rerun used the existing local `docs/.vitepress/dist` output. It confirms the validator result on that output; the fresh-build claim comes from the hash-matched final evidence, not from a build performed in this lane.
- WB live API calls: **NOT RUN**.
- WB sandbox writes: **NOT RUN**.
- Credential, dotenv, or private customer-data reads: **NOT RUN**.
- External HTTP status and anti-bot checks: **NOT RUN**.
- npm publication/provenance, GitHub push/tag/Release, CI completion, Pages deployment, public-route fetch, and final published artifact identity: **NOT RUN** and correctly remain open under task 236.
- No commit, stage, reset, restore, checkout, clean, push, tag, publish, deployment, or source/task edit was performed by this review. The only authored artifact is this review report, which is outside the frozen index.

## Recommendation

Integrate the narrowly scoped task-235 wording correction and the VitePress TypeScript fixes plus an enforceable static check, then create a new frozen index and recompute its tree and binary full-index patch digest. The existing behavioral test/build evidence can remain scoped to unchanged blobs, but the new candidate needs fresh focused proof for the added type-check gate and a new exact-candidate review identity.
