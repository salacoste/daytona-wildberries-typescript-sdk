[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportTableGroupsRequest

# Interface: SearchReportTableGroupsRequest

Defined in: [types/analytics.types.ts:1033](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1033)

Request for search report table groups (POST /api/v2/search-report/table/groups)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`SearchReportPeriod`](SearchReportPeriod.md) | Current period for analysis | [types/analytics.types.ts:1035](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1035) |
| <a id="pastperiod"></a> `pastPeriod?` | [`SearchReportPeriod`](SearchReportPeriod.md) | Past period for comparison | [types/analytics.types.ts:1037](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1037) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Filter by nmIds | [types/analytics.types.ts:1039](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1039) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Filter by subject IDs | [types/analytics.types.ts:1041](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1041) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Filter by brand names | [types/analytics.types.ts:1043](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1043) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Filter by tag IDs | [types/analytics.types.ts:1045](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1045) |
| <a id="positioncluster"></a> `positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | Position cluster filter | [types/analytics.types.ts:1047](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1047) |
| <a id="orderby"></a> `orderBy` | [`SearchOrderBy`](SearchOrderBy.md) | Order by configuration | [types/analytics.types.ts:1049](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1049) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Include substituted SKUs data | [types/analytics.types.ts:1051](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1051) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Include search texts data | [types/analytics.types.ts:1053](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1053) |
| <a id="limit"></a> `limit` | `number` | Number of items to return (max 1000) | [types/analytics.types.ts:1055](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1055) |
| <a id="offset"></a> `offset` | `number` | Offset for pagination | [types/analytics.types.ts:1057](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1057) |
