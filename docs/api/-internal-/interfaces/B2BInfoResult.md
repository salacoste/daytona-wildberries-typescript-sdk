[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / B2BInfoResult

# Interface: B2BInfoResult

Defined in: [types/orders-dbs.types.ts:248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L248)

B2B buyer information result

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID | [types/orders-dbs.types.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L250) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether an error occurred | [types/orders-dbs.types.ts:252](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L252) |
| <a id="data"></a> `data?` | \{ `orgName?`: `string`; `inn?`: `string`; `kpp?`: `string`; \} | B2B buyer data (present if isError is false) | [types/orders-dbs.types.ts:254](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L254) |
| `data.orgName?` | `string` | Organization name | [types/orders-dbs.types.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L256) |
| `data.inn?` | `string` | INN (Tax ID) | [types/orders-dbs.types.ts:258](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L258) |
| `data.kpp?` | `string` | KPP (may be empty for individual entrepreneurs) | [types/orders-dbs.types.ts:260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L260) |
| <a id="errors"></a> `errors?` | \{ `code?`: `number`; `detail?`: `string`; \}[] | Array of errors (present if isError is true) | [types/orders-dbs.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L263) |
