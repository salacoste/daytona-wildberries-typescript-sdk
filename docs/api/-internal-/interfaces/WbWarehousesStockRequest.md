[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WbWarehousesStockRequest

# Interface: WbWarehousesStockRequest

Defined in: [types/analytics.types.ts:1756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1756)

Request for WB warehouses current inventory

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> `nmIds?` | `number`[] | WB articles (0-1000 items). Empty = all products | [types/analytics.types.ts:1758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1758) |
| <a id="chrtids"></a> `chrtIds?` | `number`[] | Size IDs. Only used for articles specified in nmIds | [types/analytics.types.ts:1760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1760) |
| <a id="limit"></a> `limit?` | `number` | Number of rows in response (max 250000, default 250000) | [types/analytics.types.ts:1762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1762) |
| <a id="offset"></a> `offset?` | `number` | How many results to skip (default 0) | [types/analytics.types.ts:1764](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L1764) |
