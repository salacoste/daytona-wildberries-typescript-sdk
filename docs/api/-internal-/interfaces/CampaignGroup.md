[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignGroup

# Interface: CampaignGroup

Defined in: [types/promotion.types.ts:1483](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1483)

Campaign group by type/status in count response

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | `8` \| `9` | Campaign type: 8 - unified bid (deprecated), 9 - manual/unified bid | [types/promotion.types.ts:1485](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1485) |
| <a id="status"></a> `status` | `-1` \| `4` \| `7` \| `8` \| `9` \| `11` | Campaign status: -1, 4, 7, 8, 9, 11 | [types/promotion.types.ts:1487](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1487) |
| <a id="count"></a> `count` | `number` | Number of campaigns in this group | [types/promotion.types.ts:1489](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1489) |
| <a id="advert_list"></a> `advert_list` | [`CampaignListItem`](CampaignListItem.md)[] | List of campaigns | [types/promotion.types.ts:1491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/promotion.types.ts#L1491) |
