[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderStatusResponse

# Interface: OrderStatusResponse

Defined in: [types/orders-fbs.types.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/orders-fbs.types.ts#L216)

Response containing order statuses

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders?` | \{ `id?`: `number`; `supplierStatus?`: [`OrderSupplierStatus`](../type-aliases/OrderSupplierStatus.md); `wbStatus?`: [`OrderWbStatus`](../type-aliases/OrderWbStatus.md); \}[] | List of order status entries | [types/orders-fbs.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/4fa0537d65f0b13a11a635a19a799d1d00470b89/src/types/orders-fbs.types.ts#L218) |
