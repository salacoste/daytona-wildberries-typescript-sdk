[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PeriodOrdersRequest

# Interface: PeriodOrdersRequest

Defined in: [types/analytics.types.ts:546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/analytics.types.ts#L546)

Текущий период. Максимум 7 суток

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/analytics.types.ts#L548) |
| <a id="end"></a> `end` | `string` | Дата окончания периода. Не ранее 365 суток от сегодня | [types/analytics.types.ts:550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d563cecd0407cbbf0c5e21396eafb316296c02c3/src/types/analytics.types.ts#L550) |
