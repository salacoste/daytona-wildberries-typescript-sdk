[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderCodeRequest

# Interface: OrderCodeRequest

Defined in: [types/orders-dbs.types.ts:247](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L247)

Request item for receive/reject operations requiring confirmation code

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Order ID | [types/orders-dbs.types.ts:249](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L249) |
| <a id="code"></a> `code` | `string` | Confirmation code (displayed to customer on WB site/app) | [types/orders-dbs.types.ts:251](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L251) |
