[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / FinalPriceError

# Interface: FinalPriceError

Defined in: [types/orders-dbs.types.ts:728](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L728)

Per-order error from [OrdersDbsModule.getOrdersFinalPrice](../../classes/OrdersDbsModule.md#getordersfinalprice).
Known values: `404`/`NotFound`, `400`/`StatusMismatch`,
`422`/`PriceNotCalculated` (orders created before 23.07.2026).

## Since

task-203

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="code"></a> `code` | `number` | Error code: `404` (NotFound), `400` (StatusMismatch), `422` (PriceNotCalculated). | [types/orders-dbs.types.ts:730](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L730) |
| <a id="detail"></a> `detail` | `string` | Error description: `NotFound`, `StatusMismatch`, or `PriceNotCalculated`. | [types/orders-dbs.types.ts:732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L732) |
