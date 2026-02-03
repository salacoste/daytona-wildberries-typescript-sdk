[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailHistoryResponse

# ~~Interface: NmReportDetailHistoryResponse~~

Defined in: [types/analytics.types.ts:761](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L761)

## Deprecated

Use SalesFunnelProductsHistoryResponse instead. v2 endpoint /api/v2/nm-report/detail/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> ~~`data?`~~ | \{ `nmID?`: `number`; `imtName?`: `string`; `vendorCode?`: `string`; `history?`: \{ `dt?`: `string`; `openCardCount?`: `number`; `addToCartCount?`: `number`; `ordersCount?`: `number`; `ordersSumRub?`: `number`; `buyoutsCount?`: `number`; `buyoutsSumRub?`: `number`; `buyoutPercent?`: `number`; `addToCartConversion?`: `number`; `cartToOrderConversion?`: `number`; \}[]; \}[] | - | [types/analytics.types.ts:762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L762) |
| <a id="error"></a> ~~`error?`~~ | `boolean` | Флаг ошибки | [types/analytics.types.ts:793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L793) |
| <a id="errortext"></a> ~~`errorText?`~~ | `string` | Описание ошибки | [types/analytics.types.ts:795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L795) |
| <a id="additionalerrors"></a> ~~`additionalErrors?`~~ | \{ `field?`: `string`; `description?`: `string`; \}[] | Дополнительные ошибки | [types/analytics.types.ts:797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b3a3d7a7e6aa73efc6d10acff39440fe6420b8ec/src/types/analytics.types.ts#L797) |
