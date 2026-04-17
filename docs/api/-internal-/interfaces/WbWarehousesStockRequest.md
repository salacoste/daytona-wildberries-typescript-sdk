[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WbWarehousesStockRequest

# Interface: WbWarehousesStockRequest

Defined in: [types/analytics.types.ts:1680](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/analytics.types.ts#L1680)

Request for WB warehouses current inventory

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> `nmIds?` | `number`[] | WB articles (0-1000 items). Empty = all products | [types/analytics.types.ts:1682](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/analytics.types.ts#L1682) |
| <a id="chrtids"></a> `chrtIds?` | `number`[] | Size IDs. Only used for articles specified in nmIds | [types/analytics.types.ts:1684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/analytics.types.ts#L1684) |
| <a id="limit"></a> `limit?` | `number` | Number of rows in response (max 250000, default 250000) | [types/analytics.types.ts:1686](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/analytics.types.ts#L1686) |
| <a id="offset"></a> `offset?` | `number` | How many results to skip (default 0) | [types/analytics.types.ts:1688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/54d155526a7c3dc6476601220c51980b6a81acba/src/types/analytics.types.ts#L1688) |
