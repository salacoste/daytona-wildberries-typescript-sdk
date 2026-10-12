[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PeriodItemRating

# Interface: PeriodItemRating

Defined in: [types/analytics.types.ts:1848](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1848)

Current period for item rating.
Dates use `YYYY-MM-DD` format. `start` must not be later than `end`,
and neither may be earlier than 364 days before yesterday.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Start date of the period (`YYYY-MM-DD`). No later than `end`. | [types/analytics.types.ts:1850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1850) |
| <a id="end"></a> `end` | `string` | End date of the period (`YYYY-MM-DD`). | [types/analytics.types.ts:1852](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1852) |
