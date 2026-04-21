[Wildberries API TypeScript SDK](../modules.md) / compareTariffs

# Function: compareTariffs()

```ts
function compareTariffs(
   input: CompareTariffsInput, 
   getBoxTariffs: () => Promise<ModelsWarehouseBoxRates[]>, 
getAcceptanceCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>): Promise<TariffComparison>;
```

Defined in: [utils/compareTariffs.ts:283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/utils/compareTariffs.ts#L283)

Compare tariffs between inventory storage (tariffs/box) and supply (acceptance/coefficients) APIs

This utility fetches and compares tariff data from two different Wildberries APIs:
- tariffs/box (common-api): Inventory storage tariffs
- acceptance/coefficients (supplies-api): Supply acceptance tariffs

The comparison helps sellers decide which fulfillment option is more cost-effective.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`CompareTariffsInput`](../interfaces/CompareTariffsInput.md) | Comparison parameters (warehouseName, date) |
| `getBoxTariffs` | () => `Promise`\<[`ModelsWarehouseBoxRates`](../-internal-/interfaces/ModelsWarehouseBoxRates.md)[]\> | Function to fetch box tariffs from API |
| `getAcceptanceCoefficients` | () => `Promise`\<[`ModelsAcceptanceCoefficient`](../-internal-/interfaces/ModelsAcceptanceCoefficient.md)[]\> | Function to fetch acceptance coefficients from API |

## Returns

`Promise`\<[`TariffComparison`](../interfaces/TariffComparison.md)\>

Comprehensive tariff comparison result

## Throws

Error if warehouse not found in both APIs

## Example

```typescript
const result = await compareTariffs(
  { warehouseName: 'Коледино', date: '2025-01-25' },
  () => sdk.tariffs.getBoxTariffs(),
  () => sdk.ordersFBW.getAcceptanceCoefficients()
);

if (result.recommendation === 'SUPPLY_CHEAPER') {
  console.log('Supply is more cost-effective');
}
```
