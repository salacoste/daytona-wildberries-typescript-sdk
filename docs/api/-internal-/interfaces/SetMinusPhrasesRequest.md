[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetMinusPhrasesRequest

# Interface: SetMinusPhrasesRequest

Defined in: [types/promotion.types.ts:1801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1801)

Request to set minus phrases for a campaign
WARNING: Sending an empty norm_queries array REMOVES ALL minus phrases!

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advert_id"></a> `advert_id` | `number` | Campaign ID | [types/promotion.types.ts:1803](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1803) |
| <a id="nm_id"></a> `nm_id` | `number` | WB Article ID - Type 8 campaigns: use nm_id=0 for campaign-wide settings - Type 9 campaigns: use actual WB article ID | [types/promotion.types.ts:1809](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1809) |
| <a id="norm_queries"></a> `norm_queries` | `string`[] | Minus phrases (max 1000) WARNING: Empty array removes ALL minus phrases! | [types/promotion.types.ts:1814](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/promotion.types.ts#L1814) |
