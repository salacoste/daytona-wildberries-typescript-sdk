[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportGroupedHistoryRequest

# ~~Interface: NmReportGroupedHistoryRequest~~

Defined in: [types/analytics.types.ts:680](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L680)

## Deprecated

Use SalesFunnelGroupedHistoryRequest instead. v2 endpoint /api/v2/nm-report/grouped/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="objectids"></a> ~~`objectIDs?`~~ | `number`[] | ID предметов | [types/analytics.types.ts:682](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L682) |
| <a id="brandnames"></a> ~~`brandNames?`~~ | `string`[] | Бренды | [types/analytics.types.ts:684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L684) |
| <a id="tagids"></a> ~~`tagIDs?`~~ | `number`[] | ID ярлыков | [types/analytics.types.ts:686](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L686) |
| <a id="period"></a> ~~`period`~~ | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L688) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:690](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L690) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:692](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L692) |
| <a id="timezone"></a> ~~`timezone?`~~ | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:695](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L695) |
| <a id="aggregationlevel"></a> ~~`aggregationLevel?`~~ | `string` | Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням. <br> Доступные уровни агрегации `day`, `week` | [types/analytics.types.ts:697](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L697) |
