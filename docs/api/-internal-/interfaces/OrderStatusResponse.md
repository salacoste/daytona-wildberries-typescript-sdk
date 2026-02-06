[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderStatusResponse

# Interface: OrderStatusResponse

Defined in: [types/orders-fbs.types.ts:216](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/orders-fbs.types.ts#L216)

Response containing order statuses

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders?` | \{ `id?`: `number`; `supplierStatus?`: [`OrderSupplierStatus`](../type-aliases/OrderSupplierStatus.md); `wbStatus?`: [`OrderWbStatus`](../type-aliases/OrderWbStatus.md); \}[] | List of order status entries | [types/orders-fbs.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/orders-fbs.types.ts#L218) |
