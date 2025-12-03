[Wildberries API TypeScript SDK](../modules.md) / ReturnAnalyticsFilters

# Interface: ReturnAnalyticsFilters

Defined in: [types/communications.types.ts:3407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3407)

Filters for return analytics data

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `string` | Filter by date from (YYYY-MM-DD format) | [types/communications.types.ts:3411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3411) |
| <a id="dateto"></a> `dateTo?` | `string` | Filter by date to (YYYY-MM-DD format) | [types/communications.types.ts:3416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3416) |
| <a id="status"></a> `status?` | [`ReturnStatus`](../type-aliases/ReturnStatus.md)[] | Filter by return status | [types/communications.types.ts:3421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3421) |
| <a id="category"></a> `category?` | `string`[] | Filter by return category | [types/communications.types.ts:3426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3426) |
| <a id="reason"></a> `reason?` | `string`[] | Filter by return reason | [types/communications.types.ts:3431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3431) |
| <a id="includetrends"></a> `includeTrends?` | `boolean` | Include trend analysis data | [types/communications.types.ts:3436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3436) |
| <a id="includequalitymetrics"></a> `includeQualityMetrics?` | `boolean` | Include quality metrics data | [types/communications.types.ts:3441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3441) |
| <a id="includecostanalysis"></a> `includeCostAnalysis?` | `boolean` | Include cost analysis data | [types/communications.types.ts:3446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3446) |
| <a id="includecustomerfeedback"></a> `includeCustomerFeedback?` | `boolean` | Include customer feedback data | [types/communications.types.ts:3451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3451) |
| <a id="groupby"></a> `groupBy?` | `"date"` \| `"category"` \| `"status"` \| `"reason"` \| `"product"` \| `"customer"` | Group analytics by field | [types/communications.types.ts:3456](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3456) |
