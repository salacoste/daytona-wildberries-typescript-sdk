[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / Event

# Interface: Event

Defined in: [types/communications.types.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L202)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID?` | `string` | ID чата | [types/communications.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L204) |
| <a id="eventid"></a> `eventID?` | `string` | ID события | [types/communications.types.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L206) |
| <a id="eventtype"></a> `eventType?` | `"message"` | - | [types/communications.types.ts:207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L207) |
| <a id="isnewchat"></a> `isNewChat?` | `boolean` | Признак нового чата: - `false` — чат не новый - `true` — чат новый | [types/communications.types.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L209) |
| <a id="message"></a> `message?` | \{ `attachments?`: [`EventAttachments`](EventAttachments.md); `text?`: `string`; \} | Данные сообщения | [types/communications.types.ts:211](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L211) |
| `message.attachments?` | [`EventAttachments`](EventAttachments.md) | - | [types/communications.types.ts:212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L212) |
| `message.text?` | `string` | Текст сообщения | [types/communications.types.ts:214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L214) |
| <a id="source"></a> `source?` | `string` | Источник отправки сообщения: - `seller-portal` — портал продавцов - `seller-public-api` — API Чата с покупателями - `rusite` — портал покупателей - `global` — портал `global.wildberries.ru` - `ios` — мобильная операционная система от **Apple** - `android` — операционная система **Android** от **Google** | [types/communications.types.ts:217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L217) |
| <a id="addtimestamp"></a> `addTimestamp?` | `number` | Время появления события на сервере. Формат Unix timestamp | [types/communications.types.ts:219](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L219) |
| <a id="addtime"></a> `addTime?` | `string` | Время появления события на сервере в UTC | [types/communications.types.ts:221](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L221) |
| <a id="replysign"></a> `replySign?` | `string` | Подпись чата. Доступна только при `"isNewChat": true`. Требуется при [отправке сообщения](./user-communication#tag/Chat-s-pokupatelyami/paths/~1api~1v1~1seller~1message/post) | [types/communications.types.ts:223](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L223) |
| <a id="sender"></a> `sender?` | [`Sender`](../type-aliases/Sender.md) | - | [types/communications.types.ts:224](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L224) |
| <a id="clientid"></a> `clientID?` | `string` | ID покупателя | [types/communications.types.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L226) |
| <a id="clientname"></a> `clientName?` | `string` | Имя покупателя | [types/communications.types.ts:228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/communications.types.ts#L228) |
