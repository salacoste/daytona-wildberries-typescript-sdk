[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / MainRequest

# Interface: MainRequest

Defined in: [types/analytics.types.ts:15](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L15)

Параметры запроса для формирования главной страницы:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L16) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:17](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L17) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Список артикулов WB для фильтрации | [types/analytics.types.ts:19](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L19) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:21](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L21) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:23](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L23) |
| <a id="tagids"></a> `tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:25](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L25) |
| <a id="positioncluster"></a> `positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L26) |
| <a id="orderby"></a> `orderBy` | [`OrderBy`](OrderBy.md) | - | [types/analytics.types.ts:27](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L27) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:29](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L29) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:31](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L31) |
| <a id="limit"></a> `limit` | `number` | Количество групп товаров в ответе | [types/analytics.types.ts:33](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L33) |
| <a id="offset"></a> `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:35](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ad67de0cfda3f04b67ec440b3ad6fdcd2b037cbc/src/types/analytics.types.ts#L35) |
