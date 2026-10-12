[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StatusSetResponse

# Interface: StatusSetResponse

Defined in: [types/orders-dbs.types.ts:273](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L273)

Response item for bulk status change operations

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L275) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L277) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; `metaDetails?`: [`MetaValidationDetail`](../../interfaces/MetaValidationDetail.md)[]; \}[] | Array of errors (if isError is true) | [types/orders-dbs.types.ts:279](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L279) |
