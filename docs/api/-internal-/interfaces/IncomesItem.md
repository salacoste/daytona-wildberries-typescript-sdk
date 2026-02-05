[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / IncomesItem

# Interface: IncomesItem

Defined in: [types/reports.types.ts:10](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L10)

Auto-generated TypeScript types for reports module
Generated from: wildberries_api_doc/12-reports.yaml

DO NOT EDIT MANUALLY - Changes will be overwritten on next generation

Generated: 2025-12-14T23:02:33.807Z

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="incomeid"></a> `incomeId?` | `number` | Номер поставки | [types/reports.types.ts:12](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L12) |
| <a id="number"></a> `number?` | `string` | Номер УПД | [types/reports.types.ts:14](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L14) |
| <a id="date"></a> `date?` | `string` | Дата поступления. Если часовой пояс не указан, то берётся Московское время UTC+3. | [types/reports.types.ts:16](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L16) |
| <a id="lastchangedate"></a> `lastChangeDate?` | `string` | Дата и время обновления информации в сервисе. Это поле соответствует параметру `dateFrom` в запросе. Если часовой пояс не указан, то берётся Московское время UTC+3. | [types/reports.types.ts:18](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L18) |
| <a id="supplierarticle"></a> `supplierArticle?` | `string` | Артикул продавца | [types/reports.types.ts:20](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L20) |
| <a id="techsize"></a> `techSize?` | `string` | Размер товара | [types/reports.types.ts:22](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L22) |
| <a id="barcode"></a> `barcode?` | `string` | Баркод | [types/reports.types.ts:24](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L24) |
| <a id="quantity"></a> `quantity?` | `number` | Количество | [types/reports.types.ts:26](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L26) |
| <a id="totalprice"></a> `totalPrice?` | `number` | Цена из УПД | [types/reports.types.ts:28](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L28) |
| <a id="dateclose"></a> `dateClose?` | `string` | Дата принятия (закрытия) в WB. Если часовой пояс не указан, то берётся Московское время UTC+3 | [types/reports.types.ts:30](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L30) |
| <a id="warehousename"></a> `warehouseName?` | `string` | Название склада | [types/reports.types.ts:32](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L32) |
| <a id="nmid"></a> `nmId?` | `number` | Артикул WB | [types/reports.types.ts:34](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L34) |
| <a id="status"></a> `status?` | `"Принято"` | Текущий статус поставки | [types/reports.types.ts:36](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/reports.types.ts#L36) |
