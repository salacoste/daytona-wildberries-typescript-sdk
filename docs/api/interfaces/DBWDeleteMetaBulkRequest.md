[Wildberries API TypeScript SDK](../modules.md) / DBWDeleteMetaBulkRequest

# Interface: DBWDeleteMetaBulkRequest

Defined in: [types/orders-fbw.types.ts:503](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L503)

Request body for bulk deletion of marking metadata from DBW orders.
Mirrors DBS `DeleteMetaBulkRequest`.

## Since

3.11.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="orders"></a> `orders` | `number`[] | Array of order IDs whose metadata should be deleted | [types/orders-fbw.types.ts:505](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L505) |
| <a id="key"></a> `key` | `string` | Metadata key to delete — e.g. 'imei' | 'uin' | 'gtin' | 'sgtin' | 'customsDeclaration' | [types/orders-fbw.types.ts:507](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/orders-fbw.types.ts#L507) |
