[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GroupedHistoryRequest

# Interface: GroupedHistoryRequest

Defined in: [types/analytics.types.ts:921](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L921)

Request for grouped history endpoint (POST /api/v2/nm-report/grouped/history)
Returns statistics by days grouped by subjects, brands, and tags.
Max 7 days of data can be retrieved.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | \{ `begin`: `string`; `end`: `string`; \} | Period for analysis | [types/analytics.types.ts:923](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L923) |
| `period.begin` | `string` | - | [types/analytics.types.ts:924](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L924) |
| `period.end` | `string` | - | [types/analytics.types.ts:925](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L925) |
| <a id="objectids"></a> `objectIDs?` | `number`[] | Object/category IDs to filter by | [types/analytics.types.ts:928](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L928) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Brand names to filter by | [types/analytics.types.ts:930](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L930) |
| <a id="tagids"></a> `tagIDs?` | `number`[] | Tag IDs to filter by | [types/analytics.types.ts:932](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L932) |
| <a id="timezone"></a> `timezone?` | `string` | Timezone (default: Europe/Moscow) | [types/analytics.types.ts:934](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L934) |
| <a id="aggregationlevel"></a> `aggregationLevel?` | `"day"` \| `"week"` | Aggregation level: 'day' or 'week' (default: 'day') | [types/analytics.types.ts:936](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L936) |
