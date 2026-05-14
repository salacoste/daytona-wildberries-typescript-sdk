[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsOptionsResultModel

# Interface: ModelsOptionsResultModel

Defined in: [types/orders-fbw.types.ts:340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbw.types.ts#L340)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="result"></a> `result?` | \{ `barcode?`: `string`; `error?`: \{ `title?`: `string`; `detail?`: `string`; \}; `isError?`: `boolean`; `warehouses?`: \{ `warehouseID?`: `number`; `canBox?`: `boolean`; `canMonopallet?`: `boolean`; `canSupersafe?`: `boolean`; `canBoxOnPallet?`: `boolean`; \}[]; \}[] | - | [types/orders-fbw.types.ts:341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbw.types.ts#L341) |
| <a id="requestid"></a> `requestId?` | `string` | ID запроса при наличии ошибок | [types/orders-fbw.types.ts:368](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/orders-fbw.types.ts#L368) |
