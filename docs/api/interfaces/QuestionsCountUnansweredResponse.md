[Wildberries API TypeScript SDK](../modules.md) / QuestionsCountUnansweredResponse

# Interface: QuestionsCountUnansweredResponse

Defined in: [types/communications.types.ts:1157](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1157)

Response from getQuestionsCountUnanswered() method
Returns dashboard metrics for unanswered questions

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="countunanswered"></a> `countUnanswered` | `number` | Total count of unanswered questions | [types/communications.types.ts:1161](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1161) |
| <a id="countunansweredtoday"></a> `countUnansweredToday` | `number` | Count of unanswered questions received today | [types/communications.types.ts:1166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1166) |
| <a id="countunansweredweek"></a> `countUnansweredWeek?` | `number` | Count of unanswered questions from this week | [types/communications.types.ts:1171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1171) |
| <a id="countunansweredmonth"></a> `countUnansweredMonth?` | `number` | Count of unanswered questions from this month | [types/communications.types.ts:1176](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1176) |
| <a id="bycategories"></a> `byCategories?` | \{ `categoryId`: `number`; `categoryName`: `string`; `count`: `number`; \}[] | Breakdown by product categories (if available) | [types/communications.types.ts:1181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1181) |
| <a id="averageresponsetimehours"></a> `averageResponseTimeHours?` | `number` | Average response time for recently answered questions (in hours) | [types/communications.types.ts:1190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1190) |
| <a id="lastupdated"></a> `lastUpdated` | `string` | Timestamp when this data was last updated (ISO 8601) | [types/communications.types.ts:1195](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1195) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:1200](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1200) |
| <a id="errortext"></a> `errorText?` | `string` | Error description text | [types/communications.types.ts:1205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1205) |
| <a id="additionalerrors"></a> `additionalErrors?` | `string`[] | Additional errors array | [types/communications.types.ts:1210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1210) |
