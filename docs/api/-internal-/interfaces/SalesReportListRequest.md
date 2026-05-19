[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportListRequest

# Interface: SalesReportListRequest

Defined in: [types/finances.types.ts:335](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/finances.types.ts#L335)

Request body for `getSalesReportsList()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3). Примеры: "2026-03-17" или "2026-03-17T00:00:00" | [types/finances.types.ts:337](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/finances.types.ts#L337) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:339](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/finances.types.ts#L339) |
| <a id="limit"></a> `limit?` | `number` | Количество отчётов в ответе (max 1000, default 1000) | [types/finances.types.ts:341](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/finances.types.ts#L341) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить (default 0) | [types/finances.types.ts:343](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/finances.types.ts#L343) |
| <a id="period"></a> `period?` | `"weekly"` \| `"daily"` | Периодичность: weekly (default) или daily | [types/finances.types.ts:345](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3351fd2a96c72b65744d4612c5d69e8a31b58e74/src/types/finances.types.ts#L345) |
