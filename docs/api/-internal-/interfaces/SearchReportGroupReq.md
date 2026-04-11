[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportGroupReq

# Interface: SearchReportGroupReq

Defined in: [types/analytics.types.ts:690](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L690)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:692](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L692) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_GROUP` | [types/analytics.types.ts:694](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L694) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:696](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L696) |
| <a id="params"></a> `params` | \{ `currentPeriod`: [`Period`](Period.md); `pastPeriod?`: [`PastPeriod`](PastPeriod.md); `nmIds?`: `number`[]; `subjectIds`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `orderBy`: [`OrderByGrTe`](OrderByGrTe.md); `positionCluster`: [`PositionCluster`](../type-aliases/PositionCluster.md); `includeSubstitutedSKUs?`: `boolean`; `includeSearchTexts?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:698](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L698) |
| `params.currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:699](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L699) |
| `params.pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:700](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L700) |
| `params.nmIds?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:702](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L702) |
| `params.subjectIds` | `number`[] | Список ID предметов для фильтрации. Оставьте пустым, чтобы получить отчёт по всем предметам | [types/analytics.types.ts:704](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L704) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:706](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L706) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:708](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L708) |
| `params.orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:709](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L709) |
| `params.positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:710](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L710) |
| `params.includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:712](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L712) |
| `params.includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:714](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/fa2eeff4a4600dc237ae164c9dba54e88f9f9de8/src/types/analytics.types.ts#L714) |
