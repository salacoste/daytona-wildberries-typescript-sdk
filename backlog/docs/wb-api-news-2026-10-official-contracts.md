# WB API news, October 2026 — contract evidence

**Retrieval date:** 2026-10-11 (Europe/Moscow)
**Purpose:** implementation-facing evidence for the nine supplied announcements. This document records contracts, not live API behaviour. No seller account, token, cabinet, or sandbox mutation was used.

## Current evidence supersession

This register preserves the initial HTTP 498 and pinned third-party snapshot evidence
as dated provenance. Current exact Products directories/GTIN, Finance, and DBS
phone/order contracts are controlled by the later official public raw Swagger capture
in `backlog/docs/wb-api-news-2026-10-official-raw-contracts.md`. The special sandbox
make-order route is controlled separately by the rendered official evidence in
`backlog/docs/wb-api-news-2026-10-official-schema-completion.md`; the normal DBS raw
asset does not contain that route. Neither source class is successful runtime proof.

## Evidence status and source boundary

### Official WB documentation (primary)

The primary sources are the public WB documentation operation URLs linked in each section below. Direct, unauthenticated retrieval from this environment on 2026-10-11 returned **HTTP 498** (`status-no-id: INF-01-EL` / `INF-02-XC`) for the `dev.wildberries.ru` OpenAPI pages. That proves neither a missing operation nor a contract change; it is an environment-specific anti-bot retrieval limitation.

The documentation URLs are still the authoritative source for implementation review. Effective dates mentioned by WB without a year are recorded as 2026 only where the delivery request supplied that context (12 October and 3 November). No publication date has been invented.

### Pinned source-reference snapshot (supplemental, not authority)

To make the current public document text reviewable despite the WB HTTP 498 response, the following public, OpenAPI-derived snapshot was fetched by immutable commit on 2026-10-11:

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed` (commit timestamp **2026-10-10T08:10:59Z**, branch `main` at retrieval) — production multi-language generated client repository. It is a recent independent capture, not an official WB publication and must not override a subsequently accessible WB page.
- SHA-256 of the retrieved source files: `specs/02-items.yaml` `e5e7d3625585336c503612b465c067994e69a2d7ae8cb3dbdb32816b4612541a`; `specs/05-dbs.yaml` `39cdef6e2d41678d684fce219c67f9e25c6991ca8bd15d62eccb695d4fad0e74`; `specs/11-analytics.yaml` `c392e4dee3a09cdb58768bc9443dcd13bf8c3b07a0878119a66cf5dd64c3305f`; `specs/12-reports.yaml` `c3e24484e4f3544d91feda141eccfc5d54662d3c09225cb329d3aaf7b09d1a0b`; `specs/13-finances.yaml` `9f7bb391afc3401a57ae2b689d544b0d8560c2914a400b97a8436cb1208eff69`.

Line citations below refer to that fixed commit and are supplemental evidence only.

## 1. Sales-funnel and seller-analytics CSV cadence

**Official operations:**

- [Products](https://dev.wildberries.ru/docs/openapi/analytics/#tag/salesFunnel/operation/postV3SalesFunnelProducts)
- [Products history](https://dev.wildberries.ru/docs/openapi/analytics/#tag/salesFunnel/operation/postV3SalesFunnelProductsHistory)
- [Grouped history](https://dev.wildberries.ru/docs/openapi/analytics/#tag/salesFunnel/operation/postV3SalesFunnelGroupedHistory)
- [CSV creation](https://dev.wildberries.ru/docs/openapi/analytics/#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads)
- [Order feed](https://dev.wildberries.ru/docs/openapi/analytics/#tag/orderFeed/operation/postV1OrderFeed)

**Verified contract guidance:**

- The three sales-funnel operations state that report data refreshes once per two hours. The CSV-create operation likewise states that report data refreshes once per two hours. This is *data freshness*, not a new request-rate limit.
- `DETAIL_HISTORY_REPORT` maps to the sales-funnel-by-WB-item request and `GROUPED_HISTORY_REPORT` to the grouped sales-funnel request. Both are valid CSV `reportType` values.
- Order feed is a separate real-time report for orders and sales; it cannot be represented as a replacement for funnel views, cart additions, or conversion metrics. Its request filters the current status period and supports stable pagination with `snapshotTime`, `offset`, and `limit` (maximum 10,000).

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/11-analytics.yaml:L59-L69`, `L153-L163`, `L232-L242` — the three two-hour sales-funnel descriptions.
- `...:specs/11-analytics.yaml:L343-L346`, `L371-L381` — CSV two-hour wording and `reportType` discriminator mapping.
- `...:specs/11-analytics.yaml:L1848-L1871`, `L6522-L6566` — order-feed real-time, 31-day/current-status ordering, request pagination contract.

**Implementation effect:** documentation/JSDoc and CSV contract coverage are appropriate; do not change an API rate limiter merely because of this cadence notice.

## 2. Financial detailed-report fields

**Official operations:**

- [Detail by report ID](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId)
- [Detail by period](https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed)

**Verified contract guidance:** both operations return the shared `SalesReportsDetailedRes` array item. In the fixed snapshot its `required` set includes all three additions and none are declared nullable:

| Field | OpenAPI type | Nullability | Meaning |
| --- | --- | --- | --- |
| `buyerTaxRegistrationReasonCode` | `string` | non-null | B2B buyer KPP |
| `utdUcdNumber` | `string` | non-null | UPD/UKD number |
| `utdUcdDate` | `string`, `format: date` | non-null | UPD/UKD date |

The implementation should add them to the common response model, field selector union, generated/reference API docs, and synthetic response fixtures. It should not confuse `buyerTaxRegistrationReasonCode` with an acquiring-side seller tax field.

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/13-finances.yaml:L1258-L1267`, `L1644-L1656` — required list and scalar definitions.

**Caveat:** a fresh, directly downloaded WB OpenAPI file was not obtainable because of HTTP 498. If live official access later differs, treat the official definition as controlling.

## 3. TN VED and OKPD2 directories

**Official operations:**

- [TN VED full directory](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnvedAll)
- [OKPD2 by subject](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpd)
- [OKPD2 full directory](https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpdAll)

| Operation | Parameters | Success payload | Snapshot rate note |
| --- | --- | --- | --- |
| `GET /api/content/v2/directory/tnved/all` | optional `search: integer` (first digits; description says ≤10 characters), optional `locale: "ru" | "en"`, default `ru` | envelope with required `data`, `error`, `errorText`, `additionalErrors`; each `data[]` item requires `tnved: string`, `description: string` | Content: 100/min, 600 ms, burst 5 |
| `GET /api/content/v2/directory/okpd` | required `subjectId: integer`; optional `search: string`; optional `locale: "ru"`, default `ru` | same envelope; item requires `okpd2: string`, `description: string` | same |
| `GET /api/content/v2/directory/okpd/all` | optional `search: number` as written in the snapshot; optional `locale: "ru"`, default `ru` | same envelope and `okpd2`/`description` item | same |

The `okpd/all` `search: number` declaration conflicts with its prose example of dotted prefixes. Preserve the declared type in a source-sync task, but add a regression fixture for the documented dotted prefix and flag this as upstream ambiguity rather than silently normalising it.

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/02-items.yaml:L1166-L1296`, `L1297-L1423` — all three routes, parameters, envelope and rate wording.

## 4. Search-text CSV percentile-column shutdown

**Official operation:** [Download generated CSV](https://dev.wildberries.ru/docs/openapi/analytics/#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId)

**Verified scope:** the five notices occur only in the CSV column table for `SEARCH_QUERIES_PREMIUM_REPORT_TEXT`: `OpenCardPercentile`, `AddToCartPercentile`, `OpenToCartPercentile`, `OrdersPercentile`, and `CartToOrderPercentile`.

They do not apply to `SEARCH_QUERIES_PREMIUM_REPORT_GROUP` or `SEARCH_QUERIES_PREMIUM_REPORT_PRODUCT`, and they do not justify deleting similarly named fields elsewhere. The snapshot still contains the columns but each says it will be disabled on 12 October; as of retrieval (2026-10-11), that is a deprecation notice, not proof of a completed removal.

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/11-analytics.yaml:L855` — the report-type table and all five explicitly scoped notices.

**Implementation effect:** make a text-report CSV parser/schema tolerate absence of just these headers after 2026-10-12; retain fields for unrelated report types.

## 5. Additional listing GTIN

**Official operations:**

- [Create listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUpload)
- [Update listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate)
- [Create listing with merge](https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd)
- [List listings](https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList)

**Verified contract guidance:** `gtin` is a non-required, non-nullable `string`, marked RF-seller-only. It belongs to the listing/card item, not to a size object:

| Operation | Exact schema location |
| --- | --- |
| `POST /content/v2/cards/upload` | `items[].variants[].gtin` |
| `POST /content/v2/cards/update` | `items[].gtin` |
| `POST /content/v2/cards/upload/add` | `cardsToAdd[].gtin` |
| `POST /content/v2/get/cards/list` response | `cards[].gtin`; returned only when populated |

The source prose states that the GTIN may be sent only when the same GTIN was previously provided in `skus`, and the same GTIN must not appear in `skus` across different listings or sizes. This is a WB data-rule; an SDK cannot safely enforce the historical or cross-listing portion without maintaining remote listing state. Model/document the field and pass it through; do not invent local cross-account enforcement.

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/02-items.yaml:L2311-L2314`, `L2962-L2965`, `L4094-L4097`, `L4405-L4408` — response and request definitions.

## 6. Region-sale deprecation and order-feed boundary

**Official sources:**

- [Sales by regions](https://dev.wildberries.ru/docs/openapi/reports#tag/salesByRegions/operation/getV1AnalyticsRegionSale)
- [Order feed knowledge-base article](https://dev.wildberries.ru/knowledge-base/articles/01a09d9e-4f79-7016-b641-0718252e6572/lenta-zakazov#prodazhi-po-regionam)
- [Order feed operation](https://dev.wildberries.ru/docs/openapi/analytics/#tag/orderFeed/operation/postV1OrderFeed)

**Verified contract guidance:** `GET /api/v1/analytics/region-sale` is marked `deprecated: true`, with a supplied shutdown notice for 3 November. It takes only required `dateFrom` and `dateTo` `YYYY-MM-DD` query values; the legacy report has no pagination parameter and returns regional aggregate fields including `cityName`, `countryName`, `foName`, `regionName`, item identifiers, `saleInvoiceCostPrice`, `saleInvoiceCostPricePerc`, and `saleItemInvoiceQty`.

`POST /api/analytics/v1/order-feed` is materially different: it returns current order/sale events, at most 31 days by current status, newest first, and has pagination with a stable `snapshotTime`. Its event contains delivery fields such as `destinationCity` and `destinationDistrict`, but the source does not prove that a consumer aggregation reproduces the legacy regional-sale money/share semantics.

Therefore a 4.x SDK should retain the existing legacy method with deprecation JSDoc and a dated migration note. Do not silently substitute an order-feed aggregation or remove the method before the project’s next major version and a separately verified semantic migration.

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/12-reports.yaml:L1661-L1675` — deprecated flag and 3-November notice.
- `...:specs/12-reports.yaml:L1676-L1760` — legacy date parameters and response schema.
- `...:specs/11-analytics.yaml:L1848-L1871`, `L6522-L6566`, `L6567-L6681` — order-feed scope, time/pagination and delivery-location fields.

## 7. DBS buyer contact arrays

**Official operation:** [DBS buyer information](https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient)

**Verified contract guidance:** `POST /api/v3/dbs/orders/client` returns `orders?: DbsOnlyClientInfo[]`. `additionalPhones` and `replacementAdditionalPhones` are optional properties (the object has no `required` array), each a **non-nullable array of non-null strings**. WB says an empty array means the number is not provided. `additionalPhones` are direct extra contacts; the `replacementAdditionalPhones` are masked alternatives. Use synthetic telephone-like fixtures only and do not log customer payloads.

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/05-dbs.yaml:L340-L420`, `L2706-L2724` — operation, production/sandbox bases and exact field definitions.

## 8. Search-report and CSV cadence

**Official operations:**

- [Main page](https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportReport)
- [Pagination groups](https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableGroups)
- [Pagination items](https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableDetails)
- [Item texts](https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts)
- [Orders and positions](https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductOrders)
- [CSV creation](https://dev.wildberries.ru/docs/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads)

**Verified contract guidance:** this is a data-freshness documentation change for the five named search-report operations and the three CSV types `SEARCH_QUERIES_PREMIUM_REPORT_GROUP`, `_PRODUCT`, and `_TEXT`. It must not be converted into a rate-limit change. The CSV operation’s report-type discriminator lists all three. The percentile shutdown in item 4 is a separate, narrower text-CSV schema change.

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/11-analytics.yaml:L343-L381` — CSV cadence and report-type mapping. The five search-operation pages are authoritative for their individual wording; direct source retrieval was blocked as described above.

## 9. DBS sandbox order creation: contract gap

**Official operation:** [Create test DBS order](https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs/operation/postV3TestDbsOrdersMake)

The provided announcement says `POST /api/v3/test/dbs/orders/make` adds `deliveryType` for DBS-to-pickup-point and EDBS test assembly orders. The current pinned public snapshot does not include the separate `openapi-other/sandbox-environment` source, and direct WB retrieval was HTTP 498. Consequently this evidence set cannot responsibly assert the special operation’s request schema, `deliveryType` enum, required/default status, or server base URL.

The ordinary DBS spec does list marketplace sandbox base `https://marketplace-api-sandbox.wildberries.ru` and ordinary DBS order delivery labels, but that is insufficient proof for the special test route. Keep this as a contract-verification task; do not add a guessed public SDK method or execute sandbox calls.

## Cross-cutting returns correction

The current report source distinguishes:

- legacy `GET /api/v1/analytics/goods-return`, deprecated with 26-October shutdown;
- replacement `GET /api/analytics/v1/item-returns` (`operationId: getV1GoodsReturn`).

The replacement requires `dateFrom` and `dateTo` in `YYYY-MM-DD`, accepts optional `status: active | archive`, `limit` (0..1000), and `offset`, and returns required `count` plus `report`. This verifies that migration debt which continues to call the old `goods-return` path is real. It does **not** justify an early physical removal of the deprecated method from the 4.x public surface.

**Official operation:** [Returns and item movement report](https://dev.wildberries.ru/docs/openapi/reports#tag/returnsAndItemMovementReport/operation/getV1GoodsReturn)

**Supplemental source-reference:**

- `eslazarev/wildberries-sdk@ed543365a7d73463ff52aca8764e12f42c5c18ed:specs/12-reports.yaml:L2062-L2076`, `L2223-L2350` — old-route deprecation and replacement request contract.

## Delivery recommendation

Proceed with the contract-confirmed type, docs, parser-tolerance, source-spec, and deprecation work. Preserve two explicit verification gates:

1. refresh items 2, 3, 5, 7 and 8 against directly accessible WB OpenAPI before a versioned public release if the host becomes accessible; and
2. do not implement news item 9 until the official sandbox operation exposes its exact request schema and enum.

Neither green local tests nor this evidence artifact establishes live WB runtime behaviour.

## Later implementation correction

This dated register's item 9 and delivery recommendation preserve the evidence state
before the headed official schema-completion pass. They are superseded for current
delivery status by `wb-api-news-2026-10-official-schema-completion.md` and
`wb-api-sandbox-delivery-type-implementation-2026-10.md`: the visible official
contract exposed top-level string `deliveryType` values `dbs`, `dbsPickupPoint`, and
`edbs`, displayed `dbs` as the default without a required badge, and supplied the
remaining visible request shape. `ordersDBS.createTestOrders(request)` is now
implemented with omission preservation, a fixed sandbox host, a dedicated 1 rps
limiter, and no automatic write retry. Hidden raw required/nullability flags and live
runtime behavior remain unproven, and no sandbox call was made.
