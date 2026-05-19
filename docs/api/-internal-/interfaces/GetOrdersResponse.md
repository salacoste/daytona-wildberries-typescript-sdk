[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrdersResponse

# Interface: GetOrdersResponse

Defined in: [types/orders-dbs.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-dbs.types.ts#L325)

Response from getOrders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next?` | `number` | Next pagination cursor (0 if no more data) | [types/orders-dbs.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-dbs.types.ts#L327) |
| <a id="orders"></a> `orders?` | [`DBSOrder`](DBSOrder.md)[] | List of completed orders | [types/orders-dbs.types.ts:329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e4126f6f987b2bce23ba67f86a0aa29a93d9e571/src/types/orders-dbs.types.ts#L329) |
