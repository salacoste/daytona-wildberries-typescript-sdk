[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ListRecommendationsResponse

# Interface: ListRecommendationsResponse

Defined in: [types/promotion.types.ts:2290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2290)

Response for POST /api/content/v1/recommendations/list — entries in `data`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`RecommendationEntry`](RecommendationEntry.md)[] \| `null` | Recommendation entries per product; `null` if empty/unavailable. | [types/promotion.types.ts:2292](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2292) |
| <a id="errors"></a> `errors` | [`RecommendationError`](RecommendationError.md)[] | Per-item errors. Populated on partial success (HTTP 200); empty on full success. | [types/promotion.types.ts:2294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2294) |
| <a id="additionalerrors"></a> `additionalErrors` | `unknown` | Additional error details (structure not documented in samples; `null` when absent). | [types/promotion.types.ts:2296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2296) |
