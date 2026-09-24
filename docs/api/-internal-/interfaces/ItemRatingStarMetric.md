[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingStarMetric

# Interface: ItemRatingStarMetric

Defined in: [types/analytics.types.ts:1903](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1903)

Per-star feedback counts with current period, total, and optional dynamics.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Feedback increase for the period. | [types/analytics.types.ts:1905](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1905) |
| <a id="dynamics"></a> `dynamics?` | `number` | Dynamics compared to the previous period (%). Optional. | [types/analytics.types.ts:1907](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1907) |
| <a id="total"></a> `total` | `number` | Total ratings. | [types/analytics.types.ts:1909](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1909) |
