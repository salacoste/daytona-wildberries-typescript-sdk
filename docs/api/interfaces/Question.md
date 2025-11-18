[Wildberries API TypeScript SDK](../modules.md) / Question

# Interface: Question

Defined in: [types/communications.types.ts:565](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L565)

Customer question object

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Question ID | [types/communications.types.ts:569](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L569) |
| <a id="text"></a> `text` | `string` | Question text from customer | [types/communications.types.ts:574](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L574) |
| <a id="createddate"></a> `createdDate` | `string` | Question creation timestamp (ISO 8601) **Example** `"2022-02-01T11:18:08.769513469Z"` | [types/communications.types.ts:580](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L580) |
| <a id="state"></a> `state` | `string` | Question state/status | [types/communications.types.ts:585](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L585) |
| <a id="answer"></a> `answer` | [`QuestionAnswer`](QuestionAnswer.md) \| `null` | Answer to question (null if not answered) | [types/communications.types.ts:590](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L590) |
| <a id="productdetails"></a> `productDetails` | [`QuestionProductDetails`](QuestionProductDetails.md) | Product information | [types/communications.types.ts:595](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L595) |
| <a id="wasviewed"></a> `wasViewed` | `boolean` | Whether seller has viewed the question | [types/communications.types.ts:600](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L600) |
| <a id="iswarned"></a> `isWarned` | `boolean` | Whether question is suspicious If `true`, question is published but marked with warning banner | [types/communications.types.ts:606](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e9a5b5746e4bd889fa580540a16016136d556bb4/src/types/communications.types.ts#L606) |
