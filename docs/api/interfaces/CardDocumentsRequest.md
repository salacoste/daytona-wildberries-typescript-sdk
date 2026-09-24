[Wildberries API TypeScript SDK](../modules.md) / CardDocumentsRequest

# Interface: CardDocumentsRequest

Defined in: [types/products.types.ts:1144](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1144)

Documents block of a product card in create requests
(`createCardsUpload()`, `createUploadAdd()`).

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items?` | [`CardDocumentInput`](CardDocumentInput.md)[] | Document list | [types/products.types.ts:1146](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1146) |
| <a id="excludedocuments"></a> `excludeDocuments?` | `boolean` | Whether to exclude the documents from listing validation. - `true` — do NOT check the documents when validating the listing. When `true`, all values passed to `documents` are replaced with empty values. - `false` (default) — check the documents when validating the listing. | [types/products.types.ts:1154](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1154) |
