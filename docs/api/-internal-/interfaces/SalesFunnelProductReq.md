[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductReq

# Interface: SalesFunnelProductReq

Defined in: [types/analytics.types.ts:632](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L632)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:634](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L634) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `DETAIL_HISTORY_REPORT` | [types/analytics.types.ts:636](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L636) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:638](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L638) |
| <a id="params"></a> `params` | \{ `nmIDs?`: `number`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `"day"` \| `"week"` \| `"month"`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:640](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L640) |
| `params.nmIDs?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:642](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L642) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:644](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L644) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:646](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L646) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:648](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L648) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:650](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L650) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:652](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L652) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:654](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L654) |
| `params.aggregationLevel?` | `"day"` \| `"week"` \| `"month"` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:656](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L656) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:658](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/99103155f37b34643c595b7593fc47851a35dfc9/src/types/analytics.types.ts#L658) |
