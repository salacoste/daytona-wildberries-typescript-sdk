[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DistributionTableIndicators

# Interface: DistributionTableIndicators

Defined in: [types/analytics.types.ts:2002](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2002)

Per-item indicator breakdown (feedback count + per-star counts + disqualified).

## Extended by

- [`DistributionTableItem`](DistributionTableItem.md)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="feedbackcount"></a> `feedbackCount?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | Feedback count. | [types/analytics.types.ts:2004](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2004) |
| <a id="fivestar"></a> `fiveStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 5 star reviews. | [types/analytics.types.ts:2006](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2006) |
| <a id="fourstar"></a> `fourStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 4 star reviews. | [types/analytics.types.ts:2008](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2008) |
| <a id="threestar"></a> `threeStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 3 star reviews. | [types/analytics.types.ts:2010](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2010) |
| <a id="twostar"></a> `twoStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 2 star reviews. | [types/analytics.types.ts:2012](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2012) |
| <a id="onestar"></a> `oneStar?` | [`DistributionTableIndicator`](DistributionTableIndicator.md) | 1 star reviews. | [types/analytics.types.ts:2014](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2014) |
| <a id="disqualified"></a> `disqualified?` | `number` | Excluded reviews. | [types/analytics.types.ts:2016](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2016) |
