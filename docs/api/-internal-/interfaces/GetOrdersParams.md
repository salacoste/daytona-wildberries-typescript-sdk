[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrdersParams

# Interface: GetOrdersParams

Defined in: [types/orders-dbs.types.ts:311](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-dbs.types.ts#L311)

Parameters for getOrders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit` | `number` | Number of orders to return (1-1000) | [types/orders-dbs.types.ts:313](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-dbs.types.ts#L313) |
| <a id="next"></a> `next` | `number` | Pagination cursor (0 for first request) | [types/orders-dbs.types.ts:315](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-dbs.types.ts#L315) |
| <a id="datefrom"></a> `dateFrom` | `number` | Start date as Unix timestamp | [types/orders-dbs.types.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-dbs.types.ts#L317) |
| <a id="dateto"></a> `dateTo` | `number` | End date as Unix timestamp | [types/orders-dbs.types.ts:319](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-dbs.types.ts#L319) |
