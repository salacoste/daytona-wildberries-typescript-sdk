[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BidsRecommendationsResponse

# Interface: BidsRecommendationsResponse

Defined in: [types/promotion.types.ts:2170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2170)

Response from GET /api/advert/v0/bids/recommendations

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | Campaign ID | [types/promotion.types.ts:2172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2172) |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/promotion.types.ts:2174](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2174) |
| <a id="base"></a> `base?` | [`BaseBidRecommendation`](BaseBidRecommendation.md) | Recommended base bids for the product card | [types/promotion.types.ts:2176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2176) |
| <a id="normqueries"></a> `normQueries` | [`NormQueryBidRecommendation`](NormQueryBidRecommendation.md)[] | Recommended bids per search cluster | [types/promotion.types.ts:2178](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2178) |
