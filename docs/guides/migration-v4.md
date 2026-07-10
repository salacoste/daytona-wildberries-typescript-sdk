# Migration Guide — v4.0.0

v4.0.0 is a **major release** that removes deprecated API surface. Most of it was already
rejected at runtime by Wildberries (dead endpoints, sunset fields); removing it gives
compile-time fail-fast and clears dead code. The v3.12.0 changelog pre-announced the
stocks `sku`/`skus` removal for v4.0.0.

**Upgrading**: every removed symbol below now produces a **TypeScript compile error**,
pointing you at the replacement. Fix each call site (usually a one-line rename) and you're done.

## Removed in v4.0.0

| Symbol | Module | Replacement |
|---|---|---|
| `StockItem.sku` | products | `StockItem.chrtId` |
| `StocksRequest.skus` | products | `StocksRequest.chrtIds` |
| `UpdateStockRequest.stocks[].sku` | products | `…stocks[].chrtId` |
| _(more methods/fields added as the v4.0.0 cleanup progresses)_ | | |

---

## Stocks: `sku` / `skus` → `chrtId` / `chrtIds`

Wildberries fully rejects the `sku` / `skus` identifiers on the stocks endpoints since
**2026-05-20 13:00 MSK** (HTTP 400). v4.0.0 removes them from the types entirely.

### Before (v3.x — deprecated, already 400-ing at runtime)

```typescript
// getStocks / deleteStock
await sdk.products.getStocks(warehouseId, { skus: ['1234567890123'] });

// updateStock
await sdk.products.updateStock(warehouseId, {
  stocks: [{ sku: '1234567890123', amount: 100 }],
});
```

### After (v4.0.0)

```typescript
// getStocks / deleteStock — pass size IDs (chrtIds)
await sdk.products.getStocks(warehouseId, { chrtIds: [12345678] });

// updateStock — set chrtId per item
await sdk.products.updateStock(warehouseId, {
  stocks: [{ chrtId: 12345678, amount: 100 }],
});
```

### Where do I get `chrtId` / `chrtIds`?

`chrtId` is the **size ID** returned by `POST /content/v2/get/cards/list`
(the `sizes[].chrtID` field — note WB uses uppercase `D` there; the SDK stocks property
is lowercase `chrtId`/`chrtIds`, same numeric value).

```typescript
const cards = await sdk.products.getCardsList({ ... });
const chrtId = cards.cards[0].sizes[0].chrtID; // → use in stocks calls
```

### Other changes in this area

- `updateStock(warehouseId, data)` — `data` is now **required** (was optional in v3.x).
  Calling it without a body is a compile error; pass an `UpdateStockRequest`.
- The runtime `console.warn` migration nudges and the internal `sanitize*` helpers are gone
  (nothing left to detect/strip — the fields no longer exist).

> Note: the `skus` field on **product card sizes** (`sizes[].skus`, the barcode array on
> `createCard`/media methods) is unrelated and **still supported** — only the *stocks*
> `sku`/`skus` identifiers were removed.
