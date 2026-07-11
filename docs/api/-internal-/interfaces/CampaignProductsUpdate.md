[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignProductsUpdate

# Interface: CampaignProductsUpdate

Defined in: [types/promotion.types.ts:1938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1938)

Single campaign update item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:1940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1940) |
| <a id="add_nms"></a> `add_nms?` | `number`[] | WB article IDs to add For added products, the current minimum bid is set. Max items: 50 | [types/promotion.types.ts:1946](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1946) |
| <a id="delete_nms"></a> `delete_nms?` | `number`[] | WB article IDs to delete Max items: 50 | [types/promotion.types.ts:1951](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1951) |
