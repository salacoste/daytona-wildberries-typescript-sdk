[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdateBidsArticle

# Interface: UpdateBidsArticle

Defined in: [types/promotion.types.ts:1638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/promotion.types.ts#L1638)

Article bid configuration in kopecks

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nm_id"></a> `nm_id` | `number` | WB Article ID (nm_id) | [types/promotion.types.ts:1640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/promotion.types.ts#L1640) |
| <a id="bid_kopecks"></a> `bid_kopecks` | `number` | Bid amount in KOPECKS (not rubles!) Ставка в копейках. Пример: 250 = 2.50 RUB Conversion examples: - 1.00 RUB = 100 kopecks - 2.50 RUB = 250 kopecks - 15.00 RUB = 1500 kopecks | [types/promotion.types.ts:1651](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/promotion.types.ts#L1651) |
| <a id="placement"></a> `placement` | `"search"` \| `"recommendations"` \| `"combined"` | Placement type: - "search" - for search placement (manual bidding campaigns) - "recommendations" - for recommendations placement (manual bidding campaigns) - "combined" - for both search and recommendations (unified bidding campaigns) | [types/promotion.types.ts:1658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/47e6cd0a15f4afb7e933a7645f2e21ec9e1ab7ba/src/types/promotion.types.ts#L1658) |
