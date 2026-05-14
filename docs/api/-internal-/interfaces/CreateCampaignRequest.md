[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CreateCampaignRequest

# Interface: CreateCampaignRequest

Defined in: [types/promotion.types.ts:1523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1523)

Request to create a campaign

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Campaign name | [types/promotion.types.ts:1525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1525) |
| <a id="nms"></a> `nms` | `number`[] | WB article IDs (nmId), max 50 | [types/promotion.types.ts:1527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1527) |
| <a id="bid_type"></a> `bid_type?` | [`BidType`](../type-aliases/BidType.md) | Bid type: manual or unified | [types/promotion.types.ts:1529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1529) |
| <a id="payment_type"></a> `payment_type?` | `"cpm"` \| `"cpc"` | Payment type: cpm or cpc | [types/promotion.types.ts:1531](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1531) |
| <a id="placement_types"></a> `placement_types?` | [`CampaignPlacementType`](../type-aliases/CampaignPlacementType.md)[] | Placement types (only for manual bid campaigns) | [types/promotion.types.ts:1533](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1533) |
