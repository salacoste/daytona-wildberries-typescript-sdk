[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderStatusItem

# Interface: OrderStatusItem

Defined in: [types/orders-fbs.types.ts:244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L244)

Individual order status entry

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id?` | `number` | Order ID | [types/orders-fbs.types.ts:246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L246) |
| <a id="supplierstatus"></a> `supplierStatus?` | [`OrderSupplierStatus`](../type-aliases/OrderSupplierStatus.md) | Supplier-side status | [types/orders-fbs.types.ts:248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L248) |
| <a id="wbstatus"></a> `wbStatus?` | [`OrderWbStatus`](../type-aliases/OrderWbStatus.md) | Wildberries system status | [types/orders-fbs.types.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L250) |
| <a id="iscancellable"></a> `isCancellable?` | `boolean` | Whether this assembly task can still be cancelled by the seller before being transferred to Wildberries. When `true`, you can call `sdk.ordersFBS.cancelOrder(orderId)` and it will succeed. Use this field as a pre-check to avoid unnecessary API calls and 4xx errors when the task is already past the cancellation window. **Since** 3.11.0 **See** [https://dev.wildberries.ru/docs/openapi/orders-fbs/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post](https://dev.wildberries.ru/docs/openapi/orders-fbs/#tag/Sborochnye-zadaniya-FBS/paths/~1api~1v3~1orders~1status/post) **Example** `for (const status of statuses) { if (status.isCancellable) { await sdk.ordersFBS.cancelOrder(status.id!); } }` | [types/orders-fbs.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbs.types.ts#L270) |
