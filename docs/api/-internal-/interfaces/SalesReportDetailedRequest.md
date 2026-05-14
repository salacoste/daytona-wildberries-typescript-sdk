[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportDetailedRequest

# Interface: SalesReportDetailedRequest

Defined in: [types/finances.types.ts:349](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L349)

Request body for `getSalesReportsDetailed()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:351](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L351) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:353](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L353) |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:355](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L355) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки ответа для пагинации. Начинайте с 0, затем передавайте rrdId последней строки предыдущего ответа. Повторяйте запрос до ответа 204. | [types/finances.types.ts:357](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L357) |
| <a id="period"></a> `period?` | `"weekly"` \| `"daily"` | Периодичность: weekly (default) или daily | [types/finances.types.ts:359](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L359) |
| <a id="fields"></a> `fields?` | keyof [`SalesReportDetailedItem`](SalesReportDetailedItem.md)[] | Список полей, которые вернутся в ответе. Если параметр не указан, возвращаются все поля. Пример: ["rrdId", "nmId", "forPay"]. **Since** v3.8.0 — narrowed from `string[]` to `SalesReportDetailedField[]` for autocomplete and type safety. | [types/finances.types.ts:361](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ac6494889ad5a08c78d41bb42ba7661d7da6abe1/src/types/finances.types.ts#L361) |
