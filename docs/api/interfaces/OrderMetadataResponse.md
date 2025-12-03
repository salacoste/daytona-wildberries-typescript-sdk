[Wildberries API TypeScript SDK](../modules.md) / OrderMetadataResponse

# Interface: OrderMetadataResponse

Defined in: [types/orders-fbs.types.ts:521](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L521)

Response type for getOrderMetadata endpoint

Returns detailed metadata for a specific order including client information.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId` | `number` | Order ID | [types/orders-fbs.types.ts:523](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L523) |
| <a id="clientname"></a> `clientName` | `string` | Client name | [types/orders-fbs.types.ts:525](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L525) |
| <a id="phone"></a> `phone` | `string` | Client phone number | [types/orders-fbs.types.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L527) |
| <a id="address"></a> `address` | [`Address`](Address.md) | Delivery address | [types/orders-fbs.types.ts:529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L529) |
| <a id="warehousename"></a> `warehouseName` | `string` | Warehouse name | [types/orders-fbs.types.ts:531](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L531) |
| <a id="totalprice"></a> `totalPrice` | `number` | Order total price | [types/orders-fbs.types.ts:533](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L533) |
| <a id="currency"></a> `currency` | `string` | Currency code | [types/orders-fbs.types.ts:535](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/orders-fbs.types.ts#L535) |
