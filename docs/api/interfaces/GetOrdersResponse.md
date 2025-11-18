[Wildberries API TypeScript SDK](../modules.md) / GetOrdersResponse

# Interface: GetOrdersResponse

Defined in: [types/orders-fbs.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L218)

Response from getOrders endpoint

IMPORTANT: Returns orders WITHOUT current status.
Use getOrderStatuses() to get order status.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="next"></a> `next` | `number` | Next pagination cursor 0 or null means no more pages | [types/orders-fbs.types.ts:223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L223) |
| <a id="orders"></a> `orders` | [`Order`](Order.md)[] | Array of orders matching filters | [types/orders-fbs.types.ts:225](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/orders-fbs.types.ts#L225) |
