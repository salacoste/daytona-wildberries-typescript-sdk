[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportDetailedRequest

# Interface: AcquiringReportDetailedRequest

Defined in: [types/finances.types.ts:666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/finances.types.ts#L666)

Request body for `getAcquiringReportsDetailed()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:668](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/finances.types.ts#L668) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:670](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/finances.types.ts#L670) |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:672](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/finances.types.ts#L672) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки для пагинации. Начинайте с 0, повторяйте до ответа 204. | [types/finances.types.ts:674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/finances.types.ts#L674) |
| <a id="fields"></a> `fields?` | keyof [`AcquiringReportDetailedItem`](AcquiringReportDetailedItem.md)[] | Список полей в ответе. Если не указан, возвращаются все поля. **Since** v3.8.0 — narrowed from `string[]` to `AcquiringReportDetailedField[]`. | [types/finances.types.ts:676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/0640fa555895ac0f50754d1f4eba4ba5e96a062e/src/types/finances.types.ts#L676) |
