[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupReq

# Interface: SalesFunnelGroupReq

Defined in: [types/analytics.types.ts:987](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L987)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:989](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L989) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `GROUPED_HISTORY_REPORT` | [types/analytics.types.ts:991](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L991) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:993](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L993) |
| <a id="params"></a> `params` | \{ `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `string`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:995](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L995) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:997](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L997) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:999](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L999) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:1001](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1001) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:1003](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1003) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:1005](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1005) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:1007](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1007) |
| `params.aggregationLevel?` | `string` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:1009](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1009) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые `nmID` | [types/analytics.types.ts:1011](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L1011) |
