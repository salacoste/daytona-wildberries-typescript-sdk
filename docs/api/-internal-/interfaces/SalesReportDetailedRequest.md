[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportDetailedRequest

# Interface: SalesReportDetailedRequest

Defined in: [types/finances.types.ts:106](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L106)

Request body for `getSalesReportsDetailed()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:108](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L108) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:110](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L110) |
| <a id="limit"></a> `limit?` | `number` | Количество строк в ответе (max 100000, default 100000) | [types/finances.types.ts:112](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L112) |
| <a id="rrdid"></a> `rrdId?` | `number` | ID строки ответа для пагинации. Начинайте с 0, затем передавайте rrdId последней строки предыдущего ответа. Повторяйте запрос до ответа 204. | [types/finances.types.ts:114](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L114) |
| <a id="period"></a> `period?` | `"weekly"` \| `"daily"` | Периодичность: weekly (default) или daily | [types/finances.types.ts:116](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L116) |
| <a id="fields"></a> `fields?` | keyof [`SalesReportDetailedItem`](SalesReportDetailedItem.md)[] | Список полей, которые вернутся в ответе. Если параметр не указан, возвращаются все поля. Пример: ["rrdId", "nmId", "forPay"]. **Since** v3.8.0 — narrowed from `string[]` to `SalesReportDetailedField[]` for autocomplete and type safety. | [types/finances.types.ts:118](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L118) |
