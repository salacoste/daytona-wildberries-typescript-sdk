[Wildberries API TypeScript SDK](../modules.md) / CardDocumentsResponse

# Interface: CardDocumentsResponse

Defined in: [types/products.types.ts:1372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1372)

Documents block of a product card in `getCardsList()` responses.

## Since

4.3.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="items"></a> `items?` | [`CardDocument`](CardDocument.md)[] | Document list | [types/products.types.ts:1374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1374) |
| <a id="overallverdict"></a> `overallVerdict?` | [`CardDocumentsOverallVerdict`](CardDocumentsOverallVerdict.md) | Listing validation result (present once validation is completed) | [types/products.types.ts:1376](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1376) |
| <a id="excludedocuments"></a> `excludeDocuments?` | `boolean` | Whether the documents are excluded from the listing validation: `true` — documents are not validated when checking the listing, `false` — documents are checked when validating the listing. | [types/products.types.ts:1382](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/products.types.ts#L1382) |
