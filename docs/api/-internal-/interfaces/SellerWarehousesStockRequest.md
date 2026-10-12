[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SellerWarehousesStockRequest

# Interface: SellerWarehousesStockRequest

Defined in: [types/analytics.types.ts:1803](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1803)

Request for seller warehouses current inventory.
No warehouse or size IDs are required — the report covers all seller warehouses.

## Since

task-199

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> `nmIds?` | `number`[] | WB articles (0-1000 items). Empty = all products | [types/analytics.types.ts:1805](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1805) |
| <a id="chrtids"></a> `chrtIds?` | `number`[] | Size IDs. Only used for articles specified in nmIds | [types/analytics.types.ts:1807](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1807) |
| <a id="limit"></a> `limit?` | `number` | Number of rows in response (max 250000, default 250000) | [types/analytics.types.ts:1809](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1809) |
| <a id="offset"></a> `offset?` | `number` | How many results to skip (default 0) | [types/analytics.types.ts:1811](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1811) |
