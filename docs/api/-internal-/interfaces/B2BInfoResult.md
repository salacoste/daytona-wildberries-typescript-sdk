[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / B2BInfoResult

# Interface: B2BInfoResult

Defined in: [types/orders-dbs.types.ts:306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L306)

B2B buyer information result

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L308) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L310) |
| <a id="data"></a> `data?` | \{ `orgName?`: `string`; `inn?`: `string`; `kpp?`: `string`; \} | B2B buyer data (present if isError is false) | [types/orders-dbs.types.ts:312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L312) |
| `data.orgName?` | `string` | Organization name | [types/orders-dbs.types.ts:314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L314) |
| `data.inn?` | `string` | INN (Tax ID) | [types/orders-dbs.types.ts:316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L316) |
| `data.kpp?` | `string` | KPP (may be empty for individual entrepreneurs) | [types/orders-dbs.types.ts:318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L318) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Array of errors (present if isError is true) | [types/orders-dbs.types.ts:321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L321) |
