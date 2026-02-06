[Wildberries API TypeScript SDK](../modules.md) / SupplyCostResult

# Interface: SupplyCostResult

Defined in: [utils/calculateSupplyCost.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L35)

Result of supply cost calculation

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="acceptancecost"></a> `acceptanceCost` | `number` | Acceptance cost in rubles | [utils/calculateSupplyCost.ts:37](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L37) |
| <a id="storagecost"></a> `storageCost` | `number` | Storage cost in rubles | [utils/calculateSupplyCost.ts:39](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L39) |
| <a id="logisticscost"></a> `logisticsCost` | `number` | Logistics/delivery cost in rubles | [utils/calculateSupplyCost.ts:41](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L41) |
| <a id="totalcost"></a> `totalCost` | `number` | Total cost (acceptance + storage + logistics) | [utils/calculateSupplyCost.ts:43](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L43) |
| <a id="warehousename"></a> `warehouseName` | `string` | Warehouse name | [utils/calculateSupplyCost.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L45) |
| <a id="appliedcoefficients"></a> `appliedCoefficients` | \{ `acceptance`: `number`; `storage`: `number`; `delivery`: `number`; \} | Applied coefficients for transparency | [utils/calculateSupplyCost.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L47) |
| `appliedCoefficients.acceptance` | `number` | - | [utils/calculateSupplyCost.ts:48](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L48) |
| `appliedCoefficients.storage` | `number` | - | [utils/calculateSupplyCost.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L49) |
| `appliedCoefficients.delivery` | `number` | - | [utils/calculateSupplyCost.ts:50](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/utils/calculateSupplyCost.ts#L50) |
