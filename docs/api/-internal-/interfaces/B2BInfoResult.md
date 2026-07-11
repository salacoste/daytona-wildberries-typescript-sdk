[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / B2BInfoResult

# Interface: B2BInfoResult

Defined in: [types/orders-dbs.types.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L257)

B2B buyer information result

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L259) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L261) |
| <a id="data"></a> `data?` | \{ `orgName?`: `string`; `inn?`: `string`; `kpp?`: `string`; \} | B2B buyer data (present if isError is false) | [types/orders-dbs.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L263) |
| `data.orgName?` | `string` | Organization name | [types/orders-dbs.types.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L265) |
| `data.inn?` | `string` | INN (Tax ID) | [types/orders-dbs.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L267) |
| `data.kpp?` | `string` | KPP (may be empty for individual entrepreneurs) | [types/orders-dbs.types.ts:269](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L269) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Array of errors (present if isError is true) | [types/orders-dbs.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L272) |
