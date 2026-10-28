[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingRequest

# Interface: ItemRatingRequest

Defined in: [types/analytics.types.ts:1888](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1888)

Request parameters for POST /api/analytics/v1/item-rating.
Supports a single-period mode (`currentPeriod` only) and a compare mode
(`currentPeriod` + `pastPeriod`).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`PeriodItemRating`](PeriodItemRating.md) | Current period. | [types/analytics.types.ts:1890](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1890) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriodItemRating`](PastPeriodItemRating.md) | Previous period for comparison (optional — enables compare mode). | [types/analytics.types.ts:1892](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1892) |
| <a id="nmids"></a> `nmIds?` | `number`[] | List of WB item numbers for filtering (max 50). | [types/analytics.types.ts:1894](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1894) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | List of subcategory IDs for filtering (max 50). | [types/analytics.types.ts:1896](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1896) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | List of brands for filtering (max 50). | [types/analytics.types.ts:1898](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1898) |
| <a id="tagids"></a> `tagIds?` | `number`[] | List of label IDs for filtering (max 50). | [types/analytics.types.ts:1900](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1900) |
| <a id="isnotincludenmswithoutsales"></a> `isNotIncludeNMsWithoutSales?` | `boolean` | Do not count items without sales. Default `false`. | [types/analytics.types.ts:1902](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1902) |
| <a id="orderby"></a> `orderBy` | [`OrderByItemRating`](OrderByItemRating.md) | Sorting parameters. | [types/analytics.types.ts:1904](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1904) |
| <a id="limit"></a> `limit?` | `number` | Number of items in the response (default 100, max 1000). | [types/analytics.types.ts:1906](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1906) |
| <a id="offset"></a> `offset` | `number` | How many results to skip (pagination). | [types/analytics.types.ts:1908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1908) |
