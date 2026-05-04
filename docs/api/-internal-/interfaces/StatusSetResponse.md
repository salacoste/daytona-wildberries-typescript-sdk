[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StatusSetResponse

# Interface: StatusSetResponse

Defined in: [types/orders-dbs.types.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/orders-dbs.types.ts#L199)

Response item for bulk status change operations

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/orders-dbs.types.ts#L201) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/orders-dbs.types.ts#L203) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Array of errors (if isError is true) | [types/orders-dbs.types.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/064cd941fae2c874fb9153979979d4bb4873bbc5/src/types/orders-dbs.types.ts#L205) |
