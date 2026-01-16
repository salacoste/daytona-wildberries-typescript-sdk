[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableShippingOfficeMetrics

# Interface: TableShippingOfficeMetrics

Defined in: [types/analytics.types.ts:1476](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1476)

Общие метрики по регионам/складам отгрузки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stockcount"></a> `stockCount` | `number` | Остатки на текущий день, шт. | [types/analytics.types.ts:1478](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1478) |
| <a id="stocksum"></a> `stockSum` | `number` | Остатки на текущий день, сумма | [types/analytics.types.ts:1480](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1480) |
| <a id="salerate"></a> `saleRate` | \{ `days`: `number`; `hours`: `number`; \} | Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность | [types/analytics.types.ts:1482](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1482) |
| `saleRate.days` | `number` | Количество дней | [types/analytics.types.ts:1484](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1484) |
| `saleRate.hours` | `number` | Количество часов | [types/analytics.types.ts:1486](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1486) |
| <a id="toclientcount"></a> `toClientCount` | `number` | В пути к клиенту, шт. | [types/analytics.types.ts:1489](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1489) |
| <a id="fromclientcount"></a> `fromClientCount` | `number` | В пути от клиента, шт. | [types/analytics.types.ts:1491](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L1491) |
