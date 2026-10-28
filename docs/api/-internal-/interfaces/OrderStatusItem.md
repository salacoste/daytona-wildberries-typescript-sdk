[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderStatusItem

# Interface: OrderStatusItem

Defined in: [types/orders-fbs.types.ts:291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L291)

Individual order status entry

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-fbs.types.ts:293](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L293) |
| <a id="supplierstatus"></a> `supplierStatus?` | [`OrderSupplierStatus`](../type-aliases/OrderSupplierStatus.md) | Supplier-side status | [types/orders-fbs.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L295) |
| <a id="wbstatus"></a> `wbStatus?` | [`OrderWbStatus`](../type-aliases/OrderWbStatus.md) | Wildberries system status | [types/orders-fbs.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L297) |
| <a id="iscancellable"></a> `isCancellable?` | `boolean` | Whether this assembly task can still be cancelled by the seller before being transferred to Wildberries. When `true`, you can call `sdk.ordersFBS.cancelOrder(orderId)` and it will succeed. Use this field as a pre-check to avoid unnecessary API calls and 4xx errors when the task is already past the cancellation window. **Since** 3.11.0 **See** [https://dev.wildberries.ru/docs/openapi/orders-fbs/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post](https://dev.wildberries.ru/docs/openapi/orders-fbs/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post) **Example** `for (const status of statuses) { if (status.isCancellable) { await sdk.ordersFBS.cancelOrder(status.id!); } }` | [types/orders-fbs.types.ts:317](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L317) |
| <a id="istransferable"></a> `isTransferable?` | `boolean` | Whether this assembly task can be moved from delivery (`complete`) back to assembly (`confirm`) via `transferSupplyOrders()`. `true` only when all conditions hold: the task is in `complete`; the target supply is not transferred to delivery; the task has not been moved back before. Use this field as a pre-check to avoid unnecessary API calls and 4xx errors. **Since** task-241 **See** [https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer](https://dev.wildberries.ru/docs/openapi/orders-fbs#tag/fbsSupplies/operation/patchV3FbsSuppliesSupplyIdOrdersTransfer) **Example** `for (const status of statuses) { if (status.isTransferable) { await sdk.ordersFBS.transferSupplyOrders(fromSupplyId, { orderIds: [status.id!], newSupplyId: 'WB-GI-200', }); } }` | [types/orders-fbs.types.ts:340](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L340) |
