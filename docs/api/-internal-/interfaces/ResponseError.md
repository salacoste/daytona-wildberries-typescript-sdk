[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ResponseError

# Interface: ResponseError

Defined in: [types/analytics.types.ts:167](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L167)

Response error details

## Extended by

- [`ProductStatisticsResponse`](../../interfaces/ProductStatisticsResponse.md)
- [`HistoricalStatisticsResponse`](../../interfaces/HistoricalStatisticsResponse.md)
- [`GroupedHistoricalResponse`](../../interfaces/GroupedHistoricalResponse.md)
- [`SearchQueriesResponse`](../../interfaces/SearchQueriesResponse.md)
- [`CategoryPerformanceResponse`](../../interfaces/CategoryPerformanceResponse.md)
- [`ProductPerformanceResponse`](../../interfaces/ProductPerformanceResponse.md)
- [`StockHistoryResponse`](../../interfaces/StockHistoryResponse.md)
- [`CSVExportResponse`](../../interfaces/CSVExportResponse.md)
- [`CSVReport`](../../interfaces/CSVReport.md)
- [`GenerateReportResponse`](GenerateReportResponse.md)
- [`ReportInfo`](ReportInfo.md)
- [`ReportDownloadsResponse`](ReportDownloadsResponse.md)
- [`ProductSearchTextsResponse`](ProductSearchTextsResponse.md)
- [`ProductOrdersResponse`](ProductOrdersResponse.md)
- [`StocksProductsResponse`](StocksProductsResponse.md)
- [`StocksOfficesResponse`](StocksOfficesResponse.md)
- [`GroupedHistoryResponse`](GroupedHistoryResponse.md)
- [`SearchReportTableGroupsResponse`](SearchReportTableGroupsResponse.md)
- [`SearchReportTableDetailsResponse`](SearchReportTableDetailsResponse.md)
- [`StocksProductsGroupsResponse`](StocksProductsGroupsResponse.md)
- [`StocksProductsSizesResponse`](StocksProductsSizesResponse.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="error"></a> `error` | `boolean` | Error occurred flag | [types/analytics.types.ts:169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L169) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [types/analytics.types.ts:171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L171) |
| <a id="additionalerrors"></a> `additionalErrors?` | \| \{ `field`: `string`; `description`: `string`; \}[] \| `null` | Additional error details (field-level errors) | [types/analytics.types.ts:173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L173) |
