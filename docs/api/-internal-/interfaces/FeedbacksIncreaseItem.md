[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FeedbacksIncreaseItem

# Interface: FeedbacksIncreaseItem

Defined in: [types/analytics.types.ts:1938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1938)

Feedback increase summary: total plus per-star breakdown (1-5).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Feedback increase for the period. | [types/analytics.types.ts:1940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1940) |
| <a id="total"></a> `total` | `number` | Total ratings. | [types/analytics.types.ts:1942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1942) |
| <a id="dynamics"></a> `dynamics` | `number` | Dynamics compared to the previous period (%). | [types/analytics.types.ts:1944](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1944) |
| <a id="fivestar"></a> `fiveStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 5 star reviews. | [types/analytics.types.ts:1946](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1946) |
| <a id="fourstar"></a> `fourStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 4 star reviews. | [types/analytics.types.ts:1948](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1948) |
| <a id="threestar"></a> `threeStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 3 star reviews. | [types/analytics.types.ts:1950](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1950) |
| <a id="twostar"></a> `twoStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 2 star reviews. | [types/analytics.types.ts:1952](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1952) |
| <a id="onestar"></a> `oneStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 1 star reviews. | [types/analytics.types.ts:1954](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1954) |
