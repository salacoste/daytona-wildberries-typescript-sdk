[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SetMetaBulkResponse

# Interface: SetMetaBulkResponse

Defined in: [types/in-store-pickup.types.ts:391](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L391)

Response from batch meta-set operations (sgtin/uin/imei/gtin).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="requestid"></a> `requestId` | `string` | Unique request ID. | [types/in-store-pickup.types.ts:393](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L393) |
| <a id="results"></a> `results` | [`StatusSetResponse`](StatusSetResponse.md)[] | Per-order results. | [types/in-store-pickup.types.ts:395](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L395) |
