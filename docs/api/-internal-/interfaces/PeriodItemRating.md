[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PeriodItemRating

# Interface: PeriodItemRating

Defined in: [types/analytics.types.ts:1831](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1831)

Current period for item rating.
Dates use `YYYY-MM-DD` format. `start` must not be later than `end`,
and neither may be earlier than 364 days before yesterday.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Start date of the period (`YYYY-MM-DD`). No later than `end`. | [types/analytics.types.ts:1833](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1833) |
| <a id="end"></a> `end` | `string` | End date of the period (`YYYY-MM-DD`). | [types/analytics.types.ts:1835](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1835) |
