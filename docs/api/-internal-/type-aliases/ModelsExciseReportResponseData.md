[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / ModelsExciseReportResponseData

# Type Alias: ModelsExciseReportResponseData

```ts
type ModelsExciseReportResponseData = {
  name?: string;
  price?: number;
  currency_name_short?: string;
  excise_short?: string;
  barcode?: string;
  nm_id?: number;
  operation_type_id?: number;
  fiscal_doc_number?: number;
  fiscal_dt?: string;
  fiscal_drive_number?: string;
  rid?: number;
  srid?: string;
}[];
```

Defined in: [types/reports.types.ts:226](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L226)

## Type Declaration

| Name | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| `name?` | `string` | Страна покупателя | [types/reports.types.ts:228](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L228) |
| `price?` | `number` | Цена товара, с НДС | [types/reports.types.ts:230](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L230) |
| `currency_name_short?` | `string` | Валюта | [types/reports.types.ts:232](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L232) |
| `excise_short?` | `string` | Код маркировки | [types/reports.types.ts:234](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L234) |
| `barcode?` | `string` | Баркод | [types/reports.types.ts:236](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L236) |
| `nm_id?` | `number` | Артикул WB | [types/reports.types.ts:238](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L238) |
| `operation_type_id?` | `number` | Тип операции, если есть: * `1` — вывод из оборота * `2` — возврат в оборот | [types/reports.types.ts:240](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L240) |
| `fiscal_doc_number?` | `number` | Номер фискального документа (чека полного расчёта), если есть | [types/reports.types.ts:242](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L242) |
| `fiscal_dt?` | `string` | Дата фискализации (дата в чеке), если есть, `ГГГГ-ММ-ДД` | [types/reports.types.ts:244](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L244) |
| `fiscal_drive_number?` | `string` | Номер фискального накопителя, если есть | [types/reports.types.ts:246](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L246) |
| `rid?` | `number` | `Rid` | [types/reports.types.ts:248](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L248) |
| `srid?` | `string` | `Srid` | [types/reports.types.ts:250](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2534cb811e3d958649e0527320bb5088941bd6b2/src/types/reports.types.ts#L250) |
