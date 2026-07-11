[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CreateCampaignRequest

# Interface: CreateCampaignRequest

Defined in: [types/promotion.types.ts:1634](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1634)

Request to create a campaign

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Campaign name | [types/promotion.types.ts:1636](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1636) |
| <a id="nms"></a> `nms` | `number`[] | WB article IDs (nmId), max 50 | [types/promotion.types.ts:1638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1638) |
| <a id="bid_type"></a> `bid_type?` | [`BidType`](../type-aliases/BidType.md) | Bid type: manual or unified | [types/promotion.types.ts:1640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1640) |
| <a id="payment_type"></a> `payment_type?` | `"cpm"` \| `"cpc"` | Payment type: cpm or cpc | [types/promotion.types.ts:1642](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1642) |
| <a id="placement_types"></a> `placement_types?` | [`CampaignPlacementType`](../type-aliases/CampaignPlacementType.md)[] | Placement types (only for manual bid campaigns) | [types/promotion.types.ts:1644](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1644) |
