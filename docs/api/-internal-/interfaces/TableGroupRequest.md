[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableGroupRequest

# Interface: TableGroupRequest

Defined in: [types/analytics.types.ts:333](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L333)

Параметры запроса для пагинации по группам:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:334](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L334) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L335) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Список артикулов WB для фильтрации | [types/analytics.types.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L337) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L339) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L341) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:343](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L343) |
| <a id="orderby"></a> `orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:344](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L344) |
| <a id="positioncluster"></a> `positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:345](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L345) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:347](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L347) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:349](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L349) |
| <a id="limit"></a> `limit` | `number` | Количество групп товаров в ответе | [types/analytics.types.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L351) |
| <a id="offset"></a> `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:353](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/40854491c098fd9c2bdad3e364f150bbb7e8739a/src/types/analytics.types.ts#L353) |
