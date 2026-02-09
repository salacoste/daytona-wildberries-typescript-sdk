[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableShippingOfficeMetrics

# Interface: TableShippingOfficeMetrics

Defined in: [types/analytics.types.ts:1288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1288)

Общие метрики по регионам/складам отгрузки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stockcount"></a> `stockCount` | `number` | Остатки на текущий день, шт. | [types/analytics.types.ts:1290](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1290) |
| <a id="stocksum"></a> `stockSum` | `number` | Остатки на текущий день, сумма | [types/analytics.types.ts:1292](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1292) |
| <a id="salerate"></a> `saleRate` | \{ `days`: `number`; `hours`: `number`; \} | Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность | [types/analytics.types.ts:1294](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1294) |
| `saleRate.days` | `number` | Количество дней | [types/analytics.types.ts:1296](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1296) |
| `saleRate.hours` | `number` | Количество часов | [types/analytics.types.ts:1298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1298) |
| <a id="toclientcount"></a> `toClientCount` | `number` | В пути к клиенту, шт. | [types/analytics.types.ts:1301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1301) |
| <a id="fromclientcount"></a> `fromClientCount` | `number` | В пути от клиента, шт. | [types/analytics.types.ts:1303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/dadfc21bcd5b45d945fa8d2e5b25e28d68d7d579/src/types/analytics.types.ts#L1303) |
