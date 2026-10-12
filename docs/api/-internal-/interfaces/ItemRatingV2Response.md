[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingV2Response

# Interface: ItemRatingV2Response

Defined in: [types/analytics.types.ts:2122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2122)

Response payload for POST /api/analytics/v2/item-rating.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sellerrating"></a> `sellerRating` | [`TableItemFloat`](TableItemFloat.md) | Seller rating. | [types/analytics.types.ts:2124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2124) |
| <a id="feedbackincrease"></a> `feedbackIncrease` | [`FeedbacksIncreaseItem`](FeedbacksIncreaseItem.md) | Feedback increase summary. | [types/analytics.types.ts:2126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2126) |
| <a id="items"></a> `items` | [`DistributionTableItemV2`](DistributionTableItemV2.md)[] | Per-product data. | [types/analytics.types.ts:2128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2128) |
