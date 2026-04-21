[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / AcquiringReportListRequest

# Interface: AcquiringReportListRequest

Defined in: [types/finances.types.ts:654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/finances.types.ts#L654)

Request body for `getAcquiringReportsList()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/finances.types.ts#L656) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/finances.types.ts#L658) |
| <a id="limit"></a> `limit?` | `number` | Количество отчётов в ответе (max 1000, default 1000) | [types/finances.types.ts:660](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/finances.types.ts#L660) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить (default 0) | [types/finances.types.ts:662](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/2c3103bc8c72dbfd45427aef4c8972a33b078bca/src/types/finances.types.ts#L662) |
