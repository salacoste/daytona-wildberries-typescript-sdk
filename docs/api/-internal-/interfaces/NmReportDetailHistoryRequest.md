[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailHistoryRequest

# ~~Interface: NmReportDetailHistoryRequest~~

Defined in: [types/analytics.types.ts:566](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L566)

## Deprecated

Use SalesFunnelProductsHistoryRequest instead. v2 endpoint /api/v2/nm-report/detail/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> ~~`nmIDs`~~ | `number`[] | Артикул WB (максимум 20) | [types/analytics.types.ts:568](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L568) |
| <a id="period"></a> ~~`period`~~ | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:570](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L570) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:572](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L572) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:574](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L574) |
| <a id="timezone"></a> ~~`timezone?`~~ | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:577](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L577) |
| <a id="aggregationlevel"></a> ~~`aggregationLevel?`~~ | `string` | Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням. <br> Доступные уровни агрегации `day`, `week` | [types/analytics.types.ts:579](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/ebcf2b7ae30aa00978226bf4a241f6d770c38def/src/types/analytics.types.ts#L579) |
