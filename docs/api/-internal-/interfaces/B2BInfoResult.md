[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / B2BInfoResult

# Interface: B2BInfoResult

Defined in: [types/orders-dbs.types.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L226)

B2B buyer information result

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L228) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L230) |
| <a id="data"></a> `data?` | \{ `orgName?`: `string`; `inn?`: `string`; `kpp?`: `string`; \} | B2B buyer data (present if isError is false) | [types/orders-dbs.types.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L232) |
| `data.orgName?` | `string` | Organization name | [types/orders-dbs.types.ts:234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L234) |
| `data.inn?` | `string` | INN (Tax ID) | [types/orders-dbs.types.ts:236](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L236) |
| `data.kpp?` | `string` | KPP (may be empty for individual entrepreneurs) | [types/orders-dbs.types.ts:238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L238) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Array of errors (present if isError is true) | [types/orders-dbs.types.ts:241](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/orders-dbs.types.ts#L241) |
