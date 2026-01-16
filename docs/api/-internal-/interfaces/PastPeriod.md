[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PastPeriod

# Interface: PastPeriod

Defined in: [types/analytics.types.ts:468](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L468)

Прошлый период для сравнения. Количество дней — меньше или равно `currentPeriod`

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:470](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L470) |
| <a id="end"></a> `end` | `string` | Дата окончания периода. Не позднее даты перед датой начала `currentPeriod`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:472](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L472) |
