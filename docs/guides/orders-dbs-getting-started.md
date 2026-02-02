---
title: Orders DBS Getting Started Guide
description: Complete guide to using the Orders DBS (Delivery by Seller) module for direct customer delivery
layout: doc
---

# Orders DBS Getting Started Guide

This guide covers everything you need to know to work with DBS (Delivery by Seller) orders in the Wildberries TypeScript SDK.

## Table of Contents

- [What is DBS?](#what-is-dbs)
- [DBS vs FBS vs FBW](#dbs-vs-fbs-vs-fbw)
- [Quick Start](#quick-start)
- [Complete Order Workflow](#complete-order-workflow)
- [Working with Customer Data](#working-with-customer-data)
- [Metadata and Compliance](#metadata-and-compliance)
- [B2B Orders](#b2b-orders)
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

### Step 3: Add Required Metadata

```typescript
// Check if metadata is required
const order = newOrders.orders?.[0];
if (order?.requiredMeta?.includes('imei')) {
  await sdk.ordersDBS.setImei(order.id!, '123456789012345');
}

if (order?.requiredMeta?.includes('sgtin')) {
  await sdk.ordersDBS.setSgtin(order.id!, [
    '01046012345678900421abc123'
  ]);
}
```

### Step 4: Confirm Order

```typescript
const confirmResult = await sdk.ordersDBS.confirmBulk([orderId]);

if (confirmResult.results?.[0]?.isError) {
  console.error('Confirmation failed:', confirmResult.results[0].errors);
} else {
  console.log('Order confirmed successfully');
}
```

### Step 5: Deliver Order

```typescript
// After physical delivery
const deliverResult = await sdk.ordersDBS.deliverBulk([orderId]);

if (!deliverResult.results?.[0]?.isError) {
  console.log('Marked as delivered');
}
```

### Step 6: Complete Handover

```typescript
// Customer provides verification code from WB app
const customerCode = '1234';

const receiveResult = await sdk.ordersDBS.receiveBulk([
  { orderId: orderId, code: customerCode }
]);

if (!receiveResult.results?.[0]?.isError) {
  console.log('Handover completed!');
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

### Setting Metadata

```typescript
// Check what's required
const meta = order.requiredMeta ?? [];

// Set SGTIN for marked products
if (meta.includes('sgtin')) {
  await sdk.ordersDBS.setSgtin(order.id!, [
    '01046012345678900421abc123',
    '01046012345678900421abc124'
  ]);
}

// Set IMEI for electronics
if (meta.includes('imei')) {
  await sdk.ordersDBS.setImei(order.id!, '123456789012345');
}

// Set customs declaration for imports
if (meta.includes('customsDeclaration')) {
  await sdk.ordersDBS.setCustomsDeclaration(order.id!, '10130030/010123/0000001');
}
```

### Verifying Metadata

```typescript
const orderMeta = await sdk.ordersDBS.getMeta(orderId);

if (orderMeta.meta?.sgtin?.value) {
  console.log(`SGTIN codes set: ${orderMeta.meta.sgtin.value.length}`);
}
```

### Deleting Metadata

```typescript
// If you need to correct metadata
await sdk.ordersDBS.deleteMeta(orderId, 'imei');
await sdk.ordersDBS.setImei(orderId, 'corrected15chars');
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

1. **Invoice (Счёт-фактура)** with organization details
2. **INN and KPP** in accounting documents
3. **Universal Transfer Document (УПД)** if required

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

### 1. Check Metadata Before Confirming

```typescript
// Always add required metadata before confirming
const order = newOrders.orders?.[0];
if (order?.requiredMeta?.length) {
  // Set all required metadata first
  for (const metaType of order.requiredMeta) {
    // Set metadata based on type...
  }
}

// Then confirm
await sdk.ordersDBS.confirmBulk([order.id!]);
```

### 2. Batch Operations

```typescript
// Process multiple orders efficiently
const orderIds = orders.orders?.map(o => o.id!).filter(Boolean) ?? [];

// Single API call for all orders
const statuses = await sdk.ordersDBS.getStatusesBulk(orderIds);
```

### 3. Handle Pagination

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

### 4. Rate Limit Awareness

```typescript
// DBS API: 300 requests/minute with 200ms interval
// SDK handles this automatically, but for high-volume operations:

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

### 5. Logging and Monitoring

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
// ❌ Wrong
const result = await sdk.ordersDBS.getOrders({
  limit: 100,
  next: 0,
  dateFrom: now - 60 * 24 * 60 * 60, // 60 days ago
  dateTo: now
});

// ✅ Correct - split into 30-day chunks
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
await sdk.ordersDBS.setImei(orderId, imei);
```

## Next Steps

- [API Reference: OrdersDbsModule](/api/classes/OrdersDbsModule)
- [Migration Guide: Legacy to Bulk](/guides/migration-dbs-legacy-to-bulk)
- [Example: DBS Core Workflow](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-core-workflow.ts)
- [Example: B2B Orders](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-b2b.ts)
- [Example: Metadata](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/main/examples/orders-dbs-metadata.ts)
- [Official WB DBS API](https://dev.wildberries.ru/openapi/orders-dbs)
