[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SellerWarehouseStockItem

# Interface: SellerWarehouseStockItem

Defined in: [types/analytics.types.ts:1817](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1817)

Single inventory item — 1 size in 1 seller warehouse.
Unlike the WB-warehouses report, no in-transit quantities are returned.

## Since

task-199

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/analytics.types.ts:1819](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1819) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID | [types/analytics.types.ts:1821](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1821) |
| <a id="warehouseid"></a> `warehouseId` | `number` | Seller warehouse ID | [types/analytics.types.ts:1823](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1823) |
| <a id="warehousename"></a> `warehouseName` | `string` | Seller warehouse name | [types/analytics.types.ts:1825](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1825) |
| <a id="regionname"></a> `regionName` | `string` | Region name | [types/analytics.types.ts:1827](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1827) |
| <a id="quantity"></a> `quantity` | `number` | Current quantity in warehouse | [types/analytics.types.ts:1829](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1829) |
