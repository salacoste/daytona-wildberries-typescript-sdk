[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FullStatsItem

# Interface: FullStatsItem

Defined in: [types/promotion.types.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L723)

Статистика по одной кампании за период, указанный в запросе. По всем артикулам WB и платформам

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="advertid"></a> `advertId` | `number` | ID кампании | [types/promotion.types.ts:725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L725) |
| <a id="atbs"></a> `atbs` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:727](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L727) |
| <a id="boosterstats"></a> `boosterStats?` | [`BoosterStatsV3`](../type-aliases/BoosterStatsV3.md) | Статистика по бустеру | [types/promotion.types.ts:729](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L729) |
| <a id="canceled"></a> `canceled` | `number` | Отмены, шт. | [types/promotion.types.ts:731](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L731) |
| <a id="clicks"></a> `clicks` | `number` | Количество кликов | [types/promotion.types.ts:733](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L733) |
| <a id="cpc"></a> `cpc` | `number` | Средняя стоимость клика, ₽ | [types/promotion.types.ts:735](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L735) |
| <a id="cr"></a> `cr` | `number` | CR (conversion rate) — отношение количества заказов к общему количеству кликов | [types/promotion.types.ts:737](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L737) |
| <a id="ctr"></a> `ctr` | `number` | CTR (click-through rate) — отношение числа кликов к количеству показов в процентах | [types/promotion.types.ts:739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L739) |
| <a id="days"></a> `days` | [`DaysV3`](../type-aliases/DaysV3.md) | Статистика с разбивкой по дням | [types/promotion.types.ts:741](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L741) |
| <a id="orders"></a> `orders` | `number` | Количество заказов | [types/promotion.types.ts:743](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L743) |
| <a id="shks"></a> `shks` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:745](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L745) |
| <a id="sum"></a> `sum` | `number` | Затраты, ₽ | [types/promotion.types.ts:747](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L747) |
| <a id="sum_price"></a> `sum_price` | `number` | Сумма заказов, ₽ | [types/promotion.types.ts:749](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L749) |
| <a id="views"></a> `views` | `number` | Количество просмотров | [types/promotion.types.ts:751](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L751) |
| <a id="currency"></a> `currency?` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). **Since** task-170 | [types/promotion.types.ts:756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L756) |
