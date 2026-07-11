[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionTableIndicators

# Interface: DistributionTableIndicators

Defined in: [types/analytics.types.ts:1941](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1941)

Per-item indicator breakdown (feedback count + per-star counts + disqualified).

## Extended by

- [`DistributionTableItem`](DistributionTableItem.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="feedbackcount"></a> `feedbackCount?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Feedback count. | [types/analytics.types.ts:1943](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1943) |
| <a id="fivestar"></a> `fiveStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 5 star reviews. | [types/analytics.types.ts:1945](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1945) |
| <a id="fourstar"></a> `fourStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 4 star reviews. | [types/analytics.types.ts:1947](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1947) |
| <a id="threestar"></a> `threeStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 3 star reviews. | [types/analytics.types.ts:1949](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1949) |
| <a id="twostar"></a> `twoStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 2 star reviews. | [types/analytics.types.ts:1951](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1951) |
| <a id="onestar"></a> `oneStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 1 star reviews. | [types/analytics.types.ts:1953](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1953) |
| <a id="disqualified"></a> `disqualified?` | `number` | Excluded reviews. | [types/analytics.types.ts:1955](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1955) |
