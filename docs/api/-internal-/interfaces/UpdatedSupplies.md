[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdatedSupplies

# Interface: UpdatedSupplies

Defined in: [types/orders-fbs.types.ts:1361](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1361)

Per-supply processing result.
Maps to swagger schema: UpdatedSupplies

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="supplyid"></a> `supplyId` | `string` | Supply ID | [types/orders-fbs.types.ts:1363](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1363) |
| <a id="success"></a> `success?` | `boolean` | Whether the request was processed successfully for this supply. Can only be `true` | [types/orders-fbs.types.ts:1365](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1365) |
| <a id="error"></a> `error?` | [`SupplyShippingMethodError`](SupplyShippingMethodError.md) | Error details when the request failed for this supply | [types/orders-fbs.types.ts:1367](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1367) |
