# Migration Guide: In-Store Pickup Single-Order to Batch API

**Since:** v3.17.0
**Affected Module:** In-Store Pickup (`sdk.inStorePickup`)

## Overview

Wildberries shut down the single-order click-and-collect endpoints under
`/api/v3/click-collect/orders/{orderId}/*` (PATCH / PUT / DELETE / GET). They were
replaced by **batch** `POST /api/marketplace/v3/click-collect/*` endpoints that
operate on up to 1000 assembly orders per request.

Starting with **v3.17.0**, the SDK ships **12 new `*Bulk` batch methods**. The
12 old single-order methods are **kept as `@deprecated` compatibility shims** so
existing code keeps working without any changes — each shim delegates to its
batch counterpart with a single-element array. This is a **non-breaking** change.

## Why Migrate?

1. **The old URLs are dead.** The shims keep your code running, but every call
   now performs a batch `POST` under the hood — there is no real single-order
   endpoint anymore.
2. **Better performance.** Process up to 1000 orders in one API call.
3. **Reduced rate-limit pressure.** Fewer requests = fewer rate-limit hits.
4. **Per-order results.** Batch status setters return
   `{requestId, results:[{orderId, isError, errors?}]}` so you can detect
   partial failures instead of guessing from a thrown error.
5. **Future-proof.** The shims will be removed in a future major release.

## Backward Compatibility (Option C — compat shims)

The 12 legacy methods **still exist** with their **exact original signatures and
return types**. Each one:

- Emits a one-time `console.warn` deprecation notice via `warnOnce` (keyed by
  method, e.g. `InStorePickupModule.updateOrdersConfirm`).
- Delegates to the matching `*Bulk` method with a single-element array.
- For the two read methods (`getOrdersMeta`, `createOrdersStatus`), maps the
  batch response back to the **legacy response shape** so callers are unaffected.

> You can migrate at your own pace. Nothing breaks on upgrade to v3.17.0.

## Method Mapping

### Status Methods

| Legacy (deprecated shim) | New batch method | Endpoint | Request |
|---|---|---|---|
| `updateOrdersConfirm(orderId)` | `confirmBulk(orderIds)` | `…/status/confirm` | `{ordersIds}` |
| `updateOrdersPrepare(orderId)` | `prepareBulk(orderIds)` | `…/status/prepare` | `{ordersIds}` |
| `updateOrdersReceive(orderId)` | `receiveBulk(orderIds)` | `…/status/receive` | `{ordersIds}` |
| `updateOrdersReject(orderId)` | `rejectBulk(orderIds)` | `…/status/reject` | `{ordersIds}` |
| `updateOrdersCancel(orderId)` | `cancelBulk(orderIds)` | `…/status/cancel` | `{ordersIds}` |
| `createOrdersStatus({orders})` | `getStatusesBulk(orderIds)` | `…/status/info` | `{ordersIds}` |

> **Important difference from DBS:** pickup `receive` / `reject` take **no
> passcodes** — only `{ordersIds: number[]}`. (DBS receive/reject require a
> per-order confirmation code.)

### Metadata Methods

| Legacy (deprecated shim) | New batch method | Endpoint | Request |
|---|---|---|---|
| `getOrdersMeta(orderId)` | `getMetaBulk({ordersIds})` | `…/meta/details` | `GetMetaBulkRequest` |
| `deleteOrdersMeta(orderId,{key})` | `deleteMetaBulk({key,ordersIds})` | `…/meta/delete` | `DeleteMetaBulkRequest` |
| `updateMetaSgtin(orderId,data)` | `setSgtinBulk({orders})` | `…/meta/sgtin` | `SetSgtinBulkRequest` |
| `updateMetaUin(orderId,data)` | `setUinBulk({orders})` | `…/meta/uin` | `SetUinBulkRequest` |
| `updateMetaImei(orderId,data)` | `setImeiBulk({orders})` | `…/meta/imei` | `SetImeiBulkRequest` |
| `updateMetaGtin(orderId,data)` | `setGtinBulk({orders})` | `…/meta/gtin` | `SetGtinBulkRequest` |

`getMetaBulk` overlaps the existing `checkMetaValidation` method (both POST to
`…/meta/details`) — keep `checkMetaValidation` for the B2B marking-validation
pre-flight lens; use `getMetaBulk` for the raw label-identifier lens.

## Rate Limits

All batch endpoints follow the marketplace-api convention: a request with a `4XX`
response counts as **10 requests** (`penaltyMultiplier: 10`).

| Bucket | Methods | RPM | Interval | Burst |
|---|---|---|---|---|
| Status write | `confirmBulk`, `prepareBulk`, `receiveBulk`, `rejectBulk`, `cancelBulk` | 100 | 600ms | 20 |
| Status info + meta read | `getStatusesBulk`, `getMetaBulk` | 150 | 400ms | 20 |
| Meta delete | `deleteMetaBulk` | 150 | 400ms | 20 |
| Meta set | `setSgtinBulk`, `setUinBulk`, `setImeiBulk`, `setGtinBulk` | 20 | 3s | 500 |

## Migration Examples

### Confirm order

**Before (deprecated shim — still works):**
```typescript
await sdk.inStorePickup.updateOrdersConfirm(orderId);
```

**After (batch):**
```typescript
const result = await sdk.inStorePickup.confirmBulk([orderId]);
const r = result.results[0];
if (r.isError) {
  console.error(`Order ${r.orderId} failed:`, r.errors);
}
```

### Get statuses

**Before:**
```typescript
const statuses = await sdk.inStorePickup.createOrdersStatus({ orders: [orderId] });
statuses.orders?.forEach(o => console.log(o.id, o.supplierStatus, o.wbStatus));
```

**After:**
```typescript
const statuses = await sdk.inStorePickup.getStatusesBulk([orderId]);
statuses.orders.forEach(o => {
  console.log(o.orderId, o.supplierStatus, o.wbStatus);
  if (o.errors?.length) console.error('Errors:', o.errors);
});
```

> Note the field rename in the batch response: `id` → `orderId`. The deprecated
> `createOrdersStatus` shim maps `orderId` back to `id` for you.

### Get metadata

**Before:**
```typescript
const meta = await sdk.inStorePickup.getOrdersMeta(orderId);
if (meta.meta?.imei?.value) console.log(`IMEI: ${meta.meta.imei.value}`);
```

**After:**
```typescript
const meta = await sdk.inStorePickup.getMetaBulk({ ordersIds: [orderId] });
const m = meta.orders[0];
if (m.imei) console.log(`Order ${m.orderId} IMEI: ${m.imei}`);
```

> The batch `OrderMetaV2` returns **flat** fields (`gtin`, `imei`, `uin`,
> `sgtin: string[]`, `customsDeclaration`) instead of the legacy
> `{value}`-wrapped shape. The deprecated `getOrdersMeta` shim wraps each field
> back into `{value}` for you.

### Set SGTIN / UIN / IMEI / GTIN

**Before:**
```typescript
await sdk.inStorePickup.updateMetaSgtin(orderId, { sgtins: ['01046012345678900421abc123'] });
await sdk.inStorePickup.updateMetaImei(orderId, { imei: '123456789012345' });
```

**After:**
```typescript
await sdk.inStorePickup.setSgtinBulk({
  orders: [{ orderId, sgtins: ['01046012345678900421abc123'] }],
});
await sdk.inStorePickup.setImeiBulk({
  orders: [{ orderId, imei: '123456789012345' }],
});
```

### Delete metadata

**Before:**
```typescript
await sdk.inStorePickup.deleteOrdersMeta(orderId, { key: 'imei' });
```

**After:**
```typescript
await sdk.inStorePickup.deleteMetaBulk({ key: 'imei', ordersIds: [orderId] });
```

> The `key` field is now typed as the enum
> `'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration'` on the batch
> method. The deprecated shim still accepts a plain `string` for backward
> compatibility.

## B2B / Meta-Validation Callout

For **B2B** orders, WB requires marking-metadata validation before transitioning
to `prepare`. Before calling `prepareBulk`, run a pre-flight:

```typescript
const validation = await sdk.inStorePickup.checkMetaValidation([orderId]);
const invalid = validation.orders.filter(o => o.isError);
if (invalid.length > 0) {
  // fix sgtin/imei/uin/gtin, then prepare
}
await sdk.inStorePickup.prepareBulk([orderId]);
```

B2B customs declarations additionally require an `originCountryCode`; use
`setCustomsDeclarationBulk` (unchanged since v3.16.0).

## Silencing Deprecation Warnings

The shims emit a one-time `console.warn` per method per process. To reset the
warning registry in tests:

```typescript
import { resetDeprecationWarnings } from 'daytona-wildberries-typescript-sdk';

beforeEach(() => resetDeprecationWarnings());
```

## Migration Checklist

- [ ] Replace `updateOrdersConfirm/Prepare/Receive/Reject/Cancel` → `*Bulk`
- [ ] Replace `createOrdersStatus` → `getStatusesBulk` (note `id` → `orderId`)
- [ ] Replace `getOrdersMeta` → `getMetaBulk` (note flat vs `{value}` shape)
- [ ] Replace `deleteOrdersMeta` → `deleteMetaBulk`
- [ ] Replace `updateMeta{Sgtin,Uin,Imei,Gtin}` → `set{...}Bulk`
- [ ] Update error handling to inspect `result.results[].isError`
- [ ] Remove deprecated method calls before the next major release

## See Also

- [In-Store Pickup Getting Started](/guides/in-store-pickup-getting-started)
- [DBS Legacy → Bulk Migration](/guides/migration-dbs-legacy-to-bulk) — the
  analogous migration for the DBS module
- [Official WB In-Store Pickup API Docs](https://dev.wildberries.ru/openapi/in-store-pickup)
