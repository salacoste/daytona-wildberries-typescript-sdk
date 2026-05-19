[Wildberries API TypeScript SDK](../modules.md) / SellerMessageRequest

# Interface: SellerMessageRequest

Defined in: [types/communications.types.ts:574](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L574)

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
| <a id="replysign"></a> `replySign` | `string` | Chat signature from `getSellerChats()` (preferred) or from `getSellerEvents()` when `isNewChat: true`. Format `<version>:<UUID>:<crypto-signature>` (~135 chars). **Hard deadline 2026-06-04**: old-format values rejected by WB API. | [types/communications.types.ts:581](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L581) |
| <a id="message"></a> `message?` | `string` | Message text. Max 1000 UTF-16 code units (BMP characters count as 1; surrogate-pair emoji count as 2). For most plain text and Cyrillic content this matches char count. | [types/communications.types.ts:586](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L586) |
| <a id="file"></a> `file?` | ( \| `Blob` \| \{ `filename`: `string`; `content`: `Buffer`; \})[] | Attachment files. Each ≤ 5MB; total ≤ 30MB. Formats: JPEG, PDF, PNG. Accept either `Blob` (browser/Node 18+ global) or `Buffer` (Node-only legacy) with a filename hint via tuple shape. The SDK normalizes both to FormData. | [types/communications.types.ts:593](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/communications.types.ts#L593) |
