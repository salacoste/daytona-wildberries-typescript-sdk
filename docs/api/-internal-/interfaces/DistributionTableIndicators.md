[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionTableIndicators

# Interface: DistributionTableIndicators

Defined in: [types/analytics.types.ts:1985](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1985)

Per-item indicator breakdown (feedback count + per-star counts + disqualified).

## Extended by

- [`DistributionTableItem`](DistributionTableItem.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="feedbackcount"></a> `feedbackCount?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Feedback count. | [types/analytics.types.ts:1987](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1987) |
| <a id="fivestar"></a> `fiveStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 5 star reviews. | [types/analytics.types.ts:1989](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1989) |
| <a id="fourstar"></a> `fourStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 4 star reviews. | [types/analytics.types.ts:1991](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1991) |
| <a id="threestar"></a> `threeStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 3 star reviews. | [types/analytics.types.ts:1993](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1993) |
| <a id="twostar"></a> `twoStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 2 star reviews. | [types/analytics.types.ts:1995](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1995) |
| <a id="onestar"></a> `oneStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 1 star reviews. | [types/analytics.types.ts:1997](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1997) |
| <a id="disqualified"></a> `disqualified?` | `number` | Excluded reviews. | [types/analytics.types.ts:1999](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1999) |
