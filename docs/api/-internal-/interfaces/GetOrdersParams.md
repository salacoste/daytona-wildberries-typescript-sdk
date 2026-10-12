[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrdersParams

# Interface: GetOrdersParams

Defined in: [types/orders-dbs.types.ts:369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L369)

Parameters for getOrders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit` | `number` | Number of orders to return (1-1000) | [types/orders-dbs.types.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L371) |
| <a id="next"></a> `next` | `number` | Pagination cursor (0 for first request) | [types/orders-dbs.types.ts:373](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L373) |
| <a id="datefrom"></a> `dateFrom` | `number` | Start date as Unix timestamp in SECONDS (WB rejects JS milliseconds) | [types/orders-dbs.types.ts:375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L375) |
| <a id="dateto"></a> `dateTo` | `number` | End date as Unix timestamp in SECONDS (WB rejects JS milliseconds) | [types/orders-dbs.types.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L377) |
