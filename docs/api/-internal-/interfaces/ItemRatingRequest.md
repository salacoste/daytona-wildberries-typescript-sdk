[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingRequest

# Interface: ItemRatingRequest

Defined in: [types/analytics.types.ts:1871](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1871)

Request parameters for POST /api/analytics/v1/item-rating.
Supports a single-period mode (`currentPeriod` only) and a compare mode
(`currentPeriod` + `pastPeriod`).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`PeriodItemRating`](PeriodItemRating.md) | Current period. | [types/analytics.types.ts:1873](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1873) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriodItemRating`](PastPeriodItemRating.md) | Previous period for comparison (optional — enables compare mode). | [types/analytics.types.ts:1875](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1875) |
| <a id="nmids"></a> `nmIds?` | `number`[] | List of WB item numbers for filtering (max 50). | [types/analytics.types.ts:1877](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1877) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | List of subcategory IDs for filtering (max 50). | [types/analytics.types.ts:1879](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1879) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | List of brands for filtering (max 50). | [types/analytics.types.ts:1881](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1881) |
| <a id="tagids"></a> `tagIds?` | `number`[] | List of label IDs for filtering (max 50). | [types/analytics.types.ts:1883](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1883) |
| <a id="isnotincludenmswithoutsales"></a> `isNotIncludeNMsWithoutSales?` | `boolean` | Do not count items without sales. Default `false`. | [types/analytics.types.ts:1885](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1885) |
| <a id="orderby"></a> `orderBy` | [`OrderByItemRating`](OrderByItemRating.md) | Sorting parameters. | [types/analytics.types.ts:1887](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1887) |
| <a id="limit"></a> `limit?` | `number` | Number of items in the response (default 100, max 1000). | [types/analytics.types.ts:1889](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1889) |
| <a id="offset"></a> `offset` | `number` | How many results to skip (pagination). | [types/analytics.types.ts:1891](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1891) |
