[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / NmReportGroupedHistoryRequest

# ~~Interface: NmReportGroupedHistoryRequest~~

Defined in: [types/analytics.types.ts:583](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L583)

## Deprecated

Use SalesFunnelGroupedHistoryRequest instead. v2 endpoint /api/v2/nm-report/grouped/history is dead (404).

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="objectids"></a> ~~`objectIDs?`~~ | `number`[] | ID предметов | [types/analytics.types.ts:585](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L585) |
| <a id="brandnames"></a> ~~`brandNames?`~~ | `string`[] | Бренды | [types/analytics.types.ts:587](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L587) |
| <a id="tagids"></a> ~~`tagIDs?`~~ | `number`[] | ID ярлыков | [types/analytics.types.ts:589](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L589) |
| <a id="period"></a> ~~`period`~~ | \{ `begin?`: `string`; `end?`: `string`; \} | Период | [types/analytics.types.ts:591](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L591) |
| `period.begin?` | `string` | Начало периода | [types/analytics.types.ts:593](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L593) |
| `period.end?` | `string` | Конец периода | [types/analytics.types.ts:595](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L595) |
| <a id="timezone"></a> ~~`timezone?`~~ | `string` | Временная зона.<br> Если не указано, то по умолчанию используется Europe/Moscow. | [types/analytics.types.ts:598](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L598) |
| <a id="aggregationlevel"></a> ~~`aggregationLevel?`~~ | `string` | Тип агрегации. Если не указано, то по умолчанию используется агрегация по дням. <br> Доступные уровни агрегации `day`, `week` | [types/analytics.types.ts:600](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/8eaa0b564c7703a626d25dfa7f1acb8577621384/src/types/analytics.types.ts#L600) |
