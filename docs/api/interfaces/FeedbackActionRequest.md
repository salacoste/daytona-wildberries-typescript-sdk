[Wildberries API TypeScript SDK](../modules.md) / FeedbackActionRequest

# Interface: FeedbackActionRequest

Defined in: [types/communications.types.ts:3787](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3787)

Request for reportFeedbackAction() method
Submit complaint or report product issue

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Feedback ID (required) **Example** `"J2FMRjUj6hwvwCElqssz"` | [types/communications.types.ts:3792](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3792) |
| <a id="supplierfeedbackvaluation"></a> `supplierFeedbackValuation?` | `number` | Complaint reason for feedback (optional) Use values 1-7 from supplier-valuations API feedbackValuations **Example** `1 for "Отзыв не относится к товару"` | [types/communications.types.ts:3799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3799) |
| <a id="supplierproductvaluation"></a> `supplierProductValuation?` | `number` | Product issue type (optional) Use values 1-4 from supplier-valuations API productValuations **Example** `1 for "Повредили при доставке"` | [types/communications.types.ts:3806](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3806) |
