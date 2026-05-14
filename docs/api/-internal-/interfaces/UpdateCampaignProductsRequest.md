[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdateCampaignProductsRequest

# Interface: UpdateCampaignProductsRequest

Defined in: [types/promotion.types.ts:1701](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/promotion.types.ts#L1701)

Request for adding/removing products from campaigns

Description: Only for Type 9 campaigns.
Max 20 campaigns, max 50 products per campaign.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="campaigns"></a> `campaigns` | [`CampaignProductsUpdate`](CampaignProductsUpdate.md)[] | Campaigns to update Max items: 20 | [types/promotion.types.ts:1706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/promotion.types.ts#L1706) |
