[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingStarMetric

# Interface: ItemRatingStarMetric

Defined in: [types/analytics.types.ts:1920](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1920)

Per-star feedback counts with current period, total, and optional dynamics.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Feedback increase for the period. | [types/analytics.types.ts:1922](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1922) |
| <a id="dynamics"></a> `dynamics?` | `number` | Dynamics compared to the previous period (%). Optional. | [types/analytics.types.ts:1924](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1924) |
| <a id="total"></a> `total` | `number` | Total ratings. | [types/analytics.types.ts:1926](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1926) |
