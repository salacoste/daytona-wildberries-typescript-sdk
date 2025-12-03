[Wildberries API TypeScript SDK](../modules.md) / NewFeedbacksQuestionsResponse

# Interface: NewFeedbacksQuestionsResponse

Defined in: [types/communications.types.ts:1111](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1111)

Response from getNewFeedbacksQuestions() method
Returns indicators for new unviewed feedbacks and questions

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="hasnewquestions"></a> `hasNewQuestions` | `boolean` | Whether there are new unviewed questions | [types/communications.types.ts:1115](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1115) |
| <a id="hasnewfeedbacks"></a> `hasNewFeedbacks` | `boolean` | Whether there are new unviewed feedbacks/reviews | [types/communications.types.ts:1120](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1120) |
| <a id="newquestionscount"></a> `newQuestionsCount?` | `number` | Count of new unviewed questions | [types/communications.types.ts:1125](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1125) |
| <a id="newfeedbackscount"></a> `newFeedbacksCount?` | `number` | Count of new unviewed feedbacks | [types/communications.types.ts:1130](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1130) |
| <a id="lastchecktime"></a> `lastCheckTime` | `string` | Timestamp of last check (ISO 8601) | [types/communications.types.ts:1135](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1135) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:1140](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1140) |
| <a id="errortext"></a> `errorText?` | `string` | Error description text | [types/communications.types.ts:1145](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1145) |
| <a id="additionalerrors"></a> `additionalErrors?` | `string`[] | Additional errors array | [types/communications.types.ts:1150](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1150) |
