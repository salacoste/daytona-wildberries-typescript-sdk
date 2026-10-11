[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / SearchReportGroupReq

# Interface: SearchReportGroupReq

Defined in: [types/analytics.types.ts:723](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L723)

SEARCH_QUERIES_PREMIUM_REPORT_GROUP: С 2026-10-12 данные обновляются раз в 2 часа. Это свежесть данных, а не лимит запросов.

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="id"></a> `id` | `string` | ID отчёта в UUID-формате. Генерируется продавцом самостоятельно | [types/analytics.types.ts:725](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L725) |
| <a id="reporttype"></a> `reportType` | `string` | Тип отчёта — `SEARCH_QUERIES_PREMIUM_REPORT_GROUP` | [types/analytics.types.ts:727](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L727) |
| <a id="userreportname"></a> `userReportName?` | `string` | Название отчёта. Если не указано, сформируется автоматически | [types/analytics.types.ts:729](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L729) |
| <a id="params"></a> `params` | \{ `currentPeriod`: [`Period`](Period.md); `pastPeriod?`: [`PastPeriod`](PastPeriod.md); `nmIds?`: `number`[]; `subjectIds`: `number`[]; `brandNames?`: `string`[]; `tagIds?`: `number`[]; `orderBy`: [`OrderByGrTe`](OrderByGrTe.md); `positionCluster`: [`PositionCluster`](../type-aliases/PositionCluster.md); `includeSubstitutedSKUs?`: `boolean`; `includeSearchTexts?`: `boolean`; \} | Параметры отчёта | [types/analytics.types.ts:731](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L731) |
| `params.currentPeriod` | [`Period`](Period.md) | - | [types/analytics.types.ts:732](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L732) |
| `params.pastPeriod?` | [`PastPeriod`](PastPeriod.md) | - | [types/analytics.types.ts:733](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L733) |
| `params.nmIds?` | `number`[] | Артикулы WB, по которым составить отчёт. Оставьте пустым, чтобы получить отчёт обо всех товарах | [types/analytics.types.ts:735](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L735) |
| `params.subjectIds` | `number`[] | Список ID предметов для фильтрации. Оставьте пустым, чтобы получить отчёт по всем предметам | [types/analytics.types.ts:737](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L737) |
| `params.brandNames?` | `string`[] | Список брендов для фильтрации | [types/analytics.types.ts:739](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L739) |
| `params.tagIds?` | `number`[] | Список ID ярлыков для фильтрации | [types/analytics.types.ts:741](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L741) |
| `params.orderBy` | [`OrderByGrTe`](OrderByGrTe.md) | - | [types/analytics.types.ts:742](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L742) |
| `params.positionCluster` | [`PositionCluster`](../type-aliases/PositionCluster.md) | - | [types/analytics.types.ts:743](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L743) |
| `params.includeSubstitutedSKUs?` | `boolean` | Показать данные по прямым запросам с [подменным артикулом](https://seller.wildberries.ru/help-center/article/A-524) | [types/analytics.types.ts:745](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L745) |
| `params.includeSearchTexts?` | `boolean` | Показать данные по поисковым запросам без учёта подменного артикула | [types/analytics.types.ts:747](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/analytics.types.ts#L747) |
