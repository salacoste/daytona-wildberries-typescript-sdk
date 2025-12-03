[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / StocksSizeItem

# Interface: StocksSizeItem

Defined in: [types/analytics.types.ts:1298](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1298)

Stock size item

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="techsize"></a> `techSize` | `string` | Technical size | [types/analytics.types.ts:1300](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1300) |
| <a id="sizename"></a> `sizeName?` | `string` | Size name | [types/analytics.types.ts:1302](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1302) |
| <a id="barcode"></a> `barcode?` | `string` | Barcode | [types/analytics.types.ts:1304](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1304) |
| <a id="quantity"></a> `quantity` | `number` | Stock quantity | [types/analytics.types.ts:1306](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1306) |
| <a id="quantitywb"></a> `quantityWb?` | `number` | Stock at WB warehouses | [types/analytics.types.ts:1308](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1308) |
| <a id="quantityfbs"></a> `quantityFbs?` | `number` | Stock at seller warehouses (FBS) | [types/analytics.types.ts:1310](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1310) |
| <a id="inwaytoclient"></a> `inWayToClient?` | `number` | In transit to client | [types/analytics.types.ts:1312](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1312) |
| <a id="inwayfromclient"></a> `inWayFromClient?` | `number` | In transit from client | [types/analytics.types.ts:1314](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1314) |
| <a id="regionname"></a> `regionName?` | `string` | Region name | [types/analytics.types.ts:1316](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1316) |
| <a id="officename"></a> `officeName?` | `string` | Office name | [types/analytics.types.ts:1318](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1318) |
| <a id="offices"></a> `offices?` | [`OfficeStockDetail`](OfficeStockDetail.md)[] | Office details (when includeOffice is true) | [types/analytics.types.ts:1320](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/784d5eafeca072e72c3a26b140b006a3b641c991/src/types/analytics.types.ts#L1320) |
