[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdateBidsArticle

# Interface: UpdateBidsArticle

Defined in: [types/promotion.types.ts:1749](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1749)

Article bid configuration in kopecks

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nm_id"></a> `nm_id` | `number` | WB Article ID (nm_id) | [types/promotion.types.ts:1751](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1751) |
| <a id="bid_kopecks"></a> `bid_kopecks` | `number` | Bid amount in KOPECKS (not rubles!) Ставка в копейках. Пример: 250 = 2.50 RUB Conversion examples: - 1.00 RUB = 100 kopecks - 2.50 RUB = 250 kopecks - 15.00 RUB = 1500 kopecks | [types/promotion.types.ts:1762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1762) |
| <a id="placement"></a> `placement` | `"combined"` \| `"search"` \| `"recommendations"` | Placement type: - "search" - for search placement (manual bidding campaigns) - "recommendations" - for recommendations placement (manual bidding campaigns) - "combined" - for both search and recommendations (unified bidding campaigns) | [types/promotion.types.ts:1769](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1769) |
