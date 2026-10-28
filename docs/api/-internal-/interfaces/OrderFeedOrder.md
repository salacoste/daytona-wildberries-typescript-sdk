[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFeedOrder

# Interface: OrderFeedOrder

Defined in: [types/analytics.types.ts:2188](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2188)

A single order row in the Order Feed report (1 order = 1 assembly order = 1 item).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB item number. | [types/analytics.types.ts:2190](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2190) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID. | [types/analytics.types.ts:2192](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2192) |
| <a id="srid"></a> `srid` | `string` | Order ID. | [types/analytics.types.ts:2194](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2194) |
| <a id="createdat"></a> `createdAt` | `string` | Order date and time. | [types/analytics.types.ts:2196](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2196) |
| <a id="updatedat"></a> `updatedAt` | `string` | Current status date and time. When `status` is `"created"`, the value of `createdAt` is returned. | [types/analytics.types.ts:2201](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2201) |
| <a id="status"></a> `status` | `"cancel"` \| `"created"` \| `"buyout"` \| `"return"` \| `"returnDefective"` | Order status: - `created` — placed - `buyout` — purchased - `cancel` — canceled - `return` — returned - `returnDefective` — returned due to defect | [types/analytics.types.ts:2210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2210) |
| <a id="canceltype"></a> `cancelType?` | `"other"` \| `"app"` \| `"receipt"` \| `"expire"` | Cancellation type (only present when `status` is `"cancel"`): - `app` — refused prior to receipt - `receipt` — refused at pickup - `expire` — pickup period ended - `other` — technical cancellation | [types/analytics.types.ts:2218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2218) |
| <a id="warehousename"></a> `warehouseName` | `string` | Warehouse name (`Склад WB` for WB warehouses). | [types/analytics.types.ts:2220](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2220) |
| <a id="warehouseregion"></a> `warehouseRegion` | `string` | The federal district where the warehouse is located; if the warehouse is not in Russia, the country is returned (`""` for WB warehouses). | [types/analytics.types.ts:2225](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2225) |
| <a id="ismp"></a> `isMp` | `boolean` | Warehouse type: `true` — seller warehouse, `false` — WB warehouse. | [types/analytics.types.ts:2227](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2227) |
| <a id="destinationcity"></a> `destinationCity` | `string` | Delivery location (city). | [types/analytics.types.ts:2229](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2229) |
| <a id="destinationdistrict"></a> `destinationDistrict` | `string` | The federal district to which the order is delivered (country if not in Russia). | [types/analytics.types.ts:2231](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2231) |
| <a id="sellerprice"></a> `sellerPrice` | `number` | Seller price with the seller discount applied — excluding the WB Club discount and the B2B wholesale discount. | [types/analytics.types.ts:2236](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2236) |
| <a id="isb2b"></a> `isB2b` | `boolean` | Sale type: `true` — B2B, `false` — B2C. | [types/analytics.types.ts:2238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L2238) |
