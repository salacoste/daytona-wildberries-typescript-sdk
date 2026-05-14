[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdateBidsRequest

# Interface: UpdateBidsRequest

Defined in: [types/promotion.types.ts:1614](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1614)

Request for updating bids in campaigns (V1 API)

Description: Uses bid_kopecks instead of bid for ставки в копейках.
Max 50 campaigns, max 50 articles per campaign.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="bids"></a> `bids` | [`UpdateBidsCampaign`](UpdateBidsCampaign.md)[] | Bids in campaigns Max items: 50 | [types/promotion.types.ts:1619](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1619) |
