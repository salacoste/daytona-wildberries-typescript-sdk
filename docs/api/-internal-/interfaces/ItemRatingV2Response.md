[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingV2Response

# Interface: ItemRatingV2Response

Defined in: [types/analytics.types.ts:2105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2105)

Response payload for POST /api/analytics/v2/item-rating.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sellerrating"></a> `sellerRating` | [`TableItemFloat`](TableItemFloat.md) | Seller rating. | [types/analytics.types.ts:2107](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2107) |
| <a id="feedbackincrease"></a> `feedbackIncrease` | [`FeedbacksIncreaseItem`](FeedbacksIncreaseItem.md) | Feedback increase summary. | [types/analytics.types.ts:2109](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2109) |
| <a id="items"></a> `items` | [`DistributionTableItemV2`](DistributionTableItemV2.md)[] | Per-product data. | [types/analytics.types.ts:2111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2111) |
