[Wildberries API TypeScript SDK](../modules.md) / ChatEvent

# Interface: ChatEvent

Defined in: [types/communications.types.ts:249](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L249)

Chat event object
Represents a message or activity in the chat conversation

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatID` | `string` | Chat ID this event belongs to | [types/communications.types.ts:253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L253) |
| <a id="eventid"></a> `eventID` | `string` | Unique event ID | [types/communications.types.ts:258](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L258) |
| <a id="eventtype"></a> `eventType` | `string` | Event type (currently only 'message') | [types/communications.types.ts:263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L263) |
| <a id="isnewchat"></a> `isNewChat` | `boolean` | Indicates if this is a new chat - `false` — existing chat - `true` — new chat (replySign will be available) | [types/communications.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L270) |
| <a id="message"></a> `message?` | [`EventMessage`](EventMessage.md) | Message content and attachments | [types/communications.types.ts:275](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L275) |
| <a id="source"></a> `source` | `string` | Message source platform: - `seller-portal` — seller portal - `seller-public-api` — Chat API - `rusite` — customer portal - `global` — global.wildberries.ru - `ios` — iOS mobile app - `android` — Android mobile app | [types/communications.types.ts:286](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L286) |
| <a id="addtimestamp"></a> `addTimestamp` | `number` | Event timestamp (Unix timestamp with milliseconds) **Example** `1698037340000` | [types/communications.types.ts:292](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L292) |
| <a id="addtime"></a> `addTime` | `string` | Event timestamp in UTC (RFC 3339 format) **Example** `"2023-10-23T05:02:20Z"` | [types/communications.types.ts:298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L298) |
| <a id="replysign"></a> `replySign?` | `string` | Chat signature for sending replies Only available when `isNewChat: true` Use this value as the `replySign` parameter when calling sendMessage() | [types/communications.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L305) |
| <a id="sender"></a> `sender` | `string` | Message sender | [types/communications.types.ts:310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L310) |
| <a id="clientid"></a> `clientID` | `string` | Customer ID | [types/communications.types.ts:315](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L315) |
| <a id="clientname"></a> `clientName` | `string` | Customer name | [types/communications.types.ts:320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/17d124072ec8ce05556cbc693317b0cf345b0fe9/src/types/communications.types.ts#L320) |
