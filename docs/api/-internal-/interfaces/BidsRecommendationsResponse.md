[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BidsRecommendationsResponse

# Interface: BidsRecommendationsResponse

Defined in: [types/promotion.types.ts:1934](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/promotion.types.ts#L1934)

Response from GET /api/advert/v0/bids/recommendations

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | Campaign ID | [types/promotion.types.ts:1936](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/promotion.types.ts#L1936) |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/promotion.types.ts:1938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/promotion.types.ts#L1938) |
| <a id="base"></a> `base?` | [`BaseBidRecommendation`](BaseBidRecommendation.md) | Recommended base bids for the product card | [types/promotion.types.ts:1940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/promotion.types.ts#L1940) |
| <a id="normqueries"></a> `normQueries` | [`NormQueryBidRecommendation`](NormQueryBidRecommendation.md)[] | Recommended bids per search cluster | [types/promotion.types.ts:1942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/promotion.types.ts#L1942) |
