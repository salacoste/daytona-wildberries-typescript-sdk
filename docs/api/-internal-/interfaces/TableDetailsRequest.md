[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableDetailsRequest

# Interface: TableDetailsRequest

Defined in: [types/analytics.types.ts:366](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L366)

Параметры запроса для пагинации по товарам в группе:
 - `currentPeriod` — текущий период
 - `pastPeriod` — предыдущий период для сравнения

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L367) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:368](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L368) |
| <a id="subjectid"></a> `subjectId?` | `number` | ID предмета | [types/analytics.types.ts:370](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L370) |
| <a id="brandname"></a> `brandName?` | `string` | Название товара | [types/analytics.types.ts:372](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L372) |
| <a id="tagid"></a> `tagId?` | `number` | ID ярлыка | [types/analytics.types.ts:374](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L374) |
| <a id="nmids"></a> `nmIds?` | `number`[] | Список артикулов WB | [types/analytics.types.ts:376](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L376) |
| <a id="orderby"></a> `orderBy` | [`OrderBy`](OrderBy.md) | - | [types/analytics.types.ts:377](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L377) |
| <a id="positioncluster"></a> `positionCluster` | `"all"` \| `"firstHundred"` \| `"secondHundred"` \| `"below"` | Товары с какой средней позицией в поиске показывать в отчёте: - `all` — все - `firstHundred` — от 1 до 100 - `secondHundred` — от 101 до 200 - `below` — от 201 и ниже | [types/analytics.types.ts:379](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L379) |
| <a id="includesubstitutedskus"></a> `includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:381](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L381) |
| <a id="includesearchtexts"></a> `includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:383](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L383) |
| <a id="limit"></a> `limit` | `number` | Количество товаров в ответе | [types/analytics.types.ts:385](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L385) |
| <a id="offset"></a> `offset` | `number` | После какого элемента выдавать данные | [types/analytics.types.ts:387](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0912eeca65155dd0ee8d9313738fde42af8bd829/src/types/analytics.types.ts#L387) |
