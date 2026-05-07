[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetDBWClientInfoResponse

# Interface: GetDBWClientInfoResponse

Defined in: [types/orders-fbw.types.ts:394](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-fbw.types.ts#L394)

Response from POST /api/marketplace/v3/dbw/orders/client

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders?` | [`DBWClientInfo`](DBWClientInfo.md)[] \| `null` | List of buyer information by order (null when no matching orders) | [types/orders-fbw.types.ts:396](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-fbw.types.ts#L396) |
