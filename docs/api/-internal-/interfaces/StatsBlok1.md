[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StatsBlok1

# Interface: StatsBlok1

Defined in: [types/promotion.types.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L389)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="item_id"></a> `item_id?` | `number` | ID баннера | [types/promotion.types.ts:391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L391) |
| <a id="item_name"></a> `item_name?` | `string` | Бренд | [types/promotion.types.ts:393](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L393) |
| <a id="category_name"></a> `category_name?` | `string` | Название категории | [types/promotion.types.ts:395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L395) |
| <a id="advert_type"></a> `advert_type?` | `number` | Тип медиакампании: - `1` — размещение по дням - `2` — размещение по просмотрам | [types/promotion.types.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L397) |
| <a id="place"></a> `place?` | `number` | Место на странице | [types/promotion.types.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L399) |
| <a id="views"></a> `views?` | `number` | Количество просмотров | [types/promotion.types.ts:401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L401) |
| <a id="clicks"></a> `clicks?` | `number` | Количество кликов | [types/promotion.types.ts:403](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L403) |
| <a id="cr"></a> `cr?` | `number` | CR(conversion rate) — это отношение количества заказов к общему количеству посещений медиакампании | [types/promotion.types.ts:405](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L405) |
| <a id="ctr"></a> `ctr?` | `number` | CTR (click-through rate) — показатель кликабельности, отношение числа кликов к количеству показов в рамках медиакампании | [types/promotion.types.ts:407](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L407) |
| <a id="date_from"></a> `date_from?` | `string` | Время начала размещения | [types/promotion.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L409) |
| <a id="date_to"></a> `date_to?` | `string` | Время завершения размещения | [types/promotion.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L411) |
| <a id="subject_name"></a> `subject_name?` | `string` | Родительская категория предмета | [types/promotion.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L413) |
| <a id="atbs"></a> `atbs?` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L415) |
| <a id="orders"></a> `orders?` | `number` | Количество заказов | [types/promotion.types.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L417) |
| <a id="price"></a> `price?` | `number` | Стоимость размещения | [types/promotion.types.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L419) |
| <a id="cpc"></a> `cpc?` | `number` | (cost per click) — цена клика по продвигаемому товару | [types/promotion.types.ts:421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L421) |
| <a id="status"></a> `status?` | `number` | Статус медиакампании | [types/promotion.types.ts:423](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L423) |
| <a id="daily_stats"></a> `daily_stats?` | [`DailyStats1`](../type-aliases/DailyStats1.md) | - | [types/promotion.types.ts:424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L424) |
| <a id="expenses"></a> `expenses?` | `number` | Стоимость размещения баннера | [types/promotion.types.ts:426](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L426) |
| <a id="cr1"></a> `cr1?` | `number` | Отношение количества добавлений в корзину к количеству кликов | [types/promotion.types.ts:428](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L428) |
| <a id="cr2"></a> `cr2?` | `number` | Отношение количества заказов к количеству добавлений в корзину | [types/promotion.types.ts:430](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L430) |
