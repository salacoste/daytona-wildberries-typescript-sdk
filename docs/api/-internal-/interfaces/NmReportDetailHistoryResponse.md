[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailHistoryResponse

# ~~Interface: NmReportDetailHistoryResponse~~

Defined in: [types/analytics.types.ts:858](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L858)

## Deprecated

Use SalesFunnelProductsHistoryResponse instead. v2 endpoint /api/v2/nm-report/detail/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> ~~`data?`~~ | \{ `nmID?`: `number`; `imtName?`: `string`; `vendorCode?`: `string`; `history?`: \{ `dt?`: `string`; `openCardCount?`: `number`; `addToCartCount?`: `number`; `ordersCount?`: `number`; `ordersSumRub?`: `number`; `buyoutsCount?`: `number`; `buyoutsSumRub?`: `number`; `buyoutPercent?`: `number`; `addToCartConversion?`: `number`; `cartToOrderConversion?`: `number`; \}[]; \}[] | - | [types/analytics.types.ts:859](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L859) |
| <a id="error"></a> ~~`error?`~~ | `boolean` | Флаг ошибки | [types/analytics.types.ts:890](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L890) |
| <a id="errortext"></a> ~~`errorText?`~~ | `string` | Описание ошибки | [types/analytics.types.ts:892](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L892) |
| <a id="additionalerrors"></a> ~~`additionalErrors?`~~ | \{ `field?`: `string`; `description?`: `string`; \}[] | Дополнительные ошибки | [types/analytics.types.ts:894](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L894) |
