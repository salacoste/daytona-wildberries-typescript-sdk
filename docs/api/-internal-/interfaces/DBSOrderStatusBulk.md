[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSOrderStatusBulk

# Interface: DBSOrderStatusBulk

Defined in: [types/orders-dbs.types.ts:180](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/orders-dbs.types.ts#L180)

Order status from bulk status info endpoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/orders-dbs.types.ts#L182) |
| <a id="supplierstatus"></a> `supplierStatus?` | [`DBSSupplierStatus`](../type-aliases/DBSSupplierStatus.md) | Supplier status (triggered by seller actions) | [types/orders-dbs.types.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/orders-dbs.types.ts#L184) |
| <a id="wbstatus"></a> `wbStatus?` | `string` | WB system status | [types/orders-dbs.types.ts:186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/orders-dbs.types.ts#L186) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Errors if any occurred | [types/orders-dbs.types.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/orders-dbs.types.ts#L188) |
