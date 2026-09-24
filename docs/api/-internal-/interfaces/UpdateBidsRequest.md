[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdateBidsRequest

# Interface: UpdateBidsRequest

Defined in: [types/promotion.types.ts:1725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1725)

Request for updating bids in campaigns (V1 API)

Description: Uses bid_kopecks instead of bid for ставки в копейках.
Max 50 campaigns, max 50 articles per campaign.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="bids"></a> `bids` | [`UpdateBidsCampaign`](UpdateBidsCampaign.md)[] | Bids in campaigns Max items: 50 | [types/promotion.types.ts:1730](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/promotion.types.ts#L1730) |
