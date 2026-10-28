[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdateSupplyShippingMethod

# Interface: UpdateSupplyShippingMethod

Defined in: [types/orders-fbs.types.ts:1326](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1326)

Per-supply shipping parameters entry.
Maps to swagger schema: UpdateSupplyShippingMethod

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="supplyid"></a> `supplyId` | `string` | Supply ID | [types/orders-fbs.types.ts:1328](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1328) |
| <a id="shippingdt"></a> `shippingDt` | `string` | Planned supply shipping date, format `YYYY-MM-DD` | [types/orders-fbs.types.ts:1330](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1330) |
| <a id="shippingpointid"></a> `shippingPointId` | `number` | Shipping point ID — get it via `getSupplyShippingPoints()` | [types/orders-fbs.types.ts:1332](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1332) |
| <a id="shippingtype"></a> `shippingType` | [`SupplyShippingType`](../type-aliases/SupplyShippingType.md) | Type of shipping to the shipping point | [types/orders-fbs.types.ts:1334](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1334) |
