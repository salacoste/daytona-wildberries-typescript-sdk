[Wildberries API TypeScript SDK](../modules.md) / ArchivedFeedbacksResponse

# Interface: ArchivedFeedbacksResponse

Defined in: [types/communications.types.ts:3844](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3844)

Response from getArchivedFeedbacks() method
Same structure as ReviewsResponse but with archived feedbacks

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `feedbacks`: [`Review`](Review.md)[]; \} | Archived feedbacks data | [types/communications.types.ts:3848](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3848) |
| `data.feedbacks` | [`Review`](Review.md)[] | Array of archived feedbacks | [types/communications.types.ts:3852](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3852) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:3858](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3858) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [types/communications.types.ts:3863](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3863) |
| <a id="additionalerrors"></a> `additionalErrors` | `string`[] \| `null` | Additional errors array | [types/communications.types.ts:3868](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3868) |
