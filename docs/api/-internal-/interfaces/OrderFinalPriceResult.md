[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFinalPriceResult

# Interface: OrderFinalPriceResult

Defined in: [types/in-store-pickup.types.ts:458](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L458)

Per-order result in the final-price response.

- `data` is `{}` → data is still being generated, retry later (max ~1 minute).
- `data` is absent (`null`) → fall back to `finalPrice`/`convertedFinalPrice`
  from `getOrdersNew()`/`getClickCollectOrders()` responses for those order IDs.

## Since

task-203

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID. | [types/in-store-pickup.types.ts:460](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L460) |
| <a id="data"></a> `data?` | [`FinalPriceData`](FinalPriceData.md) | Seller prices and buyer-payable sums (see [FinalPriceData](FinalPriceData.md)). | [types/in-store-pickup.types.ts:462](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L462) |
| <a id="errors"></a> `errors?` | [`FinalPriceError`](FinalPriceError.md)[] | Error details (present when the order failed). | [types/in-store-pickup.types.ts:464](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L464) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether any errors occurred for this order. | [types/in-store-pickup.types.ts:466](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L466) |
