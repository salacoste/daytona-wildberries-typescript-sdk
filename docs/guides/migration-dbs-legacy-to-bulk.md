# Migration Guide: DBS Legacy to Bulk Methods

**Deadline:** April 13, 2026
**Affected Module:** Orders DBS (`sdk.ordersDBS`)

## Overview

Wildberries is deprecating single-order DBS status **and metadata** methods in favor of bulk operations. All 13 legacy methods will be **disabled on April 13, 2026**. This guide helps you migrate your code to the new bulk API.

## Why Migrate?

1. **Better Performance**: Process multiple orders in one API call
2. **Reduced Rate Limiting**: Fewer requests means fewer rate limit issues
3. **Future-Proof**: Legacy methods will stop working after April 13, 2026
4. **Consistent Error Handling**: Bulk methods return detailed per-order results

## Method Mapping

### Status Methods

| Legacy Method | Bulk Replacement | Notes |
|--------------|-----------------|-------|
| `getStatuses(orderIds)` | `getStatusesBulk(orderIds)` | Same signature |
| `confirm(orderId)` | `confirmBulk([orderId])` | Wrap in array |
| `deliver(orderId)` | `deliverBulk([orderId])` | Wrap in array |
| `receive(orderId, code)` | `receiveBulk([{orderId, code}])` | Object format |
| `reject(orderId, code)` | `rejectBulk([{orderId, code}])` | Object format |
| `cancel(orderId)` | `cancelBulk([orderId])` | Wrap in array |

### Metadata Methods

| Legacy Method | Bulk Replacement | Notes |
|--------------|-----------------|-------|
| `getMeta(orderId)` | `getMetaBulk({ orders: [orderId] })` | Request object format |
| `deleteMeta(orderId, key)` | `deleteMetaBulk({ orders: [orderId], key })` | Request object format |
| `setSgtin(orderId, sgtins)` | `setSgtinBulk({ orders: [{ orderId, sgtins }] })` | Nested object format |
| `setUin(orderId, uin)` | `setUinBulk({ orders: [{ orderId, uin }] })` | Nested object format |
| `setImei(orderId, imei)` | `setImeiBulk({ orders: [{ orderId, imei }] })` | Nested object format |
| `setGtin(orderId, gtin)` | `setGtinBulk({ orders: [{ orderId, gtin }] })` | Nested object format |
| `setCustomsDeclaration(orderId, cd)` | `setCustomsDeclarationBulk({ orders: [{ orderId, customsDeclaration }] })` | Nested object format |

### Rate Limit Differences

The bulk methods use the same rate limit tiers as their legacy counterparts, but because you can process multiple orders per call, you use far fewer API requests overall.

| Tier | Legacy Methods | Bulk Methods | RPM | Interval |
|------|---------------|-------------|-----|----------|
| **T1** | `getStatuses` | `getStatusesBulk` | 300 | 200ms |
| **T2** | `confirm`, `deliver`, `receive`, `reject`, `cancel` | `confirmBulk`, `deliverBulk`, `receiveBulk`, `rejectBulk`, `cancelBulk` | 60 | 1s |
| **T3** | `getMeta`, `deleteMeta` | `getMetaBulk`, `deleteMetaBulk` | 150 | 400ms |
| **T4** | `setSgtin`, `setUin`, `setImei`, `setGtin`, `setCustomsDeclaration` | `setSgtinBulk`, `setUinBulk`, `setImeiBulk`, `setGtinBulk`, `setCustomsDeclarationBulk` | 500 | 120ms |

**Example**: Processing 100 orders with IMEI metadata requires 100 T4 calls with legacy `setImei()`, but only 1 T4 call with `setImeiBulk()`.

> **Penalty Multiplier**: All DBS endpoints use a penalty multiplier of **10**. If the API returns a `409 Conflict` response (e.g., invalid state transition), that single request counts as **10 requests** toward your rate limit. Bulk methods reduce the chance of hitting this penalty because you can validate order states before making batch transitions.

## Migration Examples

### Status Retrieval

**Before (Legacy):**
```typescript
const statuses = await sdk.ordersDBS.getStatuses([orderId1, orderId2]);
statuses.orders?.forEach(order => {
  console.log(`Order ${order.id}: ${order.supplierStatus}`);
});
```

**After (Bulk):**
```typescript
const statuses = await sdk.ordersDBS.getStatusesBulk([orderId1, orderId2]);
statuses.orders?.forEach(order => {
  console.log(`Order ${order.orderId}: ${order.supplierStatus}`);
  if (order.errors?.length) {
    console.error('Errors:', order.errors);
  }
});
```

### Confirm Order

**Before (Legacy):**
```typescript
await sdk.ordersDBS.confirm(orderId);
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.confirmBulk([orderId]);
const orderResult = result.results?.[0];
if (orderResult?.isError) {
  console.error('Failed:', orderResult.errors);
} else {
  console.log('Confirmed successfully');
}
```

### Deliver Order

**Before (Legacy):**
```typescript
await sdk.ordersDBS.deliver(orderId);
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.deliverBulk([orderId]);
// Handle result.results for each order
```

### Receive Order (with verification code)

**Before (Legacy):**
```typescript
await sdk.ordersDBS.receive(orderId, '1234');
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.receiveBulk([
  { orderId: orderId, code: '1234' }
]);
// Handle result.results for each order
```

### Reject Order (with verification code)

**Before (Legacy):**
```typescript
await sdk.ordersDBS.reject(orderId, '1234');
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.rejectBulk([
  { orderId: orderId, code: '1234' }
]);
// Handle result.results for each order
```

### Cancel Order

**Before (Legacy):**
```typescript
await sdk.ordersDBS.cancel(orderId);
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.cancelBulk([orderId]);
// Handle result.results for each order
```

### Get Metadata

**Before (Legacy):**
```typescript
const meta = await sdk.ordersDBS.getMeta(orderId);
if (meta.meta?.imei?.value) {
  console.log(`IMEI: ${meta.meta.imei.value}`);
}
```

**After (Bulk):**
```typescript
const meta = await sdk.ordersDBS.getMetaBulk({ orders: [orderId] });
for (const orderMeta of meta.orders ?? []) {
  if (orderMeta.imei) {
    console.log(`Order ${orderMeta.orderId} IMEI: ${orderMeta.imei}`);
  }
}
```

### Set IMEI

**Before (Legacy):**
```typescript
await sdk.ordersDBS.setImei(orderId, '123456789012345');
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.setImeiBulk({
  orders: [{ orderId, imei: '123456789012345' }]
});
```

### Set SGTIN

**Before (Legacy):**
```typescript
await sdk.ordersDBS.setSgtin(orderId, ['01046012345678900421abc123']);
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.setSgtinBulk({
  orders: [{ orderId, sgtins: ['01046012345678900421abc123'] }]
});
```

### Set UIN / GTIN / Customs Declaration

**Before (Legacy):**
```typescript
await sdk.ordersDBS.setUin(orderId, '1234567890123456');
await sdk.ordersDBS.setGtin(orderId, '1234567890123');
await sdk.ordersDBS.setCustomsDeclaration(orderId, '10130030/010123/0000001');
```

**After (Bulk):**
```typescript
await sdk.ordersDBS.setUinBulk({
  orders: [{ orderId, uin: '1234567890123456' }]
});

await sdk.ordersDBS.setGtinBulk({
  orders: [{ orderId, gtin: '1234567890123' }]
});

await sdk.ordersDBS.setCustomsDeclarationBulk({
  orders: [{ orderId, customsDeclaration: '10130030/010123/0000001' }]
});
```

### Delete Metadata

**Before (Legacy):**
```typescript
await sdk.ordersDBS.deleteMeta(orderId, 'imei');
```

**After (Bulk):**
```typescript
const result = await sdk.ordersDBS.deleteMetaBulk({
  orders: [orderId],
  key: 'imei'
});
```

## Processing Multiple Orders

The main advantage of bulk methods is processing multiple orders efficiently:

```typescript
// Process all pending orders at once
const orderIds = pendingOrders.map(o => o.id);

// Confirm all orders in one API call
const confirmResult = await sdk.ordersDBS.confirmBulk(orderIds);

// Check results for each order
confirmResult.results?.forEach(result => {
  if (result.isError) {
    console.error(`Order ${result.orderId} failed:`, result.errors);
  } else {
    console.log(`Order ${result.orderId} confirmed`);
  }
});
```

## Processing Multiple Orders with Metadata

The bulk metadata methods allow you to handle metadata for many orders in a single call, replacing loops of single-order calls:

```typescript
// BEFORE: N API calls for N orders (legacy, deprecated)
for (const order of orders) {
  const meta = await sdk.ordersDBS.getMeta(order.id);
  if (!meta.meta?.imei?.value && order.requiredMeta?.includes('imei')) {
    await sdk.ordersDBS.setImei(order.id, lookupImei(order.id));
  }
}

// AFTER: 2 API calls regardless of order count (bulk)
const orderIds = orders.map(o => o.id);
const metaResult = await sdk.ordersDBS.getMetaBulk({ orders: orderIds });

const needsImei = (metaResult.orders ?? [])
  .filter(m => !m.imei)
  .map(m => m.orderId!);

if (needsImei.length > 0) {
  await sdk.ordersDBS.setImeiBulk({
    orders: needsImei.map(id => ({ orderId: id, imei: lookupImei(id) }))
  });
}
```

## Error Handling Changes

### Legacy Error Handling
```typescript
try {
  await sdk.ordersDBS.confirm(orderId);
} catch (error) {
  // Error thrown for the entire operation
  console.error('Failed to confirm:', error);
}
```

### Bulk Error Handling
```typescript
const result = await sdk.ordersDBS.confirmBulk([orderId1, orderId2]);

// Check each order's result individually
result.results?.forEach(orderResult => {
  if (orderResult.isError) {
    // Per-order error information
    orderResult.errors?.forEach(err => {
      console.error(`Order ${orderResult.orderId}: ${err.code} - ${err.detail}`);
    });
  }
});
```

## Response Structure Changes

### Legacy Response
```typescript
interface GetStatusResponseLegacy {
  orders?: {
    id?: number;
    supplierStatus?: string;
    wbStatus?: string;
  }[];
}
```

### Bulk Response
```typescript
interface GetStatusInfoResponse {
  orders?: {
    orderId?: number;          // Changed from 'id'
    supplierStatus?: string;
    wbStatus?: string;
    errors?: {                 // New: per-order errors
      code?: number;
      detail?: string;
    }[];
  }[];
}
```

## Migration Checklist

### Status Methods
- [ ] Identify all uses of `getStatuses()` → Replace with `getStatusesBulk()`
- [ ] Identify all uses of `confirm()` → Replace with `confirmBulk()`
- [ ] Identify all uses of `deliver()` → Replace with `deliverBulk()`
- [ ] Identify all uses of `receive()` → Replace with `receiveBulk()`
- [ ] Identify all uses of `reject()` → Replace with `rejectBulk()`
- [ ] Identify all uses of `cancel()` → Replace with `cancelBulk()`

### Metadata Methods
- [ ] Identify all uses of `getMeta()` → Replace with `getMetaBulk()`
- [ ] Identify all uses of `deleteMeta()` → Replace with `deleteMetaBulk()`
- [ ] Identify all uses of `setSgtin()` → Replace with `setSgtinBulk()`
- [ ] Identify all uses of `setUin()` → Replace with `setUinBulk()`
- [ ] Identify all uses of `setImei()` → Replace with `setImeiBulk()`
- [ ] Identify all uses of `setGtin()` → Replace with `setGtinBulk()`
- [ ] Identify all uses of `setCustomsDeclaration()` → Replace with `setCustomsDeclarationBulk()`

### Verification
- [ ] Update error handling to check per-order results
- [ ] Update response parsing for new field names (`orderId` vs `id`)
- [ ] Test with production-like data before deadline
- [ ] Remove deprecated method calls before April 13, 2026

## Timeline

| Date | Action |
|------|--------|
| January 14, 2026 | Bulk methods available |
| Now | Start migration |
| April 1, 2026 | Recommended completion date |
| **April 13, 2026** | **Legacy methods disabled** |

## Support

If you encounter issues during migration:

1. Check the [DBS API documentation](https://dev.wildberries.ru/openapi/orders-dbs)
2. Review the SDK examples in `examples/orders-dbs-*.ts`
3. Open an issue on [GitHub](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)

## See Also

- [DBS Core Workflow Example](../../examples/orders-dbs-core-workflow.ts)
- [DBS B2B Example](../../examples/orders-dbs-b2b.ts)
- [Official WB DBS API Docs](https://dev.wildberries.ru/openapi/orders-dbs)

## Related Migration Guides

- [Migration v3.0 - Complete Guide](/guides/migration-v3) — all breaking changes in v3.0.0
- [Finance Reports v5 → v1 Migration](/guides/migration-finance-reports-v5-to-v1) — migrate Finance Reports before July 15, 2026
- [Type 8 → Type 9 Campaign Migration](/guides/migration-type8-to-type9) — Promotion module campaign migration
- [Migration v2.7 - Analytics v3 Sales Funnel](/guides/migration-v2.7-analytics-v3) — Analytics module v3 endpoint migration
