[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ProductOrdersRequest

# Interface: ProductOrdersRequest

Defined in: [types/analytics.types.ts:763](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L763)

Request for product orders by search queries

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | \{ `start`: `string`; `end`: `string`; \} | Current period | [types/analytics.types.ts:765](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L765) |
| `currentPeriod.start` | `string` | - | [types/analytics.types.ts:766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L766) |
| `currentPeriod.end` | `string` | - | [types/analytics.types.ts:767](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L767) |
| <a id="pastperiod"></a> `pastPeriod?` | \{ `start`: `string`; `end`: `string`; \} | Previous period for comparison | [types/analytics.types.ts:770](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L770) |
| `pastPeriod.start` | `string` | - | [types/analytics.types.ts:771](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L771) |
| `pastPeriod.end` | `string` | - | [types/analytics.types.ts:772](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L772) |
| <a id="nmid"></a> `nmId` | `number` | Product article number | [types/analytics.types.ts:775](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L775) |
| <a id="text"></a> `text` | `string` | Search text to analyze | [types/analytics.types.ts:777](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L777) |
