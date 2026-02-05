[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableGroupRequest

# Interface: TableGroupRequest

Defined in: [types/analytics.types.ts:254](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L254)

Параметры запроса для пагинации по группам:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L255) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L256) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Список артикулов WB для фильтрации | [types/analytics.types.ts:258](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L258) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L260) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:262](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L262) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:264](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L264) |
| <a id="orderby"></a> `orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L265) |
| <a id="positioncluster"></a> `positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L266) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L268) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L270) |
| <a id="limit"></a> `limit` | `number` | Количество групп товаров в ответе | [types/analytics.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L272) |
| <a id="offset"></a> `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/67c91e2d737bf4501121eca5295b5314e3377bb5/src/types/analytics.types.ts#L274) |
