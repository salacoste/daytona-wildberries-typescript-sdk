[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / B2bWholesaleUploadTaskResponse

# Interface: B2bWholesaleUploadTaskResponse

Defined in: [types/products.types.ts:724](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L724)

Response for B2B wholesale discount upload
(POST /api/discounts-prices/v1/upload/task/b2b/wholesale).

Per the WB announcement: the response carries a per-item result in a `success`
field — `true` on successful processing, `false` on failure with error details
in an `error` object. See [B2bWholesaleTaskResult](B2bWholesaleTaskResult.md) for the item shape.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="data"></a> `data?` | [`B2bWholesaleTaskResult`](B2bWholesaleTaskResult.md)[] | Per-item processing results | [types/products.types.ts:726](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L726) |
| <a id="error"></a> `error?` | `boolean` | Error flag | [types/products.types.ts:728](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L728) |
| <a id="errortext"></a> `errorText?` | `string` | Error description | [types/products.types.ts:730](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/products.types.ts#L730) |
