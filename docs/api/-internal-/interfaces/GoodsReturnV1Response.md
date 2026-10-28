[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsReturnV1Response

# Interface: GoodsReturnV1Response

Defined in: [types/reports.types.ts:825](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L825)

Response for getAnalyticsV1GoodsReturn

## See

task-212 - WB news 2026-09-24 (#16)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="count"></a> `count` | `number` | Total number of returns for the requested period (across all pages) | [types/reports.types.ts:827](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L827) |
| <a id="report"></a> `report` | [`GoodsReturnV1Item`](GoodsReturnV1Item.md)[] | Report items (one page, `limit` items max) | [types/reports.types.ts:829](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/reports.types.ts#L829) |
