[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GenerateReportRequest

# Interface: GenerateReportRequest

Defined in: [types/analytics.types.ts:366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L366)

CSV report generation request

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="reporttype"></a> `reportType` | [`AnalyticsReportTypeEnum`](../../type-aliases/AnalyticsReportTypeEnum.md) | Type of report to generate | [types/analytics.types.ts:368](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L368) |
| <a id="daterange"></a> `dateRange` | [`DateRange`](DateRange.md) | Date range for the report | [types/analytics.types.ts:370](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L370) |
| <a id="format"></a> `format?` | [`ReportFormat`](../type-aliases/ReportFormat.md) | Report format (default: CSV) | [types/analytics.types.ts:372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L372) |
| <a id="filters"></a> `filters?` | \{ `brandNames?`: `string`[]; `objectIDs?`: `number`[]; `tagIDs?`: `number`[]; `nmIDs?`: `number`[]; \} | Filter parameters (optional) | [types/analytics.types.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L374) |
| `filters.brandNames?` | `string`[] | - | [types/analytics.types.ts:375](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L375) |
| `filters.objectIDs?` | `number`[] | - | [types/analytics.types.ts:376](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L376) |
| `filters.tagIDs?` | `number`[] | - | [types/analytics.types.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L377) |
| `filters.nmIDs?` | `number`[] | - | [types/analytics.types.ts:378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L378) |
