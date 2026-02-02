---
title: DBS Order Workflows
description: Common workflows and patterns for processing DBS (Delivery by Seller) orders
layout: doc
---

# DBS Order Workflows

This guide covers common workflows for processing DBS (Delivery by Seller) orders with the Wildberries TypeScript SDK.

## Table of Contents

- [Order Lifecycle Overview](#order-lifecycle-overview)
- [New Order Processing](#new-order-processing)
- [Delivery Route Planning](#delivery-route-planning)
- [Metadata Compliance](#metadata-compliance)
- [Status Transitions](#status-transitions)
- [B2B Order Handling](#b2b-order-handling)
- [Batch Processing](#batch-processing)
- [Error Recovery](#error-recovery)

## Order Lifecycle Overview

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│    NEW      │────▶│   CONFIRM   │────▶│   DELIVER   │────▶│   RECEIVE   │────▶│    SOLD     │
│             │     │             │     │             │     │             │     │             │
│ (new order) │     │ (accepted)  │     │ (en route)  │     │ (handover)  │     │ (complete)  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
       │                   │                   │                   │
       │                   │                   │                   │
       ▼                   ▼                   ▼                   ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   CANCEL    │     │   CANCEL    │     │   CANCEL    │     │   REJECT    │
│             │     │             │     │             │     │             │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
```

### Status Meanings

| Status | Seller Action | Description |
|--------|--------------|-------------|
| `new` | - | New order awaiting processing |
| `confirm` | `confirmBulk()` | Order accepted for delivery |
| `deliver` | `deliverBulk()` | Out for delivery |
| `receive` | `receiveBulk()` | Customer received goods |
| `reject` | `rejectBulk()` | Customer refused delivery |
| `cancel` | `cancelBulk()` | Order cancelled |

## New Order Processing

### Complete Processing Flow

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: process.env.WB_API_KEY! });

async function processNewOrders() {
  // Step 1: Fetch new orders
  const { orders } = await sdk.ordersDBS.getNewOrders();

  if (!orders?.length) {
    console.log('No new orders');
    return;
  }

  console.log(`Processing ${orders.length} new orders`);

  // Step 2: Get customer contact info
  const orderIds = orders.map(o => o.id!).filter(Boolean);
  const { orders: clients } = await sdk.ordersDBS.getClientInfo(orderIds);

  // Step 3: Create order map with all data
  const orderMap = new Map();

  for (const order of orders) {
    const client = clients?.find(c => c.orderID === order.id);

    orderMap.set(order.id, {
      order,
      client,
      address: order.address?.fullAddress,
      gps: order.address?.latitude && order.address?.longitude
        ? { lat: order.address.latitude, lng: order.address.longitude }
        : null,
      deliveryWindow: {
        date: order.ddate,
        from: order.dTimeFrom,
        to: order.dTimeTo
      },
      requiredMeta: order.requiredMeta ?? [],
      customerPhone: client?.phone
        ? `+${client.phoneCode}${client.phone}`
        : null
    });
  }

  // Step 4: Process each order
  for (const [orderId, data] of orderMap) {
    try {
      // Add required metadata
      if (data.requiredMeta.length > 0) {
        await processMetadata(orderId, data.requiredMeta);
      }

      // Confirm order
      const result = await sdk.ordersDBS.confirmBulk([orderId]);

      if (result.results?.[0]?.isError) {
        console.error(`Failed to confirm ${orderId}:`, result.results[0].errors);
        continue;
      }

      console.log(`Confirmed order ${orderId} for ${data.address}`);

    } catch (error) {
      console.error(`Error processing order ${orderId}:`, error);
    }
  }
}

async function processMetadata(orderId: number, requiredMeta: string[]) {
  // Get metadata values from your system
  const metadataValues = await getMetadataFromInventory(orderId);

  for (const metaType of requiredMeta) {
    switch (metaType) {
      case 'imei':
        if (metadataValues.imei) {
          await sdk.ordersDBS.setImei(orderId, metadataValues.imei);
        }
        break;
      case 'sgtin':
        if (metadataValues.sgtins?.length) {
          await sdk.ordersDBS.setSgtin(orderId, metadataValues.sgtins);
        }
        break;
      case 'uin':
        if (metadataValues.uin) {
          await sdk.ordersDBS.setUin(orderId, metadataValues.uin);
        }
        break;
      case 'gtin':
        if (metadataValues.gtin) {
          await sdk.ordersDBS.setGtin(orderId, metadataValues.gtin);
        }
        break;
      case 'customsDeclaration':
        if (metadataValues.customsDeclaration) {
          await sdk.ordersDBS.setCustomsDeclaration(orderId, metadataValues.customsDeclaration);
        }
        break;
    }
  }
}
```

## Delivery Route Planning

### Group Orders by Location

```typescript
interface DeliveryRoute {
  orders: Array<{
    orderId: number;
    address: string;
    gps: { lat: number; lng: number };
    deliveryWindow: { date: string; from: string; to: string };
    customerPhone: string;
  }>;
  totalDistance?: number;
  estimatedTime?: number;
}

async function planDeliveryRoutes(): Promise<DeliveryRoute[]> {
  const { orders } = await sdk.ordersDBS.getNewOrders();

  if (!orders?.length) return [];

  // Get customer info
  const orderIds = orders.map(o => o.id!).filter(Boolean);
  const { orders: clients } = await sdk.ordersDBS.getClientInfo(orderIds);

  // Group by delivery date
  const byDate = new Map<string, typeof orders>();

  for (const order of orders) {
    const date = order.ddate ?? 'unscheduled';
    if (!byDate.has(date)) {
      byDate.set(date, []);
    }
    byDate.get(date)!.push(order);
  }

  // Create routes for each day
  const routes: DeliveryRoute[] = [];

  for (const [date, dayOrders] of byDate) {
    const routeOrders = dayOrders
      .filter(o => o.address?.latitude && o.address?.longitude)
      .map(order => {
        const client = clients?.find(c => c.orderID === order.id);
        return {
          orderId: order.id!,
          address: order.address!.fullAddress!,
          gps: {
            lat: order.address!.latitude!,
            lng: order.address!.longitude!
          },
          deliveryWindow: {
            date: order.ddate!,
            from: order.dTimeFrom!,
            to: order.dTimeTo!
          },
          customerPhone: client?.phone
            ? `+${client.phoneCode}${client.phone}`
            : ''
        };
      });

    // Sort by delivery time window
    routeOrders.sort((a, b) => {
      return a.deliveryWindow.from.localeCompare(b.deliveryWindow.from);
    });

    routes.push({
      orders: routeOrders
    });
  }

  return routes;
}

// Example: Export to Google Maps
function generateGoogleMapsUrl(route: DeliveryRoute): string {
  const waypoints = route.orders
    .map(o => `${o.gps.lat},${o.gps.lng}`)
    .join('/');

  return `https://www.google.com/maps/dir/${waypoints}`;
}
```

### Time Window Optimization

```typescript
interface TimeSlot {
  from: string;
  to: string;
  orders: number[];
}

function groupByTimeSlot(orders: any[]): TimeSlot[] {
  const slots = new Map<string, number[]>();

  for (const order of orders) {
    const slotKey = `${order.dTimeFrom}-${order.dTimeTo}`;
    if (!slots.has(slotKey)) {
      slots.set(slotKey, []);
    }
    slots.get(slotKey)!.push(order.id);
  }

  return Array.from(slots.entries())
    .map(([key, orderIds]) => {
      const [from, to] = key.split('-');
      return { from, to, orders: orderIds };
    })
    .sort((a, b) => a.from.localeCompare(b.from));
}
```

## Metadata Compliance

### Automated Metadata Workflow

```typescript
interface MetadataResult {
  orderId: number;
  success: boolean;
  errors: string[];
}

async function ensureMetadataCompliance(
  orderIds: number[]
): Promise<MetadataResult[]> {
  const results: MetadataResult[] = [];

  // Get current orders to check required metadata
  const { orders } = await sdk.ordersDBS.getNewOrders();

  for (const orderId of orderIds) {
    const order = orders?.find(o => o.id === orderId);

    if (!order) {
      results.push({
        orderId,
        success: false,
        errors: ['Order not found']
      });
      continue;
    }

    const errors: string[] = [];
    const required = order.requiredMeta ?? [];

    if (required.length === 0) {
      results.push({ orderId, success: true, errors: [] });
      continue;
    }

    // Get current metadata
    const { meta } = await sdk.ordersDBS.getMeta(orderId);

    // Check each required type
    for (const metaType of required) {
      const hasValue = checkMetadataValue(meta, metaType);

      if (!hasValue) {
        // Try to set from inventory
        try {
          await setMetadataFromInventory(orderId, metaType);
        } catch (err) {
          errors.push(`Failed to set ${metaType}: ${err}`);
        }
      }
    }

    results.push({
      orderId,
      success: errors.length === 0,
      errors
    });
  }

  return results;
}

function checkMetadataValue(meta: any, type: string): boolean {
  switch (type) {
    case 'imei':
      return !!meta?.imei?.value;
    case 'sgtin':
      return (meta?.sgtin?.value?.length ?? 0) > 0;
    case 'uin':
      return !!meta?.uin?.value;
    case 'gtin':
      return !!meta?.gtin?.value;
    case 'customsDeclaration':
      return !!meta?.customsDeclaration?.value;
    default:
      return false;
  }
}
```

### SGTIN Validation

```typescript
function validateSgtin(sgtin: string): { valid: boolean; error?: string } {
  if (sgtin.length < 16 || sgtin.length > 135) {
    return {
      valid: false,
      error: `Invalid length: ${sgtin.length}. Must be 16-135 characters.`
    };
  }

  // Check format: starts with 01 (GTIN indicator)
  if (!sgtin.startsWith('01')) {
    return {
      valid: false,
      error: 'SGTIN should start with "01" (GTIN indicator)'
    };
  }

  return { valid: true };
}

async function setSgtinWithValidation(
  orderId: number,
  sgtins: string[]
): Promise<void> {
  // Validate all SGTINs first
  const invalid = sgtins
    .map(s => ({ sgtin: s, ...validateSgtin(s) }))
    .filter(r => !r.valid);

  if (invalid.length > 0) {
    throw new Error(
      `Invalid SGTINs: ${invalid.map(i => `${i.sgtin}: ${i.error}`).join(', ')}`
    );
  }

  // Check max count
  if (sgtins.length > 24) {
    throw new Error(`Too many SGTINs: ${sgtins.length}. Maximum is 24.`);
  }

  await sdk.ordersDBS.setSgtin(orderId, sgtins);
}
```

## Status Transitions

### Bulk Status Update

```typescript
interface StatusUpdateResult {
  successful: number[];
  failed: Array<{ orderId: number; error: string }>;
}

async function bulkConfirm(orderIds: number[]): Promise<StatusUpdateResult> {
  const result = await sdk.ordersDBS.confirmBulk(orderIds);

  const successful: number[] = [];
  const failed: Array<{ orderId: number; error: string }> = [];

  for (const r of result.results ?? []) {
    if (r.isError) {
      failed.push({
        orderId: r.orderId!,
        error: r.errors?.[0]?.detail ?? 'Unknown error'
      });
    } else {
      successful.push(r.orderId!);
    }
  }

  return { successful, failed };
}

async function bulkDeliver(orderIds: number[]): Promise<StatusUpdateResult> {
  const result = await sdk.ordersDBS.deliverBulk(orderIds);

  const successful: number[] = [];
  const failed: Array<{ orderId: number; error: string }> = [];

  for (const r of result.results ?? []) {
    if (r.isError) {
      failed.push({
        orderId: r.orderId!,
        error: r.errors?.[0]?.detail ?? 'Unknown error'
      });
    } else {
      successful.push(r.orderId!);
    }
  }

  return { successful, failed };
}

async function completeHandover(
  orderCodes: Array<{ orderId: number; code: string }>
): Promise<StatusUpdateResult> {
  const result = await sdk.ordersDBS.receiveBulk(orderCodes);

  const successful: number[] = [];
  const failed: Array<{ orderId: number; error: string }> = [];

  for (const r of result.results ?? []) {
    if (r.isError) {
      failed.push({
        orderId: r.orderId!,
        error: r.errors?.[0]?.detail ?? 'Unknown error'
      });
    } else {
      successful.push(r.orderId!);
    }
  }

  return { successful, failed };
}
```

### Status Monitoring

```typescript
async function monitorOrderStatuses(orderIds: number[]): Promise<void> {
  const { orders } = await sdk.ordersDBS.getStatusesBulk(orderIds);

  const statusCounts = new Map<string, number>();

  for (const order of orders ?? []) {
    const status = order.supplierStatus ?? 'unknown';
    statusCounts.set(status, (statusCounts.get(status) ?? 0) + 1);

    // Log errors
    if (order.errors?.length) {
      console.error(`Order ${order.orderId} errors:`, order.errors);
    }
  }

  console.log('Status Summary:');
  for (const [status, count] of statusCounts) {
    console.log(`  ${status}: ${count}`);
  }
}
```

## B2B Order Handling

### B2B Detection and Processing

```typescript
interface B2BOrder {
  orderId: number;
  organization: {
    name: string;
    inn: string;
    kpp?: string;
  };
}

async function getB2BOrders(orderIds: number[]): Promise<B2BOrder[]> {
  const { results } = await sdk.ordersDBS.getB2BInfo(orderIds);

  const b2bOrders: B2BOrder[] = [];

  for (const result of results ?? []) {
    if (!result.isError && result.data) {
      b2bOrders.push({
        orderId: result.orderId!,
        organization: {
          name: result.data.orgName!,
          inn: result.data.inn!,
          kpp: result.data.kpp
        }
      });
    }
  }

  return b2bOrders;
}

// Generate invoice data for B2B orders
interface InvoiceData {
  orderRef: string;
  buyer: string;
  inn: string;
  kpp: string;
  isIndividualEntrepreneur: boolean;
}

function generateInvoiceData(b2bOrder: B2BOrder): InvoiceData {
  return {
    orderRef: `WB-DBS-${b2bOrder.orderId}`,
    buyer: b2bOrder.organization.name,
    inn: b2bOrder.organization.inn,
    kpp: b2bOrder.organization.kpp ?? '',
    // Individual Entrepreneurs have 12-digit INN and no KPP
    isIndividualEntrepreneur:
      b2bOrder.organization.inn.length === 12 && !b2bOrder.organization.kpp
  };
}
```

## Batch Processing

### Process Orders in Batches

```typescript
const BATCH_SIZE = 1000;

function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

async function batchConfirmOrders(orderIds: number[]): Promise<{
  totalSuccessful: number;
  totalFailed: number;
  errors: Array<{ orderId: number; error: string }>;
}> {
  const batches = chunkArray(orderIds, BATCH_SIZE);

  let totalSuccessful = 0;
  let totalFailed = 0;
  const errors: Array<{ orderId: number; error: string }> = [];

  for (const batch of batches) {
    const result = await sdk.ordersDBS.confirmBulk(batch);

    for (const r of result.results ?? []) {
      if (r.isError) {
        totalFailed++;
        errors.push({
          orderId: r.orderId!,
          error: r.errors?.[0]?.detail ?? 'Unknown error'
        });
      } else {
        totalSuccessful++;
      }
    }

    // Add delay between batches to avoid rate limiting
    if (batches.indexOf(batch) < batches.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  return { totalSuccessful, totalFailed, errors };
}
```

### Fetch All Completed Orders

```typescript
async function fetchAllCompletedOrders(
  dateFrom: Date,
  dateTo: Date
): Promise<any[]> {
  const fromTs = Math.floor(dateFrom.getTime() / 1000);
  const toTs = Math.floor(dateTo.getTime() / 1000);

  // Validate date range (max 30 days)
  const MAX_DAYS = 30 * 24 * 60 * 60;
  if (toTs - fromTs > MAX_DAYS) {
    throw new Error('Date range cannot exceed 30 days');
  }

  const allOrders: any[] = [];
  let next = 0;

  do {
    const result = await sdk.ordersDBS.getOrders({
      limit: 1000,
      next,
      dateFrom: fromTs,
      dateTo: toTs
    });

    allOrders.push(...(result.orders ?? []));
    next = result.next ?? 0;

  } while (next > 0);

  return allOrders;
}
```

## Error Recovery

### Retry Failed Operations

```typescript
interface RetryConfig {
  maxAttempts: number;
  delayMs: number;
  backoffMultiplier: number;
}

async function retryOperation<T>(
  operation: () => Promise<T>,
  config: RetryConfig = { maxAttempts: 3, delayMs: 1000, backoffMultiplier: 2 }
): Promise<T> {
  let lastError: Error | undefined;
  let delay = config.delayMs;

  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error as Error;

      console.warn(`Attempt ${attempt}/${config.maxAttempts} failed:`, error);

      if (attempt < config.maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delay));
        delay *= config.backoffMultiplier;
      }
    }
  }

  throw lastError;
}

// Example usage
async function confirmWithRetry(orderIds: number[]) {
  return retryOperation(
    () => sdk.ordersDBS.confirmBulk(orderIds),
    { maxAttempts: 3, delayMs: 1000, backoffMultiplier: 2 }
  );
}
```

### Handle Partial Failures

```typescript
async function processWithPartialFailureHandling(
  orderIds: number[]
): Promise<{
  processed: number[];
  retryLater: number[];
  permanentFailures: number[];
}> {
  const result = await sdk.ordersDBS.confirmBulk(orderIds);

  const processed: number[] = [];
  const retryLater: number[] = [];
  const permanentFailures: number[] = [];

  for (const r of result.results ?? []) {
    if (!r.isError) {
      processed.push(r.orderId!);
      continue;
    }

    const errorCode = r.errors?.[0]?.code;

    // Classify errors
    if (isTransientError(errorCode)) {
      retryLater.push(r.orderId!);
    } else {
      permanentFailures.push(r.orderId!);
    }
  }

  return { processed, retryLater, permanentFailures };
}

function isTransientError(code?: number): boolean {
  // Define which errors are transient (can be retried)
  const transientCodes = [
    429,  // Rate limit
    500,  // Server error
    503,  // Service unavailable
  ];
  return code ? transientCodes.includes(code) : false;
}
```

## See Also

- [OrdersDbsModule API Reference](/api/classes/OrdersDbsModule)
- [DBS Getting Started Guide](/guides/orders-dbs-getting-started)
- [Migration Guide: Legacy to Bulk](/guides/migration-dbs-legacy-to-bulk)
- [Official WB DBS API](https://dev.wildberries.ru/openapi/orders-dbs)
