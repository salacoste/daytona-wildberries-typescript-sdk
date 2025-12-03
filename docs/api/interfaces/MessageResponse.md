[Wildberries API TypeScript SDK](../modules.md) / MessageResponse

# Interface: MessageResponse

Defined in: [types/communications.types.ts:373](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L373)

Response from sendMessage() method

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="result"></a> `result` | \{ `addTime`: `number`; `chatID`: `string`; \} | Message send result | [types/communications.types.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L377) |
| `result.addTime` | `number` | Message upload timestamp (Unix timestamp with milliseconds) | [types/communications.types.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L381) |
| `result.chatID` | `string` | Chat ID where message was sent | [types/communications.types.ts:386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L386) |
| <a id="errors"></a> `errors` | `string`[] | File upload errors, if any | [types/communications.types.ts:392](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/communications.types.ts#L392) |
