# WB API Changes — October 2026 Sync

> Covers SDK **v4.7.0** and **v4.8.0**: the October Wildberries API news.
> v4.7.0 absorbed the nine early-October announcements (directories, GTIN,
> region-sale deprecation, DBS phones, report freshness, sandbox deliveryType);
> this guide focuses on the **late-October wave** (v4.8.0) and the deadlines.

---

## Deadlines that affect your integration

| Date | What happens | Action |
|------|--------------|--------|
| **2026-11-03** | WB **disables** `GET /api/v1/analytics/region-sale` | Migrate `reports.getAnalyticsRegionSale()` → Order Feed aggregation (deprecated since v4.7.0, removal in v5) |
| **2026-11-05** | WB **disables 3 legacy sandboxes** (statistics / supplies / advert) | No SDK code impact; sandbox testing for FBW supplies, promotion and statistics reports disappears entirely — see below |
| **2026-11-16** | WB **disables** `GET /adv/v1/budget` | Migrate `getAdvBudget()` → `postV2Budget()` (deprecated since v4.3.0, removal in v5) |
| **2026-11-20** | WB **disables** `GET /api/marketplace/v3/fbs/shipping-points` | Migrate `ordersFBS.getShippingPoints()` → `getSupplyShippingPoints()` (deprecated since v4.8.0, removal in v5) |

---

## New methods (v4.8.0)

### Seller-portal notifications — `sdk.general.getNotifications(params?)`

`GET /api/communications/v1/notifications` (WB news 2026-10-27). Notifications
from the seller portal in Russian, newest first. **Available only to sellers
registered in the Russian Federation** (403 `countryError` otherwise).

```typescript
let from: string | undefined;
do {
  const page = await sdk.general.getNotifications({ limit: 100, from });
  process(page.data);
  from = page.data.at(-1)?.date; // cursor pagination via the last item's date
} while (from);
```

- `from` — date-time cursor: pass the `date` of the last notification to page back
- `timezone` — IANA zone (default `Europe/Moscow`); `limit` — 5–100 (default 10)
- Rate limit: 1 req/min, burst 10

### Per-supply shipping points — `sdk.ordersFBS.getSupplyShippingPoints(supplyId, params)`

`GET /api/marketplace/v3/fbs/supplies/{supplyId}/shipping-points` (WB news
2026-10-20). Returns shipping points available **for the specified supply** —
feed the `id` values into `updateShippingMethod()`.

- `officeType` (required): comma-list `sc|sw|pp|pfc|gpp`; `city` (required, Cyrillic);
  `shippingDt` — required for cargoType 1 and 3
- Unlike the deprecated global list: no `cargoType` filter — each point carries an
  **`available` flag** (`false` when a pickup point is overloaded on the planned date)
- **`getShippingPoints()` is deprecated** (WB disables the endpoint on
  **2026-11-20**, removal in v5) and now emits a one-time deprecation warning
- 404 `supply not found`; 409 when the supply has no assembly orders

### Move orders back to assembly — `sdk.ordersFBS.transferSupplyOrders(supplyId, data)`

`PATCH /api/marketplace/v3/fbs/supplies/{supplyId}/orders/transfer` (WB news
2026-10-14). Moves assembly orders from `complete` (in delivery) back to
`confirm` (in assembly) — e.g. from a closed supply to an open one.

```typescript
const statuses = await sdk.ordersFBS.getOrderStatuses({ orders: [5678954321] });
if (statuses.orders![0].isTransferable) {
  const result = await sdk.ordersFBS.transferSupplyOrders('WB-GI-100', {
    orderIds: [5678954321],
    newSupplyId: 'WB-GI-200',
  });
}
```

- Eligibility pre-check: the new **`isTransferable`** field on order statuses
  (all must hold: order in `complete`; target supply not delivered; not moved before)
- Per-order results: `success: true` + new sticker ID, or `error { code, detail }`

## Response field additions

- **`ordersFBS.orders()`**: `trackNumber` — track number for Cross-Border orders
- **`general.sellerInfo()`**: `country` — seller account registration country (e.g. `'ru'`)

## Sandbox shutdown (2026-11-05)

WB disables three legacy sandboxes: `statistics-api-sandbox`,
`supplies-api-sandbox`, `advert-api-sandbox`. Sandbox testing for **FBW supplies,
promotion, and statistics/financial reports disappears entirely** — no
replacement was announced. The SDK's runtime code never referenced these hosts;
the only sandbox the SDK calls — `marketplace-api-sandbox` (DBS test orders via
`ordersDBS.createTestOrders()`) — **survives**, as do the content,
discounts-prices and feedbacks sandboxes.

> **Note**: the WB announcement email lists `supplies-api.wildberries.ru`
> (the PRODUCTION host, without `-sandbox`) — that is a typo in the email,
> confirmed against the release notes and the sandbox docs page. The production
> FBW supplies API is not affected.

---

**Full changelog**: [CHANGELOG.md](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/CHANGELOG.md) ·
**September wave**: [WB API Changes — September 2026](./wb-api-changes-2026-09.md)
