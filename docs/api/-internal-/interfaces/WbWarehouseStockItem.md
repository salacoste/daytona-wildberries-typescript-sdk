[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WbWarehouseStockItem

# Interface: WbWarehouseStockItem

Defined in: [types/analytics.types.ts:1693](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1693)

Single inventory item — 1 size in 1 WB warehouse

## Since

3.4.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmid"></a> `nmId` | `number` | WB article ID | [types/analytics.types.ts:1695](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1695) |
| <a id="chrtid"></a> `chrtId` | `number` | Size ID | [types/analytics.types.ts:1697](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1697) |
| <a id="warehouseid"></a> `warehouseId` | `number` | WB warehouse ID | [types/analytics.types.ts:1699](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1699) |
| <a id="warehousename"></a> `warehouseName` | `string` | WB warehouse name | [types/analytics.types.ts:1701](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1701) |
| <a id="regionname"></a> `regionName` | `string` | Region name | [types/analytics.types.ts:1703](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1703) |
| <a id="quantity"></a> `quantity` | `number` | Current quantity in warehouse | [types/analytics.types.ts:1705](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1705) |
| <a id="inwaytoclient"></a> `inWayToClient` | `number` | Quantity in transit to client | [types/analytics.types.ts:1707](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1707) |
| <a id="inwayfromclient"></a> `inWayFromClient` | `number` | Quantity in transit from client (returns) | [types/analytics.types.ts:1709](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1b2eb977a4deb73a698f11980c1f6ecce708d74d/src/types/analytics.types.ts#L1709) |
