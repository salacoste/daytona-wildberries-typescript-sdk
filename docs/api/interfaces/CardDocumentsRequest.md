[Wildberries API TypeScript SDK](../modules.md) / CardDocumentsRequest

# Interface: CardDocumentsRequest

Defined in: [types/products.types.ts:1218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1218)

Documents block of a product card in create requests
(`createCardsUpload()`, `createUploadAdd()`).

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items?` | [`CardDocumentInput`](CardDocumentInput.md)[] | Document list | [types/products.types.ts:1220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1220) |
| <a id="excludedocuments"></a> `excludeDocuments?` | `boolean` | Whether to exclude the documents from listing validation. - `true` — do NOT check the documents when validating the listing. When `true`, all values passed to `documents` are replaced with empty values. - `false` (default) — check the documents when validating the listing. | [types/products.types.ts:1228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/products.types.ts#L1228) |
