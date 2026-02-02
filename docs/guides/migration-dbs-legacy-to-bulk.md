# Migration Guide: DBS Legacy to Bulk Methods

**Deadline:** April 13, 2026
**Affected Module:** Orders DBS (`sdk.ordersDBS`)

## Overview

Wildberries is deprecating single-order DBS status methods in favor of bulk operations. The legacy methods will be **disabled on April 13, 2026**. This guide helps you migrate your code to the new bulk API.

## Why Migrate?

1. **Better Performance**: Process multiple orders in one API call
2. **Reduced Rate Limiting**: Fewer requests means fewer rate limit issues
3. **Future-Proof**: Legacy methods will stop working after April 13, 2026
4. **Consistent Error Handling**: Bulk methods return detailed per-order results

## Method Mapping

| Legacy Method | Bulk Replacement | Notes |
|--------------|-----------------|-------|
| `getStatuses(orderIds)` | `getStatusesBulk(orderIds)` | Same signature |
| `confirm(orderId)` | `confirmBulk([orderId])` | Wrap in array |
| `deliver(orderId)` | `deliverBulk([orderId])` | Wrap in array |
| `receive(orderId, code)` | `receiveBulk([{orderId, code}])` | Object format |
| `reject(orderId, code)` | `rejectBulk([{orderId, code}])` | Object format |
| `cancel(orderId)` | `cancelBulk([orderId])` | Wrap in array |

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

- [ ] Identify all uses of `getStatuses()` → Replace with `getStatusesBulk()`
- [ ] Identify all uses of `confirm()` → Replace with `confirmBulk()`
- [ ] Identify all uses of `deliver()` → Replace with `deliverBulk()`
- [ ] Identify all uses of `receive()` → Replace with `receiveBulk()`
- [ ] Identify all uses of `reject()` → Replace with `rejectBulk()`
- [ ] Identify all uses of `cancel()` → Replace with `cancelBulk()`
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
- [DBS Metadata Example](../../examples/orders-dbs-metadata.ts)
- [Official WB DBS API Docs](https://dev.wildberries.ru/openapi/orders-dbs)
