[Wildberries API TypeScript SDK](../modules.md) / DBWDeleteMetaBulkResponse

# Interface: DBWDeleteMetaBulkResponse

Defined in: [types/orders-fbw.types.ts:422](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbw.types.ts#L422)

Response from bulk metadata deletion for DBW orders.
Mirrors DBS `DeleteMetaBulkResponse`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | \{ `orderId`: `number`; `success`: `boolean`; `error?`: `string`; \}[] | Per-order deletion results | [types/orders-fbw.types.ts:424](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/orders-fbw.types.ts#L424) |
