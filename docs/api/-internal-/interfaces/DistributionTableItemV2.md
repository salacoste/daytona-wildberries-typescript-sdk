[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionTableItemV2

# Interface: DistributionTableItemV2

Defined in: [types/analytics.types.ts:2080](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2080)

A product row returned by the v2 item-rating report.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB item number. | [types/analytics.types.ts:2082](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2082) |
| <a id="title"></a> `title` | `string` | Product name. | [types/analytics.types.ts:2084](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2084) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Seller vendor code. | [types/analytics.types.ts:2086](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2086) |
| <a id="subjectid"></a> `subjectId` | `number` | Subject ID. | [types/analytics.types.ts:2088](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2088) |
| <a id="subjectname"></a> `subjectName` | `string` | Subject name. | [types/analytics.types.ts:2090](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2090) |
| <a id="brandname"></a> `brandName` | `string` | Brand name. | [types/analytics.types.ts:2092](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2092) |
| <a id="tagname"></a> `tagName` | `string` | Label name. | [types/analytics.types.ts:2094](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2094) |
| <a id="tagid"></a> `tagId` | `number` | Label ID. | [types/analytics.types.ts:2096](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2096) |
| <a id="pinnedfeedback"></a> `pinnedFeedback` | `boolean` | Whether a feedback entry is pinned. | [types/analytics.types.ts:2098](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2098) |
| <a id="rating"></a> `rating` | `number` | Product-card rating. | [types/analytics.types.ts:2100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2100) |
| <a id="feedbackrating"></a> `feedbackRating` | [`DistributionFeedbackRatingV2`](DistributionFeedbackRatingV2.md) | Feedback rating details. | [types/analytics.types.ts:2102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2102) |
| <a id="feedbackcount"></a> `feedbackCount` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | All feedback received during the period. | [types/analytics.types.ts:2104](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2104) |
| <a id="fivestar"></a> `fiveStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Five-star feedback received during the period. | [types/analytics.types.ts:2106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2106) |
| <a id="fourstar"></a> `fourStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Four-star feedback received during the period. | [types/analytics.types.ts:2108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2108) |
| <a id="threestar"></a> `threeStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Three-star feedback received during the period. | [types/analytics.types.ts:2110](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2110) |
| <a id="twostar"></a> `twoStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Two-star feedback received during the period. | [types/analytics.types.ts:2112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2112) |
| <a id="onestar"></a> `oneStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | One-star feedback received during the period. | [types/analytics.types.ts:2114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2114) |
| <a id="disqualified"></a> `disqualified` | `number` | Feedback excluded from the rating. | [types/analytics.types.ts:2116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2116) |
| <a id="isshadowed"></a> `isShadowed` | `boolean` | Whether the product is hidden from the catalog. | [types/analytics.types.ts:2118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2118) |
