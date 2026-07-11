[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PastPeriodItemRating

# Interface: PastPeriodItemRating

Defined in: [types/analytics.types.ts:1795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1795)

Previous period for comparison. Day count must be less than or equal to `currentPeriod`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Start date of the period (`YYYY-MM-DD`). No later than `end`. | [types/analytics.types.ts:1797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1797) |
| <a id="end"></a> `end` | `string` | End date of the period (`YYYY-MM-DD`). No later than the day before `currentPeriod.start`. | [types/analytics.types.ts:1799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1799) |
