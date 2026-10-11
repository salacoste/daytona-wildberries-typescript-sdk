[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / GoodsReturnV1Response

# Interface: GoodsReturnV1Response

Defined in: [types/reports.types.ts:878](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L878)

Response for getAnalyticsV1GoodsReturn

## See

task-212 - WB news 2026-09-24 (#16)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="count"></a> `count` | `number` | Total number of returns for the requested period (across all pages) | [types/reports.types.ts:880](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L880) |
| <a id="report"></a> `report` | [`GoodsReturnV1Item`](GoodsReturnV1Item.md)[] | Report items (one page, `limit` items max) | [types/reports.types.ts:882](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/6e8d6269140e3ae0a5aa5cb12ac714f457af4263/src/types/reports.types.ts#L882) |
