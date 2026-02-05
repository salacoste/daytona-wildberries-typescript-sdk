[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableDetailsRequest

# Interface: TableDetailsRequest

Defined in: [types/analytics.types.ts:287](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L287)

Параметры запроса для пагинации по товарам в группе:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:288](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L288) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L289) |
| <a id="subjectid"></a> `subjectId?` | `number` | ID предмета | [types/analytics.types.ts:291](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L291) |
| <a id="brandname"></a> `brandName?` | `string` | Название товара | [types/analytics.types.ts:293](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L293) |
| <a id="tagid"></a> `tagId?` | `number` | ID ярлыка | [types/analytics.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L295) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Список артикулов WB | [types/analytics.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L297) |
| <a id="orderby"></a> `orderBy` | [`OrderBy`](OrderBy.md) | - | [types/analytics.types.ts:298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L298) |
| <a id="positioncluster"></a> `positionCluster` | `"all"` \| `"firstHundred"` \| `"secondHundred"` \| `"below"` | Товары с какой средней позицией в поиске показывать в отчёте: - `all` — все - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже | [types/analytics.types.ts:300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L300) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L302) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:304](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L304) |
| <a id="limit"></a> `limit` | `number` | Количество товаров в ответе | [types/analytics.types.ts:306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L306) |
| <a id="offset"></a> `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/9cacfbec2ace84b26aaf15892c1fecdc034d05cb/src/types/analytics.types.ts#L308) |
