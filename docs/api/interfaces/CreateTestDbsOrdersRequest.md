[Wildberries API TypeScript SDK](../modules.md) / CreateTestDbsOrdersRequest

# Interface: CreateTestDbsOrdersRequest

Defined in: [types/orders-dbs.types.ts:57](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/orders-dbs.types.ts#L57)

Request body for `ordersDBS.createTestOrders()`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | [`CreateTestDbsOrderItem`](CreateTestDbsOrderItem.md)[] | One through ten test orders. | [types/orders-dbs.types.ts:59](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/orders-dbs.types.ts#L59) |
| <a id="deliverytype"></a> `deliveryType?` | [`DbsTestDeliveryType`](../type-aliases/DbsTestDeliveryType.md) | Test delivery model. The official rendered contract displays `dbs` as the default when omitted; the SDK sends omission unchanged. | [types/orders-dbs.types.ts:64](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/orders-dbs.types.ts#L64) |
| <a id="address"></a> `address?` | [`CreateTestDbsOrdersAddress`](CreateTestDbsOrdersAddress.md) | Delivery address. When omitted, the official documentation describes a WB-provided default Moscow address; this has not been runtime-tested here. | [types/orders-dbs.types.ts:69](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/orders-dbs.types.ts#L69) |
