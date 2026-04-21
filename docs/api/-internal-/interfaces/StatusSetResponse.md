[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StatusSetResponse

# Interface: StatusSetResponse

Defined in: [types/orders-dbs.types.ts:199](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/orders-dbs.types.ts#L199)

Response item for bulk status change operations

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/orders-dbs.types.ts#L201) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/orders-dbs.types.ts#L203) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Array of errors (if isError is true) | [types/orders-dbs.types.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/orders-dbs.types.ts#L205) |
