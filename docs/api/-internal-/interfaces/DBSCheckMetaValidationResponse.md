[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / DBSCheckMetaValidationResponse

# Interface: DBSCheckMetaValidationResponse

Defined in: [types/orders-dbs.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L266)

Response from [OrdersDbsModule.checkMetaValidation](../../classes/OrdersDbsModule.md#checkmetavalidation) (POST .../meta/details).
Per-order marking-metadata validation results. Use before status/deliver to
avoid the 409 MetaValidationFail guess-and-retry loop.

## Since

3.16.0

## Properties

| Property | Type | Defined in |
| ------ | ------ | ------ |
| <a id="metadetails"></a> `metaDetails` | [`MetaValidationDetail`](../../interfaces/MetaValidationDetail.md)[] | [types/orders-dbs.types.ts:267](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/orders-dbs.types.ts#L267) |
