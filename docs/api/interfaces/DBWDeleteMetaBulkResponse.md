[Wildberries API TypeScript SDK](../modules.md) / DBWDeleteMetaBulkResponse

# Interface: DBWDeleteMetaBulkResponse

Defined in: [types/orders-fbw.types.ts:516](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L516)

Response from bulk metadata deletion for DBW orders.
Mirrors DBS `DeleteMetaBulkResponse`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `success`: `boolean`; `error?`: `string`; \}[] | Per-order deletion results | [types/orders-fbw.types.ts:518](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L518) |
