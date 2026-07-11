[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Chat

# Interface: Chat

Defined in: [types/communications.types.ts:412](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L412)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID?` | `string` | ID чата | [types/communications.types.ts:414](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L414) |
| <a id="replysign"></a> `replySign?` | `string` | Подпись чата. Требуется при [отправке сообщения](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post). **Deadline 2026-06-04**: WB updated `replySign` format on this date. Values cached before then must be refreshed via `getSellerChats()` to remain valid for send-message after the cutoff. New-format pattern: `<version>:<UUID>:<crypto-signature>` (e.g. `1:1e265a58-...:66f136e9...`). | [types/communications.types.ts:422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L422) |
| <a id="clientname"></a> `clientName?` | `string` | Имя покупателя | [types/communications.types.ts:424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L424) |
| <a id="goodcard"></a> `goodCard?` | [`GoodCard`](GoodCard.md) | - | [types/communications.types.ts:425](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L425) |
| <a id="lastmessage"></a> `lastMessage?` | [`LastMessage`](LastMessage.md) | - | [types/communications.types.ts:426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/communications.types.ts#L426) |
