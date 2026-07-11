[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / CampaignGroup

# Interface: CampaignGroup

Defined in: [types/promotion.types.ts:1580](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1580)

Campaign group by type/status in count response

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="type"></a> `type` | `8` \| `9` | Campaign type: 8 - unified bid (deprecated), 9 - manual/unified bid | [types/promotion.types.ts:1582](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1582) |
| <a id="status"></a> `status` | `-1` \| `4` \| `7` \| `8` \| `9` \| `11` | Campaign status: -1, 4, 7, 8, 9, 11 | [types/promotion.types.ts:1584](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1584) |
| <a id="count"></a> `count` | `number` | Number of campaigns in this group | [types/promotion.types.ts:1586](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1586) |
| <a id="advert_list"></a> `advert_list` | [`CampaignListItem`](CampaignListItem.md)[] | List of campaigns | [types/promotion.types.ts:1588](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1588) |
