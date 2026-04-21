[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SalesFunnelGroupReq

# Interface: SalesFunnelGroupReq

Defined in: [types/analytics.types.ts:662](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L662)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:664](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L664) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `GROUPED_HISTORY_REPORT` | [types/analytics.types.ts:666](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L666) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:668](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L668) |
| <a id="params"></a> `params` | \{ `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `startDate`: `string`; `endDate`: `string`; `timezone?`: `string`; `aggregationLevel?`: `string`; `skipDeletedNm?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:670](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L670) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:672](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L672) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:674](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L674) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:676](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L676) |
| `params.startDate` | `string` | Начало периода | [types/analytics.types.ts:678](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L678) |
| `params.endDate` | `string` | Конец периода | [types/analytics.types.ts:680](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L680) |
| `params.timezone?` | `string` | Временная зона, по умолчанию Europe/Moscow | [types/analytics.types.ts:682](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L682) |
| `params.aggregationLevel?` | `string` | Как сгруппировать данные (по умолчанию по дням): * `day` — по дням * `week` — по неделям * `month` — по месяцам | [types/analytics.types.ts:684](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L684) |
| `params.skipDeletedNm?` | `boolean` | Скрыть удалённые `nmID` | [types/analytics.types.ts:686](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ec2f28a75e97950479f60007499d084aae8ea15/src/types/analytics.types.ts#L686) |
