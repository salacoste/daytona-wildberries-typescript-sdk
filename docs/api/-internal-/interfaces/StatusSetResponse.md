[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StatusSetResponse

# Interface: StatusSetResponse

Defined in: [types/in-store-pickup.types.ts:283](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L283)

Per-order result in a batch status-change response.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Assembly order ID. | [types/in-store-pickup.types.ts:285](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L285) |
| <a id="iserror"></a> `isError` | `boolean` | Whether an error occurred for this order. | [types/in-store-pickup.types.ts:287](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L287) |
| <a id="errors"></a> `errors?` | [`BatchError`](BatchError.md)[] | Error details (present when `isError` is true). | [types/in-store-pickup.types.ts:289](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L289) |
