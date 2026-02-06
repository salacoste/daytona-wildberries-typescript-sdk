[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrdersParams

# Interface: GetOrdersParams

Defined in: [types/orders-dbs.types.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-dbs.types.ts#L289)

Parameters for getOrders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit` | `number` | Number of orders to return (1-1000) | [types/orders-dbs.types.ts:291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-dbs.types.ts#L291) |
| <a id="next"></a> `next` | `number` | Pagination cursor (0 for first request) | [types/orders-dbs.types.ts:293](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-dbs.types.ts#L293) |
| <a id="datefrom"></a> `dateFrom` | `number` | Start date as Unix timestamp | [types/orders-dbs.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-dbs.types.ts#L295) |
| <a id="dateto"></a> `dateTo` | `number` | End date as Unix timestamp | [types/orders-dbs.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/a8842306036e4c58024b1f08e30e731a3a667972/src/types/orders-dbs.types.ts#L297) |
