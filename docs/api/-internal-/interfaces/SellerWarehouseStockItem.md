[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SellerWarehouseStockItem

# Interface: SellerWarehouseStockItem

Defined in: [types/analytics.types.ts:1800](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1800)

Single inventory item — 1 size in 1 seller warehouse.
Unlike the WB-warehouses report, no in-transit quantities are returned.

## Since

task-199

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/analytics.types.ts:1802](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1802) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID | [types/analytics.types.ts:1804](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1804) |
| <a id="warehouseid"></a> `warehouseId` | `number` | Seller warehouse ID | [types/analytics.types.ts:1806](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1806) |
| <a id="warehousename"></a> `warehouseName` | `string` | Seller warehouse name | [types/analytics.types.ts:1808](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1808) |
| <a id="regionname"></a> `regionName` | `string` | Region name | [types/analytics.types.ts:1810](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1810) |
| <a id="quantity"></a> `quantity` | `number` | Current quantity in warehouse | [types/analytics.types.ts:1812](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1812) |
