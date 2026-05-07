[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PastPeriod

# Interface: PastPeriod

Defined in: [types/analytics.types.ts:566](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L566)

Прошлый период для сравнения. Количество дней — меньше или равно `currentPeriod`

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L568) |
| <a id="end"></a> `end` | `string` | Дата окончания периода. Не позднее даты перед датой начала `currentPeriod`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:570](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6bf4b3c8ac3fd14863dea2ce111bf009b640b23d/src/types/analytics.types.ts#L570) |
