[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WbWarehousesStockRequest

# Interface: WbWarehousesStockRequest

Defined in: [types/analytics.types.ts:1739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1739)

Request for WB warehouses current inventory

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> `nmIds?` | `number`[] | WB articles (0-1000 items). Empty = all products | [types/analytics.types.ts:1741](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1741) |
| <a id="chrtids"></a> `chrtIds?` | `number`[] | Size IDs. Only used for articles specified in nmIds | [types/analytics.types.ts:1743](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1743) |
| <a id="limit"></a> `limit?` | `number` | Number of rows in response (max 250000, default 250000) | [types/analytics.types.ts:1745](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1745) |
| <a id="offset"></a> `offset?` | `number` | How many results to skip (default 0) | [types/analytics.types.ts:1747](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1747) |
