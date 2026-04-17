[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ProductSearchTextsRequest

# Interface: ProductSearchTextsRequest

Defined in: [types/analytics.types.ts:400](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L400)

Параметры для запроса по рейтингу поисковых запросов:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:401](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L401) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:402](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L402) |
| <a id="nmids"></a> `nmIds` | `number`[] | Список артикулов WB | [types/analytics.types.ts:404](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L404) |
| <a id="toporderby"></a> `topOrderBy` | `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` | Фильтрация по поисковым запросам, по которым больше всего: - `openCard` — перешли в карточку - `addToCart` — добавили в корзину - `openToCart` — конверсия в корзину - `orders` — заказали товаров - `cartToOrder` — конверсия в заказ | [types/analytics.types.ts:406](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L406) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:408](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L408) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:410](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L410) |
| <a id="orderby"></a> `orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L411) |
| <a id="limit"></a> `limit` | `number` | - | [types/analytics.types.ts:412](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/b093609f1118d81fd917e81c75e22fd1efd4f0a3/src/types/analytics.types.ts#L412) |
