[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Chat

# Interface: Chat

Defined in: [types/communications.types.ts:412](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L412)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID?` | `string` | ID чата | [types/communications.types.ts:414](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L414) |
| <a id="replysign"></a> `replySign?` | `string` | Подпись чата. Требуется при [отправке сообщения](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) | [types/communications.types.ts:416](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L416) |
| <a id="clientid"></a> ~~`clientID?`~~ | `string` | ID покупателя **Deprecated** This field will be removed on February 2. See https://dev.wildberries.ru/release-notes?id=466 | [types/communications.types.ts:421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L421) |
| <a id="clientname"></a> `clientName?` | `string` | Имя покупателя | [types/communications.types.ts:423](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L423) |
| <a id="goodcard"></a> `goodCard?` | [`GoodCard`](GoodCard.md) | - | [types/communications.types.ts:424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L424) |
| <a id="lastmessage"></a> `lastMessage?` | [`LastMessage`](LastMessage.md) | - | [types/communications.types.ts:425](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/communications.types.ts#L425) |
