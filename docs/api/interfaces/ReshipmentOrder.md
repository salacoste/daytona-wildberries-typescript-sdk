[Wildberries API TypeScript SDK](../modules.md) / ReshipmentOrder

# Interface: ReshipmentOrder

Defined in: [types/orders-fbs.types.ts:495](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L495)

Reshipment order information

Order that requires reshipment due to incomplete scanning at the pickup point.
These orders need to be delivered again as part of a new supply.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="supplyid"></a> `supplyID` | `string` | Supply ID (format: WB-GI-1234567) | [types/orders-fbs.types.ts:497](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L497) |
| <a id="orderid"></a> `orderID` | `number` | Order ID (assembly task ID) | [types/orders-fbs.types.ts:499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L499) |
