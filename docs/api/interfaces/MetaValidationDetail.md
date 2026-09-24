[Wildberries API TypeScript SDK](../modules.md) / MetaValidationDetail

# Interface: MetaValidationDetail

Defined in: [types/orders-dbs.types.ts:202](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L202)

Per-order metadata validation status returned in 409 MetaValidationFail responses.
When `deliverBulk()` returns this for an order, the marking metadata (SGTIN/IMEI)
failed WB's validation — fix the metadata before retrying.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID this validation status applies to | [types/orders-dbs.types.ts:204](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L204) |
| <a id="status"></a> `status?` | \| `"valid"` \| `"invalid"` \| `string` & \{ \} | Validation result. WB-known values: `'valid'` | `'invalid'`. May contain other server-side strings. | [types/orders-dbs.types.ts:206](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L206) |
| <a id="message"></a> `message?` | `string` | Optional human-readable detail | [types/orders-dbs.types.ts:208](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-dbs.types.ts#L208) |
