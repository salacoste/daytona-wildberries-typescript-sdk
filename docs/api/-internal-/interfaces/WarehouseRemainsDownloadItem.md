[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WarehouseRemainsDownloadItem

# Interface: WarehouseRemainsDownloadItem

Defined in: [types/reports.types.ts:630](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L630)

Warehouse remains download item (extracted from getTasksDownload inline type)

## See

EPIC 43 - Extracted from inline type literal

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brand"></a> `brand?` | `string` | Бренд | [types/reports.types.ts:632](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L632) |
| <a id="subjectname"></a> `subjectName?` | `string` | Предмет | [types/reports.types.ts:634](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L634) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/reports.types.ts:636](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L636) |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/reports.types.ts:638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L638) |
| <a id="barcode"></a> `barcode?` | `string` | Баркод | [types/reports.types.ts:640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L640) |
| <a id="techsize"></a> `techSize?` | `string` | Размер | [types/reports.types.ts:642](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L642) |
| <a id="volume"></a> `volume?` | `number` | Объём, л | [types/reports.types.ts:644](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L644) |
| <a id="warehouses"></a> `warehouses?` | [`WarehouseQuantity`](WarehouseQuantity.md)[] | Остатки по складам | [types/reports.types.ts:646](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/reports.types.ts#L646) |
