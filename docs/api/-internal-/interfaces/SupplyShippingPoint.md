[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplyShippingPoint

# Interface: SupplyShippingPoint

Defined in: [types/orders-fbs.types.ts:1253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1253)

Supply shipping point returned by the per-supply shipping-points method —
the points available for the SPECIFIED supply. Unlike the deprecated
global [ShippingPoint](ShippingPoint.md): no `cargoTypes` filter (per-supply availability
replaces it), `officeType` adds `pfc`/`gpp`, and each point reports whether
it is available for this supply (`available`).
Maps to swagger schema: SupplyShippingPoint

## See

task-240

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `number` | Shipping point ID — use as `shippingPointId` in `updateShippingMethod()` | [types/orders-fbs.types.ts:1255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1255) |
| <a id="name"></a> `name` | `string` | Name (e.g. 'Москва Морской') | [types/orders-fbs.types.ts:1257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1257) |
| <a id="address"></a> `address` | `string` | Address (e.g. 'г Москва, Морской Проспект 54') | [types/orders-fbs.types.ts:1259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1259) |
| <a id="city"></a> `city` | `string` | Locality | [types/orders-fbs.types.ts:1261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1261) |
| <a id="officetype"></a> `officeType` | [`SupplyShippingPointOfficeType`](../type-aliases/SupplyShippingPointOfficeType.md) | Shipping point type (sorting center / warehouse / pickup point / partner fulfillment center / items acceptance point) | [types/orders-fbs.types.ts:1263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1263) |
| <a id="latitude"></a> `latitude` | `number` | Latitude | [types/orders-fbs.types.ts:1265](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1265) |
| <a id="longitude"></a> `longitude` | `number` | Longitude | [types/orders-fbs.types.ts:1267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1267) |
| <a id="fulfillment"></a> `fulfillment` | `boolean` | Whether the **Fulfillment in SC** service for FBS supplies is available at this shipping point | [types/orders-fbs.types.ts:1272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1272) |
| <a id="available"></a> `available` | `boolean` | Whether the shipping point is available for this supply. `false` for a pickup point overloaded on the planned supply shipping date | [types/orders-fbs.types.ts:1277](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1277) |
