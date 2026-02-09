[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignGroup

# Interface: CampaignGroup

Defined in: [types/promotion.types.ts:1382](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1382)

Campaign group by type/status in count response

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | `8` \| `9` | Campaign type: 8 - unified bid (deprecated), 9 - manual/unified bid | [types/promotion.types.ts:1384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1384) |
| <a id="status"></a> `status` | `-1` \| `4` \| `7` \| `8` \| `9` \| `11` | Campaign status: -1, 4, 7, 8, 9, 11 | [types/promotion.types.ts:1386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1386) |
| <a id="count"></a> `count` | `number` | Number of campaigns in this group | [types/promotion.types.ts:1388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1388) |
| <a id="advert_list"></a> `advert_list` | [`CampaignListItem`](CampaignListItem.md)[] | List of campaigns | [types/promotion.types.ts:1390](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/promotion.types.ts#L1390) |
