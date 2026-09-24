[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetOrderMetaBulkResponse

# Interface: GetOrderMetaBulkResponse

Defined in: [types/in-store-pickup.types.ts:343](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L343)

Response from [InStorePickupModule.getMetaBulk](../../classes/InStorePickupModule.md#getmetabulk).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="requestid"></a> `requestId` | `string` | Unique request ID. | [types/in-store-pickup.types.ts:345](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L345) |
| <a id="orders"></a> `orders` | [`OrderMetaV2`](OrderMetaV2.md)[] | Label identifiers for each requested order. | [types/in-store-pickup.types.ts:347](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L347) |
