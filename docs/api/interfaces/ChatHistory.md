[Wildberries API TypeScript SDK](../modules.md) / ChatHistory

# Interface: ChatHistory

Defined in: [types/communications.types.ts:2697](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2697)

Chat history with pagination and filtering

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="chatid"></a> `chatId` | `string` | Chat ID | [types/communications.types.ts:2701](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2701) |
| <a id="messages"></a> `messages` | [`ChatMessage`](ChatMessage.md)[] | Array of chat messages in chronological order | [types/communications.types.ts:2706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2706) |
| <a id="totalmessages"></a> `totalMessages` | `number` | Total number of messages in chat | [types/communications.types.ts:2711](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2711) |
| <a id="offset"></a> `offset` | `number` | Current page offset | [types/communications.types.ts:2716](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2716) |
| <a id="limit"></a> `limit` | `number` | Limit applied to this request | [types/communications.types.ts:2721](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2721) |
| <a id="hasmore"></a> `hasMore` | `boolean` | Whether more messages are available | [types/communications.types.ts:2726](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2726) |
| <a id="chat"></a> `chat` | [`ChatDetails`](ChatDetails.md) | Chat details summary | [types/communications.types.ts:2731](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2731) |
| <a id="pagination"></a> `pagination?` | \{ `nextOffset?`: `number`; `prevOffset?`: `number`; `currentPage`: `number`; `totalPages`: `number`; \} | Pagination metadata | [types/communications.types.ts:2736](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2736) |
| `pagination.nextOffset?` | `number` | Next page offset (if available) | [types/communications.types.ts:2740](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2740) |
| `pagination.prevOffset?` | `number` | Previous page offset (if available) | [types/communications.types.ts:2745](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2745) |
| `pagination.currentPage` | `number` | Current page number | [types/communications.types.ts:2750](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2750) |
| `pagination.totalPages` | `number` | Total number of pages | [types/communications.types.ts:2755](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2755) |
