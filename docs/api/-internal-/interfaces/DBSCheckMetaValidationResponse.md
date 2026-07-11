[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSCheckMetaValidationResponse

# Interface: DBSCheckMetaValidationResponse

Defined in: [types/orders-dbs.types.ts:217](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L217)

Response from [OrdersDbsModule.checkMetaValidation](../../classes/OrdersDbsModule.md#checkmetavalidation) (POST .../meta/details).
Per-order marking-metadata validation results. Use before status/deliver to
avoid the 409 MetaValidationFail guess-and-retry loop.

## Since

3.16.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="metadetails"></a> `metaDetails` | [`MetaValidationDetail`](../../interfaces/MetaValidationDetail.md)[] | [types/orders-dbs.types.ts:218](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-dbs.types.ts#L218) |
