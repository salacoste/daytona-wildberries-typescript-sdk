[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksReportReq

# Interface: StocksReportReq

Defined in: [types/analytics.types.ts:1004](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/analytics.types.ts#L1004)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:1006](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/analytics.types.ts#L1006) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `STOCK_HISTORY_REPORT_CSV` | [types/analytics.types.ts:1008](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/analytics.types.ts#L1008) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:1010](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/analytics.types.ts#L1010) |
| <a id="params"></a> `params` | [`CommonReportFilters`](CommonReportFilters.md) | Параметры отчёта | [types/analytics.types.ts:1012](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/analytics.types.ts#L1012) |
