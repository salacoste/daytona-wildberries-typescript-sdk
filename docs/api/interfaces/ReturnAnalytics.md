[Wildberries API TypeScript SDK](../modules.md) / ReturnAnalytics

# Interface: ReturnAnalytics

Defined in: [types/communications.types.ts:2182](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2182)

Analytics for return processing

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="totalreturns"></a> `totalReturns` | `number` | Total return requests count | [types/communications.types.ts:2186](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2186) |
| <a id="bystatus"></a> `byStatus` | \{ `status`: [`ReturnStatus`](../type-aliases/ReturnStatus.md); `count`: `number`; `percentage`: `number`; \}[] | Returns by status | [types/communications.types.ts:2191](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2191) |
| <a id="bycategory"></a> `byCategory` | \{ `category`: `string`; `count`: `number`; `averageProcessingTime`: `number`; `qualityScore`: `number`; \}[] | Returns by category | [types/communications.types.ts:2200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2200) |
| <a id="metrics"></a> `metrics` | [`ReturnMetrics`](ReturnMetrics.md) | Performance metrics | [types/communications.types.ts:2210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2210) |
| <a id="timeframe"></a> `timeFrame` | `"7d"` \| `"30d"` \| `"90d"` \| `"all"` | Time frame for analytics data | [types/communications.types.ts:2215](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2215) |
| <a id="lastupdated"></a> `lastUpdated` | `string` | Analytics update timestamp (ISO 8601) | [types/communications.types.ts:2220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2220) |
