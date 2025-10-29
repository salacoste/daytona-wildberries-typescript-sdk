[Wildberries API TypeScript SDK](../modules.md) / OrderStatus

# Interface: OrderStatus

Defined in: [types/orders-fbs.types.ts:166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L166)

Order status information

Contains both seller-controlled and WB system status for an order

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Order ID | [types/orders-fbs.types.ts:168](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L168) |
| <a id="supplierstatus"></a> `supplierStatus` | [`SupplierStatus`](../type-aliases/SupplierStatus.md) | Seller-controlled status | [types/orders-fbs.types.ts:170](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L170) |
| <a id="wbstatus"></a> `wbStatus` | [`WBStatus`](../type-aliases/WBStatus.md) | WB system status | [types/orders-fbs.types.ts:172](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/orders-fbs.types.ts#L172) |
