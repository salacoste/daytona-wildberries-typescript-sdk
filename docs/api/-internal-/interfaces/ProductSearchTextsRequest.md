[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ProductSearchTextsRequest

# Interface: ProductSearchTextsRequest

Defined in: [types/analytics.types.ts:321](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L321)

Параметры для запроса по рейтингу поисковых запросов:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:322](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L322) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:323](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L323) |
| <a id="nmids"></a> `nmIds` | `number`[] | Список артикулов WB | [types/analytics.types.ts:325](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L325) |
| <a id="toporderby"></a> `topOrderBy` | `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` | Фильтрация по поисковым запросам, по которым больше всего: - `openCard` — перешли в карточку - `addToCart` — добавили в корзину - `openToCart` — конверсия в корзину - `orders` — заказали товаров - `cartToOrder` — конверсия в заказ | [types/analytics.types.ts:327](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L327) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:329](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L329) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:331](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L331) |
| <a id="orderby"></a> `orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L332) |
| <a id="limit"></a> `limit` | `number` | - | [types/analytics.types.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/65f92e97515b67789156305aa76517f94c34a324/src/types/analytics.types.ts#L333) |
