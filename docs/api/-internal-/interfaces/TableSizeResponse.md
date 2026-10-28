[Wildberries API TypeScript SDK](../../modules.md) / [\<internal\>](../modules.md) / TableSizeResponse

# Interface: TableSizeResponse

Defined in: [types/analytics.types.ts:1276](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1276)

## Properties

| Property | Type | Description | Defined in |
| ------ | ------ | ------ | ------ |
| <a id="offices"></a> `offices?` | [`TableOfficeItem`](TableOfficeItem.md)[] | Множество данных по складам | [types/analytics.types.ts:1278](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1278) |
| <a id="sizes"></a> `sizes?` | \{ `name`: `string`; `chrtID`: `number`; `offices?`: [`TableOfficeItem`](TableOfficeItem.md)[]; `metrics`: [`TableCommonMetrics`](TableCommonMetrics.md) & \{ `currentPrice`: \{ `minPrice`: `number`; `maxPrice`: `number`; \}; \}; \}[] | Множество данных по размерам товара | [types/analytics.types.ts:1280](https://github.com/salacoste/daytona-wildberries-typescript-sdk/blob/3ce675e492cd5960aae55fda3b868d835d9b9218/src/types/analytics.types.ts#L1280) |
