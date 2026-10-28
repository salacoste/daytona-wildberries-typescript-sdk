[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelComparison

# Interface: SalesFunnelComparison

Defined in: [types/analytics.types.ts:1644](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1644)

Сравнение двух периодов v3 (Swagger: Comparison)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="opencountdynamic"></a> `openCountDynamic` | `number` | Динамика переходов в карточку товара | [types/analytics.types.ts:1646](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1646) |
| <a id="cartcountdynamic"></a> `cartCountDynamic` | `number` | Динамика добавлений в корзину | [types/analytics.types.ts:1648](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1648) |
| <a id="ordercountdynamic"></a> `orderCountDynamic` | `number` | Динамика количества заказов | [types/analytics.types.ts:1650](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1650) |
| <a id="ordersumdynamic"></a> `orderSumDynamic` | `number` | Динамика суммы заказов | [types/analytics.types.ts:1652](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1652) |
| <a id="buyoutcountdynamic"></a> `buyoutCountDynamic` | `number` | Динамика выкупов | [types/analytics.types.ts:1654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1654) |
| <a id="buyoutsumdynamic"></a> `buyoutSumDynamic` | `number` | Динамика суммы выкупов | [types/analytics.types.ts:1656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1656) |
| <a id="cancelcountdynamic"></a> `cancelCountDynamic` | `number` | Динамика отмен товаров | [types/analytics.types.ts:1658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1658) |
| <a id="cancelsumdynamic"></a> `cancelSumDynamic` | `number` | Динамика сумм отмен товаров | [types/analytics.types.ts:1660](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1660) |
| <a id="avgorderscountperdaydynamic"></a> `avgOrdersCountPerDayDynamic` | `number` | Динамика среднего количества заказов в день | [types/analytics.types.ts:1662](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1662) |
| <a id="avgpricedynamic"></a> `avgPriceDynamic` | `number` | Динамика средней цены на товары | [types/analytics.types.ts:1664](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1664) |
| <a id="shareorderpercentdynamic"></a> `shareOrderPercentDynamic` | `number` | Динамика доли в выручке | [types/analytics.types.ts:1666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1666) |
| <a id="addtowishlistdynamic"></a> `addToWishlistDynamic` | `number` | Динамика добавлений товара в избранное | [types/analytics.types.ts:1668](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1668) |
| <a id="timetoreadydynamic"></a> `timeToReadyDynamic` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Динамика среднего времени доставки | [types/analytics.types.ts:1670](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1670) |
| <a id="localizationpercentdynamic"></a> `localizationPercentDynamic` | `number` | Динамика локальных заказов в рамках одного региона | [types/analytics.types.ts:1672](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1672) |
| <a id="wbclubdynamic"></a> `wbClubDynamic` | [`SalesFunnelWbClubMetricsDynamic`](SalesFunnelWbClubMetricsDynamic.md) | Динамика заказов с WB Клубом | [types/analytics.types.ts:1674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1674) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1676) |
