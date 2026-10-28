[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedByIdRequest

# Interface: AcquiringReportDetailedByIdRequest

Defined in: [types/finances.types.ts:445](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L445)

Request body for `getAcquiringReportsDetailedByReportId()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:447](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L447) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки для пагинации | [types/finances.types.ts:449](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L449) |
| <a id="fields"></a> `fields?` | keyof [`AcquiringReportDetailedItem`](AcquiringReportDetailedItem.md)[] | Список полей в ответе. Если не указан, возвращаются все поля. **Since** v3.8.0 — narrowed from `string[]` to `AcquiringReportDetailedField[]`. | [types/finances.types.ts:451](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/finances.types.ts#L451) |
