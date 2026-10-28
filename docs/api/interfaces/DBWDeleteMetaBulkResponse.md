[Wildberries API TypeScript SDK](../modules.md) / DBWDeleteMetaBulkResponse

# Interface: DBWDeleteMetaBulkResponse

Defined in: [types/orders-fbw.types.ts:516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L516)

Response from bulk metadata deletion for DBW orders.
Mirrors DBS `DeleteMetaBulkResponse`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `success`: `boolean`; `error?`: `string`; \}[] | Per-order deletion results | [types/orders-fbw.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L518) |
