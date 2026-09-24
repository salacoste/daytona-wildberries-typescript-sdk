# WB API Changes — September 2026 Sync

> Covers SDK **v4.3.0** and **v4.4.0**: fifteen Wildberries API news items
> implemented between 2026-09-17 and 2026-09-24. This guide summarizes what
> changed, which methods to migrate to, and the deadlines that affect you.

---

## Deadlines that affect your integration

| Date | What happens | Action |
|------|--------------|--------|
| **2026-10-01** | FBS shipping parameters (+ ETrN for transport-company deliveries) become **mandatory** — `updateSuppliesDeliver()` returns **409** without them | Set `updateShippingMethod()` for RF supplies; the waybill (ETrN) method is pending WB release |
| **2026-11-16** | WB **disables** `GET /adv/v1/budget` | Migrate `getAdvBudget()` → `postV2Budget()` (deprecated since v4.3.0, removal in v5) |
| *(date TBA)* | WB will disable `GET /api/v1/supplier/orders` and `/sales` | Migrate to the real-time Order Feed — `sdk.analytics.getOrderFeed()` |

---

## New methods by area

### Promotion (v4.3.0)

- **`postV2Budget({ advertIds })`** — budgets for up to 50 campaigns in one request.
  Response `total` is in **base** currency units (unlike most SDK amounts, which
  are minor units). Replaces the deprecated `getAdvBudget()`.
- **`getV0DailyLimits(advertIds)` / `putV0DailyLimits(data)`** — CPC campaign daily
  limits (minor units; `dailyLimit` ≥ 1000, minimum from `getV1Config().minDailyLimit`;
  `carryOverEnabled` supported). `getV1Config()` also gained `minTopUp`.
- **`getBidsRecommendations()`** now returns CPC recommendations too — discriminate
  by `paymentType`; CPC campaigns carry `levels` (bids per listing position range
  1-2 / 3-10 / 11-34) instead of `normQueries`.

### Order data & pricing (v4.4.0)

- **`sdk.analytics.getOrderFeed(data)`** — real-time unified Order Feed (orders +
  buyouts in one stream, statuses `created|buyout|cancel|return|returnDefective`
  with `cancelType` reasons, B2B flag, deferred payments). Paginate with
  `offset` **within the same `snapshotTime` cursor**; only statuses mutate over
  time. Strict rate limit: 1 req/min. Replaces supplier orders/sales reports.

  ```typescript
  let offset = 0;
  let snapshot: string | undefined;
  do {
    const page = await sdk.analytics.getOrderFeed({
      selectedPeriod: { start: '2026-09-01T00:00:00Z', end: '2026-09-24T00:00:00Z' },
      pagination: { snapshotTime: snapshot, offset, limit: 1000 },
    });
    snapshot = page.data.snapshotTime; // keep the cursor stable across pages
    offset += page.data.orders.length;
    // ... process orders
  } while (/* more pages */);
  ```

- **`sdk.ordersDBS.getOrdersFinalPrice({ orders })`** and
  **`sdk.inStorePickup.getOrdersFinalPrice({ orders })`** — seller prices (no
  discounts) and buyer-payable sums (all discounts + cashback) by assembly order
  IDs. **For calculations use `originalFinalPrice` / `convertedOriginalFinalPrice`.**
  Fall back to the order-listing `finalPrice` fields **only** when the new method
  returns `data: null` for those IDs; `data: {}` means the data is still being
  generated — retry.

### FBS: SPOT, shipping, archive (v4.3.0)

- **SPOT** (EAEU road imports; Kyrgyzstan sellers today): `getSpotCountries()`,
  `updateSupplySpot()`, `getSuppliesSpotList()`, `getSupplySpotStickers()`; supplies
  expose `spotAvailable`.
- **Shipping (RF sellers)**: `getShippingPoints()` + `updateShippingMethod()` —
  see the 2026-10-01 deadline above.
- **3-month window on `orders()`** (effective 2026-08-06): older assembly orders are
  available **only** via `getOrdersArchive({ year, month, next, limit })`.
- **Typed 409 `CustomsDeclarationIsRequiredError`** — thrown by `createOrdersSticker()`
  when a required customs declaration (ДТ) is missing; see the module page for the
  full ДТ rule set (confirm-status-only, Armenia rule, `decision` semantics).

### FBW supplies (v4.3.0)

- **`getSupplyDiscrepancies(supplyId)`** — declared-vs-actual acceptance
  discrepancies per package (with acceptance video refs). Very strict limit:
  **1 req/min**. `getSupply()` gained a `discrepancies` field (when `statusID: 5`).
- **Supply drafts CRUD** — `createDraft()`, `listDrafts()`, `getDraftItems()`,
  `addDraftItems()` (atomic all-or-nothing), `deleteDraftItems()` (no SKU
  validation), `deleteDraft()`.

### Products & reports (v4.3.0 + v4.4.0)

- **Card `documents` object** — 8 register document types on
  `createCardsUpload` / `createUploadAdd` / `createCardsUpdate` / `getCardsList`
  (response includes validation verdicts). Passing documents via `characteristics`
  is restricted and may be processed incorrectly — use `documents`. **Card update
  overwrites the card: pass ALL documents, including unchanged ones (reuse `id`).**
- **`sdk.analytics.getSellerWarehousesStock()`** — stocks across all seller
  warehouses without warehouse/size IDs (30-minute refresh).
- Measurement-penalties report items gained `dateStart`/`dateEnd` (coefficient
  validity period).

## Data-freshness notes

- Stocks-history reports (v2 groups/products/sizes/offices + STOCK_HISTORY CSV)
  refresh **once per 2 hours** since 2026-09-17 — for current data use
  `getWbWarehousesStock()` / `getSellerWarehousesStock()`.

## Where to read more

Module pages: [promotion](../modules/promotion.md) ·
[analytics](../modules/analytics.md) · [orders-fbs](../modules/orders-fbs.md) ·
[orders-fbw](../modules/orders-fbw.md) · [products](../modules/products.md) ·
[reports](../modules/reports.md). Changelog: [CHANGELOG.md](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/CHANGELOG.md).
