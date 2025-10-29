[Wildberries API TypeScript SDK](../modules.md) / QuestionsResponse

# Interface: QuestionsResponse

Defined in: [types/communications.types.ts:612](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L612)

Response from getQuestions() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `countUnanswered`: `number`; `countArchive`: `number`; `questions`: [`Question`](Question.md)[]; \} | Questions data | [types/communications.types.ts:616](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L616) |
| `data.countUnanswered` | `number` | Count of unanswered questions | [types/communications.types.ts:620](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L620) |
| `data.countArchive` | `number` | Count of answered/archived questions | [types/communications.types.ts:625](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L625) |
| `data.questions` | [`Question`](Question.md)[] | Array of questions | [types/communications.types.ts:630](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L630) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:636](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L636) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [types/communications.types.ts:641](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L641) |
| <a id="additionalerrors"></a> `additionalErrors` | `string`[] \| `null` | Additional errors array | [types/communications.types.ts:646](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L646) |
