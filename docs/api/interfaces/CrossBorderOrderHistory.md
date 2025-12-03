[Wildberries API TypeScript SDK](../modules.md) / CrossBorderOrderHistory

# Interface: CrossBorderOrderHistory

Defined in: [types/orders-fbs.types.ts:878](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L878)

Cross-border order with status history

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="deliverydate"></a> `deliveryDate` | `string` | Planned delivery date (RFC3339) | [types/orders-fbs.types.ts:880](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L880) |
| <a id="orderid"></a> `orderID` | `number` | Order ID | [types/orders-fbs.types.ts:882](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L882) |
| <a id="statuses"></a> `statuses` | [`CrossBorderStatusHistoryEntry`](CrossBorderStatusHistoryEntry.md)[] | Status history | [types/orders-fbs.types.ts:884](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L884) |
