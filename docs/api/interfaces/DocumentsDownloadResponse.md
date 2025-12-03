[Wildberries API TypeScript SDK](../modules.md) / DocumentsDownloadResponse

# Interface: DocumentsDownloadResponse

Defined in: [types/finances.types.ts:252](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L252)

Multiple documents download response

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `fileName`: `string`; `extension`: `string`; `document`: `string`; \} | - | [types/finances.types.ts:253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L253) |
| `data.fileName` | `string` | Archive file name | [types/finances.types.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L255) |
| `data.extension` | `string` | Archive format (usually 'zip') | [types/finances.types.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L257) |
| `data.document` | `string` | Base64-encoded archive content | [types/finances.types.ts:259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L259) |
