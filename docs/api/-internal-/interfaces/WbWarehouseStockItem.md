[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WbWarehouseStockItem

# Interface: WbWarehouseStockItem

Defined in: [types/analytics.types.ts:1769](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1769)

Single inventory item — 1 size in 1 WB warehouse

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/analytics.types.ts:1771](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1771) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID | [types/analytics.types.ts:1773](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1773) |
| <a id="warehouseid"></a> `warehouseId` | `number` | WB warehouse ID | [types/analytics.types.ts:1775](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1775) |
| <a id="warehousename"></a> `warehouseName` | `string` | WB warehouse name | [types/analytics.types.ts:1777](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1777) |
| <a id="regionname"></a> `regionName` | `string` | Region name | [types/analytics.types.ts:1779](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1779) |
| <a id="quantity"></a> `quantity` | `number` | Current quantity in warehouse | [types/analytics.types.ts:1781](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1781) |
| <a id="inwaytoclient"></a> `inWayToClient` | `number` | Quantity in transit to client | [types/analytics.types.ts:1783](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1783) |
| <a id="inwayfromclient"></a> `inWayFromClient` | `number` | Quantity in transit from client (returns) | [types/analytics.types.ts:1785](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1785) |
