[Wildberries API TypeScript SDK](../modules.md) / ROASResult

# Interface: ROASResult

Defined in: [utils/roas.ts:8](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L8)

Result of [computeROAS](../functions/computeROAS.md).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="roas"></a> `roas` | `number` \| `null` | ROAS = `revenue / spend`, or `null` when `spend === 0` (no ad spend → div-by-zero avoided). | [utils/roas.ts:13](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L13) |
| <a id="revenue"></a> `revenue` | `number` | Σ `sum_price` over the window — attributed order revenue (RUB). | [utils/roas.ts:15](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L15) |
| <a id="spend"></a> `spend` | `number` | Σ `sum` over the window — ad spend (RUB). | [utils/roas.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L17) |
| <a id="daysused"></a> `daysUsed` | `number` | Number of days included in the sums. | [utils/roas.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L19) |
| <a id="excludeddays"></a> `excludedDays` | `number` | Number of freshest days actually dropped (capped to the available day count). | [utils/roas.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/utils/roas.ts#L21) |
