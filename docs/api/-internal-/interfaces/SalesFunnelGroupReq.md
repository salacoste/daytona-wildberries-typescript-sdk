[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupReq

# Interface: SalesFunnelGroupReq

Defined in: [types/analytics.types.ts:890](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L890)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:892](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L892) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `GROUPED_HISTORY_REPORT` | [types/analytics.types.ts:894](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L894) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:896](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L896) |
| <a id="params"></a> `params` | \{ `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `string`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:898](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L898) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:900](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L900) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:902](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L902) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:904](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L904) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:906](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L906) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L908) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:910](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L910) |
| `params.aggregationLevel?` | `string` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:912](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L912) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые `nmID` | [types/analytics.types.ts:914](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/61f168a41d66a8f9e222bafc7c76a54db1b5e61b/src/types/analytics.types.ts#L914) |
