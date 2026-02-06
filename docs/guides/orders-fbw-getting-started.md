---
title: Orders FBW Getting Started Guide
description: Complete guide to using the Orders FBW (Fulfillment by Wildberries) module for supply planning and warehouse management
layout: doc
---

# Orders FBW Getting Started Guide

This guide covers everything you need to know to work with FBW (Fulfillment by Wildberries) supplies in the Wildberries TypeScript SDK.

> **Deprecation Notice**: The `getAcceptanceCoefficients()` method has been moved to the tariffs module at `common-api.wildberries.ru`. The `createSupply()` method is an alias for `listSupplies()` and will be removed in v3.0.0. See the [Deprecated Methods](#deprecated-methods) section for migration details.

## Table of Contents

- [What is FBW?](#what-is-fbw)
- [FBW vs FBS vs DBS](#fbw-vs-fbs-vs-dbs)
- [Quick Start](#quick-start)
- [Available Methods](#available-methods)
- [Common Workflows](#common-workflows)
- [Deprecated Methods](#deprecated-methods)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)
- [Next Steps](#next-steps)

## What is FBW?

**FBW (Fulfillment by Wildberries)** is a fulfillment model where Wildberries handles:

1. **Storage**: Products stored at Wildberries warehouses
2. **Delivery**: Wildberries delivers to pickup points and customers

The seller is responsible for planning and shipping supplies to WB warehouses. This module provides the tools to manage that process: checking acceptance availability, discovering warehouses, creating and monitoring supplies.

### Key FBW Features

| Feature | Description |
|---------|-------------|
| **Acceptance Coefficients** | Daily pricing multipliers that determine supply acceptance cost |
| **Acceptance Options** | Check which warehouses and packaging types are available for your goods |
| **Warehouse Discovery** | List all WB warehouses with addresses, hours, and capabilities |
| **Transit Tariffs** | View tariffs for transit routes between warehouses |
| **Supply Management** | List, filter, and inspect supply details, goods, and packaging |

## FBW vs FBS vs DBS

| Aspect | FBW | FBS | DBS |
|--------|-----|-----|-----|
| Storage | Wildberries warehouse | Seller warehouse | Seller warehouse |
| Delivery | Wildberries | Wildberries (from seller) | Seller directly |
| Customer Address | Pickup point | Pickup point | Full address + GPS |
| Customer Phone | Not available | Not available | Available |
| Delivery Speed | Fastest (1-2 days) | Medium (2-5 days) | Seller-controlled |
| Inventory Control | Limited | Full | Full |
| SDK Module | `sdk.ordersFBW` | `sdk.ordersFBS` | `sdk.ordersDBS` |

**Choose FBW when:**
- You want the fastest delivery to customers
- Your products have high turnover (10+ sales per month)
- You want Wildberries to handle storage and returns
- You can plan and ship supplies on a regular schedule

**Choose FBS when:**
- You need full control over your inventory
- Your products have low turnover or long shelf life
- You want to avoid WB storage fees

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

// List all WB warehouses
const warehouses = await sdk.ordersFBW.warehouses();
console.log(`Found ${warehouses.length} warehouses`);
```

### Environment Setup

Create a `.env` file:

```bash
WB_API_KEY=your_api_key_here
```

## Available Methods

### Supply Planning

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `getAcceptanceCoefficients(options?)` | Get acceptance coefficients for the next 14 days | 6 rpm, 10s interval |
| `createAcceptanceOption(data, options?)` | Check which warehouses and packaging types accept your goods | 6 rpm, 10s interval |
| `warehouses()` | List all WB warehouses | 6 rpm, 10s interval |
| `transitTariffs()` | Get available transit routes and tariffs | 6 rpm, 10s interval |

### Supply Management

| Method | Description | Rate Limit |
|--------|-------------|------------|
| `listSupplies(data, options?)` | List supplies with filters and pagination | 30 rpm, 2s interval |
| `getSupply(ID, options?)` | Get detailed information for a single supply | 30 rpm, 2s interval |
| `getSuppliesGood(ID, options?)` | Get goods (items) within a supply | 30 rpm, 2s interval |
| `getSuppliesPackage(ID)` | Get packaging information for a supply | 30 rpm, 2s interval |

### Deprecated

| Method | Replacement |
|--------|-------------|
| `createSupply(data, options?)` | Use `listSupplies()` -- identical functionality, removed in v3.0.0 |

## Common Workflows

### Supply Planning: Coefficients, Options, and Creation

The typical FBW workflow begins with checking acceptance availability, then verifying warehouse options for your specific goods, and finally creating a supply.

#### Step 1: Check Acceptance Coefficients

Acceptance coefficients determine the cost of having your supply accepted at a WB warehouse. They change daily and are available 14 days ahead.

```typescript
import type { ModelsAcceptanceCoefficient } from 'daytona-wildberries-typescript-sdk';

// Get all coefficients for the next 14 days
const coefficients: ModelsAcceptanceCoefficient[] =
  await sdk.ordersFBW.getAcceptanceCoefficients();

// Filter for a specific warehouse
const coefficientsForWarehouse: ModelsAcceptanceCoefficient[] =
  await sdk.ordersFBW.getAcceptanceCoefficients({ warehouseIDs: '507' });

// Find days with free acceptance (coefficient = 0 AND unloading allowed)
const freeAcceptanceDays = coefficients.filter(c =>
  c.coefficient === 0 &&
  c.allowUnload === true &&
  c.boxTypeName === 'Короба'
);

for (const day of freeAcceptanceDays) {
  console.log(`${day.date}: ${day.warehouseName} (${day.boxTypeName})`);
  console.log(`  Storage coef: ${day.storageCoef}%`);
  console.log(`  Delivery coef: ${day.deliveryCoef}%`);
}
```

**Understanding coefficient values:**

| Coefficient | Meaning | Recommendation |
|-------------|---------|----------------|
| `-1` | Acceptance unavailable | Choose another date or warehouse |
| `0` | Free acceptance | Best option |
| `1` | Standard cost (base rate) | Acceptable |
| `>1` | Multiplied cost | Consider alternatives |

**Important:** Acceptance is available only when both conditions are met: `coefficient` is `0` or positive, AND `allowUnload` is `true`.

#### Step 2: Check Acceptance Options for Your Goods

Before creating a supply, verify which warehouses can accept your specific products and what packaging types are available.

```typescript
import type { ModelsGood, ModelsOptionsResultModel } from 'daytona-wildberries-typescript-sdk';

const goods: ModelsGood[] = [
  { barcode: '1234567891234', quantity: 100 },
  { barcode: '9876543210987', quantity: 50 }
];

// Check which warehouses accept these goods
const options: ModelsOptionsResultModel =
  await sdk.ordersFBW.createAcceptanceOption(goods);

// Or check a specific warehouse
const warehouseOptions: ModelsOptionsResultModel =
  await sdk.ordersFBW.createAcceptanceOption(goods, { warehouseID: '507' });

// Process results per barcode
for (const item of options.result ?? []) {
  if (item.isError) {
    console.error(`Barcode ${item.barcode}: ${item.error?.detail}`);
    continue;
  }

  console.log(`Barcode ${item.barcode}:`);
  for (const wh of item.warehouses ?? []) {
    console.log(`  Warehouse ${wh.warehouseID}:`);
    console.log(`    Boxes: ${wh.canBox ? 'yes' : 'no'}`);
    console.log(`    Monopallets: ${wh.canMonopallet ? 'yes' : 'no'}`);
    console.log(`    Supersafe: ${wh.canSupersafe ? 'yes' : 'no'}`);
  }
}
```

#### Step 3: List Existing Supplies

After planning, list your existing supplies to track their status.

```typescript
import type {
  ModelsSuppliesFiltersRequest,
  ModelsSupply
} from 'daytona-wildberries-typescript-sdk';

// List recent supplies (default: last 1000)
const filters: ModelsSuppliesFiltersRequest = {};
const supplies: ModelsSupply[] = await sdk.ordersFBW.listSupplies(filters);

console.log(`Total supplies: ${supplies.length}`);

for (const supply of supplies) {
  const id = supply.supplyID ?? supply.preorderID;
  console.log(`Supply ${id}: ${supply.statusName} (created ${supply.createDate})`);
}
```

**Filtering by status and date:**

```typescript
const filteredSupplies: ModelsSupply[] = await sdk.ordersFBW.listSupplies(
  {
    statusIDs: [2, 3],  // Planned + Shipment Allowed
    dates: [{
      type: 'supplyDate',
      from: '2025-01-01T00:00:00Z',
      till: '2025-01-31T23:59:59Z'
    }]
  },
  { limit: 100, offset: 0 }
);
```

**Supply status values:**

| Status ID | Name (Russian) | Meaning |
|-----------|----------------|---------|
| `1` | Not planned | Supply created but not scheduled |
| `2` | Planned | Supply scheduled for a date |
| `3` | Shipment allowed | Ready to be shipped to warehouse |
| `4` | Acceptance in progress | Warehouse is receiving goods |
| `5` | Accepted | All goods received and processed |
| `6` | Shipped at gates | Goods arrived at warehouse gates |

### Supply Monitoring: Details, Goods, and Packages

Once a supply exists, you can inspect its full details, check which goods are inside, and review packaging information.

#### Get Supply Details

```typescript
import type { ModelsSupplyDetails } from 'daytona-wildberries-typescript-sdk';

const supplyId = 12345;
const details: ModelsSupplyDetails = await sdk.ordersFBW.getSupply(supplyId);

console.log(`Supply ${supplyId}:`);
console.log(`  Status: ${details.statusName} (ID: ${details.statusID})`);
console.log(`  Warehouse: ${details.warehouseName} (ID: ${details.warehouseID})`);
console.log(`  Created: ${details.createDate}`);
console.log(`  Planned shipment: ${details.supplyDate}`);
console.log(`  Actual shipment: ${details.factDate ?? 'not yet'}`);
console.log(`  Box type: ${details.boxTypeName}`);
console.log(`  Acceptance cost: ${details.acceptanceCost} RUB`);
console.log(`  Acceptance coefficient: ${details.paidAcceptanceCoefficient}`);
console.log(`  Quantities:`);
console.log(`    In supply: ${details.quantity}`);
console.log(`    Accepted: ${details.acceptedQuantity}`);
console.log(`    Ready for sale: ${details.readyForSaleQuantity}`);
console.log(`    Unloading: ${details.unloadingQuantity}`);

// For pre-orders, use isPreorderID flag
const preorderDetails: ModelsSupplyDetails =
  await sdk.ordersFBW.getSupply(67890, { isPreorderID: true });
```

#### Check Supply Goods

```typescript
import type { ModelsGoodInSupply } from 'daytona-wildberries-typescript-sdk';

const goods: ModelsGoodInSupply[] =
  await sdk.ordersFBW.getSuppliesGood(supplyId);

for (const good of goods) {
  console.log(`${good.vendorCode} (${good.barcode}):`);
  console.log(`  WB Article: ${good.nmID}`);
  console.log(`  Quantity in supply: ${good.quantity}`);
  console.log(`  Accepted: ${good.acceptedQuantity}`);
  console.log(`  Ready for sale: ${good.readyForSaleQuantity}`);
  console.log(`  Needs marking code: ${good.needKiz ? 'yes' : 'no'}`);
  if (good.tnved) {
    console.log(`  HS code (TNVED): ${good.tnved}`);
  }
}

// With pagination for large supplies
const goodsPage: ModelsGoodInSupply[] =
  await sdk.ordersFBW.getSuppliesGood(supplyId, { limit: 50, offset: 0 });
```

#### Check Supply Packaging

```typescript
import type { ModelsBox } from 'daytona-wildberries-typescript-sdk';

const packages: ModelsBox[] = await sdk.ordersFBW.getSuppliesPackage(supplyId);

for (const box of packages) {
  console.log(`Package ${box.packageCode}: ${box.quantity} items`);

  for (const item of box.barcodes ?? []) {
    console.log(`  ${item.barcode}: ${item.quantity} pcs`);
  }
}
```

### Warehouse Discovery: Warehouses and Transit Tariffs

#### List All Warehouses

```typescript
import type { ModelsWarehousesResultItems } from 'daytona-wildberries-typescript-sdk';

const warehouses: ModelsWarehousesResultItems[] =
  await sdk.ordersFBW.warehouses();

// Find active warehouses accepting direct supplies
const activeWarehouses = warehouses.filter(wh => wh.isActive);
console.log(`Active warehouses: ${activeWarehouses.length}`);

for (const wh of activeWarehouses) {
  console.log(`${wh.name} (ID: ${wh.ID})`);
  console.log(`  Address: ${wh.address}`);
  console.log(`  Hours: ${wh.workTime}`);
  console.log(`  Accepts QR: ${wh.acceptsQR ? 'yes' : 'no'}`);
  console.log(`  Transit available: ${wh.isTransitActive ? 'yes' : 'no'}`);
}
```

#### Check Transit Tariffs

Transit tariffs apply when goods are shipped through an intermediate warehouse before reaching the destination.

```typescript
import type { ModelsTransitTariff } from 'daytona-wildberries-typescript-sdk';

const tariffs: ModelsTransitTariff[] = await sdk.ordersFBW.transitTariffs();

for (const tariff of tariffs) {
  console.log(`${tariff.transitWarehouseName} -> ${tariff.destinationWarehouseName}`);
  console.log(`  Available from: ${tariff.activeFrom}`);
  console.log(`  Pallet tariff: ${tariff.palletTariff} RUB`);

  if (tariff.boxTariff) {
    console.log(`  Box tariffs by volume:`);
    for (const tier of tariff.boxTariff) {
      console.log(`    ${tier.from}-${tier.to} liters: ${tier.value} RUB/liter`);
    }
  } else {
    console.log(`  Box transit: not available`);
  }
}
```

## Deprecated Methods

### getAcceptanceCoefficients -- Moved to Tariffs Module

The `getAcceptanceCoefficients()` method has been moved to `common-api.wildberries.ru` and now belongs in the tariffs module. The method still works in this module but will log a deprecation warning on first use.

```typescript
// Deprecated -- logs a warning
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Recommended -- use the tariffs module instead (when available)
// const coefficients = await sdk.tariffs.getAcceptanceCoefficients();
```

### createSupply -- Renamed to listSupplies

The `createSupply()` method was misleadingly named. It actually lists/filters supplies rather than creating new ones. It has been renamed to `listSupplies()` and `createSupply()` is now an alias that will be removed in v3.0.0.

```typescript
// Deprecated -- will be removed in v3.0.0
const supplies = await sdk.ordersFBW.createSupply({});

// Recommended
const supplies = await sdk.ordersFBW.listSupplies({});
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

async function checkAcceptanceOptions() {
  try {
    const options = await sdk.ordersFBW.createAcceptanceOption([
      { barcode: '1234567891234', quantity: 100 }
    ]);
    // Process options...
  } catch (error) {
    if (error instanceof AuthenticationError) {
      // 401/403: Invalid or expired API key
      console.error('Invalid API key -- check your WB_API_KEY');
    } else if (error instanceof RateLimitError) {
      // 429: Rate limit exceeded
      console.error(`Rate limit exceeded. Retry after: ${error.retryAfter}ms`);
      // The SDK handles retry automatically, but you can add logging
    } else if (error instanceof ValidationError) {
      // 400/422: Invalid request parameters
      console.error('Validation error:', error.message);
      // Common causes: invalid barcode format, quantity > 999999
    } else if (error instanceof NetworkError) {
      // Network timeout or connectivity issue
      console.error('Network error:', error.message);
    } else if (error instanceof WBAPIError) {
      console.error(`API error ${error.statusCode}: ${error.message}`);
    }
  }
}
```

### Handling Per-Item Errors in Acceptance Options

The `createAcceptanceOption()` response can contain per-barcode errors. Always check each item in the result.

```typescript
const options = await sdk.ordersFBW.createAcceptanceOption([
  { barcode: '1234567891234', quantity: 100 },
  { barcode: 'INVALID_BARCODE', quantity: 50 }
]);

for (const item of options.result ?? []) {
  if (item.isError) {
    console.error(`Barcode ${item.barcode} failed: ${item.error?.detail}`);
    continue;
  }

  // Process successful results
  const availableWarehouses = item.warehouses?.filter(wh => wh.canBox) ?? [];
  console.log(`Barcode ${item.barcode}: ${availableWarehouses.length} warehouses available`);
}
```

### Common Error Scenarios

| HTTP Status | Error Class | Common Cause | Resolution |
|-------------|-------------|--------------|------------|
| 401 | `AuthenticationError` | Invalid API key | Verify `WB_API_KEY` is correct and active |
| 400 | `ValidationError` | Invalid barcode or quantity | Check barcode format; quantity max is 999,999 |
| 429 | `RateLimitError` | Too many requests | SDK auto-retries; reduce request frequency |
| 500+ | `WBAPIError` | Server-side issue | Retry after a brief delay |

## Rate Limits

The FBW API uses a **2-tier rate limit system**. The SDK enforces these limits automatically.

### Rate Limit Tiers

| Tier | Name | Requests/Min | Interval | Burst | Applies To |
|------|------|-------------|----------|-------|------------|
| **T1** | Planning | 6 | 10s | 6 | `getAcceptanceCoefficients`, `createAcceptanceOption`, `warehouses` |
| **T1b** | Transit | 6 | 10s | 10 | `transitTariffs` |
| **T2** | Supply Operations | 30 | 2s | 10 | `listSupplies`, `getSupply`, `getSuppliesGood`, `getSuppliesPackage` |

### Rate Limit Tips

- **T1 (Planning)** is the most restrictive at 6 requests per minute with 10-second intervals. Cache coefficient and warehouse results for 10-15 minutes to avoid hitting this limit.
- **T2 (Supply Operations)** is more generous at 30 requests per minute. You can iterate over multiple supplies without significant throttling.
- The SDK handles rate limiting automatically. If a limit is hit, the request is queued and retried after the required interval.

```typescript
// Efficient: cache coefficients and reuse
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Process all coefficients locally without additional API calls
const freeSlots = coefficients.filter(c => c.coefficient === 0 && c.allowUnload);
const cheapSlots = coefficients.filter(c => c.coefficient === 1 && c.allowUnload);

// Avoid: calling getAcceptanceCoefficients() in a loop
// for (const warehouseId of warehouseIds) {
//   await sdk.ordersFBW.getAcceptanceCoefficients({ warehouseIDs: String(warehouseId) });
// }
```

## Next Steps

- [API Reference: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [Supply Planning Guide (RU)](/guides/supplies-planning) -- Detailed guide on supply cost calculation and FBW vs FBS comparison
- [Tariffs Overview](/guides/tariffs-overview) -- Understanding WB tariff types
- [Orders FBS Module](/modules/orders-fbs)
- [Orders DBS Getting Started](/guides/orders-dbs-getting-started)
- [Official WB FBW API](https://dev.wildberries.ru/openapi/orders-fbw)
