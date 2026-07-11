[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingResponse

# Interface: ItemRatingResponse

Defined in: [types/analytics.types.ts:1962](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1962)

Response body for POST /api/analytics/v1/item-rating (the `data` payload).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sellerrating"></a> `sellerRating` | [`TableItemFloat`](TableItemFloat.md) | Seller rating. | [types/analytics.types.ts:1964](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1964) |
| <a id="feedbackincrease"></a> `feedbackIncrease` | [`FeedbacksIncreaseItem`](FeedbacksIncreaseItem.md) | Feedback increase summary. | [types/analytics.types.ts:1966](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1966) |
| <a id="cards"></a> `cards` | [`DistributionTableItem`](DistributionTableItem.md)[] | Per-item data. | [types/analytics.types.ts:1968](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1968) |
