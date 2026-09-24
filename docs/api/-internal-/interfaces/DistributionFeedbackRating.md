[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionFeedbackRating

# Interface: DistributionFeedbackRating

Defined in: [types/analytics.types.ts:1941](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1941)

Feedback rating value: current rating, optional dynamics, optional percentile.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Current rating. | [types/analytics.types.ts:1943](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1943) |
| <a id="dynamics"></a> `dynamics?` | `number` | Dynamics compared to the previous period (%). Optional. | [types/analytics.types.ts:1945](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1945) |
| <a id="percentile"></a> `percentile?` | `number` \| `null` | How many percent of other sellers' items of this subcategory have a lower feedback rating. Nullable. | [types/analytics.types.ts:1947](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1947) |
