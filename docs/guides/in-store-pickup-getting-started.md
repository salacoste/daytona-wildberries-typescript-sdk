---
title: In-Store Pickup Getting Started Guide
description: Complete guide to managing click-and-collect orders where customers pick up at seller's location
layout: doc
---

# In-Store Pickup Getting Started Guide

This guide covers everything you need to know to work with In-Store Pickup (click-and-collect) orders in the Wildberries TypeScript SDK.

> **v4.0.0**: The single-order assembly and metadata shims (`updateOrdersConfirm` / `Prepare` / `Receive` / `Reject` / `Cancel`, `createOrdersStatus`, `getOrdersMeta`, `deleteOrdersMeta`, `updateMetaSgtin` / `Uin` / `Imei` / `Gtin`) have been **removed**. Use the batch methods described in this guide (`confirmBulk` / `prepareBulk` / `receiveBulk` / `rejectBulk` / `cancelBulk`, `getStatusesBulk`, `getMetaBulk`, `deleteMetaBulk`, `setSgtinBulk` / `setUinBulk` / `setImeiBulk` / `setGtinBulk`). See the [batch migration guide](/guides/in-store-pickup-batch-migration) for the full mapping.

## Table of Contents

- [What is In-Store Pickup?](#what-is-in-store-pickup)
- [Quick Start](#quick-start)
- [Available Methods](#available-methods)
- [Order Lifecycle](#order-lifecycle)
- [Customer Identity Verification](#customer-identity-verification)
- [Metadata Operations](#metadata-operations)
- [Rate Limits](#rate-limits)
- [Error Handling](#error-handling)
- [Best Practices](#best-practices)
- [Related Resources](#related-resources)

## What is In-Store Pickup?

**In-Store Pickup** (click-and-collect) is a fulfillment model where:

1. **Customer orders online**: The customer places an order through Wildberries
2. **Seller prepares the order**: The seller assembles and prepares the product at their physical location
3. **Customer picks up in person**: The customer visits the seller's location to collect the order

### Key Features

| Feature | Description |
|---------|-------------|
| **Physical Location** | Seller has a brick-and-mortar store or pickup point |
| **Customer Verification** | Identity verification via passcode before handover |
| **Assembly Workflow** | Structured lifecycle: new, confirm, prepare, receive/reject |
| **Metadata Tracking** | Product marking codes (IMEI, SGTIN, UIN, GTIN) for compliance |
| **409 Penalty** | 409 Conflict responses count as **10 requests** toward rate limits |

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

// Step 1: Get new pickup orders
const { orders } = await sdk.inStorePickup.getOrdersNew();
console.log(`Found ${orders?.length ?? 0} new pickup orders`);

// Step 2: Confirm orders for assembly (batch — pass an array of IDs)
const orderId = orders?.[0]?.id;
if (orderId) {
  await sdk.inStorePickup.confirmBulk([orderId]);
  console.log(`Order ${orderId} confirmed for assembly`);

  // Step 3: Mark as prepared for pickup
  await sdk.inStorePickup.prepareBulk([orderId]);
  console.log(`Order ${orderId} ready for pickup`);

  // Step 4: Verify customer identity
  const identity = await sdk.inStorePickup.createClientIdentity({
    orderCode: '170046918-0011',
    passcode: '4567'
  });
  console.log(`Identity verified: ${identity.isIdentified}`);

  // Step 5: Complete handover
  await sdk.inStorePickup.receiveBulk([orderId]);
  console.log(`Order ${orderId} received by customer`);
}
```

### Environment Setup

Create a `.env` file:

```bash
WB_API_KEY=your_api_key_here
```

## Available Methods

### Assembly Tasks (batch — 6 methods)

| Method | Description | Rate Tier |
|--------|-------------|-----------|
| `getOrdersNew()` | Get new pickup orders awaiting processing | T1 (300 rpm) |
| `confirmBulk(orderIds)` | Confirm orders for assembly | T2 (100 rpm) |
| `prepareBulk(orderIds)` | Mark orders as prepared for pickup | T2 (100 rpm) |
| `receiveBulk(orderIds)` | Mark as received by customer | T2 (100 rpm) |
| `rejectBulk(orderIds)` | Reject orders (customer refused) | T2 (100 rpm) |
| `cancelBulk(orderIds)` | Cancel orders (seller-initiated) | T2 (100 rpm) |

### Order Queries (2 methods)

| Method | Description | Rate Tier |
|--------|-------------|-----------|
| `getClickCollectOrders(params)` | List completed orders with pagination | T1 (300 rpm) |
| `getStatusesBulk(orderIds)` | Get order statuses by IDs | T1 (300 rpm) |

### Customer Interaction (2 methods)

| Method | Description | Rate Tier |
|--------|-------------|-----------|
| `createOrdersClient(data)` | Get customer info for orders | T1 (300 rpm) |
| `createClientIdentity(data)` | Verify customer identity via passcode | T3 (30 rpm) |

### Metadata Operations (batch — 7 methods)

| Method | Description | Rate Tier |
|--------|-------------|-----------|
| `getMetaBulk(request)` | Get label identifiers for orders | T1 (300 rpm) |
| `deleteMetaBulk(request)` | Delete metadata for orders by key | T1 (300 rpm) |
| `checkMetaValidation(orders)` | Check marking-metadata validation status | T1 (300 rpm) |
| `setSgtinBulk(request)` | Set SGTIN marking codes | T4 (1000 rpm) |
| `setUinBulk(request)` | Set UIN codes | T4 (1000 rpm) |
| `setImeiBulk(request)` | Set IMEI codes | T4 (1000 rpm) |
| `setGtinBulk(request)` | Set GTIN codes | T4 (1000 rpm) |

## Order Lifecycle

Orders follow a strict state machine with defined transitions:

```
                    +----------+
                    |   new    |
                    +----+-----+
                         |
                    confirmBulk()
                         |
                    +----v-----+
                    | confirm  |
                    +----+-----+
                         |
                    prepareBulk()
                         |
                    +----v-----+
              +---->| prepare  |<----+
              |     +----+-----+     |
              |          |           |
         rejectBulk()  receiveBulk()  (verify identity
              |          |       before handover)
              v          v
        +---------+ +---------+
        | reject  | | receive |
        +---------+ +---------+

        Any state ---cancelBulk()---> [ cancel ]
```

**Valid State Transitions**:
- `new` --> `confirm` (begin assembly)
- `confirm` --> `prepare` (ready for pickup)
- `prepare` --> `receive` (customer collected) -- terminal state
- `prepare` --> `reject` (customer refused) -- terminal state
- Any state --> `cancel` (seller cancellation) -- terminal state

### Processing Orders Step by Step

```typescript
const { orders } = await sdk.inStorePickup.getOrdersNew();

for (const order of orders ?? []) {
  console.log(`Order ${order.id}: ${order.article}`);

  // Check for required metadata
  if (order.requiredMeta?.length) {
    console.log(`  Required metadata: ${order.requiredMeta.join(', ')}`);
  }

  // Confirm the order
  await sdk.inStorePickup.confirmBulk([order.id!]);

  // Set required metadata (must be done in confirm state)
  if (order.requiredMeta?.includes('imei')) {
    await sdk.inStorePickup.setImeiBulk({
      orders: [{ orderId: order.id!, imei: '123456789012345' /* from your inventory */ }]
    });
  }

  // Mark as prepared
  await sdk.inStorePickup.prepareBulk([order.id!]);
}
```

## Customer Identity Verification

Before handing over a prepared order, you should verify the customer's identity using a passcode from their Wildberries app.

### How It Works

1. The customer receives a **passcode** in their Wildberries app for their order
2. When the customer arrives at your location, they provide their **order code** and **passcode**
3. You call `createClientIdentity()` to verify the passcode matches
4. If verified (`isIdentified: true`), proceed with the handover

### Verification Flow

```typescript
// Customer provides their order code and passcode
const result = await sdk.inStorePickup.createClientIdentity({
  orderCode: '170046918-0011',  // Customer's order code
  passcode: '4567'              // Passcode from WB app
});

if (result.isIdentified) {
  console.log('Customer identity verified');
  // Proceed to hand over the order
  await sdk.inStorePickup.receiveBulk([orderId]);
} else {
  console.log('Verification failed - ask customer to check their app');
}
```

### Getting Customer Information

You can also retrieve customer contact details for orders in `confirm` or `prepare` status:

```typescript
const clientInfo = await sdk.inStorePickup.createOrdersClient({
  orders: [12345, 67890]
});

for (const client of clientInfo.orders ?? []) {
  console.log(`Order ${client.orderID}:`);
  console.log(`  Phone: ${client.phone}`);
  console.log(`  Name: ${client.fio}`);
}
```

## Metadata Operations

Products requiring compliance tracking need metadata codes attached before handover. The `requiredMeta` field on new orders tells you which codes are needed.

### Metadata Types

| Type | Description | Format |
|------|-------------|--------|
| `sgtin` | Marking codes (Chestniy Znak) | 16-135 chars, max 24 codes |
| `imei` | Mobile device ID | Exactly 15 digits |
| `uin` | Unique identification number | Exactly 16 chars |
| `gtin` | Global trade item number (Belarus) | Exactly 13 chars |

### Setting Metadata (Batch)

Metadata can only be set when the order is in `confirm` status. Use the batch setters to set codes for one or many orders in a single call:

```typescript
// Set IMEI for one or more orders
await sdk.inStorePickup.setImeiBulk({
  orders: [{ orderId, imei: '123456789012345' }]
});

// Set SGTIN marking codes
await sdk.inStorePickup.setSgtinBulk({
  orders: [{ orderId, sgtins: ['01046012345678900421abc123'] }]
});

// Set UIN
await sdk.inStorePickup.setUinBulk({
  orders: [{ orderId, uin: '1234567890123456' }]
});

// Set GTIN
await sdk.inStorePickup.setGtinBulk({
  orders: [{ orderId, gtin: '1234567890123' }]
});
```

### Verifying Metadata (Batch)

Use `getMetaBulk()` to retrieve the label identifiers currently set for one or more orders:

```typescript
const meta = await sdk.inStorePickup.getMetaBulk({ ordersIds: [orderId] });
const orderMeta = meta.orders?.[0];

if (orderMeta?.imei) {
  console.log(`IMEI: ${orderMeta.imei}`);
}
if (orderMeta.sgtin?.length) {
  console.log(`SGTIN codes: ${orderMeta.sgtin.length}`);
}
```

### Deleting Metadata (Batch)

If you need to correct metadata, delete it first and then set the new value. Pass the `key` identifying which label type to remove:

```typescript
// Delete IMEI metadata for one or more orders
await sdk.inStorePickup.deleteMetaBulk({
  ordersIds: [orderId],
  key: 'imei'
});

// Set corrected value
await sdk.inStorePickup.setImeiBulk({
  orders: [{ orderId, imei: '543210987654321' }]
});
```

## Rate Limits

The In-Store Pickup API uses a **4-tier rate limit system**. The SDK enforces these limits automatically, but understanding them helps you design efficient integrations.

### Rate Limit Tiers

| Tier | Name | Requests/Min | Interval | Applies To |
|------|------|-------------|----------|------------|
| **T1** | Assembly Reads | 300 | 200ms | `getOrdersNew`, `getClickCollectOrders`, `getStatusesBulk`, `createOrdersClient`, `getMetaBulk`, `deleteMetaBulk`, `checkMetaValidation` |
| **T2** | State Transitions | 100 | 600ms | `confirmBulk`, `prepareBulk`, `receiveBulk`, `rejectBulk`, `cancelBulk` |
| **T3** | Identity Check | 30 | 2s | `createClientIdentity` |
| **T4** | Metadata Set | 1000 | 60ms | `setSgtinBulk`, `setUinBulk`, `setImeiBulk`, `setGtinBulk` |

### 409 Penalty Multiplier (CRITICAL)

**All endpoints** in the In-Store Pickup module apply a **10x penalty multiplier** for 409 Conflict responses. This means:

- A single 409 response counts as **10 requests** toward your rate limit
- For T2 (State Transitions) at 100 rpm, just 10 conflict responses would exhaust your entire quota
- For T3 (Identity Check) at 30 rpm, just 3 failed verifications would consume your quota

```typescript
// CAUTION: If this causes a 409, it counts as 10 requests
try {
  await sdk.inStorePickup.confirmBulk([orderId]);
} catch (error) {
  // This 409 just used 10 of your 100 T2 requests/minute
  console.error('State conflict - consider checking status first');
}
```

### Rate Limit Tips

- **Check order status before state transitions** to avoid 409 errors
- **T3 (Identity Check)** is the most restrictive at 30 requests/minute. Do not retry failed verifications in a loop
- The SDK handles rate limiting automatically. If a limit is hit, the request is queued and retried after the required interval

## Error Handling

### Custom Error Classes

The SDK provides four In-Store Pickup specific error classes:

```typescript
import {
  WildberriesSDK,
  PickupOrderNotFoundError,
  InvalidOrderStateError,
  CustomerVerificationError,
  MetadataValidationError,
  RateLimitError,
  WBAPIError
} from 'daytona-wildberries-typescript-sdk';
```

### PickupOrderNotFoundError (404)

Thrown when an order ID does not exist:

```typescript
try {
  await sdk.inStorePickup.confirmBulk([999999]);
} catch (error) {
  if (error instanceof PickupOrderNotFoundError) {
    console.error(`Order ${error.orderId} not found`);
    // Verify the order ID and try again
  }
}
```

### InvalidOrderStateError (409)

Thrown when an order state transition is invalid (e.g., preparing an unconfirmed order):

```typescript
try {
  await sdk.inStorePickup.prepareBulk([orderId]);
} catch (error) {
  if (error instanceof InvalidOrderStateError) {
    console.error(`Cannot ${error.attemptedAction} order ${error.orderId}`);
    console.error(`Current state: ${error.currentState}`);

    // Check current status and retry with correct action
    const statuses = await sdk.inStorePickup.getStatusesBulk([error.orderId]);
    console.log('Actual status:', statuses.orders?.[0]?.supplierStatus);
  }
}
```

### CustomerVerificationError (409)

Thrown when passcode verification fails:

```typescript
try {
  const result = await sdk.inStorePickup.createClientIdentity({
    orderCode: '170046918-0011',
    passcode: '1234'
  });
} catch (error) {
  if (error instanceof CustomerVerificationError) {
    console.error(`Verification failed for order ${error.orderCode}`);
    // Ask the customer to check their Wildberries app for the correct passcode
    // WARNING: Each failed attempt counts as 10 requests (T3: 30 rpm)
  }
}
```

### MetadataValidationError (409)

Thrown when setting metadata fails (wrong format, wrong order state, or metadata type not required):

```typescript
try {
  await sdk.inStorePickup.setImeiBulk({
    orders: [{ orderId, imei: '123456789012345' }]
  });
} catch (error) {
  if (error instanceof MetadataValidationError) {
    console.error(`Cannot set ${error.codeType} for order ${error.orderId}`);
    // Ensure: 1) Order is in "confirm" status
    //         2) Code type is in order's requiredMeta
    //         3) Code format is valid
  }
}
```

### Comprehensive Error Handling

```typescript
async function processPickupOrder(orderId: number) {
  try {
    await sdk.inStorePickup.confirmBulk([orderId]);
    await sdk.inStorePickup.prepareBulk([orderId]);
  } catch (error) {
    if (error instanceof PickupOrderNotFoundError) {
      console.error(`Order ${error.orderId} not found`);
    } else if (error instanceof InvalidOrderStateError) {
      console.error(`Invalid state transition: ${error.message}`);
    } else if (error instanceof RateLimitError) {
      console.error(`Rate limit exceeded. Retry after: ${error.retryAfter}ms`);
    } else if (error instanceof WBAPIError) {
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
  }
}
```

## Best Practices

### 1. Process Orders Promptly

New pickup orders should be confirmed and prepared quickly. Customers expect timely processing:

```typescript
// Poll for new orders regularly
const { orders } = await sdk.inStorePickup.getOrdersNew();

for (const order of orders ?? []) {
  await sdk.inStorePickup.confirmBulk([order.id!]);
  // Set metadata, then prepare
}
```

### 2. Handle 409s Carefully (10x Penalty)

Every 409 Conflict response costs 10 requests against your rate limit. Always check status before attempting transitions:

```typescript
// GOOD: Check status first
const statuses = await sdk.inStorePickup.getStatusesBulk([orderId]);
const status = statuses.orders?.[0]?.supplierStatus;

if (status === 'new') {
  await sdk.inStorePickup.confirmBulk([orderId]);
} else if (status === 'confirm') {
  await sdk.inStorePickup.prepareBulk([orderId]);
}

// BAD: Blindly attempting transitions (risk 409 + 10x penalty)
// await sdk.inStorePickup.prepareBulk([orderId]);
```

### 3. Verify Identity Before Handover

Always verify the customer's identity before handing over the order:

```typescript
const result = await sdk.inStorePickup.createClientIdentity({
  orderCode: customerOrderCode,
  passcode: customerPasscode
});

if (!result.isIdentified) {
  // Do NOT hand over the order
  console.error('Identity not verified - request correct passcode');
  return;
}

// Safe to hand over
await sdk.inStorePickup.receiveBulk([orderId]);
```

### 4. Set Metadata Before Preparing

Required metadata must be set while the order is in `confirm` status, before calling `prepareBulk()`:

```typescript
const { orders } = await sdk.inStorePickup.getOrdersNew();

for (const order of orders ?? []) {
  // Confirm first
  await sdk.inStorePickup.confirmBulk([order.id!]);

  // Set required metadata while in confirm state
  if (order.requiredMeta?.includes('imei')) {
    await sdk.inStorePickup.setImeiBulk({
      orders: [{ orderId: order.id!, imei: getImeiFromInventory(order.article!) }]
    });
  }
  if (order.requiredMeta?.includes('sgtin')) {
    await sdk.inStorePickup.setSgtinBulk({
      orders: [{ orderId: order.id!, sgtins: getSgtinsFromInventory(order.article!) }]
    });
  }

  // Verify metadata was set correctly
  const meta = await sdk.inStorePickup.getMetaBulk({ ordersIds: [order.id!] });
  console.log('Metadata:', meta.orders?.[0]);

  // Then prepare for pickup
  await sdk.inStorePickup.prepareBulk([order.id!]);
}
```

### 5. Use Pagination for Historical Orders

```typescript
const now = Math.floor(Date.now() / 1000);
const sevenDaysAgo = now - 7 * 24 * 60 * 60;

let allOrders = [];
let next = 0;

do {
  const result = await sdk.inStorePickup.getClickCollectOrders({
    limit: 1000,
    next,
    dateFrom: sevenDaysAgo,
    dateTo: now
  });

  allOrders.push(...(result.orders ?? []));
  next = result.next ?? 0;
} while (next > 0);

console.log(`Total completed pickup orders: ${allOrders.length}`);
```

## Related Resources

- [API Reference: InStorePickupModule](/api/classes/InStorePickupModule)
- [In-Store Pickup Batch Migration](/guides/in-store-pickup-batch-migration) — migrate from the removed single-order shims to the batch API
- [Official WB Click-and-Collect API](https://dev.wildberries.ru/openapi/orders-click-collect)
