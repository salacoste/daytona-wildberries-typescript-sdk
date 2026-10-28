[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RecommendationError

# Interface: RecommendationError

Defined in: [types/promotion.types.ts:2244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L2244)

Per-item error returned in the `errors` array on partial success (HTTP 200).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | WB item number that failed. | [types/promotion.types.ts:2246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L2246) |
| <a id="error"></a> `error` | `string` | Human-readable error reason (e.g. "Товар не найден"). | [types/promotion.types.ts:2248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/promotion.types.ts#L2248) |
