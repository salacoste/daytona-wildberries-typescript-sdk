[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelStatistic

# Interface: SalesFunnelStatistic

Defined in: [types/analytics.types.ts:1589](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1589)

Статистика за период v3 (Swagger: Statistic)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | [`DatePeriod`](DatePeriod.md) | Даты периода | [types/analytics.types.ts:1591](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1591) |
| <a id="opencount"></a> `openCount` | `number` | Количество переходов в карточку товара | [types/analytics.types.ts:1593](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1593) |
| <a id="cartcount"></a> `cartCount` | `number` | Положили в корзину, шт. | [types/analytics.types.ts:1595](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1595) |
| <a id="ordercount"></a> `orderCount` | `number` | Заказали товаров, шт. | [types/analytics.types.ts:1597](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1597) |
| <a id="ordersum"></a> `orderSum` | `number` | Заказали на сумму | [types/analytics.types.ts:1599](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1599) |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | Выкупили товаров, шт. | [types/analytics.types.ts:1601](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1601) |
| <a id="buyoutsum"></a> `buyoutSum` | `number` | Выкупили на сумму | [types/analytics.types.ts:1603](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1603) |
| <a id="cancelcount"></a> `cancelCount` | `number` | Отменили товаров, шт. | [types/analytics.types.ts:1605](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1605) |
| <a id="cancelsum"></a> `cancelSum` | `number` | Отменили на сумму | [types/analytics.types.ts:1607](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1607) |
| <a id="avgprice"></a> `avgPrice` | `number` | Средняя цена | [types/analytics.types.ts:1609](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1609) |
| <a id="avgorderscountperday"></a> `avgOrdersCountPerDay` | `number` | Среднее количество заказов в день, шт. | [types/analytics.types.ts:1611](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1611) |
| <a id="shareorderpercent"></a> `shareOrderPercent` | `number` | Доля в выручке | [types/analytics.types.ts:1613](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1613) |
| <a id="addtowishlist"></a> `addToWishlist` | `number` | Добавили в Отложенные | [types/analytics.types.ts:1615](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1615) |
| <a id="timetoready"></a> `timeToReady` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Среднее время доставки | [types/analytics.types.ts:1617](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1617) |
| <a id="localizationpercent"></a> `localizationPercent` | `number` | Локальные заказы в рамках одного региона | [types/analytics.types.ts:1619](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1619) |
| <a id="wbclub"></a> `wbClub` | [`SalesFunnelWbClubMetrics`](SalesFunnelWbClubMetrics.md) | Статистика WB Клуба | [types/analytics.types.ts:1621](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1621) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1623](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1623) |
