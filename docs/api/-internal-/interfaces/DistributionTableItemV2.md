[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionTableItemV2

# Interface: DistributionTableItemV2

Defined in: [types/analytics.types.ts:2063](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2063)

A product row returned by the v2 item-rating report.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB item number. | [types/analytics.types.ts:2065](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2065) |
| <a id="title"></a> `title` | `string` | Product name. | [types/analytics.types.ts:2067](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2067) |
| <a id="vendorcode"></a> `vendorCode` | `string` | Seller vendor code. | [types/analytics.types.ts:2069](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2069) |
| <a id="subjectid"></a> `subjectId` | `number` | Subject ID. | [types/analytics.types.ts:2071](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2071) |
| <a id="subjectname"></a> `subjectName` | `string` | Subject name. | [types/analytics.types.ts:2073](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2073) |
| <a id="brandname"></a> `brandName` | `string` | Brand name. | [types/analytics.types.ts:2075](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2075) |
| <a id="tagname"></a> `tagName` | `string` | Label name. | [types/analytics.types.ts:2077](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2077) |
| <a id="tagid"></a> `tagId` | `number` | Label ID. | [types/analytics.types.ts:2079](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2079) |
| <a id="pinnedfeedback"></a> `pinnedFeedback` | `boolean` | Whether a feedback entry is pinned. | [types/analytics.types.ts:2081](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2081) |
| <a id="rating"></a> `rating` | `number` | Product-card rating. | [types/analytics.types.ts:2083](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2083) |
| <a id="feedbackrating"></a> `feedbackRating` | [`DistributionFeedbackRatingV2`](DistributionFeedbackRatingV2.md) | Feedback rating details. | [types/analytics.types.ts:2085](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2085) |
| <a id="feedbackcount"></a> `feedbackCount` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | All feedback received during the period. | [types/analytics.types.ts:2087](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2087) |
| <a id="fivestar"></a> `fiveStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Five-star feedback received during the period. | [types/analytics.types.ts:2089](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2089) |
| <a id="fourstar"></a> `fourStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Four-star feedback received during the period. | [types/analytics.types.ts:2091](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2091) |
| <a id="threestar"></a> `threeStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Three-star feedback received during the period. | [types/analytics.types.ts:2093](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2093) |
| <a id="twostar"></a> `twoStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Two-star feedback received during the period. | [types/analytics.types.ts:2095](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2095) |
| <a id="onestar"></a> `oneStar` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | One-star feedback received during the period. | [types/analytics.types.ts:2097](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2097) |
| <a id="disqualified"></a> `disqualified` | `number` | Feedback excluded from the rating. | [types/analytics.types.ts:2099](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2099) |
| <a id="isshadowed"></a> `isShadowed` | `boolean` | Whether the product is hidden from the catalog. | [types/analytics.types.ts:2101](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L2101) |
