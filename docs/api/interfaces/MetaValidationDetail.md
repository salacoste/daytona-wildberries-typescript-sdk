[Wildberries API TypeScript SDK](../modules.md) / MetaValidationDetail

# Interface: MetaValidationDetail

Defined in: [types/orders-dbs.types.ts:203](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L203)

Per-order metadata validation status returned in 409 MetaValidationFail responses.
When `deliverBulk()` returns this for an order, the marking metadata (SGTIN/IMEI)
failed WB's validation — fix the metadata before retrying.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orderid"></a> `orderId?` | `number` | Order ID this validation status applies to | [types/orders-dbs.types.ts:205](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L205) |
| <a id="status"></a> `status?` | \| `"valid"` \| `"invalid"` \| `string` & \{ \} | Validation result. WB-known values: `'valid'` | `'invalid'`. May contain other server-side strings. | [types/orders-dbs.types.ts:207](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L207) |
| <a id="message"></a> `message?` | `string` | Optional human-readable detail | [types/orders-dbs.types.ts:209](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-dbs.types.ts#L209) |
