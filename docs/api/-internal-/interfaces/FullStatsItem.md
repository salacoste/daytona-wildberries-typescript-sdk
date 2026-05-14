[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FullStatsItem

# Interface: FullStatsItem

Defined in: [types/promotion.types.ts:738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L738)

Статистика по одной кампании за период, указанный в запросе. По всем артикулам WB и платформам

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | ID кампании | [types/promotion.types.ts:740](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L740) |
| <a id="atbs"></a> `atbs` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:742](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L742) |
| <a id="boosterstats"></a> `boosterStats?` | [`BoosterStatsV3`](../type-aliases/BoosterStatsV3.md) | Статистика по бустеру | [types/promotion.types.ts:744](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L744) |
| <a id="canceled"></a> `canceled` | `number` | Отмены, шт. | [types/promotion.types.ts:746](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L746) |
| <a id="clicks"></a> `clicks` | `number` | Количество кликов | [types/promotion.types.ts:748](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L748) |
| <a id="cpc"></a> `cpc` | `number` | Средняя стоимость клика, ₽ | [types/promotion.types.ts:750](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L750) |
| <a id="cr"></a> `cr` | `number` | CR (conversion rate) — отношение количества заказов к общему количеству кликов | [types/promotion.types.ts:752](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L752) |
| <a id="ctr"></a> `ctr` | `number` | CTR (click-through rate) — отношение числа кликов к количеству показов в процентах | [types/promotion.types.ts:754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L754) |
| <a id="days"></a> `days` | [`DaysV3`](../type-aliases/DaysV3.md) | Статистика с разбивкой по дням | [types/promotion.types.ts:756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L756) |
| <a id="orders"></a> `orders` | `number` | Количество заказов | [types/promotion.types.ts:758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L758) |
| <a id="shks"></a> `shks` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L760) |
| <a id="sum"></a> `sum` | `number` | Затраты, ₽ | [types/promotion.types.ts:762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L762) |
| <a id="sum_price"></a> `sum_price` | `number` | Сумма заказов, ₽ | [types/promotion.types.ts:764](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L764) |
| <a id="views"></a> `views` | `number` | Количество просмотров | [types/promotion.types.ts:766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/promotion.types.ts#L766) |
