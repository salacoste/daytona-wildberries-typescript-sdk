[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingResponse

# Interface: ItemRatingResponse

Defined in: [types/analytics.types.ts:2023](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2023)

Response body for POST /api/analytics/v1/item-rating (the `data` payload).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sellerrating"></a> `sellerRating` | [`TableItemFloat`](TableItemFloat.md) | Seller rating. | [types/analytics.types.ts:2025](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2025) |
| <a id="feedbackincrease"></a> `feedbackIncrease` | [`FeedbacksIncreaseItem`](FeedbacksIncreaseItem.md) | Feedback increase summary. | [types/analytics.types.ts:2027](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2027) |
| <a id="cards"></a> `cards` | [`DistributionTableItem`](DistributionTableItem.md)[] | Per-item data. | [types/analytics.types.ts:2029](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2029) |
