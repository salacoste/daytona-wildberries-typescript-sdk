[Wildberries API TypeScript SDK](../modules.md) / GenerateReportRequest

# Interface: GenerateReportRequest

Defined in: [types/finances.types.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L333)

Generate report request parameters
Input data for initiating report generation

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="reporttype"></a> `reportType` | [`FinancialReportType`](../type-aliases/FinancialReportType.md) | Type of financial report to generate | [types/finances.types.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L335) |
| <a id="daterange"></a> `dateRange` | [`DateRange`](DateRange.md) | Date range for report data | [types/finances.types.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L337) |
| <a id="format"></a> `format?` | [`ReportFormat`](../type-aliases/ReportFormat.md) | Output format (defaults to PDF if not specified) | [types/finances.types.ts:339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/finances.types.ts#L339) |
