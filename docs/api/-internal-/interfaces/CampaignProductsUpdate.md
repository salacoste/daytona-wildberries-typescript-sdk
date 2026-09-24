[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignProductsUpdate

# Interface: CampaignProductsUpdate

Defined in: [types/promotion.types.ts:1955](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1955)

Single campaign update item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:1957](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1957) |
| <a id="add_nms"></a> `add_nms?` | `number`[] | WB article IDs to add For added products, the current minimum bid is set. Max items: 50 | [types/promotion.types.ts:1963](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1963) |
| <a id="delete_nms"></a> `delete_nms?` | `number`[] | WB article IDs to delete Max items: 50 | [types/promotion.types.ts:1968](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1968) |
