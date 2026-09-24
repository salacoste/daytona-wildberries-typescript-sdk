[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SupplySpotItem

# Interface: SupplySpotItem

Defined in: [types/orders-fbs.types.ts:1062](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1062)

Per-supply entry in the SPOT data list response.
Maps to swagger schema: SupplySpotDataResponse.supplies items

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | Supply ID | [types/orders-fbs.types.ts:1064](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1064) |
| <a id="spot"></a> `spot?` | [`SupplySpotData`](SupplySpotData.md) | SPOT data; absent when the request failed for this supply (see `error`) | [types/orders-fbs.types.ts:1066](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1066) |
| <a id="error"></a> `error?` | [`SupplySpotError`](SupplySpotError.md) | Error details when SPOT data could not be returned for this supply | [types/orders-fbs.types.ts:1068](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1068) |
