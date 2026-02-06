[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PastPeriod

# Interface: PastPeriod

Defined in: [types/analytics.types.ts:484](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L484)

Прошлый период для сравнения. Количество дней — меньше или равно `currentPeriod`

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Дата начала периода. Не позднее `end`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:486](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L486) |
| <a id="end"></a> `end` | `string` | Дата окончания периода. Не позднее даты перед датой начала `currentPeriod`. Не ранее 365 суток от сегодня | [types/analytics.types.ts:488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L488) |
