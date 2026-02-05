[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelComparison

# Interface: SalesFunnelComparison

Defined in: [types/analytics.types.ts:1803](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1803)

Сравнение двух периодов v3 (Swagger: Comparison)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="opencountdynamic"></a> `openCountDynamic` | `number` | Динамика переходов в карточку товара | [types/analytics.types.ts:1805](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1805) |
| <a id="cartcountdynamic"></a> `cartCountDynamic` | `number` | Динамика добавлений в корзину | [types/analytics.types.ts:1807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1807) |
| <a id="ordercountdynamic"></a> `orderCountDynamic` | `number` | Динамика количества заказов | [types/analytics.types.ts:1809](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1809) |
| <a id="ordersumdynamic"></a> `orderSumDynamic` | `number` | Динамика суммы заказов | [types/analytics.types.ts:1811](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1811) |
| <a id="buyoutcountdynamic"></a> `buyoutCountDynamic` | `number` | Динамика выкупов | [types/analytics.types.ts:1813](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1813) |
| <a id="buyoutsumdynamic"></a> `buyoutSumDynamic` | `number` | Динамика суммы выкупов | [types/analytics.types.ts:1815](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1815) |
| <a id="cancelcountdynamic"></a> `cancelCountDynamic` | `number` | Динамика отмен товаров | [types/analytics.types.ts:1817](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1817) |
| <a id="cancelsumdynamic"></a> `cancelSumDynamic` | `number` | Динамика сумм отмен товаров | [types/analytics.types.ts:1819](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1819) |
| <a id="avgorderscountperdaydynamic"></a> `avgOrdersCountPerDayDynamic` | `number` | Динамика среднего количества заказов в день | [types/analytics.types.ts:1821](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1821) |
| <a id="avgpricedynamic"></a> `avgPriceDynamic` | `number` | Динамика средней цены на товары | [types/analytics.types.ts:1823](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1823) |
| <a id="shareorderpercentdynamic"></a> `shareOrderPercentDynamic` | `number` | Динамика доли в выручке | [types/analytics.types.ts:1825](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1825) |
| <a id="addtowishlistdynamic"></a> `addToWishlistDynamic` | `number` | Динамика добавлений товара в избранное | [types/analytics.types.ts:1827](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1827) |
| <a id="timetoreadydynamic"></a> `timeToReadyDynamic` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Динамика среднего времени доставки | [types/analytics.types.ts:1829](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1829) |
| <a id="localizationpercentdynamic"></a> `localizationPercentDynamic` | `number` | Динамика локальных заказов в рамках одного региона | [types/analytics.types.ts:1831](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1831) |
| <a id="wbclubdynamic"></a> `wbClubDynamic` | [`SalesFunnelWbClubMetricsDynamic`](SalesFunnelWbClubMetricsDynamic.md) | Динамика заказов с WB Клубом | [types/analytics.types.ts:1833](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1833) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1835](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L1835) |
