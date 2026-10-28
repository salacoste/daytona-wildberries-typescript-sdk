[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportDetailedByIdRequest

# Interface: SalesReportDetailedByIdRequest

Defined in: [types/finances.types.ts:122](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L122)

Request body for `getSalesReportsDetailedByReportId()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:124](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L124) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки ответа для пагинации. Начинайте с 0, затем передавайте rrdId последней строки предыдущего ответа. | [types/finances.types.ts:126](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L126) |
| <a id="fields"></a> `fields?` | keyof [`SalesReportDetailedItem`](SalesReportDetailedItem.md)[] | Список полей в ответе. Если не указан, возвращаются все поля. **Since** v3.8.0 — narrowed from `string[]` to `SalesReportDetailedField[]`. | [types/finances.types.ts:128](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L128) |
