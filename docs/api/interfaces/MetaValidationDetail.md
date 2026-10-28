[Wildberries API TypeScript SDK](../modules.md) / MetaValidationDetail

# Interface: MetaValidationDetail

Defined in: [types/orders-dbs.types.ts:251](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L251)

Per-order metadata validation status returned in 409 MetaValidationFail responses.
When `deliverBulk()` returns this for an order, the marking metadata (SGTIN/IMEI)
failed WB's validation — fix the metadata before retrying.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID this validation status applies to | [types/orders-dbs.types.ts:253](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L253) |
| <a id="status"></a> `status?` | \| `"valid"` \| `"invalid"` \| `string` & \{ \} | Validation result. WB-known values: `'valid'` | `'invalid'`. May contain other server-side strings. | [types/orders-dbs.types.ts:255](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L255) |
| <a id="message"></a> `message?` | `string` | Optional human-readable detail | [types/orders-dbs.types.ts:257](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L257) |
