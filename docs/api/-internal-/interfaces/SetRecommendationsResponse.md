[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetRecommendationsResponse

# Interface: SetRecommendationsResponse

Defined in: [types/promotion.types.ts:2222](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2222)

Response for POST /api/content/v1/recommendations/set.
 `data` is `null`. On PARTIAL success WB still returns HTTP 200 — inspect `errors`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | `null` | Always `null` for the set method. | [types/promotion.types.ts:2224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2224) |
| <a id="errors"></a> `errors` | [`RecommendationError`](RecommendationError.md)[] | Per-item errors. Populated on partial success (HTTP 200); empty on full success. | [types/promotion.types.ts:2226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2226) |
| <a id="additionalerrors"></a> `additionalErrors` | `unknown` | Additional error details (structure not documented in samples; `null` when absent). | [types/promotion.types.ts:2228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2228) |
