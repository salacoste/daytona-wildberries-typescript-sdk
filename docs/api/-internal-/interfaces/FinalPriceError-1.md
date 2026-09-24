[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FinalPriceError

# Interface: FinalPriceError

Defined in: [types/orders-dbs.types.ts:679](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L679)

Per-order error from [OrdersDbsModule.getOrdersFinalPrice](../../classes/OrdersDbsModule.md#getordersfinalprice).
Known values: `404`/`NotFound`, `400`/`StatusMismatch`,
`422`/`PriceNotCalculated` (orders created before 23.07.2026).

## Since

task-203

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `number` | Error code: `404` (NotFound), `400` (StatusMismatch), `422` (PriceNotCalculated). | [types/orders-dbs.types.ts:681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L681) |
| <a id="detail"></a> `detail` | `string` | Error description: `NotFound`, `StatusMismatch`, or `PriceNotCalculated`. | [types/orders-dbs.types.ts:683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L683) |
