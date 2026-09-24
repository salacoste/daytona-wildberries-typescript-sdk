[Wildberries API TypeScript SDK](../modules.md) / DBWSetSgtinBulkRequest

# Interface: DBWSetSgtinBulkRequest

Defined in: [types/orders-fbw.types.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L527)

Request body for bulk SGTIN code assignment on DBW orders.
Mirrors DBS `SetSgtinBulkRequest`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `sgtins`: `string`[]; \}[] | Array of per-order SGTIN assignments | [types/orders-fbw.types.ts:529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L529) |
