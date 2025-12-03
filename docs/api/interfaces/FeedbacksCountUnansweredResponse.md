[Wildberries API TypeScript SDK](../modules.md) / FeedbacksCountUnansweredResponse

# Interface: FeedbacksCountUnansweredResponse

Defined in: [types/communications.types.ts:3649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3649)

Response from getFeedbacksCountUnanswered() method
Returns metrics for unanswered feedbacks

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `countUnanswered`: `number`; `countUnansweredToday`: `number`; `valuation`: `string`; \} | Feedbacks data | [types/communications.types.ts:3653](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3653) |
| `data.countUnanswered` | `number` | Total count of unanswered feedbacks | [types/communications.types.ts:3657](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3657) |
| `data.countUnansweredToday` | `number` | Count of unanswered feedbacks received today | [types/communications.types.ts:3662](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3662) |
| `data.valuation` | `string` | Average rating of all feedbacks (as string) **Example** `"4.7"` | [types/communications.types.ts:3668](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3668) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:3674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3674) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [types/communications.types.ts:3679](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3679) |
| <a id="additionalerrors"></a> `additionalErrors` | `string`[] \| `null` | Additional errors array | [types/communications.types.ts:3684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3684) |
