[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesReportListRequest

# Interface: SalesReportListRequest

Defined in: [types/finances.types.ts:92](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L92)

Request body for `getSalesReportsList()` (v1).

## Since

v3.7.0

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Начальная дата отчёта (RFC3339, МСК UTC+3). Примеры: "2026-03-17" или "2026-03-17T00:00:00" | [types/finances.types.ts:94](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L94) |
| <a id="dateto"></a> `dateTo` | `string` | Конечная дата отчёта (RFC3339, МСК UTC+3) | [types/finances.types.ts:96](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L96) |
| <a id="limit"></a> `limit?` | `number` | Количество отчётов в ответе (max 1000, default 1000) | [types/finances.types.ts:98](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L98) |
| <a id="offset"></a> `offset?` | `number` | Сколько элементов пропустить (default 0) | [types/finances.types.ts:100](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L100) |
| <a id="period"></a> `period?` | `"weekly"` \| `"daily"` | Периодичность: weekly (default) или daily | [types/finances.types.ts:102](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/finances.types.ts#L102) |
