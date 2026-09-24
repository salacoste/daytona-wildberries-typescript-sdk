[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetRecommendationsResponse

# Interface: SetRecommendationsResponse

Defined in: [types/promotion.types.ts:2273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2273)

Response for POST /api/content/v1/recommendations/set.
 `data` is `null`. On PARTIAL success WB still returns HTTP 200 — inspect `errors`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | `null` | Always `null` for the set method. | [types/promotion.types.ts:2275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2275) |
| <a id="errors"></a> `errors` | [`RecommendationError`](RecommendationError.md)[] | Per-item errors. Populated on partial success (HTTP 200); empty on full success. | [types/promotion.types.ts:2277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2277) |
| <a id="additionalerrors"></a> `additionalErrors` | `unknown` | Additional error details (structure not documented in samples; `null` when absent). | [types/promotion.types.ts:2279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2279) |
