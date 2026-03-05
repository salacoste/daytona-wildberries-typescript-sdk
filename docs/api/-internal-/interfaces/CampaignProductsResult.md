[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignProductsResult

# Interface: CampaignProductsResult

Defined in: [types/promotion.types.ts:1739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/promotion.types.ts#L1739)

Result for a single campaign update

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:1741](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/promotion.types.ts#L1741) |
| <a id="nms"></a> `nms` | \{ `added`: `number`[]; `deleted`: `number`[]; \} | Product cards result | [types/promotion.types.ts:1743](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/promotion.types.ts#L1743) |
| `nms.added` | `number`[] | Successfully added product cards | [types/promotion.types.ts:1745](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/promotion.types.ts#L1745) |
| `nms.deleted` | `number`[] | Successfully deleted product cards | [types/promotion.types.ts:1747](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/f33cca8a1792d786fe787b1fb250794525b23c92/src/types/promotion.types.ts#L1747) |
