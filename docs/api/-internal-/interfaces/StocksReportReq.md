[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksReportReq

# Interface: StocksReportReq

Defined in: [types/analytics.types.ts:776](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L776)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:778](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L778) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `STOCK_HISTORY_REPORT_CSV` | [types/analytics.types.ts:780](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L780) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:782](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L782) |
| <a id="params"></a> `params` | [`CommonReportFilters`](CommonReportFilters.md) | Параметры отчёта | [types/analytics.types.ts:784](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L784) |
