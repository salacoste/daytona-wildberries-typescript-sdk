[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableShippingOfficeMetrics

# Interface: TableShippingOfficeMetrics

Defined in: [types/analytics.types.ts:1523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1523)

Общие метрики по регионам/складам отгрузки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stockcount"></a> `stockCount` | `number` | Остатки на текущий день, шт. | [types/analytics.types.ts:1525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1525) |
| <a id="stocksum"></a> `stockSum` | `number` | Остатки на текущий день, сумма | [types/analytics.types.ts:1527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1527) |
| <a id="salerate"></a> `saleRate` | \{ `days`: `number`; `hours`: `number`; \} | Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность | [types/analytics.types.ts:1529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1529) |
| `saleRate.days` | `number` | Количество дней | [types/analytics.types.ts:1531](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1531) |
| `saleRate.hours` | `number` | Количество часов | [types/analytics.types.ts:1533](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1533) |
| <a id="toclientcount"></a> `toClientCount` | `number` | В пути к клиенту, шт. | [types/analytics.types.ts:1536](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1536) |
| <a id="fromclientcount"></a> `fromClientCount` | `number` | В пути от клиента, шт. | [types/analytics.types.ts:1538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L1538) |
