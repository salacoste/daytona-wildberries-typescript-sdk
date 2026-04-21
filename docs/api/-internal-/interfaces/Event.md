[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Event

# Interface: Event

Defined in: [types/communications.types.ts:434](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L434)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID?` | `string` | ID чата | [types/communications.types.ts:436](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L436) |
| <a id="eventid"></a> `eventID?` | `string` | ID события | [types/communications.types.ts:438](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L438) |
| <a id="eventtype"></a> `eventType?` | `"message"` | - | [types/communications.types.ts:439](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L439) |
| <a id="isnewchat"></a> `isNewChat?` | `boolean` | Признак нового чата: - `false` — чат не новый - `true` — чат новый | [types/communications.types.ts:441](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L441) |
| <a id="message"></a> `message?` | \{ `attachments?`: [`EventAttachments`](EventAttachments.md); `text?`: `string`; \} | Данные сообщения | [types/communications.types.ts:443](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L443) |
| `message.attachments?` | [`EventAttachments`](EventAttachments.md) | - | [types/communications.types.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L444) |
| `message.text?` | `string` | Текст сообщения | [types/communications.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L446) |
| <a id="source"></a> `source?` | `string` | Источник отправки сообщения: - `seller-portal` — портал продавцов - `seller-public-api` — API Чата с покупателями - `rusite` — портал покупателей - `global` — портал `global.wildberries.ru` - `ios` — мобильная операционная система от **Apple** - `android` — операционная система **Android** от **Google** | [types/communications.types.ts:449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L449) |
| <a id="addtimestamp"></a> `addTimestamp?` | `number` | Время появления события на сервере. Формат Unix timestamp | [types/communications.types.ts:451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L451) |
| <a id="addtime"></a> `addTime?` | `string` | Время появления события на сервере в UTC | [types/communications.types.ts:453](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L453) |
| <a id="replysign"></a> `replySign?` | `string` | Подпись чата. Доступна только при `"isNewChat": true`. Требуется при [отправке сообщения](https://dev.wildberries.ru/openapi/user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) | [types/communications.types.ts:455](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L455) |
| <a id="sender"></a> `sender?` | [`Sender`](../type-aliases/Sender.md) | - | [types/communications.types.ts:456](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L456) |
| <a id="clientid"></a> ~~`clientID?`~~ | `string` | ID покупателя **Deprecated** This field will be removed on February 2. See https://dev.wildberries.ru/release-notes?id=466 | [types/communications.types.ts:461](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L461) |
| <a id="clientname"></a> `clientName?` | `string` | Имя покупателя | [types/communications.types.ts:463](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/communications.types.ts#L463) |
