[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetDBWClientInfoResponse

# Interface: GetDBWClientInfoResponse

Defined in: [types/orders-fbw.types.ts:488](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L488)

Response from POST /api/marketplace/v3/dbw/orders/client

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders?` | [`DBWClientInfo`](DBWClientInfo.md)[] \| `null` | List of buyer information by order (null when no matching orders) | [types/orders-fbw.types.ts:490](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L490) |
