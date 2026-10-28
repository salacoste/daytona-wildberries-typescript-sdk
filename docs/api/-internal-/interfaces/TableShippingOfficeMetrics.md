[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableShippingOfficeMetrics

# Interface: TableShippingOfficeMetrics

Defined in: [types/analytics.types.ts:1364](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1364)

Общие метрики по регионам/складам отгрузки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stockcount"></a> `stockCount` | `number` | Остатки на текущий день, шт. | [types/analytics.types.ts:1366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1366) |
| <a id="stocksum"></a> `stockSum` | `number` | Остатки на текущий день, сумма | [types/analytics.types.ts:1368](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1368) |
| <a id="salerate"></a> `saleRate` | \{ `days`: `number`; `hours`: `number`; \} | Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность | [types/analytics.types.ts:1370](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1370) |
| `saleRate.days` | `number` | Количество дней | [types/analytics.types.ts:1372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1372) |
| `saleRate.hours` | `number` | Количество часов | [types/analytics.types.ts:1374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1374) |
| <a id="toclientcount"></a> `toClientCount` | `number` | В пути к клиенту, шт. | [types/analytics.types.ts:1377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1377) |
| <a id="fromclientcount"></a> `fromClientCount` | `number` | В пути от клиента, шт. | [types/analytics.types.ts:1379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1379) |
