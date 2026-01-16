[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportGroupReq

# Interface: SearchReportGroupReq

Defined in: [types/analytics.types.ts:896](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L896)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:898](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L898) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_GROUP` | [types/analytics.types.ts:900](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L900) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:902](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L902) |
| <a id="params"></a> `params` | \{ `currentPeriod`: [`Period`](Period.md); `pastPeriod?`: [`PastPeriod`](PastPeriod.md); `nmIds?`: `number`[]; `subjectIds`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `orderBy`: [`OrderByGrTe`](OrderByGrTe.md); `positionCluster`: [`PositionCluster`](../type-aliases/PositionCluster.md); `includeSubstitutedSKUs?`: `boolean`; `includeSearchTexts?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:904](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L904) |
| `params.currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:905](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L905) |
| `params.pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:906](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L906) |
| `params.nmIds?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:908](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L908) |
| `params.subjectIds` | `number`[] | Список ID предметов для фильтрации. Оставьте пустым, чтобы получить отчёт по всем предметам | [types/analytics.types.ts:910](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L910) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:912](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L912) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:914](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L914) |
| `params.orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:915](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L915) |
| `params.positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:916](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L916) |
| `params.includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:918](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L918) |
| `params.includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:920](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/c8fc381eae7a16d563b3d9f7ec9624f796368e0c/src/types/analytics.types.ts#L920) |
