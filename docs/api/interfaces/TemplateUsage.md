[Wildberries API TypeScript SDK](../modules.md) / TemplateUsage

# Interface: TemplateUsage

Defined in: [types/communications.types.ts:1335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1335)

Template usage statistics and performance metrics

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="totaluses"></a> `totalUses` | `number` | Number of times this template has been used | [types/communications.types.ts:1339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1339) |
| <a id="last30days"></a> `last30Days` | `number` | Number of times this template was used in the last 30 days | [types/communications.types.ts:1344](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1344) |
| <a id="today"></a> `today` | `number` | Number of times this template was used today | [types/communications.types.ts:1349](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1349) |
| <a id="averageresponsetimemin"></a> `averageResponseTimeMin` | `number` | Average response time when using this template (in minutes) | [types/communications.types.ts:1354](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1354) |
| <a id="customersatisfaction"></a> `customerSatisfaction?` | `number` | Customer satisfaction rating for responses using this template (1-5) | [types/communications.types.ts:1359](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1359) |
| <a id="lastused"></a> `lastUsed?` | `string` | Last time this template was used (ISO 8601) | [types/communications.types.ts:1364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1364) |
| <a id="usagetrend"></a> `usageTrend` | `"increasing"` \| `"stable"` \| `"decreasing"` | Usage trend: 'increasing', 'stable', 'decreasing' | [types/communications.types.ts:1369](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1369) |
