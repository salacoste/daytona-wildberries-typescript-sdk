[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / BulkStatusChangeResponse

# Interface: BulkStatusChangeResponse

Defined in: [types/in-store-pickup.types.ts:293](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L293)

Response from batch status setters (confirm/prepare/receive/reject/cancel).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="requestid"></a> `requestId` | `string` | Unique request ID. | [types/in-store-pickup.types.ts:295](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L295) |
| <a id="results"></a> `results` | [`StatusSetResponse`](StatusSetResponse.md)[] | Per-order results. | [types/in-store-pickup.types.ts:297](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/in-store-pickup.types.ts#L297) |
