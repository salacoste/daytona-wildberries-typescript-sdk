[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WbWarehouseStockItem

# Interface: WbWarehouseStockItem

Defined in: [types/analytics.types.ts:1752](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1752)

Single inventory item — 1 size in 1 WB warehouse

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/analytics.types.ts:1754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1754) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID | [types/analytics.types.ts:1756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1756) |
| <a id="warehouseid"></a> `warehouseId` | `number` | WB warehouse ID | [types/analytics.types.ts:1758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1758) |
| <a id="warehousename"></a> `warehouseName` | `string` | WB warehouse name | [types/analytics.types.ts:1760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1760) |
| <a id="regionname"></a> `regionName` | `string` | Region name | [types/analytics.types.ts:1762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1762) |
| <a id="quantity"></a> `quantity` | `number` | Current quantity in warehouse | [types/analytics.types.ts:1764](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1764) |
| <a id="inwaytoclient"></a> `inWayToClient` | `number` | Quantity in transit to client | [types/analytics.types.ts:1766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1766) |
| <a id="inwayfromclient"></a> `inWayFromClient` | `number` | Quantity in transit from client (returns) | [types/analytics.types.ts:1768](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L1768) |
