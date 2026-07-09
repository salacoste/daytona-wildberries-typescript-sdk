# WB SDK Deep Conformance Audit — Summary (12 modules)

Field-by-field validation of every module's types vs the WB OpenAPI etalon (`raw-yaml/` → `parsed/`). Each module audited by a dedicated subagent; findings recorded in a per-module backlog task. Accounted for the first-pass type-defect fixes (commits `393e40680` + `d75285d13`).

> **Status (2026-07-09):** All 12 audit tasks are now closed (status Done) — **12/12 complete**. ordersFBS archive gap resolved via task-141; ordersDBS CRIT#1 (`DBSOrderMeta` value-types) resolved, remaining 4 ordersDBS CRITs **deferred** until WB publishes an authoritative ordersDBS spec (current source is a local stopgap).

## Verdicts

| Module | Task | Verdict | Headline |
|---|---|---|---|
| tariffs | task-176 | ✅ CLEAN | 1 LOW advisory (warehouseList `\| null`) |
| ordersFBW | task-179 | ✅ CLEAN | 1 field-name normalization (can/isBoxOnPallet) |
| finances | task-181 | ✅ CLEAN | 91/91 + 92/92 fields match; fixes confirmed |
| ordersFBS | task-175 | ✅ CLEAN (audited) | archive gap **RESOLVED** (task-141) → 35/35 endpoints; 2 minor (crossborder status = WB self-inconsistency, not a defect; dead dup type `SupplyOrderIDsAPI` → 4.0.0 cleanup) |
| communications | task-178 | ⚠️ 1 HIGH | `orderStatus` missing; **`updateClaim()` unusable → 400** |
| general | task-180 | ⚠️ 1 HIGH | **`getSellerRating` wrong domain** (common-api vs feedbacks-api) |
| analytics | task-169 | 🔴 2 DEFECT | missing `currency` on 4 search-report wrappers; required→optional |
| promotion | task-164 | 🔴 8 DEFECT | missing `currency` ×8; `PlacementType` still plural |
| inStorePickup | task-174 | 🔴 2 CRIT | batch-vs-single shape loss ×9; `wbStatus` missing `sorted` (inverted vs ordersDBS) |
| ordersDBS | task-173 | 🔴 4 CRIT (deferred) | 1 CRIT resolved (`DBSOrderMeta` value-types→string); 4 remain (`DeliveryDateInfo` invented, `getGroupsInfo`/`getDeliveryDates`/`getMetaBulk` wrong wire shape) — **ALL DEFERRED** until WB publishes authoritative ordersDBS spec (current = local stopgap) |
| reports | task-177 | 🔴 5 CRIT | **5 fabricated response types** (RegionSale/Antifraud/GoodsLabeling/BrandShare) |
| products | task-167 | 🔴 7 DEFECT | **price/discount writes broken** (bare array vs `{data}`); `createGoodsFilter` wrong field; `createMediaFile` unusable |

**Totals:** 4 CLEAN (incl. ordersFBS post-task-141) · 8 with open findings · ~45 findings recorded (all ordersDBS fixes deferred pending an authoritative spec).

## 🚨 Most urgent (runtime-breaking — likely 400 / wrong data)

1. **products** — `createUploadTask`/`createTaskSize`/`createTaskClubDiscount` send a bare array; spec requires `{ data: [...] }`. **All price & discount writes broken.** `createGoodsFilter` sends `nmIDs` (spec: `nmList`) → empty results (ties to task-138). `createMediaFile()` takes no params (spec needs `X-Nm-Id`/`X-Photo-Number` headers + multipart). → task-167
2. **reports** — 5 analytics-in-reports methods return **completely fabricated response shapes** (wrong wrapper key `data` vs `report`/`details`, invented fields): `getAnalyticsRegionSale`, `getAnalyticsAntifraudDetails`, `getAnalyticsGoodsLabeling`, `getBrandShareBrands`, `getAnalyticsBrandShare`. → task-177
3. **ordersDBS** — `getGroupsInfo()`/`getDeliveryDates()` request/response types don't match the wire shape → 400 / silent mis-parse. `DeliveryDateInfo` entirely invented. → task-173
4. **inStorePickup** — 9 status/meta methods: single-order shape vs spec's batch (ties to path drift task-147). → task-174
5. **general** — `getSellerRating` calls `common-api` but spec mandates `feedbacks-api` → 404/auth-reject. → task-180
6. **communications** — `updateClaim()` sends `undefined` to a required body → 400. → task-178

## Cross-cutting patterns
- **Missing `currency` field** on many response types (promotion ×8, analytics ×4) — WB added it; SDK omits.
- **`wbStatus` `sorted`** — inverted drift: ordersDBS has it spurious (fixed), inStorePickup is missing it. Reconcile per-module vs spec.
- **Request-body wrappers** — several write methods send bare payloads where spec wraps in `{ data: [...] }` / `{...}` (products, inStorePickup labels).
- **Required-vs-optional** — codebase-wide convention renders spec-required fields as optional `?` (safer for WB's empty-200 responses); mostly intentional, not defects.

## Related backlog tasks (from earlier passes)
- task-146: type-defect batch (enum/value fixes — DONE; deferred: ordersDBS meta-types, user-management AccessCode dup).
- task-147: inStorePickup path-drift migration (breaking).
- task-148: missing endpoints (12).
- task-149: retire 6 deprecated v0 promotion methods.

## Recommended fix order
1. **Runtime-breaking** (products writes, reports fabricated types, ordersDBS groups/dates, general domain, communications updateClaim) — these are live bugs.
2. inStorePickup migration (task-147).
3. Missing `currency` fields (promotion/analytics) + enum reconciliations.
4. Endpoint gaps (task-148) + cleanup (task-149).

Full field-by-field detail per module is in each task's Implementation Notes.
