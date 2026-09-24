[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ItemRatingV2Request

# Interface: ItemRatingV2Request

Defined in: [types/analytics.types.ts:2027](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2027)

Request parameters for the v2 item-rating report.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="currentperiod"></a> `currentPeriod` | [`PeriodItemRating`](PeriodItemRating.md) | Current period. | [types/analytics.types.ts:2029](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2029) |
| <a id="pastperiod"></a> `pastPeriod?` | [`PastPeriodItemRating`](PastPeriodItemRating.md) | Previous period for comparison (optional — enables compare mode). | [types/analytics.types.ts:2031](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2031) |
| <a id="nmids"></a> `nmIds?` | `number`[] | List of WB item numbers for filtering (max 50). | [types/analytics.types.ts:2033](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2033) |
| <a id="subjectids"></a> `subjectIds?` | `number`[] | List of subcategory IDs for filtering (max 50). | [types/analytics.types.ts:2035](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2035) |
| <a id="brandnames"></a> `brandNames?` | `string`[] | List of brands for filtering (max 50). | [types/analytics.types.ts:2037](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2037) |
| <a id="tagids"></a> `tagIds?` | `number`[] | List of label IDs for filtering (max 50). | [types/analytics.types.ts:2039](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2039) |
| <a id="isnotincludenmswithoutsales"></a> `isNotIncludeNmsWithoutSales?` | `boolean` | Return only products with sales during `currentPeriod`. Default `false`. | [types/analytics.types.ts:2041](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2041) |
| <a id="onlyshadowednms"></a> `onlyShadowedNms?` | `boolean` | Return only products hidden from the catalog. Default `false`. | [types/analytics.types.ts:2043](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2043) |
| <a id="orderby"></a> `orderBy` | [`OrderByItemRating`](OrderByItemRating.md) | Sorting parameters. | [types/analytics.types.ts:2045](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2045) |
| <a id="limit"></a> `limit?` | `number` | Number of products in the response (default 100, max 1000). | [types/analytics.types.ts:2047](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2047) |
| <a id="offset"></a> `offset` | `number` | How many results to skip (pagination). | [types/analytics.types.ts:2049](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2049) |
