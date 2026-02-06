[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Event

# Interface: Event

Defined in: [types/communications.types.ts:489](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L489)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID?` | `string` | ID чата | [types/communications.types.ts:491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L491) |
| <a id="eventid"></a> `eventID?` | `string` | ID события | [types/communications.types.ts:493](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L493) |
| <a id="eventtype"></a> `eventType?` | `"message"` | - | [types/communications.types.ts:494](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L494) |
| <a id="isnewchat"></a> `isNewChat?` | `boolean` | Признак нового чата: - `false` — чат не новый - `true` — чат новый | [types/communications.types.ts:496](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L496) |
| <a id="message"></a> `message?` | \{ `attachments?`: [`EventAttachments`](EventAttachments.md); `text?`: `string`; \} | Данные сообщения | [types/communications.types.ts:498](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L498) |
| `message.attachments?` | [`EventAttachments`](EventAttachments.md) | - | [types/communications.types.ts:499](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L499) |
| `message.text?` | `string` | Текст сообщения | [types/communications.types.ts:501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L501) |
| <a id="source"></a> `source?` | `string` | Источник отправки сообщения: - `seller-portal` — портал продавцов - `seller-public-api` — API Чата с покупателями - `rusite` — портал покупателей - `global` — портал `global.wildberries.ru` - `ios` — мобильная операционная система от **Apple** - `android` — операционная система **Android** от **Google** | [types/communications.types.ts:504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L504) |
| <a id="addtimestamp"></a> `addTimestamp?` | `number` | Время появления события на сервере. Формат Unix timestamp | [types/communications.types.ts:506](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L506) |
| <a id="addtime"></a> `addTime?` | `string` | Время появления события на сервере в UTC | [types/communications.types.ts:508](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L508) |
| <a id="replysign"></a> `replySign?` | `string` | Подпись чата. Доступна только при `"isNewChat": true`. Требуется при [отправке сообщения](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) | [types/communications.types.ts:510](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L510) |
| <a id="sender"></a> `sender?` | [`Sender`](../type-aliases/Sender.md) | - | [types/communications.types.ts:511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L511) |
| <a id="clientid"></a> ~~`clientID?`~~ | `string` | ID покупателя **Deprecated** This field will be removed on February 2. See https://dev.wildberries.ru/release-notes?id=466 | [types/communications.types.ts:516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L516) |
| <a id="clientname"></a> `clientName?` | `string` | Имя покупателя | [types/communications.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/communications.types.ts#L518) |
