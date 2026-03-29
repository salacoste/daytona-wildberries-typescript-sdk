[Wildberries API TypeScript SDK](../modules.md) / calculateSupplyCost

# Function: calculateSupplyCost()

```ts
function calculateSupplyCost(input: SupplyCostInput, getCoefficients: () => Promise<ModelsAcceptanceCoefficient[]>): Promise<SupplyCostResult>;
```

Defined in: [utils/calculateSupplyCost.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/utils/calculateSupplyCost.ts#L221)

Calculates the total supply cost including acceptance, storage, and logistics

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | [`SupplyCostInput`](../interfaces/SupplyCostInput.md) | Supply cost input parameters |
| `getCoefficients` | () => `Promise`\<[`ModelsAcceptanceCoefficient`](../-internal-/interfaces/ModelsAcceptanceCoefficient.md)[]\> | Function to retrieve acceptance coefficients from API |

## Returns

`Promise`\<[`SupplyCostResult`](../interfaces/SupplyCostResult.md)\>

Promise resolving to detailed cost breakdown

## Throws

Error when volume is <= 0

## Throws

Error when no coefficients are available

## Throws

Error when warehouse is not found

## Throws

Error when acceptance is unavailable (coefficient = -1)

## Example

```typescript
const result = await calculateSupplyCost(
  { volume: 5, warehouseID: 507, days: 30 },
  () => sdk.ordersFBW.getAcceptanceCoefficients()
);

console.log(result.totalCost); // Total cost in rubles
console.log(result.storageCost); // Storage cost breakdown
```
