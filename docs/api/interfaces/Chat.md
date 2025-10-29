[Wildberries API TypeScript SDK](../modules.md) / Chat

# Interface: Chat

Defined in: [types/communications.types.ts:76](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L76)

Chat conversation object

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID` | `string` | Chat ID **Example** `"1:4019cd7d-cca8-4e90-8b11-f78afbea42e3"` | [types/communications.types.ts:81](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L81) |
| <a id="replysign"></a> `replySign` | `string` | Chat signature required for sending messages Use this value as the `replySign` parameter when calling sendMessage() **Example** `"1:4019cd7d-cca8-4e90-8b11-f78afbea42e3:54828159:bc3a4c04079f5956cff170b25e73523aa1208b5c0bd7aea1e520a64ae3e212b1ebae6712661f3afd27520fa785fa3042254e8a3100ce00644322054ae7cfcd0e"` | [types/communications.types.ts:88](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L88) |
| <a id="clientid"></a> `clientID` | `string` | Customer ID **Example** `"123456"` | [types/communications.types.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L94) |
| <a id="clientname"></a> `clientName` | `string` | Customer name **Example** `"Иван"` | [types/communications.types.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L100) |
| <a id="goodcard"></a> `goodCard?` | [`GoodCard`](GoodCard.md) | Order information associated with the chat | [types/communications.types.ts:105](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/communications.types.ts#L105) |
