[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportGroupedHistoryResponse

# Interface: NmReportGroupedHistoryResponse

Defined in: [types/analytics.types.ts:784](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L784)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `object?`: \{ `id?`: `number`; `name?`: `string`; \}; `brandName?`: `string`; `tag?`: \{ `id?`: `number`; `name?`: `string`; \}; `history?`: \{ `dt?`: `string`; `openCardCount?`: `number`; `addToCartCount?`: `number`; `ordersCount?`: `number`; `ordersSumRub?`: `number`; `buyoutsCount?`: `number`; `buyoutsSumRub?`: `number`; `buyoutPercent?`: `number`; `addToCartConversion?`: `number`; `cartToOrderConversion?`: `number`; \}[]; \}[] | - | [types/analytics.types.ts:785](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L785) |
| <a id="error"></a> `error?` | `boolean` | Флаг ошибки | [types/analytics.types.ts:826](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L826) |
| <a id="errortext"></a> `errorText?` | `string` | Описание ошибки | [types/analytics.types.ts:828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L828) |
| <a id="additionalerrors"></a> `additionalErrors?` | \{ `field?`: `string`; `description?`: `string`; \}[] | Дополнительные ошибки | [types/analytics.types.ts:830](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L830) |
