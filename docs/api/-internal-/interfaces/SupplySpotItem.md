[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplySpotItem

# Interface: SupplySpotItem

Defined in: [types/orders-fbs.types.ts:1134](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1134)

Per-supply entry in the SPOT data list response.
Maps to swagger schema: SupplySpotDataResponse.supplies items

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Supply ID | [types/orders-fbs.types.ts:1136](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1136) |
| <a id="spot"></a> `spot?` | [`SupplySpotData`](SupplySpotData.md) | SPOT data; absent when the request failed for this supply (see `error`) | [types/orders-fbs.types.ts:1138](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1138) |
| <a id="error"></a> `error?` | [`SupplySpotError`](SupplySpotError.md) | Error details when SPOT data could not be returned for this supply | [types/orders-fbs.types.ts:1140](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbs.types.ts#L1140) |
