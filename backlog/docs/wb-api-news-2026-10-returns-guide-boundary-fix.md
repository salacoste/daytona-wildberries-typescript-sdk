# Returns guide strict date-boundary correction evidence

Date: 2026-10-11

## Authority and scope

- TASK215 authorizes the completed ReturnsModule migration and records strict `dateTo`-after-`dateFrom` validation.
- This correction changes only the contradictory `dateTo`/`dateFrom` boundary wording in the English and Russian returns guides.
- The valid-range end date remains documented as inclusive.
- No task, specification, source, build, staging, dependency, SDK, or environment-secret operation was performed.
- The evidence path exists locally and is covered by the repository's `.gitignore:14` `backlog/` rule; it was not force-added or staged.

## Source comparison

`src/modules/returns/index.ts` rejects `diffDays <= 0` and reports that `dateTo` must be after `dateFrom` (lines 56-57 at verification time). Therefore equal dates are rejected and the required boundary is `dateTo > dateFrom`.

Source SHA-256 before the guide edits:

`c90c4bea42996d45bcf521d5bb853550e666e1dc4acad563a51aae097069ad63  src/modules/returns/index.ts`

Source SHA-256 after the guide edits:

`c90c4bea42996d45bcf521d5bb853550e666e1dc4acad563a51aae097069ad63  src/modules/returns/index.ts`

`SOURCE_FROZEN`: yes for this bounded observation window. The validator hash was unchanged before and after these guide edits; this is not a claim that the broader integration worktree was globally frozen.

## Corrected guide wording

- `docs/guides/returns-module.md:205` retains the inclusive end-date semantics and now requires `dateTo > dateFrom`, explicitly rejecting equal dates.
- `docs/guides/returns-module.md:213` now states that `dateTo <= dateFrom` throws.
- `docs/ru/guides/returns-module.md:240` now requires `dateTo > dateFrom` and explicitly says equal dates are rejected.

Guide SHA-256 transition:

- English: `f6e61231191503f7a21548435418e20a3441e9394c8ac7b807752e510c0ceae0` -> `ccb197db0fc8aa5118f72cbf526c317f6623e6fd2e6438743c2df6bf344f6bfa`
- Russian: `dbad4abc683ad42cf3c7dec7de91a08861a865e8d3704cea8d79faef1fa472c5` -> `1dc39f19feaf0054acda133cbd33bf868f92cf0209cdafa33f69278e00e1a54e`

## Checks

- `rg -n -i "dateTo.*(>=|greater than or equal|не меньше|больше или равн)|dateFrom.*(<=|less than or equal|не больше|меньше или равн)|dateFrom > dateTo|dateTo <= dateFrom|dateTo.*> dateFrom|Должно быть > dateFrom|equal dates|одинаковые даты" docs/guides/returns-module.md docs/ru/guides/returns-module.md` -> exit 0; only the three corrected strict-boundary lines matched.
- `rg -n -C 2 "diffDays <= 0|must be after dateFrom|dateFrom >= dateTo" src/modules/returns/index.ts` -> exit 0; confirmed the strict source validator and its JSDoc at lines 43, 56-57, and 316.
- `git diff --check -- docs/guides/returns-module.md docs/ru/guides/returns-module.md` -> exit 0 with no output.
- `git check-ignore -v backlog/docs/wb-api-news-2026-10-returns-guide-boundary-fix.md` -> exit 0; `.gitignore:14:backlog/` confirms the local evidence file is ignored.

No prose-only tests or builds were run, as required by the bounded task.

## Handoff

Integration executor47211 should include these three guide wording corrections and this evidence note in the broader candidate review, then recheck the source hash if its integration window has advanced.
