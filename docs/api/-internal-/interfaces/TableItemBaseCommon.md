[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableItemBaseCommon

# Interface: TableItemBaseCommon

Defined in: [types/analytics.types.ts:1968](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1968)

Base item fields shared by per-item rows.

## Extended by

- [`DistributionTableItem`](DistributionTableItem.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | WB item number. | [types/analytics.types.ts:1970](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1970) |
| <a id="title"></a> `title?` | `string` | Item name. | [types/analytics.types.ts:1972](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1972) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Seller item number (vendor code). | [types/analytics.types.ts:1974](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1974) |
| <a id="subjectid"></a> `subjectId?` | `number` | Subcategory ID. | [types/analytics.types.ts:1976](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1976) |
| <a id="subjectname"></a> `subjectName?` | `string` | Subcategory name. | [types/analytics.types.ts:1978](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1978) |
| <a id="brandname"></a> `brandName?` | `string` | Brand. | [types/analytics.types.ts:1980](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1980) |
| <a id="tagname"></a> `tagName?` | `string` | Label name. | [types/analytics.types.ts:1982](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1982) |
| <a id="tagid"></a> `tagId?` | `number` | Label ID. | [types/analytics.types.ts:1984](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1984) |
| <a id="pinnedfeedback"></a> `pinnedFeedback?` | `boolean` | Whether the review is pinned. | [types/analytics.types.ts:1986](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1986) |
| <a id="rating"></a> `rating?` | `number` | Listing rating. | [types/analytics.types.ts:1988](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1988) |
| <a id="feedbackrating"></a> `feedbackRating?` | [`DistributionFeedbackRating`](DistributionFeedbackRating.md) | Feedback rating (current + optional dynamics + optional percentile). | [types/analytics.types.ts:1990](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1990) |
