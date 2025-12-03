[Wildberries API TypeScript SDK](../modules.md) / ChatMessage

# Interface: ChatMessage

Defined in: [types/communications.types.ts:2477](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2477)

Chat message with enhanced details

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Message ID | [types/communications.types.ts:2481](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2481) |
| <a id="text"></a> `text?` | `string` | Message text content | [types/communications.types.ts:2486](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2486) |
| <a id="createdat"></a> `createdAt` | `string` | Message timestamp (ISO 8601) | [types/communications.types.ts:2491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2491) |
| <a id="sender"></a> `sender` | `"client"` \| `"seller"` \| `"system"` | Message sender | [types/communications.types.ts:2496](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2496) |
| <a id="sendername"></a> `senderName?` | `string` | Sender name (for client messages) | [types/communications.types.ts:2501](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2501) |
| <a id="read"></a> `read` | `boolean` | Whether message has been read | [types/communications.types.ts:2506](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2506) |
| <a id="type"></a> `type` | `"text"` \| `"system"` \| `"file"` \| `"image"` | Message type | [types/communications.types.ts:2511](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2511) |
| <a id="attachments"></a> `attachments?` | [`ChatAttachment`](ChatAttachment.md)[] | File attachments (if any) | [types/communications.types.ts:2516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2516) |
| <a id="metadata"></a> `metadata?` | `Record`\<`string`, `unknown`\> | Message metadata | [types/communications.types.ts:2521](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L2521) |
