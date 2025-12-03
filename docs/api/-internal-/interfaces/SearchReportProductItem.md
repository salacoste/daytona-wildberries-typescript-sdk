[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportProductItem

# Interface: SearchReportProductItem

Defined in: [types/analytics.types.ts:1146](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1146)

Product item in search report table details

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | Wildberries article number | [types/analytics.types.ts:1148](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1148) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Vendor code | [types/analytics.types.ts:1150](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1150) |
| <a id="name"></a> `name?` | `string` | Product name | [types/analytics.types.ts:1152](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1152) |
| <a id="subjectname"></a> `subjectName?` | `string` | Subject name | [types/analytics.types.ts:1154](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1154) |
| <a id="brandname"></a> `brandName?` | `string` | Brand name | [types/analytics.types.ts:1156](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1156) |
| <a id="isadvertised"></a> `isAdvertised?` | `boolean` | Is advertised | [types/analytics.types.ts:1158](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1158) |
| <a id="rating"></a> `rating?` | `number` | Card rating | [types/analytics.types.ts:1160](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1160) |
| <a id="feedbackrating"></a> `feedbackRating?` | `number` | Feedback rating | [types/analytics.types.ts:1162](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1162) |
| <a id="price"></a> `price?` | \{ `minPrice`: `number`; `maxPrice`: `number`; \} | Price info | [types/analytics.types.ts:1164](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1164) |
| `price.minPrice` | `number` | - | [types/analytics.types.ts:1165](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1165) |
| `price.maxPrice` | `number` | - | [types/analytics.types.ts:1166](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1166) |
| <a id="avgposition"></a> `avgPosition` | [`MetricWithDynamics`](MetricWithDynamics.md) | Average position | [types/analytics.types.ts:1169](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1169) |
| <a id="opencard"></a> `openCard` | [`MetricWithDynamics`](MetricWithDynamics.md) | Card opens | [types/analytics.types.ts:1171](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1171) |
| <a id="addtocart"></a> `addToCart` | [`MetricWithDynamics`](MetricWithDynamics.md) | Add to cart | [types/analytics.types.ts:1173](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1173) |
| <a id="opentocart"></a> `openToCart` | [`MetricWithDynamics`](MetricWithDynamics.md) | Conversion to cart | [types/analytics.types.ts:1175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1175) |
| <a id="orders"></a> `orders` | [`MetricWithDynamics`](MetricWithDynamics.md) | Orders | [types/analytics.types.ts:1177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1177) |
| <a id="carttoorder"></a> `cartToOrder` | [`MetricWithDynamics`](MetricWithDynamics.md) | Cart to order conversion | [types/analytics.types.ts:1179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1179) |
| <a id="visibility"></a> `visibility` | [`MetricWithDynamics`](MetricWithDynamics.md) | Visibility | [types/analytics.types.ts:1181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1181) |
