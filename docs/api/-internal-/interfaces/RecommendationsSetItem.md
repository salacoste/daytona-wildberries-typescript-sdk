[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RecommendationsSetItem

# Interface: RecommendationsSetItem

Defined in: [types/promotion.types.ts:2201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2201)

A recommended-items assignment for one product card (`/set` request item).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | WB item number of the product whose recommendations are being set. | [types/promotion.types.ts:2203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2203) |
| <a id="tagsids"></a> `tagsIDs` | `number`[] | WB item numbers to display as recommendations for this product. Send an empty array to clear the product's recommendations. | [types/promotion.types.ts:2206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2206) |
