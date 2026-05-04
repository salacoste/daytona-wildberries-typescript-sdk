[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrdersResponse

# Interface: GetOrdersResponse

Defined in: [types/orders-dbs.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/orders-dbs.types.ts#L303)

Response from getOrders

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next?` | `number` | Next pagination cursor (0 if no more data) | [types/orders-dbs.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/orders-dbs.types.ts#L305) |
| <a id="orders"></a> `orders?` | [`DBSOrder`](DBSOrder.md)[] | List of completed orders | [types/orders-dbs.types.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/orders-dbs.types.ts#L307) |
