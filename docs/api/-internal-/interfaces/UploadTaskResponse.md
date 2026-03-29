[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UploadTaskResponse

# Interface: UploadTaskResponse

Defined in: [types/products.types.ts:636](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L636)

Response for upload task creation (POST /api/v2/upload/task, /task/size, /task/club-discount)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `id?`: `number`; `alreadyExists?`: `boolean`; \} | Upload task data | [types/products.types.ts:638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L638) |
| `data.id?` | `number` | Upload task ID | [types/products.types.ts:640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L640) |
| `data.alreadyExists?` | `boolean` | Whether this upload already exists | [types/products.types.ts:642](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L642) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:645](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L645) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:647](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/products.types.ts#L647) |
