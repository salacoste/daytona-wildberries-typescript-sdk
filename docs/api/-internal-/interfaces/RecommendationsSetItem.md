[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / RecommendationsSetItem

# Interface: RecommendationsSetItem

Defined in: [types/promotion.types.ts:2252](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2252)

A recommended-items assignment for one product card (`/set` request item).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmID` | `number` | WB item number of the product whose recommendations are being set. | [types/promotion.types.ts:2254](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2254) |
| <a id="tagsids"></a> `tagsIDs` | `number`[] | WB item numbers to display as recommendations for this product. Send an empty array to clear the product's recommendations. | [types/promotion.types.ts:2257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L2257) |
