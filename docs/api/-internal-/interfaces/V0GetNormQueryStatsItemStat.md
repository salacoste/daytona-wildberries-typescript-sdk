[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / V0GetNormQueryStatsItemStat

# Interface: V0GetNormQueryStatsItemStat

Defined in: [types/promotion.types.ts:936](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L936)

Статистика по конкретному поисковому кластеру

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="norm_query"></a> `norm_query?` | `string` | Поисковый кластер | [types/promotion.types.ts:938](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L938) |
| <a id="views"></a> `views?` | `number` | Количество просмотров (отсутствует для cpc-кампаний) | [types/promotion.types.ts:940](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L940) |
| <a id="clicks"></a> `clicks?` | `number` | Количество кликов | [types/promotion.types.ts:942](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L942) |
| <a id="atbs"></a> `atbs?` | `number` | Количество добавлений товаров в корзину | [types/promotion.types.ts:944](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L944) |
| <a id="orders"></a> `orders?` | `number` | Количество заказов | [types/promotion.types.ts:946](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L946) |
| <a id="ctr"></a> `ctr?` | `number` | Кликабельность — отношение числа кликов к количеству показов, % (отсутствует для cpc-кампаний) | [types/promotion.types.ts:948](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L948) |
| <a id="cpc"></a> `cpc?` | `number` | Стоимость одного клика, ₽ | [types/promotion.types.ts:950](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L950) |
| <a id="cpm"></a> `cpm?` | `number` | Средняя стоимость за тысячу показов, ₽ (отсутствует для cpc-кампаний) | [types/promotion.types.ts:952](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L952) |
| <a id="avg_pos"></a> `avg_pos?` | `number` | Средняя позиция товара на страницах поисковой выдачи | [types/promotion.types.ts:954](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/promotion.types.ts#L954) |
