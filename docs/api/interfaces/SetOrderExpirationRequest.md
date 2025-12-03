[Wildberries API TypeScript SDK](../modules.md) / SetOrderExpirationRequest

# Interface: SetOrderExpirationRequest

Defined in: [types/orders-fbs.types.ts:815](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L815)

Request type for setOrderExpiration endpoint
PUT /api/v3/orders/{orderId}/meta/expiration

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="expiration"></a> `expiration` | `string` | Expiration date in format dd.mm.yyyy (min 30 days from now) | [types/orders-fbs.types.ts:817](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L817) |
