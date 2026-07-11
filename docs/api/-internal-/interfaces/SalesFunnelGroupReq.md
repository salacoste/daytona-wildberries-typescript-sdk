[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupReq

# Interface: SalesFunnelGroupReq

Defined in: [types/analytics.types.ts:686](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L686)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:688](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L688) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `GROUPED_HISTORY_REPORT` | [types/analytics.types.ts:690](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L690) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:692](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L692) |
| <a id="params"></a> `params` | \{ `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `"day"` \| `"week"` \| `"month"`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:694](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L694) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:696](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L696) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:698](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L698) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:700](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L700) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:702](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L702) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:704](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L704) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L706) |
| `params.aggregationLevel?` | `"day"` \| `"week"` \| `"month"` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L708) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые `nmID` | [types/analytics.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L710) |
