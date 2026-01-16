[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailHistoryResponse

# Interface: NmReportDetailHistoryResponse

Defined in: [types/analytics.types.ts:740](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L740)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `nmID?`: `number`; `imtName?`: `string`; `vendorCode?`: `string`; `history?`: \{ `dt?`: `string`; `openCardCount?`: `number`; `addToCartCount?`: `number`; `ordersCount?`: `number`; `ordersSumRub?`: `number`; `buyoutsCount?`: `number`; `buyoutsSumRub?`: `number`; `buyoutPercent?`: `number`; `addToCartConversion?`: `number`; `cartToOrderConversion?`: `number`; \}[]; \}[] | - | [types/analytics.types.ts:741](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L741) |
| <a id="error"></a> `error?` | `boolean` | Флаг ошибки | [types/analytics.types.ts:772](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L772) |
| <a id="errortext"></a> `errorText?` | `string` | Описание ошибки | [types/analytics.types.ts:774](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L774) |
| <a id="additionalerrors"></a> `additionalErrors?` | \{ `field?`: `string`; `description?`: `string`; \}[] | Дополнительные ошибки | [types/analytics.types.ts:776](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L776) |
