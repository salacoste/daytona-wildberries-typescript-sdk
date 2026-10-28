[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TransferSupplyOrdersRequest

# Interface: TransferSupplyOrdersRequest

Defined in: [types/orders-fbs.types.ts:149](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L149)

Request body for moving assembly orders from delivery back to assembly.

## See

task-241

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderids"></a> `orderIds` | `number`[] | Assembly order IDs to move back to assembly | [types/orders-fbs.types.ts:151](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L151) |
| <a id="newsupplyid"></a> `newSupplyId` | `string` | ID of the supply the orders are moved TO. The supply must NOT be transferred to delivery | [types/orders-fbs.types.ts:156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L156) |
