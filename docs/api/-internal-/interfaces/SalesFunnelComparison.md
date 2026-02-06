[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelComparison

# Interface: SalesFunnelComparison

Defined in: [types/analytics.types.ts:1893](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1893)

Сравнение двух периодов v3 (Swagger: Comparison)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="opencountdynamic"></a> `openCountDynamic` | `number` | Динамика переходов в карточку товара | [types/analytics.types.ts:1895](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1895) |
| <a id="cartcountdynamic"></a> `cartCountDynamic` | `number` | Динамика добавлений в корзину | [types/analytics.types.ts:1897](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1897) |
| <a id="ordercountdynamic"></a> `orderCountDynamic` | `number` | Динамика количества заказов | [types/analytics.types.ts:1899](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1899) |
| <a id="ordersumdynamic"></a> `orderSumDynamic` | `number` | Динамика суммы заказов | [types/analytics.types.ts:1901](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1901) |
| <a id="buyoutcountdynamic"></a> `buyoutCountDynamic` | `number` | Динамика выкупов | [types/analytics.types.ts:1903](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1903) |
| <a id="buyoutsumdynamic"></a> `buyoutSumDynamic` | `number` | Динамика суммы выкупов | [types/analytics.types.ts:1905](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1905) |
| <a id="cancelcountdynamic"></a> `cancelCountDynamic` | `number` | Динамика отмен товаров | [types/analytics.types.ts:1907](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1907) |
| <a id="cancelsumdynamic"></a> `cancelSumDynamic` | `number` | Динамика сумм отмен товаров | [types/analytics.types.ts:1909](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1909) |
| <a id="avgorderscountperdaydynamic"></a> `avgOrdersCountPerDayDynamic` | `number` | Динамика среднего количества заказов в день | [types/analytics.types.ts:1911](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1911) |
| <a id="avgpricedynamic"></a> `avgPriceDynamic` | `number` | Динамика средней цены на товары | [types/analytics.types.ts:1913](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1913) |
| <a id="shareorderpercentdynamic"></a> `shareOrderPercentDynamic` | `number` | Динамика доли в выручке | [types/analytics.types.ts:1915](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1915) |
| <a id="addtowishlistdynamic"></a> `addToWishlistDynamic` | `number` | Динамика добавлений товара в избранное | [types/analytics.types.ts:1917](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1917) |
| <a id="timetoreadydynamic"></a> `timeToReadyDynamic` | [`SalesFunnelTimeToReady`](SalesFunnelTimeToReady.md) | Динамика среднего времени доставки | [types/analytics.types.ts:1919](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1919) |
| <a id="localizationpercentdynamic"></a> `localizationPercentDynamic` | `number` | Динамика локальных заказов в рамках одного региона | [types/analytics.types.ts:1921](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1921) |
| <a id="wbclubdynamic"></a> `wbClubDynamic` | [`SalesFunnelWbClubMetricsDynamic`](SalesFunnelWbClubMetricsDynamic.md) | Динамика заказов с WB Клубом | [types/analytics.types.ts:1923](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1923) |
| <a id="conversions"></a> `conversions` | [`SalesFunnelConversions`](SalesFunnelConversions.md) | Конверсии | [types/analytics.types.ts:1925](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/84d1a707640855c1ed182491beac41440c7153ad/src/types/analytics.types.ts#L1925) |
