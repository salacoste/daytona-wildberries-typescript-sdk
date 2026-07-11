[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionFeedbackRating

# Interface: DistributionFeedbackRating

Defined in: [types/analytics.types.ts:1897](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1897)

Feedback rating value: current rating, optional dynamics, optional percentile.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Current rating. | [types/analytics.types.ts:1899](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1899) |
| <a id="dynamics"></a> `dynamics?` | `number` | Dynamics compared to the previous period (%). Optional. | [types/analytics.types.ts:1901](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1901) |
| <a id="percentile"></a> `percentile?` | `number` \| `null` | How many percent of other sellers' items of this subcategory have a lower feedback rating. Nullable. | [types/analytics.types.ts:1903](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1903) |
