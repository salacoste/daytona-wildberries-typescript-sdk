[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportDetailHistoryRequest

# ~~Interface: NmReportDetailHistoryRequest~~

Defined in: [types/analytics.types.ts:663](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L663)

## Deprecated

Use SalesFunnelProductsHistoryRequest instead. v2 endpoint /api/v2/nm-report/detail/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="nmids"></a> ~~`nmIDs`~~ | `number`[] | Артикул WB (максимум 20) | [types/analytics.types.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L665) |
| <a id="period"></a> ~~`period`~~ | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:667](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L667) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:669](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L669) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:671](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L671) |
| <a id="timezone"></a> ~~`timezone?`~~ | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L674) |
| <a id="aggregationlevel"></a> ~~`aggregationLevel?`~~ | `string` | Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням. <br> Доступные уровни агрегации `day`, `week` | [types/analytics.types.ts:676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L676) |
