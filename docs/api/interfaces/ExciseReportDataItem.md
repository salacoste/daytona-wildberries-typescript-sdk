[Wildberries API TypeScript SDK](../modules.md) / ExciseReportDataItem

# Interface: ExciseReportDataItem

Defined in: [types/reports.types.ts:248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L248)

Excise report data item

## Indexable

```ts
[key: string]: unknown
```

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="name"></a> `name` | `string` | Customer country | [types/reports.types.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L250) |
| <a id="price"></a> `price` | `number` | Item price with VAT | [types/reports.types.ts:252](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L252) |
| <a id="currency_name_short"></a> `currency_name_short` | `string` | Currency short name | [types/reports.types.ts:254](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L254) |
| <a id="excise_short"></a> `excise_short` | `string` | Marking code | [types/reports.types.ts:256](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L256) |
| <a id="barcode"></a> `barcode` | `string` | Barcode | [types/reports.types.ts:258](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L258) |
| <a id="nm_id"></a> `nm_id` | `number` | WB article (nmId) | [types/reports.types.ts:260](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L260) |
| <a id="operation_type_id"></a> `operation_type_id?` | `number` | Operation type: - 1: Withdrawal from circulation - 2: Return to circulation | [types/reports.types.ts:266](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L266) |
| <a id="fiscal_doc_number"></a> `fiscal_doc_number?` | `number` | Fiscal document number (full payment receipt) if available | [types/reports.types.ts:268](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L268) |
| <a id="fiscal_dt"></a> `fiscal_dt?` | `string` | Fiscalization date (receipt date) in format YYYY-MM-DD if available | [types/reports.types.ts:270](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L270) |
| <a id="fiscal_drive_number"></a> `fiscal_drive_number?` | `string` | Fiscal drive number if available | [types/reports.types.ts:272](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L272) |
| <a id="rid"></a> `rid?` | `number` | Rid | [types/reports.types.ts:274](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L274) |
| <a id="srid"></a> `srid?` | `string` | Srid | [types/reports.types.ts:276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/34d2fe37f2bf1eed06c6ea8c3452f3ceb19d57ae/src/types/reports.types.ts#L276) |
