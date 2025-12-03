[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ReportDownloadItem

# Interface: ReportDownloadItem

Defined in: [types/analytics.types.ts:677](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L677)

Report download item from nm-report/downloads endpoint

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Report download ID (UUID) | [types/analytics.types.ts:679](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L679) |
| <a id="reporttype"></a> `reportType` | `string` | Report type | [types/analytics.types.ts:681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L681) |
| <a id="userreportname"></a> `userReportName?` | `string` | User-defined report name | [types/analytics.types.ts:683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L683) |
| <a id="status"></a> `status` | `"processing"` \| `"new"` \| `"error"` \| `"done"` | Report status | [types/analytics.types.ts:685](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L685) |
| <a id="file"></a> `file?` | `string` | File URL when status is 'done' | [types/analytics.types.ts:687](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L687) |
| <a id="createdat"></a> `createdAt` | `string` | Creation timestamp | [types/analytics.types.ts:689](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L689) |
| <a id="updatedat"></a> `updatedAt?` | `string` | Update timestamp | [types/analytics.types.ts:691](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L691) |
| <a id="error"></a> `error?` | `string` | Error message if status is 'error' | [types/analytics.types.ts:693](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L693) |
