[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PeriodItemRating

# Interface: PeriodItemRating

Defined in: [types/analytics.types.ts:1787](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1787)

Current period for item rating.
Dates use `YYYY-MM-DD` format. `start` must not be later than `end`,
and neither may be earlier than 364 days before yesterday.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Start date of the period (`YYYY-MM-DD`). No later than `end`. | [types/analytics.types.ts:1789](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1789) |
| <a id="end"></a> `end` | `string` | End date of the period (`YYYY-MM-DD`). | [types/analytics.types.ts:1791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1791) |
