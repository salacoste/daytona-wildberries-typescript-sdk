[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableShippingOfficeMetrics

# Interface: TableShippingOfficeMetrics

Defined in: [types/analytics.types.ts:1613](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1613)

Общие метрики по регионам/складам отгрузки

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="stockcount"></a> `stockCount` | `number` | Остатки на текущий день, шт. | [types/analytics.types.ts:1615](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1615) |
| <a id="stocksum"></a> `stockSum` | `number` | Остатки на текущий день, сумма | [types/analytics.types.ts:1617](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1617) |
| <a id="salerate"></a> `saleRate` | \{ `days`: `number`; `hours`: `number`; \} | Оборачиваемость текущих остатков. Особые случаи: 1. `"hours":-1` — бесконечная длительность 2. `"hours":-2` — нулевая длительность 3. `"hours":-3` — нерассчитанная длительность | [types/analytics.types.ts:1619](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1619) |
| `saleRate.days` | `number` | Количество дней | [types/analytics.types.ts:1621](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1621) |
| `saleRate.hours` | `number` | Количество часов | [types/analytics.types.ts:1623](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1623) |
| <a id="toclientcount"></a> `toClientCount` | `number` | В пути к клиенту, шт. | [types/analytics.types.ts:1626](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1626) |
| <a id="fromclientcount"></a> `fromClientCount` | `number` | В пути от клиента, шт. | [types/analytics.types.ts:1628](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1628) |
