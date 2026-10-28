[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderFinalPriceResult

# Interface: OrderFinalPriceResult

Defined in: [types/orders-dbs.types.ts:744](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L744)

Per-order result in the final-price response.

- `data` is `{}` → data is still being generated, retry later (max ~1 minute).
- `data` is absent (`null`) → fall back to `finalPrice`/`convertedFinalPrice`
  from `getNewOrders()`/`getOrders()` responses for those order IDs.

## Since

task-203

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID. | [types/orders-dbs.types.ts:746](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L746) |
| <a id="data"></a> `data?` | [`FinalPriceData`](FinalPriceData-1.md) | Seller prices and buyer-payable sums (see [FinalPriceData](FinalPriceData-1.md)). | [types/orders-dbs.types.ts:748](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L748) |
| <a id="errors"></a> `errors?` | [`FinalPriceError`](FinalPriceError-1.md)[] | Error details (present when the order failed). | [types/orders-dbs.types.ts:750](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L750) |
| <a id="iserror"></a> `isError?` | `boolean` | Whether any errors occurred for this order. | [types/orders-dbs.types.ts:752](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L752) |
