---
title: "Stock Management Migration: sku → chrtId"
description: Migrate from deprecated sku/skus parameters to chrtId/chrtIds on the three seller-warehouse stock endpoints before the 2026-05-20 13:00 MSK hard deadline.
---

# Stock Management Migration: `sku` → `chrtId`

**Audience**: Developers calling `sdk.products.getStocks()`, `sdk.products.updateStock()`, or `sdk.products.deleteStock()`.
**Since**: SDK v3.12.0
**Hard deadline**: 2026-05-20 13:00 MSK

## Why This Matters

On 2026-05-08, Wildberries [announced](https://dev.wildberries.ru/release-notes?id=522) that the `sku` (barcode) parameter on three seller-warehouse stock endpoints is being phased out in favour of `chrtId` (size ID from the Content API).

**Hard deadline: 2026-05-20 13:00 MSK.**

After this date Wildberries begins a gradual outage: initially the endpoints will be unavailable for **10 minutes per hour**, with that window expanding daily until the endpoints permanently reject any request that still carries `sku`/`skus` with HTTP 400 and a `code` field in the response body.

There is no grace period. Code that still passes `skus` or per-item `sku` on 2026-05-21 will silently fail in production for an increasing fraction of requests, then fail completely.

SDK v3.12.0 ships the complete migration:

- `chrtId`/`chrtIds` parameters added to all three method signatures.
- `@deprecated` JSDoc on the legacy `sku`/`skus` fields.
- `warnOnce()` runtime warnings on first call per process lifetime.
- This guide.

## What's Deprecated

The following parameter usages are deprecated as of v3.12.0 and will be rejected by WB after 2026-05-20:

| Method | Deprecated parameter | Replacement |
|--------|---------------------|-------------|
| `sdk.products.getStocks(warehouseId, { skus: [...] })` | `skus: string[]` | `chrtIds: number[]` |
| `sdk.products.updateStock(warehouseId, { stocks: [{ sku, amount }] })` | `sku: string` per item | `chrtId: number` per item |
| `sdk.products.deleteStock(warehouseId, { skus: [...] })` | `skus: string[]` | `chrtIds: number[]` |

All three methods remain backwards-compatible until the WB deadline. Legacy calls compile without errors but emit a one-time `console.warn` (see [Mixed-mode behaviour](#mixed-mode-behaviour)).

## How to Get `chrtId`

`chrtId` is the **size ID** assigned by Wildberries when a product card is created. It lives in the `chrtID` field of each entry in the `sizes[]` array returned by `sdk.products.getCardsList()`.

> **Casing note** (also covered [below](#casing-note-chrtid-vs-chrtid)): the Content API response uses `chrtID` (uppercase D); the stocks endpoint payload uses `chrtId` (lowercase d). The numeric value is identical — only the property key casing differs.

### Build a `sku → chrtId` lookup map

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// Fetch your product cards (paginate as needed)
const cardsResult = await sdk.products.getCardsList({
  settings: {
    cursor: { limit: 100 },
    filter: { withPhoto: -1 },
  },
});

// Build a sku (barcode) → chrtId lookup map
const skuToChrtId = new Map<string, number>();

for (const card of cardsResult.cards ?? []) {
  for (const size of card.sizes ?? []) {
    // Content API field: chrtID (uppercase D)
    const chrtId = size.chrtID; // number | undefined
    for (const sku of size.skus ?? []) {
      if (chrtId !== undefined) {
        skuToChrtId.set(sku, chrtId);
      }
    }
  }
}

// Example: look up a barcode you have on file
const myBarcode = '1234567890123';
const chrtId = skuToChrtId.get(myBarcode);
console.log(`chrtId for ${myBarcode}:`, chrtId); // e.g. 12345678
```

Refresh this map periodically (e.g. nightly) or whenever cards change, so your local database stays in sync with WB.

## Migration Steps

1. **Audit `getStocks` call sites** — search your codebase for `sdk.products.getStocks` and replace every `skus: string[]` argument with `chrtIds: number[]`.

2. **Audit `updateStock` call sites** — search for `sdk.products.updateStock` and replace every per-item `{ sku: '...', amount }` with `{ chrtId: 12345678, amount }`.

3. **Audit `deleteStock` call sites** — search for `sdk.products.deleteStock` and replace every `skus: string[]` argument with `chrtIds: number[]`.

4. **Build or refresh your `sku → chrtId` mapping** — use `sdk.products.getCardsList()` (see [How to get `chrtId`](#how-to-get-chrtid)) and store the mapping in your database or in-memory cache. Schedule periodic refreshes.

5. **Run your test suite** — existing tests that use the legacy fields will emit one-time `console.warn` messages; treat each warning as a migration action item. New tests must pass with no warnings.

> **Deploy before 2026-05-20 13:00 MSK.** Gradual outage begins immediately after the deadline.

## Code Examples

### `getStocks`

**Before (deprecated):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ Deprecated: passes skus (barcode strings)
const result = await sdk.products.getStocks(12345, {
  skus: ['1234567890123', '1234567890124'],
});
console.log(result.stocks);
```

**After (v3.12.0+):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Preferred: passes chrtIds (size ID numbers)
const result = await sdk.products.getStocks(12345, {
  chrtIds: [12345678, 12345679],
});
console.log(result.stocks); // [{ chrtId: 12345678, amount: 50 }, ...]
```

---

### `updateStock`

**Before (deprecated):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ Deprecated: per-item sku field
await sdk.products.updateStock(12345, {
  stocks: [
    { sku: '1234567890123', amount: 50 },
    { sku: '1234567890124', amount: 20 },
  ],
});
```

**After (v3.12.0+):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Preferred: per-item chrtId field
await sdk.products.updateStock(12345, {
  stocks: [
    { chrtId: 12345678, amount: 50 },
    { chrtId: 12345679, amount: 20 },
  ],
});
```

---

### `deleteStock`

**Before (deprecated):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ❌ Deprecated: passes skus (barcode strings)
await sdk.products.deleteStock(12345, {
  skus: ['1234567890123', '1234567890124'],
});
```

**After (v3.12.0+):**

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ✅ Preferred: passes chrtIds (size ID numbers)
await sdk.products.deleteStock(12345, {
  chrtIds: [12345678, 12345679],
});
```

## Mixed-mode Behaviour

If you supply **both** the deprecated field and the replacement field simultaneously, the SDK strips the deprecated field before forwarding the request to WB and emits a one-time `console.warn` per method per process lifetime.

The exact warning messages emitted by `warnOnce()` in `src/modules/products/index.ts`:

**`getStocks` / `deleteStock` — mixed `skus` + `chrtIds`:**

```
products.getStocks: both `skus` and `chrtIds` provided. The SDK is sending ONLY `chrtIds`
to WB (`skus` will be stripped); WB API will reject `skus` after 2026-05-20 13:00 MSK with
HTTP 400. Remove `skus` from your request to avoid this warning.
See docs/guides/stocks-sku-to-chrtid-migration.md.
```

**`updateStock` — mixed `sku` + `chrtId` on the same item:**

```
products.updateStock: some items have BOTH `sku` and `chrtId`. The SDK is sending ONLY
`chrtId` per item to WB (`sku` will be stripped from those items); WB API will reject `sku`
after 2026-05-20 13:00 MSK with HTTP 400. Remove `sku` from items that already have `chrtId`
to avoid this warning. See docs/guides/stocks-sku-to-chrtid-migration.md.
```

### What NOT to do

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

// ⚠️ Mixed-mode: SDK strips `skus`, sends only `chrtIds`, emits console.warn (once)
const result = await sdk.products.getStocks(12345, {
  skus: ['1234567890123'],   // ← will be stripped
  chrtIds: [12345678],       // ← this is what WB receives
});
// console.warn fires on this call (once per process lifetime)
// Fix: remove `skus` entirely
```

The `"once per process lifetime"` semantics mean the warning fires on the **first** call in a given Node.js process and is suppressed on subsequent calls. If you restart your server the counter resets. Use the warnings as a signal to find and fix call sites, not as an ongoing runtime monitor.

**Edge case — `chrtIds: []` (empty array):** An empty `chrtIds: []` is treated as a migration-in-progress signal. If you have `skus` alongside an empty `chrtIds`, the SDK strips the empty array, fires the legacy-only warning, and forwards the request with `skus`. Remove `chrtIds: []` from your code — it serves no purpose once you have real `chrtId` values to pass.

## Casing Note: `chrtID` vs `chrtId`

This is the most common source of confusion when migrating:

| Context | Property name | Type |
|---------|--------------|------|
| WB Content API response (`getCardsList`) | `size.chrtID` | `number \| undefined` |
| WB Marketplace stocks endpoint (`getStocks`, `updateStock`, `deleteStock`) | `chrtId` / `chrtIds` | `number` / `number[]` |

Same numeric value, different property key casing. The `D` is uppercase in Content API responses and lowercase in Marketplace stocks payloads.

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

const cardsResult = await sdk.products.getCardsList({
  settings: { cursor: { limit: 10 }, filter: { withPhoto: -1 } },
});

const card = cardsResult.cards?.[0];
const size = card?.sizes?.[0];

// Content API: chrtID (uppercase D)
const chrtIdFromContent: number | undefined = size?.chrtID;

// Pass that same numeric value to the stocks endpoint as chrtId (lowercase d)
if (chrtIdFromContent !== undefined) {
  const stockResult = await sdk.products.getStocks(12345, {
    chrtIds: [chrtIdFromContent], // ← lowercase d here
  });
  console.log(stockResult.stocks);
}
```

TypeScript's strict-mode type system will catch casing errors at compile time — `size.chrtId` (lowercase) would be a compile error since the field on `CardSize` is `chrtID`.

## FAQ

**Q: What if I store SKUs in my database instead of `chrtId`?**

Maintain a `sku → chrtId` mapping table in your database and refresh it periodically via `getCardsList()`. A nightly refresh is usually sufficient for stable catalogues; synchronise more frequently if you create or discontinue products often. The lookup snippet in [How to get `chrtId`](#how-to-get-chrtid) builds this map in a single pass over your card list.

**Q: Will the SDK auto-convert SKUs to `chrtId` values for me?**

No — and this is intentional. Converting a barcode to a `chrtId` requires a call to `getCardsList()`, which is a separate network round-trip. Auto-conversion would silently double your API traffic on every stock operation. The SDK gives you the lookup primitives; you own the caching strategy.

**Q: Can I keep passing `sku` until the 2026-05-20 deadline?**

Yes. The SDK accepts legacy fields and forwards them to WB until the deadline. The `warnOnce()` warning fires once per process lifetime — not on every request — so it will not flood your logs. That said, migrate proactively: scrambling on deadline day under pressure is a reliability risk. The deadline is a hard cut — there is no extension once outages begin.

**Q: What happens after the deadline — will the SDK throw automatically?**

No. The SDK forwards your request to WB as-is (after stripping mixed-mode deprecated fields). WB will return HTTP 400 with a `code` field. The SDK surfaces this as a `WBAPIError` with `statusCode: 400`. Your existing error handling for 400 responses will catch it — but you will see the errors in production.

**Q: Where is the v3.12.0 changelog entry?**

See [CHANGELOG.md — \[3.12.0\]](/CHANGELOG#3120---2026-05-14).

**Q: Does the SDK strip `sku` silently in mixed-mode?**

No. It logs a `console.warn` via `warnOnce()` (once per method per process lifetime) and strips the deprecated field before forwarding. The warning message names the method, tells you what was stripped, states the deadline, and links to this guide.

## Related Resources

- [CHANGELOG.md — \[3.12.0\]](/CHANGELOG#3120---2026-05-14) — full v3.12.0 release notes
- [WB release-notes id=522](https://dev.wildberries.ru/release-notes?id=522) — official WB announcement (2026-05-08)
- SDK source — stock method implementations: [`src/modules/products/index.ts`](../../src/modules/products/index.ts)
- SDK source — stock types (`StockItem`, `StocksRequest`, `UpdateStockRequest`, `GetStocksResponse`): [`src/types/products.types.ts`](../../src/types/products.types.ts)
- [Mandatory Product Characteristics guide](./mandatory-product-characteristics.md) — another deadline-driven migration reference (Sprint 15.8 pattern)
