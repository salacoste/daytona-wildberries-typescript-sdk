[Wildberries API TypeScript SDK](../modules.md) / SetOrderSGTINRequest

# Interface: SetOrderSGTINRequest

Defined in: [types/orders-fbs.types.ts:779](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L779)

Request type for setOrderSGTIN endpoint
PUT /api/v3/orders/{orderId}/meta/sgtin

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="sgtins"></a> `sgtins` | `string`[] | Array of SGTIN codes (16-135 characters each, max 24 items) | [types/orders-fbs.types.ts:781](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L781) |
