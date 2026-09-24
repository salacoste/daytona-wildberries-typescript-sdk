[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFinalPriceResult

# Interface: OrderFinalPriceResult

Defined in: [types/orders-dbs.types.ts:695](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L695)

Per-order result in the final-price response.

- `data` is `{}` → data is still being generated, retry later (max ~1 minute).
- `data` is absent (`null`) → fall back to `finalPrice`/`convertedFinalPrice`
  from `getNewOrders()`/`getOrders()` responses for those order IDs.

## Since

task-203

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID. | [types/orders-dbs.types.ts:697](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L697) |
| <a id="data"></a> `data?` | [`FinalPriceData`](FinalPriceData-1.md) | Seller prices and buyer-payable sums (see [FinalPriceData](FinalPriceData-1.md)). | [types/orders-dbs.types.ts:699](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L699) |
| <a id="errors"></a> `errors?` | [`FinalPriceError`](FinalPriceError-1.md)[] | Error details (present when the order failed). | [types/orders-dbs.types.ts:701](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L701) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether any errors occurred for this order. | [types/orders-dbs.types.ts:703](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L703) |
