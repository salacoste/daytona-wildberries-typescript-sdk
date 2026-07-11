[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UploadTaskResponse

# Interface: UploadTaskResponse

Defined in: [types/products.types.ts:702](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L702)

Response for upload task creation (POST /api/v2/upload/task, /task/size, /task/club-discount)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `id?`: `number`; `alreadyExists?`: `boolean`; \} | Upload task data | [types/products.types.ts:704](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L704) |
| `data.id?` | `number` | Upload task ID | [types/products.types.ts:706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L706) |
| `data.alreadyExists?` | `boolean` | Whether this upload already exists | [types/products.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L708) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:711](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L711) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:713](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L713) |
