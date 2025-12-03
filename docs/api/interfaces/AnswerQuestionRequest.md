[Wildberries API TypeScript SDK](../modules.md) / AnswerQuestionRequest

# Interface: AnswerQuestionRequest

Defined in: [types/communications.types.ts:653](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L653)

Request payload for answering a question
Used internally by answerQuestion() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Question ID | [types/communications.types.ts:657](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L657) |
| <a id="answer"></a> `answer` | \{ `text`: `string`; \} | Answer object | [types/communications.types.ts:662](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L662) |
| `answer.text` | `string` | Answer text | [types/communications.types.ts:666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L666) |
| <a id="state"></a> `state` | `"none"` \| `"wbRu"` | Question state after answer - `none` — reject question (not visible to customers) - `wbRu` — answer visible to customers | [types/communications.types.ts:674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L674) |
