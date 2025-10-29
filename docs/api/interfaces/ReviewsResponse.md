[Wildberries API TypeScript SDK](../modules.md) / ReviewsResponse

# Interface: ReviewsResponse

Defined in: [types/communications.types.ts:1050](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1050)

Response from getReviews() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `countUnanswered`: `number`; `countArchive`: `number`; `feedbacks`: [`Review`](Review.md)[]; \} | Reviews data | [types/communications.types.ts:1054](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1054) |
| `data.countUnanswered` | `number` | Count of unanswered/unprocessed reviews | [types/communications.types.ts:1058](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1058) |
| `data.countArchive` | `number` | Count of answered/processed reviews | [types/communications.types.ts:1063](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1063) |
| `data.feedbacks` | [`Review`](Review.md)[] | Array of customer reviews | [types/communications.types.ts:1068](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1068) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:1074](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1074) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [types/communications.types.ts:1079](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1079) |
| <a id="additionalerrors"></a> `additionalErrors` | `string`[] \| `null` | Additional errors array | [types/communications.types.ts:1084](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L1084) |
