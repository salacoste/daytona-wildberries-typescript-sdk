[Wildberries API TypeScript SDK](../modules.md) / DBWSetSgtinBulkRequest

# Interface: DBWSetSgtinBulkRequest

Defined in: [types/orders-fbw.types.ts:527](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L527)

Request body for bulk SGTIN code assignment on DBW orders.
Mirrors DBS `SetSgtinBulkRequest`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `sgtins`: `string`[]; \}[] | Array of per-order SGTIN assignments | [types/orders-fbw.types.ts:529](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L529) |
