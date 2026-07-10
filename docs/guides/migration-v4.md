# Migration Guide — v4.0.0

v4.0.0 is a **major release** that removes deprecated API surface. Almost all of it was
already rejected or dropped by Wildberries (dead endpoints, sunset fields); removing it
gives compile-time fail-fast and clears dead code. The v3.12.0 changelog pre-announced the
stocks `sku`/`skus` removal for v4.0.0; the rest rides along so we ship one major bump
instead of several.

**Upgrading**: every removed symbol below now produces a **TypeScript compile error**
pointing at the replacement. Fix each call site (usually a one-line rename or field swap).

## Removed methods

| Module | Removed method | Replacement |
|---|---|---|
| finances | `getSupplierReportDetailByPeriod` | `getSalesReportsList` / `getSalesReportsDetailed` / `getSalesReportsDetailedByReportId` (v1 sales-reports; see `migration-finance-reports-v5-to-v1`) |
| orders-dbs | `getMetaBulk` | `checkMetaValidation` (POST `…/meta/details` — also returns marking-metadata validation status) |
| general | `getJamSubscriptionStatus` | `getJamSubscription` (direct `GET /api/common/v1/subscriptions`) |
| promotion | `updateBidsV2` | `updateBids` (kopeck-based) |
| promotion | `createAutoSetExcluded`, `createAutoUpdatenm`, `getAuctionAdverts`, `getPromotionAdverts`, `getStatsKeywords`, `updateAuctionBid` | v0/v1 advert API (WB-disabled 2026-02-02). Use the v2 methods, e.g. `getAdvertsV2` |
| in-store-pickup | `updateOrdersConfirm` / `Prepare` / `Receive` / `Reject` / `Cancel`, `createOrdersStatus`, `getOrdersMeta`, `deleteOrdersMeta`, `updateMetaSgtin` / `Uin` / `Imei` / `Gtin` (12 single-order shims) | the batch methods: `confirmBulk` / `prepareBulk` / `receiveBulk` / `rejectBulk` / `cancelBulk`, `createOrdersStatusBulk`, `getMetaBulk`, `deleteMetaBulk`, `setMeta…Bulk` |

> Note: `in-store-pickup.getMetaBulk` is **kept** — it is the live batch-API method (the
> replacement), not the deprecated orders-dbs one of the same name.

## Removed types & fields

| Where | Removed | Replacement |
|---|---|---|
| products `StockItem` / `StocksRequest` / `UpdateStockRequest` | `sku`, `skus` (stocks identifiers) | `chrtId` / `chrtIds` (size IDs) — see dedicated section below |
| finances | `DetailReportItem` | `SalesReportDetailedItem` (v1; camelCase + `string` money — use `parseMoneyAmount()`) |
| communications `Chat` / `Event` | `clientID` | (WB-removed Feb 2 — no replacement) |
| communications `GoodCard` | `date` | `addTime` / `addTimestamp` on the enclosing message/event |
| communications `GoodCard` | `needRefund` | the `/api/v1/claims` endpoint |
| communications `GoodCard` | `statusID` | (WB-removed Feb 10 — no replacement) |
| general | `JamSubscriptionStatus`, `JamSubscriptionTier`, `GetJamSubscriptionStatusParams` | `JamSubscriptionDetails` (from `getJamSubscription`) |
| promotion | `GetAdverts` family, `V0KeywordsStatistics*` | v2 types (`AdvertV2` / `GetAdvertsV2Response`, etc.) |
| in-store-pickup | `ApiGTINRequest`, `ApiIMEIRequest`, `ApiOrderStatus(es)`, `ApiOrdersMeta`, `ApiBaseMeta`, `ApiSGTINsRequest`, `ApiUINRequest` | the `…Bulk` request types |

## Removed config (internal)

- `DEFAULT_RATE_LIMITS` (legacy alias — use `ALL_RATE_LIMITS`).
- `analytics.postNmReportDetail` / `DetailHistory` / `GroupedHistory` rate-limit keys (v2
  wrappers removed back in v3.0.0; the live `postNmReportDownloads` / `DownloadsRetry` stay).
- `reports.analyticsCharacteristicsChange` rate-limit key (endpoint removed from swagger).

## Other changes

- **`updateStock(warehouseId, data)`** — `data` is now **required** (was optional in v3.x).
- The runtime `console.warn` migration nudges and the internal `sanitize*` helpers for
  stocks are gone (nothing left to detect/strip — `sku`/`skus` no longer exist).
- Card-size barcodes (`sizes[].skus` on `createCard`/media methods) are **unrelated** and
  still supported — only the *stocks* `sku`/`skus` identifiers were removed.

## Deferred (NOT removed in v4.0.0)

- The 4 `orders-fbs` `meta` response fields (`@deprecated` *"retained pending WB
  confirmation of removal status"*). Their WB removal is unverified, and dropping a field
  WB still returns would lose live data. Slated for v4.1 once a live GET confirms WB dropped them.

---

## Stocks: `sku` / `skus` → `chrtId` / `chrtIds` (detail)

Wildberries fully rejects the `sku` / `skus` identifiers on the stocks endpoints since
**2026-05-20 13:00 MSK** (HTTP 400). v4.0.0 removes them from the types entirely.

### Before (v3.x — deprecated, already 400-ing at runtime)

```typescript
await sdk.products.getStocks(warehouseId, { skus: ['1234567890123'] });
await sdk.products.updateStock(warehouseId, { stocks: [{ sku: '1234567890123', amount: 100 }] });
```

### After (v4.0.0)

```typescript
await sdk.products.getStocks(warehouseId, { chrtIds: [12345678] });
await sdk.products.updateStock(warehouseId, { stocks: [{ chrtId: 12345678, amount: 100 }] });
```

### Where do I get `chrtId` / `chrtIds`?

`chrtId` is the **size ID** returned by `POST /content/v2/get/cards/list`
(`sizes[].chrtID` — note WB uses uppercase `D` there; the SDK stocks property is lowercase
`chrtId`/`chrtIds`, same numeric value).

```typescript
const cards = await sdk.products.getCardsList({ ... });
const chrtId = cards.cards[0].sizes[0].chrtID; // → use in stocks calls
```
