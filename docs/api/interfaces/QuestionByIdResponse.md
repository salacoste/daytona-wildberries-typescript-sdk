[Wildberries API TypeScript SDK](../modules.md) / QuestionByIdResponse

# Interface: QuestionByIdResponse

Defined in: [types/communications.types.ts:1291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1291)

Response from getQuestionById() method
Returns detailed information about a specific question

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | [`QuestionDetails`](QuestionDetails.md) | Detailed question information with additional metadata | [types/communications.types.ts:1295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1295) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:1300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1300) |
| <a id="errortext"></a> `errorText?` | `string` | Error description text | [types/communications.types.ts:1305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1305) |
| <a id="additionalerrors"></a> `additionalErrors?` | `string`[] | Additional errors array | [types/communications.types.ts:1310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L1310) |
