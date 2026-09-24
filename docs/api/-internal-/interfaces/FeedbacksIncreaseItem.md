[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FeedbacksIncreaseItem

# Interface: FeedbacksIncreaseItem

Defined in: [types/analytics.types.ts:1921](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1921)

Feedback increase summary: total plus per-star breakdown (1-5).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="current"></a> `current` | `number` | Feedback increase for the period. | [types/analytics.types.ts:1923](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1923) |
| <a id="total"></a> `total` | `number` | Total ratings. | [types/analytics.types.ts:1925](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1925) |
| <a id="dynamics"></a> `dynamics` | `number` | Dynamics compared to the previous period (%). | [types/analytics.types.ts:1927](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1927) |
| <a id="fivestar"></a> `fiveStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 5 star reviews. | [types/analytics.types.ts:1929](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1929) |
| <a id="fourstar"></a> `fourStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 4 star reviews. | [types/analytics.types.ts:1931](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1931) |
| <a id="threestar"></a> `threeStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 3 star reviews. | [types/analytics.types.ts:1933](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1933) |
| <a id="twostar"></a> `twoStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 2 star reviews. | [types/analytics.types.ts:1935](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1935) |
| <a id="onestar"></a> `oneStar` | [`ItemRatingStarMetric`](ItemRatingStarMetric.md) | 1 star reviews. | [types/analytics.types.ts:1937](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1937) |
