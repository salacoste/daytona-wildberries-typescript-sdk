[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / UpdatedSupplies

# Interface: UpdatedSupplies

Defined in: [types/orders-fbs.types.ts:1210](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1210)

Per-supply processing result.
Maps to swagger schema: UpdatedSupplies

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="supplyid"></a> `supplyId` | `string` | Supply ID | [types/orders-fbs.types.ts:1212](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1212) |
| <a id="success"></a> `success?` | `boolean` | Whether the request was processed successfully for this supply. Can only be `true` | [types/orders-fbs.types.ts:1214](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1214) |
| <a id="error"></a> `error?` | [`SupplyShippingMethodError`](SupplyShippingMethodError.md) | Error details when the request failed for this supply | [types/orders-fbs.types.ts:1216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbs.types.ts#L1216) |
