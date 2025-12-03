[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportTableGroupItem

# Interface: SearchReportTableGroupItem

Defined in: [types/analytics.types.ts:1073](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1073)

Table group item in search report

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="subjectname"></a> `subjectName?` | `string` | Subject name | [types/analytics.types.ts:1075](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1075) |
| <a id="subjectid"></a> `subjectId?` | `number` | Subject ID | [types/analytics.types.ts:1077](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1077) |
| <a id="brandname"></a> `brandName?` | `string` | Brand name | [types/analytics.types.ts:1079](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1079) |
| <a id="tagname"></a> `tagName?` | `string` | Tag name | [types/analytics.types.ts:1081](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1081) |
| <a id="tagid"></a> `tagId?` | `number` | Tag ID | [types/analytics.types.ts:1083](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1083) |
| <a id="metrics"></a> `metrics` | \{ `avgPosition`: [`MetricWithDynamics`](MetricWithDynamics.md); `openCard`: [`MetricWithDynamics`](MetricWithDynamics.md); `addToCart`: [`MetricWithDynamics`](MetricWithDynamics.md); `openToCart`: [`MetricWithDynamics`](MetricWithDynamics.md); `orders`: [`MetricWithDynamics`](MetricWithDynamics.md); `cartToOrder`: [`MetricWithDynamics`](MetricWithDynamics.md); `visibility`: [`MetricWithDynamics`](MetricWithDynamics.md); \} | Metrics for this group | [types/analytics.types.ts:1085](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1085) |
| `metrics.avgPosition` | [`MetricWithDynamics`](MetricWithDynamics.md) | Average position | [types/analytics.types.ts:1087](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1087) |
| `metrics.openCard` | [`MetricWithDynamics`](MetricWithDynamics.md) | Card opens | [types/analytics.types.ts:1089](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1089) |
| `metrics.addToCart` | [`MetricWithDynamics`](MetricWithDynamics.md) | Add to cart | [types/analytics.types.ts:1091](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1091) |
| `metrics.openToCart` | [`MetricWithDynamics`](MetricWithDynamics.md) | Conversion to cart | [types/analytics.types.ts:1093](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1093) |
| `metrics.orders` | [`MetricWithDynamics`](MetricWithDynamics.md) | Orders count | [types/analytics.types.ts:1095](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1095) |
| `metrics.cartToOrder` | [`MetricWithDynamics`](MetricWithDynamics.md) | Cart to order conversion | [types/analytics.types.ts:1097](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1097) |
| `metrics.visibility` | [`MetricWithDynamics`](MetricWithDynamics.md) | Visibility | [types/analytics.types.ts:1099](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1099) |
