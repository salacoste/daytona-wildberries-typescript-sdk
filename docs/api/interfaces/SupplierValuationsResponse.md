[Wildberries API TypeScript SDK](../modules.md) / SupplierValuationsResponse

# Interface: SupplierValuationsResponse

Defined in: [types/communications.types.ts:3744](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3744)

Response from getSupplierValuations() method
Returns complaint reasons and product issue types

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data` | \{ `feedbackValuations`: `Record`\<`string`, `string`\>; `productValuations`: `Record`\<`string`, `string`\>; \} | Valuations data | [types/communications.types.ts:3748](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3748) |
| `data.feedbackValuations` | `Record`\<`string`, `string`\> | Complaint reasons for feedbacks (key = reason ID, value = description) Keys: 1-7 (API reasons), 11-20 (portal reasons) **Example** `{ "1": "Отзыв не относится к товару", "3": "Спам" }` | [types/communications.types.ts:3754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3754) |
| `data.productValuations` | `Record`\<`string`, `string`\> | Product issue types (key = issue ID, value = description) **Example** `{ "1": "Повредили при доставке", "2": "Товар подменили" }` | [types/communications.types.ts:3760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3760) |
| <a id="error"></a> `error` | `boolean` | Whether there was an error | [types/communications.types.ts:3766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3766) |
| <a id="errortext"></a> `errorText` | `string` | Error description text | [types/communications.types.ts:3771](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3771) |
| <a id="additionalerrors"></a> `additionalErrors` | `string`[] \| `null` | Additional errors array | [types/communications.types.ts:3776](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L3776) |
