[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PeriodOrdersRequest

# Interface: PeriodOrdersRequest

Defined in: [types/analytics.types.ts:570](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L570)

Текущий период. Максимум 7 суток

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:572](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L572) |
| <a id="end"></a> `end` | `string` | Дата окончания периода. Не ранее 365 суток от сегодня | [types/analytics.types.ts:574](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L574) |
