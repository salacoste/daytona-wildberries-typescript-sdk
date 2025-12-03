[Wildberries API TypeScript SDK](../modules.md) / CrossBorderStatusHistoryResponse

# Interface: CrossBorderStatusHistoryResponse

Defined in: [types/orders-fbs.types.ts:891](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L891)

Response type for getOrdersStatusHistoryCrossBorder endpoint
POST /api/v3/orders/status/history

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | [`CrossBorderOrderHistory`](CrossBorderOrderHistory.md)[] | Array of orders with status history | [types/orders-fbs.types.ts:893](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L893) |
