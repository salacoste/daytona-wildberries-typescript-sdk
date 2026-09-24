[Wildberries API TypeScript SDK](../modules.md) / CardUpdateDocumentsRequest

# Interface: CardUpdateDocumentsRequest

Defined in: [types/products.types.ts:1179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1179)

Documents block of a product card in update requests (`createCardsUpdate()`).

Card update overwrites the card: pass the full document list, including
unchanged documents.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items?` | [`CardUpdateDocumentInput`](CardUpdateDocumentInput.md)[] | Document list. Include ALL documents (update overwrites the card) | [types/products.types.ts:1181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1181) |
| <a id="excludedocuments"></a> `excludeDocuments?` | `boolean` | Whether to exclude the documents from listing validation. - `true` — do NOT check the documents when validating the listing. When `true`, all values passed to `documents` are replaced with empty values. - `false` (default) — check the documents when validating the listing. | [types/products.types.ts:1189](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1189) |
