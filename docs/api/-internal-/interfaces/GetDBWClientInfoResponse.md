[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetDBWClientInfoResponse

# Interface: GetDBWClientInfoResponse

Defined in: [types/orders-fbw.types.ts:394](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbw.types.ts#L394)

Response from POST /api/marketplace/v3/dbw/orders/client

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders?` | [`DBWClientInfo`](DBWClientInfo.md)[] \| `null` | List of buyer information by order (null when no matching orders) | [types/orders-fbw.types.ts:396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2f9d1c0411f3b2698257855578a5fa059d0e206a/src/types/orders-fbw.types.ts#L396) |
