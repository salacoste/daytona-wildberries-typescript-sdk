[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrdersResponse

# Interface: GetOrdersResponse

Defined in: [types/orders-dbs.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/orders-dbs.types.ts#L303)

Response from getOrders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next?` | `number` | Next pagination cursor (0 if no more data) | [types/orders-dbs.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/orders-dbs.types.ts#L305) |
| <a id="orders"></a> `orders?` | [`DBSOrder`](DBSOrder.md)[] | List of completed orders | [types/orders-dbs.types.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/orders-dbs.types.ts#L307) |
