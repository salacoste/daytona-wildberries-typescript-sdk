# v4.7.0 — October WB contracts, Returns pagination, and NodeNext packages

Version 4.7.0 publishes the accepted additive October SDK and documentation update.

## Highlights

- Sales Funnel and Search Queries documentation now records the announced two-hour data-freshness cadence for the affected API and CSV reports.
- Finance detailed-report items expose buyer KPP and UPD/UKD document fields.
- Products adds typed TN VED and OKPD2 directory methods. Product-card contracts expose optional non-null `gtin` fields and document WB's historical seller-card reuse rule.
- The Search Queries TEXT CSV contract no longer requires the five percentile columns removed by WB; other CSV variants and similarly named JSON fields are unchanged.
- `reports.getAnalyticsRegionSale()` remains available in 4.x with a dated, warn-once deprecation notice and EN/RU Order Feed migration guidance for the 2026-11-03 shutdown.
- DBS client information supports nullable `orders` and optional additional-phone arrays. The sandbox client adds typed `deliveryType` support for test order creation without automatic retries for the write operation.
- `returns.getReturns()` now paginates the v1 item-returns endpoint across active and archive results, handles HTTP 204 as empty, and preserves the existing all-or-nothing behavior when a page request fails.
- Published declarations now resolve under strict TypeScript NodeNext consumers. Package validation compiles real extracted-tarball `.mts` and `.cts` fixtures and checks all five public exports with ESM import and CommonJS require smokes.

## Compatibility and evidence boundary

This is an additive minor release for the 4.x line. Future-v5 removals remain tracked separately and are not part of 4.7.0.

The source baseline includes the bounded prior-news audit through 2026-09-24 inclusive plus nine supplied October announcements; it is not a claim that every WB announcement through the release date was exhaustively audited. Repository tests, static checks, mocked integrations, generated documentation, and packed-consumer checks establish local behavior. Eight historical read-only WB attempts ended in `NetworkError`, so they provide no successful live runtime proof. No sandbox write was performed, and sandbox server-side defaulting remains unproven.

See [CHANGELOG.md](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f7fc0e2de8f35e107d68d0f149ae17631184d3fe/CHANGELOG.md) for the full release record.
