[Wildberries API TypeScript SDK](../modules.md) / SellerMessageRequest

# Interface: SellerMessageRequest

Defined in: [types/communications.types.ts:552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/communications.types.ts#L552)

Request body for [CommunicationsModule.createSellerMessage](../classes/CommunicationsModule.md#createsellermessage).

Multipart/form-data — the SDK builds the FormData internally from these fields.

**Deadline 2026-06-04**: WB API now requires the NEW format of `replySign`
(pattern `<version>:<UUID>:<signature>`). Old-format values are rejected with HTTP 400.
Refresh `replySign` via [CommunicationsModule.getSellerChats](../classes/CommunicationsModule.md#getsellerchats) before each send.

## Since

3.13.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="replysign"></a> `replySign` | `string` | Chat signature from `getSellerChats()` (preferred) or from `getSellerEvents()` when `isNewChat: true`. Format `<version>:<UUID>:<crypto-signature>` (~135 chars). **Hard deadline 2026-06-04**: old-format values rejected by WB API. | [types/communications.types.ts:559](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/communications.types.ts#L559) |
| <a id="message"></a> `message?` | `string` | Message text. Max 1000 UTF-16 code units (BMP characters count as 1; surrogate-pair emoji count as 2). For most plain text and Cyrillic content this matches char count. | [types/communications.types.ts:564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/communications.types.ts#L564) |
| <a id="file"></a> `file?` | ( \| `Blob` \| \{ `filename`: `string`; `content`: `Uint8Array`; \})[] | Attachment files. Each ≤ 5MB; total ≤ 30MB. Formats: JPEG, PDF, PNG. Accept either `Blob` or a `Uint8Array` with a filename hint via tuple shape. Node.js `Buffer` is supported because it extends `Uint8Array`. | [types/communications.types.ts:571](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/communications.types.ts#L571) |
