[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportProductReq

# Interface: SearchReportProductReq

Defined in: [types/analytics.types.ts:754](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L754)

SEARCH_QUERIES_PREMIUM_REPORT_PRODUCT: С 2026-10-12 данные обновляются раз в 2 часа. Это свежесть данных, а не лимит запросов.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:756](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L756) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_PRODUCT` | [types/analytics.types.ts:758](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L758) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:760](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L760) |
| <a id="params"></a> `params` | \{ `currentPeriod`: [`Period`](Period.md); `pastPeriod?`: [`PastPeriod`](PastPeriod.md); `subjectId?`: `number`; `brandName?`: `string`; `tagId?`: `number`; `nmIds?`: `number`[]; `positionCluster`: [`PositionCluster`](../type-aliases/PositionCluster.md); `orderBy`: [`OrderBy`](OrderBy.md); `includeSubstitutedSKUs?`: `boolean`; `includeSearchTexts?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:762](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L762) |
| `params.currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:763](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L763) |
| `params.pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:764](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L764) |
| `params.subjectId?` | `number` | ID предмета. Используйте значение `0`, чтобы получить отчёт по всем предметам | [types/analytics.types.ts:766](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L766) |
| `params.brandName?` | `string` | Бренд | [types/analytics.types.ts:768](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L768) |
| `params.tagId?` | `number` | ID ярлыка. Чтобы получить отчёт по всем ярлыкам, укажите значение 0 | [types/analytics.types.ts:770](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L770) |
| `params.nmIds?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:772](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L772) |
| `params.positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:773](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L773) |
| `params.orderBy` | [`OrderBy`](OrderBy.md) | - | [types/analytics.types.ts:774](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L774) |
| `params.includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:776](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L776) |
| `params.includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:778](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/1fc8230122b571d1635d0133aaabce64876925c6/src/types/analytics.types.ts#L778) |
