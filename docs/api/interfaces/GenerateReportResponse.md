[Wildberries API TypeScript SDK](../modules.md) / GenerateReportResponse

# Interface: GenerateReportResponse

Defined in: [types/finances.types.ts:346](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L346)

Generate report response
Initial response when report generation is initiated

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="reportid"></a> `reportId` | `string` | Unique report identifier for status tracking | [types/finances.types.ts:348](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L348) |
| <a id="status"></a> `status` | [`ReportStatus`](../type-aliases/ReportStatus.md) | Current status of report generation | [types/finances.types.ts:350](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L350) |
| <a id="createdat"></a> `createdAt?` | `string` | Timestamp when report generation started | [types/finances.types.ts:352](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L352) |
