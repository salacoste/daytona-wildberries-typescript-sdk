---
title: Supplies & Tariffs Guide
description: Managing supply acceptance coefficients, calculating supply costs, and comparing inventory vs supply tariffs
layout: doc
---

# Supplies & Tariffs Guide

Complete guide to managing Wildberries supply acceptance coefficients, calculating supply costs, and comparing tariffs between inventory storage and supply fulfillment options.

## Table of Contents

- [Overview](#overview)
- [Acceptance Coefficients](#acceptance-coefficients)
- [Acceptance Options](#acceptance-options)
- [Supply Cost Calculator](#supply-cost-calculator)
- [Tariff Comparison](#tariff-comparison)
- [Rate Limits](#rate-limits)
- [Best Practices](#best-practices)

## Overview

The Supplies module (part of `OrdersFbwModule`) provides access to supply-related tariff data through the Wildberries Supplies API. This includes:

- **Acceptance Coefficients**: Daily coefficients affecting supply acceptance costs for the next 14 days
- **Acceptance Options**: Available warehouses and packaging types for specific products
- **Utility Functions**: Calculate supply costs and compare tariffs across different fulfillment options

### When to Use This Module

| Use Case | Method/Utility |
|----------|---------------|
| Plan optimal supply timing | `getAcceptanceCoefficients()` |
| Find available warehouses for products | `createAcceptanceOption()` |
| Estimate supply costs | `calculateSupplyCost()` |
| Choose between inventory vs supply | `compareTariffs()` |

## Acceptance Coefficients

### Method: `getAcceptanceCoefficients()`

Returns acceptance coefficients for all warehouses for the next 14 days. These coefficients directly affect your supply acceptance costs.

#### Signature

```typescript
async getAcceptanceCoefficients(options?: {
  warehouseIDs?: string;
}): Promise<ModelsAcceptanceCoefficient[]>
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `warehouseIDs` | `string` | Optional. Comma-separated list of warehouse IDs to filter results |

#### Response Type: `ModelsAcceptanceCoefficient`

```typescript
interface ModelsAcceptanceCoefficient {
  /** Date when coefficient is active (YYYY-MM-DD) */
  date?: string;

  /** Acceptance coefficient:
   * -1: acceptance unavailable
   *  0: free acceptance
   * >0: cost multiplier */
  coefficient?: number;

  /** Warehouse ID */
  warehouseID?: number;

  /** Warehouse name */
  warehouseName?: string;

  /** Whether unloading is allowed */
  allowUnload?: boolean;

  /** Box type name: "Короба", "Монопаллеты", "Суперсейф", "QR-поставка с коробами" */
  boxTypeName?: string;

  /** Box type ID: 2=Boxes, 5=Monopallets, 6=Supersafe */
  boxTypeID?: number;

  /** Storage coefficient (percentage) */
  storageCoef?: string;

  /** Delivery coefficient (percentage) */
  deliveryCoef?: string;

  /** Base delivery cost per first liter */
  deliveryBaseLiter?: string;

  /** Delivery cost per additional liter */
  deliveryAdditionalLiter?: string;

  /** Base storage cost per first liter (or per pallet for pallets) */
  storageBaseLiter?: string;

  /** Storage cost per additional liter */
  storageAdditionalLiter?: string;

  /** Whether this is a sorting center */
  isSortingCenter?: boolean;
}
```

#### Example: Get All Coefficients

```typescript
import { WildberriesSDK } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Get coefficients for all warehouses
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

console.log(`Found ${coefficients.length} coefficient entries`);

// Group by warehouse for analysis
const byWarehouse = new Map<number, typeof coefficients>();
for (const coef of coefficients) {
  if (!coef.warehouseID) continue;
  const existing = byWarehouse.get(coef.warehouseID) || [];
  existing.push(coef);
  byWarehouse.set(coef.warehouseID, existing);
}

// Find warehouses with free acceptance (coefficient = 0)
const freeAcceptance = coefficients.filter(c =>
  c.coefficient === 0 && c.allowUnload === true
);

console.log('Warehouses with free acceptance:',
  [...new Set(freeAcceptance.map(c => c.warehouseName))]
);
```

#### Example: Filter by Specific Warehouses

```typescript
// Get coefficients only for Kolomino (507) and Elektrostal (130744)
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients({
  warehouseIDs: '507,130744'
});

// Find best day to supply to Kolomino
const kolominoCoefs = coefficients
  .filter(c => c.warehouseID === 507 && c.boxTypeName === 'Короба')
  .sort((a, b) => (a.coefficient ?? 999) - (b.coefficient ?? 999));

if (kolominoCoefs.length > 0) {
  const best = kolominoCoefs[0];
  console.log(`Best day for Kolomino: ${best.date}, coefficient: ${best.coefficient}`);
}
```

#### Understanding Coefficient Values

| Coefficient | Meaning | Action |
|-------------|---------|--------|
| `-1` | Acceptance unavailable | Cannot supply on this date |
| `0` | Free acceptance | Optimal time to supply |
| `1` | Base rate | Standard pricing |
| `>1` | Multiplied rate | Higher cost, consider waiting |

::: tip Acceptance Availability
A supply can only be accepted when **both** conditions are met:
- `coefficient` is `0` or `1`
- `allowUnload` is `true`
:::

## Acceptance Options

### Method: `createAcceptanceOption()`

Returns available warehouses and packaging types for a specific set of products based on their barcodes and quantities.

#### Signature

```typescript
async createAcceptanceOption(
  data: ModelsGood[],
  options?: { warehouseID?: string }
): Promise<ModelsOptionsResultModel>
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `data` | `ModelsGood[]` | Array of products with barcodes and quantities |
| `warehouseID` | `string` | Optional. Filter results to specific warehouse |

#### Input Type: `ModelsGood`

```typescript
interface ModelsGood {
  /** Product barcode */
  barcode: string;

  /** Quantity of items */
  quantity: number;
}
```

#### Example: Get Acceptance Options for Products

```typescript
// Define products to supply
const products = [
  { barcode: '4680075251234', quantity: 100 },
  { barcode: '4680075255678', quantity: 50 }
];

// Get available options
const options = await sdk.ordersFBW.createAcceptanceOption(products);

console.log('Available warehouses:', options.warehouses);
console.log('Available box types:', options.boxTypes);

// Filter for specific warehouse
const kolominoOptions = await sdk.ordersFBW.createAcceptanceOption(products, {
  warehouseID: '507'
});
```

## Supply Cost Calculator

### Utility: `calculateSupplyCost()`

Calculates the estimated total supply cost including acceptance, storage, and logistics costs.

#### Signature

```typescript
async function calculateSupplyCost(
  input: SupplyCostInput,
  getCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<SupplyCostResult>
```

#### Input Type: `SupplyCostInput`

```typescript
interface SupplyCostInput {
  /** Volume of goods in liters */
  volume: number;

  /** Warehouse ID */
  warehouseID: number;

  /** Number of storage days */
  days: number;

  /** Box type: 'box' | 'pallet' | 'supersafe' */
  boxType?: 'box' | 'pallet' | 'supersafe';
}
```

#### Output Type: `SupplyCostResult`

```typescript
interface SupplyCostResult {
  /** Acceptance cost in rubles */
  acceptanceCost: number;

  /** Storage cost in rubles */
  storageCost: number;

  /** Logistics/delivery cost in rubles */
  logisticsCost: number;

  /** Total cost (acceptance + storage + logistics) */
  totalCost: number;

  /** Warehouse name */
  warehouseName: string;

  /** Applied coefficients for transparency */
  appliedCoefficients: {
    acceptance: number;
    storage: number;
    delivery: number;
  };
}
```

#### Example: Calculate Supply Cost

```typescript
import { WildberriesSDK, calculateSupplyCost } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

// Calculate cost for 10 liters, 30 days storage at Kolomino
const result = await calculateSupplyCost(
  {
    volume: 10,
    warehouseID: 507,
    days: 30,
    boxType: 'box'
  },
  () => sdk.ordersFBW.getAcceptanceCoefficients({ warehouseIDs: '507' })
);

console.log('Cost breakdown:');
console.log(`  Acceptance: ${result.acceptanceCost} RUB`);
console.log(`  Storage: ${result.storageCost} RUB`);
console.log(`  Logistics: ${result.logisticsCost} RUB`);
console.log(`  Total: ${result.totalCost} RUB`);
console.log(`  Warehouse: ${result.warehouseName}`);
console.log('Applied coefficients:', result.appliedCoefficients);
```

#### Cost Calculation Formulas

**Storage Cost:**
```
For boxes: (storageBaseLiter + (volume-1) * storageAdditionalLiter) * storageCoef/100 * days
For pallets: storageBaseLiter * storageCoef/100 * days (flat rate)
```

**Logistics Cost:**
```
For boxes: (deliveryBaseLiter + (volume-1) * deliveryAdditionalLiter) * deliveryCoef/100
For pallets: deliveryBaseLiter * deliveryCoef/100 (flat rate)
```

**Acceptance Cost:**
```
coefficient = 0: Free (0 RUB)
coefficient > 0: coefficient * BASE_RATE (50 RUB)
```

## Tariff Comparison

### Utility: `compareTariffs()`

Compares tariffs between inventory storage (from Tariffs API) and supply acceptance (from Supplies API) to help decide the most cost-effective fulfillment option.

#### Signature

```typescript
async function compareTariffs(
  input: CompareTariffsInput,
  getBoxTariffs: () => Promise<ModelsWarehouseBoxRates[]>,  // Adapter for sdk.tariffs.getTariffsBox()
  getAcceptanceCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<TariffComparison>
```

#### Input Type: `CompareTariffsInput`

```typescript
interface CompareTariffsInput {
  /** Warehouse name to search for (supports partial matching) */
  warehouseName: string;

  /** Date for the comparison (ISO format: YYYY-MM-DD) */
  date: string;
}
```

#### Output Type: `TariffComparison`

```typescript
interface TariffComparison {
  /** Warehouse name used for comparison */
  warehouseName: string;

  /** Date used for comparison */
  date: string;

  /** Tariff data from inventory storage API */
  inventory: TariffData;

  /** Tariff data from supply API */
  supply: TariffData;

  /** Percentage differences between the two sources */
  difference: TariffDifference;

  /** Recommendation: 'SUPPLY_CHEAPER' | 'INVENTORY_CHEAPER' | 'EQUAL' */
  recommendation: TariffRecommendation;
}

interface TariffData {
  deliveryBase: number;
  deliveryCoef: number;
  storageBase: number;
  storageCoef: number;
  found: boolean;
}

interface TariffDifference {
  /** (supply - inventory) / inventory * 100 */
  deliveryBasePercent: number;
  storageBasePercent: number;
}
```

#### Example: Compare Tariffs

```typescript
import { WildberriesSDK, compareTariffs } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

const comparison = await compareTariffs(
  {
    warehouseName: 'Коледино',
    date: '2025-01-25'
  },
  async () => {
    const response = await sdk.tariffs.getTariffsBox({ date: '2025-01-25' });
    return response.response?.data?.warehouseList ?? [];
  },
  () => sdk.ordersFBW.getAcceptanceCoefficients()
);

console.log('Tariff Comparison for', comparison.warehouseName);
console.log('');
console.log('Inventory Storage Tariffs:');
console.log(`  Delivery base: ${comparison.inventory.deliveryBase} RUB/L`);
console.log(`  Storage base: ${comparison.inventory.storageBase} RUB/L/day`);
console.log('');
console.log('Supply Tariffs:');
console.log(`  Delivery base: ${comparison.supply.deliveryBase} RUB/L`);
console.log(`  Storage base: ${comparison.supply.storageBase} RUB/L/day`);
console.log('');
console.log('Differences:');
console.log(`  Delivery: ${comparison.difference.deliveryBasePercent.toFixed(1)}%`);
console.log(`  Storage: ${comparison.difference.storageBasePercent.toFixed(1)}%`);
console.log('');
console.log(`Recommendation: ${comparison.recommendation}`);

// Make decision based on recommendation
if (comparison.recommendation === 'SUPPLY_CHEAPER') {
  console.log('Use FBW supply for this warehouse');
} else if (comparison.recommendation === 'INVENTORY_CHEAPER') {
  console.log('Use inventory storage (FBS) for this warehouse');
} else {
  console.log('Costs are approximately equal');
}
```

## Rate Limits

All supply-related methods share the same rate limits:

| Period | Limit | Interval | Burst |
|--------|-------|----------|-------|
| 1 minute | 6 requests | 10 seconds | 6 requests |

::: warning Rate Limit Enforcement
The SDK automatically enforces rate limits. If you exceed the limit, requests will be queued and delayed accordingly. For high-volume operations, consider caching coefficient data.
:::

### Optimizing API Calls

```typescript
// GOOD: Cache coefficients and reuse
const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

// Calculate costs for multiple warehouses using cached data
const warehouseIDs = [507, 130744, 211622];
const costs = await Promise.all(
  warehouseIDs.map(warehouseID =>
    calculateSupplyCost(
      { volume: 10, warehouseID, days: 30 },
      () => Promise.resolve(coefficients) // Use cached data
    )
  )
);

// BAD: Making separate API calls for each calculation
// This would hit rate limits quickly
```

## Best Practices

### 1. Plan Supplies During Low-Cost Periods

```typescript
async function findOptimalSupplyDates(
  warehouseID: number,
  boxType: string = 'Короба'
) {
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients({
    warehouseIDs: String(warehouseID)
  });

  // Filter for specific box type and available dates
  const available = coefficients
    .filter(c =>
      c.boxTypeName === boxType &&
      c.allowUnload === true &&
      (c.coefficient === 0 || c.coefficient === 1)
    )
    .sort((a, b) => (a.coefficient ?? 999) - (b.coefficient ?? 999));

  return available.map(c => ({
    date: c.date,
    coefficient: c.coefficient,
    isFree: c.coefficient === 0
  }));
}

const optimalDates = await findOptimalSupplyDates(507);
console.log('Best supply dates:', optimalDates.slice(0, 5));
```

### 2. Compare Multiple Warehouses

```typescript
async function compareWarehouses(volume: number, days: number) {
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients();

  // Get unique warehouses
  const warehouseIDs = [...new Set(
    coefficients.map(c => c.warehouseID).filter(Boolean)
  )] as number[];

  const results = await Promise.all(
    warehouseIDs.slice(0, 10).map(async warehouseID => {
      try {
        const cost = await calculateSupplyCost(
          { volume, warehouseID, days },
          () => Promise.resolve(coefficients)
        );
        return { warehouseID, ...cost };
      } catch {
        return null;
      }
    })
  );

  return results
    .filter(Boolean)
    .sort((a, b) => a!.totalCost - b!.totalCost);
}

const comparison = await compareWarehouses(10, 30);
console.log('Most cost-effective warehouses:');
comparison.slice(0, 5).forEach((c, i) => {
  console.log(`${i + 1}. ${c!.warehouseName}: ${c!.totalCost} RUB`);
});
```

### 3. Monitor Coefficient Changes

```typescript
async function alertOnCoefficientChanges(warehouseID: number) {
  const coefficients = await sdk.ordersFBW.getAcceptanceCoefficients({
    warehouseIDs: String(warehouseID)
  });

  const today = new Date().toISOString().split('T')[0];
  const todayCoef = coefficients.find(c =>
    c.date === today && c.boxTypeName === 'Короба'
  );

  if (todayCoef?.coefficient === 0) {
    console.log('FREE ACCEPTANCE TODAY! Consider supplying now.');
  } else if ((todayCoef?.coefficient ?? 0) > 1) {
    console.log(`High coefficient (${todayCoef?.coefficient}x) - consider waiting`);
  }

  return todayCoef;
}
```

## Related Documentation

- [API Reference: OrdersFbwModule](/api/classes/OrdersFbwModule)
- [Tariffs Overview](/guides/tariffs-overview)
- [Stock Management](/guides/stock-management)
- [Storage Fees Integration](/guides/storage-fees-integration)

## Support

For questions or issues:
- [GitHub Issues](https://github.com/salacoste/daytona-wildberries-typescript-sdk/issues)
- [API Reference](/api/)
