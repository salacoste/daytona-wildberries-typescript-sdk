[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / InventoryHistoryReportReq

# Interface: InventoryHistoryReportReq

Defined in: [types/analytics.types.ts:820](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L820)

Параметры запроса для отчёта по истории запасов (reportType `STOCK_HISTORY_DAILY_CSV`).

В отличие от [StocksReportReq](StocksReportReq.md), этот вариант использует инлайн-параметры
(без `availabilityFilters`/`orderBy`) и период `PeriodInv` (структурно совпадает с PeriodSt,
окно до 3 месяцев).

Спецсхема: `InventoryHistoryReportReq`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:822](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L822) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `STOCK_HISTORY_DAILY_CSV` (история запасов по дням) | [types/analytics.types.ts:824](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L824) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:826](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L826) |
| <a id="params"></a> `params` | \{ `nmIds?`: `number`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `currentPeriod`: [`PeriodSt`](PeriodSt.md); `stockType`: [`StockType`](../type-aliases/StockType.md); `skipDeletedNm`: `boolean`; \} | Параметры отчёта (инлайн-форма ежедневной истории запасов) | [types/analytics.types.ts:828](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L828) |
| `params.nmIds?` | `number`[] | Список артикулов WB для фильтрации | [types/analytics.types.ts:830](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L830) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:832](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L832) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:834](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L834) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:836](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L836) |
| `params.currentPeriod` | [`PeriodSt`](PeriodSt.md) | Текущий период (окно до 3 месяцев). Спецсхема: `PeriodInv` | [types/analytics.types.ts:838](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L838) |
| `params.stockType` | [`StockType`](../type-aliases/StockType.md) | Тип складов хранения товаров | [types/analytics.types.ts:840](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L840) |
| `params.skipDeletedNm` | `boolean` | Пропустить удалённые товары | [types/analytics.types.ts:842](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L842) |
