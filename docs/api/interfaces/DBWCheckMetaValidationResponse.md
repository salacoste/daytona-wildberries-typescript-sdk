[Wildberries API TypeScript SDK](../modules.md) / DBWCheckMetaValidationResponse

# Interface: DBWCheckMetaValidationResponse

Defined in: [types/orders-fbw.types.ts:504](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-fbw.types.ts#L504)

Response from [OrdersFbwModule.checkMetaValidation](../classes/OrdersFbwModule.md#checkmetavalidation).
Each item in `metaDetails[]` reports the validation status of a single
order's marking metadata. Use this *before* calling deliverBulk() to
detect orders that would fail with 409 MetaValidationFail.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="metadetails"></a> `metaDetails` | [`MetaValidationDetail`](MetaValidationDetail.md)[] | Per-order validation status entries. | [types/orders-fbw.types.ts:506](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/orders-fbw.types.ts#L506) |
