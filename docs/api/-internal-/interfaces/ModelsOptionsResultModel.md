[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsOptionsResultModel

# Interface: ModelsOptionsResultModel

Defined in: [types/orders-fbw.types.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L434)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="result"></a> `result?` | \{ `barcode?`: `string`; `error?`: \{ `title?`: `string`; `detail?`: `string`; \}; `isError?`: `boolean`; `warehouses?`: \{ `warehouseID?`: `number`; `canBox?`: `boolean`; `canMonopallet?`: `boolean`; `canSupersafe?`: `boolean`; `canBoxOnPallet?`: `boolean`; \}[]; \}[] | - | [types/orders-fbw.types.ts:435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L435) |
| <a id="requestid"></a> `requestId?` | `string` | ID запроса при наличии ошибок | [types/orders-fbw.types.ts:462](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L462) |
