[Wildberries API TypeScript SDK](../modules.md) / CSVExportRequest

# Interface: CSVExportRequest

Defined in: [types/analytics.types.ts:609](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L609)

CSV export request

Initiates asynchronous CSV generation for analytics data

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="reporttype"></a> `reportType` | [`AnalyticsReportTypeEnum`](../type-aliases/AnalyticsReportTypeEnum.md) | Type of analytics data to export | [types/analytics.types.ts:611](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L611) |
| <a id="daterange"></a> `dateRange` | [`DateRange`](../-internal-/interfaces/DateRange.md) | Date range for the exported data | [types/analytics.types.ts:613](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L613) |
| <a id="formatoptions"></a> `formatOptions?` | [`CSVFormatOptions`](CSVFormatOptions.md) | CSV formatting options | [types/analytics.types.ts:615](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L615) |
| <a id="filters"></a> `filters?` | \{ `brandNames?`: `string`[]; `objectIDs?`: `number`[]; `tagIDs?`: `number`[]; `nmIDs?`: `number`[]; \} | Optional filters to apply to the data | [types/analytics.types.ts:617](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L617) |
| `filters.brandNames?` | `string`[] | - | [types/analytics.types.ts:618](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L618) |
| `filters.objectIDs?` | `number`[] | - | [types/analytics.types.ts:619](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L619) |
| `filters.tagIDs?` | `number`[] | - | [types/analytics.types.ts:620](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L620) |
| `filters.nmIDs?` | `number`[] | - | [types/analytics.types.ts:621](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L621) |
