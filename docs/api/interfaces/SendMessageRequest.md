[Wildberries API TypeScript SDK](../modules.md) / SendMessageRequest

# Interface: SendMessageRequest

Defined in: [types/communications.types.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L399)

Request parameters for sendMessage() method
Note: This is sent as multipart/form-data, not JSON

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="replysign"></a> `replySign` | `string` | Chat signature (required) Obtain from Chat.replySign or Event.replySign (when isNewChat=true) | [types/communications.types.ts:404](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L404) |
| <a id="message"></a> `message?` | `string` | Message text (optional, max 1000 characters) At least one of message or file must be provided | [types/communications.types.ts:410](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L410) |
| <a id="files"></a> `files?` | `File`[] \| `Blob`[] | File attachments (optional) Formats: JPEG, PDF, PNG Max size: 5MB per file, 30MB total | [types/communications.types.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e489d60aa973819253de599d3b809e1bb914db5/src/types/communications.types.ts#L417) |
