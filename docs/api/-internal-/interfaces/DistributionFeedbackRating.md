[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionFeedbackRating

# Interface: DistributionFeedbackRating

Defined in: [types/analytics.types.ts:1958](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1958)

Feedback rating value: current rating, optional dynamics, optional percentile.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Current rating. | [types/analytics.types.ts:1960](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1960) |
| <a id="dynamics"></a> `dynamics?` | `number` | Dynamics compared to the previous period (%). Optional. | [types/analytics.types.ts:1962](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1962) |
| <a id="percentile"></a> `percentile?` | `number` \| `null` | How many percent of other sellers' items of this subcategory have a lower feedback rating. Nullable. | [types/analytics.types.ts:1964](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1964) |
