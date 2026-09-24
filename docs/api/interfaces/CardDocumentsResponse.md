[Wildberries API TypeScript SDK](../modules.md) / CardDocumentsResponse

# Interface: CardDocumentsResponse

Defined in: [types/products.types.ts:1298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1298)

Documents block of a product card in `getCardsList()` responses.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items?` | [`CardDocument`](CardDocument.md)[] | Document list | [types/products.types.ts:1300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1300) |
| <a id="overallverdict"></a> `overallVerdict?` | [`CardDocumentsOverallVerdict`](CardDocumentsOverallVerdict.md) | Listing validation result (present once validation is completed) | [types/products.types.ts:1302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1302) |
| <a id="excludedocuments"></a> `excludeDocuments?` | `boolean` | Whether the documents are excluded from the listing validation: `true` — documents are not validated when checking the listing, `false` — documents are checked when validating the listing. | [types/products.types.ts:1308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/products.types.ts#L1308) |
