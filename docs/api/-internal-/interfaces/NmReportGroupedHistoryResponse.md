[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportGroupedHistoryResponse

# ~~Interface: NmReportGroupedHistoryResponse~~

Defined in: [types/analytics.types.ts:903](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L903)

## Deprecated

Use SalesFunnelGroupedHistoryResponse instead. v2 endpoint /api/v2/nm-report/grouped/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> ~~`data?`~~ | \{ `object?`: \{ `id?`: `number`; `name?`: `string`; \}; `brandName?`: `string`; `tag?`: \{ `id?`: `number`; `name?`: `string`; \}; `history?`: \{ `dt?`: `string`; `openCardCount?`: `number`; `addToCartCount?`: `number`; `ordersCount?`: `number`; `ordersSumRub?`: `number`; `buyoutsCount?`: `number`; `buyoutsSumRub?`: `number`; `buyoutPercent?`: `number`; `addToCartConversion?`: `number`; `cartToOrderConversion?`: `number`; \}[]; \}[] | - | [types/analytics.types.ts:904](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L904) |
| <a id="error"></a> ~~`error?`~~ | `boolean` | Флаг ошибки | [types/analytics.types.ts:945](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L945) |
| <a id="errortext"></a> ~~`errorText?`~~ | `string` | Описание ошибки | [types/analytics.types.ts:947](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L947) |
| <a id="additionalerrors"></a> ~~`additionalErrors?`~~ | \{ `field?`: `string`; `description?`: `string`; \}[] | Дополнительные ошибки | [types/analytics.types.ts:949](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L949) |
