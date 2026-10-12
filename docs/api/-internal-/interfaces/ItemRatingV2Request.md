[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingV2Request

# Interface: ItemRatingV2Request

Defined in: [types/analytics.types.ts:2044](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2044)

Request parameters for the v2 item-rating report.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`PeriodItemRating`](PeriodItemRating.md) | Current period. | [types/analytics.types.ts:2046](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2046) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriodItemRating`](PastPeriodItemRating.md) | Previous period for comparison (optional — enables compare mode). | [types/analytics.types.ts:2048](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2048) |
| <a id="nmids"></a> `nmIds?` | `number`[] | List of WB item numbers for filtering (max 50). | [types/analytics.types.ts:2050](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2050) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | List of subcategory IDs for filtering (max 50). | [types/analytics.types.ts:2052](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2052) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | List of brands for filtering (max 50). | [types/analytics.types.ts:2054](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2054) |
| <a id="tagids"></a> `tagIds?` | `number`[] | List of label IDs for filtering (max 50). | [types/analytics.types.ts:2056](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2056) |
| <a id="isnotincludenmswithoutsales"></a> `isNotIncludeNmsWithoutSales?` | `boolean` | Return only products with sales during `currentPeriod`. Default `false`. | [types/analytics.types.ts:2058](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2058) |
| <a id="onlyshadowednms"></a> `onlyShadowedNms?` | `boolean` | Return only products hidden from the catalog. Default `false`. | [types/analytics.types.ts:2060](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2060) |
| <a id="orderby"></a> `orderBy` | [`OrderByItemRating`](OrderByItemRating.md) | Sorting parameters. | [types/analytics.types.ts:2062](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2062) |
| <a id="limit"></a> `limit?` | `number` | Number of products in the response (default 100, max 1000). | [types/analytics.types.ts:2064](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2064) |
| <a id="offset"></a> `offset` | `number` | How many results to skip (pagination). | [types/analytics.types.ts:2066](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L2066) |
