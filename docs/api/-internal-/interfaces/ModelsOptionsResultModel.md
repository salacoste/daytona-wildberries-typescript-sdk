[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsOptionsResultModel

# Interface: ModelsOptionsResultModel

Defined in: [types/orders-fbw.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L322)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="result"></a> `result?` | \{ `barcode?`: `string`; `error?`: \{ `title?`: `string`; `detail?`: `string`; \}; `isError?`: `boolean`; `warehouses?`: \{ `warehouseID?`: `number`; `canBox?`: `boolean`; `canMonopallet?`: `boolean`; `canSupersafe?`: `boolean`; \}[]; \}[] | - | [types/orders-fbw.types.ts:323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L323) |
| <a id="requestid"></a> `requestId?` | `string` | ID запроса при наличии ошибок | [types/orders-fbw.types.ts:348](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/orders-fbw.types.ts#L348) |
