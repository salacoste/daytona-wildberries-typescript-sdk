[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportGroupedHistoryResponse

# ~~Interface: NmReportGroupedHistoryResponse~~

Defined in: [types/analytics.types.ts:806](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L806)

## Deprecated

Use SalesFunnelGroupedHistoryResponse instead. v2 endpoint /api/v2/nm-report/grouped/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> ~~`data?`~~ | \{ `object?`: \{ `id?`: `number`; `name?`: `string`; \}; `brandName?`: `string`; `tag?`: \{ `id?`: `number`; `name?`: `string`; \}; `history?`: \{ `dt?`: `string`; `openCardCount?`: `number`; `addToCartCount?`: `number`; `ordersCount?`: `number`; `ordersSumRub?`: `number`; `buyoutsCount?`: `number`; `buyoutsSumRub?`: `number`; `buyoutPercent?`: `number`; `addToCartConversion?`: `number`; `cartToOrderConversion?`: `number`; \}[]; \}[] | - | [types/analytics.types.ts:807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L807) |
| <a id="error"></a> ~~`error?`~~ | `boolean` | Флаг ошибки | [types/analytics.types.ts:848](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L848) |
| <a id="errortext"></a> ~~`errorText?`~~ | `string` | Описание ошибки | [types/analytics.types.ts:850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L850) |
| <a id="additionalerrors"></a> ~~`additionalErrors?`~~ | \{ `field?`: `string`; `description?`: `string`; \}[] | Дополнительные ошибки | [types/analytics.types.ts:852](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L852) |
