[Wildberries API TypeScript SDK](../modules.md) / DBWSetSgtinBulkRequest

# Interface: DBWSetSgtinBulkRequest

Defined in: [types/orders-fbw.types.ts:433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbw.types.ts#L433)

Request body for bulk SGTIN code assignment on DBW orders.
Mirrors DBS `SetSgtinBulkRequest`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `sgtins`: `string`[]; \}[] | Array of per-order SGTIN assignments | [types/orders-fbw.types.ts:435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbw.types.ts#L435) |
