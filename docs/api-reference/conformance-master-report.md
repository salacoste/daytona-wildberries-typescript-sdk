# WB SDK ↔ OpenAPI Conformance — Master Audit

12 modules audited against the etalon (`docs/api-reference/raw-yaml/`, 9 live Jul-2026 + 3 local Feb-2026 stopgap). Verdicts from per-module deep-dive (automated matcher + manual classification + enum/schema checks).

## Per-module verdict

| Module | Coverage | Verdict | Headline |
|---|---|---|---|
| products | 49/49 | ✅ PASS | matcher false-positives; all 3 enums match |
| communications | 25/25 | ✅ PASS | matcher false-positives (no-operationId paths); 12 enums match |
| tariffs | 5/5 | ✅ PASS | clean; 0 enums; schemas faithful |
| ordersFBW | 7/7 | ✅ PASS | 4 enums match; 3 benign additive optional fields |
| analytics | 17/18 | ⚠️ GAPS | 1 real gap (`/item-rating`); 1 enum widened |
| general | 9/10 | 🔴 DEFECTS | `AccessCode` enum drift; 3 JamSubscription enums → string |
| promotion | 31/39 | 🔴 DEFECTS | `BidType`, `CampaignPlacementType`; 8 gaps |
| ordersFBS | 34/35 | 🔴 DEFECTS | `DeleteMetaParams.key` enum erased; 1 gap; schema fields |
| ordersDBS | 19/19 active | 🔴 DEFECTS | `deliveryType` missing `edbs`; status enum value drift; meta types |
| **inStorePickup** | 4/18 | 🚨 DEFECTS | **PATH DRIFT — 12 methods on stale URLs** |
| reports | 24/24 | 🔴 DEFECTS | double-wrapped response types (structural) |
| finances | 12/12 | 🔴 DEFECTS | `report_type` spurious `4`; `reportType` widened; missing B2B TIN |

Adjusted real coverage ≈ **235/273** (products/communications false-positives removed; ordersDBS 12 "missing" are deprecated).

---

## 🚨 CRITICAL — inStorePickup path drift (potentially broken at runtime)

12 methods call **stale `/api/v3/click-collect/orders/{id}/...`** (single-order, PATCH/PUT/DELETE) while the spec serves them at **`/api/marketplace/v3/click-collect/...`** (batch, POST). WB migrated these → SDK URLs may 404 or hit old endpoints.

| Spec (current) | SDK (stale) |
|---|---|
| `POST /api/marketplace/v3/click-collect/orders/status/confirm` | `PATCH /api/v3/click-collect/orders/{id}/confirm` |
| `.../status/prepare` `.../receive` `.../reject` `.../cancel` | (same pattern, PATCH single-order) |
| `POST .../status/info` | `POST /api/v3/click-collect/orders/status` |
| `POST .../meta/details` `.../delete` `.../sgtin` `.../uin` `.../imei` `.../gtin` | GET/DELETE/PUT on `/api/v3/.../{id}/meta/...` |

+ 1 real gap (`customs-declaration`), 1 spec-deprecated (`meta/info`). Type defects: `wbStatus` missing `sorted` (types:218), `deleteOrdersMeta.key` string-not-enum, `orderId`→`id` rename drift, missing `options.isB2b`.

---

## Type defects (prioritized, with file:line)

**promotion** (`src/types/promotion.types.ts`)
- `BidType = 'auto' | 'manual'` (:1513) — spec `[manual, unified]`. **Wrong values.**
- `CampaignPlacementType = 'search' | 'recommendations'` (:1518) — spec `[combined, search, recommendation]`. **Missing `combined`; plural-vs-singular.**

**general** (`src/types/general.types.ts`)
- `AccessCode` (:83) — missing `brandzone`, `brandzoneSubscribe`, `marketplace`, `oldAnalyticsReports`; extra `feedbacksQuestions`, `wbPoint`.
- `JamSubscriptionDetails.state/activationSource/level` (:301/303/305) — widened to `string` (spec enums: `[active,inactive]`, `[constructor,jam]`, `[standard,advanced,premium]`).

**ordersFBS** (`src/types/orders-fbs.types.ts`)
- `DeleteMetaParams.key?: string` (:94) — spec closed enum `[imei,uin,gtin,sgtin,customsDeclaration]`.
- `OrderNew`/`Supply` missing `isPickupPointShipmentAllowed`; `Supply` missing `recommendedWhId`.

**ordersDBS** (`src/types/orders-dbs.types.ts`)
- `DBSOrderNew.deliveryType?: 'dbs'` (:47) — spec `[dbs, edbs]`. **Missing `edbs`.**
- `DBSSupplierStatus` (:154) uses `canceled_by_missed_call` — spec `cancel_missed_call`.
- `DBSWbStatus` (:166) has spurious `sorted` (not in DBS spec).
- `DBSOrderMeta` imei/uin/gtin typed `{value?: number}` — spec strings.
- Schema drift: missing `options/groupId/finalPrice/convertedFinalPrice/replacementPhone`; misplaced `ddate/dTime*`.

**reports** (`src/types/reports.types.ts`)
- `MeasurementPenaltiesResponse`/`WarehouseMeasurementsV2Response` (:905-922) — **double-wrapped** (structural mismatch vs spec).
- `IncomesItem` (:10) — orphan type, no spec backing.

**finances** (`src/types/finances.types.ts`)
- `DetailReportItem.report_type?: 1|2|3|4` (:238) — spec `[1,2,3]`. **Spurious `4`.**
- `SalesReportListRes.reportType` (:402), `SalesReportsDetailedRes.reportType` (:455) — widened to `number` (should be `[1,2,3]`).
- Missing `b2bCustomerTin` / `b2b_customer_tin` (B2B buyer TIN).

**analytics** (`src/types/analytics.types.ts`)
- `SalesFunnelGroupReq.params.aggregationLevel?: string` (:684) — should be `[day,week,month]`.

---

## Real endpoint gaps (features to add)

- **promotion (8):** `/adv/v1/upd`, `/adv/v1/payments` (finance history), `/api/advert/v1/config`, v1 normquery bids/stats (seller currency), `/adv/v0/normquery/list`, media-campaigns API (`advert-media-api` — new domain: `/adv/v1/adverts`, `/adv/v1/advert`).
- **ordersFBS (1):** `GET /api/marketplace/v3/fbs/orders/archive`.
- **general (1):** `GET /api/common/v1/tariff-constructor/options` (Plan Builder).
- **analytics (1):** `POST /api/analytics/v1/item-rating`.
- **inStorePickup (1):** `POST .../meta/customs-declaration` (B2B).

## Cleanup (deprecated SDK-only)
- promotion: 6 deprecated v0 methods (`/adv/v0/auction/bids`, `/adv/v0/auction/adverts`, `/adv/v1/auto/*`, `/adv/v0/stats/keywords`, `/adv/v1/promotion/adverts`).

## Matcher limitations (for tooling v2)
- products/communications false-positives: spec paths lacking `operationId` + dual GET/PATCH on same path weren't matched. Improve matcher to key on `(server, method, path)` and allow multi-method paths.
