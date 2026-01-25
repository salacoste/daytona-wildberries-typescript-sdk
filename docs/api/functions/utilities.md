[Wildberries API TypeScript SDK](../modules.md) / Utilities

# Utility Functions

The SDK provides utility functions for common supply and tariff calculations. These functions work alongside the `OrdersFbwModule` and `TariffsModule` to help sellers make data-driven decisions.

## Functions

### calculateSupplyCost()

```ts
calculateSupplyCost(
  input: SupplyCostInput,
  getCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<SupplyCostResult>;
```

Calculates the total supply cost including acceptance, storage, and logistics costs based on acceptance coefficient data.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `SupplyCostInput` | Supply cost calculation parameters |
| `getCoefficients` | `() => Promise<ModelsAcceptanceCoefficient[]>` | Function to retrieve acceptance coefficients (typically from SDK) |

#### Returns

`Promise<SupplyCostResult>` - Detailed cost breakdown

#### Throws

- `Error` - When volume is <= 0
- `Error` - When no coefficients are available
- `Error` - When warehouse is not found
- `Error` - When acceptance is unavailable (coefficient = -1)

#### Example

```ts
import { WildberriesSDK, calculateSupplyCost } from 'daytona-wildberries-typescript-sdk';

const sdk = new WildberriesSDK({ apiKey: 'your-api-key' });

const result = await calculateSupplyCost(
  {
    volume: 10,        // 10 liters
    warehouseID: 507,  // Kolomino warehouse
    days: 30,          // 30 days storage
    boxType: 'box'     // Standard box packaging
  },
  () => sdk.ordersFBW.getAcceptanceCoefficients({ warehouseIDs: '507' })
);

console.log(`Total cost: ${result.totalCost} RUB`);
console.log(`Breakdown:`);
console.log(`  - Acceptance: ${result.acceptanceCost} RUB`);
console.log(`  - Storage: ${result.storageCost} RUB`);
console.log(`  - Logistics: ${result.logisticsCost} RUB`);
```

***

### compareTariffs()

```ts
compareTariffs(
  input: CompareTariffsInput,
  getBoxTariffs: () => Promise<ModelsWarehouseBoxRates[]>,
  getAcceptanceCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>
): Promise<TariffComparison>;
```

Compares tariffs between inventory storage (tariffs/box API) and supply acceptance (acceptance/coefficients API) to help sellers decide the most cost-effective fulfillment option.

#### Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `CompareTariffsInput` | Comparison parameters (warehouseName, date) |
| `getBoxTariffs` | `() => Promise<ModelsWarehouseBoxRates[]>` | Function to retrieve box tariffs from Tariffs API |
| `getAcceptanceCoefficients` | `() => Promise<ModelsAcceptanceCoefficient[]>` | Function to retrieve acceptance coefficients from Supplies API |

#### Returns

`Promise<TariffComparison>` - Comprehensive comparison result with recommendation

#### Throws

- `Error` - When warehouse not found in both APIs

#### Example

```ts
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

console.log(`Recommendation: ${comparison.recommendation}`);
// Output: 'SUPPLY_CHEAPER', 'INVENTORY_CHEAPER', or 'EQUAL'

if (comparison.recommendation === 'SUPPLY_CHEAPER') {
  console.log('Use FBW supply for cost savings');
} else if (comparison.recommendation === 'INVENTORY_CHEAPER') {
  console.log('Use inventory storage (FBS) for cost savings');
}
```

***

## Type Definitions

### SupplyCostInput

```ts
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

### SupplyCostResult

```ts
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

### CompareTariffsInput

```ts
interface CompareTariffsInput {
  /** Warehouse name to search for (supports partial matching) */
  warehouseName: string;

  /** Date for the comparison (ISO format: YYYY-MM-DD) */
  date: string;
}
```

### TariffComparison

```ts
interface TariffComparison {
  /** Warehouse name used for comparison */
  warehouseName: string;

  /** Date used for comparison */
  date: string;

  /** Tariff data from inventory storage API (tariffs/box) */
  inventory: TariffData;

  /** Tariff data from supply API (acceptance/coefficients) */
  supply: TariffData;

  /** Percentage differences between the two sources */
  difference: TariffDifference;

  /** Recommendation based on which source has lower overall costs */
  recommendation: TariffRecommendation;
}
```

### TariffData

```ts
interface TariffData {
  /** Base delivery cost per liter */
  deliveryBase: number;

  /** Delivery coefficient (percentage) */
  deliveryCoef: number;

  /** Base storage cost per liter per day */
  storageBase: number;

  /** Storage coefficient (percentage) */
  storageCoef: number;

  /** Whether the warehouse was found in this API */
  found: boolean;
}
```

### TariffDifference

```ts
interface TariffDifference {
  /** Percentage difference in delivery base cost: (supply - inventory) / inventory * 100 */
  deliveryBasePercent: number;

  /** Percentage difference in storage base cost: (supply - inventory) / inventory * 100 */
  storageBasePercent: number;
}
```

### TariffRecommendation

```ts
type TariffRecommendation = 'SUPPLY_CHEAPER' | 'INVENTORY_CHEAPER' | 'EQUAL';
```

***

## Cost Calculation Formulas

The `calculateSupplyCost()` function uses these formulas:

### Storage Cost

**For boxes:**
```
storageCost = (storageBaseLiter + (volume - 1) * storageAdditionalLiter) * (storageCoef / 100) * days
```

**For pallets:**
```
storageCost = storageBaseLiter * (storageCoef / 100) * days
```

### Logistics Cost

**For boxes:**
```
logisticsCost = (deliveryBaseLiter + (volume - 1) * deliveryAdditionalLiter) * (deliveryCoef / 100)
```

**For pallets:**
```
logisticsCost = deliveryBaseLiter * (deliveryCoef / 100)
```

### Acceptance Cost

| Coefficient Value | Result |
|-------------------|--------|
| `0` | Free (0 RUB) |
| `>0` | `coefficient * BASE_RATE` (BASE_RATE = 50 RUB) |

***

## Related Documentation

- [OrdersFbwModule](../classes/OrdersFbwModule.md) - FBW supply management
- [TariffsModule](../classes/TariffsModule.md) - Tariff information
- [Supplies & Tariffs Guide](/guides/supplies-tariffs) - Complete guide with examples
