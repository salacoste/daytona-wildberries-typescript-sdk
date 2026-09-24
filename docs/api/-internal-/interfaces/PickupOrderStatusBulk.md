[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / PickupOrderStatusBulk

# Interface: PickupOrderStatusBulk

Defined in: [types/in-store-pickup.types.ts:301](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L301)

Per-order status in the batch status-info response.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID. | [types/in-store-pickup.types.ts:303](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L303) |
| <a id="supplierstatus"></a> `supplierStatus?` | `string` | Status set by the seller. | [types/in-store-pickup.types.ts:305](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L305) |
| <a id="wbstatus"></a> `wbStatus?` | `string` | Status set by the WB system. | [types/in-store-pickup.types.ts:307](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L307) |
| <a id="errors"></a> `errors?` | [`BatchError`](BatchError.md)[] | Error details (present when the order was not found). | [types/in-store-pickup.types.ts:309](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L309) |
