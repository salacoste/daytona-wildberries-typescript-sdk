[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignProductsUpdate

# Interface: CampaignProductsUpdate

Defined in: [types/promotion.types.ts:1712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/promotion.types.ts#L1712)

Single campaign update item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:1714](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/promotion.types.ts#L1714) |
| <a id="add_nms"></a> `add_nms?` | `number`[] | WB article IDs to add For added products, the current minimum bid is set. **Max Items** 50 | [types/promotion.types.ts:1720](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/promotion.types.ts#L1720) |
| <a id="delete_nms"></a> `delete_nms?` | `number`[] | WB article IDs to delete **Max Items** 50 | [types/promotion.types.ts:1725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b2f9d17827bf5ad646628b55ed6f80450116a4ca/src/types/promotion.types.ts#L1725) |
