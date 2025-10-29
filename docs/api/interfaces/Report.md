[Wildberries API TypeScript SDK](../modules.md) / Report

# Interface: Report

Defined in: [types/finances.types.ts:359](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L359)

Complete report details
Full information about a generated report

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Unique report identifier | [types/finances.types.ts:361](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L361) |
| <a id="type"></a> `type` | [`FinancialReportType`](../type-aliases/FinancialReportType.md) | Type of financial report | [types/finances.types.ts:363](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L363) |
| <a id="status"></a> `status` | [`ReportStatus`](../type-aliases/ReportStatus.md) | Current report status | [types/finances.types.ts:365](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L365) |
| <a id="format"></a> `format` | [`ReportFormat`](../type-aliases/ReportFormat.md) | Output format of the report | [types/finances.types.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L367) |
| <a id="url"></a> `url` | `string` \| `null` | Download URL (available when status is 'completed') | [types/finances.types.ts:369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L369) |
| <a id="expiresat"></a> `expiresAt` | `string` \| `null` | URL expiration timestamp (ISO 8601 format) | [types/finances.types.ts:371](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L371) |
| <a id="createdat"></a> `createdAt` | `string` | Report creation timestamp (ISO 8601 format) | [types/finances.types.ts:373](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L373) |
| <a id="error"></a> `error?` | `string` | Error message if status is 'failed' | [types/finances.types.ts:375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/finances.types.ts#L375) |
