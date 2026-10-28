[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSOrderStatusBulk

# Interface: DBSOrderStatusBulk

Defined in: [types/orders-dbs.types.ts:228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L228)

Order status from bulk status info endpoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L230) |
| <a id="supplierstatus"></a> `supplierStatus?` | [`DBSSupplierStatus`](../type-aliases/DBSSupplierStatus.md) | Supplier status (triggered by seller actions) | [types/orders-dbs.types.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L232) |
| <a id="wbstatus"></a> `wbStatus?` | `string` | WB system status | [types/orders-dbs.types.ts:234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L234) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Errors if any occurred | [types/orders-dbs.types.ts:236](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L236) |
