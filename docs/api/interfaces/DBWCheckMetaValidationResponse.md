[Wildberries API TypeScript SDK](../modules.md) / DBWCheckMetaValidationResponse

# Interface: DBWCheckMetaValidationResponse

Defined in: [types/orders-fbw.types.ts:598](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L598)

Response from [OrdersFbwModule.checkMetaValidation](../classes/OrdersFbwModule.md#checkmetavalidation).
Each item in `metaDetails[]` reports the validation status of a single
order's marking metadata. Use this *before* calling deliverBulk() to
detect orders that would fail with 409 MetaValidationFail.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="metadetails"></a> `metaDetails` | [`MetaValidationDetail`](MetaValidationDetail.md)[] | Per-order validation status entries. | [types/orders-fbw.types.ts:600](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/orders-fbw.types.ts#L600) |
