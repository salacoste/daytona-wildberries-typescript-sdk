[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelStatistic

# Interface: SalesFunnelStatistic

Defined in: [types/analytics.types.ts:1530](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1530)

Статистика за период v3 (Swagger: Statistic)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | [`DatePeriod`](DatePeriod.md) | Даты периода | [types/analytics.types.ts:1532](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1532) |
| <a id="opencount"></a> `openCount` | `number` | Количество переходов в карточку товара | [types/analytics.types.ts:1534](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1534) |
| <a id="cartcount"></a> `cartCount` | `number` | Положили в корзину, шт. | [types/analytics.types.ts:1536](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1536) |
| <a id="ordercount"></a> `orderCount` | `number` | Заказали товаров, шт. | [types/analytics.types.ts:1538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1538) |
| <a id="ordersum"></a> `orderSum` | `number` | Заказали на сумму | [types/analytics.types.ts:1540](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1540) |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | Выкупили товаров, шт. | [types/analytics.types.ts:1542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1542) |
| <a id="buyoutsum"></a> `buyoutSum` | `number` | Выкупили на сумму | [types/analytics.types.ts:1544](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1544) |
| <a id="cancelcount"></a> `cancelCount` | `number` | Отменили товаров, шт. | [types/analytics.types.ts:1546](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1546) |
| <a id="cancelsum"></a> `cancelSum` | `number` | Отменили на сумму | [types/analytics.types.ts:1548](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1548) |
| <a id="avgprice"></a> `avgPrice` | `number` | Средняя цена | [types/analytics.types.ts:1550](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1550) |
| <a id="avgorderscountperday"></a> `avgOrdersCountPerDay` | `number` | Среднее количество заказов в день, шт. | [types/analytics.types.ts:1552](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1552) |
| <a id="shareorderpercent"></a> `shareOrderPercent` | `number` | Доля в выручке | [types/analytics.types.ts:1554](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1554) |
| <a id="addtowishlist"></a> `addToWishlist` | `number` | Добавили в Отложенные | [types/analytics.types.ts:1556](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1556) |
| <a id="timetoready"></a> `timeToReady` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Среднее время доставки | [types/analytics.types.ts:1558](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1558) |
| <a id="localizationpercent"></a> `localizationPercent` | `number` | Локальные заказы в рамках одного региона | [types/analytics.types.ts:1560](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1560) |
| <a id="wbclub"></a> `wbClub` | [`SalesFunnelWbClubMetrics`](SalesFunnelWbClubMetrics.md) | Статистика WB Клуба | [types/analytics.types.ts:1562](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1562) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1564](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/analytics.types.ts#L1564) |
