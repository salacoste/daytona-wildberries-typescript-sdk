[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PastPeriodItemRating

# Interface: PastPeriodItemRating

Defined in: [types/analytics.types.ts:1839](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1839)

Previous period for comparison. Day count must be less than or equal to `currentPeriod`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Start date of the period (`YYYY-MM-DD`). No later than `end`. | [types/analytics.types.ts:1841](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1841) |
| <a id="end"></a> `end` | `string` | End date of the period (`YYYY-MM-DD`). No later than the day before `currentPeriod.start`. | [types/analytics.types.ts:1843](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1843) |
