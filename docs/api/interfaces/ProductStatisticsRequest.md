[Wildberries API TypeScript SDK](../modules.md) / ProductStatisticsRequest

# Interface: ProductStatisticsRequest

Defined in: [types/analytics.types.ts:182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L182)

Request for product card statistics detail report

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | [`AnalyticsPeriod`](AnalyticsPeriod.md) | Selected period for analysis | [types/analytics.types.ts:184](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L184) |
| <a id="previousperiod"></a> `previousPeriod?` | [`AnalyticsPeriod`](AnalyticsPeriod.md) | Previous period for comparison (optional) | [types/analytics.types.ts:186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L186) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Filter by brand names | [types/analytics.types.ts:188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L188) |
| <a id="objectids"></a> `objectIDs?` | `number`[] | Filter by object/category IDs | [types/analytics.types.ts:190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L190) |
| <a id="tagids"></a> `tagIDs?` | `number`[] | Filter by tag IDs | [types/analytics.types.ts:192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L192) |
| <a id="nmids"></a> `nmIDs?` | `number`[] | Filter by product article numbers (nmIDs) | [types/analytics.types.ts:194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L194) |
| <a id="page"></a> `page?` | `number` | Pagination: page number (starts at 1) | [types/analytics.types.ts:196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L196) |
| <a id="pagesize"></a> `pageSize?` | `number` | Pagination: results per page | [types/analytics.types.ts:198](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L198) |
