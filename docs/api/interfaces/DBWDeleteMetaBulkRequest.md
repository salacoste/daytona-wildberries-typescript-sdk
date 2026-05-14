[Wildberries API TypeScript SDK](../modules.md) / DBWDeleteMetaBulkRequest

# Interface: DBWDeleteMetaBulkRequest

Defined in: [types/orders-fbw.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-fbw.types.ts#L409)

Request body for bulk deletion of marking metadata from DBW orders.
Mirrors DBS `DeleteMetaBulkRequest`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | `number`[] | Array of order IDs whose metadata should be deleted | [types/orders-fbw.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-fbw.types.ts#L411) |
| <a id="key"></a> `key` | `string` | Metadata key to delete — e.g. 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration' | [types/orders-fbw.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/efd935090e1f32ad750e7d59c98524fc03dc71bf/src/types/orders-fbw.types.ts#L413) |
