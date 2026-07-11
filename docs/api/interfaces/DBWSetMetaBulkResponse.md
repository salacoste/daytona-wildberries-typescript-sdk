[Wildberries API TypeScript SDK](../modules.md) / DBWSetMetaBulkResponse

# Interface: DBWSetMetaBulkResponse

Defined in: [types/orders-fbw.types.ts:444](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbw.types.ts#L444)

Response from bulk metadata set operations for DBW orders.
Mirrors DBS `SetMetaBulkResponse`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `success`: `boolean`; `error?`: `string`; \}[] | Per-order set results | [types/orders-fbw.types.ts:446](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbw.types.ts#L446) |
| <a id="errors"></a> `errors?` | \{ `orderId`: `number`; `message`: `string`; `code`: `string`; \}[] | Array of per-order errors (present when some orders failed) | [types/orders-fbw.types.ts:448](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbw.types.ts#L448) |
