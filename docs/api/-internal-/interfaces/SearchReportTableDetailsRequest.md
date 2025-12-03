[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportTableDetailsRequest

# Interface: SearchReportTableDetailsRequest

Defined in: [types/analytics.types.ts:1116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1116)

Request for search report table details (POST /api/v2/search-report/table/details)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`SearchReportPeriod`](SearchReportPeriod.md) | Current period for analysis | [types/analytics.types.ts:1118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1118) |
| <a id="pastperiod"></a> `pastPeriod?` | [`SearchReportPeriod`](SearchReportPeriod.md) | Past period for comparison | [types/analytics.types.ts:1120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1120) |
| <a id="subjectid"></a> `subjectId?` | `number` | Filter by subject ID | [types/analytics.types.ts:1122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1122) |
| <a id="brandname"></a> `brandName?` | `string` | Filter by brand name | [types/analytics.types.ts:1124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1124) |
| <a id="tagid"></a> `tagId?` | `number` | Filter by tag ID | [types/analytics.types.ts:1126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1126) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Filter by nmIds (max 50) | [types/analytics.types.ts:1128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1128) |
| <a id="orderby"></a> `orderBy` | [`SearchOrderBy`](SearchOrderBy.md) | Order by configuration | [types/analytics.types.ts:1130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1130) |
| <a id="positioncluster"></a> `positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | Position cluster filter | [types/analytics.types.ts:1132](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1132) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Include substituted SKUs data | [types/analytics.types.ts:1134](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1134) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Include search texts data | [types/analytics.types.ts:1136](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1136) |
| <a id="limit"></a> `limit` | `number` | Number of items to return (max 1000) | [types/analytics.types.ts:1138](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1138) |
| <a id="offset"></a> `offset` | `number` | Offset for pagination | [types/analytics.types.ts:1140](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1140) |
