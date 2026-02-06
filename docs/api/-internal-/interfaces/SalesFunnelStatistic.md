[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelStatistic

# Interface: SalesFunnelStatistic

Defined in: [types/analytics.types.ts:1765](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1765)

Статистика за период v3 (Swagger: Statistic)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | [`DatePeriod`](DatePeriod.md) | Даты периода | [types/analytics.types.ts:1767](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1767) |
| <a id="opencount"></a> `openCount` | `number` | Количество переходов в карточку товара | [types/analytics.types.ts:1769](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1769) |
| <a id="cartcount"></a> `cartCount` | `number` | Положили в корзину, шт. | [types/analytics.types.ts:1771](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1771) |
| <a id="ordercount"></a> `orderCount` | `number` | Заказали товаров, шт. | [types/analytics.types.ts:1773](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1773) |
| <a id="ordersum"></a> `orderSum` | `number` | Заказали на сумму | [types/analytics.types.ts:1775](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1775) |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | Выкупили товаров, шт. | [types/analytics.types.ts:1777](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1777) |
| <a id="buyoutsum"></a> `buyoutSum` | `number` | Выкупили на сумму | [types/analytics.types.ts:1779](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1779) |
| <a id="cancelcount"></a> `cancelCount` | `number` | Отменили товаров, шт. | [types/analytics.types.ts:1781](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1781) |
| <a id="cancelsum"></a> `cancelSum` | `number` | Отменили на сумму | [types/analytics.types.ts:1783](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1783) |
| <a id="avgprice"></a> `avgPrice` | `number` | Средняя цена | [types/analytics.types.ts:1785](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1785) |
| <a id="avgorderscountperday"></a> `avgOrdersCountPerDay` | `number` | Среднее количество заказов в день, шт. | [types/analytics.types.ts:1787](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1787) |
| <a id="shareorderpercent"></a> `shareOrderPercent` | `number` | Доля в выручке | [types/analytics.types.ts:1789](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1789) |
| <a id="addtowishlist"></a> `addToWishlist` | `number` | Добавили в Отложенные | [types/analytics.types.ts:1791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1791) |
| <a id="timetoready"></a> `timeToReady` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Среднее время доставки | [types/analytics.types.ts:1793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1793) |
| <a id="localizationpercent"></a> `localizationPercent` | `number` | Локальные заказы в рамках одного региона | [types/analytics.types.ts:1795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1795) |
| <a id="wbclub"></a> `wbClub` | [`SalesFunnelWbClubMetrics`](SalesFunnelWbClubMetrics.md) | Статистика WB Клуба | [types/analytics.types.ts:1797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1797) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L1799) |
