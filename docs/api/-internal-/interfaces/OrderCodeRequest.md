[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / OrderCodeRequest

# Interface: OrderCodeRequest

Defined in: [types/orders-dbs.types.ts:238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-dbs.types.ts#L238)

Request item for receive/reject operations requiring confirmation code

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Order ID | [types/orders-dbs.types.ts:240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-dbs.types.ts#L240) |
| <a id="code"></a> `code` | `string` | Confirmation code (displayed to customer on WB site/app) | [types/orders-dbs.types.ts:242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fe890adc67993deec87493683f2dd2b3be8b0abb/src/types/orders-dbs.types.ts#L242) |
