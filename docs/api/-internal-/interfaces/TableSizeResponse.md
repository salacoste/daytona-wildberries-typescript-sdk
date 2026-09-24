[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableSizeResponse

# Interface: TableSizeResponse

Defined in: [types/analytics.types.ts:1259](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1259)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="offices"></a> `offices?` | [`TableOfficeItem`](TableOfficeItem.md)[] | Множество данных по складам | [types/analytics.types.ts:1261](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1261) |
| <a id="sizes"></a> `sizes?` | \{ `name`: `string`; `chrtID`: `number`; `offices?`: [`TableOfficeItem`](TableOfficeItem.md)[]; `metrics`: [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; \}; \}[] | Множество данных по размерам товара | [types/analytics.types.ts:1263](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/d9429ff00e3f45f265229867faf00f60ceb73dd6/src/types/analytics.types.ts#L1263) |
