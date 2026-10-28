[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GetAnalyticsV1GoodsReturnParams

# Interface: GetAnalyticsV1GoodsReturnParams

Defined in: [types/reports.types.ts:753](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L753)

Query parameters for getAnalyticsV1GoodsReturn

## See

task-212 - WB news 2026-09-24 (#16): new version of the goods-return report

## Indexable

```ts
[key: string]: string | number | undefined
```

Index signature for Record<string, unknown> compatibility

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="datefrom"></a> `dateFrom` | `string` | Beginning date of the reporting period (YYYY-MM-DD); the dateFrom→dateTo window must be ≤ 31 days | [types/reports.types.ts:757](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L757) |
| <a id="dateto"></a> `dateTo` | `string` | End date of the reporting period (YYYY-MM-DD); must be greater than dateFrom | [types/reports.types.ts:759](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L759) |
| <a id="status"></a> `status` | [`GoodsReturnStatus`](../type-aliases/GoodsReturnStatus.md) | Return status filter: `active` or `archive` (replaces the old `isStatusActive` field) | [types/reports.types.ts:761](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L761) |
| <a id="limit"></a> `limit` | `number` | Number of returns in the response (0–1000) | [types/reports.types.ts:763](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L763) |
| <a id="offset"></a> `offset` | `number` | How many results to skip (pagination offset) | [types/reports.types.ts:765](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L765) |
