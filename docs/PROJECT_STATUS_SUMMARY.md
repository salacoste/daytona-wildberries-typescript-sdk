# Wildberries TypeScript SDK — Project Status Summary

**As of:** 2026-08-09
**SDK Version:** 4.1.0
**Status:** 🟢 Production Ready
**Source of truth:** `package.json`, `src/index.ts`, `CHANGELOG.md`, `backlog/tasks/`

---

## Executive Summary

The Wildberries TypeScript SDK is a mature, production-ready library providing
type-safe access to the Wildberries marketplace API. It is shipped as the npm
package **`daytona-wildberries-typescript-sdk`** (dual ESM/CJS, Node ≥ 20).

| Metric | Value |
|--------|-------|
| **Current release** | 4.1.0 (2026-07-20) |
| **Public modules** | 14 (`sdk.*` properties) |
| **Test suite** | ~2,376 tests across 80 test files (default Vitest config) |
| **Work tracked in Backlog.md** | 223 tasks — **all Done** (board cleared) |
| **OpenAPI source specs** | 14 files in `wildberries_api_doc/` (read-only) |
| **Build** | Vite (dual ESM/CJS) + `vite-plugin-dts` |
| **Docs site** | VitePress + TypeDoc, bilingual EN/RU (GitHub Pages) |

> Numbers above are verifiable from the files listed under "Source of truth."
> Legacy "quality score", "endpoints covered", and "bundle size" metrics that
> appeared in earlier versions of this document were not reproducible from CI
> output and have been removed rather than restated.

---

## How Work Is Tracked (read this first)

Current and future work is tracked in **Backlog.md** under `backlog/tasks/`.
As of 2026-08-09 the board holds **223 tasks, all with `status: Done`** — the
board is cleared and the SDK is production-ready. New work is added as new
Backlog.md tasks.

The older **Epic 1–13 / Story** tracker that lives in `docs/stories/` and
`docs/epics/` is **historical**. It documents how the SDK was originally built
(Infrastructure, Products & Orders, Extended Modules, Promotion Testing, DBS
Module, Analytics v3 migration, etc.) and is preserved for reference, but it is
**superseded by Backlog.md** as the active source of truth. Do not infer
current status from epic percentages — they reflect a past planning cycle, not
present reality.

---

## Module Implementation Status

All 14 public SDK modules are implemented and exposed on the `WildberriesSDK`
class (verified in `src/index.ts`). Approximate public-method counts are taken
from `src/modules/<name>/index.ts`.

| # | `sdk.*` property | Module class | Domain | Methods (~) |
|---|------------------|--------------|--------|-------------|
| 1 | `sdk.general` | GeneralModule | common-api | 10 |
| 2 | `sdk.products` | ProductsModule | content-api | 51 |
| 3 | `sdk.ordersFBS` | OrdersFbsModule | marketplace-api | 35 |
| 4 | `sdk.ordersFBW` | OrdersFbwModule | marketplace-api | 12 |
| 5 | `sdk.ordersDBS` | OrdersDbsModule | marketplace-api | 20 |
| 6 | `sdk.finances` | FinancesModule | finance-api / statistics-api | 11 |
| 7 | `sdk.analytics` | AnalyticsModule | seller-analytics-api | 19 |
| 8 | `sdk.communications` | CommunicationsModule | common-api | 25 |
| 9 | `sdk.reports` | ReportsModule | statistics-api | 25 |
| 10 | `sdk.promotion` | PromotionModule | advert-api | 45 |
| 11 | `sdk.tariffs` | TariffsModule | — | 5 |
| 12 | `sdk.inStorePickup` | InStorePickupModule | click & collect | 18 |
| 13 | `sdk.userManagement` | UserManagementModule | common-api | 4 |
| 14 | `sdk.returns` | ReturnsModule | aggregator (since v3.10.0) | 3 |

**Total: 283 public methods across the 14 modules.**

**Supplemental (not a public `sdk.*` property):** `src/modules/1_0_0/` exposes a
handful of legacy methods (`getContentTags`, `getAdvAdvert`, `createAdvFullstat`,
`getAdvFullstats`, `getCalendarPromotions`) used internally/by examples.

**Domain base URLs in use:** common-api, content-api, marketplace-api,
finance-api, statistics-api, seller-analytics-api, advert-api.

---

## Core Infrastructure

- **BaseClient** (`src/client/base-client.ts`) — axios-based; injects the
  `Authorization` header, configurable timeout, typed error transformation
  (including RFC 7807 `problem+json`, `BidOutOfRange`, 406
  `WarehouseStocksUpdateBlock`), and PII-sanitized debug logging. All modules
  receive it via dependency injection.
- **RateLimiter** (`src/client/rate-limiter.ts`) — per-endpoint token-bucket;
  limits are extracted from Swagger descriptions; reduced limits are applied
  automatically for `basic`/`test` tokens.
- **RetryHandler** (`src/client/retry-handler.ts`) — exponential backoff;
  retries network errors, 5xx, and 429; does **not** retry 401/403/422.

See `.omc/artifacts/doc-ground-truth.md` for the full surface (config shape,
rate-limit structure, exported error classes, and utility helpers).

---

## Version Trajectory (from CHANGELOG.md)

The CHANGELOG is the authoritative history; this is a short summary.

- **v4.0.0 (2026-07-11)** — **BREAKING major.** Removed all WB-dead/sunset
  deprecated surface (7 promotion methods, 12 in-store-pickup shims, the v5
  finance report, orders-dbs meta, etc.). Each removed symbol is a compile
  error pointing at its replacement; see `docs/guides/migration-v4.md`.
- **v4.0.1 (2026-07-12)** — `sdk.version` is now derived from `package.json`
  (previously reported a stale `3.15.0`).
- **v4.1.0 (2026-07-20)** — Added `analytics.getItemRatingV2()`; deprecated
  `analytics.getItemRating()` (v1) and `reports.getBannedProductsShadowed()`
  ahead of the WB 2026-07-30 deadline.

Earlier 3.x minors added DBS support, the returns aggregator, normquery/v1-stats
endpoints, batch click-collect migration, conformance audit fixes, supply
planning utilities (`calculateSupplyCost`, `compareTariffs`), and the Analytics
v3 sales-funnel migration.

---

## Test Suite

- **Runner:** Vitest 4 + `@vitest/coverage-v8`; MSW 2 for integration (jsdom).
- **Default config:** ~2,376 tests across 80 test files.
- **TDD specs:** run separately via `npm run test:tdd` (~39 files, excluded
  from the default config).
- **Coverage thresholds:** ≥ 90% core infrastructure (`src/client/`),
  ≥ 80% modules.

Run them with:

```bash
npm test                 # default suite
npm run test:tdd         # TDD specs
npm run test:integration # integration suite
npm run test:coverage    # with coverage
```

---

## Build & Tooling

- **Build system:** Vite (dual ESM/CJS) with `vite-plugin-dts`.
- **Subpath exports** (`package.json`): `.` plus `./finances`, `./analytics`,
  `./communications`, `./reports` (so module types import without clashing with
  global `Error`/`Date`). Modules without a subpath have no public type path.
- **Type checking / linting:** `npm run type-check`, `npm run lint`.
- **Docs:** TypeDoc API reference + VitePress site
  (`npm run docs:api`, `npm run docs:build`, `npm run docs:dev`).

> Earlier versions of this document quoted specific build-time and bundle-size
> figures (e.g. "871ms", "567KB gzipped"). Those were point-in-time
> measurements, not continuously verified, and have been removed. Run
> `npm run build` for current numbers.

---

## Next Steps & Priorities

The SDK is production-ready and the backlog board is cleared. Ongoing and
optional work:

1. **Wildberries deprecation tracking.** WB continually deprecates and removes
   endpoints (the v4.0.0 major and the v4.1.0 deprecations are direct results).
   Ongoing work is reactive: validate WB change notices against the SDK and
   ship migrations ahead of WB deadlines.
2. **Documentation maintenance.** Keep the VitePress site, module pages, and
   examples in sync with the code; close the known gap of a missing
   `docs/modules/user-management.md` page if/when prioritized.
3. **Optional Web API / JWT module (experimental).** A `docs/epics/` proposal
   exists for integrating undocumented Web APIs that authenticate with JWT
   instead of an API key. This would ship as an `@experimental` module with no
   backward-compatibility guarantee and is **not started**; it is a candidate
   for future work, not a committed next release.

> Note: v1.0 is not "the next release" — the SDK is already at v4.1.0. Earlier
> "approved for v1.0 release" wording reflected a past milestone and is no
> longer accurate.

---

## Conclusion

The Wildberries TypeScript SDK is a stable, production-ready v4.1.0 library:

- 14 public modules covering the Wildberries marketplace API surface.
- ~2,376 tests across 80 files in the default suite, plus a separate TDD suite.
- 223 tracked Backlog.md tasks, all Done.
- Dual ESM/CJS build, TypeScript strict mode, VitePress + TypeDoc docs
  (bilingual EN/RU).

Active work is maintenance and WB-deprecation response, tracked as new
Backlog.md tasks.

---

**Last updated:** 2026-08-09
**Verify any fact against:** `package.json`, `src/index.ts`, `CHANGELOG.md`,
`backlog/tasks/`.
