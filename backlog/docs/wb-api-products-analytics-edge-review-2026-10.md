# Products and Analytics Edge Case Hunter review — 2026-10

## Review identity

- Layer: BMAD Edge Case Hunter.
- Frozen review diff: `/tmp/wbpa-review-snapshot-20261011-f8B7ee/products-analytics-review.diff`.
- SHA-256: `c5c532df0c16a0db613965cf9d6eac2dcbe2bfdf01b0f793f456f2b3646b9cf8`.
- Frozen baseline: `6e8d6269140e3ae0a5aa5cb12ac714f457af4263`.
- Frozen file count: 39.
- Canonical scope: CAP-1, CAP-3, CAP-4, CAP-5, and CAP-8 in `_bmad-output/specs/spec-wb-api-news-2026-10/SPEC.md`, with `_bmad-output/specs/spec-wb-api-news-2026-10/source-coverage.md` and the source-pinning boundary in `backlog/docs/wb-api-news-2026-10-official-contracts.md`.
- Claims file was not read until the exhaustive path and deletion passes were complete.
- Final integration deltas named by the coordinator were outside the frozen diff and were not reviewed as part of this layer.

## Findings

The layer forbids severity labels and rankings. The complete output is:

```json
[
  {
    "location": "docs/api-reference/raw-yaml/11-analytics.yaml:37-187",
    "trigger_condition": "Reader reaches retained hourly sentence after the new two-hour Sales Funnel sentence",
    "guard_snippet": "description: \"From 2026-09-24, data refreshes once every two hours.\"",
    "potential_consequence": "Consumers receive mutually exclusive freshness guarantees for three Sales Funnel operations"
  },
  {
    "location": "docs/api-reference/raw-yaml/11-analytics.yaml:909-1205",
    "trigger_condition": "Reader reaches retained hourly sentence after the new two-hour Search Queries sentence",
    "guard_snippet": "description: \"From 2026-10-12, data refreshes once every two hours.\"",
    "potential_consequence": "Consumers receive mutually exclusive freshness guarantees for five Search Queries operations"
  }
]
```

## Evidence

- The three changed Sales Funnel descriptions add the two-hour contract at lines 37, 117, and 182, while their existing text still says “updated once an hour” at lines 40, 121, and 187.
- The five changed Search Queries descriptions add the two-hour contract at lines 909, 986, 1055, 1128, and 1198, while existing text still says “once an hour” or “once per hour” at lines 925, 994, 1067, 1137, and 1205.
- The root Russian OpenAPI and its Sales Funnel/Search Queries shards do not contain the same stale hourly statements on the affected operations; the contradiction is confined to the changed raw English OpenAPI copy.
- The three new Products directory call sites were checked against `BaseClient.get<T>(url, options?)`: argument count, order, and request-option shapes match the callee.
- The GTIN additions are optional, non-nullable strings at the four scoped card locations. The review treated the original rule correctly: the same GTIN may have appeared in `skus` of any one of the seller's listings, not necessarily the same card, and no client-side account-history validator is required.
- The Search Queries CSV deletion pass compared the baseline and frozen result by parsed header and field mapping. Only `OpenCardPercentile`, `AddToCartPercentile`, `OpenToCartPercentile`, `OrdersPercentile`, and `CartToOrderPercentile` were removed from the TEXT example/table; common field values remained aligned, and GROUP/PRODUCT headers were unchanged.
- The claims pass found no additional distinct falsified claim after the two raw-OpenAPI contradictions above were recorded.

## Limits and mutation statement

- This was a read-only review of the frozen diff plus directly referenced declarations and contract evidence.
- Tests, builds, live WB calls, credential reads, task status changes, commits, publishing, and dependency operations were not run.
- No source, test, fixture, task, index, configuration, or shared review file was modified.
- The only write made by this reviewer is this evidence report: `backlog/docs/wb-api-products-analytics-edge-review-2026-10.md`.
