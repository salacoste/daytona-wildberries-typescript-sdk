[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / WarehouseRemainsDownloadItem

# Interface: WarehouseRemainsDownloadItem

Defined in: [types/reports.types.ts:643](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L643)

Warehouse remains download item (extracted from getTasksDownload inline type)

## See

EPIC 43 - Extracted from inline type literal

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="brand"></a> `brand?` | `string` | Бренд | [types/reports.types.ts:645](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L645) |
| <a id="subjectname"></a> `subjectName?` | `string` | Предмет | [types/reports.types.ts:647](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L647) |
| <a id="vendorcode"></a> `vendorCode?` | `string` | Артикул продавца | [types/reports.types.ts:649](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L649) |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/reports.types.ts:651](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L651) |
| <a id="barcode"></a> `barcode?` | `string` | Баркод | [types/reports.types.ts:653](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L653) |
| <a id="techsize"></a> `techSize?` | `string` | Размер | [types/reports.types.ts:655](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L655) |
| <a id="volume"></a> `volume?` | `number` | Объём, л | [types/reports.types.ts:657](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L657) |
| <a id="warehouses"></a> `warehouses?` | [`WarehouseQuantity`](WarehouseQuantity.md)[] | Остатки по складам | [types/reports.types.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/reports.types.ts#L659) |
