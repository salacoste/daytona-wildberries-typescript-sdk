[Wildberries API TypeScript SDK](../modules.md) / DBWSetMetaBulkResponse

# Interface: DBWSetMetaBulkResponse

Defined in: [types/orders-fbw.types.ts:538](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L538)

Response from bulk metadata set operations for DBW orders.
Mirrors DBS `SetMetaBulkResponse`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `success`: `boolean`; `error?`: `string`; \}[] | Per-order set results | [types/orders-fbw.types.ts:540](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L540) |
| <a id="errors"></a> `errors?` | \{ `orderId`: `number`; `message`: `string`; `code`: `string`; \}[] | Array of per-order errors (present when some orders failed) | [types/orders-fbw.types.ts:542](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L542) |
