[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / InventoryHistoryReportReq

# Interface: InventoryHistoryReportReq

Defined in: [types/analytics.types.ts:837](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L837)

Параметры запроса для отчёта по истории запасов (reportType `STOCK_HISTORY_DAILY_CSV`).

В отличие от [StocksReportReq](StocksReportReq.md), этот вариант использует инлайн-параметры
(без `availabilityFilters`/`orderBy`) и период `PeriodInv` (структурно совпадает с PeriodSt,
окно до 3 месяцев).

Спецсхема: `InventoryHistoryReportReq`.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:839](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L839) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `STOCK_HISTORY_DAILY_CSV` (история запасов по дням) | [types/analytics.types.ts:841](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L841) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:843](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L843) |
| <a id="params"></a> `params` | \{ `nmIds?`: `number`[]; `subjectIds?`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `currentPeriod`: [`PeriodSt`](PeriodSt.md); `stockType`: [`StockType`](../type-aliases/StockType.md); `skipDeletedNm`: `boolean`; \} | Параметры отчёта (инлайн-форма ежедневной истории запасов) | [types/analytics.types.ts:845](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L845) |
| `params.nmIds?` | `number`[] | Список артикулов WB для фильтрации | [types/analytics.types.ts:847](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L847) |
| `params.subjectIds?` | `number`[] | Список ID предметов для фильтрации | [types/analytics.types.ts:849](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L849) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:851](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L851) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:853](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L853) |
| `params.currentPeriod` | [`PeriodSt`](PeriodSt.md) | Текущий период (окно до 3 месяцев). Спецсхема: `PeriodInv` | [types/analytics.types.ts:855](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L855) |
| `params.stockType` | [`StockType`](../type-aliases/StockType.md) | Тип складов хранения товаров | [types/analytics.types.ts:857](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L857) |
| `params.skipDeletedNm` | `boolean` | Пропустить удалённые товары | [types/analytics.types.ts:859](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L859) |
