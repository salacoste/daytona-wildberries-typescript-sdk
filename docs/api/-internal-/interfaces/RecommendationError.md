[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RecommendationError

# Interface: RecommendationError

Defined in: [types/promotion.types.ts:2193](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2193)

Per-item error returned in the `errors` array on partial success (HTTP 200).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | WB item number that failed. | [types/promotion.types.ts:2195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2195) |
| <a id="error"></a> `error` | `string` | Human-readable error reason (e.g. "Товар не найден"). | [types/promotion.types.ts:2197](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2197) |
