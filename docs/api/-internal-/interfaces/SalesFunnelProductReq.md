[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductReq

# Interface: SalesFunnelProductReq

Defined in: [types/analytics.types.ts:838](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L838)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:840](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L840) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `DETAIL_HISTORY_REPORT` | [types/analytics.types.ts:842](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L842) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:844](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L844) |
| <a id="params"></a> `params` | \{ `nmIDs?`: `number`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `"day"` \| `"week"` \| `"month"`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:846](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L846) |
| `params.nmIDs?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:848](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L848) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:850](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L850) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:852](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L852) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:854](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L854) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:856](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L856) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:858](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L858) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:860](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L860) |
| `params.aggregationLevel?` | `"day"` \| `"week"` \| `"month"` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:862](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L862) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:864](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L864) |
