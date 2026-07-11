[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0GetNormQueryStatsItemStat

# Interface: V0GetNormQueryStatsItemStat

Defined in: [types/promotion.types.ts:926](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L926)

Статистика по конкретному поисковому кластеру

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="norm_query"></a> `norm_query?` | `string` | Поисковый кластер | [types/promotion.types.ts:928](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L928) |
| <a id="views"></a> `views?` | `number` | Количество просмотров (отсутствует для cpc-кампаний) | [types/promotion.types.ts:930](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L930) |
| <a id="clicks"></a> `clicks?` | `number` | Количество кликов | [types/promotion.types.ts:932](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L932) |
| <a id="atbs"></a> `atbs?` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:934](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L934) |
| <a id="orders"></a> `orders?` | `number` | Количество заказов | [types/promotion.types.ts:936](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L936) |
| <a id="ctr"></a> `ctr?` | `number` | Кликабельность — отношение числа кликов к количеству показов, % (отсутствует для cpc-кампаний) | [types/promotion.types.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L938) |
| <a id="cpc"></a> `cpc?` | `number` | Стоимость одного клика, ₽ | [types/promotion.types.ts:940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L940) |
| <a id="cpm"></a> `cpm?` | `number` | Средняя стоимость за тысячу показов, ₽ (отсутствует для cpc-кампаний) | [types/promotion.types.ts:942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L942) |
| <a id="avg_pos"></a> `avg_pos?` | `number` | Средняя позиция товара на страницах поисковой выдачи | [types/promotion.types.ts:944](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L944) |
| <a id="shks"></a> `shks?` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:946](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L946) |
| <a id="spend"></a> `spend?` | `number` | Затраты на продвижение товара в конкретном поисковом кластере кампании | [types/promotion.types.ts:948](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L948) |
| <a id="currency"></a> `currency?` | `string` | Валюта [кабинета продавца](https://cmp.wildberries.ru/campaigns/finances) (ISO 4217, напр. 'RUB'). **Since** task-170 | [types/promotion.types.ts:953](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L953) |
