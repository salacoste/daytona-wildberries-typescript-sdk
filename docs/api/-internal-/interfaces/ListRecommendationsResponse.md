[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ListRecommendationsResponse

# Interface: ListRecommendationsResponse

Defined in: [types/promotion.types.ts:2239](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2239)

Response for POST /api/content/v1/recommendations/list — entries in `data`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`RecommendationEntry`](RecommendationEntry.md)[] \| `null` | Recommendation entries per product; `null` if empty/unavailable. | [types/promotion.types.ts:2241](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2241) |
| <a id="errors"></a> `errors` | [`RecommendationError`](RecommendationError.md)[] | Per-item errors. Populated on partial success (HTTP 200); empty on full success. | [types/promotion.types.ts:2243](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2243) |
| <a id="additionalerrors"></a> `additionalErrors` | `unknown` | Additional error details (structure not documented in samples; `null` when absent). | [types/promotion.types.ts:2245](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2245) |
