[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableItemBaseCommon

# Interface: TableItemBaseCommon

Defined in: [types/analytics.types.ts:1951](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1951)

Base item fields shared by per-item rows.

## Extended by

- [`DistributionTableItem`](DistributionTableItem.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | WB item number. | [types/analytics.types.ts:1953](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1953) |
| <a id="title"></a> `title?` | `string` | Item name. | [types/analytics.types.ts:1955](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1955) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Seller item number (vendor code). | [types/analytics.types.ts:1957](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1957) |
| <a id="subjectid"></a> `subjectId?` | `number` | Subcategory ID. | [types/analytics.types.ts:1959](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1959) |
| <a id="subjectname"></a> `subjectName?` | `string` | Subcategory name. | [types/analytics.types.ts:1961](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1961) |
| <a id="brandname"></a> `brandName?` | `string` | Brand. | [types/analytics.types.ts:1963](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1963) |
| <a id="tagname"></a> `tagName?` | `string` | Label name. | [types/analytics.types.ts:1965](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1965) |
| <a id="tagid"></a> `tagId?` | `number` | Label ID. | [types/analytics.types.ts:1967](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1967) |
| <a id="pinnedfeedback"></a> `pinnedFeedback?` | `boolean` | Whether the review is pinned. | [types/analytics.types.ts:1969](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1969) |
| <a id="rating"></a> `rating?` | `number` | Listing rating. | [types/analytics.types.ts:1971](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1971) |
| <a id="feedbackrating"></a> `feedbackRating?` | [`DistributionFeedbackRating`](DistributionFeedbackRating.md) | Feedback rating (current + optional dynamics + optional percentile). | [types/analytics.types.ts:1973](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1973) |
