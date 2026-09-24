[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingResponse

# Interface: ItemRatingResponse

Defined in: [types/analytics.types.ts:2006](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2006)

Response body for POST /api/analytics/v1/item-rating (the `data` payload).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sellerrating"></a> `sellerRating` | [`TableItemFloat`](TableItemFloat.md) | Seller rating. | [types/analytics.types.ts:2008](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2008) |
| <a id="feedbackincrease"></a> `feedbackIncrease` | [`FeedbacksIncreaseItem`](FeedbacksIncreaseItem.md) | Feedback increase summary. | [types/analytics.types.ts:2010](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2010) |
| <a id="cards"></a> `cards` | [`DistributionTableItem`](DistributionTableItem.md)[] | Per-item data. | [types/analytics.types.ts:2012](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2012) |
