[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GroupedHistoryItem

# Interface: GroupedHistoryItem

Defined in: [types/analytics.types.ts:942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L942)

Grouped history item with daily statistics

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="object"></a> `object?` | \{ `id`: `number`; `name`: `string`; \} | Object/category info | [types/analytics.types.ts:944](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L944) |
| `object.id` | `number` | - | [types/analytics.types.ts:945](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L945) |
| `object.name` | `string` | - | [types/analytics.types.ts:946](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L946) |
| <a id="brandname"></a> `brandName?` | `string` | Brand name | [types/analytics.types.ts:949](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L949) |
| <a id="tag"></a> `tag?` | \{ `id`: `number`; `name`: `string`; \} | Tag info | [types/analytics.types.ts:951](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L951) |
| `tag.id` | `number` | - | [types/analytics.types.ts:952](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L952) |
| `tag.name` | `string` | - | [types/analytics.types.ts:953](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L953) |
| <a id="history"></a> `history` | \{ `dt`: `string`; `openCardCount`: `number`; `addToCartCount`: `number`; `ordersCount`: `number`; `ordersSumRub`: `number`; `buyoutsCount`: `number`; `buyoutsSumRub`: `number`; `buyoutPercent`: `number`; `addToCartConversion`: `number`; `cartToOrderConversion`: `number`; \}[] | Daily history data | [types/analytics.types.ts:956](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L956) |
