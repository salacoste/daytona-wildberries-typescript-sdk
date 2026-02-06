[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Chat

# Interface: Chat

Defined in: [types/communications.types.ts:467](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/communications.types.ts#L467)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID?` | `string` | ID чата | [types/communications.types.ts:469](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/communications.types.ts#L469) |
| <a id="replysign"></a> `replySign?` | `string` | Подпись чата. Требуется при [отправке сообщения](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) | [types/communications.types.ts:471](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/communications.types.ts#L471) |
| <a id="clientid"></a> ~~`clientID?`~~ | `string` | ID покупателя **Deprecated** This field will be removed on February 2. See https://dev.wildberries.ru/release-notes?id=466 | [types/communications.types.ts:476](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/communications.types.ts#L476) |
| <a id="clientname"></a> `clientName?` | `string` | Имя покупателя | [types/communications.types.ts:478](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/communications.types.ts#L478) |
| <a id="goodcard"></a> `goodCard?` | [`GoodCard`](GoodCard.md) | - | [types/communications.types.ts:479](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/communications.types.ts#L479) |
| <a id="lastmessage"></a> `lastMessage?` | [`LastMessage`](LastMessage.md) | - | [types/communications.types.ts:480](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/communications.types.ts#L480) |
