[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetMinusPhrasesRequest

# Interface: SetMinusPhrasesRequest

Defined in: [types/promotion.types.ts:2027](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2027)

Request to set minus phrases for a campaign
WARNING: Sending an empty norm_queries array REMOVES ALL minus phrases!

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:2029](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2029) |
| <a id="nm_id"></a> `nm_id` | `number` | WB Article ID - Type 8 campaigns: use nm_id=0 for campaign-wide settings - Type 9 campaigns: use actual WB article ID | [types/promotion.types.ts:2035](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2035) |
| <a id="norm_queries"></a> `norm_queries` | `string`[] | Minus phrases (max 1000) WARNING: Empty array removes ALL minus phrases! | [types/promotion.types.ts:2040](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L2040) |
