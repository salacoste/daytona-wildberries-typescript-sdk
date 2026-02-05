[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PeriodOrdersRequest

# Interface: PeriodOrdersRequest

Defined in: [types/analytics.types.ts:464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L464)

Текущий период. Максимум 7 суток

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:466](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L466) |
| <a id="end"></a> `end` | `string` | Дата окончания периода. Не ранее 365 суток от сегодня | [types/analytics.types.ts:468](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L468) |
