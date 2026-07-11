[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSOrderStatusBulk

# Interface: DBSOrderStatusBulk

Defined in: [types/orders-dbs.types.ts:179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L179)

Order status from bulk status info endpoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L181) |
| <a id="supplierstatus"></a> `supplierStatus?` | [`DBSSupplierStatus`](../type-aliases/DBSSupplierStatus.md) | Supplier status (triggered by seller actions) | [types/orders-dbs.types.ts:183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L183) |
| <a id="wbstatus"></a> `wbStatus?` | `string` | WB system status | [types/orders-dbs.types.ts:185](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L185) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Errors if any occurred | [types/orders-dbs.types.ts:187](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L187) |
