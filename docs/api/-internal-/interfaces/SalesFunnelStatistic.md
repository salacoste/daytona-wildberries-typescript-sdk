[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelStatistic

# Interface: SalesFunnelStatistic

Defined in: [types/analytics.types.ts:1855](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1855)

Статистика за период v3 (Swagger: Statistic)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="period"></a> `period` | [`DatePeriod`](DatePeriod.md) | Даты периода | [types/analytics.types.ts:1857](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1857) |
| <a id="opencount"></a> `openCount` | `number` | Количество переходов в карточку товара | [types/analytics.types.ts:1859](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1859) |
| <a id="cartcount"></a> `cartCount` | `number` | Положили в корзину, шт. | [types/analytics.types.ts:1861](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1861) |
| <a id="ordercount"></a> `orderCount` | `number` | Заказали товаров, шт. | [types/analytics.types.ts:1863](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1863) |
| <a id="ordersum"></a> `orderSum` | `number` | Заказали на сумму | [types/analytics.types.ts:1865](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1865) |
| <a id="buyoutcount"></a> `buyoutCount` | `number` | Выкупили товаров, шт. | [types/analytics.types.ts:1867](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1867) |
| <a id="buyoutsum"></a> `buyoutSum` | `number` | Выкупили на сумму | [types/analytics.types.ts:1869](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1869) |
| <a id="cancelcount"></a> `cancelCount` | `number` | Отменили товаров, шт. | [types/analytics.types.ts:1871](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1871) |
| <a id="cancelsum"></a> `cancelSum` | `number` | Отменили на сумму | [types/analytics.types.ts:1873](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1873) |
| <a id="avgprice"></a> `avgPrice` | `number` | Средняя цена | [types/analytics.types.ts:1875](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1875) |
| <a id="avgorderscountperday"></a> `avgOrdersCountPerDay` | `number` | Среднее количество заказов в день, шт. | [types/analytics.types.ts:1877](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1877) |
| <a id="shareorderpercent"></a> `shareOrderPercent` | `number` | Доля в выручке | [types/analytics.types.ts:1879](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1879) |
| <a id="addtowishlist"></a> `addToWishlist` | `number` | Добавили в Отложенные | [types/analytics.types.ts:1881](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1881) |
| <a id="timetoready"></a> `timeToReady` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Среднее время доставки | [types/analytics.types.ts:1883](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1883) |
| <a id="localizationpercent"></a> `localizationPercent` | `number` | Локальные заказы в рамках одного региона | [types/analytics.types.ts:1885](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1885) |
| <a id="wbclub"></a> `wbClub` | [`SalesFunnelWbClubMetrics`](SalesFunnelWbClubMetrics.md) | Статистика WB Клуба | [types/analytics.types.ts:1887](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1887) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1889](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1889) |
