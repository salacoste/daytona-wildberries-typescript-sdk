[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelComparison

# Interface: SalesFunnelComparison

Defined in: [types/analytics.types.ts:1627](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1627)

Сравнение двух периодов v3 (Swagger: Comparison)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="opencountdynamic"></a> `openCountDynamic` | `number` | Динамика переходов в карточку товара | [types/analytics.types.ts:1629](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1629) |
| <a id="cartcountdynamic"></a> `cartCountDynamic` | `number` | Динамика добавлений в корзину | [types/analytics.types.ts:1631](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1631) |
| <a id="ordercountdynamic"></a> `orderCountDynamic` | `number` | Динамика количества заказов | [types/analytics.types.ts:1633](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1633) |
| <a id="ordersumdynamic"></a> `orderSumDynamic` | `number` | Динамика суммы заказов | [types/analytics.types.ts:1635](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1635) |
| <a id="buyoutcountdynamic"></a> `buyoutCountDynamic` | `number` | Динамика выкупов | [types/analytics.types.ts:1637](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1637) |
| <a id="buyoutsumdynamic"></a> `buyoutSumDynamic` | `number` | Динамика суммы выкупов | [types/analytics.types.ts:1639](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1639) |
| <a id="cancelcountdynamic"></a> `cancelCountDynamic` | `number` | Динамика отмен товаров | [types/analytics.types.ts:1641](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1641) |
| <a id="cancelsumdynamic"></a> `cancelSumDynamic` | `number` | Динамика сумм отмен товаров | [types/analytics.types.ts:1643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1643) |
| <a id="avgorderscountperdaydynamic"></a> `avgOrdersCountPerDayDynamic` | `number` | Динамика среднего количества заказов в день | [types/analytics.types.ts:1645](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1645) |
| <a id="avgpricedynamic"></a> `avgPriceDynamic` | `number` | Динамика средней цены на товары | [types/analytics.types.ts:1647](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1647) |
| <a id="shareorderpercentdynamic"></a> `shareOrderPercentDynamic` | `number` | Динамика доли в выручке | [types/analytics.types.ts:1649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1649) |
| <a id="addtowishlistdynamic"></a> `addToWishlistDynamic` | `number` | Динамика добавлений товара в избранное | [types/analytics.types.ts:1651](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1651) |
| <a id="timetoreadydynamic"></a> `timeToReadyDynamic` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Динамика среднего времени доставки | [types/analytics.types.ts:1653](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1653) |
| <a id="localizationpercentdynamic"></a> `localizationPercentDynamic` | `number` | Динамика локальных заказов в рамках одного региона | [types/analytics.types.ts:1655](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1655) |
| <a id="wbclubdynamic"></a> `wbClubDynamic` | [`SalesFunnelWbClubMetricsDynamic`](SalesFunnelWbClubMetricsDynamic.md) | Динамика заказов с WB Клубом | [types/analytics.types.ts:1657](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1657) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1659) |
