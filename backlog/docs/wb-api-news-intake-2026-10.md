# WB API news intake — October 2026

## Purpose and evidence boundary

This register preserves all nine user-provided Wildberries API announcements, their URLs, dates, implementation ownership, and final evidence boundary.

- All nine announced repository changes are implemented locally under `TASK-217` through `TASK-226`; `TASK-219`, `TASK-224`, and `TASK-226` are Done after the composed independent review accepted the final staged candidate. Companion `TASK-231` is also Done after repairing strict NodeNext declarations and passing the same review gate.
- `TASK-232` is Done after the corrected exact-match secret-scan recovery passed an independent `FINAL ACCEPT`. The historical first hook failure and first recovery `REQUEST CHANGES` remain durable evidence; the corrected recovery retains detection for unrelated, prefix, and suffix controls and restores ordinary hook-protected commit eligibility.
- `TASK-226` uses the visible official sandbox contract: fixed host, top-level string `deliveryType` with `dbs`, `dbsPickupPoint`, and `edbs`, displayed default `dbs`, no displayed required badge, required `orders[1..10]`, optional `address`, HTTP 204, and 1 request/second. Hidden raw `required`/`nullable` metadata and runtime defaulting remain unproven; no sandbox request was made.
- Official announcement and operation URLs remain controlling. Later unauthenticated official raw Swagger captures closed the Products/GTIN, Finance, and DBS phone/order schema gates with retained hashes. The earlier HTTP 498 attempts and pinned third-party snapshot remain dated supplemental evidence, not the current gate status.
- Local mocked tests, source inspection, and documentation validation prove repository behavior only. An earlier integration command loaded existing dotenv state and attempted eight live tests; all eight failed with `NetworkError`. That attempt established no WB runtime behavior. A later guarded default integration run selected only mocked tests. No successful live proof exists, and no credential value is retained here.
- Publication dates remain unknown unless an announcement explicitly supplies one. An effective date is not treated as a publication date.
- The latest prior-news cutoff was **2026-09-24 inclusive**, based on a bounded 16-item September audit. That audit was not a complete Wildberries news feed.

## Final task matrix

| # | Announcement | Task | Local disposition |
|---:|---|---|---|
| 1 | Sales Funnel and CSV two-hour freshness | `TASK-217` | Implemented, independently reviewed, and final offline validation passed |
| 2 | Finance buyer KPP and UPD/UKD fields | `TASK-218` | Implemented; official raw schema confirms required non-null strings and date format, with documented TypeScript projection compatibility |
| 3 | TN VED and OKPD2 directories | `TASK-219` | Implemented against official raw contract; full OKPD2 is `ru`-only and the rendered `ru,en` conflict is retained |
| 4 | Removed premium text CSV percentile columns | `TASK-220` | Implemented with report-scoped fixture/contract coverage |
| 5 | Additional GTIN fields | `TASK-221` | Implemented; official raw schema confirms four optional non-null string placements; server history rule remains WB-enforced |
| 6 | Regional-sales deprecation | `TASK-222` | 4.x compatibility retained; warn-once deprecation and Order Feed migration guide added |
| 7 | DBS additional phone fields | `TASK-224` | Implemented against official raw optional non-null array and nullable-orders contract with privacy-safe tests and root exports |
| 8 | Search Queries two-hour freshness | `TASK-225` | Implemented, independently reviewed, and final offline validation passed |
| 9 | DBS sandbox `deliveryType` | `TASK-226` | Implemented from visible official contract and accepted by composed independent review; hidden raw flags and successful sandbox runtime remain unproven |

Related authorized debt closures are tracked separately: `TASK-215` Returns v1 migration, `TASK-227` package-validator repair, `TASK-228` live-test isolation, `TASK-229` FBS waybill OpenAPI parity, `TASK-230` Promotion CPC JSDoc correction, `TASK-231` strict NodeNext declarations, and `TASK-232` exact synthetic secret-scan recovery. Persistent extracted-tarball fixtures cover the news public types, all five exports, and a full-OKPD2 locale-negative check without executing SDK methods or snippets.

## Intake register

### 1. Analytics — sales-funnel and CSV refresh cadence

**Status:** Implemented locally in `TASK-217`. JSDoc, EN/RU guides, active OpenAPI descriptions, and contradiction regression coverage use the two-hour cadence without changing request rate limits. No successful live proof.

**Effective date:** 2026-09-24. Publication date is unknown and is not inferred from the effective date.

Starting from the effective date, data refreshes once per 2 hours for:

- `POST /api/analytics/v3/sales-funnel/products`
- `POST /api/analytics/v3/sales-funnel/products/history`
- `POST /api/analytics/v3/sales-funnel/grouped/history`
- CSV report `DETAIL_HISTORY_REPORT` requested through `POST /api/v2/nm-report/downloads`
- CSV report `GROUPED_HISTORY_REPORT` requested through `POST /api/v2/nm-report/downloads`

Wildberries recommends `POST /api/analytics/v1/order-feed` for current orders. This recommendation is limited to current orders: `order-feed` is not a replacement for views, cart additions, or conversion data. The two-hour refresh interval describes data freshness and must not be interpreted as an API request limit.

**Announcement links:**

- https://dev.wildberries.ru/docs/openapi/analytics/#tag/salesFunnel/operation/postV3SalesFunnelProducts
- https://dev.wildberries.ru/docs/openapi/analytics/#tag/salesFunnel/operation/postV3SalesFunnelProductsHistory
- https://dev.wildberries.ru/docs/openapi/analytics/#tag/salesFunnel/operation/postV3SalesFunnelGroupedHistory
- https://dev.wildberries.ru/docs/openapi/analytics/#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads
- https://dev.wildberries.ru/docs/openapi/analytics/#tag/orderFeed/operation/postV1OrderFeed

### 2. Reports — B2B KPP and UPD/UKD fields

**Status:** Implemented in `TASK-218` across the shared type, both local OpenAPI operations, tests, and EN/RU docs. Official public raw `13-finances.yaml` (SHA-256 `b2ef4fae9fa1601cc33942081fcd7d48ce5255101946ba014d9b5abd8f95cb96`) confirms all three fields as required non-null strings and `utdUcdDate` as `format: date`. Public TypeScript keeps them optional only because the official selective `fields` request can omit response columns.

**Publication date:** Unknown. **Effective date:** Unknown.

The following fields apply to responses from both endpoints:

- `buyerTaxRegistrationReasonCode` — B2B buyer KPP.
- `utdUcdNumber` — UPD/UKD number.
- `utdUcdDate` — UPD/UKD date.

Affected endpoints:

- `POST /api/finance/v1/sales-reports/detailed/{reportId}`
- `POST /api/finance/v1/sales-reports/detailed`

The raw requiredness is represented in local OpenAPI. No `| null` widening is added.

**Announcement links:**

- https://seller.wildberries.ru/news-v2/news-details?id=14226
- https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailedReportId
- https://dev.wildberries.ru/docs/openapi/financial-reports-and-accounting#tag/financialReports/operation/postV1SalesReportsDetailed

### 3. Items — TN VED and OKPD2 directories

**Status:** Implemented in `TASK-219` with three methods, separate limiter keys, root exports, local OpenAPI parity, and structural/type tests. Official public raw `02-items.yaml` (SHA-256 `e2eef8712991355a44e5c28cdb96ad493a31775d18605f6b3263a3a84f0aa220`) confirms TN VED `ru|en`, subject OKPD2 `ru`, and full OKPD2 `ru`. The same-date rendered full-OKPD2 `ru,en` display remains a source conflict, not proof that runtime rejects `en`. No successful live proof exists.

**Publication date:** Unknown. **Effective date:** Unknown.

New endpoints:

- `GET /api/content/v2/directory/tnved/all` — HS/TN VED code list.
- `GET /api/content/v2/directory/okpd` — subcategory OKPD2 code.
- `GET /api/content/v2/directory/okpd/all` — OKPD2 codes list.

**Announcement links:**

- https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryTnvedAll
- https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpd
- https://dev.wildberries.ru/docs/openapi/item-management#tag/categoriesSubcategoriesAndCharacteristics/operation/getV2DirectoryOkpdAll

### 4. Analytics — removed premium search-query CSV columns

**Status:** Implemented in `TASK-220`. Only the five named percentile columns were removed from the text-report contract/fixture; group/product CSV and JSON percentile surfaces remain covered and unchanged. No successful live proof.

**Effective date:** October 12, 2026. The announcement supplies October 12 without a year; 2026 is inferred solely from the current intake context. **Publication date:** Unknown.

For the `SEARCH_QUERIES_PREMIUM_REPORT_TEXT` report returned through `GET /api/v2/nm-report/downloads/file/{downloadId}`, exactly these columns are removed:

- `OpenCardPercentile`
- `AddToCartPercentile`
- `OpenToCartPercentile`
- `OrdersPercentile`
- `CartToOrderPercentile`

The deletion scope is limited to this report returned through this endpoint. Do not extend the deletion to unrelated reports or endpoints.

**Announcement link:**

- https://dev.wildberries.ru/docs/openapi/analytics/#tag/sellerAnalyticsCsv/operation/getV2NmReportDownloadsFileDownloadId

### 5. Items — additional GTIN input and response field

**Status:** Implemented in `TASK-221` at the three write positions and cards-list response, with root-export/type/OpenAPI tests and corrected EN/RU examples. Official public raw `02-items.yaml` confirms every placement as an optional non-null string. No successful live proof exists.

**Publication date:** Unknown. **Effective date:** Unknown.

An additional `gtin` parameter applies to:

- `POST /content/v2/cards/upload`
- `POST /content/v2/cards/update`
- `POST /content/v2/cards/upload/add`

The response from `POST /content/v2/get/cards/list` includes `gtin`.

**Required semantic rule:** Specify an additional GTIN only if the same GTIN previously occurred in `skus` of one of the seller's listings. It does not have to be the same listing being sent in the current payload. The same GTIN cannot occur in `skus` across different listings or across item sizes. Preserve this exact boundary: do not invent cross-account uniqueness checks, and do not globally validate GTIN history in the SDK.

**Announcement links:**

- https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUpload
- https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2CardsUpdate
- https://dev.wildberries.ru/docs/openapi/item-management#tag/listingItems/operation/postV2CardsUploadAdd
- https://dev.wildberries.ru/docs/openapi/item-management#tag/listings/operation/postV2GetCardsList

### 6. Reports — regional sales endpoint deprecation

**Status:** Implemented in `TASK-222`. The 4.x method remains callable with dated warn-once deprecation guidance; EN/RU migration examples use stable-snapshot pagination and per-page regional aggregation without claiming drop-in equivalence. No successful live proof.

**Effective date:** November 3, 2026. The announcement supplies November 3 without a year; 2026 is inferred solely from the current intake context. **Publication date:** Unknown.

Starting from the effective date, Wildberries disables `GET /api/v1/analytics/region-sale`. Use `POST /api/analytics/v1/order-feed` for regional sales statistics.

Before changing the SDK, investigate the deprecation state, all callers, and the aggregation, time-window, and pagination semantics of `order-feed` compared with the old regional sales report. Do not make a premature breaking removal from the 4.x SDK line.

**Announcement links:**

- https://seller.wildberries.ru/news-v2/news-details?id=14313
- https://dev.wildberries.ru/docs/openapi/reports#tag/salesByRegions/operation/getV1AnalyticsRegionSale
- https://dev.wildberries.ru/docs/openapi/analytics#tag/orderFeed/operation/postV1OrderFeed
- https://dev.wildberries.ru/knowledge-base/articles/01a09d9e-4f79-7016-b641-0718252e6572/lenta-zakazov#prodazhi-po-regionam

### 7. DBS — additional buyer phone-number fields

**Status:** Implemented in `TASK-224` with synthetic privacy-safe tests, local OpenAPI changes, documentation, and supported root type exports. Official public raw `05-dbs.yaml` (SHA-256 `b5f8ab9d9828757540cb9e7b230fa8c501ab5c1c02f788c2f15af595573c4f31`) confirms both phone fields as optional non-null string arrays and the top-level `orders` property as nullable. No successful live proof exists.

**Publication date:** Unknown. **Effective date:** Unknown.

The response from `POST /api/v3/dbs/orders/client` adds:

- `additionalPhones` — additional buyer phone numbers.
- `replacementAdditionalPhones` — additional replacement phone numbers.

Tests use synthetic, privacy-safe data only; documentation prohibits logging or persistence of buyer phone values.

**Announcement link:**

- https://dev.wildberries.ru/docs/openapi/dbs#tag/dbsAssemblyOrders/operation/postV3DbsOrdersClient

### 8. Analytics — Search Queries two-hour refresh cadence

**Status:** Implemented locally in `TASK-225`. All five API operations and three CSV report types use the two-hour cadence, with a regression that removes stale hourly wording only from affected operations. No successful live proof.

**Effective date:** October 12, 2026. The announcement supplies October 12 without a year; 2026 is inferred solely from the current intake context. **Publication date:** Unknown.

Starting from the effective date, data refreshes every 2 hours for these five Search Queries reports:

- `postV2SearchReportReport` — main report.
- `postV2SearchReportTableGroups` — group pagination.
- `postV2SearchReportTableDetails` — items in a group.
- `postV2SearchReportProductSearchTexts` — search texts by item.
- `postV2SearchReportProductOrders` — orders and positions by search text.

The same two-hour data-refresh cadence applies to these CSV reports requested through `POST /api/v2/nm-report/downloads`:

- `SEARCH_QUERIES_PREMIUM_REPORT_GROUP`
- `SEARCH_QUERIES_PREMIUM_REPORT_PRODUCT`
- `SEARCH_QUERIES_PREMIUM_REPORT_TEXT`

This cadence announcement is separate from entry 4, which records the deletion of five percentile columns from `SEARCH_QUERIES_PREMIUM_REPORT_TEXT`. A two-hour data refresh interval is not an API request-rate limit.

**Announcement links:**

- https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportReport
- https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableGroups
- https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportTableDetails
- https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductSearchTexts
- https://dev.wildberries.ru/docs/openapi/analytics#tag/searchQueriesForYourItems/operation/postV2SearchReportProductOrders
- https://dev.wildberries.ru/docs/openapi/analytics#tag/sellerAnalyticsCsv/operation/postV2NmReportDownloads

### 9. DBS sandbox — delivery type for test orders

**Status:** Implemented locally in `TASK-226` as `ordersDBS.createTestOrders(request)` and closed Done after composed independent review accepted the final staged candidate. The visible official portal establishes the fixed host `https://marketplace-api-sandbox.wildberries.ru`, required `orders[1..10]`, optional `address`, top-level string `deliveryType` values `dbs`, `dbsPickupPoint`, and `edbs`, displayed default `dbs`, no displayed required badge, HTTP 204, and 1 request/second. The SDK preserves omission instead of applying a client default, validates only visible order bounds, uses a dedicated write operation key with no automatic retry, and made no sandbox or production call. Hidden raw required/nullability flags and server-side defaulting remain unproven because the official raw DBS asset contains no sandbox route.

**Publication date:** Unknown. **Effective date:** Unknown.

The request to `POST /api/v3/test/dbs/orders/make` adds `deliveryType` (delivery type), enabling creation of test DBS assembly orders for PVZ and EDBS delivery flows.

The implementation follows the rendered enum and omission evidence while explicitly avoiding claims about hidden raw flags or runtime enforcement.

**Announcement link:**

- https://dev.wildberries.ru/docs/openapi-other/sandbox-environment#tag/marketplaceDbs/operation/postV3TestDbsOrdersMake

## Evidence and release boundary

1. Preserve the nine announcements, URLs, and date qualifications above when adding later evidence.
2. Treat official WB URLs and retained official raw hashes as controlling dated evidence. The pinned third-party snapshot and earlier HTTP 498 attempts remain supplemental/historical and do not override the later raw capture.
3. Keep source inspection, mocked local verification, the failed earlier network attempt, and successful live proof as separate categories. Successful live proof is absent.
4. Keep `TASK-219`, `TASK-224`, and `TASK-226` Done after the composed review accepted the final staged diff. For `TASK-226`, keep hidden raw flags, server defaulting, HTTP 204 runtime, and rate enforcement explicitly unproven.
5. The future-v5 tasks `TASK-209`, `TASK-214`, and `TASK-223` remain open and outside this 4.6.0 integration delivery.
6. Keep `TASK-232` Done after corrected recovery `FINAL ACCEPT`; preserve the first hook failure and first recovery `REQUEST CHANGES` as historical evidence, and identify the committed delivery by its containing Git object rather than a prospective self-reference.
