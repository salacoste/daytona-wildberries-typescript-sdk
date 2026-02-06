[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UploadTaskResponse

# Interface: UploadTaskResponse

Defined in: [types/products.types.ts:643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/products.types.ts#L643)

Response for upload task creation (POST /api/v2/upload/task, /task/size, /task/club-discount)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | \{ `id?`: `number`; `alreadyExists?`: `boolean`; \} | Upload task data | [types/products.types.ts:645](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/products.types.ts#L645) |
| `data.id?` | `number` | Upload task ID | [types/products.types.ts:647](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/products.types.ts#L647) |
| `data.alreadyExists?` | `boolean` | Whether this upload already exists | [types/products.types.ts:649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/products.types.ts#L649) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:652](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/products.types.ts#L652) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/products.types.ts#L654) |
