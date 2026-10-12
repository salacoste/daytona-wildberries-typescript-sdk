[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelProductReq

# Interface: SalesFunnelProductReq

Defined in: [types/analytics.types.ts:659](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L659)

DETAIL_HISTORY_REPORT: С 2026-09-24 данные обновляются раз в 2 часа. Это свежесть данных, а не лимит запросов.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:661](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L661) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `DETAIL_HISTORY_REPORT` | [types/analytics.types.ts:663](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L663) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:665](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L665) |
| <a id="params"></a> `params` | \{ `nmIDs?`: `number`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `"day"` \| `"week"` \| `"month"`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:667](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L667) |
| `params.nmIDs?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:669](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L669) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:671](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L671) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:673](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L673) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:675](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L675) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:677](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L677) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:679](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L679) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:681](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L681) |
| `params.aggregationLevel?` | `"day"` \| `"week"` \| `"month"` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:683](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L683) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые карточки товаров | [types/analytics.types.ts:685](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L685) |
