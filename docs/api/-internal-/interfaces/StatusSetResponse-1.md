[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StatusSetResponse

# Interface: StatusSetResponse

Defined in: [types/orders-dbs.types.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L224)

Response item for bulk status change operations

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L226) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L228) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; `metaDetails?`: [`MetaValidationDetail`](../../interfaces/MetaValidationDetail.md)[]; \}[] | Array of errors (if isError is true) | [types/orders-dbs.types.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L230) |
