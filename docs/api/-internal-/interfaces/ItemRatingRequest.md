[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingRequest

# Interface: ItemRatingRequest

Defined in: [types/analytics.types.ts:1827](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1827)

Request parameters for POST /api/analytics/v1/item-rating.
Supports a single-period mode (`currentPeriod` only) and a compare mode
(`currentPeriod` + `pastPeriod`).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`PeriodItemRating`](PeriodItemRating.md) | Current period. | [types/analytics.types.ts:1829](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1829) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriodItemRating`](PastPeriodItemRating.md) | Previous period for comparison (optional — enables compare mode). | [types/analytics.types.ts:1831](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1831) |
| <a id="nmids"></a> `nmIds?` | `number`[] | List of WB item numbers for filtering (max 50). | [types/analytics.types.ts:1833](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1833) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | List of subcategory IDs for filtering (max 50). | [types/analytics.types.ts:1835](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1835) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | List of brands for filtering (max 50). | [types/analytics.types.ts:1837](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1837) |
| <a id="tagids"></a> `tagIds?` | `number`[] | List of label IDs for filtering (max 50). | [types/analytics.types.ts:1839](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1839) |
| <a id="isnotincludenmswithoutsales"></a> `isNotIncludeNMsWithoutSales?` | `boolean` | Do not count items without sales. Default `false`. | [types/analytics.types.ts:1841](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1841) |
| <a id="orderby"></a> `orderBy` | [`OrderByItemRating`](OrderByItemRating.md) | Sorting parameters. | [types/analytics.types.ts:1843](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1843) |
| <a id="limit"></a> `limit?` | `number` | Number of items in the response (default 100, max 1000). | [types/analytics.types.ts:1845](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1845) |
| <a id="offset"></a> `offset` | `number` | How many results to skip (pagination). | [types/analytics.types.ts:1847](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1847) |
