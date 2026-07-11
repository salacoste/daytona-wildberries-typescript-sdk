[Wildberries API TypeScript SDK](../modules.md) / DBWDeleteMetaBulkRequest

# Interface: DBWDeleteMetaBulkRequest

Defined in: [types/orders-fbw.types.ts:409](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbw.types.ts#L409)

Request body for bulk deletion of marking metadata from DBW orders.
Mirrors DBS `DeleteMetaBulkRequest`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | `number`[] | Array of order IDs whose metadata should be deleted | [types/orders-fbw.types.ts:411](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbw.types.ts#L411) |
| <a id="key"></a> `key` | `string` | Metadata key to delete — e.g. 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration' | [types/orders-fbw.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/orders-fbw.types.ts#L413) |
