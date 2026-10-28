[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportTextReq

# Interface: SearchReportTextReq

Defined in: [types/analytics.types.ts:787](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L787)

SEARCH_QUERIES_PREMIUM_REPORT_TEXT: С 2026-10-12 данные обновляются раз в 2 часа. Это свежесть данных, а не лимит запросов.
С 2026-10-12 только SEARCH_QUERIES_PREMIUM_REPORT_TEXT не содержит колонок OpenCardPercentile, AddToCartPercentile, OpenToCartPercentile, OrdersPercentile, CartToOrderPercentile. Остальные поля и варианты отчёта сохраняются.
Это параметры генерации, а не тип строки CSV; скачивание возвращает ArrayBuffer.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:789](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L789) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_TEXT` | [types/analytics.types.ts:791](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L791) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:793](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L793) |
| <a id="params"></a> `params` | \{ `currentPeriod`: [`Period`](Period.md); `pastPeriod?`: [`PastPeriod`](PastPeriod.md); `nmIds?`: `unknown`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `topOrderBy`: `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"`; `orderBy`: [`OrderByGrTe`](OrderByGrTe.md); `includeSubstitutedSKUs?`: `boolean`; `includeSearchTexts?`: `boolean`; `limit`: `number`; \} | Параметры отчёта | [types/analytics.types.ts:795](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L795) |
| `params.currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:796](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L796) |
| `params.pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:797](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L797) |
| `params.nmIds?` | `unknown`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт по всем товарам | [types/analytics.types.ts:799](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L799) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:801](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L801) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:803](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L803) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:805](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L805) |
| `params.topOrderBy` | `"openCard"` \| `"addToCart"` \| `"openToCart"` \| `"orders"` \| `"cartToOrder"` | Фильтрация по поисковым запросам, по которым больше всего: - `openCard` — перешли в карточку - `addToCart` — добавили в корзину - `openToCart` — конверсия в корзину - `orders` — заказали товаров - `cartToOrder` — конверсия в заказ | [types/analytics.types.ts:807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L807) |
| `params.orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:808](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L808) |
| `params.includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:810](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L810) |
| `params.includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L812) |
| `params.limit` | `number` | - | [types/analytics.types.ts:813](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L813) |
