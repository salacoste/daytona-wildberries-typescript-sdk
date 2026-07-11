[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingStarMetric

# Interface: ItemRatingStarMetric

Defined in: [types/analytics.types.ts:1859](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1859)

Per-star feedback counts with current period, total, and optional dynamics.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Feedback increase for the period. | [types/analytics.types.ts:1861](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1861) |
| <a id="dynamics"></a> `dynamics?` | `number` | Dynamics compared to the previous period (%). Optional. | [types/analytics.types.ts:1863](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1863) |
| <a id="total"></a> `total` | `number` | Total ratings. | [types/analytics.types.ts:1865](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1865) |
