[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignProductsResult

# Interface: CampaignProductsResult

Defined in: [types/promotion.types.ts:1965](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1965)

Result for a single campaign update

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:1967](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1967) |
| <a id="nms"></a> `nms` | \{ `added`: `number`[]; `deleted`: `number`[]; \} | Product cards result | [types/promotion.types.ts:1969](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1969) |
| `nms.added` | `number`[] | Successfully added product cards | [types/promotion.types.ts:1971](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1971) |
| `nms.deleted` | `number`[] | Successfully deleted product cards | [types/promotion.types.ts:1973](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1973) |
