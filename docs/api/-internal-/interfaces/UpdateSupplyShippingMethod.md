[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdateSupplyShippingMethod

# Interface: UpdateSupplyShippingMethod

Defined in: [types/orders-fbs.types.ts:1175](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1175)

Per-supply shipping parameters entry.
Maps to swagger schema: UpdateSupplyShippingMethod

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="supplyid"></a> `supplyId` | `string` | Supply ID | [types/orders-fbs.types.ts:1177](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1177) |
| <a id="shippingdt"></a> `shippingDt` | `string` | Planned supply shipping date, format `YYYY-MM-DD` | [types/orders-fbs.types.ts:1179](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1179) |
| <a id="shippingpointid"></a> `shippingPointId` | `number` | Shipping point ID — get it via `getShippingPoints()` | [types/orders-fbs.types.ts:1181](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1181) |
| <a id="shippingtype"></a> `shippingType` | [`SupplyShippingType`](../type-aliases/SupplyShippingType.md) | Type of shipping to the shipping point | [types/orders-fbs.types.ts:1183](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1183) |
