[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportGroupReq

# Interface: SearchReportGroupReq

Defined in: [types/analytics.types.ts:714](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L714)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:716](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L716) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_GROUP` | [types/analytics.types.ts:718](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L718) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:720](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L720) |
| <a id="params"></a> `params` | \{ `currentPeriod`: [`Period`](Period.md); `pastPeriod?`: [`PastPeriod`](PastPeriod.md); `nmIds?`: `number`[]; `subjectIds`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `orderBy`: [`OrderByGrTe`](OrderByGrTe.md); `positionCluster`: [`PositionCluster`](../type-aliases/PositionCluster.md); `includeSubstitutedSKUs?`: `boolean`; `includeSearchTexts?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:722](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L722) |
| `params.currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L723) |
| `params.pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:724](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L724) |
| `params.nmIds?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:726](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L726) |
| `params.subjectIds` | `number`[] | Список ID предметов для фильтрации. Оставьте пустым, чтобы получить отчёт по всем предметам | [types/analytics.types.ts:728](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L728) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:730](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L730) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L732) |
| `params.orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:733](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L733) |
| `params.positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:734](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L734) |
| `params.includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:736](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L736) |
| `params.includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:738](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/765aad3493124d05d0e92ab41ba52b7d01191ca1/src/types/analytics.types.ts#L738) |
