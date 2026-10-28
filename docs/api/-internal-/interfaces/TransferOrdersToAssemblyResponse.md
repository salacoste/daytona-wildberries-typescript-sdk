[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TransferOrdersToAssemblyResponse

# Interface: TransferOrdersToAssemblyResponse

Defined in: [types/orders-fbs.types.ts:187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L187)

Response for PATCH /api/marketplace/v3/fbs/supplies/{supplyId}/orders/transfer.
Maps to swagger schema: v3.TransferOrdersToAssemblyResponse

## See

task-241

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="transferredorders"></a> `transferredOrders?` | [`TransferOrderToAssembly`](TransferOrderToAssembly.md)[] | Per-order transfer results | [types/orders-fbs.types.ts:189](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L189) |
