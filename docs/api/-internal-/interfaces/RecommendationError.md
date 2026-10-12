[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RecommendationError

# Interface: RecommendationError

Defined in: [types/promotion.types.ts:2244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L2244)

Per-item error returned in the `errors` array on partial success (HTTP 200).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | WB item number that failed. | [types/promotion.types.ts:2246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L2246) |
| <a id="error"></a> `error` | `string` | Human-readable error reason (e.g. "Товар не найден"). | [types/promotion.types.ts:2248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/promotion.types.ts#L2248) |
