[Wildberries API TypeScript SDK](../modules.md) / HistoricalStatisticsRequest

# Interface: HistoricalStatisticsRequest

Defined in: [types/analytics.types.ts:253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L253)

Historical statistics request

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | [`AnalyticsPeriod`](AnalyticsPeriod.md) | Date range for historical data (max 7 days) | [types/analytics.types.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L255) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Filter by brand names | [types/analytics.types.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L257) |
| <a id="objectids"></a> `objectIDs?` | `number`[] | Filter by object/category IDs | [types/analytics.types.ts:259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L259) |
| <a id="tagids"></a> `tagIDs?` | `number`[] | Filter by tag IDs | [types/analytics.types.ts:261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L261) |
| <a id="nmids"></a> `nmIDs?` | `number`[] | Filter by product article numbers (nmIDs) | [types/analytics.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/analytics.types.ts#L263) |
