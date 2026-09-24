[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SellerWarehousesStockRequest

# Interface: SellerWarehousesStockRequest

Defined in: [types/analytics.types.ts:1786](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1786)

Request for seller warehouses current inventory.
No warehouse or size IDs are required — the report covers all seller warehouses.

## Since

task-199

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> `nmIds?` | `number`[] | WB articles (0-1000 items). Empty = all products | [types/analytics.types.ts:1788](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1788) |
| <a id="chrtids"></a> `chrtIds?` | `number`[] | Size IDs. Only used for articles specified in nmIds | [types/analytics.types.ts:1790](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1790) |
| <a id="limit"></a> `limit?` | `number` | Number of rows in response (max 250000, default 250000) | [types/analytics.types.ts:1792](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1792) |
| <a id="offset"></a> `offset?` | `number` | How many results to skip (default 0) | [types/analytics.types.ts:1794](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1794) |
