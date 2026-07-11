[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableItemBaseCommon

# Interface: TableItemBaseCommon

Defined in: [types/analytics.types.ts:1907](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1907)

Base item fields shared by per-item rows.

## Extended by

- [`DistributionTableItem`](DistributionTableItem.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId?` | `number` | WB item number. | [types/analytics.types.ts:1909](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1909) |
| <a id="title"></a> `title?` | `string` | Item name. | [types/analytics.types.ts:1911](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1911) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Seller item number (vendor code). | [types/analytics.types.ts:1913](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1913) |
| <a id="subjectid"></a> `subjectId?` | `number` | Subcategory ID. | [types/analytics.types.ts:1915](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1915) |
| <a id="subjectname"></a> `subjectName?` | `string` | Subcategory name. | [types/analytics.types.ts:1917](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1917) |
| <a id="brandname"></a> `brandName?` | `string` | Brand. | [types/analytics.types.ts:1919](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1919) |
| <a id="tagname"></a> `tagName?` | `string` | Label name. | [types/analytics.types.ts:1921](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1921) |
| <a id="tagid"></a> `tagId?` | `number` | Label ID. | [types/analytics.types.ts:1923](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1923) |
| <a id="pinnedfeedback"></a> `pinnedFeedback?` | `boolean` | Whether the review is pinned. | [types/analytics.types.ts:1925](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1925) |
| <a id="rating"></a> `rating?` | `number` | Listing rating. | [types/analytics.types.ts:1927](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1927) |
| <a id="feedbackrating"></a> `feedbackRating?` | [`DistributionFeedbackRating`](DistributionFeedbackRating.md) | Feedback rating (current + optional dynamics + optional percentile). | [types/analytics.types.ts:1929](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1929) |
