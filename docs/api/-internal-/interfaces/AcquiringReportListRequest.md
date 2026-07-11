[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportListRequest

# Interface: AcquiringReportListRequest

Defined in: [types/finances.types.ts:413](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L413)

Request body for `getAcquiringReportsList()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:415](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L415) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:417](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L417) |
| <a id="limit"></a> `limit?` | `number` | Количество отчётов в ответе (max 1000, default 1000) | [types/finances.types.ts:419](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L419) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить (default 0) | [types/finances.types.ts:421](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L421) |
