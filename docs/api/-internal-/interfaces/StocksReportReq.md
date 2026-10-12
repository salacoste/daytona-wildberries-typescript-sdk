[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksReportReq

# Interface: StocksReportReq

Defined in: [types/analytics.types.ts:817](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L817)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:819](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L819) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `STOCK_HISTORY_REPORT_CSV` | [types/analytics.types.ts:821](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L821) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:823](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L823) |
| <a id="params"></a> `params` | [`CommonReportFilters`](CommonReportFilters.md) | Параметры отчёта | [types/analytics.types.ts:825](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L825) |
