[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedRequest

# Interface: AcquiringReportDetailedRequest

Defined in: [types/finances.types.ts:425](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L425)

Request body for `getAcquiringReportsDetailed()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:427](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L427) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:429](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L429) |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:431](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L431) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки для пагинации. Начинайте с 0, повторяйте до ответа 204. | [types/finances.types.ts:433](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L433) |
| <a id="fields"></a> `fields?` | keyof [`AcquiringReportDetailedItem`](AcquiringReportDetailedItem.md)[] | Список полей в ответе. Если не указан, возвращаются все поля. **Since** v3.8.0 — narrowed from `string[]` to `AcquiringReportDetailedField[]`. | [types/finances.types.ts:435](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L435) |
