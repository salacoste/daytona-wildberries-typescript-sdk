[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DaysV3Item

# Interface: DaysV3Item

Defined in: [types/promotion.types.ts:777](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L777)

Элемент статистики по дням (V3)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="date"></a> `date` | `string` | Дата, за которую представлены данные | [types/promotion.types.ts:779](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L779) |
| <a id="views"></a> `views` | `number` | Количество просмотров | [types/promotion.types.ts:781](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L781) |
| <a id="clicks"></a> `clicks` | `number` | Количество кликов | [types/promotion.types.ts:783](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L783) |
| <a id="ctr"></a> `ctr` | `number` | CTR (click-through rate) — отношение числа кликов к количеству показов в процентах | [types/promotion.types.ts:785](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L785) |
| <a id="cpc"></a> `cpc` | `number` | Средняя стоимость клика, ₽ | [types/promotion.types.ts:787](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L787) |
| <a id="sum"></a> `sum` | `number` | Затраты, ₽ | [types/promotion.types.ts:789](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L789) |
| <a id="atbs"></a> `atbs` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L791) |
| <a id="orders"></a> `orders` | `number` | Количество заказов | [types/promotion.types.ts:793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L793) |
| <a id="cr"></a> `cr` | `number` | CR (conversion rate) — отношение количества заказов к общему количеству посещений кампании | [types/promotion.types.ts:795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L795) |
| <a id="shks"></a> `shks` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L797) |
| <a id="sum_price"></a> `sum_price` | `number` | Заказов на сумму, ₽ | [types/promotion.types.ts:799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L799) |
| <a id="canceled"></a> `canceled` | `number` | Отмены, шт. | [types/promotion.types.ts:801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L801) |
| <a id="apps"></a> `apps` | [`DaysV3AppItem`](DaysV3AppItem.md)[] | Блок информации о платформе | [types/promotion.types.ts:803](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/664412b904e291120a47b29888e3912d3cf7a872/src/types/promotion.types.ts#L803) |
