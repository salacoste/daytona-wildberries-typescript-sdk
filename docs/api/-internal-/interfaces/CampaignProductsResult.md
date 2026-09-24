[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignProductsResult

# Interface: CampaignProductsResult

Defined in: [types/promotion.types.ts:1982](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1982)

Result for a single campaign update

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:1984](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1984) |
| <a id="nms"></a> `nms` | \{ `added`: `number`[]; `deleted`: `number`[]; \} | Product cards result | [types/promotion.types.ts:1986](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1986) |
| `nms.added` | `number`[] | Successfully added product cards | [types/promotion.types.ts:1988](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1988) |
| `nms.deleted` | `number`[] | Successfully deleted product cards | [types/promotion.types.ts:1990](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1990) |
