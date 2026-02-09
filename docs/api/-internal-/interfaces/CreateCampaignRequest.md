[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CreateCampaignRequest

# Interface: CreateCampaignRequest

Defined in: [types/promotion.types.ts:1420](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1420)

Request to create a campaign

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Campaign name | [types/promotion.types.ts:1422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1422) |
| <a id="nms"></a> `nms` | `number`[] | WB article IDs (nmId), max 50 | [types/promotion.types.ts:1424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1424) |
| <a id="bid_type"></a> `bid_type?` | [`BidType`](../type-aliases/BidType.md) | Bid type: manual or unified | [types/promotion.types.ts:1426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1426) |
| <a id="payment_type"></a> `payment_type?` | `"cpm"` \| `"cpc"` | Payment type: cpm or cpc | [types/promotion.types.ts:1428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1428) |
| <a id="placement_types"></a> `placement_types?` | [`CampaignPlacementType`](../type-aliases/CampaignPlacementType.md)[] | Placement types (only for manual bid campaigns) | [types/promotion.types.ts:1430](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1430) |
