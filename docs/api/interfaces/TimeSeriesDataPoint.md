[Wildberries API TypeScript SDK](../modules.md) / TimeSeriesDataPoint

# Interface: TimeSeriesDataPoint

Defined in: [types/analytics.types.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L219)

Time-series data point for historical analytics

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date` | `string` | Date for this data point (YYYY-MM-DD or timestamp) | [types/analytics.types.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L221) |
| <a id="value"></a> `value?` | `number` | Primary metric value for this date | [types/analytics.types.ts:223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L223) |
| <a id="metadata"></a> `metadata?` | `Record`\<`string`, `unknown`\> | Additional metadata for this data point | [types/analytics.types.ts:225](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/analytics.types.ts#L225) |
