[Wildberries API TypeScript SDK](../modules.md) / FeedbacksCountParams

# Interface: FeedbacksCountParams

Defined in: [types/communications.types.ts:3690](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3690)

Parameters for getFeedbacksCount() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom?` | `number` | Start date as Unix timestamp (optional) **Example** `1688465092` | [types/communications.types.ts:3695](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3695) |
| <a id="dateto"></a> `dateTo?` | `number` | End date as Unix timestamp (optional) **Example** `1688465092` | [types/communications.types.ts:3701](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3701) |
| <a id="isanswered"></a> `isAnswered?` | `boolean` | Filter by answered status (optional, defaults to true) - true: answered feedbacks - false: unanswered feedbacks | [types/communications.types.ts:3708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3708) |
