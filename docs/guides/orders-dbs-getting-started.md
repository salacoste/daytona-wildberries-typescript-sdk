---
title: Orders DBS Getting Started Guide
description: Complete guide to using the Orders DBS (Delivery by Seller) module for direct customer delivery
layout: doc
---

# Orders DBS Getting Started Guide

This guide covers everything you need to know to work with DBS (Delivery by Seller) orders in the Wildberries TypeScript SDK.

> **v4.0.0**: Legacy single-order status and metadata methods were **removed**. All workflows below use the bulk methods. The metadata-read method `getMetaBulk()` was replaced by `checkMetaValidation()` (POST `…/meta/details`), which returns per-order marking-metadata validation status. See the [Migration Guide](/guides/migration-dbs-legacy-to-bulk) and [v4.0.0 migration guide](/guides/migration-v4) for details.

## Table of Contents

- [What is DBS?](#what-is-dbs)
- [DBS vs FBS vs FBW](#dbs-vs-fbs-vs-fbw)
- [Quick Start](#quick-start)
- [Available Methods](#available-methods)
- [Complete Order Workflow](#complete-order-workflow)
- [Working with Customer Data](#working-with-customer-data)
- [Metadata and Compliance](#metadata-and-compliance)
- [B2B Orders](#b2b-orders)
- [Rate Limits](#rate-limits)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)

## What is DBS?

**DBS (Delivery by Seller)** is a fulfillment model where sellers handle:

1. **Storage**: Products stored at seller's warehouse
2. **Delivery**: Seller delivers directly to customer's address

### Key DBS Features

| Feature | Description |
|---------|-------------|
| **Direct Delivery** | Deliver to customer's home, not pickup points |
| **Customer Contact** | Access to phone number and full address |
| **GPS Coordinates** | Longitude/latitude for route planning |
| **Delivery Windows** | Specific date and time slots |
| **Required Metadata** | Product marking codes (IMEI, SGTIN, etc.) |

## DBS vs FBS vs FBW

| Aspect | DBS | FBS | FBW |
|--------|-----|-----|-----|
| Storage | Seller | Seller | Wildberries |
| Delivery | Seller | Wildberries | Wildberries |
| Customer Address | Full address + GPS | Pickup point | Pickup point |
| Customer Phone | Available | Not available | Not available |
| Delivery Time | Specific windows | Standard | Standard |

**Choose DBS when:**
- You can deliver directly to customers
- You need delivery time flexibility
- Your products require special handling
- You want direct customer contact

## Quick Start

### Installation

```bash
npm install daytona-wildberries-typescript-sdk
```

### Basic Setup

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({
  apiKey: process.env.WB_API_KEY!
});

// Check for new orders
const newOrders = await sdk.ordersDBS.getNewOrders();
console.log(`Found ${newOrders.orders?.length ?? 0} new orders`);
```

### Environment Setup

Create a `.env` file:

```bash
WB_API_KEY=your_api_key_here
```

## Available Methods

### Order Retrieval

| Method | Description | Rate Tier |
|--------|-------------|-----------|
| `getNewOrders()` | Get new orders awaiting processing | T1 (300 rpm) |
| `getOrders(params)` | Get completed orders with pagination | T1 (300 rpm) |
| `getClientInfo(orderIds)` | Get customer contact information | T1 (300 rpm) |
| `getB2BInfo(orderIds)` | Get B2B buyer details | T1 (300 rpm) |
| `getGroupsInfo(request)` | Get paid delivery group information | T1 (300 rpm) |
| `getDeliveryDates(request)` | Get delivery dates for orders | T1 (300 rpm) |

### Bulk Status Operations

| Method | Description | Rate Tier |
|--------|-------------|-----------|
| `getStatusesBulk(orderIds)` | Get statuses for multiple orders | T1 (300 rpm) |
| `confirmBulk(orderIds)` | Confirm multiple orders | T2 (60 rpm) |
| `deliverBulk(orderIds)` | Mark multiple orders as delivered | T2 (60 rpm) |
| `receiveBulk(orders)` | Complete handover for multiple orders | T2 (60 rpm) |
| `rejectBulk(orders)` | Reject multiple orders | T2 (60 rpm) |
| `cancelBulk(orderIds)` | Cancel multiple orders | T2 (60 rpm) |

### Bulk Metadata Operations

| Method | Description | Rate Tier |
|--------|-------------|-----------|
| `checkMetaValidation(request)` | Check marking-metadata validation status for multiple orders | T1 (300 rpm) |
| `deleteMetaBulk(request)` | Delete metadata for multiple orders | T3 (150 rpm) |
| `setSgtinBulk(request)` | Set SGTIN codes for multiple orders | T4 (500 rpm) |
| `setUinBulk(request)` | Set UIN codes for multiple orders | T4 (500 rpm) |
| `setImeiBulk(request)` | Set IMEI codes for multiple orders | T4 (500 rpm) |
| `setGtinBulk(request)` | Set GTIN codes for multiple orders | T4 (500 rpm) |
| `setCustomsDeclarationBulk(request)` | Set customs declarations for multiple orders | T4 (500 rpm) |

### Removed Methods (v4.0.0)

The following legacy single-order methods were **removed in v4.0.0**. Use their bulk replacements instead.

| Removed Method | Replacement |
|-------------------|-------------|
| `getMeta(orderId)` | `checkMetaValidation(request)` (validation status) |
| `deleteMeta(orderId, key)` | `deleteMetaBulk(request)` |
| `setSgtin(orderId, sgtins)` | `setSgtinBulk(request)` |
| `setUin(orderId, uin)` | `setUinBulk(request)` |
| `setImei(orderId, imei)` | `setImeiBulk(request)` |
| `setGtin(orderId, gtin)` | `setGtinBulk(request)` |
| `setCustomsDeclaration(orderId, cd)` | `setCustomsDeclarationBulk(request)` |
| `getStatuses(orderIds)` | `getStatusesBulk(orderIds)` |
| `confirm(orderId)` | `confirmBulk([orderId])` |
| `deliver(orderId)` | `deliverBulk([orderId])` |
| `receive(orderId, code)` | `receiveBulk([{orderId, code}])` |
| `reject(orderId, code)` | `rejectBulk([{orderId, code}])` |
| `cancel(orderId)` | `cancelBulk([orderId])` |

## Complete Order Workflow

### Step 1: Fetch New Orders

```typescript
const newOrders = await sdk.ordersDBS.getNewOrders();

for (const order of newOrders.orders ?? []) {
  console.log(`Order ${order.id}:`);
  console.log(`  Article: ${order.article}`);
  console.log(`  Address: ${order.address?.fullAddress}`);
  console.log(`  Delivery: ${order.ddate} ${order.dTimeFrom}-${order.dTimeTo}`);

  // Check for required metadata
  if (order.requiredMeta?.length) {
    console.log(`  Required metadata: ${order.requiredMeta.join(', ')}`);
  }
}
```

### Step 2: Get Customer Contact

```typescript
const orderIds = newOrders.orders?.map(o => o.id!).filter(Boolean) ?? [];

if (orderIds.length > 0) {
  const clientInfo = await sdk.ordersDBS.getClientInfo(orderIds);

  for (const client of clientInfo.orders ?? []) {
    console.log(`Order ${client.orderID}:`);
    console.log(`  Name: ${client.fullName}`);
    console.log(`  Phone: +${client.phoneCode}${client.phone}`);
  }
}
```

### Step 3: Get Delivery Group and Date Info

```typescript
// Get paid delivery group information
const groups = await sdk.ordersDBS.getGroupsInfo({ orders: orderIds });
for (const group of groups.groups ?? []) {
  console.log(`Group ${group.id} "${group.name}": orders ${group.orders.join(', ')}`);
}

// Get delivery date details
const dates = await sdk.ordersDBS.getDeliveryDates({ orders: orderIds });
for (const dateInfo of dates.orders ?? []) {
  console.log(`Order ${dateInfo.orderId}: deliver by ${dateInfo.deliveryDate}`);
}
```

### Step 4: Add Required Metadata (Bulk)

```typescript
// Set IMEI for multiple orders at once
const imeiOrders = newOrders.orders
  ?.filter(o => o.requiredMeta?.includes('imei'))
  ?? [];

if (imeiOrders.length > 0) {
  const result = await sdk.ordersDBS.setImeiBulk({
    orders: imeiOrders.map(o => ({
      orderId: o.id!,
      imei: getImeiFromInventory(o.id!)  // your inventory lookup
    }))
  });

  for (const r of result.orders ?? []) {
    if (r.error) {
      console.error(`IMEI failed for order ${r.orderId}: ${r.error}`);
    }
  }
}

// Set SGTIN for multiple orders at once
const sgtinOrders = newOrders.orders
  ?.filter(o => o.requiredMeta?.includes('sgtin'))
  ?? [];

if (sgtinOrders.length > 0) {
  const result = await sdk.ordersDBS.setSgtinBulk({
    orders: sgtinOrders.map(o => ({
      orderId: o.id!,
      sgtins: getSgtinsFromInventory(o.id!)  // your inventory lookup
    }))
  });
}
```

### Step 5: Validate Metadata (Bulk)

```typescript
// Check marking-metadata validation status for all orders before confirming
const validation = await sdk.ordersDBS.checkMetaValidation({ orders: orderIds });

for (const detail of validation.metaDetails ?? []) {
  console.log(`Order ${detail.orderId}: ${detail.status}`);
  if (detail.status === 'invalid') {
    console.warn(`  Needs metadata fix: ${detail.message ?? 'marking metadata invalid'}`);
  }
}
```

### Step 6: Confirm Order

```typescript
const confirmResult = await sdk.ordersDBS.confirmBulk(orderIds);

for (const r of confirmResult.results ?? []) {
  if (r.isError) {
    console.error(`Confirmation failed for ${r.orderId}:`, r.errors);
  } else {
    console.log(`Order ${r.orderId} confirmed`);
  }
}
```

### Step 7: Deliver Order

```typescript
// After physical delivery
const deliverResult = await sdk.ordersDBS.deliverBulk(orderIds);

for (const r of deliverResult.results ?? []) {
  if (!r.isError) {
    console.log(`Order ${r.orderId} marked as delivered`);
  }
}
```

### Step 8: Complete Handover

```typescript
// Customer provides verification code from WB app
const receiveResult = await sdk.ordersDBS.receiveBulk([
  { orderId: orderIds[0], code: '1234' },
  { orderId: orderIds[1], code: '5678' }
]);

for (const r of receiveResult.results ?? []) {
  if (!r.isError) {
    console.log(`Handover completed for order ${r.orderId}`);
  }
}
```

## Working with Customer Data

### Address and GPS

```typescript
const orders = await sdk.ordersDBS.getNewOrders();

for (const order of orders.orders ?? []) {
  const addr = order.address;

  if (addr) {
    console.log(`Delivery to: ${addr.fullAddress}`);

    // Use GPS for route planning
    if (addr.latitude && addr.longitude) {
      console.log(`GPS: ${addr.latitude}, ${addr.longitude}`);

      // Example: Open in Google Maps
      const mapsUrl = `https://maps.google.com/?q=${addr.latitude},${addr.longitude}`;
      console.log(`Maps: ${mapsUrl}`);
    }
  }
}
```

### Delivery Windows

```typescript
const order = orders.orders?.[0];

if (order) {
  const deliveryDate = order.ddate;      // "2024-01-15"
  const timeFrom = order.dTimeFrom;       // "09:00"
  const timeTo = order.dTimeTo;           // "12:00"

  console.log(`Deliver on ${deliveryDate} between ${timeFrom} and ${timeTo}`);
}
```

### Delivery Dates (Bulk Lookup)

```typescript
// Get delivery date details for multiple orders at once
const orderIds = orders.orders?.map(o => o.id!).filter(Boolean) ?? [];
const dates = await sdk.ordersDBS.getDeliveryDates({ orders: orderIds });

for (const dateInfo of dates.orders ?? []) {
  console.log(`Order ${dateInfo.orderId}:`);
  console.log(`  Delivery date: ${dateInfo.deliveryDate}`);
  console.log(`  Max delivery date: ${dateInfo.maxDeliveryDate}`);
}
```

### Customer Comments

```typescript
if (order.comment) {
  console.log(`Customer note: ${order.comment}`);
  // Handle special delivery instructions
}
```

## Metadata and Compliance

### Required Metadata Types

| Type | Description | Format |
|------|-------------|--------|
| `sgtin` | Marking codes | 16-135 chars, max 24 |
| `imei` | Mobile device ID | Exactly 15 chars |
| `uin` | Unique ID number | Exactly 16 chars |
| `gtin` | Global trade item | Exactly 13 chars |
| `customsDeclaration` | Customs number | 1-50 chars |

### Setting Metadata (Bulk -- Recommended)

Use the bulk metadata methods to set metadata for multiple orders in a single API call:

```typescript
// Set IMEI for multiple orders
const imeiResult = await sdk.ordersDBS.setImeiBulk({
  orders: [
    { orderId: 111, imei: '123456789012345' },
    { orderId: 222, imei: '543210987654321' }
  ]
});

// Set SGTIN for multiple orders
const sgtinResult = await sdk.ordersDBS.setSgtinBulk({
  orders: [
    { orderId: 333, sgtins: ['01046012345678900421abc123'] },
    { orderId: 444, sgtins: ['01046012345678900421abc456', '01046012345678900421abc789'] }
  ]
});

// Set customs declaration for multiple orders
const cdResult = await sdk.ordersDBS.setCustomsDeclarationBulk({
  orders: [
    { orderId: 555, customsDeclaration: '10130030/010123/0000001' }
  ]
});
```

### Validating Metadata (Bulk)

`checkMetaValidation()` returns per-order marking-metadata validation status. Call it after setting metadata and before confirming/delivering to surface orders that would 409:

```typescript
const validation = await sdk.ordersDBS.checkMetaValidation({
  orders: [111, 222, 333, 444, 555]
});

for (const detail of validation.metaDetails ?? []) {
  console.log(`Order ${detail.orderId}: ${detail.status}`);
  if (detail.status === 'invalid') {
    console.warn(`  Fix marking metadata before delivering: ${detail.message ?? ''}`);
  }
}
```

### Deleting Metadata (Bulk)

```typescript
// If you need to correct metadata for multiple orders
const deleteResult = await sdk.ordersDBS.deleteMetaBulk({
  orders: [111, 222],
  key: 'imei'
});

// Then set corrected values
await sdk.ordersDBS.setImeiBulk({
  orders: [
    { orderId: 111, imei: 'corrected150000' },
    { orderId: 222, imei: 'corrected250000' }
  ]
});
```

## B2B Orders

### Identifying B2B Orders

```typescript
const b2bInfo = await sdk.ordersDBS.getB2BInfo(orderIds);

for (const result of b2bInfo.results ?? []) {
  if (result.isError) {
    // This is an individual (B2C) order
    console.log(`Order ${result.orderId}: Individual buyer`);
  } else if (result.data) {
    // This is a B2B order
    console.log(`Order ${result.orderId}: B2B`);
    console.log(`  Organization: ${result.data.orgName}`);
    console.log(`  INN: ${result.data.inn}`);
    console.log(`  KPP: ${result.data.kpp || 'N/A'}`);
  }
}
```

### B2B Documentation

For B2B orders, you typically need:

1. **Invoice** with organization details
2. **INN and KPP** in accounting documents
3. **Universal Transfer Document (UPD)** if required

```typescript
// Example: Generate invoice data
const b2bOrder = b2bInfo.results?.find(r => !r.isError && r.data);

if (b2bOrder?.data) {
  const invoiceData = {
    buyer: b2bOrder.data.orgName,
    inn: b2bOrder.data.inn,
    kpp: b2bOrder.data.kpp || '',
    orderRef: `WB-DBS-${b2bOrder.orderId}`
  };

  // Use invoiceData for your accounting system
}
```

## Rate Limits

The DBS API uses a **4-tier rate limit system**. The SDK enforces these limits automatically, but understanding them helps you design efficient integrations.

### Rate Limit Tiers

| Tier | Name | Requests/Min | Interval | Burst | Applies To |
|------|------|-------------|----------|-------|------------|
| **T1** | Assembly Read | 300 | 200ms | 20 | `getNewOrders`, `getOrders`, `getClientInfo`, `getStatusesBulk`, `getB2BInfo`, `getGroupsInfo`, `getDeliveryDates`, `checkMetaValidation` |
| **T2** | Status Write | 60 | 1s | 10 | `confirmBulk`, `deliverBulk`, `receiveBulk`, `rejectBulk`, `cancelBulk` |
| **T3** | Meta Delete | 150 | 400ms | 20 | `deleteMetaBulk` |
| **T4** | Meta Set | 500 | 120ms | 20 | `setSgtinBulk`, `setUinBulk`, `setImeiBulk`, `setGtinBulk`, `setCustomsDeclarationBulk` |

### Penalty Multiplier (409 Responses)

All DBS endpoints use a **penalty multiplier of 10**. If the API returns a `409 Conflict` response (e.g., due to an invalid state transition), that single request counts as **10 requests** toward your rate limit budget. This means a few 409 errors can quickly exhaust your rate limit allowance.

**Avoid 409 errors by:**
- Checking order status with `getStatusesBulk()` before attempting state transitions
- Not confirming already-confirmed orders
- Ensuring metadata is set before confirming orders that require it

### Rate Limit Tips

- **T2 (Status Write)** is the most restrictive at 60 requests/minute. Batch order IDs into `confirmBulk([...])` calls instead of confirming one at a time.
- **T4 (Meta Set)** is the most generous at 500 requests/minute. Metadata set operations are fast but still benefit from bulk calls for fewer round-trips.
- The SDK handles rate limiting automatically. If a limit is hit, the request is queued and retried after the required interval.
- **Watch for 409 errors**: Each 409 response counts as 10 requests toward the rate limit (penalty multiplier), so invalid state transitions are costly.

```typescript
// Efficient: one API call for 500 orders
const result = await sdk.ordersDBS.confirmBulk(orderIds); // 1 T2 call

// Inefficient: 500 API calls (would exhaust T2 limit in ~8 minutes)
// for (const id of orderIds) {
//   await sdk.ordersDBS.confirm(id); // 500 T2 calls -- DON'T DO THIS
// }
```

## Error Handling

### Comprehensive Error Handling

```typescript
import {
  WildberriesSDK,
  RateLimitError,
  AuthenticationError,
  ValidationError,
  NetworkError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';

async function processOrders() {
  try {
    const orders = await sdk.ordersDBS.getNewOrders();
    // Process orders...
  } catch (error) {
    if (error instanceof RateLimitError) {
      console.error('Rate limit exceeded');
      console.error(`Retry after: ${error.retryAfter}ms`);
      // SDK handles retry automatically, but you can add logging
    } else if (error instanceof AuthenticationError) {
      console.error('Invalid API key');
      // Check your API key configuration
    } else if (error instanceof ValidationError) {
      console.error('Validation error:', error.message);
      // Fix request parameters
    } else if (error instanceof NetworkError) {
      console.error('Network error:', error.message);
      // Check connectivity
    } else if (error instanceof WBAPIError) {
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Handling Bulk Operation Errors

```typescript
const result = await sdk.ordersDBS.confirmBulk(orderIds);

// Check each order's result
const successful = [];
const failed = [];

for (const orderResult of result.results ?? []) {
  if (orderResult.isError) {
    failed.push({
      orderId: orderResult.orderId,
      errors: orderResult.errors
    });
  } else {
    successful.push(orderResult.orderId);
  }
}

console.log(`Confirmed: ${successful.length}`);
console.log(`Failed: ${failed.length}`);

// Handle failures
for (const failure of failed) {
  console.error(`Order ${failure.orderId}:`, failure.errors);
}
```

## Best Practices

### 1. Use Bulk Methods for Metadata

```typescript
// Preferred: Set metadata for all orders in one call
const result = await sdk.ordersDBS.setImeiBulk({
  orders: [
    { orderId: 111, imei: '123456789012345' },
    { orderId: 222, imei: '543210987654321' }
  ]
});

// Avoid: Setting metadata one order at a time (deprecated, removed April 13, 2026)
// await sdk.ordersDBS.setImei(111, '123456789012345');
// await sdk.ordersDBS.setImei(222, '543210987654321');
```

### 2. Check Metadata Before Confirming

```typescript
// Always add required metadata before confirming
const order = newOrders.orders?.[0];
if (order?.requiredMeta?.length) {
  // Set all required metadata first using bulk methods
  // Then confirm
}

await sdk.ordersDBS.confirmBulk([order.id!]);
```

### 3. Batch Operations

```typescript
// Process multiple orders efficiently
const orderIds = orders.orders?.map(o => o.id!).filter(Boolean) ?? [];

// Single API call for all orders
const statuses = await sdk.ordersDBS.getStatusesBulk(orderIds);
```

### 4. Handle Pagination

```typescript
// Fetch all completed orders with pagination
const now = Math.floor(Date.now() / 1000);
const thirtyDaysAgo = now - 30 * 24 * 60 * 60;

let allOrders = [];
let next = 0;

do {
  const result = await sdk.ordersDBS.getOrders({
    limit: 1000,
    next,
    dateFrom: thirtyDaysAgo,
    dateTo: now
  });

  allOrders.push(...(result.orders ?? []));
  next = result.next ?? 0;
} while (next > 0);
```

### 5. Rate Limit Awareness

```typescript
// DBS API has a 4-tier rate limit system.
// The SDK handles limits automatically, but for high-volume operations
// batch your order IDs to reduce API call count.

const BATCH_SIZE = 1000; // Max items per bulk request
const orderBatches = chunkArray(orderIds, BATCH_SIZE);

for (const batch of orderBatches) {
  const result = await sdk.ordersDBS.confirmBulk(batch);
  // Process result...
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}
```

### 6. Logging and Monitoring

```typescript
// Log important operations for debugging
async function confirmOrderWithLogging(orderId: number) {
  console.log(`[DBS] Confirming order ${orderId}`);

  const result = await sdk.ordersDBS.confirmBulk([orderId]);
  const orderResult = result.results?.[0];

  if (orderResult?.isError) {
    console.error(`[DBS] Order ${orderId} confirmation failed:`, orderResult.errors);
    throw new Error(`Confirmation failed: ${orderResult.errors?.[0]?.detail}`);
  }

  console.log(`[DBS] Order ${orderId} confirmed successfully`);
  return result;
}
```

## Common Issues

### "Date range exceeds 30 days"

```typescript
// Wrong
const result = await sdk.ordersDBS.getOrders({
  limit: 100,
  next: 0,
  dateFrom: now - 60 * 24 * 60 * 60, // 60 days ago
  dateTo: now
});

// Correct - split into 30-day chunks
const chunks = splitDateRange(startDate, endDate, 30);
for (const chunk of chunks) {
  const result = await sdk.ordersDBS.getOrders({
    limit: 100,
    next: 0,
    dateFrom: chunk.from,
    dateTo: chunk.to
  });
}
```

### "orderIds array cannot be empty"

```typescript
// Always check before calling
const orderIds = orders.orders?.map(o => o.id!).filter(Boolean) ?? [];

if (orderIds.length > 0) {
  const clientInfo = await sdk.ordersDBS.getClientInfo(orderIds);
}
```

### "IMEI must be exactly 15 characters"

```typescript
// Validate before calling
const imei = '123456789012345';
if (imei.length !== 15) {
  throw new Error(`Invalid IMEI length: ${imei.length}, expected 15`);
}
await sdk.ordersDBS.setImeiBulk({
  orders: [{ orderId: orderId, imei }]
});
```

## Next Steps

- [API Reference: OrdersDbsModule](/api/classes/OrdersDbsModule)
- [DBS Order Workflows](/guides/orders-dbs-workflows)
- [Migration Guide: Legacy to Bulk](/guides/migration-dbs-legacy-to-bulk)
- [Example: DBS Core Workflow](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-core-workflow.ts)
- [Example: B2B Orders](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-b2b.ts)
- [Example: Metadata](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-metadata.ts)
- [Official WB DBS API](https://dev.wildberries.ru/openapi/orders-dbs)
