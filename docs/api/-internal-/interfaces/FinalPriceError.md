[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FinalPriceError

# Interface: FinalPriceError

Defined in: [types/in-store-pickup.types.ts:442](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L442)

Per-order error from [InStorePickupModule.getOrdersFinalPrice](../../classes/InStorePickupModule.md#getordersfinalprice).
Known values: `404`/`NotFound`, `400`/`StatusMismatch`,
`422`/`PriceNotCalculated` (orders created before 23.07.2026).

## Since

task-203

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `number` | Error code: `404` (NotFound), `400` (StatusMismatch), `422` (PriceNotCalculated). | [types/in-store-pickup.types.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L444) |
| <a id="detail"></a> `detail` | `string` | Error description: `NotFound`, `StatusMismatch`, or `PriceNotCalculated`. | [types/in-store-pickup.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/in-store-pickup.types.ts#L446) |
