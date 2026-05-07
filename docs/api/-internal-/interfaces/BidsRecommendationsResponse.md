[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BidsRecommendationsResponse

# Interface: BidsRecommendationsResponse

Defined in: [types/promotion.types.ts:1934](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/promotion.types.ts#L1934)

Response from GET /api/advert/v0/bids/recommendations

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | Campaign ID | [types/promotion.types.ts:1936](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/promotion.types.ts#L1936) |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/promotion.types.ts:1938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/promotion.types.ts#L1938) |
| <a id="base"></a> `base?` | [`BaseBidRecommendation`](BaseBidRecommendation.md) | Recommended base bids for the product card | [types/promotion.types.ts:1940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/promotion.types.ts#L1940) |
| <a id="normqueries"></a> `normQueries` | [`NormQueryBidRecommendation`](NormQueryBidRecommendation.md)[] | Recommended bids per search cluster | [types/promotion.types.ts:1942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/promotion.types.ts#L1942) |
