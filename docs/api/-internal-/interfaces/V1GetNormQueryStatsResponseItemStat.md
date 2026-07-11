[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V1GetNormQueryStatsResponseItemStat

# Interface: V1GetNormQueryStatsResponseItemStat

Defined in: [types/promotion.types.ts:1069](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1069)

Статистика по конкретному поисковому кластеру (v1)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="normquery"></a> `normQuery?` | `string` | Поисковый кластер | [types/promotion.types.ts:1071](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1071) |
| <a id="atbs"></a> `atbs?` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:1073](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1073) |
| <a id="avgpos"></a> `avgPos?` | `number` | Средняя позиция товара на страницах поисковой выдачи | [types/promotion.types.ts:1075](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1075) |
| <a id="clicks"></a> `clicks?` | `number` | Количество кликов | [types/promotion.types.ts:1077](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1077) |
| <a id="cpc"></a> `cpc?` | `number` | Стоимость одного клика, в базовых единицах валюты кабинета продавца | [types/promotion.types.ts:1079](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1079) |
| <a id="cpm"></a> `cpm?` | `number` | Средняя стоимость за тысячу показов, в базовых единицах валюты кабинета продавца (null для cpc-кампаний) | [types/promotion.types.ts:1081](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1081) |
| <a id="ctr"></a> `ctr?` | `number` | Кликабельность — отношение числа кликов к количеству показов, % (null для cpc-кампаний) | [types/promotion.types.ts:1083](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1083) |
| <a id="orders"></a> `orders?` | `number` | Количество заказов | [types/promotion.types.ts:1085](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1085) |
| <a id="shks"></a> `shks?` | `number` | Количество заказанных товаров, шт. | [types/promotion.types.ts:1087](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1087) |
| <a id="spend"></a> `spend?` | `number` | Затраты на продвижение товара в конкретном поисковом кластере кампании | [types/promotion.types.ts:1089](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1089) |
| <a id="views"></a> `views?` | `number` | Количество просмотров (null для cpc-кампаний) | [types/promotion.types.ts:1091](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/promotion.types.ts#L1091) |
