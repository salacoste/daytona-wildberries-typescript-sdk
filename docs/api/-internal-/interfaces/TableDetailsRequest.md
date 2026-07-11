[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableDetailsRequest

# Interface: TableDetailsRequest

Defined in: [types/analytics.types.ts:378](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L378)

Параметры запроса для пагинации по товарам в группе:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L379) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:380](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L380) |
| <a id="subjectid"></a> `subjectId?` | `number` | ID предмета | [types/analytics.types.ts:382](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L382) |
| <a id="brandname"></a> `brandName?` | `string` | Название товара | [types/analytics.types.ts:384](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L384) |
| <a id="tagid"></a> `tagId?` | `number` | ID ярлыка | [types/analytics.types.ts:386](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L386) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Список артикулов WB | [types/analytics.types.ts:388](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L388) |
| <a id="orderby"></a> `orderBy` | [`OrderBy`](OrderBy.md) | - | [types/analytics.types.ts:389](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L389) |
| <a id="positioncluster"></a> `positionCluster` | `"all"` \| `"firstHundred"` \| `"secondHundred"` \| `"below"` | Товары с какой средней позицией в поиске показывать в отчёте: - `all` — все - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже | [types/analytics.types.ts:391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L391) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:393](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L393) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L395) |
| <a id="limit"></a> `limit` | `number` | Количество товаров в ответе | [types/analytics.types.ts:397](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L397) |
| <a id="offset"></a> `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:399](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L399) |
