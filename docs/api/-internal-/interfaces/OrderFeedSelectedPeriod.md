[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFeedSelectedPeriod

# Interface: OrderFeedSelectedPeriod

Defined in: [types/analytics.types.ts:2143](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2143)

Requested period for the Order Feed report — by date of the current order status.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="start"></a> `start` | `string` | Start date and time of the period (date-time). No later than `end`. No earlier than 31 days from today. | [types/analytics.types.ts:2148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2148) |
| <a id="end"></a> `end?` | `string` | End date and time of the period (date-time). | [types/analytics.types.ts:2150](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2150) |
