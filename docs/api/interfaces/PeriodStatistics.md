[Wildberries API TypeScript SDK](../modules.md) / PeriodStatistics

# Interface: PeriodStatistics

Defined in: [types/analytics.types.ts:45](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L45)

Period statistics for product card analytics

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="begin"></a> `begin` | `string` | Period start date-time | [types/analytics.types.ts:47](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L47) |
| <a id="end"></a> `end` | `string` | Period end date-time | [types/analytics.types.ts:49](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L49) |
| <a id="opencardcount"></a> `openCardCount` | `number` | Number of product card views | [types/analytics.types.ts:51](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L51) |
| <a id="addtocartcount"></a> `addToCartCount` | `number` | Number of add to cart actions | [types/analytics.types.ts:53](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L53) |
| <a id="orderscount"></a> `ordersCount` | `number` | Number of orders | [types/analytics.types.ts:55](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L55) |
| <a id="orderssumrub"></a> `ordersSumRub` | `number` | Total order value in rubles | [types/analytics.types.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L57) |
| <a id="buyoutscount"></a> `buyoutsCount` | `number` | Number of completed purchases (buyouts) | [types/analytics.types.ts:59](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L59) |
| <a id="buyoutssumrub"></a> `buyoutsSumRub` | `number` | Total buyout value in rubles | [types/analytics.types.ts:61](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L61) |
| <a id="cancelcount"></a> `cancelCount` | `number` | Number of order cancellations | [types/analytics.types.ts:63](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L63) |
| <a id="cancelsumrub"></a> `cancelSumRub` | `number` | Total cancelled order value in rubles | [types/analytics.types.ts:65](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L65) |
| <a id="avgpricerub"></a> `avgPriceRub` | `number` | Average price in rubles | [types/analytics.types.ts:67](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L67) |
| <a id="avgorderscountperday"></a> `avgOrdersCountPerDay` | `number` | Average orders per day | [types/analytics.types.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L69) |
| <a id="conversions"></a> `conversions` | [`ConversionMetrics`](ConversionMetrics.md) | Conversion metrics (funnel) | [types/analytics.types.ts:71](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/analytics.types.ts#L71) |
