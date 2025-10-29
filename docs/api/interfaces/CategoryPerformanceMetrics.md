[Wildberries API TypeScript SDK](../modules.md) / CategoryPerformanceMetrics

# Interface: CategoryPerformanceMetrics

Defined in: [types/analytics.types.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L419)

Category performance metrics

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="categoryid"></a> `categoryId` | `string` | Category ID | [types/analytics.types.ts:421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L421) |
| <a id="categoryname"></a> `categoryName` | `string` | Category name | [types/analytics.types.ts:423](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L423) |
| <a id="revenue"></a> `revenue` | `number` | Total revenue in category | [types/analytics.types.ts:425](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L425) |
| <a id="unitssold"></a> `unitsSold` | `number` | Total units sold | [types/analytics.types.ts:427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L427) |
| <a id="productcount"></a> `productCount` | `number` | Number of products in category | [types/analytics.types.ts:429](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L429) |
| <a id="topproducts"></a> `topProducts` | \{ `nmID`: `number`; `name`: `string`; `revenue`: `number`; `unitsSold`: `number`; \}[] | Top performing products in category | [types/analytics.types.ts:431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L431) |
| <a id="timeseries"></a> `timeSeries?` | [`TimeSeriesDataPoint`](TimeSeriesDataPoint.md)[] | Time-series trend data | [types/analytics.types.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L438) |
