[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FeedbacksIncreaseItem

# Interface: FeedbacksIncreaseItem

Defined in: [types/analytics.types.ts:1877](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1877)

Feedback increase summary: total plus per-star breakdown (1-5).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Feedback increase for the period. | [types/analytics.types.ts:1879](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1879) |
| <a id="total"></a> `total` | `number` | Total ratings. | [types/analytics.types.ts:1881](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1881) |
| <a id="dynamics"></a> `dynamics` | `number` | Dynamics compared to the previous period (%). | [types/analytics.types.ts:1883](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1883) |
| <a id="fivestar"></a> `fiveStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 5 star reviews. | [types/analytics.types.ts:1885](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1885) |
| <a id="fourstar"></a> `fourStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 4 star reviews. | [types/analytics.types.ts:1887](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1887) |
| <a id="threestar"></a> `threeStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 3 star reviews. | [types/analytics.types.ts:1889](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1889) |
| <a id="twostar"></a> `twoStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 2 star reviews. | [types/analytics.types.ts:1891](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1891) |
| <a id="onestar"></a> `oneStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 1 star reviews. | [types/analytics.types.ts:1893](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1893) |
