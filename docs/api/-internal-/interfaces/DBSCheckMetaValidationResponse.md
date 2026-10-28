[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSCheckMetaValidationResponse

# Interface: DBSCheckMetaValidationResponse

Defined in: [types/orders-dbs.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L266)

Response from [OrdersDbsModule.checkMetaValidation](../../classes/OrdersDbsModule.md#checkmetavalidation) (POST .../meta/details).
Per-order marking-metadata validation results. Use before status/deliver to
avoid the 409 MetaValidationFail guess-and-retry loop.

## Since

3.16.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="metadetails"></a> `metaDetails` | [`MetaValidationDetail`](../../interfaces/MetaValidationDetail.md)[] | [types/orders-dbs.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-dbs.types.ts#L267) |
