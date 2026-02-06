[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductReq

# Interface: SalesFunnelProductReq

Defined in: [types/analytics.types.ts:957](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L957)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:959](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L959) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `DETAIL_HISTORY_REPORT` | [types/analytics.types.ts:961](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L961) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:963](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L963) |
| <a id="params"></a> `params` | \{ `nmIDs?`: `number`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `"day"` \| `"week"` \| `"month"`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:965](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L965) |
| `params.nmIDs?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:967](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L967) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:969](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L969) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:971](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L971) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:973](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L973) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:975](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L975) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:977](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L977) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:979](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L979) |
| `params.aggregationLevel?` | `"day"` \| `"week"` \| `"month"` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:981](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L981) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:983](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/e12d98723c7a4fdb8466d2e546014180e84b2188/src/types/analytics.types.ts#L983) |
